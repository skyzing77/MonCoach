/* Lecture des données d'un programme : fonctions pures partagées par le moteur, les statistiques et l'interface. */
import { EXERCISES } from '../data/exercises.js';
import { FIGURES } from '../data/figures.js';

export const isCircuit = (program) => program.mode === 'circuit';

/** Nom affiché : nom court du programme, sinon le nom sans sa précision entre parenthèses. */
export const displayName = (ex) => ex.s || ex.n.split(' (')[0];

/** Fiche de la bibliothèque complétée par les précisions du programme. */
export const sheetOf = (ex) => {
  const lib = EXERCISES[ex.k] || {};
  return {
    name: ex.n || lib.name || ex.k,
    muscles: ex.mus || lib.muscles || '',
    group: lib.group || 'warm',
    steps: ex.steps || lib.steps || (ex.how ? [ex.how] : []),
    tip: ex.tip || lib.tip || '',
    start: lib.start || '',
    errors: lib.errors || [],
    equip: lib.equip || [],
    type: lib.type || '',
    variants: (lib.variants || []).filter((k) => EXERCISES[k]),
  };
};

export const sessionById = (program, id) => program.seances.find((s) => s.id === id) || program.seances[0];

/** Tous les exercices du programme, sans doublon d'identifiant. */
export function allExercises(program) {
  const seen = new Map();
  for (const se of program.seances) for (const ex of se.exos) if (!seen.has(ex.id)) seen.set(ex.id, ex);
  return [...seen.values()];
}

/** Exercices du programme, puis ceux des autres programmes du profil (program.known) : l'historique d'un exercice
    qui n'est plus dans le programme actif reste lisible (records, courbes, détail des séances). */
export const trackedExercises = (program) => allExercises(program).concat(program.known || []);

/** Retrouve un exercice par identifiant stable ou, pour l'ancien historique, par nom. */
export function exerciseIndex(program) {
  const byId = new Map();
  const byName = new Map();
  for (const ex of trackedExercises(program)) {
    if (byId.has(ex.id)) continue;
    byId.set(ex.id, ex);
    for (const name of [ex.n, ...(ex.aka || [])]) if (!byName.has(name)) byName.set(name, ex);
  }
  return {
    byId,
    byName,
    /** row = ligne d'historique { xid?, ex } */
    of: (row) => (row.xid && byId.get(row.xid)) || byName.get(row.ex) || null,
  };
}

/** Unité de la valeur « r » d'une série : secondes pour le gainage, sinon répétitions. */
export const unitOf = (ex, rowName = '') =>
  (ex && (ex.hold || ex.timed)) || (!ex && /planche|gainage/i.test(rowName)) ? 's' : 'reps';

/** Nombre de séries prévues pour un exercice (tours du circuit ou séries du programme). */
export const setsCount = (program, ex, tours) => (isCircuit(program) ? tours : ex.sets);

/** Étapes d'une série : parties d'un superset, ou les deux côtés (ordre alterné à chaque série). */
export function partsOf(ex, setIndex) {
  if (ex.parts) return ex.parts;
  if (!ex.sides) return null;
  return setIndex % 2 ? ex.sides.slice().reverse() : ex.sides;
}

/** Objectif affiché en grand : « 6–10 » + « reps par jambe ». */
export function goalOf(ex) {
  if (ex.hold) return { big: ex.hold[0] + '–' + ex.hold[1], small: 'secondes de gainage' };
  const m = String(ex.reps || '').match(/^([\d\s\-–]+)(.*)$/);
  if (!m) return { big: String(ex.reps || ''), small: '' };
  return { big: m[1].trim().replace('-', '–'), small: ('reps ' + m[2].trim()).trim() };
}

/** Haut de la fourchette de répétitions (« 6-10 par jambe » → 10), 0 si l'exercice est en durée. */
export function topReps(ex) {
  if (!ex.reps || ex.hold || /\d\s*s\b/.test(ex.reps)) return 0;
  const m = ex.reps.match(/\d+/g);
  return m ? +(m[1] || m[0]) : 0;
}

/** Durée indicative en minutes, échauffement compris (c'est une estimation, affichée avec « ≈ »). */
export function estimateMinutes(program, session, tours) {
  if (!isCircuit(program)) {
    if (session.dur) return session.dur;
    // séance personnalisée : environ 40 s d'effort par série (par côté pour un exercice unilatéral) + les repos
    const sec = session.exos.reduce((a, ex) => a + ex.sets * ((ex.sides ? 2 : 1) * (ex.hold ? ex.hold[1] : 40) + (ex.sides ? ex.sideRest || 0 : 0) + (ex.restS || 0)), 0);
    return session.exos.length ? Math.round(sec / 60 + (session.warm ? session.warm.min : 0)) : 0;
  }
  const P = program.params;
  const n = session.exos.length;
  const sec = tours * n * (P.work + P.rest) + (tours - 1) * P.restTour;
  return Math.round(sec / 60 + (session.warm ? session.warm.min : 0));
}

/** Vérifie la cohérence des données d'un programme. Renvoie la liste des problèmes (vide = tout va bien). */
export function validateProgram(program) {
  const errs = [];
  const need = (ok, msg) => ok || errs.push(program.key + ' : ' + msg);
  need(['sets', 'circuit'].includes(program.mode), 'mode inconnu ' + program.mode);
  need(Number.isInteger(program.goal) && program.goal > 0, 'objectif hebdomadaire invalide');
  need(Array.isArray(program.seances) && program.seances.length > 0, 'aucune séance');
  if (isCircuit(program)) {
    const P = program.params || {};
    for (const f of ['work', 'rest', 'restTour', 'tours']) need(P[f] > 0, 'params.' + f + ' manquant');
  }
  const ids = new Map();
  const sids = new Set();
  for (const se of program.seances || []) {
    need(se.id && !sids.has(se.id), 'identifiant de séance manquant ou en double : ' + se.id);
    sids.add(se.id);
    for (const f of ['short', 'title', 'sub']) need(typeof se[f] === 'string' && se[f], se.id + ' : ' + f + ' manquant');
    need(se.warm && Array.isArray(se.warm.steps), se.id + ' : échauffement manquant');
    for (const w of (se.warm && se.warm.steps) || []) {
      need(FIGURES[w.k], se.id + ' : figure inconnue « ' + w.k + ' » (échauffement)');
      need(w.n && w.dose && w.how, se.id + ' : étape d’échauffement incomplète (' + w.k + ')');
      need(w.s == null || w.s > 0, se.id + ' : durée d’échauffement invalide (' + w.k + ')');
    }
    need(Array.isArray(se.exos) && se.exos.length > 0, se.id + ' : aucun exercice');
    for (const ex of se.exos || []) {
      const at = se.id + '/' + ex.id;
      need(ex.id, se.id + ' : exercice sans identifiant');
      const other = ids.get(ex.id);
      need(!other || other === ex.n, at + ' : identifiant réutilisé pour un autre exercice');
      ids.set(ex.id, ex.n);
      need(FIGURES[ex.k], at + ' : figure inconnue « ' + ex.k + ' »');
      need(EXERCISES[ex.k], at + ' : fiche d’exercice inconnue « ' + ex.k + ' »');
      const sh = sheetOf(ex);
      need(sh.steps.length > 0 && sh.muscles, at + ' : consignes ou muscles manquants');
      if (!isCircuit(program)) {
        need(Number.isInteger(ex.sets) && ex.sets > 0, at + ' : nombre de séries invalide');
        need(ex.restS > 0, at + ' : repos (restS) manquant');
        need(ex.hold || ex.reps, at + ' : objectif (reps ou hold) manquant');
        if (ex.hold) need(ex.hold.length === 2 && ex.hold[0] > 0 && ex.hold[0] < ex.hold[1], at + ' : hold invalide');
        if (ex.sides) need(ex.sides.length === 2 && ex.sides.every((p) => p.n), at + ' : côtés invalides');
        if (ex.sideRest != null) need(ex.sides && ex.sideRest > 0, at + ' : sideRest sans côtés');
        for (const p of ex.parts || []) {
          need(p.n, at + ' : partie de superset sans nom');
          need(!p.k || FIGURES[p.k], at + ' : figure inconnue « ' + p.k + ' » (superset)');
        }
      }
    }
  }
  return errs;
}
