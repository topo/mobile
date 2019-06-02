let VERSION = "0.1.7-1";

let CACHES = {
  assets: 'assets-v'+VERSION,
  fetchable:'fetch-v'+VERSION,
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

  event.respondWith(
    caches.open(fetchable).then(function(cache) {
      return cache.match(request).then(function(response) {
        // Fetch or return cache
        return fetch(request)
          .then(function(resp) {
            if (resp.ok) {
              cache.put(request, resp.clone());
              broadcastMessage(Date.now());
            }
            return resp
          })
          .catch(function(error) {
            return response
          })
      }).catch(function(err) {
        return response
      })
    })
  )
});


function broadcastMessage(message) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    })
  })
}
