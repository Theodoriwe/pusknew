// Service Worker для кэширования и оптимизации производительности
const CACHE_VERSION = 'v1';
const CACHE_NAME = `pusk-cache-${CACHE_VERSION}`;

// Критичные ресурсы, которые должны быть закэшированы
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Кэшируем критичные ресурсы
      return cache.addAll(CRITICAL_ASSETS).catch(() => {
        console.log('Some assets failed to cache');
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Удаляем старые версии кэша
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем API запросы и не-GET запросы
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // Кэш-первая стратегия для статичных ресурсов
  if (url.pathname.match(/\.(js|css|woff2|png|jpg|webp|svg)$/)) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          // Кэшируем удачный ответ
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      }).catch(() => response)
    );
  } else {
    // Network-first для HTML и остального
    event.respondWith(
      fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match(request).then(response => {
          return response || new Response('Offline', { status: 503 });
        });
      })
    );
  }
});
