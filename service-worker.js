var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/cat-1.jpeg',
    'images/cat-2.jpeg',
    'images/cat-3.jpeg',
    'images/icon-512.png'

];

self.addEventListener('install',(e) =>{
    console.log('[Service Worker] install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[service worker] cacheing all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

/* self.addEventListener('fetch', function (e) {
    e.respondWith(
        //check if the cache has the file
        caches.match(e.request).then(function (r) {
            console.log('[service worker] fetching resource' + e.request.url);
            // r is the matching file if it exists in the cache
            return r
        })
    );
}); */


self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            //download the files if itsnot in the caches
            return r || fetch(e.request).then(function (response){
                // add new file to cache
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});