import { useState, useEffect, useCallback, useRef } from 'react';

function urlBase64ToUint8Array(base64String: string) {
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
}

export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isPushSupported, setIsPushSupported] = useState<boolean>(false);
  const [isWorkerActive, setIsWorkerActive] = useState<boolean>(false);
  const [isPushSubscribed, setIsPushSubscribed] = useState<boolean>(false);
  const [workerRegistration, setWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [pushStatus, setPushStatus] = useState<PushStatusInfo | null>(null);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('clientum_wa_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  // Fetch Push backend status
  const fetchPushStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/push/status');
      if (res.ok) {
        const data = await res.json();
        setPushStatus(data);
      }
    } catch (e) {
      console.warn('Error fetching push status:', e);
    }
  }, []);

  // Initialize Service Worker and Check Push Subscription
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const notifSupported = 'Notification' in window;
    const swSupported = 'serviceWorker' in navigator;
    const pushSupported = swSupported && 'PushManager' in window;

    setIsSupported(notifSupported);
    setIsPushSupported(pushSupported);

    if (notifSupported) {
      setPermission(Notification.permission);
    }

    if (swSupported) {
      // Register Service Worker
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(async (reg) => {
          setWorkerRegistration(reg);
          setIsWorkerActive(true);

          // Check if already subscribed to PushManager
          if (reg.pushManager) {
            const currentSub = await reg.pushManager.getSubscription();
            if (currentSub) {
              setIsPushSubscribed(true);
            }
          }
        })
        .catch((err) => {
          console.warn('[ServiceWorker] Falló registro de sw.js:', err);
        });

      // Listen for messages from Service Worker (e.g. background notification clicks)
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'PUSH_NOTIFICATION_CLICKED') {
          console.log('[Push Notification Clicked Event]:', event.data);
          // Play chime when notification is focused/opened
          playNotificationSound();
        }
      };

      navigator.serviceWorker.addEventListener('message', handleMessage);
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }

    fetchPushStatus();
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('clientum_wa_sound_enabled', String(next));
      } catch {}
      return next;
    });
  }, []);

  // Crisp, professional double-tone chime using Web Audio API
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const now = ctx.currentTime;

      // Tone 1: 587.33 Hz (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // Tone 2: 880.00 Hz (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.00, now + 0.12);
      gain2.gain.setValueAtTime(0, now + 0.12);
      gain2.gain.linearRampToValueAtTime(0.22, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled]);

  // Request native permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      return 'denied';
    }
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === 'granted') {
        playNotificationSound();
        // Auto-subscribe to Web Push when granted
        subscribeToPush();
      }
      return res;
    } catch {
      return 'denied';
    }
  }, [isSupported, playNotificationSound]);

  // Subscribe to background Web Push Worker
  const subscribeToPush = useCallback(async (agentName?: string) => {
    if (!isPushSupported) return false;
    setIsSubscribing(true);

    try {
      let reg = workerRegistration;
      if (!reg && 'serviceWorker' in navigator) {
        reg = await navigator.serviceWorker.ready;
      }
      if (!reg || !reg.pushManager) {
        console.warn('Service Worker o PushManager no disponible');
        setIsSubscribing(false);
        return false;
      }

      // 1. Fetch public VAPID key
      const keyRes = await fetch('/api/push/vapid-public-key');
      const keyData = await keyRes.json();
      if (!keyData.publicKey) {
        throw new Error('No se pudo obtener la clave VAPID pública.');
      }

      const convertedKey = urlBase64ToUint8Array(keyData.publicKey);

      // 2. Check existing subscription or create new
      let subscription = await reg.pushManager.getSubscription();
      if (!subscription) {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
      }

      // 3. Send subscription to server
      const subRes = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          agentName: agentName || 'Asesor Comercial Clientum',
        }),
      });

      if (subRes.ok) {
        setIsPushSubscribed(true);
        fetchPushStatus();
        setIsSubscribing(false);
        return true;
      }
      setIsSubscribing(false);
      return false;
    } catch (err) {
      console.error('[WebPush Subscribe Exception]:', err);
      setIsSubscribing(false);
      return false;
    }
  }, [isPushSupported, workerRegistration, fetchPushStatus]);

  // Unsubscribe from background Web Push Worker
  const unsubscribeFromPush = useCallback(async () => {
    if (!workerRegistration || !workerRegistration.pushManager) return false;
    try {
      const subscription = await workerRegistration.pushManager.getSubscription();
      if (subscription) {
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setIsPushSubscribed(false);
      fetchPushStatus();
      return true;
    } catch (e) {
      console.warn('Error unsubscribing from push:', e);
      return false;
    }
  }, [workerRegistration, fetchPushStatus]);

  // Send native or SW notification
  const sendNotification = useCallback(
    (
      title: string,
      options?: {
        body?: string;
        icon?: string;
        tag?: string;
        data?: any;
        onClick?: () => void;
        forceSound?: boolean;
      }
    ) => {
      if (options?.forceSound !== false) {
        playNotificationSound();
      }

      if (!isSupported || Notification.permission !== 'granted') {
        return false;
      }

      // Prefer Service Worker showNotification if active
      if (workerRegistration && 'showNotification' in workerRegistration) {
        workerRegistration
          .showNotification(title, {
            body: options?.body || 'Nuevo mensaje en Clientum WhatsApp',
            icon: options?.icon || '/favicon.svg',
            badge: '/favicon.svg',
            tag: options?.tag || `wa-msg-${Date.now()}`,
            data: options?.data || { url: '/?tab=whatsapp' },
            renotify: true,
            requireInteraction: true,
            actions: [
              { action: 'open_chat', title: '💬 Abrir Chat' },
              { action: 'quick_reply', title: '⚡ Respuesta Rápida' },
            ],
          } as any)
          .catch(() => {});
        return true;
      }

      try {
        const notification = new Notification(title, {
          body: options?.body || 'Nuevo mensaje en Clientum WhatsApp',
          icon: options?.icon || '/favicon.svg',
          badge: '/favicon.svg',
          tag: options?.tag || `wa-msg-${Date.now()}`,
          data: options?.data,
          silent: true,
        });

        notification.onclick = () => {
          try {
            window.focus();
          } catch {}
          if (options?.onClick) {
            options.onClick();
          }
          notification.close();
        };

        return true;
      } catch (err) {
        console.warn('Error displaying native browser notification:', err);
        return false;
      }
    },
    [isSupported, workerRegistration, playNotificationSound]
  );

  // Send real background push through server (even with app closed/minimized)
  const triggerServerPushTest = useCallback(
    async (delaySeconds: number = 0, leadName?: string) => {
      try {
        const res = await fetch('/api/push/send-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            delaySeconds,
            leadName: leadName || 'Agro-Industrial Patagonia',
            title: '💬 Clientum WhatsApp: Lead en Segundo Plano',
            body: 'Mensaje entrante: "Confirmamos la orden de compra y necesitamos el link de pago."',
          }),
        });
        const data = await res.json();
        fetchPushStatus();
        return data;
      } catch (err) {
        console.error('Error triggering server push test:', err);
        return null;
      }
    },
    [fetchPushStatus]
  );

  // Simulate an inbound WhatsApp lead triggering both UI and Background Push
  const simulateInboundLeadWebhook = useCallback(
    async (leadName: string = 'Distribuidora San Juan SRL', message?: string) => {
      try {
        const res = await fetch('/api/push/whatsapp-inbound', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadName,
            phone: '+54 9 264 456-7890',
            message:
              message ||
              'Hola! Vimos su sistema de WhatsApp CRM con IA. Queremos integrar 4 sucursales hoy mismo.',
            conversationId: 'conv-' + Date.now(),
            priority: 'alta',
            channel: 'WhatsApp Baileys Pro',
          }),
        });
        const data = await res.json();
        playNotificationSound();
        fetchPushStatus();
        return data;
      } catch (err) {
        console.error('Error simulating inbound lead webhook:', err);
        return null;
      }
    },
    [playNotificationSound, fetchPushStatus]
  );

  const sendTestNotification = useCallback(() => {
    if (permission !== 'granted') {
      requestPermission().then((res) => {
        if (res === 'granted') {
          sendNotification('💬 Clientum WhatsApp: Notificación de Prueba', {
            body: '¡Excelente! Las alertas en segundo plano del Service Worker están activas.',
            tag: 'test-notification',
          });
        }
      });
    } else {
      sendNotification('💬 Clientum WhatsApp: Mensaje Entrante', {
        body: 'Grupo Agro-Industrial Patagonia: "Confirmamos la reunión para implementar el bot."',
        tag: 'test-notification',
      });
    }
  }, [permission, requestPermission, sendNotification]);

  return {
    permission,
    isSupported,
    isPushSupported,
    isWorkerActive,
    isPushSubscribed,
    isSubscribing,
    workerRegistration,
    pushStatus,
    soundEnabled,
    toggleSound,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendNotification,
    sendTestNotification,
    triggerServerPushTest,
    simulateInboundLeadWebhook,
    playNotificationSound,
    fetchPushStatus,
  };
}
