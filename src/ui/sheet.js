/* Fiche d'un exercice : illustration animée, repères (groupe, matériel, type), position de départ, étapes, conseils,
   erreurs fréquentes, variantes, et progression mesurée (charge, répétitions, volume). */
import { esc, fmtDay, fmtNum, restText } from '../core/util.js';
import { sheetOf, isCircuit, displayName, trackedExercises } from '../core/program.js';
import { GROUPS, EQUIP, TYPES, EXERCISES } from '../data/exercises.js';
import { seriesOf } from '../core/stats.js';
import { figAnimTag, figTag, paintFigures } from './figure.js';
import { icon } from './icons.js';
import { lineChart } from './charts.js';
import { $, openOverlay, closeOverlay } from './dom.js';
import { rowSummary } from './views/today.js';

const list = (a, tag = 'ol', cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''}>${a.map((z) => `<li>${esc(z)}</li>`).join('')}</${tag}>`;
const METRICS = [['best', 'Meilleure valeur'], ['reps', 'Répétitions'], ['vol', 'Volume']];
const local = { metric: 'best', part: 0 };

function statsHTML(app, ex) {
  const tracked = trackedExercises(app.program).find((e) => e.id === ex.id);
  if (!tracked) return '';
  const parts = tracked.parts && tracked.parts.length ? tracked.parts : null;
  const part = parts ? Math.min(local.part, parts.length - 1) : null;
  const all = seriesOf(app.store.state.history, app.program, tracked, part);
  if (!all.length) return '<h3 id="sheet-stats">Ta progression</h3><p class="mute">Pas encore de séance enregistrée pour cet exercice.</p>';
  let h = '<h3 id="sheet-stats">Ta progression</h3>';
  if (parts) h += `<div class="pick wide" role="group" aria-label="Exercice du superset">${parts.map((p, j) => `<button data-s="part" data-v="${j}" aria-pressed="${j === part}">${esc(p.n)}</button>`).join('')}</div>`;
  const withValue = all.filter((p) => p.best.v > 0);
  const short = (d) => fmtDay(d, { day: 'numeric', month: 'short' });
  if (withValue.length) {
    const u = withValue[withValue.length - 1].best.u;
    const pts = withValue.filter((p) => p.best.u === u).slice(-24);
    const top = pts.reduce((a, p) => (p.best.v > a.best.v || (p.best.v === a.best.v && p.best.reps > a.best.reps) ? p : a), pts[0]);
    h += `<div class="hsum"><div><b>${fmtNum(top.best.v)}</b><span>record (${u})</span></div><div><b>${fmtNum(pts[pts.length - 1].best.v)}</b><span>dernière (${u})</span></div><div><b>${all.length}</b><span>séances</span></div></div>`;
    if (pts.length >= 2) {
      const hasVol = pts.some((p) => p.vol > 0);
      const metrics = METRICS.filter(([m]) => m !== 'vol' || hasVol).filter(([m]) => m !== 'reps' || u !== 'reps');
      const m = metrics.some(([k]) => k === local.metric) ? local.metric : 'best';
      const val = (p) => (m === 'reps' ? p.reps : m === 'vol' ? Math.round(p.vol) : p.best.v);
      const unit = m === 'reps' ? 'reps' : m === 'vol' ? 'kg×reps' : u;
      const what = m === 'reps' ? 'Total des répétitions de la séance' : m === 'vol' ? 'Volume de la séance (reps × kg)' : u === 'kg' ? 'Charge maximale de la séance' : 'Meilleure série de la séance';
      h += `<div class="card flat">${metrics.length > 1 ? `<div class="pick wide" role="group" aria-label="Mesure affichée">${metrics.map(([k, l]) => `<button data-s="metric" data-v="${k}" aria-pressed="${k === m}">${l}</button>`).join('')}</div>` : ''}
        <p class="mute small" style="margin:8px 0 4px">${esc(what)}</p>${lineChart(
        pts.map((p) => ({ label: short(p.date), v: val(p), tip: short(p.date) + ' : ' + fmtNum(val(p)) + ' ' + unit + (m === 'best' && u === 'kg' && p.best.reps ? ' × ' + fmtNum(p.best.reps) + ' reps' : '') })),
        { unit, title: what + ' (' + unit + ')' },
      )}</div>`;
    }
  }
  h += '<div class="card flat">' + all.slice(-6).reverse().map((p) =>
    `<div class="li"><span class="mute" style="min-width:64px">${esc(short(p.date))}</span><span class="grow num">${esc(rowSummary(p.row))}</span></div>`).join('') + '</div>';
  return h;
}

function sheetHTML(app, ex) {
  const sh = sheetOf(ex);
  const q = encodeURIComponent(ex.yt || sh.name.split(' (')[0] + ' technique exercice');
  const circuit = isCircuit(app.program);
  const inProgram = !ex.lib && !ex.warm;
  let h = `<div class="s-top"><button class="icon-btn" id="sheet-x" aria-label="Fermer la fiche">${icon('back')}</button><b class="grow">${esc(ex.warm ? 'Échauffement' : GROUPS[sh.group] || '')}</b></div><div class="s-body">`;
  h += `<h2 id="sheet-t" tabindex="-1">${esc(ex.warm ? ex.n : sh.name)}</h2><p class="mute">${esc(sh.muscles)}</p>`;
  h += `<div class="hero-fig">${figAnimTag(ex.k)}</div>`;
  if (ex.warm) {
    h += `<p class="dose" style="text-align:center">${esc(ex.dose)}</p><h3>Comment faire</h3><p>${esc(ex.how)}</p>`;
    return h + '</div>';
  }
  const eq = sh.equip.length ? sh.equip.map((k) => EQUIP[k]).join(' · ') : 'Sans matériel';
  h += `<div class="chips" style="justify-content:center"><span class="chip">${icon('target')} ${esc(GROUPS[sh.group] || '')}</span><span class="chip">${esc(eq)}</span>${TYPES[sh.type] ? `<span class="chip">${esc(TYPES[sh.type])}</span>` : ''}</div>`;
  if (inProgram) {
    const plan = circuit ? `${app.program.params.work} s de travail, ${app.program.params.rest} s de repos` : `${ex.sets} séries · ${ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps} · repos ${restText(ex.restS)}`;
    h += `<div class="card flat plan"><span class="kicker">Dans ton programme</span><b>${esc(plan)}</b>${circuit && ex.note ? `<span class="mute small">${esc(ex.note)}</span>` : ''}</div>`;
  }
  if (sh.start) h += `<h3>Position de départ</h3><p>${esc(sh.start)}</p>`;
  h += `<h3>Exécution</h3>${list(sh.steps)}`;
  if (ex.parts) {
    h += ex.parts.map((p, j) => `<div class="card flat"><div class="nx"><div class="th">${figTag(p.k || ex.k)}</div><div><b>${j + 1}. ${esc(p.n)}</b><div class="mute">${esc(p.d || '')}</div></div></div>${p.how ? list(p.how) : ''}</div>`).join('');
  }
  if (ex.sideNote) h += `<div class="card flat"><b>Un côté après l’autre</b><p>${esc(ex.sideNote)}</p></div>`;
  if (sh.tip) h += `<div class="card flat"><b>Conseil</b><p>${esc(sh.tip)}</p></div>`;
  if (sh.errors.length) h += `<h3>Erreurs fréquentes</h3>${list(sh.errors, 'ul', 'errs')}`;
  if (ex.load) h += `<div class="card flat"><b>Charge</b><p>${esc(ex.load)}</p></div>`;
  if (sh.variants.length) {
    h += `<h3>Variantes</h3><div class="card flat">` + sh.variants.map((k) => `<button class="li" data-s="variant" data-v="${k}"><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(EXERCISES[k].name)}</b><span class="mute small" style="display:block">${esc(EXERCISES[k].muscles)}</span></span>${icon('chev', 'mute')}</button>`).join('') + '</div>';
  }
  h += statsHTML(app, ex);
  h += `<a class="btn ghost" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener noreferrer">Chercher des vidéos de cet exercice ↗</a><p class="mute small" style="text-align:center;margin-top:6px">Ouvre YouTube dans le navigateur (nécessite Internet).</p>`;
  return h + '</div>';
}

let entry = null;
let current = null;

function fill(app, ex, { keepScroll = false } = {}) {
  const el = $('#sheet');
  const y = el.scrollTop;
  current = { app, ex };
  el.innerHTML = sheetHTML(app, ex);
  el.setAttribute('aria-label', 'Fiche : ' + displayName({ n: sheetOf(ex).name, s: ex.s }));
  paintFigures(el);
  el.scrollTop = keepScroll ? y : 0;
  $('#sheet-x', el).onclick = () => closeOverlay(entry);
}

/** Ouvre la fiche d'un exercice. opts.focus = 'stats' fait défiler jusqu'à la progression. */
export function openExerciseSheet(app, ex, { focus = '', onClose = null } = {}) {
  const el = $('#sheet');
  local.part = 0;
  if (!entry) {
    el.onclick = (e) => {
      const b = e.target.closest('[data-s]');
      if (!b || !current) return;
      if (b.dataset.s === 'metric') local.metric = b.dataset.v;
      if (b.dataset.s === 'part') local.part = +b.dataset.v;
      if (b.dataset.s === 'variant') {
        const k = b.dataset.v;
        const mine = trackedExercises(current.app.program).find((x) => x.k === k && x.id === k);
        return fill(current.app, mine ? { ...mine, lib: true } : { id: k, k, n: EXERCISES[k].name, lib: true });
      }
      fill(current.app, current.ex, { keepScroll: true });
    };
    entry = openOverlay(el, {
      onClose: () => {
        entry = null;
        current = null;
        el.innerHTML = '';
        onClose && onClose();
      },
    });
  }
  fill(app, ex);
  const target = focus === 'stats' ? $('#sheet-stats', el) : null;
  if (target) target.scrollIntoView({ block: 'start' });
  try {
    $('#sheet-t', el).focus({ preventScroll: true });
  } catch (e) {
    /* focus impossible */
  }
}
