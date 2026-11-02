/* Service worker : met le site en cache pour qu'il fonctionne sans réseau (salle, garage…).
   ⚠️ Après chaque modification d'un fichier du site, incrémenter VERSION
   pour que les téléphones récupèrent la nouvelle version. */
const VERSION = 'moncoach-v1';
const FILES = [
  './', 'index.html', 'axel.html', 'coralie.html', '404.html',
  'assets/app.js', 'assets/style.css', 'assets/exercices.js', 'assets/fonts.css',
  'assets/fonts/bricolage-grotesque.woff2',
  'programmes/axel.js', 'programmes/coralie.js',
  'manifest-accueil.webmanifest', 'manifest-axel.webmanifest', 'manifest-coralie.webmanifest',
  'assets/icons/accueil-192.png', 'assets/icons/axel-192.png', 'assets/icons/coralie-192.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Réseau d'abord (pour avoir les dernières mises à jour), cache en secours :
   hors ligne, ou si le réseau met plus de 3 s à répondre (salle avec mauvaise couverture). */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const fromCache = () => caches.match(req, { ignoreSearch: true })
    .then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined));
  const network = fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  });
  const slow = new Promise(r => setTimeout(r, 3000)).then(fromCache);
  e.respondWith(
    Promise.race([network.catch(fromCache), slow.then(r => r || network)])
      .then(r => r || network)
      .catch(() => Response.error())
  );
});
