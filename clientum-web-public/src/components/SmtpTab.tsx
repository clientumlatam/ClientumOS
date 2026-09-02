import React, { useState, useEffect } from 'react';
import { Mail, Server, Shield, Send, CheckCircle2, AlertCircle, RefreshCw, Key, ArrowRight } from 'lucide-react';

export function SmtpTab() {
  const [host, setHost] = useState('smtp.gmail.com');
  const [port, setPort] = useState(587);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [secure, setSecure] = useState(false);
  const [hasPass, setHasPass] = useState(false);

  const [testRecipient, setTestRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testMsg, setTestMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/smtp/config');
      if (res.ok) {
        const data = await res.json();
        setHost(data.host || 'smtp.gmail.com');
        setPort(data.port || 587);
        setUser(data.user || '');
        setSecure(data.secure || false);
        setHasPass(data.hasPass || false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/smtp/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port, user, pass, secure })
      });
      if (res.ok) {
        setStatusMsg({ type: 'success', text: 'Configuración SMTP guardada correctamente.' });
        setPass('');
        setHasPass(true);
      } else {
        const data = await res.json();
        setStatusMsg({ type: 'error', text: data.error || 'Error al guardar la configuración.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error de red al conectar con el servidor.' });
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipient) return;
    setTesting(true);
    setTestMsg(null);
    try {
      const res = await fetch('/api/smtp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port, user, pass, secure, testRecipient })
      });
      const data = await res.json();
      if (res.ok) {
        setTestMsg({ type: 'success', text: 'Correo de prueba enviado de forma exitosa.' });
      } else {
        setTestMsg({ type: 'error', text: data.error || 'Error en la conexión o credenciales.' });
      }
    } catch (err) {
      setTestMsg({ type: 'error', text: 'Error de red al realizar la prueba SMTP.' });
    } finally {
      setTesting(false);
    }
  };

  const applyProfile = (profile: string) => {
    if (profile === 'gmail') {
      setHost('smtp.gmail.com');
      setPort(587);
      setSecure(false);
    } else if (profile === 'sendgrid') {
      setHost('smtp.sendgrid.net');
      setPort(587);
      setSecure(false);
      setUser('apikey');
    } else if (profile === 'ses') {
      setHost('email-smtp.us-east-1.amazonaws.com');
      setPort(465);
      setSecure(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-600" /> Servidor de Correo Saliente (SMTP)
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Configura y valida la conexión SMTP de tu plataforma para el envío de campañas y alertas.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => applyProfile('gmail')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 cursor-pointer"
          >
            Google Suite / Gmail
          </button>
          <button
            onClick={() => applyProfile('sendgrid')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 cursor-pointer"
          >
            SendGrid
          </button>
          <button
            onClick={() => applyProfile('ses')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 cursor-pointer"
          >
            AWS SES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-600" /> Credenciales y Configuración de Servidor
          </h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Servidor SMTP (Host)</label>
                  <input
                    type="text"
                    required
                    value={host}
                    onChange={e => setHost(e.target.value)}
                    placeholder="ej. smtp.gmail.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Puerto</label>
                  <input
                    type="number"
                    required
                    value={port}
                    onChange={e => setPort(Number(e.target.value))}
                    placeholder="587"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Usuario SMTP</label>
                  <input
                    type="text"
                    required
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder="ej. usuario@gmail.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contraseña / App Password {hasPass && <span className="text-emerald-600">(Ya configurada)</span>}
                  </label>
                  <input
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    placeholder={hasPass ? '••••••••••••••••' : 'Ingrese contraseña o token SMTP'}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="secure_smtp"
                  checked={secure}
                  onChange={e => setSecure(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="secure_smtp" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Utilizar conexión segura (SSL / TLS en puerto 465)
                </label>
              </div>

              {statusMsg && (
                <div className={`p-3 rounded-xl flex items-start gap-2 text-xs font-medium ${
                  statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                  Guardar Credenciales
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-3 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" /> Test de Conexión SMTP
            </h3>
            <p className="text-xs text-slate-400 mb-4">Envía un correo electrónico de prueba en tiempo real para verificar que tu servidor esté entregando correos correctamente.</p>
            
            <form onSubmit={handleTestEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Correo Electrónico Destinatario</label>
                <input
                  type="email"
                  required
                  value={testRecipient}
                  onChange={e => setTestRecipient(e.target.value)}
                  placeholder="ej. mi-correo@gmail.com"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-white"
                />
              </div>

              {testMsg && (
                <div className={`p-3 rounded-xl flex items-start gap-2 text-xs font-medium ${
                  testMsg.type === 'success' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                }`}>
                  {testMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                  <span>{testMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={testing}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm disabled:opacity-50"
              >
                {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Enviar Correo de Prueba
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Servicio de Correo ClientumOS</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
