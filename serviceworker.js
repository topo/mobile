

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/assets/glasses.svg',
          '/assets/next.png',
          '/assets/square_192x192.png',
          '/build/bundle.js',
          '/index.html',
          '/offline.html'
        ]
      );
    })
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
