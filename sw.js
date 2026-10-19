// Bump the version number below every time you change index.html so phones pick up the update.
var CACHE="habit-stacker-v1";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
  }));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});
