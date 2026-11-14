/* Service worker de Mon coach : fonctionnement hors ligne et mises à jour sans mélange de versions.

   - À l'installation, TOUS les fichiers de l'appli sont téléchargés dans un cache propre à la version
     (tout ou rien : si un fichier manque, l'ancienne version reste en place).
   - Les fichiers sont ensuite servis depuis ce cache (démarrage instantané, même sans réseau).
   - Une nouvelle version s'installe en arrière-plan puis ATTEND : elle prend la main quand l'utilisateur
     l'accepte (bandeau « Nouvelle version prête ») ou à la prochaine ouverture de l'appli.
     On n'exécute donc jamais du HTML d'une version avec le JavaScript d'une autre.

   ⚠️ Le bloc ci-dessous est généré : après toute modification du site, lancer « npm run build »
      (les tests et l'intégration continue vérifient qu'il est à jour). */
/* build:begin */
const VERSION = '3.0.0-d0c492c4';
const FILES = [
  './',
  '404.html',
  'axel.html',
  'coralie.html',
  'index.html',
  'manifest-accueil.webmanifest',
  'manifest-axel.webmanifest',
  'manifest-coralie.webmanifest',
  'assets/css/app.css',
  'assets/css/home.css',
  'assets/fonts.css',
  'assets/icons/accueil-192.png',
  'assets/icons/accueil-32.png',
  'assets/icons/accueil-apple-180.png',
  'assets/icons/axel-192.png',
  'assets/icons/axel-32.png',
  'assets/icons/axel-apple-180.png',
  'assets/icons/coralie-192.png',
  'assets/icons/coralie-32.png',
  'assets/icons/coralie-apple-180.png',
  'assets/js/app.js',
  'assets/js/home.js',
  'src/boot-theme.js',
];
/* build:end */

const PREFIX = 'moncoach-';
const CACHE = PREFIX + VERSION;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // cache: 'reload' → on ne réutilise pas une copie périmée du cache HTTP du navigateur
      cache.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))),
    ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();
  if (data.type === 'GET_VERSION' && event.source) event.source.postMessage({ type: 'VERSION', version: VERSION });
});

async function respond(request) {
  const cache = await caches.open(CACHE);
  const url = new URL(request.url);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  if (request.mode === 'navigate') {
    // GitHub Pages sert aussi « /axel » pour « /axel.html »
    const html = await cache.match(url.pathname + '.html');
    if (html) return html;
  }
  try {
    return await fetch(request);
  } catch (e) {
    if (request.mode === 'navigate') {
      const fallback = (await cache.match('404.html')) || (await cache.match('index.html'));
      if (fallback) return fallback;
    }
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(respond(request));
});
