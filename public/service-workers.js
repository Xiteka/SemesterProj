self.addEventListener('fetch', event => {
    if (!navigator.onLine) {
      event.respondWith(new Response("Ingen internett tilgang!"));
    }
  });