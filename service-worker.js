const CACHE_NAME = 'my-pwa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// INSTALL - cache assets (tolère fichiers manquants)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('Asset not cached (missing?):', asset, err);
        }
      }
    })
  );
});

// ACTIVATE - nettoyage caches anciens
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// FETCH - cache-first fallback network, gérer erreurs proprement
self.addEventListener('fetch', event => {
  // on ne gère que les GET navigations/resources pour simplifier
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // optionnel: mettre en cache la réponse dynamique
        return resp;
      }).catch(() => {
        // fallback : renvoyer index.html pour navigation (SPA-style)
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // sinon réponse vide
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
