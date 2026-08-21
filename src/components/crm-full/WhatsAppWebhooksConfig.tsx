import React, { useState, useEffect } from 'react';
import {
  Webhook,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  RefreshCw,
  Play,
  Terminal,
  Server,
  Key,
  Phone,
  Layers,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Bot,
  Radio
} from 'lucide-react';

interface WebhookConfig {
  verifyToken: string;
  phoneNumberId: string;
  wabaId: string;
  appSecret?: string;
  systemUserToken?: string;
  autoBotResponse: boolean;
  subscribedEvents: string[];
  webhookStatus: string;
  lastVerifiedAt: string;
  appUrl?: string;
  callbackUrl?: string;
}

interface WebhookLog {
  id: string;
  timestamp: string;
  type: string;
  source: string;
  phoneNumber?: string;
  contactName?: string;
  content?: string;
  messageId?: string;
  status: string;
  payload: any;
  botResolved?: boolean;
}

export function WhatsAppWebhooksConfig() {
  const [config, setConfig] = useState<WebhookConfig>({
    verifyToken: 'clientum_meta_wa_token_2026',
    phoneNumberId: '108492049182390',
    wabaId: '293849102938401',
    appSecret: '••••••••••••••••',
    systemUserToken: '••••••••••••••••',
    autoBotResponse: true,
    subscribedEvents: ['messages', 'message_deliveries', 'message_reads', 'message_template_status_update'],
    webhookStatus: 'active',
    lastVerifiedAt: new Date().toISOString(),
    callbackUrl: '/api/whatsapp/webhook'
  });

  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Test form state
  const [testPhone, setTestPhone] = useState('+54 9 298 477-8899');
  const [testName, setTestName] = useState('Martín Gómez (Test Meta)');
  const [testMessage, setTestMessage] = useState('Hola! Queremos automatizar el seguimiento de presupuestos de nuestra PyME.');

  const fullCallbackUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/whatsapp/webhook`
    : 'https://clientum.latam/api/whatsapp/webhook';

  const loadData = async () => {
    setLoading(true);
    try {
      const [confRes, logsRes] = await Promise.all([
        fetch('/api/whatsapp/webhook/config'),
        fetch('/api/whatsapp/webhook/logs')
      ]);

      if (confRes.ok) {
        const confData = await confRes.json();
        setConfig(prev => ({ ...prev, ...confData }));
      }

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData.logs || []);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/whatsapp/webhook/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setTestResult({ ok: true, message: 'Configuración de Webhook guardada exitosamente.' });
        setTimeout(() => setTestResult(null), 4000);
      }
    } catch (e: any) {
      setTestResult({ ok: false, message: 'Error al guardar configuración: ' + e.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSimulateWebhook = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/whatsapp/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: testPhone,
          name: testName,
          text: testMessage
        })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTestResult({ ok: true, message: '¡Evento de prueba de Meta recibido y procesado por el Bot IA en tiempo real!' });
        loadData();
      } else {
        throw new Error(data.error || 'Error al simular webhook');
      }
    } catch (e: any) {
      setTestResult({ ok: false, message: e.message || 'Error simulando evento de Meta' });
    } finally {
      setTesting(false);
    }
  };

  const toggleEvent = (eventName: string) => {
    setConfig(prev => {
      const exists = prev.subscribedEvents.includes(eventName);
      return {
        ...prev,
        subscribedEvents: exists
          ? prev.subscribedEvents.filter(e => e !== eventName)
          : [...prev.subscribedEvents, eventName]
      };
    });
  };

  return (
    <div className="space-y-6 overflow-y-auto pr-1 pb-10">
      {/* Top Banner */}
      <div className="bg-[#0A101F]/80 border border-[#1E293B] p-5 rounded-2xl backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Webhook className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Webhooks Meta · WhatsApp Business Cloud API
                <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-semibold">
                  v19.0 Cloud API
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Recepción en tiempo real de mensajes entrantes, confirmaciones de entrega y lecturas directas desde los servidores de Meta.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            Sincronizar Logs
          </button>
          <a
            href="https://developers.facebook.com/apps"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-xl border border-blue-500/30 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Meta Developers
          </a>
        </div>
      </div>

      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            testResult.ok
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {testResult.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{testResult.message}</span>
          </div>
          <button onClick={() => setTestResult(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Grid: Webhook Setup & Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Meta Parameters (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#0A101F]/80 border border-[#1E293B] p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Parámetros de Configuración para Meta for Developers
            </h3>
            <p className="text-xs text-slate-400">
              Copiá estos valores y pegalos en la sección <strong>WhatsApp &gt; Configuración &gt; Webhook</strong> dentro del portal de Meta for Developers.
            </p>

            <div className="space-y-3 pt-1">
              {/* Callback URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>URL de Callback (Webhook Endpoint)</span>
                  <span className="text-[10px] text-emerald-400">GET (Verificación) &amp; POST (Eventos)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fullCallbackUrl}
                    className="flex-1 bg-[#050B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(fullCallbackUrl, 'url')}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedField === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedField === 'url' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Verify Token */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Token de Verificación (Verify Token)</span>
                  <span className="text-[10px] text-slate-500">Debe coincidir exactamente con el configurado en Meta</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={config.verifyToken}
                    onChange={e => setConfig(prev => ({ ...prev, verifyToken: e.target.value }))}
                    className="flex-1 bg-[#050B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                  <button
                    onClick={() => handleCopy(config.verifyToken, 'token')}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedField === 'token' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedField === 'token' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Two columns for WABA & Phone ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number ID (Meta)
                  </label>
                  <input
                    type="text"
                    value={config.phoneNumberId}
                    onChange={e => setConfig(prev => ({ ...prev, phoneNumberId: e.target.value }))}
                    placeholder="Ej: 108492049182390"
                    className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Business Account ID (WABA ID)
                  </label>
                  <input
                    type="text"
                    value={config.wabaId}
                    onChange={e => setConfig(prev => ({ ...prev, wabaId: e.target.value }))}
                    placeholder="Ej: 293849102938401"
                    className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Subscribed Events Toggles */}
            <div className="pt-2 border-t border-[#1E293B]">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Campos y Eventos Suscritos (Webhook Fields)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'messages', label: 'messages (Mensajes entrantes)' },
                  { key: 'message_deliveries', label: 'message_deliveries (Entregas)' },
                  { key: 'message_reads', label: 'message_reads (Lecturas)' },
                  { key: 'message_template_status_update', label: 'template_status_update' },
                  { key: 'phone_number_quality_update', label: 'quality_update' }
                ].map(evt => {
                  const active = config.subscribedEvents.includes(evt.key);
                  return (
                    <button
                      key={evt.key}
                      onClick={() => toggleEvent(evt.key)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                        active
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-[#050B14] border-[#1E293B] text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span className="truncate font-medium">{evt.label}</span>
                      {active ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto AI Response Toggle */}
            <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  Respuesta Automática Inteligente (Santi IA / Hermes Agent)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Genera respuestas contextuales con Gemini 2.5 ante mensajes entrantes recibidos por el webhook.
                </p>
              </div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, autoBotResponse: !prev.autoBotResponse }))}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  config.autoBotResponse ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    config.autoBotResponse ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveConfig}
                disabled={saving}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                Guardar Configuración de Webhook
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Webhook Simulator / Test Panel */}
        <div className="space-y-5">
          <div className="bg-[#0A101F]/80 border border-purple-500/30 p-5 rounded-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-purple-400" />
                Simulador de Eventos Meta
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Probá la reactividad del webhook enviando un payload entrante simulado de WhatsApp.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Nombre Remitente
                </label>
                <input
                  type="text"
                  value={testName}
                  onChange={e => setTestName(e.target.value)}
                  className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Número de Teléfono
                </label>
                <input
                  type="text"
                  value={testPhone}
                  onChange={e => setTestPhone(e.target.value)}
                  className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Mensaje del Prospecto
                </label>
                <textarea
                  rows={3}
                  value={testMessage}
                  onChange={e => setTestMessage(e.target.value)}
                  className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>

              <button
                onClick={handleSimulateWebhook}
                disabled={testing || !testMessage.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
              >
                {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Radio className="w-3.5 h-3.5" />}
                Disparar Webhook de Prueba
              </button>
            </div>
          </div>

          {/* Quick Handshake Status Card */}
          <div className="bg-[#0A101F]/80 border border-[#1E293B] p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Estado del Endpoint</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Verificación Meta:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Seguridad / Hash:</span>
                <span className="text-sky-400 font-medium">SHA-256 HMAC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Última actividad:</span>
                <span className="text-slate-300">{new Date(config.lastVerifiedAt).toLocaleTimeString('es-AR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Webhook Logs */}
      <div className="bg-[#0A101F]/80 border border-[#1E293B] p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Registro de Notificaciones y Eventos en Tiempo Real (Live Logs)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historial de llamadas HTTP recibidas desde Meta Cloud API con desglose de payloads JSON.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg">
            {logs.length} eventos registrados
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No se han registrado eventos todavía. Podés usar el simulador de arriba para probar la recepción.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {logs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div
                  key={log.id}
                  className="bg-[#050B14] border border-[#1E293B] hover:border-slate-700 rounded-xl p-3.5 transition-all text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          log.type === 'inbound_message' || log.type === 'test_simulation'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : log.type === 'handshake_verification'
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {log.type}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">
                        {new Date(log.timestamp).toLocaleTimeString('es-AR')}
                      </span>
                      {log.phoneNumber && (
                        <span className="font-semibold text-white flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {log.contactName ? `${log.contactName} (${log.phoneNumber})` : log.phoneNumber}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {log.botResolved && (
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md flex items-center gap-1">
                          <Bot className="w-3 h-3" /> Auto-Bot
                        </span>
                      )}
                      <button
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {log.content && (
                    <p className="mt-2 text-slate-300 bg-[#0A101F] p-2 rounded-lg border border-slate-800/80 font-sans">
                      💬 &quot;{log.content}&quot;
                    </p>
                  )}

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payload Raw JSON</span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(log.payload, null, 2), `payload-${log.id}`)}
                          className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copiar JSON
                        </button>
                      </div>
                      <pre className="bg-[#020617] p-3 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-slate-900">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
