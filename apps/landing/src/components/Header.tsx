import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  Coins,
  Menu,
  ChevronDown,
  Briefcase,
  Megaphone,
  TrendingUp,
  Wrench,
  ExternalLink,
  Sparkles,
  Kanban,
  Compass,
  Radio,
  Bot,
  Layers,
  FileSpreadsheet,
  Key,
  ShieldCheck,
  Send,
  Zap,
  HardDrive,
  BarChart3,
  Users,
  FileText,
  Workflow
} from 'lucide-react';
import { ActiveTab } from '../types';
import { AuthButton } from './AuthButton';
import { PdfExportButton } from './PdfExportButton';
import { PrintReportButton } from './PrintReportButton';
import { DASHBOARD_CATEGORIES, HubNavCategory } from './navigationData';
import { PublicFeatureModal } from './PublicFeatureModal';
import { SyncStatus } from './SyncStatus';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@clientum/ui';
import { ThemeToggle } from './ThemeToggle';
import { GettingStartedTour } from './GettingStartedTour';
import { InAppNotificationBell } from './InAppNotificationBell';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currency: string;
  setCurrency: (c: string) => void;
  region: string;
  setRegion: (r: string) => void;
  onOpenCommandPalette: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  region,
  setRegion,
  onOpenCommandPalette,
}: HeaderProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);
  const [publicModalTab, setPublicModalTab] = useState<string>('soluciones');
  const [isTourOpen, setIsTourOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user || null);
        }
      } catch (e) {
        setCurrentUser(null);
      }
    };
    checkUser();
    const handleAuth = () => checkUser();
    window.addEventListener('auth-changed', handleAuth);
    return () => window.removeEventListener('auth-changed', handleAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies = ['USD', 'EUR', 'GBP', 'MXN', 'BRL', 'COP', 'CLP'];
  const regions = ['LATAM (All)', 'Mexico', 'Brazil', 'Colombia', 'Chile', 'Argentina', 'Peru', 'Global'];

  const categoryIcons: Record<string, React.ElementType> = {
    crm: Briefcase,
    marketing: Megaphone,
    seo: TrendingUp,
    tools: Wrench,
  };

  const isTabInCategory = (categoryKey: string, currentTab: ActiveTab): boolean => {
    const cat = DASHBOARD_CATEGORIES.find((c) => c.key === categoryKey);
    if (!cat) return false;
    return cat.items.some((item) => item.tab === currentTab);
  };

  const handleOpenPublicSection = (section: string) => {
    setPublicModalTab(section);
    setIsPublicModalOpen(true);
    setOpenDropdown(null);
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-3 sm:px-6 z-30 shrink-0 sticky top-0 shadow-xs">
        {/* Left Section: Mobile Menu & Dynamic Category Nav Items */}
        <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0" ref={navRef}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-mobile-sidebar'))}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
            title="Abrir Menú de Navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Dynamic Interactive Navigation Items for CRM, Marketing, SEO, Tools */}
          <nav className="hidden md:flex items-center gap-1">
            {DASHBOARD_CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.key] || Briefcase;
              const isActive = isTabInCategory(cat.key, activeTab);
              const isOpen = openDropdown === cat.key;

              return (
                <div key={cat.key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : cat.key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1A3461] text-white shadow-xs'
                        : isOpen
                        ? 'bg-slate-200 text-slate-900'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                    <span>{cat.title.split('&')[0].trim()}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dynamic Dropdown Mega-Menu for Category */}
                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in divide-y divide-slate-100">
                      <div className="pb-2 px-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            {cat.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${cat.badgeColor}`}>
                            {cat.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{cat.description}</p>
                      </div>

                      <div className="py-1.5 space-y-1 max-h-[340px] overflow-y-auto">
                        {cat.items.map((item) => {
                          const ItemIcon = item.icon;
                          const isItemActive = activeTab === item.tab;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.tab) {
                                  setActiveTab(item.tab);
                                }
                                setOpenDropdown(null);
                              }}
                              className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition-all cursor-pointer group ${
                                isItemActive ? 'bg-indigo-50/80 border-l-4 border-indigo-600 rounded-l-none' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                                  <span>{item.title}</span>
                                  {isItemActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                </div>
                                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Footer Quick Links from Public Site */}
                      <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-slate-500">
                        <button
                          onClick={() => handleOpenPublicSection('precios')}
                          className="hover:text-indigo-600 font-semibold cursor-pointer"
                        >
                          Ver Precios & Planes
                        </button>
                        <button
                          onClick={() => handleOpenPublicSection('soluciones')}
                          className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                        >
                          <span>Explorar Todo</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-xs transition-colors w-48 justify-between cursor-pointer ml-1"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Buscar (Ctrl+K)...</span>
            </span>
            <kbd className="bg-white px-1 py-0.5 text-[10px] text-slate-400 rounded border border-slate-200 shadow-xs shrink-0">⌘K</kbd>
          </button>
        </div>

        {/* Right Section: Sync Status Indicator, Currency, Region, Public Site Shortcut & Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Gmail & Calendar Sync Status Indicator */}
          <SyncStatus />

          {/* Public Website Gateway Button with Modal Trigger */}
          <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-200 rounded-lg p-0.5">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-indigo-700 hover:text-indigo-900 rounded-md text-xs font-bold transition-colors cursor-pointer hover:bg-indigo-100/60"
              title="Ir al Sitio Web Corporativo Público"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Sitio Público</span>
            </button>
            <button
              onClick={() => handleOpenPublicSection('soluciones')}
              className="px-1.5 py-1 text-indigo-500 hover:text-indigo-800 hover:bg-indigo-100/60 rounded-md transition-colors cursor-pointer"
              title="Ver Catálogo de Funcionalidades y Soluciones"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Language Selector (ES-AR / PT-BR) */}
          <LanguageSelector variant="header" />

          <ThemeToggle />

          <InAppNotificationBell />

          <button
            onClick={() => setIsTourOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all cursor-pointer"
            title="Iniciar Tour Guiado de Primeros Pasos"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Tour Guiado</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700">
            <Coins className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border-none focus:outline-none cursor-pointer font-medium text-xs"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-transparent border-none focus:outline-none cursor-pointer font-medium text-xs"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <PrintReportButton label="Imprimir" />
            <PdfExportButton
              targetId="main-content-area"
              title={`Reporte Clientum - ${activeTab.toUpperCase()}`}
              filename={`Reporte_Clientum_${activeTab}_${new Date().toISOString().slice(0, 10)}.pdf`}
              label="PDF"
              variant="header"
              size="xs"
              branding={{
                companyName: 'Clientum B2B Suite',
                primaryColor: '#1A3461'
              }}
            />
          </div>

          <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

          <AuthButton />
        </div>
      </header>

      {/* Interactive Public Feature Explorer Modal */}
      <PublicFeatureModal
        isOpen={isPublicModalOpen}
        onClose={() => setIsPublicModalOpen(false)}
        initialTab={publicModalTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsPublicModalOpen(false);
        }}
      />

      {/* Getting Started Interactive Tour */}
      <GettingStartedTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onComplete={() => {
          localStorage.setItem('clientum_tour_completed', 'true');
        }}
      />
    </>
  );
}
