import React, { useMemo } from 'react';
import {
  Users, Shield, FileText, CheckCircle, PieChart as PieIcon, BarChart2,
  Activity, AlertCircle, TrendingUp, Key
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

export interface AdminStatsDashboardProps {
  users: any[];
  logs: any[];
  metrics: any;
}

export function AdminStatsDashboard({ users = [], logs = [], metrics = {} }: AdminStatsDashboardProps) {
  const roleStats = useMemo(() => {
    const counts: Record<string, number> = { admin: 0, editor: 0, user: 0 };
    users.forEach(u => {
      const role = (u.role || 'user').toLowerCase();
      if (counts[role] !== undefined) {
        counts[role]++;
      } else {
        counts[role] = (counts[role] || 0) + 1;
      }
    });
    return Object.keys(counts).map(key => ({
      name: key.toUpperCase(),
      value: counts[key]
    }));
  }, [users]);

  const logActionStats = useMemo(() => {
    const actionCounts: Record<string, number> = {};
    logs.forEach(log => {
      const action = log.action || 'Unknown';
      actionCounts[action] = (actionCounts[action] || 0) + 1;
    });
    return Object.keys(actionCounts).map(key => ({
      name: key,
      cantidad: actionCounts[key]
    })).slice(0, 6);
  }, [logs]);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const statsCards = [
    {
      title: 'Total de Usuarios',
      value: users.length,
      subtitle: `${users.filter(u => u.role === 'admin').length} Administradores`,
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Registros de Auditoría',
      value: logs.length,
      subtitle: 'Acciones de control registradas',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Latencia Promedio DB',
      value: metrics.dbLatency || 'N/A',
      subtitle: 'Tiempo de respuesta',
      icon: Activity,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Versión del Sistema',
      value: 'v1.4.2',
      subtitle: 'Producción estable',
      icon: Shield,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{card.title}</span>
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <p className="text-xs text-slate-500">{card.subtitle}</p>
            </div>
            <div className={`p-3 rounded-xl ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 mb-6">
            <PieIcon className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Distribución de Roles</h4>
          </div>
          <div className="h-64 flex items-center justify-center">
            {roleStats.some(s => s.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleStats.filter(s => s.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {roleStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-xs">Sin datos de usuarios suficientes</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Frecuencia de Acciones de Auditoría</h4>
          </div>
          <div className="h-64">
            {logActionStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={logActionStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="cantidad" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Sin registros de acciones disponibles
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h4 className="text-sm font-semibold text-slate-900">Actividades Recientes del Sistema</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-3 font-semibold">Acción</th>
                <th className="py-3 font-semibold">Detalles</th>
                <th className="py-3 font-semibold">Marca de Tiempo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.slice(0, 5).map((log, idx) => (
                <tr key={log.id || idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-medium text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    {log.action}
                  </td>
                  <td className="py-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                  <td className="py-3 text-slate-400">
                    {log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    No se registran eventos de auditoría recientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
