import React from 'react';
import {
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
  Layers,
  Database,
  MessageSquare,
  Receipt,
  Utensils,
  ShoppingCart,
  Globe,
  Palette,
  CreditCard,
  Target,
  Bot,
  Cpu,
  BookOpen,
  MapPin,
  Send,
  FileText,
  Laptop,
  UserCheck,
  Workflow,
  FileSpreadsheet,
  LogOut
} from 'lucide-react';
import { useCRM } from '@clientum/ui';
import { ActiveTab } from '@clientum/types';
import { ClientumLogo } from '../common/ClientumLogo';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    opportunities,
    tasks,
    currentUser,
    setIsProfileModalOpen,
    setIsCommandPaletteOpen,
    openNewRecordModal,
    openAICopilot,
    setSelectedRecord,
    logout,
    showToast,
    t,
  } = useCRM();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;
  const activeOpportunities = opportunities.filter((o) => o.stage !== 'won' && o.stage !== 'lost');
  const pipelineValue = activeOpportunities.reduce((acc, o) => acc + o.amount, 0);

  const commercialNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType; badge?: string | number; badgeColor?: string }> = [
    { id: 'opportunities', label: t('opportunities') || 'Oportunidades', icon: Briefcase, badge: `$${Math.round(pipelineValue / 1000)}k`, badgeColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
    { id: 'companies', label: t('companies') || 'Empresas', icon: Building2 },
    { id: 'people', label: t('people') || 'Personas', icon: Users2 },
    { id: 'tasks', label: t('tasks') || 'Tareas', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined, badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
    { id: 'analytics', label: t('analytics') || 'Analíticas & BI', icon: BarChart3 },
    { id: 'mapsProspecting', label: 'Prospección Maps IA', icon: MapPin },
    { id: 'meddic', label: 'Lead Scoring MEDDIC', icon: Target },
  ];

  const clientumEngineNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType; badge?: string | number; badgeColor?: string }> = [
    { id: 'customObjects', label: 'Custom Objects Studio', icon: Database, badge: 'Core', badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
    { id: 'workflows', label: 'Workflows & Flowchart', icon: Workflow, badge: 'Flow', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
    { id: 'csvStudio', label: 'CSV Import & Export Studio', icon: FileSpreadsheet },
  ];

  const whatsappNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType; badge?: string | number; badgeColor?: string }> = [
    { id: 'whatsapp', label: 'WhatsApp CRM', icon: MessageSquare, badge: 'PRO', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold' },
    { id: 'chatbot', label: 'Chatbot WhatsApp 24/7', icon: Bot },
    { id: 'campaigns', label: 'Campañas & Broadcast', icon: Send },
  ];

  const aiNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType }> = [
    { id: 'aiAssistant', label: 'Asistente IA Gemini 2.5', icon: Sparkles },
    { id: 'gtmStrategy', label: 'Generador Estrategias GTM', icon: Compass },
    { id: 'sdrOutreach', label: 'Agente Outreach (SDR)', icon: Cpu },
    { id: 'adCopy', label: 'AI Ad Copy Studio', icon: FileText },
  ];

  const operationsNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType }> = [
    { id: 'erp', label: 'ERP & Facturación AFIP', icon: Receipt },
    { id: 'payments', label: 'Cobros MercadoPago', icon: CreditCard },
    { id: 'clientPortal', label: 'Portal del Cliente', icon: UserCheck },
    { id: 'restaurant', label: 'Restaurantes & KDS', icon: Utensils },
    { id: 'ecommerce', label: 'E-commerce Orders', icon: ShoppingCart },
  ];

  const marketingNav: Array<{ id: ActiveTab; label: string; icon: React.ElementType }> = [
    { id: 'seoSuite', label: 'Suite SEO Completa', icon: Globe },
    { id: 'webDev', label: 'Desarrollo Web & Widgets', icon: Laptop },
    { id: 'powerSuite', label: 'Power Suite (16 Modul.)', icon: Layers },
    { id: 'settings', label: t('settings') || 'Configuración', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        id="clientum-sidebar"
        className={`w-64 bg-[#0d0f14] border-r border-[#1e222d] flex flex-col h-full shrink-0 select-none text-sm z-40 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
      {/* Workspace Switcher Header */}
      <div className="p-3.5 border-b border-[#1e222d] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <ClientumLogo className="w-7 h-7 shadow-md" />
          <div className="min-w-0 flex flex-col">
            <span className="font-semibold text-xs text-white truncate flex items-center gap-1.5">
              ClientumCRM Workspace
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
            <span className="text-[11px] text-slate-400 truncate">Acme Technologies HQ</span>
          </div>
        </div>

        <button
          id="sidebar-quick-create-btn"
          onClick={() => openNewRecordModal('opportunity')}
          className="w-6 h-6 rounded flex items-center justify-center bg-[#1e2330] hover:bg-blue-600 text-slate-300 hover:text-white transition-all shadow-sm"
          title="Create new record"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Search trigger */}
      <div className="p-2.5">
        <button
          id="sidebar-search-button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-[#151821] hover:bg-[#1c202d] text-slate-400 hover:text-slate-200 border border-[#232838] transition-all text-xs group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 group-hover:text-blue-400 transition-colors" />
            Search or jump to...
          </span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2330] text-slate-400 border border-[#2b3244]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {/* Comercial */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Comercial & CRM
          </div>
          <nav className="space-y-0.5">
            {commercialNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${item.badgeColor || 'bg-[#222736] text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ClientumCRM Core Platform Engine */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            ClientumCRM Engine & Studio
          </div>
          <nav className="space-y-0.5">
            {clientumEngineNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${item.badgeColor || 'bg-[#222736] text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* WhatsApp & Omnicanal */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            WhatsApp & Omnicanal
          </div>
          <nav className="space-y-0.5">
            {whatsappNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${item.badgeColor || 'bg-[#222736] text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* IA & Estrategia */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Inteligencia Artificial
          </div>
          <nav className="space-y-0.5">
            {aiNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Operaciones & Finanzas */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            ERP & Finanzas
          </div>
          <nav className="space-y-0.5">
            {operationsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Marketing & Sistema */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Marketing & Sistema
          </div>
          <nav className="space-y-0.5">
            {marketingNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Sales Copilot Action Card */}
        <div className="px-1">
          <div
            id="sidebar-copilot-card"
            onClick={() => openAICopilot()}
            className="p-3 rounded-lg bg-gradient-to-br from-indigo-950/40 via-blue-950/30 to-purple-950/30 border border-indigo-500/30 hover:border-indigo-400/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                ClientumCRM AI Copilot
              </span>
              <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                Smart
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              Deal intelligence, auto-draft emails & meeting summaries.
            </p>
          </div>
        </div>

        {/* High-priority Deals Quick Access */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Key Accounts</span>
            <Compass className="w-3 h-3 text-slate-400" />
          </div>
          <div className="space-y-0.5">
            {opportunities.slice(0, 3).map((opp) => (
              <button
                key={opp.id}
                id={`sidebar-deal-${opp.id}`}
                onClick={() => setSelectedRecord({ type: 'opportunity', id: opp.id })}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left hover:bg-[#141720] text-slate-400 hover:text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="truncate text-xs">{opp.name}</span>
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
        className="p-3 border-t border-[#1e222d] bg-[#0b0d12] flex items-center justify-between cursor-pointer hover:bg-[#121620] transition-colors group"
        title="Ver Perfil y Configuración de Cuenta"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-[#2d3345]"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0b0d12]" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-xs font-medium text-slate-200 truncate group-hover:text-blue-400 transition-colors">{currentUser.name}</span>
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
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1a1e2a] transition-colors"
            title="Configuración de Base de Datos"
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
            className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Cerrar Sesión (ClientumCRM)"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};
