import React from 'react';
import {
  Building2,
  MapPin,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  Globe,
  Sparkles,
  Server,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { CLIENTUM_BROCHURE_METRICS } from '../../data/clientumCatalog';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';

interface PublicCompanyPageProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicCompanyPage: React.FC<PublicCompanyPageProps> = ({ onNavigate }) => {
  const { enterApp } = useCRM();

  const milestones = [
    {
      year: '2023',
      title: 'Nacimiento en la Patagonia Argentina',
      desc: 'Fundada en General Roca, Río Negro, para resolver el caos de ventas y cobranzas en distribuidores mayoristas y empresas de servicios del Alto Valle.'
    },
    {
      year: '2024',
      title: 'Despliegue del Motor AFIP & WhatsApp',
      desc: 'Lanzamiento del módulo de facturación electrónica homologada con CAE y el gateway de conexión WhatsApp en 60 segundos.'
    },
    {
      year: '2025',
      title: 'Integración de Agentes IA Gemini & Expansión a Rosario',
      desc: 'Alianza de infraestructura con Google Cloud para potenciar chatbots de venta con modelos Gemini 3.6 Flash y apertura del nodo técnico en Rosario.'
    },
    {
      year: '2026',
      title: '+1.750 PyMEs Activas en el Cono Sur',
      desc: 'Consolidación como la plataforma comercial más completa y accesible para empresas de Argentina, Chile, Uruguay y Paraguay.'
    }
  ];

  const values = [
    {
      title: 'Soberanía de Datos & Respaldo Local',
      desc: 'Tus datos se alojan bajo los estándares más exigentes de seguridad, sin riesgo de bloqueos por políticas impositivas extranjeras.'
    },
    {
      title: 'Soporte Humano Cercano',
      desc: 'Atención directa por WhatsApp con ejecutivos técnicos que entienden la realidad impositiva y comercial de tu país.'
    },
    {
      title: 'Innovación Pragmática',
      desc: 'No implementamos tecnología por moda: cada función debe traducirse en más ventas cerradas o menos horas de trabajo manual.'
    },
    {
      title: 'Transparencia de Precios',
      desc: 'Precios fijos en moneda nacional, sin cobros por usuario inflados ni recargos sorpresa a fin de mes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-xs">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Sobre Clientum Latam</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Democratizando la Inteligencia Comercial para las PyMEs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Nacimos para que ninguna empresa de la región quede relegada de la revolución digital por culpa de costos en dólares o software pensado para Silicon Valley.
        </p>
      </section>

      {/* Story & Location */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Nuestra Historia
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Tecnología de clase mundial desarrollada desde el sur del continente
          </h2>
          <p className="text-slate-600">
            Vimos a cientos de empresarios batallar a diario: presupuestos perdidos en chats personales de vendedores, planillas de Excel desactualizadas y horas perdidas entrando a la web de AFIP a tipear facturas a mano.
          </p>
          <p className="text-slate-600">
            Clientum se construyó en el terreno real, conversando con agrónomos, distribuidores de alimentos, dueños de clínicas y profesionales independientes. Hoy combinamos modelos de Inteligencia Artificial de vanguardia con el soporte cálido y resolutivo que mereces.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-bold text-blue-700">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              General Roca, Patagonia
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Rosario, Santa Fe
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Métricas de la Compañía</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1.750+</div>
              <div className="text-[11px] text-slate-500 mt-1">Empresas confían en nosotros</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.9%</div>
              <div className="text-[11px] text-slate-500 mt-1">Uptime garantizado en SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">&lt; 4 Horas</div>
              <div className="text-[11px] text-slate-500 mt-1">Tiempo de respuesta en soporte</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">100%</div>
              <div className="text-[11px] text-slate-500 mt-1">Facturación local en pesos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Principios Rectores</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Nuestros Valores Fundacionales</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Evolución</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Camino Recorrido</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="text-blue-600 font-extrabold text-lg">{m.year}</div>
              <h3 className="text-xs font-bold text-slate-900">{m.title}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 rounded-3xl bg-blue-50/80 border border-blue-200 text-center space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">¿Quieres formar parte de la comunidad Clientum?</h2>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Conoce nuestra plataforma por dentro o solicita una reunión con nuestros directores de producto.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={enterApp}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Explorar Demo
          </button>
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs cursor-pointer shadow-xs"
          >
            Contactar al Equipo
          </button>
        </div>
      </section>

    </div>
  );
};
