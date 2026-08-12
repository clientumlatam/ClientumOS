import React, { useState, useEffect } from 'react';
import { Search, Globe, Coins, User, LogOut, Menu, Bell, Shield, Sparkles, FileDown } from 'lucide-react';
import { ActiveTab } from '../types';
import { AuthButton } from './AuthButton';
import { PdfExportButton } from './PdfExportButton';

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
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  const currencies = ['USD', 'EUR', 'GBP', 'MXN', 'BRL', 'COP', 'CLP'];
  const regions = ['LATAM (All)', 'Mexico', 'Brazil', 'Colombia', 'Chile', 'Argentina', 'Peru', 'Global'];

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-mobile-sidebar'))}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          title="Abrir Menú de Navegación"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-sm transition-colors w-72 justify-between"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Buscar o comando (Ctrl+K)...</span>
          </span>
          <kbd className="bg-white px-1.5 py-0.5 text-xs text-slate-400 rounded border border-slate-200 shadow-sm">⌘K</kbd>
        </button>

        <button
          onClick={() => setActiveTab('public_website')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium transition-colors border border-indigo-200"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Ver Sitio Público</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Currency Selector */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
          <Coins className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer font-medium"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Region Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer font-medium"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Global PDF Export Button */}
        <div className="hidden sm:block">
          <PdfExportButton
            targetId="main-content-area"
            title={`Reporte Clientum - ${activeTab.toUpperCase()}`}
            filename={`Reporte_Clientum_${activeTab}_${new Date().toISOString().slice(0, 10)}.pdf`}
            label="Exportar PDF"
            variant="header"
            size="xs"
            branding={{
              companyName: 'Clientum B2B Suite',
              primaryColor: '#4f46e5'
            }}
          />
        </div>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

        {/* Auth status / button */}
        <AuthButton />
      </div>
    </header>
  );
}
