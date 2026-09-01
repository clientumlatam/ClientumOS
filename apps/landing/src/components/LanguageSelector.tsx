import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, MapPin } from 'lucide-react';
import { useLanguage, Language } from '@clientum/ui';

interface LanguageSelectorProps {
  variant?: 'header' | 'public' | 'compact' | 'pill';
  showSedeBadge?: boolean;
}

export function LanguageSelector({ variant = 'header', showSedeBadge = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: Array<{ code: Language; label: string; short: string; flag: string; hq: string; leader: string }> = [
    {
      code: 'es-AR',
      label: 'Español (Argentina)',
      short: 'ES (AR)',
      flag: '🇦🇷',
      hq: 'Sede Principal: General Roca, Río Negro',
      leader: 'Jonathan Ledantes'
    },
    {
      code: 'pt-BR',
      label: 'Português (Brasil)',
      short: 'PT (BR)',
      flag: '🇧🇷',
      hq: 'Sede Brasil: Arraial do Cabo, RJ',
      leader: 'Matias Rotili'
    }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center p-1 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-inner">
        {languages.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/40'
              }`}
              title={`${item.label} · ${item.hq} (${item.leader})`}
            >
              <span className="text-sm">{item.flag}</span>
              <span>{item.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'public') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 shadow-xs transition-all cursor-pointer"
          title="Cambiar idioma / Mudar idioma"
        >
          <span className="text-base leading-none">{currentLang.flag}</span>
          <span className="font-semibold text-slate-100">{currentLang.short}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-slate-800 text-left">
            <div className="px-3 py-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Seleccionar Idioma & Sede / Selecionar Idioma
              </span>
            </div>
            <div className="py-1 space-y-1">
              {languages.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl transition-all text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <span className="text-xl mt-0.5">{item.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-400">
                          {item.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{item.hq}</span>
                      </p>
                      <p className="text-[9px] text-indigo-300/80 font-mono mt-0.5">
                        Líder: {item.leader}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default 'header' / 'compact' variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-medium transition-colors cursor-pointer shadow-2xs"
        title={`Idioma: ${currentLang.label} · ${currentLang.hq}`}
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-semibold text-slate-800">{currentLang.short}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-fade-in divide-y divide-slate-100 text-left">
          <div className="px-2 py-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Idioma & Región / Idioma
            </span>
          </div>
          <div className="py-1 space-y-1">
            {languages.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-2 p-2 rounded-lg transition-all text-left cursor-pointer ${
                    isSelected ? 'bg-indigo-50 text-indigo-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-lg mt-0.5">{item.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.hq.replace('Sede Principal: ', '').replace('Sede Brasil: ', '')}
                    </div>
                    <div className="text-[9px] text-indigo-600 font-medium">
                      {item.leader}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default LanguageSelector;
