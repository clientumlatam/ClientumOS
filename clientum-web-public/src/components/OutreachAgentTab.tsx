import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  Play,
  Pause,
  Settings2,
  CheckCircle2,
  Users,
  MessageSquare,
  Mail,
  Globe,
  ShieldCheck,
  Activity,
  ArrowRight
} from 'lucide-react';

export interface OutreachAgentConfig {
  id: string;
  name: string;
  status: 'Running' | 'Paused';
  dailyCapLimit: number;
  activeSequence: string;
  channelsEnabled: {
    linkedin: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  leadsProcessedToday: number;
  meetingsBookedMonth: number;
}

const INITIAL_AGENTS: OutreachAgentConfig[] = [
  {
    id: 'agent-1',
    name: 'Agente Outreach ABM - Vaca Muerta & Energía',
    status: 'Running',
    dailyCapLimit: 50,
    activeSequence: 'Secuencia Híbrida LinkedIn + WhatsApp + Email',
    channelsEnabled: { linkedin: true, email: true, whatsapp: true },
    leadsProcessedToday: 42,
    meetingsBookedMonth: 18
  },
  {
    id: 'agent-2',
    name: 'Agente Prospector Agro - Mendoza & Cuyo',
    status: 'Running',
    dailyCapLimit: 30,
    activeSequence: 'Atención Automática Directa WhatsApp',
    channelsEnabled: { linkedin: false, email: true, whatsapp: true },
    leadsProcessedToday: 28,
    meetingsBookedMonth: 12
  }
];

export function OutreachAgentTab() {
  const [agents, setAgents] = useState<OutreachAgentConfig[]>(INITIAL_AGENTS);

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(a => a.id === id ? { ...a, status: a.status === 'Running' ? 'Paused' : 'Running' } : a));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              IA Autónoma Multicanal
            </span>
            <span className="text-slate-400 text-xs">· Módulo 5.5 Campañas & Automatización</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bot className="w-7 h-7 text-purple-600" /> Agente Autónomo de Outreach B2B
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Agentes inteligentes que ejecutan prospección multicanal autónoma en LinkedIn, Email y WhatsApp 24/7.
          </p>
        </div>

        <button
          onClick={() => alert('Creando nuevo agente autónomo de prospección...')}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-purple-600/20 cursor-pointer border-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Nuevo Agente Autónomo</span>
        </button>
      </div>

      {/* Agents Active Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  agent.status === 'Running' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {agent.status === 'Running' ? '● En Ejecución 24/7' : 'Pausado'}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{agent.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{agent.activeSequence}</p>
              </div>

              <button
                onClick={() => toggleAgentStatus(agent.id)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  agent.status === 'Running' ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {agent.status === 'Running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Channels Status */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Canales Conectados</span>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${agent.channelsEnabled.linkedin ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400'}`}>
                  <Globe className="w-3.5 h-3.5" /> LinkedIn
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${agent.channelsEnabled.email ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-400'}`}>
                  <Mail className="w-3.5 h-3.5" /> Cold Email
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${agent.channelsEnabled.whatsapp ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp IA
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Procesados Hoy</span>
                <span className="text-lg font-black text-slate-900 font-mono">{agent.leadsProcessedToday} / {agent.dailyCapLimit}</span>
                <span className="text-[10px] text-slate-500 block">Límite diario anti-spam</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Demos Agendadas (Mes)</span>
                <span className="text-lg font-black text-emerald-600 font-mono">{agent.meetingsBookedMonth}</span>
                <span className="text-[10px] text-emerald-600 block font-bold">Directo a Google Calendar</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
