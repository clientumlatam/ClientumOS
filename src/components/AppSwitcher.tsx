import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, LayoutDashboard, Sparkles, LogIn, ArrowRight } from 'lucide-react';

interface AppSwitcherProps {
  variant?: 'header' | 'floating' | 'banner' | 'pill';
  authUser?: string | null;
  className?: string;
}

export function AppSwitcher({ variant = 'pill', authUser, className = '' }: AppSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicSite = location.pathname === '/' || location.pathname.startsWith('/sitio') || location.pathname.startsWith('/web') || location.pathname.startsWith('/portal');
  const isLoginPage = location.pathname === '/login' || location.pathname === '/auth';
  const isDashboard = location.pathname.startsWith('/app') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/crm') || location.pathname.startsWith('/erp');

  if (variant === 'floating') {
    return (
      <aside aria-label="Selector de Entorno" className={`fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1.5 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 transition-all ${className}`}>
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isPublicSite
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Ver Sitio Web Público Corporativo"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Sitio Público</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />

        <button
          onClick={() => navigate(authUser ? '/app' : '/login')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isDashboard || isLoginPage
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Ir a la Plataforma CRM & Dashboard"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-indigo-300" />
          <span>Dashboard &amp; Login</span>
          {authUser && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </button>
      </aside>
    );
  }

  if (variant === 'banner') {
    return (
      <header aria-label="Barra de Navegación de Aplicación" className={`bg-gradient-to-r from-slate-950 via-[#0A2558] to-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between text-xs border-b border-slate-800/80 z-50 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <Sparkles className="w-3 h-3" />
            Entorno Dual Activo
          </span>
          <span className="text-slate-300 hidden md:inline">
            Tenés acceso al <strong className="text-white">Sitio Público</strong> y a la <strong className="text-white">App CRM Dashboard</strong>.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPublicSite
                ? 'bg-white/20 text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Sitio Público</span>
          </button>

          <button
            onClick={() => navigate(authUser ? '/app' : '/login')}
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isDashboard || isLoginPage
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>2. App Dashboard &amp; Login</span>
          </button>
        </div>
      </header>
    );
  }

  // Default 'pill' / 'header' variant
  return (
    <div className={`inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}>
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          isPublicSite
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-500" />
        <span>Sitio Público</span>
      </button>

      <button
        onClick={() => navigate(authUser ? '/app' : '/login')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          isDashboard || isLoginPage
            ? 'bg-[#1A3461] text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
        <span>Dashboard &amp; Login</span>
      </button>
    </div>
  );
}
