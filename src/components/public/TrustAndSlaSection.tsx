import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  FileCheck2,
  Award,
  Zap,
  Server,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

export function TrustAndSlaSection() {
  const { isPortuguese } = useLanguage();

  const BADGES = [
    {
      icon: Zap,
      title: 'Meta Business Cloud API',
      subtitle: isPortuguese ? 'Integração oficial sem risco de ban' : 'Integración oficial WhatsApp Business API'
    },
    {
      icon: Server,
      title: 'Google Cloud Platform Partner',
      subtitle: isPortuguese ? 'Infraestrutura com 99.9% de uptime' : 'Infraestructura cloud de alta disponibilidad'
    },
    {
      icon: FileCheck2,
      title: 'AFIP Homologación Oficial',
      subtitle: isPortuguese ? 'Emissão fiscal instantânea com CAE' : 'Facturación electrónica automática Facturas A y B'
    },
    {
      icon: Lock,
      title: 'Seguridad TLS 1.3 & Encriptación',
      subtitle: isPortuguese ? 'Privacidade total dos seus dados' : 'Cifrado de extremo a extremo y backup diario'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Guarantees Box */}
      <div className="bg-gradient-to-r from-[#0A2558] via-slate-900 to-[#0A2558] border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column: 7-Day SLA */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Compromisso de Entrega Rápida' : 'Garantía de Implementación'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isPortuguese
                ? 'Seu sistema funcionando em até 7 dias úteis'
                : 'Tu sistema funcionando en 7 días hábiles garantizados'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isPortuguese
                ? 'Sem projetos intermináveis. Entregamos a solução completa, configurada com seus dados e com treinamento para sua equipe.'
                : 'Nos encargamos de todo el proceso técnico: configuración de servidores, entrenamiento del agente con tus preguntas y capacitación para tu equipo comercial.'}
            </p>
          </div>

          {/* Middle & Right: Certifications Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3.5 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{badge.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{badge.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 15 Days Money-back footer line */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Factura electrónica oficial y soporte técnico post-entrega incluido</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Código de propiedad del cliente sin ataduras ocultas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
