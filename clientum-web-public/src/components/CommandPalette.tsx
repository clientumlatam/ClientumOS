import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, X, Settings, Server, ArrowLeftRight, Globe2, Target, Building2, 
  Users, ListOrdered, Layers, MessageSquareCode, Compass, Kanban, 
  ShieldCheck, Zap, FileText, FileSpreadsheet, Sparkles, Layout, 
  FileCode, Send, Workflow, Bot, TrendingUp, LayoutDashboard, 
  BarChart3, Cpu, Database, Settings2, User, Briefcase, Clock, 
  DollarSign, FileCheck, CheckCircle2, Activity,
  Briefcase as BriefcaseIcon
} from 'lucide-react';
import { ActiveTab } from '../types';
import { loadDeals, loadActivities, ActivityLogItem } from '../store/sharedStore';
import { CRMDeal } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function CommandPalette({ isOpen, onClose, setActiveTab }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load data once when opened
  const [deals, setDeals] = useState<CRMDeal[]>([]);
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setDeals(loadDeals());
      setActivities(loadActivities());
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const moduleItems: Array<{ id: string; label: string; tab: ActiveTab; category: string; icon: React.ElementType; type: 'module' | 'deal' | 'activity'; subtitle?: string }> = [
    // 1. Configuración Inicial
    { id: 'm1', label: 'Ajustes del Sistema', tab: 'settings', category: '1. Configuración Inicial', icon: Settings, type: 'module' },
    { id: 'm2', label: 'Servidor SMTP / API', tab: 'smtp', category: '1. Configuración Inicial', icon: Server, type: 'module' },
    { id: 'm3', label: 'Importar / Exportar Datos', tab: 'import_export', category: '1. Configuración Inicial', icon: ArrowLeftRight, type: 'module' },
    { id: 'm4', label: 'Google Drive Integración', tab: 'google_drive', category: '1. Configuración Inicial', icon: Globe2, type: 'module' },

    // 2. Conocer tu Audiencia
    { id: 'm5', label: 'Perfil ICP & Personas', tab: 'icp_builder', category: '2. Conocer tu Audiencia', icon: Target, type: 'module' },
    { id: 'm6', label: 'Fichero Clientes LATAM', tab: 'clients', category: '2. Conocer tu Audiencia', icon: Building2, type: 'module' },
    { id: 'm7', label: 'Contactos y Destinatarios', tab: 'contacts', category: '2. Conocer tu Audiencia', icon: Users, type: 'module' },
    { id: 'm8', label: 'Listas y Segmentos', tab: 'lists', category: '2. Conocer tu Audiencia', icon: ListOrdered, type: 'module' },

    // 3. Prospección & Pipeline
    { id: 'm9', label: 'Consola Unificada CRM 360°', tab: 'unified_crm', category: '3. Prospección & Pipeline', icon: Layers, type: 'module' },
    { id: 'm10', label: 'WhatsApp AI & Hermes Agent', tab: 'crm_whatsapp', category: '3. Prospección & Pipeline', icon: MessageSquareCode, type: 'module' },
    { id: 'm11', label: 'Prospección Maps IA (Google Maps)', tab: 'geolocated_prospecting', category: '3. Prospección & Pipeline', icon: Compass, type: 'module' },
    { id: 'm12', label: 'Pipeline Sales CRM (Kanban)', tab: 'crm_kanban', category: '3. Prospección & Pipeline', icon: Kanban, type: 'module' },
    { id: 'm13', label: 'Lead Scoring MEDDIC', tab: 'meddic', category: '3. Prospección & Pipeline', icon: ShieldCheck, type: 'module' },

    // 4. IA & Generación de Contenido
    { id: 'm14', label: 'Generador Estrategias Multicanal', tab: 'strategy', category: '4. IA & Contenido', icon: Zap, type: 'module' },
    { id: 'm15', label: 'AI Ad Copy Studio', tab: 'copywriter', category: '4. IA & Contenido', icon: FileText, type: 'module' },
    { id: 'm16', label: 'Generador Brochure PDF', tab: 'brochure_generator', category: '4. IA & Contenido', icon: FileSpreadsheet, type: 'module' },
    { id: 'm17', label: 'Gemini AI & Voice Hub', tab: 'ai_hub', category: '4. IA & Contenido', icon: Sparkles, type: 'module' },

    // 5. Campañas & Automatización
    { id: 'm18', label: 'Diseñador Plantillas HTML', tab: 'email_template_builder', category: '5. Campañas & Aut.', icon: Layout, type: 'module' },
    { id: 'm19', label: 'Biblioteca Plantillas Email', tab: 'templates', category: '5. Campañas & Aut.', icon: FileCode, type: 'module' },
    { id: 'm20', label: 'Campañas Email Masivas', tab: 'email_campaigns', category: '5. Campañas & Aut.', icon: Send, type: 'module' },
    { id: 'm21', label: 'Flujos Automatizados', tab: 'automations', category: '5. Campañas & Aut.', icon: Workflow, type: 'module' },
    { id: 'm22', label: 'Agente Outreach Auto', tab: 'outreach_agent', category: '5. Campañas & Aut.', icon: Bot, type: 'module' },

    // 6. SEO & Contenidos
    { id: 'm23', label: 'Research de Keywords LATAM', tab: 'keyword_research', category: '6. SEO & Contenidos', icon: Search, type: 'module' },
    { id: 'm24', label: 'Mapa Autoridad Tópica (Clusters)', tab: 'topic_map', category: '6. SEO & Contenidos', icon: Globe2, type: 'module' },
    { id: 'm25', label: 'Auditoría On-Page & Speed', tab: 'on_page_audit', category: '6. SEO & Contenidos', icon: ShieldCheck, type: 'module' },
    { id: 'm26', label: 'Calendario Editorial', tab: 'content_calendar', category: '6. SEO & Contenidos', icon: ListOrdered, type: 'module' },
    { id: 'm27', label: 'Rank Tracker LATAM', tab: 'rank_tracker', category: '6. SEO & Contenidos', icon: TrendingUp, type: 'module' },
    { id: 'm28', label: 'SEO Automations', tab: 'seo_automation', category: '6. SEO & Contenidos', icon: Workflow, type: 'module' },

    // 7. Analytics & ROI
    { id: 'm29', label: 'Dashboard General Clientum', tab: 'overview', category: '7. Analytics & ROI', icon: LayoutDashboard, type: 'module' },
    { id: 'm30', label: 'Analytics & Atribución ROI', tab: 'analytics_dashboard', category: '7. Analytics & ROI', icon: BarChart3, type: 'module' },
    { id: 'm31', label: 'Asistente CMO IA', tab: 'chat', category: '7. Analytics & ROI', icon: MessageSquareCode, type: 'module' },

    // 8. OS & Infraestructura IA
    { id: 'm32', label: 'Centro Control Agent OS', tab: 'agent_os', category: '8. OS & Infraestructura', icon: Cpu, type: 'module' },
    { id: 'm33', label: 'Red Agentes & Organigrama', tab: 'crm_agents', category: '8. OS & Infraestructura', icon: Bot, type: 'module' },
    { id: 'm34', label: 'Inventario CMDB & Servicios', tab: 'cmdb', category: '8. OS & Infraestructura', icon: Database, type: 'module' },
    { id: 'm35', label: 'Salud & Diagnóstico OS', tab: 'crm_config', category: '8. OS & Infraestructura', icon: Settings2, type: 'module' },
    { id: 'm36', label: 'Mi Cuenta & Seguridad', tab: 'account', category: '8. OS & Infraestructura', icon: User, type: 'module' },

    // 9. VS-CRM (Abdulkader Safi)
    { id: 'm37', label: 'Dashboard VS-CRM', tab: 'vscrm_dashboard', category: '9. VS-CRM Suite', icon: LayoutDashboard, type: 'module' },
    { id: 'm38', label: 'Clientes VS-CRM', tab: 'vscrm_clients', category: '9. VS-CRM Suite', icon: Building2, type: 'module' },
    { id: 'm39', label: 'Proyectos & Tareas VS-CRM', tab: 'vscrm_projects', category: '9. VS-CRM Suite', icon: Briefcase, type: 'module' },
    { id: 'm40', label: 'Registro de Tiempo (Horas)', tab: 'vscrm_time', category: '9. VS-CRM Suite', icon: Clock, type: 'module' },
    { id: 'm41', label: 'Facturas & Invoices', tab: 'vscrm_invoices', category: '9. VS-CRM Suite', icon: FileText, type: 'module' },
    { id: 'm42', label: 'Gastos Operativos', tab: 'vscrm_expenses', category: '9. VS-CRM Suite', icon: DollarSign, type: 'module' },
    { id: 'm43', label: 'Factura Electrónica AFIP', tab: 'vscrm_afip', category: '9. VS-CRM Suite', icon: FileCheck, type: 'module' },
  ];

  const searchResults = useMemo(() => {
    const q = searchTerm.toLowerCase();
    
    // Filter modules
    const filteredModules = moduleItems.filter(item => 
      item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    // Filter deals
    const filteredDeals = deals.filter(deal => 
      deal.company.toLowerCase().includes(q) || 
      deal.contact.toLowerCase().includes(q) ||
      deal.email?.toLowerCase().includes(q) ||
      deal.industry?.toLowerCase().includes(q)
    ).map(deal => ({
      id: deal.id,
      label: `${deal.company} (${deal.contact})`,
      tab: 'unified_crm' as ActiveTab,
      category: 'Negocios & Deals',
      icon: BriefcaseIcon,
      type: 'deal',
      subtitle: `Etapa: ${deal.stage} - $${deal.amount}`
    }));

    // Filter activities
    const filteredActivities = activities.filter(act => 
      act.title.toLowerCase().includes(q) || 
      act.notes?.toLowerCase().includes(q) ||
      act.user?.toLowerCase().includes(q)
    ).map(act => ({
      id: act.id as string,
      label: act.title,
      tab: 'overview' as ActiveTab,
      category: 'Registro de Actividades',
      icon: Activity,
      type: 'activity',
      subtitle: `${act.type.toUpperCase()} • ${act.date || act.createdAt} por ${act.user}`
    }));

    if (!q) return filteredModules; // Only show modules by default if no search term

    return [...filteredModules, ...filteredDeals, ...filteredActivities];
  }, [searchTerm, deals, activities]);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
      <div className="bg-[#050B14] rounded-2xl shadow-2xl max-w-2xl w-full border border-[#1E293B] overflow-hidden space-y-0 flex flex-col max-h-[85vh]">
        
        {/* Header / Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#1E293B] bg-[#0A101F]/50 shrink-0">
          <Search className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar módulos, clientes, negocios o actividades..."
            className="w-full bg-transparent border-none focus:outline-none text-xs font-bold text-slate-100 placeholder-slate-500"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 overflow-y-auto space-y-1 custom-scrollbar flex-1 bg-[#050B14]">
          {searchResults.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-center text-slate-500">
              <Search className="w-10 h-10 mb-3 opacity-20" />
              <div className="text-sm font-semibold text-slate-400">No se encontraron resultados</div>
              <div className="text-xs mt-1 text-slate-600">Prueba con otro término de búsqueda.</div>
            </div>
          ) : (
            searchResults.map((item) => {
              const Icon = item.icon;
              const isData = item.type === 'deal' || item.type === 'activity';
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.tab);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors text-left cursor-pointer group ${
                    isData 
                      ? 'hover:bg-emerald-500/10 hover:border-emerald-500/20' 
                      : 'hover:bg-[#1E293B]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isData 
                        ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' 
                        : 'bg-slate-900 text-slate-400 group-hover:bg-[#15203A] group-hover:text-sky-400 border border-slate-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 truncate">
                      <div className={`text-xs font-bold truncate ${isData ? 'text-emerald-300 font-semibold' : 'text-slate-300'} group-hover:text-white`}>
                        {item.label}
                      </div>
                      {item.subtitle && (
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded whitespace-nowrap ml-2 shrink-0 ${
                    isData 
                      ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/20'
                      : 'text-slate-400 bg-slate-900 border border-slate-800 group-hover:text-sky-400 group-hover:bg-[#0A101F]'
                  }`}>
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-[#0A101F] border-t border-[#1E293B] px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-[9px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-900 border border-slate-800 text-[10px] text-slate-400 rounded px-1 shadow-sm">↑</kbd>
              <kbd className="bg-slate-900 border border-slate-800 text-[10px] text-slate-400 rounded px-1 shadow-sm">↓</kbd>
              Navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-900 border border-slate-800 text-[10px] text-slate-400 rounded px-1.5 shadow-sm">↵</kbd>
              Seleccionar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-900 border border-slate-800 text-[10px] text-slate-400 rounded px-1.5 shadow-sm">ESC</kbd>
              Cerrar
            </span>
          </div>
          <div className="text-[10px] font-extrabold text-slate-500 tracking-wider">
            CLIENTUM <span className="text-emerald-400">OS</span>
          </div>
        </div>

      </div>
    </div>
  );
}
