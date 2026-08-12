import React from 'react';
import { ActiveTab } from '../types';
import { ChevronRight, Home, Command, Compass, Users, Bot, Zap, Search, BarChart3, Settings } from 'lucide-react';

interface BreadcrumbsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCommandPalette?: () => void;
}

interface SubTab {
  id: ActiveTab;
  label: string;
}

const tabCategoryMap: Partial<Record<ActiveTab, { category: string; label: string; groupKey: string }>> = {
  overview: { category: 'Analytics & ROI', label: 'Dashboard General', groupKey: 'analytics' },
  analytics_dashboard: { category: 'Analytics & ROI', label: 'Reportes Financieros & Atribución', groupKey: 'analytics' },
  chat: { category: 'Analytics & ROI', label: 'Asistente CMO', groupKey: 'analytics' },

  icp_builder: { category: 'Audiencia & Enriquecimiento', label: 'ICP & Buyer Personas', groupKey: 'audience' },
  clients: { category: 'Audiencia & Enriquecimiento', label: 'Fichero LATAM', groupKey: 'audience' },
  contacts: { category: 'Audiencia & Enriquecimiento', label: 'Contactos', groupKey: 'audience' },
  lists: { category: 'Audiencia & Enriquecimiento', label: 'Segmentos', groupKey: 'audience' },

  geolocated_prospecting: { category: 'Prospección & Pipeline', label: 'Mapa IA (Google Maps)', groupKey: 'prospecting' },
  crm_kanban: { category: 'Prospección & Pipeline', label: 'Tablero Kanban', groupKey: 'prospecting' },
  meddic: { category: 'Prospección & Pipeline', label: 'Lead Scoring MEDDIC', groupKey: 'prospecting' },

  strategy: { category: 'IA & Creatividad', label: 'Estrategias', groupKey: 'ai_content' },
  copywriter: { category: 'IA & Creatividad', label: 'Ad Copy Studio', groupKey: 'ai_content' },
  brochure_generator: { category: 'IA & Creatividad', label: 'Brochures PDF', groupKey: 'ai_content' },
  ai_hub: { category: 'IA & Creatividad', label: 'Voice Hub & Gemini', groupKey: 'ai_content' },

  email_template_builder: { category: 'Campañas & Automatización', label: 'Editor HTML', groupKey: 'campaigns' },
  templates: { category: 'Campañas & Automatización', label: 'Biblioteca de Plantillas', groupKey: 'campaigns' },
  email_campaigns: { category: 'Campañas & Automatización', label: 'Campañas Activas', groupKey: 'campaigns' },
  automations: { category: 'Campañas & Automatización', label: 'Flujos de Trabajo', groupKey: 'campaigns' },
  outreach_agent: { category: 'Campañas & Automatización', label: 'Agente Outreach', groupKey: 'campaigns' },

  keyword_research: { category: 'SEO & Autoridad Orgánica', label: 'Research Keywords', groupKey: 'seo' },
  topic_map: { category: 'SEO & Autoridad Orgánica', label: 'Mapa Tópico', groupKey: 'seo' },
  on_page_audit: { category: 'SEO & Autoridad Orgánica', label: 'Auditoría On-Page', groupKey: 'seo' },
  content_calendar: { category: 'SEO & Autoridad Orgánica', label: 'Calendario Editorial', groupKey: 'seo' },
  rank_tracker: { category: 'SEO & Autoridad Orgánica', label: 'Rank Tracker', groupKey: 'seo' },
  seo_automation: { category: 'SEO & Autoridad Orgánica', label: 'SEO Automations', groupKey: 'seo' },

  settings: { category: 'Sistema & Configuración', label: 'Ajustes Globales', groupKey: 'config' },
  smtp: { category: 'Sistema & Configuración', label: 'Servidor SMTP / API', groupKey: 'config' },
  import_export: { category: 'Sistema & Configuración', label: 'Importar / Exportar', groupKey: 'config' },
  google_drive: { category: 'Sistema & Configuración', label: 'Google Drive Integración', groupKey: 'config' },

  agent_os: { category: 'OS & Infraestructura IA', label: 'Centro de Control Agent OS', groupKey: 'os_infra' },
  crm_agents: { category: 'OS & Infraestructura IA', label: 'Red de Agentes & Organigrama', groupKey: 'os_infra' },
  cmdb: { category: 'OS & Infraestructura IA', label: 'Inventario CMDB & Servicios', groupKey: 'os_infra' },
  crm_config: { category: 'OS & Infraestructura IA', label: 'Salud & Diagnóstico OS', groupKey: 'os_infra' },
  account: { category: 'OS & Infraestructura IA', label: 'Mi Cuenta & Seguridad', groupKey: 'os_infra' },

  vscrm_dashboard: { category: 'VS-CRM (Abdulkader Safi)', label: 'Dashboard VS-CRM', groupKey: 'vscrm' },
  vscrm_clients: { category: 'VS-CRM (Abdulkader Safi)', label: 'Clientes VS-CRM', groupKey: 'vscrm' },
  vscrm_projects: { category: 'VS-CRM (Abdulkader Safi)', label: 'Proyectos & Tareas', groupKey: 'vscrm' },
  vscrm_time: { category: 'VS-CRM (Abdulkader Safi)', label: 'Registro de Tiempo', groupKey: 'vscrm' },
  vscrm_invoices: { category: 'VS-CRM (Abdulkader Safi)', label: 'Facturas & Invoices', groupKey: 'vscrm' },
  vscrm_expenses: { category: 'VS-CRM (Abdulkader Safi)', label: 'Gastos Operativos', groupKey: 'vscrm' },
  vscrm_afip: { category: 'VS-CRM (Abdulkader Safi)', label: 'Factura Electrónica AFIP', groupKey: 'vscrm' },

  public_website: { category: 'Portal', label: 'Sitio Web & Academia', groupKey: 'public' },
  workflow: { category: 'Workflow', label: 'Inicio a Fin', groupKey: 'workflow' },
};

const sectionTabsMap: Record<string, SubTab[]> = {
  os_infra: [
    { id: 'agent_os', label: 'Agent OS & Red Agentes' },
    { id: 'cmdb', label: 'CMDB & Salud OS' },
    { id: 'account', label: 'Mi Cuenta & Seguridad' },
  ],
  audience: [
    { id: 'icp_builder', label: 'ICP & Buyer Personas' },
    { id: 'contacts', label: 'Base de Datos LATAM' },
  ],
  prospecting: [
    { id: 'geolocated_prospecting', label: 'Prospección Maps IA' },
    { id: 'crm_kanban', label: 'Pipeline CRM & MEDDIC' },
  ],
  ai_content: [
    { id: 'strategy', label: 'Estrategia & Copywriter IA' },
    { id: 'brochure_generator', label: 'Brochure PDF Studio' },
    { id: 'ai_hub', label: 'Gemini AI & Voice Hub' },
  ],
  campaigns: [
    { id: 'email_template_builder', label: 'Diseñador & Plantillas' },
    { id: 'email_campaigns', label: 'Campañas & Outreach IA' },
  ],
  seo: [
    { id: 'keyword_research', label: 'Keywords & Mapa Tópico' },
    { id: 'on_page_audit', label: 'Auditoría & Rank Tracker' },
    { id: 'content_calendar', label: 'Calendario & SEO Auto' },
  ],
  analytics: [
    { id: 'overview', label: 'Dashboard & Analytics ROI' },
    { id: 'chat', label: 'Asistente CMO IA' },
  ],
  config: [
    { id: 'settings', label: 'Configuración & APIs' },
    { id: 'google_drive', label: 'Google Drive Workspace' },
  ],
  vscrm: [
    { id: 'vscrm_dashboard', label: 'Dashboard & Clientes VS' },
    { id: 'vscrm_projects', label: 'Proyectos, Tareas & Horas' },
    { id: 'vscrm_invoices', label: 'Centro Financiero & AFIP' },
  ],
};

export function Breadcrumbs({ activeTab, setActiveTab, onOpenCommandPalette }: BreadcrumbsProps) {
  const current = tabCategoryMap[activeTab] || { category: 'Módulo', label: activeTab, groupKey: '' };
  const subTabs = sectionTabsMap[current.groupKey] || [];

  return (
    <div className="mb-5 space-y-2.5">
      {/* 1. Breadcrumb trail */}
      <nav className="flex items-center justify-between text-xs text-slate-500 bg-white dark:bg-slate-900/50 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
        <div className="flex items-center space-x-2 min-w-0 overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors shrink-0 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <span className="text-slate-400 font-medium shrink-0">{current.category}</span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
            {current.label}
          </span>
        </div>

        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center space-x-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-4 shrink-0 font-medium text-[11px] cursor-pointer"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Atajo de teclado <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px]">⌘K</kbd></span>
          </button>
        )}
      </nav>

      {/* 2. Contextual Submenu (Barra de Contexto / Pestañas de Sección) */}
      {subTabs.length > 0 && (
        <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar bg-slate-200/60 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-300/40 dark:border-slate-700/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1 shrink-0">
            Sección:
          </span>
          {subTabs.map((sub) => {
            const isActive = sub.id === activeTab;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveTab(sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-xs border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-900/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
