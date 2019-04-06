// Cache individual pages
const cacheName = 'v1'; //Permet de versionner le cache

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];

// Call Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service worker : Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
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
            .catch(() => caches.match(event.request)) //Loads the request from the cache
    )
})