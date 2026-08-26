import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, UserPlus, CheckCircle2, Trash2, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface InAppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'lead_assigned' | 'whatsapp_reply' | 'system';
  linkTarget?: string;
}

const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    title: 'Nuevo Lead Asignado',
    description: 'Se te ha asignado el prospecto "Agropecuaria Del Sur S.A." (Score MEDDIC: 85).',
    timestamp: 'Hace 3 min',
    read: false,
    type: 'lead_assigned'
  },
  {
    id: 'notif-2',
    title: 'Respuesta en WhatsApp',
    description: 'Carlos Gómez respondió: "Hola, me interesa agendar una demo del CRM para la distribuidora."',
    timestamp: 'Hace 12 min',
    read: false,
    type: 'whatsapp_reply'
  },
  {
    id: 'notif-3',
    title: 'Automatización IA Completada',
    description: 'El agente de prospección enriqueció 14 nuevos contactos en Córdoba.',
    timestamp: 'Hace 1 hora',
    read: true,
    type: 'system'
  }
];

export const InAppNotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem('clientum_inapp_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_NOTIFICATIONS; }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('clientum_inapp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Simulate incoming real-time simulation interval (for demo excitement)
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasRecent = notifications.some(n => n.id === 'live-sim-1');
      if (!hasRecent) {
        const newNotif: InAppNotification = {
          id: 'live-sim-1',
          title: '💬 Nuevo Mensaje WhatsApp Inbound',
          description: '+54 9 11 4055-8822: "¿Tienen integración con AFIP para factura electrónica?"',
          timestamp: 'Justo ahora',
          read: false,
          type: 'whatsapp_reply'
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const simulateNewLeadAlert = () => {
    const names = ['Estudio Contable Méndez', 'Distribuidora Norte SRL', 'Inmobiliaria Urbana', 'Agro Insumos Litoral'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newNotif: InAppNotification = {
      id: 'lead-' + Date.now(),
      title: '👤 Nuevo Lead Asignado',
      description: `Se te ha asignado el prospecto "${randomName}" para gestión comercial prioritaria.`,
      timestamp: 'Justo ahora',
      read: false,
      type: 'lead_assigned'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        title="Centro de Notificaciones en Tiempo Real"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-slate-900 dark:text-white"
            >
              {/* Header */}
              <div className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Notificaciones In-App</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={simulateNewLeadAlert}
                    className="p-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                    title="Simular nuevo lead recibido"
                  >
                    + Simular Lead
                  </button>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium cursor-pointer px-1.5 py-1"
                    title="Marcar todas como leídas"
                  >
                    Leídas
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No hay notificaciones pendientes
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => toggleRead(n.id)}
                      className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                        !n.read
                          ? 'bg-indigo-50/50 dark:bg-indigo-950/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        n.type === 'whatsapp_reply'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : n.type === 'lead_assigned'
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                      }`}>
                        {n.type === 'whatsapp_reply' ? (
                          <MessageSquare className="w-4 h-4" />
                        ) : n.type === 'lead_assigned' ? (
                          <UserPlus className="w-4 h-4" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className={`text-xs truncate ${!n.read ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {n.description}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Alertas en tiempo real habilitadas
                </span>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Limpiar todo</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
