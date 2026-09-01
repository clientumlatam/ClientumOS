import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Code,
  Link
} from 'lucide-react';

export interface SeoAutomationTask {
  id: string;
  name: string;
  category: string;
  frequency: string;
  status: 'Activo' | 'Pausado';
  lastRun: string;
  itemsProcessed: number;
}

const INITIAL_TASKS: SeoAutomationTask[] = [
  { id: 'seo-1', name: 'Auto-interlinking de nuevos artículos con Pillar Pages', category: 'Internal Linking', frequency: 'Diario', status: 'Activo', lastRun: 'Hoy 04:00 AM', itemsProcessed: 142 },
  { id: 'seo-2', name: 'Generación y envío automático de Sitemap XML a Google Search Console', category: 'Indexing', frequency: 'Semanal', status: 'Activo', lastRun: 'Hace 2 días', itemsProcessed: 38 },
  { id: 'seo-3', name: 'Inyección de Schema.org JSON-LD (FAQ + SoftwareApplication)', category: 'Structured Data', frequency: 'Tiempo Real', status: 'Activo', lastRun: 'Continuo', itemsProcessed: 210 }
];

export function SeoAutomationTab() {
  const [tasks, setTasks] = useState<SeoAutomationTask[]>(INITIAL_TASKS);

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Activo' ? 'Pausado' : 'Activo' } : t));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              IA & Auto-Piloto SEO
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.6 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-7 h-7 text-purple-600" /> Tareas Automatizadas de SEO
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Ejecución automática en segundo plano de marcado de datos estructurados, interlinking y monitoreo de enlaces.
          </p>
        </div>
      </div>

      {/* Automations List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Rutinas de Optimización Activas</h3>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                    {task.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Frecuencia: {task.frequency}</span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{task.name}</h4>
                <p className="text-xs text-slate-500">Última ejecución: {task.lastRun} · {task.itemsProcessed} elementos procesados</p>
              </div>

              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  task.status === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {task.status === 'Activo' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-slate-500" />}
                <span>{task.status}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
