import React from 'react';
import {
  Users,
  MessageSquare,
  Award,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

export function SocialProofBar() {
  const { isPortuguese } = useLanguage();

  const METRICS = [
    {
      icon: Users,
      value: '+480',
      label: isPortuguese ? 'PMEs & Empresas no Brasil e LATAM' : 'PyMEs y Empresas Impulsadas',
      sublabel: isPortuguese ? 'Em 6 países da região' : 'En Argentina, Brasil, Chile y México'
    },
    {
      icon: MessageSquare,
      value: '+1.8M',
      label: isPortuguese ? 'Mensagens WhatsApp IA Processadas' : 'Mensajes de WhatsApp IA Procesados',
      sublabel: isPortuguese ? 'Sem perdas de leads' : 'Atención 24/7 y 0% fuga de leads'
    },
    {
      icon: Award,
      value: '99.4%',
      label: isPortuguese ? 'Satisfação & Retenção de Clientes' : 'Satisfacción de Servicio',
      sublabel: isPortuguese ? 'Avaliações comprovadas' : 'Testimonios reales verificados'
    },
    {
      icon: Clock,
      value: '7 Días',
      label: isPortuguese ? 'SLA de Implantação Garantido' : 'Plazo Promedio de Puesta en Marcha',
      sublabel: isPortuguese ? 'Entrega chave na mão' : '100% funcionando llave en mano'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#071329] via-[#0A2558] to-[#071329] border-y border-blue-500/20 py-8 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {METRICS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="text-center group p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-extrabold text-slate-200 mt-1">
                {metric.label}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {metric.sublabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
