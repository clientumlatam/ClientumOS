import React, { useEffect, useState, useRef } from 'react';
import { 
  UserPlus, Phone, Mail, Building2, Clock, RefreshCw, MessageSquare, 
  ChevronDown, ChevronUp, Zap, CheckSquare, Square, Search, Edit2, 
  Check, X, FileText, Copy, ArrowRight, ExternalLink, Sparkles, Plus, AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';

interface ChatbotLead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  notes?: string;
  conversation?: string;
  status: 'nuevo' | 'contactado' | 'calificado' | 'descartado';
  created_at: string;
}

const statusColors: Record<string, string> = {
  nuevo:      'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  contactado: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  calificado: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  descartado: 'bg-slate-800 text-slate-400 border border-slate-700/50',
};

const STATUSES: ChatbotLead['status'][] = ['nuevo', 'contactado', 'calificado', 'descartado'];

export default function CrmFullLeads() {
  const [leads, setLeads] = useState<ChatbotLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Inline edit state
  const [editingCell, setEditingCell] = useState<{ id: string; field: 'name' | 'email' | 'phone' | 'company' } | null>(null);
  const [editingValue, setEditingValue] = useState('');

  // Bulk enrich state
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<string | null>(null);

  // Side-Sheet Panel details state
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [activeLeadNotes, setActiveLeadNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeLead = leads.find(l => l.id === activeLeadId);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chatbot-leads');
      if (!res.ok) throw new Error('No se pudieron cargar los leads.');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadLeads(); 
  }, []);

  // Sync internal sheet notes whenever active lead changes
  useEffect(() => {
    if (activeLead) {
      setActiveLeadNotes(activeLead.notes || '');
    }
  }, [activeLeadId]);

  // Handle single property update
  const handleUpdateField = async (id: string, field: string, value: string) => {
    // Optimistic local update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
    try {
      const res = await fetch(`/api/chatbot-leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Revert if error
      loadLeads();
    }
  };

  const handleStatusChange = async (id: string, status: ChatbotLead['status']) => {
    await handleUpdateField(id, 'status', status);
  };

  const saveNotesToBackend = async () => {
    if (!activeLeadId) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/chatbot-leads/${activeLeadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: activeLeadNotes }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, notes: activeLeadNotes } : l));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNotes(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const noEmail = filtered.filter(l => !l.email).map(l => l.id);
    if (selected.size === noEmail.length && noEmail.every(id => selected.has(id))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(noEmail));
    }
  };

  const handleBulkEnrich = async () => {
    if (selected.size === 0) return;
    setEnriching(true);
    setEnrichResult(null);
    try {
      const res = await fetch('/api/leads/bulk-enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enriquecer');
      setEnrichResult(`✅ ${data.enriched} email${data.enriched !== 1 ? 's' : ''} encontrado${data.enriched !== 1 ? 's' : ''} de ${data.total} leads procesados.`);
      setSelected(new Set());
      await loadLeads();
    } catch (err: any) {
      setEnrichResult(`❌ ${err.message}`);
    } finally {
      setEnriching(false);
    }
  };

  const startEditing = (id: string, field: 'name' | 'email' | 'phone' | 'company', currentVal: string) => {
    setEditingCell({ id, field });
    setEditingValue(currentVal);
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string, field: string) => {
    if (e.key === 'Enter') {
      handleUpdateField(id, field, editingValue);
      setEditingCell(null);
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter & search leads
  const filtered = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const s = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      l.name.toLowerCase().includes(s) ||
      (l.company?.toLowerCase() || '').includes(s) ||
      (l.email?.toLowerCase() || '').includes(s) ||
      (l.phone?.toLowerCase() || '').includes(s);
    return matchesStatus && matchesSearch;
  });

  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});

  const canEnrich = filtered.filter(l => !l.email);

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Twenty HQ Style
            </span>
            <span className="text-[10px] font-medium text-slate-500">• Alta Densidad</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UserPlus className="w-5.5 h-5.5 text-emerald-400" />
            <span>Consola de Leads & Prospectos</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualización y edición fluida en celda de leads capturados en tiempo real. {leads.length} prospectos en total.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadLeads}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-[#0D1527] hover:bg-[#15203A] border border-slate-800 rounded-lg px-3 py-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, empresa, email, teléfono..."
            className="w-full pl-9 pr-4 py-2 bg-[#050B14] border border-[#1E293B] hover:border-slate-700/80 focus:border-emerald-500 focus:outline-none rounded-xl text-xs text-slate-200 placeholder-slate-500 transition-all font-medium"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#050B14] p-1 border border-[#1E293B] rounded-xl self-start md:self-auto shadow-inner">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'all' 
                ? 'bg-[#1E293B] text-white shadow-sm border border-slate-700/50' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({leads.length})
          </button>
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === status 
                  ? 'bg-[#1E293B] text-white shadow-sm border border-slate-700/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  status === 'nuevo' ? 'bg-sky-400' :
                  status === 'contactado' ? 'bg-amber-400' :
                  status === 'calificado' ? 'bg-emerald-400' : 'bg-slate-500'
                }`}></span>
                <span>{status}</span>
                <span className="text-[10px] text-slate-500">({counts[status] || 0})</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bulk enrich toolbar */}
      {canEnrich.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#0A101F] border border-[#1E293B] rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAll}
              className="flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 font-bold cursor-pointer"
            >
              {selected.size > 0 && selected.size === canEnrich.length
                ? <CheckSquare className="w-4 h-4" />
                : <Square className="w-4 h-4" />}
              <span>{selected.size > 0 ? `${selected.size} leads seleccionados` : `Seleccionar sin email (${canEnrich.length})`}</span>
            </button>
            <span className="text-[11px] text-slate-500 hidden sm:inline">| Enriquecer base usando Hunter.io y IA</span>
          </div>
          {selected.size > 0 && (
            <button
              onClick={handleBulkEnrich}
              disabled={enriching}
              className="flex items-center gap-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800 text-slate-950 disabled:text-sky-200 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
            >
              {enriching
                ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                : <Sparkles className="w-3.5 h-3.5" />}
              <span>{enriching ? 'Buscando emails corporativos...' : `Enriquecer con Hunter.io (${selected.size})`}</span>
            </button>
          )}
        </div>
      )}

      {enrichResult && (
        <div className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
          enrichResult.startsWith('✅') 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{enrichResult}</span>
        </div>
      )}

      {/* Leads Table Card */}
      {error && (
        <Card className="border-0 shadow-sm border-l-4 border-l-rose-500 bg-[#0A101F]">
          <CardContent className="py-4 text-xs text-rose-400 font-semibold">{error}</CardContent>
        </Card>
      )}

      {!loading && filtered.length === 0 && !error ? (
        <Card className="border border-[#1E293B] bg-[#050B14]">
          <CardContent className="py-16 text-center">
            <UserPlus className="w-10 h-10 text-slate-600 mx-auto mb-3 opacity-60" />
            <p className="text-sm font-bold text-slate-300">
              No hay leads {statusFilter !== 'all' ? `con estado "${statusFilter}"` : 'capturados aún'}
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Utiliza el Asesor Comercial IA o los formularios públicos para simular la captura de leads con metadatos y verlos reflejados aquí instantáneamente.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto border border-[#1E293B] rounded-xl bg-[#050B14] shadow-md max-w-full">
          <table className="w-full text-left border-collapse text-xs select-none">
            <thead>
              <tr className="bg-[#0A101F] text-slate-400 font-bold border-b border-[#1E293B] sticky top-0 z-10">
                <th className="p-3 w-10 text-center">
                  <Square className="w-3.5 h-3.5 text-slate-600 cursor-not-allowed opacity-40" />
                </th>
                <th className="p-3 font-semibold text-slate-300">Contacto</th>
                <th className="p-3 font-semibold text-slate-300">Estado</th>
                <th className="p-3 font-semibold text-slate-300">Empresa</th>
                <th className="p-3 font-semibold text-slate-300">Email</th>
                <th className="p-3 font-semibold text-slate-300">Teléfono</th>
                <th className="p-3 font-semibold text-slate-300">Creado</th>
                <th className="p-3 font-semibold text-slate-300 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/60">
              {filtered.map((lead) => {
                const isLeadSelected = selected.has(lead.id);
                const isActive = activeLeadId === lead.id;
                
                return (
                  <tr 
                    key={lead.id}
                    className={`hover:bg-[#0D1527]/50 group transition-colors border-b border-[#1E293B]/40 cursor-pointer ${
                      isActive ? 'bg-[#0D1527] border-l-2 border-l-emerald-500' : ''
                    }`}
                    onClick={() => setActiveLeadId(lead.id)}
                  >
                    {/* Checkbox */}
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      {!lead.email ? (
                        <button
                          onClick={() => toggleSelect(lead.id)}
                          className="text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                        >
                          {isLeadSelected ? (
                            <CheckSquare className="w-4 h-4 text-sky-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                      ) : (
                        <span className="block" title="Email validado">
                          <Check className="w-3.5 h-3.5 text-emerald-500/60 mx-auto" />
                        </span>
                      )}
                    </td>

                    {/* Contact Name (Inline Edit) */}
                    <td className="p-3 font-medium text-slate-200" onClick={(e) => {
                      if (editingCell?.id === lead.id && editingCell?.field === 'name') e.stopPropagation();
                    }}>
                      {editingCell?.id === lead.id && editingCell?.field === 'name' ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            handleUpdateField(lead.id, 'name', editingValue);
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, lead.id, 'name')}
                          className="bg-[#030712] border border-emerald-500 text-slate-100 px-2 py-0.5 rounded text-xs focus:outline-none w-full font-semibold"
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 group/cell">
                          <span className="font-semibold truncate max-w-[150px]">{lead.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(lead.id, 'name', lead.name);
                            }}
                            className="opacity-0 group-hover/cell:opacity-100 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer transition-opacity"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Status dropdown directly in the cell */}
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as ChatbotLead['status'])}
                          className={`text-[10px] font-bold border-0 rounded-full px-2.5 py-0.5 bg-slate-900 capitalize cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/40 text-slate-300 ${statusColors[lead.status]}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-slate-950 text-slate-300 text-xs">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Company Name (Inline Edit) */}
                    <td className="p-3 text-slate-300" onClick={(e) => {
                      if (editingCell?.id === lead.id && editingCell?.field === 'company') e.stopPropagation();
                    }}>
                      {editingCell?.id === lead.id && editingCell?.field === 'company' ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            handleUpdateField(lead.id, 'company', editingValue);
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, lead.id, 'company')}
                          className="bg-[#030712] border border-emerald-500 text-slate-100 px-2 py-0.5 rounded text-xs focus:outline-none w-full"
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 group/cell">
                          <span className="truncate max-w-[120px] block text-slate-300">
                            {lead.company || <span className="text-slate-600 italic">sin empresa</span>}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(lead.id, 'company', lead.company || '');
                            }}
                            className="opacity-0 group-hover/cell:opacity-100 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer transition-opacity"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Email (Inline Edit) */}
                    <td className="p-3 font-mono text-slate-300" onClick={(e) => {
                      if (editingCell?.id === lead.id && editingCell?.field === 'email') e.stopPropagation();
                    }}>
                      {editingCell?.id === lead.id && editingCell?.field === 'email' ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            handleUpdateField(lead.id, 'email', editingValue);
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, lead.id, 'email')}
                          className="bg-[#030712] border border-emerald-500 text-slate-100 px-2 py-0.5 rounded text-xs focus:outline-none w-full"
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 group/cell">
                          <span className="truncate max-w-[150px] block">
                            {lead.email ? (
                              <span className="text-sky-400 font-semibold">{lead.email}</span>
                            ) : (
                              <span className="text-slate-600 italic">sin email</span>
                            )}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(lead.id, 'email', lead.email || '');
                            }}
                            className="opacity-0 group-hover/cell:opacity-100 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer transition-opacity"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Phone (Inline Edit) */}
                    <td className="p-3 text-slate-300 font-mono" onClick={(e) => {
                      if (editingCell?.id === lead.id && editingCell?.field === 'phone') e.stopPropagation();
                    }}>
                      {editingCell?.id === lead.id && editingCell?.field === 'phone' ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            handleUpdateField(lead.id, 'phone', editingValue);
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, lead.id, 'phone')}
                          className="bg-[#030712] border border-emerald-500 text-slate-100 px-2 py-0.5 rounded text-xs focus:outline-none w-full"
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 group/cell">
                          <span className="truncate max-w-[110px] block">
                            {lead.phone || <span className="text-slate-600 italic">sin teléfono</span>}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(lead.id, 'phone', lead.phone || '');
                            }}
                            className="opacity-0 group-hover/cell:opacity-100 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer transition-opacity"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="p-3 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lead.created_at ? format(new Date(lead.created_at), 'd MMM HH:mm', { locale: es }) : '-'}</span>
                      </div>
                    </td>

                    {/* Side-Sheet Trigger Icon */}
                    <td className="p-3 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLeadId(lead.id);
                        }}
                        className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors inline-flex cursor-pointer"
                        title="Ver detalle en hoja lateral"
                      >
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TWENTY HQ STYLE SLIDING SIDE-SHEET DETAIL PANEL */}
      <AnimatePresence>
        {activeLeadId && activeLead && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLeadId(null)}
              className="fixed inset-0 bg-slate-950/80 z-40"
            />

            {/* Sliding Panel Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-[#050B14] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col h-full text-slate-200"
            >
              {/* Sheet Header */}
              <div className="p-4 border-b border-[#1E293B] bg-[#0A101F] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Ficha del Prospecto</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(`Lead: ${activeLead.name}\nEmpresa: ${activeLead.company || 'N/A'}\nEmail: ${activeLead.email || 'N/A'}\nTeléfono: ${activeLead.phone || 'N/A'}\nNotas: ${activeLeadNotes}`, activeLead.id)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                    title="Copiar Ficha"
                  >
                    {copiedId === activeLead.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === activeLead.id ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={() => setActiveLeadId(null)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sheet Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                
                {/* Title Segment */}
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight">{activeLead.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">ID: {activeLead.id}</p>
                </div>

                {/* Grid Attributes */}
                <div className="grid grid-cols-2 gap-4 border border-[#1E293B] rounded-xl p-4 bg-[#0A101F]/40">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Estado</span>
                    <select
                      value={activeLead.status}
                      onChange={(e) => handleStatusChange(activeLead.id, e.target.value as ChatbotLead['status'])}
                      className={`text-xs font-bold border rounded-lg px-2.5 py-1 bg-[#050B14] capitalize focus:outline-none w-full ${statusColors[activeLead.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-slate-950 text-slate-300">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Fecha Captura</span>
                    <div className="text-xs text-slate-300 font-medium py-1">
                      {activeLead.created_at ? format(new Date(activeLead.created_at), 'd MMM yyyy, HH:mm', { locale: es }) : '-'}
                    </div>
                  </div>

                  <div className="space-y-1 col-span-2 border-t border-slate-800/60 pt-3">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Empresa</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{activeLead.company || 'Sin especificar'}</span>
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-slate-800/60 pt-3">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Email Corporativo</span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono text-sky-400 break-all">{activeLead.email || 'No capturado'}</span>
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-slate-800/60 pt-3">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Teléfono / WhatsApp</span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono text-emerald-400">{activeLead.phone || 'No capturado'}</span>
                    </div>
                  </div>
                </div>

                {/* Internal CRM Notes Segment */}
                <div className="space-y-2 border-t border-[#1E293B] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Notas Internas del CRM (Santi SDR)</span>
                    </span>
                    {savingNotes ? (
                      <span className="text-[10px] text-slate-500 animate-pulse font-bold">Guardando notas...</span>
                    ) : (
                      <button
                        onClick={saveNotesToBackend}
                        className="text-[10px] font-bold text-sky-400 hover:text-sky-300 cursor-pointer"
                      >
                        Guardar Nota
                      </button>
                    )}
                  </div>
                  <textarea
                    value={activeLeadNotes}
                    onChange={(e) => setActiveLeadNotes(e.target.value)}
                    placeholder="Escribe notas sobre la conversación, presupuesto, urgencia, propuesta enviada..."
                    rows={4}
                    className="w-full p-3 bg-[#050B14] border border-[#1E293B] hover:border-slate-800 focus:border-emerald-500 text-xs text-slate-200 placeholder-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500/20 leading-relaxed font-sans"
                  />
                  <p className="text-[9px] text-slate-500 leading-normal">
                    * Estas notas se guardan de forma segura para dar seguimiento en el pipeline de ventas.
                  </p>
                </div>

                {/* Conversation Chat Logs Segment */}
                <div className="space-y-3 border-t border-[#1E293B] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Conversación original con Asesor Comercial</span>
                    </span>
                  </div>

                  {activeLead.conversation ? (
                    <div className="bg-[#050B14] border border-[#1E293B] rounded-xl p-4 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {activeLead.conversation.split('\n').filter(line => line.trim().length > 0).map((line, idx) => {
                        const isUser = line.toLowerCase().startsWith('user:') || line.toLowerCase().startsWith('cliente:') || line.toLowerCase().startsWith('leads:') || line.toLowerCase().startsWith('prospecto:');
                        const isBot = line.toLowerCase().startsWith('bot:') || line.toLowerCase().startsWith('asesor:') || line.toLowerCase().startsWith('ia:') || line.toLowerCase().startsWith('santi:');
                        
                        const text = line.replace(/^(user:|cliente:|leads:|prospecto:|bot:|asesor:|ia:|santi:)/i, '').trim();

                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col space-y-1 max-w-[85%] ${
                              isUser ? 'ml-auto items-end' : 'mr-auto items-start'
                            }`}
                          >
                            <span className="text-[9px] font-bold text-slate-500 font-mono">
                              {isUser ? 'Prospecto' : isBot ? 'Asesor Comercial IA' : 'Sistema'}
                            </span>
                            <div className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                              isUser 
                                ? 'bg-sky-500/10 text-sky-200 border border-sky-500/20 rounded-tr-none' 
                                : 'bg-[#0A101F] text-slate-200 border border-[#1E293B] rounded-tl-none'
                            }`}>
                              {text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic p-4 bg-[#0A101F]/40 border border-slate-800/50 rounded-xl text-center">
                      No hay transcripción de chat disponible para este lead.
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
