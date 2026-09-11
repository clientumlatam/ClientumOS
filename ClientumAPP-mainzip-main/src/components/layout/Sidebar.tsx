import React, { useState } from 'react';
import {
  Home,
  Calendar,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  BarChart3,
  Settings,
  Sparkles,
  Search,
  Plus,
  Compass,
  ChevronDown,
  ChevronRight,
  Database,
  MessageSquare,
  Receipt,
  CreditCard,
  Target,
  Bot,
  Cpu,
  MapPin,
  Send,
  Workflow,
  FileSpreadsheet,
  FileCheck,
  GraduationCap,
  Store,
  LogOut,
  ExternalLink,
  Globe,
  Mail,
  Inbox,
  FolderKanban,
  ScanSearch,
  KeyRound,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';
import { ClientumLogo } from '../common/ClientumLogo';
import { ModuleCredentialsModal } from '../settings/ModuleCredentialsModal';
import { moduleNeedsUserCredentials } from '../../data/moduleCredentials';

type SidebarNavItem = {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  configurable?: boolean;
  subItems?: SidebarNavItem[];
  defaultExpanded?: boolean;
};

const hasActiveDescendant = (item: SidebarNavItem, activeTab: ActiveTab): boolean =>
  item.subItems?.some((subItem) => subItem.id === activeTab || hasActiveDescendant(subItem, activeTab)) ?? false;

const SidebarNavRow: React.FC<{
  item: SidebarNavItem;
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onConfig: (event: React.MouseEvent, moduleId: ActiveTab) => void;
  depth?: number;
}> = ({ item, activeTab, onNavigate, onConfig, depth = 0 }) => {
  const Icon = item.icon;
  const hasSubItems = Boolean(item.subItems?.length);
  const hasActiveChild = hasActiveDescendant(item, activeTab);
  const [isExpanded, setIsExpanded] = useState(item.defaultExpanded ?? false);
  const isActive = activeTab === item.id || hasActiveChild;
  const canConfigureCredentials = item.configurable ?? moduleNeedsUserCredentials(item.id);
  const isSubmenuExpanded = isExpanded || hasActiveChild;

  return (
    <div className={`${depth > 0 ? 'ml-2 border-l border-[var(--sidebar-border)] pl-1.5' : ''}`}>
      <div className="flex w-full items-center gap-1">
        <button
          id={`nav-item-${item.id}`}
          onClick={() => onNavigate(item.id)}
          className={`min-w-0 flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
            isActive
              ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-950/50 border border-blue-500'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
            <span className="truncate">{item.label}</span>
          </div>
          {item.badge !== undefined && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${isActive ? 'bg-blue-700 text-white border border-blue-400/30' : (item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700')}`}>
              {item.badge}
            </span>
          )}
        </button>
        {hasSubItems && (
          <button
            type="button"
            id={`nav-expand-${item.id}`}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className={`shrink-0 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200 ${hasActiveChild ? 'text-blue-400' : ''}`}
            title={isSubmenuExpanded ? `Ocultar opciones de ${item.label}` : `Mostrar opciones de ${item.label}`}
            aria-label={isSubmenuExpanded ? `Ocultar opciones de ${item.label}` : `Mostrar opciones de ${item.label}`}
            aria-expanded={isSubmenuExpanded}
          >
            {isSubmenuExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        )}
        {canConfigureCredentials && (
          <button
            type="button"
            onClick={(event) => onConfig(event, item.id)}
            className="shrink-0 rounded-md p-1.5 text-slate-500 opacity-0 transition-all hover:bg-cyan-400/10 hover:text-cyan-300 focus:opacity-100 group-hover:opacity-100"
            title={`Configurar credenciales de ${item.label}`}
            aria-label={`Configurar credenciales de ${item.label}`}
          >
            <KeyRound className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {hasSubItems && isSubmenuExpanded && (
        <div className="mt-0.5 space-y-0.5">
          {item.subItems?.map((subItem) => (
            <SidebarNavRow
              key={subItem.id}
              item={subItem}
              activeTab={activeTab}
              onNavigate={onNavigate}
              onConfig={onConfig}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    opportunities,
    companies,
    people,
    tasks,
    activities,
    currentUser,
    setIsProfileModalOpen,
    setIsCommandPaletteOpen,
    openNewRecordModal,
    openAICopilot,
    setSelectedRecord,
    logout,
    showToast,
    exitToPublicSite,
    webmailEmails,
  } = useCRM();

  const [configModuleId, setConfigModuleId] = useState<ActiveTab | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'Operaciones & Finanzas': true,
    'Sistema & Configuración': true,
  });

  const unreadWebmailCount = webmailEmails ? webmailEmails.filter((e) => e.folder === 'inbox' && !e.isRead).length : 0;

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const handleModuleConfig = (event: React.MouseEvent, moduleId: ActiveTab) => {
    event.stopPropagation();
    setConfigModuleId(moduleId);
  };

  type SidebarSection = {
    id: string;
    label: string;
    items: SidebarNavItem[];
  };

  const navigationSections: SidebarSection[] = [
    {
      id: 'dashboard',
      label: 'Panel de control & análisis',
      items: [
        { id: 'dashboard', label: 'Resumen Ejecutivo', icon: Home },
        { id: 'analytics', label: 'Reportes & BI', icon: BarChart3 },
        { id: 'featureHub', label: 'Centro de Funciones', icon: ScanSearch, badge: 'Activo', badgeColor: 'bg-violet-100 text-violet-800 font-semibold' },
      ],
    },
    {
      id: 'sales',
      label: 'Ventas & Clientes',
      items: [
        { id: 'people', label: 'Contactos & Empresas', icon: Users2, badge: people.length, subItems: [{ id: 'companies', label: 'Empresas', icon: Building2, badge: companies.length }] },
        { id: 'opportunities', label: 'Pipeline de Negocios', icon: Briefcase, badge: 'Kanban', badgeColor: 'bg-blue-100 text-blue-800', subItems: [{ id: 'meddic', label: 'Lead Scoring MEDDIC', icon: Target }] },
        { id: 'tasks', label: 'Actividades & Agenda', icon: CheckSquare, badge: tasks.filter((task) => task.status !== 'Completed').length, badgeColor: 'bg-amber-100 text-amber-800', subItems: [{ id: 'calendar', label: 'Calendario', icon: Calendar }, { id: 'activityInbox', label: 'Notas y llamadas', icon: Inbox, badge: activities.length, badgeColor: 'bg-violet-100 text-violet-800' }] },
        { id: 'propuestas', label: 'Propuestas & Presupuestos', icon: FileCheck, badge: 'PDF', badgeColor: 'bg-emerald-100 text-emerald-800' },
        { id: 'googleMaps', label: 'Prospección Mapa B2B', icon: MapPin, badge: 'Maps', badgeColor: 'bg-blue-100 text-blue-800' },
      ],
    },
    {
      id: 'communication',
      label: 'Centro de Comunicación',
      items: [
        { id: 'whatsapp', label: 'Bandeja Omnicanal', icon: Inbox, badge: 'LIVE', badgeColor: 'bg-emerald-100 text-emerald-800 font-bold', subItems: [{ id: 'messages', label: 'Mensajes', icon: MessageSquare, badge: 12, badgeColor: 'bg-blue-100 text-blue-800' }, { id: 'webmail', label: 'Webmail Cloudflare', icon: Mail, badge: unreadWebmailCount > 0 ? unreadWebmailCount : 'GTM', badgeColor: unreadWebmailCount > 0 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 font-semibold' }] },
        { id: 'chatbot', label: 'Bots & Atención Automática', icon: Bot },
        { id: 'campaigns', label: 'Campañas Masivas', icon: Send },
      ],
    },
    {
      id: 'ai',
      label: 'IA & Automatización',
      items: [
        { id: 'agenteOS', label: 'Agentes & Copilot', icon: Cpu, badge: '14', badgeColor: 'bg-blue-100 text-blue-800 font-bold', subItems: [{ id: 'aiAssistant', label: 'Asistente Gemini', icon: Sparkles }, { id: 'sdrOutreach', label: 'Agente SDR Outreach', icon: Bot }] },
        { id: 'workflows', label: 'Automatizaciones & Flujos', icon: Workflow },
        { id: 'gtmStrategy', label: 'Estrategias GTM', icon: Compass },
      ],
    },
    {
      id: 'operations',
      label: 'Operaciones & Finanzas',
      items: [
        { id: 'erp', label: 'Facturación AFIP & ERP', icon: Receipt, badge: 'CAE', badgeColor: 'bg-blue-100 text-blue-800 font-bold', subItems: [{ id: 'operations', label: 'Operaciones internas', icon: FolderKanban, badge: 'Nuevo', badgeColor: 'bg-emerald-100 text-emerald-800 font-bold' }] },
        { id: 'payments', label: 'Suscripción Clientum', icon: CreditCard, configurable: false },
        { id: 'tiendaDigital', label: 'Tienda Digital WhatsApp', icon: Store, badge: 'Catálogo', badgeColor: 'bg-emerald-100 text-emerald-800' },
        { id: 'campusLMS', label: 'Campus Academia LMS', icon: GraduationCap, badge: 'LMS', badgeColor: 'bg-purple-100 text-purple-800' },
      ],
    },
    {
      id: 'system',
      label: 'Sistema & Configuración',
      items: [
        { id: 'customObjects', label: 'Estructura de Datos', icon: Database, subItems: [{ id: 'csvStudio', label: 'Importar / Exportar CSV', icon: FileSpreadsheet }] },
        { id: 'domainManager', label: 'Gestor de Dominios', icon: Globe },
        { id: 'settings', label: 'Ajustes Generales', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        id="clientum-sidebar"
        className={`w-64 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] text-[var(--sidebar-text-primary)] flex flex-col h-full shrink-0 select-none text-sm z-40 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Workspace Switcher Header */}
        <div className="p-3.5 border-b border-[var(--sidebar-border)] flex items-center justify-between bg-[var(--sidebar-header-bg)]">
          <div
            id="sidebar-brand-container"
            onClick={exitToPublicSite}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer select-none group"
            title="ClientumCRM - Ir al Sitio Público"
          >
            {/* Professional Minimalist Brand Logo Placeholder */}
            <div
              id="sidebar-brand-logo-placeholder"
              className="relative w-8 h-8 rounded-lg bg-slate-950 border border-slate-700/80 shadow-2xs flex items-center justify-center group-hover:border-blue-400 transition-all duration-200 shrink-0"
            >
              <div className="w-full h-full rounded-[7px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center p-1 overflow-hidden">
                <ClientumLogo className="w-4.5 h-4.5 text-white group-hover:scale-105 transition-transform" />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900"
                title="Sistema Activo"
              />
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-0.5 leading-none">
                <span className="font-extrabold text-xs text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  Clientum
                </span>
                <span className="font-extrabold text-xs text-blue-400 tracking-tight">
                  CRM
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-1 group-hover:text-slate-200 transition-colors" />
              </div>
              <span className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                Espacio Comercial HQ
              </span>
            </div>
          </div>

          <button
            id="sidebar-quick-create-btn"
            onClick={() => openNewRecordModal('opportunity')}
            className="w-6 h-6 rounded-md flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs cursor-pointer shrink-0 ml-2"
            title="Nuevo Registro"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Search & Public Site Trigger */}
        <div className="p-2.5 space-y-1.5 border-b border-[var(--sidebar-border)] bg-[var(--sidebar-header-bg)]/80">
          <button
            id="sidebar-search-button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[var(--sidebar-search-bg)] hover:bg-slate-800/80 text-slate-300 hover:text-white border border-[var(--sidebar-search-border)] hover:border-slate-600 transition-all text-xs group cursor-pointer shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span>Buscar en todo el CRM...</span>
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Quick exit to public site */}
          <button
            onClick={exitToPublicSite}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/70 text-blue-300 hover:text-blue-100 border border-blue-900/70 hover:border-blue-700/80 transition-all text-xs font-semibold cursor-pointer"
            title="Ir al Sitio Web y Catálogo Público"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver Portal Público</span>
            </span>
            <ExternalLink className="w-3 h-3 text-blue-400" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar bg-[var(--sidebar-bg)]">
          {navigationSections.map((section) => {
            const sectionHasActiveItem = section.items.some((item) => item.id === activeTab || hasActiveDescendant(item, activeTab));
            const storedCollapsed = collapsedSections[section.label] ?? false;
            const isCollapsed = storedCollapsed && !sectionHasActiveItem;
            return (
            <div key={section.label} className="border-t border-[var(--sidebar-border)] pt-3 first:border-t-0 first:pt-0">
              <button
                type="button"
                id={`nav-section-${section.id}`}
                className="w-full flex items-center justify-between px-2 pb-1.5 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text-primary)] cursor-pointer"
                onClick={() => setCollapsedSections((previous) => ({ ...previous, [section.label]: !storedCollapsed }))}
                aria-expanded={!isCollapsed}
              >
                <span>{section.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
              </button>
              {!isCollapsed && <nav className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavRow key={item.id} item={item} activeTab={activeTab} onNavigate={handleNavClick} onConfig={handleModuleConfig} />
                ))}
              </nav>}
            </div>
            );
          })}

          {/* AI Sales Copilot Action Card */}
          <div className="px-1">
            <div
              id="sidebar-copilot-card"
              onClick={() => openAICopilot()}
              className="p-3 rounded-xl bg-gradient-to-br from-blue-950/80 to-indigo-950/80 border border-blue-800/60 hover:border-blue-500 cursor-pointer transition-all group shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  Clientum Copilot
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-200 font-mono font-bold border border-blue-700/50">
                  Gemini
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                Inteligencia de cuentas, redacción de propuestas y resúmenes de reuniones.
              </p>
            </div>
          </div>

          {/* Key Accounts Quick Access */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Cuentas Clave</span>
              <Compass className="w-3 h-3 text-slate-500" />
            </div>
            <div className="space-y-0.5">
              {opportunities.slice(0, 3).map((opp) => (
                <button
                  key={opp.id}
                  id={`sidebar-deal-${opp.id}`}
                  onClick={() => setSelectedRecord({ type: 'opportunity', id: opp.id })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left hover:bg-slate-800/70 text-slate-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="truncate text-xs font-medium">{opp.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    ${Math.round(opp.amount / 1000)}k
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div 
          onClick={() => setIsProfileModalOpen(true)}
          className="p-3 border-t border-[var(--sidebar-border)] bg-[var(--sidebar-footer-bg)] flex items-center justify-between cursor-pointer hover:bg-slate-900/90 transition-colors group"
          title="Ver Perfil y Configuración de Cuenta"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-600 shadow-xs"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate">{currentUser.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="sidebar-schema-btn"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('settings');
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Configuración"
            >
              <Database className="w-3.5 h-3.5" />
            </button>
            <button
              id="sidebar-logout-btn"
              onClick={(e) => {
                e.stopPropagation();
                logout();
                showToast('Has cerrado sesión en ClientumCRM', 'info');
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
      <ModuleCredentialsModal moduleId={configModuleId} onClose={() => setConfigModuleId(null)} />
    </>
  );
};
