import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  UserCheck,
  Calculator,
  X,
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '@clientum/ui';

interface FloatingWhatsAppButtonProps {
  onOpenWizard?: () => void;
}

export function FloatingWhatsAppButton({ onOpenWizard }: FloatingWhatsAppButtonProps) {
  const { isPortuguese } = useLanguage();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const phone = '5492984510883';

  const quickOptions = [
    {
      icon: UserCheck,
      title: isPortuguese ? 'Falar com Consultor Humano' : 'Hablar con un Consultor',
      desc: isPortuguese ? 'Atendimento comercial personalizado' : 'Atención comercial directa y personalizada',
      url: `https://wa.me/${phone}?text=Hola%20Clientum!%20Quisiera%20hablar%20con%20un%20consultor%20comercial`
    },
    {
      icon: Bot,
      title: isPortuguese ? 'Testar Agente WhatsApp IA' : 'Probar Agente IA en WhatsApp',
      desc: isPortuguese ? 'Experimente o bot no seu próprio celular' : 'Interactúa en tiempo real desde tu teléfono',
      url: `https://wa.me/${phone}?text=Hola%20Clientum!%20Quiero%20probar%20el%20agente%20de%20IA%20en%20vivo`
    },
    {
      icon: Calculator,
      title: isPortuguese ? 'Solicitar Cotação Express' : 'Pedir Cotización de mi Proyecto',
      desc: isPortuguese ? 'Receba uma estimativa em menos de 2h' : 'Estimación de presupuesto en < 2 horas',
      action: () => {
        setMenuOpen(false);
        if (onOpenWizard) onOpenWizard();
      }
    }
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-40">
      {/* Expanded Quick Options Menu */}
      {menuOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-slate-900/95 border border-slate-700/90 rounded-3xl p-4 shadow-2xl backdrop-blur-xl text-slate-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xs text-white">
                {isPortuguese ? 'Atendimento Clientum' : 'Atención Clientum'}
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2 space-y-2">
            {quickOptions.map((opt, idx) => {
              const Icon = opt.icon;
              if (opt.url) {
                return (
                  <a
                    key={idx}
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                        <span>{opt.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {opt.desc}
                      </div>
                    </div>
                  </a>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={opt.action}
                  className="w-full flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-left group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-center text-slate-400 font-mono">
            🟢 {isPortuguese ? 'Equipe e IA online 24/7' : 'Equipo e IA en línea 24/7'}
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-all transform hover:scale-105 cursor-pointer border border-emerald-400/40 group"
        title="Chatear por WhatsApp con Clientum"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </div>
        <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">
          {isPortuguese ? 'WhatsApp 24/7' : 'WhatsApp 24/7'}
        </span>
      </button>
    </div>
  );
}
