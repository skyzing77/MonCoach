import test from 'node:test';
import assert from 'node:assert/strict';
import { PROGRAMS } from '../../src/data/programs/index.js';
import { normalize } from '../../src/core/store.js';
import * as st from '../../src/core/stats.js';
import { isDay, weekStart, addDays, num, fmtNum, mmss, restText, esc, daysBetween } from '../../src/core/util.js';
import { legacyAxel } from './helpers.js';

const axel = PROGRAMS.axel;
const coralie = PROGRAMS.coralie;
const H = () => normalize(legacyAxel(), axel).history;
const ex = (id) => axel.seances.flatMap((s) => s.exos).find((e) => e.id === id);

test('utilitaires : nombres, dates, durées, échappement', () => {
  assert.equal(num('12,5'), 12.5);
  assert.equal(num(' 8 reps'), 8);
  for (const v of ['', null, undefined, 'abc', '-3', NaN]) assert.equal(num(v), 0);
  assert.equal(fmtNum(12.5), '12,5');
  assert.equal(fmtNum(12), '12');
  assert.ok(isDay('2024-02-29'));
  for (const v of ['2023-02-29', '2026-13-01', '2026-1-1', 20260101, null, '2026-01-01T10:00']) assert.equal(isDay(v), false);
  assert.equal(weekStart('2026-11-13'), '2026-11-09', 'vendredi → lundi');
  assert.equal(weekStart('2026-11-15'), '2026-11-09', 'dimanche → lundi');
  assert.equal(weekStart('2026-11-09'), '2026-11-09');
  assert.equal(addDays('2026-03-28', 2), '2026-03-30', 'changement d’heure');
  assert.equal(addDays('2026-10-24', 2), '2026-10-26', 'changement d’heure');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(daysBetween('2026-01-01', '2026-01-31'), 30);
  assert.equal(mmss(125), '2:05');
  assert.equal(mmss(-4), '0:00');
  assert.equal(restText(105), '1 min 45');
  assert.equal(restText(60), '1 min');
  assert.equal(restText(45), '45 s');
  assert.equal(esc(`<b a="x" b='y'>&`), '&lt;b a=&quot;x&quot; b=&#39;y&#39;&gt;&amp;');
  assert.equal(esc(null), '');
});

test('tri de l’historique : du plus récent au plus ancien, stable le même jour', () => {
  const h = [{ id: 'a', date: '2026-01-01', at: 5 }, { id: 'b', date: '2026-01-03' }, { id: 'c', date: '2026-01-01', at: 9 }, { id: 'd', date: '2026-01-01' }];
  assert.deepEqual(st.sorted(h).map((x) => x.id), ['b', 'c', 'a', 'd']);
});

test('semaine en cours et série de semaines', () => {
  const h = (dates) => dates.map((date, i) => ({ id: 'h' + i, date, rows: [] }));
  // objectif 2 : semaines du 26/10 et du 02/11 atteintes, semaine en cours (09/11) à 1 séance
  const hist = h(['2026-10-26', '2026-10-28', '2026-11-02', '2026-11-05', '2026-11-10']);
  assert.deepEqual(st.weekStats(hist, 2, '2026-11-13'), { n: 1, streak: 2 }, 'la semaine en cours ne casse pas la série');
  assert.deepEqual(st.weekStats(hist.concat(h(['2026-11-12']).map((x) => ({ ...x, id: 'z' }))), 2, '2026-11-13'), { n: 2, streak: 3 });
  assert.deepEqual(st.weekStats(h(['2026-10-12', '2026-10-13']), 2, '2026-11-13'), { n: 0, streak: 0 }, 'série interrompue');
  assert.deepEqual(st.weekStats([], 1, '2026-11-13'), { n: 0, streak: 0 });
  const w = st.weeklySeries(hist, 4, '2026-11-13');
  assert.deepEqual(w.map((x) => [x.week, x.n]), [['2026-10-19', 0], ['2026-10-26', 2], ['2026-11-02', 2], ['2026-11-09', 1]]);
});

test('grille du calendrier', () => {
  const g = st.monthGrid(2026, 10); // novembre 2026 : commence un dimanche
  assert.equal(g.length % 7, 0);
  assert.equal(g.indexOf('2026-11-01'), 6);
  assert.equal(g.filter(Boolean).length, 30);
  assert.equal(st.monthGrid(2027, 1).filter(Boolean).length, 28);
});

test('séance conseillée et nombre de séries du circuit', () => {
  assert.equal(st.nextSession(axel, []).id, 's1');
  assert.equal(st.nextSession(axel, H()).id, 's2', 'dernière séance = S1 → S2 conseillée');
  assert.equal(st.nextSession(coralie, []).id, 'c1');
  assert.equal(st.defaultTours(axel, []), 0);
  assert.equal(st.defaultTours(coralie, []), 2);
  assert.equal(st.defaultTours(coralie, [{ date: '2026-11-02' }, { date: '2026-11-04' }]), 2, 'même semaine');
  assert.equal(st.defaultTours(coralie, [{ date: '2026-11-02' }, { date: '2026-11-10' }]), 3);
});

test('meilleure valeur, séries par exercice, records', () => {
  assert.deepEqual(st.bestOf({ ex: 'x', sets: [{ r: '8', k: '12' }, { r: '6', k: '14' }, { r: '5', k: '14' }] }, ex('bench')), { v: 14, u: 'kg', reps: 6 });
  assert.deepEqual(st.bestOf({ ex: 'x', sets: [{ r: '40', k: '' }, { r: '35', k: '' }] }, ex('plank')), { v: 40, u: 's', reps: 0 });
  assert.deepEqual(st.bestOf({ ex: 'x', sets: [{ r: '12', k: '' }] }, ex('dead')), { v: 12, u: 'reps', reps: 0 });
  assert.equal(st.bestOf({ ex: 'Gainage latéral', sets: [{ r: '30', k: '' }] }, null).u, 's', 'ancien exercice inconnu : unité déduite du nom');
  assert.deepEqual(st.bestOf({ ex: 'x', sets: [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '10', k: '10' }] }] }, ex('curl')), { v: 10, u: 'kg', reps: 10 });

  const s = st.seriesOf(H(), axel, ex('rdl'));
  assert.deepEqual(s.map((p) => [p.date, p.best.v]), [['2026-10-05', 16], ['2026-10-12', 18]]);
  assert.equal(st.lastRow(H(), axel, ex('rdl')).date, '2026-10-12');
  assert.equal(st.lastRow(H(), axel, ex('bench')), null);

  const rec = Object.fromEntries(st.records(H(), axel).map((r) => [r.ex.id, r]));
  assert.deepEqual([rec.rdl.v, rec.rdl.u, rec.rdl.reps, rec.rdl.date], [18, 'kg', 10, '2026-10-12']);
  assert.deepEqual([rec.bulg.v, rec.bulg.reps, rec.bulg.date], [12, 10, '2026-10-12'], 'même charge : le plus de reps gagne');
  assert.deepEqual([rec.plank.v, rec.plank.u], [40, 's']);
  assert.equal(rec.bench, undefined, 'pas de record sans donnée');
});

test('suggestion de progression (double progression)', () => {
  const last = (sets) => ({ date: '2026-01-01', row: { ex: 'x', sets } });
  const full = [1, 2, 3, 4].map(() => ({ r: '10', k: '12' }));
  assert.match(st.suggestion(axel, ex('bulg'), last(full)), /essaie la charge supérieure/);
  assert.equal(st.suggestion(axel, ex('bulg'), last(full.slice(0, 3))), null, 'toutes les séries doivent être faites');
  assert.equal(st.suggestion(axel, ex('bulg'), last([...full.slice(0, 3), { r: '9', k: '12' }])), null);
  assert.equal(st.suggestion(axel, ex('bulg'), null), null);
  assert.match(st.suggestion(axel, ex('plank'), last([{ r: '45', k: '' }, { r: '45', k: '' }, { r: '45', k: '' }])), /variante plus difficile/);
  assert.equal(st.suggestion(coralie, coralie.seances[0].exos[0], last(full)), null, 'pas de fourchette en circuit');
});

test('récapitulatif de fin de séance : volume, écart et nouveaux records mesurés', () => {
  const rows = [
    { ex: 'Soulevé de terre roumain aux haltères', xid: 'rdl', sets: [{ r: '10', k: '20' }, { r: '10', k: '20' }] },
    { ex: 'Fentes bulgares (pied arrière sur le banc)', xid: 'bulg', sets: [{ r: '8', k: '12' }] },
    { ex: 'Développé couché aux haltères', xid: 'bench', sets: [{ r: '8', k: '20' }] },
  ];
  const sum = st.sessionSummary(H(), axel, axel.seances[0], rows);
  assert.equal(sum.vol, 400 + 96 + 160);
  assert.equal(sum.sets, 4);
  assert.equal(sum.delta, 656 - (4 * 10 * 12 + (10 + 9 + 8 + 8) * 18), 'comparé à la dernière séance 1 (12/10), volume recalculé depuis les séries');
  assert.deepEqual(sum.recs.map((r) => [r.ex.id, r.v, r.old]), [['rdl', 20, 18]], 'record seulement s’il existe une valeur antérieure dépassée');
  const first = st.sessionSummary([], axel, axel.seances[0], rows);
  assert.equal(first.delta, null);
  assert.deepEqual(first.recs, []);
});

test('rappel de sauvegarde', () => {
  assert.equal(st.backupDue({ uns: 0, history: [], exp: '' }, '2026-11-13'), false);
  assert.equal(st.backupDue({ uns: 3, history: [], exp: '2026-11-12' }, '2026-11-13'), true);
  assert.equal(st.backupDue({ uns: 1, history: [{ date: '2026-11-10' }], exp: '' }, '2026-11-13'), false);
  assert.equal(st.backupDue({ uns: 1, history: [{ date: '2026-10-01' }], exp: '' }, '2026-11-13'), true);
  assert.equal(st.daysSinceExport({ exp: '2026-11-03', history: [] }, '2026-11-13'), 10);
});
