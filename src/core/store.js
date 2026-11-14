/* Données de l'utilisateur : validation, migration, sauvegarde locale, fusion entre onglets, import / export.

   Tout reste dans le navigateur (localStorage). Clés utilisées pour un programme « axel » :
     sport:axel             état courant (format v3 : sur-ensemble compatible des formats v2 et v1, relisible par
                            les versions précédentes de l'appli)
     sport:axel:backup-v1   copie brute des données d'origine (format v1), écrite une seule fois avant leur migration
     sport:axel:backup-v2   copie brute des données de la version 2, écrite une seule fois avant leur passage en v3
     sport:axel:plans       programmes personnalisés (voir core/plans.js)
     sport:axel:snap        copie de sécurité automatique (au plus une par jour) : { day, raw }
     sport:axel:illisible   données brutes qu'on n'a pas su relire (jamais effacées automatiquement)

   Règle d'or : aucune donnée existante n'est écrasée sans qu'une copie relisible ait été conservée. */
import { isDay, today, num, uid } from './util.js';
import { exerciseIndex, isCircuit } from './program.js';

export const SCHEMA = 3;
export const KG_STEPS = [0.5, 1, 2, 2.5];
const MAX_TXT = 24;
const MAX_NOTE = 2000;
const THEMES = ['auto', 'dark', 'light'];

const txt = (v, max = MAX_TXT) => (v == null ? '' : String(v).slice(0, max));
const posNum = (v) => (Number.isFinite(+v) && +v > 0 ? +v : 0);
const isObj = (o) => !!o && typeof o === 'object' && !Array.isArray(o);

/** État vide pour un programme. */
export function blank(program) {
  return {
    v: SCHEMA,
    history: [],
    drafts: {},
    rides: [],
    cur: program.seances[0].id,
    opt: { sound: true, vib: true, theme: 'dark', goal: 0, kgStep: 1 },
    exp: '',
    expN: 0,
    uns: 0,
    mt: 0,
  };
}

const cleanSet = (s) => {
  const o = { r: txt(s.r), k: txt(s.k) };
  if (Array.isArray(s.p)) o.p = s.p.slice(0, 6).map((z) => ({ r: txt(z && z.r), k: txt(z && z.k) }));
  return o;
};

/** Volume d'une liste de lignes : somme des reps × charge saisies (les parties d'un superset comptent chacune). */
export const volumeOf = (rows) =>
  rows.reduce(
    (a, r) => a + r.sets.reduce((b, s) => b + (s.p ? s.p.reduce((c, z) => c + num(z.r) * num(z.k), 0) : num(s.r) * num(s.k)), 0),
    0,
  );

/** Valide et répare une séance d'historique. Renvoie null si elle est inexploitable. */
export function cleanEntry(h, i, program) {
  if (!isObj(h) || !isDay(String(h.date)) || !Array.isArray(h.rows) || (h.id == null && i == null)) return null;
  const idx = exerciseIndex(program);
  const rows = h.rows
    .filter((r) => isObj(r) && typeof r.ex === 'string' && Array.isArray(r.sets))
    .map((r) => {
      const row = { ex: txt(r.ex, 120), sets: r.sets.filter(isObj).slice(0, 30).map(cleanSet) };
      const ex = idx.of({ xid: typeof r.xid === 'string' ? r.xid : '', ex: row.ex });
      if (ex) row.xid = ex.id;
      else if (typeof r.xid === 'string' && r.xid) row.xid = txt(r.xid, 40);
      return row;
    });
  const short = txt(h.short, 120);
  // séance d'origine : identifiant enregistré (même s'il appartient à un autre programme du profil), sinon, pour
  // l'ancien format sans identifiant, retrouvée par son nom parmi les séances du programme de base
  const sid = typeof h.sid === 'string' && /^[\w-]{1,60}$/.test(h.sid) ? h.sid : '';
  const se = sid ? null : (program.legacy || program.seances).find((s) => s.short === short);
  const out = {
    id: h.id != null ? txt(h.id, 40) : 'old' + i,
    date: String(h.date),
    sid: sid || (se ? se.id : ''),
    short,
    title: txt(h.title, 160),
    tours: posNum(h.tours),
    rows,
    note: txt(h.note, MAX_NOTE),
    vol: posNum(h.vol) || volumeOf(rows),
    dur: Math.min(600, posNum(h.dur)),
    at: posNum(h.at),
  };
  if (typeof h.pid === 'string' && /^p[\w-]{2,40}$/.test(h.pid)) out.pid = h.pid;
  return out;
}

/** se = séance du programme actif, ou null pour le brouillon d'une séance d'un autre programme du profil (gardé tel
    quel, borné, pour le retrouver quand on revient à ce programme). */
function cleanDraft(d, program, se) {
  if (!isObj(d) || !isObj(d.sets)) return null;
  const circuit = se ? isCircuit(program) : +d.tours > 0;
  const sets = {};
  for (const x of Object.keys(d.sets)) {
    const a = d.sets[x];
    if (!/^\d+$/.test(x) || +x >= (se ? se.exos.length : 20) || !Array.isArray(a)) continue;
    sets[x] = a.slice(0, 30).map((z) => (isObj(z) ? { ...cleanSet(z), d: !!z.d } : { r: '', k: '', d: false }));
  }
  const out = {
    date: isDay(String(d.date)) ? String(d.date) : today(),
    tours: circuit ? (Number.isInteger(+d.tours) && +d.tours >= 1 && +d.tours <= 5 ? +d.tours : se ? program.params.tours : 2) : 0,
    sets,
    note: txt(d.note, MAX_NOTE),
    t0: posNum(d.t0),
    t1: posNum(d.t1),
  };
  if (isObj(d.run) && Number.isInteger(d.run.i) && d.run.i >= 0) {
    const t = d.run.timer;
    out.run = {
      i: d.run.i,
      pt: Number.isInteger(d.run.pt) && d.run.pt >= 0 ? d.run.pt : 0,
      timer: isObj(t) ? { end: posNum(t.end), left: posNum(t.left), total: posNum(t.total), side: !!t.side } : null,
      at: posNum(d.run.at),
    };
  }
  return out;
}

/** Transforme n'importe quelle valeur relue (ancien format, fichier modifié, stockage abîmé) en état valide. */
export function normalize(o, program) {
  const src = isObj(o) ? o : {};
  const s = blank(program);

  const seen = new Set();
  s.history = (Array.isArray(src.history) ? src.history : [])
    .map((h, i) => cleanEntry(h, i, program))
    .filter((h) => h && !seen.has(h.id) && seen.add(h.id));

  s.rides = [...new Set((Array.isArray(src.rides) ? src.rides : []).map(String).filter(isDay))].sort();

  const drafts = isObj(src.drafts) ? src.drafts : {};
  for (const sid of Object.keys(drafts).slice(0, 40)) {
    if (!/^[\w-]{1,60}$/.test(sid)) continue;
    const se = program.seances.find((x) => x.id === sid) || null;
    const d = cleanDraft(drafts[sid], program, se);
    // brouillon d'une séance inconnue du programme actif : gardé seulement s'il contient une saisie
    if (d && (se || Object.values(d.sets).some((a) => a.some((z) => z.d || z.r !== '' || z.k !== '')))) s.drafts[sid] = d;
  }

  if (program.seances.some((x) => x.id === src.cur)) s.cur = src.cur;

  const opt = isObj(src.opt) ? src.opt : {};
  const legacyMute = !!src.mute && !isObj(src.opt); // format v1 : un seul réglage « son et vibrations »
  s.opt = {
    sound: legacyMute ? false : opt.sound !== false,
    vib: legacyMute ? false : opt.vib !== false,
    theme: THEMES.includes(opt.theme) ? opt.theme : 'dark',
    goal: Number.isInteger(opt.goal) && opt.goal >= 1 && opt.goal <= 7 ? opt.goal : 0,
    kgStep: KG_STEPS.includes(opt.kgStep) ? opt.kgStep : 1,
  };

  s.exp = isDay(String(src.exp)) ? String(src.exp) : '';
  s.expN = posNum(src.expN);
  // séances pas encore exportées (compteur ; à défaut, ancien calcul par différence)
  const uns = src.uns != null ? Math.round(+src.uns) || 0 : s.history.length - s.expN;
  s.uns = Math.max(0, Math.min(s.history.length, uns));
  s.mt = posNum(src.mt);
  return s;
}

/** Relit un texte JSON. Renvoie null s'il est illisible. */
export function parseState(raw, program) {
  try {
    const o = JSON.parse(raw);
    return isObj(o) ? normalize(o, program) : null;
  } catch (e) {
    return null;
  }
}

/** Référence de synchronisation : ce que contenait le stockage la dernière fois qu'on l'a lu ou écrit. */
export const baseOf = (state) => ({ ids: new Set(state.history.map((h) => h.id)), rides: new Set(state.rides) });

/** Fusion à trois voies entre l'état local et celui d'un autre onglet (remote).
    - historique et sorties : on part du distant, on ajoute ce qui a été créé ici, on retire ce qui a été supprimé ici ;
    - brouillons et réglages : la version locale ne gagne que si elle a été modifiée ici depuis la dernière synchronisation. */
export function mergeStates(local, remote, base, dirty) {
  const out = { ...remote };

  const localIds = new Set(local.history.map((h) => h.id));
  const byId = new Map(remote.history.map((h) => [h.id, h]));
  let added = 0;
  for (const h of local.history) {
    if (!base.ids.has(h.id) && !byId.has(h.id)) {
      byId.set(h.id, h);
      added++;
    }
  }
  let removed = 0;
  for (const id of base.ids) if (!localIds.has(id) && byId.delete(id)) removed++;
  out.history = [...byId.values()];

  const rides = new Set(remote.rides);
  const localRides = new Set(local.rides);
  for (const d of local.rides) if (!base.rides.has(d)) rides.add(d);
  for (const d of base.rides) if (!localRides.has(d)) rides.delete(d);
  out.rides = [...rides].sort();

  out.drafts = { ...remote.drafts };
  for (const scope of dirty) {
    if (!scope.startsWith('draft:')) continue;
    const sid = scope.slice(6);
    if (local.drafts[sid]) out.drafts[sid] = local.drafts[sid];
    else delete out.drafts[sid];
  }
  if (dirty.has('cur')) out.cur = local.cur;
  if (dirty.has('opt')) out.opt = local.opt;
  if (dirty.has('exp')) {
    out.exp = local.exp;
    out.expN = local.expN;
    out.uns = local.uns;
  } else {
    out.uns = remote.uns + added - removed;
  }
  out.uns = Math.max(0, Math.min(out.history.length, out.uns));
  out.mt = Math.max(local.mt, remote.mt);
  return out;
}

/* ---------- Import / export ---------- */

/** Fichier de sauvegarde : état complet, plus les programmes personnalisés s'il y en a. */
export const exportPayload = (state, program, plans = null) => {
  const o = { app: program.key, v: SCHEMA, at: today(), data: state };
  if (plans && plans.plans && plans.plans.length) o.plans = { plans: plans.plans, active: plans.active || '' };
  return o;
};

const signature = (h) => h.date + '|' + JSON.stringify(h.rows.map((r) => [r.ex, r.sets.map((s) => [s.r, s.k])]));

/** Ajoute à l'état les séances d'un texte exporté (formats v1 et v2). Ne supprime et ne remplace jamais rien. */
export function importInto(state, text, program) {
  let j;
  if (typeof text !== 'string' || text.length > 5e6) return { ok: false, error: 'Données non reconnues.' };
  try {
    j = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: 'Données non reconnues : ce n’est pas un fichier de sauvegarde valide.' };
  }
  if (!isObj(j)) return { ok: false, error: 'Données non reconnues.' };
  if (j.app && j.app !== program.key) return { ok: false, error: 'Ces données appartiennent à un autre programme.' };
  const d = isObj(j.data) ? j.data : j;
  if (!Array.isArray(d.history)) return { ok: false, error: 'Données non reconnues : aucun historique dans ce fichier.' };

  const ids = new Set(state.history.map((h) => h.id));
  const sigs = new Set(state.history.map(signature));
  let added = 0;
  let dup = 0;
  let invalid = 0;
  d.history.forEach((raw, i) => {
    const h = cleanEntry(raw, null, program) || (isObj(raw) && raw.id == null ? cleanEntry({ ...raw, id: 'imp' + uid() + i }, null, program) : null);
    if (!h || !h.rows.length) return void invalid++;
    if (ids.has(h.id) || sigs.has(signature(h))) return void dup++;
    ids.add(h.id);
    sigs.add(signature(h));
    state.history.push(h);
    added++;
  });
  const before = state.rides.length;
  state.rides = [...new Set([...state.rides, ...(Array.isArray(d.rides) ? d.rides.map(String).filter(isDay) : [])])].sort();
  return { ok: true, added, dup, invalid, rides: state.rides.length - before, plans: isObj(j.plans) && Array.isArray(j.plans.plans) ? j.plans.plans : [] };
}

/** Historique au format tableur (CSV, séparateur « ; », une ligne par série). */
export function toCSV(state) {
  const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const lines = [['date', 'seance', 'exercice', 'serie', 'partie', 'reps_ou_secondes', 'charge_kg', 'duree_min', 'note'].join(';')];
  const sorted = state.history.slice().sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  for (const h of sorted) {
    for (const r of h.rows) {
      r.sets.forEach((s, i) => {
        const parts = s.p && s.p.length ? s.p : [s];
        parts.forEach((z, j) => {
          lines.push([h.date, q(h.short || h.title), q(r.ex), i + 1, s.p ? j + 1 : '', q(z.r), q(z.k), h.dur || '', q(h.note)].join(';'));
        });
      });
    }
  }
  return '﻿' + lines.join('\r\n') + '\r\n';
}

/* ---------- Stockage ---------- */

export class Store {
  /**
   * @param {object} o
   * @param {object} o.program  programme (src/data/programs)
   * @param {Storage} o.storage  localStorage ou équivalent
   * @param {(status:string)=>void} [o.onWriteError]  appelé une fois si l'écriture échoue
   */
  constructor({ program, storage, onWriteError = () => {}, delay = 300 }) {
    this.program = program;
    this.storage = storage;
    this.key = 'sport:' + program.key;
    this.onWriteError = onWriteError;
    this.delay = delay;
    this.state = blank(program);
    this.base = baseOf(this.state);
    this.dirty = new Set();
    this.pinned = null;
    this.lastRaw = null;
    this.timer = null;
    this.writeFailed = false;
    /** 'empty' | 'ok' | 'migrated' | 'recovered' | 'reset' */
    this.status = 'empty';
  }

  read(key) {
    try {
      return this.storage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  write(key, value) {
    try {
      this.storage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Charge l'état. Ne lève jamais d'exception : au pire, on repart d'un état vide en gardant une copie de l'illisible. */
  load() {
    const raw = this.read(this.key);
    if (raw == null || raw === '') {
      this.status = 'empty';
      return this.status;
    }
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = null;
    }
    if (isObj(parsed)) {
      const legacy = parsed.v !== SCHEMA;
      // copie brute avant toute transformation, une seule fois par ancien format (jamais réécrite)
      const backup = this.key + (parsed.v === 2 ? ':backup-v2' : ':backup-v1');
      if (legacy && this.read(backup) == null) this.write(backup, raw);
      this.state = normalize(parsed, this.program);
      this.status = legacy ? 'migrated' : 'ok';
      this.lastRaw = raw;
      this.base = baseOf(this.state);
      this.snapshot(raw);
      if (legacy) {
        this.dirty.add('opt');
        this.flush();
      }
      return this.status;
    }
    // Données illisibles : on en garde une copie, puis on tente la copie de sécurité automatique.
    this.write(this.key + ':illisible', raw);
    const snap = this.readSnapshot();
    const fromSnap = snap ? parseState(snap.raw, this.program) : null;
    if (fromSnap) {
      this.state = fromSnap;
      this.status = 'recovered';
    } else {
      this.status = 'reset';
    }
    this.base = baseOf(this.state);
    return this.status;
  }

  readSnapshot() {
    try {
      const s = JSON.parse(this.read(this.key + ':snap') || 'null');
      return isObj(s) && typeof s.raw === 'string' && isDay(String(s.day)) ? s : null;
    } catch (e) {
      return null;
    }
  }

  /** Copie de sécurité : l'état relu avec succès au premier lancement du jour. */
  snapshot(raw) {
    const s = this.readSnapshot();
    if (s && s.day === today()) return;
    this.write(this.key + ':snap', JSON.stringify({ day: today(), raw }));
  }

  /** Remplace l'historique par l'union avec celui de la copie de sécurité (rien n'est supprimé). */
  restoreSnapshot() {
    const snap = this.readSnapshot();
    if (!snap) return { ok: false, error: 'Aucune copie de sécurité disponible.' };
    const res = importInto(this.state, snap.raw, this.program);
    if (res.ok) this.flush();
    return res;
  }

  /** Change de programme actif (programme personnalisé ↔ programme de base) sans rien perdre : l'historique et les
      brouillons des autres séances sont conservés tels quels. */
  setProgram(program) {
    this.flushIfDirty();
    const cur = this.state.cur;
    this.program = program;
    this.state = normalize(this.state, program);
    this.base = baseOf(this.state);
    if (this.state.cur !== cur) this.touch('cur');
  }

  /* ----- lecture ----- */

  get goal() {
    return this.state.opt.goal || this.program.goal;
  }

  /** Brouillon de la séance (créé au besoin). */
  draft(sid, defaults) {
    const d = this.state.drafts;
    if (!d[sid]) d[sid] = { date: today(), tours: 0, sets: {}, note: '', t0: 0, t1: 0, ...defaults };
    return d[sid];
  }

  hasDraft(sid) {
    const d = this.state.drafts[sid];
    return !!d && Object.values(d.sets).some((a) => a.some((s) => s && (s.d || s.r !== '' || s.k !== '')));
  }

  /* ----- modifications ----- */

  /** Signale une modification (scope : 'cur', 'opt', 'exp', 'draft:<id>', 'history', 'rides') et planifie l'écriture. */
  touch(scope) {
    this.dirty.add(scope);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), this.delay);
  }

  addEntry(entry) {
    this.state.history.push(entry);
    this.state.uns = Math.min(this.state.history.length, this.state.uns + 1);
    this.flush();
  }

  /** Supprime une séance et la renvoie (pour pouvoir annuler). */
  removeEntry(id) {
    const i = this.state.history.findIndex((h) => h.id === id);
    if (i < 0) return null;
    const [h] = this.state.history.splice(i, 1);
    this.state.uns = Math.min(this.state.uns, this.state.history.length);
    this.flush();
    return h;
  }

  clearDraft(sid) {
    delete this.state.drafts[sid];
    this.dirty.add('draft:' + sid);
    this.flush();
  }

  toggleRide(day) {
    const r = this.state.rides;
    this.state.rides = r.includes(day) ? r.filter((x) => x !== day) : r.concat(day).sort();
    this.touch('rides');
  }

  markExported() {
    this.state.exp = today();
    this.state.expN = this.state.history.length;
    this.state.uns = 0;
    this.dirty.add('exp');
    this.flush();
  }

  import(text) {
    const res = importInto(this.state, text, this.program);
    if (res.ok) this.flush();
    return res;
  }

  /** La séance guidée garde une référence sur son brouillon : il ne doit pas être remplacé par celui d'un autre onglet. */
  pin(sid) {
    this.pinned = sid;
  }

  /* ----- synchronisation ----- */

  dirtyScopes() {
    const d = new Set(this.dirty);
    if (this.pinned) d.add('draft:' + this.pinned);
    return d;
  }

  /** Intègre l'état écrit par un autre onglet. Renvoie true si quelque chose a été repris. */
  absorb(raw) {
    if (raw == null || raw === this.lastRaw) return false;
    const remote = parseState(raw, this.program);
    if (!remote) return false;
    const merged = mergeStates(this.state, remote, this.base, this.dirtyScopes());
    Object.assign(this.state, merged);
    this.base = baseOf(remote);
    this.lastRaw = raw;
    return true;
  }

  /** Écrit immédiatement (après avoir repris les éventuelles modifications d'un autre onglet). */
  flush() {
    clearTimeout(this.timer);
    this.timer = null;
    this.absorb(this.read(this.key));
    this.state.v = SCHEMA;
    this.state.mt = Date.now();
    this.state.mute = !this.state.opt.sound; // lisible par l'ancienne version en cas de retour en arrière
    const json = JSON.stringify(this.state);
    let ok = this.write(this.key, json);
    if (!ok) {
      // Stockage plein : la copie de sécurité automatique est sacrifiée en premier, jamais les données courantes.
      try {
        this.storage.removeItem(this.key + ':snap');
      } catch (e) {
        /* stockage indisponible */
      }
      ok = this.write(this.key, json);
    }
    if (ok) {
      this.lastRaw = json;
      this.base = baseOf(this.state);
      this.dirty.clear();
      this.writeFailed = false;
    } else if (!this.writeFailed) {
      this.writeFailed = true;
      this.onWriteError();
    }
    return ok;
  }

  /** Écrit s'il reste des modifications en attente (mise en arrière-plan, fermeture). */
  flushIfDirty() {
    if (this.timer || this.dirty.size) this.flush();
  }
}
