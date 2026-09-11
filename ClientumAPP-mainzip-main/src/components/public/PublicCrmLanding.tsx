import React from 'react';
import {
  Kanban,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  FileSpreadsheet,
  MessageSquare,
  Sparkles,
  Zap,
  Play,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';

interface PublicCrmLandingProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicCrmLanding: React.FC<PublicCrmLandingProps> = ({ onNavigate }) => {
  const { enterApp } = useCRM();

  const comparisonItems = [
    {
      feature: 'Precios en Moneda Local',
      clientum: '100% Pesos fijos, sin impuestos al dólar ni sorpresas',
      others: 'Facturación en USD con recargo de impuestos internacionales'
    },
    {
      feature: 'Facturación AFIP con CAE',
      clientum: 'Nativo: emite Facturas A, B y C desde el trato en 1 clic',
      others: 'Requiere integraciones complejas o software externo'
    },
    {
      feature: 'WhatsApp Multicanal & IA',
      clientum: 'Integrado: Código QR directo o Meta API con bot Gemini',
      others: 'Requiere pagar complementos de terceros (Twilio, Sirena)'
    },
    {
      feature: 'Tiempo de Implementación',
      clientum: '< 5 días hábiles promedio, con migración asistida',
      others: 'Semanas o meses con consultores de alto costo'
    },
    {
      feature: 'Soporte Humano Directo',
      clientum: 'WhatsApp ejecutivo con tiempo de respuesta < 4 horas',
      others: 'Tickets lentos por correo en inglés'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-xs">
          <Kanban className="w-3.5 h-3.5 text-blue-600" />
          <span>Clientum CRM 360° • El motor de ventas de las PyMEs líderes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          El CRM diseñado para la forma en que realmente se{' '}
          <span className="text-blue-600">
            vende en América Latina
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Gestiona contactos, oportunidades, cotizaciones en PDF y conversaciones de WhatsApp sin la complejidad ni los costos prohibitivos de los sistemas tradicionales.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={enterApp}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Probar el CRM Ahora Mismo</span>
          </button>
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-sm transition-all cursor-pointer shadow-xs"
          >
            Solicitar Demostración Guiada
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Kanban className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Pipeline Visual Dinámico</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Personaliza tus etapas de prospección, cotización y negociación con vista dual Kanban y Hoja de cálculo con edición en bloque.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">WhatsApp 100% Integrado</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chatea con tus clientes desde la misma ficha de contacto, envía propuestas en PDF y programa seguimientos sin cambiar de pestaña.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Scoring Predictivo MEDDIC</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Califica cada oportunidad identificando decisor económico, métricas de éxito y criterios de compra para enfocar tu tiempo en tratos ganadores.
          </p>
        </div>
      </section>

      {/* Comparison Table vs Legacy CRMs */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Comparativa Directa
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Clientum vs. CRMs Tradicionales (HubSpot / Salesforce)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 bg-white">
                <th className="py-3 px-4 font-bold">Capacidad Clave</th>
                <th className="py-3 px-4 font-bold text-blue-700">Clientum CRM</th>
                <th className="py-3 px-4 font-bold text-slate-500">CRMs Internacionales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.feature}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.clientum}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{item.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-blue-50/80 border border-blue-200 text-center space-y-6 shadow-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Empieza a ordenar tu equipo comercial hoy
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Pruébalo gratis con nuestra base de datos de demostración o solicita un plan a medida para tu empresa.
        </p>
        <button
          onClick={enterApp}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 cursor-pointer"
        >
          Acceder al CRM en Vivo
        </button>
      </section>

    </div>
  );
};
