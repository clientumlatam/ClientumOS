import React, { useState } from 'react';
import {
  Plus,
  Building2,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Tag,
  Sparkles,
  Filter,
  X,
  Check,
  RotateCcw,
  SlidersHorizontal,
  DollarSign,
  User,
  ShieldAlert,
  Mail,
  Phone,
  MessageCircle,
  Settings2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Opportunity, StageId } from '../../types';
import { SavedViewsBar } from '../common/SavedViewsBar';

export const KanbanView: React.FC = () => {
  const {
    opportunities,
    people,
    moveOpportunityStage,
    setSelectedRecord,
    openNewRecordModal,
    openAICopilot,
    filterState,
    t,
    language,
  } = useCRM();

  const [draggedOppId, setDraggedOppId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<StageId | null>(null);

  // Multi-Select Filter Sidebar States
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState<number | ''>('');
  const [maxAmount, setMaxAmount] = useState<number | ''>('');
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);
  const [showCardTags, setShowCardTags] = useState(true);
  const [showCardDates, setShowCardDates] = useState(true);
  const [compactCards, setCompactCards] = useState(false);

  // Extract unique owners from opportunities dataset
  const uniqueOwners: string[] = Array.from(new Set(opportunities.map((o) => o.assignedTo))).filter(Boolean) as string[];
  const priorityOptions = ['Critical', 'High', 'Medium', 'Low'];

  // Calculate active filter count
  const activeFiltersCount =
    selectedOwners.length +
    selectedPriorities.length +
    (minAmount !== '' ? 1 : 0) +
    (maxAmount !== '' ? 1 : 0);

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    // Search query from filterState
    if (filterState.search) {
      const q = filterState.search.toLowerCase();
      const matchName = opp.name.toLowerCase().includes(q);
      const matchCompany = (opp.companyName || '').toLowerCase().includes(q);
      const matchContact = (opp.contactName || '').toLowerCase().includes(q);
      const matchOwner = opp.assignedTo.toLowerCase().includes(q);
      const matchTag = opp.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchCompany && !matchContact && !matchOwner && !matchTag) {
        return false;
      }
    }

    // Global stage/owner/priority filters
    if (filterState.stage && filterState.stage !== 'all' && opp.stage !== filterState.stage) {
      return false;
    }
    if (filterState.owner && filterState.owner !== 'all' && opp.assignedTo !== filterState.owner) {
      return false;
    }
    if (filterState.priority && filterState.priority !== 'all' && opp.priority !== filterState.priority) {
      return false;
    }

    // Multi-Select Owner Filter
    if (selectedOwners.length > 0 && !selectedOwners.includes(opp.assignedTo)) {
      return false;
    }

    // Multi-Select Priority Filter
    if (selectedPriorities.length > 0 && !selectedPriorities.includes(opp.priority)) {
      return false;
    }

    // Deal Value Range Filter
    if (minAmount !== '' && opp.amount < Number(minAmount)) {
      return false;
    }
    if (maxAmount !== '' && opp.amount > Number(maxAmount)) {
      return false;
    }

    return true;
  });

  const toggleOwner = (owner: string) => {
    setSelectedOwners((prev) =>
      prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]
    );
  };

  const togglePriority = (p: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedOwners([]);
    setSelectedPriorities([]);
    setMinAmount('');
    setMaxAmount('');
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedOppId(id);
  };

  const handleDragOver = (e: React.DragEvent, stageId: StageId) => {
    e.preventDefault();
    if (dragOverStage !== stageId) {
      setDragOverStage(stageId);
    }
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, stageId: StageId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedOppId;
    if (id) {
      moveOpportunityStage(id, stageId);
    }
    setDraggedOppId(null);
    setDragOverStage(null);
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Critical':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'High':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Medium':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getContact = (opp: Opportunity) =>
    people.find((person) => person.id === opp.contactId) ||
    people.find((person) => `${person.firstName} ${person.lastName}` === opp.contactName);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      {/* Top Bar with Saved Views and Multi-Select Filter Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white min-h-[58px]">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="hidden lg:flex items-center gap-1.5 pl-4 text-xs text-slate-400 shrink-0">
            <span>Negocios</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-slate-700">Kanban</span>
          </div>
          <SavedViewsBar target="opportunities" />
        </div>

        <div className="px-3 py-2 border-l border-slate-200 flex items-center gap-2 shrink-0 relative">
          <button
            id="toggle-kanban-filter-sidebar"
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFiltersCount > 0 || isFilterSidebarOpen
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros ({activeFiltersCount})</span>
          </button>
          <div className="relative">
            <button
              id="kanban-settings-btn"
              onClick={() => setIsBoardSettingsOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isBoardSettingsOpen
                  ? 'bg-slate-900 text-white'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs'
              }`}
              aria-expanded={isBoardSettingsOpen}
              aria-haspopup="menu"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Configurar tablero</span>
            </button>
            {isBoardSettingsOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-30 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
                role="menu"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">Configuración Kanban</span>
                  <span className="text-[10px] text-slate-400">Vista actual</span>
                </div>
                {[
                  { label: 'Etiquetas y prioridad', value: showCardTags, setValue: setShowCardTags },
                  { label: 'Fecha de cierre', value: showCardDates, setValue: setShowCardDates },
                  { label: 'Tarjetas compactas', value: compactCards, setValue: setCompactCards },
                ].map((setting) => (
                  <button
                    key={setting.label}
                    onClick={() => setting.setValue((value) => !value)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                    role="menuitemcheckbox"
                    aria-checked={setting.value}
                  >
                    <span>{setting.label}</span>
                    {setting.value ? (
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Kanban Board Column Canvas */}
        <div id="clientum-kanban-board" className="flex-1 overflow-x-auto p-4 flex gap-3.5 select-none h-full items-start custom-scrollbar">
          {STAGES.map((stage) => {
            const stageOpps = filteredOpportunities.filter((o) => o.stage === stage.id);
            const stageTotal = stageOpps.reduce((acc, curr) => acc + curr.amount, 0);
            const isTarget = dragOverStage === stage.id;

            return (
              <div
                key={stage.id}
                id={`kanban-column-${stage.id}`}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.id)}
                className={`w-72 shrink-0 flex flex-col max-h-full rounded-xl bg-slate-100/90 border transition-all duration-150 ${
                  isTarget
                    ? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10'
                    : 'border-slate-200'
                }`}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {t(`stage_${stage.id}` as any) || stage.name}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                      {stageOpps.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold font-mono text-slate-700">
                      ${Math.round(stageTotal / 1000)}k
                    </span>
                    <button
                      id={`column-add-deal-${stage.id}`}
                      onClick={() => openNewRecordModal('opportunity')}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                      title={`${t('newOpportunity')} (${t(`stage_${stage.id}` as any) || stage.name})`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Column Cards Container */}
                <div className="p-2 space-y-2.5 overflow-y-auto flex-1 min-h-[140px] custom-scrollbar">
                  {stageOpps.length === 0 ? (
                    <div className="h-24 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-[11px] text-slate-400 font-medium">
                      {t('noDealsInStage')}
                    </div>
                  ) : (
                    stageOpps.map((opp) => (
                      <div
                        key={opp.id}
                        id={`deal-card-${opp.id}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, opp.id)}
                        onClick={() => setSelectedRecord({ type: 'opportunity', id: opp.id })}
                      className={`${compactCards ? 'p-2.5' : 'p-3'} rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing transition-all group relative`}
                      >
                        {/* Deal Name & Amount */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {opp.name}
                          </h4>
                          <span className="text-xs font-bold font-mono text-slate-900 shrink-0">
                            ${opp.amount.toLocaleString()}
                          </span>
                        </div>

                        {/* Company & Contact Link */}
                        {opp.companyName && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2 truncate font-medium">
                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{opp.companyName}</span>
                            {opp.contactName && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="truncate text-slate-500">{opp.contactName}</span>
                              </>
                            )}
                          </div>
                        )}

                        {(() => {
                          const contact = getContact(opp);
                          if (!contact) return null;
                          return (
                            <div className="mb-2 space-y-1 text-[10px] text-slate-500">
                              <div className="flex items-center gap-1.5 truncate">
                                <User className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{opp.contactName || `${contact.firstName} ${contact.lastName}`}</span>
                              </div>
                              {!compactCards && (contact.email || contact.phone) && (
                                <div className="flex items-center gap-2">
                                  {contact.email && (
                                    <a
                                      href={`mailto:${contact.email}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1 hover:text-blue-600 truncate"
                                      title={`Enviar email a ${contact.email}`}
                                    >
                                      <Mail className="w-3 h-3" />
                                      <span className="truncate max-w-[132px]">{contact.email}</span>
                                    </a>
                                  )}
                                  {contact.phone && (
                                    <a
                                      href={`tel:${contact.phone}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1 hover:text-blue-600 shrink-0"
                                      title={`Llamar a ${contact.phone}`}
                                    >
                                      <Phone className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Tags & Priority */}
                        {showCardTags && <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getPriorityColor(
                              opp.priority
                            )}`}
                          >
                            {opp.priority}
                          </span>
                          {opp.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[90px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>}

                        {/* Footer Info & Owner */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          {showCardDates ? (
                            <div className="flex items-center gap-1 font-mono text-[10px]">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{opp.closeDate}</span>
                            </div>
                          ) : <span />}

                          <div className="flex items-center gap-1.5">
                            {getContact(opp) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRecord({ type: 'opportunity', id: opp.id });
                                }}
                                className="p-1 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                                title="Abrir conversación del negocio"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              id={`deal-ai-summary-${opp.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                openAICopilot({
                                  type: 'deal',
                                  id: opp.id,
                                  name: opp.name,
                                  initialPrompt: language === 'es'
                                    ? `Analiza la salud del negocio y proporciona 3 pasos recomendados para "${opp.name}" ($${opp.amount.toLocaleString()}, Etapa: ${opp.stage}, Cuenta: ${opp.companyName || 'N/A'}).`
                                    : language === 'pt'
                                    ? `Analise a saúde do negócio e forneça 3 recomendações de próximos passos para "${opp.name}" ($${opp.amount.toLocaleString()}, Etapa: ${opp.stage}, Conta: ${opp.companyName || 'N/A'}).`
                                    : `Analyze deal health and give 3 recommended next steps for "${opp.name}" ($${opp.amount.toLocaleString()}, Stage: ${opp.stage}, Account: ${opp.companyName || 'N/A'}).`,
                                });
                              }}
                              className="p-1 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                              title="Generar análisis de IA"
                            >
                              <Sparkles className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] font-semibold text-slate-600 truncate max-w-[80px]">
                              {opp.assignedTo.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Column Footer Quick Add */}
                <div className="p-2 border-t border-slate-200/80">
                  <button
                    id={`column-quick-add-btn-${stage.id}`}
                    onClick={() => openNewRecordModal('opportunity')}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-slate-600 hover:text-blue-600 hover:bg-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('createFirstDeal')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* MULTI-SELECT FILTER SIDEBAR */}
        {isFilterSidebarOpen && (
          <div className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col h-full z-20 text-xs shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200 custom-scrollbar">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Filtros Avanzados Kanban</h3>
              </div>
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clear All Button */}
            {activeFiltersCount > 0 && (
              <div className="mb-4">
                <button
                  onClick={handleClearAllFilters}
                  className="w-full py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpiar filtros ({activeFiltersCount})</span>
                </button>
              </div>
            )}

            <div className="space-y-5 flex-1">
              {/* FILTER 1: OWNER / ASSIGNED TO (MULTI-SELECT) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Propietario(s) del negocio
                </label>
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {uniqueOwners.map((owner) => {
                    const count = opportunities.filter((o) => o.assignedTo === owner).length;
                    const isChecked = selectedOwners.includes(owner);
                    return (
                      <label
                        key={owner}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-white cursor-pointer text-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleOwner(owner)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="font-medium text-xs">{owner}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* FILTER 2: DEAL VALUE RANGE ($ USD) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Rango de Valor ($ USD)
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Mínimo ($)</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-white text-slate-900 px-2.5 py-1.5 rounded border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Máximo ($)</span>
                    <input
                      type="number"
                      placeholder="100000"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-white text-slate-900 px-2.5 py-1.5 rounded border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Range Presets */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Hasta $10k', min: '', max: 10000 },
                    { label: '$10k - $50k', min: 10000, max: 50000 },
                    { label: 'Más de $50k', min: 50000, max: '' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMinAmount(preset.min);
                        setMaxAmount(preset.max);
                      }}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[10px] font-semibold transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILTER 3: PRIORITY LEVEL (MULTI-SELECT) */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  Nivel de Prioridad
                </label>
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {priorityOptions.map((priority) => {
                    const isChecked = selectedPriorities.includes(priority);
                    const count = opportunities.filter((o) => o.priority === priority).length;
                    return (
                      <label
                        key={priority}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-white cursor-pointer text-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePriority(priority)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Footer Stats */}
            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>Mostrando:</span>
              <strong className="text-slate-900">{filteredOpportunities.length} / {opportunities.length} Negocios</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
