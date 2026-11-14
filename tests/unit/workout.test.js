import test from 'node:test';
import assert from 'node:assert/strict';
import { PROGRAMS } from '../../src/data/programs/index.js';
import { Workout, buildSteps, rowsOf, buildEntry, defaultValue, durationMin, PREP_MS } from '../../src/core/workout.js';
import { normalize } from '../../src/core/store.js';
import { clock } from './helpers.js';

const axel = PROGRAMS.axel;
const coralie = PROGRAMS.coralie;
const newDraft = (tours = 0) => ({ date: '2026-11-13', tours, sets: {}, note: '', t0: 0, t1: 0 });

function start(program, session, draft = newDraft(program.params ? program.params.tours : 0), now = clock()) {
  const cues = [];
  const changes = [];
  const w = new Workout({ program, session, draft, now, cue: (c) => cues.push(c), onChange: (k) => changes.push(k) });
  return { w, cues, changes, now, draft };
}
/** Avance l'horloge par pas de 250 ms en appelant tick(), comme le fait l'interface. */
function run(w, now, ms) {
  for (let t = 0; t < ms; t += 250) {
    now.advance(250);
    w.tick();
  }
}
const kinds = (steps) => steps.map((s) => s.k);

test('plan d’une séance en séries (Axel S1)', () => {
  const st = buildSteps(axel, axel.seances[0], 0);
  assert.equal(st.filter((s) => s.k === 'warm').length, 7);
  assert.equal(st.filter((s) => s.k === 'set').length, 22);
  assert.equal(st.filter((s) => s.k === 'rest').length, 1 + 21, 'repos après la série d’approche + entre les séries, pas après la dernière');
  assert.equal(st.at(-1).k, 'end');
  assert.equal(st.at(-2).k, 'set', 'pas de repos après la toute dernière série');
  const i = st.findIndex((s) => s.k === 'set');
  assert.deepEqual(st[i - 1], { k: 'rest', s: 75, after: 'warm' });
  assert.deepEqual(st[i + 1], { k: 'rest', s: 105, after: 'set' });
});

test('plan d’un circuit (Coralie)', () => {
  const st = buildSteps(coralie, coralie.seances[0], 2);
  assert.deepEqual(kinds(st.slice(0, 6)), ['warm', 'warm', 'warm', 'warm', 'warm', 'ready']);
  assert.equal(st.filter((s) => s.k === 'work').length, 14);
  const rests = st.filter((s) => s.k === 'rest');
  assert.equal(rests.length, 13);
  assert.equal(rests.filter((r) => r.s === 90 && r.after === 'tour').length, 1, 'un seul repos long entre les deux séries');
  assert.equal(rests.filter((r) => r.s === 20).length, 12);
  assert.equal(buildSteps(coralie, coralie.seances[0], 3).filter((s) => s.k === 'work').length, 21);
});

test('séance en séries complète : chaque série est validée et enregistrée', () => {
  const { w, now, draft, cues } = start(axel, axel.seances[1]); // S2 : sans exercice chronométré
  assert.equal(w.step.k, 'warm');
  assert.ok(draft.t0 > 0);
  let guard = 0;
  while (w.step.k !== 'end' && guard++ < 500) {
    const s = w.step;
    const ex = w.exOf();
    if (s.k === 'warm') {
      if (w.ph === 'wait') {
        w.launch();
        run(w, now, PREP_MS + s.s * 1000 + 500);
      } else w.done();
    } else if (s.k === 'rest') {
      run(w, now, s.s * 1000 + 500);
    } else if (s.k === 'set') {
      if (ex.parts) {
        w.partDone({ r: '12', k: '5' });
        w.partDone({ r: '11', k: '8' });
        w.done({ r: '10', k: '7' });
      } else if (ex.sides) {
        w.partDone({ r: '9', k: '10' });
        assert.equal(w.ph, 'side');
        run(w, now, ex.sideRest * 1000 + 500);
        assert.equal(w.ph, 'idle');
        w.done({ r: '9', k: '10' });
      } else w.done({ r: '8', k: ex.noLoad ? '' : '14' });
    }
  }
  assert.equal(w.step.k, 'end');
  assert.equal(w.doneCount, w.count);
  assert.equal(w.count, 23);
  assert.equal(w.progress, 1);
  assert.equal(cues.at(-1), 'end');
  const rows = rowsOf(axel, axel.seances[1], draft);
  assert.deepEqual(rows.map((r) => [r.xid, r.sets.length]), [['incl', 4], ['rowb', 4], ['ohp', 3], ['step', 3], ['hip', 3], ['curl', 3], ['dead', 3]]);
  assert.deepEqual(rows[5].sets[0], { r: '12', k: '5', p: [{ r: '12', k: '5' }, { r: '11', k: '8' }, { r: '10', k: '7' }] }, 'superset : une charge par exercice');
  assert.deepEqual(rows[6].sets[0], { r: '8', k: '' });
  const e = buildEntry(axel, axel.seances[1], draft, now());
  assert.equal(e.sid, 's2');
  assert.equal(e.date, '2026-11-13');
  assert.ok(e.dur > 20 && e.dur < 60, 'durée mesurée : ' + e.dur);
  assert.equal(e.vol, 4 * 8 * 14 + 4 * 8 * 14 + 3 * 8 * 14 + 3 * 9 * 10 + 3 * 8 * 14 + 3 * (60 + 88 + 70));
});

test('exercice unilatéral : ordre des côtés alterné, repos de changement de côté avec pause et +15 s', () => {
  const draft = newDraft();
  draft.sets[0] = [{ r: '8', k: '12', d: true }]; // 1ʳᵉ série de fentes déjà faite
  const { w, now, cues } = start(axel, axel.seances[0], draft);
  assert.deepEqual([w.step.k, w.step.x, w.step.i], ['set', 0, 1], 'reprise à la première série non faite');
  w.partDone({ r: '8', k: '12' });
  assert.equal(w.ph, 'side');
  assert.equal(cues.at(-1), 'rest');
  assert.equal(w.secondsLeft(), 30);
  now.advance(10_000);
  w.togglePause();
  assert.ok(w.paused);
  now.advance(60_000);
  w.tick();
  assert.equal(w.secondsLeft(), 20, 'le temps ne s’écoule pas en pause');
  w.add(15);
  assert.equal(w.secondsLeft(), 35, '+15 s pendant la pause est conservé');
  w.togglePause();
  run(w, now, 34_000);
  assert.equal(w.ph, 'side');
  run(w, now, 1_500);
  assert.equal(w.ph, 'idle');
  assert.equal(w.pt, 1);
  w.done({ r: '7', k: '12' });
  assert.deepEqual(draft.sets[0][1], { r: '7', k: '12', d: true });
  assert.equal(w.step.k, 'rest');
});

test('gainage : mise en place 3 s, chrono croissant, signal à l’objectif, arrêt automatique au maximum', () => {
  const draft = newDraft();
  const s1 = axel.seances[0];
  s1.exos.forEach((ex, x) => { if (!ex.hold) draft.sets[x] = Array.from({ length: ex.sets }, () => ({ r: '8', k: '10', d: true })); });
  const { w, now, cues } = start(axel, s1, draft);
  assert.equal(w.exOf().id, 'plank');
  assert.equal(w.ph, 'wait');
  w.done();
  assert.equal(w.exOf().id, 'plank', 'impossible de valider un gainage qui n’a pas été lancé');
  assert.equal(draft.sets[5], undefined);
  w.launch();
  assert.equal(w.ph, 'prep');
  assert.equal(w.secondsLeft(), 3);
  run(w, now, PREP_MS);
  assert.equal(w.ph, 'hold');
  assert.deepEqual(cues.slice(-4), ['tick', 'tick', 'tick', 'go']);
  run(w, now, 31_000);
  assert.equal(cues.at(-1), 'rest', 'signal quand le minimum (30 s) est atteint');
  assert.equal(w.holdElapsed(), 31);
  w.done(); // arrêt manuel à 31 s
  assert.deepEqual(draft.sets[5][0], { r: '31', k: '', d: true });
  assert.equal(w.step.k, 'rest');
  w.skip();
  w.launch();
  run(w, now, PREP_MS + 46_000);
  assert.deepEqual(draft.sets[5][1], { r: '45', k: '', d: true }, 'arrêt automatique à 45 s');
  // mise en arrière-plan pendant un gainage : le chrono est annulé, rien n'est enregistré
  w.skip();
  w.launch();
  run(w, now, PREP_MS + 5_000);
  w.interrupt();
  assert.equal(w.ph, 'wait');
  assert.ok(w.interrupted);
  now.advance(600_000);
  w.tick();
  assert.equal(draft.sets[5][2], undefined);
});

test('circuit complet : enchaînement automatique travail / repos, saisie facultative pendant le repos', () => {
  const { w, now, draft, cues } = start(coralie, coralie.seances[0]);
  let guard = 0;
  while (w.step.k !== 'ready' && guard++ < 20) {
    if (w.ph === 'wait') w.skip();
    else w.done();
  }
  assert.equal(w.step.k, 'ready');
  w.done();
  assert.deepEqual([w.step.k, w.ph, w.secondsLeft()], ['work', 'run', 40]);
  run(w, now, 36_500);
  const n = cues.length;
  run(w, now, 3_750);
  assert.deepEqual(cues.slice(n), ['tick', 'tick', 'tick', 'rest'], 'bips 3-2-1 puis signal de repos');
  assert.equal(w.step.k, 'rest');
  assert.deepEqual(draft.sets[0][0], { r: '', k: '', d: true }, 'passage validé, aucune valeur inventée');
  const pw = w.prevWork();
  w.setValues(pw.x, pw.i, { r: '15', k: '6' });
  assert.deepEqual(draft.sets[0][0], { r: '15', k: '6', d: true });
  run(w, now, 20_250);
  assert.deepEqual([w.step.k, w.step.x], ['work', 1]);
  w.skip(); // exercice passé : non validé
  assert.equal(draft.sets[1], undefined);
  // on laisse tout le reste se dérouler seul
  run(w, now, 40 * 60_000);
  assert.equal(w.step.k, 'end');
  assert.equal(w.doneCount, 13);
  assert.equal(cues.at(-1), 'end');
  const rows = rowsOf(coralie, coralie.seances[0], draft);
  assert.equal(rows.length, 7);
  assert.deepEqual(rows[0].sets, [{ r: '15', k: '6' }, { r: '', k: '' }]);
  assert.equal(rows[1].sets.length, 1);
  const e = buildEntry(coralie, coralie.seances[0], draft, now());
  assert.equal(e.tours, 2);
  assert.equal(e.vol, 90);
});

test('chrono d’échauffement : lancement manuel, pause, fin automatique', () => {
  const { w, now } = start(axel, axel.seances[0]);
  assert.deepEqual([w.step.k, w.ph], ['warm', 'wait']);
  run(w, now, 5_000);
  assert.equal(w.ph, 'wait', 'rien ne démarre tout seul');
  w.launch();
  run(w, now, PREP_MS);
  assert.deepEqual([w.ph, w.secondsLeft()], ['run', 30]);
  run(w, now, 10_000);
  w.togglePause();
  run(w, now, 30_000);
  assert.equal(w.secondsLeft(), 20);
  assert.ok(Math.abs(w.fraction() - 1 / 3) < 0.02);
  w.togglePause();
  run(w, now, 20_250);
  assert.deepEqual([w.step.k, w.step.w], ['warm', 1]);
});

test('repos : +15 s, passer, et justesse après un passage en arrière-plan', () => {
  const draft = newDraft();
  const { w, now, cues } = start(axel, axel.seances[1], draft);
  while (w.step.k !== 'set') w.ph === 'wait' ? w.skip() : w.step.k === 'rest' ? w.skip() : w.done();
  w.done({ r: '8', k: '14' });
  assert.deepEqual([w.step.k, w.secondsLeft()], ['rest', 90]);
  w.add(15);
  assert.equal(w.secondsLeft(), 105);
  // téléphone verrouillé 2 minutes : aucune minuterie n'a tourné, mais l'heure absolue fait foi
  now.advance(120_000);
  const n = cues.length;
  w.tick();
  assert.equal(w.step.k, 'set', 'au retour, le repos terminé laisse place à la série suivante');
  assert.deepEqual(cues.slice(n), ['go']);
  assert.equal(w.step.i, 1);
  w.done({ r: '8', k: '14' });
  w.skip();
  assert.deepEqual([w.step.k, w.step.i], ['set', 2]);
});

test('retour en arrière : la série précédente redevient à valider, ses valeurs sont gardées', () => {
  const { w, draft } = start(axel, axel.seances[1]);
  while (w.step.k !== 'set') w.ph === 'wait' ? w.skip() : w.step.k === 'rest' ? w.skip() : w.done();
  w.done({ r: '8', k: '14' });
  assert.equal(w.step.k, 'rest');
  assert.equal(w.back(), true);
  assert.deepEqual([w.step.k, w.step.i], ['set', 0]);
  assert.deepEqual(draft.sets[0][0], { r: '8', k: '14', d: false });
  w.done({ r: '9', k: '14' });
  assert.equal(draft.sets[0][0].r, '9');
  // au tout début, rien à annuler
  const first = start(axel, axel.seances[1]);
  assert.equal(first.w.back(), false);
});

test('reprise après fermeture : position, repos en cours et pause sont retrouvés', () => {
  const now = clock();
  const draft = newDraft();
  let { w } = start(axel, axel.seances[1], draft, now);
  while (w.step.k !== 'set') w.ph === 'wait' ? w.skip() : w.step.k === 'rest' ? w.skip() : w.done();
  w.done({ r: '8', k: '14' });
  now.advance(30_000);
  // l'appli est fermée puis rouverte : le brouillon passe par le stockage (JSON + validation)
  const reload = () => normalize({ drafts: { s2: JSON.parse(JSON.stringify(draft)) } }, axel).drafts.s2;
  let d2 = reload();
  now.advance(20_000);
  let r = start(axel, axel.seances[1], d2, now);
  assert.deepEqual([r.w.step.k, r.w.secondsLeft()], ['rest', 40], 'le repos a continué pendant la fermeture');
  // repos mis en pause puis appli fermée longtemps : la pause est conservée
  r.w.togglePause();
  d2 = normalize({ drafts: { s2: JSON.parse(JSON.stringify(d2)) } }, axel).drafts.s2;
  now.advance(3_600_000);
  r = start(axel, axel.seances[1], d2, now);
  assert.ok(r.w.paused);
  assert.equal(r.w.secondsLeft(), 40);
  // repos terminé pendant la fermeture : on arrive directement sur la série suivante
  const d3 = reload();
  now.advance(10 * 60_000);
  r = start(axel, axel.seances[1], d3, now);
  assert.deepEqual([r.w.step.k, r.w.step.x, r.w.step.i], ['set', 0, 1]);
});

test('reprise : échauffement non rejoué quand des séries sont déjà faites, fin directe si tout est fait', () => {
  const draft = newDraft();
  draft.sets[0] = [{ r: '8', k: '14', d: true }, { r: '8', k: '14', d: true }];
  const a = start(axel, axel.seances[1], draft);
  assert.deepEqual([a.w.step.k, a.w.step.i], ['set', 2]);
  const full = newDraft();
  axel.seances[1].exos.forEach((ex, x) => (full.sets[x] = Array.from({ length: ex.sets }, () => ({ r: '1', k: '', d: true }))));
  assert.equal(start(axel, axel.seances[1], full).w.step.k, 'end');
  // brouillon dont la position enregistrée ne correspond plus au plan (nombre de séries du circuit modifié)
  const c = newDraft(2);
  c.run = { i: 999, pt: 0, timer: null, at: 1 };
  assert.equal(start(coralie, coralie.seances[0], c).w.i, 0);
});

test('valeurs proposées : saisie en cours, série précédente, puis dernière séance', () => {
  const draft = newDraft();
  const last = { row: { sets: [{ r: '10', k: '12' }, { r: '9', k: '12' }, { r: '8', k: '14' }] } };
  assert.equal(defaultValue(draft, 0, 0, 'r', last), '10');
  assert.equal(defaultValue(draft, 0, 0, 'k', last), '14', 'dernière charge utilisée');
  assert.equal(defaultValue(draft, 0, 1, 'r', last), '9');
  draft.sets[0] = [{ r: '11', k: '16', d: true }];
  assert.equal(defaultValue(draft, 0, 0, 'r', last), '11');
  assert.equal(defaultValue(draft, 0, 1, 'r', last), '11', 'série précédente de la séance en cours');
  assert.equal(defaultValue(draft, 0, 1, 'k', last), '16');
  assert.equal(defaultValue(draft, 1, 0, 'r', null), '');
  // superset : valeurs par partie, avec repli sur l'ancien format sans parties
  const lastP = { row: { sets: [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '10', k: '10' }] }] } };
  assert.equal(defaultValue(newDraft(), 5, 0, 'k', lastP, 1), '10');
  assert.equal(defaultValue(newDraft(), 5, 0, 'k', { row: { sets: [{ r: '12', k: '6' }] } }, 1), '6');
});

test('enregistrement : séries vides ignorées, rien à enregistrer → null, durée aberrante ignorée', () => {
  const draft = newDraft();
  assert.equal(buildEntry(axel, axel.seances[0], draft, 1e12), null);
  draft.sets[1] = [{ r: '', k: '', d: false }, { r: '10', k: '', d: false }, { r: '', k: '', d: true }];
  draft.sets[2] = [{ r: '1', k: '1', d: true }, { r: '2', k: '1', d: true }, { r: '3', k: '1', d: true }, { r: '4', k: '1', d: true }, { r: '5', k: '1', d: true }];
  const rows = rowsOf(axel, axel.seances[0], draft);
  assert.deepEqual(rows.map((r) => [r.xid, r.sets.length]), [['rdl', 2], ['bench', 4]], 'une 5ᵉ série hors programme est ignorée');
  draft.t0 = 1e12;
  assert.equal(durationMin(draft, 1e12 + 50 * 60000), 50);
  assert.equal(durationMin(draft, 1e12 + 30 * 3600000), 0, 'séance reprise le lendemain : durée non mesurable');
  draft.t1 = 1e12 + 45 * 60000;
  assert.equal(durationMin(draft, 1e12 + 300 * 60000), 45, 'le temps passé sur l’écran de fin ne compte pas');
  draft.date = 'n’importe quoi';
  assert.match(buildEntry(axel, axel.seances[0], draft, 1e12).date, /^\d{4}-\d\d-\d\d$/);
});

test('aperçu de la séance : aller directement à un exercice, puis revenir à celui laissé', () => {
  const now = clock();
  const d = { date: '2026-11-14', tours: 0, sets: {}, note: '', t0: 0, t1: 0 };
  const se = PROGRAMS.axel.seances[1];
  const w = new Workout({ program: PROGRAMS.axel, session: se, draft: d, now });
  while (w.step.k !== 'set') w.done();
  w.done({ r: '8', k: '14' }); // incliné, série 1
  assert.ok(w.goToExercise(2));
  assert.deepEqual([w.step.k, w.step.x, w.step.i], ['set', 2, 0]);
  w.done({ r: '9', k: '10' });
  const ov = w.overview();
  assert.deepEqual(ov.slice(0, 3).map((o) => [o.done, o.total]), [[1, 4], [0, 4], [1, 3]]);
  assert.ok(w.goToExercise(0));
  assert.deepEqual([w.step.x, w.step.i], [0, 1], 'reprend à la première série non faite');
  assert.equal(w.goToExercise(99), false);
});
