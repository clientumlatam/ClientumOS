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
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    opportunities,
    tasks,
    currentUser,
    setIsCommandPaletteOpen,
    openNewRecordModal,
    openAICopilot,
    setSelectedRecord,
    t,
  } = useCRM();

  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;
  const activeOpportunities = opportunities.filter((o) => o.stage !== 'won' && o.stage !== 'lost');
  const pipelineValue = activeOpportunities.reduce((acc, o) => acc + o.amount, 0);

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    {
      id: 'opportunities',
      label: t('opportunities'),
      icon: Briefcase,
      badge: `$${Math.round(pipelineValue / 1000)}k`,
      badgeColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    },
    {
      id: 'companies',
      label: t('companies'),
      icon: Building2,
    },
    {
      id: 'people',
      label: t('people'),
      icon: Users2,
    },
    {
      id: 'tasks',
      label: t('tasks'),
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    },
    {
      id: 'analytics',
      label: t('analytics'),
      icon: BarChart3,
    },
    {
      id: 'powerSuite',
      label: t('powerSuite'),
      icon: Sparkles,
      badge: '16 AI',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold',
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: Settings,
    },
  ];

  return (
    <aside
      id="twenty-sidebar"
      className="w-64 bg-[#0d0f14] border-r border-[#1e222d] flex flex-col h-full shrink-0 select-none text-sm z-20"
    >
      {/* Workspace Switcher Header */}
      <div className="p-3.5 border-b border-[#1e222d] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-md text-white font-bold text-xs tracking-tighter">
            20
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="font-semibold text-xs text-white truncate flex items-center gap-1.5">
              Twenty Workspace
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
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-5">
        {/* Main Records */}
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1e2330] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141720]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-blue-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        item.badgeColor || 'bg-[#222736] text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
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
                Twenty AI Copilot
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
      <div className="p-3 border-t border-[#1e222d] bg-[#0b0d12] flex items-center justify-between">
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
            <span className="text-xs font-medium text-slate-200 truncate">{currentUser.name}</span>
            <span className="text-[10px] text-slate-400 truncate">{currentUser.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            id="sidebar-schema-btn"
            onClick={() => setActiveTab('settings')}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-[#1a1e2a] transition-colors"
            title="Database Schema & Custom Fields"
          >
            <Database className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
