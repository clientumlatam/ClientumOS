import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, MessageSquare, MapPin, X } from 'lucide-react';
import { useLanguage } from '@clientum/ui';

const ACTIVITIES = [
  {
    icon: MessageSquare,
    title: 'Nueva consulta de Chatbot IA',
    company: 'Distribuidora Patagónica',
    location: 'Neuquén, Argentina',
    time: 'Hace 4 minutos'
  },
  {
    icon: Bot,
    title: 'Activación de CRM + Facturación AFIP',
    company: 'Estudio Jurídico & Asociados',
    location: 'Buenos Aires, Argentina',
    time: 'Hace 12 minutos'
  },
  {
    icon: MessageSquare,
    title: 'Agendamento de Demo WhatsApp IA',
    company: 'Clínica Odontológica DentalCare',
    location: 'Rio de Janeiro, Brasil',
    time: 'Hace 18 minutos'
  },
  {
    icon: CheckCircle2,
    title: 'Descarga de Propuesta Técnica en PDF',
    company: 'Inmobiliaria & Real Estate Group',
    location: 'Córdoba, Argentina',
    time: 'Hace 25 minutos'
  },
  {
    icon: Bot,
    title: 'Prospección B2B Automatizada',
    company: 'Ferretería Industrial del Valle',
    location: 'General Roca, Río Negro',
    time: 'Hace 38 minutos'
  }
];

export function LiveActivityTicker() {
  const { isPortuguese } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = ACTIVITIES[currentIndex];
  const Icon = current.icon;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-xs transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-start gap-3 relative text-slate-100">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1.5 -right-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full p-1 shadow-md cursor-pointer transition-colors"
          title="Cerrar notificaciones"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-4 h-4" />
        </div>

        <div className="text-left pr-2">
          <div className="text-[11px] font-bold text-white leading-tight">
            {current.title}
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">
            {current.company}
          </div>
          <div className="text-[9px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
            <span className="flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" />
              {current.location}
            </span>
            <span>•</span>
            <span>{current.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
