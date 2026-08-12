import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Search, X, LayoutDashboard, Target, Sparkles, Users, Settings, Cpu, Bot, 
  Database, Settings2, User, Server, ArrowLeftRight, Globe2, Building2, 
  ListOrdered, Compass, Kanban, ShieldCheck, Zap, FileText, FileSpreadsheet, 
  Layout, FileCode, Send, Workflow, TrendingUp, BarChart3, MessageSquareCode,
  Briefcase, Clock, DollarSign, FileCheck
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function CommandPalette({ isOpen, onClose, setActiveTab }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const items: Array<{ label: string; tab: ActiveTab; category: string; icon: React.ElementType }> = [
    // 1. Configuración Inicial
    { label: 'Ajustes del Sistema', tab: 'settings', category: '1. Configuración Inicial', icon: Settings },
    { label: 'Servidor SMTP / API', tab: 'smtp', category: '1. Configuración Inicial', icon: Server },
    { label: 'Importar / Exportar Datos', tab: 'import_export', category: '1. Configuración Inicial', icon: ArrowLeftRight },
    { label: 'Google Drive Integración', tab: 'google_drive', category: '1. Configuración Inicial', icon: Globe2 },

    // 2. Conocer tu Audiencia
    { label: 'Perfil ICP & Personas', tab: 'icp_builder', category: '2. Conocer tu Audiencia', icon: Target },
    { label: 'Fichero Clientes LATAM', tab: 'clients', category: '2. Conocer tu Audiencia', icon: Building2 },
    { label: 'Contactos y Destinatarios', tab: 'contacts', category: '2. Conocer tu Audiencia', icon: Users },
    { label: 'Listas y Segmentos', tab: 'lists', category: '2. Conocer tu Audiencia', icon: ListOrdered },

    // 3. Prospección & Pipeline
    { label: 'Prospección Maps IA (Google Maps)', tab: 'geolocated_prospecting', category: '3. Prospección & Pipeline', icon: Compass },
    { label: 'Pipeline Sales CRM (Kanban)', tab: 'crm_kanban', category: '3. Prospección & Pipeline', icon: Kanban },
    { label: 'Lead Scoring MEDDIC', tab: 'meddic', category: '3. Prospección & Pipeline', icon: ShieldCheck },

    // 4. IA & Generación de Contenido
    { label: 'Generador Estrategias Multicanal', tab: 'strategy', category: '4. IA & Contenido', icon: Zap },
    { label: 'AI Ad Copy Studio', tab: 'copywriter', category: '4. IA & Contenido', icon: FileText },
    { label: 'Generador Brochure PDF', tab: 'brochure_generator', category: '4. IA & Contenido', icon: FileSpreadsheet },
    { label: 'Gemini AI & Voice Hub', tab: 'ai_hub', category: '4. IA & Contenido', icon: Sparkles },

    // 5. Campañas & Automatización
    { label: 'Diseñador Plantillas HTML', tab: 'email_template_builder', category: '5. Campañas & Aut.', icon: Layout },
    { label: 'Biblioteca Plantillas Email', tab: 'templates', category: '5. Campañas & Aut.', icon: FileCode },
    { label: 'Campañas Email Masivas', tab: 'email_campaigns', category: '5. Campañas & Aut.', icon: Send },
    { label: 'Flujos Automatizados', tab: 'automations', category: '5. Campañas & Aut.', icon: Workflow },
    { label: 'Agente Outreach Auto', tab: 'outreach_agent', category: '5. Campañas & Aut.', icon: Bot },

    // 6. SEO & Contenidos
    { label: 'Research de Keywords LATAM', tab: 'keyword_research', category: '6. SEO & Contenidos', icon: Search },
    { label: 'Mapa Autoridad Tópica (Clusters)', tab: 'topic_map', category: '6. SEO & Contenidos', icon: Globe2 },
    { label: 'Auditoría On-Page & Speed', tab: 'on_page_audit', category: '6. SEO & Contenidos', icon: ShieldCheck },
    { label: 'Calendario Editorial', tab: 'content_calendar', category: '6. SEO & Contenidos', icon: ListOrdered },
    { label: 'Rank Tracker LATAM', tab: 'rank_tracker', category: '6. SEO & Contenidos', icon: TrendingUp },
    { label: 'SEO Automations', tab: 'seo_automation', category: '6. SEO & Contenidos', icon: Workflow },

    // 7. Analytics & ROI
    { label: 'Dashboard General Clientum', tab: 'overview', category: '7. Analytics & ROI', icon: LayoutDashboard },
    { label: 'Analytics & Atribución ROI', tab: 'analytics_dashboard', category: '7. Analytics & ROI', icon: BarChart3 },
    { label: 'Asistente CMO IA', tab: 'chat', category: '7. Analytics & ROI', icon: MessageSquareCode },

    // 8. OS & Infraestructura IA
    { label: 'Centro Control Agent OS', tab: 'agent_os', category: '8. OS & Infraestructura', icon: Cpu },
    { label: 'Red Agentes & Organigrama', tab: 'crm_agents', category: '8. OS & Infraestructura', icon: Bot },
    { label: 'Inventario CMDB & Servicios', tab: 'cmdb', category: '8. OS & Infraestructura', icon: Database },
    { label: 'Salud & Diagnóstico OS', tab: 'crm_config', category: '8. OS & Infraestructura', icon: Settings2 },
    { label: 'Mi Cuenta & Seguridad', tab: 'account', category: '8. OS & Infraestructura', icon: User },

    // 9. VS-CRM (Abdulkader Safi)
    { label: 'Dashboard VS-CRM', tab: 'vscrm_dashboard', category: '9. VS-CRM Suite', icon: LayoutDashboard },
    { label: 'Clientes VS-CRM', tab: 'vscrm_clients', category: '9. VS-CRM Suite', icon: Building2 },
    { label: 'Proyectos & Tareas VS-CRM', tab: 'vscrm_projects', category: '9. VS-CRM Suite', icon: Briefcase },
    { label: 'Registro de Tiempo (Horas)', tab: 'vscrm_time', category: '9. VS-CRM Suite', icon: Clock },
    { label: 'Facturas & Invoices', tab: 'vscrm_invoices', category: '9. VS-CRM Suite', icon: FileText },
    { label: 'Gastos Operativos', tab: 'vscrm_expenses', category: '9. VS-CRM Suite', icon: DollarSign },
    { label: 'Factura Electrónica AFIP', tab: 'vscrm_afip', category: '9. VS-CRM Suite', icon: FileCheck },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden space-y-0">
        <div className="flex items-center px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cualquier módulo (ej: SEO, CRM, MEDDIC, AFIP, Agentes)..."
            className="w-full bg-transparent border-none focus:outline-hidden text-sm font-semibold text-slate-800"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 max-h-96 overflow-y-auto space-y-1 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-semibold">
              No se encontraron módulos con "{searchTerm}"
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-indigo-50/70 hover:text-indigo-900 rounded-xl text-xs font-bold text-slate-700 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-700 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 group-hover:text-indigo-600 px-2 py-0.5 rounded bg-slate-100 group-hover:bg-indigo-100/50">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

