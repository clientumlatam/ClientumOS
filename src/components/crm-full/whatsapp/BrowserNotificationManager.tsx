import React from 'react';
import {
  Bell,
  BellRing,
  BellOff,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

interface BrowserNotificationManagerProps {
  permission: NotificationPermission;
  isSupported: boolean;
  soundEnabled: boolean;
  onRequestPermission: () => void;
  onToggleSound: () => void;
  onSendTestNotification: () => void;
  onSimulateInbound: () => void;
  simulating?: boolean;
}

export const BrowserNotificationManager: React.FC<BrowserNotificationManagerProps> = ({
  permission,
  isSupported,
  soundEnabled,
  onRequestPermission,
  onToggleSound,
  onSendTestNotification,
  onSimulateInbound,
  simulating = false
}) => {
  if (!isSupported) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-400">
        <span>Las notificaciones nativas no están soportadas en este navegador.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#0A101F]/80 border border-[#1E293B] rounded-xl px-3 py-2 text-xs backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        {permission === 'granted' ? (
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <BellRing className="w-3.5 h-3.5 animate-pulse" />
          </div>
        ) : permission === 'denied' ? (
          <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <BellOff className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {permission === 'granted'
              ? 'Alertas en Segundo Plano Activas'
              : permission === 'denied'
              ? 'Alertas de Navegador Bloqueadas'
              : 'Alertas de Mensajes en Segundo Plano'}
          </span>
          <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold uppercase ${
            permission === 'granted'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : permission === 'denied'
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}>
            {permission === 'granted' ? 'Habilitado' : permission === 'denied' ? 'Bloqueado' : 'Pendiente'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {permission !== 'granted' ? (
          <button
            onClick={onRequestPermission}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Bell className="w-3 h-3" />
            <span>Permitir Notificaciones</span>
          </button>
        ) : (
          <>
            <button
              onClick={onToggleSound}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-800/40 text-slate-500 border-slate-800 line-through'
              }`}
              title={soundEnabled ? "Sonido activado (clic para silenciar)" : "Sonido silenciado (clic para activar)"}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 text-emerald-400" /> : <VolumeX className="w-3 h-3" />}
              <span>{soundEnabled ? 'Sonido Chime' : 'Silencio'}</span>
            </button>

            <button
              onClick={onSendTestNotification}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
              title="Probar notificación nativa del navegador ahora"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Probar Alerta</span>
            </button>
          </>
        )}

        {/* Simulate Inbound Lead Message */}
        <button
          onClick={onSimulateInbound}
          disabled={simulating}
          className="px-2.5 py-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 hover:from-sky-600/50 hover:to-blue-600/50 text-sky-200 border border-sky-500/40 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Simular un mensaje entrante de un prospecto para probar alertas en segundo plano y asignación"
        >
          {simulating ? <RefreshCw className="w-3 h-3 animate-spin text-sky-400" /> : <MessageSquare className="w-3 h-3 text-sky-400" />}
          <span>Simular Lead Entrante</span>
        </button>
      </div>
    </div>
  );
};
