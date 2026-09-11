import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Clock,
  User,
  Globe,
  Terminal,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  Info,
  ChevronRight,
  X,
  Lock,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { AuditLogEntry, SecurityAnomaly } from '../../types';

export const AuditLogsTab: React.FC = () => {
  const {
    auditLogs,
    securityAnomalies,
    clearAuditLogs,
    exportAuditCSV,
    exportAuditJSON,
    dismissAnomaly,
    resolveAnomaly,
    triggerSecurityScan,
    hasPermission,
    currentUser,
    showToast,
  } = useCRM();

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'info' | 'warning' | 'security' | 'critical'>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Filter logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actionLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityName && log.entityName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.ipAddress && log.ipAddress.includes(searchTerm));

    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;

    return matchesSearch && matchesSeverity && matchesEntity;
  });

  const activeAnomalies = securityAnomalies.filter((a) => a.status === 'active');
  const securityAlertsCount = auditLogs.filter((l) => l.severity === 'security' || l.severity === 'warning').length;

  const handleRunSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      triggerSecurityScan();
      setIsScanning(false);
    }, 600);
  };

  const getSeverityBadge = (severity: AuditLogEntry['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            Crítico
          </span>
        );
      case 'security':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            Seguridad
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Advertencia
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Info
          </span>
        );
    }
  };

  const getStatusBadge = (status: AuditLogEntry['status']) => {
    switch (status) {
      case 'success':
        return <span className="text-[10px] text-emerald-400 font-medium">Éxito (200)</span>;
      case 'denied':
        return <span className="text-[10px] text-amber-400 font-medium">Denegado (403)</span>;
      case 'flagged':
        return <span className="text-[10px] text-rose-400 font-medium">Anomalía Flagged</span>;
      case 'warning':
        return <span className="text-[10px] text-amber-400 font-medium">Warning</span>;
      default:
        return <span className="text-[10px] text-slate-400 font-medium">Completado</span>;
    }
  };

  return (
    <div id="audit-logs-container" className="space-y-6">
      {/* Top Header Metrics & Compliance Readiness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#121620] border border-[#1e2434] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Eventos Registrados</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{auditLogs.length}</span>
            <span className="text-[11px] text-slate-400">Total en sesión</span>
          </div>
        </div>

        <div className="bg-[#121620] border border-[#1e2434] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Anomalías Detectadas</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              activeAnomalies.length > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{activeAnomalies.length}</span>
            <span className={`text-[11px] font-medium ${activeAnomalies.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {activeAnomalies.length > 0 ? 'Requiere Atención' : 'Sin Alertas'}
            </span>
          </div>
        </div>

        <div className="bg-[#121620] border border-[#1e2434] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Eventos de Seguridad</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{securityAlertsCount}</span>
            <span className="text-[11px] text-slate-400">RBAC & API</span>
          </div>
        </div>

        <div className="bg-[#121620] border border-[#1e2434] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Cumplimiento Normativo</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-emerald-400">SOC2 Type II</span>
            <span className="text-[10px] text-slate-400">/ ISO 27001</span>
          </div>
        </div>
      </div>

      {/* Automated Security Anomalies Detection Notification Banner */}
      {activeAnomalies.length > 0 && (
        <div id="security-anomalies-banner" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Notificaciones de Seguridad Automatizadas ({activeAnomalies.length})
            </h4>
            <button
              onClick={handleRunSecurityScan}
              disabled={isScanning}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#1e2434] text-slate-300 hover:text-white hover:bg-[#283247] transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Re-escanear Logs</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {activeAnomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                id={`anomaly-card-${anomaly.id}`}
                className="bg-[#181512] border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-white">{anomaly.title}</h5>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider ${
                        anomaly.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : anomaly.severity === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        Riesgo {anomaly.severity}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(anomaly.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{anomaly.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span><strong>Actor:</strong> {anomaly.affectedUser?.name || 'Sistema de seguridad'}</span>
                      {anomaly.affectedUser?.email && <span><strong>Usuario:</strong> {anomaly.affectedUser.email}</span>}
                      <span><strong>Eventos Asociados:</strong> {anomaly.triggerEventIds?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => dismissAnomaly(anomaly.id)}
                    className="px-2.5 py-1 rounded text-xs font-medium bg-[#221c17] text-slate-300 hover:text-white border border-[#3b2e24] transition-colors"
                  >
                    Descartar
                  </button>
                  <button
                    onClick={() => resolveAnomaly(anomaly.id, 'Verificado por Administrador')}
                    className="px-3 py-1 rounded text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-2xs"
                  >
                    Marcar Resuelto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Controls Bar & Search */}
      <div className="bg-[#121620] border border-[#1e2434] rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por usuario, IP, acción, detalle o recurso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0e121a] border border-[#2b354c] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Action Buttons: Run Scan, Export CSV, Export SOC2 JSON, Clear */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              id="audit-scan-trigger-btn"
              onClick={handleRunSecurityScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a202c] border border-[#2b354c] text-slate-200 hover:text-white hover:bg-[#252f44] transition-colors"
              title="Analizar logs en busca de anomalías"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Escaneo de Seguridad</span>
            </button>

            <button
              id="audit-export-csv-btn"
              onClick={exportAuditCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a202c] border border-[#2b354c] text-slate-200 hover:text-white hover:bg-[#252f44] transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar CSV</span>
            </button>

            <button
              id="audit-export-json-btn"
              onClick={exportAuditJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a202c] border border-[#2b354c] text-slate-200 hover:text-white hover:bg-[#252f44] transition-colors"
              title="Descargar paquete de evidencia para auditoría SOC2 / ISO"
            >
              <FileCode className="w-3.5 h-3.5 text-purple-400" />
              <span>SOC2 / ISO JSON</span>
            </button>

            {auditLogs.length > 0 && (
              <button
                id="audit-clear-btn"
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que deseas limpiar el historial de logs de auditoría?')) {
                    clearAuditLogs();
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                title="Limpiar registros"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Severity and Entity Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1e2434] text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Severidad:</span>
          {(['all', 'info', 'warning', 'security', 'critical'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all ${
                severityFilter === sev
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'bg-[#161c28] text-slate-400 hover:text-slate-200 hover:bg-[#1f2637]'
              }`}
            >
              {sev === 'all' ? 'Todos' : sev}
            </button>
          ))}

          <span className="text-[11px] text-slate-400 font-medium ml-3">Módulo:</span>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="bg-[#0e121a] border border-[#2b354c] rounded-md px-2 py-0.5 text-[11px] text-white focus:outline-hidden"
          >
            <option value="all">Todos los Módulos</option>
            <option value="opportunities">Oportunidades (Deals)</option>
            <option value="companies">Empresas</option>
            <option value="people">Contactos</option>
            <option value="tasks">Tareas</option>
            <option value="settings">Roles & Configuración</option>
            <option value="integrations">Integraciones & API</option>
            <option value="auth">Autenticación</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#121620] border border-[#1e2434] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1e2434] text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-[#0f131c]">
                <th className="py-3 px-3.5 min-w-[150px]">Fecha & Hora</th>
                <th className="py-3 px-3 min-w-[180px]">Usuario Responsable</th>
                <th className="py-3 px-3 min-w-[200px]">Acción Realizada</th>
                <th className="py-3 px-3 min-w-[220px]">Detalle del Evento</th>
                <th className="py-3 px-3 min-w-[120px]">IP & Origen</th>
                <th className="py-3 px-2 text-center min-w-[90px]">Severidad</th>
                <th className="py-3 px-2 text-center min-w-[80px]">Inspección</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181f2f] text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron registros de auditoría coincidentes con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    id={`audit-log-row-${log.id}`}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-[#161c2b] transition-colors cursor-pointer group"
                  >
                    {/* Timestamp */}
                    <td className="py-3 px-3.5 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                      <div>
                        {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                    </td>

                    {/* Actor */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                          {log.userName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-white truncate block">{log.userName}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{log.userRole || log.userEmail}</span>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3">
                      <div>
                        <span className="font-medium text-slate-200 block">{log.actionLabel}</span>
                        <span className="text-[10px] font-mono text-slate-400 block">{log.action}</span>
                      </div>
                    </td>

                    {/* Details & Target Entity */}
                    <td className="py-3 px-3">
                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                        {log.details}
                      </p>
                      {log.entityName && (
                        <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded bg-[#1c2436] text-blue-300 font-mono">
                          {log.entityName}
                        </span>
                      )}
                    </td>

                    {/* IP & Location */}
                    <td className="py-3 px-3 text-[11px] whitespace-nowrap">
                      <div className="font-mono text-slate-300">{log.ipAddress || '181.46.139.84'}</div>
                      <div className="text-[10px] text-slate-500">{log.location || 'Buenos Aires, AR'}</div>
                    </td>

                    {/* Severity */}
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      {getSeverityBadge(log.severity)}
                    </td>

                    {/* Inspect Button */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(log);
                        }}
                        className="p-1.5 rounded hover:bg-[#252f44] text-slate-400 group-hover:text-blue-400 transition-colors"
                        title="Ver traza completa"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121620] border border-[#222a3d] rounded-xl max-w-2xl w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2434]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedLog.actionLabel}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{selectedLog.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0e121a] border border-[#1e2434] rounded-lg p-3 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Actor Responsable
                </span>
                <div className="text-white font-semibold">{selectedLog.userName}</div>
                <div className="text-slate-400 text-[11px]">{selectedLog.userEmail}</div>
                <div className="text-blue-400 text-[11px] font-medium">Rol: {selectedLog.userRole || 'N/A'}</div>
              </div>

              <div className="bg-[#0e121a] border border-[#1e2434] rounded-lg p-3 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Contexto de Red & Seguridad
                </span>
                <div className="text-slate-200 font-mono text-[11px]">IP: {selectedLog.ipAddress || '181.46.139.84'}</div>
                <div className="text-slate-400 text-[11px]">Ubicación: {selectedLog.location || 'Buenos Aires, AR'}</div>
                <div className="text-slate-500 text-[10px] truncate" title={selectedLog.userAgent}>
                  UA: {selectedLog.userAgent || 'Clientum WebApp'}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-[#0e121a] border border-[#1e2434] rounded-lg p-3.5 space-y-1.5 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                Detalle Completo del Evento
              </span>
              <p className="text-slate-200 leading-relaxed">{selectedLog.details}</p>
            </div>

            {/* Diff Viewer if present */}
            {selectedLog.diff && selectedLog.diff.length > 0 && (
              <div className="bg-[#0e121a] border border-[#1e2434] rounded-lg p-3.5 space-y-2 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Diferencias de Estado (Diff de Datos)
                </span>
                <div className="space-y-1.5">
                  {selectedLog.diff.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-blue-400 font-semibold">{d.field}:</span>
                      <span className="line-through text-rose-400 bg-rose-950/30 px-1.5 py-0.2 rounded">
                        {String(d.oldValue ?? 'null')}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                      <span className="text-emerald-400 bg-emerald-950/30 px-1.5 py-0.2 rounded">
                        {String(d.newValue ?? 'null')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1e2434] text-xs">
              <div className="flex items-center gap-2">
                {getSeverityBadge(selectedLog.severity)}
                {getStatusBadge(selectedLog.status)}
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-md bg-[#1e2434] hover:bg-[#283247] text-white font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
