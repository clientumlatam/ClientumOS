import React, { useState } from 'react';
import {
  Star,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Building2,
  Tractor,
  Truck,
  HeartPulse,
  Home,
  ShoppingCart,
  Clock,
  Play
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';

interface PublicCaseStudiesPageProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicCaseStudiesPage: React.FC<PublicCaseStudiesPageProps> = ({ onNavigate }) => {
  const { enterApp } = useCRM();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const cases = [
    {
      id: 'case-1',
      industry: 'Agro',
      company: 'Grupo Agro-Industrial Patagonia',
      location: 'Valle Medio & General Roca, Río Negro',
      headline: 'Cómo una compañía de maquinaria y acopio aumentó 35% sus cierres comerciales sin sumar vendedores',
      challenge: 'Perdían cotizaciones por consultas de productores desatendidas los fines de semana y falta de seguimiento estructurado de presupuestos de maquinaria pesada.',
      solution: 'Implementación de Pipeline Kanban sincronizado con bot de WhatsApp 24/7 entrenado con fichas técnicas y financiamiento a cosecha.',
      results: [
        { value: '+35%', label: 'Cierre Comercial' },
        { value: '-40%', label: 'Costo por Lead' },
        { value: '< 3 min', label: 'Respuesta WhatsApp' }
      ],
      quote: 'Trabajar con Clientum transformó nuestro proceso comercial. Nos implementaron el CRM y el chatbot en menos de 10 días, ahorrando 20 horas de tareas manuales al mes.',
      author: 'Ing. Roberto Albarracín',
      role: 'CEO & Fundador'
    },
    {
      id: 'case-2',
      industry: 'Distribucion',
      company: 'Distribuidora del Sur S.A.',
      location: 'Neuquén Capital & Alto Valle',
      headline: 'Automatización de 150+ pedidos mayoristas diarios por WhatsApp directo al ERP',
      challenge: 'Los preventistas pasaban horas pasando pedidos a mano desde audios de WhatsApp a planillas de Excel, con errores de tipeo y demoras en despacho.',
      solution: 'Bot de pedidos estructurado con catálogo en tiempo real y generación automática de la orden de venta en el ERP y Factura AFIP con CAE.',
      results: [
        { value: '150+', label: 'Pedidos diarios por bot' },
        { value: '-90%', label: 'Errores de facturación' },
        { value: '4 Horas', label: 'Ahorro diario preventa' }
      ],
      quote: 'El bot nos generó 40% más de consultas en el primer mes sin contratar personal adicional. Los clientes mayoristas prefieren pedir a cualquier hora.',
      author: 'Martín Rostagno',
      role: 'Gerente de Operaciones'
    },
    {
      id: 'case-3',
      industry: 'Salud',
      company: 'Red Médica San Martín',
      location: 'Rosario, Santa Fe',
      headline: 'Reducción del 80% en ausentismo a turnos médicos con recordatorios conversacionales',
      challenge: 'Pérdida de miles de dólares mensuales por pacientes que no se presentaban a turnos con especialistas ni cancelaban con anticipación.',
      solution: 'Secuencias automatizadas por WhatsApp 48h y 24h antes del turno con botones de confirmación y re-agendamiento automático.',
      results: [
        { value: '-80%', label: 'Tasa de Ausentismo' },
        { value: '94%', label: 'Confirmación por WhatsApp' },
        { value: '3.200+', label: 'Turnos gestionados/mes' }
      ],
      quote: 'Logramos recuperar turnos ociosos de especialistas que antes se perdían, mejorando la atención del paciente y la rentabilidad del sanatorio.',
      author: 'Dra. Silvina Morales',
      role: 'Directora Médica'
    },
    {
      id: 'case-4',
      industry: 'Contable',
      company: 'Estudio Impositivo & Asoc.',
      location: 'Córdoba Capital',
      headline: '400 clientes al día con facturación AFIP automatizada y seguimiento de vencimientos',
      challenge: 'Colapso de carga administrativa los días de vencimiento impositivo y reclamos constantes de clientes por envío tardío de comprobantes fiscales.',
      solution: 'Conexión del portal Clientum para sincronizar emisión masiva de comprobantes con CAE y panel de consulta privado para cada contribuyente.',
      results: [
        { value: '400+', label: 'Clientes sincronizados' },
        { value: '100%', label: 'Facturas con CAE en fecha' },
        { value: '0', label: 'Reclamos por demoras' }
      ],
      quote: 'Nuestros clientes descargan sus facturas y saldos desde su propio portal marca blanca sin tener que llamarnos por teléfono.',
      author: 'Cr. Javier Benítez',
      role: 'Socio Director'
    }
  ];

  const filteredCases = selectedIndustry === 'all'
    ? cases
    : cases.filter((c) => c.industry === selectedIndustry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-current text-emerald-600" />
          <span>Resultados Verificados en Empresas Reales</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Historias de Éxito de Quienes Ya Escalaron con Clientum
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Conoce cómo empresas de agro, distribución, salud y servicios multiplicaron sus ventas y automatizaron su administración en menos de una semana.
        </p>
      </section>

      {/* Case Studies Cards */}
      <div className="space-y-8">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
                  {cs.company} • {cs.location}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
                  {cs.headline}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Challenge & Solution */}
              <div className="lg:col-span-2 space-y-4 text-xs text-slate-700 leading-relaxed">
                <div>
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    El Desafío Previo:
                  </div>
                  <p className="text-slate-600">{cs.challenge}</p>
                </div>
                <div>
                  <div className="font-bold text-blue-700 text-xs uppercase tracking-wider mb-1">
                    La Solución Clientum:
                  </div>
                  <p className="text-slate-600">{cs.solution}</p>
                </div>

                {/* Quote */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 mt-4 shadow-xs">
                  <p className="italic text-slate-800 text-xs">"{cs.quote}"</p>
                  <div className="text-[11px] font-bold text-blue-700">
                    {cs.author} — <span className="text-slate-500 font-normal">{cs.role}</span>
                  </div>
                </div>
              </div>

              {/* Metrics Column */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-center space-y-4 shadow-xs">
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Impacto Cuantificado
                </div>
                {cs.results.map((r, idx) => (
                  <div key={idx} className="border-t border-slate-100 pt-2">
                    <div className="text-2xl font-extrabold text-slate-900">{r.value}</div>
                    <div className="text-[11px] text-slate-500">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="text-center p-8 rounded-3xl bg-blue-50/80 border border-blue-200 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          ¿Querés que tu empresa sea nuestro próximo caso de éxito?
        </h2>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Podemos dejar tu pipeline y agente de WhatsApp funcionando en menos de 5 días hábiles.
        </p>
        <button
          onClick={() => onNavigate('/contacto')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-all shadow-xs"
        >
          Conversar con un Consultor Especialista
        </button>
      </section>

    </div>
  );
};
