import React, { useState } from 'react';
import { Clock, Plus, Calendar, DollarSign, Trash2, X } from 'lucide-react';
import { VscrmTimeEntry, VscrmClient, VscrmProject } from '../../types';
import { INITIAL_VS_TIME, INITIAL_VS_CLIENTS, INITIAL_VS_PROJECTS } from './vscrmData';

export function VscrmTimeTab() {
  const [timeEntries, setTimeEntries] = useState<VscrmTimeEntry[]>(() => {
    const saved = localStorage.getItem('vscrm_time');
    return saved ? JSON.parse(saved) : INITIAL_VS_TIME;
  });

  const clients: VscrmClient[] = (() => {
    const saved = localStorage.getItem('vscrm_clients');
    return saved ? JSON.parse(saved) : INITIAL_VS_CLIENTS;
  })();

  const projects: VscrmProject[] = (() => {
    const saved = localStorage.getItem('vscrm_projects');
    return saved ? JSON.parse(saved) : INITIAL_VS_PROJECTS;
  })();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(2.5);
  const [hourlyRate, setHourlyRate] = useState(95);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const saveEntries = (updated: VscrmTimeEntry[]) => {
    setTimeEntries(updated);
    localStorage.setItem('vscrm_time', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    const client = clients.find(c => c.id === clientId);
    const proj = projects.find(p => p.id === projectId);
    const newEntry: VscrmTimeEntry = {
      id: 'te_' + Date.now(),
      clientId,
      clientName: client ? client.company : 'Cliente',
      projectId,
      projectTitle: proj ? proj.title : 'Proyecto',
      description,
      hours: Number(hours),
      hourlyRate: Number(hourlyRate),
      date
    };
    saveEntries([newEntry, ...timeEntries]);
    setDescription('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este registro de tiempo?')) {
      saveEntries(timeEntries.filter(te => te.id !== id));
    }
  };

  const totalHours = timeEntries.reduce((sum, te) => sum + te.hours, 0);
  const totalBilled = timeEntries.reduce((sum, te) => sum + (te.hours * te.hourlyRate), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-600" /> Registro de Tiempo & Timesheets
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Control de horas facturables y seguimiento de productividad por proyecto.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" /> Registrar Horas
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Horas Registradas</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalHours.toFixed(1)} hrs</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Estimado Facturable</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">${totalBilled.toLocaleString()} USD</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="p-4">Fecha</th>
                <th className="p-4">Cliente / Proyecto</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Horas</th>
                <th className="p-4">Tarifa / Total</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {timeEntries.map(te => (
                <tr key={te.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-medium text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {te.date}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{te.clientName}</div>
                    <div className="text-indigo-600">{te.projectTitle}</div>
                  </td>
                  <td className="p-4 max-w-xs truncate">{te.description}</td>
                  <td className="p-4 font-bold text-slate-900">{te.hours} hrs</td>
                  <td className="p-4">
                    <span className="font-semibold text-emerald-600">${(te.hours * te.hourlyRate).toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block">(${te.hourlyRate}/hr)</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(te.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Time Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">Registrar Horas de Trabajo</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente</label>
                <select
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proyecto</label>
                <select
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción de la Actividad</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ej. Refactorización de endpoints API"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Horas</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hours}
                    onChange={e => setHours(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tarifa ($/hr)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Guardar Horas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
