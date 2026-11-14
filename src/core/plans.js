/* Programmes personnalisés (fonctions pures + stockage).

   Chaque page (axel, coralie) est un profil : un programme de base défini dans le code, plus des programmes
   personnalisés créés dans l'appli. Ceux-ci sont rangés dans une clé à part :
     sport:<profil>:plans            { v: 1, plans: [plan…], active: '' | id, mt }
     sport:<profil>:plans-illisible  données de programmes qu'on n'a pas su relire (jamais effacées)
   Raison : la clé principale garde le format relu par la version 2 ; un retour en arrière ne touche donc pas aux
   programmes personnalisés, qui réapparaissent au retour en version 3.

   Identifiants :
     - un exercice garde l'identifiant de la bibliothèque (sa clé k) ou celui du programme de base dont il est copié :
       son historique reste rattaché, quel que soit le programme où il apparaît ;
     - une variante est un autre exercice (autre clé, autre identifiant, historique séparé) ;
     - une séance d'un programme personnalisé a un identifiant propre, préfixé par celui du programme. */
import { EXERCISES, WARM_DEFAULTS } from '../data/exercises.js';
import { FIGURES } from '../data/figures.js';
import { validateProgram, allExercises, isCircuit } from './program.js';
import { uid, restText } from './util.js';

export const PLAN_FORMAT = 1;
export const MAX_PLANS = 20;
const MAX_SESSIONS = 7;
const MAX_EXOS = 15;

const isObj = (o) => !!o && typeof o === 'object' && !Array.isArray(o);
const txt = (v, max) => (typeof v === 'string' ? v.slice(0, max) : typeof v === 'number' ? String(v).slice(0, max) : '');
const int = (v, lo, hi) => (Number.isInteger(+v) && +v >= lo && +v <= hi ? +v : null);
const clone = (o) => JSON.parse(JSON.stringify(o));

/* ---------- Nettoyage (tout ce qui vient du stockage ou d'un fichier importé) ---------- */

function cleanExercise(e, circuit) {
  if (!isObj(e) || typeof e.k !== 'string' || !EXERCISES[e.k] || !FIGURES[e.k]) return null;
  const id = txt(e.id, 40);
  if (!/^[\w-]{1,40}$/.test(id)) return null;
  const o = { id, k: e.k, n: txt(e.n, 120) || EXERCISES[e.k].name };
  if (e.s) o.s = txt(e.s, 60);
  for (const f of ['tip', 'load', 'sideNote', 'note']) if (e[f]) o[f] = txt(e[f], 600);
  if (e.yt) o.yt = txt(e.yt, 120);
  if (Array.isArray(e.steps) && e.steps.length) o.steps = e.steps.slice(0, 8).map((s) => txt(s, 400)).filter(Boolean);
  if (Array.isArray(e.aka)) o.aka = e.aka.slice(0, 5).map((s) => txt(s, 120)).filter(Boolean);
  if (circuit) {
    if (e.timed) o.timed = true;
    return o;
  }
  o.sets = int(e.sets, 1, 10) || 3;
  o.restS = int(e.restS, 10, 600) || 90;
  o.rest = restText(o.restS);
  if (e.noLoad) o.noLoad = true;
  if (Array.isArray(e.hold) && int(e.hold[0], 5, 600) && int(e.hold[1], 5, 600) && +e.hold[0] < +e.hold[1]) {
    o.hold = [+e.hold[0], +e.hold[1]];
    o.reps = o.hold[0] + '-' + o.hold[1] + ' s';
  } else o.reps = txt(e.reps, 40) || '8-12';
  if (Array.isArray(e.sides) && e.sides.length === 2 && e.sides.every((p) => isObj(p) && p.n)) {
    o.sides = e.sides.map((p) => ({ n: txt(p.n, 60), d: txt(p.d, 120) }));
    if (int(e.sideRest, 5, 300)) o.sideRest = +e.sideRest;
  }
  if (Array.isArray(e.parts) && e.parts.length >= 2) {
    o.parts = e.parts.slice(0, 4).filter(isObj).map((p) => {
      const q = { n: txt(p.n, 60) || 'Partie', d: txt(p.d, 120) };
      if (typeof p.k === 'string' && FIGURES[p.k]) q.k = p.k;
      if (Array.isArray(p.how)) q.how = p.how.slice(0, 6).map((s) => txt(s, 300)).filter(Boolean);
      return q;
    });
  }
  return o;
}

function cleanWarm(w) {
  if (!isObj(w) || typeof w.k !== 'string' || !FIGURES[w.k]) return null;
  const o = { k: w.k, n: txt(w.n, 120), dose: txt(w.dose, 80), how: txt(w.how, 400) };
  if (!o.n || !o.dose || !o.how) return null;
  if (int(w.s, 5, 600)) o.s = +w.s;
  if (int(w.rest, 5, 600)) o.rest = +w.rest;
  return o;
}

function cleanSession(se, circuit) {
  if (!isObj(se) || !/^[\w-]{1,60}$/.test(String(se.id))) return null;
  const title = txt(se.title, 120) || 'Séance';
  const steps = (isObj(se.warm) && Array.isArray(se.warm.steps) ? se.warm.steps : []).slice(0, 12).map(cleanWarm).filter(Boolean);
  const seen = new Set();
  const exos = (Array.isArray(se.exos) ? se.exos : []).slice(0, MAX_EXOS).map((e) => cleanExercise(e, circuit)).filter((e) => e && !seen.has(e.id) && seen.add(e.id));
  return {
    id: String(se.id),
    short: txt(se.short, 60) || title,
    tab: txt(se.tab, 40) || txt(se.short, 40) || title.slice(0, 40),
    title,
    sub: txt(se.sub, 300) || 'Séance personnalisée.',
    dur: int(se.dur, 1, 300) || 0,
    warm: { min: int(isObj(se.warm) && se.warm.min, 0, 30) ?? 5, steps },
    exos,
  };
}

/** Nettoie un programme personnalisé relu. Renvoie null s'il est inexploitable. Un programme « brouillon »
    (séance encore vide) est accepté ici : la validation complète a lieu avant de l'utiliser (planErrors). */
export function cleanPlan(raw) {
  if (!isObj(raw) || !/^p[\w-]{2,40}$/.test(String(raw.id))) return null;
  const mode = raw.mode === 'circuit' ? 'circuit' : 'sets';
  const circuit = mode === 'circuit';
  const ids = new Set();
  const seances = (Array.isArray(raw.seances) ? raw.seances : []).slice(0, MAX_SESSIONS).map((s) => cleanSession(s, circuit)).filter((s) => s && !ids.has(s.id) && ids.add(s.id));
  if (!seances.length) return null;
  const plan = {
    id: String(raw.id),
    name: txt(raw.name, 60) || 'Mon programme',
    mode,
    goal: int(raw.goal, 1, 7) || 2,
    from: txt(raw.from, 60),
    at: Number.isFinite(+raw.at) && +raw.at > 0 ? +raw.at : 0,
    mt: Number.isFinite(+raw.mt) && +raw.mt > 0 ? +raw.mt : 0,
    seances,
  };
  if (circuit) {
    const P = isObj(raw.params) ? raw.params : {};
    plan.params = { work: int(P.work, 10, 300) || 40, rest: int(P.rest, 5, 300) || 20, restTour: int(P.restTour, 10, 600) || 90, tours: int(P.tours, 1, 5) || 2 };
  }
  if (Array.isArray(raw.info)) plan.info = raw.info.slice(0, 6).filter(isObj).map((b) => ({ h: txt(b.h, 80), items: (Array.isArray(b.items) ? b.items : []).slice(0, 10).map((i) => txt(i, 400)).filter(Boolean) })).filter((b) => b.h && b.items.length);
  if (raw.finisher) plan.finisher = txt(raw.finisher, 400);
  return plan;
}

/* ---------- Programme effectif ---------- */

/** Exercices de tous les programmes du profil (base et personnalisés), pour relier l'historique quel que soit le
    programme actif. */
function knownOf(base, plans, current) {
  const seen = new Set(allExercises(current).map((e) => e.id));
  const out = [];
  for (const p of [base, ...plans]) {
    for (const se of p.seances) for (const e of se.exos) if (!seen.has(e.id)) seen.add(e.id) && out.push(e);
  }
  return out;
}

/** Programme utilisé par le moteur et l'interface : le programme de base, ou un programme personnalisé complété des
    informations du profil (clé de stockage, apparence, prénom). */
export function effectiveProgram(base, plans = [], active = '') {
  const plan = active ? plans.find((p) => p.id === active) : null;
  if (!plan || planErrors(base, plan).length) {
    const p = { ...base, plan: '', planName: base.planName || 'Programme de ' + base.name, legacy: base.seances };
    p.known = knownOf(base, plans, p);
    return p;
  }
  const p = {
    key: base.key,
    name: base.name,
    look: base.look,
    mode: plan.mode,
    goal: plan.goal,
    title: plan.name,
    sub: plan.seances.length + ' séance' + (plan.seances.length > 1 ? 's' : '') + ' · programme personnalisé',
    seances: plan.seances,
    info: plan.info || [],
    finisher: plan.finisher || '',
    plan: plan.id,
    planName: plan.name,
    legacy: base.seances,
  };
  if (plan.params) p.params = plan.params;
  p.known = knownOf(base, plans, p);
  return p;
}

/** Problèmes empêchant d'utiliser un programme (vide = utilisable). */
export function planErrors(base, plan) {
  const errs = [];
  for (const se of plan.seances) if (!se.exos.length) errs.push('La séance « ' + se.title + ' » n’a aucun exercice.');
  if (errs.length) return errs;
  const prog = { key: base.key, mode: plan.mode, goal: plan.goal, params: plan.params, seances: plan.seances };
  return validateProgram(prog).map((e) => e.replace(base.key + ' : ', ''));
}

/* ---------- Construction ---------- */

const sessionId = (plan) => {
  const used = new Set(plan.seances.map((s) => s.id));
  for (let n = plan.seances.length + 1; ; n++) if (!used.has(plan.id + '-s' + n)) return plan.id + '-s' + n;
};

/** Exercice prêt à ajouter : copie de celui du programme de base s'il existe (mêmes consignes, même identifiant),
    sinon prescription proposée par la bibliothèque. */
export function exerciseFor(k, base, mode) {
  const circuit = mode === 'circuit';
  const fromBase = allExercises(base).find((e) => e.id === k && e.k === k);
  if (fromBase && isCircuit(base) === circuit) return clone(fromBase);
  const lib = EXERCISES[k];
  const d = lib.def || {};
  if (circuit) return { id: k, k, n: lib.name, ...(d.hold ? { timed: true } : {}) };
  const e = { id: k, k, n: lib.name, sets: d.sets || 3, reps: d.reps || '8-12', restS: d.restS || 90 };
  e.rest = restText(e.restS);
  if (d.hold) e.hold = d.hold.slice();
  if (d.noLoad || d.hold) e.noLoad = true;
  if (d.sides) {
    e.sides = clone(d.sides);
    e.sideRest = d.sideRest || 20;
  }
  if (fromBase) for (const f of ['steps', 'tip', 'load', 'sideNote', 'yt']) if (fromBase[f]) e[f] = clone(fromBase[f]);
  return e;
}

export const defaultWarm = (keys = ['knee', 'armcirc', 'bsquat', 'catcow']) => ({ min: 5, steps: keys.map((k) => ({ k, ...WARM_DEFAULTS[k] })) });

/** Nouvelle séance vide d'un programme. */
export function addSession(plan, title = '') {
  const n = plan.seances.length + 1;
  const t = title || 'Séance ' + n;
  const se = { id: sessionId(plan), short: t, tab: t, title: t, sub: 'Séance personnalisée.', dur: 0, warm: defaultWarm(), exos: [] };
  plan.seances.push(se);
  return se;
}

/** Copie d'une séance (nouvel identifiant, mêmes exercices). */
export function copySession(plan, se) {
  const c = clone(se);
  c.id = sessionId(plan);
  c.title = (se.title + ' (copie)').slice(0, 120);
  c.short = (se.short + ' (copie)').slice(0, 60);
  c.tab = (se.tab + ' (copie)').slice(0, 40);
  plan.seances.splice(plan.seances.indexOf(se) + 1, 0, c);
  return c;
}

/** Programme personnalisé vide. */
export function newPlan(base, { name = 'Mon programme', mode = 'sets', now = Date.now() } = {}) {
  const plan = { id: 'p' + uid(now), name: name.slice(0, 60), mode, goal: mode === 'circuit' ? 1 : 2, from: '', at: now, mt: now, seances: [] };
  if (mode === 'circuit') plan.params = { work: 40, rest: 20, restTour: 90, tours: 2 };
  addSession(plan, mode === 'circuit' ? 'Circuit' : 'Séance 1');
  return plan;
}

/** Copie d'un programme (de base ou personnalisé) en programme personnalisé modifiable.
    Les identifiants d'exercices sont conservés (l'historique suit) ; les séances reçoivent de nouveaux identifiants. */
export function duplicatePlan(program, { name, now = Date.now() } = {}) {
  const id = 'p' + uid(now);
  const plan = {
    id,
    name: (name || 'Copie de ' + (program.planName || program.title || program.name)).slice(0, 60),
    mode: program.mode,
    goal: program.goal,
    from: program.plan || program.key,
    at: now,
    mt: now,
    seances: program.seances.map((se, i) => ({ ...clone(se), id: id + '-s' + (i + 1) })),
  };
  if (program.params) plan.params = clone(program.params);
  if (program.info && program.info.length) plan.info = clone(program.info);
  if (program.finisher) plan.finisher = program.finisher;
  return cleanPlan(plan);
}

/** Déplace un élément d'une liste (d = -1 vers le haut, 1 vers le bas). Renvoie true si quelque chose a bougé. */
export function move(list, i, d) {
  const j = i + d;
  if (i < 0 || j < 0 || i >= list.length || j >= list.length) return false;
  [list[i], list[j]] = [list[j], list[i]];
  return true;
}

/* ---------- Fusion entre onglets ---------- */

/** Fusion à trois voies, comme l'historique : base = identifiants vus à la dernière synchronisation. */
export function mergePlans(local, remote, base, dirty) {
  const byId = new Map(remote.plans.map((p) => [p.id, p]));
  const localIds = new Set(local.plans.map((p) => p.id));
  for (const p of local.plans) {
    const r = byId.get(p.id);
    if (!r) {
      if (!base.has(p.id)) byId.set(p.id, p); // créé ici
    } else if ((p.mt || 0) > (r.mt || 0)) byId.set(p.id, p); // modifié ici plus récemment
  }
  for (const id of base) if (!localIds.has(id)) byId.delete(id); // supprimé ici
  const plans = [...byId.values()].sort((a, b) => (a.at || 0) - (b.at || 0));
  let active = dirty ? local.active : remote.active;
  if (active && !plans.some((p) => p.id === active)) active = '';
  return { v: PLAN_FORMAT, plans, active, mt: Math.max(local.mt || 0, remote.mt || 0) };
}

/* ---------- Stockage ---------- */

export class PlanStore {
  constructor({ base, storage, onWriteError = () => {} }) {
    this.base = base;
    this.storage = storage;
    this.key = 'sport:' + base.key + ':plans';
    this.onWriteError = onWriteError;
    this.state = { v: PLAN_FORMAT, plans: [], active: '', mt: 0 };
    this.seen = new Set();
    this.dirtyActive = false;
    this.lastRaw = null;
  }

  read() {
    try {
      return this.storage.getItem(this.key);
    } catch (e) {
      return null;
    }
  }

  /** Relit un texte stocké. Les programmes illisibles sont mis de côté, jamais perdus. */
  parse(raw) {
    let o = null;
    try {
      o = JSON.parse(raw);
    } catch (e) {
      o = null;
    }
    if (!isObj(o) || !Array.isArray(o.plans)) return { state: null, rejected: raw };
    const plans = [];
    const rejected = [];
    const ids = new Set();
    for (const r of o.plans.slice(0, MAX_PLANS)) {
      const p = cleanPlan(r);
      if (p && !ids.has(p.id)) {
        ids.add(p.id);
        plans.push(p);
      } else rejected.push(r);
    }
    const active = typeof o.active === 'string' && ids.has(o.active) ? o.active : '';
    return { state: { v: PLAN_FORMAT, plans, active, mt: +o.mt || 0 }, rejected: rejected.length ? JSON.stringify(rejected) : null };
  }

  quarantine(text) {
    try {
      const k = this.key + '-illisible';
      const prev = this.storage.getItem(k);
      if (prev && prev.includes(text)) return;
      this.storage.setItem(k, (prev ? prev + '\n' : '') + text);
    } catch (e) {
      /* stockage indisponible */
    }
  }

  load() {
    const raw = this.read();
    if (raw == null || raw === '') return 'empty';
    const { state, rejected } = this.parse(raw);
    if (rejected) this.quarantine(rejected);
    if (!state) return 'reset';
    this.state = state;
    this.seen = new Set(state.plans.map((p) => p.id));
    this.lastRaw = raw;
    return rejected ? 'partial' : 'ok';
  }

  get plans() {
    return this.state.plans;
  }

  get active() {
    return this.state.active;
  }

  get(id) {
    return this.state.plans.find((p) => p.id === id) || null;
  }

  /** Remplace ou ajoute un programme (après nettoyage). Renvoie le programme enregistré ou null. */
  put(plan, now = Date.now()) {
    const p = cleanPlan({ ...plan, mt: now });
    if (!p) return null;
    const i = this.state.plans.findIndex((x) => x.id === p.id);
    if (i >= 0) this.state.plans[i] = p;
    else {
      if (this.state.plans.length >= MAX_PLANS) return null;
      this.state.plans.push(p);
    }
    return this.save() ? p : null;
  }

  remove(id) {
    this.state.plans = this.state.plans.filter((p) => p.id !== id);
    if (this.state.active === id) {
      this.state.active = '';
      this.dirtyActive = true;
    }
    return this.save();
  }

  setActive(id) {
    this.state.active = id && this.get(id) ? id : '';
    this.dirtyActive = true;
    return this.save();
  }

  /** Intègre l'état écrit par un autre onglet. Renvoie true si quelque chose a changé. */
  absorb(raw) {
    if (raw == null || raw === this.lastRaw) return false;
    const { state } = this.parse(raw);
    if (!state) return false;
    this.state = mergePlans(this.state, state, this.seen, this.dirtyActive);
    this.seen = new Set(state.plans.map((p) => p.id));
    this.lastRaw = raw;
    return true;
  }

  save() {
    this.absorb(this.read());
    this.state.mt = Date.now();
    const json = JSON.stringify(this.state);
    let ok = false;
    try {
      this.storage.setItem(this.key, json);
      ok = true;
    } catch (e) {
      this.onWriteError();
    }
    if (ok) {
      this.lastRaw = json;
      this.seen = new Set(this.state.plans.map((p) => p.id));
      this.dirtyActive = false;
    }
    return ok;
  }

  /** Ajoute les programmes d'une sauvegarde (jamais de remplacement). */
  importPlans(list) {
    let added = 0;
    for (const r of Array.isArray(list) ? list : []) {
      const p = cleanPlan(r);
      if (!p || this.get(p.id) || this.state.plans.length >= MAX_PLANS) continue;
      this.state.plans.push(p);
      added++;
    }
    if (added) this.save();
    return added;
  }
}
