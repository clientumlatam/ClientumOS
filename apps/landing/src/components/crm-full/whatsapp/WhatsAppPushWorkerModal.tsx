import React, { useState, useEffect } from 'react';
import {
  X,
  Radio,
  Bell,
  BellRing,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Sparkles,
  Smartphone,
  Server,
  Zap,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Volume2,
  VolumeX,
  ExternalLink,
  MessageSquare,
  Activity
} from 'lucide-react';
import { PushStatusInfo } from './useBrowserNotifications';

interface WhatsAppPushWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSupported: boolean;
  isPushSupported: boolean;
  isWorkerActive: boolean;
  isPushSubscribed: boolean;
  isSubscribing: boolean;
  permission: NotificationPermission;
  soundEnabled: boolean;
  pushStatus: PushStatusInfo | null;
  onRequestPermission: () => Promise<NotificationPermission>;
  onSubscribeToPush: () => Promise<boolean>;
  onUnsubscribeFromPush: () => Promise<boolean>;
  onToggleSound: () => void;
  onTriggerServerPushTest: (delaySeconds?: number, leadName?: string) => Promise<any>;
  onSimulateInboundLead: (leadName?: string, message?: string) => Promise<any>;
  onRefreshStatus: () => Promise<void>;
}

export const WhatsAppPushWorkerModal: React.FC<WhatsAppPushWorkerModalProps> = ({
  isOpen,
  onClose,
  isSupported,
  isPushSupported,
  isWorkerActive,
  isPushSubscribed,
  isSubscribing,
  permission,
  soundEnabled,
  pushStatus,
  onRequestPermission,
  onSubscribeToPush,
  onUnsubscribeFromPush,
  onToggleSound,
  onTriggerServerPushTest,
  onSimulateInboundLead,
  onRefreshStatus
}) => {
  const [testDelay, setTestDelay] = useState<number>(5);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [customLead, setCustomLead] = useState<string>('Agro-Industrial Patagonia SA');
  const [customMsg, setCustomMsg] = useState<string>(
    'Hola! Queremos avanzar con la cotización de 5 agentes para WhatsApp CRM con IA.'
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setFeedbackMsg('⚡ Alerta Push en segundo plano disparada por el servidor.');
      setTimeout(() => setFeedbackMsg(null), 6000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const handleStartDelayedTest = async () => {
    setIsSending(true);
    setFeedbackMsg(null);
    try {
      const res = await onTriggerServerPushTest(testDelay, customLead);
      if (res?.ok) {
        setCountdown(testDelay);
        setFeedbackMsg(
          `⏱️ Notificación programada en ${testDelay} segundos. ¡Puedes minimizar o cerrar la pestaña ahora para probar la recepción en segundo plano!`
        );
      }
    } catch (e: any) {
      setFeedbackMsg(`Error: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendInstantLead = async () => {
    setIsSending(true);
    setFeedbackMsg(null);
    try {
      const res = await onSimulateInboundLead(customLead, customMsg);
      if (res?.ok) {
        setFeedbackMsg('✅ Mensaje entrante simulado y alerta Web Push transmitida con éxito.');
        setTimeout(() => setFeedbackMsg(null), 5000);
      }
    } catch (e: any) {
      setFeedbackMsg(`Error: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B132B] border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Service Worker & Push en Segundo Plano
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                  v2.0 Web Push
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Recibe alertas sonoras y visuales inmediatas de WhatsApp cuando la app está cerrada o en segundo plano.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Status Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  Service Worker
                </span>
                {isWorkerActive ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="text-sm font-semibold text-white">
                {isWorkerActive ? 'sw.js Activo (/)' : 'Inactivo'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isWorkerActive ? 'Scope registrado y cache V2 listo.' : 'Registrando worker...'}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-purple-400" />
                  Suscripción Push
                </span>
                {isPushSubscribed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div className="text-sm font-semibold text-white">
                {isPushSubscribed ? 'Dispositivo Vinculado' : 'No Suscrito'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {pushStatus?.totalSubscriptions
                  ? `${pushStatus.totalSubscriptions} dispositivo(s) activo(s)`
                  : 'Listo para registrar'}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Permiso Navegador
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    permission === 'granted'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : permission === 'denied'
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {permission}
                </span>
              </div>
              <div className="text-sm font-semibold text-white">
                {permission === 'granted' ? 'Habilitado' : 'Requiere Aprobación'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {permission === 'granted'
                  ? 'Vibración y chimes autorizados.'
                  : 'Clic en activar permiso.'}
              </div>
            </div>
          </div>

          {/* Quick Subscription Actions */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Configuración de Alertas & Conectividad
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              {permission !== 'granted' ? (
                <button
                  onClick={onRequestPermission}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span>1. Conceder Permiso de Notificaciones</span>
                </button>
              ) : !isPushSubscribed ? (
                <button
                  onClick={onSubscribeToPush}
                  disabled={isSubscribing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30 cursor-pointer disabled:opacity-50"
                >
                  {isSubscribing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>2. Suscribir Dispositivo a Push Worker</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Suscrito al canal de Web Push
                  </span>
                  <button
                    onClick={onUnsubscribeFromPush}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    Desuscribir
                  </button>
                </div>
              )}

              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-2 cursor-pointer ${
                  soundEnabled
                    ? 'bg-slate-800 text-emerald-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-800/40 text-slate-500 border-slate-800 line-through'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? 'Sonido Chime Doble (On)' : 'Chime Silenciado'}</span>
              </button>

              <button
                onClick={onRefreshStatus}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl transition-colors cursor-pointer ml-auto"
                title="Actualizar estado del servidor"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Background Push Test Panel */}
          <div className="bg-gradient-to-br from-slate-900/90 to-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Test de Recepción en Segundo Plano (App Cerrada)
                </h3>
              </div>
              {countdown !== null && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 animate-pulse">
                  Disparando en: {countdown}s
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Haz clic en programar la alerta y luego <strong className="text-white">cierra o minimiza esta pestaña</strong>. El servidor transmitirá el mensaje mediante Web Push RFC 8291 y el Service Worker hará sonar tu equipo aunque la ventana no esté activa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Nombre del Prospecto WhatsApp:
                </label>
                <input
                  type="text"
                  value={customLead}
                  onChange={(e) => setCustomLead(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Demora para prueba (segundos):
                </label>
                <div className="flex items-center gap-2">
                  {[3, 5, 10, 15].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setTestDelay(sec)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        testDelay === sec
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Mensaje de la Consulta Entrante:
              </label>
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {feedbackMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-medium animate-fadeIn flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleStartDelayedTest}
                disabled={isSending || countdown !== null}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                <span>Probar en {testDelay}s (Cierra la pestaña)</span>
              </button>

              <button
                onClick={handleSendInstantLead}
                disabled={isSending}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-purple-400" />
                <span>Disparo Instantáneo Webhook</span>
              </button>
            </div>
          </div>

          {/* Audit Logs of Web Push */}
          {pushStatus?.recentLogs && pushStatus.recentLogs.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                Registro de Transmisiones Push del Servidor
              </h3>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {pushStatus.recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between text-[11px] bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/60"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="font-medium text-slate-300 truncate">{log.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-slate-400 font-mono">
                      <span>{log.successCount} entregados</span>
                      <span>·</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Respuesta inmediata en WhatsApp lista</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
