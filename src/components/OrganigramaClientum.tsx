import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Cpu, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  Sparkles, 
  Layers, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Workflow,
  Flag
} from 'lucide-react';
import { useLanguage, OFFICES_INFO } from '../lib/i18n';
import { LanguageSelector } from './LanguageSelector';

export function OrganigramaClientum() {
  const { t, isPortuguese } = useLanguage();
  const [selectedOffice, setSelectedOffice] = useState<'argentina' | 'brasil'>('argentina');

  const leadership = [
    {
      id: 'jonathan',
      name: 'Jonathan Ledantes',
      role: isPortuguese ? 'CEO & Co-Fundador — Direção Geral' : 'CEO & Co-Fundador — Dirección General',
      office: isPortuguese ? 'Sede Principal: General Roca, Río Negro (Argentina)' : 'Sede Principal: General Roca, Río Negro (Argentina)',
      country: 'Argentina',
      flag: '🇦🇷',
      city: 'General Roca, Río Negro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: isPortuguese ? 'Sede Matriz' : 'Sede Matriz',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      responsibilities: isPortuguese
        ? ['Visão Estratégica & IA', 'Liderança de Produto & Arquitetura CRM', 'Supervisão Geral de Operações']
        : ['Visión Estratégica & IA', 'Liderazgo de Producto & Arquitectura CRM', 'Supervisión General de Operaciones'],
      contact: 'info@clientum.com.ar'
    },
    {
      id: 'matias',
      name: 'Matias Rotili',
      role: isPortuguese ? 'Diretor Internacional & Co-Fundador' : 'Director Internacional & Co-Fundador',
      office: isPortuguese ? 'Sede Brasil: Arraial do Cabo, Rio de Janeiro (Brasil)' : 'Sede Brasil: Arraial do Cabo, Rio de Janeiro (Brasil)',
      country: 'Brasil',
      flag: '🇧🇷',
      city: 'Arraial do Cabo, RJ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: isPortuguese ? 'Expansão Brasil' : 'Expansión Brasil',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      responsibilities: isPortuguese
        ? ['Expansão Comercial Brasil & Mercosul', 'Parcerias Estratégicas B2B', 'Operações & Relações Internacionais']
        : ['Expansión Comercial Brasil & Mercosur', 'Alianzas Estratégicas B2B', 'Operaciones & Relaciones Internacionales'],
      contact: 'brasil@clientum.com.ar'
    }
  ];

  const departments = [
    {
      id: 'ai-core',
      title: isPortuguese ? 'Núcleo de Inteligência Artificial' : 'Núcleo de Inteligencia Artificial',
      lead: 'Orquestador Multi-Agente & Gemini 3.6',
      icon: Cpu,
      color: 'from-indigo-600/30 to-purple-600/30 border-indigo-500/40',
      tagColor: 'text-indigo-400',
      agents: [
        { name: 'Orquestador Chief of Staff', type: 'Agente IA L3', status: 'Activo 24/7' },
        { name: 'Santi SDR Outbound', type: 'Agente IA WhatsApp', status: 'Activo' },
        { name: 'Explorador Territorial Maps', type: 'Radar Prospección', status: 'Activo' },
        { name: 'Generador Copywriter & MEDDIC', type: 'Agente IA Ventas', status: 'Activo' }
      ]
    },
    {
      id: 'tech-dev',
      title: isPortuguese ? 'Engenharia & Desenvolvimento' : 'Ingeniería & Desarrollo',
      lead: isPortuguese ? 'Equipe Técnica Full-Stack' : 'Equipo Técnico Full-Stack',
      icon: Layers,
      color: 'from-blue-600/30 to-cyan-600/30 border-blue-500/40',
      tagColor: 'text-blue-400',
      agents: [
        { name: 'Suite ERP/CRM Engine', type: 'Node/Express/Postgres', status: 'Online' },
        { name: 'Integrador OpenStreetMap & Maps', type: 'Geocoding Engine', status: 'Online' },
        { name: 'Sincronizador WhatsApp Cloud API', type: 'Webhooks Reales', status: 'Online' },
        { name: 'Módulo Facturación & Finanzas', type: 'AFIP & Multi-Currency', status: 'Online' }
      ]
    },
    {
      id: 'sales-growth',
      title: isPortuguese ? 'Vendas & Expansão Internacional' : 'Ventas & Expansión Internacional',
      lead: isPortuguese ? 'Argentina & Brasil B2B Growth' : 'Argentina & Brasil B2B Growth',
      icon: TrendingUp,
      color: 'from-emerald-600/30 to-teal-600/30 border-emerald-500/40',
      tagColor: 'text-emerald-400',
      agents: [
        { name: isPortuguese ? 'Mesa Comercial Argentina (Roca)' : 'Mesa Comercial Argentina (Roca)', type: 'B2B Interior & CABA', status: 'Operativo' },
        { name: isPortuguese ? 'Mesa Comercial Brasil (Arraial)' : 'Mesa Comercial Brasil (Arraial)', type: 'B2B Brasil & LATAM', status: 'Operativo' },
        { name: 'Asesor Inbound CRM', type: 'Chatbot Web Widget', status: 'Online' },
        { name: 'Pipeline Manager MEDDIC', type: 'Scoring Predictivo', status: 'Online' }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 min-h-full overflow-y-auto space-y-8">
      {/* Top Banner with Language Selector & Multi-HQ Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>{isPortuguese ? 'Estrutura Organizacional Binacional' : 'Estructura Organizacional Binacional'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>{isPortuguese ? 'Organograma & Sedes Clientum' : 'Organigrama & Sedes Clientum'}</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            {isPortuguese 
              ? 'Liderança executiva, sedes regionais e arquitetura de agentes IA conectando Argentina e Brasil.'
              : 'Liderazgo ejecutivo, sedes regionales y arquitectura de agentes IA conectando Argentina y Brasil.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="pill" />
        </div>
      </div>

      {/* Sedes Hub Cards (General Roca vs Arraial do Cabo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sede Principal: General Roca, Río Negro */}
        <div className={`p-6 rounded-2xl border transition-all ${
          selectedOffice === 'argentina' 
            ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-950/50' 
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇦🇷</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  {isPortuguese ? 'Sede Matriz' : 'Sede Principal'}
                </span>
                <h3 className="text-xl font-black text-white">General Roca, Río Negro</h3>
                <p className="text-xs text-slate-400">Patagonia Argentina</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Casa Central
            </span>
          </div>

          <div className="mt-5 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Liderazgo & Dirección:</span>
                <span className="font-bold text-white text-sm">Jonathan Ledantes</span>
                <span className="text-slate-400 text-xs ml-1.5">(CEO & Co-Fundador)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>General Roca, Río Negro — Argentina</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>info@clientum.com.ar</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            {isPortuguese
              ? 'Centro tecnológico de engenharia de software, modelos de IA generativa e desenvolvimento da infraestrutura de dados central.'
              : 'Centro tecnológico de ingeniería de software, modelos de IA generativa y desarrollo de la infraestructura de datos central.'}
          </p>
        </div>

        {/* Sede Brasil: Arraial do Cabo */}
        <div className={`p-6 rounded-2xl border transition-all ${
          selectedOffice === 'brasil' 
            ? 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/60 shadow-xl shadow-amber-950/40' 
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇧🇷</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  {isPortuguese ? 'Sede Internacional' : 'Sede Internacional'}
                </span>
                <h3 className="text-xl font-black text-white">Arraial do Cabo, RJ</h3>
                <p className="text-xs text-slate-400">Brasil · Rio de Janeiro</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Expansão LATAM
            </span>
          </div>

          <div className="mt-5 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Liderazgo & Dirección:</span>
                <span className="font-bold text-white text-sm">Matias Rotili</span>
                <span className="text-slate-400 text-xs ml-1.5">(Director Internacional & Co-Fundador)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Matias Andres Rotili Poinsof — Arraial do Cabo, RJ, Brasil</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>brasil@clientum.com.ar</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            {isPortuguese
              ? 'Polo de internacionalização, prospecção e parcerias corporativas com empresas e indústrias no mercado brasileiro e regional.'
              : 'Polo de internacionalización, prospección y alianzas corporativas con empresas e industrias en el mercado brasileño y regional.'}
          </p>
        </div>
      </div>

      {/* Leadership Executive Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-400" />
          <span>{isPortuguese ? 'Quadro Executivo & Co-Fundadores' : 'Cuadro Ejecutivo & Co-Fundadores'}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leadership.map((leader) => (
            <div key={leader.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-2xl font-bold text-white shrink-0 overflow-hidden relative">
                  <span className="text-3xl">{leader.flag}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white truncate">{leader.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${leader.badgeColor}`}>
                      {leader.badge}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-semibold mt-0.5">{leader.role}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{leader.office}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {isPortuguese ? 'Áreas de Atuação & Liderança:' : 'Áreas de Actuación & Liderazgo:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {leader.responsibilities.map((resp, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">
                      {resp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments & AI Agents Hierarchy */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Workflow className="w-5 h-5 text-purple-400" />
          <span>{isPortuguese ? 'Departamentos & Agentes IA Especializados' : 'Departamentos & Agentes IA Especializados'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div key={dept.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{dept.title}</h3>
                    <p className="text-xs text-slate-400">{dept.lead}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {dept.agents.map((ag, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-200">{ag.name}</div>
                        <div className="text-[10px] text-slate-500">{ag.type}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {ag.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrganigramaClientum;
