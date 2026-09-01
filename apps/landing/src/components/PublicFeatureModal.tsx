import React, { useState } from 'react';
import {
  X,
  Compass,
  FileText,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  Building,
  MapPin,
  Handshake,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  Globe,
  Tag,
  Phone,
  Mail
} from 'lucide-react';
import { ActiveTab } from '../types';
import { PdfExportButton } from './PdfExportButton';

interface PublicFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  onNavigateTab?: (tab: ActiveTab) => void;
}

export function PublicFeatureModal({
  isOpen,
  onClose,
  initialTab = 'servicios',
  onNavigateTab,
}: PublicFeatureModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const publicSections = [
    {
      id: 'soluciones',
      name: 'Soluciones & Plataforma',
      icon: Sparkles,
      desc: 'Suite completa de módulos CRM, Marketing, WhatsApp IA y ERP',
      items: [
        { title: 'Chatbot WhatsApp IA 24/7', desc: 'Atención automatizada y calificación de prospectos con Gemini 3.6', tab: 'ai_hub' as ActiveTab, badge: 'IA' },
        { title: 'CRM Inteligente & Deals', desc: 'Pipeline Kanban con etapas comerciales configurables', tab: 'crm_kanban' as ActiveTab, badge: 'Ventas' },
        { title: 'Prospección Maps IA', desc: 'Descubrimiento satelital y análisis geográfico de empresas B2B', tab: 'geolocated_prospecting' as ActiveTab, badge: 'Maps' },
        { title: 'Lead Scoring MEDDIC', desc: 'Metodología corporativa para calificar oportunidades de alto valor', tab: 'meddic' as ActiveTab, badge: 'Score' },
        { title: 'Facturación AFIP con CAE', desc: 'Emisión automática de facturas electrónicas A, B y C', tab: 'vscrm_afip' as ActiveTab, badge: 'ERP' },
        { title: 'Campañas de Email & Broadcast', desc: 'Envíos masivos y secuencias de nutrición con seguimiento', tab: 'email_campaigns' as ActiveTab, badge: 'Email' },
        { title: 'Business Intelligence', desc: 'Dashboards analíticos con KPIs, CAC, LTV y proyecciones', tab: 'analytics_dashboard' as ActiveTab, badge: 'BI' },
        { title: 'Portal del Cliente B2B', desc: 'Autogestión de cuentas, tickets y pedidos en tiempo real', tab: 'contacts' as ActiveTab, badge: 'Portal' },
      ]
    },
    {
      id: 'precios',
      name: 'Planes & Precios',
      icon: Tag,
      desc: 'Planes flexibles diseñados para escalar desde emprendedores a corporaciones',
      items: [
        { title: 'Plan Inicial ($20 USD/mes)', desc: 'Para emprendedores y pequeños negocios con landing page y CRM básico (200 contactos)', tab: 'overview' as ActiveTab, badge: '$20/mes' },
        { title: 'Plan PyME ($45 USD/mes)', desc: 'Para comercios activos: tienda online, stock, AFIP y bot WhatsApp con FAQs', tab: 'overview' as ActiveTab, badge: '$45/mes' },
        { title: 'Plan Pro ($80 USD/mes)', desc: 'Opción más elegida: IA avanzada, multi-embudo ilimitado y e-commerce premium', tab: 'overview' as ActiveTab, badge: '$80/mes' },
        { title: 'Plan Corporativo ($150 USD/mes)', desc: 'Empresas con múltiples sucursales, portal B2B y analítica predictiva', tab: 'overview' as ActiveTab, badge: '$150/mes' },
        { title: 'Plan Especializado ($250 USD/mes)', desc: 'Infraestructura dedicada, desarrollos a medida y modelos LLM corporativos', tab: 'overview' as ActiveTab, badge: '$250/mes' },
      ]
    },
    {
      id: 'casos',
      name: 'Casos de Éxito & Clientes',
      icon: Users,
      desc: 'Empresas e industrias de todo el país que escalan con Clientum',
      items: [
        { title: 'Cabarcos Motores (Automotriz)', desc: 'Catálogo con reservas digitales y CRM integrado a WhatsApp con +180% de consultas', tab: 'crm_kanban' as ActiveTab, badge: 'Automotriz' },
        { title: 'KJ Logística (Transporte)', desc: 'ERP de control de flota y liquidación de viajes con reportes de rentabilidad', tab: 'vscrm_dashboard' as ActiveTab, badge: 'Logística' },
        { title: 'AFP Service (Industrial)', desc: 'Tienda online de suministros industriales con sincronización de inventario', tab: 'crm_kanban' as ActiveTab, badge: 'Industrial' },
        { title: 'Centro Empleados de Comercio', desc: 'Portal gremial y gestión de beneficios con reducción del 40% en carga administrativa', tab: 'contacts' as ActiveTab, badge: 'Institucional' },
        { title: 'Canal 10 TV (Medios)', desc: 'Portal de noticias y streaming digital con gestión multicanal', tab: 'public_website' as ActiveTab, badge: 'Medios' },
      ]
    },
    {
      id: 'empresa',
      name: 'Empresa & Filosofía',
      icon: Building,
      desc: 'Misión, historia y equipo detrás de la plataforma Clientum',
      items: [
        { title: 'Sobre Clientum S.R.L.', desc: 'Nacidos en 2016 en General Roca, Río Negro (antes Viaweb), operamos 100% de forma remota para toda Latinoamérica', tab: 'overview' as ActiveTab, badge: 'Patagonia' },
        { title: 'Programa de Partners & Afiliados', desc: 'Comisiones recurrentes para consultores y agencias que implementan Clientum', tab: 'settings' as ActiveTab, badge: 'Partners' },
        { title: 'Trabajá con Nosotros', desc: 'Oportunidades abiertas para desarrolladores, especialistas de IA y ejecutivos de ventas', tab: 'overview' as ActiveTab, badge: 'Carreras' },
        { title: 'Sede y Contacto', desc: 'General Roca, Río Negro, Patagonia Argentina · Tel: +54 298 451-0883 · info@clientum.com.ar', tab: 'overview' as ActiveTab, badge: 'Contacto' },
      ]
    },
    {
      id: 'recursos',
      name: 'Recursos & Academia',
      icon: GraduationCap,
      desc: 'Educación continua, guías técnicas, API docs y soporte especializado',
      items: [
        { title: 'Academia Clientum (67 Cursos)', desc: 'Formación gratuita y certificaciones en CRM, automatización de marketing y ventas', tab: 'public_website' as ActiveTab, badge: 'Campus' },
        { title: 'Blog de Negocios & SEO', desc: 'Artículos sobre tácticas de adquisición, SEO semántico y transformación digital', tab: 'keyword_research' as ActiveTab, badge: 'Blog' },
        { title: 'Documentación Técnica de APIs', desc: 'Endpoints REST, webhooks y guías de integración para desarrolladores', tab: 'settings' as ActiveTab, badge: 'Dev Docs' },
        { title: 'Centro de Ayuda & FAQ', desc: 'Respuestas a preguntas frecuentes sobre implementación, facturación y seguridad', tab: 'overview' as ActiveTab, badge: 'Soporte 24/7' },
      ]
    }
  ];

  const currentSection = publicSections.find(s => s.id === activeCategory) || publicSections[0];

  const filteredItems = currentSection.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0A2558] via-[#1A3461] to-[#0A2558] px-6 py-4 flex items-center justify-between text-white border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 font-mono">
                  Ecosistema Web & Dashboard
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h2 className="text-lg font-bold tracking-tight">Catálogo de Funcionalidades & Sitio Público</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('public_website');
                onClose();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir Sitio Público</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Bar & Search */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
            {publicSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeCategory === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveCategory(sec.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1A3461] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar servicios o temas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/50">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">{currentSection.name}</h3>
            <p className="text-xs text-slate-500">{currentSection.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-indigo-300 p-4 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h4>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono font-semibold rounded border border-slate-200 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Disponible en Suite</span>
                  <button
                    onClick={() => {
                      if (onNavigateTab && item.tab) {
                        onNavigateTab(item.tab);
                        onClose();
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    <span>Abrir en Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              No se encontraron coincidencias para "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer info and corporate contact */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              General Roca, Patagonia Argentina
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              +54 298 451-0883
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('public_website');
                onClose();
              }}
              className="text-xs font-bold text-[#1A3461] hover:underline cursor-pointer"
            >
              Ir a Página Principal del Sitio →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
