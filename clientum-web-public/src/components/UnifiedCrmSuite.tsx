import React, { useState } from 'react';
import {
  Kanban,
  Users,
  MessageSquare,
  Compass,
  Target,
  ShieldCheck,
  Cpu,
  Briefcase,
  Sparkles,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  Activity,
  Send,
  Building2,
  PhoneCall,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';

import { CrmKanbanTab } from './CrmKanbanTab';
import { ContactsTab } from './ContactsTab';
import { GeolocatedProspectingTab } from './GeolocatedProspectingTab';
import { IcpBuilderTab } from './IcpBuilderTab';
import { MeddicTab } from './MeddicTab';
import CrmFullAgentes from './crm-full/CrmFullAgentes';
import CrmFullWhatsApp from './crm-full/CrmFullWhatsApp';
import { VscrmDashboard } from './vscrm/VscrmDashboard';
import { BulkWhatsAppModal } from './BulkWhatsAppModal';
import { ActiveTab } from '../types';

export type CrmSubView =
  | 'kanban'
  | 'contacts'
  | 'whatsapp'
  | 'maps'
  | 'icp'
  | 'meddic'
  | 'agents'
  | 'vscrm';

interface UnifiedCrmSuiteProps {
  initialView?: CrmSubView;
  onNavigateTab?: (tab: ActiveTab) => void;
}

const CRM_TABS: Array<{
  id: CrmSubView;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  desc: string;
}> = [
  {
    id: 'kanban',
    label: 'Pipeline & Deals',
    shortLabel: 'Pipeline',
    icon: Kanban,
    badge: 'Deals',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Embudo comercial visual con Drag & Drop y métricas de cierre'
  },
  {
    id: 'contacts',
    label: 'Directorio de Contactos B2B',
    shortLabel: 'Contactos',
    icon: Users,
    badge: 'Leads',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    desc: 'Base centralizada, decisores, listas y exportación PDF'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp AI & Hermes Agent',
    shortLabel: 'WhatsApp',
    icon: MessageSquare,
    badge: 'IA Bot',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    desc: 'Bandeja omnicanal, agente inteligente 24/7 y envíos masivos'
  },
  {
    id: 'maps',
    label: 'Prospección Maps IA',
    shortLabel: 'Radar Maps',
    icon: Compass,
    badge: 'Patagonia',
    badgeColor: 'bg-blue-100 text-blue-700',
    desc: 'Descubrimiento territorial de comercios y PyMEs con Gemini'
  },
  {
    id: 'icp',
    label: 'ICP & Buyer Personas',
    shortLabel: 'ICP Studio',
    icon: Target,
    desc: 'Definición de perfiles de clientes ideales y propuesta de valor'
  },
  {
    id: 'meddic',
    label: 'Scoring MEDDIC B2B',
    shortLabel: 'MEDDIC',
    icon: ShieldCheck,
    badge: 'Score',
    badgeColor: 'bg-amber-100 text-amber-700',
    desc: 'Calificación metodológica de oportunidades comerciales complejas'
  },
  {
    id: 'agents',
    label: 'Agentes Comerciales Autónomos',
    shortLabel: 'Agentes IA',
    icon: Cpu,
    badge: 'AgentOS',
    badgeColor: 'bg-purple-100 text-purple-700',
    desc: 'Orquestación de bots de prospección, calificación y seguimiento'
  },
  {
    id: 'vscrm',
    label: 'VS-CRM Finanzas & AFIP',
    shortLabel: 'Finanzas ERP',
    icon: Briefcase,
    badge: 'ERP',
    badgeColor: 'bg-slate-100 text-slate-700',
    desc: 'Facturación electrónica, proyectos, horas y gastos operativos'
  }
];

export const UnifiedCrmSuite: React.FC<UnifiedCrmSuiteProps> = ({
  initialView = 'kanban',
  onNavigateTab
}) => {
  const [activeView, setActiveView] = useState<CrmSubView>(initialView);
  const [showBulkWAModal, setShowBulkWAModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Unified CRM Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md font-mono">
                Clientum CRM Suite 360°
              </span>
              <span className="text-slate-400 text-xs font-mono">· Consola Comercial Unificada</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                8 Módulos Integrados
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Layers className="w-7 h-7 text-indigo-400" />
              Suite Comercial & Operaciones B2B
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Gestión integral del ciclo de ventas: prospección territorial Maps IA, pipeline Kanban, directorio de decisores, agentes autónomos de WhatsApp y facturación AFIP.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => setShowBulkWAModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer border-0"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Envío Masivo WhatsApp (IA)</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs Scroller */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CRM_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-white text-slate-900 border-white shadow-md'
                      : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Sub-Module Content */}
      <div className="transition-all">
        {activeView === 'kanban' && <CrmKanbanTab />}
        {activeView === 'contacts' && <ContactsTab initialTab="contacts" />}
        {activeView === 'whatsapp' && <CrmFullWhatsApp />}
        {activeView === 'maps' && <GeolocatedProspectingTab />}
        {activeView === 'icp' && <IcpBuilderTab />}
        {activeView === 'meddic' && <MeddicTab />}
        {activeView === 'agents' && <CrmFullAgentes />}
        {activeView === 'vscrm' && <VscrmDashboard />}
      </div>

      {/* Global Bulk WhatsApp Modal */}
      <BulkWhatsAppModal
        isOpen={showBulkWAModal}
        onClose={() => setShowBulkWAModal(false)}
      />
    </div>
  );
};

export default UnifiedCrmSuite;
