#!/usr/bin/env node
/* Prépare une version publiable :
   1. assemble les modules de src/ en scripts classiques (assets/js/app.js et assets/js/home.js), utilisables même
      quand une page est ouverte directement depuis le disque ;
   2. calcule la liste des fichiers à mettre en cache et une empreinte de leur contenu, et les inscrit dans sw.js.

   node tools/build.mjs           met les fichiers générés à jour
   node tools/build.mjs --check   vérifie seulement (code de sortie 1 si un fichier généré n'est pas à jour) */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from './bundle.mjs';

export const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

/** Scripts générés : fichier publié → point d'entrée dans src/. */
export const BUNDLES = { 'assets/js/app.js': 'src/main.js', 'assets/js/home.js': 'src/home.js' };

function walk(dir, keep) {
  const out = [];
  for (const name of readdirSync(join(ROOT, dir)).sort()) {
    const rel = dir ? dir + '/' + name : name;
    if (statSync(join(ROOT, rel)).isDirectory()) out.push(...walk(rel, keep));
    else if (keep(rel)) out.push(rel);
  }
  return out;
}

/** Fichiers nécessaires au fonctionnement hors ligne (les grandes icônes 512 px ne servent qu'à l'installation). */
export function precacheList() {
  const top = readdirSync(ROOT).filter((f) => /\.(html|webmanifest)$/.test(f)).sort();
  return [
    ...top,
    ...walk('assets', (f) => /\.(css|js)$/.test(f) || /-(32|192|apple-180)\.png$/.test(f)),
    'src/boot-theme.js',
  ];
}

export function computeVersion(files = precacheList()) {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const h = createHash('sha256');
  for (const f of files) h.update(f).update('\0').update(existsSync(join(ROOT, f)) ? readFileSync(join(ROOT, f)) : '').update('\0');
  return pkg.version + '-' + h.digest('hex').slice(0, 8);
}

/** Feuille de police avec la police embarquée : le navigateur refuse de charger un fichier de police séparé quand
    la page est ouverte depuis le disque, alors qu'une police intégrée à la feuille de style s'affiche partout. */
export function fontCSS() {
  const b64 = readFileSync(join(ROOT, 'assets/fonts/bricolage-grotesque.woff2')).toString('base64');
  return `/* Fichier généré par « npm run build » à partir de fonts/bricolage-grotesque.woff2 : ne pas modifier à la main.
   Police intégrée : fonctionne hors ligne, depuis le disque, et sans aucune requête vers un service externe.
   Bricolage Grotesque, licence SIL Open Font License 1.1 : voir fonts/OFL.txt */
@font-face{
  font-family:'Bricolage Grotesque';
  font-style:normal;
  font-display:swap;
  font-weight:200 800;
  src:url(data:font/woff2;base64,${b64}) format('woff2');
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
`;
}

/** Contenu attendu de chaque fichier généré, comparé au contenu actuel. */
export function generated() {
  const out = [];
  {
    const path = join(ROOT, 'assets/fonts.css');
    out.push({ file: 'assets/fonts.css', current: existsSync(path) ? readFileSync(path, 'utf8') : null, next: fontCSS() });
  }
  for (const [file, entry] of Object.entries(BUNDLES)) {
    const path = join(ROOT, file);
    out.push({ file, current: existsSync(path) ? readFileSync(path, 'utf8') : null, next: bundle(ROOT, entry) });
  }
  return out;
}

export function stampedSW(files = precacheList(), version = computeVersion(files)) {
  const src = readFileSync(join(ROOT, 'sw.js'), 'utf8');
  const block = `/* build:begin */\nconst VERSION = '${version}';\nconst FILES = [\n  './',\n${files.map((f) => `  '${f}',`).join('\n')}\n];\n/* build:end */`;
  const re = /\/\* build:begin \*\/[\s\S]*?\/\* build:end \*\//;
  if (!re.test(src)) throw new Error('Bloc « build » introuvable dans sw.js');
  return { file: 'sw.js', current: src, next: src.replace(re, block), version, files };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const bundles = generated();
  let stale = bundles.filter((g) => g.current !== g.next);
  if (!check) {
    mkdirSync(join(ROOT, 'assets/js'), { recursive: true });
    for (const g of stale) writeFileSync(join(ROOT, g.file), g.next);
  }
  // La version se calcule sur les scripts générés à jour.
  const files = precacheList();
  const h = createHash('sha256');
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  for (const f of files) {
    const g = bundles.find((b) => b.file === f);
    h.update(f).update('\0').update(g ? g.next : readFileSync(join(ROOT, f))).update('\0');
  }
  const sw = stampedSW(files, pkg.version + '-' + h.digest('hex').slice(0, 8));
  if (sw.current !== sw.next) stale.push(sw);
  if (check) {
    if (stale.length) {
      console.error('Fichiers générés pas à jour (' + stale.map((s) => s.file).join(', ') + ') : lancer « npm run build ».');
      process.exit(1);
    }
    console.log('Fichiers générés à jour (version ' + sw.version + ', ' + files.length + ' fichiers en cache).');
  } else {
    if (sw.current !== sw.next) writeFileSync(join(ROOT, 'sw.js'), sw.next);
    console.log((stale.length ? 'Mis à jour : ' + stale.map((s) => s.file).join(', ') : 'Déjà à jour') + ' · version ' + sw.version + ', ' + files.length + ' fichiers en cache.');
  }
}
