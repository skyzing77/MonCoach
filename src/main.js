/* Point d'entrée des pages de programme (axel.html, coralie.html) : état, onglets, évènements globaux. */
import { PROGRAMS } from './data/programs/index.js';
import { Store } from './core/store.js';
import { PlanStore, effectiveProgram } from './core/plans.js';
import { cap1, mmss, esc, today } from './core/util.js';
import { $, $$, toast, announce, overlayOpen } from './ui/dom.js';
import { setLook, paintFigures } from './ui/figure.js';
import { setSignalOptions, signal } from './ui/audio.js';
import { bindCharts } from './ui/charts.js';
import { icon } from './ui/icons.js';
import { renderToday, todayActions, todayInput } from './ui/views/today.js';
import { renderProgress, progressActions } from './ui/views/progress.js';
import { renderLibrary, libraryActions, applySearch } from './ui/views/library.js';
import { renderMore, moreActions, moreChange } from './ui/views/more.js';
import { renderProgram, programActions } from './ui/views/program.js';
import { startWorkout, workoutOpen } from './ui/workout.js';
import { openExerciseSheet } from './ui/sheet.js';
import { pwa } from './ui/pwa.js';

const root = document.documentElement;
const base = PROGRAMS[root.dataset.prog];

const TABS = {
  seance: { label: 'Aujourd’hui', short: 'Accueil', icon: 'home', title: 'Aujourd’hui', render: renderToday, actions: todayActions },
  progres: { label: 'Progrès', icon: 'chart', title: 'Progrès', render: renderProgress, actions: progressActions },
  exercices: { label: 'Exercices', short: 'Exos', icon: 'book', title: 'Exercices', render: renderLibrary, actions: libraryActions, after: applySearch },
  programme: { label: 'Programme', short: 'Plan', icon: 'list', title: 'Programme', render: renderProgram, actions: programActions },
  plus: { label: 'Réglages', icon: 'gear', title: 'Réglages et données', render: renderMore, actions: moreActions },
};

/** localStorage peut être indisponible (navigation privée stricte, réglage du navigateur) : l'appli doit rester utilisable. */
function safeStorage() {
  try {
    const s = window.localStorage;
    s.getItem('sport:test');
    return s;
  } catch (e) {
    const m = new Map();
    return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), volatile: true };
  }
}

const storage = safeStorage();
const onWriteError = () => toast('Enregistrement impossible sur cet appareil : exporte tes données (onglet Réglages).', { ms: 7000 });
const plans = base ? new PlanStore({ base, storage, onWriteError }) : null;
const store = base ? new Store({ program: base, storage, onWriteError }) : null;

const app = {
  base,
  program: base,
  plans,
  store,
  tab: 'seance',
  viewOpts: {},
  render,
  go,
  startWorkout: () => startWorkout(app),
  openExercise: (ex, o) => openExerciseSheet(app, ex, o),
  startMini,
  stopMini,
  applyTheme: () => window.MonCoachTheme && window.MonCoachTheme.set(store.state.opt.theme),
  /** Recalcule le programme actif (programme de base ou personnalisé) après une modification des programmes. */
  refreshProgram() {
    const next = effectiveProgram(base, plans.plans, plans.active);
    app.program = next;
    store.setProgram(next);
  },
  /** Change de programme actif ('' = programme de base). */
  usePlan(id) {
    plans.setActive(id);
    app.refreshProgram();
  },
};

/* ---------- Affichage ---------- */

function render(opts = {}) {
  const view = $('#view');
  const tab = TABS[app.tab];
  const y = window.scrollY;
  const keyOf = (d) => d.dataset.ex || d.dataset.h || d.dataset.keep;
  const open = new Set($$('details[open]', view).map(keyOf).filter(Boolean));
  let html;
  try {
    html = tab.render(app, app.viewOpts);
  } catch (e) {
    console.error(e);
    html = `<div class="card note"><b>Affichage impossible</b><p class="mute">Une erreur empêche d’afficher cet onglet. Tes données ne sont pas perdues : ouvre l’onglet « Plus » pour les exporter.</p></div>`;
  }
  app.viewOpts = {};
  view.innerHTML = html;
  view.classList.remove('view');
  if (!opts.keepScroll) {
    void view.offsetWidth; // relance l'animation d'apparition
    view.classList.add('view');
  }
  for (const d of $$('details', view)) if (open.has(keyOf(d))) d.open = true;
  $('#title').textContent = tab.title;
  for (const b of $$('.tabs button')) {
    if (b.dataset.t === app.tab) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  }
  paintFigures(view);
  if (tab.after) tab.after(app);
  if (opts.keepScroll) window.scrollTo(0, y);
  updateBanner();
}

function go(tab, viewOpts = {}) {
  if (!TABS[tab]) return;
  app.tab = tab;
  app.viewOpts = viewOpts;
  render();
  window.scrollTo(0, 0);
  if (viewOpts.open) {
    const el = $(`[data-h="${CSS.escape(viewOpts.open)}"]`);
    if (el) el.scrollIntoView({ block: 'center' });
  }
}

function updateBanner() {
  const el = $('#update');
  const show = pwa.state.waiting && !workoutOpen();
  el.hidden = !show;
}

/* ---------- Mini-minuteur de repos (saisie libre, hors séance guidée) ---------- */

let mini = null;
let miniTimer = 0;

function drawMini() {
  const bar = $('#minibar');
  if (!mini) {
    bar.hidden = true;
    clearInterval(miniTimer);
    miniTimer = 0;
    return;
  }
  const now = Date.now();
  const left = Math.ceil((mini.end - now) / 1000);
  if (left <= 0 && !mini.done) {
    mini.done = true;
    mini.hide = now + 4000;
    signal('go');
    announce('Repos terminé');
  }
  if (mini.done && now > mini.hide) {
    mini = null;
    return drawMini();
  }
  bar.hidden = false;
  $('.l', bar).textContent = mini.label;
  $('.t', bar).textContent = mini.done ? 'Terminé' : mmss(left);
}

function startMini(sec, label) {
  mini = { end: Date.now() + sec * 1000, label, done: false, hide: 0 };
  if (!miniTimer) miniTimer = setInterval(drawMini, 250);
  drawMini();
}

function stopMini() {
  mini = null;
  drawMini();
}

/* ---------- Démarrage ---------- */

function boot() {
  const planStatus = plans.load();
  app.program = effectiveProgram(base, plans.plans, plans.active);
  store.program = app.program;
  const status = store.load();
  const program = app.program;
  setLook(program.look);
  setSignalOptions(store.state.opt);
  app.applyTheme();

  document.title = 'Mon coach – ' + base.name;
  $('#prog-name').textContent = program.name;
  const showDate = () => ($('#date').textContent = cap1(new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })));
  showDate();
  $('.tabs').innerHTML = Object.entries(TABS).map(([id, t]) => `<button type="button" data-t="${id}" aria-label="${esc(t.label)}">${icon(t.icon)}<span class="tl">${esc(t.label)}</span><span class="ts" aria-hidden="true">${esc(t.short || t.label)}</span></button>`).join('');

  const view = $('#view');
  view.addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    const fn = TABS[app.tab].actions[b.dataset.a];
    if (fn) fn(app, b, e);
  });
  view.addEventListener('input', (e) => {
    if (app.tab === 'seance') todayInput(app, e.target);
    const fn = e.target.dataset.in && TABS[app.tab].actions[e.target.dataset.in];
    if (fn) fn(app, e.target, e);
  });
  view.addEventListener('change', (e) => {
    if (app.tab === 'plus') moreChange(app, e.target);
    const fn = e.target.dataset.c && TABS[app.tab].actions[e.target.dataset.c];
    if (fn) fn(app, e.target, e);
  });
  bindCharts(view);
  bindCharts($('#sheet'));

  $('.tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    go(b.dataset.t);
    announce('Onglet ' + TABS[b.dataset.t].label);
  });
  $('#minibar').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || !mini) return;
    if (b.dataset.m === 'add' && !mini.done) mini.end += 15000;
    if (b.dataset.m === 'stop') mini = null;
    drawMini();
  });
  $('#update button').addEventListener('click', () => pwa.applyUpdate());

  // Sauvegarde dès que l'appli passe en arrière-plan ou se ferme (les minuteries d'écriture peuvent ne jamais se déclencher).
  let shownDay = today();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return store.flushIfDirty();
    if (mini) drawMini();
    // appli laissée ouverte jusqu'au lendemain : la date et la semaine affichées doivent suivre
    if (today() !== shownDay) {
      shownDay = today();
      showDate();
      if (!overlayOpen()) render({ keepScroll: true });
    }
  });
  window.addEventListener('pagehide', () => store.flushIfDirty());

  // Même programme ouvert ailleurs (autre onglet, appli installée) : on fusionne ses modifications au lieu de les écraser.
  window.addEventListener('storage', (e) => {
    if (e.newValue == null) return;
    if (e.key === plans.key) {
      // programmes modifiés dans un autre onglet : on reprend la liste et le programme actif
      if (!plans.absorb(e.newValue) || workoutOpen()) return;
      app.refreshProgram();
      if (!overlayOpen()) render({ keepScroll: true });
      return;
    }
    if (e.key !== store.key) return;
    if (!store.absorb(e.newValue)) return;
    const typing = document.activeElement && view.contains(document.activeElement) && /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (!workoutOpen() && !overlayOpen() && !typing) render({ keepScroll: true });
  });

  render();

  if (storage.volatile) toast('Le stockage du navigateur est bloqué : rien ne pourra être enregistré sur cet appareil.', { ms: 8000 });
  else if (status === 'recovered') toast('Données illisibles : la dernière copie de sécurité automatique a été restaurée.', { ms: 8000 });
  else if (status === 'reset') toast('Données illisibles mises de côté. Importe ta dernière sauvegarde depuis l’onglet Réglages.', { ms: 8000 });
  else if (planStatus === 'partial' || planStatus === 'reset') toast('Un programme personnalisé illisible a été mis de côté (il n’a pas été effacé).', { ms: 8000 });

  pwa.init(() => {
    updateBanner();
    if (app.tab === 'plus' && !overlayOpen()) {
      const active = document.activeElement;
      if (!(active && view.contains(active) && /INPUT|TEXTAREA/.test(active.tagName))) render({ keepScroll: true });
    }
  });
}

if (!base) {
  $('#view').innerHTML = '<div class="card note"><b>Programme introuvable</b><p><a href="index.html">Retour à l’accueil</a></p></div>';
} else {
  boot();
}
