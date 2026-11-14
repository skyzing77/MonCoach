/* Éditeur de programme personnalisé (plein écran).
   On travaille sur une copie : rien n'est enregistré avant « Enregistrer », et le moteur de séance ne voit jamais un
   programme incomplet (un programme invalide ne peut pas être activé, cf. core/plans.js). */
import { esc, restText, plural } from '../core/util.js';
import { displayName, sheetOf, estimateMinutes } from '../core/program.js';
import { EXERCISES, GROUPS, EQUIP, WARM_KEYS, WARM_DEFAULTS, addable } from '../data/exercises.js';
import { planErrors, exerciseFor, addSession, copySession, move, cleanPlan } from '../core/plans.js';
import { figTag, paintFigures } from './figure.js';
import { icon } from './icons.js';
import { $, openOverlay, closeOverlay, confirm, toast } from './dom.js';

const REST = [20, 30, 45, 60, 75, 90, 105, 120, 150, 180, 240];
const SIDE_REST = [10, 15, 20, 30, 45, 60];
const HOLD = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 120];
const P_WORK = [20, 30, 40, 45, 50, 60];
const P_REST = [10, 15, 20, 30, 45];
const P_TOUR = [60, 90, 120, 150, 180];
const MAX_SESSIONS = 7;
const MAX_EXOS = 15;

let E = null; // { app, plan, orig, view, entry, pickGroup, pickQ }
const el = () => $('#editor');
const clone = (o) => JSON.parse(JSON.stringify(o));
const dirty = () => JSON.stringify(E.plan) !== E.orig;
const sel = (name, values, cur, fmt = (v) => v + ' s') =>
  `<select data-ef="${name}">${values.map((v) => `<option value="${v}"${v === cur ? ' selected' : ''}>${esc(fmt(v))}</option>`).join('')}</select>`;
const withCur = (list, v) => (list.includes(v) ? list : [...list, v].sort((a, b) => a - b));
const rowBtns = (i, n, kind) =>
  `<span class="ord"><button type="button" class="icon-btn sm" data-e="up" data-k="${kind}" data-i="${i}" aria-label="Monter"${i === 0 ? ' disabled' : ''}>${icon('up')}</button><button type="button" class="icon-btn sm" data-e="down" data-k="${kind}" data-i="${i}" aria-label="Descendre"${i === n - 1 ? ' disabled' : ''}>${icon('dn')}</button><button type="button" class="icon-btn sm" data-e="del" data-k="${kind}" data-i="${i}" aria-label="Retirer">${icon('close')}</button></span>`;

/* ---------- Vues ---------- */

function planView() {
  const { plan, app } = E;
  const circuit = plan.mode === 'circuit';
  const errs = planErrors(app.base, cleanPlan(plan) || plan);
  let h = `<label class="f">Nom du programme<input data-ef="name" maxlength="60" value="${esc(plan.name)}" autocomplete="off"></label>`;
  h += `<div class="setting"><div><b>Objectif hebdomadaire</b><span class="mute small">Séances par semaine</span></div><div class="pick" role="group" aria-label="Objectif hebdomadaire">${[1, 2, 3, 4, 5, 6].map((k) => `<button type="button" data-e="goal" data-v="${k}" aria-pressed="${plan.goal === k}">${k}</button>`).join('')}</div></div>`;
  if (circuit) {
    const P = plan.params;
    h += `<div class="card flat"><b>Circuit</b><div class="fields f4">
      <label class="f">Travail${sel('p.work', withCur(P_WORK, P.work), P.work)}</label>
      <label class="f">Repos${sel('p.rest', withCur(P_REST, P.rest), P.rest)}</label>
      <label class="f">Entre les séries${sel('p.restTour', withCur(P_TOUR, P.restTour), P.restTour, restText)}</label>
      <label class="f">Séries${sel('p.tours', [1, 2, 3, 4, 5], P.tours, (v) => String(v))}</label></div></div>`;
  }
  h += `<div class="sec"><h3>Séances</h3><span class="mute small">${plan.seances.length} / ${MAX_SESSIONS}</span></div><div class="card">`;
  h += plan.seances.map((se, i) => `<div class="li ed"><button type="button" class="grow tapzone" data-e="session" data-i="${i}"><b>${esc(se.title)}</b><span class="mute small" style="display:block">${se.exos.length} ${plural(se.exos.length, 'exercice', 'exercices')}${se.exos.length ? ' · ≈ ' + estimateMinutes({ mode: plan.mode, params: plan.params }, se, circuit ? plan.params.tours : 0) + ' min' : ''}</span></button>` +
    `<button type="button" class="icon-btn sm" data-e="copy" data-i="${i}" aria-label="Copier la séance"${plan.seances.length >= MAX_SESSIONS ? ' disabled' : ''}>${icon('copy')}</button>${rowBtns(i, plan.seances.length, 'se')}</div>`).join('');
  h += `</div>${plan.seances.length < MAX_SESSIONS ? `<button type="button" class="btn ghost" data-e="addse">${icon('plus')} Ajouter une séance</button>` : ''}`;
  if (errs.length) h += `<div class="card note"><b>À compléter avant de pouvoir utiliser ce programme</b><ul>${errs.slice(0, 5).map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>`;
  return { title: 'Programme', body: h, act: `<button type="button" class="btn" data-e="save">${icon('check')} Enregistrer</button>${!errs.length && E.app.program.plan !== plan.id ? '<button type="button" class="btn ghost" data-e="saveuse">Enregistrer et utiliser ce programme</button>' : ''}` };
}

function sessionView() {
  const se = E.plan.seances[E.view.s];
  const circuit = E.plan.mode === 'circuit';
  let h = `<label class="f">Nom de la séance<input data-ef="se.title" maxlength="60" value="${esc(se.title)}" autocomplete="off"></label>
    <label class="f" style="margin-top:12px">Description<input data-ef="se.sub" maxlength="200" value="${esc(se.sub)}" autocomplete="off"></label>`;
  h += `<div class="sec"><h3>Exercices</h3><span class="mute small">${se.exos.length} / ${MAX_EXOS}</span></div>`;
  h += se.exos.length ? '<div class="card">' + se.exos.map((ex, i) => `<div class="li ed"><button type="button" class="grow tapzone row" data-e="ex" data-i="${i}"><span class="th sm">${figTag(ex.k)}</span><span class="grow"><b>${esc(displayName(ex))}</b><span class="mute small" style="display:block">${circuit ? esc(ex.note || 'travail ' + E.plan.params.work + ' s') : ex.sets + ' × ' + esc(ex.reps) + ' · repos ' + esc(restText(ex.restS))}</span></span></button>${rowBtns(i, se.exos.length, 'ex')}</div>`).join('') + '</div>'
    : '<div class="card flat"><p class="mute">Aucun exercice pour l’instant : ajoute le premier depuis la bibliothèque.</p></div>';
  if (se.exos.length < MAX_EXOS) h += `<button type="button" class="btn" data-e="pick">${icon('plus')} Ajouter un exercice</button>`;
  h += `<div class="sec"><h3>Échauffement</h3><span class="mute small">${se.warm.steps.length} mouvements</span></div>`;
  h += se.warm.steps.length ? '<div class="card">' + se.warm.steps.map((w, i) => `<div class="li ed"><span class="th sm">${figTag(w.k, { t: 0.5 })}</span><span class="grow"><b>${esc(w.n)}</b><span class="mute small" style="display:block">${esc(w.dose)}</span></span>${rowBtns(i, se.warm.steps.length, 'warm')}</div>`).join('') + '</div>' : '<div class="card flat"><p class="mute">Pas d’échauffement.</p></div>';
  h += `<button type="button" class="btn ghost" data-e="wpick">${icon('plus')} Ajouter un mouvement d’échauffement</button>`;
  return { title: se.title, body: h, act: '' };
}

function exView() {
  const se = E.plan.seances[E.view.s];
  const ex = se.exos[E.view.x];
  const circuit = E.plan.mode === 'circuit';
  const sh = sheetOf(ex);
  let h = `<div class="nx"><div class="th">${figTag(ex.k)}</div><div class="grow"><b class="lg">${esc(sh.name)}</b><div class="mute small">${esc(sh.muscles)}</div></div></div>`;
  h += `<label class="f" style="margin-top:14px">Nom affiché<input data-ef="ex.n" maxlength="120" value="${esc(ex.n)}" autocomplete="off"></label>`;
  if (!circuit) {
    h += `<div class="setting"><div><b>Séries</b></div><div class="stp"><button type="button" data-e="sets" data-d="-1" aria-label="Une série de moins"${ex.sets <= 1 ? ' disabled' : ''}>−</button><output class="num" aria-live="polite">${ex.sets}</output><button type="button" data-e="sets" data-d="1" aria-label="Une série de plus"${ex.sets >= 10 ? ' disabled' : ''}>+</button></div></div>`;
    if (ex.hold) {
      h += `<div class="setting"><div><b>Durée tenue</b><span class="mute small">Chrono croissant : objectif minimum, arrêt automatique au maximum</span></div><div class="fields"><label class="f">Minimum${sel('ex.h0', withCur(HOLD, ex.hold[0]), ex.hold[0])}</label><label class="f">Maximum${sel('ex.h1', withCur(HOLD, ex.hold[1]), ex.hold[1])}</label></div></div>`;
    } else {
      h += `<label class="f" style="margin-top:8px">Répétitions par série<input data-ef="ex.reps" maxlength="40" value="${esc(ex.reps)}" placeholder="8-12, ou 10 par jambe" autocomplete="off"></label>`;
    }
    h += `<div class="setting"><div><b>Repos après chaque série</b></div>${sel('ex.restS', withCur(REST, ex.restS), ex.restS, restText)}</div>`;
    if (ex.sides) h += `<div class="setting"><div><b>Repos pour changer de côté</b><span class="mute small">${esc(ex.sides.map((p) => p.n).join(' puis '))}</span></div>${sel('ex.sideRest', withCur(SIDE_REST, ex.sideRest || 20), ex.sideRest || 20)}</div>`;
    if (!ex.hold && !ex.parts) h += `<label class="chkl" style="margin-top:8px"><input type="checkbox" data-ef="ex.noLoad"${ex.noLoad ? ' checked' : ''}> Sans charge (poids du corps) : pas de kg à noter</label>`;
    h += `<label class="f" style="margin-top:14px">Consigne personnelle<textarea data-ef="ex.tip" rows="3" maxlength="600" placeholder="Affichée dans la fiche à la place du conseil général">${esc(ex.tip || '')}</textarea></label>`;
  } else {
    h += `<label class="f" style="margin-top:14px">Consigne affichée pendant le circuit<textarea data-ef="ex.note" rows="3" maxlength="600" placeholder="Ex. : haltère légère, 20 s par côté">${esc(ex.note || '')}</textarea></label>`;
  }
  const vars = sh.variants.filter((k) => EXERCISES[k].def && !EXERCISES[k].only);
  if (vars.length) {
    h += `<div class="sec"><h3>Variantes</h3></div><p class="mute small" style="margin:-4px 0 6px">Une variante est un autre exercice : il a son propre historique et ses propres records.</p><div class="card">` +
      vars.map((k) => `<button type="button" class="li" data-e="variant" data-v="${k}"${se.exos.some((e) => e.k === k) ? ' disabled' : ''}><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(EXERCISES[k].name)}</b><span class="mute small" style="display:block">${esc(EXERCISES[k].equip.length ? EXERCISES[k].equip.map((q) => EQUIP[q]).join(', ') : 'Sans matériel')}</span></span>${icon('swap', 'mute')}</button>`).join('') + '</div>';
  }
  h += `<button type="button" class="btn ghost" data-e="preview">${icon('info')} Voir la fiche de l’exercice</button><button type="button" class="btn danger" data-e="delex">${icon('trash')} Retirer de la séance</button>`;
  return { title: displayName(ex), body: h, act: '' };
}

function pickView(warm) {
  const se = E.plan.seances[E.view.s];
  const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  if (warm) {
    const have = new Set(se.warm.steps.map((w) => w.k));
    return { title: 'Échauffement', body: '<div class="card">' + WARM_KEYS.map((k) => `<button type="button" class="li" data-e="addwarm" data-v="${k}"${have.has(k) ? ' disabled' : ''}><span class="th sm">${figTag(k, { t: 0.5 })}</span><span class="grow"><b>${esc(WARM_DEFAULTS[k].n)}</b><span class="mute small" style="display:block">${esc(WARM_DEFAULTS[k].dose)}${have.has(k) ? ' · déjà dans l’échauffement' : ''}</span></span>${icon('plus', 'mute')}</button>`).join('') + '</div>', act: '' };
  }
  const have = new Set(se.exos.map((e) => e.k));
  const g = E.pickGroup;
  const keys = addable().filter((k) => g === 'all' || EXERCISES[k].group === g);
  const groups = Object.keys(GROUPS).filter((x) => x !== 'warm' && addable().some((k) => EXERCISES[k].group === x));
  let h = `<label class="search"><span class="sr">Rechercher</span>${icon('search')}<input type="search" data-ef="pickq" placeholder="Rechercher un exercice" value="${esc(E.pickQ)}" autocomplete="off"></label>`;
  h += `<div class="filters" role="group" aria-label="Groupe musculaire"><button type="button" data-e="pg" data-v="all" aria-pressed="${g === 'all'}">Tous</button>${groups.map((x) => `<button type="button" data-e="pg" data-v="${x}" aria-pressed="${g === x}">${esc(GROUPS[x])}</button>`).join('')}</div>`;
  const q = fold(E.pickQ.trim());
  h += '<div class="card pick-list">' + keys.map((k) => {
    const e = EXERCISES[k];
    const txt = fold(e.name + ' ' + e.muscles);
    return `<button type="button" class="li" data-e="add" data-v="${k}" data-q="${esc(txt)}"${have.has(k) ? ' disabled' : ''}${q && !txt.includes(q) ? ' hidden' : ''}><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(e.name)}</b><span class="mute small" style="display:block">${esc(e.muscles)}${have.has(k) ? ' · déjà dans la séance' : ''}</span></span>${icon('plus', 'mute')}</button>`;
  }).join('') + '</div>';
  return { title: 'Ajouter un exercice', body: h, act: '' };
}

function draw(keepScroll = false) {
  const root = el();
  const y = root.scrollTop;
  const v = E.view.k;
  const scr = v === 'session' ? sessionView() : v === 'ex' ? exView() : v === 'pick' ? pickView(false) : v === 'wpick' ? pickView(true) : planView();
  root.innerHTML = `<div class="s-top"><button type="button" class="icon-btn" data-e="back" aria-label="${v === 'plan' ? 'Fermer l’éditeur' : 'Retour'}">${icon(v === 'plan' ? 'close' : 'back')}</button><b class="grow ell" id="ed-t" tabindex="-1">${esc(scr.title)}</b>${v !== 'plan' ? '<button type="button" class="btn sm" data-e="top">OK</button>' : ''}</div><div class="s-body">${scr.body}</div>${scr.act ? `<div class="w-act">${scr.act}</div>` : ''}`;
  paintFigures(root);
  root.scrollTop = keepScroll ? y : 0;
  if (!keepScroll) $('#ed-t', root).focus({ preventScroll: true });
}

/* ---------- Actions ---------- */

function go(view) {
  E.view = { ...E.view, ...view };
  draw();
}

function up() {
  const k = E.view.k;
  if (k === 'ex' || k === 'pick' || k === 'wpick') return go({ k: 'session' });
  if (k === 'session') return go({ k: 'plan' });
  return quit();
}

async function quit() {
  if (dirty() && !(await confirm('Abandonner les modifications ?', 'Les changements faits depuis l’ouverture de l’éditeur ne seront pas enregistrés.', 'Abandonner'))) return;
  close();
}

function close() {
  if (E && E.entry) closeOverlay(E.entry);
}

/** Nom affiché commun à toutes les occurrences d'un même exercice (même identifiant = même exercice). */
function renameAll(id, n) {
  for (const se of E.plan.seances) for (const ex of se.exos) if (ex.id === id) ex.n = n;
}

async function save(use) {
  const { app } = E;
  const plan = cleanPlan(E.plan);
  if (!plan) return toast('Programme invalide : ajoute au moins une séance.');
  plan.seances.forEach((se) => (se.warm.min = Math.max(se.warm.steps.length ? 2 : 0, Math.round(se.warm.steps.length * 0.75))));
  // une saisie en cours devient incohérente si les exercices de sa séance ont changé : on prévient avant de la vider
  const old = app.plans.get(plan.id);
  const sig = (se) => JSON.stringify(se.exos.map((e) => [e.id, e.sets || 0]));
  const affected = old ? old.seances.filter((o) => app.store.hasDraft(o.id) && (!plan.seances.find((n) => n.id === o.id) || sig(o) !== sig(plan.seances.find((n) => n.id === o.id)))) : [];
  if (affected.length) {
    const ok = await confirm('Saisie en cours', 'Une séance en cours (« ' + affected[0].title + ' ») utilise des exercices modifiés : sa saisie sera vidée. L’historique n’est pas touché.', 'Enregistrer quand même', '');
    if (!ok) return;
    for (const se of affected) app.store.clearDraft(se.id);
  }
  const saved = app.plans.put(plan);
  if (!saved) return toast('Enregistrement impossible.');
  const errs = planErrors(app.base, saved);
  if (use && !errs.length) app.usePlan(saved.id);
  else app.refreshProgram();
  E.orig = JSON.stringify(E.plan);
  close();
  app.go(use && !errs.length ? 'seance' : 'programme');
  toast(errs.length ? 'Programme enregistré. Il reste à le compléter pour pouvoir l’utiliser.' : use ? 'Programme enregistré et activé.' : 'Programme enregistré.');
}

const actions = {
  back: up,
  top: up,
  save: () => save(false),
  saveuse: () => save(true),
  goal: (b) => {
    E.plan.goal = +b.dataset.v;
    draw(true);
  },
  session: (b) => go({ k: 'session', s: +b.dataset.i }),
  ex: (b) => go({ k: 'ex', x: +b.dataset.i }),
  addse: () => {
    const se = addSession(E.plan);
    go({ k: 'session', s: E.plan.seances.indexOf(se) });
  },
  copy: (b) => {
    copySession(E.plan, E.plan.seances[+b.dataset.i]);
    draw(true);
  },
  up: (b) => reorder(b, -1),
  down: (b) => reorder(b, 1),
  del: async (b) => {
    const i = +b.dataset.i;
    const k = b.dataset.k;
    if (k === 'se') {
      if (E.plan.seances.length <= 1) return toast('Un programme garde au moins une séance.');
      if (!(await confirm('Supprimer cette séance ?', '« ' + E.plan.seances[i].title + ' » sera retirée du programme (l’historique est conservé).', 'Supprimer'))) return;
      E.plan.seances.splice(i, 1);
    } else if (k === 'ex') E.plan.seances[E.view.s].exos.splice(i, 1);
    else E.plan.seances[E.view.s].warm.steps.splice(i, 1);
    draw(true);
  },
  pick: () => go({ k: 'pick' }),
  wpick: () => go({ k: 'wpick' }),
  pg: (b) => {
    E.pickGroup = b.dataset.v;
    draw(true);
  },
  add: (b) => {
    const se = E.plan.seances[E.view.s];
    const ex = exerciseFor(b.dataset.v, E.app.base, E.plan.mode);
    const same = E.plan.seances.flatMap((s) => s.exos).find((e) => e.id === ex.id);
    if (same) ex.n = same.n;
    se.exos.push(ex);
    toast('« ' + displayName(ex) + ' » ajouté.');
    go({ k: 'session' });
  },
  addwarm: (b) => {
    E.plan.seances[E.view.s].warm.steps.push({ k: b.dataset.v, ...WARM_DEFAULTS[b.dataset.v] });
    go({ k: 'session' });
  },
  sets: (b) => {
    const ex = E.plan.seances[E.view.s].exos[E.view.x];
    ex.sets = Math.max(1, Math.min(10, ex.sets + +b.dataset.d));
    draw(true);
  },
  variant: (b) => {
    const se = E.plan.seances[E.view.s];
    const old = se.exos[E.view.x];
    const ex = exerciseFor(b.dataset.v, E.app.base, E.plan.mode);
    if (E.plan.mode !== 'circuit') {
      ex.sets = old.sets;
      ex.restS = old.restS;
      ex.rest = restText(ex.restS);
    } else if (old.note) ex.note = old.note;
    const same = E.plan.seances.flatMap((s) => s.exos).find((e) => e.id === ex.id);
    if (same) ex.n = same.n;
    se.exos[E.view.x] = ex;
    toast('Remplacé par « ' + displayName(ex) + ' ».');
    draw();
  },
  delex: () => {
    E.plan.seances[E.view.s].exos.splice(E.view.x, 1);
    go({ k: 'session' });
  },
  preview: () => {
    const ex = E.plan.seances[E.view.s].exos[E.view.x];
    E.app.openExercise({ ...ex, id: ex.id, lib: true });
  },
};

function reorder(b, d) {
  const i = +b.dataset.i;
  const list = b.dataset.k === 'se' ? E.plan.seances : b.dataset.k === 'ex' ? E.plan.seances[E.view.s].exos : E.plan.seances[E.view.s].warm.steps;
  if (move(list, i, d)) {
    draw(true);
    const nb = el().querySelector(`[data-e="${d < 0 ? 'up' : 'down'}"][data-k="${b.dataset.k}"][data-i="${i + d}"]`);
    if (nb && !nb.disabled) nb.focus({ preventScroll: true });
  }
}

/** Saisie dans un champ (sans redessiner : le clavier reste ouvert). */
function onInput(t) {
  const f = t.dataset.ef;
  if (!f) return;
  const v = t.type === 'checkbox' ? t.checked : t.value;
  const se = E.plan.seances[E.view.s];
  const ex = se && se.exos[E.view.x];
  if (f === 'name') E.plan.name = v.slice(0, 60);
  else if (f.startsWith('p.')) E.plan.params[f.slice(2)] = +v;
  else if (f === 'se.title') {
    se.title = se.short = v.slice(0, 60) || 'Séance';
    se.tab = se.title.slice(0, 40);
  } else if (f === 'se.sub') se.sub = v.slice(0, 200);
  else if (f === 'ex.n') renameAll(ex.id, v.slice(0, 120) || EXERCISES[ex.k].name);
  else if (f === 'ex.reps') ex.reps = v.slice(0, 40);
  else if (f === 'ex.restS') {
    ex.restS = +v;
    ex.rest = restText(ex.restS);
  } else if (f === 'ex.sideRest') ex.sideRest = +v;
  else if (f === 'ex.h0' || f === 'ex.h1') {
    ex.hold[f === 'ex.h0' ? 0 : 1] = +v;
    if (ex.hold[0] >= ex.hold[1]) ex.hold = f === 'ex.h0' ? [ex.hold[0], ex.hold[0] + 5] : [Math.max(5, ex.hold[1] - 5), ex.hold[1]];
    ex.reps = ex.hold[0] + '-' + ex.hold[1] + ' s';
    if (t.tagName === 'SELECT') draw(true);
  } else if (f === 'ex.noLoad') {
    if (v) ex.noLoad = true;
    else delete ex.noLoad;
  } else if (f === 'ex.tip' || f === 'ex.note') {
    if (v.trim()) ex[f.slice(3)] = v.slice(0, 600);
    else delete ex[f.slice(3)];
  } else if (f === 'pickq') {
    E.pickQ = v.slice(0, 60);
    const q = E.pickQ.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    for (const li of el().querySelectorAll('.pick-list .li')) li.hidden = !!q && !li.dataset.q.includes(q);
  }
}

let bound = false;
function bind(root) {
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-e]');
    if (!b || !E || b.disabled) return;
    const fn = actions[b.dataset.e];
    if (fn) fn(b);
  });
  root.addEventListener('input', (e) => E && onInput(e.target));
}

/** Ouvre l'éditeur sur une copie du programme. */
export function openEditor(app, plan) {
  if (E || !plan) return;
  const root = el();
  if (!bound) {
    bind(root);
    bound = true;
  }
  E = { app, plan: clone(plan), orig: JSON.stringify(plan), view: { k: 'plan', s: 0, x: 0 }, entry: null, pickGroup: 'all', pickQ: '' };
  E.entry = openOverlay(root, {
    canClose: () => {
      up(); // bouton « retour » du téléphone : remonte d'un niveau, ou demande avant d'abandonner
      return false;
    },
    onClose: () => {
      E = null;
      root.innerHTML = '';
      app.render({ keepScroll: true });
    },
  });
  draw();
}

export const editorOpen = () => !!E;
