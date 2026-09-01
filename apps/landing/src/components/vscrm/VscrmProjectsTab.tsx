import React, { useState } from 'react';
import { Briefcase, Plus, CheckSquare, Calendar, DollarSign, Trash2, X } from 'lucide-react';
import { VscrmProject, VscrmTask, VscrmClient } from '@clientum/types';
import { INITIAL_VS_PROJECTS, INITIAL_VS_TASKS, INITIAL_VS_CLIENTS } from './vscrmData';

export function VscrmProjectsTab() {
  const [projects, setProjects] = useState<VscrmProject[]>(() => {
    const saved = localStorage.getItem('vscrm_projects');
    return saved ? JSON.parse(saved) : INITIAL_VS_PROJECTS;
  });

  const [tasks, setTasks] = useState<VscrmTask[]>(() => {
    const saved = localStorage.getItem('vscrm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_VS_TASKS;
  });

  const clients: VscrmClient[] = (() => {
    const saved = localStorage.getItem('vscrm_clients');
    return saved ? JSON.parse(saved) : INITIAL_VS_CLIENTS;
  })();

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [budget, setBudget] = useState(5000);
  const [deadline, setDeadline] = useState('2026-10-30');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Planning' | 'In Progress' | 'Completed' | 'On Hold'>('In Progress');

  // Task modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskProjectId, setTaskProjectId] = useState(projects[0]?.id || '');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const saveProjects = (updated: VscrmProject[]) => {
    setProjects(updated);
    localStorage.setItem('vscrm_projects', JSON.stringify(updated));
  };

  const saveTasks = (updated: VscrmTask[] ) => {
    setTasks(updated);
    localStorage.setItem('vscrm_tasks', JSON.stringify(updated));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const client = clients.find(c => c.id === clientId);
    const newProj: VscrmProject = {
      id: 'p_' + Date.now(),
      clientId,
      clientName: client ? client.company : 'Cliente General',
      title,
      budget: Number(budget),
      status,
      deadline,
      description
    };
    saveProjects([newProj, ...projects]);
    setTitle('');
    setDescription('');
    setIsProjectModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    const proj = projects.find(p => p.id === taskProjectId);
    const newTask: VscrmTask = {
      id: 't_' + Date.now(),
      projectId: taskProjectId,
      projectTitle: proj ? proj.title : 'Proyecto',
      title: taskTitle,
      status: 'To Do',
      priority: taskPriority,
      dueDate: new Date().toISOString().split('T')[0]
    };
    saveTasks([newTask, ...tasks]);
    setTaskTitle('');
    setIsTaskModalOpen(false);
  };

  const toggleTaskStatus = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'To Do' ? 'In Progress' : t.status === 'In Progress' ? 'Done' : 'To Do';
        return { ...t, status: nextStatus as any };
      }
      return t;
    });
    saveTasks(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Proyectos & Tareas (VS-CRM)
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Organiza entregables, presupuestos y tareas asignadas por cliente.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
          >
            <CheckSquare className="w-4 h-4" /> Nueva Tarea
          </button>
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
          >
            <Plus className="w-4 h-4" /> Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{proj.title}</h3>
                  <p className="text-xs text-indigo-600 font-semibold">{proj.clientName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  proj.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' :
                  proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-4">{proj.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> ${proj.budget.toLocaleString()} USD
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Vence: {proj.deadline}
                </span>
              </div>

              {/* Tasks for this project */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tareas Asociadas</h4>
                {tasks.filter(t => t.projectId === proj.id).length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No hay tareas registradas.</p>
                ) : (
                  tasks.filter(t => t.projectId === proj.id).map(task => (
                    <div key={task.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                            task.status === 'Done' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {task.status === 'Done' && '✓'}
                        </button>
                        <span className={`text-xs font-medium ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.title}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        task.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">Nuevo Proyecto</h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Proyecto</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej. Integración Pasarela Pago"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente</label>
                <select
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Presupuesto ($ USD)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Límite</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Alcance y detalles técnicos..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">Nueva Tarea</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proyecto</label>
                <select
                  value={taskProjectId}
                  onChange={e => setTaskProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la Tarea</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="Ej. Configurar Webhooks"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prioridad</label>
                <select
                  value={taskPriority}
                  onChange={e => setTaskPriority(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Agregar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
