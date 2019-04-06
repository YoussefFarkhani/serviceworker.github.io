// Cache the entire website
// Cache individual pages
const cacheName = 'v2'; //Permet de versionner le cache


// Call Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys() // Loop through the caches, if the cache of the iteration is not the current cache, delete it
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log('Service Worker: Clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
});

// Call Fetch event
self.addEventListener('fetch', event => { //Catch the request
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
            .then(res => {
                // Make clone of response
                const resClone = res.clone();
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(event.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(event.request).then(res => res)) //Loads the request from the cache
    )
})