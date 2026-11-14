#!/usr/bin/env node
/* Tests de bout en bout dans un vrai navigateur (Chromium piloté par Playwright).
   Lancement : npm run test:e2e        (un seul scénario : npm run test:e2e -- "hors ligne")
   Playwright n'est pas une dépendance du site : `npm i -D playwright && npx playwright install chromium`
   en local, ou une installation globale désignée par NODE_PATH. */
import { createRequire } from 'node:module';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { serve } from '../../tools/serve.mjs';
import { ROOT, precacheList } from '../../tools/build.mjs';

function loadPlaywright() {
  const paths = [ROOT, ...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node-tools/node_modules'];
  for (const p of paths) {
    try {
      return createRequire(join(p, 'x.js'))('playwright');
    } catch (e) {
      /* essai suivant */
    }
  }
  console.error('Playwright introuvable : npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}
const { chromium } = loadPlaywright();

const tests = [];
const test = (name, fn, opts = {}) => tests.push({ name, fn, opts });
const PHONE = { width: 390, height: 844 };
const day = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};

/** Données au format de l'application d'origine (v1). */
const legacy = () => ({
  history: [
    { id: 'lq1a2b3c', date: day(-14), short: 'Séance 1 · jambes et dos', title: 'Séance 1 – accent jambes et dos', tours: 0, note: 'RAS', vol: 1976, dur: 51,
      rows: [{ ex: 'Fentes bulgares (pied arrière sur le banc)', sets: [{ r: '8', k: '12' }, { r: '8', k: '12' }, { r: '7', k: '12' }, { r: '6', k: '12' }] },
        { ex: 'Soulevé de terre roumain aux haltères', sets: [{ r: '10', k: '16' }, { r: '10', k: '16' }, { r: '10', k: '16' }, { r: '10', k: '16' }] }] },
    { id: 'lq9z8y7x', date: day(-10), short: 'Séance 2 · haut du corps', title: 'Séance 2 – accent haut du corps', tours: 0, note: '', vol: 588, dur: 48,
      rows: [{ ex: 'Développé incliné aux haltères', sets: [{ r: '8', k: '14' }, { r: '8', k: '14' }, { r: '7', k: '14' }, { r: '6', k: '14' }] }] },
    { id: 'lr1c2d3e', date: day(-7), short: 'Séance 1 · jambes et dos', title: 'Séance 1 – accent jambes et dos', tours: 0, note: '', vol: 1830, dur: 47,
      rows: [{ ex: 'Fentes bulgares (pied arrière sur le banc)', sets: [{ r: '10', k: '12' }, { r: '10', k: '12' }, { r: '10', k: '12' }, { r: '10', k: '12' }] },
        { ex: 'Soulevé de terre roumain aux haltères', sets: [{ r: '10', k: '18' }, { r: '9', k: '18' }, { r: '8', k: '18' }, { r: '8', k: '18' }] }] },
  ],
  drafts: {}, rides: [day(-8)], cur: 's1', mute: false, exp: '', expN: 0, uns: 3,
});

/* ---------- Outils ---------- */

async function open(ctx, base, path, { seed, clock } = {}) {
  const page = await ctx.newPage();
  page.errors = [];
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()));
  page.on('pageerror', (e) => page.errors.push('exception : ' + e.message));
  if (seed) await page.addInitScript((s) => { for (const [k, v] of Object.entries(s)) if (localStorage.getItem(k) == null) localStorage.setItem(k, v); }, seed);
  if (clock) await page.clock.install({ time: clock === true ? new Date() : new Date(clock) });
  await page.goto(base + path);
  if (path.includes('.html') && !path.startsWith('index')) await page.waitForSelector('.tabs button');
  return page;
}
const state = (page, key = 'axel') => page.evaluate((k) => JSON.parse(localStorage.getItem('sport:' + k) || 'null'), key);
const tab = async (page, t) => { await page.click(`.tabs [data-t="${t}"]`); };
const text = (page, sel) => page.locator(sel).first().innerText();
const noOverflow = async (page, what) => {
  const o = await page.evaluate(() => {
    const scr = [...document.querySelectorAll('.screen:not([hidden])')].pop() || document.scrollingElement;
    return { sw: scr.scrollWidth, cw: scr.clientWidth };
  });
  assert.ok(o.sw <= o.cw + 1, `${what} : débordement horizontal (${o.sw} > ${o.cw})`);
};
/** Avance dans la séance guidée en validant tout, jusqu'à ce que stop(page) soit vrai. */
async function advance(page, stop, max = 200) {
  for (let n = 0; n < max; n++) {
    if (await stop()) return;
    const kind = await page.evaluate(() => {
      const act = document.querySelector('#workout .w-act');
      for (const k of ['part', 'sideready', 'done', 'skip', 'launch']) {
        const b = act.querySelector(`[data-w="${k}"]`);
        if (b && !b.disabled) return k;
      }
      return '';
    });
    if (!kind) throw new Error('séance bloquée : aucun bouton pour avancer');
    await page.click(`#workout .w-act [data-w="${kind}"]`);
  }
  throw new Error('séance trop longue');
}
const kicker = (page) => text(page, '#workout .w-body .k');
/** Secondes affichées par le chrono, à ± 1 s près (l'affichage est rafraîchi 4 fois par seconde). */
const near = async (page, expected, what = '') => {
  const v = +(await text(page, '#w-sec'));
  assert.ok(Math.abs(v - expected) <= 1, `${what} chrono à ${v} s au lieu de ${expected} s`);
};

/* ---------- Scénarios ---------- */

test('accueil : les deux programmes sont proposés, statut de la semaine lu dans les données', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  assert.equal(await page.locator('a.choice').count(), 2);
  assert.match(await text(page, '#st-axel'), /Cette semaine : 0\/2 séances/);
  assert.match(await text(page, '#st-axel'), /Dernière séance/);
  assert.equal(await page.locator('#st-coralie').isHidden(), true);
  await page.click('a.choice.coralie');
  await page.waitForSelector('.tabs button');
  assert.match(await page.title(), /Coralie/);
  assert.equal(await page.getAttribute('html', 'data-prog'), 'coralie');
  await page.click('.top .back');
  await page.waitForSelector('a.choice.axel');
  assert.deepEqual(page.errors, []);
});

test('navigation : les cinq onglets des deux programmes s’affichent sans erreur', async ({ ctx, base }) => {
  for (const prog of ['axel', 'coralie']) {
    const page = await open(ctx, base, `/${prog}.html`);
    assert.ok(await page.locator('.hero h2').isVisible());
    assert.equal(await page.locator('#view .fig').first().evaluate((s) => s.childElementCount > 3), true, 'figures dessinées');
    for (const [t, sel] of [['progres', '.empty'], ['exercices', '.filters'], ['programme', '.hero'], ['plus', '.switch'], ['seance', '.hero']]) {
      await tab(page, t);
      await page.waitForSelector('#view ' + sel);
      assert.equal(await page.getAttribute(`.tabs [data-t="${t}"]`, 'aria-current'), 'page');
    }
    assert.equal(await page.locator('#view details.ex').count(), prog === 'axel' ? 6 : 7);
    assert.deepEqual(page.errors, [], prog);
    await page.close();
  }
});

test('séance guidée en séries (Axel S2) : toutes les séries, superset, côtés, enregistrement et récapitulatif', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  await page.click('[data-a="sid"][data-v="s2"]');
  assert.match(await text(page, '.hero h2'), /Séance 2/);
  await page.click('[data-a="run"]');
  await page.waitForSelector('#workout:not([hidden])');
  assert.match(await kicker(page), /Échauffement · 1 \/ 7/);
  // échauffement chronométré : rien ne démarre sans appui
  assert.equal(await text(page, '#w-sec'), '40');
  await advance(page, async () => /Exercice 1 \/ 7/.test(await kicker(page)));
  // 1ʳᵉ série : valeurs proposées depuis la dernière séance (8 reps, 14 kg), validées par l'utilisateur
  assert.equal(await page.inputValue('#w-r'), '8');
  assert.equal(await page.inputValue('#w-k'), '14');
  assert.match(await text(page, '.lastline'), /14 kg · 8 \/ 8 \/ 7 \/ 6/);
  await page.click('[data-st="w-r"][data-d="1"]');
  await page.click('[data-st="w-k"][data-d="1"]');
  await page.click('[data-st="w-k"][data-d="1"]');
  assert.equal(await page.inputValue('#w-r'), '9');
  await page.click('[data-w="done"]');
  assert.equal(await kicker(page), 'Repos');
  assert.equal(await text(page, '#w-sec'), '90');
  assert.match(await text(page, '.prep'), /Même charge[\s\S]*16 kg/);
  assert.equal((await state(page)).drafts.s2.sets[0][0].r, '9');
  // retour en arrière puis nouvelle validation
  await page.click('#w-back');
  assert.match(await kicker(page), /Exercice 1 \/ 7/);
  assert.equal(await page.inputValue('#w-r'), '9');
  await page.click('[data-w="done"]');
  // on déroule jusqu'au superset
  await advance(page, async () => (await page.locator('#workout .parts li').count()) === 3);
  assert.match(await text(page, '#workout .gt'), /Superset bras/);
  await page.fill('#w-r', '12');
  await page.fill('#w-k', '5');
  await page.click('[data-w="part"]');
  assert.equal(await page.locator('#workout .parts li.on b').innerText(), 'Curl marteau');
  await page.fill('#w-r', '11');
  await page.fill('#w-k', '8');
  await page.click('[data-w="part"]');
  await page.fill('#w-r', '10');
  await page.fill('#w-k', '7');
  await page.click('[data-w="done"]');
  await advance(page, async () => (await page.locator('#workout [data-w="save"]').count()) === 1);
  assert.match(await text(page, '#workout .big'), /Séance terminée/);
  assert.match(await text(page, '#workout .hsum'), /23\/23/);
  assert.match(await text(page, '#workout .card.note'), /Développé incliné[\s\S]*16 kg[\s\S]*avant : 14/, 'record mesuré');
  await page.fill('#w-note', 'Bonne séance <b>test</b>');
  await page.click('[data-w="save"]');
  await page.waitForSelector('#view details[open][data-h]');
  const S = await state(page);
  assert.equal(S.history.length, 4);
  const e = S.history.at(-1);
  assert.equal(e.sid, 's2');
  assert.equal(e.date, day());
  assert.equal(e.note, 'Bonne séance <b>test</b>');
  assert.deepEqual(e.rows.map((r) => [r.xid, r.sets.length]), [['incl', 4], ['rowb', 4], ['ohp', 3], ['step', 3], ['hip', 3], ['curl', 3], ['dead', 3]]);
  assert.deepEqual(e.rows[0].sets[0], { r: '9', k: '16' });
  assert.deepEqual(e.rows[5].sets[0].p, [{ r: '12', k: '5' }, { r: '11', k: '8' }, { r: '10', k: '7' }]);
  assert.equal(S.drafts.s2, undefined, 'brouillon vidé après enregistrement');
  assert.equal(await page.locator('#view details[open] b', { hasText: 'test' }).count(), 0, 'note affichée comme du texte');
  assert.match(await text(page, '#view details[open]'), /Bonne séance <b>test<\/b>/);
  await page.click('[data-a="sub"][data-v="bilan"]');
  assert.match(await text(page, '.tiles'), /4\s*séances/);
  assert.deepEqual(page.errors, []);
});

test('minuteurs : repos décompté en temps réel, +15 s, pause, enchaînement automatique, changement de côté', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html', { clock: true });
  await page.click('[data-a="run"]');
  // chrono d'échauffement : 3 s de mise en place puis 30 s
  await page.click('[data-w="launch"]');
  assert.equal(await text(page, '#w-sec'), '3');
  await page.clock.runFor(3_600); // l'affichage est rafraîchi toutes les 250 ms : on laisse passer au moins un rafraîchissement
  await near(page, 30);
  await page.clock.runFor(10_000);
  await near(page, 20);
  await page.click('[data-w="pause"]');
  assert.equal(await text(page, '#w-pause'), 'Reprendre');
  const frozen = await text(page, '#w-sec');
  await page.clock.runFor(30_000);
  assert.equal(await text(page, '#w-sec'), frozen, 'en pause, le temps ne passe pas');
  await page.click('[data-w="pause"]');
  await page.clock.runFor(21_500);
  assert.match(await kicker(page), /Échauffement · 2 \/ 7/, 'fin du chrono → étape suivante');
  await advance(page, async () => /Récupère/.test(await kicker(page)));
  assert.equal(await text(page, '#w-sec'), '75');
  await page.click('[data-w="add"]');
  assert.equal(await text(page, '#w-sec'), '90');
  await page.clock.runFor(88_000);
  assert.match(await kicker(page), /Récupère/);
  await page.clock.runFor(3_000);
  assert.match(await kicker(page), /Exercice 1 \/ 6/, 'fin du repos → première série');
  // exercice unilatéral : repos automatique de changement de côté
  assert.equal(await page.locator('#workout .parts li.on b').innerText(), 'Jambe gauche devant');
  await page.fill('#w-r', '8');
  await page.fill('#w-k', '12');
  await page.click('[data-w="part"]');
  assert.equal(await text(page, '#workout .gt'), 'Change de côté');
  assert.equal(await text(page, '#w-sec'), '30');
  await page.clock.runFor(30_500);
  assert.equal(await page.locator('#workout .parts li.on b').innerText(), 'Jambe droite devant');
  await page.click('[data-w="done"]');
  assert.equal(await text(page, '#w-sec'), '105');
  assert.match(await text(page, '#workout .nx'), /Série 2 sur 4 · commence : jambe droite devant/, 'le côté de départ alterne');
  // horloge de séance
  assert.match(await text(page, '#w-clock'), /Séance 1 · \d+:\d\d/);
  assert.deepEqual(page.errors, []);
});

test('gainage : chrono croissant, arrêt manuel enregistré, arrêt automatique au maximum', async ({ ctx, base }) => {
  const d = { date: day(), tours: 0, note: '', t0: Date.now(), sets: {} };
  [4, 4, 4, 4, 3].forEach((n, x) => (d.sets[x] = Array.from({ length: n }, () => ({ r: '8', k: '10', d: true }))));
  const page = await open(ctx, base, '/axel.html', { clock: true, seed: { 'sport:axel': JSON.stringify({ v: 2, history: [], drafts: { s1: d }, rides: [], cur: 's1' }) } });
  assert.match(await text(page, '[data-a="run"]'), /Reprendre la séance · 19\/22/);
  await page.click('[data-a="run"]');
  assert.equal(await text(page, '#workout .gt'), 'Planche');
  assert.equal(await text(page, '#w-sec'), '0');
  await page.click('[data-w="launch"]');
  assert.equal(await page.locator('[data-w="done"]').isDisabled(), true, 'pas de validation pendant la mise en place');
  await page.clock.runFor(3_250);
  await page.clock.runFor(33_000);
  await near(page, 33);
  assert.match(await text(page, '#w-lab'), /objectif atteint/);
  await page.click('[data-w="done"]');
  assert.ok(Math.abs(+(await state(page)).drafts.s1.sets[5][0].r - 33) <= 1, 'durée tenue enregistrée');
  await page.click('[data-w="skip"]');
  await page.click('[data-w="launch"]');
  await page.clock.runFor(3_250 + 45_500);
  assert.equal(await kicker(page), 'Repos', 'arrêt automatique à 45 s');
  assert.equal((await state(page)).drafts.s1.sets[5][1].r, '45');
  assert.deepEqual(page.errors, []);
});

test('circuit (Coralie) : travail / repos automatiques, saisie facultative, aucune valeur inventée', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/coralie.html', { clock: true });
  assert.match(await text(page, '.chips'), /14\s*passages/);
  await page.click('[data-a="tours"][data-v="1"]');
  assert.match(await text(page, '.chips'), /7\s*passages/);
  await page.click('[data-a="run"]');
  await advance(page, async () => /Premier exercice/.test(await kicker(page)));
  await page.click('[data-w="done"]');
  assert.match(await kicker(page), /Exercice 1 \/ 7/);
  assert.equal(await text(page, '#w-sec'), '40');
  assert.equal(await page.locator('#w-r').count(), 0, 'pas de saisie pendant l’effort');
  await page.clock.runFor(40_500);
  assert.equal(await kicker(page), 'Repos');
  assert.equal(await text(page, '#w-sec'), '20');
  // saisie facultative de ce qui vient d'être fait
  await page.fill('#w-pr', '15');
  await page.click('[data-st="w-pk"][data-d="1"]');
  await page.click('[data-st="w-pk"][data-d="1"]');
  let S = await state(page, 'coralie');
  assert.deepEqual(S.drafts.c1.sets[0][0], { r: '15', k: '2', d: true });
  // on laisse le circuit se dérouler seul jusqu'au bout (6 × (20 + 40) s)
  await page.clock.runFor(6 * 60_000 + 2_000);
  assert.match(await text(page, '#workout .big'), /Séance terminée/);
  assert.match(await text(page, '#workout .hsum'), /7\/7/);
  S = await state(page, 'coralie');
  assert.deepEqual(S.drafts.c1.sets[1][0], { r: '', k: '', d: true }, 'passage validé sans valeur');
  await page.click('[data-w="save"]');
  await page.waitForSelector('#view details[open][data-h]');
  S = await state(page, 'coralie');
  assert.equal(S.history.length, 1);
  assert.equal(S.history[0].tours, 1);
  assert.equal(S.history[0].rows.length, 7);
  assert.ok(S.history[0].dur >= 6 && S.history[0].dur <= 9, 'durée mesurée : ' + S.history[0].dur);
  assert.match(await text(page, '#view details[open] .hx'), /15[\s\S]*reps[\s\S]*2 kg/);
  assert.match(await text(page, '#view details[open]'), /fait/);
  assert.deepEqual(page.errors, []);
});

test('reprise : fermeture de l’appli en plein repos, la séance reprend au bon endroit avec le temps restant', async ({ ctx, base }) => {
  let page = await open(ctx, base, '/axel.html', { clock: true });
  await page.click('[data-a="sid"][data-v="s2"]');
  await page.click('[data-a="run"]');
  await advance(page, async () => /Exercice 1 \/ 7/.test(await kicker(page)));
  await page.fill('#w-r', '8');
  await page.fill('#w-k', '14');
  await page.click('[data-w="done"]');
  await page.clock.runFor(30_000);
  await near(page, 60);
  const later = await page.evaluate(() => Date.now()); // l'horloge simulée a avancé : la page suivante repart de la même heure
  await page.close(); // l'appli est tuée sans prévenir
  page = await open(ctx, base, '/axel.html', { clock: later + 5_000 });
  assert.match(await text(page, '.hero .kicker'), /Séance en cours/i);
  assert.match(await text(page, '[data-a="run"]'), /Reprendre la séance · 1\/23/);
  await page.click('[data-a="run"]');
  assert.equal(await kicker(page), 'Repos');
  const left = +(await text(page, '#w-sec'));
  assert.ok(left >= 53 && left <= 57, 'repos retrouvé avec ' + left + ' s (attendu : environ 55)');
  // quitter puis abandonner : le brouillon est effacé après confirmation
  await page.click('[data-w="quit"]');
  await page.click('.dlg button:has-text("Abandonner la séance")');
  await page.click('.dlg button:has-text("Abandonner")');
  await page.waitForSelector('#workout', { state: 'hidden' });
  assert.equal((await state(page)).drafts.s2, undefined);
  assert.match(await text(page, '[data-a="run"]'), /Commencer/);
  assert.deepEqual(page.errors, []);
});

test('bouton « retour » du téléphone : ferme la fiche, demande confirmation pendant une séance', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html');
  await tab(page, 'exercices');
  await page.click('[data-a="open"][data-v="rdl"]');
  await page.waitForSelector('#sheet:not([hidden])');
  assert.match(await text(page, '#sheet h2'), /Soulevé de terre roumain/);
  assert.equal(await page.locator('#sheet .fig[data-anim]').evaluate((s) => s.childElementCount > 3), true);
  assert.equal(await page.evaluate(() => document.querySelector('#shell').inert), true, 'arrière-plan inerte');
  await page.goBack();
  await page.waitForSelector('#sheet', { state: 'hidden' });
  assert.match(page.url(), /axel\.html$/, 'on est resté dans l’appli');
  assert.equal(await page.evaluate(() => document.querySelector('#shell').inert), false);
  await tab(page, 'seance');
  await page.click('[data-a="run"]');
  await page.goBack();
  await page.waitForSelector('.dlg');
  assert.match(await text(page, '.dlg h2'), /Quitter la séance/);
  assert.equal(await page.locator('#workout').isVisible(), true, 'la séance n’est pas fermée brutalement');
  await page.click('.dlg button:has-text("Continuer la séance")');
  await page.waitForSelector('#dialog', { state: 'hidden' });
  // fiche ouverte depuis la séance, fermée avec Échap
  await page.click('#workout [data-w="quit"]');
  await page.click('.dlg button:has-text("Quitter et reprendre plus tard")');
  await page.waitForSelector('#workout', { state: 'hidden' });
  // deux écrans fermés coup sur coup : l'historique doit retomber exactement sur la page, ni plus ni moins
  await page.waitForFunction(() => ((history.state && history.state.ov) || 0) === 0);
  assert.match(page.url(), /axel\.html$/);
  assert.equal(await page.locator('.tabs button').count(), 5);
  await tab(page, 'exercices');
  await page.click('[data-a="open"][data-v="bench"]');
  await page.waitForSelector('#sheet:not([hidden])');
  await page.goBack();
  await page.waitForSelector('#sheet', { state: 'hidden' });
  assert.match(page.url(), /axel\.html$/);
  assert.deepEqual(page.errors, []);
});

test('saisie libre : cocher une série lance le repos, enregistrement, suppression puis annulation', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html', { clock: true });
  await page.click('details.ex[data-ex="2"] summary');
  await page.fill('details.ex[data-ex="2"] [data-i="0"][data-f="r"]', '8');
  await page.fill('details.ex[data-ex="2"] [data-i="0"][data-f="k"]', '20');
  await page.click('details.ex[data-ex="2"] [data-a="chk"][data-i="0"]');
  assert.equal(await text(page, '[data-p="2"]'), '1/4');
  assert.equal(await page.locator('#minibar').isVisible(), true);
  assert.equal(await text(page, '#minibar .t'), '1:30');
  await page.click('#minibar [data-m="add"]');
  assert.equal(await text(page, '#minibar .t'), '1:45');
  await page.clock.runFor(106_000);
  assert.equal(await text(page, '#minibar .t'), 'Terminé');
  await page.clock.runFor(5_000);
  assert.equal(await page.locator('#minibar').isHidden(), true);
  await page.fill('[data-f="note"]', 'séance courte');
  await page.click('[data-a="finish"]');
  await page.waitForSelector('#view details[open][data-h]');
  let S = await state(page);
  assert.equal(S.history.length, 1);
  assert.deepEqual(S.history[0].rows, [{ ex: 'Développé couché aux haltères', xid: 'bench', sets: [{ r: '8', k: '20' }] }]);
  assert.equal(S.history[0].vol, 160);
  // suppression avec confirmation, puis annulation
  await page.click('#view details[open] [data-a="del"]');
  await page.click('.dlg button:has-text("Supprimer")');
  await page.waitForSelector('.empty');
  assert.equal((await state(page)).history.length, 0);
  await page.click('#toast button');
  await page.waitForSelector('#view details[data-h]');
  S = await state(page);
  assert.equal(S.history.length, 1);
  assert.equal(S.history[0].note, 'séance courte');
  // rien à enregistrer → message, pas de séance vide
  await tab(page, 'seance');
  await page.click('[data-a="finish"]');
  assert.match(await text(page, '#toast'), /Rien à enregistrer/);
  assert.equal((await state(page)).history.length, 1);
  assert.deepEqual(page.errors, []);
});

test('migration : les données de l’ancienne version sont reprises intégralement, avec copie de sécurité', async ({ ctx, base }) => {
  const raw = JSON.stringify(legacy());
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': raw } });
  assert.equal(await page.evaluate(() => localStorage.getItem('sport:axel:backup-v1')), raw);
  const S = await state(page);
  assert.equal(S.v, 3);
  assert.equal(await page.evaluate(() => localStorage.getItem('sport:axel:backup-v2')), null, 'données v1 : seule la copie v1 existe');
  assert.deepEqual(S.history.map((h) => [h.id, h.sid, h.rows.length]), [['lq1a2b3c', 's1', 2], ['lq9z8y7x', 's2', 1], ['lr1c2d3e', 's1', 2]]);
  assert.deepEqual(S.history[2].rows[1].sets, legacy().history[2].rows[1].sets);
  assert.equal(S.history[0].rows[0].xid, 'bulg');
  // l'ancien historique alimente les nouvelles vues
  assert.match(await text(page, 'details.ex[data-ex="1"] .last'), /18 kg · 10 \/ 9 \/ 8 \/ 8/);
  assert.match(await page.locator('details.ex[data-ex="0"] .hint').textContent(), /essaie la charge supérieure/);
  await tab(page, 'progres');
  assert.match(await text(page, '.tiles'), /3\s*séances/);
  assert.match(await text(page, '#view'), /Pense à sauvegarder/);
  await page.click('[data-a="sub"][data-v="perf"]');
  assert.equal(await page.locator('#view .spark').count(), 2, 'courbes de progression');
  assert.match(await text(page, '#view'), /Soulevé de terre roumain[\s\S]*18 kg × 10/);
  await page.click('[data-a="ex"][data-v="rdl"]');
  await page.waitForSelector('#sheet svg.chart');
  assert.match(await text(page, '#sheet .hsum'), /18[\s\S]*record \(kg\)/);
  await page.click('#sheet .chart .hit-area >> nth=0');
  assert.match(await text(page, '#sheet .chart-tip'), /16 kg × 10 reps/);
  assert.deepEqual(page.errors, []);
});

test('export puis import : sauvegarde téléchargée, restaurée sur un appareil vierge, sans doublon', async ({ ctx, base, browser }) => {
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  await tab(page, 'plus');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('[data-a="exp"]')]);
  assert.match(dl.suggestedFilename(), /^moncoach-axel-\d{4}-\d\d-\d\d\.json$/);
  const file = await dl.path();
  const payload = JSON.parse(readFileSync(file, 'utf8'));
  assert.equal(payload.app, 'axel');
  assert.equal(payload.data.history.length, 3);
  assert.equal((await state(page)).uns, 0, 'export noté');
  assert.match(await text(page, '#view'), /Dernière sauvegarde dans un fichier : \d/);
  const [csv] = await Promise.all([page.waitForEvent('download'), page.click('[data-a="csv"]')]);
  const lines = readFileSync(await csv.path(), 'utf8').trim().split('\r\n');
  assert.equal(lines.length, 1 + 20, 'une ligne par série');
  // appareil vierge
  const ctx2 = await browser.newContext({ viewport: PHONE, serviceWorkers: 'block' });
  const p2 = await open(ctx2, base, '/axel.html');
  await tab(p2, 'plus');
  await p2.click('summary:has-text("Importer une sauvegarde")');
  await p2.setInputFiles('#imp', file);
  await p2.waitForFunction(() => /3 séances ajoutées/.test(document.querySelector('#toast').textContent));
  assert.equal((await state(p2)).history.length, 3);
  await p2.setInputFiles('#imp', file);
  await p2.waitForFunction(() => /0 séance ajoutée · 3 déjà présentes/.test(document.querySelector('#toast').textContent));
  assert.equal((await state(p2)).history.length, 3);
  // import par collage, fichier d'un autre programme, contenu invalide
  await p2.fill('#impt', JSON.stringify({ app: 'coralie', data: { history: [] } }));
  await p2.click('[data-a="imptxt"]');
  assert.match(await text(p2, '#toast'), /autre programme/);
  await p2.fill('#impt', '{ ceci n’est pas du JSON');
  await p2.click('[data-a="imptxt"]');
  assert.match(await text(p2, '#toast'), /Données non reconnues/);
  assert.equal((await state(p2)).history.length, 3);
  assert.deepEqual([...page.errors, ...p2.errors], []);
  await ctx2.close();
});

test('données corrompues : l’appli démarre, garde une copie de l’illisible et récupère la copie de sécurité', async ({ ctx, base }) => {
  let page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  assert.ok(await page.evaluate(() => localStorage.getItem('sport:axel:snap')), 'copie de sécurité créée au lancement');
  await page.evaluate(() => localStorage.setItem('sport:axel', '{"history":[{"id":"x","da'));
  await page.close();
  page = await open(ctx, base, '/axel.html');
  await page.waitForFunction(() => /copie de sécurité automatique a été restaurée/.test(document.querySelector('#toast').textContent));
  assert.equal(await page.evaluate(() => localStorage.getItem('sport:axel:illisible')), '{"history":[{"id":"x","da');
  await tab(page, 'progres');
  assert.match(await text(page, '.tiles'), /3\s*séances/);
  assert.deepEqual(page.errors, []);
});

test('sécurité : du HTML placé dans un fichier importé n’est jamais interprété', async ({ ctx, base }) => {
  const evil = '<img src=x onerror="window.__pwned=1"><script>window.__pwned=1</script>';
  const data = { app: 'axel', data: { history: [{ id: 'e1"><b>x', date: day(-1), short: evil, title: evil, note: evil, rows: [{ ex: evil, sets: [{ r: evil, k: '5' }] }, { ex: 'Soulevé de terre roumain aux haltères', sets: [{ r: '10', k: '<i>7</i>' }, { r: '9', k: '20' }] }] }], rides: [evil] } };
  const page = await open(ctx, base, '/axel.html');
  await tab(page, 'plus');
  await page.click('summary:has-text("Importer une sauvegarde")');
  await page.fill('#impt', JSON.stringify(data));
  await page.click('[data-a="imptxt"]');
  await page.waitForFunction(() => /1 séance ajoutée/.test(document.querySelector('#toast').textContent));
  for (const t of ['progres', 'seance', 'exercices', 'programme', 'plus']) {
    await tab(page, t);
    assert.equal(await page.locator('#view img, #view script, #view [onerror]').count(), 0, 'élément injecté dans ' + t);
  }
  await tab(page, 'progres');
  for (const sub of ['cal', 'perf', 'hist']) {
    await page.click(`[data-a="sub"][data-v="${sub}"]`);
    assert.equal(await page.locator('#view img, #view script, #view [onerror]').count(), 0, 'élément injecté dans progrès ' + sub);
  }
  await page.click('#view details[data-h] summary');
  assert.equal(await page.locator('#view img, #view script, #view [onerror]').count(), 0, 'détail de séance');
  await page.click('[data-a="sub"][data-v="perf"]');
  await page.click('[data-a="ex"][data-v="rdl"] >> nth=0');
  await page.waitForSelector('#sheet:not([hidden])');
  assert.equal(await page.locator('#sheet img, #sheet script').count(), 0);
  assert.equal(await page.evaluate(() => window.__pwned), undefined);
  assert.deepEqual(page.errors.filter((e) => !/Content Security Policy/.test(e)), []);
});

test('deux onglets ouverts : les séances enregistrées de chaque côté sont conservées et affichées', async ({ ctx, base }) => {
  const a = await open(ctx, base, '/axel.html');
  const b = await open(ctx, base, '/axel.html');
  const quick = async (page, x, reps) => {
    await page.click(`details.ex[data-ex="${x}"] summary`);
    await page.fill(`details.ex[data-ex="${x}"] [data-i="0"][data-f="r"]`, reps);
    await page.click('[data-a="finish"]');
    await page.waitForSelector('#view details[open][data-h]');
  };
  await quick(a, 1, '10');
  await b.waitForFunction(() => JSON.parse(localStorage.getItem('sport:axel')).history.length === 1);
  await quick(b, 2, '7');
  const S = await state(a);
  assert.deepEqual(S.history.map((h) => h.rows[0].xid).sort(), ['bench', 'rdl']);
  await a.waitForFunction(() => document.querySelectorAll('#view details[data-h]').length === 2);
  assert.deepEqual([...a.errors, ...b.errors], []);
});

test('réglages : sons, objectif hebdomadaire, thème clair conservés après rechargement', async ({ ctx, base }) => {
  let page = await open(ctx, base, '/axel.html');
  await tab(page, 'plus');
  await page.click('[data-a="toggle"][data-v="sound"]');
  await page.click('[data-a="goal"][data-v="3"]');
  await page.click('[data-a="theme"][data-v="light"]');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'light');
  await tab(page, 'seance');
  assert.match(await page.getAttribute('#view .week .meter-ring', 'aria-label'), /0 séance sur 3/);
  await page.click('[data-a="ride"]');
  assert.equal(await page.getAttribute('[data-a="ride"]', 'aria-pressed'), 'true');
  await page.close();
  page = await open(ctx, base, '/axel.html');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'light', 'thème appliqué dès le chargement');
  const S = await state(page);
  assert.deepEqual(S.opt, { sound: false, vib: true, theme: 'light', goal: 3, kgStep: 1 });
  assert.deepEqual(S.rides, [day()]);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  assert.equal(bg, 'rgb(243, 242, 251)');
  assert.deepEqual(page.errors, []);
});

test('tailles d’écran : aucun débordement horizontal du petit téléphone à l’ordinateur', async ({ browser, base }) => {
  const sizes = [[320, 568], [360, 740], [390, 844], [768, 1024], [1280, 800], [844, 390]];
  for (const [width, height] of sizes) {
    const ctx = await browser.newContext({ viewport: { width, height }, serviceWorkers: 'block' });
    for (const prog of ['axel', 'coralie']) {
      const page = await open(ctx, base, `/${prog}.html`, { seed: prog === 'axel' ? { 'sport:axel': JSON.stringify(legacy()) } : {} });
      const where = `${prog} ${width}×${height}`;
      for (const t of ['seance', 'progres', 'exercices', 'programme', 'plus']) {
        await tab(page, t);
        await noOverflow(page, where + ' onglet ' + t);
      }
      if (prog === 'axel') {
        for (const sub of ['cal', 'perf', 'hist']) {
          await tab(page, 'progres');
          await page.click(`[data-a="sub"][data-v="${sub}"]`);
          await noOverflow(page, where + ' progrès ' + sub);
        }
      }
      await tab(page, 'seance');
      await page.click('details.ex[data-ex="0"] summary');
      await noOverflow(page, where + ' exercice ouvert');
      await page.click('[data-a="run"]');
      for (let i = 0; i < 12; i++) {
        await noOverflow(page, where + ' séance étape ' + i);
        const need = await page.evaluate(() => {
          const act = document.querySelector('#workout .w-act');
          const main = [...act.querySelectorAll('.btn')].pop();
          const r = main.getBoundingClientRect();
          return r.bottom <= innerHeight + 1 && r.top >= 0;
        });
        assert.ok(need, where + ' : bouton principal hors écran à l’étape ' + i);
        const k = await page.evaluate(() => ['part', 'sideready', 'done', 'skip'].find((x) => document.querySelector(`#workout .w-act [data-w="${x}"]:not([disabled])`)));
        await page.click(`#workout .w-act [data-w="${k}"]`);
      }
      await page.click('#workout .hero-fig, #workout [data-w="how"]');
      await page.waitForSelector('#sheet:not([hidden])');
      await noOverflow(page, where + ' fiche');
      assert.deepEqual(page.errors, [], where);
      await page.close();
    }
    const home = await open(ctx, base, '/');
    await noOverflow(home, `accueil ${width}×${height}`);
    await ctx.close();
  }
});

test('accessibilité : libellés, rôles, focus et cibles tactiles', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  const audit = () => page.evaluate(() => {
    const out = [];
    const vis = (e) => e.offsetParent !== null && !e.closest('[hidden]') && !e.closest('[inert]');
    for (const e of document.querySelectorAll('button, a[href], input, select, textarea, [role="switch"]')) {
      if (!vis(e)) continue;
      const name = (e.getAttribute('aria-label') || '').trim() || (e.getAttribute('aria-labelledby') ? [...e.getAttribute('aria-labelledby').split(' ')].map((id) => (document.getElementById(id) || {}).textContent || '').join(' ').trim() : '') ||
        (e.labels && e.labels[0] ? e.labels[0].textContent.trim() : '') || e.textContent.trim() || e.getAttribute('title') || '';
      if (!name) out.push('sans nom accessible : ' + e.outerHTML.slice(0, 90));
      const r = e.getBoundingClientRect();
      if (e.matches('button, [role="switch"]') && (r.width < 38 || r.height < 30)) out.push(`cible trop petite (${Math.round(r.width)}×${Math.round(r.height)}) : ` + e.outerHTML.slice(0, 80));
    }
    for (const svg of document.querySelectorAll('svg')) if (vis(svg) && !svg.getAttribute('aria-hidden') && !svg.getAttribute('aria-label')) out.push('svg sans description : ' + svg.outerHTML.slice(0, 60));
    return out;
  });
  for (const t of ['seance', 'progres', 'exercices', 'programme', 'plus']) {
    await tab(page, t);
    assert.deepEqual(await audit(), [], 'onglet ' + t);
  }
  for (const sub of ['cal', 'perf', 'hist']) {
    await tab(page, 'progres');
    await page.click(`[data-a="sub"][data-v="${sub}"]`);
    assert.deepEqual(await audit(), [], 'progrès ' + sub);
  }
  assert.equal(await page.getAttribute('html', 'lang'), 'fr');
  await tab(page, 'seance');
  await page.click('[data-a="run"]');
  assert.deepEqual(await audit(), [], 'séance guidée');
  assert.equal(await page.evaluate(() => document.activeElement && document.activeElement.closest('#workout') !== null), true, 'le focus entre dans la séance');
  await page.keyboard.press('Escape');
  await page.waitForSelector('.dlg');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'dlg-t');
  assert.deepEqual(await audit(), [], 'dialogue');
  assert.deepEqual(page.errors, []);
});

test('ouverture directe depuis le disque (double-clic sur un fichier) : accueil, programmes, séance, police', async ({ ctx }) => {
  const url = (f) => 'file://' + join(ROOT, f);
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('exception : ' + e.message));
  await page.goto(url('index.html'));
  await page.waitForFunction(() => document.getElementById('today').textContent.length > 5);
  await page.click('a.choice.axel');
  await page.waitForSelector('.tabs button');
  assert.match(await text(page, '#date'), /\d/);
  assert.equal(await page.locator('#view details.ex').count(), 6);
  await page.click('details.ex[data-ex="2"] summary');
  await page.fill('details.ex[data-ex="2"] [data-i="0"][data-f="r"]', '8');
  await page.click('[data-a="run"]');
  await page.waitForSelector('#workout .fig[data-anim] path');
  await page.click('[data-w="quit"]');
  await page.click('.dlg button:has-text("Terminer la séance maintenant")');
  await page.click('[data-w="save"]');
  await page.waitForSelector('#view details[open][data-h]');
  for (const t of ['progres', 'exercices', 'plus']) await tab(page, t);
  assert.match(await text(page, '#view'), /Ouvert depuis un fichier/);
  await page.goto(url('coralie.html'));
  await page.waitForSelector('.tabs button');
  assert.match(await text(page, '.hero h2'), /Circuit/);
  await page.goto(url('index.html'));
  assert.match(await text(page, '#st-axel'), /Cette semaine : 1\/2/);
  assert.ok(await page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].some((f) => f.status === 'loaded'); }), 'police chargée');
  assert.deepEqual(errors, []);
});

/* ----- PWA : hors ligne et mises à jour (service worker actif) ----- */

test('hors ligne : après une première visite, tout fonctionne sans réseau (accueil, programmes, séance)', async ({ browser, base }) => {
  const ctx = await browser.newContext({ viewport: PHONE });
  const page = await open(ctx, base, '/axel.html');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  const cached = await page.evaluate(async () => {
    const keys = (await caches.keys()).filter((k) => k.startsWith('moncoach-'));
    return { keys, n: (await (await caches.open(keys[0])).keys()).length };
  });
  assert.equal(cached.keys.length, 1);
  assert.equal(cached.n, precacheList().length + 1, 'tous les fichiers de la liste (et « ./ ») sont en cache');
  await ctx.setOffline(true);
  await page.reload();
  await page.waitForSelector('.tabs button');
  await page.click('[data-a="run"]');
  await page.waitForSelector('#workout .fig[data-anim] path');
  await page.click('[data-w="quit"]');
  await page.click('.dlg button:has-text("Quitter et reprendre plus tard")');
  await tab(page, 'plus');
  await page.waitForFunction(() => /Version \d+\.\d+\.\d+-[0-9a-f]{8}/.test(document.querySelector('#view').textContent));
  assert.match(await text(page, '#view'), /Disponible hors ligne/);
  await page.goto(base + '/coralie.html');
  await page.waitForSelector('.tabs button');
  assert.match(await text(page, '.hero h2'), /Circuit/);
  await page.goto(base + '/');
  await page.waitForSelector('a.choice.axel');
  assert.ok((await page.evaluate(() => document.fonts.check('16px "Bricolage Grotesque"'))), 'police locale disponible');
  const r = await page.goto(base + '/inexistant');
  assert.match(await page.content(), /Page introuvable/);
  assert.ok(r);
  assert.deepEqual(page.errors.filter((e) => !/Failed to load resource/.test(e)), []);
  await ctx.close();
});

test('mise à jour : la nouvelle version s’installe en entier puis remplace l’ancienne sans mélange de fichiers', async ({ browser }) => {
  const dir = mkdtempSync(join(tmpdir(), 'moncoach-'));
  cpSync(ROOT, dir, { recursive: true, filter: (src) => !/node_modules|\.git($|\/)/.test(src) });
  const server = await serve({ port: 0, dir, quiet: true });
  const base = 'http://localhost:' + server.address().port;
  const ctx = await browser.newContext({ viewport: PHONE });
  try {
    const page = await open(ctx, base, '/axel.html');
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    const v1 = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('moncoach-')));
    assert.equal(v1.length, 1);
    // une séance est en cours quand la mise à jour arrive
    await page.click('details.ex[data-ex="0"] summary');
    await page.fill('details.ex[data-ex="0"] [data-i="0"][data-f="r"]', '9');
    // publication d'une nouvelle version : un fichier change, sw.js est régénéré
    const f = join(dir, 'src/ui/views/more.js');
    writeFileSync(f, readFileSync(f, 'utf8').replace('Installer sur le téléphone', 'Installer sur le téléphone (v2)'));
    execFileSync(process.execPath, [join(dir, 'tools/build.mjs')]);
    await tab(page, 'plus');
    await page.click('[data-a="check"]');
    await page.waitForSelector('#update:not([hidden])');
    assert.equal(await page.locator('#view').innerText().then((t) => t.includes('(v2)')), false, 'l’ancienne version reste cohérente tant qu’on n’a pas accepté');
    await Promise.all([page.waitForEvent('load'), page.click('#update button')]);
    await page.waitForSelector('.tabs button');
    await tab(page, 'plus');
    assert.match(await text(page, '#view'), /Installer sur le téléphone \(v2\)/);
    const v2 = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('moncoach-')));
    assert.equal(v2.length, 1, 'ancien cache supprimé');
    assert.notEqual(v2[0], v1[0]);
    assert.equal((await state(page)).drafts.s1.sets[0][0].r, '9', 'la saisie en cours a survécu à la mise à jour');
    // et la nouvelle version fonctionne hors ligne
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('.tabs button');
    await tab(page, 'plus');
    assert.match(await text(page, '#view'), /\(v2\)/);
    assert.deepEqual(page.errors, []);
  } finally {
    await ctx.close();
    server.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test('mise à jour depuis l’ancienne application (service worker v14) : bascule automatique, données conservées', async ({ browser }) => {
  // Le site d'origine est reconstitué depuis Git (étiquette « origine-v14 »), puis remplacé par la nouvelle version.
  const dir = mkdtempSync(join(tmpdir(), 'moncoach-old-'));
  let hasTag = true;
  try {
    execFileSync('git', ['-C', ROOT, 'rev-parse', '--verify', '--quiet', 'origine-v14'], { stdio: 'ignore' });
  } catch (e) {
    hasTag = false;
  }
  if (!hasTag) return 'ignoré : l’étiquette Git « origine-v14 » (site d’origine) n’est pas disponible';
  const tar = execFileSync('git', ['-C', ROOT, 'archive', 'origine-v14'], { maxBuffer: 1e8 });
  execFileSync('tar', ['-x', '-C', dir], { input: tar });
  const server = await serve({ port: 0, dir, quiet: true });
  const base = 'http://localhost:' + server.address().port;
  const ctx = await browser.newContext({ viewport: PHONE });
  try {
    const page = await ctx.newPage();
    await page.addInitScript((s) => { if (localStorage.getItem('sport:axel') == null) localStorage.setItem('sport:axel', s); }, JSON.stringify(legacy()));
    await page.goto(base + '/axel.html');
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    assert.deepEqual(await page.evaluate(() => caches.keys()), ['moncoach-v14']);
    // déploiement de la nouvelle version par-dessus l'ancienne
    cpSync(ROOT, dir, { recursive: true, filter: (src) => !/node_modules|\.git($|\/)/.test(src) });
    await page.goto(base + '/axel.html');
    await page.waitForSelector('.tabs [data-t="progres"]', { timeout: 20000 });
    await page.waitForFunction(async () => {
      const keys = await caches.keys();
      return keys.length === 1 && keys[0].startsWith('moncoach-2.');
    }, null, { timeout: 20000 });
    await page.waitForSelector('.tabs [data-t="progres"]');
    await page.click('.tabs [data-t="progres"]');
    assert.match(await page.locator('.tiles').innerText(), /3\s*séances/);
    assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem('sport:axel:backup-v1')))).history.length, 3);
  } finally {
    await ctx.close();
    server.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

/* ---------- Version 3 : programmes personnalisés, tableau de bord, progrès, bibliothèque ---------- */

const plansOf = (page, key = 'axel') => page.evaluate((k) => JSON.parse(localStorage.getItem('sport:' + k + ':plans') || 'null'), key);

test('programmes personnalisés : copie, modification, activation, séance guidée, historique rattaché, export, suppression', async ({ ctx, base, browser }) => {
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  await tab(page, 'programme');
  assert.match(await text(page, '.hero h2'), /Programme d’Axel/);
  await page.click('[data-a="dup"]');
  await page.fill('#dlg-name', 'Axel hiver');
  await page.click('.dlg button:has-text("Continuer")');
  await page.waitForSelector('#editor:not([hidden])');
  assert.equal(await page.inputValue('#editor [data-ef="name"]'), 'Axel hiver');
  // séance 1 : retirer le soulevé de terre, ajouter les pompes au sol, 4 séries, repos 60 s
  await page.click('#editor [data-e="session"][data-i="0"]');
  await page.click('#editor [data-e="del"][data-k="ex"][data-i="1"]');
  await page.click('#editor [data-e="pick"]');
  await page.fill('#editor [data-ef="pickq"]', 'pompes au');
  assert.equal(await page.locator('#editor .pick-list .li:not([hidden])').count(), 1, 'recherche dans la bibliothèque');
  await page.click('#editor [data-e="add"][data-v="pushf"]');
  const n = await page.locator('#editor [data-e="ex"]').count();
  assert.equal(n, 6);
  await page.click(`#editor [data-e="ex"][data-i="${n - 1}"]`);
  await page.click('#editor [data-e="sets"][data-d="1"]');
  await page.selectOption('#editor [data-ef="ex.restS"]', '60');
  // déplacer les pompes en 2ᵉ position
  await page.click('#editor [data-e="top"]');
  for (let i = n - 1; i > 1; i--) await page.click(`#editor [data-e="up"][data-k="ex"][data-i="${i}"]`);
  assert.match(await text(page, '#editor [data-e="ex"][data-i="1"]'), /Pompes au sol/);
  await page.click('#editor [data-e="top"]');
  await page.click('#editor [data-e="saveuse"]');
  await page.waitForSelector('#editor', { state: 'hidden' });
  let P = await plansOf(page);
  assert.equal(P.plans.length, 1);
  assert.equal(P.active, P.plans[0].id);
  const se1 = P.plans[0].seances[0];
  assert.deepEqual(se1.exos.map((e) => e.id), ['bulg', 'pushf', 'bench', 'row', 'calf', 'plank']);
  assert.deepEqual([se1.exos[1].sets, se1.exos[1].restS, se1.exos[1].noLoad], [4, 60, true]);
  assert.equal((await state(page)).history.length, 3, 'historique intact');
  // le tableau de bord montre le programme actif ; la séance guidée suit le programme modifié
  await page.click('[data-a="sid"][data-v="' + se1.id + '"]');
  assert.match(await text(page, '.hero'), /Axel hiver/);
  await page.click('[data-a="run"]');
  await page.click('#workout [data-w="plan"]');
  await page.click('.dlg button:has-text("Pompes au sol")');
  assert.equal(await text(page, '#workout .gt'), 'Pompes au sol');
  assert.equal(await page.locator('#w-k').count(), 0, 'sans charge : pas de champ kg');
  await page.fill('#w-r', '12');
  await page.click('#workout [data-w="done"]');
  assert.match(await text(page, '#workout .w-body'), /Repos/);
  // les fentes bulgares gardent leur historique (même identifiant) : dernière fois proposée
  await page.click('#workout [data-w="plan"]');
  await page.click('.dlg button:has-text("Fentes bulgares")');
  assert.match(await text(page, '.lastline'), /12 kg · 10 \/ 10 \/ 10 \/ 10/);
  await page.click('#workout [data-w="quit"]');
  await page.click('.dlg button:has-text("Terminer la séance maintenant")');
  await page.click('#workout [data-w="save"]');
  await page.waitForSelector('#view details[open][data-h]');
  const S = await state(page);
  const e = S.history.find((h) => h.pid);
  assert.equal(e.pid, P.active);
  assert.deepEqual(e.rows, [{ ex: 'Pompes au sol', xid: 'pushf', sets: [{ r: '12', k: '' }] }]);
  // export : les programmes sont dans le fichier
  await tab(page, 'plus');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('[data-a="exp"]')]);
  const payload = JSON.parse(readFileSync(await dl.path(), 'utf8'));
  assert.equal(payload.v, 3);
  assert.equal(payload.plans.plans[0].name, 'Axel hiver');
  // retour au programme de base : historique complet, records du programme personnalisé conservés
  await tab(page, 'programme');
  await page.click('[data-a="menu"][data-v=""]');
  await page.click('.dlg button:has-text("Utiliser ce programme")');
  assert.equal((await plansOf(page)).active, '');
  await tab(page, 'progres');
  await page.click('[data-a="sub"][data-v="perf"]');
  assert.match(await text(page, '#view'), /Records personnels/);
  // suppression avec confirmation, puis annulation
  await tab(page, 'programme');
  await page.click(`[data-a="menu"][data-v="${P.active}"]`);
  await page.click('.dlg button:has-text("Supprimer")');
  await page.click('.dlg button:has-text("Supprimer")');
  assert.equal((await plansOf(page)).plans.length, 0);
  await page.click('#toast button');
  assert.equal((await plansOf(page)).plans.length, 1, 'annulation');
  // import sur un appareil vierge : séances et programme ajoutés, rien n'est activé d'office
  const ctx2 = await browser.newContext({ viewport: PHONE, serviceWorkers: 'block' });
  const p2 = await open(ctx2, base, '/axel.html');
  await tab(p2, 'plus');
  await p2.click('summary:has-text("Importer une sauvegarde")');
  await p2.setInputFiles('#imp', await dl.path());
  await p2.waitForFunction(() => /1 programme ajouté/.test(document.querySelector('#toast').textContent));
  P = await plansOf(p2);
  assert.equal(P.plans.length, 1);
  assert.equal(P.active, '');
  assert.deepEqual([...page.errors, ...p2.errors], []);
  await ctx2.close();
});

test('programme créé de zéro : inutilisable tant qu’il est vide, circuit personnalisé avec ses propres temps', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/coralie.html');
  await tab(page, 'programme');
  await page.click('[data-a="new"]');
  await page.fill('#dlg-name', 'Circuit express');
  await page.click('.dlg button:has-text("En circuit")');
  await page.waitForSelector('#editor:not([hidden])');
  assert.match(await text(page, '#editor .card.note'), /aucun exercice/);
  assert.equal(await page.locator('#editor [data-e="saveuse"]').count(), 0, 'activation impossible');
  await page.selectOption('#editor [data-ef="p.work"]', '30');
  await page.selectOption('#editor [data-ef="p.tours"]', '1');
  await page.click('#editor [data-e="session"][data-i="0"]');
  for (const k of ['bsquat', 'pushf']) {
    await page.click('#editor [data-e="pick"]');
    await page.click(`#editor [data-e="add"][data-v="${k}"]`);
  }
  await page.click('#editor [data-e="top"]');
  assert.equal(await page.locator('#editor .card.note').count(), 0);
  await page.click('#editor [data-e="saveuse"]');
  await page.waitForSelector('#editor', { state: 'hidden' });
  assert.match(await text(page, '.hero h2'), /Circuit/);
  assert.match(await text(page, '.hero'), /2\s*exercices/);
  await page.click('[data-a="tours"][data-v="1"]');
  await page.click('[data-a="run"]');
  await advance(page, async () => /Premier exercice/.test(await kicker(page)));
  await page.click('#workout [data-w="done"]');
  assert.match(await kicker(page), /Exercice 1 \/ 2/);
  await near(page, 30, 'travail personnalisé');
  // l'échauffement par défaut des séances créées n'utilise que des mouvements illustrés
  assert.deepEqual(page.errors, []);
});

test('tableau de bord et progrès : chiffres issus des données, rien d’inventé sans historique', async ({ ctx, base, browser }) => {
  // sans données : états vides explicites
  const empty = await open(ctx, base, '/axel.html');
  assert.match(await text(empty, '#view .empty-card'), /se remplira/);
  assert.equal(await empty.locator('#view .grid2').count(), 0);
  await empty.close();
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  const last = await text(page, '#view .card.tap');
  assert.match(last, /Dernière séance · il y a 7 jours/i);
  assert.match(last, /47\s*min/);
  assert.match(last, /8\s*séries/);
  assert.match(await text(page, '#view .grid2 .card:nth-child(2)'), /3\s*séances/);
  await page.click('#view .card.tap');
  await page.waitForSelector('#view details[open][data-h="lr1c2d3e"]');
  assert.match(await text(page, '#view details[open]'), /Fois précédente/);
  // bilan
  await page.click('[data-a="sub"][data-v="bilan"]');
  const tiles = await text(page, '.tiles');
  assert.match(tiles, /3\s*séances/);
  assert.match(tiles, /49\s*min/, 'durée moyenne (51, 48, 47)');
  assert.match(tiles, /20\s*séries/);
  await page.click('[data-a="period"][data-v="365"]');
  assert.match(await text(page, '#view'), /Séances par mois/);
  assert.match(await text(page, '.hbars'), /Jambes/);
  // historique filtré par exercice
  await page.click('[data-a="sub"][data-v="hist"]');
  assert.equal(await page.locator('#view details.hist').count(), 3);
  await page.selectOption('[data-c="fex"]', 'incl');
  assert.equal(await page.locator('#view details.hist').count(), 1);
  await page.check('[data-c="fnote"]');
  assert.match(await text(page, '#view .card.flat'), /Aucune séance/);
  // calendrier : jour d'une séance → détail
  await page.click('[data-a="sub"][data-v="cal"]');
  const d = day(-7);
  if (d.slice(0, 7) !== day().slice(0, 7)) await page.click('[data-a="month"][data-v="-1"]');
  await page.click(`.cal [data-v="${d}"]`);
  await page.click('.dlg button:has-text("Voir le détail")');
  await page.waitForSelector('#view details[open][data-h="lr1c2d3e"]');
  assert.deepEqual(page.errors, []);
});

test('bibliothèque : recherche, filtres matériel et mouvement, fiche complète, variantes', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html');
  await tab(page, 'exercices');
  const visible = () => page.locator('#view .lib .li[data-a="open"]:not([hidden])').count();
  const all = await visible();
  assert.ok(all >= 20, 'bibliothèque complète');
  await page.fill('[data-in="q"]', 'pompes');
  assert.equal(await visible(), 2);
  assert.match(await text(page, '.count'), /2 exercices pour « pompes »/);
  await page.fill('[data-in="q"]', '');
  await page.selectOption('[data-c="equip"]', 'none');
  const names = await page.locator('#view .lib .li[data-a="open"] b').allInnerTexts();
  assert.deepEqual(names.sort(), ['Pompes au sol', 'Squat au poids du corps']);
  await page.selectOption('[data-c="equip"]', '');
  await page.selectOption('[data-c="type"]', 'pull');
  assert.equal(await visible(), 2);
  await page.selectOption('[data-c="type"]', '');
  await page.click('[data-a="group"][data-v="chest"]');
  await page.click('.li[data-v="pushf"]');
  await page.waitForSelector('#sheet:not([hidden])');
  const sheet = await text(page, '#sheet');
  for (const part of ['Position de départ', 'Exécution', 'Conseil', 'Erreurs fréquentes', 'Variantes', 'Sans matériel']) assert.ok(sheet.includes(part), part);
  await page.click('#sheet [data-s="variant"][data-v="push"]');
  assert.equal(await text(page, '#sheet-t'), 'Pompes inclinées');
  await page.keyboard.press('Escape');
  assert.deepEqual(page.errors, []);
});

test('séance guidée : pas de charge réglable, aperçu de la séance, valeur de la même série la dernière fois', async ({ ctx, base }) => {
  const page = await open(ctx, base, '/axel.html', { seed: { 'sport:axel': JSON.stringify(legacy()) } });
  await tab(page, 'plus');
  await page.click('[data-a="kgstep"][data-v="2"]');
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('sport:axel')).opt.kgStep === 2);
  await tab(page, 'seance');
  await page.click('[data-a="run"]');
  await page.click('#workout [data-w="plan"]');
  assert.equal(await page.locator('.dlg button').count(), 7, '6 exercices + fermer');
  await page.click('.dlg button:has-text("Soulevé de terre roumain")');
  assert.match(await text(page, '.lastline'), /Série 1 la dernière fois : 10 reps × 18 kg/);
  assert.equal(await page.inputValue('#w-k'), '18');
  await page.click('[data-st="w-k"][data-d="1"]');
  assert.equal(await page.inputValue('#w-k'), '20', 'pas de 2 kg');
  await page.click('#workout [data-w="done"]');
  await page.click('#workout [data-w="plan"]');
  assert.match(await text(page, '.dlg'), /Soulevé de terre roumain · 1\/4/);
  assert.deepEqual(page.errors, []);
});

/* ---------- Exécution ---------- */

const filter = process.argv.slice(2).join(' ').toLowerCase();
const server = await serve({ port: 0, quiet: true });
const base = 'http://localhost:' + server.address().port;
const browser = await chromium.launch();
let failed = 0;
let skipped = 0;
const t0 = Date.now();
for (const t of tests) {
  if (filter && !t.name.toLowerCase().includes(filter)) continue;
  const ctx = await browser.newContext({ viewport: PHONE, serviceWorkers: 'block', acceptDownloads: true });
  const start = Date.now();
  try {
    const res = await t.fn({ ctx, base, browser });
    if (typeof res === 'string') {
      skipped++;
      console.log(`- ${t.name} (${res})`);
    } else console.log(`✓ ${t.name} (${((Date.now() - start) / 1000).toFixed(1)} s)`);
  } catch (e) {
    failed++;
    console.log(`✗ ${t.name}\n    ${String(e.stack || e).split('\n').slice(0, 8).join('\n    ')}`);
  }
  await ctx.close().catch(() => {});
}
await browser.close();
server.close();
const ran = tests.filter((t) => !filter || t.name.toLowerCase().includes(filter)).length;
console.log(`\n${ran - failed - skipped} réussi(s), ${failed} échec(s), ${skipped} ignoré(s) sur ${ran} scénario(s) en ${((Date.now() - t0) / 1000).toFixed(0)} s.`);
process.exit(failed ? 1 : 0);
