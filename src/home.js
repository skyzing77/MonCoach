/* Page d'accueil : choix du programme et état de la semaine de chacun (lu dans le stockage local, rien n'est modifié ici). */
import { PROGRAMS } from './data/programs/index.js';
import { today, weekStart, isDay, fmtDay, cap1, plural } from './core/util.js';
import { PlanStore, effectiveProgram } from './core/plans.js';
import { nextSession } from './core/stats.js';

/** Lit l'état enregistré d'un programme sans jamais lever d'exception. */
function readState(key) {
  try {
    const s = JSON.parse(localStorage.getItem('sport:' + key) || 'null');
    return s && typeof s === 'object' ? s : null;
  } catch (e) {
    return null; // stockage indisponible ou illisible : la carte reste sans statut
  }
}

/** Programme actif du profil (programme de base ou personnalisé), lu sans rien écrire. */
function activeProgram(base) {
  try {
    const ps = new PlanStore({ base, storage: localStorage });
    const raw = localStorage.getItem(ps.key);
    const st = raw ? ps.parse(raw).state : null;
    return st ? effectiveProgram(base, st.plans, st.active) : base;
  } catch (e) {
    return base;
  }
}

function statusLines(base, state) {
  const program = activeProgram(base);
  const history = state && Array.isArray(state.history) ? state.history.filter((h) => h && isDay(String(h.date))) : [];
  const goal = (state && state.opt && Number.isInteger(state.opt.goal) && state.opt.goal > 0 && state.opt.goal) || program.goal;
  const good = history.filter((h) => typeof h.sid === 'string' || typeof h.short === 'string');
  const drafts = state && state.drafts && typeof state.drafts === 'object' ? Object.values(state.drafts) : [];
  const running = drafts.some((d) => d && d.sets && typeof d.sets === 'object' && Object.values(d.sets).some((a) => Array.isArray(a) && a.some((s) => s && (s.d || s.r || s.k))));
  const lines = [];
  if (running) lines.push('Séance en cours : à reprendre');
  if (history.length) {
    const thisWeek = weekStart(today());
    const n = history.filter((h) => weekStart(h.date) === thisWeek).length;
    lines.push(n >= goal ? 'Objectif de la semaine atteint (' + n + '/' + goal + ')' : 'Cette semaine : ' + n + '/' + goal + ' ' + plural(goal, 'séance', 'séances'));
    const last = history.map((h) => h.date).sort().pop();
    lines.push('Dernière séance : ' + fmtDay(last, { weekday: 'short', day: 'numeric', month: 'short' }));
    if (!running && program.seances.length > 1) lines.push('Prochaine : ' + nextSession(program, good).short);
  }
  if (program.plan) lines.push('Programme : ' + program.planName);
  return lines;
}

function refresh() {
  const now = new Date();
  const dateEl = document.getElementById('today');
  dateEl.textContent = cap1(now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }));
  dateEl.dateTime = today();
  document.getElementById('year').textContent = now.getFullYear();
  for (const [key, program] of Object.entries(PROGRAMS)) {
    const el = document.getElementById('st-' + key);
    if (!el) continue;
    const lines = statusLines(program, readState(key));
    el.hidden = !lines.length;
    el.textContent = '';
    lines.forEach((t, i) => {
      const span = document.createElement('span');
      span.textContent = t;
      if (i === 0) span.className = 'first';
      el.appendChild(span);
    });
  }
}

refresh();
// Retour sur l'accueil après une séance (page restaurée depuis le cache du navigateur) : le statut doit être à jour.
window.addEventListener('pageshow', (e) => e.persisted && refresh());
document.addEventListener('visibilitychange', () => document.hidden || refresh());

/* Mode hors ligne : même service worker que les pages de programme. */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});
}
