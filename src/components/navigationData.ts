import React, { useState } from 'react';
import {
  Users,
  Compass,
  Target,
  BarChart3,
  Kanban,
  Send,
  Mail,
  Bot,
  Zap,
  Radio,
  FileText,
  Search,
  Key,
  Globe,
  TrendingUp,
  Link,
  Calendar,
  Layers,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Receipt,
  Code,
  Share2,
  FolderDown,
  HardDrive,
  Cpu,
  Server,
  Workflow,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Briefcase,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { ActiveTab } from '../types';

export interface HubNavItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  tab?: ActiveTab;
  category: 'crm' | 'marketing' | 'seo' | 'tools' | 'public';
  badge?: string;
  color: string;
  publicSection?: string;
}

export interface HubNavCategory {
  key: 'crm' | 'marketing' | 'seo' | 'tools';
  title: string;
  badge: string;
  badgeColor: string;
  dotColor: string;
  description: string;
  items: HubNavItem[];
  quickActions: Array<{
    label: string;
    action: () => void;
    icon?: React.ElementType;
  }>;
}

export const DASHBOARD_CATEGORIES: HubNavCategory[] = [
  {
    key: 'crm',
    title: 'CRM & Ventas B2B',
    badge: 'Comercial & Pipelines',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    dotColor: 'bg-blue-500',
    description: 'Gestión completa de prospectos, embudos, leads territoriales y ciclo de ventas.',
    items: [
      {
        id: 'unified_crm',
        title: 'Consola Unificada CRM 360°',
        desc: 'Suite completa con pipeline, contactos, WhatsApp IA, radar Maps y finanzas',
        icon: Layers,
        tab: 'unified_crm',
        category: 'crm',
        color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
        badge: 'Hub'
      },
      {
        id: 'crm_kanban',
        title: 'Pipeline Kanban Visual',
        desc: 'Embudo de ventas con gestión drag & drop de oportunidades por etapas',
        icon: Kanban,
        tab: 'crm_kanban',
        category: 'crm',
        color: 'text-blue-500 bg-blue-50 hover:bg-blue-100',
      },
      {
        id: 'crm_whatsapp',
        title: 'WhatsApp AI & Hermes Agent',
        desc: 'Bandeja omnicanal de mensajería, agente IA 24/7 y broadcast masivo',
        icon: MessageSquare,
        tab: 'crm_whatsapp',
        category: 'crm',
        color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
        badge: 'IA'
      },
      {
        id: 'geolocated_prospecting',
        title: 'Prospección Maps IA',
        desc: 'Radar territorial y descubrimiento de empresas con Google Maps & Gemini',
        icon: Compass,
        tab: 'geolocated_prospecting',
        category: 'crm',
        color: 'text-violet-500 bg-violet-50 hover:bg-violet-100',
      },
      {
        id: 'meddic',
        title: 'Lead Scoring MEDDIC',
        desc: 'Calificación cuantitativa de negocios B2B con análisis de métricas y decisores',
        icon: ShieldCheck,
        tab: 'meddic',
        category: 'crm',
        color: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      },
      {
        id: 'contacts',
        title: 'Gestión de Contactos & Cuentas',
        desc: 'Directorio centralizado de clientes, decisores y listas segmentadas',
        icon: Users,
        tab: 'contacts',
        category: 'crm',
        color: 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100',
      },
      {
        id: 'vscrm_dashboard',
        title: 'CRM Financiero & Gestión',
        desc: 'Clientes, proyectos, horas trabajadas y gastos operativos',
        icon: Briefcase,
        tab: 'vscrm_dashboard',
        category: 'crm',
        color: 'text-sky-500 bg-sky-50 hover:bg-sky-100',
      },
      {
        id: 'vscrm_afip',
        title: 'Facturación Electrónica AFIP',
        desc: 'Emisión y gestión de comprobantes fiscales A, B y C con CAE automático',
        icon: Receipt,
        tab: 'vscrm_afip',
        category: 'crm',
        color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      },
    ],
    quickActions: [
      { label: 'Ver Precios y Planes', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
      { label: 'Casos de Éxito', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
    ],
  },
  {
    key: 'marketing',
    title: 'Marketing & Outreach',
    badge: 'Campañas & Automatización',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    dotColor: 'bg-amber-500',
    description: 'Campañas multicanal, correos en frío, secuencias automatizadas y copys persuasivos.',
    items: [
      {
        id: 'email_campaigns',
        title: 'Campañas de Email & Broadcast',
        desc: 'Envíos masivos y secuencias de nutrición con seguimiento de aperturas y clics',
        icon: Mail,
        tab: 'email_campaigns',
        category: 'marketing',
        color: 'text-amber-500 bg-amber-50 hover:bg-amber-100',
      },
      {
        id: 'outreach_agent',
        title: 'Agente Outreach Automático',
        desc: 'SDR Autónomo con IA para prospección personalizada en frío por email',
        icon: Send,
        tab: 'outreach_agent',
        category: 'marketing',
        color: 'text-orange-500 bg-orange-50 hover:bg-orange-100',
      },
      {
        id: 'automations',
        title: 'Flujos & Automatizaciones',
        desc: 'Triggers y secuencias automáticas basadas en eventos y comportamiento del cliente',
        icon: Radio,
        tab: 'automations',
        category: 'marketing',
        color: 'text-rose-500 bg-rose-50 hover:bg-rose-100',
      },
      {
        id: 'copywriter',
        title: 'AI Copywriter & Anuncios',
        desc: 'Generador de textos persuasivos para LinkedIn, Google Ads, Meta y correos',
        icon: FileText,
        tab: 'copywriter',
        category: 'marketing',
        color: 'text-teal-500 bg-teal-50 hover:bg-teal-100',
      },
      {
        id: 'ai_marketing_expert',
        title: 'Suite AI Marketing Expert PRO',
        desc: 'Suite integral de Analíticas SEO, Chatbots IA, Social Media, Email Marketing y Proveedores IA',
        icon: Sparkles,
        tab: 'ai_marketing_expert',
        category: 'marketing',
        color: 'text-violet-600 bg-violet-50 hover:bg-violet-100',
      },
      {
        id: 'strategy',
        title: 'Estrategias Go-To-Market',
        desc: 'Planes estratégicos de marketing y asignación presupuestaria con IA',
        icon: Target,
        tab: 'strategy',
        category: 'marketing',
        color: 'text-pink-500 bg-pink-50 hover:bg-pink-100',
      },
      {
        id: 'email_template_builder',
        title: 'Diseñador de Plantillas Email',
        desc: 'Editor visual responsive de templates HTML y newsletters corporativas',
        icon: Code,
        tab: 'email_template_builder',
        category: 'marketing',
        color: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      },
    ],
    quickActions: [
      { label: 'Blog & Recursos', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
      { label: 'Academia Clientum', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
    ],
  },
  {
    key: 'seo',
    title: 'SEO & Posicionamiento',
    badge: 'Auditoría & Palabras Clave',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dotColor: 'bg-emerald-500',
    description: 'Investigación de palabras clave, auditorías on-page, monitoreo de rankings y mapas de contenido.',
    items: [
      {
        id: 'keyword_research',
        title: 'Keyword Research & Explorador',
        desc: 'Análisis de volumen de búsqueda, dificultad e intención de compra por país',
        icon: Search,
        tab: 'keyword_research',
        category: 'seo',
        color: 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100',
      },
      {
        id: 'keyword_vault',
        title: 'Bóveda de Palabras Clave',
        desc: 'Repositorio organizado de términos prioritarios con métricas agregadas',
        icon: Key,
        tab: 'keyword_vault',
        category: 'seo',
        color: 'text-teal-500 bg-teal-50 hover:bg-teal-100',
      },
      {
        id: 'on_page_audit',
        title: 'Auditoría On-Page SEO',
        desc: 'Diagnóstico técnico de URLs con score de rendimiento, meta tags y recomendaciones',
        icon: Globe,
        tab: 'on_page_audit',
        category: 'seo',
        color: 'text-blue-500 bg-blue-50 hover:bg-blue-100',
      },
      {
        id: 'rank_tracker',
        title: 'Rank Tracker & Monitoreo',
        desc: 'Seguimiento de posiciones en Google Search para tus palabras clave estratégicas',
        icon: TrendingUp,
        tab: 'rank_tracker',
        category: 'seo',
        color: 'text-violet-500 bg-violet-50 hover:bg-violet-100',
      },
      {
        id: 'topic_map',
        title: 'Mapa de Tópicos & Clusters',
        desc: 'Estructuración de contenido en pilares temáticos para máxima autoridad de dominio',
        icon: Layers,
        tab: 'topic_map',
        category: 'seo',
        color: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      },
      {
        id: 'content_calendar',
        title: 'Calendario Editorial & Enlaces',
        desc: 'Planificación de publicaciones para blog y seguimiento de link building',
        icon: Calendar,
        tab: 'content_calendar',
        category: 'seo',
        color: 'text-orange-500 bg-orange-50 hover:bg-orange-100',
      },
    ],
    quickActions: [
      { label: 'Auditoría Pública Gratuita', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'seo' } })) },
      { label: 'Ver Documentación SEO', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
    ],
  },
  {
    key: 'tools',
    title: 'Herramientas & Plataforma',
    badge: 'IA, BI & Integraciones',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    dotColor: 'bg-purple-500',
    description: 'Asistentes de IA generativa, analítica ejecutiva, integración Cloud y configuración central.',
    items: [
      {
        id: 'ai_hub',
        title: 'WhatsApp Chatbot & IA Hub',
        desc: 'Configuración y entrenamiento de agentes conversacionales inteligentes',
        icon: Bot,
        tab: 'ai_hub',
        category: 'tools',
        color: 'text-purple-500 bg-purple-50 hover:bg-purple-100',
      },
      {
        id: 'analytics_dashboard',
        title: 'Business Intelligence & KPIs',
        desc: 'Métricas financieras en tiempo real: CAC, LTV, ROI de campañas y proyecciones',
        icon: BarChart3,
        tab: 'analytics_dashboard',
        category: 'tools',
        color: 'text-rose-500 bg-rose-50 hover:bg-rose-100',
      },
      {
        id: 'brochure_generator',
        title: 'Generador de Brochures PDF',
        desc: 'Creación y exportación de propuestas comerciales y catálogos corporativos',
        icon: FileSpreadsheet,
        tab: 'brochure_generator',
        category: 'tools',
        color: 'text-cyan-500 bg-cyan-50 hover:bg-cyan-100',
      },
      {
        id: 'workflow',
        title: 'Mapa de Flujo & Ecosistema',
        desc: 'Vista integral de integración entre CRM, WhatsApp, AFIP y Marketing',
        icon: Workflow,
        tab: 'workflow',
        category: 'tools',
        color: 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100',
      },
      {
        id: 'settings',
        title: 'Configuración & Integraciones',
        desc: 'Gestión de APIs, SMTP, Mercado Pago, AFIP y respaldos de base de datos',
        icon: Share2,
        tab: 'settings',
        category: 'tools',
        color: 'text-slate-600 bg-slate-100 hover:bg-slate-200',
      },
      {
        id: 'google_drive',
        title: 'Almacenamiento Cloud & Google Drive',
        desc: 'Sincronización de documentos comerciales, reportes y cotizaciones',
        icon: HardDrive,
        tab: 'google_drive',
        category: 'tools',
        color: 'text-amber-500 bg-amber-50 hover:bg-amber-100',
      },
    ],
    quickActions: [
      { label: 'Centro de Ayuda', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
      { label: 'Contacto & Soporte', action: () => window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab: 'public_website' } })) },
    ],
  },
];
