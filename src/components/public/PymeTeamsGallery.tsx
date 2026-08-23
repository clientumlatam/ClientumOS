import React, { useState } from 'react';
import { Users, Sparkles, MapPin, CheckCircle2, ArrowRight, X, Building2, TrendingUp, Clock, Bot, Briefcase } from 'lucide-react';
import pymeTeamMeetingImg from '../../assets/images/pyme_team_meeting_1787518635370.jpg';
import pymeCommercialSalesImg from '../../assets/images/pyme_commercial_sales_1787518652661.jpg';
import pymeAgroLogisticsImg from '../../assets/images/pyme_agro_logistics_1787518669322.jpg';
import pymeCustomerSuccessImg from '../../assets/images/pyme_customer_success_1787518683571.jpg';

export interface PymeTeamStory {
  id: string;
  title: string;
  category: 'ventas' | 'logistica' | 'atencion' | 'estrategia';
  categoryLabel: string;
  location: string;
  flag: string;
  companyName: string;
  industry: string;
  image: string;
  role: string;
  teamSize: string;
  summary: string;
  fullStory: string;
  toolsUsed: string[];
  metrics: {
    highlight: string;
    label: string;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const PYME_TEAMS_DATA: PymeTeamStory[] = [
  {
    id: 'pyme-estrategia-reunion',
    title: 'Comité de Dirección y Crecimiento Comercial',
    category: 'estrategia',
    categoryLabel: 'Estrategia & Dirección',
    location: 'General Roca · Río Negro',
    flag: '🇦🇷',
    companyName: 'Grupo Agro-Industrial del Comahue',
    industry: 'Agroindustria y Exportación de Frutas',
    image: pymeTeamMeetingImg,
    role: 'Equipo Directivo & Líderes de Área',
    teamSize: '4 directores y 28 colaboradores',
    summary: 'Reunión semanal de planificación comercial y seguimiento de exportaciones con tableros Business Intelligence en tiempo real.',
    fullStory: 'El equipo de dirección de la empresa frutícola se reúne semanalmente para revisar el avance de ventas y exportaciones. Con la implementación del CRM y los tableros analíticos de Clientum, dejaron atrás los informes estáticos en papel y ahora toman decisiones basadas en márgenes reales por lote y tiempos de entrega garantizados.',
    toolsUsed: ['CRM Pipeline B2B', 'Business Intelligence', 'Portal de Productores', 'Alertas WhatsApp'],
    metrics: {
      highlight: '+34%',
      label: 'Incremento en velocidad de cotización'
    },
    testimonial: {
      quote: 'Ahora todo el equipo gerencial tiene la misma foto del negocio en un solo panel, sin esperar al cierre de mes.',
      author: 'Ing. Martín Soria',
      role: 'Director de Operaciones'
    }
  },
  {
    id: 'pyme-ventas-comercial',
    title: 'Asesores Comerciales y Gestión de Presupuestos',
    category: 'ventas',
    categoryLabel: 'Ventas & CRM',
    location: 'Buenos Aires · Microcentro / Remoto',
    flag: '🇦🇷',
    companyName: 'Distribuidora Mayorista del Plata',
    industry: 'Insumos Industriales y Ferretería',
    image: pymeCommercialSalesImg,
    role: 'Asesores de Ventas y Cuentas Clave',
    teamSize: '6 ejecutivos comerciales',
    summary: 'Elaboración ágil de presupuestos B2B, seguimiento automatizado de cotizaciones y facturación electrónica AFIP en un clic.',
    fullStory: 'Los ejecutivos comerciales de la distribuidora utilizan el CRM y la sincronización con WhatsApp de Clientum para responder consultas mayoristas en menos de dos minutos. El sistema auto-completa precios por escala, valida stock y genera el comprobante fiscal homologado con AFIP inmediatamente tras la confirmación del pago.',
    toolsUsed: ['WhatsApp Multi-Agente', 'Cotizador Rápido', 'Facturación AFIP Automática', 'Pasarela de Cobro'],
    metrics: {
      highlight: '< 2 min',
      label: 'Tiempo de respuesta a consultas B2B'
    },
    testimonial: {
      quote: 'Antes tardábamos hasta 24 horas en enviar un presupuesto complejo. Hoy lo hacemos en una llamada con el cliente.',
      author: 'Camila Rossi',
      role: 'Ejecutiva Comercial Senior'
    }
  },
  {
    id: 'pyme-agro-logistica',
    title: 'Supervisores de Logística, Empaque y Despacho',
    category: 'logistica',
    categoryLabel: 'Logística & Agro',
    location: 'Neuquén Capital · Parque Industrial',
    flag: '🇦🇷',
    companyName: 'Logística Austral & Almacenamiento',
    industry: 'Cadena de Frío y Transporte de Cargas',
    image: pymeAgroLogisticsImg,
    role: 'Jefes de Depósito y Coordinadores de Flota',
    teamSize: '12 operarios y supervisores',
    summary: 'Coordinación en planta con tablets digitales, trazabilidad de pallets y sincronización de stock multicanal sin papeles.',
    fullStory: 'En el centro de distribución y almacenamiento en frío, los supervisores utilizan tablets conectadas a la nube para auditar entradas, salidas y temperaturas de conservación. Toda la información se sincroniza en vivo con el sistema ERP de la empresa y notifica por WhatsApp a los transportistas cuando la orden está lista para el despacho.',
    toolsUsed: ['ERP de Depósito', 'Trazabilidad por QR/Lote', 'Alertas a Transportistas', 'Control de Stock'],
    metrics: {
      highlight: '0%',
      label: 'Extravío o descalce de mercadería'
    },
    testimonial: {
      quote: 'Digitalizar el depósito nos dio tranquilidad total. Sabemos exactamente dónde está cada pallet al instante.',
      author: 'Gustavo Maidana',
      role: 'Jefe de Centro Logístico'
    }
  },
  {
    id: 'pyme-atencion-customer-success',
    title: 'Especialista en Atención, Onboarding y Soporte',
    category: 'atencion',
    categoryLabel: 'Atención & IA',
    location: 'Córdoba Capital · Centro',
    flag: '🇦🇷',
    companyName: 'TechSolutions & Consultoría PyME',
    industry: 'Servicios Profesionales y Post-Venta',
    image: pymeCustomerSuccessImg,
    role: 'Atención Omnicanal y Fidelización',
    teamSize: '4 especialistas en soporte',
    summary: 'Atención personalizada asistida por Santi Copilot IA para resolución inmediata de dudas y seguimiento de satisfacción.',
    fullStory: 'El equipo de atención al cliente combina la calidez del trato humano con la agilidad del asistente de inteligencia artificial de Clientum. Las preguntas frecuentes de horarios, listas de precios y estado de pedidos se responden de forma instantánea 24/7, permitiendo a los asesores concentrarse en resolver consultas técnicas y asesorar a los clientes en proyectos a medida.',
    toolsUsed: ['Chatbot Gemini 3.6 IA', 'Bandeja Unificada', 'Tickets de Soporte', 'Encuestas de Satisfacción'],
    metrics: {
      highlight: '98.5%',
      label: 'Índice de satisfacción al cliente'
    },
    testimonial: {
      quote: 'El bot filtra y califica el 70% de las consultas repetitivas, dejándonos tiempo para mimar a nuestros mejores clientes.',
      author: 'Mariana Peralta',
      role: 'Responsable de Customer Success'
    }
  }
];

export const PymeTeamsGallery: React.FC<{
  onContactClick?: () => void;
  title?: string;
  subtitle?: string;
}> = ({
  onContactClick,
  title = "Personas y Equipos Trabajando en PyMEs Reales",
  subtitle = "Mirá cómo las empresas argentinas y latinoamericanas impulsan su día a día con las herramientas y consultoría de Clientum."
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedStory, setSelectedStory] = useState<PymeTeamStory | null>(null);

  const filteredStories = activeCategory === 'todos'
    ? PYME_TEAMS_DATA
    : PYME_TEAMS_DATA.filter(item => item.category === activeCategory);

  return (
    <section className="bg-slate-900 text-white py-20 px-6 border-y border-slate-800 relative overflow-hidden" id="equipos-pyme-galeria">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase px-3.5 py-1.5 rounded-full tracking-widest inline-flex items-center gap-2 mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Equipos Reales en Acción
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
            {subtitle}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'todos', label: 'Todos los Equipos' },
              { id: 'ventas', label: 'Ventas & CRM' },
              { id: 'logistica', label: 'Logística & Depósito' },
              { id: 'atencion', label: 'Atención & IA' },
              { id: 'estrategia', label: 'Dirección & Gerencia' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image with overlay badge */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />
                
                {/* Location badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10">
                  <span>{story.flag}</span>
                  <span>{story.location}</span>
                </div>

                {/* Metric pill */}
                <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-mono">
                  {story.metrics.highlight}
                </div>

                {/* Team role bottom label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/30">
                    {story.categoryLabel}
                  </span>
                  <h3 className="text-white font-bold text-sm mt-1 leading-snug drop-shadow-xs">
                    {story.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold mb-2">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{story.companyName}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                {/* Tools tags */}
                <div className="flex flex-wrap gap-1">
                  {story.toolsUsed.slice(0, 2).map((tool, idx) => (
                    <span key={idx} className="text-[9px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                      {tool}
                    </span>
                  ))}
                  {story.toolsUsed.length > 2 && (
                    <span className="text-[9px] text-emerald-400 px-1 py-0.5 font-bold">
                      +{story.toolsUsed.length - 2}
                    </span>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Impacto</span>
                    <span className="text-[11px] text-emerald-400 font-bold">{story.metrics.label}</span>
                  </div>
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Ver caso <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold text-white">¿Querés que tu equipo también ahorre horas y multiplique sus ventas?</h4>
              <p className="text-slate-300 text-xs mt-1">Implementamos CRM, WhatsApp con IA y automatizaciones en 5 días hábiles con acompañamiento humano cercano.</p>
            </div>
          </div>
          <button
            onClick={onContactClick}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Consultar para mi PyME</span>
          </button>
        </div>
      </div>

      {/* Modal with Full Team Story */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 w-full bg-slate-950">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    {selectedStory.categoryLabel}
                  </span>
                  <span className="text-slate-300 text-xs flex items-center gap-1 font-semibold">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {selectedStory.location}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white">
                  {selectedStory.title}
                </h3>
                <p className="text-slate-300 text-xs mt-0.5 font-medium">
                  {selectedStory.companyName} · {selectedStory.industry}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 font-mono">
                  Historia &amp; Transformación Operativa
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {selectedStory.fullStory}
                </p>
              </div>

              {/* Quote Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative">
                <p className="text-xs md:text-sm text-slate-200 italic leading-relaxed">
                  "{selectedStory.testimonial.quote}"
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3">
                  <div>
                    <div className="text-xs font-bold text-white">{selectedStory.testimonial.author}</div>
                    <div className="text-[10px] text-slate-400">{selectedStory.testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400 font-mono">{selectedStory.metrics.highlight}</span>
                    <div className="text-[9px] text-slate-400">{selectedStory.metrics.label}</div>
                  </div>
                </div>
              </div>

              {/* Tools list */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Herramientas Implementadas por Clientum:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStory.toolsUsed.map((tool, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-emerald-300 border border-emerald-500/20 px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onContactClick?.();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Pedir presupuesto para este caso</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PymeTeamsGallery;
