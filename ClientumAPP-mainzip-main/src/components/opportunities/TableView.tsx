import React, { useState } from 'react';
import {
  ArrowUpDown,
  Building2,
  Trash2,
  Edit2,
  MoreHorizontal,
  Sparkles,
  CheckSquare,
  Square,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Opportunity, StageId } from '../../types';

type SortField = 'name' | 'amount' | 'stage' | 'probability' | 'companyName' | 'closeDate' | 'priority' | 'assignedTo';

export const TableView: React.FC = () => {
  const {
    opportunities,
    updateOpportunity,
    deleteOpportunity,
    moveOpportunityStage,
    setSelectedRecord,
    openAICopilot,
    filterState,
    t,
    language,
    showToast,
  } = useCRM();

  const [sortField, setSortField] = useState<SortField>('amount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter opportunities
  const filtered = opportunities.filter((opp) => {
    if (filterState.search) {
      const q = filterState.search.toLowerCase();
      const matchName = opp.name.toLowerCase().includes(q);
      const matchCompany = (opp.companyName || '').toLowerCase().includes(q);
      const matchContact = (opp.contactName || '').toLowerCase().includes(q);
      const matchOwner = opp.assignedTo.toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchContact && !matchOwner) {
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

  // Sort opportunities
  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';

    if (sortField === 'amount' || sortField === 'probability') {
      return sortDirection === 'asc' ? (a[sortField] || 0) - (b[sortField] || 0) : (b[sortField] || 0) - (a[sortField] || 0);
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === sorted.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sorted.map((o) => o.id));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.length} selected deal(s)?`)) {
      selectedIds.forEach((id) => deleteOpportunity(id));
      setSelectedIds([]);
      showToast(`Deleted ${selectedIds.length} deal(s)`, 'info');
    }
  };

  const handleBulkStageChange = (stage: StageId) => {
    selectedIds.forEach((id) => moveOpportunityStage(id, stage));
    setSelectedIds([]);
    showToast(`Updated stage for ${selectedIds.length} deals`, 'success');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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
    <div id="clientum-table-container" className="flex-1 flex flex-col bg-[#0d0f14] overflow-hidden">
      {/* Bulk Action Bar when items selected */}
      {selectedIds.length > 0 && (
        <div className="bg-[#181d29] border-b border-blue-500/30 px-4 py-2 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="font-semibold text-blue-400">{selectedIds.length}</span> {t('selected')}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">{t('stage')}:</span>
              <select
                id="bulk-stage-select"
                onChange={(e) => handleBulkStageChange(e.target.value as StageId)}
                defaultValue=""
                className="bg-[#12151d] text-slate-200 text-xs px-2 py-1 rounded border border-[#283044] focus:outline-none"
              >
                <option value="" disabled>
                  {t('stage')}...
                </option>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {t(`stage_${s.id}` as any) || s.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              id="bulk-delete-btn"
              onClick={handleBulkDelete}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              {t('delete')}
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead className="bg-[#11141c] text-slate-400 sticky top-0 z-10 border-b border-[#1e2330]">
            <tr>
              <th className="w-10 px-3 py-2.5">
                <button
                  onClick={toggleSelectAll}
                  className="text-slate-400 hover:text-slate-200 p-0.5"
                  title="Select all"
                >
                  {selectedIds.length === sorted.length && sorted.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('dealName')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('amount')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('stage')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('stage')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors hidden sm:table-cell"
                onClick={() => handleSort('companyName')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('company')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors hidden md:table-cell"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('priority')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors hidden lg:table-cell"
                onClick={() => handleSort('closeDate')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('closeDate')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                className="px-3 py-2.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors hidden xl:table-cell"
                onClick={() => handleSort('assignedTo')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('owner')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th className="w-16 px-3 py-2.5 text-right">{t('actions')}</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#191d28]">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400 text-xs">
                  No opportunities match your filter criteria.
                </td>
              </tr>
            ) : (
              sorted.map((opp) => {
                const stageConf = STAGES.find((s) => s.id === opp.stage);
                const isSelected = selectedIds.includes(opp.id);

                return (
                  <tr
                    key={opp.id}
                    id={`table-row-${opp.id}`}
                    onClick={() => setSelectedRecord({ type: 'opportunity', id: opp.id })}
                    className={`hover:bg-[#141822] cursor-pointer transition-colors group ${
                      isSelected ? 'bg-blue-950/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-2.5">
                      <button
                        onClick={(e) => toggleSelectRow(opp.id, e)}
                        className="text-slate-400 hover:text-slate-200 p-0.5"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* Deal Name */}
                    <td className="px-3 py-2.5 font-medium text-slate-100 group-hover:text-blue-400 transition-colors">
                      <div className="font-semibold text-xs text-white truncate max-w-xs">{opp.name}</div>
                      {opp.tags.length > 0 && (
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {opp.tags.join(', ')}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-3 py-2.5 font-mono font-bold text-slate-100 whitespace-nowrap">
                      ${opp.amount.toLocaleString()}
                    </td>

                    {/* Stage Dropdown */}
                    <td className="px-3 py-2.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={opp.stage}
                        onChange={(e) => moveOpportunityStage(opp.id, e.target.value as StageId)}
                        className="bg-[#1a1f2b] text-slate-200 text-xs px-2 py-1 rounded-md border border-[#2b3345] hover:border-blue-500/50 cursor-pointer focus:outline-none"
                        style={{ borderLeftColor: stageConf?.color, borderLeftWidth: '3px' }}
                      >
                        {STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.probability}%)
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Company */}
                    <td className="px-3 py-2.5 text-slate-300 hidden sm:table-cell truncate max-w-[140px]">
                      {opp.companyName ? (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{opp.companyName}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Priority */}
                    <td className="px-3 py-2.5 hidden md:table-cell">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getPriorityBadge(opp.priority)}`}>
                        {opp.priority}
                      </span>
                    </td>

                    {/* Close Date */}
                    <td className="px-3 py-2.5 font-mono text-[11px] text-slate-400 hidden lg:table-cell whitespace-nowrap">
                      {opp.closeDate}
                    </td>

                    {/* Owner */}
                    <td className="px-3 py-2.5 text-slate-300 hidden xl:table-cell whitespace-nowrap">
                      <span className="text-[11px] text-slate-400">{opp.assignedTo}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          id={`table-ai-btn-${opp.id}`}
                          onClick={() =>
                            openAICopilot({
                              type: 'deal',
                              id: opp.id,
                              name: opp.name,
                              initialPrompt: language === 'es'
                                ? `Proporciona un informe ejecutivo y pronóstico de probabilidad para "${opp.name}".`
                                : language === 'pt'
                                ? `Forneça um relatório executivo e previsão de probabilidade para "${opp.name}".`
                                : `Provide an executive brief and probability forecast for "${opp.name}".`,
                            })
                          }
                          className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                          title="AI Deal Brief"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`table-delete-btn-${opp.id}`}
                          onClick={() => {
                            if (confirm(`Delete "${opp.name}"?`)) {
                              deleteOpportunity(opp.id);
                            }
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
