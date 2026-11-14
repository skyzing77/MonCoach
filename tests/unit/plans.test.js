/* Programmes personnalisés, format v3, retour possible vers la version 2, nouvelles statistiques. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { PROGRAMS } from '../../src/data/programs/index.js';
import { EXERCISES, addable } from '../../src/data/exercises.js';
import { validateProgram, exerciseIndex, allExercises } from '../../src/core/program.js';
import { Store, normalize, exportPayload, SCHEMA } from '../../src/core/store.js';
import { Workout, buildEntry } from '../../src/core/workout.js';
import * as P from '../../src/core/plans.js';
import * as st from '../../src/core/stats.js';
import { FakeStorage, clock, legacyAxel } from './helpers.js';

const axel = PROGRAMS.axel;
const coralie = PROGRAMS.coralie;

const customAxel = () => {
  const plan = P.duplicatePlan(axel, { name: 'Axel hiver', now: 1_700_000_000_000 });
  plan.seances[0].exos.splice(1, 1); // retire le soulevé de terre roumain
  plan.seances[0].exos.push(P.exerciseFor('pushf', axel, 'sets'));
  return P.cleanPlan(plan);
};

test('copie d’un programme : identifiants d’exercices conservés, nouvelles séances, programme valide', () => {
  const plan = P.duplicatePlan(axel, { now: 1_700_000_000_000 });
  assert.match(plan.id, /^p/);
  assert.equal(plan.from, 'axel');
  assert.deepEqual(plan.seances.map((s) => s.id), [plan.id + '-s1', plan.id + '-s2']);
  assert.deepEqual(allExercises(plan).map((e) => e.id), allExercises(axel).map((e) => e.id), 'l’historique reste rattaché');
  assert.deepEqual(P.planErrors(axel, plan), []);
  const prog = P.effectiveProgram(axel, [plan], plan.id);
  assert.equal(prog.plan, plan.id);
  assert.equal(prog.key, 'axel', 'même clé de stockage : même historique');
  assert.deepEqual(validateProgram(prog), []);
  // le superset et les exercices unilatéraux sont copiés à l'identique
  const curl = allExercises(plan).find((e) => e.id === 'curl');
  assert.equal(curl.parts.length, 3);
  assert.equal(allExercises(plan).find((e) => e.id === 'bulg').sideRest, 30);
  // circuit
  const c = P.duplicatePlan(coralie);
  assert.equal(c.mode, 'circuit');
  assert.deepEqual(c.params, coralie.params);
  assert.deepEqual(P.planErrors(coralie, c), []);
});

test('ajout depuis la bibliothèque : identifiant = clé, prescription proposée, copie fidèle de l’exercice de base', () => {
  for (const k of addable()) {
    const e = P.exerciseFor(k, axel, 'sets');
    assert.equal(e.id, k);
    const plan = P.newPlan(axel);
    plan.seances[0].exos.push(e);
    assert.deepEqual(P.planErrors(axel, P.cleanPlan(plan)), [], k);
    const c = P.newPlan(coralie, { mode: 'circuit' });
    c.seances[0].exos.push(P.exerciseFor(k, coralie, 'circuit'));
    assert.deepEqual(P.planErrors(coralie, P.cleanPlan(c)), [], k + ' (circuit)');
  }
  const calf = P.exerciseFor('calf', axel, 'sets');
  assert.equal(calf.sides[0].n, 'Pied gauche', 'copie de l’exercice du programme de base');
  assert.ok(calf.load, 'consignes propres au programme reprises');
  const plank = P.exerciseFor('plank', coralie, 'sets');
  assert.deepEqual(plank.hold, [30, 45]);
  assert.ok(plank.noLoad);
});

test('programme vide ou incomplet : refusé à l’usage, le programme de base reste actif', () => {
  const plan = P.newPlan(axel, { name: 'Vide' });
  assert.deepEqual(P.planErrors(axel, plan), ['La séance « Séance 1 » n’a aucun exercice.']);
  const prog = P.effectiveProgram(axel, [plan], plan.id);
  assert.equal(prog.plan, '', 'retour au programme de base');
  assert.equal(prog.seances, axel.seances);
});

test('nettoyage : données hostiles ou abîmées écartées, champs bornés, rien n’est exécuté', () => {
  assert.equal(P.cleanPlan(null), null);
  assert.equal(P.cleanPlan({ id: 'x' }), null);
  assert.equal(P.cleanPlan({ id: 'p123', seances: [] }), null);
  const p = P.cleanPlan({
    id: 'p123',
    name: '<img src=x onerror=alert(1)>'.repeat(10),
    mode: 'bizarre',
    goal: 99,
    seances: [
      { id: 'p123-s1', title: 'A', exos: [{ id: 'bench', k: 'bench', sets: 99, restS: 'x', reps: 12 }, { id: 'bench', k: 'bench' }, { id: '../x', k: 'bench' }, { id: 'zz', k: 'inconnu' }], warm: { steps: [{ k: 'knee', n: 'x', dose: 'y', how: 'z', s: -4 }, { k: 'nope' }] } },
      { id: 'p123-s1', title: 'doublon' },
    ],
    __proto__: { polluted: 1 },
  });
  assert.equal(p.name.length, 60);
  assert.equal(p.mode, 'sets');
  assert.equal(p.goal, 2);
  assert.equal(p.seances.length, 1);
  assert.deepEqual(p.seances[0].exos.map((e) => e.id), ['bench']);
  assert.equal(p.seances[0].exos[0].sets, 3, 'nombre de séries hors bornes remplacé');
  assert.equal(p.seances[0].exos[0].restS, 90);
  assert.equal(p.seances[0].exos[0].reps, '12');
  assert.equal(p.seances[0].warm.steps.length, 1);
  assert.equal(p.seances[0].warm.steps[0].s, undefined);
  assert.equal(({}).polluted, undefined);
});

test('édition : ajout, copie, déplacement de séances et d’exercices', () => {
  const plan = P.duplicatePlan(axel);
  const se = P.addSession(plan, 'Bras');
  assert.equal(se.id, plan.id + '-s3');
  const cp = P.copySession(plan, plan.seances[0]);
  assert.equal(plan.seances[1], cp);
  assert.notEqual(cp.id, plan.seances[0].id);
  assert.ok(P.move(plan.seances, 1, -1));
  assert.equal(plan.seances[0], cp);
  assert.equal(P.move(plan.seances, 0, -1), false);
  assert.equal(new Set(plan.seances.map((s) => s.id)).size, plan.seances.length);
});

test('stockage des programmes : clé séparée, illisible mis de côté, fusion entre deux onglets', () => {
  const storage = new FakeStorage();
  const a = new P.PlanStore({ base: axel, storage });
  assert.equal(a.load(), 'empty');
  const p1 = a.put(customAxel());
  assert.ok(p1);
  assert.ok(a.setActive(p1.id));
  assert.ok(storage.getItem('sport:axel:plans'));
  assert.equal(storage.getItem('sport:axel'), null, 'la clé principale n’est pas touchée');

  // second onglet : crée un autre programme pendant que le premier en supprime un
  const b = new P.PlanStore({ base: axel, storage });
  assert.equal(b.load(), 'ok');
  assert.equal(b.active, p1.id);
  const p2 = b.put(P.duplicatePlan(coralie));
  assert.ok(p2);
  a.remove(p1.id);
  assert.deepEqual(a.plans.map((p) => p.id), [p2.id], 'ajout de l’autre onglet conservé, suppression locale appliquée');
  assert.equal(a.active, '');
  assert.ok(b.absorb(storage.getItem('sport:axel:plans')));
  assert.deepEqual(b.plans.map((p) => p.id), [p2.id]);

  // données partiellement illisibles : le reste est chargé, l'illisible est conservé à part
  const bad = new FakeStorage({ 'sport:axel:plans': JSON.stringify({ plans: [{ id: 'nope' }, customAxel()], active: 'nope' }) });
  const c = new P.PlanStore({ base: axel, storage: bad });
  assert.equal(c.load(), 'partial');
  assert.equal(c.plans.length, 1);
  assert.equal(c.active, '');
  assert.match(bad.getItem('sport:axel:plans-illisible'), /nope/);
  const broken = new FakeStorage({ 'sport:axel:plans': '{oops' });
  assert.equal(new P.PlanStore({ base: axel, storage: broken }).load(), 'reset');
  assert.equal(broken.getItem('sport:axel:plans-illisible'), '{oops');
  assert.equal(broken.getItem('sport:axel:plans'), '{oops', 'jamais écrasé sans modification de l’utilisateur');
});

test('changement de programme : historique et brouillons des autres séances conservés', () => {
  const storage = new FakeStorage({ 'sport:axel': JSON.stringify(legacyAxel()) });
  const s = new Store({ program: axel, storage, delay: 0 });
  s.load();
  const n = s.state.history.length;
  const draftS1 = JSON.stringify(s.state.drafts.s1);
  const plan = customAxel();
  const prog = P.effectiveProgram(axel, [plan], plan.id);
  s.setProgram(prog);
  assert.equal(s.state.history.length, n);
  assert.equal(JSON.stringify(s.state.drafts.s1), draftS1, 'brouillon d’une séance du programme de base gardé');
  assert.equal(s.state.cur, prog.seances[0].id);
  assert.deepEqual(s.state.history.map((h) => h.sid), ['s1', 's2', 's1'], 'séance d’origine conservée');
  // l'historique du programme de base reste lisible : le soulevé de terre (retiré du programme) est encore connu
  const idx = exerciseIndex(prog);
  assert.equal(idx.of({ xid: 'rdl', ex: '' }).id, 'rdl');
  assert.ok(st.records(s.state.history, prog).some((r) => r.ex.id === 'rdl'));
  // une séance faite avec le programme personnalisé est marquée comme telle
  const now = clock();
  const d = s.draft(prog.seances[0].id, {});
  const w = new Workout({ program: prog, session: prog.seances[0], draft: d, now });
  while (w.step.k !== 'set') w.done();
  w.done({ r: '8', k: '14' });
  const e = buildEntry(prog, prog.seances[0], d, now());
  assert.equal(e.pid, plan.id);
  assert.equal(e.sid, prog.seances[0].id);
  s.addEntry(e);
  s.setProgram(axel);
  assert.equal(s.state.history.find((h) => h.id === e.id).pid, plan.id);
  assert.equal(s.state.history.find((h) => h.id === e.id).sid, prog.seances[0].id);
});

test('format v3 : copie brute des données v2 avant migration, fichier relisible par la version 2', () => {
  const v2 = normalize(legacyAxel(), axel);
  v2.v = 2;
  delete v2.opt.kgStep;
  const raw = JSON.stringify(v2);
  const storage = new FakeStorage({ 'sport:axel': raw });
  const s = new Store({ program: axel, storage });
  assert.equal(s.load(), 'migrated');
  assert.equal(storage.getItem('sport:axel:backup-v2'), raw, 'copie exacte');
  assert.equal(storage.getItem('sport:axel:backup-v1'), null);
  const written = JSON.parse(storage.getItem('sport:axel'));
  assert.equal(written.v, SCHEMA);
  assert.equal(written.opt.kgStep, 1);
  // second chargement : la copie n'est jamais réécrite
  new Store({ program: axel, storage }).load();
  assert.equal(storage.getItem('sport:axel:backup-v2'), raw);
  // relecture par les règles de la version 2 : mêmes champs, mêmes types, rien de requis ne manque
  for (const k of ['history', 'drafts', 'rides', 'cur', 'opt', 'exp', 'expN', 'uns', 'mt']) assert.ok(k in written, k);
  for (const h of written.history) for (const f of ['id', 'date', 'sid', 'short', 'title', 'rows', 'note', 'vol', 'dur', 'at']) assert.ok(f in h, f);
  assert.equal(typeof written.mute, 'boolean');
});

test('sauvegarde : les programmes personnalisés sont exportés et réimportés sans doublon', () => {
  const plan = customAxel();
  const state = normalize(legacyAxel(), axel);
  const payload = exportPayload(state, axel, { plans: [plan], active: plan.id });
  assert.equal(payload.v, 3);
  assert.equal(payload.plans.plans[0].id, plan.id);
  assert.equal(exportPayload(state, axel, { plans: [] }).plans, undefined);
  const storage = new FakeStorage();
  const ps = new P.PlanStore({ base: axel, storage });
  assert.equal(ps.importPlans(JSON.parse(JSON.stringify(payload)).plans.plans), 1);
  assert.equal(ps.importPlans(payload.plans.plans), 0, 'déjà présent');
  assert.equal(ps.active, '', 'un import n’active rien');
});

/* ---------- Statistiques V3 ---------- */

const day0 = '2026-11-14';
const entry = (id, date, rows, dur = 45, sid = 's1') => ({ id, date, sid, short: '', title: '', tours: 0, rows, note: '', vol: 0, dur, at: 0 });
const R = (xid, sets) => ({ ex: xid, xid, sets });

test('records battus : chronologie, première valeur non comptée, superset suivi partie par partie', () => {
  const H = [
    entry('a', '2026-10-01', [R('bench', [{ r: '8', k: '16' }]), R('curl', [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '12', k: '10' }, { r: '12', k: '8' }] }])]),
    entry('b', '2026-10-08', [R('bench', [{ r: '8', k: '18' }]), R('curl', [{ r: '12', k: '7', p: [{ r: '12', k: '7' }, { r: '12', k: '10' }, { r: '12', k: '8' }] }])]),
    entry('c', '2026-11-10', [R('bench', [{ r: '6', k: '18' }]), R('curl', [{ r: '10', k: '7', p: [{ r: '10', k: '7' }, { r: '10', k: '12' }, { r: '10', k: '8' }] }])]),
  ];
  const ev = st.recordEvents(H, axel);
  assert.deepEqual(ev.map((e) => [e.date, e.key, e.v, e.old]), [
    ['2026-10-08', 'bench', 18, 16],
    ['2026-10-08', 'curl#0', 7, 6],
    ['2026-11-10', 'curl#1', 12, 10],
  ]);
  const rec = Object.fromEntries(st.records(H, axel).map((r) => [r.key, r]));
  assert.equal(rec['curl#1'].v, 12, 'curl marteau : 12 kg (et non le maximum du superset)');
  assert.equal(rec['curl#0'].v, 7, 'élévations latérales');
  assert.equal(rec['curl#0'].name, 'Élévations latérales');
  assert.equal(rec.bench.reps, 8, 'à charge égale, le plus de reps');
  const sum = st.sessionSummary(H.slice(0, 2), axel, axel.seances[1], H[2].rows);
  assert.deepEqual(sum.recs.map((r) => r.name), ['Curl marteau']);
});

test('périodes, comparaison, mois, groupes musculaires, tableau de bord', () => {
  const H = [
    entry('a', '2026-09-20', [R('bench', [{ r: '8', k: '16' }, { r: '8', k: '16' }])], 40),
    entry('b', '2026-10-25', [R('bulg', [{ r: '8', k: '12' }]), R('row', [{ r: '10', k: '20' }])], 50),
    entry('c', '2026-11-10', [R('bench', [{ r: '8', k: '18' }]), R('plank', [{ r: '40', k: '' }])], 0),
    entry('d', '2026-11-12', [R('curl', [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '12', k: '10' }, { r: '12', k: '8' }] }])], 30, 's2'),
  ];
  const b = st.periodBounds(28, day0);
  assert.deepEqual(b, { from: '2026-10-18', to: day0, prevFrom: '2026-09-20', prevTo: '2026-10-17' });
  const cur = st.periodStats(H, b.from, b.to);
  assert.equal(cur.n, 3);
  assert.equal(cur.avgDur, 40, 'durée inconnue (0) exclue de la moyenne');
  assert.equal(cur.durN, 2);
  assert.equal(cur.sets, 2 + 2 + 3);
  assert.equal(st.periodStats(H, b.prevFrom, b.prevTo).n, 1);
  const months = st.monthlySeries(H, 3, day0);
  assert.deepEqual(months.map((m) => [m.month, m.n]), [['2026-09', 1], ['2026-10', 1], ['2026-11', 2]]);
  const g = Object.fromEntries(st.groupSets(H, axel, b.from, b.to).map((x) => [x.group, x.sets]));
  assert.deepEqual(g, { legs: 1, back: 1, chest: 1, core: 1, shoulders: 1, arms: 2 });
  const ins = st.insights(H, axel, day0);
  assert.equal(ins.last.id, 'd');
  assert.equal(ins.daysSince, 2);
  assert.equal(ins.lastSets, 1);
  assert.deepEqual(ins.records.map((r) => r.key), ['bench']);
  assert.equal(st.insights([], axel, day0), null, 'aucune donnée : rien d’inventé');
});

test('chaque exercice ajoutable a une figure et un groupe utilisable par les statistiques', () => {
  for (const k of addable()) assert.ok(EXERCISES[k].group !== 'warm', k);
});
