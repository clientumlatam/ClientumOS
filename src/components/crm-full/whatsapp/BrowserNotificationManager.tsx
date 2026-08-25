import { useState, useEffect } from 'react';
import { Bell, BellOff, Volume2, VolumeX, Mail } from 'lucide-react';

export const BrowserNotificationManager = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  if (permission === 'granted') return null;

  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-xs">
        <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>¿Quieres recibir notificaciones de nuevos leads?</span>
        </div>
        <button 
            onClick={requestPermission}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Activar
        </button>
    </div>
  );
};
