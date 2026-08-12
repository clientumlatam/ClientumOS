import React, { useState } from 'react';
import {
  Send,
  Plus,
  BarChart2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Mail,
  Eye,
  MousePointer,
  RefreshCw,
  X,
  Sparkles
} from 'lucide-react';

export interface Campaign {
  id: string;
  name: string;
  status: 'Enviado' | 'Programado' | 'Borrador' | 'Enviando';
  sentCount: number;
  openRate: string;
  clickRate: string;
  replyRate: string;
  scheduledDate: string;
  targetAudience: string;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-1',
    name: 'Outreach Q3 - Directores O&G Neuquén',
    status: 'Enviado',
    sentCount: 1420,
    openRate: '64.2%',
    clickRate: '18.5%',
    replyRate: '12.1%',
    scheduledDate: '2026-08-01',
    targetAudience: 'Directores de Operaciones (Yacimientos Vaca Muerta)'
  },
  {
    id: 'cmp-2',
    name: 'Novedades CRM IA - Base Clientes Mendoza & Cuyo',
    status: 'Enviado',
    sentCount: 890,
    openRate: '71.0%',
    clickRate: '24.3%',
    replyRate: '16.8%',
    scheduledDate: '2026-08-08',
    targetAudience: 'Bodegas & Exportadores de Fruta'
  },
  {
    id: 'cmp-3',
    name: 'Lanzamiento Agente WhatsApp Conversacional',
    status: 'Programado',
    sentCount: 2500,
    openRate: '0%',
    clickRate: '0%',
    replyRate: '0%',
    scheduledDate: '2026-08-18',
    targetAudience: 'Leads Calificados LATAM (All)'
  }
];

export function EmailCampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Campaign Form
  const [name, setName] = useState('');
  const [audience, setAudience] = useState('Directores B2B Argentina & Chile');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCmp: Campaign = {
      id: `cmp-${Date.now()}`,
      name,
      status: 'Programado',
      sentCount: 1200,
      openRate: '0%',
      clickRate: '0%',
      replyRate: '0%',
      scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      targetAudience: audience
    };

    setCampaigns([newCmp, ...campaigns]);
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Envío Masivo & Secuencias
            </span>
            <span className="text-slate-400 text-xs">· Módulo 5.3 Campañas & Automatización</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Send className="w-7 h-7 text-indigo-600" /> Gestor de Campañas de Email B2B
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Monitorea el rendimiento de tus secuencias de correo masivo, tasas de apertura y respuestas de clientes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Campaña</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Correos Enviados</span>
          <span className="text-2xl font-black text-slate-900">
            {campaigns.reduce((a, b) => a + b.sentCount, 0).toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">SMTP & Servidores Dedicados</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Tasa Apertura Promedio</span>
          <span className="text-2xl font-black text-emerald-600">67.6%</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">+14% superior al mercado B2B</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Tasa Clics (CTR)</span>
          <span className="text-2xl font-black text-indigo-600">21.4%</span>
          <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">Interacción con enlaces CTA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Respuestas Directas</span>
          <span className="text-2xl font-black text-purple-600">14.5%</span>
          <span className="text-[10px] text-purple-600 font-bold block mt-0.5">Leads Generados</span>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-sm text-slate-900">Historial de Campañas Recientes</h3>
          <span className="text-xs font-semibold text-slate-400">{campaigns.length} campañas en total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <th className="p-3.5 pl-6 font-bold">Campaña / Audiencia</th>
                <th className="p-3.5 font-bold">Estado</th>
                <th className="p-3.5 font-bold">Enviados</th>
                <th className="p-3.5 font-bold">Apertura</th>
                <th className="p-3.5 font-bold">Clics</th>
                <th className="p-3.5 font-bold">Respuestas</th>
                <th className="p-3.5 pr-6 font-bold text-right">Fecha Programada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-6">
                    <span className="font-bold text-slate-900 block">{cmp.name}</span>
                    <span className="text-[11px] text-slate-400">{cmp.targetAudience}</span>
                  </td>
                  <td className="p-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      cmp.status === 'Enviado' ? 'bg-emerald-100 text-emerald-800' :
                      cmp.status === 'Programado' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {cmp.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold font-mono text-slate-800">{cmp.sentCount.toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-emerald-600">{cmp.openRate}</td>
                  <td className="p-3.5 font-bold text-indigo-600">{cmp.clickRate}</td>
                  <td className="p-3.5 font-bold text-purple-600">{cmp.replyRate}</td>
                  <td className="p-3.5 pr-6 text-right font-mono text-slate-500">{cmp.scheduledDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> Crear Nueva Campaña de Correo
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Campaña</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Prospectos Yacimientos Q3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Audiencia Objetivo</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                >
                  <option value="Directores B2B Argentina & Chile">Directores B2B Argentina & Chile</option>
                  <option value="Gerentes de Operaciones Vaca Muerta">Gerentes de Operaciones Vaca Muerta</option>
                  <option value="Exportadores Agro Cuyo & Mendoza">Exportadores Agro Cuyo & Mendoza</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Programar Campaña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
