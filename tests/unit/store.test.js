import test from 'node:test';
import assert from 'node:assert/strict';
import { PROGRAMS } from '../../src/data/programs/index.js';
import { Store, normalize, parseState, mergeStates, baseOf, exportPayload, toCSV, blank, cleanEntry, volumeOf, SCHEMA } from '../../src/core/store.js';
import { today } from '../../src/core/util.js';
import { FakeStorage, legacyAxel } from './helpers.js';

const axel = PROGRAMS.axel;
const coralie = PROGRAMS.coralie;
const mk = (storage, program = axel) => new Store({ program, storage, delay: 0 });
const entry = (id, date, extra = {}) => ({ id, date, short: 'Séance 1 · jambes et dos', title: 't', tours: 0, rows: [{ ex: 'Développé couché aux haltères', sets: [{ r: '8', k: '20' }] }], note: '', vol: 160, dur: 30, ...extra });

test('premier lancement : état vide, rien n’est écrit tant que rien ne change', () => {
  const st = new FakeStorage();
  const s = mk(st);
  assert.equal(s.load(), 'empty');
  assert.equal(s.state.history.length, 0);
  assert.equal(s.state.cur, 's1');
  assert.equal(st.map.size, 0);
});

test('migration v1 → v3 : tout l’historique est conservé et une copie brute est gardée', () => {
  const raw = JSON.stringify(legacyAxel());
  const st = new FakeStorage({ 'sport:axel': raw });
  const s = mk(st);
  assert.equal(s.load(), 'migrated');
  assert.equal(st.getItem('sport:axel:backup-v1'), raw, 'copie exacte des données d’origine');
  const S = s.state;
  assert.equal(S.v, SCHEMA);
  assert.equal(S.history.length, 3);
  assert.deepEqual(S.history.map((h) => h.id), ['lq1a2b3c', 'lq9z8y7x', 'lr1c2d3e']);
  assert.deepEqual(S.history[0].rows[0].sets, legacyAxel().history[0].rows[0].sets, 'séries inchangées');
  assert.equal(S.history[0].rows[0].xid, 'bulg', 'identifiant stable ajouté');
  assert.equal(S.history[0].sid, 's1');
  assert.equal(S.history[1].sid, 's2');
  assert.equal(S.history[0].note, 'RAS');
  assert.equal(S.history[0].dur, 51);
  assert.deepEqual(S.rides, ['2026-10-10', '2026-10-11']);
  assert.equal(S.cur, 's2');
  assert.deepEqual([S.opt.sound, S.opt.vib], [false, false], 'ancien réglage « muet » repris');
  assert.equal(S.uns, 2);
  assert.equal(S.exp, '2026-10-06');
  assert.equal(S.drafts.s1.sets[0][0].k, '14', 'saisie en cours conservée');
  // l'état migré a été écrit, et il reste lisible par l'ancienne version (mêmes champs de base)
  const written = JSON.parse(st.getItem('sport:axel'));
  assert.equal(written.v, 3);
  assert.equal(st.getItem('sport:axel:backup-v2'), null, 'données v1 : pas de copie v2');
  assert.equal(written.history[0].rows[0].ex, 'Fentes bulgares (pied arrière sur le banc)');
  assert.equal(written.mute, true);
});

test('la copie backup-v1 n’est jamais réécrite par un second chargement', () => {
  const raw = JSON.stringify(legacyAxel());
  const st = new FakeStorage({ 'sport:axel': raw });
  mk(st).load();
  const s2 = mk(st);
  assert.equal(s2.load(), 'ok');
  s2.addEntry(entry('n1', '2026-11-01'));
  assert.equal(st.getItem('sport:axel:backup-v1'), raw);
  assert.equal(mk(st).load(), 'ok');
});

test('données illisibles : copie conservée, récupération depuis la copie de sécurité automatique', () => {
  const st = new FakeStorage();
  const s = mk(st);
  s.load();
  s.addEntry(entry('a', '2026-11-01'));
  // un nouveau lancement crée la copie de sécurité du jour
  mk(st).load();
  assert.ok(st.getItem('sport:axel:snap'));
  st.setItem('sport:axel', '{"history":[{"id":"a"'); // écriture tronquée
  const s3 = mk(st);
  assert.equal(s3.load(), 'recovered');
  assert.equal(s3.state.history.length, 1);
  assert.equal(st.getItem('sport:axel:illisible'), '{"history":[{"id":"a"');
});

test('données illisibles sans copie de sécurité : état vide mais l’illisible est gardé', () => {
  const st = new FakeStorage({ 'sport:axel': 'pas du json' });
  const s = mk(st);
  assert.equal(s.load(), 'reset');
  assert.equal(st.getItem('sport:axel:illisible'), 'pas du json');
  assert.equal(st.getItem('sport:axel'), 'pas du json', 'rien n’est écrasé tant que l’utilisateur n’a rien modifié');
  for (const bad of ['[]', 'null', '42', '"texte"']) {
    const s2 = mk(new FakeStorage({ 'sport:axel': bad }));
    assert.equal(s2.load(), 'reset', bad);
    assert.equal(s2.state.history.length, 0);
  }
});

test('normalize répare ou écarte les données mal formées sans jamais lever d’exception', () => {
  const dirty = {
    history: [
      null, 42, 'x', [],
      { id: 'ok', date: '2026-01-05', rows: [{ ex: 'A', sets: [{ r: 8, k: null }, null, 'x', { r: '9', k: '10' }] }, { ex: 5, sets: [] }, null] },
      { id: 'ok', date: '2026-01-06', rows: [] }, // identifiant en double : écarté
      { id: 'bad-date', date: '2026-02-31', rows: [] },
      { id: 'no-rows', date: '2026-01-05' },
      { date: '2026-01-07', rows: [] }, // sans identifiant : identifiant de secours
      { id: 'big', date: '2026-01-08', rows: [], vol: 'abc', dur: -5, note: 'x'.repeat(5000) },
    ],
    rides: ['2026-01-01', 'hier', 7, '2026-01-01', '2026-13-01'],
    drafts: { s1: { sets: { 0: [{ r: '8', k: '10', d: 1 }, 'x'], 99: [{}], __proto__: [{}], abc: [{}] }, tours: 9, note: 5 }, zz: { sets: {} }, s2: 'x' },
    cur: 'inconnue',
    opt: { sound: 0, theme: 'rose', goal: 99 },
    uns: 'beaucoup',
  };
  const s = normalize(dirty, axel);
  assert.deepEqual(s.history.map((h) => h.id), ['ok', 'old8', 'big']);
  assert.deepEqual(s.history[0].rows, [{ ex: 'A', sets: [{ r: '8', k: '' }, { r: '9', k: '10' }] }]);
  assert.equal(s.history[2].note.length, 2000);
  assert.equal(s.history[2].dur, 0);
  assert.deepEqual(s.rides, ['2026-01-01']);
  assert.deepEqual(Object.keys(s.drafts), ['s1']);
  assert.deepEqual(s.drafts.s1.sets, { 0: [{ r: '8', k: '10', d: true }, { r: '', k: '', d: false }] });
  assert.equal(s.drafts.s1.note, '5');
  assert.equal(s.cur, 's1');
  assert.deepEqual(s.opt, { sound: true, vib: true, theme: 'dark', goal: 0, kgStep: 1 });
  assert.equal(s.uns, 0);
  for (const v of [null, undefined, 3, 'x', [], { history: 'x', drafts: [], rides: {} }]) assert.doesNotThrow(() => normalize(v, axel));
  assert.equal(parseState('{oops', axel), null);
  assert.equal(({}).polluted, undefined);
});

test('circuit : nombre de séries du brouillon borné', () => {
  const s = normalize({ drafts: { c1: { sets: {}, tours: 3 } } }, coralie);
  assert.equal(s.drafts.c1.tours, 3);
  assert.equal(normalize({ drafts: { c1: { sets: {}, tours: 12 } } }, coralie).drafts.c1.tours, 2);
});

test('ajout, suppression et annulation d’une séance ; compteur de séances non sauvegardées', () => {
  const st = new FakeStorage();
  const s = mk(st);
  s.load();
  s.addEntry(entry('a', '2026-11-01'));
  s.addEntry(entry('b', '2026-11-03'));
  assert.equal(s.state.uns, 2);
  assert.equal(JSON.parse(st.getItem('sport:axel')).history.length, 2, 'écrit immédiatement');
  const removed = s.removeEntry('a');
  assert.equal(removed.id, 'a');
  assert.equal(s.state.history.length, 1);
  s.addEntry(removed); // annulation
  assert.equal(s.state.history.length, 2);
  assert.equal(s.removeEntry('zzz'), null);
  s.markExported();
  assert.equal(s.state.uns, 0);
  assert.equal(s.state.exp, today());
});

test('écriture impossible : signalée une seule fois, les données restent en mémoire', () => {
  const st = new FakeStorage();
  let warned = 0;
  const s = new Store({ program: axel, storage: st, delay: 0, onWriteError: () => warned++ });
  s.load();
  st.failWrites = true;
  s.addEntry(entry('a', '2026-11-01'));
  s.addEntry(entry('b', '2026-11-02'));
  assert.equal(warned, 1);
  assert.equal(s.state.history.length, 2);
  st.failWrites = false;
  assert.equal(s.flush(), true);
  assert.equal(JSON.parse(st.getItem('sport:axel')).history.length, 2);
});

test('stockage plein : la copie de sécurité est sacrifiée avant les données courantes', () => {
  const st = new FakeStorage();
  const s = mk(st);
  s.load();
  s.addEntry(entry('a', '2026-11-01'));
  mk(st).load(); // crée la copie de sécurité
  assert.ok(st.getItem('sport:axel:snap'));
  const s2 = mk(st);
  s2.load();
  st.quota = st.getItem('sport:axel').length + 500;
  s2.addEntry(entry('b', '2026-11-02'));
  assert.equal(JSON.parse(st.getItem('sport:axel')).history.length, 2);
  assert.equal(st.getItem('sport:axel:snap'), null);
});

test('deux onglets : les séances ajoutées de chaque côté sont toutes conservées', () => {
  const st = new FakeStorage();
  const A = mk(st);
  const B = mk(st);
  A.load();
  B.load();
  A.addEntry(entry('a1', '2026-11-01'));
  B.addEntry(entry('b1', '2026-11-02')); // B n'a pas reçu l'évènement « storage » : la fusion a lieu à l'écriture
  assert.deepEqual(JSON.parse(st.getItem('sport:axel')).history.map((h) => h.id).sort(), ['a1', 'b1']);
  assert.equal(A.absorb(st.getItem('sport:axel')), true);
  assert.deepEqual(A.state.history.map((h) => h.id).sort(), ['a1', 'b1']);
  assert.equal(A.state.uns, 2);
});

test('deux onglets : une suppression n’est pas annulée par l’autre onglet', () => {
  const st = new FakeStorage();
  const A = mk(st);
  A.load();
  A.addEntry(entry('x', '2026-11-01'));
  A.addEntry(entry('y', '2026-11-02'));
  const B = mk(st);
  B.load();
  A.removeEntry('x');
  // B, qui connaît encore « x », écrit autre chose : « x » ne doit pas revenir
  B.state.cur = 's2';
  B.touch('cur');
  B.flush();
  assert.deepEqual(JSON.parse(st.getItem('sport:axel')).history.map((h) => h.id), ['y']);
  assert.equal(JSON.parse(st.getItem('sport:axel')).cur, 's2');
  // et inversement : A reprend le changement de B sans perdre sa suppression
  A.absorb(st.getItem('sport:axel'));
  assert.deepEqual(A.state.history.map((h) => h.id), ['y']);
  assert.equal(A.state.cur, 's2');
});

test('deux onglets : la séance guidée en cours garde son brouillon (même objet)', () => {
  const st = new FakeStorage();
  const A = mk(st);
  const B = mk(st);
  A.load();
  B.load();
  const d = A.draft('s1');
  d.sets[0] = [{ r: '8', k: '12', d: true }];
  A.pin('s1');
  A.touch('draft:s1');
  A.flush();
  // B écrit un brouillon différent pour la même séance, puis A reçoit l'évènement
  B.absorb(st.getItem('sport:axel'));
  B.draft('s1').sets[0] = [{ r: '1', k: '1', d: false }];
  B.touch('draft:s1');
  B.flush();
  A.absorb(st.getItem('sport:axel'));
  assert.equal(A.state.drafts.s1, d, 'la référence utilisée par la séance guidée reste valide');
  assert.equal(A.state.drafts.s1.sets[0][0].r, '8');
  // sans séance guidée ouverte, le brouillon le plus récent de l'autre onglet est repris
  A.pin(null);
  A.flush();
  B.absorb(st.getItem('sport:axel'));
  assert.equal(B.state.drafts.s1.sets[0][0].r, '8');
});

test('mergeStates : sorties VTT fusionnées dans les deux sens', () => {
  const base = { ...blank(axel), rides: ['2026-01-01', '2026-01-02'] };
  const local = { ...blank(axel), rides: ['2026-01-02', '2026-01-05'] }; // a retiré le 01, ajouté le 05
  const remote = { ...blank(axel), rides: ['2026-01-01', '2026-01-02', '2026-01-09'] }; // a ajouté le 09
  assert.deepEqual(mergeStates(local, remote, baseOf(base), new Set()).rides, ['2026-01-02', '2026-01-05', '2026-01-09']);
});

test('export puis import : aller-retour sans perte, sans doublon', () => {
  const st = new FakeStorage({ 'sport:axel': JSON.stringify(legacyAxel()) });
  const s = mk(st);
  s.load();
  const text = JSON.stringify(exportPayload(s.state, axel));
  const fresh = mk(new FakeStorage());
  fresh.load();
  const r1 = fresh.import(text);
  assert.deepEqual([r1.ok, r1.added, r1.dup, r1.invalid, r1.rides], [true, 3, 0, 0, 2]);
  assert.deepEqual(fresh.state.history.map((h) => h.rows), s.state.history.map((h) => h.rows));
  const r2 = fresh.import(text);
  assert.deepEqual([r2.added, r2.dup], [0, 3], 'un second import n’ajoute rien');
  assert.equal(fresh.state.history.length, 3);
});

test('import : fichier v1 d’origine, texte brut de l’état, mêmes séances sous un autre identifiant', () => {
  const s = mk(new FakeStorage());
  s.load();
  const v1 = JSON.stringify({ app: 'axel', v: 1, at: '2026-10-13', data: legacyAxel() });
  assert.equal(s.import(v1).added, 3);
  const bare = legacyAxel();
  bare.history.forEach((h, i) => (h.id = 'autre' + i));
  const r = s.import(JSON.stringify(bare));
  assert.deepEqual([r.added, r.dup], [0, 3], 'même contenu = doublon, même si l’identifiant diffère');
  const noId = { history: [{ date: '2026-09-01', rows: [{ ex: 'X', sets: [{ r: '5', k: '' }] }] }] };
  assert.equal(s.import(JSON.stringify(noId)).added, 1);
});

test('import : refus propres (autre programme, contenu invalide), sans modifier l’état', () => {
  const s = mk(new FakeStorage());
  s.load();
  s.addEntry(entry('a', '2026-11-01'));
  const before = JSON.stringify(s.state.history);
  const other = JSON.stringify({ app: 'coralie', data: { history: [entry('z', '2026-01-01')] } });
  assert.match(s.import(other).error, /autre programme/);
  for (const bad of ['', '{', '[]', '"x"', '{"data":{}}', '{"history":"non"}', null, 42]) assert.equal(s.import(bad).ok, false, String(bad));
  const mixed = JSON.stringify({ history: [null, { id: 'q', date: 'x', rows: [] }, { id: 'vide', date: '2026-01-01', rows: [] }, entry('good', '2026-01-02', { rows: [{ ex: 'A', sets: [{ r: '<img src=x onerror=alert(1)>', k: '' }] }] })] });
  const r = s.import(mixed);
  assert.deepEqual([r.ok, r.added, r.invalid], [true, 1, 3]);
  assert.equal(JSON.stringify(s.state.history.slice(0, 1)), before);
});

test('restauration de la copie de sécurité : fusion sans suppression', () => {
  const st = new FakeStorage();
  const s = mk(st);
  s.load();
  s.addEntry(entry('a', '2026-11-01'));
  const s2 = mk(st);
  s2.load(); // copie de sécurité contenant « a »
  s2.removeEntry('a');
  s2.addEntry(entry('b', '2026-11-05', { rows: [{ ex: 'B', sets: [{ r: '1', k: '1' }] }] }));
  const r = s2.restoreSnapshot();
  assert.equal(r.added, 1);
  assert.deepEqual(s2.state.history.map((h) => h.id).sort(), ['a', 'b']);
});

test('volume et CSV', () => {
  const rows = [
    { ex: 'A', sets: [{ r: '10', k: '12,5' }, { r: '8', k: '' }] },
    { ex: 'Superset', sets: [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '10', k: '10' }, { r: '10', k: '8' }] }] },
  ];
  assert.equal(volumeOf(rows), 125 + 72 + 100 + 80);
  const csv = toCSV({ history: [{ date: '2026-01-02', short: 'S "1"', rows, note: 'a;b', dur: 40 }] });
  const lines = csv.trim().split('\r\n');
  assert.equal(lines.length, 1 + 2 + 3);
  assert.equal(lines[1], '2026-01-02;"S ""1""";"A";1;;"10";"12,5";40;"a;b"');
  assert.ok(csv.startsWith('﻿'));
});

test('cleanEntry garde les parties d’un superset', () => {
  const e = cleanEntry({ id: 'p', date: '2026-01-02', rows: [{ ex: 'S', xid: 'curl', sets: [{ r: '12', k: '6', p: [{ r: '12', k: '6' }, null, { r: 3 }] }] }] }, null, axel);
  assert.deepEqual(e.rows[0].sets[0].p, [{ r: '12', k: '6' }, { r: '', k: '' }, { r: '3', k: '' }]);
  assert.equal(e.rows[0].xid, 'curl');
});
