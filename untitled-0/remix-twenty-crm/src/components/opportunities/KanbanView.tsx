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
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Opportunity, StageId } from '../../types';

export const KanbanView: React.FC = () => {
  const {
    opportunities,
    moveOpportunityStage,
    setSelectedRecord,
    openNewRecordModal,
    openAICopilot,
    filterState,
    t,
  } = useCRM();

  const [draggedOppId, setDraggedOppId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<StageId | null>(null);

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
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
    if (filterState.stage && filterState.stage !== 'all' && opp.stage !== filterState.stage) {
      return false;
    }
    if (filterState.owner && filterState.owner !== 'all' && opp.assignedTo !== filterState.owner) {
      return false;
    }
    if (filterState.priority && filterState.priority !== 'all' && opp.priority !== filterState.priority) {
      return false;
    }
    return true;
  });

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
    <div id="twenty-kanban-board" className="flex-1 overflow-x-auto p-4 bg-[#0a0c10] flex gap-3.5 select-none h-full items-start">
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
                  className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1f2535] transition-colors"
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
                              initialPrompt: `Analyze deal health and give 3 recommended next steps for "${opp.name}" ($${opp.amount.toLocaleString()}, Stage: ${opp.stage}, Account: ${opp.companyName || 'N/A'}).`,
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
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#171b26] text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('createFirstDeal')}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
