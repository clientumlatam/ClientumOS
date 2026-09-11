import React from 'react';
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  Download,
  RotateCcw,
  LayoutGrid,
  List,
  X,
  Globe,
  Menu,
  ExternalLink,
  Settings2,
  MoreHorizontal,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Language, StageId } from '../../types';
import { ClientumLogo } from '../common/ClientumLogo';
import { moduleNeedsUserCredentials } from '../../data/moduleCredentials';
import { ModuleCredentialsModal } from '../settings/ModuleCredentialsModal';

export const Navbar: React.FC = () => {
  const {
    toggleMobileSidebar,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    filterState,
    setFilterState,
    resetFilters,
    openNewRecordModal,
    openAICopilot,
    exportOpportunitiesCSV,
    resetToDemoData,
    language,
    setLanguage,
    t,
    opportunities,
    companies,
    people,
    tasks,
    exitToPublicSite,
  } = useCRM();

  const [isConfigOpen, setIsConfigOpen] = React.useState(false);
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const configModuleId = activeTab === 'mapsProspecting' ? 'googleMaps' : activeTab;
  const hasModuleCredentials = moduleNeedsUserCredentials(configModuleId);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { name: 'Resumen Ejecutivo', count: undefined, desc: 'Pipeline de ventas y métricas clave' };
      case 'featureHub':
        return { name: 'Centro de funciones', count: 6, desc: 'Conecta, protege y amplía tu espacio de trabajo' };
      case 'opportunities':
        return { name: t('opportunities') || 'Negocios', count: opportunities.length, desc: t('pipeline') || 'Embudo comercial' };
      case 'companies':
        return { name: t('companies') || 'Empresas', count: companies.length, desc: t('allCompanies') || 'Cuentas corporativas' };
      case 'people':
        return { name: t('people') || 'Contactos', count: people.length, desc: t('allPeople') || 'Directorio de personas' };
      case 'tasks':
        return { name: t('tasks') || 'Tareas', count: tasks.length, desc: t('allTasks') || 'Actividades comerciales' };
      case 'calendar':
        return { name: 'Calendario', count: tasks.filter((task) => task.status !== 'Completed').length, desc: 'Agenda comercial y próximos seguimientos' };
      case 'analytics':
        return { name: t('analytics') || 'Analíticas & BI', count: undefined, desc: 'Rendimiento y conversión' };
      case 'activityInbox':
        return { name: 'Actividades & Agenda', count: undefined, desc: 'Notas, llamadas y seguimiento comercial' };
      case 'propuestas':
        return { name: 'Propuestas & Presupuestos', count: undefined, desc: 'Cotizaciones y propuestas PDF' };
      case 'googleMaps':
      case 'mapsProspecting':
        return { name: 'Prospección B2B', count: undefined, desc: 'Búsqueda geolocalizada de prospectos' };
      case 'meddic':
        return { name: 'Lead Scoring MEDDIC', count: undefined, desc: 'Evaluación y calificación de oportunidades' };
      case 'agenteOS':
        return { name: 'Agentes & Copilot', count: 14, desc: 'Agentes especializados y asistencia inteligente' };
      case 'aiAssistant':
        return { name: 'Asistente Gemini', count: undefined, desc: 'Asistencia estratégica con IA' };
      case 'sdrOutreach':
        return { name: 'Agente SDR Outreach', count: undefined, desc: 'Prospección y seguimiento comercial' };
      case 'workflows':
        return { name: 'Automatizaciones & Flujos', count: undefined, desc: 'Triggers, condiciones y acciones automáticas' };
      case 'operations':
        return { name: 'Operaciones internas', count: undefined, desc: 'Gestión operativa del espacio comercial' };
      case 'payments':
        return { name: 'Cobros & Pagos', count: undefined, desc: 'Checkouts y estado de pagos' };
      case 'tiendaDigital':
        return { name: 'Tienda Digital WhatsApp', count: undefined, desc: 'Catálogo y pedidos digitales' };
      case 'campusLMS':
        return { name: 'Campus Academia LMS', count: undefined, desc: 'Cursos y capacitación comercial' };
      case 'whatsapp':
        return { name: 'WhatsApp Omnicanal', count: 12, desc: 'Bandeja centralizada y chats en tiempo real' };
      case 'messages':
        return { name: 'Mensajes', count: 12, desc: 'Centro unificado de conversaciones' };
      case 'erp':
        return { name: 'ERP & Facturación AFIP', count: undefined, desc: 'Comprobantes fiscales A, B y C con CAE automático' };
      case 'settings':
        return { name: t('settings') || 'Configuración', count: undefined, desc: 'Ajustes del espacio y permisos' };
      default:
        return { name: 'Clientum CRM', count: undefined, desc: 'Suite Comercial' };
    }
  };

  const currentMeta = getTitle();
  const hasActiveFilters =
    Boolean(filterState.search) ||
    filterState.stage !== 'all' ||
    filterState.owner !== 'all' ||
    filterState.priority !== 'all';

  return (
    <>
    <header
      id="clientum-top-navbar"
      className="crm-top-navbar h-14 flex items-center justify-between px-4 gap-4 shrink-0 z-10 select-none"
    >
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 md:hidden transition-colors cursor-pointer"
          title="Abrir Menú"
        >
          <Menu className="w-4 h-4 text-slate-700" />
        </button>

        {/* Dashboard Minimalist Brand Logo Placeholder & ClientumCRM Title */}
        <div
          id="dashboard-header-brand"
          onClick={exitToPublicSite}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0 pr-3 border-r border-slate-200"
          title="ClientumCRM - Ir al Sitio Público"
        >
          <div
            id="dashboard-brand-logo-placeholder"
            className="relative w-8 h-8 rounded-lg bg-slate-900 border border-slate-200/90 shadow-2xs flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-xs transition-all duration-200 shrink-0"
          >
            <div className="w-full h-full rounded-[7px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center p-1 overflow-hidden">
              <ClientumLogo className="w-4.5 h-4.5 text-white group-hover:scale-105 transition-transform" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"
              title="Sistema Activo"
            />
          </div>
          <div className="flex items-center gap-0.5 leading-none">
            <span className="text-xs font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              Clientum
            </span>
            <span className="text-xs font-extrabold text-blue-600 tracking-tight">
              CRM
            </span>
          </div>
        </div>

        <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {currentMeta.name}
          {currentMeta.count !== undefined && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-mono font-bold border border-blue-200">
              {currentMeta.count}
            </span>
          )}
        </h1>
        <span className="text-slate-500 text-xs hidden md:inline truncate border-l border-slate-200 pl-3">
          {currentMeta.desc}
        </span>
      </div>

      {/* Center Search & Filters */}
      <div className="flex-1 max-w-md hidden sm:flex items-center gap-2">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="navbar-search-input"
            type="text"
            placeholder={`Filtrar en ${currentMeta.name.toLowerCase()}...`}
            value={filterState.search}
            onChange={(e) => setFilterState((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 pl-8 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
          />
          {filterState.search && (
            <button
              id="clear-search-btn"
              onClick={() => setFilterState((prev) => ({ ...prev, search: '' }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Stage Filter Dropdown for Opportunities */}
        {activeTab === 'opportunities' && (
          <select
            id="navbar-stage-filter"
            value={filterState.stage || 'all'}
            onChange={(e) => setFilterState((prev) => ({ ...prev, stage: e.target.value as StageId | 'all' }))}
            className="bg-slate-50 text-xs text-slate-800 px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs font-medium"
          >
            <option value="all">Todas las etapas</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {t(`stage_${s.id}` as any) || s.name}
              </option>
            ))}
          </select>
        )}

        {hasActiveFilters && (
          <button
            id="navbar-reset-filters-btn"
            onClick={resetFilters}
            className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline shrink-0 flex items-center gap-1 font-semibold cursor-pointer"
          >
            {t('cancel') || 'Limpiar'}
          </button>
        )}
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2">
        {hasModuleCredentials && (
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-cyan-500/25 bg-cyan-50 px-2.5 py-1.5 text-xs font-semibold text-cyan-700 shadow-xs transition-colors hover:bg-cyan-100"
            title={`Configurar API de ${currentMeta.name}`}
          >
            <Settings2 className="h-3.5 w-3.5" />
            <span>Configurar API</span>
          </button>
        )}

        {/* View Mode Switcher (Kanban vs Table) */}
        {activeTab === 'opportunities' && (
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              id="viewmode-kanban-btn"
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista Tablero"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Kanban</span>
            </button>
            <button
              id="viewmode-table-btn"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista Tabla"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Tabla</span>
            </button>
          </div>
        )}

        {/* Notifications moved out of the sidebar shortcuts and into the global topbar. */}
        <button
          id="navbar-notifications-btn"
          onClick={() => setActiveTab('tasks')}
          className="relative flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-600 shadow-xs transition-colors hover:bg-blue-50 hover:text-blue-700"
          title="Ver notificaciones y tareas pendientes"
          aria-label="Ver notificaciones y tareas pendientes"
        >
          <Bell className="h-3.5 w-3.5" />
          {tasks.filter((task) => task.status !== 'Completed').length > 0 && (
            <span className="absolute -right-1 -top-1 min-w-4 rounded-full border border-white bg-amber-500 px-1 text-center text-[9px] font-bold leading-4 text-white">
              {tasks.filter((task) => task.status !== 'Completed').length}
            </span>
          )}
        </button>

        {/* AI Sales Copilot Button */}
        <button
          id="navbar-ai-copilot-btn"
          onClick={() => openAICopilot()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all shadow-xs cursor-pointer group"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* Export CSV for Opportunities */}
        {activeTab === 'opportunities' && (
          <button
            id="navbar-export-csv-btn"
            onClick={exportOpportunitiesCSV}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs transition-all cursor-pointer shadow-xs"
            title="Exportar CSV"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Low-frequency actions stay together instead of competing with the primary action. */}
        <div className="relative">
          <button
            id="navbar-more-btn"
            onClick={() => setIsMoreOpen((open) => !open)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            title="Más acciones"
            aria-expanded={isMoreOpen}
            aria-haspopup="menu"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Más</span>
          </button>
          {isMoreOpen && (
            <div className="absolute right-0 top-full mt-2 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl" role="menu">
              <button
                onClick={() => { exitToPublicSite(); setIsMoreOpen(false); }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                role="menuitem"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Sitio Público</span>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </button>
              <label className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="flex-1">Idioma</span>
                <select
                  id="navbar-language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent text-xs text-slate-800 focus:outline-none cursor-pointer font-semibold"
                  title="Seleccionar idioma"
                >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                  <option value="pt">PT</option>
                </select>
              </label>
              <button
                id="navbar-reset-demo-btn"
                onClick={() => { resetToDemoData(); setIsMoreOpen(false); }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                role="menuitem"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                Restablecer demo
              </button>
            </div>
          )}
        </div>

        {/* Primary "+ Add" Button */}
        <button
          id="navbar-primary-add-btn"
          onClick={() => {
            if (activeTab === 'companies') openNewRecordModal('company');
            else if (activeTab === 'people') openNewRecordModal('person');
            else if (activeTab === 'tasks') openNewRecordModal('task');
            else openNewRecordModal('opportunity');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>
            {activeTab === 'companies'
              ? 'Nueva Empresa'
              : activeTab === 'people'
              ? 'Nuevo Contacto'
              : activeTab === 'tasks'
              ? 'Nueva Tarea'
              : 'Nuevo Negocio'}
          </span>
        </button>
      </div>
    </header>
    <ModuleCredentialsModal
      moduleId={isConfigOpen ? configModuleId : null}
      onClose={() => setIsConfigOpen(false)}
    />
    </>
  );
};
