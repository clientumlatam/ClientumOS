import React, { useState } from 'react';
import {
  Kanban,
  Plus,
  DollarSign,
  Building2,
  User,
  Calendar,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  X,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  Layers,
  PhoneCall,
  Mail,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { BulkWhatsAppModal } from './BulkWhatsAppModal';

export interface Deal {
  id: string;
  companyName: string;
  contactName: string;
  dealValueUsd: number;
  dealValueArs: number;
  stageId: 'lead' | 'contacted' | 'proposal' | 'closing' | 'won';
  meddicScore: number; // 0 to 100
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia';
  probability: number;
  expectedCloseDate: string;
  owner: string;
}

const STAGES = [
  { id: 'lead', name: '1. Lead / Contacto', color: 'bg-slate-100 text-slate-800 border-slate-300' },
  { id: 'contacted', name: '2. Demo / Calificado', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'proposal', name: '3. Propuesta Enviada', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { id: 'closing', name: '4. Negociación / Cierre', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { id: 'won', name: '5. Ganada / Cliente Activo', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
];

const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-101',
    companyName: 'Transportes Neuquén Vaca Muerta',
    contactName: 'Ing. Carlos Rossi',
    dealValueUsd: 28000,
    dealValueArs: 36400000,
    stageId: 'lead',
    meddicScore: 45,
    country: 'Argentina',
    probability: 20,
    expectedCloseDate: '2026-09-15',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-102',
    companyName: 'Bodega Cuyo Reserve S.A.',
    contactName: 'Lic. Sofía Martínez',
    dealValueUsd: 18500,
    dealValueArs: 24050000,
    stageId: 'contacted',
    meddicScore: 78,
    country: 'Argentina',
    probability: 50,
    expectedCloseDate: '2026-08-30',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-103',
    companyName: 'Agroquímica Rosario SpA',
    contactName: 'Martin Benítez',
    dealValueUsd: 42000,
    dealValueArs: 54600000,
    stageId: 'proposal',
    meddicScore: 88,
    country: 'Argentina',
    probability: 75,
    expectedCloseDate: '2026-08-25',
    owner: 'Lucía Gómez'
  },
  {
    id: 'deal-104',
    companyName: 'Minera Cordillera Chile',
    contactName: 'Rodrigo Araya',
    dealValueUsd: 65000,
    dealValueArs: 84500000,
    stageId: 'closing',
    meddicScore: 92,
    country: 'Chile',
    probability: 90,
    expectedCloseDate: '2026-08-20',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-105',
    companyName: 'Retail Monterrey de México',
    contactName: 'Alejandro Garza',
    dealValueUsd: 95000,
    dealValueArs: 123500000,
    stageId: 'won',
    meddicScore: 96,
    country: 'México',
    probability: 100,
    expectedCloseDate: '2026-08-10',
    owner: 'Lucía Gómez'
  }
];

export function CrmKanbanTab() {
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('clientum_crm_deals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DEALS;
      }
    }
    return INITIAL_DEALS;
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showBulkWAModal, setShowBulkWAModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'ARS'>('USD');
  const [filterOwner, setFilterOwner] = useState('todos');

  // Listen to prospect export events
  React.useEffect(() => {
    const handleLeadAdded = (e: CustomEvent) => {
      if (e.detail) {
        const d = e.detail;
        const newDeal: Deal = {
          id: d.id || `deal-${Date.now()}`,
          companyName: d.companyName || 'Nueva Empresa',
          contactName: d.contactName || 'Contacto Comercial',
          dealValueUsd: d.dealValueUsd || 25000,
          dealValueArs: (d.dealValueUsd || 25000) * 1300,
          stageId: d.stageId || 'lead',
          meddicScore: d.meddicScore || 80,
          country: d.country || 'Argentina',
          probability: 25,
          expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          owner: 'Gonzalo Fernández'
        };

        setDeals(prev => {
          if (prev.some(item => item.id === newDeal.id || item.companyName === newDeal.companyName)) {
            return prev;
          }
          const next = [newDeal, ...prev];
          localStorage.setItem('clientum_crm_deals', JSON.stringify(next));
          return next;
        });
      }
    };

    window.addEventListener('crm-lead-added' as any, handleLeadAdded);
    return () => window.removeEventListener('crm-lead-added' as any, handleLeadAdded);
  }, []);

  const updateDealsState = (updater: (prev: Deal[]) => Deal[]) => {
    setDeals(prev => {
      const next = updater(prev);
      localStorage.setItem('clientum_crm_deals', JSON.stringify(next));
      return next;
    });
  };

  // Form state
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newDealValueUsd, setNewDealValueUsd] = useState(15000);
  const [newStageId, setNewStageId] = useState<Deal['stageId']>('lead');

  const totalPipelineValue = deals.reduce((acc, d) => acc + (selectedCurrency === 'USD' ? d.dealValueUsd : d.dealValueArs), 0);
  const totalWeightedValue = deals.reduce((acc, d) => acc + ((selectedCurrency === 'USD' ? d.dealValueUsd : d.dealValueArs) * (d.probability / 100)), 0);

  const moveDealStage = (dealId: string, direction: 'next' | 'prev') => {
    const stageKeys: Deal['stageId'][] = ['lead', 'contacted', 'proposal', 'closing', 'won'];
    updateDealsState(prev => prev.map(d => {
      if (d.id === dealId) {
        const currentIndex = stageKeys.indexOf(d.stageId);
        const nextIndex = direction === 'next' ? Math.min(currentIndex + 1, stageKeys.length - 1) : Math.max(currentIndex - 1, 0);
        return { ...d, stageId: stageKeys[nextIndex] };
      }
      return d;
    }));
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newContactName) return;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      companyName: newCompanyName,
      contactName: newContactName,
      dealValueUsd: Number(newDealValueUsd),
      dealValueArs: Number(newDealValueUsd) * 1300,
      stageId: newStageId,
      meddicScore: 60,
      country: 'Argentina',
      probability: 30,
      expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      owner: 'Gonzalo Fernández'
    };

    updateDealsState(prev => [newDeal, ...prev]);
    setIsAddModalOpen(false);
    setNewCompanyName('');
    setNewContactName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Sales CRM Pipeline
            </span>
            <span className="text-slate-400 text-xs">· Módulo 3.2 Prospección & Pipeline</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Kanban className="w-7 h-7 text-indigo-600" /> Tablero CRM Kanban Sales
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Gestión de oportunidades B2B, seguimiento de etapas de venta, scoring MEDDIC y proyecciones de facturación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkWAModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Envío Masivo WA</span>
          </button>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedCurrency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setSelectedCurrency('ARS')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedCurrency === 'ARS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ARS ($)
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer border-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Oportunidad</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Valor Total Pipeline</span>
          <span className="text-2xl font-black text-slate-900">
            {selectedCurrency === 'USD' ? `$${totalPipelineValue.toLocaleString()} USD` : `$${totalPipelineValue.toLocaleString()} ARS`}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5 font-semibold">{deals.length} oportunidades activas</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Pronóstico Ponderado</span>
          <span className="text-2xl font-black text-emerald-600">
            {selectedCurrency === 'USD' ? `$${Math.round(totalWeightedValue).toLocaleString()} USD` : `$${Math.round(totalWeightedValue).toLocaleString()} ARS`}
          </span>
          <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">Ajustado por probabilidad</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Score MEDDIC Promedio</span>
          <span className="text-2xl font-black text-indigo-600">
            {Math.round(deals.reduce((a, b) => a + b.meddicScore, 0) / deals.length)} / 100
          </span>
          <span className="text-[10px] text-indigo-600 block mt-0.5 font-bold">Calificación Comercial Alta</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Ciclo Promedio Cierre</span>
          <span className="text-2xl font-black text-slate-900">24 días</span>
          <span className="text-[10px] text-slate-500 block mt-0.5 font-semibold">B2B LATAM Standard</span>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter(d => d.stageId === stage.id);
          const stageTotalUsd = stageDeals.reduce((a, b) => a + (selectedCurrency === 'USD' ? b.dealValueUsd : b.dealValueArs), 0);

          return (
            <div key={stage.id} className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col min-w-[260px] space-y-3">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${stage.color}`}>
                  {stage.name}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  ({stageDeals.length})
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-500 px-1 border-b border-slate-200 pb-2 flex justify-between">
                <span>Subtotal:</span>
                <span className="text-slate-900 font-black">
                  {selectedCurrency === 'USD' ? `$${stageTotalUsd.toLocaleString()} USD` : `$${stageTotalUsd.toLocaleString()} ARS`}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-3 flex-1">
                {stageDeals.map((deal) => (
                  <div key={deal.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{deal.companyName}</h4>
                      <span className="bg-indigo-50 text-indigo-700 font-mono text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                        MEDDIC {deal.meddicScore}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{deal.contactName}</span>
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="text-xs font-black text-emerald-600">
                        {selectedCurrency === 'USD' ? `$${deal.dealValueUsd.toLocaleString()} USD` : `$${deal.dealValueArs.toLocaleString()} ARS`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{deal.probability}% Prob.</span>
                    </div>

                    {/* Move Stage Quick Controls */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => moveDealStage(deal.id, 'prev')}
                        disabled={stage.id === 'lead'}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                      >
                        ← Anterior
                      </button>
                      <button
                        onClick={() => moveDealStage(deal.id, 'next')}
                        disabled={stage.id === 'won'}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-30 cursor-pointer"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="p-6 text-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-xl">
                    No hay oportunidades en esta etapa.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> Nueva Oportunidad Comercial
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDeal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Empresa</label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="Ej: Agroservicios Pampeanos S.A."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contacto Principal</label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="Ej: Lic. Marcelo Rossi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monto Estimado (USD)</label>
                <input
                  type="number"
                  required
                  value={newDealValueUsd}
                  onChange={(e) => setNewDealValueUsd(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Etapa Inicial</label>
                <select
                  value={newStageId}
                  onChange={(e) => setNewStageId(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden"
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Guardar Oportunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Envío Masivo WhatsApp con IA */}
      <BulkWhatsAppModal
        isOpen={showBulkWAModal}
        onClose={() => setShowBulkWAModal(false)}
        initialContacts={deals.map(d => ({
          id: d.id,
          name: d.contactName,
          company: d.companyName,
          phone: '+54 9 298 443-0000',
          city: d.country === 'Argentina' ? 'Neuquén / Gral. Roca' : d.country,
          country: d.country,
          leadScore: d.meddicScore,
          status: d.stageId === 'won' ? 'Cliente' : d.stageId === 'proposal' ? 'Oportunidad' : 'Lead Calificado',
          personaTag: 'CRO / Ventas',
          whatsappVerified: true
        }))}
      />
    </div>
  );
}
