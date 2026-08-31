import React, { useState } from 'react';
import { Sliders, Sparkles, Save, Globe, Tag, CheckCircle2 } from 'lucide-react';
import { getAllIndustrySlugs } from '../../../../data/industryLandings';

interface SeoMetadataManagerProps {
  onToast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const SeoMetadataManager: React.FC<SeoMetadataManagerProps> = ({ onToast }) => {
  const industrySlugs = getAllIndustrySlugs();
  const [selectedRoute, setSelectedRoute] = useState<string>('root');
  
  const [metaConfigs, setMetaConfigs] = useState<Record<string, { title: string; description: string; ogImage: string; keywords: string }>>({
    root: {
      title: 'ClientumOS | CRM, Automatización y Cloudflare Edge Enterprise',
      description: 'Plataforma integral para PyMEs con CRM, WhatsApp Bots IA, gestión DNS avanzada y Universal SSL.',
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      keywords: 'crm, ai bots, whatsapp, cloudflare, ssl, dns'
    },
    crm: {
      title: 'ClientumOS CRM Enterprise | Pipeline y Automatización',
      description: 'Gestiona oportunidades, clientes y campañas de marketing multicanal desde un único panel optimizado.',
      ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      keywords: 'pipeline, leads, ventas, crm enterprise'
    },
    domains: {
      title: 'Gestor Cloudflare Anycast & Universal SSL | ClientumOS',
      description: 'Administración en tiempo real de registros A, CNAME, TXT, MX y supervisión de certificados SSL.',
      ogImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
      keywords: 'cloudflare, dns, ssl, cname, anycast'
    }
  });

  const currentConfig = metaConfigs[selectedRoute] || {
    title: `ClientumOS - ${selectedRoute}`,
    description: `Landing page especializada para ${selectedRoute} con sincronización sitemap en tiempo real.`,
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    keywords: `${selectedRoute}, b2b, clientum`
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onToast(`¡Metadatos SEO actualizados para la ruta [${selectedRoute}] con éxito!`, 'success');
  };

  return (
    <div className="bg-[#111520] border border-[#1e2330] rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2330] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Gestor Central de Metadatos SEO (Dynamic Routes)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Personaliza títulos, descripciones OpenGraph y palabras clave para cada ruta dinámica del sitio público, tienda y CRM.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Selector List */}
        <div className="space-y-2 bg-[#161b28] p-4 rounded-xl border border-[#1e2330] max-h-96 overflow-y-auto">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Seleccionar Ruta Dinámica</label>
          <button
            onClick={() => setSelectedRoute('root')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${selectedRoute === 'root' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-[#111520]'}`}
          >
            <span className="font-mono">/ (Raíz Principal)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20">SEO Base</span>
          </button>
          <button
            onClick={() => setSelectedRoute('crm')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${selectedRoute === 'crm' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-[#111520]'}`}
          >
            <span className="font-mono">/crm (CRM Enterprise)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20">Privado</span>
          </button>
          <button
            onClick={() => setSelectedRoute('domains')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${selectedRoute === 'domains' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-[#111520]'}`}
          >
            <span className="font-mono">/dominios (Cloudflare Edge)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20">DNS/SSL</span>
          </button>

          <div className="pt-3 border-t border-[#1e2330]">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Landing Pages Sectoriales ({industrySlugs.length})</span>
            {industrySlugs.slice(0, 8).map(slug => (
              <button
                key={slug}
                onClick={() => setSelectedRoute(`industria-${slug}`)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${selectedRoute === `industria-${slug}` ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-[#111520]'}`}
              >
                /industria/{slug}
              </button>
            ))}
          </div>
        </div>

        {/* SEO Configuration Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-4 bg-[#161b28] p-6 rounded-xl border border-[#1e2330]">
          <div className="flex items-center justify-between border-b border-[#1e2330] pb-3">
            <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Editando Metadatos para: <span className="text-white">/{selectedRoute}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Sincronizado con Sitemap</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Title (&lt;title&gt;)</label>
              <input
                type="text"
                value={currentConfig.title}
                onChange={e => setMetaConfigs(prev => ({ ...prev, [selectedRoute]: { ...currentConfig, title: e.target.value } }))}
                className="w-full px-3 py-2 bg-[#111520] border border-[#1e2330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Description (&lt;meta name="description"&gt;)</label>
              <textarea
                rows={3}
                value={currentConfig.description}
                onChange={e => setMetaConfigs(prev => ({ ...prev, [selectedRoute]: { ...currentConfig, description: e.target.value } }))}
                className="w-full px-3 py-2 bg-[#111520] border border-[#1e2330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">OpenGraph Image URL (&lt;meta property="og:image"&gt;)</label>
              <input
                type="text"
                value={currentConfig.ogImage}
                onChange={e => setMetaConfigs(prev => ({ ...prev, [selectedRoute]: { ...currentConfig, ogImage: e.target.value } }))}
                className="w-full px-3 py-2 bg-[#111520] border border-[#1e2330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Keywords (separadas por comas)</label>
              <input
                type="text"
                value={currentConfig.keywords}
                onChange={e => setMetaConfigs(prev => ({ ...prev, [selectedRoute]: { ...currentConfig, keywords: e.target.value } }))}
                className="w-full px-3 py-2 bg-[#111520] border border-[#1e2330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y Aplicar en Servidor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
