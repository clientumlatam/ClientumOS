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

// ── 3. Background Push Notifications (When App is Closed/Minimized) ──────
self.addEventListener('push', (event) => {
  let title = '💬 Nuevo Mensaje - ClientumOS';
  let message = 'Tienes una nueva actualización en tu CRM.';
  let redirectUrl = '/?tab=whatsapp';
  let icon = '/favicon.svg';
  let badge = '/favicon.svg';
  let image = undefined;
  let tag = 'clientum-push-' + Date.now();
  let customData = {
    url: redirectUrl,
    timestamp: Date.now(),
  };
  let actions = [
    { action: 'open_chat', title: '💬 Abrir Chat' },
    { action: 'view_lead', title: '👤 Ver Prospecto' },
    { action: 'quick_reply', title: '⚡ Responder' },
  ];

  if (event.data) {
    try {
      const payload = event.data.json();

      // 1. Extraer título
      if (payload.title) {
        title = payload.title;
      }

      // 2. Extraer mensaje (body / message)
      if (payload.body) {
        message = payload.body;
      } else if (payload.message) {
        message = payload.message;
      }

      // 3. Extraer URL de redirección (url / redirectUrl / link / data.url)
      if (payload.url) {
        redirectUrl = payload.url;
      } else if (payload.redirectUrl) {
        redirectUrl = payload.redirectUrl;
      } else if (payload.link) {
        redirectUrl = payload.link;
      } else if (payload.data && (payload.data.url || payload.data.redirectUrl || payload.data.link)) {
        redirectUrl = payload.data.url || payload.data.redirectUrl || payload.data.link;
      }

      // 4. Extraer ícono, badge, tag y opciones visuales
      if (payload.icon) icon = payload.icon;
      if (payload.badge) badge = payload.badge;
      if (payload.image) image = payload.image;
      if (payload.tag) tag = payload.tag;
      if (Array.isArray(payload.actions)) actions = payload.actions;

      // 5. Configurar objeto data con la URL de navegación y metadatos
      customData = {
        ...(payload.data || {}),
        url: redirectUrl,
        timestamp: (payload.data && payload.data.timestamp) || Date.now(),
      };
    } catch (e) {
      try {
        const textPayload = event.data.text();
        if (textPayload) {
          message = textPayload;
        }
      } catch (err) {}
    }
  }

  // Opciones avanzadas de notificación
  const notificationOptions = {
    body: message,
    icon: icon,
    badge: badge,
    image: image,
    tag: tag,
    renotify: true,
    requireInteraction: true, // Mantiene la notificación visible en pantalla para atención de leads
    vibrate: [300, 100, 300, 100, 300],
    data: customData,
    actions: actions,
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
      .then(() => {
        // Actualizar el App Badge en el sistema operativo / navegador si está soportado
        if ('setAppBadge' in self.navigator) {
          return self.navigator.setAppBadge(1).catch(() => {});
        }
      })
  );
});

// ── 3b. Push Subscription Change / VAPID Key Rotation Event ────────────────
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    fetch('/api/push/vapid-public-key')
      .then((res) => res.json())
      .then((resData) => {
        if (!resData.publicKey) throw new Error('No public VAPID key');
        const padding = '='.repeat((4 - (resData.publicKey.length % 4)) % 4);
        const base64 = (resData.publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: outputArray,
        });
      })
      .then((newSubscription) => {
        return fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: newSubscription.toJSON(),
            agentName: 'Asesor Renovado Auto-VAPID'
          }),
        });
      })
      .catch((err) => {
        console.warn('[ServiceWorker] Falló la renovación automática de suscripción push:', err);
      })
  );
});

// ── 4. Notification Click & App Navigation ────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const customData = event.notification.data || {};
  let targetUrl = customData.url || '/?tab=whatsapp';

  if (event.action === 'view_lead') {
    if (customData.leadId) {
      targetUrl = `/?tab=opportunities&leadId=${encodeURIComponent(customData.leadId)}`;
    } else if (customData.phoneNumber) {
      targetUrl = `/?tab=contacts&search=${encodeURIComponent(customData.phoneNumber)}`;
    } else {
      targetUrl = '/?tab=opportunities';
    }
  } else if (customData.chatId) {
    targetUrl += (targetUrl.includes('?') ? '&' : '?') + `chatId=${encodeURIComponent(customData.chatId)}`;
  }

  if (event.action === 'quick_reply') {
    targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'quickReply=true';
  }

  // Clear App Badge when user opens/clicks notification
  if ('clearAppBadge' in self.navigator) {
    self.navigator.clearAppBadge().catch(() => {});
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a tab is already open, focus it and notify client via postMessage
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
      // If app was completely closed, open a new window directly with deep link
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
