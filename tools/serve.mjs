#!/usr/bin/env node
/* Petit serveur statique pour le développement et les tests (aucune dépendance).
   Usage : node tools/serve.mjs [port] [dossier]   → http://localhost:8000
   Les fichiers sont servis sans cache HTTP, comme le fait GitHub Pages pour sw.js. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

export function serve({ port = 8000, dir = resolve(fileURLToPath(new URL('..', import.meta.url))), quiet = false } = {}) {
  const base = resolve(dir);
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let path = normalize(join(base, decodeURIComponent(url.pathname)));
      if (path !== base && !path.startsWith(base + sep)) throw Object.assign(new Error('interdit'), { code: 403 });
      let st = await stat(path).catch(() => null);
      if (st && st.isDirectory()) {
        path = join(path, 'index.html');
        st = await stat(path).catch(() => null);
      }
      if (!st) {
        const body = await readFile(join(base, '404.html')).catch(() => 'Introuvable');
        res.writeHead(404, { 'content-type': TYPES['.html'], 'cache-control': 'no-store' });
        return res.end(body);
      }
      const body = await readFile(path);
      res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch (e) {
      res.writeHead(e.code === 403 ? 403 : 500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(e.code === 403 ? 'Interdit' : 'Erreur');
    }
  });
  return new Promise((ok) => server.listen(port, () => {
    if (!quiet) console.log(`Mon coach : http://localhost:${server.address().port}`);
    ok(server);
  }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  serve({ port: +process.argv[2] || 8000, dir: process.argv[3] });
}
