import React from "react";
import { MapPin, CheckCircle2, TrendingUp, Sparkles, Building2 } from "lucide-react";

export interface ArgentinePymeItem {
  id: string;
  name: string;
  location: string;
  city: string;
  province: string;
  sector: string;
  service: string;
  image: string;
  quote: string;
  role: string;
  metric?: string;
  metricLabel?: string;
}

export const ARGENTINE_PYMES_DATA: Record<string, ArgentinePymeItem> = {
  lubrano: {
    id: "lubrano",
    name: "Lubrano Hogar & Electro",
    city: "General Roca",
    province: "Río Negro",
    location: "General Roca · Río Negro",
    sector: "Retail & Electrodomésticos",
    service: "Chatbot WhatsApp + Facturación AFIP",
    image: "https://images.unsplash.com/photo-1556742049-0a67c57750c9?auto=format&fit=crop&w=800&q=80",
    quote: "Automatizamos la consulta de cuotas y stock por WhatsApp. Las ventas se sincronizan directo al mostrador.",
    role: "Equipo de Salón y Mostrador",
    metric: "+52%",
    metricLabel: "Conversión de consultas",
  },
  distribuidora: {
    id: "distribuidora",
    name: "Distribuidora del Sur S.A.",
    city: "Neuquén Capital",
    province: "Neuquén",
    location: "Neuquén Capital",
    sector: "Logística & Distribución Mayorista",
    service: "CRM & Ruteo de Pedidos",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    quote: "El equipo de depósito despacha con tablets y cada preventista carga notas de pedido en tiempo real.",
    role: "Gerencia de Operaciones y Logística",
    metric: "35 hs",
    metricLabel: "Ahorradas al mes",
  },
  estudio: {
    id: "estudio",
    name: "Estudio Contable Méndez & Asoc.",
    city: "Buenos Aires",
    province: "CABA",
    location: "Buenos Aires · CABA",
    sector: "Servicios Contables y Legales",
    service: "Automatización AFIP & Portal Cliente",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    quote: "Centralizamos la emisión masiva de comprobantes CAE y los clientes descargan sus liquidaciones solos.",
    role: "Equipo de Contadores y Auditoría",
    metric: "100%",
    metricLabel: "Puntualidad en declaraciones",
  },
  terbay: {
    id: "terbay",
    name: "Terbay Propiedades",
    city: "Cipolletti",
    province: "Río Negro",
    location: "Cipolletti · Río Negro",
    sector: "Inmobiliaria & Real Estate",
    service: "CRM Inmobiliario + IA Calificadora",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    quote: "El bot filtra a los interesados, envía fichas en PDF y agenda visitas coordinadas con los asesores.",
    role: "Equipo Comercial & Martilleros",
    metric: "3x",
    metricLabel: "Visitas presenciales calificadas",
  },
  farmacia: {
    id: "farmacia",
    name: "Farmacia San Martín",
    city: "General Roca",
    province: "Río Negro",
    location: "General Roca · Río Negro",
    sector: "Salud & Farmacia",
    service: "WhatsApp IA + Catálogo de Turnos",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    quote: "Liberamos el mostrador de consultas repetitivas de precios y turnos. Ahora la atención es personalizada.",
    role: "Equipo Farmacéutico y Atención",
    metric: "24/7",
    metricLabel: "Respuesta inmediata",
  },
  consorcio: {
    id: "consorcio",
    name: "Consorcio de Riego del Alto Valle",
    city: "General Roca",
    province: "Río Negro",
    location: "Alto Valle · Río Negro",
    sector: "Agroindustria & Infraestructura",
    service: "ERP a Medida & Gestión Territorial",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    quote: "Monitoreamos empadronados, turnos hídricos y cobranzas en una plataforma web ágil y segura.",
    role: "Administración & Técnicos de Campo",
    metric: "100%",
    metricLabel: "Digitalización de padrón",
  },
  cabarcos: {
    id: "cabarcos",
    name: "Cabarcos Motores SRL",
    city: "General Roca",
    province: "Río Negro",
    location: "General Roca · Río Negro",
    sector: "Automotriz & Taller Industrial",
    service: "Órdenes de Reparación & Facturación",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    quote: "Cada vehículo ingresa con su checklist digital y el cliente recibe alertas por WhatsApp con el avance.",
    role: "Jefatura de Taller y Servicios",
    metric: "+40%",
    metricLabel: "Rotación de turnos",
  },
  yendoapp: {
    id: "yendoapp",
    name: "YendoApp Logística",
    city: "Córdoba Capital",
    province: "Córdoba",
    location: "Córdoba Capital",
    sector: "Tecnología & Última Milla",
    service: "Desarrollo Web & API Gateway",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    quote: "Desarrollamos la arquitectura web y conectamos las pasarelas de cobro con soporte técnico dedicado.",
    role: "Desarrollo y Producto Digital",
    metric: "99.9%",
    metricLabel: "Uptime de plataforma",
  },
  consultoria: {
    id: "consultoria",
    name: "Taller Estratégico PyME",
    city: "General Roca",
    province: "Río Negro",
    location: "Sede Regional Patagonia",
    sector: "Consultoría & Transformación Digital",
    service: "Plan 90 Días de Implementación",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    quote: "Acompañamos a dueños y gerentes a ordenar sus flujos comerciales y profesionalizar el uso de IA.",
    role: "Consultoría Senior Clientum",
    metric: "+35",
    metricLabel: "PyMEs acompañadas",
  },
  bi_dashboard: {
    id: "bi_dashboard",
    name: "Grupo Bio Salud & Bienestar",
    city: "Rosario",
    province: "Santa Fe",
    location: "Rosario · Santa Fe",
    sector: "Salud & Centros Médicos",
    service: "Business Intelligence & Reportes",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    quote: "Tableros en tiempo real para evaluar ocupación de consultorios, cobros de obras sociales y métricas.",
    role: "Dirección Médica y Finanzas",
    metric: "-20%",
    metricLabel: "Tiempo de liquidación",
  },
  mercadopago_retail: {
    id: "mercadopago_retail",
    name: "Growlife Patagonia & Hogar",
    city: "Neuquén",
    province: "Neuquén",
    location: "Neuquén · Patagonia",
    sector: "Comercio Minorista & E-Commerce",
    service: "Integración MercadoPago & Link de Cobro",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    quote: "Los clientes compran por WhatsApp y pagan con link automático de MercadoPago con acreditación al instante.",
    role: "Administración de Ventas",
    metric: "0",
    metricLabel: "Errores de cobro manual",
  },
  soporte_central: {
    id: "soporte_central",
    name: "Mesa de Ayuda & Éxito del Cliente",
    city: "General Roca",
    province: "Río Negro",
    location: "General Roca · Río Negro",
    sector: "Soporte Técnico Especializado",
    service: "Mesa de Ayuda 24/7 en Español",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    quote: "Asistencia directa con ingenieros de soporte locales sin bots impersonales ni esperas interminables.",
    role: "Equipo de Soporte y Éxito PyME",
    metric: "< 15 min",
    metricLabel: "Tiempo de primera respuesta",
  },
};

export function ArgentinePymeCard({ item, compact = false }: { item: ArgentinePymeItem; compact?: boolean }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#1A3461]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Photo with Overlay Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={`${item.name} - Equipo trabajando`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Flag + Location Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <span>🇦🇷</span>
          <span>{item.location}</span>
        </div>

        {/* Metric Pill if available */}
        {item.metric && (
          <div className="absolute bottom-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black font-mono px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{item.metric}</span>
          </div>
        )}

        {/* Company & Role at bottom of image */}
        <div className="absolute bottom-3 left-3 right-16 text-white">
          <h4 className="font-bold text-xs leading-snug drop-shadow-sm line-clamp-1">{item.name}</h4>
          <p className="text-[10px] text-slate-300 drop-shadow-sm font-medium line-clamp-1">{item.role}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Service Tag */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[10px] font-mono font-bold text-[#1A3461] uppercase tracking-wider line-clamp-1">
            {item.service}
          </span>
        </div>

        {/* Quote */}
        <p className="text-[11px] text-slate-600 leading-relaxed italic flex-1">
          "{item.quote}"
        </p>

        {/* Sector & Metric Label footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span className="font-medium">{item.sector}</span>
          {item.metricLabel && (
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              {item.metricLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArgentinePymesSection({
  title = "PyMEs Argentinas en Acción",
  subtitle = "Equipos reales de Río Negro, Neuquén, Buenos Aires, Córdoba y todo el país trabajando a diario con nuestros servicios.",
  items,
  badge = "Casos Reales en Territorio",
}: {
  title?: string;
  subtitle?: string;
  items?: ArgentinePymeItem[];
  badge?: string;
}) {
  const defaultItems = [
    ARGENTINE_PYMES_DATA.lubrano,
    ARGENTINE_PYMES_DATA.distribuidora,
    ARGENTINE_PYMES_DATA.estudio,
    ARGENTINE_PYMES_DATA.terbay,
  ];
  const list = items || defaultItems;

  return (
    <section className="my-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <span>🇦🇷</span> {badge}
        </span>
        <h3 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2.5">
          {title}
        </h3>
        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((item) => (
          <ArgentinePymeCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export function ArgentinePymeDetailBanner({
  item,
  title,
  description,
}: {
  item: ArgentinePymeItem;
  title?: string;
  description?: string;
}) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 gap-0 my-6">
      <div className="relative md:col-span-5 min-h-[200px] md:min-h-full">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
          <span>🇦🇷</span> {item.location}
        </div>
      </div>
      <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            PyME Argentina en Operación
          </span>
          {item.metric && (
            <span className="text-[10px] font-mono font-bold text-amber-400">
              ⚡ {item.metric} {item.metricLabel}
            </span>
          )}
        </div>
        <h4 className="text-lg font-display font-black text-white leading-snug">
          {title || `Cómo ${item.name} utiliza este servicio`}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "{item.quote}"
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {description || `Servicio implementado: ${item.service}. Gestión activa a cargo de ${item.role} en ${item.location}.`}
        </p>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-bold text-slate-300">{item.name}</span>
          <span className="font-mono text-[10px] text-emerald-400">Patagonia & Argentina</span>
        </div>
      </div>
    </div>
  );
}
