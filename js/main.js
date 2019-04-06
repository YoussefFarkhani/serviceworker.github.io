// Make sure SW are supported
if('serviceWorker' in navigator){ //navigator = browser object ou if(navigator.serviceWorker)
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_pages.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker : Error : ${err}`));
    }) // Register when the window load
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker : Error : ${err}`));
    }) // Register when the window load
}


/* Les pages seront stockées dans le cache storage ainsi le navigateur pourra les consulter pour afficher quelque chose si offline 
Librairie : workbox */