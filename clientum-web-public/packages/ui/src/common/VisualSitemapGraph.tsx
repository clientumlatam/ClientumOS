import React, { useState } from 'react';
import { Globe, Server, Layers, FileText, Cpu, ShieldCheck, ArrowRight, RefreshCw, Download, CheckCircle2 } from 'lucide-react';
import { getAllIndustrySlugs } from '@clientum/types';

interface VisualSitemapGraphProps {
  onToast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const VisualSitemapGraph: React.FC<VisualSitemapGraphProps> = ({ onToast }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const industrySlugs = getAllIndustrySlugs();

  const handleDownloadSitemap = () => {
    window.open('/sitemap.xml', '_blank');
    onToast('Descargando sitemap.xml consolidado completo', 'success');
  };

  return (
    <div className="bg-[#111520] border border-[#1e2330] rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2330] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Visualizador de Grafo de Sitemap y Rutas</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Estructura jerárquica de nodos y enlaces para indexación SEO y motores de búsqueda de Cloudflare Edge.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadSitemap}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar sitemap.xml</span>
          </button>
        </div>
      </div>

      {/* Graph Tree Representation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Root Node */}
        <div 
          onClick={() => setSelectedNode('root')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-blue-950/40 to-[#161b28] ${selectedNode === 'root' ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#1e2330] hover:border-blue-500/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><Globe className="w-4 h-4" /></span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Priority 1.0</span>
          </div>
          <h4 className="text-sm font-bold text-white">Root Index (`/`)</h4>
          <p className="text-[11px] text-slate-400 mt-1">Portal principal ClientumOS y Site Public</p>
          <div className="mt-3 text-[10px] text-blue-400 font-semibold flex items-center gap-1">
            <span>Ver conexiones</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* CRM Node */}
        <div 
          onClick={() => setSelectedNode('crm')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-indigo-950/40 to-[#161b28] ${selectedNode === 'crm' ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-[#1e2330] hover:border-indigo-500/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400"><Cpu className="w-4 h-4" /></span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Priority 0.9</span>
          </div>
          <h4 className="text-sm font-bold text-white">CRM Enterprise (`/crm`)</h4>
          <p className="text-[11px] text-slate-400 mt-1">Workspace de ventas, leads, pipelines y automatización</p>
          <div className="mt-3 text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
            <span>Ver conexiones</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Domain Manager Node */}
        <div 
          onClick={() => setSelectedNode('domains')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-purple-950/40 to-[#161b28] ${selectedNode === 'domains' ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-[#1e2330] hover:border-purple-500/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><Server className="w-4 h-4" /></span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Priority 0.9</span>
          </div>
          <h4 className="text-sm font-bold text-white">Cloudflare Edge (`/dominios`)</h4>
          <p className="text-[11px] text-slate-400 mt-1">Registros DNS, Universal SSL y auditoría Anycast</p>
          <div className="mt-3 text-[10px] text-purple-400 font-semibold flex items-center gap-1">
            <span>Ver conexiones</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Industry Landings Node */}
        <div 
          onClick={() => setSelectedNode('industries')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-emerald-950/40 to-[#161b28] ${selectedNode === 'industries' ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-[#1e2330] hover:border-emerald-500/50'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400"><Layers className="w-4 h-4" /></span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{industrySlugs.length} Landings</span>
          </div>
          <h4 className="text-sm font-bold text-white">Landing Sectores (`/industria/*`)</h4>
          <p className="text-[11px] text-slate-400 mt-1">Páginas optimizadas para SEO industrial</p>
          <div className="mt-3 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>Ver listado</span> <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Selected Node Details Box */}
      {selectedNode && (
        <div className="p-4 bg-[#161b28] border border-blue-500/30 rounded-xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Detalle del Nodo Seleccionado: <span className="text-white font-mono">{selectedNode}</span>
            </span>
            <button onClick={() => setSelectedNode(null)} className="text-xs text-slate-400 hover:text-white">Cerrar</button>
          </div>
          {selectedNode === 'industries' ? (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2">
              {industrySlugs.map(slug => (
                <span key={slug} className="px-2.5 py-1 rounded-lg bg-[#111520] border border-[#1e2330] text-[11px] font-mono text-slate-300">
                  /industria/{slug}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-300">
              Nodo vinculado con el motor de enrutamiento principal de React Router y sincronizado automáticamente con el sitemap XML de producción.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
