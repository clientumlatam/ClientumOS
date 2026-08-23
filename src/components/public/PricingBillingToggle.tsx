import React, { useState } from 'react';
import {
  Check,
  Zap,
  Sparkles,
  Shield,
  ArrowRight,
  HelpCircle,
  Clock,
  CheckCircle2,
  Building,
  Rocket,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

interface PricingBillingToggleProps {
  onSelectPlan?: (planId: string) => void;
  onOpenWizard?: () => void;
}

interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  monthlyUSD: number;
  annualMonthlyUSD: number;
  setupUSD: number;
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
}

export function PricingBillingToggle({ onSelectPlan, onOpenWizard }: PricingBillingToggleProps) {
  const { isPortuguese } = useLanguage();
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const PLANS: PlanItem[] = [
    {
      id: 'starter',
      name: isPortuguese ? 'Plano Inicial Starter' : 'Plan Inicial Starter',
      tagline: isPortuguese ? 'Para empreendedores e pequenos negócios que querem dar o primeiro passo digital.' : 'Para emprendedores y profesionales que quieren ordenar su gestión básica.',
      monthlyUSD: 25,
      annualMonthlyUSD: 20,
      setupUSD: 50,
      features: [
        isPortuguese ? 'CRM básico para até 500 contatos' : 'CRM básico hasta 500 contactos y clientes',
        isPortuguese ? 'Emissão de orçamentos e recibos' : 'Emisión de presupuestos y cotizaciones',
        isPortuguese ? '1 Usuário comercial incluído' : '1 Usuario comercial incluido',
        isPortuguese ? 'Suporte por e-mail em 24h' : 'Soporte por email en 24h',
        isPortuguese ? 'Exportação de relatórios em CSV' : 'Exportación de datos a Excel/CSV'
      ],
      notIncluded: [
        'Chatbot WhatsApp con IA generativa',
        'Facturación electrónica automática AFIP',
        'Prospección masiva en Google Maps'
      ],
      ctaLabel: isPortuguese ? 'Começar com Plano Inicial' : 'Elegir Plan Inicial'
    },
    {
      id: 'pro_ai',
      name: isPortuguese ? 'Plano Pro WhatsApp IA' : 'Plan Profesional + WhatsApp IA',
      tagline: isPortuguese ? 'O mais escolhido: Automação completa de vendas no WhatsApp e CRM integrado.' : 'El más elegido: Chatbot WhatsApp con IA y CRM de ventas sincronizado 24/7.',
      badge: isPortuguese ? 'MAIS POPULAR · MELHOR VALOR' : 'MÁS POPULAR · MEJOR VALOR',
      monthlyUSD: 99,
      annualMonthlyUSD: 79,
      setupUSD: 120,
      isPopular: true,
      features: [
        isPortuguese ? 'Agente WhatsApp IA treinado 24/7 com seu catálogo' : 'Chatbot WhatsApp IA con Meta Cloud API oficial',
        isPortuguese ? 'CRM Kanban completo com contatos ilimitados' : 'CRM Kanban ilimitado con pipeline comercial',
        isPortuguese ? 'Faturamento Eletrônico AFIP com CAE automático' : 'Facturación Electrónica AFIP oficial (Facturas A, B, C)',
        isPortuguese ? 'Até 5 usuários comerciais com permissões por função' : 'Hasta 5 usuarios de equipo con roles definidos',
        isPortuguese ? 'Derivação inteligente para atendentes humanos' : 'Derivación inteligente a asesores con alertas',
        isPortuguese ? 'Suporte prioritário via WhatsApp' : 'Soporte prioritário vía WhatsApp y asistencia remota'
      ],
      ctaLabel: isPortuguese ? 'Solicitar Plano Pro com IA' : 'Elegir Plan Profesional IA'
    },
    {
      id: 'enterprise_growth',
      name: isPortuguese ? 'Enterprise Growth Suite' : 'Suite Integral Growth',
      tagline: isPortuguese ? 'Para empresas que buscam liderar seu mercado com prospecção ativa e IA avançada.' : 'Para empresas que quieren liderar su sector con prospección activa y desarrollo a medida.',
      badge: isPortuguese ? 'SOLUÇÃO COMPLETA' : 'FULL SUITE INTEGRAL',
      monthlyUSD: 199,
      annualMonthlyUSD: 159,
      setupUSD: 200,
      features: [
        isPortuguese ? 'Tudo do Plano Pro incluído' : 'Todo lo del Plan Pro incluido',
        isPortuguese ? 'Módulo de Prospecção Geolocalizada no Google Maps com IA' : 'Módulo de Prospección Maps IA para extraer clientes B2B',
        isPortuguese ? 'Desenvolvimento de portal web e catálogo autoadministrável' : 'Web corporativa ultra rápida o portal de clientes',
        isPortuguese ? 'Usuários de equipe ilimitados' : 'Usuarios de equipo ilimitados',
        isPortuguese ? 'Auditorias SEO e estratégias de conteúdo com IA' : 'Auditorías SEO On-Page y generación de contenido',
        isPortuguese ? 'Gerente de conta dedicado e SLA de suporte em 2 horas' : 'Account Manager dedicado y reuniones de optimización quincenales'
      ],
      ctaLabel: isPortuguese ? 'Solicitar Suite Enterprise' : 'Elegir Suite Enterprise'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header & Toggle */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>{isPortuguese ? 'Planos Transparentes sem Surpresas' : 'Precios Claros y Sin Costos Ocultos'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          {isPortuguese ? 'Invista em tecnologia que se paga no primeiro mês' : 'Planes escalables para potenciar el crecimiento de tu PyME'}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isPortuguese
            ? 'Escolha a modalidade ideal para o momento da sua empresa. Sem contratos de longo prazo obrigatórios.'
            : 'Comienza hoy mismo con una solución llave en mano garantizada. Facturación oficial AFIP en Pesos Argentinos (ARS) o Dólares (USD).'}
        </p>

        {/* Billing Switcher */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-lg">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isAnnual
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isPortuguese ? 'Faturamento Mensal' : 'Facturación Mensual'}
          </button>

          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isAnnual
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{isPortuguese ? 'Faturamento Anual' : 'Facturación Anual'}</span>
            <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              {isPortuguese ? '20% OFF' : '20% OFF'}
            </span>
          </button>
        </div>

        {isAnnual && (
          <p className="text-xs text-emerald-400 font-bold mt-2.5">
            ✨ {isPortuguese ? 'Economize 2 meses grátis pagando anualmente' : 'Ahorra 2 meses completos contratando el plan anual'}
          </p>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {PLANS.map((plan) => {
          const price = isAnnual ? plan.annualMonthlyUSD : plan.monthlyUSD;
          const savingsPerYear = (plan.monthlyUSD - plan.annualMonthlyUSD) * 12;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#0A2558] to-slate-900 border-2 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.15)] md:-translate-y-2'
                  : 'bg-slate-900/90 border border-slate-700/80 hover:border-slate-600'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  {plan.isPopular && <Sparkles className="w-5 h-5 text-emerald-400" />}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-400 font-mono">$</span>
                    <span className="text-4xl font-black text-white">{price}</span>
                    <span className="text-xs text-slate-400">USD / {isPortuguese ? 'mês' : 'mes'}</span>
                  </div>

                  {isAnnual && (
                    <div className="mt-1 text-[11px] text-emerald-400 font-medium">
                      Ahorras ${savingsPerYear} USD al año
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{isPortuguese ? 'Configuração e Setup Inicial' : 'Setup e Implementación'}:</span>
                    <span className="font-bold text-slate-300">${plan.setupUSD} USD (único)</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isPortuguese ? 'O que está incluído:' : 'Qué incluye este plan:'}
                  </span>

                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-2 space-y-2 opacity-50">
                      {plan.notIncluded.map((notFeat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <span className="w-4 h-4 rounded-full border border-slate-600 text-slate-500 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✕</span>
                          <span className="line-through">{notFeat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => {
                    if (onSelectPlan) onSelectPlan(plan.id);
                    if (onOpenWizard) onOpenWizard();
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    plan.isPopular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-[#0A2558] hover:bg-[#13377a] text-white border border-blue-500/30'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-2.5 text-center">
                  <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    Garantía de satisfacción o reembolso en 15 días
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise custom footer */}
      <div className="mt-12 text-center bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-2xl mx-auto">
        <h4 className="text-sm font-bold text-white mb-1">
          {isPortuguese ? '¿Precisa de uma solução corporativa sob medida?' : '¿Tu empresa requiere integraciones personalizadas con ERPs existentes?'}
        </h4>
        <p className="text-xs text-slate-400 mb-4">
          {isPortuguese
            ? 'Desenvolvemos conectores customizados para SAP, TOTVS, Salesforce e bancos de dados locais.'
            : 'Desarrollamos conectores a medida con SAP, Tango, Bejerman, MercadoLibre y APIs propietarias.'}
        </p>
        <button
          onClick={onOpenWizard}
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-xs underline cursor-pointer"
        >
          <span>{isPortuguese ? 'Solicitar Reunião com Arquiteto de Soluções' : 'Solicitar Reunión con un Arquitecto de Soluciones'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
