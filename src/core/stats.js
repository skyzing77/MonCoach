/* Statistiques calculées à partir de l'historique (fonctions pures).
   Tout ce qui est affiché vient de valeurs saisies par l'utilisateur : aucune estimation (calories, 1RM…) n'est produite. */
import { num, weekStart, addDays, today as todayStr, dayDate, ymd, daysBetween } from './util.js';
import { exerciseIndex, unitOf, topReps, trackedExercises, isCircuit, sheetOf, displayName } from './program.js';
import { EXERCISES } from '../data/exercises.js';
import { volumeOf } from './store.js';

/** Historique du plus récent au plus ancien. */
export const sorted = (history) =>
  history.slice().sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if ((a.at || 0) !== (b.at || 0)) return (b.at || 0) - (a.at || 0);
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  });

/** Nombre de séances par semaine (clé = lundi). */
export function weekCounts(history) {
  const c = {};
  for (const h of history) {
    const w = weekStart(h.date);
    c[w] = (c[w] || 0) + 1;
  }
  return c;
}

/** Séances de la semaine en cours et nombre de semaines consécutives où l'objectif est atteint
    (la semaine en cours ne casse pas la série tant qu'elle n'est pas terminée). */
export function weekStats(history, goal, day = todayStr()) {
  const c = weekCounts(history);
  let w = weekStart(day);
  const n = c[w] || 0;
  let streak = 0;
  for (let i = 0; i < 520; i++) {
    if ((c[w] || 0) >= goal) streak++;
    else if (i > 0) break;
    w = addDays(w, -7);
  }
  return { n, streak };
}

/** Séances par semaine sur les n dernières semaines (de la plus ancienne à la semaine en cours). */
export function weeklySeries(history, n = 12, day = todayStr()) {
  const c = weekCounts(history);
  const cur = weekStart(day);
  return Array.from({ length: n }, (_, i) => {
    const w = addDays(cur, -7 * (n - 1 - i));
    return { week: w, n: c[w] || 0 };
  });
}

/** Grille d'un mois : semaines de 7 jours (lundi → dimanche), null hors du mois. */
export function monthGrid(year, month) {
  const first = new Date(year, month, 1, 12);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => {
    const d = i - lead + 1;
    return d >= 1 && d <= days ? ymd(new Date(year, month, d, 12)) : null;
  });
  return cells;
}

/** Séance conseillée : celle qui suit la dernière séance enregistrée. */
export function nextSession(program, history) {
  const last = sorted(history)[0];
  if (!last) return program.seances[0];
  const i = program.seances.findIndex((s) => s.id === last.sid || s.short === last.short);
  return program.seances[(i + 1) % program.seances.length];
}

/** Nombre de séries par défaut d'un circuit : celui du programme, puis 3 à partir de la 3ᵉ semaine d'entraînement. */
export function defaultTours(program, history) {
  if (!isCircuit(program)) return 0;
  return new Set(history.map((h) => weekStart(h.date))).size >= 2 ? Math.max(3, program.params.tours) : program.params.tours;
}

/** Séries « à plat » d'une ligne : les parties d'un superset comptent chacune. */
const flatSets = (row) => row.sets.flatMap((s) => (s.p && s.p.length ? s.p : [s]));

/** Séries d'une partie de superset (part = index), ou de toute la ligne (part = null). */
const setsOf = (row, part) => (part == null ? flatSets(row) : row.sets.map((s) => (s.p && s.p[part]) || (part === 0 ? s : null)).filter(Boolean));

/** Ce qu'on suit dans les statistiques : chaque exercice connu du profil, et chaque partie d'un superset séparément
    (comparer la charge des élévations latérales à celle du curl n'aurait aucun sens).
    → [{ key, ex, part, name, k }] */
export function trackables(program) {
  const out = [];
  for (const ex of trackedExercises(program)) {
    if (ex.parts && ex.parts.length) {
      ex.parts.forEach((p, j) => out.push({ key: ex.id + '#' + j, ex, part: j, name: p.n, k: p.k || ex.k }));
    } else out.push({ key: ex.id, ex, part: null, name: displayName(ex), k: ex.k });
  }
  return out;
}

/** Meilleure valeur d'une ligne : charge max (et les reps faites à cette charge), sinon durée ou reps max. */
export function bestOf(row, ex, part = null) {
  const sets = setsOf(row, part);
  const kg = Math.max(0, ...sets.map((s) => num(s.k)));
  if (kg > 0) {
    const reps = Math.max(0, ...sets.filter((s) => num(s.k) === kg).map((s) => num(s.r)));
    return { v: kg, u: 'kg', reps };
  }
  return { v: Math.max(0, ...sets.map((s) => num(s.r))), u: unitOf(ex, row.ex), reps: 0 };
}

/** Lignes d'historique d'un exercice, de la plus ancienne à la plus récente : [{ date, row, best }]. */
export function seriesOf(history, program, ex, part = null) {
  const idx = exerciseIndex(program);
  const out = [];
  for (const h of sorted(history).reverse()) {
    const row = h.rows.find((r) => idx.of(r) === ex);
    if (!row) continue;
    const sets = setsOf(row, part);
    const reps = sets.reduce((a, z) => a + num(z.r), 0);
    out.push({ date: h.date, id: h.id, row, best: bestOf(row, ex, part), reps, vol: sets.reduce((a, z) => a + num(z.r) * num(z.k), 0) });
  }
  return out;
}

/** Dernière ligne enregistrée pour un exercice (ou null). */
export function lastRow(history, program, ex) {
  const idx = exerciseIndex(program);
  for (const h of sorted(history)) {
    const row = h.rows.find((r) => idx.of(r) === ex);
    if (row) return { date: h.date, row };
  }
  return null;
}

const better = (p, top) => !top || p.best.v > top.best.v || (p.best.v === top.best.v && p.best.reps > top.best.reps);

/** Records personnels : meilleure valeur dans l'unité la plus récente utilisée, pour chaque élément suivi. */
export function records(history, program) {
  const out = [];
  for (const tr of trackables(program)) {
    const pts = seriesOf(history, program, tr.ex, tr.part).filter((p) => p.best.v > 0);
    if (!pts.length) continue;
    const u = pts[pts.length - 1].best.u;
    let top = null;
    for (const p of pts) if (p.best.u === u && better(p, top)) top = p;
    out.push({ ex: tr.ex, part: tr.part, name: tr.name, key: tr.key, k: tr.k, v: top.best.v, u, reps: top.best.reps, date: top.date, n: pts.length });
  }
  return out;
}

/** Records battus, dans l'ordre chronologique : une séance bat un record quand sa meilleure valeur dépasse toutes
    les précédentes (même unité). La toute première valeur d'un exercice n'est pas un record « battu ». */
export function recordEvents(history, program) {
  const out = [];
  for (const tr of trackables(program)) {
    let top = null;
    for (const p of seriesOf(history, program, tr.ex, tr.part)) {
      if (p.best.v <= 0) continue;
      if (top && top.best.u !== p.best.u) top = null; // changement d'unité : nouvelle référence
      if (top && p.best.v > top.best.v) out.push({ date: p.date, id: p.id, ex: tr.ex, part: tr.part, name: tr.name, key: tr.key, k: tr.k, v: p.best.v, u: p.best.u, reps: p.best.reps, old: top.best.v });
      if (better(p, top)) top = p;
    }
  }
  return out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

/* ---------- Périodes ---------- */

/** Chiffres d'une période [from, to] (jours inclus). Seules les durées réellement mesurées comptent. */
export function periodStats(history, from, to) {
  const list = history.filter((h) => h.date >= from && h.date <= to);
  const durs = list.map((h) => h.dur).filter((d) => d > 0);
  let sets = 0;
  let reps = 0;
  for (const h of list) for (const r of h.rows) for (const z of flatSets(r)) {
    sets++;
    reps += num(z.r);
  }
  return {
    n: list.length,
    min: durs.reduce((a, d) => a + d, 0),
    durN: durs.length,
    avgDur: durs.length ? Math.round(durs.reduce((a, d) => a + d, 0) / durs.length) : 0,
    sets,
    reps,
    vol: volumeOf(list.flatMap((h) => h.rows)),
    days: new Set(list.map((h) => h.date)).size,
  };
}

/** Période qui se termine aujourd'hui et la période précédente de même longueur. */
export function periodBounds(days, day = todayStr()) {
  const from = addDays(day, -(days - 1));
  return { from, to: day, prevFrom: addDays(from, -days), prevTo: addDays(from, -1) };
}

/** Séances par mois sur les n derniers mois (du plus ancien au mois en cours). */
export function monthlySeries(history, n = 12, day = todayStr()) {
  const c = {};
  for (const h of history) c[h.date.slice(0, 7)] = (c[h.date.slice(0, 7)] || 0) + 1;
  const [y, m] = day.split('-').map(Number);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(y, m - 1 - (n - 1 - i), 1, 12);
    const key = ymd(d).slice(0, 7);
    const list = history.filter((h) => h.date.startsWith(key));
    const durs = list.map((h) => h.dur).filter((x) => x > 0);
    return { month: key, n: c[key] || 0, avgDur: durs.length ? Math.round(durs.reduce((a, x) => a + x, 0) / durs.length) : 0 };
  });
}

/** Séries réalisées par groupe musculaire sur une période (exercices reconnus seulement ; une partie de superset
    compte pour le groupe de son propre exercice). → [{ group, sets }] trié décroissant. */
export function groupSets(history, program, from, to) {
  const idx = exerciseIndex(program);
  const c = {};
  for (const h of history) {
    if (h.date < from || h.date > to) continue;
    for (const r of h.rows) {
      const ex = idx.of(r);
      if (!ex) continue;
      if (ex.parts && ex.parts.length) {
        r.sets.forEach((s) => ex.parts.forEach((p, j) => {
          const g = (EXERCISES[p.k] || {}).group || sheetOf(ex).group;
          if (s.p ? s.p[j] : j === 0) c[g] = (c[g] || 0) + 1;
        }));
      } else {
        const g = sheetOf(ex).group;
        c[g] = (c[g] || 0) + r.sets.length;
      }
    }
  }
  return Object.entries(c).filter(([g]) => g !== 'warm').map(([group, sets]) => ({ group, sets })).sort((a, b) => b.sets - a.sets);
}

/** Informations utiles du tableau de bord, calculées uniquement à partir de l'historique (null si rien). */
export function insights(history, program, day = todayStr()) {
  if (!history.length) return null;
  const H = sorted(history);
  const last = H[0];
  const prevSame = H.slice(1).find((h) => (h.sid && h.sid === last.sid) || (!h.sid && h.short === last.short));
  const vol = volumeOf(last.rows);
  const prevVol = prevSame ? volumeOf(prevSame.rows) : 0;
  const ev = recordEvents(history, program);
  // records des 30 derniers jours, le plus récent d'abord, un seul par exercice (le dernier battu)
  const seen = new Set();
  const recent = ev.filter((e) => daysBetween(e.date, day) <= 30).reverse().filter((e) => !seen.has(e.key) && seen.add(e.key));
  const b28 = periodBounds(28, day);
  return {
    last,
    lastSets: last.rows.reduce((a, r) => a + r.sets.length, 0),
    lastVol: vol,
    lastDelta: prevSame && prevVol && vol ? Math.round(vol - prevVol) : null,
    daysSince: daysBetween(last.date, day),
    records: recent,
    lastRecord: ev[ev.length - 1] || null,
    cur: periodStats(history, b28.from, b28.to),
    prev: periodStats(history, b28.prevFrom, b28.prevTo),
  };
}

/** Suggestion de progression (double progression) à partir de la dernière séance réellement enregistrée. */
export function suggestion(program, ex, last) {
  if (!last || isCircuit(program)) return null;
  const sets = last.row.sets;
  const top = topReps(ex);
  const kg = Math.max(0, ...sets.map((s) => num(s.k)));
  if (top && kg && sets.length >= ex.sets && sets.every((s) => num(s.r) >= top)) {
    return 'Haut de la fourchette atteint sur toutes les séries à ' + String(kg).replace('.', ',') + ' kg : essaie la charge supérieure.';
  }
  if (ex.hold && sets.length >= ex.sets && sets.every((s) => num(s.r) >= ex.hold[1])) {
    return 'Durée maximale tenue sur toutes les séries : passe à une variante plus difficile (voir la fiche).';
  }
  return null;
}

/** Résumé d'une séance en cours par rapport à l'historique : volume, écart avec la séance précédente, nouveaux records. */
export function sessionSummary(history, program, session, rows) {
  const idx = exerciseIndex(program);
  const vol = volumeOf(rows);
  const sets = rows.reduce((a, r) => a + r.sets.length, 0);
  const prev = sorted(history).find((h) => h.sid === session.id || h.short === session.short);
  const prevVol = prev ? volumeOf(prev.rows) : 0;
  const recs = [];
  for (const row of rows) {
    const ex = idx.of(row);
    if (!ex) continue;
    const parts = ex.parts && ex.parts.length ? ex.parts.map((p, j) => [j, p.n]) : [[null, displayName(ex)]];
    for (const [part, name] of parts) {
      const b = bestOf(row, ex, part);
      if (b.v <= 0) continue;
      let old = 0;
      for (const p of seriesOf(history, program, ex, part)) if (p.best.u === b.u && p.best.v > old) old = p.best.v;
      if (old > 0 && b.v > old) recs.push({ ex, part, name, v: b.v, u: b.u, old });
    }
  }
  return { vol, sets, delta: prev && prevVol && vol ? Math.round(vol - prevVol) : null, recs };
}

/** Jours écoulés depuis le dernier export (ou, à défaut, depuis la première séance). */
export function daysSinceExport(state, day = todayStr()) {
  const ref = state.exp || state.history.map((h) => h.date).sort()[0];
  return ref ? Math.max(0, Math.round((dayDate(day) - dayDate(ref)) / 864e5)) : 0;
}

/** Faut-il rappeler de sauvegarder ? (3 séances non exportées, ou une seule depuis plus de 3 semaines) */
export const backupDue = (state, day = todayStr()) => state.uns >= 3 || (state.uns > 0 && daysSinceExport(state, day) >= 21);
