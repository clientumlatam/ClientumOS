import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab } from '../types';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Search, 
  Users, 
  MessageSquareCode, 
  Globe2,
  TrendingUp,
  ShieldCheck,
  ListOrdered,
  Send,
  FileCode,
  Workflow,
  ArrowLeftRight,
  Server,
  Settings,
  Target,
  Kanban,
  Layout,
  Compass,
  BarChart3,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Bot,
  Mail,
  Zap,
  Building2,
  FileSpreadsheet,
  Cpu,
  Database,
  Settings2,
  User,
  Briefcase,
  Clock,
  DollarSign,
  FileCheck,
  X,
  Menu,
  Filter,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

interface NavGroup {
  key: string;
  title: string;
  shortTitle: string;
  color: string;
  badge?: string;
  icon: React.ElementType;
  items: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [flyoutGroup, setFlyoutGroup] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    config: true,
    audience: true,
    prospecting: true,
    ai_content: true,
    campaigns: true,
    seo: false,
    analytics: true,
    os_infra: true,
    vscrm_suite: false
  });

  // Handle mobile toggle custom event
  useEffect(() => {
    const handleMobileToggle = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('open-mobile-sidebar', handleMobileToggle);
    return () => window.removeEventListener('open-mobile-sidebar', handleMobileToggle);
  }, []);

  const toggleSection = (section: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSections({ [section]: true });
    } else {
      setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    }
  };

  const expandAllSections = () => {
    const allExpanded: Record<string, boolean> = {};
    navGroups.forEach(g => { allExpanded[g.key] = true; });
    setOpenSections(allExpanded);
  };

  const collapseAllSections = () => {
    const allCollapsed: Record<string, boolean> = {};
    navGroups.forEach(g => { allCollapsed[g.key] = false; });
    setOpenSections(allCollapsed);
  };

  const navGroups: NavGroup[] = [
    {
      key: 'config',
      title: '1. Configuración Inicial',
      shortTitle: 'Config',
      color: 'slate',
      badge: '2 mod',
      icon: Settings,
      items: [
        { id: 'settings', label: '1. Configuración & APIs Hub', icon: Settings, badge: 'Unified' },
        { id: 'google_drive', label: '2. Google Drive Workspace', icon: Globe2 },
      ]
    },
    {
      key: 'audience',
      title: '2. Conocer tu Audiencia',
      shortTitle: 'Audiencia',
      color: 'indigo',
      badge: '2 mod',
      icon: Users,
      items: [
        { id: 'icp_builder', label: '1. Perfil ICP & Personas', icon: Target },
        { id: 'contacts', label: '2. Base de Datos LATAM', icon: Users, badge: 'Unified' },
      ]
    },
    {
      key: 'prospecting',
      title: '3. Prospección & Pipeline',
      shortTitle: 'Pipeline',
      color: 'emerald',
      badge: '2 mod',
      icon: Compass,
      items: [
        { id: 'geolocated_prospecting', label: '1. Prospección Maps IA', icon: Compass, badge: 'IA' },
        { id: 'crm_kanban', label: '2. Pipeline CRM & MEDDIC', icon: Kanban, badge: 'CRM' },
      ]
    },
    {
      key: 'ai_content',
      title: '4. IA & Contenido',
      shortTitle: 'IA Studio',
      color: 'purple',
      badge: '3 mod',
      icon: Zap,
      items: [
        { id: 'strategy', label: '1. Estrategia & Copywriter IA', icon: Zap, badge: 'Gemini' },
        { id: 'brochure_generator', label: '2. Brochure & PDF Studio', icon: FileSpreadsheet },
        { id: 'ai_hub', label: '3. Gemini AI & Voice Hub', icon: Sparkles, badge: 'Voice' },
      ]
    },
    {
      key: 'campaigns',
      title: '5. Campañas & Autom.',
      shortTitle: 'Campañas',
      color: 'amber',
      badge: '2 mod',
      icon: Send,
      items: [
        { id: 'email_template_builder', label: '1. Diseñador & Plantillas', icon: Layout },
        { id: 'email_campaigns', label: '2. Campañas & Outreach IA', icon: Send, badge: 'Auto' },
      ]
    },
    {
      key: 'seo',
      title: '6. SEO & Contenidos',
      shortTitle: 'SEO',
      color: 'cyan',
      badge: '3 mod',
      icon: Search,
      items: [
        { id: 'keyword_research', label: '1. Keywords & Mapa Tópico', icon: Search },
        { id: 'on_page_audit', label: '2. Auditoría & Rank Tracker', icon: ShieldCheck },
        { id: 'content_calendar', label: '3. Calendario & SEO Auto', icon: ListOrdered },
      ]
    },
    {
      key: 'analytics',
      title: '7. Analytics & ROI',
      shortTitle: 'Analytics',
      color: 'indigo',
      badge: '2 mod',
      icon: BarChart3,
      items: [
        { id: 'overview', label: '1. Dashboard General & ROI', icon: LayoutDashboard },
        { id: 'chat', label: '2. Asistente CMO IA', icon: MessageSquareCode, badge: 'IA' },
      ]
    },
    {
      key: 'os_infra',
      title: '8. OS & Infraestructura',
      shortTitle: 'Agent OS',
      color: 'sky',
      badge: '3 mod',
      icon: Cpu,
      items: [
        { id: 'agent_os', label: '1. Agent OS & Red Agentes', icon: Cpu, badge: 'Live' },
        { id: 'cmdb', label: '2. Inventario CMDB & Salud', icon: Database, badge: 'CMDB' },
        { id: 'account', label: '3. Mi Cuenta & Seguridad', icon: User, badge: 'Perfil' },
      ]
    },
    {
      key: 'vscrm_suite',
      title: '9. VS-CRM Enterprise',
      shortTitle: 'VS-CRM',
      color: 'emerald',
      badge: '3 mod',
      icon: Briefcase,
      items: [
        { id: 'vscrm_dashboard', label: '1. Dashboard & Clientes VS', icon: LayoutDashboard, badge: 'VS' },
        { id: 'vscrm_projects', label: '2. Proyectos, Tareas & Horas', icon: Briefcase },
        { id: 'vscrm_invoices', label: '3. Centro Financiero & AFIP', icon: FileText, badge: 'AFIP' },
      ]
    }
  ];

  const colorStylesMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    indigo: { bg: 'bg-indigo-500/15', text: 'text-indigo-300 font-semibold', border: 'border-l-indigo-500', iconBg: 'text-indigo-400' },
    emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-300 font-semibold', border: 'border-l-emerald-500', iconBg: 'text-emerald-400' },
    purple: { bg: 'bg-purple-500/15', text: 'text-purple-300 font-semibold', border: 'border-l-purple-500', iconBg: 'text-purple-400' },
    amber: { bg: 'bg-amber-500/15', text: 'text-amber-300 font-semibold', border: 'border-l-amber-500', iconBg: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-500/15', text: 'text-cyan-300 font-semibold', border: 'border-l-cyan-500', iconBg: 'text-cyan-400' },
    sky: { bg: 'bg-sky-500/15', text: 'text-sky-300 font-semibold', border: 'border-l-sky-500', iconBg: 'text-sky-400' },
    slate: { bg: 'bg-slate-700/50', text: 'text-slate-200 font-semibold', border: 'border-l-slate-400', iconBg: 'text-slate-300' },
  };

  // Filter groups and items based on search query
  const filteredGroups = navGroups.map(group => {
    if (!searchQuery.trim()) return group;
    const query = searchQuery.toLowerCase();
    const matchesGroupTitle = group.title.toLowerCase().includes(query) || group.shortTitle.toLowerCase().includes(query);
    const matchingItems = group.items.filter(item => 
      item.label.toLowerCase().includes(query) || (item.badge && item.badge.toLowerCase().includes(query))
    );
    if (matchesGroupTitle) return group;
    return { ...group, items: matchingItems };
  }).filter(group => group.items.length > 0);

  const totalFilteredCount = filteredGroups.reduce((acc, g) => acc + g.items.length, 0);

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 h-[72px] flex items-center justify-between shrink-0">
        <div className={`flex items-center space-x-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-[#0A2558] overflow-hidden flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0 border border-slate-700/50">
            <img src="/favicon.svg" alt="Clientum Logo" className="w-8 h-8" referrerPolicy="no-referrer" />
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap">
              <h1 className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                ClientumLatam
              </h1>
              <p className="text-[10px] text-indigo-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> CRM & AI Marketing
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Workflow Shortcuts */}
      <div className={`p-3 border-b border-slate-800/60 bg-slate-950/25 flex flex-col gap-2 shrink-0 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        <button
          onClick={() => {
            setActiveTab('workflow');
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'workflow'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300'
          } ${isCollapsed ? 'justify-center' : ''}`}
          title="Workflow — Secuencia de uso inicio a fin"
        >
          <Workflow className={`w-4 h-4 ${activeTab === 'workflow' ? 'text-white' : 'text-emerald-400'}`} />
          {!isCollapsed && <span className="text-xs font-bold font-sans">Workflow Inicio a Fin</span>}
        </button>
        <button
          onClick={() => {
            setActiveTab('public_website');
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'public_website'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300'
          } ${isCollapsed ? 'justify-center' : ''}`}
          title="Ver Sitio Web Público & LMS Academia"
        >
          <Globe2 className={`w-4 h-4 ${activeTab === 'public_website' ? 'text-white' : 'text-indigo-400 animate-pulse'}`} />
          {!isCollapsed && <span className="text-xs font-bold font-sans">Sitio Web & LMS</span>}
        </button>
      </div>

      {/* Real-time Module Search Filter (Expanded mode) */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-1 border-b border-slate-800/40 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar módulos..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 font-medium px-1">
            <span>
              {searchQuery ? `${totalFilteredCount} módulos encontrados` : 'Grupos de trabajo'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAllSections}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Expandir
              </button>
              <span>•</span>
              <button
                onClick={collapseAllSections}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Plegar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Groups Area */}
      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-3'} py-3 overflow-y-auto custom-scrollbar space-y-2.5 relative`}>
        {/* Persistent Rail Mode */}
        {isCollapsed ? (
          <div className="flex flex-col gap-2 items-center">
            {navGroups.map((group) => {
              const GroupIcon = group.icon;
              const hasActiveChild = group.items.some(item => item.id === activeTab);
              const isFlyoutOpen = flyoutGroup === group.key;

              return (
                <div key={group.key} className="relative group/rail w-full flex justify-center">
                  <button
                    onClick={() => {
                      setFlyoutGroup(isFlyoutOpen ? null : group.key);
                    }}
                    onMouseEnter={() => setFlyoutGroup(group.key)}
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                      hasActiveChild
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : isFlyoutOpen
                        ? 'bg-slate-800 text-indigo-300'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={group.title}
                  >
                    <GroupIcon className="w-5 h-5" />
                    <span className="text-[9px] font-bold tracking-tighter truncate max-w-[42px]">
                      {group.shortTitle}
                    </span>

                    {hasActiveChild && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 border-2 border-slate-900 rounded-full animate-pulse" />
                    )}
                  </button>

                  {/* Persistent Rail Flyout Popover */}
                  {isFlyoutOpen && (
                    <div
                      onMouseLeave={() => setFlyoutGroup(null)}
                      className="absolute left-16 top-0 z-50 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-3 space-y-2 animate-in fade-in slide-in-from-left-2 duration-150"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <GroupIcon className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-bold text-white">{group.title}</span>
                        </div>
                        <button
                          onClick={() => setFlyoutGroup(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id);
                                setFlyoutGroup(null);
                                setIsMobileOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{item.label}</span>
                              </div>
                              {item.badge && (
                                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Standard Accordion Mode */
          filteredGroups.map((group) => {
            const isOpen = searchQuery.trim() ? true : openSections[group.key];
            const hasActiveChild = group.items.some(item => item.id === activeTab);
            const GroupIcon = group.icon;

            return (
              <div key={group.key} className="rounded-2xl bg-slate-800/30 border border-slate-800/60 p-1 transition-all">
                <button 
                  onClick={() => toggleSection(group.key)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors rounded-xl ${
                    hasActiveChild ? 'text-indigo-300 bg-indigo-950/40 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <GroupIcon className={`w-3.5 h-3.5 ${hasActiveChild ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate">{group.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {group.badge && (
                      <span className="text-[9px] lowercase font-semibold px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {group.badge}
                      </span>
                    )}
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileOpen(false);
                          }}
                          className={`w-full flex items-center justify-between relative px-2.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                            isActive
                              ? 'bg-indigo-950/80 text-white shadow-md shadow-indigo-950/40 border border-indigo-500/30 font-bold'
                              : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/60" />
                          )}
                          <div className={`flex items-center space-x-2.5 truncate ${isActive ? 'pl-2' : ''}`}>
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                              isActive ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-700 text-slate-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>

      {/* Footer Info & Collapse Rail Toggle */}
      <div className="p-3 border-t border-slate-800 flex flex-col gap-2 bg-slate-900/90 shrink-0">
        {!isCollapsed && (
          <div className="bg-slate-800/70 rounded-xl p-2.5 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="truncate">Motor Gemini 2.5 Activo</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        )}

        <button 
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setFlyoutGroup(null);
          }}
          className={`flex items-center text-slate-400 hover:text-white transition-colors py-1.5 px-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 ${
            isCollapsed ? 'justify-center w-full' : 'justify-between text-xs font-semibold'
          }`}
          title={isCollapsed ? 'Expandir Menú Completo' : 'Plegar a Rail de Navegación'}
        >
          {!isCollapsed && <span>Plegar a Rail de Navegación</span>}
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5 text-indigo-400" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Rail / Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shrink-0 hidden md:flex transition-all duration-300 relative z-30`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-80 max-w-[85%] bg-slate-900 h-full shadow-2xl flex flex-col z-10">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-3 top-4 text-slate-400 hover:text-white p-2 z-20"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}



