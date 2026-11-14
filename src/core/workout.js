/* Moteur de la séance guidée : machine à états pure (aucun accès au DOM, horloge injectable → testable).

   Une séance est une liste d'étapes :
     warm   étape d'échauffement (s = durée du chrono, 0 si l'on avance à la main)
     rest   repos chronométré (after : 'warm' | 'set' | 'tour')
     ready  écran « prêt à démarrer » d'un circuit
     work   passage chronométré d'un circuit (x = exercice, i = tour)
     set    série d'un programme en séries (x = exercice, i = série)
     end    récapitulatif

   Phases de l'étape en cours (this.ph) :
     idle   rien ne tourne (série classique, échauffement sans chrono, prêt, fin)
     wait   chrono à lancer à la main (échauffement chronométré, gainage)
     prep   compte à rebours de mise en place (3 s)
     run    compte à rebours (repos, travail d'un circuit, échauffement chronométré)
     hold   chrono croissant du gainage
     side   repos de changement de côté (exercices unilatéraux)

   Tous les chronos reposent sur des heures absolues (now()) : ils restent justes si le navigateur
   ralentit ses minuteries ou si l'appli passe en arrière-plan. */
import { isCircuit, partsOf, setsCount } from './program.js';
import { today, isDay, uid } from './util.js';
import { volumeOf } from './store.js';

export const PREP_MS = 3000;
/** Au-delà de cette durée, une séance est considérée comme interrompue : sa durée n'est pas enregistrée. */
export const MAX_SESSION_MIN = 300;

export function buildSteps(program, session, tours) {
  const st = [];
  session.warm.steps.forEach((w, j) => {
    st.push({ k: 'warm', w: j, s: w.s || 0 });
    if (w.rest) st.push({ k: 'rest', s: w.rest, after: 'warm' });
  });
  const L = session.exos.length;
  if (isCircuit(program)) {
    const P = program.params;
    st.push({ k: 'ready' });
    for (let t = 0; t < tours; t++) {
      session.exos.forEach((ex, x) => {
        st.push({ k: 'work', x, i: t, s: P.work });
        const last = x === L - 1;
        if (!(last && t === tours - 1)) st.push({ k: 'rest', s: last ? P.restTour : P.rest, after: last ? 'tour' : 'set' });
      });
    }
  } else {
    session.exos.forEach((ex, x) => {
      for (let i = 0; i < ex.sets; i++) {
        st.push({ k: 'set', x, i });
        if (!(x === L - 1 && i === ex.sets - 1)) st.push({ k: 'rest', s: ex.restS, after: 'set' });
      }
    });
  }
  st.push({ k: 'end' });
  return st;
}

/** Série du brouillon (créée au besoin). */
export function draftSet(draft, x, i) {
  const a = (draft.sets[x] = draft.sets[x] || []);
  return (a[i] = a[i] || { r: '', k: '', d: false });
}

const filled = (s) => !!s && (s.d || s.r !== '' || s.k !== '' || !!(s.p && s.p.some((z) => z && (z.r !== '' || z.k !== ''))));

/** Valeur proposée pour un champ : saisie en cours, sinon série précédente, sinon dernière séance enregistrée.
    last = { row } de la dernière séance pour cet exercice (ou null) ; part = index de la partie d'un superset. */
export function defaultValue(draft, x, i, field, last, part = null) {
  const pick = (s) => {
    if (!s) return '';
    if (part != null) return s.p && s.p[part] ? s.p[part][field] || '' : s.p ? '' : s[field] || '';
    return s[field] || '';
  };
  const cur = pick((draft.sets[x] || [])[i]);
  if (cur !== '') return cur;
  if (i > 0) {
    const prev = pick((draft.sets[x] || [])[i - 1]);
    if (prev !== '') return prev;
  }
  if (!last) return '';
  const sets = last.row.sets;
  if (field === 'r') return pick(sets[i]);
  const ks = sets.map(pick).filter((z) => z !== '');
  return ks.length ? ks[ks.length - 1] : '';
}

/** Lignes à enregistrer : seules les séries réellement renseignées ou validées sont gardées. */
export function rowsOf(program, session, draft) {
  return session.exos
    .map((ex, x) => ({
      ex: ex.n,
      xid: ex.id,
      sets: (draft.sets[x] || [])
        .slice(0, setsCount(program, ex, draft.tours))
        .filter(filled)
        .map((s) => (s.p ? { r: s.r, k: s.k, p: s.p.map((z) => ({ r: (z && z.r) || '', k: (z && z.k) || '' })) } : { r: s.r, k: s.k })),
    }))
    .filter((r) => r.sets.length);
}

/** Durée mesurée de la séance en minutes (0 si inconnue ou manifestement interrompue). */
export function durationMin(draft, now) {
  if (!draft.t0) return 0;
  const m = Math.round(((draft.t1 || now) - draft.t0) / 60000);
  return m > 0 && m <= MAX_SESSION_MIN ? m : 0;
}

/** Séance d'historique construite à partir du brouillon (null s'il n'y a rien à enregistrer). */
export function buildEntry(program, session, draft, now = Date.now()) {
  const rows = rowsOf(program, session, draft);
  if (!rows.length) return null;
  const entry = {
    id: uid(now),
    date: isDay(draft.date) ? draft.date : today(),
    sid: session.id,
    short: session.short,
    title: session.title,
    tours: isCircuit(program) ? draft.tours : 0,
    rows,
    note: draft.note || '',
    vol: volumeOf(rows),
    dur: durationMin(draft, now),
    at: now,
  };
  if (program.plan) entry.pid = program.plan; // programme personnalisé dont vient la séance (filtre de l'historique)
  return entry;
}

export class Workout {
  /**
   * @param {object} o
   * @param {object} o.program
   * @param {object} o.session
   * @param {object} o.draft     brouillon de la séance (modifié en place)
   * @param {()=>number} [o.now]
   * @param {(name:string)=>void} [o.cue]       'tick' | 'go' | 'rest' | 'ok' | 'end'
   * @param {(kind:string)=>void} [o.onChange]  'step' (réafficher) | 'data' (enregistrer)
   */
  constructor({ program, session, draft, now = Date.now, cue = () => {}, onChange = () => {} }) {
    this.program = program;
    this.session = session;
    this.draft = draft;
    this.now = now;
    this.cue = cue;
    this.onChange = onChange;
    this.steps = buildSteps(program, session, draft.tours);
    this.count = this.steps.filter((s) => s.x != null).length;
    this.i = 0;
    this.ph = 'idle';
    this.timer = null;
    this.pt = 0;
    this.prepEnd = 0;
    this.h0 = 0;
    this.holdCued = false;
    this.lastSec = null;
    this.interrupted = false;
    if (!draft.t0) draft.t0 = now();
    this.resume();
  }

  get step() {
    return this.steps[this.i];
  }

  exOf(step = this.step) {
    return step.x != null ? this.session.exos[step.x] : null;
  }

  set(x, i) {
    return draftSet(this.draft, x, i);
  }

  /** Lecture seule : ne crée pas la série dans le brouillon. */
  isDone(s) {
    const a = (this.draft.sets[s.x] || [])[s.i];
    return !!(a && a.d);
  }

  get doneCount() {
    return this.steps.filter((s) => s.x != null && this.isDone(s)).length;
  }

  /** Avancement (0 → 1) : part des séries situées avant l'étape en cours. */
  get progress() {
    return this.count ? this.steps.slice(0, this.i).filter((s) => s.x != null).length / this.count : 0;
  }

  get paused() {
    return !!(this.timer && this.timer.left);
  }

  /** Prochaine étape de travail après l'étape en cours (ou null). */
  nextWork() {
    return this.steps.slice(this.i + 1).find((s) => s.x != null) || null;
  }

  /** Dernière étape de travail avant l'étape en cours (ou null). */
  prevWork() {
    for (let j = this.i - 1; j >= 0; j--) if (this.steps[j].x != null) return this.steps[j];
    return null;
  }

  /* ----- position de départ / reprise ----- */

  firstUndone() {
    const first = this.steps.findIndex((s) => s.x != null);
    const i = this.steps.findIndex((s) => s.x != null && !this.isDone(s));
    if (i < 0) return this.steps.length - 1;
    return i === first ? 0 : i;
  }

  resume() {
    const now = this.now();
    const r = this.draft.run;
    const s = r && this.steps[r.i];
    const anyDone = this.doneCount > 0;
    if (s && s.k === 'rest' && r.timer && (r.timer.left > 0 || r.timer.end > now)) {
      // un repos était en cours quand l'appli a été fermée : on le retrouve là où il en est
      this.i = r.i;
      this.ph = 'run';
      this.timer = { end: r.timer.end, left: r.timer.left, total: r.timer.total || s.s };
    } else if (s && (s.k === 'warm' || s.k === 'ready') && !anyDone) {
      this.setup(r.i);
    } else if (s && s.x != null && !this.isDone(s)) {
      this.setup(r.i);
      const parts = partsOf(this.exOf(s), s.i);
      if (parts && r.pt > 0 && r.pt < parts.length) this.pt = r.pt;
    } else {
      this.setup(this.firstUndone());
    }
    this.persist();
  }

  /* ----- transitions ----- */

  setup(i) {
    const now = this.now();
    this.i = Math.max(0, Math.min(this.steps.length - 1, i));
    const s = this.step;
    const ex = this.exOf();
    this.pt = 0;
    this.h0 = 0;
    this.prepEnd = 0;
    this.holdCued = false;
    this.lastSec = null;
    this.timer = null;
    if (s.k === 'warm') this.ph = s.s ? 'wait' : 'idle';
    else if (s.k === 'rest' || s.k === 'work') {
      this.ph = 'run';
      this.timer = { end: now + s.s * 1000, left: 0, total: s.s };
    } else if (s.k === 'set') this.ph = ex.hold ? 'wait' : 'idle';
    else this.ph = 'idle';
    this.draft.t1 = s.k === 'end' ? this.draft.t1 || now : 0;
  }

  enter(i) {
    this.setup(i);
    this.persist();
    this.onChange('step');
  }

  persist() {
    const t = this.timer;
    this.draft.run = {
      i: this.i,
      pt: this.pt,
      timer: t ? { end: t.end, left: t.left, total: t.total, side: this.ph === 'side' } : null,
      at: this.now(),
    };
    this.onChange('data');
  }

  next() {
    if (this.i >= this.steps.length - 1) return;
    const k = this.steps[this.i + 1].k;
    this.cue(k === 'end' ? 'end' : k === 'rest' ? 'rest' : k === 'set' || k === 'work' ? 'go' : 'ok');
    this.enter(this.i + 1);
  }

  /** Lance le chrono manuel (échauffement chronométré, gainage) après 3 s de mise en place. */
  launch() {
    if (this.ph !== 'wait') return;
    this.ph = 'prep';
    this.prepEnd = this.now() + PREP_MS;
    this.lastSec = null;
    this.onChange('step');
  }

  /** Pause / reprise du compte à rebours en cours. */
  togglePause() {
    const t = this.timer;
    if (!t || (this.ph !== 'run' && this.ph !== 'side')) return;
    const now = this.now();
    if (t.left) {
      t.end = now + t.left;
      t.left = 0;
    } else {
      t.left = Math.max(1, t.end - now);
    }
    this.persist();
    this.onChange('timer');
  }

  pause() {
    if (this.timer && !this.timer.left) this.togglePause();
  }

  /** Ajoute du temps au compte à rebours en cours (y compris pendant une pause). */
  add(sec) {
    const t = this.timer;
    if (!t || (this.ph !== 'run' && this.ph !== 'side')) return;
    if (t.left) t.left += sec * 1000;
    else t.end += sec * 1000;
    t.total += sec;
    this.persist();
    this.onChange('timer');
  }

  /** Passe l'étape en cours sans la valider. */
  skip() {
    if (this.ph === 'side') return this.sideReady();
    this.next();
  }

  /** Enregistre des valeurs saisies pour une série sans changer d'étape (saisie pendant le repos d'un circuit). */
  setValues(x, i, v) {
    const a = this.set(x, i);
    if (v.r != null) a.r = String(v.r);
    if (v.k != null) a.k = String(v.k);
    this.onChange('data');
  }

  storeValues(v) {
    const s = this.step;
    const ex = this.exOf();
    const a = this.set(s.x, s.i);
    if (ex.parts) {
      a.p = a.p || [];
      for (let j = 0; j < ex.parts.length; j++) a.p[j] = a.p[j] || { r: '', k: '' };
      const p = a.p[Math.min(this.pt, ex.parts.length - 1)];
      if (v.r != null) p.r = String(v.r);
      if (v.k != null) p.k = String(v.k);
      a.r = a.p[0].r;
      a.k = a.p[0].k;
    } else {
      if (v.r != null) a.r = String(v.r);
      if (v.k != null) a.k = String(v.k);
    }
    return a;
  }

  /** Valide l'étape en cours (série terminée, échauffement suivant, gainage arrêté) et passe à la suite. */
  done(v = {}) {
    const s = this.step;
    if (s.k === 'end') return;
    if (s.x != null) {
      const ex = this.exOf();
      let a;
      if (this.ph === 'hold') {
        a = this.set(s.x, s.i);
        a.r = String(Math.max(0, Math.min(ex.hold[1], Math.floor((this.now() - this.h0) / 1000))));
      } else if (this.ph === 'wait' || this.ph === 'prep') {
        return; // gainage pas encore lancé : rien à valider (utiliser skip pour passer)
      } else {
        a = this.storeValues(v);
      }
      a.d = true;
    }
    this.next();
  }

  /** Valide une partie de la série (un côté, ou un exercice du superset) et passe à la suivante. */
  partDone(v = {}) {
    const s = this.step;
    const ex = this.exOf();
    const parts = ex && partsOf(ex, s.i);
    if (!parts || this.pt >= parts.length - 1 || this.ph !== 'idle') return;
    this.storeValues(v);
    this.pt++;
    if (ex.sides && ex.sideRest) {
      this.ph = 'side';
      this.timer = { end: this.now() + ex.sideRest * 1000, left: 0, total: ex.sideRest };
      this.lastSec = null;
      this.cue('rest');
    } else {
      this.cue('ok');
    }
    this.persist();
    this.onChange('step');
  }

  /** Fin du repos de changement de côté. */
  sideReady() {
    if (this.ph !== 'side') return;
    this.ph = 'idle';
    this.timer = null;
    this.cue('go');
    this.persist();
    this.onChange('step');
  }

  /** Revient à l'étape de travail précédente (pour corriger une validation trop rapide). */
  back() {
    if (this.ph === 'side' || (this.pt > 0 && this.ph === 'idle')) {
      this.pt = Math.max(0, this.pt - 1);
      this.ph = 'idle';
      this.timer = null;
      this.persist();
      this.onChange('step');
      return true;
    }
    let j = this.i - 1;
    while (j >= 0 && this.steps[j].k === 'rest') j--;
    if (j < 0) return false;
    const s = this.steps[j];
    if (s.x != null) this.set(s.x, s.i).d = false;
    this.enter(j);
    return true;
  }

  /** Va directement à un exercice (aperçu de la séance) : sa première série non faite, sinon sa première série.
      Les séries déjà validées restent validées ; celles qu'on saute restent à faire et on peut y revenir. */
  goToExercise(x) {
    let j = this.steps.findIndex((s) => s.x === x && !this.isDone(s));
    if (j < 0) j = this.steps.findIndex((s) => s.x === x);
    if (j < 0) return false;
    this.cue('go');
    this.enter(j);
    return true;
  }

  /** État de chaque exercice pour l'aperçu : séries faites / prévues. */
  overview() {
    return this.session.exos.map((ex, x) => {
      const st = this.steps.filter((s) => s.x === x);
      return { x, ex, done: st.filter((s) => this.isDone(s)).length, total: st.length, current: this.step.x === x };
    });
  }

  /** L'appli passe en arrière-plan : un chrono lancé à la main ne peut plus être suivi, on l'annule proprement. */
  interrupt() {
    if (this.ph === 'prep' || this.ph === 'hold') {
      this.ph = 'wait';
      this.h0 = 0;
      this.prepEnd = 0;
      this.interrupted = true;
      this.onChange('step');
    }
  }

  /* ----- horloge ----- */

  /** Secondes restantes du compte à rebours affiché (mise en place, repos, travail). */
  secondsLeft(now = this.now()) {
    if (this.ph === 'prep') return Math.max(0, Math.ceil((this.prepEnd - now) / 1000));
    const t = this.timer;
    if (!t) return 0;
    return Math.max(0, Math.ceil((t.left || t.end - now) / 1000));
  }

  /** Part du compte à rebours écoulée (0 → 1). */
  fraction(now = this.now()) {
    const t = this.timer;
    if (this.ph === 'hold') return Math.min(1, this.holdElapsed(now) / this.exOf().hold[1]);
    if (!t || !t.total) return 0;
    return Math.min(1, Math.max(0, 1 - (t.left || t.end - now) / (t.total * 1000)));
  }

  holdElapsed(now = this.now()) {
    return this.h0 ? Math.max(0, Math.floor((now - this.h0) / 1000)) : 0;
  }

  elapsedSec(now = this.now()) {
    return this.draft.t0 ? Math.max(0, Math.floor(((this.draft.t1 || now) - this.draft.t0) / 1000)) : 0;
  }

  /** À appeler régulièrement (≈ 4 fois par seconde) et au retour au premier plan. */
  tick(now = this.now()) {
    const s = this.step;
    if (this.ph === 'prep') {
      const left = Math.ceil((this.prepEnd - now) / 1000);
      if (left !== this.lastSec && left > 0) this.cue('tick');
      this.lastSec = left;
      if (now >= this.prepEnd) {
        this.cue('go');
        this.lastSec = null;
        if (s.k === 'warm') {
          this.ph = 'run';
          this.timer = { end: now + s.s * 1000, left: 0, total: s.s };
        } else {
          this.ph = 'hold';
          this.h0 = now;
          this.holdCued = false;
        }
        this.onChange('step');
      }
      return;
    }
    if (this.ph === 'hold') {
      const H = this.exOf().hold;
      const el = this.holdElapsed(now);
      if (el >= H[0] && !this.holdCued) {
        this.holdCued = true;
        this.cue('rest');
      }
      if (el >= H[1]) this.done();
      return;
    }
    if (this.ph !== 'run' && this.ph !== 'side') return;
    const t = this.timer;
    if (!t || t.left) return;
    const left = Math.ceil((t.end - now) / 1000);
    if (left !== this.lastSec && left > 0 && left <= 3 && this.lastSec != null) this.cue('tick');
    this.lastSec = left;
    if (now < t.end) return;
    if (this.ph === 'side') return void this.sideReady();
    if (s.k === 'work') this.set(s.x, s.i).d = true; // passage terminé : validé, les reps restent à saisir par l'utilisateur
    this.next();
  }
}
