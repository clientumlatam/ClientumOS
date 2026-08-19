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
  MessageSquare,
  FileText,
  Paperclip,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

  // Side Panel State
  const [activeDealModal, setActiveDealModal] = useState<Deal | null>(null);
  const [panelTab, setPanelTab] = useState<'timeline' | 'tasks' | 'notes' | 'files' | 'emails'>('timeline');

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
    <div className="space-y-4">
      {/* Top Header (Frappe Style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Kanban className="w-5 h-5 text-gray-600" /> Tablero CRM Kanban Sales
          </h1>
          <p className="text-gray-500 text-[13px] mt-0.5">
            Oportunidades B2B, seguimiento de etapas de venta y scoring MEDDIC.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkWAModal(true)}
            className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Envío Masivo WA</span>
          </button>

          <div className="bg-gray-100 p-0.5 rounded-md border border-gray-200 flex items-center text-[12px] font-medium">
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${selectedCurrency === 'USD' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setSelectedCurrency('ARS')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${selectedCurrency === 'ARS' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              ARS ($)
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Oportunidad</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Bar (Frappe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Valor Total Pipeline</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {selectedCurrency === 'USD' ? `$${totalPipelineValue.toLocaleString()} USD` : `$${totalPipelineValue.toLocaleString()} ARS`}
            </span>
            <span className="text-[11px] text-gray-400 block">{deals.length} oportunidades activas</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Pronóstico Ponderado</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {selectedCurrency === 'USD' ? `$${Math.round(totalWeightedValue).toLocaleString()} USD` : `$${Math.round(totalWeightedValue).toLocaleString()} ARS`}
            </span>
            <span className="text-[11px] text-gray-400 block">Ajustado por probabilidad</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Score MEDDIC Promedio</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {Math.round(deals.reduce((a, b) => a + b.meddicScore, 0) / (deals.length || 1))} / 100
            </span>
            <span className="text-[11px] text-gray-400 block">Calificación Comercial Alta</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Ciclo Promedio Cierre</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">24 días</span>
            <span className="text-[11px] text-gray-400 block">B2B LATAM Standard</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Kanban Board Columns (Frappe Style) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter(d => d.stageId === stage.id);
          const stageTotalUsd = stageDeals.reduce((a, b) => a + (selectedCurrency === 'USD' ? b.dealValueUsd : b.dealValueArs), 0);

          return (
            <div key={stage.id} className="bg-gray-50 rounded-md p-2.5 border border-gray-200 flex flex-col min-w-[250px] space-y-2.5">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${stage.color}`}>
                  {stage.name}
                </span>
                <span className="text-[11px] font-mono font-medium text-gray-500">
                  {stageDeals.length}
                </span>
              </div>

              <div className="text-[11px] text-gray-500 px-1 border-b border-gray-200 pb-2 flex justify-between">
                <span>Subtotal:</span>
                <span className="text-gray-900 font-semibold">
                  {selectedCurrency === 'USD' ? `$${stageTotalUsd.toLocaleString()} USD` : `$${stageTotalUsd.toLocaleString()} ARS`}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-2 flex-1">
                {stageDeals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-md border border-gray-200 shadow-2xs hover:border-gray-300 transition-all flex flex-col overflow-hidden group">
                    <div 
                      onClick={() => setActiveDealModal(deal)}
                      className="p-3 space-y-2 cursor-pointer hover:bg-gray-50/80 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold text-[13px] text-gray-900 leading-snug group-hover:text-gray-700">{deal.companyName}</h4>
                        <span className="bg-gray-100 text-gray-700 font-mono text-[9px] font-medium px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                          MEDDIC {deal.meddicScore}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span>{deal.contactName}</span>
                      </p>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-1">
                        <span className="text-[12px] font-semibold text-gray-900">
                          {selectedCurrency === 'USD' ? `$${deal.dealValueUsd.toLocaleString()} USD` : `$${deal.dealValueArs.toLocaleString()} ARS`}
                        </span>
                        <span className="text-[10px] text-gray-500">{deal.probability}% Prob.</span>
                      </div>
                    </div>

                    {/* Move Stage Quick Controls */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); moveDealStage(deal.id, 'prev'); }}
                        disabled={stage.id === 'lead'}
                        className="text-[10px] font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 cursor-pointer"
                      >
                        ← Anterior
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveDealStage(deal.id, 'next'); }}
                        disabled={stage.id === 'won'}
                        className="text-[10px] font-medium text-gray-900 hover:text-black disabled:opacity-30 cursor-pointer"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="p-4 text-center text-gray-400 text-[11px] italic border border-dashed border-gray-200 rounded-md">
                    Sin oportunidades
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Panel: Full Deal Detail (Twenty CRM Style) */}
      <AnimatePresence>
        {activeDealModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDealModal(null)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200"
            >
              <div className="flex flex-col h-full overflow-hidden">
                {/* Header Profile */}
                <div className="p-6 border-b border-slate-200 bg-slate-50/50 relative shrink-0">
                  <button
                    onClick={() => setActiveDealModal(null)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-800 to-slate-900 text-white font-bold text-xl flex items-center justify-center shadow-inner">
                      {activeDealModal.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 tracking-tight">{activeDealModal.companyName}</h3>
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                        {activeDealModal.contactName}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <div className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-800 font-bold text-sm rounded-lg border border-emerald-200 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-emerald-600 uppercase tracking-wide">Monto Estimado</span>
                      {selectedCurrency === 'USD' ? `$${activeDealModal.dealValueUsd.toLocaleString()} USD` : `$${activeDealModal.dealValueArs.toLocaleString()} ARS`}
                    </div>
                  </div>
                </div>

                {/* Sub-Tabs (Twenty CRM Style) */}
                <div className="flex items-center px-6 border-b border-slate-200 bg-white shrink-0 overflow-x-auto hide-scrollbar">
                  {[
                    { id: 'timeline', label: 'Timeline', icon: Clock },
                    { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
                    { id: 'notes', label: 'Notes', icon: FileText },
                    { id: 'files', label: 'Files', icon: Paperclip },
                    { id: 'emails', label: 'Emails', icon: Mail }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPanelTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                        panelTab === tab.id
                          ? 'border-indigo-600 text-indigo-700'
                          : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                  {panelTab === 'timeline' && (
                    <div className="space-y-6">
                      {/* At-a-glance Info Blocks */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-slate-500 font-bold block text-[10px] uppercase mb-1">Score MEDDIC</span>
                            <span className="font-extrabold text-slate-900 text-lg leading-none">{activeDealModal.meddicScore}</span>
                          </div>
                          <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-slate-500 font-bold block text-[10px] uppercase mb-1">Probabilidad</span>
                            <span className="font-extrabold text-emerald-600 text-lg leading-none">{activeDealModal.probability}%</span>
                          </div>
                          <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Detalles de Oportunidad</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-slate-500">Etapa Actual</span>
                            <span className="font-medium text-slate-900">
                              {STAGES.find(s => s.id === activeDealModal.stageId)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-slate-500">Fecha Cierre Estimada</span>
                            <span className="font-medium text-slate-900">{activeDealModal.expectedCloseDate}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-slate-500">Propietario</span>
                            <span className="font-medium text-slate-900">{activeDealModal.owner}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-slate-500">Región</span>
                            <span className="font-medium text-slate-900">{activeDealModal.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {panelTab === 'tasks' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <CheckCircle2 className="w-12 h-12 text-slate-300" />
                      <p className="text-sm font-medium text-slate-500">No hay tareas pendientes.</p>
                      <button className="text-indigo-600 font-bold text-xs hover:underline">Agregar nueva tarea</button>
                    </div>
                  )}

                  {panelTab === 'notes' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <FileText className="w-12 h-12 text-slate-300" />
                      <p className="text-sm font-medium text-slate-500">No hay notas en esta oportunidad.</p>
                      <button className="text-indigo-600 font-bold text-xs hover:underline">Añadir nota</button>
                    </div>
                  )}

                  {panelTab === 'files' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <Paperclip className="w-12 h-12 text-slate-300" />
                      <p className="text-sm font-medium text-slate-500">No hay propuestas ni contratos adjuntos.</p>
                      <button className="text-indigo-600 font-bold text-xs hover:underline">Subir documento</button>
                    </div>
                  )}

                  {panelTab === 'emails' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <Mail className="w-12 h-12 text-slate-300" />
                      <p className="text-sm font-medium text-slate-500">No hay correos en esta oportunidad.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Deal Modal (Frappe Style) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h3 className="font-semibold text-[15px] text-gray-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-gray-700" /> Nueva Oportunidad Comercial
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDeal} className="p-5 space-y-3.5 text-[13px]">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Empresa <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="Ej: Agroservicios Pampeanos S.A."
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contacto Principal <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="Ej: Lic. Marcelo Rossi"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Monto Estimado (USD)</label>
                <input
                  type="number"
                  required
                  value={newDealValueUsd}
                  onChange={(e) => setNewDealValueUsd(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-semibold text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Etapa Inicial</label>
                <select
                  value={newStageId}
                  onChange={(e) => setNewStageId(e.target.value as any)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-50 shadow-xs cursor-pointer transition-colors"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-md shadow-xs cursor-pointer transition-colors"
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
