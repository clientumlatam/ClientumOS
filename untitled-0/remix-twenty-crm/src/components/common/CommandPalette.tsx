import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  BarChart3,
  Settings,
  Plus,
  Sparkles,
  Download,
  RotateCcw,
  ArrowRight,
  Sun,
  Moon,
  Palette,
  Code2,
  ExternalLink,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    opportunities,
    companies,
    people,
    tasks,
    setActiveTab,
    setSelectedRecord,
    openNewRecordModal,
    openAICopilot,
    exportOpportunitiesCSV,
    resetToDemoData,
    theme,
    setTheme,
    toggleTheme,
  } = useCRM();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Build searchable items
  interface CommandItem {
    id: string;
    category: 'Opportunities' | 'Companies' | 'People' | 'Tasks' | 'Actions' | 'Navigation';
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    badge?: string;
    onSelect: () => void;
  }

  const items: CommandItem[] = [];

  // Actions
  items.push(
    {
      id: 'act-new-deal',
      category: 'Actions',
      title: 'Create New Opportunity',
      subtitle: 'Add a new deal to your sales pipeline',
      icon: Plus,
      badge: 'Action',
      onSelect: () => openNewRecordModal('opportunity'),
    },
    {
      id: 'act-new-company',
      category: 'Actions',
      title: 'Create New Company',
      subtitle: 'Add an organization account',
      icon: Plus,
      badge: 'Action',
      onSelect: () => openNewRecordModal('company'),
    },
    {
      id: 'act-new-person',
      category: 'Actions',
      title: 'Create New Contact',
      subtitle: 'Add a new stakeholder or lead',
      icon: Plus,
      badge: 'Action',
      onSelect: () => openNewRecordModal('person'),
    },
    {
      id: 'act-new-task',
      category: 'Actions',
      title: 'Create New Task',
      subtitle: 'Add an action item or follow-up',
      icon: Plus,
      badge: 'Action',
      onSelect: () => openNewRecordModal('task'),
    },
    {
      id: 'act-ai-copilot',
      category: 'Actions',
      title: 'Open Twenty AI Sales Copilot',
      subtitle: 'Ask for deal advice, email drafts, or analysis',
      icon: Sparkles,
      badge: 'AI',
      onSelect: () => openAICopilot(),
    },
    {
      id: 'act-export-csv',
      category: 'Actions',
      title: 'Export Deals to CSV',
      subtitle: 'Download spreadsheet of opportunities',
      icon: Download,
      badge: 'Export',
      onSelect: () => exportOpportunitiesCSV(),
    },
    {
      id: 'act-toggle-theme',
      category: 'Actions',
      title: theme === 'dark' ? 'Switch to High-Contrast Light Theme' : 'Switch to Default Dark Theme',
      subtitle: 'Toggle workspace contrast and brightness',
      icon: theme === 'dark' ? Sun : Moon,
      badge: 'Theme',
      onSelect: () => toggleTheme(),
    },
    {
      id: 'act-theme-settings',
      category: 'Actions',
      title: 'Open Appearance & Theme Settings',
      subtitle: 'Configure contrast modes, WCAG accessibility, and display preferences',
      icon: Palette,
      badge: 'Settings',
      onSelect: () => setActiveTab('settings'),
    },
    {
      id: 'act-twenty-repos',
      category: 'Actions',
      title: 'Browse Twenty CRM Repositories',
      subtitle: 'twenty, favicon, ci-public, core-team-issues',
      icon: Code2,
      badge: 'GitHub',
      onSelect: () => {
        setActiveTab('settings');
      },
    },
    {
      id: 'act-open-twenty-github',
      category: 'Actions',
      title: 'Open twentyhq/twenty on GitHub',
      subtitle: 'Official repository: https://github.com/twentyhq/twenty',
      icon: ExternalLink,
      badge: 'External',
      onSelect: () => {
        window.open('https://github.com/twentyhq/twenty', '_blank');
      },
    }
  );

  // Navigation
  items.push(
    {
      id: 'nav-opps',
      category: 'Navigation',
      title: 'Go to Opportunities',
      icon: Briefcase,
      onSelect: () => setActiveTab('opportunities'),
    },
    {
      id: 'nav-comps',
      category: 'Navigation',
      title: 'Go to Companies',
      icon: Building2,
      onSelect: () => setActiveTab('companies'),
    },
    {
      id: 'nav-people',
      category: 'Navigation',
      title: 'Go to People',
      icon: Users2,
      onSelect: () => setActiveTab('people'),
    },
    {
      id: 'nav-tasks',
      category: 'Navigation',
      title: 'Go to Tasks',
      icon: CheckSquare,
      onSelect: () => setActiveTab('tasks'),
    },
    {
      id: 'nav-analytics',
      category: 'Navigation',
      title: 'Go to Analytics & Forecasting',
      icon: BarChart3,
      onSelect: () => setActiveTab('analytics'),
    },
    {
      id: 'nav-settings',
      category: 'Navigation',
      title: 'Go to Settings & Custom Fields',
      icon: Settings,
      onSelect: () => setActiveTab('settings'),
    }
  );

  // Opportunities
  opportunities.forEach((o) => {
    items.push({
      id: `opp-${o.id}`,
      category: 'Opportunities',
      title: o.name,
      subtitle: `${o.companyName || 'No Company'} • $${o.amount.toLocaleString()} • Stage: ${o.stage}`,
      icon: Briefcase,
      badge: `$${Math.round(o.amount / 1000)}k`,
      onSelect: () => setSelectedRecord({ type: 'opportunity', id: o.id }),
    });
  });

  // Companies
  companies.forEach((c) => {
    items.push({
      id: `comp-${c.id}`,
      category: 'Companies',
      title: c.name,
      subtitle: `${c.domain} • ${c.industry} • ARR: $${c.arr?.toLocaleString() || 0}`,
      icon: Building2,
      badge: c.tier,
      onSelect: () => setSelectedRecord({ type: 'company', id: c.id }),
    });
  });

  // People
  people.forEach((p) => {
    items.push({
      id: `person-${p.id}`,
      category: 'People',
      title: `${p.firstName} ${p.lastName}`,
      subtitle: `${p.jobTitle} at ${p.companyName || 'N/A'} (${p.email})`,
      icon: Users2,
      badge: p.status,
      onSelect: () => setSelectedRecord({ type: 'person', id: p.id }),
    });
  });

  // Tasks
  tasks.forEach((t) => {
    items.push({
      id: `task-${t.id}`,
      category: 'Tasks',
      title: t.title,
      subtitle: `Due: ${t.dueDate} • Assigned to ${t.assignedTo}`,
      icon: CheckSquare,
      badge: t.priority,
      onSelect: () => setSelectedRecord({ type: 'task', id: t.id }),
    });
  });

  // Filter items
  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
        setIsCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  return (
    <div
      id="twenty-command-palette-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#12151d] border border-[#232a3d] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] text-slate-300 select-none animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-3.5 border-b border-[#1e2434] flex items-center gap-3 bg-[#151924]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, deal, company, contact, or action..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2434] text-slate-400 border border-[#293247]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No matching commands or records found.
            </div>
          ) : (
            filtered.slice(0, 30).map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  onClick={() => {
                    item.onSelect();
                    setIsCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors text-xs ${
                    isSelected ? 'bg-[#1e2538] text-white' : 'hover:bg-[#161a26] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-md shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-[#1a202e] text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-medium truncate text-slate-100">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#181d2a] text-slate-300 font-mono border border-[#273044]">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#0e1118] border-t border-[#1e2434] flex items-center justify-between text-[11px] text-slate-400 px-4">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Twenty Command Center</span>
        </div>
      </div>
    </div>
  );
};
