let VERSION = "0.1.3-0";

let CACHES = {
  assets: 'assets-v'+VERSION,
  fetchable:'fetch-v'+VERSION
}

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('Hi, installing service worker');
  let { assets } = CACHES;
  event.waitUntil(
    caches.open(assets).then(function(cache) {
      return cache.addAll(
        [
          '/assets/glasses.svg',
          '/assets/next.png',
          '/assets/square_192x192.png',
        ]
      );
    })
  );

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (!CACHES[key]) {
          return caches.delete(key);
        }
      }));
    })
  );
})

self.addEventListener('fetch', function(event) {
  let { request } = event;
  let { fetchable } = CACHES;

  if (request.url.endsWith("&noCache=true") || request.url.endsWith("index.html")) {
    event.respondWith(
      caches.open(fetchable).then(function(cache) {
        return fetch(event.request).then(function(response) {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch((e) => {
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.open(fetchable).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch((e) => {
            return response;
          })
        });
      })
    );
  }
});
