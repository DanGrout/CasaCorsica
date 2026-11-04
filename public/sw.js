const basePath = self.location.pathname.replace(/\/sw\.js$/, '') || ''
const CACHE = 'casa-corsica-v1'
const PRECACHE = [`${basePath}/`, `${basePath}/manifest.webmanifest`, `${basePath}/icon-192.png`, `${basePath}/icon-512.png`]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  const requestPath = url.pathname
  const navigatesToRoot = request.mode === 'navigate' && requestPath === `${basePath}/` ? `${basePath}/` : requestPath

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(`${basePath}/`))),
    )
    return
  }

  if (requestPath.startsWith(`${basePath}/_next/`) || requestPath.startsWith(`${basePath}/images/`) || /\.(png|jpg|jpeg|webp|avif|svg|woff2?)$/.test(requestPath)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(CACHE).then((cache) => cache.put(request, copy))
            }
            return response
          }),
      ),
    )
  }
})
