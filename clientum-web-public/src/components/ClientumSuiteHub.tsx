import React from 'react';
import {
  Briefcase,
  Compass,
  Target,
  BarChart3,
  Radio,
  Bot,
  Send,
  Users2,
  Sparkles,
  Zap,
  FileText,
  Search,
  Share2,
  Receipt,
  CreditCard,
  Code,
  ArrowUpRight,
  ExternalLink,
  Kanban,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Globe
} from 'lucide-react';
import { ActiveTab } from '../types';

interface ClientumSuiteHubProps {
  onNavigate: (tab: ActiveTab) => void;
}

interface SuiteItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  targetTab?: ActiveTab;
  badge?: string;
  color: string;
  iconBg: string;
  iconColor: string;
  isExternal?: boolean;
  externalUrl?: string;
}

interface SuiteColumn {
  id: string;
  title: string;
  dotColor: string;
  items: SuiteItem[];
}

export function ClientumSuiteHub({ onNavigate }: ClientumSuiteHubProps) {
  const columns: SuiteColumn[] = [
    {
      id: 'crm',
      title: 'CRM & PIPELINE',
      dotColor: 'bg-blue-500',
      items: [
        {
          id: 'crm_inteligente',
          title: 'CRM Inteligente',
          desc: 'Kanban de oportunidades y gestión de deals',
          icon: Kanban,
          targetTab: 'crm_kanban',
          color: 'blue',
          iconBg: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
          iconColor: 'text-blue-600',
        },
        {
          id: 'prospeccion_maps',
          title: 'Prospección Maps IA',
          desc: 'Descubrí negocios por zona con Gemini AI',
          icon: Compass,
          targetTab: 'geolocated_prospecting',
          color: 'indigo',
          iconBg: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
          iconColor: 'text-indigo-600',
        },
        {
          id: 'lead_scoring_meddic',
          title: 'Lead Scoring MEDDIC',
          desc: 'Calificá leads con metodología empresarial B2B',
          icon: ShieldCheck,
          targetTab: 'meddic',
          color: 'indigo',
          iconBg: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
          iconColor: 'text-purple-600',
        },
        {
          id: 'business_intelligence',
          title: 'Business Intelligence',
          desc: 'CAC, LTV y métricas de conversión en tiempo real',
          icon: BarChart3,
          targetTab: 'analytics_dashboard',
          color: 'rose',
          iconBg: 'bg-rose-50 hover:bg-rose-100 text-rose-600',
          iconColor: 'text-rose-600',
        },
      ],
    },
    {
      id: 'email',
      title: 'EMAIL & OUTREACH',
      dotColor: 'bg-amber-500',
      items: [
        {
          id: 'campanas_auto',
          title: 'Campañas & Automatización',
          desc: 'Drip email, broadcast masivo y nurturing',
          icon: Radio,
          targetTab: 'email_campaigns',
          color: 'amber',
          iconBg: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
          iconColor: 'text-amber-600',
        },
        {
          id: 'chatbot_whatsapp',
          title: 'Chatbot WhatsApp 24/7',
          desc: 'Atención automática, sin código ni IT',
          icon: Bot,
          targetTab: 'ai_hub',
          color: 'emerald',
          iconBg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
          iconColor: 'text-emerald-600',
        },
        {
          id: 'agente_outreach',
          title: 'Agente Outreach Automático',
          desc: 'SDR IA que prospecta y hace seguimiento solo',
          icon: Send,
          targetTab: 'outreach_agent',
          color: 'orange',
          iconBg: 'bg-orange-50 hover:bg-orange-100 text-orange-600',
          iconColor: 'text-orange-600',
        },
        {
          id: 'portal_cliente',
          title: 'Portal del Cliente',
          desc: 'Autoatención, tickets y seguimiento en línea',
          icon: Users2,
          targetTab: 'contacts',
          color: 'teal',
          iconBg: 'bg-teal-50 hover:bg-teal-100 text-teal-600',
          iconColor: 'text-teal-600',
        },
      ],
    },
    {
      id: 'ia',
      title: 'IA & CONTENIDO',
      dotColor: 'bg-purple-500',
      items: [
        {
          id: 'asistente_gemini',
          title: 'Asistente IA Gemini 2.5',
          desc: 'Analista CMO disponible en todo momento',
          icon: Sparkles,
          targetTab: 'chat',
          color: 'purple',
          iconBg: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
          iconColor: 'text-purple-600',
        },
        {
          id: 'generador_estrategias',
          title: 'Generador de Estrategias',
          desc: 'Planes go-to-market con IA en minutos',
          icon: Zap,
          targetTab: 'strategy',
          color: 'pink',
          iconBg: 'bg-pink-50 hover:bg-pink-100 text-pink-600',
          iconColor: 'text-pink-600',
        },
        {
          id: 'ad_copy_studio',
          title: 'AI Ad Copy Studio',
          desc: 'Copys para LinkedIn, anuncios y email',
          icon: FileText,
          targetTab: 'copywriter',
          color: 'sky',
          iconBg: 'bg-sky-50 hover:bg-sky-100 text-sky-600',
          iconColor: 'text-sky-600',
        },
        {
          id: 'suite_seo',
          title: 'Suite SEO Completa',
          desc: 'Keywords, auditoría, rank tracker y calendario',
          icon: Search,
          targetTab: 'keyword_research',
          color: 'emerald',
          iconBg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
          iconColor: 'text-emerald-600',
        },
      ],
    },
    {
      id: 'tech',
      title: 'PLATAFORMA & TECH',
      dotColor: 'bg-slate-400',
      items: [
        {
          id: 'integraciones',
          title: '60+ Integraciones',
          desc: 'WhatsApp, ERP, APIs, webhooks y más',
          icon: Share2,
          targetTab: 'settings',
          color: 'emerald',
          iconBg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
          iconColor: 'text-emerald-600',
        },
        {
          id: 'facturacion_afip',
          title: 'Facturación AFIP',
          desc: 'Facturá electrónicamente sin salir del CRM',
          icon: Receipt,
          targetTab: 'vscrm_afip',
          color: 'blue',
          iconBg: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
          iconColor: 'text-blue-600',
        },
        {
          id: 'cobros_mercadopago',
          title: 'Cobros MercadoPago',
          desc: 'Suscripciones y links de pago automáticos',
          icon: CreditCard,
          targetTab: 'vscrm_invoices',
          color: 'cyan',
          iconBg: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-600',
          iconColor: 'text-cyan-600',
        },
        {
          id: 'desarrollo_web',
          title: 'Desarrollo Web',
          desc: 'Tu sitio conectado al CRM desde el día 1',
          icon: Code,
          targetTab: 'public_website',
          color: 'slate',
          iconBg: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
          iconColor: 'text-slate-700',
        },
      ],
    },
  ];

  const handleItemClick = (item: SuiteItem) => {
    if (item.targetTab) {
      onNavigate(item.targetTab);
    }
  };

  return (
    <div className="bg-[#12284C] rounded-2xl p-6 sm:p-8 shadow-xl text-white border border-slate-700/60 transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Plataforma Clientum CRM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Suite completa de ventas, marketing e IA para PyMEs
          </p>
        </div>

        <button
          onClick={() => onNavigate('workflow')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00B074] hover:bg-[#009663] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer self-start sm:self-auto tracking-wide uppercase"
        >
          <span>VER TODO</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-700/50">
        {columns.map((col, idx) => (
          <div
            key={col.id}
            className={`space-y-4 ${idx > 0 ? 'pt-6 lg:pt-0 lg:pl-6' : ''}`}
          >
            {/* Column Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor} ring-4 ring-white/10`} />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                {col.title}
              </h3>
            </div>

            {/* Column Items */}
            <div className="space-y-2.5">
              {col.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="group flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 hover:bg-white/10 border border-slate-700/40 hover:border-indigo-400/50 transition-all cursor-pointer text-left"
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 shadow-xs ${item.iconBg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                          {item.title}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-300/90 leading-tight mt-0.5 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientumSuiteHub;
