import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Table as TableIcon,
  Search,
  Filter,
  Columns,
  Download,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronDown,
  ArrowUpDown,
  Building2,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageSquare,
  Phone,
  Layers,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  MoreVertical,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Deal } from '../CrmKanbanTab';

export interface TwentySpreadsheetViewProps {
  deals: Deal[];
  onUpdateDeal: (updatedDeal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
  onBulkUpdateStage: (dealIds: string[], stageId: Deal['stageId']) => void;
  onBulkDelete: (dealIds: string[]) => void;
  onOpenDealDetail: (deal: Deal) => void;
  onOpenNewDealModal: () => void;
  onOpenBulkWAModal?: () => void;
  currency: 'USD' | 'ARS';
  onToggleCurrency: (c: 'USD' | 'ARS') => void;
  customFields?: Array<{ id: string; label: string; type: 'text' | 'number' }>;
  dealCustomValues?: Record<string, Record<string, string>>;
  onUpdateCustomValue?: (dealId: string, fieldId: string, value: string) => void;
}

type Density = 'compact' | 'comfortable' | 'spacious';
type SortField = 'companyName' | 'contactName' | 'dealValueUsd' | 'stageId' | 'meddicScore' | 'country' | 'probability' | 'expectedCloseDate' | 'owner';

const STAGE_CONFIGS: Record<Deal['stageId'], { name: string; short: string; color: string; bg: string; border: string; dot: string; prob: number }> = {
  lead: {
    name: '1. Lead Identificado',
    short: 'Lead',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    prob: 20
  },
  contacted: {
    name: '2. Contacto / Calificación',
    short: 'Calificación',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    prob: 50
  },
  proposal: {
    name: '3. Propuesta Enviada',
    short: 'Propuesta',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
    prob: 75
  },
  closing: {
    name: '4. Negociación / Cierre',
    short: 'Negociación',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    prob: 90
  },
  won: {
    name: '5. Ganada / Cliente Activo',
    short: 'Ganada',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    prob: 100
  }
};

const COUNTRY_FLAGS: Record<string, string> = {
  'Argentina': '🇦🇷',
  'Chile': '🇨🇱',
  'México': '🇲🇽',
  'Colombia': '🇨🇴'
};

const AVAILABLE_OWNERS = ['Gonzalo Fernández', 'Lucía Gómez', 'Agente IA Ventas'];

export const TwentySpreadsheetView: React.FC<TwentySpreadsheetViewProps> = ({
  deals,
  onUpdateDeal,
  onDeleteDeal,
  onBulkUpdateStage,
  onBulkDelete,
  onOpenDealDetail,
  onOpenNewDealModal,
  onOpenBulkWAModal,
  currency,
  onToggleCurrency,
  customFields = [],
  dealCustomValues = {},
  onUpdateCustomValue
}) => {
  // Density & View Preferences
  const [density, setDensity] = useState<Density>('comfortable');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [minMeddic, setMinMeddic] = useState<number>(0);

  // Sorting
  const [sortField, setSortField] = useState<SortField>('dealValueUsd');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Multi-Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Column Visibility Popover
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    companyName: true,
    contactName: true,
    amount: true,
    stage: true,
    meddic: true,
    country: true,
    probability: true,
    expectedCloseDate: true,
    owner: true,
    customFields: true
  });

  // Inline Cell Editing State
  const [editingCell, setEditingCell] = useState<{ dealId: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const editInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  // Focus input when editingCell activates
  useEffect(() => {
    if (editingCell && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingCell]);

  // Handle direct click on cell to start inline editing
  const startEditing = (dealId: string, field: string, initialVal: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingCell({ dealId, field });
    setEditValue(initialVal);
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const saveCellEdit = (deal: Deal) => {
    if (!editingCell) return;
    const { field } = editingCell;

    if (field.startsWith('cf-') && onUpdateCustomValue) {
      onUpdateCustomValue(deal.id, field, String(editValue));
      cancelEditing();
      return;
    }

    const updated: Deal = { ...deal };

    if (field === 'companyName') {
      updated.companyName = String(editValue).trim() || deal.companyName;
    } else if (field === 'contactName') {
      updated.contactName = String(editValue).trim() || deal.contactName;
    } else if (field === 'amount') {
      const num = Math.max(0, Number(editValue) || 0);
      if (currency === 'USD') {
        updated.dealValueUsd = num;
        updated.dealValueArs = num * 1300;
      } else {
        updated.dealValueArs = num;
        updated.dealValueUsd = Math.round(num / 1300);
      }
    } else if (field === 'stageId') {
      const targetStage = editValue as Deal['stageId'];
      updated.stageId = targetStage;
      updated.probability = STAGE_CONFIGS[targetStage]?.prob || deal.probability;
    } else if (field === 'meddicScore') {
      updated.meddicScore = Math.min(100, Math.max(0, Number(editValue) || 0));
    } else if (field === 'country') {
      updated.country = editValue as any;
    } else if (field === 'probability') {
      updated.probability = Math.min(100, Math.max(0, Number(editValue) || 0));
    } else if (field === 'expectedCloseDate') {
      updated.expectedCloseDate = String(editValue);
    } else if (field === 'owner') {
      updated.owner = String(editValue);
    }

    onUpdateDeal(updated);
    cancelEditing();
  };

  // Keyboard navigation & handling during cell editing
  const handleKeyDown = (e: React.KeyboardEvent, deal: Deal) => {
    if (e.key === 'Enter') {
      saveCellEdit(deal);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  // Filtered & Sorted Deals
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCompany = deal.companyName.toLowerCase().includes(q);
        const matchContact = deal.contactName.toLowerCase().includes(q);
        const matchOwner = deal.owner.toLowerCase().includes(q);
        if (!matchCompany && !matchContact && !matchOwner) return false;
      }

      if (stageFilter !== 'all' && deal.stageId !== stageFilter) return false;
      if (ownerFilter !== 'all' && deal.owner !== ownerFilter) return false;
      if (countryFilter !== 'all' && deal.country !== countryFilter) return false;
      if (minMeddic > 0 && deal.meddicScore < minMeddic) return false;

      return true;
    });
  }, [deals, searchQuery, stageFilter, ownerFilter, countryFilter, minMeddic]);

  const sortedDeals = useMemo(() => {
    return [...filteredDeals].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'dealValueUsd') {
        aVal = currency === 'USD' ? a.dealValueUsd : a.dealValueArs;
        bVal = currency === 'USD' ? b.dealValueUsd : b.dealValueArs;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filteredDeals, sortField, sortDirection, currency]);

  // Aggregate Calculations for Twenty Summary Footer
  const summary = useMemo(() => {
    const count = sortedDeals.length;
    const totalAmount = sortedDeals.reduce(
      (acc, d) => acc + (currency === 'USD' ? d.dealValueUsd : d.dealValueArs),
      0
    );
    const avgAmount = count > 0 ? Math.round(totalAmount / count) : 0;
    const weightedForecast = sortedDeals.reduce((acc, d) => {
      const val = currency === 'USD' ? d.dealValueUsd : d.dealValueArs;
      return acc + val * (d.probability / 100);
    }, 0);
    const avgMeddic =
      count > 0 ? Math.round(sortedDeals.reduce((acc, d) => acc + d.meddicScore, 0) / count) : 0;

    return { count, totalAmount, avgAmount, weightedForecast, avgMeddic };
  }, [sortedDeals, currency]);

  // Selection helpers
  const isAllSelected = sortedDeals.length > 0 && selectedIds.length === sortedDeals.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedDeals.map(d => d.id));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Empresa', 'Contacto', 'Monto USD', 'Monto ARS', 'Etapa', 'MEDDIC', 'País', 'Probabilidad %', 'Fecha Cierre', 'Propietario'];
    const rows = sortedDeals.map(d => [
      d.id,
      `"${d.companyName}"`,
      `"${d.contactName}"`,
      d.dealValueUsd,
      d.dealValueArs,
      STAGE_CONFIGS[d.stageId]?.name || d.stageId,
      d.meddicScore,
      d.country,
      d.probability,
      d.expectedCloseDate,
      `"${d.owner}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `twenty_crm_deals_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Row height CSS based on density
  const getRowPadding = () => {
    switch (density) {
      case 'compact':
        return 'py-1.5 px-3 text-[12px]';
      case 'spacious':
        return 'py-3.5 px-4 text-[13.5px]';
      case 'comfortable':
      default:
        return 'py-2.5 px-3.5 text-[13px]';
    }
  };

  return (
    <div id="twenty-spreadsheet-container" className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden relative select-none">
      {/* Top Action Bar (Twenty CRM Signature Header) */}
      <div className="p-3 border-b border-gray-200 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Quick Search and View Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          {/* Quick Search */}
          <div className="relative min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar por empresa o contacto..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Stage Filter Pill */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 border border-gray-300 rounded-lg text-xs shadow-2xs">
            <span className="text-gray-400 text-[11px] font-medium">Etapa:</span>
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="bg-transparent text-gray-700 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="all">Todas</option>
              <option value="lead">1. Lead</option>
              <option value="contacted">2. Contacto</option>
              <option value="proposal">3. Propuesta</option>
              <option value="closing">4. Negociación</option>
              <option value="won">5. Ganada</option>
            </select>
          </div>

          {/* Owner Filter Pill */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 border border-gray-300 rounded-lg text-xs shadow-2xs">
            <span className="text-gray-400 text-[11px] font-medium">Asesor:</span>
            <select
              value={ownerFilter}
              onChange={e => setOwnerFilter(e.target.value)}
              className="bg-transparent text-gray-700 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="all">Todos</option>
              {AVAILABLE_OWNERS.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter Pill */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 border border-gray-300 rounded-lg text-xs shadow-2xs">
            <span className="text-gray-400 text-[11px] font-medium">País:</span>
            <select
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
              className="bg-transparent text-gray-700 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="all">Todos</option>
              <option value="Argentina">🇦🇷 Argentina</option>
              <option value="Chile">🇨🇱 Chile</option>
              <option value="México">🇲🇽 México</option>
              <option value="Colombia">🇨🇴 Colombia</option>
            </select>
          </div>

          {/* MEDDIC Filter */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 border border-gray-300 rounded-lg text-xs shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            <select
              value={minMeddic}
              onChange={e => setMinMeddic(Number(e.target.value))}
              className="bg-transparent text-gray-700 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="0">MEDDIC Todos</option>
              <option value="50">MEDDIC &ge; 50</option>
              <option value="75">MEDDIC &ge; 75</option>
              <option value="90">MEDDIC &ge; 90</option>
            </select>
          </div>
        </div>

        {/* Right: Currency, Density & Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="bg-white p-0.5 rounded-lg border border-gray-300 flex items-center text-xs font-semibold shadow-2xs">
            <button
              onClick={() => onToggleCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-gray-900 text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => onToggleCurrency('ARS')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                currency === 'ARS'
                  ? 'bg-gray-900 text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ARS ($)
            </button>
          </div>

          {/* Density Control */}
          <div className="bg-white p-0.5 rounded-lg border border-gray-300 flex items-center text-xs font-medium shadow-2xs" title="Densidad de filas">
            {(['compact', 'comfortable', 'spacious'] as Density[]).map(d => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-2 py-1 rounded-md capitalize transition-all cursor-pointer ${
                  density === d
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {d === 'compact' ? 'Compacta' : d === 'comfortable' ? 'Media' : 'Amplia'}
              </button>
            ))}
          </div>

          {/* Column Customizer Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="p-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-gray-600 transition-colors shadow-2xs flex items-center gap-1 text-xs cursor-pointer"
              title="Personalizar columnas visibles"
            >
              <Columns className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Columnas</span>
            </button>

            {showColumnPicker && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-30 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">Columnas Visibles</span>
                  <button
                    onClick={() => setShowColumnPicker(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {Object.entries({
                    companyName: 'Empresa',
                    contactName: 'Contacto Principal',
                    amount: 'Monto Estimado',
                    stage: 'Etapa del Trato',
                    meddic: 'Score MEDDIC',
                    country: 'País / Región',
                    probability: 'Probabilidad %',
                    expectedCloseDate: 'Fecha Prevista',
                    owner: 'Propietario',
                    customFields: 'Campos Personalizados'
                  }).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-gray-700"
                    >
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        checked={visibleColumns[key]}
                        onChange={e =>
                          setVisibleColumns(prev => ({ ...prev, [key]: e.target.checked }))
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export to CSV */}
          <button
            onClick={exportToCSV}
            className="p-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-gray-600 transition-colors shadow-2xs flex items-center gap-1 text-xs cursor-pointer"
            title="Exportar a CSV estilo Twenty"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          {/* New Deal Button */}
          <button
            onClick={onOpenNewDealModal}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Registro</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Spreadsheet Grid Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[620px] scrollbar-thin">
        <table className="w-full text-left border-collapse">
          {/* Table Header (Twenty Sticky Style) */}
          <thead className="bg-gray-100/90 text-gray-600 sticky top-0 z-10 border-b border-gray-200 backdrop-blur-xs">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              {/* Checkbox Column */}
              <th className="w-10 px-3 py-2.5 border-r border-gray-200/80 text-center">
                <button
                  onClick={toggleSelectAll}
                  className="text-gray-400 hover:text-gray-700 p-0.5 transition-colors cursor-pointer"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              {/* Company Column */}
              {visibleColumns.companyName && (
                <th
                  onClick={() => handleSort('companyName')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span>Empresa</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Amount Column */}
              {visibleColumns.amount && (
                <th
                  onClick={() => handleSort('dealValueUsd')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-gray-400" />
                      <span>Monto ({currency})</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Stage Column */}
              {visibleColumns.stage && (
                <th
                  onClick={() => handleSort('stageId')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-gray-400" />
                      <span>Etapa</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Contact Column */}
              {visibleColumns.contactName && (
                <th
                  onClick={() => handleSort('contactName')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3 text-gray-400" />
                      <span>Contacto</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* MEDDIC Column */}
              {visibleColumns.meddic && (
                <th
                  onClick={() => handleSort('meddicScore')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-indigo-500" />
                      <span>MEDDIC</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Country Column */}
              {visibleColumns.country && (
                <th
                  onClick={() => handleSort('country')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span>País</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Probability Column */}
              {visibleColumns.probability && (
                <th
                  onClick={() => handleSort('probability')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Prob.</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Close Date Column */}
              {visibleColumns.expectedCloseDate && (
                <th
                  onClick={() => handleSort('expectedCloseDate')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>Cierre</span>
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Owner Column */}
              {visibleColumns.owner && (
                <th
                  onClick={() => handleSort('owner')}
                  className="px-3.5 py-2.5 border-r border-gray-200/80 cursor-pointer hover:bg-gray-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span>Asesor</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              )}

              {/* Dynamic Custom Fields */}
              {visibleColumns.customFields &&
                customFields.map(cf => (
                  <th
                    key={cf.id}
                    className="px-3.5 py-2.5 border-r border-gray-200/80 text-gray-500"
                  >
                    <span>{cf.label}</span>
                  </th>
                ))}

              {/* Actions Header */}
              <th className="w-20 px-3 py-2.5 text-right font-medium">Acción</th>
            </tr>
          </thead>

          {/* Table Body (Inline Editable Rows) */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedDeals.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="py-12 text-center text-gray-400 text-xs italic bg-gray-50/50"
                >
                  No hay oportunidades que coincidan con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              sortedDeals.map((deal, idx) => {
                const isSelected = selectedIds.includes(deal.id);
                const stageConf = STAGE_CONFIGS[deal.stageId] || STAGE_CONFIGS.lead;
                const rowPadding = getRowPadding();
                const currentVal = currency === 'USD' ? deal.dealValueUsd : deal.dealValueArs;

                return (
                  <tr
                    key={deal.id}
                    id={`twenty-row-${deal.id}`}
                    className={`group transition-colors hover:bg-indigo-50/30 ${
                      isSelected ? 'bg-indigo-50/60' : idx % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox Cell */}
                    <td className="px-3 py-2 border-r border-gray-100 text-center">
                      <button
                        onClick={e => toggleSelectRow(deal.id, e)}
                        className="text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                        )}
                      </button>
                    </td>

                    {/* Company Name (Editable / Click to Peek) */}
                    {visibleColumns.companyName && (
                      <td
                        className={`border-r border-gray-100 font-medium text-gray-900 cursor-pointer ${rowPadding}`}
                        onClick={() => onOpenDealDetail(deal)}
                      >
                        {editingCell?.dealId === deal.id && editingCell?.field === 'companyName' ? (
                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            <input
                              ref={editInputRef as any}
                              type="text"
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => handleKeyDown(e, deal)}
                              onBlur={() => saveCellEdit(deal)}
                              className="w-full px-2 py-1 bg-white border-2 border-indigo-500 rounded text-xs text-gray-900 font-semibold shadow-xs"
                            />
                            <button
                              onClick={() => saveCellEdit(deal)}
                              className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 group/cell">
                            <div className="flex items-center gap-2 truncate">
                              <div className="w-6 h-6 rounded bg-gray-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                {deal.companyName.charAt(0)}
                              </div>
                              <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                                {deal.companyName}
                              </span>
                            </div>
                            <button
                              onClick={e => startEditing(deal.id, 'companyName', deal.companyName, e)}
                              className="opacity-0 group-hover/cell:opacity-100 p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100 transition-opacity"
                              title="Editar nombre"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Amount Cell (Editable inline) */}
                    {visibleColumns.amount && (
                      <td
                        className={`border-r border-gray-100 font-mono font-bold text-gray-900 text-right cursor-pointer ${rowPadding}`}
                        onDoubleClick={e => startEditing(deal.id, 'amount', currentVal, e)}
                      >
                        {editingCell?.dealId === deal.id && editingCell?.field === 'amount' ? (
                          <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                            <span className="text-gray-400 text-xs font-mono">$</span>
                            <input
                              ref={editInputRef as any}
                              type="number"
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => handleKeyDown(e, deal)}
                              onBlur={() => saveCellEdit(deal)}
                              className="w-28 px-2 py-0.5 bg-white border-2 border-indigo-500 rounded text-xs text-right font-mono font-bold"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'amount', currentVal, e)}
                            className="hover:text-indigo-600 transition-colors flex items-center justify-end gap-1 cursor-pointer"
                            title="Haz clic para editar monto"
                          >
                            <span>${currentVal.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{currency}</span>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Stage Dropdown Pill (Twenty Style) */}
                    {visibleColumns.stage && (
                      <td className={`border-r border-gray-100 whitespace-nowrap ${rowPadding}`}>
                        {editingCell?.dealId === deal.id && editingCell?.field === 'stageId' ? (
                          <select
                            ref={editInputRef as any}
                            value={editValue}
                            onChange={e => {
                              setEditValue(e.target.value);
                              const updated: Deal = {
                                ...deal,
                                stageId: e.target.value as any,
                                probability: STAGE_CONFIGS[e.target.value as Deal['stageId']]?.prob || deal.probability
                              };
                              onUpdateDeal(updated);
                              cancelEditing();
                            }}
                            onBlur={cancelEditing}
                            className="bg-white border-2 border-indigo-500 text-gray-900 text-xs font-semibold rounded-md px-2 py-1 shadow-xs focus:outline-hidden"
                          >
                            {Object.entries(STAGE_CONFIGS).map(([stId, stVal]) => (
                              <option key={stId} value={stId}>
                                {stVal.name} ({stVal.prob}%)
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'stageId', deal.stageId, e)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${stageConf.bg} ${stageConf.color} ${stageConf.border} text-xs font-semibold cursor-pointer hover:shadow-xs transition-all`}
                            title="Cambiar etapa"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stageConf.dot}`} />
                            <span>{stageConf.short}</span>
                            <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                          </div>
                        )}
                      </td>
                    )}

                    {/* Contact Name (Editable) */}
                    {visibleColumns.contactName && (
                      <td
                        className={`border-r border-gray-100 text-gray-700 cursor-pointer ${rowPadding}`}
                        onDoubleClick={e => startEditing(deal.id, 'contactName', deal.contactName, e)}
                      >
                        {editingCell?.dealId === deal.id && editingCell?.field === 'contactName' ? (
                          <input
                            ref={editInputRef as any}
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => handleKeyDown(e, deal)}
                            onBlur={() => saveCellEdit(deal)}
                            className="w-full px-2 py-1 bg-white border-2 border-indigo-500 rounded text-xs text-gray-900 font-medium"
                          />
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'contactName', deal.contactName, e)}
                            className="flex items-center gap-1.5 truncate text-gray-700 hover:text-gray-900"
                            title="Doble clic para editar contacto"
                          >
                            <User className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate">{deal.contactName}</span>
                          </div>
                        )}
                      </td>
                    )}

                    {/* MEDDIC Score */}
                    {visibleColumns.meddic && (
                      <td className={`border-r border-gray-100 text-center ${rowPadding}`}>
                        {editingCell?.dealId === deal.id && editingCell?.field === 'meddicScore' ? (
                          <input
                            ref={editInputRef as any}
                            type="number"
                            min="0"
                            max="100"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => handleKeyDown(e, deal)}
                            onBlur={() => saveCellEdit(deal)}
                            className="w-16 px-1 py-0.5 text-center bg-white border-2 border-indigo-500 rounded text-xs font-mono font-bold"
                          />
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'meddicScore', deal.meddicScore, e)}
                            className="inline-flex items-center gap-1 cursor-pointer font-mono font-bold text-xs"
                            title="Editar score MEDDIC"
                          >
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] border ${
                                deal.meddicScore >= 80
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : deal.meddicScore >= 50
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              {deal.meddicScore}
                            </span>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Country Cell */}
                    {visibleColumns.country && (
                      <td className={`border-r border-gray-100 whitespace-nowrap ${rowPadding}`}>
                        {editingCell?.dealId === deal.id && editingCell?.field === 'country' ? (
                          <select
                            ref={editInputRef as any}
                            value={editValue}
                            onChange={e => {
                              setEditValue(e.target.value);
                              onUpdateDeal({ ...deal, country: e.target.value as any });
                              cancelEditing();
                            }}
                            onBlur={cancelEditing}
                            className="bg-white border-2 border-indigo-500 text-gray-900 text-xs rounded px-1.5 py-0.5"
                          >
                            {Object.keys(COUNTRY_FLAGS).map(c => (
                              <option key={c} value={c}>
                                {COUNTRY_FLAGS[c]} {c}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'country', deal.country, e)}
                            className="flex items-center gap-1.5 cursor-pointer text-gray-800 hover:text-indigo-600"
                            title="Cambiar país"
                          >
                            <span>{COUNTRY_FLAGS[deal.country] || '🌐'}</span>
                            <span className="text-xs">{deal.country}</span>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Probability % */}
                    {visibleColumns.probability && (
                      <td className={`border-r border-gray-100 text-center font-mono ${rowPadding}`}>
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                          {deal.probability}%
                        </span>
                      </td>
                    )}

                    {/* Expected Close Date */}
                    {visibleColumns.expectedCloseDate && (
                      <td className={`border-r border-gray-100 text-gray-600 whitespace-nowrap font-mono text-xs ${rowPadding}`}>
                        {editingCell?.dealId === deal.id && editingCell?.field === 'expectedCloseDate' ? (
                          <input
                            ref={editInputRef as any}
                            type="date"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => handleKeyDown(e, deal)}
                            onBlur={() => saveCellEdit(deal)}
                            className="px-1 py-0.5 bg-white border-2 border-indigo-500 rounded text-xs"
                          />
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'expectedCloseDate', deal.expectedCloseDate, e)}
                            className="cursor-pointer hover:text-indigo-600"
                            title="Editar fecha de cierre"
                          >
                            {deal.expectedCloseDate || '—'}
                          </div>
                        )}
                      </td>
                    )}

                    {/* Owner Cell */}
                    {visibleColumns.owner && (
                      <td className={`border-r border-gray-100 whitespace-nowrap ${rowPadding}`}>
                        {editingCell?.dealId === deal.id && editingCell?.field === 'owner' ? (
                          <select
                            ref={editInputRef as any}
                            value={editValue}
                            onChange={e => {
                              setEditValue(e.target.value);
                              onUpdateDeal({ ...deal, owner: e.target.value });
                              cancelEditing();
                            }}
                            onBlur={cancelEditing}
                            className="bg-white border-2 border-indigo-500 text-gray-900 text-xs rounded px-1.5 py-0.5"
                          >
                            {AVAILABLE_OWNERS.map(o => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div
                            onClick={e => startEditing(deal.id, 'owner', deal.owner, e)}
                            className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-indigo-600"
                            title="Reasignar asesor"
                          >
                            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[9px] flex items-center justify-center border border-indigo-200">
                              {deal.owner.charAt(0)}
                            </div>
                            <span className="text-xs truncate max-w-[110px]">{deal.owner}</span>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Custom Fields */}
                    {visibleColumns.customFields &&
                      customFields.map(cf => {
                        const val = dealCustomValues[deal.id]?.[cf.id] || '—';
                        return (
                          <td
                            key={cf.id}
                            className={`border-r border-gray-100 text-gray-600 text-xs ${rowPadding}`}
                            onDoubleClick={e => startEditing(deal.id, cf.id, val === '—' ? '' : val, e)}
                          >
                            {editingCell?.dealId === deal.id && editingCell?.field === cf.id ? (
                              <input
                                ref={editInputRef as any}
                                type={cf.type}
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyDown={e => handleKeyDown(e, deal)}
                                onBlur={() => saveCellEdit(deal)}
                                className="w-full px-1.5 py-0.5 bg-white border-2 border-indigo-500 rounded text-xs"
                              />
                            ) : (
                              <div
                                onClick={e => startEditing(deal.id, cf.id, val === '—' ? '' : val, e)}
                                className="cursor-pointer hover:text-indigo-600 truncate max-w-[120px]"
                                title="Editar campo personalizado"
                              >
                                {val}
                              </div>
                            )}
                          </td>
                        );
                      })}

                    {/* Actions Cell */}
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenDealDetail(deal)}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Abrir panel lateral de detalle"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar la oportunidad "${deal.companyName}"?`)) {
                              onDeleteDeal(deal.id);
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Eliminar oportunidad"
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

      {/* Dynamic Summary Footer (Twenty Calculation Bar) */}
      <div className="bg-gray-900 text-white px-4 py-2.5 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-sans uppercase text-[10px] tracking-wider">Recuentos:</span>
            <span className="font-bold text-white bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
              {summary.count} oportunidades
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-gray-400 font-sans uppercase text-[10px] tracking-wider">Promedio:</span>
            <span className="text-indigo-300 font-bold">
              ${summary.avgAmount.toLocaleString()} {currency}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-gray-400 font-sans uppercase text-[10px] tracking-wider">Ponderado:</span>
            <span className="text-emerald-400 font-bold">
              ${Math.round(summary.weightedForecast).toLocaleString()} {currency}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-gray-400 font-sans uppercase text-[10px] tracking-wider">Score MEDDIC:</span>
            <span className="text-purple-300 font-bold">{summary.avgMeddic} / 100</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-sans uppercase text-[10px] tracking-wider">Suma Total Pipeline:</span>
          <span className="text-sm font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-md">
            ${summary.totalAmount.toLocaleString()} {currency}
          </span>
        </div>
      </div>

      {/* Floating Bulk Actions Dock (Twenty Style) */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 bg-gray-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-3 text-xs"
          >
            <div className="flex items-center gap-2 pr-3 border-r border-gray-700">
              <span className="bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full text-[11px]">
                {selectedIds.length}
              </span>
              <span className="font-medium text-gray-200">seleccionados</span>
            </div>

            {/* Change Stage */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-[11px]">Cambiar Etapa:</span>
              <select
                onChange={e => {
                  if (e.target.value) {
                    onBulkUpdateStage(selectedIds, e.target.value as any);
                    setSelectedIds([]);
                  }
                }}
                defaultValue=""
                className="bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded border border-gray-700 focus:outline-hidden"
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                {Object.entries(STAGE_CONFIGS).map(([stId, stVal]) => (
                  <option key={stId} value={stId}>
                    {stVal.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk WhatsApp */}
            {onOpenBulkWAModal && (
              <button
                onClick={onOpenBulkWAModal}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            )}

            {/* Bulk Delete */}
            <button
              onClick={() => {
                if (confirm(`¿Eliminar ${selectedIds.length} oportunidades seleccionadas?`)) {
                  onBulkDelete(selectedIds);
                  setSelectedIds([]);
                }
              }}
              className="px-2.5 py-1 bg-rose-600/90 hover:bg-rose-700 text-white font-medium rounded transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar</span>
            </button>

            {/* Deselect All */}
            <button
              onClick={() => setSelectedIds([])}
              className="p-1 text-gray-400 hover:text-white rounded ml-1"
              title="Deseleccionar"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
