import { useState, useEffect } from 'react';
import { Bell, Radio, CheckCircle2, Zap } from 'lucide-react';
import {
  isPushNotificationSupported,
  getCurrentPushSubscription,
  subscribeToPushNotifications,
} from '../../../services/pushNotificationService';

export const BrowserNotificationManager = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
    getCurrentPushSubscription().then((sub) => {
      setIsSubscribed(!!sub);
    });
  }, []);

  const handleActivate = async () => {
    setIsSubscribing(true);
    try {
      const res = await subscribeToPushNotifications('Asesor CRM');
      if (res.success) {
        setIsSubscribed(true);
        setPermission('granted');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  if (permission === 'granted' && isSubscribed) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-xl text-indigo-900 dark:text-indigo-200 text-xs shadow-xs mb-3">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
          <Radio className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <span className="font-semibold block">¿Deseas recibir alertas de leads en segundo plano?</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            El Service Worker te notificará instantáneamente vía Web Push nativo aunque la pestaña esté cerrada.
          </span>
        </div>
      </div>
      <button
        onClick={handleActivate}
        disabled={isSubscribing}
        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>{isSubscribing ? 'Conectando...' : 'Activar Push Nativas'}</span>
      </button>
    </div>
  );
};

