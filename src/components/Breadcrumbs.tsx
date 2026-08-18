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
  overview: { category: 'Dirección, OS & APIs', label: 'Dashboard General', groupKey: 'direction' },
  analytics_dashboard: { category: 'Dirección, OS & APIs', label: 'Reportes Financieros & Atribución', groupKey: 'direction' },
  chat: { category: 'Dirección, OS & APIs', label: 'Asistente CMO', groupKey: 'direction' },

  icp_builder: { category: 'CRM & Prospección', label: 'ICP & Buyer Personas', groupKey: 'crm_sales' },
  clients: { category: 'CRM & Prospección', label: 'Fichero LATAM', groupKey: 'crm_sales' },
  contacts: { category: 'CRM & Prospección', label: 'Contactos', groupKey: 'crm_sales' },
  lists: { category: 'CRM & Prospección', label: 'Segmentos', groupKey: 'crm_sales' },

  geolocated_prospecting: { category: 'CRM & Prospección', label: 'Mapa IA (Google Maps)', groupKey: 'crm_sales' },
  crm_kanban: { category: 'CRM & Prospección', label: 'Tablero Kanban', groupKey: 'crm_sales' },
  meddic: { category: 'CRM & Prospección', label: 'Lead Scoring MEDDIC', groupKey: 'crm_sales' },

  strategy: { category: 'IA Content & Campañas', label: 'Estrategias', groupKey: 'marketing' },
  copywriter: { category: 'IA Content & Campañas', label: 'Ad Copy Studio', groupKey: 'marketing' },
  brochure_generator: { category: 'IA Content & Campañas', label: 'Brochures PDF', groupKey: 'marketing' },
  ai_hub: { category: 'IA Content & Campañas', label: 'Voice Hub & Gemini', groupKey: 'marketing' },

  email_template_builder: { category: 'IA Content & Campañas', label: 'Editor HTML', groupKey: 'marketing' },
  templates: { category: 'IA Content & Campañas', label: 'Biblioteca de Plantillas', groupKey: 'marketing' },
  email_campaigns: { category: 'IA Content & Campañas', label: 'Campañas Activas', groupKey: 'marketing' },
  automations: { category: 'IA Content & Campañas', label: 'Flujos de Trabajo', groupKey: 'marketing' },
  outreach_agent: { category: 'IA Content & Campañas', label: 'Agente Outreach', groupKey: 'marketing' },

  keyword_research: { category: 'Posicionamiento SEO', label: 'Research Keywords', groupKey: 'seo_suite' },
  topic_map: { category: 'Posicionamiento SEO', label: 'Mapa Tópico', groupKey: 'seo_suite' },
  on_page_audit: { category: 'Posicionamiento SEO', label: 'Auditoría On-Page', groupKey: 'seo_suite' },
  content_calendar: { category: 'Posicionamiento SEO', label: 'Calendario Editorial', groupKey: 'seo_suite' },
  rank_tracker: { category: 'Posicionamiento SEO', label: 'Rank Tracker', groupKey: 'seo_suite' },
  seo_automation: { category: 'Posicionamiento SEO', label: 'SEO Automations', groupKey: 'seo_suite' },

  settings: { category: 'Dirección, OS & APIs', label: 'Ajustes Globales', groupKey: 'direction' },
  smtp: { category: 'Dirección, OS & APIs', label: 'Servidor SMTP / API', groupKey: 'direction' },
  import_export: { category: 'Dirección, OS & APIs', label: 'Importar / Exportar', groupKey: 'direction' },
  google_drive: { category: 'Dirección, OS & APIs', label: 'Google Drive Integración', groupKey: 'direction' },

  agent_os: { category: 'Dirección, OS & APIs', label: 'Centro de Control Agent OS', groupKey: 'direction' },
  crm_agents: { category: 'Dirección, OS & APIs', label: 'Red de Agentes & Organigrama', groupKey: 'direction' },
  cmdb: { category: 'Dirección, OS & APIs', label: 'Inventario CMDB & Servicios', groupKey: 'direction' },
  crm_config: { category: 'Dirección, OS & APIs', label: 'Salud & Diagnóstico OS', groupKey: 'direction' },
  account: { category: 'Dirección, OS & APIs', label: 'Mi Cuenta & Seguridad', groupKey: 'direction' },

  vscrm_dashboard: { category: 'VS-CRM Enterprise', label: 'Dashboard VS-CRM', groupKey: 'vscrm' },
  vscrm_clients: { category: 'VS-CRM Enterprise', label: 'Clientes VS-CRM', groupKey: 'vscrm' },
  vscrm_projects: { category: 'VS-CRM Enterprise', label: 'Proyectos & Tareas', groupKey: 'vscrm' },
  vscrm_time: { category: 'VS-CRM Enterprise', label: 'Registro de Tiempo', groupKey: 'vscrm' },
  vscrm_invoices: { category: 'VS-CRM Enterprise', label: 'Facturas & Invoices', groupKey: 'vscrm' },
  vscrm_expenses: { category: 'VS-CRM Enterprise', label: 'Gastos Operativos', groupKey: 'vscrm' },
  vscrm_afip: { category: 'VS-CRM Enterprise', label: 'Factura Electrónica AFIP', groupKey: 'vscrm' },

  public_website: { category: 'Portal', label: 'Sitio Web & Academia', groupKey: 'public' },
  workflow: { category: 'Workflow', label: 'Inicio a Fin', groupKey: 'workflow' },
};

const sectionTabsMap: Record<string, SubTab[]> = {
  direction: [
    { id: 'overview', label: 'Métricas & ROI' },
    { id: 'chat', label: 'Asistente CMO' },
    { id: 'agent_os', label: 'Agent OS & Red' },
    { id: 'cmdb', label: 'CMDB & Salud' },
    { id: 'google_drive', label: 'Google Drive' },
    { id: 'settings', label: 'Ajustes & APIs' },
    { id: 'account', label: 'Mi Cuenta' },
  ],
  crm_sales: [
    { id: 'contacts', label: 'Base de Datos' },
    { id: 'geolocated_prospecting', label: 'Prospección Maps' },
    { id: 'crm_kanban', label: 'Pipeline CRM' },
    { id: 'icp_builder', label: 'ICP & Personas' },
    { id: 'meddic', label: 'MEDDIC' },
  ],
  marketing: [
    { id: 'strategy', label: 'Estrategia & Copy' },
    { id: 'brochure_generator', label: 'Brochure PDF' },
    { id: 'ai_hub', label: 'Gemini Voice' },
    { id: 'email_campaigns', label: 'Campañas Outreach' },
    { id: 'email_template_builder', label: 'Diseñador' },
  ],
  seo_suite: [
    { id: 'keyword_research', label: 'Keywords & Temas' },
    { id: 'on_page_audit', label: 'Auditoría & Rank' },
    { id: 'content_calendar', label: 'Calendario Editorial' },
  ],
  vscrm: [
    { id: 'vscrm_dashboard', label: 'Dashboard & Clientes' },
    { id: 'vscrm_projects', label: 'Proyectos & Horas' },
    { id: 'vscrm_invoices', label: 'Finanzas & AFIP' },
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
