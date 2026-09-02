import React, { useState } from 'react';
import { MessageSquare, User, Clock, Search, Filter, Users, UserCheck, UserPlus, Bot, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Conversation } from './crmTypes';

const statusColors: Record<string, string> = {
  activa: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  derivada: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  resuelta: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cerrada: 'bg-slate-800 text-slate-400 border-slate-700',
};

const typeLabels: Record<string, string> = {
  precios: '💰 Precios',
  horarios: '🕐 Horarios',
  sucursales: '📍 Sucursales',
  derivacion: '👤 Derivación',
  reclamo: '⚠️ Reclamo',
  otro: '❓ Otro',
};

interface Props {
  conversations: Conversation[];
}

export default function CrmFullConversations({ conversations }: Props) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamScopeFilter, setTeamScopeFilter] = useState<'all' | 'my_team' | 'unassigned'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Default active logged-in user in CRM: Matías Gómez
  const currentAgentName = 'Matías Gómez';

  const filtered = conversations.filter(c => {
    // Status filter
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;

    // Team scope filter
    if (teamScopeFilter === 'my_team') {
      if (!c.assigned_seller || !c.assigned_seller.toLowerCase().includes('matías') && !c.assigned_seller.toLowerCase().includes('matias')) {
        return false;
      }
    } else if (teamScopeFilter === 'unassigned') {
      if (c.assigned_seller && c.assigned_seller.trim() !== '') return false;
    }

    // Search filter
    if (searchTerm) {
      const matchName = c.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPhone = c.customer_phone?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSummary = c.summary?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSeller = c.assigned_seller?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchName && !matchPhone && !matchSummary && !matchSeller) return false;
    }

    return true;
  });

  const myTeamCount = conversations.filter(c => 
    c.assigned_seller && (c.assigned_seller.toLowerCase().includes('matías') || c.assigned_seller.toLowerCase().includes('matias'))
  ).length;

  const unassignedCount = conversations.filter(c => !c.assigned_seller || c.assigned_seller.trim() === '').length;

  const counts = {
    activa: conversations.filter(c => c.status === 'activa').length,
    derivada: conversations.filter(c => c.status === 'derivada').length,
    resuelta: conversations.filter(c => c.status === 'resuelta').length,
    cerrada: conversations.filter(c => c.status === 'cerrada').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 font-display tracking-wide flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-sky-400" />
            LOG DE TRANSMISIONES Y CONVERSACIONES
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">
            HISTORIAL DE CONSULTAS · ASIGNACIÓN DE ASESORES · {conversations.length} REGISTROS TOTALES
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, teléfono o asesor..."
            className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Team Scope Filter: 'Todo el equipo' vs 'Mi equipo' + 'Sin asignar' */}
      <div className="bg-[#0A101F]/80 border border-[#1E293B] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Vista de Equipo:
          </span>
          <div className="flex items-center gap-1.5 bg-[#050B14] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTeamScopeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                teamScopeFilter === 'all'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Todo el equipo</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {conversations.length}
              </span>
            </button>

            <button
              onClick={() => setTeamScopeFilter('my_team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                teamScopeFilter === 'my_team'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mi equipo ({currentAgentName})</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {myTeamCount}
              </span>
            </button>

            <button
              onClick={() => setTeamScopeFilter('unassigned')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                teamScopeFilter === 'unassigned'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>Sin asignar</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {unassignedCount}
              </span>
            </button>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
              statusFilter === 'all' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                : 'bg-[#1E293B]/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            TODAS [{conversations.length}]
          </button>
          {(Object.entries(counts) as [string, number][]).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                statusFilter === status 
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                  : 'bg-[#1E293B]/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {status} [{count}]
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="cockpit-panel p-16 text-center stagger-2 animate-slide-up">
          <Filter className="w-12 h-12 text-[#1E293B] mx-auto mb-4" />
          <p className="text-slate-400 font-display tracking-wide uppercase">
            SIN REGISTROS {statusFilter !== 'all' ? `EN ESTADO "${statusFilter.toUpperCase()}"` : 'EN ESTE FILTRO'}
          </p>
          <p className="text-xs text-slate-500 font-mono mt-2">
            {teamScopeFilter === 'my_team' 
              ? `No se encontraron chats asignados a ${currentAgentName}.` 
              : 'LOS LOGS DEL BOT APARECERÁN AQUÍ AUTOMÁTICAMENTE.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 stagger-2 animate-slide-up">
          {filtered.map((conv, i) => (
            <div key={conv.id} className="cockpit-panel p-5 hover:bg-[#0f172a] transition-colors border-[#1E293B]/50 hover:border-[#334155]" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#030712] border border-[#1E293B] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-bold text-slate-200 text-sm font-display tracking-wide uppercase">
                          {conv.customer_name || conv.customer_phone}
                        </p>
                        {conv.customer_name && (
                          <span className="text-xs text-slate-500 font-mono">{conv.customer_phone}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider font-mono ${statusColors[conv.status]}`}>
                          {conv.status}
                        </span>
                        <span className="px-2 py-0.5 rounded border border-[#334155] bg-[#1E293B] text-slate-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                          {typeLabels[conv.query_type] || conv.query_type}
                        </span>
                        {conv.channel === 'whatsapp' && (
                          <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                            WHATSAPP
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono flex-shrink-0 bg-[#030712] px-2 py-1 rounded border border-[#1E293B]">
                      <Clock className="w-3 h-3 text-sky-500/50" />
                      {conv.created_date ? format(new Date(conv.created_date), "dd/MM/yyyy HH:mm:ss").toUpperCase() : '--/--/-- --:--:--'}
                    </div>
                  </div>
                  
                  {conv.summary && (
                    <div className="mt-3 bg-[#030712] border border-[#1E293B]/50 p-3 rounded text-xs text-slate-400 font-mono leading-relaxed">
                      <span className="text-sky-500/50 mr-2">{'>'}</span> {conv.summary}
                    </div>
                  )}
                  
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    {conv.assigned_seller ? (
                      <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        ASESOR ASIGNADO: <span className="text-emerald-300 font-bold">{conv.assigned_seller}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-amber-400/90 font-mono uppercase tracking-wider flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30">
                        <UserPlus className="w-3 h-3 text-amber-400" />
                        <span>SIN ASIGNAR (DISPONIBLE PARA EL EQUIPO)</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
