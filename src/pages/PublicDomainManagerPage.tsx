import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DomainCloudflareManager } from '../dashboard/src/components/common/DomainCloudflareManager';
import { Globe, ArrowLeft, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export function PublicDomainManagerPage() {
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const handleToast = (msg: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-bounce bg-slate-900 border border-indigo-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Public Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700/80 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>ClientumOS - Portal Cloudflare Edge & Dominios</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">Anycast Global</span>
              </h1>
              <p className="text-[11px] text-slate-400">Gestión pública y en tiempo real de certificados SSL, registros DNS avanzados y auditoría Anycast.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/crm/settings"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Abrir en CRM Enterprise</span>
          </Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        <div className="bg-gradient-to-r from-indigo-900/30 via-slate-900/60 to-purple-900/30 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Infraestructura Cloudflare Edge Certificada</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Gestor Integral de Dominios y DNS en el Sitio Público & CRM</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Administra tus zonas DNS (`A`, `TXT`, `MX`, `CNAME`), supervisa la expiración y renovación de certificados Universal SSL de Cloudflare, ejecuta escaneos de salud en lote y exporta informes consolidados en PDF.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 text-right">
            <div className="text-xs font-mono text-slate-400">Estado de Red Global</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>275+ POPs Anycast Operativos</span>
            </div>
          </div>
        </div>

        {/* The Domain Manager Component */}
        <DomainCloudflareManager onToast={handleToast} titlePrefix="Portal Público Cloudflare" />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500">
        ClientumOS Cloudflare Enterprise Suite • Sincronización Anycast en Tiempo Real • <span className="text-slate-400">clientumlatam@gmail.com</span>
      </footer>
    </div>
  );
}
export default PublicDomainManagerPage;
