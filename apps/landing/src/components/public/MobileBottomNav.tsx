import React from 'react';
import {
  Layers,
  Sparkles,
  MessageSquare,
  LogIn,
  ArrowUpRight,
  Calculator
} from 'lucide-react';
import { useLanguage } from '@clientum/ui';

interface MobileBottomNavProps {
  onNavigateTab: (tabId: string) => void;
  onOpenWizard: () => void;
  activeTab: string;
}

export function MobileBottomNav({ onNavigateTab, onOpenWizard, activeTab }: MobileBottomNavProps) {
  const { isPortuguese } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#071329]/95 border-t border-slate-800/90 backdrop-blur-xl px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-4 items-center gap-1">
        {/* 1. Servicios */}
        <button
          onClick={() => onNavigateTab('servicios')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'servicios' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Servicios</span>
        </button>

        {/* 2. Cotizador Wizard */}
        <button
          onClick={onOpenWizard}
          className="flex flex-col items-center justify-center py-1 text-emerald-400 hover:text-emerald-300 font-bold transition-all cursor-pointer relative"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5 border border-emerald-500/30">
            <Calculator className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] leading-tight font-extrabold">Cotizar</span>
        </button>

        {/* 3. Probar Bot */}
        <button
          onClick={() => onNavigateTab('chatbot')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'chatbot' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Probar Bot</span>
        </button>

        {/* 4. CRM Login */}
        <a
          href="https://crm.clientum.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-blue-400 hover:text-blue-300 transition-all"
        >
          <div className="flex items-center gap-0.5">
            <LogIn className="w-4 h-4 mb-0.5" />
            <ArrowUpRight className="w-2.5 h-2.5 -mt-2" />
          </div>
          <span className="text-[10px] leading-tight font-bold">CRM Login</span>
        </a>
      </div>
    </div>
  );
}
