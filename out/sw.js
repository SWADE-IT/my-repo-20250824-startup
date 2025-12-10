// Service Worker for performance optimization and caching

const CACHE_NAME = 'swade-it-v1'
const STATIC_CACHE = 'swade-it-static-v1'
const DYNAMIC_CACHE = 'swade-it-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services', 
  '/contact',
  '/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png', // Logo
  '/assets/service-cyber-security.png',
  '/assets/service-computer-setup.png',
  '/assets/service-microsoft-365.png',
  '/assets/service-vpn-setup.png',
  '/assets/service-nas-cloud.png',
  '/assets/service-ups-power.png',
  '/assets/service-internet-troubleshooting.png',
  '/assets/service-wifi-extension.png',
  '/assets/service-home-nas.png',
  '/assets/service-home-security.png'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone)
                  })
              }
              return response
            })
            .catch(() => {
              // Return offline page if available
              return caches.match('/')
            })
        })
    )
    return
  }

  // Handle asset requests (images, fonts, etc.)
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone)
                  })
              }
              return response
            })
        })
    )
    return
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone)
                })
            }
            return response
          })
      })
  )
})

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    )
  }
})

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png',
        badge: '/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png',
        tag: 'swade-it-notification'
      })
    )
  }
})