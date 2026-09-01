/**
 * Service Worker and Web Push Notification Service for Clientum CRM
 * Handles VAPID key conversion, Service Worker registration, and backend subscription syncing.
 */

export interface PushStatusInfo {
  status: string;
  vapidConfigured: boolean;
  publicKeyAvailable: boolean;
  totalSubscriptions: number;
  recentLogs?: Array<{
    id: string;
    timestamp: string;
    title: string;
    recipientCount: number;
    successCount: number;
    failCount: number;
  }>;
  lastPushTime?: string | null;
  serverTime?: string;
}

export interface PushBroadcastPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  actions?: Array<{ action: string; title: string }>;
}

/**
 * Converts a URL-safe Base64 encoded string to a Uint8Array for applicationServerKey.
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Checks if Service Worker and Web Push are supported in current browser environment.
 */
export function isPushNotificationSupported(): {
  serviceWorker: boolean;
  pushManager: boolean;
  notification: boolean;
} {
  const hasSW = typeof window !== 'undefined' && 'serviceWorker' in navigator;
  const hasPush = typeof window !== 'undefined' && 'PushManager' in window;
  const hasNotif = typeof window !== 'undefined' && 'Notification' in window;

  return {
    serviceWorker: hasSW,
    pushManager: hasSW && hasPush,
    notification: hasNotif,
  };
}

/**
 * Registers the Service Worker (`/sw.js`).
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    console.log('[PushService] Service Worker registrado exitosamente con scope:', registration.scope);
    return registration;
  } catch (error) {
    console.warn('[PushService] Error registrando Service Worker:', error);
    return null;
  }
}

/**
 * Retrieves the active VAPID Public Key from the backend.
 */
export async function fetchVapidPublicKey(): Promise<string | null> {
  try {
    const response = await fetch('/api/push/vapid-public-key');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data.publicKey || null;
  } catch (error) {
    console.error('[PushService] Error al obtener VAPID Public Key:', error);
    return null;
  }
}

/**
 * Gets the current active Push Subscription from the Service Worker, if any.
 */
export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.pushManager) return null;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.warn('[PushService] Error comprobando suscripción push existente:', error);
    return null;
  }
}

/**
 * Subscribes the current browser to Web Push using the backend VAPID public key.
 */
export async function subscribeToPushNotifications(agentName?: string): Promise<{
  success: boolean;
  subscription?: PushSubscription;
  error?: string;
}> {
  try {
    const supported = isPushNotificationSupported();
    if (!supported.pushManager) {
      return { success: false, error: 'Web Push no está soportado en este navegador.' };
    }

    // 1. Request user permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return {
        success: false,
        error: 'Permiso de notificaciones denegado por el usuario.',
      };
    }

    // 2. Fetch VAPID key
    const publicKey = await fetchVapidPublicKey();
    if (!publicKey) {
      return {
        success: false,
        error: 'No se pudo obtener la clave pública VAPID del servidor.',
      };
    }

    // 3. Register SW & Subscribe to PushManager
    const registration = await navigator.serviceWorker.ready;
    const applicationServerKey = urlBase64ToUint8Array(publicKey);

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
    }

    // 4. Send subscription data to server
    const serverResponse = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        agentName: agentName || 'Asesor Comercial Clientum',
      }),
    });

    if (!serverResponse.ok) {
      const errData = await serverResponse.json().catch(() => ({}));
      throw new Error(errData.error || 'Error registrando suscripción en el backend.');
    }

    console.log('[PushService] Dispositivo suscrito exitosamente a Web Push.');
    return { success: true, subscription };
  } catch (err: any) {
    console.error('[PushService] Fallo en el flujo de suscripción:', err);
    return { success: false, error: err.message || 'Error desconocido al suscribir.' };
  }
}

/**
 * Unsubscribes the current device from Web Push and notifies the server.
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const subscription = await getCurrentPushSubscription();
    if (!subscription) return true;

    // 1. Notify server to remove from database
    await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    }).catch(() => {});

    // 2. Unsubscribe browser PushManager
    const result = await subscription.unsubscribe();
    console.log('[PushService] Suscripción cancelada con éxito:', result);
    return result;
  } catch (error) {
    console.error('[PushService] Error al desuscribir:', error);
    return false;
  }
}

/**
 * Dispatches a test Web Push notification through the server (with optional delay).
 */
export async function triggerServerTestPush(
  delaySeconds: number = 0,
  leadName?: string,
  customTitle?: string,
  customBody?: string
): Promise<{ ok: boolean; message?: string; scheduledSeconds?: number }> {
  const response = await fetch('/api/push/send-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      delaySeconds,
      leadName: leadName || 'Prospecto Agro-Industrial',
      title: customTitle || '💬 Clientum WhatsApp: Lead en Segundo Plano',
      body: customBody || 'Mensaje entrante: "Confirmamos la reunión y requerimos propuesta de automatización."',
    }),
  });

  return await response.json();
}

/**
 * Fetches status summary from backend push manager.
 */
export async function fetchPushServerStatus(): Promise<PushStatusInfo | null> {
  try {
    const res = await fetch('/api/push/status');
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn('[PushService] Error al consultar estado de push:', error);
    return null;
  }
}
