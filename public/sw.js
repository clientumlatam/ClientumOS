const CACHE_NAME = 'clientum-crm-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg'
];

// ── 1. Install & Cache Essentials ──────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ── 2. Activate & Clean Old Caches ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ── 3. Background Push Notifications (When App is Closed) ─────────────────
self.addEventListener('push', (event) => {
  let data = {
    title: '💬 Nuevo Mensaje de WhatsApp - Clientum',
    body: 'Tienes un nuevo mensaje entrante de un cliente o prospecto.',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'clientum-wa-' + Date.now(),
    data: {
      url: '/?tab=whatsapp',
      chatId: null,
      timestamp: Date.now()
    },
    actions: [
      { action: 'open_chat', title: '💬 Abrir Chat' },
      { action: 'quick_reply', title: '⚡ Respuesta Rápida' }
    ]
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = {
        ...data,
        ...payload,
        data: {
          ...data.data,
          ...(payload.data || {})
        }
      };
    } catch (e) {
      try {
        data.body = event.data.text();
      } catch (err) {}
    }
  }

  const notificationOptions = {
    body: data.body,
    icon: data.icon || '/favicon.svg',
    badge: data.badge || '/favicon.svg',
    image: data.image || undefined,
    tag: data.tag || 'clientum-wa-inbound',
    renotify: true,
    requireInteraction: true, // Keep on screen so user doesn't miss urgent leads
    vibrate: [250, 100, 250, 100, 250],
    data: data.data,
    actions: data.actions || [
      { action: 'open_chat', title: '💬 Abrir Chat' },
      { action: 'quick_reply', title: '⚡ Respuesta Rápida' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions)
      .then(() => {
        // Update App Badge if supported
        if ('setAppBadge' in self.navigator) {
          return self.navigator.setAppBadge(1).catch(() => {});
        }
      })
  );
});

// ── 4. Notification Click & App Navigation ────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const customData = event.notification.data || {};
  let targetUrl = customData.url || '/?tab=whatsapp';
  
  if (customData.chatId) {
    targetUrl += (targetUrl.includes('?') ? '&' : '?') + `chatId=${encodeURIComponent(customData.chatId)}`;
  }

  if (event.action === 'quick_reply') {
    // If quick reply was clicked, open with quick reply flag
    targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'quickReply=true';
  }

  // Clear App Badge when user opens/clicks notification
  if ('clearAppBadge' in self.navigator) {
    self.navigator.clearAppBadge().catch(() => {});
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a tab is already open, focus it and notify client
      for (const client of clientList) {
        if ('focus' in client) {
          client.postMessage({
            type: 'PUSH_NOTIFICATION_CLICKED',
            data: customData,
            action: event.action,
            targetUrl: targetUrl
          });
          return client.focus();
        }
      }
      // If app was completely closed, open a new window directly
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// ── 5. Background Sync for Offline WhatsApp Messages ──────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-whatsapp-messages') {
    event.waitUntil(
      // Broadcast to any active client that sync triggered
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'BACKGROUND_SYNC_TRIGGERED',
            tag: event.tag,
            timestamp: Date.now()
          });
        });
      })
    );
  }
});

// ── 6. Message Channel Listener from React ────────────────────────────────
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_BADGE') {
    if ('clearAppBadge' in self.navigator) {
      self.navigator.clearAppBadge().catch(() => {});
    }
  }

  if (event.data.type === 'SIMULATE_PUSH') {
    const payload = event.data.payload || {};
    self.registration.showNotification(payload.title || '💬 Clientum WhatsApp (Segundo Plano)', {
      body: payload.body || 'Nuevo mensaje entrante de prospecto.',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'wa-sim-' + Date.now(),
      vibrate: [200, 100, 200],
      renotify: true,
      requireInteraction: true,
      data: payload.data || { url: '/?tab=whatsapp' },
      actions: [
        { action: 'open_chat', title: '💬 Abrir Chat' },
        { action: 'quick_reply', title: '⚡ Respuesta Rápida' }
      ]
    });
  }
});

// ── 7. Fetch Interceptor (SPA Offline Fallback) ────────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
