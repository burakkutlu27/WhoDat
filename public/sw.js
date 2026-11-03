/**
 * KimBu service worker.
 *
 * Bilerek dar tutuldu: KimBu canlı bir çok oyunculu oyun, bayat state göstermek veya
 * eski JS paketini önbellekten sunmak (deploy sonrası sürüm uyuşmazlığı) yarardan çok
 * zarar verir. Bu yüzden API/JS/CSS hiç önbelleğe alınmaz; yalnızca sayfa gezintisi
 * ağa ulaşamazsa kullanıcıya boş ekran yerine çevrimdışı sayfası gösterilir.
 */

const CACHE = 'kimbu-offline-v1'
const OFFLINE_URL = '/offline.html'
const PRECACHE = [OFFLINE_URL, '/icons/icon-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Önceki sürümlerin önbelleklerini temizle.
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)))
    return
  }

  // Çevrimdışı sayfasının kendi görseli; diğer her istek doğrudan ağa gider.
  if (new URL(request.url).pathname === '/icons/icon-192.png') {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)))
  }
})
