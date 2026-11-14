/* Onglet « Exercices » : bibliothèque complète, filtrable par groupe musculaire, matériel et type de mouvement,
   avec recherche. Les exercices du programme actif sont signalés et ouvrent leur fiche avec la prescription. */
import { esc, fmtNum } from '../../core/util.js';
import { displayName, sheetOf, allExercises, isCircuit } from '../../core/program.js';
import { GROUPS, EXERCISES, EQUIP, TYPES, addable } from '../../data/exercises.js';
import { records } from '../../core/stats.js';
import { figTag } from '../figure.js';
import { icon } from '../icons.js';
import { $$ } from '../dom.js';

const local = { group: 'all', equip: '', type: '', mine: false, q: '' };

/** Mouvements d'échauffement du programme, sans doublon. */
function warmups(program) {
  const seen = new Map();
  for (const se of program.seances) for (const w of se.warm.steps) if (!seen.has(w.k)) seen.set(w.k, w);
  return [...seen.values()];
}

/** Texte de recherche d'un exercice (nom, muscles, matériel), sans accents. */
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Fiche « bibliothèque » d'un exercice absent du programme actif. */
export const libExercise = (k) => ({ id: k, k, n: EXERCISES[k].name, lib: true });

/** Tous les exercices affichés : ceux du programme (avec leur prescription), puis le reste de la bibliothèque. */
function catalog(program) {
  const mine = allExercises(program);
  const inProg = new Set(mine.map((e) => e.k));
  return [...mine.map((ex) => ({ ex, mine: true })), ...addable().filter((k) => !inProg.has(k)).map((k) => ({ ex: libExercise(k), mine: false }))];
}

export function renderLibrary(app) {
  const { program } = app;
  const rec = {};
  for (const r of records(app.store.state.history, program)) if (r.part == null) rec[r.ex.id] = r;
  const all = catalog(program);
  const chip = (id, label) => `<button data-a="group" data-v="${id}" aria-pressed="${local.group === id}">${esc(label)}</button>`;
  const groups = Object.keys(GROUPS).filter((g) => g !== 'warm' && all.some((c) => sheetOf(c.ex).group === g));
  let h = `<label class="search"><span class="sr">Rechercher un exercice</span>${icon('search')}<input type="search" data-in="q" placeholder="Rechercher : nom, muscle, matériel…" value="${esc(local.q)}" autocomplete="off" enterkeyhint="search"></label>`;
  h += `<div class="filters" role="group" aria-label="Groupe musculaire">${chip('all', 'Tous')}${groups.map((g) => chip(g, GROUPS[g])).join('')}${chip('warm', GROUPS.warm)}</div>`;
  if (local.group !== 'warm') {
    h += `<div class="filters-box row3"><label class="f">Matériel<select data-c="equip"><option value="">Tout</option><option value="none"${local.equip === 'none' ? ' selected' : ''}>Sans matériel</option>${Object.entries(EQUIP).map(([k, l]) => `<option value="${k}"${local.equip === k ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
      <label class="f">Mouvement<select data-c="type"><option value="">Tous</option>${Object.entries(TYPES).filter(([k]) => k !== 'mob').map(([k, l]) => `<option value="${k}"${local.type === k ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
      <label class="chkl"><input type="checkbox" data-c="mine"${local.mine ? ' checked' : ''}> Mon programme</label></div>`;
    const list = all.filter(({ ex, mine }) => {
      const sh = sheetOf(ex);
      if (local.group !== 'all' && sh.group !== local.group) return false;
      if (local.equip === 'none' ? sh.equip.length : local.equip && !sh.equip.includes(local.equip)) return false;
      if (local.type && sh.type !== local.type) return false;
      return !local.mine || mine;
    });
    const qn = fold(local.q.trim());
    h += `<p class="mute small count" style="margin:2px 2px 0"></p>`;
    const item = ({ ex, mine }) => {
      const sh = sheetOf(ex);
      const r = rec[ex.id];
      const where = mine ? program.seances.filter((s) => s.exos.includes(ex)).map((s) => (s.tab || s.short).split(' · ')[0]).join(', ') : '';
      const plan = !mine ? '' : isCircuit(program) ? program.params.work + ' s par passage' : ex.sets + ' × ' + (ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps);
      const eq = sh.equip.length ? sh.equip.map((q) => EQUIP[q]).join(', ') : 'Sans matériel';
      const q = fold([displayName(ex), sh.name, sh.muscles, eq, TYPES[sh.type] || '', GROUPS[sh.group] || ''].join(' '));
      return `<button class="li" data-a="open" data-v="${esc(ex.id)}" data-lib="${mine ? '' : '1'}" data-q="${esc(q)}"${qn && !q.includes(qn) ? ' hidden' : ''}><div class="th">${figTag(ex.k)}</div><div class="grow"><b>${esc(mine ? displayName(ex) : sh.name)}</b><div class="mute small">${esc(sh.muscles)}</div><div class="mute small">${mine ? esc(where) + ' · ' + esc(plan) : esc(eq)}</div></div>` +
        (r ? `<span class="v">${fmtNum(r.v)} ${r.u}<small>record</small></span>` : '') + icon('chev', 'mute') + '</button>';
    };
    const mineL = list.filter((c) => c.mine);
    const other = list.filter((c) => !c.mine);
    if (!list.length) h += '<div class="card flat"><p class="mute">Aucun exercice ne correspond à ces filtres.</p></div>';
    if (mineL.length) h += `<h4 class="month">Dans ton programme</h4><div class="card lib">${mineL.map(item).join('')}</div>`;
    if (other.length) h += `<h4 class="month">Autres exercices de la bibliothèque</h4><div class="card lib">${other.map(item).join('')}</div>`;
  }
  if (local.group === 'all' || local.group === 'warm') {
    h += `<div class="sec"><h3>Échauffement du programme</h3></div><div class="card lib">` + warmups(program).map((w) =>
      `<button class="li" data-a="warm" data-v="${esc(w.k)}" data-q="${esc(fold(w.n + ' ' + ((EXERCISES[w.k] || {}).muscles || '')))}"><div class="th sm">${figTag(w.k, { t: 0.5 })}</div><div class="grow"><b>${esc(w.n)}</b><div class="mute small">${esc(w.dose)} · ${esc((EXERCISES[w.k] || {}).muscles || '')}</div></div>${icon('chev', 'mute')}</button>`).join('') + '</div>';
  }
  return h;
}

/** Recherche : filtre la liste affichée sans la redessiner (le clavier reste ouvert). */
export function applySearch() {
  const q = fold(local.q.trim());
  let n = 0;
  for (const li of $$('#view .lib .li')) {
    const hit = !q || li.dataset.q.includes(q);
    li.hidden = !hit;
    if (hit && li.dataset.a === 'open') n++;
  }
  const c = $$('#view .count')[0];
  if (c) c.textContent = n + ' exercice' + (n > 1 ? 's' : '') + (q ? ' pour « ' + local.q.trim() + ' »' : '');
}

export const libraryActions = {
  group(app, b) {
    local.group = b.dataset.v;
    app.render({ keepScroll: true });
    applySearch();
  },
  equip(app, el) {
    local.equip = el.value;
    app.render({ keepScroll: true });
    applySearch();
  },
  type(app, el) {
    local.type = el.value;
    app.render({ keepScroll: true });
    applySearch();
  },
  mine(app, el) {
    local.mine = el.checked;
    app.render({ keepScroll: true });
    applySearch();
  },
  q(app, el) {
    local.q = el.value.slice(0, 60);
    applySearch();
  },
  open(app, b) {
    const ex = b.dataset.lib ? libExercise(b.dataset.v) : allExercises(app.program).find((e) => e.id === b.dataset.v);
    if (ex) app.openExercise(ex);
  },
  warm(app, b) {
    const w = warmups(app.program).find((x) => x.k === b.dataset.v);
    if (w) app.openExercise({ ...w, id: null, warm: true });
  },
};
