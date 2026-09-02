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
  ShieldAlert
} from 'lucide-react';
import { useCRM } from '@clientum/ui';
import { STAGES } from '@clientum/ui';
import { Opportunity, StageId } from '@clientum/types';
import { SavedViewsBar } from '../common/SavedViewsBar';

export const KanbanView: React.FC = () => {
  const {
    opportunities,
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
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'High':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Medium':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0c10]">
      {/* Top Bar with Saved Views and Multi-Select Filter Trigger */}
      <div className="flex items-center justify-between border-b border-[#1e222d] bg-[#0c0e14]">
        <div className="flex-1">
          <SavedViewsBar target="opportunities" />
        </div>

        <div className="px-3 py-2 border-l border-[#1e222d] flex items-center gap-2 shrink-0">
          <button
            id="toggle-kanban-filter-sidebar"
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFiltersCount > 0 || isFilterSidebarOpen
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-[#161a24] hover:bg-[#1f2535] text-slate-300 border border-[#232a3b]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Multi-Filter</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Kanban Board Column Canvas */}
        <div id="clientum-kanban-board" className="flex-1 overflow-x-auto p-4 flex gap-3.5 select-none h-full items-start">
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
                className={`w-72 shrink-0 flex flex-col max-h-full rounded-xl bg-[#11141c] border transition-all duration-150 ${
                  isTarget
                    ? 'border-blue-500/60 bg-[#141926] shadow-lg shadow-blue-500/10'
                    : 'border-[#1e2330]'
                }`}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-[#1e2330] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-semibold text-xs text-slate-200 truncate">
                      {t(`stage_${stage.id}` as any) || stage.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1b202c] text-slate-400 border border-[#272e3f]">
                      {stageOpps.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold font-mono text-slate-300">
                      ${Math.round(stageTotal / 1000)}k
                    </span>
                    <button
                      id={`column-add-deal-${stage.id}`}
                      onClick={() => openNewRecordModal('opportunity')}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1f2535] transition-colors cursor-pointer"
                      title={`${t('newOpportunity')} (${t(`stage_${stage.id}` as any) || stage.name})`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Column Cards Container */}
                <div className="p-2 space-y-2.5 overflow-y-auto flex-1 min-h-[140px]">
                  {stageOpps.length === 0 ? (
                    <div className="h-24 border border-dashed border-[#1f2433] rounded-lg flex items-center justify-center text-[11px] text-slate-400">
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
                        className="p-3 rounded-lg bg-[#161a24] hover:bg-[#1a202d] border border-[#222736] hover:border-[#32394d] shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group relative"
                      >
                        {/* Deal Name & Amount */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-xs font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                            {opp.name}
                          </h4>
                          <span className="text-xs font-bold font-mono text-slate-100 shrink-0">
                            ${opp.amount.toLocaleString()}
                          </span>
                        </div>

                        {/* Company & Contact Link */}
                        {opp.companyName && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2 truncate">
                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{opp.companyName}</span>
                            {opp.contactName && (
                              <>
                                <span className="text-slate-400">•</span>
                                <span className="truncate text-slate-400">{opp.contactName}</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Tags & Priority */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${getPriorityColor(
                              opp.priority
                            )}`}
                          >
                            {opp.priority}
                          </span>
                          {opp.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-[#1f2433] text-slate-400 border border-[#2a3144] truncate max-w-[90px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer Info & Owner */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#202534] text-[11px] text-slate-400">
                          <div className="flex items-center gap-1 font-mono text-[10px]">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{opp.closeDate}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
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
                              className="p-1 rounded hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 transition-colors"
                              title="Generate AI Deal Intelligence"
                            >
                              <Sparkles className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] font-medium text-slate-400 truncate max-w-[80px]">
                              {opp.assignedTo.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Column Footer Quick Add */}
                <div className="p-2 border-t border-[#1e2330]">
                  <button
                    id={`column-quick-add-btn-${stage.id}`}
                    onClick={() => openNewRecordModal('opportunity')}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#171b26] text-xs font-medium transition-colors cursor-pointer"
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
          <div className="w-80 bg-[#12151e] border-l border-[#1e2330] p-4 flex flex-col h-full z-20 text-xs shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2536] mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Kanban Multi-Filter</h3>
              </div>
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#1c2232]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clear All Button */}
            {activeFiltersCount > 0 && (
              <div className="mb-4">
                <button
                  onClick={handleClearAllFilters}
                  className="w-full py-1.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All Filters ({activeFiltersCount})</span>
                </button>
              </div>
            )}

            <div className="space-y-5 flex-1">
              {/* FILTER 1: OWNER / ASSIGNED TO (MULTI-SELECT) */}
              <div className="space-y-2">
                <label className="font-semibold text-white text-[11px] flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Opportunity Owner(s)
                </label>
                <div className="space-y-1 bg-[#161a26] p-2.5 rounded-xl border border-[#222a3d]">
                  {uniqueOwners.map((owner) => {
                    const count = opportunities.filter((o) => o.assignedTo === owner).length;
                    const isChecked = selectedOwners.includes(owner);
                    return (
                      <label
                        key={owner}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-[#1f2638] cursor-pointer text-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleOwner(owner)}
                            className="rounded border-[#2c364e] bg-[#12151d] text-blue-600 focus:ring-0"
                          />
                          <span className="font-medium text-xs">{owner}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-[#12151d] px-1.5 py-0.5 rounded">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* FILTER 2: DEAL VALUE RANGE ($ USD) */}
              <div className="space-y-2">
                <label className="font-semibold text-white text-[11px] flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Deal Value Range ($ USD)
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#161a26] p-2.5 rounded-xl border border-[#222a3d]">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Min Value ($)</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-[#12151d] text-white px-2.5 py-1.5 rounded border border-[#273044] font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Max Value ($)</span>
                    <input
                      type="number"
                      placeholder="100000"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-[#12151d] text-white px-2.5 py-1.5 rounded border border-[#273044] font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Range Presets */}
                <div className="flex flex-wrap gap-1">
                  {(
                    [
                      { label: 'Under $10k', min: '' as const, max: 10000 },
                      { label: '$10k - $50k', min: 10000, max: 50000 },
                      { label: 'Over $50k', min: 50000, max: '' as const },
                    ] as { label: string; min: number | ''; max: number | '' }[]
                  ).map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMinAmount(preset.min);
                        setMaxAmount(preset.max);
                      }}
                      className="px-2 py-1 rounded bg-[#161a26] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-[#222a3d] text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILTER 3: PRIORITY LEVEL (MULTI-SELECT) */}
              <div className="space-y-2">
                <label className="font-semibold text-white text-[11px] flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Priority Level
                </label>
                <div className="space-y-1 bg-[#161a26] p-2.5 rounded-xl border border-[#222a3d]">
                  {priorityOptions.map((priority) => {
                    const isChecked = selectedPriorities.includes(priority);
                    const count = opportunities.filter((o) => o.priority === priority).length;
                    return (
                      <label
                        key={priority}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-[#1f2638] cursor-pointer text-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePriority(priority)}
                            className="rounded border-[#2c364e] bg-[#12151d] text-blue-600 focus:ring-0"
                          />
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-[#12151d] px-1.5 py-0.5 rounded">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Footer Stats */}
            <div className="pt-4 border-t border-[#1f2536] text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>Showing:</span>
              <strong className="text-white">{filteredOpportunities.length} / {opportunities.length} Deals</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
