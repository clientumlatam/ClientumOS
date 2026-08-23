import { useState, useEffect, useCallback, useRef } from 'react';

export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('clientum_wa_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
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

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      return 'denied';
    }
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === 'granted') {
        playNotificationSound();
      }
      return res;
    } catch {
      return 'denied';
    }
  }, [isSupported, playNotificationSound]);

  const sendNotification = useCallback((title: string, options?: {
    body?: string;
    icon?: string;
    tag?: string;
    data?: any;
    onClick?: () => void;
    forceSound?: boolean;
  }) => {
    // Always play sound if enabled (even if notifications are denied or if in background)
    if (options?.forceSound !== false) {
      playNotificationSound();
    }

    if (!isSupported || Notification.permission !== 'granted') {
      return false;
    }

    try {
      const notification = new Notification(title, {
        body: options?.body || 'Nuevo mensaje en Clientum WhatsApp',
        icon: options?.icon || 'https://api.dicebear.com/7.x/bottts/svg?seed=ClientumBot',
        tag: options?.tag || `wa-msg-${Date.now()}`,
        badge: 'https://api.dicebear.com/7.x/shapes/svg?seed=ClientumBadge',
        data: options?.data,
        silent: true, // We already handle audio via Web Audio API
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
  }, [isSupported, playNotificationSound]);

  const sendTestNotification = useCallback(() => {
    if (permission !== 'granted') {
      requestPermission().then(res => {
        if (res === 'granted') {
          sendNotification('💬 Clientum WhatsApp: Notificación de Prueba', {
            body: '¡Excelente! Las alertas de escritorio para mensajes de clientes y leads están activas.',
            tag: 'test-notification'
          });
        }
      });
    } else {
      sendNotification('💬 Clientum WhatsApp: Mensaje Entrante', {
        body: 'Grupo Agro-Industrial Patagonia: "Confirmamos la reunión para implementar el bot."',
        tag: 'test-notification'
      });
    }
  }, [permission, requestPermission, sendNotification]);

  return {
    permission,
    isSupported,
    soundEnabled,
    toggleSound,
    requestPermission,
    sendNotification,
    sendTestNotification,
    playNotificationSound,
  };
}
