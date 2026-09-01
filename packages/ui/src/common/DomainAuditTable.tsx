import React, { useState, useEffect } from 'react';
import { History, Search, CheckCircle2, AlertTriangle, XCircle, Shield, Globe, RefreshCw, Radio } from 'lucide-react';
import { DomainAuditLog } from './DomainCloudflareManager';

interface DomainAuditTableProps {
  logs: DomainAuditLog[];
  isLoading?: boolean;
  onRefresh?: () => void;
  title?: string;
  onAddLog?: (log: DomainAuditLog) => void;
}

export const DomainAuditTable: React.FC<DomainAuditTableProps> = ({
  logs,
  isLoading = false,
  onRefresh,
  title = 'Historial de Auditoría de Dominios & Cloudflare',
  onAddLog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);

  // Real-time log stream simulation effect
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const liveEvents = [
        {
          action: 'Propagación DNS Anycast Global',
          domain: 'tienda.acmetech.com',
          details: 'Nodo Anycast Madrid (MAD-02) propagó registros CNAME en 14ms.',
          status: 'success' as const
        },
        {
          action: 'Verificación TLS 1.3 Edge',
          domain: 'agro.clientum.com.ar',
          details: 'Handshake SSL verificado contra Cloudflare Universal SSL.',
          status: 'success' as const
        },
        {
          action: 'Monitoreo de Salud de Zona',
          domain: 'acmetech.com',
          details: 'Latido HTTP 200 OK verificado en todos los POPs de Cloudflare.',
          status: 'success' as const
        }
      ];

      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const newLog: DomainAuditLog = {
        id: 'log_live_' + Date.now(),
        timestamp: new Date().toISOString(),
        domain: randomEvent.domain,
        action: `[Live Stream] ${randomEvent.action}`,
        user: 'system@clientum.com',
        status: randomEvent.status,
        details: randomEvent.details
      };

      if (onAddLog) {
        onAddLog(newLog);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, onAddLog]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{title}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
                {logs.length} eventos
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Trazabilidad cronológica de vinculaciones, validaciones CNAME fallidas y certificados SSL emitidos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Live Stream Toggle Button */}
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Activar o desactivar streaming en tiempo real de eventos DNS"
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-spin' : ''}`} />
            <span>{isLiveStreaming ? 'Streaming en Vivo (Activo)' : 'Activar Stream en Vivo'}</span>
          </button>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
              title="Actualizar registros"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}

          <div className="flex items-center gap-2 bg-[#1a2130] px-3 py-2 rounded-xl border border-[#273046]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en auditoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white focus:outline-none w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium">Filtrar estado:</span>
        {(['all', 'success', 'warning', 'error'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              statusFilter === st
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#182030] text-slate-400 hover:text-white border border-[#263148]'
            }`}
          >
            {st === 'all' ? 'Todos' : st === 'success' ? 'Exitosos' : st === 'warning' ? 'Advertencias' : 'Errores'}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1e2330] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Dominio / Recurso</th>
              <th className="py-3 px-4">Acción Realizada</th>
              <th className="py-3 px-4">Detalles Técnicos</th>
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181f2f] text-xs">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500">
                  No se encontraron registros de auditoría que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#181f2f]/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    {log.domain}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                    {log.user}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      log.status === 'success'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : log.status === 'warning'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}>
                      {log.status === 'success' && <CheckCircle2 className="w-3 h-3" />}
                      {log.status === 'warning' && <AlertTriangle className="w-3 h-3" />}
                      {log.status === 'error' && <XCircle className="w-3 h-3" />}
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

