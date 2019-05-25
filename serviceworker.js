

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
