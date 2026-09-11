import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ClientumLogo } from '../common/ClientumLogo';
import { CLIENTUM_BROCHURE_METRICS } from '../../data/clientumCatalog';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';
import { trackAnalyticsEvent } from '../../lib/analytics';

interface PublicFooterProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { enterApp, showToast, triggerConfetti } = useCRM();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const payload = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(payload.error || 'No se pudo registrar la suscripción.');

      setSubscribed(true);
      trackAnalyticsEvent('newsletter_signup');
      triggerConfetti();
      showToast('¡Gracias por suscribirte al boletín de Clientum!', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'No se pudo registrar la suscripción.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nav = (path: PublicRoutePath) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-xs text-slate-600 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Pre-Footer Bar: Newsletter & Direct Demo CTA */}
      <div className="border-b border-slate-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Boletín de Inteligencia Comercial PyME
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Estrategias de ventas, WhatsApp IA y automatizaciones en tu inbox
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Únete a más de 4.500 dueños de negocio y directores comerciales en América Latina. Sin spam.
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu.email@empresa.com"
                  disabled={subscribed}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                  {subscribed ? '¡Suscrito!' : isSubmitting ? 'Enviando...' : 'Suscribirme'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          
          {/* Col 1: Brand & Contact */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <ClientumLogo className="w-8 h-8" />
              <div>
                <span className="text-base font-extrabold text-slate-900 tracking-tight">Clientum</span>
                <span className="text-base font-extrabold text-blue-600">CRM</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Plataforma omnicanal de gestión comercial, automatizaciones y agentes de Inteligencia Artificial para PyMEs y empresas de América Latina.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{CLIENTUM_BROCHURE_METRICS.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a href="https://wa.me/542984510883" target="_blank" rel="noreferrer" className="hover:text-emerald-700 font-semibold">
                  {CLIENTUM_BROCHURE_METRICS.phone} (WhatsApp Oficial)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <a href={`mailto:${CLIENTUM_BROCHURE_METRICS.email}`} className="hover:text-blue-700 font-semibold">
                  {CLIENTUM_BROCHURE_METRICS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={enterApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-blue-50 border border-slate-300 text-blue-700 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <span>Acceder a la Demo en Vivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Producto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Producto</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => nav('/producto')} className="hover:text-blue-600 transition-colors text-left">
                  Overview Suite
                </button>
              </li>
              <li>
                <button onClick={() => nav('/clientum-crm')} className="hover:text-blue-600 transition-colors text-left">
                  CRM 360°
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/whatsapp-ia')} className="hover:text-blue-600 transition-colors text-left">
                  WhatsApp & Bots IA
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/automatizaciones')} className="hover:text-blue-600 transition-colors text-left">
                  Automatizaciones DAG
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/erp')} className="hover:text-blue-600 transition-colors text-left">
                  ERP & AFIP con CAE
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/bi')} className="hover:text-blue-600 transition-colors text-left">
                  Business Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/agentes-ia')} className="hover:text-blue-600 transition-colors text-left">
                  Agent OS (14 Agentes)
                </button>
              </li>
              <li>
                <button onClick={() => nav('/producto/integraciones')} className="hover:text-blue-600 transition-colors text-left">
                  Integraciones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industrias */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Industrias</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => nav('/industrias')} className="hover:text-blue-600 font-bold transition-colors text-left text-blue-700">
                  Directorio General (10)
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/agro')} className="hover:text-blue-600 transition-colors text-left">
                  Agroindustria
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/estudios-contables')} className="hover:text-blue-600 transition-colors text-left">
                  Estudios Contables
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/distribuidoras')} className="hover:text-blue-600 transition-colors text-left">
                  Distribuidoras Mayoristas
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/salud')} className="hover:text-blue-600 transition-colors text-left">
                  Salud & Clínicas
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/inmobiliaria')} className="hover:text-blue-600 transition-colors text-left">
                  Inmobiliarias
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/gastronomia')} className="hover:text-blue-600 transition-colors text-left">
                  Gastronomía
                </button>
              </li>
              <li>
                <button onClick={() => nav('/industrias/ecommerce')} className="hover:text-blue-600 transition-colors text-left">
                  E-Commerce & Retail
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Soluciones & Servicios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => nav('/servicios')} className="hover:text-blue-600 transition-colors text-left">
                  Catálogo de Servicios
                </button>
              </li>
              <li>
                <button onClick={() => nav('/servicios')} className="hover:text-blue-600 transition-colors text-left">
                  Consultoría Comercial
                </button>
              </li>
              <li>
                <button onClick={() => nav('/servicios')} className="hover:text-blue-600 transition-colors text-left">
                  Integración AFIP & ERP
                </button>
              </li>
              <li>
                <button onClick={() => nav('/servicios')} className="hover:text-blue-600 transition-colors text-left">
                  Desarrollo Web & Tiendas
                </button>
              </li>
              <li>
                <button onClick={() => nav('/servicios')} className="hover:text-blue-600 transition-colors text-left">
                  Growth & Outreach B2B
                </button>
              </li>
              <li>
                <button onClick={() => nav('/dominios')} className="hover:text-blue-600 transition-colors text-left">
                  Gestión DNS & Cloudflare
                </button>
              </li>
              <li>
                <button onClick={() => nav('/tienda/central')} className="hover:text-blue-600 transition-colors text-left">
                  Tienda Digital Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Recursos & Empresa */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => nav('/recursos')} className="hover:text-blue-600 transition-colors text-left">
                  Blog & Guías
                </button>
              </li>
              <li>
                <button onClick={() => nav('/academia')} className="hover:text-blue-600 transition-colors text-left">
                  Campus Academia LMS
                </button>
              </li>
              <li>
                <button onClick={() => nav('/casos')} className="hover:text-blue-600 transition-colors text-left">
                  Casos de Éxito
                </button>
              </li>
              <li>
                <button onClick={() => nav('/precios')} className="hover:text-blue-600 transition-colors text-left">
                  Planes & Precios
                </button>
              </li>
              <li>
                <button onClick={() => nav('/about')} className="hover:text-blue-600 transition-colors text-left">
                  Sobre Clientum
                </button>
              </li>
              <li>
                <button onClick={() => nav('/contacto')} className="hover:text-blue-600 transition-colors text-left">
                  Contacto & Solicitar Demo
                </button>
              </li>
              <li>
                <button onClick={() => nav('/legal')} className="hover:text-blue-600 transition-colors text-left">
                  Términos & Privacidad
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Badges Bar */}
      <div className="border-t border-slate-200 py-6 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Clientum Latam. Todos los derechos reservados. Desarrollado y operado en Argentina.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => nav('/legal')} className="hover:text-slate-800">Términos</button>
            <span>•</span>
            <button onClick={() => nav('/privacidad')} className="hover:text-slate-800">Privacidad</button>
            <span>•</span>
            <button onClick={() => nav('/terminos')} className="hover:text-slate-800">SLA 99.9%</button>
            <span>•</span>
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Soberanía de Datos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
