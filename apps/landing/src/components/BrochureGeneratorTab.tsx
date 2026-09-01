import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Send,
  Building2,
  Users,
  Award,
  ExternalLink,
  Copy,
  Check,
  Share2,
  FileDown,
  Layers,
  Palette,
  Phone,
  Globe,
  Eye,
  Settings2,
  RotateCcw,
  Bot,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import BrochurePreview from './BrochurePreview';
import { BrochureData } from '../types';
import { PdfExportButton } from './common/PdfExportButton';

const INITIAL_CLIENTUM_BROCHURE_DATA: BrochureData = {
  cover: {
    company: 'Clientum B2B Intelligence',
    slogan: 'El Ecosistema Comercial e IA para Escalar tu PyME',
    sub: 'CRM, Chatbot WhatsApp con IA, E-Commerce, ERP, Business Intelligence, Marketing Digital, Ciberseguridad, Cloud, Apps Móviles y Capacitación — el ecosistema completo de Clientum.',
    industry: 'Tecnología & Software B2B'
  },
  logoUrl: '/favicon.svg',
  chatbot: {
    title: 'Chatbot WhatsApp Inteligente con IA (Gemini 3.6)',
    features: [
      {
        title: 'Atención Automatizada 24/7',
        desc: 'Responde consultas en segundos con inteligencia artificial conversacional.'
      },
      {
        title: 'Calificación Inmediata de Leads',
        desc: 'Evalúa la intención de compra y registra los datos directamente en el CRM.'
      },
      {
        title: 'Agendamiento & Seguimiento',
        desc: 'Coordina reuniones comerciales y reengancha prospectos inactivos automáticamente.'
      }
    ],
    flowSteps: [
      'Prospecto envía un mensaje por WhatsApp o sitio web',
      'El agente IA saluda, califica y responde preguntas frecuentes con IA',
      'Registra el lead en el pipeline CRM y notifica al vendedor asignado',
      'Emite recordatorios automáticos de reunión o propuesta de venta'
    ]
  },
  crm: {
    title: 'CRM Inteligente, Analítica & Facturación AFIP',
    features: [
      {
        title: 'Pipeline Kanban Visual',
        desc: 'Gestión drag & drop de oportunidades por etapas comerciales.'
      },
      {
        title: 'Facturación Electrónica AFIP',
        desc: 'Emisión automática de comprobantes A, B y C con CAE en tiempo real.'
      },
      {
        title: 'Asistente IA de Negocios',
        desc: 'Reportes instantáneos y proyecciones de ventas en lenguaje natural.'
      }
    ]
  },
  services: [
    {
      title: 'Módulo 1: CRM & Omnicanalidad',
      desc: 'Gestión integral de clientes, contactos y oportunidades comerciales.',
      price: 150000,
      monthly: 45000,
      time: 5,
      bullets: ['Pipeline Drag & Drop', 'Historial unificado de chats', 'Múltiples embudos por sector']
    },
    {
      title: 'Módulo 2: Chatbot WhatsApp IA',
      desc: 'Agente virtual conversacional alimentado por Gemini 3.6 Flash.',
      price: 180000,
      monthly: 55000,
      time: 7,
      bullets: ['Entrenamiento con catálogo propio', 'Agendamiento automático', 'Notificaciones de voz']
    },
    {
      title: 'Módulo 3: Facturación AFIP & ERP',
      desc: 'Conexión directa con AFIP para emisión de facturas A, B y C.',
      price: 120000,
      monthly: 35000,
      time: 3,
      bullets: ['CAE automático en tiempo real', 'Envío por email/WhatsApp', 'Cálculo de impuestos']
    },
    {
      title: 'Módulo 4: Business Intelligence',
      desc: 'Dashboards analíticos con KPIs en tiempo real y reportes exportables.',
      price: 140000,
      monthly: 40000,
      time: 4,
      bullets: ['Conversión por canal', 'Atribución de ingresos', 'Exportación PDF/Excel']
    },
    {
      title: 'Módulo 5: E-Commerce & Portal Cliente',
      desc: 'Tienda digital conectada con inventario, cuentas corrientes y cobros.',
      price: 220000,
      monthly: 65000,
      time: 10,
      bullets: ['Pasarela MercadoPago', 'Portal de autogestión B2B', 'Sincronización de stock']
    },
    {
      title: 'Módulo 6: Ciberseguridad & Cloud',
      desc: 'Infraestructura protegida con respaldos automáticos y SSL.',
      price: 160000,
      monthly: 50000,
      time: 5,
      bullets: ['Encriptación de grado bancario', 'Copias de seguridad diarias', 'SLA 99.9% garantizado']
    }
  ],
  testimonial: {
    text: 'Implementamos el ecosistema completo de Clientum en menos de una semana. El chatbot de WhatsApp califica 150+ leads semanales y la integración con AFIP nos ahorra 20 horas de administración al mes.',
    author: 'Ing. Roberto Albarracín',
    company: 'CEO, Grupo Agro-Industrial Patagonia'
  }
};

export function BrochureGeneratorTab() {
  const [brochurePreset, setBrochurePreset] = useState<'clientum_full' | 'rio_negro_project'>('clientum_full');
  const [data, setData] = useState<BrochureData>(INITIAL_CLIENTUM_BROCHURE_DATA);
  const [colorTheme, setColorTheme] = useState<string>('navy');
  const [primaryColorHex, setPrimaryColorHex] = useState<string>('#4f46e5');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [showAllPages, setShowAllPages] = useState<boolean>(true);
  const [hidePrices, setHidePrices] = useState<boolean>(false);
  const [showCustomizePanel, setShowCustomizePanel] = useState<boolean>(false);

  const [contactInfo, setContactInfo] = useState({
    website: 'clientum.com.ar',
    email: 'contacto@clientum.com.ar',
    phone: '+54 9 298 412-3456',
    address: 'General Roca, Río Negro — Argentina',
    github: 'https://github.com/clientum-latam'
  });

  const pageNames = [
    { num: 1, name: 'Portada & Inicio' },
    { num: 2, name: 'Quiénes Somos' },
    { num: 3, name: 'La Plataforma' },
    { num: 4, name: 'WhatsApp & CRM' },
    { num: 5, name: 'Asistente IA & AFIP' },
    { num: 6, name: 'Servicios' },
    { num: 7, name: 'Planes & Precios' },
    { num: 8, name: 'Casos & Contacto' }
  ];

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setData(prev => ({ ...prev, logoUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    // Force show all pages for comprehensive printing
    setShowAllPages(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleReset = () => {
    setData(INITIAL_CLIENTUM_BROCHURE_DATA);
    setContactInfo({
      website: 'clientum.com.ar',
      email: 'contacto@clientum.com.ar',
      phone: '+54 9 298 412-3456',
      address: 'General Roca, Río Negro — Argentina',
      github: 'https://github.com/clientum-latam'
    });
    setColorTheme('navy');
    setPrimaryColorHex('#4f46e5');
    setHidePrices(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Sitio Público & Brochure PDF
            </span>
            <span className="text-slate-400 text-xs">· 8 Páginas Completa</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Brochure Oficial de Clientum
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Folleto institucional interactivo con todas las páginas y soluciones del sitio público. Exportable a PDF de alta resolución.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCustomizePanel(!showCustomizePanel)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              showCustomizePanel
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>{showCustomizePanel ? 'Ocultar Personalización' : 'Personalizar Marca & Textos'}</span>
          </button>

          <PdfExportButton
            targetId="brochure-full-export-container"
            title={`Brochure Corporativo 2026 - ${data.cover.company}`}
            filename={`Brochure_${data.cover.company.replace(/\s+/g, '_')}_2026.pdf`}
            label="Descargar PDF con Branding"
            variant="primary"
            branding={{
              logoUrl: data.logoUrl,
              primaryColor: primaryColorHex,
              companyName: data.cover.company
            }}
          />

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
            title="Vista de impresión directa"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Customization Drawer / Panel */}
      {showCustomizePanel && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 no-print">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">
                Personalización Dinámica de Marca (Logo & Colores)
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Marca Predeterminada</span>
            </button>
          </div>

          {/* BRANDING LOGO & COLOR SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-slate-800/80 rounded-xl border border-slate-700/80">
            {/* Logo Upload & URL */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-slate-300 font-bold text-xs flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                <span>Logo de la Empresa (Subir Archivo o URL):</span>
              </label>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0">
                  <Upload className="w-4 h-4" />
                  <span>Subir Imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />
                </label>

                <input
                  type="text"
                  value={data.logoUrl || ''}
                  placeholder="URL pública del logo (https://...)"
                  onChange={(e) => setData(prev => ({ ...prev, logoUrl: e.target.value }))}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />

                {data.logoUrl && (
                  <div className="w-9 h-9 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0">
                    <img src={data.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            </div>

            {/* Primary Color Theme & Hex Picker */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold text-xs flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Color Primario de Marca:</span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColorHex}
                  onChange={(e) => {
                    setPrimaryColorHex(e.target.value);
                  }}
                  className="w-9 h-9 rounded-xl border border-slate-700 bg-transparent cursor-pointer p-0.5 shrink-0"
                />

                <input
                  type="text"
                  value={primaryColorHex}
                  onChange={(e) => setPrimaryColorHex(e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono uppercase focus:outline-hidden focus:border-indigo-500"
                />

                <div className="flex items-center gap-1">
                  {[
                    { hex: '#4f46e5', theme: 'indigo', title: 'Índigo' },
                    { hex: '#1a3461', theme: 'navy', title: 'Navy' },
                    { hex: '#059669', theme: 'forest', title: 'Verde' },
                    { hex: '#dc2626', theme: 'crimson', title: 'Rojo' },
                    { hex: '#d97706', theme: 'amber', title: 'Ámbar' }
                  ].map((p) => (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => {
                        setPrimaryColorHex(p.hex);
                        setColorTheme(p.theme);
                      }}
                      title={p.title}
                      className={`w-6 h-6 rounded-lg transition-all cursor-pointer ${
                        primaryColorHex.toLowerCase() === p.hex.toLowerCase()
                          ? 'ring-2 ring-white scale-110'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: p.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="block text-slate-400 font-medium">Nombre de la Empresa / Marca:</label>
              <input
                type="text"
                value={data.cover?.company || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    cover: { ...prev.cover, company: e.target.value }
                  }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            {/* Slogan */}
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="block text-slate-400 font-medium">Slogan Principal (Portada):</label>
              <input
                type="text"
                value={data.cover?.slogan || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    cover: { ...prev.cover, slogan: e.target.value }
                  }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Sub-slogan */}
            <div className="space-y-1.5 col-span-1 md:col-span-3">
              <label className="block text-slate-400 font-medium">Subtítulo de Propuesta de Valor:</label>
              <textarea
                rows={2}
                value={data.cover?.sub || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    cover: { ...prev.cover, sub: e.target.value }
                  }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-1.5">
              <label className="block text-slate-400 font-medium">Sitio Web:</label>
              <input
                type="text"
                value={contactInfo.website}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, website: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-400 font-medium">Email de Contacto:</label>
              <input
                type="text"
                value={contactInfo.email}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-400 font-medium">Teléfono / WhatsApp:</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="block text-slate-400 font-medium">Dirección Sede Principal:</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-400 font-medium">GitHub / Código Abierto:</label>
              <input
                type="text"
                value={contactInfo.github || ''}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, github: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation & Display Modes Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-4 no-print">
        {/* Page Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setShowAllPages(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showAllPages
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ver Folleto Completo (8 Págs)</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          {pageNames.map((p) => (
            <button
              key={p.num}
              onClick={() => {
                setShowAllPages(false);
                setSelectedPage(p.num);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !showAllPages && selectedPage === p.num
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pág {p.num}: {p.name}
            </button>
          ))}
        </div>

        {/* Options & Theme Selectors */}
        <div className="flex items-center gap-3">
          {/* Color Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'navy', label: 'Navy', color: 'bg-[#1A3461]' },
              { id: 'forest', label: 'Verde', color: 'bg-emerald-600' },
              { id: 'amber', label: 'Ámbar', color: 'bg-amber-600' },
              { id: 'charcoal', label: 'Oscuro', color: 'bg-zinc-800' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setColorTheme(t.id)}
                title={`Tema ${t.label}`}
                className={`w-6 h-6 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                  colorTheme === t.id ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`w-4 h-4 rounded-full ${t.color}`} />
              </button>
            ))}
          </div>

          {/* Hide Prices Toggle */}
          <button
            onClick={() => setHidePrices(!hidePrices)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              hidePrices
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {hidePrices ? 'Cotizaciones sin Precios' : 'Mostrar Precios'}
          </button>
        </div>
      </div>

      {/* Main Multi-Page Brochure Render Box */}
      <div id="brochure-preview-container" className="bg-slate-100 p-2 sm:p-6 rounded-2xl border border-slate-200 overflow-x-auto min-h-[600px] flex justify-center">
        <BrochurePreview
          data={data}
          colorTheme={colorTheme}
          customPrimaryColor={primaryColorHex}
          contactInfo={contactInfo}
          selectedPage={selectedPage}
          showAllPages={showAllPages}
          hidePrices={hidePrices}
          onChange={(newData) => setData(newData)}
        />
      </div>

      <div className="opacity-0 pointer-events-none fixed left-0 top-0 z-[-100] w-[1050px] overflow-hidden" id="brochure-full-export-container">
        <BrochurePreview
          data={data}
          colorTheme={colorTheme}
          customPrimaryColor={primaryColorHex}
          contactInfo={contactInfo}
          selectedPage={1}
          showAllPages={true}
          hidePrices={hidePrices}
        />
      </div>
    </div>
  );
}
