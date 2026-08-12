import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  Plus,
  BookOpen,
  ArrowRight,
  FolderTree
} from 'lucide-react';

export interface TopicCluster {
  id: string;
  pillarTitle: string;
  targetKeyword: string;
  clusterArticles: { title: string; keyword: string; status: 'Publicado' | 'En Redacción' | 'Planeado' }[];
}

const INITIAL_TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'topic-1',
    pillarTitle: 'Guía Definitiva de CRM e Inteligencia Comercial para PyMEs LATAM',
    targetKeyword: 'crm para pymes',
    clusterArticles: [
      { title: 'Cómo elegir un CRM con integración AFIP en Argentina', keyword: 'crm afip argentina', status: 'Publicado' },
      { title: 'Chatbot de WhatsApp con IA: Guía de implementación 2026', keyword: 'chatbot whatsapp ia', status: 'Publicado' },
      { title: 'Metodología MEDDIC explicada para ventas complejas', keyword: 'metodologia meddic', status: 'En Redacción' },
      { title: 'Diferencias entre CRM Tradicional y Agentic Sales CRM', keyword: 'crm inteligencia artificial', status: 'Planeado' }
    ]
  },
  {
    id: 'topic-2',
    pillarTitle: 'Automatización Comercial para el Sector Energía & Yacimientos',
    targetKeyword: 'automatizacion industrial ventas',
    clusterArticles: [
      { title: 'Trazabilidad de órdenes de compra en Vaca Muerta', keyword: 'ordenes de compra vaca muerta', status: 'Publicado' },
      { title: 'Gestión de contratistas O&G con WhatsApp IA', keyword: 'whatsapp contratistas petroleo', status: 'En Redacción' }
    ]
  }
];

export function TopicMapTab() {
  const [clusters, setClusters] = useState<TopicCluster[]>(INITIAL_TOPIC_CLUSTERS);
  const [selectedCluster, setSelectedCluster] = useState<TopicCluster>(INITIAL_TOPIC_CLUSTERS[0]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Estructura Pillar/Cluster
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.2 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FolderTree className="w-7 h-7 text-emerald-600" /> Mapa de Autoridad Tópica SEO
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Organiza tus contenidos en arquitecturas de clusters semánticos para dominar el ranking orgánico en Google.
          </p>
        </div>

        <button
          onClick={() => alert('Generando nuevo cluster temático con Gemini...')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Nuevo Cluster Tópico</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Clusters List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pillar Pages (Tópicos Principales)</h3>
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedCluster.id === cluster.id
                  ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Keyword: {cluster.targetKeyword}
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">{cluster.pillarTitle}</h4>
              <p className="text-xs text-slate-500 font-medium">
                {cluster.clusterArticles.length} artículos subordinados enlazados
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Selected Cluster Hierarchy */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Página Pilar (Pillar Page)</span>
              <h2 className="text-lg font-black text-slate-900">{selectedCluster.pillarTitle}</h2>
              <span className="text-xs text-emerald-600 font-bold font-mono mt-1 block">
                Keyword Principal: "{selectedCluster.targetKeyword}"
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Artículos Satélite del Cluster</h4>

              <div className="space-y-2">
                {selectedCluster.clusterArticles.map((art, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-slate-900">{art.title}</h4>
                      <span className="text-[11px] text-slate-500 font-mono">Target: "{art.keyword}"</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      art.status === 'Publicado' ? 'bg-emerald-100 text-emerald-800' :
                      art.status === 'En Redacción' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {art.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
