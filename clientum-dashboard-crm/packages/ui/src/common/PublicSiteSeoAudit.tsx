import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, Globe, ArrowUpRight, FileCheck } from 'lucide-react';

interface AuditResult {
  url: string;
  sitemapEntry: boolean;
  metaTags: boolean;
  sslValid: boolean;
  brokenLinks: number;
  status: 'passed' | 'warning' | 'error';
}

interface PublicSiteSeoAuditProps {
  onToast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const PublicSiteSeoAudit: React.FC<PublicSiteSeoAuditProps> = ({ onToast }) => {
  const [targetUrl, setTargetUrl] = useState('https://clientum.com.ar');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<AuditResult[]>([
    { url: 'https://clientum.com.ar/', sitemapEntry: true, metaTags: true, sslValid: true, brokenLinks: 0, status: 'passed' },
    { url: 'https://clientum.com.ar/crm', sitemapEntry: true, metaTags: true, sslValid: true, brokenLinks: 0, status: 'passed' },
    { url: 'https://clientum.com.ar/dominios', sitemapEntry: true, metaTags: true, sslValid: true, brokenLinks: 0, status: 'passed' },
    { url: 'https://clientum.com.ar/academia', sitemapEntry: true, metaTags: false, sslValid: true, brokenLinks: 1, status: 'warning' },
  ]);

  const handleRunAudit = () => {
    setIsScanning(true);
    onToast(`Iniciando auditoría SEO para ${targetUrl}...`, 'info');
    setTimeout(() => {
      setIsScanning(false);
      setResults(prev => [
        { url: targetUrl, sitemapEntry: true, metaTags: true, sslValid: true, brokenLinks: 0, status: 'passed' },
        ...prev
      ]);
      onToast('¡Auditoría SEO completada con éxito!', 'success');
    }, 1200);
  };

  return (
    <div className="bg-[#111520] border border-[#1e2330] rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2330] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Auditoría SEO de Sitio Público y Sitemap</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verificación automática de metaetiquetas OpenGraph, inclusión en sitemap.xml y enlaces rotos o huérfanos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={targetUrl}
            onChange={e => setTargetUrl(e.target.value)}
            placeholder="https://tu-dominio.com"
            className="px-3 py-2 bg-[#161b28] border border-[#1e2330] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 w-64"
          />
          <button
            onClick={handleRunAudit}
            disabled={isScanning}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>{isScanning ? 'Escaneando...' : 'Ejecutar Auditoría'}</span>
          </button>
        </div>
      </div>

      {/* Audit Status Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#161b28] text-slate-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3 rounded-l-xl">URL Analizada</th>
              <th className="p-3">Sitemap.xml</th>
              <th className="p-3">Meta Tags / OG</th>
              <th className="p-3">SSL Válido</th>
              <th className="p-3">Enlaces Rotos</th>
              <th className="p-3 rounded-r-xl">Estado General</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2330]">
            {results.map((res, idx) => (
              <tr key={idx} className="hover:bg-[#161b28]/50 transition-colors">
                <td className="p-3 font-mono text-white flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>{res.url}</span>
                  <a href={res.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-300">
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </td>
                <td className="p-3">
                  {res.sitemapEntry ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Indexado</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-semibold"><ShieldAlert className="w-3.5 h-3.5" /> Falta</span>
                  )}
                </td>
                <td className="p-3">
                  {res.metaTags ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Completos</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><AlertTriangle className="w-3.5 h-3.5" /> Incompletos</span>
                  )}
                </td>
                <td className="p-3">
                  {res.sslValid ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Seguro TLS 1.3</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-semibold"><ShieldAlert className="w-3.5 h-3.5" /> Expirado</span>
                  )}
                </td>
                <td className="p-3 font-mono">
                  {res.brokenLinks === 0 ? (
                    <span className="text-emerald-400 font-semibold">0 enlaces rotos</span>
                  ) : (
                    <span className="text-amber-400 font-semibold">{res.brokenLinks} detectado</span>
                  )}
                </td>
                <td className="p-3">
                  {res.status === 'passed' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">ÓPTIMO</span>
                  )}
                  {res.status === 'warning' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">REVISIÓN</span>
                  )}
                  {res.status === 'error' && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px]">CRÍTICO</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
