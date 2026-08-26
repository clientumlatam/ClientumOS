import React from 'react';
import {
  Search,
  Plus,
  Sparkles,
  Download,
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Filter,
  X,
  Building,
  UserPlus,
  DollarSign,
  CheckSquare,
  Sun,
  Moon,
  Globe,
  Mail,
  Menu,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Language, StageId } from '../../types';

export const Navbar: React.FC = () => {
  const {
    toggleMobileSidebar,
    activeTab,
    viewMode,
    setViewMode,
    filterState,
    setFilterState,
    resetFilters,
    openNewRecordModal,
    openAICopilot,
    exportOpportunitiesCSV,
    resetToDemoData,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    opportunities,
    companies,
    people,
    tasks,
  } = useCRM();

  const getTitle = () => {
    switch (activeTab) {
      case 'opportunities':
        return { name: t('opportunities'), count: opportunities.length, desc: t('pipeline') };
      case 'companies':
        return { name: t('companies'), count: companies.length, desc: t('allCompanies') };
      case 'people':
        return { name: t('people'), count: people.length, desc: t('allPeople') };
      case 'tasks':
        return { name: t('tasks'), count: tasks.length, desc: t('allTasks') };
      case 'analytics':
        return { name: t('analytics'), count: undefined, desc: t('analyticsSubtitle') };
      case 'powerSuite':
        return { name: t('powerSuite'), count: 16, desc: 'Advanced AI agents, outreach chatbots, payment integrations & maps prospecting' };
      case 'settings':
        return { name: t('settings'), count: undefined, desc: t('settingsSubtitle') };
      default:
        return { name: 'ClientumCRM', count: undefined, desc: '' };
    }
  };

  const currentMeta = getTitle();
  const hasActiveFilters =
    Boolean(filterState.search) ||
    filterState.stage !== 'all' ||
    filterState.owner !== 'all' ||
    filterState.priority !== 'all';

  return (
    <header
      id="clientum-top-navbar"
      className="h-14 bg-[#11141c] border-b border-[#1e2330] flex items-center justify-between px-4 gap-4 shrink-0 z-10 select-none"
    >
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-lg bg-[#181d2a] hover:bg-[#202738] border border-[#2b3348] text-slate-300 md:hidden transition-colors"
          title="Open Menu"
        >
          <Menu className="w-4 h-4 text-slate-300" />
        </button>
        <h1 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
          {currentMeta.name}
          {currentMeta.count !== undefined && (
            <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-[#1e2433] text-slate-300 font-mono font-medium border border-[#2b3348]">
              {currentMeta.count}
            </span>
          )}
        </h1>
        <span className="text-slate-400 text-xs hidden md:inline truncate border-l border-[#242938] pl-3">
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
            placeholder={`Filter ${currentMeta.name.toLowerCase()}...`}
            value={filterState.search}
            onChange={(e) => setFilterState((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full bg-[#161a24] text-xs text-slate-200 placeholder-slate-400 pl-8 pr-7 py-1.5 rounded-md border border-[#242a3a] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
          {filterState.search && (
            <button
              id="clear-search-btn"
              onClick={() => setFilterState((prev) => ({ ...prev, search: '' }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
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
            className="bg-[#161a24] text-xs text-slate-300 px-2 py-1.5 rounded-md border border-[#242a3a] focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">{t('allStages')}</option>
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
            className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline shrink-0 flex items-center gap-1"
          >
            {t('cancel')}
          </button>
        )}
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2">
        {/* Language Selector Dropdown */}
        <div className="flex items-center bg-[#161a24] border border-[#242a3a] rounded-md px-1.5 py-0.5">
          <Globe className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          <select
            id="navbar-language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer py-1 pr-1 font-medium"
            title="Choose Language (EN / ES / PT)"
          >
            <option value="en" className="bg-[#12151d] text-white">🇺🇸 EN</option>
            <option value="es" className="bg-[#12151d] text-white">🇪🇸 ES</option>
            <option value="pt" className="bg-[#12151d] text-white">🇧🇷 PT</option>
          </select>
        </div>

        {/* View Mode Switcher (Kanban vs Table) */}
        {activeTab === 'opportunities' && (
          <div className="flex items-center bg-[#161a24] p-0.5 rounded-md border border-[#242a3a]">
            <button
              id="viewmode-kanban-btn"
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded text-xs transition-all flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-[#23293a] text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={t('boardView')}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">{t('boardView')}</span>
            </button>
            <button
              id="viewmode-table-btn"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs transition-all flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-[#23293a] text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={t('tableView')}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">{t('tableView')}</span>
            </button>
          </div>
        )}

        {/* AI Sales Copilot Button */}
        <button
          id="navbar-ai-copilot-btn"
          onClick={() => openAICopilot()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 hover:from-blue-600/30 hover:via-indigo-600/30 hover:to-purple-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all shadow-sm group"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">{t('aiCopilot')}</span>
        </button>

        {/* Export CSV for Opportunities */}
        {activeTab === 'opportunities' && (
          <button
            id="navbar-export-csv-btn"
            onClick={exportOpportunitiesCSV}
            className="p-1.5 rounded-md bg-[#161a24] hover:bg-[#1f2433] text-slate-300 hover:text-white border border-[#242a3a] text-xs transition-all"
            title={t('exportCSV')}
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          id="navbar-theme-toggle-btn"
          onClick={toggleTheme}
          className="p-1.5 rounded-md bg-[#161a24] hover:bg-[#1f2433] text-slate-300 hover:text-white border border-[#242a3a] text-xs transition-all cursor-pointer"
          title={theme === 'dark' ? 'Clientum Clarity' : 'Clientum Obsidian'}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          )}
        </button>

        {/* Reset Demo Data Button */}
        <button
          id="navbar-reset-demo-btn"
          onClick={resetToDemoData}
          className="p-1.5 rounded-md bg-[#161a24] hover:bg-[#1f2433] text-slate-400 hover:text-slate-200 border border-[#242a3a] text-xs transition-all"
          title={t('resetDemo')}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Quick Link to Portal Web */}
        <a
          href="/"
          className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#161a24] hover:bg-[#1f2433] text-slate-300 hover:text-white border border-[#242a3a] text-xs font-medium transition-all"
          title="Ir al Portal Web Principal"
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>Portal Web</span>
        </a>

        {/* Quick Link to Gmail Suite */}
        <a
          href="/gmail"
          className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-500/20 text-xs font-medium transition-all"
          title="Ir a Gmail Suite"
        >
          <Mail className="w-3.5 h-3.5 text-red-400" />
          <span>Gmail</span>
        </a>

        {/* Primary "+ Add" Button */}
        <button
          id="navbar-primary-add-btn"
          onClick={() => {
            if (activeTab === 'companies') openNewRecordModal('company');
            else if (activeTab === 'people') openNewRecordModal('person');
            else if (activeTab === 'tasks') openNewRecordModal('task');
            else openNewRecordModal('opportunity');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>
            {activeTab === 'companies'
              ? t('newCompany')
              : activeTab === 'people'
              ? t('newPerson')
              : activeTab === 'tasks'
              ? t('newTask')
              : t('newOpportunity')}
          </span>
        </button>
      </div>
    </header>
  );
};
