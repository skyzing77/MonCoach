#!/usr/bin/env node
/* Captures d'écran de toutes les vues, du petit téléphone à l'ordinateur, en thème sombre et clair, avec un historique
   réaliste. Les images sont écrites dans tests/e2e/captures/ pour comparer deux versions à l'œil.
   Le script échoue si une page produit une erreur ou déborde horizontalement.
   Lancement : npm run test:visual            (une seule taille : npm run test:visual -- 390) */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { serve } from '../../tools/serve.mjs';
import { ROOT } from '../../tools/build.mjs';

function loadPlaywright() {
  for (const p of [ROOT, ...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node-tools/node_modules']) {
    try {
      return createRequire(join(p, 'x.js'))('playwright');
    } catch (e) {
      /* essai suivant */
    }
  }
  console.error('Playwright introuvable : npm ci && npx playwright install chromium');
  process.exit(2);
}
const { chromium } = loadPlaywright();

const SIZES = [[320, 568, 'petit-telephone'], [390, 844, 'telephone'], [430, 932, 'grand-telephone'], [844, 390, 'paysage'], [768, 1024, 'tablette'], [1280, 800, 'ordinateur']];
const only = process.argv[2];
const OUT = join(ROOT, 'tests/e2e/captures');
mkdirSync(OUT, { recursive: true });

const pad = (n) => String(n).padStart(2, '0');
const day = (off) => {
  const d = new Date();
  d.setDate(d.getDate() + off);
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
};

/** Dix semaines d'entraînement d'Axel, avec une progression régulière des charges. */
function axelHistory() {
  const history = [];
  for (let w = 10; w >= 1; w--) {
    const p = 10 - w;
    history.push({ id: 'a' + w, date: day(-7 * w + 1), sid: 's1', short: 'Séance 1 · jambes et dos', title: '', tours: 0, note: w % 3 ? '' : 'Bonnes sensations', vol: 0, dur: 46 + (w % 5), at: 0,
      rows: [
        { ex: 'Fentes bulgares (pied arrière sur le banc)', xid: 'bulg', sets: Array.from({ length: 4 }, () => ({ r: String(7 + (p % 4)), k: String(10 + 2 * Math.floor(p / 3)) })) },
        { ex: 'Soulevé de terre roumain aux haltères', xid: 'rdl', sets: Array.from({ length: 4 }, () => ({ r: '10', k: String(14 + 2 * Math.floor(p / 2)) })) },
        { ex: 'Planche (gainage sur les avant-bras)', xid: 'plank', sets: [{ r: String(30 + p), k: '' }, { r: '30', k: '' }] },
      ] });
    history.push({ id: 'b' + w, date: day(-7 * w + 4), sid: 's2', short: 'Séance 2 · haut du corps', title: '', tours: 0, note: '', vol: 0, dur: 48 + (w % 4), at: 0,
      rows: [
        { ex: 'Développé incliné aux haltères', xid: 'incl', sets: Array.from({ length: 4 }, () => ({ r: '8', k: String(12 + 2 * Math.floor(p / 3)) })) },
        { ex: 'Superset : élévations latérales, curl marteau, extensions triceps', xid: 'curl', sets: Array.from({ length: 3 }, () => ({ r: '12', k: '6', p: [{ r: '12', k: '6' }, { r: '12', k: String(8 + Math.floor(p / 4) * 2) }, { r: '12', k: '10' }] })) },
      ] });
  }
  return { v: 3, history, drafts: {}, rides: [day(-2), day(-9)], cur: 's1', opt: { sound: true, vib: true, theme: 'dark', goal: 0, kgStep: 1 }, exp: day(-20), expN: 10, uns: 4, mt: 0 };
}

const server = await serve({ port: 0, quiet: true });
const base = 'http://localhost:' + server.address().port;
const browser = await chromium.launch();
const problems = [];
let n = 0;
for (const [width, height, name] of SIZES) {
  if (only && String(width) !== only) continue;
  for (const theme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport: { width, height }, serviceWorkers: 'block' });
    for (const prog of ['axel', 'coralie']) {
      const page = await ctx.newPage();
      page.on('pageerror', (e) => problems.push(`${prog} ${name} : ${e.message}`));
      page.on('console', (m) => m.type() === 'error' && problems.push(`${prog} ${name} : ${m.text()}`));
      const seed = prog === 'axel' ? axelHistory() : { v: 3, history: [], drafts: {}, rides: [], cur: 'c1', opt: { theme } };
      seed.opt.theme = theme;
      await page.addInitScript(([k, v]) => localStorage.getItem(k) || localStorage.setItem(k, v), ['sport:' + prog, JSON.stringify(seed)]);
      await page.goto(`${base}/${prog}.html`);
      await page.waitForSelector('.tabs button');
      const shots = [['seance'], ['progres', 'bilan'], ['progres', 'cal'], ['progres', 'hist'], ['exercices'], ['programme'], ['plus']];
      for (const [t, sub] of shots) {
        await page.click(`.tabs [data-t="${t}"]`);
        if (sub && (await page.locator(`[data-a="sub"][data-v="${sub}"]`).count())) await page.click(`[data-a="sub"][data-v="${sub}"]`);
        await page.waitForTimeout(350); // fin de l'animation d'apparition
        const o = await page.evaluate(() => ({ sw: document.scrollingElement.scrollWidth, cw: document.scrollingElement.clientWidth }));
        if (o.sw > o.cw + 1) problems.push(`${prog} ${name} ${t} ${sub || ''} : débordement horizontal`);
        await page.screenshot({ path: join(OUT, `${prog}-${name}-${theme}-${t}${sub ? '-' + sub : ''}.png`) });
        n++;
      }
      await page.click('.tabs [data-t="seance"]');
      await page.click('[data-a="run"]');
      await page.waitForSelector('#workout:not([hidden])');
      await page.waitForTimeout(350);
      await page.screenshot({ path: join(OUT, `${prog}-${name}-${theme}-seance-guidee.png`) });
      n++;
      await page.close();
    }
    const home = await ctx.newPage();
    home.on('pageerror', (e) => problems.push(`accueil ${name} : ${e.message}`));
    await home.emulateMedia({ colorScheme: theme });
    await home.goto(`${base}/index.html`);
    await home.waitForTimeout(300);
    await home.screenshot({ path: join(OUT, `accueil-${name}-${theme}.png`) });
    n++;
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log(`${n} captures dans tests/e2e/captures/`);
if (problems.length) {
  console.log('Problèmes :\n' + problems.join('\n'));
  process.exit(1);
}
