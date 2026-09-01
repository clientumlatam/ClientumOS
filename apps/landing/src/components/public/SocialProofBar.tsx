import React from 'react';
import { useLanguage } from '@clientum/ui';
import {
  TrendingUp,
  ArrowRight,
  Clock,
  Zap,
  CheckCircle2,
  Building,
  Truck,
  ShoppingCart,
  Layers,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface CaseProof {
  company: string;
  industry: string;
  industryPt: string;
  logoText: string;
  logoBg: string;
  location: string;
  before: {
    leadResponseTime: string;
    lostLeadsRate: string;
    manualHoursPerWeek: string;
    problem: string;
    problemPt: string;
  };
  after: {
    leadResponseTime: string;
    conversionIncrease: string;
    hoursSavedPerMonth: string;
    solution: string;
    solutionPt: string;
    quote: string;
    author: string;
  };
}

const REAL_CLIENTS_AND_CASES: CaseProof[] = [
  {
    company: "Distribuidora Sur Patagónica",
    industry: "Distribución Mayorista",
    industryPt: "Distribuição Atacadista",
    logoText: "DSP",
    logoBg: "bg-blue-600",
    location: "Neuquén & Río Negro",
    before: {
      leadResponseTime: "4 a 6 horas",
      lostLeadsRate: "35% de consultas perdidas",
      manualHoursPerWeek: "28 hs cargando Excel y AFIP",
      problem: "Pedidos por WhatsApp colapsaban a los vendedores, stock desactualizado y demora de días en emitir facturas con CAE.",
      problemPt: "Pedidos por WhatsApp sobrecarregavam vendedores, estoque desatualizado e demora de dias para faturar."
    },
    after: {
      leadResponseTime: "< 15 segundos con IA",
      conversionIncrease: "+42% ventas concretadas",
      hoursSavedPerMonth: "110 hs operativas ahorradas",
      solution: "Chatbot WhatsApp IA conectado a CRM + Facturación AFIP automática + Lista de precios mayorista en tiempo real.",
      solutionPt: "Chatbot WhatsApp IA integrado ao CRM + Faturamento automático + Tabela de preços em tempo real.",
      quote: "Pasamos de perder pedidos los fines de semana a automatizar el 60% de las órdenes recurrentes sin contratar más personal.",
      author: "Esteban R. · Gerente Comercial"
    }
  },
  {
    company: "Clínica & Consultorios Médicos Alvear",
    industry: "Salud & Bienestar",
    industryPt: "Saúde & Clínicas",
    logoText: "CMA",
    logoBg: "bg-teal-600",
    location: "Buenos Aires",
    before: {
      leadResponseTime: "12 a 24 horas",
      lostLeadsRate: "40% de ausentismo en turnos",
      manualHoursPerWeek: "35 hs de llamadas telefónicas",
      problem: "Líneas colapsadas, pacientes esperando turnos y secretarias saturadas llamando para confirmar asistencia.",
      problemPt: "Linhas telefônicas congestionadas, pacientes esperando e secretárias sobrecarregadas confirmando consultas."
    },
    after: {
      leadResponseTime: "Inmediata 24/7",
      conversionIncrease: "-68% ausentismo a turnos",
      hoursSavedPerMonth: "140 hs de gestión liberadas",
      solution: "Agente IA en WhatsApp para agendamiento autónomo por especialidad y recordatorios automáticos interactivos.",
      solutionPt: "Agente IA no WhatsApp para agendamento autônomo por especialidade e lembretes automáticos interativos.",
      quote: "El bot atiende de noche y los domingos. La tasa de confirmación de turnos subió al 92% el primer mes.",
      author: "Dra. Marcela V. · Directora Médica"
    }
  },
  {
    company: "Agroinsumos & Logística Pampeana",
    industry: "Agroindustria & Químicos",
    industryPt: "Agronegócio & Insumos",
    logoText: "ALP",
    logoBg: "bg-emerald-700",
    location: "Santa Fe & Córdoba",
    before: {
      leadResponseTime: "8 horas promedio",
      lostLeadsRate: "Cotizaciones lentas",
      manualHoursPerWeek: "22 hs en cruce de remitos",
      problem: "Cotizaciones complejas en dólares y pesos por campaña con seguimiento manual en cuadernos y hojas de cálculo.",
      problemPt: "Cotações complexas por safra com acompanhamento manual em cadernos e planilhas dispersas."
    },
    after: {
      leadResponseTime: "< 1 minuto",
      conversionIncrease: "+35% cierre de presupuestos",
      hoursSavedPerMonth: "95 hs administrativas",
      solution: "Pipeline CRM B2B + Cotizador inteligente multimoneda + Asistente WhatsApp de seguimiento a productores.",
      solutionPt: "Pipeline CRM B2B + Cotizador inteligente multimoeda + Assistente WhatsApp de follow-up a produtores.",
      quote: "Los agrónomos cotizan desde el campo en 2 minutos y la orden entra directa a administración sin errores.",
      author: "Ing. Jorge M. · Socio Fundador"
    }
  }
];

const CLIENT_LOGOS = [
  { name: "Patagonia Logistics", tag: "Logística B2B", initials: "PL", color: "from-blue-600 to-indigo-700" },
  { name: "Sanitas Salud", tag: "Red de Clínicas", initials: "SS", color: "from-teal-600 to-emerald-700" },
  { name: "AgroSur Pampeana", tag: "Agroindustria", initials: "AP", color: "from-emerald-700 to-green-800" },
  { name: "Bistró Gourmet Group", tag: "Cadena Gastronómica", initials: "BG", color: "from-amber-600 to-orange-700" },
  { name: "Inmobiliaria Alvear", tag: "Real Estate", initials: "IA", color: "from-sky-600 to-blue-800" },
  { name: "Estudio Impositivo & Asoc.", tag: "Consultoría Fiscal", initials: "EI", color: "from-violet-700 to-indigo-800" },
];

export function SocialProofBar() {
  const { isPortuguese } = useLanguage();

  return (
    <div className="w-full bg-slate-950 border-y border-slate-800 py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Top Logo Bar */}
        <div>
          <div className="text-center mb-6">
            <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">
              {isPortuguese ? "Confiança Comprovada" : "Confían en la tecnología de Clientum"}
            </span>
            <h3 className="text-sm font-semibold text-slate-300 mt-1">
              {isPortuguese
                ? "+480 empresas e PMEs automatizam suas vendas e processos conosco"
                : "+480 empresas y PyMEs automatizan sus ventas y gestión con nosotros"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center gap-3 transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${client.color} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                  {client.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                    {client.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {client.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After Case Studies */}
        <div>
          <div className="text-center mb-8">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider font-mono">
              {isPortuguese ? "Resultados Mensuráveis" : "Impacto Cuantificable · Antes vs. Después"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
              {isPortuguese ? "O que muda quando sua PyME implementa a Clientum" : "Métricas reales de clientes que transformaron su operación"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {REAL_CLIENTS_AND_CASES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${item.logoBg} text-white font-black text-xs flex items-center justify-center`}>
                        {item.logoText}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">{item.company}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {isPortuguese ? item.industryPt : item.industry} · {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Before vs After Comparison */}
                  <div className="grid grid-cols-2 gap-2 my-4">
                    {/* Before */}
                    <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 font-mono flex items-center gap-1">
                          ❌ {isPortuguese ? "Antes" : "Antes"}
                        </span>
                        <div className="mt-2 space-y-1.5 text-[11px] text-slate-300">
                          <p className="font-semibold text-rose-300 line-through opacity-80">{item.before.leadResponseTime}</p>
                          <p className="text-[10px] text-slate-400 leading-tight">{item.before.lostLeadsRate}</p>
                          <p className="text-[10px] text-slate-500">{item.before.manualHoursPerWeek}</p>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1">
                          ✅ {isPortuguese ? "Com Clientum" : "Con Clientum"}
                        </span>
                        <div className="mt-2 space-y-1.5 text-[11px] text-slate-200">
                          <p className="font-bold text-emerald-400">{item.after.leadResponseTime}</p>
                          <p className="text-[10px] font-semibold text-emerald-300">{item.after.conversionIncrease}</p>
                          <p className="text-[10px] text-slate-300 font-mono">{item.after.hoursSavedPerMonth}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Solution summary */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-300">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {isPortuguese ? "Solução Aplicada:" : "Implementación:"}
                    </span>
                    {isPortuguese ? item.after.solutionPt : item.after.solution}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-[11px] italic text-slate-400 leading-relaxed">
                    "{item.after.quote}"
                  </p>
                  <p className="text-[10px] font-bold text-emerald-400 mt-1.5">
                    — {item.after.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
