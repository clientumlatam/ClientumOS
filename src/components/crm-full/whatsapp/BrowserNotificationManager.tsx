import { useState, useEffect } from 'react';

/**
 * BrowserNotificationManager
 * 
 * Handles permission requests for web notifications.
 * Note: For true background notifications when the tab is closed or in the background,
 * a Service Worker registered with a backend push service (VAPID) is required.
 * This component handles the client-side request and UI triggers.
 */
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

  const showNotification = (title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.svg', // Ensure this path exists or update accordingly
      });
    }
  };

  return {
    permission,
    requestPermission,
    showNotification,
  };
};
