import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { ROOT, precacheList, generated, BUNDLES } from '../../tools/build.mjs';
import { execFileSync } from 'node:child_process';

const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const files = precacheList();
const walkSrc = (d) => readdirSync(join(ROOT, d), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkSrc(d + '/' + e.name) : e.name.endsWith('.js') ? [d + '/' + e.name] : []));
const srcFiles = walkSrc('src');
const pages = ['index.html', 'axel.html', 'coralie.html'];

test('fichiers générés à jour (scripts assemblés, police, sw.js) : « npm run build » a bien été lancé', () => {
  for (const g of generated()) assert.ok(g.current === g.next, g.file + ' n’est pas à jour : lancer « npm run build »');
  execFileSync(process.execPath, [join(ROOT, 'tools/build.mjs'), '--check'], { stdio: 'pipe' });
  assert.match(read('sw.js'), /const VERSION = '\d+\.\d+\.\d+-[0-9a-f]{8}'/);
});

test('les pages chargent des scripts classiques, jamais des modules (les modules ne fonctionnent pas depuis le disque)', () => {
  for (const page of pages) {
    const html = read(page);
    assert.doesNotMatch(html, /type="module"/, page);
    const want = page === 'index.html' ? 'assets/js/home.js' : 'assets/js/app.js';
    assert.ok(html.includes(`<script defer src="${want}"></script>`), page + ' doit charger ' + want);
  }
  for (const f of Object.keys(BUNDLES)) {
    const code = read(f);
    assert.doesNotMatch(code, /^(import|export)\s/m, f + ' : instruction de module restante');
    assert.doesNotThrow(() => new Function(code), f + ' : syntaxe invalide pour un script classique');
  }
});

test('chaque import de module pointe vers un fichier existant', () => {
  for (const f of srcFiles) {
    for (const m of read(f).matchAll(/(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      const spec = m[1] || m[2];
      assert.ok(spec.startsWith('.'), f + ' : import non relatif « ' + spec + ' » (aucune dépendance externe n’est autorisée)');
      const target = normalize(join(dirname(f), spec)).replace(/\\/g, '/');
      assert.ok(existsSync(join(ROOT, target)), f + ' importe ' + target + ', fichier introuvable');
    }
  }
});

test('les pages ne référencent que des fichiers locaux, existants et mis en cache', () => {
  for (const page of [...pages, '404.html']) {
    const html = read(page);
    for (const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      const url = m[1];
      assert.doesNotMatch(url, /^(https?:)?\/\//, page + ' : ressource externe ' + url);
      if (url === './') continue;
      assert.ok(existsSync(join(ROOT, url)), page + ' : fichier manquant ' + url);
      assert.ok(files.includes(url), page + ' : ' + url + ' absent du cache hors ligne');
    }
  }
});

test('les pages de l’appli n’exécutent aucun script en ligne et déclarent une politique de sécurité stricte', () => {
  for (const page of pages) {
    const html = read(page);
    const csp = (html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1] || '';
    assert.match(csp, /default-src 'self'/, page);
    assert.match(csp, /script-src 'self'(;|$)/, page + ' : pas de script en ligne ni externe');
    assert.match(csp, /connect-src 'self'/, page + ' : aucune connexion vers un autre serveur');
    assert.match(csp, /object-src 'none'/, page);
    assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)[^>]*>/, page + ' : script en ligne');
    assert.doesNotMatch(html, /\son[a-z]+="/, page + ' : gestionnaire d’évènement en ligne');
    assert.match(html, /<html lang="fr"/);
    assert.match(html, /viewport-fit=cover/);
  }
});

test('confidentialité : le code de l’appli ne contient aucun envoi de données vers le réseau', () => {
  for (const f of srcFiles) {
    const code = read(f);
    assert.doesNotMatch(code, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|\.src\s*=\s*['"`]https?:/, f);
    for (const m of code.matchAll(/https?:\/\/[^\s'"`)]+/g)) {
      assert.match(m[0], /^https:\/\/www\.youtube\.com\/results\?search_query=/, f + ' : adresse externe inattendue ' + m[0]);
    }
  }
});

/** Dimensions d'un PNG lues dans son en-tête. */
const pngSize = (f) => {
  const b = readFileSync(join(ROOT, f));
  assert.equal(b.toString('latin1', 1, 4), 'PNG', f);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};

test('manifestes : valides, cohérents avec les pages, icônes aux bonnes dimensions', () => {
  const expected = { accueil: './', axel: './axel.html', coralie: './coralie.html' };
  for (const [name, start] of Object.entries(expected)) {
    const file = `manifest-${name}.webmanifest`;
    const m = JSON.parse(read(file));
    assert.equal(m.start_url, start, file);
    assert.equal(m.id, start, file + ' : l’identifiant ne doit pas changer (applis déjà installées)');
    assert.equal(m.scope, './');
    assert.equal(m.display, 'standalone');
    assert.equal(m.lang, 'fr');
    assert.ok(m.name && m.short_name && m.short_name.length <= 14);
    assert.match(m.background_color, /^#[0-9a-f]{6}$/);
    if (start !== './') assert.ok(existsSync(join(ROOT, start)));
    assert.ok(m.icons.some((i) => i.sizes === '192x192') && m.icons.some((i) => i.sizes === '512x512' && i.purpose === 'any') && m.icons.some((i) => i.purpose === 'maskable'));
    for (const icon of m.icons) {
      assert.ok(existsSync(join(ROOT, icon.src)), file + ' : icône manquante ' + icon.src);
      assert.deepEqual(pngSize(icon.src), icon.sizes.split('x').map(Number), icon.src);
    }
    for (const sc of m.shortcuts || []) assert.ok(existsSync(join(ROOT, sc.url)), file + ' : raccourci ' + sc.url);
    const page = name === 'accueil' ? 'index.html' : name + '.html';
    assert.ok(read(page).includes(`href="${file}"`), page + ' doit déclarer ' + file);
    assert.deepEqual(pngSize(`assets/icons/${name}-apple-180.png`), [180, 180]);
  }
});

test('tous les chemins sont relatifs : le site fonctionne dans un sous-dossier (GitHub Pages) comme à la racine d’un domaine', () => {
  for (const f of [...pages, 'sw.js', ...readdirSync(ROOT).filter((x) => x.endsWith('.webmanifest'))]) {
    const txt = read(f);
    assert.doesNotMatch(txt, /(?:href|src|start_url|scope)["']?\s*[=:]\s*["']\/(?!\/)/, f + ' : chemin absolu');
  }
  const sw = read('sw.js');
  assert.match(sw, /cache\.addAll/);
  assert.doesNotMatch(sw, /skipWaiting\(\)\s*\)?\s*;?\s*\}\s*\)\s*;?\s*$|install[\s\S]{0,200}skipWaiting/, 'la nouvelle version ne doit pas s’imposer pendant l’installation');
});
