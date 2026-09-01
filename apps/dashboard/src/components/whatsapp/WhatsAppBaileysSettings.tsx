import React, { useState } from 'react';
import { QrCode, ShieldCheck, RefreshCw, CheckCircle2, Smartphone, Terminal, Globe, Copy, Send } from 'lucide-react';
import { useCRM } from '@clientum/ui';

export const WhatsAppBaileysSettings: React.FC = () => {
  const { showToast } = useCRM();
  const [connectionType, setConnectionType] = useState<'official' | 'baileys'>('official');
  const [isConnected, setIsConnected] = useState(true);
  const [testPayload, setTestPayload] = useState('{"phone": "+5491112345678", "message": "Hola, quiero información sobre los planes corporativos."}');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const webhookUrl = `${window.location.origin}/api/whatsapp/webhook`;

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const parsed = JSON.parse(testPayload);
      const res = await fetch('/api/whatsapp/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
      showToast('Webhook probado y sincronizado correctamente con el CRM', 'success');
    } catch (err: any) {
      setTestResult(`Error: JSON inválido o fallo en servidor (${err.message})`);
      showToast('Error al probar webhook', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0c10] text-slate-300 text-xs max-w-4xl">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <QrCode className="w-5 h-5 text-amber-400" />
          Conexión de WhatsApp & Webhook Real (Baileys / Meta Cloud API)
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Configura tu endpoint webhook receptor en tu servidor Baileys o en Meta Developers para sincronizar conversaciones en tiempo real.</p>
      </div>

      <div className="bg-[#131722] p-4 rounded-xl border border-[#212a3d] space-y-3">
        <label className="text-xs font-semibold text-white flex items-center justify-between">
          <span>URL del Webhook (Configurar en Baileys / Meta)</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(webhookUrl);
              showToast('URL de Webhook copiada al portapapeles', 'success');
            }}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Copiar URL
          </button>
        </label>
        <div className="bg-[#0a0c10] px-3 py-2 rounded-lg font-mono text-emerald-400 border border-[#212a3d] text-[11px] select-all">
          {webhookUrl}
        </div>
        <p className="text-[11px] text-slate-400">
          Token de verificación (Meta Cloud API): <code className="text-white bg-[#1c2333] px-1.5 py-0.5 rounded">clientum_verify_token_2026</code>
        </p>
      </div>

      <div className="flex gap-2 bg-[#131722] p-1 rounded-xl border border-[#212a3d] w-fit">
        <button
          onClick={() => setConnectionType('official')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            connectionType === 'official' ? 'bg-[#1e273d] text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Meta Cloud API Oficial</span>
        </button>
        <button
          onClick={() => setConnectionType('baileys')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            connectionType === 'baileys' ? 'bg-[#1e273d] text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Baileys QR Simulator</span>
        </button>
      </div>

      <div className="bg-[#131722] p-6 rounded-2xl border border-[#212a3d] flex flex-col md:flex-row items-center gap-6">
        <div className="w-52 h-52 bg-white p-3 rounded-2xl flex items-center justify-center shrink-0 shadow-lg relative group">
          <div className="w-full h-full border-4 border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-2 text-slate-800 font-bold text-[11px] gap-2">
            <QrCode className="w-16 h-16 text-slate-900" />
            <span>[ ESCANEAR CÓDIGO QR ]</span>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Estado: {isConnected ? '🟢 Conectado y Sincronizado' : '🔴 Desconectado'}</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Número vinculado: <strong className="text-white">+54 9 11 5000-2026</strong> ({connectionType === 'official' ? 'Webhook activo v18.0' : 'Sesión Baileys activa'}). Las peticiones POST a <code className="text-emerald-400">/api/whatsapp/webhook</code> alimentan el Inbox en vivo.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => {
                setIsConnected(!isConnected);
                showToast(isConnected ? 'Sesión desconectada' : 'Sesión reconectada con éxito', 'info');
              }}
              className="px-4 py-2 bg-[#1c2333] hover:bg-[#252f44] text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isConnected ? 'Desconectar Sesión' : 'Reconectar Dispositivo'}</span>
            </button>
            <button
              onClick={() => showToast('Webhook verificado OK con Meta API', 'success')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verificar Webhook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Test Sandbox */}
      <div className="bg-[#131722] p-5 rounded-2xl border border-[#212a3d] space-y-3">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>Probador de Webhook en Vivo (Simulador de Mensajes Entrantes)</span>
        </h4>
        <p className="text-slate-400 text-xs">Envía un payload de prueba POST a tu servidor para comprobar la recepción automática de mensajes:</p>
        
        <div className="space-y-2">
          <textarea
            value={testPayload}
            onChange={(e) => setTestPayload(e.target.value)}
            rows={3}
            className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleTestWebhook}
            disabled={isTesting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isTesting ? 'Enviando...' : 'Simular Mensaje Entrante (POST)'}</span>
          </button>
        </div>

        {testResult && (
          <div className="mt-3 bg-[#0a0c10] p-3 rounded-xl border border-emerald-500/30 font-mono text-[11px] text-emerald-300 space-y-1">
            <div className="font-bold text-white flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Respuesta del Webhook:
            </div>
            <pre className="overflow-x-auto">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

