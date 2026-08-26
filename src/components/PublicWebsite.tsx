// @ts-nocheck
import React, { useState, useMemo, useEffect, JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Video,
  Award,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Zap,
  Shield,
  HelpCircle,
  FileText,
  Menu,
  X,
  ArrowUpRight,
  GraduationCap,
  Building,
  Star,
  Download,
  CheckSquare,
  Sparkles,
  ArrowLeftRight,
  Compass,
  ChevronRight,
  MessageSquare,
  Bot,
  BarChart2,
  Settings,
  LayoutGrid,
  Code2,
  Monitor,
  Workflow,
  LogIn,
  LogOut,
  UserCircle2,
  TrendingUp,
  Quote,
  Package,
  Target,
  Layers,
  ShoppingCart,
  Truck,
  Stethoscope,
  Coffee,
  Home,
  Play,
  Megaphone,
  Smartphone,
  Cloud,
  CreditCard,
  Radio,
  Terminal,
  Rocket,
  Handshake,
  Headphones,
  LayoutDashboard
} from "lucide-react";

import { KeyProjectsSection } from "./KeyProjectsSection";
import { BlogSectionManager, RecentBlogPostsSection } from "./BlogManager";

import { BrochureData } from "../types";
import { AuthButton } from "./AuthButton";
import OrganigramaClientum from "./OrganigramaClientum";
import AcademiaLMS from "./Academia/AcademiaLMS";
import BrochurePreview from "./BrochurePreview";
import { PdfExportButton } from "./PdfExportButton";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../lib/i18n";
import ChatbotWidget from "./ChatbotWidget";
import { ContactForm } from './ContactForm';
import { InteractiveQuoteWizard } from "./public/InteractiveQuoteWizard";
import { IndustryWhatsAppSimulator } from "./public/IndustryWhatsAppSimulator";
import { PricingBillingToggle } from "./public/PricingBillingToggle";
import { ExpressAuditModal } from "./public/ExpressAuditModal";
import { SocialProofBar } from "./public/SocialProofBar";
import { LiveActivityTicker } from "./public/LiveActivityTicker";
import { TrustAndSlaSection } from "./public/TrustAndSlaSection";
import { FaqSection } from "./public/FaqSection";
import { MobileBottomNav } from "./public/MobileBottomNav";
import { FloatingWhatsAppButton } from "./public/FloatingWhatsAppButton";
import { PymeTeamsGallery } from "./public/PymeTeamsGallery";
import pymeTeamMeetingImg from "../assets/images/pyme_team_meeting_1787518635370.jpg";
import pymeCommercialSalesImg from "../assets/images/pyme_commercial_sales_1787518652661.jpg";
import pymeAgroLogisticsImg from "../assets/images/pyme_agro_logistics_1787518669322.jpg";
import pymeCustomerSuccessImg from "../assets/images/pyme_customer_success_1787518683571.jpg";
const ArgentinePymeCard = () => null;
const ArgentinePymesSection = () => null;
const ArgentinePymeDetailBanner = () => null;
const ARGENTINE_PYMES_DATA: any = new Proxy({}, { get: () => ({}) });
type PublicFormType = string;
const PublicLeadFormModal = (props: any) => null;
import serviciosCatalogo from "../data/servicios-catalogo.json";
import categoriasServicios from "../data/categorias-servicios.json";
import cursosLms from "../data/cursos-lms.json";

function LogoImage({
  src,
  alt,
  className,
  fallback,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

interface CatalogService {
  id: string;
  name: string;
  cat: string;
  desc: string;
  price: string;
}
interface CatalogCategory {
  name: string;
  count: number;
}
interface LmsCourse {
  id: string;
  title: string;
  excerpt: string;
}

interface PublicWebsiteProps {
  onBackToEditor: () => void;
  brochureData?: BrochureData;
  colorTheme?: string;
  contactInfo?: {
    website: string;
    email: string;
    phone: string;
    address: string;
    github?: string;
  };
  hidePrices?: boolean;
  authUser?: string | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  onLoginSuccess?: () => void;
}

const DEFAULT_BROCHURE_DATA: BrochureData = {
  cover: {
    company: 'Clientum Agencia Digital',
    slogan: 'Agencia de Crecimiento Comercial, Inteligencia Artificial & Automatización para PyMEs',
    sub: 'Consultoría estratégica, implementación de CRM, Agentes WhatsApp IA, Campañas de Marketing Digital, Desarrollo Web & E-Commerce, Integraciones y Analítica para escalar tu negocio.',
    industry: 'Agencia de Crecimiento & Consultoría B2B'
  },
  logoUrl: '/favicon.svg',
  chatbot: {
    title: 'Servicio de Chatbot WhatsApp Inteligente con IA (Gemini 3.6)',
    features: [
      { title: 'Atención Automatizada 24/7', desc: 'Responde consultas en segundos con inteligencia artificial conversacional.' },
      { title: 'Calificación Inmediata de Leads', desc: 'Evalúa la intención de compra y registra los datos directamente en el CRM.' },
      { title: 'Agendamiento & Seguimiento', desc: 'Coordina reuniones comerciales y reengancha prospectos inactivos automáticamente.' }
    ],
    flowSteps: [
      'Prospecto envía un mensaje por WhatsApp o sitio web',
      'El agente IA saluda, califica y responde preguntas frecuentes con IA',
      'Registra el lead en el pipeline CRM y notifica al vendedor asignado',
      'Emite recordatorios automáticos de reunión o propuesta de venta'
    ]
  },
  crm: {
    title: 'Consultoría & Implementación CRM, Analítica & Facturación AFIP',
    features: [
      { title: 'Pipeline Kanban Visual', desc: 'Gestión drag & drop de oportunidades por etapas comerciales.' },
      { title: 'Facturación Electrónica AFIP', desc: 'Emisión automática de comprobantes A, B y C con CAE en tiempo real.' },
      { title: 'Asistente IA de Negocios', desc: 'Reportes instantáneos y proyecciones de ventas en lenguaje natural.' }
    ]
  },
  services: [
    { title: 'Servicio 1: Consultoría & CRM Omnicanal', desc: 'Diseño e implementación de procesos comerciales y gestión integral de contactos y oportunidades.', price: 150000, monthly: 45000, time: 5, bullets: ['Pipeline Drag & Drop a medida', 'Historial unificado de chats', 'Capacitación a vendedores'] },
    { title: 'Servicio 2: Agentes & Chatbot WhatsApp IA', desc: 'Desarrollo de agente virtual conversacional alimentado por Gemini 3.6 Flash y catálogo propio.', price: 180000, monthly: 55000, time: 7, bullets: ['Entrenamiento con catálogo y FAQs', 'Agendamiento de reuniones', 'Calificación automática de leads'] },
    { title: 'Servicio 3: Integraciones AFIP & ERP', desc: 'Conexión directa con AFIP para emisión de facturas electrónicas automáticas y sincronización contable.', price: 120000, monthly: 35000, time: 3, bullets: ['CAE automático en tiempo real', 'Envío por email/WhatsApp', 'Configuración de cuentas'] },
    { title: 'Servicio 4: Business Intelligence & Analítica', desc: 'Dashboards analíticos con KPIs en tiempo real, atribución de ventas y reportes ejecutivos.', price: 140000, monthly: 40000, time: 4, bullets: ['Conversión por canal y vendedor', 'Atribución de ingresos', 'Reportes automáticos mensuales'] },
    { title: 'Servicio 5: Desarrollo Web & E-Commerce', desc: 'Diseño y desarrollo de sitios corporativos, landing pages de alta conversión y tiendas online.', price: 220000, monthly: 65000, time: 10, bullets: ['Pasarelas de cobro integradas', 'Diseño UX/UI premium', 'Optimización SEO y velocidad'] },
    { title: 'Servicio 6: Growth Marketing & Outreach', desc: 'Estrategias de prospección automatizada, campañas masivas de WhatsApp y generación de prospectos B2B.', price: 160000, monthly: 50000, time: 5, bullets: ['Campañas de nutrición de leads', 'Prospección asistida por IA', 'Optimización constante de ROI'] }
  ],
  testimonial: {
    text: 'Trabajar con la agencia Clientum transformó por completo nuestro proceso de ventas. Nos implementaron el CRM y el chatbot de WhatsApp en menos de 10 días, calificando 150+ leads semanales y ahorrándonos 20 horas de tareas manuales al mes.',
    author: 'Ing. Roberto Albarracín',
    company: 'CEO, Grupo Agro-Industrial Patagonia'
  }
};

export default function PublicWebsite({
  onBackToEditor,
  brochureData,
  colorTheme = "navy",
  contactInfo,
  hidePrices = false,
  authUser = null,
  onOpenLogin,
  onLogout,
  onLoginSuccess,
}: PublicWebsiteProps) {
  const { language, isPortuguese, t, offices: contextOffices } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const pathToTab = useMemo(() => {
    return (pathname: string): string => {
      const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';

      if (clean === '/' || clean === '/inicio') return 'inicio';
      if (clean === '/servicios') return 'servicios';
      if (clean === '/soluciones' || clean === '/plataforma') return 'servicios';
      if (clean === '/precios' || clean === '/planes') return 'planes';
      if (clean === '/nosotros' || clean === '/empresa') return 'nosotros';
      if (clean === '/contacto') return 'contacto';
      if (clean === '/casos' || clean === '/casos-de-exito') return 'casos';
      if (clean === '/industrias') return 'industrias';
      if (clean === '/recursos') return 'recursos';
      if (clean === '/blog') return 'blog';
      if (clean === '/academia' || clean === '/lms') return 'academia';
      if (clean === '/catalogo') return 'catalogo';
      if (clean === '/clientes') return 'clientes';
      if (clean === '/partners' || clean === '/afiliados' || clean === '/asociacion') return 'asociacion';
      if (clean === '/trabaja-con-nosotros' || clean === '/carreras') return 'carreras';
      if (clean === '/ayuda' || clean === '/faq') return 'ayuda';
      if (clean === '/documentacion' || clean === '/docs') return 'documentacion';
      if (clean === '/privacidad' || clean === '/terminos') return 'privacidad';

      // Sub-solutions & feature pages
      if (clean === '/chatbot' || clean === '/soluciones/chatbot') return 'chatbot';
      if (clean === '/crm-inteligente' || clean === '/soluciones/crm') return 'crm_inteligente';
      if (clean === '/asistente-ia' || clean === '/soluciones/ia') return 'asistente_ia';
      if (clean === '/automatizacion' || clean === '/soluciones/automatizacion') return 'automatizacion';
      if (clean === '/portal-cliente') return 'portal_cliente';
      if (clean === '/desarrollo-web') return 'desarrollo_web';
      if (clean === '/integraciones') return 'integraciones';
      if (clean === '/facturacion-afip' || clean === '/afip') return 'afip';
      if (clean === '/mercadopago' || clean === '/cobranzas') return 'mercadopago';
      if (clean === '/generacion-leads' || clean === '/leads') return 'leads';
      if (clean === '/business-intelligence' || clean === '/reportes') return 'reportes';
      if (clean === '/ecommerce') return 'ecommerce';
      if (clean === '/consultoria-erp') return 'consultoria_erp';

      // Fallback
      const routeName = clean.replace(/^\//, '');
      return routeName || 'inicio';
    };
  }, []);

  const tabToPath = useMemo(() => {
    return (tab: string): string => {
      switch (tab) {
        case 'inicio': return '/';
        case 'servicios': return '/servicios';
        case 'soluciones': return '/soluciones';
        case 'plataforma': return '/plataforma';
        case 'planes': return '/precios';
        case 'nosotros': return '/nosotros';
        case 'contacto': return '/contacto';
        case 'casos': return '/casos-de-exito';
        case 'industrias': return '/industrias';
        case 'recursos': return '/recursos';
        case 'blog': return '/blog';
        case 'academia': return '/academia';
        case 'catalogo': return '/catalogo';
        case 'clientes': return '/clientes';
        case 'asociacion': return '/partners';
        case 'carreras': return '/trabaja-con-nosotros';
        case 'ayuda': return '/ayuda';
        case 'documentacion': return '/documentacion';
        case 'privacidad': return '/privacidad';
        case 'chatbot': return '/chatbot';
        case 'crm_inteligente': return '/crm-inteligente';
        case 'asistente_ia': return '/asistente-ia';
        case 'automatizacion': return '/automatizacion';
        case 'portal_cliente': return '/portal-cliente';
        case 'desarrollo_web': return '/desarrollo-web';
        case 'integraciones': return '/integraciones';
        case 'afip': return '/facturacion-afip';
        case 'mercadopago': return '/mercadopago';
        case 'leads': return '/generacion-leads';
        case 'reportes': return '/business-intelligence';
        case 'ecommerce': return '/ecommerce';
        case 'consultoria_erp': return '/consultoria-erp';
        default: return '/' + tab;
      }
    };
  }, []);

  const [activeTab, setActiveTabState] = useState<string>(() => pathToTab(location.pathname));

  useEffect(() => {
    const currentTab = pathToTab(location.pathname);
    if (currentTab !== activeTab) {
      setActiveTabState(currentTab);
    }
  }, [location.pathname, pathToTab]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const targetPath = tabToPath(tab);
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  useEffect(() => {
    (window as any).__setActiveTab = setActiveTab;
    return () => { delete (window as any).__setActiveTab; };
  }, [navigate, location.pathname, tabToPath]);
  // El catálogo completo es solo para usuarios autenticados. Algunos botones
  // (grilla "Todas las Soluciones", accesos rápidos del footer, tarjetas de
  // categoría) llaman a setActiveTab("catalogo") sin verificar sesión, lo que
  // dejaba la pestaña en blanco para visitantes públicos. Este guard corrige
  // esos casos redirigiendo a "servicios" y, si existe, abriendo el login.
  useEffect(() => {
    if (activeTab === "catalogo" && !authUser) {
      setActiveTab("servicios");
      onOpenLogin?.();
    }
  }, [activeTab, authUser, onOpenLogin]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenBrochure = () => setIsBrochureModalOpen(true);
    window.addEventListener("open-brochure-modal", handleOpenBrochure);
    return () => window.removeEventListener("open-brochure-modal", handleOpenBrochure);
  }, []);

  // Resolved contact info
  const contact = useMemo(() => {
    return contactInfo || {
      website: "clientum.com.ar",
      email: "info@clientum.com.ar",
      phone: "+54 298 451-0883",
      address: "General Roca, Río Negro",
      github: "https://github.com/clientumlatam/clientum",
    };
  }, [contactInfo]);

  // Resolved theme colors
  const theme = useMemo(() => {
    switch (colorTheme) {
      case "forest":
        return {
          bgGradient: "from-teal-950 via-emerald-900 to-emerald-800",
          accentText: "text-emerald-400",
          accentBg: "bg-emerald-500/10",
          accentBorder: "border-emerald-500/30",
          brandText: "text-emerald-500",
          btnGradient: "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800",
          badgeBg: "bg-emerald-500 text-slate-950",
          outlineBtnHover: "hover:bg-emerald-50 text-emerald-600 border-emerald-300",
          cardBorderHover: "hover:border-emerald-400/50",
          bulletIcon: "text-emerald-500"
        };
      case "amber":
        return {
          bgGradient: "from-orange-950 via-amber-900 to-yellow-800",
          accentText: "text-amber-400",
          accentBg: "bg-amber-500/10",
          accentBorder: "border-amber-500/30",
          brandText: "text-amber-500",
          btnGradient: "from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800",
          badgeBg: "bg-amber-500 text-slate-950",
          outlineBtnHover: "hover:bg-amber-50 text-amber-600 border-amber-300",
          cardBorderHover: "hover:border-amber-400/50",
          bulletIcon: "text-amber-500"
        };
      case "charcoal":
        return {
          bgGradient: "from-slate-900 via-slate-800 to-zinc-700",
          accentText: "text-zinc-400",
          accentBg: "bg-zinc-500/10",
          accentBorder: "border-zinc-500/30",
          brandText: "text-zinc-400",
          btnGradient: "from-zinc-600 to-slate-700 hover:from-zinc-700 hover:to-slate-800",
          badgeBg: "bg-zinc-500 text-slate-950",
          outlineBtnHover: "hover:bg-zinc-50 text-zinc-600 border-zinc-300",
          cardBorderHover: "hover:border-zinc-400/50",
          bulletIcon: "text-zinc-500"
        };
      case "navy":
      default:
        return {
          bgGradient: "from-[#0a1628] via-[#1A3461] to-[#1e4480]",
          accentText: "text-green-400",
          accentBg: "bg-emerald-500/10",
          accentBorder: "border-emerald-500/30",
          brandText: "text-[#1A3461]",
          btnGradient: "from-[#1A3461] to-[#254f8f] hover:from-[#0f2447] hover:to-[#1a3a6b]",
          badgeBg: "bg-emerald-500 text-slate-950",
          outlineBtnHover: "hover:bg-blue-50 text-blue-600 border-blue-300",
          cardBorderHover: "hover:border-blue-400/50",
          bulletIcon: "text-emerald-500"
        };
    }
  }, [colorTheme]);

  // Form states & Lead Modal triggers
  const [demoForm, setDemoForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    rubro: "E-Commerce",
    mensaje: "",
    newsletter: true
  });
  const [isDemoSubmitted, setIsDemoSubmitted] = useState<boolean>(false);
  const [isDemoLoading, setIsDemoLoading] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // New CRO and Interactive Modals State
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState<boolean>(false);
  const [isExpressAuditOpen, setIsExpressAuditOpen] = useState<boolean>(false);

  // Interactive ROI Calculator state
  const [calcLeads, setCalcLeads] = useState<number>(150);
  const [calcHours, setCalcHours] = useState<number>(20);

  // WhatsApp AI Bot Simulator state
  const [botMessages, setBotMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: '¡Hola! Soy el asistente IA de Clientum. ¿En qué puedo ayudarte a automatizar tu PyME hoy?' }
  ]);
  const [botInput, setBotInput] = useState('');
  const [botLoading, setBotLoading] = useState(false);

  const handleBotSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;
    const userText = botInput;
    setBotMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setBotInput('');
    setBotLoading(true);
    setTimeout(() => {
      let reply = "¡Excelente consulta! En Clientum integramos bots de WhatsApp y CRM con IA para calificar leads y agendar reuniones 24/7. ¿Te gustaría agendar un diagnóstico gratuito de 30 minutos con nuestro equipo?";
      const low = userText.toLowerCase();
      if (low.includes('precio') || low.includes('cuanto') || low.includes('costo')) {
        reply = "Nuestros planes para PyMEs comienzan desde los $20 USD/mes (Plan Inicial) y planes Pro con IA y AFIP desde $80 USD/mes. ¡Implementación en 5 días!";
      } else if (low.includes('crm') || low.includes('factura') || low.includes('afip')) {
        reply = "Implementamos CRM con pipeline visual y facturación electrónica AFIP con CAE automático en tiempo real. ¿Hacemos una demo?";
      } else if (low.includes('hola') || low.includes('buenos')) {
        reply = "¡Hola! Qué gusto saludarte. ¿De qué rubro es tu empresa para contarte cómo podemos ayudarte a multiplicar tus ventas?";
      }
      setBotMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setBotLoading(false);
    }, 800);
  };

  // Universal Lead Form Modal State for all subpages
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadModalType, setLeadModalType] = useState<PublicFormType>("contacto_comercial");
  const [leadModalInitialData, setLeadModalInitialData] = useState<Record<string, any>>({});

  const openLeadForm = (formType: PublicFormType, initialData: Record<string, any> = {}) => {
    setLeadModalType(formType);
    setLeadModalInitialData(initialData);
    setLeadModalOpen(true);
  };

  // Filter state for portfolio/industries
  const [industryFilter, setIndustryFilter] = useState<string>("todos");

  // Course enrollment state
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);

  // Full services catalog (437 servicios) — search, category filter & pagination
  const ALL_SERVICES = useMemo(() => {
    const raw = Array.isArray(serviciosCatalogo)
      ? serviciosCatalogo
      : Array.isArray((serviciosCatalogo as any)?.servicios)
      ? (serviciosCatalogo as any).servicios
      : [];
    return raw.map((s: any) => ({
      id: String(s.id || ""),
      name: s.name || s.title || "Servicio",
      cat: s.cat || s.categoria || "General",
      desc: s.desc || s.description || "",
      price: String(s.price || s.precio || "0")
    })) as CatalogService[];
  }, []);

  const SERVICE_CATEGORIES = useMemo(() => {
    const raw = Array.isArray(categoriasServicios)
      ? categoriasServicios
      : Array.isArray((categoriasServicios as any)?.categorias)
      ? (categoriasServicios as any).categorias
      : [];
    return raw.map((c: any) => {
      const name = typeof c === "string" ? c : c.name || "Categoría";
      if (name === "Todos" || name === "Todas") return null;
      const count = typeof c === "object" && c.count != null ? c.count : ALL_SERVICES.filter(s => s.cat === name).length;
      return { name, count };
    }).filter(Boolean) as CatalogCategory[];
  }, [ALL_SERVICES]);
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogCat, setCatalogCat] = useState<string>("");
  const [catalogPage, setCatalogPage] = useState(1);
  const CATALOG_PAGE_SIZE = 24;

  const filteredCatalog = useMemo(() => {
    const q = catalogQuery.trim().toLowerCase();
    return ALL_SERVICES.filter((s) => {
      const matchesCat = !catalogCat || s.cat === catalogCat;
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [catalogQuery, catalogCat]);

  const catalogTotalPages = Math.max(1, Math.ceil(filteredCatalog.length / CATALOG_PAGE_SIZE));
  const catalogPageItems = useMemo(() => {
    const start = (catalogPage - 1) * CATALOG_PAGE_SIZE;
    return filteredCatalog.slice(start, start + CATALOG_PAGE_SIZE);
  }, [filteredCatalog, catalogPage]);

  const PLANES_DATA = [
    { plan: "Plan Inicial",     precio_usd_mes: 20,  descripcion: "Para emprendedores y pequeños negocios.", web: "Landing page responsiva", crm_erp: "Embudo básico (200 cont.)", seguridad: "Respaldos mensuales",        ia_bi: "Bot de bienvenida fijo" },
    { plan: "Plan PyME",        precio_usd_mes: 45,  descripcion: "Para comercios con ventas activas.",       web: "Tienda online estándar",   crm_erp: "Stock + AFIP (1.000 cont.)", seguridad: "Cifrado de base de datos",   ia_bi: "Bot WhatsApp con FAQs" },
    { plan: "Plan Pro",         precio_usd_mes: 80,  descripcion: "Para automatizar con IA, bots y facturación.", web: "E-Commerce premium total", crm_erp: "Multi-embudo ilimitado",   seguridad: "Auditorías de software",    ia_bi: "Agente IA & BI avanzado" },
    { plan: "Plan Corporativo", precio_usd_mes: 150, descripcion: "Para empresas con múltiples canales activos.", web: "Portal B2B + Web integral", crm_erp: "Pipeline multi-sucursal",  seguridad: "Hardening y firewall",     ia_bi: "Analítica predictiva & bots" },
    { plan: "Plan Especializado", precio_usd_mes: 250, descripcion: "Infraestructura y desarrollos a medida.",   web: "Apps web & mobile infinitas", crm_erp: "Integraciones ERP legacy", seguridad: "SOC activo 24/7 dedicado", ia_bi: "Modelos LLM corporativos" },
  ];

  // ── Unified WooCommerce CSV export ────────────────────────────────────────
  // Combines: servicios (437) + planes (5) + cursos (67) + soluciones (12) = 521 total WC rows
  const handleExportWooCommerceCSV = () => {
    const esc = (v: string | number) => {
      const s = String(v ?? "").replace(/"/g, '""');
      return /[",\n\r]/.test(s) ? `"${s}"` : s;
    };

    const WC_HEADERS = [
      "ID", "Type", "SKU", "Name", "Published",
      "Short description", "Description",
      "In stock?", "Regular price",
      "Categories", "Tags",
    ];

    const row = (
      id: string, sku: string, name: string,
      shortDesc: string, desc: string,
      price: string | number, categories: string, tags: string,
    ) => [
      "",          // ID — WooCommerce asigna
      "simple",    // Type
      sku,
      name,
      "1",         // Published
      shortDesc,
      desc,
      "1",         // In stock?
      String(price),
      categories,
      tags,
    ].map(esc).join(",");

    const lines: string[] = [WC_HEADERS.join(",")];

    // 1 — Servicios (src/data/servicios-catalogo.json)
    for (const s of ALL_SERVICES) {
      const priceNum = parseFloat(String(s.price).replace(",", ".")) || 0;
      lines.push(row(
        s.id,
        `SRV-${s.id}`,
        s.name,
        s.desc,
        s.desc,
        priceNum.toFixed(2),
        `Servicios > ${s.cat}`,
        "servicio,clientum",
      ));
    }

    // 2 — Planes (hardcoded)
    const planesData = [
      { slug: "inicial",     name: "Plan Inicial",    price: 20,  desc: "Para emprendedores y pequeños negocios.",       features: "Web: Landing page responsiva | CRM/ERP: Embudo básico (200 cont.) | Seguridad: Respaldos mensuales | IA & BI: Bot de bienvenida fijo" },
      { slug: "pyme",        name: "Plan PyME",       price: 45,  desc: "Para comercios con ventas activas.",             features: "Web: Tienda online estándar | CRM/ERP: Stock + AFIP (1.000 cont.) | Seguridad: Cifrado de base de datos | IA & BI: Bot WhatsApp con FAQs" },
      { slug: "pro",         name: "Plan Pro",        price: 80,  desc: "Para automatizar con IA, bots y facturación.",  features: "Web: E-Commerce premium total | CRM/ERP: Multi-embudo ilimitado | Seguridad: Auditorías de software | IA & BI: Agente IA & BI avanzado" },
      { slug: "corporativo", name: "Plan Corporativo",     price: 150, desc: "Para empresas con múltiples canales activos.",   features: "Web: Portal B2B + Web integral | CRM/ERP: Pipeline multi-sucursal | Seguridad: Hardening y firewall | IA & BI: Analítica predictiva & bots" },
      { slug: "especializado", name: "Plan Especializado",   price: 250, desc: "Infraestructura y desarrollos a medida.",        features: "Web: Apps web & mobile infinitas | CRM/ERP: Integraciones ERP legacy | Seguridad: SOC activo 24/7 dedicado | IA & BI: Modelos LLM corporativos" },
    ];
    for (const p of planesData) {
      lines.push(row(
        p.slug,
        `PLN-${p.slug}`,
        p.name,
        p.desc,
        `${p.desc} ${p.features}`,
        p.price.toFixed(2),
        "Planes > Suscripción mensual",
        "plan,suscripcion,clientum",
      ));
    }

    // 3 — Cursos (src/data/cursos-lms.json)
    for (const c of (ALL_COURSES as any[])) {
      lines.push(row(
        c.id,
        `CRS-${c.id}`,
        c.title,
        c.excerpt,
        c.excerpt,
        "0",
        "Cursos > Campus Virtual",
        "curso,capacitacion,clientum",
      ));
    }

    // 4 — Soluciones (nav items)
    const solucionesData = [
      { id: "chatbot",          name: "Chatbot WhatsApp",    desc: "Tu negocio atiende solo, las 24 horas." },
      { id: "crm_inteligente",  name: "CRM Inteligente",     desc: "Nunca más perdas una venta." },
      { id: "asistente_ia",     name: "Asistente IA",        desc: "Tu analista de negocio, siempre disponible." },
      { id: "reportes",         name: "Reportes Automáticos",desc: "Dashboards en tiempo real para decisiones basadas en datos." },
      { id: "automatizacion",   name: "Automatización",      desc: "Hacé más con menos esfuerzo." },
      { id: "portal_cliente",   name: "Portal del Cliente",  desc: "Tus clientes se autoatienden." },
      { id: "desarrollo_web",   name: "Desarrollo Web",      desc: "Tu presencia web, conectada al CRM." },
      { id: "integraciones",    name: "Integraciones",       desc: "WhatsApp, AFIP, MercadoPago, Gmail y más de 50 servicios." },
      { id: "catalogo",         name: "Catálogo Completo",   desc: "425 servicios en 14 categorías con precios reales." },
      { id: "consultoria_erp",  name: "Consultoría & ERP",   desc: "Auditoría de procesos, ERP personalizado y hoja de ruta." },
      { id: "planes_precios",   name: "Planes y Precios",    desc: "Desde $20 USD/mes. Implementación en 5 días hábiles." },
      { id: "casos",            name: "Casos de Éxito",      desc: "Historias reales de PyMEs que multiplicaron sus ventas." },
    ];
    for (const s of solucionesData) {
      lines.push(row(
        s.id,
        `SOL-${s.id}`,
        s.name,
        s.desc,
        s.desc,
        "0",
        "Soluciones > Plataforma",
        "solucion,plataforma,clientum",
      ));
    }

    const total = ALL_SERVICES.length + planesData.length + (ALL_COURSES as any[]).length + solucionesData.length;
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientum-woocommerce-${total}-productos.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Full LMS course catalog (67 cursos) — search & pagination
  const ALL_COURSES = useMemo(() => {
    const raw = Array.isArray(cursosLms)
      ? cursosLms
      : Array.isArray((cursosLms as any)?.cursos)
      ? (cursosLms as any).cursos
      : [];
    return raw.map((c: any) => ({
      id: String(c.id || ""),
      title: c.title || "Curso",
      excerpt: c.excerpt || c.description || ""
    })) as LmsCourse[];
  }, []);
  const [coursesQuery, setCoursesQuery] = useState("");
  const [coursesPage, setCoursesPage] = useState(1);
  const COURSES_PAGE_SIZE = 12;

  const filteredCourses = useMemo(() => {
    const q = coursesQuery.trim().toLowerCase();
    if (!q) return ALL_COURSES;
    return ALL_COURSES.filter((c) => c.title.toLowerCase().includes(q) || c.excerpt.toLowerCase().includes(q));
  }, [coursesQuery]);

  const coursesTotalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PAGE_SIZE));
  const coursesPageItems = useMemo(() => {
    const start = (coursesPage - 1) * COURSES_PAGE_SIZE;
    return filteredCourses.slice(start, start + COURSES_PAGE_SIZE);
  }, [filteredCourses, coursesPage]);

  // Interactive Pricing Configurator
  const [projectCount, setProjectCount] = useState<number>(30);
  const [pageCount, setPageCount] = useState<number>(15);

  // FAQ Accordion active states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Office Map state
  const [selectedOffice, setSelectedOffice] = useState<string>("roca");

  // Recommended plan calculation
  const recommendedPlan = useMemo(() => {
    const total = projectCount + pageCount;
    if (total <= 20) {
      return {
        name: "Plan Inicial",
        price: "$20",
        desc: "Ideal para emprendedores e iniciativas pequeñas con landing page y CRM básico."
      };
    } else if (total <= 60) {
      return {
        name: "Plan PyME",
        price: "$45",
        desc: "Para comercios con ventas activas: tienda online, stock, AFIP y bot WhatsApp."
      };
    } else if (total <= 100) {
      return {
        name: "Plan Pro",
        price: "$80",
        desc: "Nuestra opción más elegida — IA, bots, facturación automática y e-commerce premium."
      };
    } else {
      return {
        name: "Plan Corporativo",
        price: "$150",
        desc: "Para empresas con múltiples canales activos, portal B2B y analítica predictiva."
      };
    }
  }, [projectCount, pageCount]);

  // Handle forms with live server integration
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.nombre || !demoForm.email) return;
    setIsDemoLoading(true);

    try {
      await fetch('/api/public/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'diagnostico_pyme',
          nombre: demoForm.nombre,
          email: demoForm.email,
          telefono: demoForm.telefono,
          empresa: demoForm.empresa,
          rubro: demoForm.rubro,
          mensaje: demoForm.mensaje || 'Solicitud de diagnóstico o cotización desde el sitio web público',
          metadata: { newsletter: demoForm.newsletter }
        })
      });
    } catch (err) {
      console.warn('Error enviando formulario al backend:', err);
    } finally {
      setIsDemoLoading(false);
      setIsDemoSubmitted(true);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    try {
      await fetch('/api/public/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'newsletter_suscripcion',
          email: newsletterEmail,
          nombre: 'Suscriptor Newsletter',
          mensaje: 'Suscripción al boletín de tendencias y actualizaciones de Clientum'
        })
      });
    } catch (err) {
      // ignore
    }
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSubscribed(false);
    }, 5000);
  };

  // Content Data structures
  const OFFICES = useMemo(() => ({
    roca: {
      id: "roca",
      name: isPortuguese ? "Sede Principal — Patagônia Argentina" : "Sede Principal — Patagonia Argentina",
      leader: "Jonathan Ledantes (CEO & Co-Fundador)",
      address: "General Roca, Río Negro — Patagonia Argentina",
      phone: "+54 298 451-0883",
      email: "info@clientum.com.ar",
      desc: isPortuguese
        ? "Matriz e centro de desenvolvimento tecnológico, engenharia de software, arquitetura de IA e operações centrais."
        : "Casa Matriz y centro de desarrollo tecnológico, ingeniería de software, arquitectura de IA y operaciones centrales.",
      badge: isPortuguese ? "Sede Principal" : "Sede Principal",
      countryBadge: "Patagonia, Argentina",
      flag: "🇦🇷"
    },
    brasil: {
      id: "brasil",
      name: isPortuguese ? "Sede Internacional — Brasil" : "Sede Internacional — Brasil",
      leader: isPortuguese ? "Matias Rotili (Diretor Internacional & Co-Fundador)" : "Matias Rotili (Director Internacional & Co-Fundador)",
      address: "Matias Andres Rotili Poinsof - Arraial do Cabo, Rio de Janeiro, Brasil",
      phone: "+54 9 291 440-9805",
      email: "brasil@clientum.com.ar",
      desc: isPortuguese
        ? "Operando de forma global e digital para expansão B2B, parcerias corporativas e conectividade no Brasil e Mercosul."
        : "Operando de manera global y digital para expansión B2B, alianzas corporativas y conectividad en Brasil y Mercosur.",
      badge: isPortuguese ? "Sede Brasil" : "Sede Brasil",
      countryBadge: "Arraial do Cabo, Brasil",
      flag: "🇧🇷"
    }
  }), [isPortuguese]);

  const COURSES = [
    {
      id: "course-1",
      title: "Dominio de las métricas de marketing digital",
      desc: "Descubre cómo analizar, medir y optimizar tus estrategias de adquisición y conversión.",
      duration: "4 semanas",
      level: "Intermedio",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-2",
      title: "Crea tu Tienda Online ¡YA! con Woocommerce",
      desc: "Vende más que nunca de forma autónoma. Despídete del trabajo tradicional y controla tu inventario.",
      duration: "6 semanas",
      level: "Principiante",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-3",
      title: "Automatiza tu Negocio y Multiplica tu Tiempo",
      desc: "Aprende a integrar bots de WhatsApp, flujos de CRM y liquidaciones automáticas. Dile adiós al estrés.",
      duration: "5 semanas",
      level: "Avanzado",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-4",
      title: "Finanzas para Emprendedores",
      desc: "Toma el control absoluto de tu flujo de caja, costos fijos y proyecciones de facturación en pesos.",
      duration: "4 semanas",
      level: "Principiante",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-5",
      title: "SEO Avanzado y Marketing Orgánico",
      desc: "Posiciona tu web corporativa en el TOP de Google y recibe miles de visitas gratuitas cada mes.",
      duration: "8 semanas",
      level: "Avanzado",
      img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-6",
      title: "Comunicación Empresarial Efectiva",
      desc: "Domina el arte de hablar en público, negociar contratos y convencer a clientes exigentes.",
      duration: "3 semanas",
      level: "General",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const PROJECTS = [
    {
      id: "p1",
      name: "Morgado Hogar",
      year: "2023",
      type: "E-Commerce + CRM Inteligente",
      industry: "retail",
      logo: "/logos/morgado-hogar.webp",
      darkLogo: false,
      img: "/clientes/morgado-hogar-web.png",
      desc: "Tienda online con catálogo de muebles y deco sincronizado con stock físico. Pipeline de ventas y seguimiento automático de presupuestos por WhatsApp."
    },
    {
      id: "p2",
      name: "Farmacia San Martín",
      year: "2023",
      type: "Bot WhatsApp + Gestión de Stock",
      industry: "salud",
      logo: "/logos/farmacia-san-martin.png",
      darkLogo: false,
      img: "/clientes/farmacia-san-martin-web.png",
      desc: "Bot 24/7 que responde consultas de disponibilidad de medicamentos, agenda turnos y envía recordatorios. Stock integrado con facturación AFIP."
    },
    {
      id: "p4",
      name: "Terbay Propiedades",
      year: "2023",
      type: "CRM Inmobiliario + Bot WhatsApp",
      industry: "inmobiliaria",
      logo: "/logos/terbay.png",
      darkLogo: true,
      img: "/clientes/terbay-web.png",
      desc: "Bot califica interesados, envía planos y fotos, y agenda visitas automáticamente. Pipeline de operaciones con seguimiento de cada cliente hasta el cierre."
    },
    {
      id: "p5",
      name: "Forestal Norte",
      year: "2022",
      type: "ERP + AFIP + Cartas de Porte",
      industry: "agroindustria",
      logo: null,
      darkLogo: false,
      img: "/logos/forestal-norte.jpg",
      desc: "Digitalización de operaciones forestales: cartas de porte electrónicas, liquidaciones automáticas y trazabilidad de carga desde el campo hasta la planta."
    },
    {
      id: "p13",
      name: "Consorcio de Riego General Roca",
      year: "2023",
      type: "Portal Institucional + Gestión de Turnos",
      industry: "agroindustria",
      logo: null,
      darkLogo: false,
      img: "/clientes/consorcio-riego-web.png",
      desc: "Portal con gestión de turnos de agua, calendario de riegos, pagos online integrados y comunicaciones automáticas a los regantes del Alto Valle."
    },
    {
      id: "p14",
      name: "Hábitat Sur",
      year: "2024",
      type: "Sitio Web + CRM Inmobiliario",
      industry: "inmobiliaria",
      logo: null,
      darkLogo: false,
      img: "/clientes/habitat-sur-web.png",
      desc: "Sitio inmobiliario con listado de propiedades, filtros, ficha de contacto y catálogo de cotizaciones conectado al CRM. Automatización de seguimiento de cotizaciones."
    },
    {
      id: "p15",
      name: "Municipio de 25 de Mayo",
      year: "2024",
      type: "Portal Municipal + Gestión de Trámites",
      industry: "institucional",
      logo: "/logos/municipio-25-de-mayo.png",
      darkLogo: false,
      img: "/clientes/municipio-25-de-mayo-web.png",
      desc: "Portal de gobierno digital con acceso a trámites, novedades municipales, contacto ciudadano y gestión de contenidos desde un panel administrable."
    },
    {
      id: "p6",
      name: "Canal 10 TV",
      year: "2022",
      type: "Portal Web + Streaming Digital",
      industry: "medios",
      logo: "/logos/canal10.webp",
      darkLogo: true,
      img: "/clientes/canal10-web.png",
      desc: "Rediseño del portal de noticias con integración de streaming en vivo, gestión de contenidos y automatización de publicaciones en redes sociales."
    },
    {
      id: "p7",
      name: "Cabarcos Motores SRL",
      year: "2023",
      type: "E-Commerce + CRM Automotriz",
      industry: "automotriz",
      logo: "/logos/cabarcos-motores-cropped.png",
      darkLogo: true,
      img: "/clientes/cabarcos-motores-web.png",
      desc: "Catálogo de vehículos y repuestos online con reservas digitales. CRM con seguimiento de consultas, test drives y posventa integrada a WhatsApp."
    },
    {
      id: "p8",
      name: "KJ Logística",
      year: "2023",
      type: "ERP + Rastreo de Flota",
      industry: "logística",
      logo: "/logos/kj-logistica.webp",
      darkLogo: true,
      img: "/clientes/kj-logistica-web.png",
      desc: "Sistema de gestión de viajes, control de flota y liquidación de conductores. Reportes automáticos de kilómetros, combustible y rentabilidad por unidad."
    },
    {
      id: "p9",
      name: "Poliservice Suministros",
      year: "2024",
      type: "Sitio Web + CRM de Distribución Zonal",
      industry: "industrial",
      logo: null,
      darkLogo: false,
      img: "/clientes/poliservice-web.png",
      desc: "Sitio institucional con representación y distribución zonal, ficha de importador y catálogo de clientes. CRM para seguimiento de cotizaciones industriales."
    },
    {
      id: "p10",
      name: "SCT Patagonia",
      year: "2024",
      type: "Sitio Web + Catálogo de Servicios",
      industry: "industrial",
      logo: "/logos/sct-patagonia.png",
      darkLogo: true,
      img: "/clientes/sct-patagonia-web.png",
      desc: "Rediseño del sitio con catálogo de servicios de cintas transportadoras, video institucional y formulario de contacto conectado al CRM comercial."
    },
    {
      id: "p11",
      name: "AFP Service",
      year: "2024",
      type: "E-Commerce + Catálogo de Productos",
      industry: "industrial",
      logo: "/logos/afp-service.png",
      darkLogo: true,
      img: "/clientes/afp-service-web.png",
      desc: "Tienda online de ferretería industrial y unidades modulares con buscador inteligente, catálogo descargable y gestión de pedidos integrada al stock."
    },
    {
      id: "p12",
      name: "Centro Empleados de Comercio",
      year: "2024",
      type: "Portal Institucional + Gestión de Novedades",
      industry: "institucional",
      logo: "/logos/cec-general-roca.png",
      darkLogo: false,
      img: "/clientes/cec-web.png",
      desc: "Portal gremial con beneficios destacados, novedades, escalas salariales y accesos directos a OSECAC y afiliación. Clientum nos ahorró un empleado administrativo."
    }
  ];

  const BLOG_POSTS = [
    {
      title: "Cómo mejorar tu SEO en 2026",
      desc: "Descubre las mejores prácticas de arquitectura semántica, optimización de velocidad de carga y contenidos de valor para disparar tus visitas orgánicas gratis.",
      category: "Marketing",
      readTime: "5 min"
    },
    {
      title: "Tendencias en Diseño Web Omnicanal",
      desc: "Cómo conectar las experiencias físicas en tu local (como códigos QR de mesa) con tus canales digitales de venta y mensajería en piloto automático.",
      category: "Diseño",
      readTime: "7 min"
    },
    {
      title: "Estrategias de Marketing Digital para PyMEs",
      desc: "Descubre el embudo de ventas que duplica cierres de transacciones comerciales reduciendo el esfuerzo operativo del equipo de ventas.",
      category: "Estrategia",
      readTime: "6 min"
    },
    {
      title: "El Impacto de la Inteligencia Artificial en ERP",
      desc: "Por qué automatizar las tareas repetitivas y la conciliación de facturas de AFIP libera hasta un 40% del tiempo de tu personal de administración.",
      category: "Tecnología",
      readTime: "8 min"
    }
  ];

  const FAQS = [
    {
      q: "¿Qué servicios integrales ofrece exactamente Clientum?",
      a: "Clientum se especializa en consultoría de transformación digital. Ofrecemos desarrollo de sitios web e-commerce omnicanal, diseño de marcas sólidas (Branding), implementación personalizada de ERP y CRM integrados con facturación AFIP, Business Intelligence avanzado, consultoría en ciberseguridad y capacitación a través de Clientum Academia."
    },
    {
      q: "¿Cuánto tiempo toma el desarrollo y puesta en marcha de un sitio web o CRM?",
      a: "Un sitio web o landing page profesional puede estar listo en un plazo de 4 a 6 semanas. Proyectos más complejos que involucren plataformas omnicanal de e-commerce o implementaciones profundas de ERP y CRM toman entre 8 y 12 semanas. Siempre trabajamos de forma ágil y por fases."
    },
    {
      q: "¿Qué métodos de pago aceptan y si el IVA se calcula en el precio?",
      a: "Aceptamos pagos en pesos argentinos mediante transferencia bancaria, MercadoPago, y tarjetas de crédito internacionales. El IVA se aplica según la condición fiscal de tu empresa y la legislación vigente, detallándose con transparencia en el presupuesto."
    },
    {
      q: "¿Ofrecen soporte técnico post-implementación?",
      a: "Sí, todos nuestros desarrollos e implementaciones cuentan con soporte amigable permanente. Ofrecemos mantenimiento continuo, copias de seguridad de bases de datos automáticas y asistencia telefónica u online 24/7 para que tu negocio nunca se detenga."
    },
    {
      q: "¿Qué ventajas tiene Clientum sobre otras agencias tradicionales?",
      a: "Clientum combina un equipo multidisciplinario con ingeniería de software rigurosa. Nacimos en General Roca, Río Negro en 2016 — antes como Viaweb — lo que nos da un entendimiento directo de las PyMEs del interior argentino. Operamos 100% de forma remota y atendemos clientes en todo el país."
    }
  ];

  const filteredProjects = useMemo(() => {
    if (industryFilter === "todos") return PROJECTS;
    return PROJECTS.filter(p => p.industry === industryFilter);
  }, [industryFilter]);

  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const filteredBlogPosts = useMemo(() => {
    if (!blogSearchQuery) return BLOG_POSTS;
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      post.desc.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(blogSearchQuery.toLowerCase())
    );
  }, [blogSearchQuery]);

  // ── Taxonomía única del sitio ──────────────────────────────────────────
  // Estas 4 listas son la ÚNICA fuente de verdad para "Soluciones",
  // "Empresa", "Recursos" y "Soporte". El menú superior, el sitemap del
  // footer y el cuerpo principal del footer reutilizan estos mismos arrays
  // (en vez de tener 3 taxonomías distintas y desincronizadas) para que
  // agregar/renombrar un ítem lo actualice en todo el sitio a la vez.
  // Los ítems con `query` no tienen una sección propia: abren el catálogo
  // de servicios filtrado por esa búsqueda (igual que hacía el footer).
  // Servicios profesionales y de consultoría de la agencia Clientum
  const SOLUTIONS_ITEMS = useMemo(() => [
    { id: "chatbot", label: "Agentes & Chatbot WhatsApp IA", desc: isPortuguese ? "Seu negócio atende sozinho com IA, 24 horas por dia" : "Atención comercial automatizada con IA 24/7", icon: Bot, color: "text-green-500 bg-green-50" },
    { id: "crm_inteligente", label: "Consultoría & CRM Inteligente", desc: isPortuguese ? "Implementação e gestão completa do funil de vendas" : "Implementación y gestión de pipeline comercial", icon: Briefcase, color: "text-blue-500 bg-blue-50" },
    { id: "asistente_ia", label: isPortuguese ? "Consultoria em Inteligência Artificial" : "Consultoría en Inteligencia Artificial", desc: isPortuguese ? "Estratégia e modelos de IA para seu negócio" : "Estrategia e implementación de IA para tu negocio", icon: Sparkles, color: "text-violet-500 bg-violet-50" },
    { id: "automatizacion", label: isPortuguese ? "Automação de Processos & Outreach" : "Automatización de Procesos & Outreach", desc: isPortuguese ? "Campanhas em massa no WhatsApp e fluxos automatizados" : "Campañas masivas de WhatsApp y flujos comerciales", icon: Radio, color: "text-amber-500 bg-amber-50" },
    { id: "portal_cliente", label: isPortuguese ? "Portais B2B & Autoatendimento" : "Portales B2B & Autoatención", desc: isPortuguese ? "Portais de clientes e autosserviço online" : "Portales a medida para autogestión de clientes", icon: LayoutGrid, color: "text-teal-500 bg-teal-50" },
    { id: "desarrollo_web", label: isPortuguese ? "Desenvolvimento Web & Landing Pages" : "Desarrollo Web & Landing Pages", desc: isPortuguese ? "Sites institucionais e páginas de alta conversão" : "Sitios corporativos y landings de alta conversión", icon: Code2, color: "text-slate-600 bg-slate-100" },
    { id: "integraciones", label: isPortuguese ? "Integrações de Sistemas & APIs" : "Integraciones de Sistemas & APIs", desc: isPortuguese ? "Conexão de ERPs, WhatsApp, AFIP e 60+ serviços" : "Conexión de ERPs, WhatsApp, AFIP y más de 60 APIs", icon: Workflow, color: "text-emerald-500 bg-emerald-50" },
    { id: "afip", label: isPortuguese ? "Faturamento Eletrônico AFIP" : "Facturación Electrónica AFIP", desc: isPortuguese ? "Integração fiscal e emissão automática" : "Emisión automática y sincronización fiscal", icon: FileText, color: "text-blue-700 bg-blue-50" },
    { id: "mercadopago", label: isPortuguese ? "Sistemas de Cobrança e Pagamentos" : "Sistemas de Cobranza y Pagos", desc: isPortuguese ? "Integração Mercado Pago, assinaturas e links" : "MercadoPago, suscripciones y pasarelas de pago", icon: CreditCard, color: "text-sky-600 bg-sky-50" },
    { id: "leads", label: isPortuguese ? "Geração & Qualificação de Leads" : "Generación & Calificación de Leads", desc: isPortuguese ? "Prospecção B2B com Inteligência Artificial" : "Prospección B2B y prospección Maps con IA", icon: Rocket, color: "text-violet-500 bg-violet-50" },
    { id: "reportes", label: "Business Intelligence & Analítica", desc: isPortuguese ? "Dashboards de desempenho e métricas executivas" : "Dashboards ejecutivos y métricas de conversión", icon: BarChart2, color: "text-fuchsia-500 bg-fuchsia-50" },
    { id: "ecommerce", label: "Desarrollo E-Commerce", desc: isPortuguese ? "Lojas virtuais integradas a CRM e estoque" : "Tiendas online integradas con CRM y stock", icon: ShoppingCart, color: "text-orange-500 bg-orange-50", query: "ecommerce" },
  ], [isPortuguese]);

  /* ─── Mega-menu groups (desktop only) ─── */
  const SOLUTIONS_GROUPS = useMemo(() => [
    {
      key: "crm",
      title: isPortuguese ? "Consultoria & Funil CRM" : "Consultoría & Pipeline CRM",
      accent: "border-blue-500",
      headerColor: "text-blue-700",
      items: [
        { id: "crm_inteligente", label: "Implementación CRM", desc: isPortuguese ? "Kanban de oportunidades e gestão de vendas" : "Configuración de embudos y gestión de deals", icon: Briefcase, color: "text-blue-500 bg-blue-50" },
        { id: "leads",           label: isPortuguese ? "Prospecção Maps IA" : "Prospección Maps IA", desc: isPortuguese ? "Descubra empresas por região com Gemini AI" : "Búsqueda geolocalizada de prospectos B2B", icon: Compass, color: "text-violet-500 bg-violet-50" },
        { id: "leads",           label: "Lead Scoring MEDDIC", desc: isPortuguese ? "Qualificação de oportunidades B2B" : "Metodología de calificación de cuentas clave", icon: Target, color: "text-indigo-500 bg-indigo-50" },
        { id: "reportes",        label: "Business Intelligence", desc: isPortuguese ? "CAC, LTV e taxas de conversão em tempo real" : "KPIs comerciales, CAC, LTV y conversión", icon: BarChart2, color: "text-fuchsia-500 bg-fuchsia-50" },
      ],
    },
    {
      key: "email",
      title: isPortuguese ? "Automação & WhatsApp IA" : "Automatización & WhatsApp IA",
      accent: "border-amber-500",
      headerColor: "text-amber-700",
      items: [
        { id: "chatbot",        label: "Chatbot WhatsApp 24/7", desc: isPortuguese ? "Atendimento comercial com inteligência artificial" : "Atención comercial automatizada con IA", icon: Bot, color: "text-green-500 bg-green-50" },
        { id: "automatizacion", label: isPortuguese ? "Campanhas & Outreach" : "Campañas & Outreach", desc: isPortuguese ? "Drip email e broadcast em massa no WhatsApp" : "Campañas masivas de WhatsApp y secuencias", icon: Radio, color: "text-amber-500 bg-amber-50" },
        { id: "automatizacion", label: isPortuguese ? "Agente SDR Automático" : "Agente SDR Automático", desc: isPortuguese ? "Prospecção e follow-up automático com IA" : "Prospección y seguimiento comercial con IA", icon: Zap, color: "text-orange-500 bg-orange-50" },
        { id: "portal_cliente", label: isPortuguese ? "Portais de Autoatendimento" : "Portales de Autoatención", desc: isPortuguese ? "Autoatendimento, tickets e acompanhamento" : "Portales de autogestión para clientes B2B", icon: LayoutGrid, color: "text-teal-500 bg-teal-50" },
      ],
    },
    {
      key: "ia",
      title: isPortuguese ? "Marketing & IA Aplicada" : "Growth Marketing & IA",
      accent: "border-violet-500",
      headerColor: "text-violet-700",
      items: [
        { id: "asistente_ia", label: "Consultoría IA Gemini 2.5", desc: isPortuguese ? "Estratégia e automação personalizada de IA" : "Asesoría estratégica de adopción de IA", icon: Sparkles, color: "text-violet-500 bg-violet-50" },
        { id: "asistente_ia", label: isPortuguese ? "Estratégias Go-to-Market" : "Estrategias Go-to-Market", desc: isPortuguese ? "Planos de expansão comercial e posicionamento" : "Planes de lanzamiento y posicionamiento", icon: Megaphone, color: "text-rose-500 bg-rose-50" },
        { id: "asistente_ia", label: "AI Copy & Contenido", desc: isPortuguese ? "Cópias de alta conversão para anúncios e e-mails" : "Redacción publicitaria para anuncios y ventas", icon: FileText, color: "text-blue-500 bg-blue-50" },
        { id: "reportes",     label: isPortuguese ? "Consultoria SEO Completa" : "Posicionamiento SEO", desc: isPortuguese ? "Palavras-chave, auditoria e visibilidade" : "Auditoría, keywords y visibilidad en Google", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
      ],
    },
    {
      key: "platform",
      title: isPortuguese ? "Desenvolvimento Web & Integrações" : "Desarrollo Web & Integraciones",
      accent: "border-slate-400",
      headerColor: "text-slate-700",
      items: [
        { id: "desarrollo_web",label: isPortuguese ? "Desenvolvimento Web" : "Desarrollo Web & Landings", desc: isPortuguese ? "Sites modernos focados em conversão" : "Sitios modernos de alta conversión y velocidad", icon: Code2, color: "text-slate-600 bg-slate-100" },
        { id: "integraciones", label: isPortuguese ? "60+ Integrações de APIs" : "Integraciones API & ERP", desc: isPortuguese ? "Conexão fluida de sistemas e bancos de dados" : "Conexión de sistemas, webhooks y bases de datos", icon: Workflow, color: "text-emerald-500 bg-emerald-50" },
        { id: "afip",          label: isPortuguese ? "Faturamento Eletrônico AFIP" : "Facturación AFIP Automática", desc: isPortuguese ? "Emissão e controle fiscal integrado" : "Integración directa de comprobantes y CAE", icon: FileText, color: "text-blue-700 bg-blue-50" },
        { id: "mercadopago",   label: isPortuguese ? "Cobranças Mercado Pago" : "Pasarelas MercadoPago", desc: isPortuguese ? "Assinaturas e links de pagamento automáticos" : "Suscripciones y checkout automatizado", icon: CreditCard, color: "text-sky-600 bg-sky-50" },
      ],
    },
  ], [isPortuguese]);

  const INDUSTRIES_ITEMS = useMemo(() => [
    { id: "retail", label: isPortuguese ? "Comércio e Varejo" : "Comercios y Retail", icon: ShoppingCart, color: "text-orange-500 bg-orange-50" },
    { id: "salud", label: isPortuguese ? "Saúde e Clínicas" : "Salud", icon: Stethoscope, color: "text-rose-500 bg-rose-50" },
    { id: "agroindustria", label: isPortuguese ? "Agronegócio & Agroindústria" : "Agroindustria", icon: Package, color: "text-lime-600 bg-lime-50" },
    { id: "inmobiliaria", label: isPortuguese ? "Imobiliário & Construtoras" : "Inmobiliaria", icon: Home, color: "text-teal-500 bg-teal-50" },
    { id: "logística", label: isPortuguese ? "Logística e Distribuição" : "Logística y Distribución", icon: Truck, color: "text-slate-600 bg-slate-100" },
    { id: "industrial", label: isPortuguese ? "Indústria e Manufatura" : "Industrial y Manufactura", icon: Building, color: "text-amber-600 bg-amber-50" },
    { id: "automotriz", label: isPortuguese ? "Automotivo" : "Automotriz", icon: Compass, color: "text-blue-600 bg-blue-50" },
    { id: "medios", label: isPortuguese ? "Mídia e Comunicação" : "Medios", icon: Monitor, color: "text-fuchsia-600 bg-fuchsia-50" },
    { id: "institucional", label: isPortuguese ? "Institucional & Governo" : "Institucional", icon: Building, color: "text-indigo-600 bg-indigo-50" },
  ], [isPortuguese]);

  const EMPRESA_ITEMS = useMemo(() => [
    { id: "nosotros", label: isPortuguese ? "Sobre a Clientum" : "Sobre Clientum", desc: isPortuguese ? "Quem somos e nossa missão" : "Quiénes somos y nuestra misión", icon: Building, color: "text-[#1A3461] bg-slate-100" },
    { id: "clientes", label: isPortuguese ? "Clientes" : "Clientes", desc: isPortuguese ? "Empresas que já confiam na Clientum" : "Empresas que ya confían en Clientum", icon: Users, color: "text-teal-500 bg-teal-50" },
    { id: "asociacion", label: isPortuguese ? "Parceiros" : "Partners", desc: isPortuguese ? "Programa de Afiliados e Parcerias" : "Programa de Afiliados y Partners", icon: Handshake, color: "text-violet-500 bg-violet-50" },
    { id: "carreras", label: isPortuguese ? "Trabalhe Conosco" : "Trabajá con Nosotros", desc: isPortuguese ? "Junte-se à equipe Clientum" : "Sumate al equipo de Clientum", icon: Users, color: "text-emerald-500 bg-emerald-50" },
    { id: "contacto", label: isPortuguese ? "Contato" : "Contacto", desc: isPortuguese ? "Fale conosco ou visite nossas sedes" : "Escríbenos o visita nuestras oficinas", icon: MapPin, color: "text-teal-500 bg-teal-50" },
  ], [isPortuguese]);

  const RECURSOS_ITEMS = useMemo(() => [
    { id: "blog", label: "Blog", desc: isPortuguese ? "Aprenda táticas de vendas e marketing" : "Aprende tácticas de ventas y marketing", icon: BookOpen, color: "text-rose-500 bg-rose-50" },
    { id: "academia", label: isPortuguese ? "Academia Clientum" : "Academia Clientum", desc: isPortuguese ? "Cursos gratuitos de CRM e automações" : "Cursos gratis de CRM y automatizaciones", icon: GraduationCap, color: "text-indigo-600 bg-indigo-50" },
    { id: "ayuda", label: isPortuguese ? "Central de Ajuda" : "Centro de Ayuda", desc: isPortuguese ? "Perguntas frequentes e suporte técnico" : "Preguntas frecuentes y soporte técnico", icon: HelpCircle, color: "text-slate-800 bg-slate-100" },
    { id: "documentacion", label: isPortuguese ? "Documentação API" : "Documentación API", desc: isPortuguese ? "Referência técnica para integrar seu CRM" : "Referencia técnica para integrar tu CRM", icon: Terminal, color: "text-slate-700 bg-slate-100" },
    ...(authUser ? [{ id: "catalogo", label: isPortuguese ? "Catálogo de Serviços" : "Catálogo de Servicios", desc: isPortuguese ? "425 serviços em 14 categorias com preços" : "425 servicios en 14 categorías con precios", icon: LayoutGrid, color: "text-indigo-500 bg-indigo-50" }] : []),
  ], [authUser, isPortuguese]);

  const menuConfig = useMemo(() => [
    { id: "inicio",     label: isPortuguese ? "Início" : "Inicio",        type: "link"     as const },
    { id: "servicios",  label: isPortuguese ? "Serviços" : "Servicios",   type: "megamenu" as const, children: SOLUTIONS_ITEMS, groups: SOLUTIONS_GROUPS },
    { id: "industrias", label: isPortuguese ? "Indústrias" : "Industrias",     type: "link"     as const },
    { id: "casos",      label: isPortuguese ? "Casos de Sucesso" : "Casos de Éxito", type: "link"     as const },
    { id: "recursos",   label: isPortuguese ? "Recursos" : "Recursos",       type: "dropdown" as const, children: RECURSOS_ITEMS },
    { id: "planes",     label: isPortuguese ? "Preços" : "Precios",        type: "link"     as const },
    { id: "empresa",    label: isPortuguese ? "Empresa" : "Empresa",        type: "dropdown" as const, children: EMPRESA_ITEMS },
  ], [SOLUTIONS_ITEMS, SOLUTIONS_GROUPS, RECURSOS_ITEMS, EMPRESA_ITEMS, isPortuguese]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-[#1A3461] selection:text-white relative">
      {/* Corporate Fixed Navigation Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 py-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-[#0A2558]">
            <img src="/favicon.svg" alt="Clientum Logo" className="w-7 h-7" referrerPolicy="no-referrer" />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight text-slate-900 leading-none block">
              CLIENTUM
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#1A3461] font-bold block mt-0.5">
              Agencia de Crecimiento &amp; Consultoría
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-0.5 text-sm font-semibold text-slate-600">
          {menuConfig.map(item => {
            if (item.type === "link") {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setActiveDropdown(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 py-2 rounded-lg transition-all text-[11px] uppercase tracking-wider font-extrabold cursor-pointer ${
                    isActive
                      ? "bg-[#1A3461]/10 text-[#1A3461] border-b-2 border-[#1A3461] rounded-b-none"
                      : "text-slate-600 hover:text-[#1A3461] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            } else if (item.type === "megamenu") {
              /* ── MEGA-MENU (Servicios) ── */
              const isGroupActive = activeTab === "servicios" || item.groups.some(g => g.items.some(c => c.id === activeTab));
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative py-2"
                >
                  <button
                    onClick={() => {
                      setActiveTab("servicios");
                      setActiveDropdown(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`px-3 py-2 rounded-lg transition-all text-[11px] uppercase tracking-wider font-extrabold cursor-pointer flex items-center gap-1 ${
                      isGroupActive
                        ? "bg-emerald-50/70 text-[#1A3461] border-b-2 border-emerald-500 rounded-b-none"
                        : "text-slate-600 hover:text-[#1A3461] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.97 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        style={{ width: "780px" }}
                      >
                        {/* Mega-menu header */}
                        <div className="bg-gradient-to-r from-[#0A2558] to-[#1A3461] px-5 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-white font-black text-sm tracking-tight">Agencia Clientum</p>
                            <p className="text-slate-300 text-[10px] mt-0.5">Servicios integrales de Consultoría, IA, CRM y Crecimiento Digital para PyMEs</p>
                          </div>
                          <button
                            onClick={() => { setActiveTab("servicios"); setActiveDropdown(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg tracking-wider transition-all cursor-pointer border-0"
                          >
                            Ver todos los servicios <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                        {/* 4-column grid */}
                        <div className="grid grid-cols-4 gap-0 p-4">
                          {item.groups.map((group) => (
                            <div key={group.key} className={`pr-4 ${group.key !== "platform" ? "border-r border-slate-100 mr-4" : ""}`}>
                              <p className={`text-[9px] font-black uppercase tracking-widest mb-2.5 ${group.headerColor} flex items-center gap-1.5`}>
                                <span className={`inline-block w-2.5 h-2.5 rounded-full border-2 ${group.accent}`}></span>
                                {group.title}
                              </p>
                              <div className="flex flex-col gap-0.5">
                                {group.items.map((child, ci) => {
                                  const ChildIcon = child.icon;
                                  const isChildActive = activeTab === child.id;
                                  return (
                                    <button
                                      key={`${group.key}-${ci}`}
                                      onClick={() => {
                                        if ((child as any).query) {
                                          setActiveTab("catalogo");
                                          setCatalogQuery((child as any).query);
                                          setCatalogCat("");
                                          setCatalogPage(1);
                                        } else {
                                          setActiveTab(child.id);
                                        }
                                        setActiveDropdown(null);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                      }}
                                      className={`w-full text-left px-2 py-2 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer group ${
                                        isChildActive ? "bg-emerald-50 border-l-[3px] border-emerald-500 rounded-l-none pl-1.5" : "hover:bg-slate-50"
                                      }`}
                                    >
                                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${child.color}`}>
                                        <ChildIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="font-bold text-[11px] text-slate-900 leading-tight flex items-center gap-1">
                                          {child.label}
                                          {isChildActive && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0"></span>}
                                        </div>
                                        <p className="text-[9px] text-slate-400 mt-0.5 font-normal leading-snug">{child.desc}</p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Footer bar */}
                        <div className="border-t border-slate-100 bg-slate-50 px-5 py-2.5 flex items-center gap-6">
                          {[
                            { label: "Ver Precios", id: "planes" },
                            { label: "Casos de Éxito", id: "casos" },
                            { label: "Solicitar Demo", id: "contacto" },
                          ].map(link => (
                            <button
                              key={link.id}
                              onClick={() => { setActiveTab(link.id); setActiveDropdown(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className="text-[10px] font-bold text-slate-500 hover:text-[#1A3461] transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              {link.label} <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            } else {
              /* ── REGULAR DROPDOWN ── */
              const isChildActive = item.children.some(child => child.id === activeTab);
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative py-2"
                >
                  <button
                    className={`px-3 py-2 rounded-lg transition-all text-[11px] uppercase tracking-wider font-extrabold cursor-pointer flex items-center gap-1 ${
                      isChildActive
                        ? "bg-emerald-50/70 text-[#1A3461] border-b-2 border-emerald-500 rounded-b-none"
                        : "text-slate-600 hover:text-[#1A3461] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-80 max-h-[75vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-1"
                      >
                        {item.children.map(child => {
                          const ChildIcon = child.icon;
                          const isChildActive = activeTab === child.id;
                          return (
                            <button
                              key={child.id}
                              onClick={() => {
                                if ((child as any).query) {
                                  setActiveTab("catalogo");
                                  setCatalogQuery((child as any).query);
                                  setCatalogCat("");
                                  setCatalogPage(1);
                                } else {
                                  setActiveTab(child.id);
                                }
                                setActiveDropdown(null);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                                isChildActive
                                  ? "bg-emerald-50/50 border-l-4 border-emerald-500 rounded-l-none"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <div className={`p-2 rounded-lg shrink-0 ${child.color}`}>
                                <ChildIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                                  {child.label}
                                  {isChildActive && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>}
                                </div>
                                <p className="text-[10px] text-slate-500 mt-0.5 font-normal leading-normal">{child.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
          })}
        </nav>
 
        {/* Right CTA — Standalone Iniciar sesión + Demo CTA + LanguageSelector */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSelector variant="public" />

          {/* Interactive Quote Wizard Trigger */}
          <button
            onClick={() => setIsQuoteWizardOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase px-3.5 py-2 rounded-xl tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-[1.02]"
            title="Generar Presupuesto Interactivo y PDF"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPortuguese ? "Cotar" : "Cotizar"}</span>
          </button>

          {/* Standalone Demo CTA */}
          <button
            onClick={() => {
              setActiveTab("contacto");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase px-3 py-2 rounded-xl tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border border-slate-300/80"
          >
            <span>Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
          </button>

          {/* Gmail Suite Quick Action */}
          <button
            onClick={() => navigate('/gmail')}
            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs uppercase px-3 py-2 rounded-xl tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border border-red-200 shadow-sm"
            title="Abrir Clientum Gmail Suite"
          >
            <Mail className="w-3.5 h-3.5 text-red-600" />
            <span>Gmail</span>
          </button>

          {/* Dedicated Login / Registro Button linking to Twenty CRM */}
          <a
            href="https://crm.clientum.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#1A3461] to-[#0A2558] hover:from-[#234580] hover:to-[#0f3475] text-white font-extrabold text-xs uppercase px-4 py-2 rounded-xl tracking-wider transition-all flex items-center gap-2 shadow-md border border-blue-500/30 hover:scale-[1.02] cursor-pointer group"
            title="Acceder a Twenty CRM (https://crm.clientum.com.ar)"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            <span>Login / Registro</span>
            <ArrowUpRight className="w-3 h-3 text-emerald-400/80" />
          </a>
        </div>
 
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>
 
      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-6 py-4 flex flex-col gap-1.5 z-30 overflow-hidden font-semibold text-slate-700"
          >
            {menuConfig.map(item => {
              if (item.type === "link") {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-lg transition-all text-xs uppercase tracking-wider font-extrabold ${
                      isActive
                        ? "bg-[#1A3461] text-white"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              } else {
                const isSectionOpen = mobileOpenSection === item.id;
                const hasActiveChild = item.children.some(child => child.id === activeTab);
                return (
                  <div key={item.id} className="flex flex-col border-b border-slate-100 pb-1.5 mb-1">
                    <button
                      onClick={() => setMobileOpenSection(isSectionOpen ? null : item.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between text-xs uppercase tracking-wider font-extrabold ${
                        hasActiveChild ? "text-[#1A3461] font-black bg-emerald-50/50" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSectionOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isSectionOpen && (
                      <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1 bg-slate-50 rounded-lg mt-1">
                        {item.children.map(child => {
                          const ChildIcon = child.icon;
                          const isChildActive = activeTab === child.id;
                          return (
                            <button
                              key={child.id}
                              onClick={() => {
                                if ((child as any).query) {
                                  setActiveTab("catalogo");
                                  setCatalogQuery((child as any).query);
                                  setCatalogCat("");
                                  setCatalogPage(1);
                                } else {
                                  setActiveTab(child.id);
                                }
                                setMobileMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-full text-left py-2 px-3 rounded-md transition-all flex items-center gap-3 text-xs font-bold ${
                                isChildActive
                                  ? "text-emerald-600 font-extrabold bg-emerald-100/40"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <div className={`p-1 rounded shrink-0 ${child.color}`}>
                                <ChildIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[11px] uppercase tracking-wider">{child.label}</span>
                                <span className="text-[9px] text-slate-400 font-normal leading-tight lowercase first-letter:uppercase">{child.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
            })}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500">Idioma / Idioma:</span>
              <LanguageSelector variant="pill" />
            </div>

            <button
              onClick={() => {
                navigate('/gmail');
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs uppercase py-3 rounded-xl tracking-wider text-center flex items-center justify-center gap-2 border border-red-200 shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-red-600" />
              <span>Clientum Gmail Suite</span>
            </button>

            <a
              href="https://crm.clientum.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full bg-gradient-to-r from-[#1A3461] to-[#0A2558] text-white font-extrabold text-xs uppercase py-3 rounded-xl tracking-wider text-center flex items-center justify-center gap-2 shadow-md border border-blue-500/30 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Login / Registro CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <button
              onClick={() => {
                setIsQuoteWizardOpen(true);
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase py-3 rounded-xl tracking-wider text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cotizador Interactivo & PDF</span>
            </button>

            <button
              onClick={() => {
                setIsExpressAuditOpen(true);
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase py-2.5 rounded-xl tracking-wider text-center flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Auditoría Express IA (Gratis)</span>
            </button>

            <button
              onClick={() => {
                setIsBrochureModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs uppercase py-2.5 rounded-xl tracking-wider text-center flex items-center justify-center gap-2 border border-emerald-200"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Brochure Corporativo PDF</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("contacto");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-2 w-full bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs uppercase py-2.5 rounded-lg tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm border-0"
            >
              Solicitar Demo Gratuita
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Content with Smooth Anim Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pb-20"
          >
            {/* INICIO TAB */}
            {activeTab === "inicio" && (
              <div className="flex flex-col">
                {/* ═══════════════════════════════════════════════════════
                    HERO
                ═══════════════════════════════════════════════════════ */}
                <section className="relative bg-slate-900 text-white py-24 px-6 md:px-12 flex overflow-hidden min-h-[640px]">
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0d1f3c] via-slate-900 to-[#122442]"></div>
                  {/* Subtle Grid Backdrop Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0"></div>
                  
                  <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 flex flex-col items-start gap-6">
                      <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-widest flex items-center gap-2 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        {isPortuguese ? "Agência de Crescimento & Tecnologia para PMEs" : "Agencia de Crecimiento & Consultoría PyME"}
                      </span>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05]">
                        {brochureData?.cover?.slogan ? (
                          <span>{brochureData.cover.slogan}</span>
                        ) : (
                          <>
                            {isPortuguese ? "Serviços especializados para" : "Servicios estratégicos para"}<br />
                            {isPortuguese ? "escalar sua empresa, " : "escalar tu empresa, "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                              {isPortuguese ? "com tecnologia e IA." : "con tecnología e IA."}
                            </span>
                          </>
                        )}
                      </h1>
                      <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
                        {brochureData?.cover?.sub || (isPortuguese
                          ? "Consultoria comercial, Chatbots WhatsApp com IA, E-Commerce, CRM, Business Intelligence, Marketing Digital e Automações — a equipe da Clientum cuidando do seu crescimento."
                          : "Consultoría comercial, Chatbots WhatsApp con IA, E-Commerce, CRM, Business Intelligence, Marketing Digital y Automatizaciones — el equipo de Clientum impulsando tu negocio."
                        )}
                      </p>
                      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => setIsQuoteWizardOpen(true)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>{isPortuguese ? "Cotador Interativo & PDF" : "Cotizador Interactivo & PDF"}</span>
                        </button>
                        <button
                          onClick={() => setIsExpressAuditOpen(true)}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-2 shadow-md"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>{isPortuguese ? "Auditoria Express IA" : "Auditoría Express IA"}</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("servicios")}
                          className={`bg-gradient-to-r ${theme.btnGradient} text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl cursor-pointer transition-all shadow-md shadow-blue-900/30 flex items-center gap-2`}
                        >
                          {isPortuguese ? "Ver Serviços" : "Ver Servicios"} <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </button>
                        <button
                          onClick={() => setIsBrochureModalOpen(true)}
                          className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-white/15 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Download className="w-4 h-4 text-emerald-400" /> Brochure PDF
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                        {(isPortuguese
                          ? ["Sem contrato de fidelidade", "Implementação em 5 dias", "Suporte em português 24/7"]
                          : ["Sin contrato mínimo", "Implementado en 5 días", "Soporte en español 24/7"]
                        ).map((t) => (
                          <span key={t} className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-8 rounded-2xl shadow-2xl relative">
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-emerald-500 text-slate-950 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-md font-mono">
                        {isPortuguese ? "Ao Vivo" : "En Vivo"}
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-1">
                        {isPortuguese ? "Solicite um Orçamento Gratuito" : "Solicitá un Presupuesto Gratuito"}
                      </h3>
                      <p className="text-slate-400 text-[11px] mb-6">
                        {isPortuguese
                          ? "Preencha seus dados e a equipe da Clientum enviará uma demo personalizada para o seu negócio."
                          : "Cargá tus datos y el equipo de Clientum te enviará una demo adaptada a tu escala."}
                      </p>
                      <form onSubmit={handleDemoSubmit} className="flex flex-col gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{isPortuguese ? "Seu Nome" : "Tu Nombre"}</label>
                          <input
                            type="text"
                            required
                            placeholder={isPortuguese ? "Ex: Lucas Silva" : "Ej. Martín Rodríguez"}
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:border-emerald-500 focus:outline-none"
                            value={demoForm.nombre}
                            onChange={(e) => setDemoForm({ ...demoForm, nombre: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{isPortuguese ? "E-mail Corporativo" : "Correo Electrónico"}</label>
                          <input
                            type="email"
                            required
                            placeholder="exemplo@empresa.com"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                            value={demoForm.email}
                            onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{isPortuguese ? "Empresa" : "Empresa"}</label>
                            <input
                              type="text"
                              placeholder={isPortuguese ? "Ex: Comercial Silva" : "Ej. Distribuidora Sur"}
                              className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                              value={demoForm.empresa}
                              onChange={(e) => setDemoForm({ ...demoForm, empresa: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{isPortuguese ? "Solução de Interesse" : "Servicio de Interés"}</label>
                            <select
                              className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                              value={demoForm.rubro}
                              onChange={(e) => setDemoForm({ ...demoForm, rubro: e.target.value })}
                            >
                              <option value="E-Commerce">{isPortuguese ? "E-Commerce Web" : "E-Commerce Web"}</option>
                              <option value="ERP-CRM">{isPortuguese ? "ERP & CRM Integrado" : "ERP & CRM Integrado"}</option>
                              <option value="Consultoria">{isPortuguese ? "Consultoria Estratégica" : "Consultoría General"}</option>
                              <option value="Ciberseguridad">{isPortuguese ? "Cibersegurança & Nuvem" : "Ciberseguridad"}</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                        >
                          {isPortuguese ? "Enviar Solicitação" : "Enviar Solicitud"}
                        </button>
                      </form>
                    </div>
                  </div>
                </section>

                {/* ═══ LIVE SOCIAL PROOF & KEY PERFORMANCE METRICS ═══ */}
                <SocialProofBar />

                {/* ═══ PANELES DESTACADOS (legado Viaweb) ═══ */}
                <section className="bg-slate-50 border-b border-slate-200 py-16 px-6">
                  <div className="max-w-6xl mx-auto flex flex-col gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { icon: Briefcase, eyebrow: "Software de Gestión", desc: "Un software completo para gestionar todos sus negocios. Sistemas integrados de gestión necesarios para las distintas áreas de su empresa en una única plataforma.", tab: "crm_inteligente" },
                        { icon: Code2, eyebrow: "E-Commerce", desc: "Desarrollo de sitios web con tecnología omnicanal. Digitalización de su negocio con herramientas analíticas, marketing y diseño.", tab: "desarrollo_web" },
                        { icon: BarChart2, eyebrow: "Business Intelligence", desc: "Seguimiento de las principales métricas de negocio y gestión. Puesta en marcha de campañas efectivas orientadas a objetivos planteados.", tab: "reportes" },
                      ].map(({ icon: Icon, eyebrow, desc, tab }) => (
                        <div key={eyebrow} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-3 shadow-xs hover:shadow-md transition-all">
                          <div className="w-9 h-9 rounded-xl bg-[#1A3461]/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-[#1A3461]" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A3461]">{eyebrow}</span>
                          <p className="text-[11px] text-slate-500 leading-relaxed flex-1">{desc}</p>
                          <button
                            onClick={() => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="text-xs font-bold text-[#1A3461] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer mt-1"
                          >
                            Ver más <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#1A3461] text-white rounded-2xl p-8 flex flex-col gap-3">
                        <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">Nube Viaweb</span>
                        <h3 className="text-lg font-display font-black tracking-tight">¿Está preparada tu empresa para migrar a la nube?</h3>
                        <p className="text-slate-300 text-xs leading-relaxed">Hacé tu Autodiagnóstico Cloud sin costo.</p>
                        <button
                          onClick={() => {
                            setDemoForm({ ...demoForm, mensaje: "Hola, quiero hacer el Autodiagnóstico Cloud sin costo para evaluar la migración de mi empresa a la nube." });
                            setActiveTab("contacto");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="mt-2 self-start bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-2"
                        >
                          Hacelo ahora <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col gap-3 relative overflow-hidden">
                        <span className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Próximamente</span>
                        <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">Ciclo de charlas</span>
                        <h3 className="text-lg font-display font-black tracking-tight">La transformación digital en tiempos de incertidumbre</h3>
                        <p className="text-slate-300 text-xs leading-relaxed">Ciclo de charlas sobre transformación digital para empresas.</p>
                        <button
                          onClick={() => { setActiveTab("academia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="mt-2 self-start bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-2"
                        >
                          Ingresá ahora <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ═══ POR QUÉ CLIENTUM ═══ */}
                <section className="bg-white border-b border-slate-200 py-20 px-6">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="text-rose-600 font-mono text-[10px] uppercase font-bold tracking-widest">Por qué Clientum</span>
                      <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mt-2">Tu negocio pierde ventas mientras alguien no contesta el WhatsApp</h2>
                      <p className="text-slate-500 text-xs mt-3 max-w-2xl mx-auto leading-relaxed">
                        Clientum automatiza la atención, el seguimiento de leads y la gestión de tu PyME con inteligencia artificial: sin perfil técnico, sin vueltas, funcionando en días.
                      </p>
                    </div>

                    {/* Problems */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                      {[
                        { emoji: "⏱", title: "Respuestas lentas = ventas perdidas", desc: "Los leads que entran por WhatsApp e Globe se enfrían si no reciben respuesta al toque. La velocidad define quién cierra la venta." },
                        { emoji: "📋", title: "Presupuestos y stock a mano", desc: "Horas armando presupuestos uno por uno y controlando stock con papeles. Errores costosos que se repiten cada semana." },
                        { emoji: "📉", title: "Cero seguimiento", desc: "Sin un sistema de follow-up automático, la mayoría de los contactos simplemente se pierden en el camino." },
                      ].map(({ emoji, title, desc }) => (
                        <div key={title} className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3">
                          <span className="text-3xl">{emoji}</span>
                          <h3 className="font-bold text-sm text-slate-950">{title}</h3>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Solutions */}
                    <div className="text-center mb-8">
                      <span className="text-emerald-600 font-mono text-[10px] uppercase font-bold tracking-widest">Qué resuelve Clientum</span>
                      <h3 className="text-xl font-display font-black text-slate-950 tracking-tight mt-2">La solución para cada problema</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
                      {[
                        { icon: Bot, color: "bg-green-50 text-green-600 border-green-100", title: "Chatbot con IA 24/7", desc: "Atiende WhatsApp Business API las 24 horas y responde las consultas más frecuentes al instante." },
                        { icon: BarChart2, color: "bg-blue-50 text-blue-600 border-blue-100", title: "CRM + reportes en vivo", desc: "Seguimiento automático de cada lead y reportes con datos reales de tu operación, sin planillas sueltas." },
                        { icon: FileText, color: "bg-violet-50 text-violet-600 border-violet-100", title: "Presupuestos automáticos", desc: "Se generan solos y el follow-up lo maneja la IA, liberando horas de trabajo manual por semana." },
                        { icon: Zap, color: "bg-amber-50 text-amber-600 border-amber-100", title: "Integraciones que ya usás", desc: "Se conecta con WooCommerce, Shopify, PrestaShop y ERPs como Dolibarr sin instalar nada extra." },
                      ].map(({ icon: Icon, color, title, desc }) => (
                        <div key={title} className={`border rounded-2xl p-5 flex flex-col gap-3 ${color}`}>
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-sm text-slate-950">{title}</h3>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start">
                      <Quote className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-slate-200 text-sm leading-relaxed italic">
                          "Ahora sabemos exactamente qué repuestos tenemos sin revisar papeles. Las facturas salen solas y evitamos errores que antes nos costaban tiempo y plata."
                        </p>
                        <span className="block text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold mt-3">— Estudio Méndez &amp; Asoc., General Roca</span>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {[
                        { value: "24/7", label: "Atención automática por IA" },
                        { value: "5-7", label: "Días hábiles para arrancar (Plan Starter)" },
                        { value: "30", label: "Días de soporte incluido, ajustes sin costo" },
                        { value: "0", label: "Conocimiento técnico requerido" },
                      ].map(({ value, label }) => (
                        <div key={label} className="bg-[#1A3461] text-white rounded-2xl p-5 text-center">
                          <div className="text-2xl font-black font-mono text-emerald-400">{value}</div>
                          <div className="text-[10px] text-slate-300 mt-1 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Diagnóstico CTA */}
                    <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
                      <h3 className="text-lg font-display font-black text-slate-950">Pedí tu diagnóstico gratuito</h3>
                      <p className="text-slate-500 text-xs max-w-md leading-relaxed">
                        60 minutos para mostrarte cuánto tiempo y dinero podés ahorrar con IA en tu PyME.<br />
                        <span className="text-emerald-700 font-bold">Sin costo · Sin compromiso</span>
                      </p>
                      <button
                        onClick={() => openLeadForm('diagnostico_pyme', { source: 'inicio_cta_diagnostico' })}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider px-7 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-200"
                      >
                        Solicitar Diagnóstico Gratuito <ArrowRight className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] text-slate-400">Neuquén · General Roca · Buenos Aires · Todo el país</span>
                    </div>
                  </div>
                </section>

                {/* ═══ SOCIAL PROOF STRIP ═══ */}
                <section className="bg-slate-950 border-b border-slate-800/60 py-5 px-6">
                  <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-y-3 gap-x-0 md:divide-x md:divide-slate-800/60">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold font-mono pr-0 md:pr-8 w-full md:w-auto text-center">
                      Confían en Clientum
                    </span>
                    {([
                      { icon: Truck, label: "Distribuidoras" },
                      { icon: ShoppingCart, label: "Retail & E-Commerce" },
                      { icon: Building, label: "Estudios Contables" },
                      { icon: Stethoscope, label: "Salud & Bienestar" },
                      { icon: Coffee, label: "Gastronomía" },
                      { icon: Home, label: "Inmobiliarias" },
                    ] as const).map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 px-5 py-1 text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                        <Icon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <span className="text-[11px] font-medium whitespace-nowrap">{label}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ═══ INTERACTIVE MULTI-INDUSTRY WHATSAPP AI BOT & ROI SIMULATOR ═══ */}
                <IndustryWhatsAppSimulator
                  onOpenWizard={() => setIsQuoteWizardOpen(true)}
                  onOpenAudit={() => setIsExpressAuditOpen(true)}
                />

                {/* ═══ TRUST, SECURITY, INFRASTRUCTURE & SLA GUARANTEES ═══ */}
                <TrustAndSlaSection />

                {/* ═══ PRIMARY PILLARS ═══ */}
                <section className="bg-slate-50 border-b border-slate-200 py-20 px-6">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="text-emerald-600 font-mono text-[10px] uppercase font-bold tracking-widest">{isPortuguese ? "Serviços Principais" : "Servicios Principales"}</span>
                      <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mt-2">Nuestros Servicios Más Contratados</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(brochureData?.services?.slice(0, 3) || []).map((service, idx) => {
                      const accents = [
                        { num: "bg-emerald-50 text-emerald-700 border border-emerald-200", hover: "hover:border-emerald-200" },
                        { num: "bg-blue-50 text-blue-700 border border-blue-200",     hover: "hover:border-blue-200" },
                        { num: "bg-violet-50 text-violet-700 border border-violet-200", hover: "hover:border-violet-200" },
                      ];
                      const a = accents[idx % accents.length];
                      return (
                        <div key={idx} className={`bg-white rounded-2xl border border-slate-200 ${a.hover} p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group`}>
                          <div>
                            <div className={`w-12 h-12 ${a.num} rounded-2xl flex items-center justify-center font-black text-lg mb-5`}>
                              0{idx + 1}
                            </div>
                            <h3 className="font-bold text-base text-slate-900 tracking-tight mb-3 leading-snug">{service.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                          </div>
                          <button
                            onClick={() => { setActiveTab("servicios"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="text-[#1A3461] hover:text-emerald-600 text-xs font-bold flex items-center gap-1.5 mt-5 self-start cursor-pointer transition-all group-hover:gap-2.5"
                          >
                            Ver más <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                </section>

                {/* ═══ PYMES ARGENTINAS EN ACCIÓN (FOTOS REALES DE EQUIPOS) ═══ */}
                <section className="bg-white border-b border-slate-200 py-20 px-6">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full tracking-widest inline-flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-600" /> PyMEs Argentinas en Acción
                      </span>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-slate-950 tracking-tight mt-3">
                        Personas y Equipos Trabajando con Nuestros Servicios
                      </h2>
                      <p className="text-slate-500 text-xs md:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                        Desde el mostrador comercial hasta la gerencia operativa: acompañamos a PyMEs de todo el país con soluciones a medida que ahorran horas de trabajo y potencian sus ventas.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          img: pymeCommercialSalesImg,
                          tag: "Comercio & Retail",
                          city: "General Roca · Río Negro",
                          flag: "🇦🇷",
                          team: "Equipo de Mostrador & Ventas",
                          service: "Chatbot WhatsApp + CRM Comercial",
                          desc: "Atención inmediata por WhatsApp con derivación a vendedores en el local y catálogo digital sincronizado.",
                          stat: "+45% consultas respondidas en <2 min",
                        },
                        {
                          img: pymeAgroLogisticsImg,
                          tag: "Distribución Mayorista",
                          city: "Neuquén Capital · Neuquén",
                          flag: "🇦🇷",
                          team: "Operaciones de Depósito y Logística",
                          service: "Sincronización de Stock & E-Commerce",
                          desc: "Control de stock multicanal en tiempo real entre el depósito central, sucursales y la tienda mayorista online.",
                          stat: "Cero quiebres de stock no declarados",
                        },
                        {
                          img: pymeCommercialSalesImg,
                          tag: "Administración & Finanzas",
                          city: "Buenos Aires · Microcentro",
                          flag: "🇦🇷",
                          team: "Estudio Contable & Administrativo",
                          service: "Facturación AFIP + MercadoPago",
                          desc: "Emisión electrónica automática de comprobantes con CAE y conciliación diaria de cobros con pasarelas de pago.",
                          stat: "35 horas mensuales de Excel ahorradas",
                        },
                        {
                          img: pymeCustomerSuccessImg,
                          tag: "Atención al Cliente",
                          city: "Córdoba Capital · Córdoba",
                          flag: "🇦🇷",
                          team: "Asesores de Ventas & Post-Venta",
                          service: "Consultoría en IA Conversacional",
                          desc: "Respuestas sugeridas por IA y seguimiento programado de presupuestos enviados sin intervención manual.",
                          stat: "+28% en tasa de cierre de presupuestos",
                        },
                        {
                          img: pymeAgroLogisticsImg,
                          tag: "Agroindustria & Empaque",
                          city: "Alto Valle · Río Negro",
                          flag: "🇦🇷",
                          team: "Supervisores de Campo y Acopio",
                          service: "Portal B2B & Reportes BI",
                          desc: "Trazabilidad de lotes de fruta, liquidación a productores y reportes de rendimiento por hectárea en tiempo real.",
                          stat: "100% de liquidaciones al día",
                        },
                        {
                          img: pymeTeamMeetingImg,
                          tag: "Dirección y Estrategia",
                          city: "Sede Regional Patagonia",
                          flag: "🇦🇷",
                          team: "Consultoría Directiva & Capacitación",
                          service: "Plan de Transformación Digital 90 Días",
                          desc: "Acompañamiento presencial y virtual con auditoría de procesos, hoja de ruta técnica y capacitación de equipos.",
                          stat: "Acompañamiento continuo y cercano",
                        },
                      ].map((card, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                          <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                            <img
                              src={card.img}
                              alt={`${card.team} - ${card.city}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10">
                              <span>{card.flag}</span>
                              <span>{card.city}</span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                                {card.tag}
                              </span>
                              <h4 className="text-white font-bold text-sm mt-1 leading-snug drop-shadow-xs">{card.team}</h4>
                            </div>
                          </div>

                          <div className="p-5 flex flex-col flex-1 gap-3">
                            <div className="text-[11px] font-bold text-[#1A3461] bg-blue-50/70 border border-blue-200/60 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="truncate">{card.service}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed flex-1">
                              {card.desc}
                            </p>
                            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                {card.stat}
                              </span>
                              <button
                                onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                className="text-[11px] font-bold text-[#1A3461] hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                Consultar servicio →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 bg-gradient-to-r from-[#0A2558] to-[#1A3461] text-white rounded-2xl p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                      <div className="text-left">
                        <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">Atención en todo el país</span>
                        <h3 className="text-lg md:text-xl font-bold mt-1">¿Querés que tu equipo trabaje más organizado y con menos esfuerzo?</h3>
                        <p className="text-slate-300 text-xs mt-1 max-w-xl">Hacemos un relevamiento sin costo de tu operación y te presentamos una propuesta de servicios a medida en 48hs.</p>
                      </div>
                      <button
                        onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg border-0"
                      >
                        Solicitar Asesoría Gratuita
                      </button>
                    </div>
                  </div>
                </section>

                {/* Métricas de impacto */}
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
                      Nuestras Métricas Hablan por Nosotros
                    </h2>
                    <p className="text-slate-500 text-xs max-w-xl mx-auto mt-2">
                      Confiamos en la excelencia técnica para generar un impacto directo y cuantificable en tu organización.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-[#1A3461] font-mono tracking-tight">+30%</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-3 uppercase tracking-wider">Eficiencia Operativa</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Aumento en velocidad de despacho e inventariado continuo.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-emerald-600 font-mono tracking-tight">+40%</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-3 uppercase tracking-wider">Satisfacción Cliente</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Mejora en tiempos de respuesta de consultas comerciales.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-indigo-600 font-mono tracking-tight">-25%</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-3 uppercase tracking-wider">Costos Administrativos</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Reducción de horas de carga manual de Excel gracias a automatizaciones.</p>
                      </div>
                    </div>
                </div>

                {/* Info blocks Section */}
                <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <span className="text-emerald-600 font-mono text-[10px] uppercase font-bold tracking-widest">Enfoque de Negocios</span>
                      <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mt-2 leading-snug">
                        Enfócate en lo estratégico, nosotros automatizamos el resto
                      </h2>
                      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        Olvídate de perseguir cobros, actualizar stocks en tres planillas distintas y procesar pedidos manuales. Conectamos tus bases con sistemas automáticos para que tu equipo rinda al máximo.
                      </p>
                      <button onClick={() => setActiveTab("servicios")} className="mt-6 bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer">
                        Ver Herramientas E-commerce
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                    </div>
                    <div className="bg-slate-200 rounded-2xl h-64 overflow-hidden relative border border-slate-300 shadow-md">
                      <img
                        src={pymeTeamMeetingImg}
                        alt="Clientum team workflow"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="md:order-2">
                      <span className="text-emerald-600 font-mono text-[10px] uppercase font-bold tracking-widest">Medición &amp; BI</span>
                      <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mt-2 leading-snug">
                        Medir es conocer: Inteligencia de Negocios accionable
                      </h2>
                      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        Nuestras implementaciones ERP te brindan dashboards limpios en tiempo real. Visualizá qué productos te generan mejor margen de ganancia, cuál es el costo real de tus adquisiciones y dónde hay cuellos de botella.
                      </p>
                      <button onClick={() => setActiveTab("planes")} className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">
                        Ver Planes de Implementación
                      </button>
                    </div>
                    <div className="md:order-1 bg-slate-200 rounded-2xl h-64 overflow-hidden relative border border-slate-300 shadow-md">
                      <img
                        src={pymeCommercialSalesImg}
                        alt="BI dashboards y ventas comerciales"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </section>

                {/* ═══ GALERÍA INTERACTIVA DE EQUIPOS PYME EN ACCIÓN ═══ */}
                <PymeTeamsGallery onContactClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

                {/* Big List section: Lealtad, Versatilidad, Personalidad */}
                <section className="bg-slate-900 text-white py-16 px-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-2xl font-display font-black tracking-tight">Nuestra Cultura Corporativa</h2>
                      <p className="text-slate-400 text-xs mt-2">Los tres pilares esenciales bajo los cuales construimos código y forjamos relaciones duraderas.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                        <div className="w-10 h-10 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm tracking-tight text-white mb-2">Lealtad</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Comprometidos a largo plazo con el éxito de nuestros clientes. Tu infraestructura tecnológica y tus secretos comerciales están seguros con nosotros.
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                        <div className="w-10 h-10 bg-indigo-900/40 text-indigo-400 rounded-full flex items-center justify-center mb-4">
                          <Compass className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm tracking-tight text-white mb-2">Versatilidad</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Ofrecemos servicios sumamente personalizables. Nos adaptamos a diferentes industrias, escalas de facturación y requerimientos reglamentarios AFIP.
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                        <div className="w-10 h-10 bg-emerald-900/40 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                          <Users className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm tracking-tight text-white mb-2">Personalidad</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          No somos un robot empaquetador. Nos encanta sentarnos a tomar mate o coordinar videollamadas, prestando atención humana y detallista a cada lead.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ───────── SERVICIOS HUB ───────── */}
                <section className="bg-white border-t border-slate-200 py-20 px-6">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 flex flex-col items-center gap-4">
                      <span className="text-[#1A3461] font-mono text-[10px] uppercase font-bold tracking-widest">
                        {isPortuguese ? "Portfólio de Serviços" : "Servicios de Agencia"}
                      </span>
                      <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mt-2">
                        {isPortuguese ? "Todos os Nossos Serviços" : "Todos los Servicios de la Agencia"}
                      </h2>
                      <p className="text-slate-500 text-xs mt-2 max-w-xl mx-auto">
                        {isPortuguese
                          ? "Serviços estratégicos de consultoria, IA, CRM e marketing digital para acelerar seus resultados comerciais."
                          : "Servicios estratégicos de consultoría, IA, CRM y marketing digital para acelerar tus resultados comerciales."}
                      </p>
                      <button
                        onClick={handleExportWooCommerceCSV}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-black transition-all cursor-pointer"
                        title="Exportar catálogo completo de servicios listo para importar en WooCommerce"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Exportar catálogo de servicios · CSV
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[
                        { id: "chatbot",        icon: Bot,          color: "bg-green-50 text-green-600 border-green-100",   accent: "group-hover:text-green-600",  label: "Agentes & Chatbot WhatsApp", desc: "Atención comercial automatizada con IA 24/7." },
                        { id: "crm_inteligente",icon: Briefcase,    color: "bg-blue-50 text-blue-600 border-blue-100",     accent: "group-hover:text-blue-600",   label: "Consultoría & CRM",          desc: "Implementación y optimización de tu embudo." },
                        { id: "asistente_ia",   icon: Sparkles,     color: "bg-violet-50 text-violet-600 border-violet-100",accent: "group-hover:text-violet-600", label: "Consultoría en IA",        desc: "Estrategia e implementación de modelos de IA." },
                        { id: "reportes",       icon: BarChart2,    color: "bg-orange-50 text-orange-600 border-orange-100",accent: "group-hover:text-orange-600", label: "Business Intelligence",    desc: "Dashboards en tiempo real y métricas comerciales." },
                        { id: "automatizacion", icon: Zap,          color: "bg-amber-50 text-amber-600 border-amber-100",  accent: "group-hover:text-amber-600",  label: "Automatización & Outreach",  desc: "Campañas masivas de WhatsApp y secuencias." },
                        { id: "portal_cliente", icon: LayoutGrid,   color: "bg-teal-50 text-teal-600 border-teal-100",     accent: "group-hover:text-teal-600",   label: "Portales de Clientes",       desc: "Portales a medida para autogestión B2B." },
                        { id: "desarrollo_web", icon: Code2,        color: "bg-slate-100 text-slate-700 border-slate-200", accent: "group-hover:text-slate-900",  label: "Desarrollo Web & Landings",  desc: "Sitios institucionales y páginas de conversión." },
                        { id: "integraciones",  icon: ArrowLeftRight,color:"bg-amber-50 text-amber-600 border-amber-100",  accent: "group-hover:text-amber-600",  label: "Integraciones de Sistemas",  desc: "WhatsApp, AFIP, MercadoPago, ERPs y más de 60 APIs." },
                        { id: "catalogo",       icon: LayoutGrid,   color: "bg-indigo-50 text-indigo-600 border-indigo-100",accent:"group-hover:text-indigo-600", label: "Catálogo de Servicios",    desc: "Explorá nuestro catálogo completo con alcances y entregables." },
                        { id: "servicios",      icon: Briefcase,    color: "bg-blue-50 text-blue-700 border-blue-100",     accent: "group-hover:text-blue-700",   label: "Consultoría Estratégica",    desc: "Auditoría de procesos, hoja de ruta y gestión integral." },
                        { id: "planes",         icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100",accent:"group-hover:text-emerald-600",label: "Planes de Servicio",      desc: "Planes mensuales de acompañamiento e implementación." },
                        { id: "casos",          icon: Star,         color: "bg-rose-50 text-rose-600 border-rose-100",     accent: "group-hover:text-rose-600",   label: "Casos de Éxito",        desc: "Historias reales de PyMEs que escalaron sus ventas." },
                        { id: "clientes",       icon: Users,        color: "bg-cyan-50 text-cyan-600 border-cyan-100",     accent: "group-hover:text-cyan-600",   label: "Nuestros Clientes",     desc: "+35 empresas e instituciones que ya confían en la agencia." },
                      ].map(({ id, icon: Icon, color, accent, label, desc }) => (
                        <button
                          key={id}
                          onClick={() => { setActiveTab(id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="group text-left bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-3"
                        >
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-sm text-slate-900 tracking-tight transition-colors ${accent}`}>{label}</h3>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{desc}</p>
                          </div>
                          <span className={`text-[11px] font-bold flex items-center gap-1 text-slate-400 transition-colors ${accent}`}>
                            Ver más <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ───────── ECOSISTEMA HUB ───────── */}
                <section className="bg-slate-900 text-white py-20 px-6">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">Comunidad & Recursos</span>
                      <h2 className="text-2xl font-display font-black tracking-tight mt-2">El Ecosistema Clientum</h2>
                      <p className="text-slate-400 text-xs mt-2 max-w-xl mx-auto">Capacitación, red de partners, contenidos y soporte: todo lo que necesitás para crecer.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          id: "academia", icon: GraduationCap, accent: "from-indigo-600 to-violet-600",
                          label: "Academia Clientum",
                          desc: "Cursos gratuitos de CRM, automatización y ventas para tu equipo.",
                          cta: "Ir a la Academia"
                        },
                        {
                          id: "asociacion", icon: Users, accent: "from-violet-600 to-pink-600",
                          label: "Programa de Partners",
                          desc: "Sumate a la red de revendedores y afiliados. Comisiones del 30% recurrente.",
                          cta: "Ver Programa"
                        },
                        {
                          id: "blog", icon: BookOpen, accent: "from-rose-600 to-orange-500",
                          label: "Recursos & Blog",
                          desc: "Tácticas de ventas, marketing digital y automatizaciones para PyMEs.",
                          cta: "Leer Artículos"
                        },
                        {
                          id: "casos", icon: Building, accent: "from-emerald-600 to-teal-500",
                          label: "Casos de Éxito",
                          desc: "Cómo distribuidoras, estudios y comercios escalaron con Clientum.",
                          cta: "Ver Historias"
                        },
                        {
                          id: "clientes", icon: Users, accent: "from-cyan-600 to-blue-500",
                          label: "Nuestros Clientes",
                          desc: "Las empresas de la Patagonia y Argentina que ya trabajan con Clientum.",
                          cta: "Ver Clientes"
                        },
                        {
                          id: "nosotros", icon: Compass, accent: "from-blue-600 to-cyan-500",
                          label: "Sobre Clientum",
                          desc: "Nuestro equipo, cultura y por qué más de 35 empresas e instituciones del Alto Valle nos eligieron.",
                          cta: "Conocernos"
                        },
                        {
                          id: "ayuda", icon: HelpCircle, accent: "from-slate-600 to-slate-500",
                          label: "Centro de Ayuda",
                          desc: "FAQs, tutoriales y soporte técnico especializado en español.",
                          cta: "Obtener Soporte"
                        },
                      ].map(({ id, icon: Icon, accent, label, desc, cta }) => (
                        <button
                          key={id}
                          onClick={() => { setActiveTab(id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="group text-left bg-slate-950/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all cursor-pointer flex flex-col gap-4 hover:bg-slate-800/60"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm text-white tracking-tight">{label}</h3>
                            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{desc}</p>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                            {cta} <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ───────── CTA FINAL ───────── */}
                <section className="bg-gradient-to-br from-[#0d1f3c] to-[#1A3461] text-white py-20 px-6">
                  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                      <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">Próximos pasos</span>
                      <h2 className="text-2xl font-display font-black tracking-tight mt-2 leading-snug">
                        Elegí tu plan e implementá en 5 días hábiles
                      </h2>
                      <p className="text-slate-300 text-xs mt-3 leading-relaxed max-w-md">
                        Sin costos de setup ocultos. Sin contratos largos. Cancelás cuando querés. El equipo de Clientum te acompaña desde el primer día.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-6">
                        <button
                          onClick={() => { setActiveTab("planes"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
                        >
                          Ver Planes y Precios <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg border border-white/20 transition-all cursor-pointer"
                        >
                          Contactar un Asesor
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "+35",  label: "Clientes activos" },
                        { value: "5 días", label: "Tiempo de implementación" },
                        { value: "24/7", label: "Soporte técnico" },
                        { value: "495", label: "Servicios en catálogo" },
                      ].map(({ value, label }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                          <div className="text-2xl font-extrabold font-mono text-emerald-400 tracking-tight">{value}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* SERVICIOS Y CONSULTORIA TAB */}
            {activeTab === "servicios" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">
                    {isPortuguese ? "Nossos Serviços de Agência" : "Servicios de la Agencia"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-2">
                    {isPortuguese ? "Soluções Estratégicas e Tecnologia para PMEs" : "Consultoría, Tecnología y Crecimiento Comercial"}
                  </h1>
                  <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
                    {isPortuguese
                      ? "Aceleramos o crescimento da sua empresa com serviços de ponta a ponta: implementação de CRM, automações com IA, desenvolvimento web e marketing de alta conversão."
                      : "Aceleramos el crecimiento de tu empresa con servicios integrales: implementación de CRM, automatizaciones con IA, desarrollo web y marketing de alta conversión."}
                  </p>
                </div>

                {/* Banner Callout for Brochure PDF */}
                <div className="bg-gradient-to-r from-[#0A2558] to-[#1A3461] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Documentación Corporativa
                    </span>
                    <h4 className="text-lg font-bold">Brochure Oficial de Servicios Clientum (PDF 8 Páginas)</h4>
                    <p className="text-slate-300 text-xs">Descargá la presentación institucional completa con especificaciones de cada módulo, WhatsApp IA, AFIP y cuadro de ROI.</p>
                  </div>
                  <button
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg border-0"
                  >
                    <Download className="w-4 h-4" />
                    Ver & Descargar PDF
                  </button>
                </div>

                {/* Sub-Tabs: Web Development, ERP implementation, Ciberseguridad, AI & BI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(brochureData?.services || []).map((service, idx) => {
                    const Icons = [Globe, Briefcase, Shield, Sparkles, Zap, Award];
                    const IconComp = Icons[idx % Icons.length];
                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-950">{service.title}</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {service.desc}
                        </p>
                        <ul className="text-[11px] text-slate-600 font-medium flex flex-col gap-2 mt-auto">
                          {(service.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Our Method (Method Section from shortcodes: Diagnostico, Estrategia, Implementación) */}
                <section className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
                  <h2 className="text-xl font-display font-black text-slate-900 text-center mb-1">Nuestro Método de Trabajo</h2>
                  <p className="text-slate-500 text-xs text-center mb-8">Cómo garantizamos resultados predecibles y de alta calidad técnica paso a paso.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full border-2 border-[#1A3461] flex items-center justify-center font-bold text-[#1A3461] shadow-sm relative z-10">
                        1
                      </div>
                      <h4 className="font-bold text-sm text-slate-950">01. Diagnóstico Inicial</h4>
                      <p className="text-[11px] text-slate-500">
                        Evaluamos en profundidad tus procesos actuales, sistemas heredados, planillas de Excel y flujos de trabajo repetitivos para hallar ineficiencias operativas.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full border-2 border-indigo-600 flex items-center justify-center font-bold text-indigo-600 shadow-sm relative z-10">
                        2
                      </div>
                      <h4 className="font-bold text-sm text-slate-950">02. Estrategia &amp; Arquitectura</h4>
                      <p className="text-[11px] text-slate-500">
                        Diseñamos un plan de transformación digital y especificaciones técnicas a medida de tu industria, definiendo integraciones óptimas de ERP y CRM.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-emerald-600 shadow-sm relative z-10">
                        3
                      </div>
                      <h4 className="font-bold text-sm text-slate-950">03. Implementación &amp; Soporte</h4>
                      <p className="text-[11px] text-slate-500">
                        Ejecutamos el desarrollo ágil en la nube, formamos y capacitamos a tu personal con talleres presenciales y proveemos soporte técnico constante 24/7.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Clientum en números */}
                <div className="bg-slate-900 text-white rounded-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-slate-800">
                  <div>
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-emerald-400">4</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Partners de comercialización</p>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-indigo-400">+10</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Colaboradores</p>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-amber-400">+35</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Clientes activos</p>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-rose-400">10+</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Años de trayectoria</p>
                  </div>
                </div>

                {/* Video Mockup section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 border border-slate-200 rounded-2xl p-8">
                  <div>
                    <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-widest font-bold">Material Audiovisual</span>
                    <h3 className="text-xl font-display font-black text-slate-950 mt-1">Descubrí la experiencia Clientum</h3>
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                      Mira un breve recorrido por nuestra consultoría y conoce cómo implementamos bots de WhatsApp automatizados integrados con CRM de ventas reales que facilitan la administración de turnos y cobros sin comisiones abusivas.
                    </p>
                    <button onClick={() => setActiveTab("contacto")} className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">
                      Agendar Videollamada Demo
                    </button>
                  </div>
                  <div className="bg-slate-800 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-700 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                      alt="Video preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="relative z-10 w-16 h-12 bg-rose-600 hover:bg-rose-700 transition-colors rounded-lg flex items-center justify-center shadow-lg cursor-pointer">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* ── SERVICIOS ADICIONALES ── */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Acompañamiento integral para tu PyME</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Servicios a medida</h2>
                    <p className="text-slate-500 text-xs mt-2 max-w-xl mx-auto">Consultoría, implementación, IA, BI y desarrollo web — todo integrado con Clientum CRM.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        emoji: "🔌",
                        title: "Integración API Gateway",
                        desc: "Conectá sistemas, apps y plataformas externas sin código. Automatizá el flujo de datos entre tus herramientas: API REST, webhooks, mapeo de datos y monitoreo en tiempo real.",
                        price: "Desde $400.000",
                        priceSub: "integración básica entre 2 sistemas",
                        bullets: ["Integración entre múltiples sistemas", "API REST y webhooks", "Mapeo y transformación de datos", "Monitoreo en tiempo real"],
                        color: "bg-violet-50 border-violet-100",
                        badge: "text-violet-700 bg-violet-100",
                        priceColor: "text-violet-700 bg-violet-100 border-violet-200",
                      },
                      {
                        emoji: "🤖",
                        title: "Clientum AI Copilot",
                        desc: "IA y automatización aplicada a tu negocio: automatización de procesos repetitivos, predicciones, IA conversacional a medida e integración directa con el CRM.",
                        price: "Desde $600.000",
                        priceSub: "IA básica y automatización",
                        bullets: ["Automatización de procesos repetitivos", "Predicciones y recomendaciones", "IA conversacional a medida", "Integración con el CRM"],
                        color: "bg-indigo-50 border-indigo-100",
                        badge: "text-indigo-700 bg-indigo-100",
                        priceColor: "text-indigo-700 bg-indigo-100 border-indigo-200",
                      },
                      {
                        emoji: "💻",
                        title: "Desarrollo web a medida",
                        desc: "Sitios, landing pages y apps que capturan leads y los envían directo al CRM. Incluye e-commerce con sincronización de stock, PWA, diseño y UX.",
                        price: "Desde $800.000",
                        priceSub: "desarrollo web básico",
                        bullets: ["Landing pages con integración CRM", "E-commerce con sincronización de stock", "Apps web progresivas (PWA)", "Diseño y UX incluidos"],
                        color: "bg-blue-50 border-blue-100",
                        badge: "text-blue-700 bg-blue-100",
                        priceColor: "text-blue-700 bg-blue-100 border-blue-200",
                      },
                      {
                        emoji: "📦",
                        title: "Pack integrado",
                        desc: "CRM + API + IA + Web en una sola propuesta: implementación coordinada, un solo punto de contacto y soporte unificado para empresas que quieren escalar.",
                        price: "Desde $960.000",
                        priceSub: "pack básico integrado",
                        bullets: ["Todo incluido en un precio", "Implementación coordinada", "Un solo punto de contacto", "Soporte unificado"],
                        color: "bg-emerald-50 border-emerald-100",
                        badge: "text-emerald-700 bg-emerald-100",
                        priceColor: "text-emerald-700 bg-emerald-100 border-emerald-200",
                      },
                      {
                        emoji: "📊",
                        title: "Business Intelligence",
                        desc: "Dashboards y analytics para tomar decisiones con datos reales: KPIs de negocio, predicciones y tendencias, reportes automáticos.",
                        price: "Desde $800.000",
                        priceSub: "análisis de datos básico",
                        bullets: ["Dashboards en tiempo real", "KPIs y métricas de negocio", "Predicciones y tendencias", "Reportes automáticos"],
                        color: "bg-orange-50 border-orange-100",
                        badge: "text-orange-700 bg-orange-100",
                        priceColor: "text-orange-700 bg-orange-100 border-orange-200",
                      },
                      {
                        emoji: "⚙️",
                        title: "Consultoría empresarial",
                        desc: "Diagnóstico de procesos y plan de mejora con KPIs medibles: diagnóstico sin costo inicial, plan de acción a 90 días y seguimiento de resultados.",
                        price: "Sin costo inicial",
                        priceSub: "plan a 90 días",
                        bullets: ["Diagnóstico sin costo inicial", "Plan de acción 90 días", "Seguimiento de resultados", "Gestión del cambio"],
                        color: "bg-slate-50 border-slate-200",
                        badge: "text-slate-700 bg-slate-100",
                        priceColor: "text-slate-700 bg-slate-100 border-slate-200",
                      },
                    ].map(({ emoji, title, desc, price, priceSub, bullets, color, badge, priceColor }) => (
                      <div key={title} className={`border rounded-2xl p-6 flex flex-col gap-4 ${color}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{emoji}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge}`}>Servicio</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-950 leading-tight">{title}</h3>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
                        </div>
                        <div className={`border rounded-xl px-3 py-2 flex flex-col gap-0.5 ${priceColor}`}>
                          <span className="font-black text-sm font-mono">{price}</span>
                          <span className="text-[10px] font-medium opacity-75">· {priceSub}</span>
                        </div>
                        <ul className="flex flex-col gap-1.5 mt-auto">
                          {bullets.map(b => (
                            <li key={b} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => openLeadForm('cotizador_web', { service: title, price })}
                          className="mt-2 text-xs font-bold text-[#1A3461] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Consultar disponibilidad <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-slate-400 font-mono mt-4">
                    Valores orientativos en pesos argentinos · cada proyecto se cotiza a medida.
                  </p>
                </div>

                {/* ── SECTORES QUE ATENDEMOS ── */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Sectores que atendemos</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Servicios directos para operaciones complejas</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { emoji: "🛒", sector: "Minoristas", desc: "Stock multicanal, ventas por WhatsApp y facturación integrada." },
                      { emoji: "🏭", sector: "Manufactura", desc: "Control de producción y presupuestos conectados al ERP." },
                      { emoji: "🌾", sector: "Agroindustria", desc: "Trazabilidad de lote y costos por campaña." },
                      { emoji: "🚚", sector: "Distribuidores", desc: "Ruteo, inventario en tiempo real y cobranzas automáticas." },
                      { emoji: "💼", sector: "Servicios", desc: "CRM para seguimiento y automatización de la atención." },
                      { emoji: "🔐", sector: "Tecnología", desc: "Gestión de proyectos, incidentes y clientes para consultoras IT." },
                    ].map(({ emoji, sector, desc }) => (
                      <div key={sector} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-xs hover:shadow-md transition-all">
                        <span className="text-2xl shrink-0">{emoji}</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-950">{sector}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── TABLA DE PRECIOS DE REFERENCIA ── */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold">Valores orientativos en pesos argentinos</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Catálogo de precios de referencia</h2>
                    <p className="text-slate-500 text-xs mt-2">Cada proyecto se cotiza a medida según alcance real.</p>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider w-52">Servicio</th>
                          {["Basic / Starter", "Pro / Advanced / Business", "Enterprise"].map(tier => (
                            <th key={tier} className="px-4 py-4 font-bold text-[11px] uppercase tracking-wider text-center">{tier}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            emoji: "🔌", name: "Integración API Gateway", sub: "Conectá sistemas y apps sin código",
                            tiers: [
                              { label: "Básica", sla: "48 hs", price: "$400.000 – $800.000", desc: "2 sistemas" },
                              { label: "Múltiple", sla: "24 hs", price: "$800.000 – $1.400.000", desc: "Multi-sistema" },
                              { label: "Completa", sla: "12 hs", price: "$1.400.000 – $2.000.000", desc: "Empresarial" },
                            ]
                          },
                          {
                            emoji: "🤖", name: "Clientum AI Copilot", sub: "IA y automatización para tu negocio",
                            tiers: [
                              { label: "IA Básica", sla: "48 hs", price: "$600.000 – $1.000.000", desc: "Automatización simple" },
                              { label: "IA Avanzada", sla: "24 hs", price: "$1.000.000 – $1.800.000", desc: "Predicciones" },
                              { label: "IA Empresarial", sla: "12 hs", price: "$1.800.000 – $2.500.000", desc: "LLM corporativo" },
                            ]
                          },
                          {
                            emoji: "💻", name: "Desarrollo Web", sub: "Sitios y apps a medida con CRM",
                            tiers: [
                              { label: "Web Básica", sla: "48 hs", price: "$800.000 – $1.500.000", desc: "Landing + CRM" },
                              { label: "Web Avanzada", sla: "24 hs", price: "$1.500.000 – $2.500.000", desc: "E-commerce + PWA" },
                              { label: "App Empresarial", sla: "12 hs", price: "$2.500.000 – $4.000.000", desc: "Full-stack a medida" },
                            ]
                          },
                          {
                            emoji: "📦", name: "Pack Integrado", sub: "CRM + API + IA + Web todo incluido",
                            tiers: [
                              { label: "Starter", sla: "48 hs", price: "$960.000 – $1.250.000", desc: "Pack básico" },
                              { label: "Business", sla: "24 hs", price: "$1.750.000 – $2.000.000", desc: "Pack completo" },
                              { label: "Corporativo", sla: "12 hs", price: "$2.450.000 – $3.000.000", desc: "Pack total" },
                            ]
                          },
                          {
                            emoji: "📊", name: "Business Intelligence", sub: "Dashboards y analytics con datos reales",
                            tiers: [
                              { label: "BI Básico", sla: "48 hs", price: "$800.000 – $1.500.000", desc: "Análisis de datos" },
                              { label: "BI Avanzado", sla: "24 hs", price: "$1.500.000 – $2.500.000", desc: "Predicciones" },
                              { label: "BI Empresarial", sla: "12 hs", price: "$2.500.000 – $4.000.000", desc: "BI corporativo" },
                            ]
                          },
                        ].map((row, rIdx) => (
                          <tr key={row.name} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                            <td className="px-5 py-4 border-r border-slate-100">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{row.emoji}</span>
                                <div>
                                  <div className="font-bold text-slate-900 text-[11px]">{row.name}</div>
                                  <div className="text-[9px] text-slate-400 mt-0.5">{row.sub}</div>
                                </div>
                              </div>
                            </td>
                            {row.tiers.map(tier => (
                              <td key={tier.label} className="px-4 py-4 text-center border-r border-slate-100 last:border-0">
                                <div className="font-bold text-slate-800 text-[11px]">{tier.price}</div>
                                <div className="text-[9px] text-slate-400 mt-0.5">{tier.desc}</div>
                                <div className="text-[9px] text-emerald-600 font-semibold mt-1">SLA {tier.sla}</div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50 border-t border-slate-200">
                          <td colSpan={4} className="px-5 py-3 text-[10px] text-slate-400 italic">
                            Precios en ARS · Cada proyecto se cotiza según alcance real · <button onClick={() => openLeadForm('contacto_comercial', { source: 'tabla_precios_referencia' })} className="text-[#1A3461] font-semibold hover:underline cursor-pointer">Solicitá propuesta sin costo →</button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* ── SECTORES QUE ATENDEMOS ── */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-widest font-bold">Experiencia sectorial</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Sectores que atendemos</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { emoji: "🛒", label: "Minoristas",     desc: "Gestión de stock multicanal, ventas por WhatsApp y facturación integrada." },
                      { emoji: "🏭", label: "Manufactura",    desc: "Control de producción, trazabilidad de materiales y presupuestos conectados al ERP." },
                      { emoji: "🌾", label: "Agroindustria",  desc: "Trazabilidad de lote desde el campo hasta la entrega, costos por campaña." },
                      { emoji: "🚚", label: "Distribuidores", desc: "Ruteo de entregas, inventario en tiempo real y cobranzas automáticas." },
                      { emoji: "💼", label: "Servicios",      desc: "CRM para seguimiento de clientes y automatización del flujo de atención." },
                      { emoji: "🔐", label: "Tecnología",     desc: "Gestión de proyectos, incidentes y clientes para consultoras IT." },
                    ].map(({ emoji, label, desc }) => (
                      <div key={label} className="bg-white border border-slate-200 hover:border-[#1A3461]/30 hover:shadow-md rounded-2xl p-5 flex flex-col gap-3 text-center transition-all group cursor-default">
                        <span className="text-3xl mx-auto">{emoji}</span>
                        <div className="font-bold text-sm text-slate-900 group-hover:text-[#1A3461] transition-colors">{label}</div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── SOLUCIONES PARA PYMES POR INDUSTRIA ── */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Te ayudamos a que tu negocio crezca</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Soluciones para Pymes por industria</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        emoji: "🛒",
                        label: "Minoristas",
                        desc: "El motor del crecimiento de un comercio son sus clientes, por eso desarrollamos soluciones tecnológicas específicas para que puedas conocerlos en profundidad y mejorar su experiencia, potenciando tu negocio. Te ofrecemos una solución de eCommerce 100% integrada a tu Software de Gestión.",
                        query: "minorista",
                      },
                      {
                        emoji: "🏭",
                        label: "Manufactura",
                        desc: "En manufactura la clave está en optimizar los procesos de producción, por eso desarrollamos soluciones tecnológicas específicas para capitalizar la información y potenciar tu negocio.",
                        query: "manufactura",
                      },
                      {
                        emoji: "🌾",
                        label: "Agroindustria",
                        desc: "Podrás conocer al detalle los gastos imputados a cada campaña, manejar diferentes centros de costos para conocer la rentabilidad de cada unidad de negocio de forma simple y con acceso a la información en tiempo real.",
                        query: "agroindustria",
                      },
                      {
                        emoji: "🚚",
                        label: "Distribuidores y mayoristas",
                        desc: "Algunos de los módulos con los que contamos son Logística y Reparto, Gestión de Precios por Proveedor, Generación de Órdenes de Compra y Cálculo de Niveles de Stock, entre otros.",
                        query: "distribuidor",
                      },
                      {
                        emoji: "💼",
                        label: "Servicios",
                        desc: "Nuestros módulos para el sector: Manejo de Centros de Costos, Balance General Mensual, Cash Flow, Facturación de Abonos, Factura Electrónica, Presupuesto Contable.",
                        tab: "servicios",
                      },
                    ].map(({ emoji, label, desc, query, tab }) => (
                      <div key={label} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-3 shadow-xs hover:shadow-md transition-all">
                        <span className="text-3xl">{emoji}</span>
                        <h3 className="font-bold text-sm text-slate-950">{label}</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed flex-1">{desc}</p>
                        <button
                          onClick={() => {
                            if (tab) {
                              setActiveTab(tab);
                            } else {
                              setActiveTab("catalogo");
                              setCatalogQuery(query);
                              setCatalogCat("");
                              setCatalogPage(1);
                            }
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-xs font-bold text-[#1A3461] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer mt-1"
                        >
                          Ver más <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── PRODUCTOS PARA GRANDES EMPRESAS ── */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">Infraestructura y plataforma para organizaciones de mayor escala</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Productos para Grandes Empresas</h2>
                    <p className="text-slate-500 text-xs mt-2 max-w-xl mx-auto">Soluciones de infraestructura, movilidad y comunicación que complementan el stack principal para organizaciones con mayor demanda técnica.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      {
                        emoji: "📱",
                        title: "App Mobile",
                        desc: "Aplicación nativa o híbrida para iOS y Android, conectada al CRM y a los procesos de tu empresa.",
                        bullets: ["iOS + Android", "Sincronización en tiempo real", "Push notifications", "Integración CRM"],
                        color: "bg-indigo-50 border-indigo-100 text-indigo-700",
                        dot: "bg-indigo-500",
                      },
                      {
                        emoji: "🖥️",
                        title: "Servidores Virtuales Privados",
                        desc: "VPS dedicados en infraestructura Cloud con recursos garantizados, backups automáticos y monitoreo.",
                        bullets: ["Recursos dedicados", "Backups diarios automáticos", "Panel de control incluido", "Soporte técnico 24/7"],
                        color: "bg-slate-50 border-slate-200 text-slate-700",
                        dot: "bg-slate-500",
                      },
                      {
                        emoji: "🌐",
                        title: "Hosting Administrado",
                        desc: "Alojamiento optimizado para sitios WordPress, e-commerce y apps web con alta disponibilidad.",
                        bullets: ["99.9% uptime garantizado", "SSL incluido", "CDN y caché automático", "Actualizaciones de seguridad"],
                        color: "bg-blue-50 border-blue-100 text-blue-700",
                        dot: "bg-blue-500",
                      },
                      {
                        emoji: "✉️",
                        title: "Correos Corporativos",
                        desc: "Casillas de correo con tu dominio empresarial, anti-spam profesional y acceso desde cualquier dispositivo.",
                        bullets: ["Dominio propio (@tuempresa)", "Anti-spam avanzado", "Webmail + apps móviles", "Almacenamiento ampliado"],
                        color: "bg-amber-50 border-amber-100 text-amber-700",
                        dot: "bg-amber-500",
                      },
                    ].map(({ emoji, title, desc, bullets, color, dot }) => (
                      <div key={title} className={`border rounded-2xl p-6 flex flex-col gap-4 ${color.split(" ").slice(0,2).join(" ")}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{emoji}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${color}`}>Infraestructura</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-950 leading-tight">{title}</h3>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
                        </div>
                        <ul className="flex flex-col gap-1.5 mt-auto">
                          {bullets.map(b => (
                            <li key={b} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => openLeadForm('plan_enterprise', { plan: title, category: 'Infraestructura' })}
                          className="mt-2 text-xs font-bold text-[#1A3461] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Consultar →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── PROYECTOS DESTACADOS ── */}
                <KeyProjectsSection
                  onContactClick={(title) => {
                    openLeadForm('cotizador_web', { project: title, interest: 'Implementación llave en mano' });
                  }}
                />

                {/* ── BÚSQUEDA & ÚLTIMOS ARTÍCULOS DEL BLOG ── */}
                <RecentBlogPostsSection
                  onGoToBlog={() => {
                    setActiveTab("blog");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />

                {/* ── PYMES ARGENTINAS EN ACCIÓN CON NUESTROS SERVICIOS ── */}
                <ArgentinePymesSection
                  title="Equipos en Argentina Trabajando con Nuestros Servicios"
                  subtitle="Comercios, distribuidoras, agroempresas y estudios profesionales que potencian sus operaciones comerciales y administrativas a diario."
                  items={[
                    ARGENTINE_PYMES_DATA.lubrano,
                    ARGENTINE_PYMES_DATA.distribuidora,
                    ARGENTINE_PYMES_DATA.estudio,
                    ARGENTINE_PYMES_DATA.terbay,
                  ]}
                  badge="Servicios en Operación Real"
                />

                {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) & INSTANT ANSWERS ── */}
                <FaqSection onOpenWizard={() => setIsQuoteWizardOpen(true)} />

              </div>
            )}

            {/* CATÁLOGO COMPLETO DE SERVICIOS TAB — solo usuarios autenticados */}
            {activeTab === "catalogo" && authUser && (
              <div className="flex flex-col">
                {/* Navy hero band */}
                <div className="bg-[#1A3461] text-center py-14 px-6">
                  <span className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Catálogo completo · {ALL_SERVICES.length.toLocaleString("es-AR")} servicios
                  </span>
                  <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mt-3">
                    Todo lo que hacemos, en un solo lugar
                  </h1>
                  <p className="text-blue-100/70 text-xs md:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
                    Filtrá por categoría o buscá por palabra clave. Cada servicio se cotiza según el alcance real del proyecto — los precios de referencia son orientativos.
                  </p>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 w-full">
                  {/* Funciones & Soluciones — curated category shortcuts */}
                  <div>
                    <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                      Funciones y Soluciones de la Plataforma
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {[
                        { id: "chatbot", label: "Chatbot WhatsApp", desc: "Tu negocio atiende solo, las 24 horas", icon: Bot, color: "text-green-500 bg-green-50" },
                        { id: "crm_inteligente", label: "CRM Inteligente", desc: "Nunca más perdas una venta", icon: Briefcase, color: "text-blue-500 bg-blue-50" },
                        { id: "asistente_ia", label: "Asistente IA", desc: "Tu analista de negocio, siempre disponible", icon: Sparkles, color: "text-violet-500 bg-violet-50" },
                        { id: "reportes", label: "Reportes Automáticos", desc: "Tomá decisiones con datos reales", icon: BarChart2, color: "text-orange-500 bg-orange-50" },
                        { id: "automatizacion", label: "Automatización", desc: "Hacé más con menos esfuerzo", icon: Zap, color: "text-amber-500 bg-amber-50" },
                        { id: "portal_cliente", label: "Portal del Cliente", desc: "Tus clientes se autoatienden", icon: LayoutGrid, color: "text-teal-500 bg-teal-50" },
                        { id: "desarrollo_web", label: "Desarrollo Web", desc: "Tu presencia web, conectada al CRM", icon: Code2, color: "text-slate-600 bg-slate-100" },
                        { id: "servicios", label: "Servicios", desc: "Consultoría de negocio y ERP personalizado", icon: Briefcase, color: "text-blue-500 bg-blue-50" },
                        { id: "integraciones", label: "Integraciones", desc: "Conecta tu CRM con WhatsApp, AFIP y más", icon: Zap, color: "text-amber-500 bg-amber-50" },
                        { id: "academia", label: "Academia", desc: "Cursos gratis de CRM y automatizaciones", icon: GraduationCap, color: "text-indigo-600 bg-indigo-50" },
                        { id: "casos", label: "Casos de Éxito", desc: "Historias de éxito de PyMEs reales", icon: Building, color: "text-emerald-500 bg-emerald-50" },
                        { id: "planes", label: "Planes y Precios", desc: "Encontrá el plan exacto para tu negocio", icon: BarChart2, color: "text-blue-500 bg-blue-50" },
                        { id: "clientes", label: "Nuestros Clientes", desc: "+35 empresas que ya confían en Clientum", icon: Users, color: "text-teal-500 bg-teal-50" },
                      ].map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-left bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs text-slate-950">{item.label}</span>
                            <span className="text-[10px] text-slate-500 leading-snug">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sticky search + category chip toolbar */}
                  <div className="sticky top-16 z-20 -mx-6 px-6 py-3 bg-white/95 backdrop-blur-sm border-y border-slate-100 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={catalogQuery}
                          onChange={(e) => {
                            setCatalogQuery(e.target.value);
                            setCatalogPage(1);
                          }}
                          placeholder="Buscar servicio (ej: ERP, e-commerce, ciberseguridad)…"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-mono self-center shrink-0 px-1">
                        {filteredCatalog.length.toLocaleString("es-AR")} resultado{filteredCatalog.length === 1 ? "" : "s"}
                        {catalogQuery || catalogCat ? ` · ${ALL_SERVICES.length.toLocaleString("es-AR")} total` : ""}
                      </span>
                      <button
                        onClick={handleExportWooCommerceCSV}
                        className="flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-semibold rounded-xl bg-[#1A3461] text-white hover:bg-[#0d1f3c] transition-all shrink-0"
                        title="Exportar catálogo completo (servicios, planes, cursos y soluciones) listo para importar en WooCommerce"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Exportar todo · CSV</span>
                      </button>
                    </div>

                    {/* Category chip scroller */}
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [&::-webkit-scrollbar]:h-1.5">
                      <button
                        onClick={() => {
                          setCatalogCat("");
                          setCatalogPage(1);
                        }}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 ${
                          catalogCat === ""
                            ? "bg-[#1A3461] text-white border-[#1A3461]"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#1A3461]"
                        }`}
                      >
                        Todas ({ALL_SERVICES.length})
                      </button>
                      {SERVICE_CATEGORIES.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setCatalogCat(c.name);
                            setCatalogPage(1);
                          }}
                          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 ${
                            catalogCat === c.name
                              ? "bg-[#1A3461] text-white border-[#1A3461]"
                              : "bg-white text-slate-500 border-slate-200 hover:border-[#1A3461]"
                          }`}
                        >
                          {c.name} ({c.count})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results grid */}
                  {catalogPageItems.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm py-10">
                      No encontramos servicios para tu búsqueda. Probá con otra palabra o categoría.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {catalogPageItems.map((s) => (
                        <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col gap-3 hover:border-blue-200 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              {s.cat || "General"}
                            </span>
                            <span className="text-[10px] font-mono text-slate-300">CTM-{s.id}</span>
                          </div>
                          <h3 className="font-display font-bold text-sm text-slate-950 leading-snug">{s.name}</h3>
                          {s.desc && <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{s.desc}</p>}
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                            <span className="font-display text-sm font-extrabold text-[#1A3461]">
                              {(() => {
                                const n = Number((s.price || "").replace(",", "."));
                                return Number.isFinite(n) && n > 0
                                  ? `Desde U$D ${n.toLocaleString("es-AR")}`
                                  : "Cotización a medida";
                              })()}
                            </span>
                            <button
                              onClick={() => {
                                openLeadForm('cotizador_web', { service: s.name, category: s.cat || "General", code: `CTM-${s.id}` });
                              }}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                            >
                              Consultar <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {catalogTotalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        disabled={catalogPage <= 1}
                        onClick={() => setCatalogPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        ← Anterior
                      </button>
                      <span className="text-xs text-slate-500 font-mono px-2">
                        Página {catalogPage} de {catalogTotalPages}
                      </span>
                      <button
                        disabled={catalogPage >= catalogTotalPages}
                        onClick={() => setCatalogPage((p) => Math.min(catalogTotalPages, p + 1))}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Siguiente →
                      </button>
                    </div>
                  )}

                <div className="bg-[#1A3461] rounded-2xl p-10 text-center text-white">
                  <h2 className="text-xl font-display font-black">¿No encontrás lo que necesitás?</h2>
                  <p className="text-blue-100 text-xs mt-2 mb-5">Armamos algo a medida para tu negocio.</p>
                  <button
                    onClick={() => {
                      setActiveTab("contacto");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-lg uppercase tracking-wider cursor-pointer"
                  >
                    Contanos tu caso →
                  </button>
                </div>
                </div>
              </div>
            )}

            {/* PLANES Y PRECIOS TAB */}
            {activeTab === "planes" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Nuestra Oferta Comercial</span>
                  <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Planes Transparentes para Todos
                  </h1>
                  <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
                    Ofrecemos soluciones adaptadas a las necesidades de cada cliente. Nuestros planes están diseñados para brindar servicios de alta calidad, asegurando que cada empresa encuentre el soporte adecuado para su crecimiento.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setIsBrochureModalOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer border-0"
                      title="Descargar Brochure Oficial con cuadro comparativo en PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar Brochure & Planes PDF
                    </button>
                    <button
                      onClick={handleExportWooCommerceCSV}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-black transition-all cursor-pointer border-0"
                      title="Exportar catálogo completo (servicios, planes, cursos y soluciones) listo para importar en WooCommerce"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Exportar todo a WooCommerce · CSV
                    </button>
                  </div>
                </div>

                {/* ═══ INTERACTIVE BILLING TOGGLE (MONTHLY / ANNUAL) & PRICING CARDS ═══ */}
                <PricingBillingToggle
                  onOpenWizard={() => setIsQuoteWizardOpen(true)}
                  onSelectPlan={(planName) => {
                    setActiveTab("contacto");
                    setDemoForm({ ...demoForm, mensaje: `Hola Clientum, me interesa contratar el plan ${planName}.` });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />

                {/* INTERACTIVE COMPARATIVE WIDGET (Fulfills the comparative requirement) */}
                <div className="bg-[#0d1f3c] text-white rounded-2xl p-8 border border-[#1A3461]/60 shadow-xl">
                  <h3 className="font-display font-bold text-lg mb-2 text-center text-emerald-400">
                    Calculador Comparativo Inteligente de Planes
                  </h3>
                  <p className="text-slate-400 text-xs text-center mb-8 max-w-lg mx-auto">
                    Mueve las barras para simular la escala de tu negocio en número de proyectos y páginas web. Te recomendaremos el plan exacto.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                    <div className="flex flex-col gap-6 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <label className="text-slate-300">Cantidad de Proyectos:</label>
                          <span className="text-blue-400 font-mono">{demoForm.nombre === "max" ? "Hasta 100" : "Hasta 50"}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="45"
                          onChange={(e) => {
                            const v = parseInt(e.target.value);
                            if (v > 50) {
                              setDemoForm({ ...demoForm, nombre: "max" });
                            } else {
                              setDemoForm({ ...demoForm, nombre: "med" });
                            }
                          }}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs text-slate-400 flex flex-col gap-2">
                        <span className="font-bold text-slate-300 uppercase tracking-widest text-[9px]">Todos los planes de Clientum incluyen:</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Aplicación de escritorio y móvil</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Estimaciones de tiempos operacionales</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Facturación integrada y link de cobros</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Reportes automatizados de métricas</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A3461] to-[#0d1f3c] p-8 rounded-xl border border-blue-800/40 text-center flex flex-col gap-4 shadow-lg shadow-blue-950/50">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Plan Recomendado para Ti</span>
                      <h4 className="text-2xl font-black font-display text-white">
                        {recommendedPlan.name}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">
                        {recommendedPlan.desc}
                      </p>
                      {hidePrices ? (
                        <div className="flex items-baseline justify-center gap-1.5">
                          <span className="text-2xl font-extrabold text-white">Consultar</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline justify-center gap-1.5">
                          <span className="text-4xl font-extrabold font-mono text-white">{recommendedPlan.price}</span>
                          <span className="text-xs uppercase text-emerald-300 font-bold">/ mes</span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setDemoForm({ ...demoForm, mensaje: `Hola Clientum, me interesa contratar el plan ${recommendedPlan.name}.` });
                          setActiveTab("contacto");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase py-3 rounded-lg tracking-wider transition-all mt-2 cursor-pointer shadow-md"
                      >
                        Contratar Plan Recomendado
                      </button>
                    </div>
                  </div>
                </div>

                {/* Compare Pricing Table - 5 Plans with all services included */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto items-stretch">
                  {/* PLAN 1: INICIAL */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Plan Inicial</h3>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Para emprendedores e iniciativas pequeñas.</p>
                      {hidePrices ? (
                        <div className="my-4 flex items-baseline">
                          <span className="text-xl font-extrabold text-slate-500">Consultar</span>
                        </div>
                      ) : (
                        <div className="my-4 flex items-baseline gap-0.5">
                          <span className="text-2xl font-extrabold font-mono text-slate-950">$20</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">/ mes</span>
                        </div>
                      )}
                      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-600 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Web:</strong> Landing page responsiva</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>CRM/ERP:</strong> Embudo básico (200 cont.)</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Seguridad:</strong> Respaldos mensuales</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>IA & BI:</strong> Bot de bienvenida fijo</span></li>
                      </ul>
                    </div>
                    <button onClick={() => { setActiveTab("contacto"); setDemoForm({ ...demoForm, mensaje: hidePrices ? "Hola Clientum, me gustaría solicitar presupuesto para el Plan Inicial." : "Hola Clientum, me interesa el Plan Inicial." }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] uppercase py-2 rounded-lg transition-all text-center cursor-pointer">
                      {hidePrices ? "Solicitar Presupuesto" : "Seleccionar Inicial"}
                    </button>
                  </div>

                  {/* PLAN 2: PYME */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Plan PyME</h3>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Para comercios con ventas activas.</p>
                      {hidePrices ? (
                        <div className="my-4 flex items-baseline">
                          <span className="text-xl font-extrabold text-slate-500">Consultar</span>
                        </div>
                      ) : (
                        <div className="my-4 flex items-baseline gap-0.5">
                          <span className="text-2xl font-extrabold font-mono text-slate-950">$45</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">/ mes</span>
                        </div>
                      )}
                      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-600 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Web:</strong> Tienda online estándar</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>CRM/ERP:</strong> Stock + AFIP (1.000 cont.)</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Seguridad:</strong> Cifrado de base de datos</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>IA & BI:</strong> Bot WhatsApp con FAQs</span></li>
                      </ul>
                    </div>
                    <button onClick={() => { setActiveTab("contacto"); setDemoForm({ ...demoForm, mensaje: hidePrices ? "Hola Clientum, me gustaría solicitar presupuesto para el Plan PyME." : "Hola Clientum, me interesa el Plan PyME." }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] uppercase py-2 rounded-lg transition-all text-center cursor-pointer">
                      {hidePrices ? "Solicitar Presupuesto" : "Seleccionar PyME"}
                    </button>
                  </div>

                  {/* PLAN 3: PRO */}
                  <div className="bg-white border-2 border-[#1A3461] rounded-2xl p-5 shadow-md flex flex-col justify-between relative transform lg:-translate-y-1">
                    <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-[#1A3461] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full shadow-xs font-mono whitespace-nowrap">
                      Más Elegido ⭐
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Plan Pro</h3>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Para automatizar con IA, bots y facturación.</p>
                      {hidePrices ? (
                        <div className="my-4 flex items-baseline">
                          <span className="text-xl font-extrabold text-slate-500">Consultar</span>
                        </div>
                      ) : (
                        <div className="my-4 flex items-baseline gap-0.5">
                          <span className="text-2xl font-extrabold font-mono text-slate-950">$80</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">/ mes</span>
                        </div>
                      )}
                      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-650 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-1.5 font-bold text-slate-900"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Web:</strong> E-Commerce premium total</span></li>
                        <li className="flex items-start gap-1.5 font-bold text-slate-900"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>CRM/ERP:</strong> Multi-embudo ilimitado</span></li>
                        <li className="flex items-start gap-1.5 font-bold text-slate-900"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Seguridad:</strong> Auditorías de software</span></li>
                        <li className="flex items-start gap-1.5 font-bold text-slate-900"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>IA & BI:</strong> Agente IA & BI avanzado</span></li>
                      </ul>
                    </div>
                    <button onClick={() => { setActiveTab("contacto"); setDemoForm({ ...demoForm, mensaje: hidePrices ? "Hola Clientum, me gustaría solicitar presupuesto para el Plan Pro." : "Hola Clientum, me interesa el Plan Pro." }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-6 w-full bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-[10px] uppercase py-2 rounded-lg transition-all text-center cursor-pointer">
                      {hidePrices ? "Solicitar Presupuesto" : "Seleccionar Pro"}
                    </button>
                  </div>

                  {/* PLAN 4: PREMIUM */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Plan Corporativo</h3>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Para empresas con múltiples canales activos.</p>
                      {hidePrices ? (
                        <div className="my-4 flex items-baseline">
                          <span className="text-xl font-extrabold text-slate-500">Consultar</span>
                        </div>
                      ) : (
                        <div className="my-4 flex items-baseline gap-0.5">
                          <span className="text-2xl font-extrabold font-mono text-slate-950">$150</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">/ mes</span>
                        </div>
                      )}
                      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-600 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Web:</strong> Portal B2B + Web integral</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>CRM/ERP:</strong> Pipeline multi-sucursal</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Seguridad:</strong> Hardening y firewall</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>IA & BI:</strong> Analítica predictiva & bots</span></li>
                      </ul>
                    </div>
                    <button onClick={() => { setActiveTab("contacto"); setDemoForm({ ...demoForm, mensaje: hidePrices ? "Hola Clientum, me gustaría solicitar presupuesto para el Plan Corporativo." : "Hola Clientum, me interesa el Plan Corporativo." }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] uppercase py-2 rounded-lg transition-all text-center cursor-pointer">
                      {hidePrices ? "Solicitar Presupuesto" : "Seleccionar Corp"}
                    </button>
                  </div>

                  {/* PLAN 5: ENTERPRISE */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Plan Especializado</h3>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">Infraestructura y desarrollos a medida.</p>
                      {hidePrices ? (
                        <div className="my-4 flex items-baseline">
                          <span className="text-xl font-extrabold text-slate-500">Consultar</span>
                        </div>
                      ) : (
                        <div className="my-4 flex items-baseline gap-0.5">
                          <span className="text-2xl font-extrabold font-mono text-slate-950">$250</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">/ mes</span>
                        </div>
                      )}
                      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-600 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Web:</strong> Apps web & mobile infinitas</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>CRM/ERP:</strong> Integraciones ERP legacy</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>Seguridad:</strong> SOC activo 24/7 dedicado</span></li>
                        <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> <span><strong>IA & BI:</strong> Modelos LLM corporativos</span></li>
                      </ul>
                    </div>
                    <button onClick={() => { setActiveTab("contacto"); setDemoForm({ ...demoForm, mensaje: hidePrices ? "Hola Clientum, me gustaría solicitar presupuesto para el Plan Especializado." : "Hola Clientum, me interesa el Plan Especializado." }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-6 w-full bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-[10px] uppercase py-2 rounded-lg transition-all text-center cursor-pointer">
                      {hidePrices ? "Solicitar Presupuesto" : "Seleccionar Custom"}
                    </button>
                  </div>
                </div>

                {/* FAQ Pricing structure */}
                <div className="max-w-3xl mx-auto mt-16">
                  <h3 className="font-display font-black text-slate-900 text-xl text-center mb-8">Preguntas Frecuentes sobre Planes</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        q: "¿Cuál es el propósito del período de prueba?",
                        a: "El período de prueba te permite evaluar todo nuestro sistema (incluyendo la integración simulada de WhatsApp y tableros CRM) durante 14 días sin realizar ningún pago inicial ni compromisos de permanencia."
                      },
                      {
                        q: "¿Ofrecen opciones de pago mensual o anual?",
                        a: "Ofrecemos ambas opciones de pago. La facturación anual tiene un descuento del 15% sobre el precio de lista mensual."
                      },
                      {
                        q: "¿Puedo cancelar o cambiar de plan en cualquier momento?",
                        a: "Sí, puedes cancelar tu suscripción o cambiarte entre planes de forma ágil desde el panel o contactando a soporte técnico. No aplicamos penalidades de ningún tipo."
                      },
                      {
                        q: "¿Se calcula el Impuesto al Valor Agregado (IVA) en los precios?",
                        a: "Sí, los valores expresados de suscripción se detallan netos de IVA, el cual se calcula según el estado impositivo de tu empresa al facturarse en pesos."
                      }
                    ].map((faq, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                        <button
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          className="w-full text-left py-4 px-6 flex justify-between items-center font-bold text-slate-900 hover:bg-slate-50 transition-colors text-xs"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === idx && (
                          <div className="px-6 pb-4 text-xs text-slate-500 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── EMPRESAS ARGENTINAS QUE OPERAN CON NUESTROS PLANES ── */}
                <ArgentinePymesSection
                  title="PyMEs Argentinas que Operan con Nuestros Planes"
                  subtitle="Desde comercios en expansión hasta distribuidoras mayoristas con múltiples sucursales en todo el país."
                  items={[
                    ARGENTINE_PYMES_DATA.farmacia,
                    ARGENTINE_PYMES_DATA.lubrano,
                    ARGENTINE_PYMES_DATA.distribuidora,
                    ARGENTINE_PYMES_DATA.consorcio,
                  ]}
                  badge="Planes en Acción"
                />
              </div>
            )}

            {/* SOBRE NOSOTROS TAB */}
            {activeTab === "nosotros" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">

                {/* Hero intro */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Nuestra Trayectoria · Desde 2016</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-2 leading-snug">
                      Diez años construyendo tecnología a medida para las PyMEs de la Patagonia.
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-4 leading-relaxed">
                      Nacimos en 2016 en una oficina de General Roca, Río Negro. Hoy somos Clientum: CRM, IA, integraciones y desarrollo web en una sola plataforma, con más de 35 empresas e instituciones del Alto Valle como clientes activos.
                    </p>
                    <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
                      Anteriormente conocidos como <strong>Viaweb</strong>, consolidamos todo lo aprendido en una plataforma propia con facturación integrada a AFIP, cobros por MercadoPago y metodologías ágiles.
                    </p>
                    <button
                      onClick={() => setIsBrochureModalOpen(true)}
                      className="mt-6 inline-flex items-center gap-2 bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer border-0"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      Descargar Brochure Oficial (PDF 8 Páginas)
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                  <div className="bg-slate-200 rounded-2xl h-72 overflow-hidden relative border border-slate-300 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Equipo Clientum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Motto */}
                <div className="bg-[#1A3461] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">Nuestro objetivo desde el primer día</p>
                    <h2 className="text-white font-display font-black text-xl md:text-2xl tracking-tight mt-1">
                      "Alcanzar la Excelencia Empresarial"
                    </h2>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {["Sistemas", "Desarrollos", "Promoción Digital"].map(pilar => (
                      <span key={pilar} className="bg-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                        {pilar}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Numbers bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "4", label: "Partners de comercialización" },
                    { value: "+10", label: "Colaboradores" },
                    { value: "+35", label: "Clientes activos" },
                    { value: "+5M", label: "Pesos en facturación anual" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
                      <div className="text-3xl font-display font-black text-[#1A3461] font-mono">{value}</div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                {/* ¿Por qué Viaweb? */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-widest font-bold">Legado Viaweb (2016), hoy Clientum</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">¿Por qué Viaweb?</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { icon: Zap, title: "Rápida respuesta", desc: "Contamos con un equipo capacitado y dispuesto a concretar sus requisitos existentes." },
                      { icon: Sparkles, title: "Innovación", desc: "Pensamos propuestas para satisfacer las necesidades particulares de cada industria en específico." },
                      { icon: CheckCircle2, title: "Satisfacción del cliente", desc: "Ayudamos a nuestros clientes a imaginar lo imposible y acelerar su futura innovación en los negocios digitales." },
                      { icon: ArrowLeftRight, title: "Transformación Digital", desc: "Acompañamos como proveedor de soluciones tecnológicas, siendo consultor y socio estratégico de las empresas." },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-3 shadow-xs hover:shadow-md transition-all">
                        <div className="w-9 h-9 rounded-xl bg-[#1A3461]/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#1A3461]" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-950">{title}</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">De un estudio de desarrollo web a una plataforma SaaS</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Nuestra Historia</h2>
                  </div>
                  <div className="relative flex flex-col gap-0">
                    {[
                      {
                        year: "2016",
                        title: "Primera oficina, Maipú 1438",
                        desc: "Abrimos como Viaweb en la calle Maipú al 1438, of. N.º 2, General Roca. Empezamos ofreciendo desarrollos web a medida, identidad corporativa y multimedia. Se suman los primeros dos colaboradores.",
                        color: "bg-[#1A3461]",
                      },
                      {
                        year: "2017",
                        title: "Infraestructura propia",
                        desc: "Armamos una red interna para alojar los sitios de nuestros clientes y empezamos a incorporar el uso interno de ERP y CRM.",
                        color: "bg-indigo-600",
                      },
                      {
                        year: "2018",
                        title: "Cloud y primeros partners",
                        desc: "Sumamos infraestructura Cloud para alojar sitios de clientes e iniciamos el esquema de partnership, con dos partners comerciales. Mudamos la oficina a Chacabuco 1302, of. N.º 1, y se incorporan dos colaboradores más.",
                        color: "bg-violet-600",
                      },
                      {
                        year: "2020",
                        title: "Datos y crecimiento del equipo",
                        desc: "Se suman cinco colaboradores más e implementamos análisis de datos y Business Intelligence para nuestros clientes, con reportes de conversión y optimización de campañas. Nueva oficina en Av. Pte. J. A. Roca 1884, of. N.º 1.",
                        color: "bg-emerald-600",
                      },
                      {
                        year: "2021",
                        title: "Remoto y expansión regional",
                        desc: "Cerramos la oficina física para enfocarnos en el trabajo remoto, avanzamos en abstraer nuestros servicios de ERP/CRM y comenzamos a vender en México y Chile.",
                        color: "bg-teal-600",
                      },
                      {
                        year: "Hoy",
                        title: "Nace Clientum",
                        desc: "Consolidamos todo lo aprendido en una plataforma propia: CRM, WhatsApp con IA, integraciones vía API Gateway, Business Intelligence y desarrollo web, con facturación integrada a AFIP y cobros por MercadoPago. Seguimos con base en la Patagonia y metodologías ágiles.",
                        color: "bg-amber-500",
                      },
                    ].map(({ year, title, desc, color }, idx) => (
                      <div key={year} className="flex gap-6 pb-10 relative">
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-black text-[10px] font-mono tracking-tight shrink-0 z-10`}>
                            {year === "Hoy" ? "🏠" : year.slice(2)}
                          </div>
                          {idx < 5 && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex-1 mb-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white ${color}`}>{year}</span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-950 mt-1">{title}</h3>
                          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1A3461] text-white rounded-2xl p-8 flex flex-col gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">Misión</span>
                      <h3 className="text-lg font-display font-black mt-1">Excelencia empresarial, un cliente a la vez</h3>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      El éxito de nuestra misión se sustenta en un equipo de profesionales calificados y una apuesta permanente a generar alianzas de excelencia con nuestros clientes.
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Desde hace más de diez años propiciamos un buen clima de trabajo en Clientum, de la mano de un equipo que se destaca por el compañerismo, el trabajo en equipo y la colaboración.
                    </p>
                  </div>
                  <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold">Visión</span>
                      <h3 className="text-lg font-display font-black mt-1">Anticiparnos a lo que las PyMEs van a necesitar</h3>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Nuestros valores: invertir en las personas y su desarrollo profesional, construir relaciones basadas en confianza responsabilizándonos por los compromisos asumidos, y lograr resultados sustentables.
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Esa visión se cristaliza en una plataforma y un conjunto de herramientas tecnológicas pensadas para satisfacer la demanda de nuestros clientes y anticiparse a las necesidades del mercado.
                    </p>
                  </div>
                </div>

                {/* Organigrama IA */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-widest font-bold">Arquitectura Hermes Prime · Julio 2026</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Equipo Humano + Agentes de IA</h2>
                    <p className="text-slate-500 text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                      Jonathan dirige una empresa asistida por agentes de IA autónomos que operan ventas, marketing, soporte y operaciones 24/7.
                    </p>
                  </div>
                  <OrganigramaClientum />
                </div>

                {/* Presencia en Territorio & Equipos Clientes */}
                <PymeTeamsGallery
                  title="Nuestra Presencia y Trabajo Junto a PyMEs Argentinas"
                  subtitle="Acompañamos a dueños, gerentes de operaciones, comerciales y equipos de depósito en la Patagonia, Buenos Aires, Córdoba y todo el país."
                  onContactClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                />

                {/* CTA */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
                  <span className="text-emerald-700 font-mono text-[10px] uppercase tracking-widest font-bold">General Roca · Río Negro · Argentina — antes Viaweb (2016–2026)</span>
                  <h2 className="text-xl font-display font-black text-slate-950 tracking-tight">¿Querés trabajar con nosotros?</h2>
                  <p className="text-slate-500 text-xs max-w-md leading-relaxed">
                    Neuquén · General Roca · Buenos Aires · Todo el país
                  </p>
                  <button
                    onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-7 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    Contactarnos <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>

              </div>
            )}

            {/* NUESTROS CLIENTES TAB */}
            {activeTab === "clientes" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-14">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-cyan-600 font-mono text-xs uppercase tracking-widest font-bold">Ecosistema empresarial del Alto Valle</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Nuestros Principales Clientes
                  </h1>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed max-w-xl mx-auto">
                    Más de 35 organizaciones del Alto Valle de Río Negro y Neuquén llevan adelante su transformación digital con Clientum — desde municipios y canales de TV hasta ferreterías, farmacias, propiedades e inmobiliarias.
                  </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "+35", label: "Clientes activos" },
                    { value: "4", label: "Organismos públicos" },
                    { value: "3", label: "Sectores de medios" },
                    { value: "2016", label: "Primer cliente" },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
                      <div className="text-2xl font-display font-black text-[#1A3461]">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tres patrones de adopción tecnológica */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Cómo adoptan tecnología nuestros clientes</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Tres patrones de transformación digital</h2>
                    <p className="text-slate-500 text-xs mt-2 max-w-2xl mx-auto">
                      La diversidad de sectores que atendemos exige enfoques distintos. Identificamos tres estrategias según el tipo de organización.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1A3461] text-white rounded-2xl p-6 flex flex-col gap-4">
                      <span className="text-2xl">🏛️</span>
                      <div>
                        <h3 className="font-bold text-sm leading-tight">Transformación Institucional</h3>
                        <p className="text-[10px] font-mono text-white/60 uppercase tracking-wider mt-0.5">Sector público y gremial</p>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Organismos como Canal 10, el Municipio de 25 de Mayo y el CEC pasaron de ser portales informativos a centros de servicios digitales que requieren alta disponibilidad, seguridad y gestión de contenidos permanente.
                      </p>
                    </div>
                    <div className="bg-emerald-700 text-white rounded-2xl p-6 flex flex-col gap-4">
                      <span className="text-2xl">🌾</span>
                      <div>
                        <h3 className="font-bold text-sm leading-tight">Digitalización de la Cadena de Valor</h3>
                        <p className="text-[10px] font-mono text-white/60 uppercase tracking-wider mt-0.5">Agroindustria y distribución</p>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        El Consorcio de Riego y el Frigorífico J.J. Gómez representan la columna vertebral de la economía del Alto Valle. La integración tecnológica aquí es operativa: ERP, trazabilidad de lote, logística y comercialización mayorista.
                      </p>
                    </div>
                    <div className="bg-slate-800 text-white rounded-2xl p-6 flex flex-col gap-4">
                      <span className="text-2xl">🛒</span>
                      <div>
                        <h3 className="font-bold text-sm leading-tight">Potenciación del Retail y Servicios</h3>
                        <p className="text-[10px] font-mono text-white/60 uppercase tracking-wider mt-0.5">Comercio B2C y servicios</p>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Lubrano Hogar, Morgado Hogar y Growlife Patagonia ejemplifican el paso al comercio omnicanal: e-commerce, integración con MercadoPago, analítica de conversión y automatización de campañas de marketing digital.
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-slate-400 font-mono mt-5">
                    Todos los sectores requieren infraestructura resiliente (hosting, correos corporativos) y una capa estratégica de datos (Business Intelligence) — Clientum lo centraliza en una sola plataforma.
                  </p>
                </div>

                {/* Sector Público */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#1A3461] flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-slate-900 text-lg tracking-tight">Sector Público</h2>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Municipios, medios públicos y organismos estatales</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Canal 10 TV",               rubro: "Medios Públicos",            url: "canal10rn.tv",          icon: Monitor,   logo: "/logos/canal10.webp" },
                      { name: "Diario 10",                  rubro: "Medios Digitales",           url: "diario10.com.ar",        icon: BookOpen,  logo: "/logos/diario-10.webp" },
                      { name: "Municipio de 25 de Mayo",    rubro: "Gobierno Municipal · La Pampa",   url: "25demayo.gob.ar",   icon: Building, logo: "/logos/municipio-25-de-mayo.png" },
                      { name: "Municipio de Maquinchao",    rubro: "Gobierno Municipal · Río Negro",  url: null,                icon: Building, logo: "/logos/maquinchao.png" },
                    ].map(({ name, rubro, url, icon: Icon, logo }) => (
                      <div key={name} className="bg-white border-2 border-[#1A3461]/10 hover:border-[#1A3461]/30 rounded-2xl p-5 flex flex-col gap-3 transition-all shadow-xs hover:shadow-md">
                        <div className="flex items-start justify-between">
                          {logo ? (
                            <div className="h-9 flex items-center">
                              <LogoImage
                                src={logo}
                                alt={name}
                                className="h-8 max-w-[120px] object-contain"
                                fallback={
                                  <div className="w-9 h-9 rounded-xl bg-[#1A3461]/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-[#1A3461]" />
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-[#1A3461]/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-[#1A3461]" />
                            </div>
                          )}
                          {url && (
                            <a
                              href={`https://${url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] text-slate-400 hover:text-[#1A3461] flex items-center gap-0.5 transition-colors"
                              onClick={e => e.stopPropagation()}
                            >
                              {url} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 leading-tight">{name}</div>
                          <div className="text-[10px] text-[#1A3461] font-semibold mt-1 uppercase tracking-wider">{rubro}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sector Privado — agrupado por rubro */}
                {[
                  {
                    label: "Medios & Comunicación",
                    color: "bg-violet-600",
                    icon: Monitor,
                    clientes: [
                      { name: "Frecuencia Urbana 887 FM", rubro: "Radio / Medios",         url: "frecuenciaurbana.com.ar" },
                    ]
                  },
                  {
                    label: "Real Estate & Propiedades",
                    color: "bg-blue-600",
                    icon: Home,
                    clientes: [
                       { name: "Aitue Propiedades",  rubro: "Inmobiliaria",   url: "aitue.com.ar",             logo: null,                        darkLogo: false },
                       { name: "Terbay Propiedades", rubro: "Inmobiliaria",   url: "terbaypropiedades.com.ar", logo: "/logos/terbay.png",          darkLogo: true },
                       { name: "Hábitat Sur",         rubro: "Real Estate / Construcción", url: null,         logo: "/logos/habitat-sur.jpg",     darkLogo: false },
                    ]
                  },
                  {
                    label: "Agroindustria & Producción",
                    color: "bg-green-700",
                    icon: Layers,
                    clientes: [
                       { name: "Consorcio de Riego General Roca",          rubro: "Riego / Agroindustria",       url: "consorcioderiegoroca.com.ar", logo: "/logos/consorcio-riego-general-roca.png", darkLogo: false },
                       { name: "Cooperativa Frigorífico J.J. Gómez",       rubro: "Frigorífico / Agroindustria", url: "frigorificojpgomez.com.ar",   logo: null, darkLogo: false },
                       { name: "Forestal Norte",                            rubro: "Forestal / Agroindustria",   url: null,                          logo: "/logos/forestal-norte.jpg", darkLogo: false },
                    ]
                  },
                  {
                    label: "Retail & Comercio",
                    color: "bg-orange-500",
                    icon: ShoppingCart,
                    clientes: [
                       { name: "Lubrano Hogar",              rubro: "Electrodomésticos / Retail", url: "lubranohogar.com.ar",      logo: "/logos/lubrano-hogar.png",  darkLogo: false },
                       { name: "Morgado Hogar",              rubro: "Hogar / Retail",             url: "morgadohogar.com.ar",      logo: "/logos/morgado-hogar.webp", darkLogo: false },
                       { name: "Growlife Patagonia",         rubro: "Comercio / Growshop",        url: "growlifepatagonia.com.ar", logo: null,                        darkLogo: false },
                       { name: "Bauleras Roca",              rubro: "Guardamuebles / Almacenaje", url: null,                      logo: null,                        darkLogo: false },
                       { name: "AKBAR SRL",                  rubro: "Comercio",                  url: null,                      logo: null,                        darkLogo: false },
                       { name: "LP SRL",                     rubro: "Comercio",                  url: null,                      logo: null,                        darkLogo: false },
                       { name: "AMBAR",                      rubro: "Comercio / Servicios",       url: null,                      logo: null,                        darkLogo: false },
                    ]
                  },
                  {
                    label: "Salud & Bienestar",
                    color: "bg-rose-500",
                    icon: Stethoscope,
                    clientes: [
                       { name: "Farmacia San Martín",  rubro: "Farmacia",           url: null, logo: "/logos/farmacia-san-martin.png", darkLogo: false },
                       { name: "Coe Consultorio",       rubro: "Consultorio Médico", url: null, logo: null, darkLogo: false },
                       { name: "Consultorio Cerol",     rubro: "Consultorio Médico", url: null, logo: null, darkLogo: false },
                       { name: "Grupo Bio",             rubro: "Salud / Bienestar",  url: null, logo: null, darkLogo: false },
                    ]
                  },
                  {
                    label: "Automotriz & Logística",
                    color: "bg-slate-700",
                    icon: Truck,
                    clientes: [
                       { name: "Cabarcos Motores SRL",  rubro: "Automotriz / Industrial", url: "cabarcosmotores.com.ar", logo: "/logos/cabarcos-motores-cropped.png", darkLogo: true },
                       { name: "Patagonia Remolques",   rubro: "Remolques / Automotriz",  url: null,                    logo: null,                                  darkLogo: false },
                       { name: "KJ Logística",          rubro: "Logística / Transporte",  url: "kjlogistica.com.ar",    logo: "/logos/kj-logistica.webp",             darkLogo: true },
                       { name: "Naval Patagonia",       rubro: "Náutica / Servicios",     url: null,                    logo: null,                                  darkLogo: false },
                    ]
                  },
                  {
                    label: "Servicios Profesionales & Tech",
                    color: "bg-indigo-600",
                    icon: Briefcase,
                    clientes: [
                       { name: "AFP Service",             rubro: "Servicios Técnicos",        url: "afpservice.com.ar", logo: "/logos/afp-service.png", darkLogo: false },
                       { name: "YendoApp",                rubro: "Tecnología / App Móvil",    url: "yendoapp.com.ar",   logo: null, darkLogo: false },
                       { name: "Saitt",                   rubro: "Tecnología / Servicios",    url: null,                logo: "/logos/saitt.png", darkLogo: false },
                       { name: "Estudio Integra",         rubro: "Estudio Profesional",       url: null,                logo: null, darkLogo: false },
                       { name: "Estudio Méndez & Asoc.",  rubro: "Estudio / Consultoría",     url: null,                logo: null, darkLogo: false },
                       { name: "Grupo de Asesores",       rubro: "Consultoría",               url: null,                logo: null, darkLogo: false },
                       { name: "Anmerica",                rubro: "Servicios",                 url: null,                logo: null, darkLogo: false },
                       { name: "Agua Wass",               rubro: "Agua / Servicios",          url: null,                logo: null, darkLogo: false },
                       { name: "SCT Patagonia",           rubro: "Servicios / Construcción",  url: null,                logo: "/logos/sct-patagonia.png", darkLogo: true },
                       { name: "Poliservice Suministros", rubro: "Suministros Industriales",  url: null,                logo: "/logos/poliservice.jpg",   darkLogo: false },
                    ]
                  },
                  {
                    label: "Institucional & Gremial",
                    color: "bg-teal-600",
                    icon: Users,
                    clientes: [
                       { name: "Centro Empleados de Comercio", rubro: "Gremio / Institucional", url: "cecgroca.com.ar", logo: "/logos/cec-general-roca.png", darkLogo: false },
                    ]
                  },
                ].map(({ label, color, icon: SectorIcon, clientes }) => (
                  <div key={label}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                        <SectorIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h2 className="font-display font-black text-slate-900 text-base tracking-tight">{label}</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {clientes.map(({ name, rubro, url, logo, darkLogo }) => (
                         <div
                           key={name}
                           className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl overflow-hidden flex flex-col transition-all shadow-xs"
                         >
                          {logo && (
                            <div className={`flex items-center justify-center px-4 py-3 ${darkLogo ? "bg-slate-900" : "bg-slate-50 border-b border-slate-100"}`}>
                              <LogoImage
                                src={logo}
                                alt={name}
                                className="h-10 max-w-full object-contain"
                                fallback={
                                  <SectorIcon className={`w-5 h-5 ${darkLogo ? "text-slate-50" : "text-slate-400"}`} />
                                }
                              />
                            </div>
                          )}
                          <div className="px-4 py-3 flex flex-col gap-1.5">
                            <span className="text-[11px] font-bold text-slate-800 leading-tight">{name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">{rubro}</span>
                            {url && (
                              <a
                                href={`https://${url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] text-cyan-600 hover:text-cyan-800 flex items-center gap-0.5 transition-colors mt-0.5"
                                onClick={e => e.stopPropagation()}
                              >
                                {url} <ExternalLink className="w-2 h-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* ── EQUIPOS Y PROFESIONALES EN ACCIÓN EN SUS EMPRESAS ── */}
                <PymeTeamsGallery
                  title="Equipos y Profesionales en Acción en Sus Empresas"
                  subtitle="Fotos reales de los equipos comerciales, logísticos, contables y directivos que usan Clientum en su día a día."
                  onContactClick={() => {
                    setDemoForm({ ...demoForm, mensaje: "Hola Clientum, me gustaría solicitar una demo para el equipo de mi empresa." });
                    setActiveTab("contacto");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />

                {/* CTA */}
                <div className="bg-[#1A3461] text-white rounded-2xl p-10 text-center flex flex-col items-center gap-4">
                  <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">¿Querés unirte?</span>
                  <h2 className="text-2xl font-display font-black tracking-tight">Tu empresa podría ser la próxima</h2>
                  <p className="text-slate-300 text-xs max-w-md leading-relaxed">
                    Implementación en 5 días hábiles, soporte en español 24/7 y tecnología que se adapta a tu rubro. Sin contratos mínimos.
                  </p>
                  <button
                    onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    Solicitar Demo Gratuita <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* CASOS DE EXITO / INDUSTRIAS TAB */}
            {activeTab === "casos" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Casos de Éxito por Industria</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Historias de Nuestros Clientes
                  </h1>
                  <p className="text-slate-500 text-xs mt-2">
                    Filtra nuestros proyectos realizados para ver cómo transformamos operaciones reales mediante tecnología robusta.
                  </p>
                </div>

                {/* Industry Filtering navigation */}
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { id: "todos", label: "Ver Todos" },
                    { id: "retail", label: "Retail" },
                    { id: "salud", label: "Salud" },
                    { id: "inmobiliaria", label: "Inmobiliaria" },
                    { id: "agroindustria", label: "Agroindustria" },
                    { id: "medios", label: "Medios" },
                    { id: "automotriz", label: "Automotriz" },
                    { id: "logística", label: "Logística" },
                    { id: "industrial", label: "Industrial" },
                    { id: "institucional", label: "Institucional" }
                  ].map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => setIndustryFilter(ind.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        industryFilter === ind.id
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>

                {/* Grid Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((p) => (
                    <motion.div
                      layout
                      key={p.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-40 overflow-hidden relative border-b border-slate-100">
                          <img
                            src={p.img}
                            alt={`Sitio web ${p.name}`}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2 bg-slate-900/85 text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider backdrop-blur-sm">
                            {p.industry}
                          </span>
                          <span className="absolute top-2 right-2 bg-white/90 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {p.year}
                          </span>
                        </div>
                        {(p as any).logo && (
                          <div className={`flex items-center px-4 py-2.5 border-b border-slate-100 ${(p as any).darkLogo ? "bg-slate-900" : "bg-white"}`}>
                            <img src={(p as any).logo} alt={`Logo ${p.name}`} className="h-7 max-w-[140px] object-contain" />
                          </div>
                        )}
                        <div className="p-5">
                          {!(p as any).logo && (
                            <h3 className="font-bold text-slate-950 text-sm leading-snug mb-1">{p.name}</h3>
                          )}
                          <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wider">{p.type}</span>
                          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-0">
                        <button
                          onClick={() => {
                            setDemoForm({ ...demoForm, mensaje: `Hola, vi el caso de éxito de ${p.name} (${p.type}) y me gustaría implementar algo similar en mi negocio.` });
                            setActiveTab("contacto");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
                        >
                          Solicitar solución similar →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Testimonial Section from Brochure Editor */}
                {brochureData?.testimonial && (
                  <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col gap-4 mt-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <MessageSquare className="w-40 h-40" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-emerald-400 font-extrabold font-mono tracking-widest uppercase border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-500/10">Testimonio Destacado</span>
                    </div>
                    <p className="text-sm md:text-base italic leading-relaxed text-slate-200 z-10">
                      "{brochureData.testimonial.text}"
                    </p>
                    <div className="flex flex-col z-10">
                      <span className="font-bold text-xs text-emerald-400 font-mono uppercase tracking-wider">{brochureData.testimonial.author}</span>
                      <span className="text-[10px] text-slate-400">{brochureData.testimonial.company}</span>
                    </div>
                  </div>
                )}

                {/* Imágenes de resumen visual de casos de éxito */}
                <div className="flex flex-col gap-4 mt-4">
                  <img
                    src="/casos/casos-por-industria.png"
                    alt="Casos de éxito por industria — Clientum"
                    className="w-full rounded-2xl shadow-md border border-slate-200 object-contain"
                  />
                  <img
                    src="/casos/casos-testimonios-digitales.png"
                    alt="Casos de éxito y testimonios digitales — Clientum"
                    className="w-full rounded-2xl shadow-md border border-slate-200 object-contain"
                  />
                </div>

                {/* Testimonios Destacados — 4 casos reales del brochure */}
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Testimonios Destacados</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { quote: "Implementamos Clientum en 5 días. El bot de WhatsApp nos generó 40% más de consultas en el primer mes que las que llevaba nadie. Los reportes automáticos cambiaron la forma en que tomamos decisiones.", author: "Martín B.", company: "Distribuidora del Sur S.A. — Neuquén" },
                      { quote: "El bot califica los interesados, les envía las fotos y los planos, y agenda las visitas solo. Nosotros entramos a cerrar. Fue un cambio total en la forma de trabajar.", author: "Equipo comercial", company: "Terbay Propiedades" },
                      { quote: "Antes el teléfono no paraba. Ahora el bot responde si tenemos el medicamento, da el precio y reserva. Liberamos horas del mostrador que usamos para atención personalizada.", author: "Administración", company: "Farmacia San Martín" },
                      { quote: "Las cartas de porte y la liquidación AFIP se hacen solas. Lo que nos llevaba medio día de oficina ahora tarda minutos. Clientum nos ahorró un empleado administrativo.", author: "Gerencia", company: "Forestal Norte" },
                    ].map(({ quote, author, company }) => (
                      <div key={company} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                        <p className="text-xs text-slate-600 leading-relaxed italic">"{quote}"</p>
                        <div>
                          <span className="text-[10px] font-bold text-[#1A3461] block">{author}</span>
                          <span className="text-[10px] text-slate-400">{company}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── GALERÍA DE EQUIPOS EN CASOS DE ÉXITO ── */}
                <PymeTeamsGallery
                  title="Equipos Reales que Protagonizan Nuestros Casos de Éxito"
                  subtitle="Detrás de cada indicador de crecimiento hay un equipo argentino que transformó su manera de trabajar junto a Clientum."
                  onContactClick={() => {
                    setDemoForm({ ...demoForm, mensaje: "Hola Clientum, me interesó conocer los casos de éxito de los equipos y quisiera evaluar una solución similar para mi PyME." });
                    setActiveTab("contacto");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}

            {/* CLIENTUM ACADEMIA TAB */}
            {activeTab === "academia" && (
              <div className="flex flex-col gap-0">
                {/* LMS principal — curso Aprende IA para Negocios */}
                <AcademiaLMS
                  authUser={authUser ?? null}
                  onNeedLogin={() => onOpenLogin?.()}
                />

              </div>
            )}

            {/* RECURSOS & BLOG TAB */}
            {activeTab === "blog" && (
              <BlogSectionManager
                onContactClick={(topic) => {
                  setDemoForm({ ...demoForm, mensaje: `Hola, me interesa consultar sobre "${topic}".` });
                  setActiveTab("contacto");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {/* CONTACTO TAB */}
            {activeTab === "contacto" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Canales de Atención</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    ¡Contáctanos! Estamos Listos
                  </h1>
                  <p className="text-slate-500 text-xs mt-2">
                    Estamos comprometidos con la conectividad y el progreso de la economía digital. Envíanos tu consulta.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Contact form */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-display font-bold text-base text-slate-950 mb-6">Formulario de Contacto Directo</h3>
                    
                    {isDemoSubmitted ? (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center flex flex-col items-center gap-4">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                        <h4 className="font-bold text-slate-900">¡Tu consulta ha sido enviada con éxito!</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                          Gracias por ponerte en contacto con Clientum. Uno de nuestros consultores se comunicará contigo en las próximas 24 horas hábiles.
                        </p>
                        <button
                          onClick={() => {
                            setIsDemoSubmitted(false);
                            setDemoForm({ nombre: "", email: "", empresa: "", rubro: "E-Commerce", mensaje: "", newsletter: true });
                          }}
                          className="bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-xs uppercase px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Enviar otro mensaje
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4 text-xs font-semibold text-slate-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1 text-slate-600">Nombre Completo *</label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Laura Martínez"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                              value={demoForm.nombre}
                              onChange={(e) => setDemoForm({ ...demoForm, nombre: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Correo Electrónico *</label>
                            <input
                              type="email"
                              required
                              placeholder="Ej. laura@empresa.com"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                              value={demoForm.email}
                              onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1 text-slate-600">Empresa o PyME</label>
                            <input
                              type="text"
                              placeholder="Ej. Cabarcos Motores S.R.L."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                              value={demoForm.empresa}
                              onChange={(e) => setDemoForm({ ...demoForm, empresa: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">WhatsApp / Teléfono</label>
                            <input
                              type="tel"
                              placeholder="Ej. +54 9 298 451-0883"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                              value={demoForm.telefono}
                              onChange={(e) => setDemoForm({ ...demoForm, telefono: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1 text-slate-600">Servicio Requerido</label>
                          <select
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                            value={demoForm.rubro}
                            onChange={(e) => setDemoForm({ ...demoForm, rubro: e.target.value })}
                          >
                            <option value="E-Commerce">Desarrollo Web E-Commerce</option>
                            <option value="ERP-CRM">Sistemas ERP / CRM</option>
                            <option value="Chatbot">Chatbots de WhatsApp con IA</option>
                            <option value="Facturación AFIP">Facturación AFIP Automática</option>
                            <option value="Consultoria">Consultoría de Negocios &amp; Transformación</option>
                            <option value="Ciberseguridad">Ciberseguridad y Auditoría</option>
                            <option value="Academia">Cursos en Academia</option>
                          </select>
                        </div>

                        <div>
                          <label className="block mb-1 text-slate-600">Mensaje o Detalle del Proyecto *</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Detalla qué objetivos buscas alcanzar..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:border-[#1A3461] focus:outline-none"
                            value={demoForm.mensaje}
                            onChange={(e) => setDemoForm({ ...demoForm, mensaje: e.target.value })}
                          ></textarea>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="newsletter-check"
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                            checked={demoForm.newsletter}
                            onChange={(e) => setDemoForm({ ...demoForm, newsletter: e.target.checked })}
                          />
                          <label htmlFor="newsletter-check" className="text-slate-500 text-[11px] font-medium leading-none">
                            Quiero recibir boletines y ofertas formativas de Clientum Academia
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="mt-4 bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs uppercase py-3 rounded-lg tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Enviar Mensaje de Contacto
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Office locations interactive map widget */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-sm text-slate-950">Nuestras Sedes Oficiales</h3>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          Binacional
                        </span>
                      </div>
                      
                      {/* Office selector tabs */}
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
                        <button
                          type="button"
                          onClick={() => setSelectedOffice('roca')}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedOffice === 'roca'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          <span>🇦🇷</span>
                          <span>General Roca</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedOffice('brasil')}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedOffice === 'brasil'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          <span>🇧🇷</span>
                          <span>Brasil (Arraial)</span>
                        </button>
                      </div>

                      {/* Display Office Card */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-blue-600" />
                            {(OFFICES as any)[selectedOffice]?.name || OFFICES.roca.name}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {(OFFICES as any)[selectedOffice]?.badge || 'Sede'}
                          </span>
                        </div>

                        {/* Leader Highlight */}
                        <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-2.5 text-xs">
                          <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase block">Liderazgo & Dirección:</span>
                            <span className="font-bold text-indigo-950">{(OFFICES as any)[selectedOffice]?.leader || 'Jonathan Ledantes'}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          {(OFFICES as any)[selectedOffice]?.desc}
                        </p>
                        <div className="text-[11px] text-slate-600 flex flex-col gap-1.5 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {(OFFICES as any)[selectedOffice]?.address}
                          </span>
                          <span className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {(OFFICES as any)[selectedOffice]?.phone}
                          </span>
                          <span className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {(OFFICES as any)[selectedOffice]?.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 text-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-emerald-400">Clientum B2B Intelligence</h4>
                        <span className="text-[10px] text-slate-400 font-mono">2016 – 2026</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Nacidos en General Roca, Río Negro (Patagonia Argentina, antes Viaweb) y con sede de expansión en Arraial do Cabo (Brasil). Liderados por <strong>Jonathan Ledantes</strong> y <strong>Matias Rotili</strong>.
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">🇦🇷 Sede Roca (Jonathan Ledantes)</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">🇧🇷 Sede Brasil (Matias Rotili)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mesa de Ayuda y Soporte Humano Local */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.soporte_central}
                  title="Atención Directa por Asesores en Argentina"
                  description="Nuestro equipo brinda asistencia en español por WhatsApp, Meet y presencial en la Patagonia y todo el país. Sin robots impersonales para resolver tus urgencias de negocio."
                />
              </div>
            )}

            {/* INTEGRACIONES TAB */}
            {activeTab === "integraciones" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Conectividad Total</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Integraciones de Clientum
                  </h1>
                  <p className="text-slate-500 text-xs mt-2">
                    Sincroniza de forma automática Clientum CRM con tus aplicaciones favoritas, pasarelas de pago y sistemas de facturación.
                  </p>
                </div>

                {/* Grid Integraciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      name: "WhatsApp Business API",
                      type: "Mensajería Directa",
                      desc: "Conecta tu línea oficial de WhatsApp para automatizar respuestas de bots, enviar flujos pre-aprobados por Meta y realizar campañas masivas sin riesgo de baneo.",
                      badge: "Oficial & Seguro"
                    },
                    {
                      name: "Facebook & Globe Ads",
                      type: "Generación de Demanda",
                      desc: "Sincroniza instantáneamente tus formularios de clientes potenciales (Lead Ads) para que impacten en tiempo real en las columnas de tu embudo comercial.",
                      badge: "Tiempo Real"
                    },
                    {
                      name: "WooCommerce & Shopify",
                      type: "E-Commerce",
                      desc: "Sincronización bidireccional en tiempo real de productos, variaciones de precios, stock unificado y recuperación automatizada de carritos de compras abandonados.",
                      badge: "Automatizado"
                    },
                    {
                      name: "AFIP Facturación",
                      type: "Administración Fiscal",
                      desc: "Emisión y envío automático de facturas electrónicas A, B o C asociadas directamente con cada transacción comercial ganada en tu CRM.",
                      badge: "Conector AFIP"
                    },
                    {
                      name: "MercadoPago & Stripe",
                      type: "Pasarela de Pagos",
                      desc: "Generación dinámica de links de pago desde el propio bot conversacional de WhatsApp y conciliación inmediata en tu libro diario contable.",
                      badge: "Finanzas"
                    },
                    {
                      name: "ERPs Tradicionales (Tango / Bejerman)",
                      type: "Sistemas Corporativos",
                      desc: "Sincronizador inteligente mediante API REST y servicios locales de base de datos para control de stock mayorista, listas de precios avanzadas y compras.",
                      badge: "Enterprise"
                    }
                  ].map((integ, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="bg-slate-100 text-slate-800 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono">
                            {integ.type}
                          </span>
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded">
                            {integ.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-950 text-sm leading-snug tracking-tight mb-2">{integ.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{integ.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setDemoForm({ ...demoForm, mensaje: `Hola, me interesa solicitar la integración de Clientum con ${integ.name} para mi negocio.` });
                          setActiveTab("contacto");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors flex items-center gap-1.5 mt-2"
                      >
                        Solicitar Integración →
                      </button>
                    </div>
                  ))}
                </div>

                {/* ── Catálogo completo: 63 herramientas · 10 categorías ── */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-widest font-bold">Catálogo completo</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">63 herramientas · 10 categorías</h2>
                    <p className="text-slate-400 text-xs mt-2 max-w-md mx-auto">
                      Nativo = construido por Clientum · Certificado = partnership oficial · Partner = programa de partners · API = conexión vía API pública
                    </p>
                  </div>
                  {(() => {
                    const BADGE: Record<string, string> = {
                      "API":          "bg-blue-100 text-blue-700",
                      "Integración":  "bg-violet-100 text-violet-700",
                      "Nativo":       "bg-emerald-100 text-emerald-700",
                      "Certificado":  "bg-amber-100 text-amber-700",
                      "Partner":      "bg-rose-100 text-rose-700",
                    };
                    const sections: { label: string; icon: string; color: string; items: { name: string; tag: keyof typeof BADGE }[] }[] = [
                      { label: "E-Commerce & Tiendas Online", icon: "🛒", color: "border-orange-200 bg-orange-50",
                        items: [{ name: "WooCommerce", tag: "Nativo" }, { name: "Shopify", tag: "API" }, { name: "PrestaShop", tag: "Integración" }, { name: "Tiendanube", tag: "API" }, { name: "MercadoShops", tag: "Integración" }, { name: "Jumpseller", tag: "API" }] },
                      { label: "Pagos & Cobros", icon: "💳", color: "border-green-200 bg-green-50",
                        items: [{ name: "MercadoPago", tag: "Nativo" }, { name: "PayPal", tag: "API" }, { name: "Stripe", tag: "API" }, { name: "Modo", tag: "Integración" }, { name: "GetNet / Prisma", tag: "Integración" }, { name: "Naranja X", tag: "Integración" }] },
                      { label: "Mensajería & Comunicación", icon: "💬", color: "border-emerald-200 bg-emerald-50",
                        items: [{ name: "WhatsApp Business API", tag: "Certificado" }, { name: "Meta (Facebook / IG)", tag: "Partner" }, { name: "Twilio", tag: "API" }, { name: "360dialog", tag: "Certificado" }, { name: "Telegram Bot API", tag: "API" }, { name: "Gmail API", tag: "Integración" }, { name: "SMTP / Correo propio", tag: "Nativo" }] },
                      { label: "Marketing & Publicidad", icon: "📣", color: "border-pink-200 bg-pink-50",
                        items: [{ name: "Meta Ads", tag: "Partner" }, { name: "Google Ads", tag: "Partner" }, { name: "TikTok for Business", tag: "Integración" }, { name: "LinkedIn Ads", tag: "Integración" }, { name: "Mailchimp", tag: "API" }, { name: "ActiveCampaign", tag: "API" }, { name: "Brevo (Sendinblue)", tag: "API" }] },
                      { label: "ERP, Facturación & Contabilidad", icon: "🏢", color: "border-blue-200 bg-blue-50",
                        items: [{ name: "AFIP (Facturación electrónica)", tag: "Nativo" }, { name: "Dolibarr ERP", tag: "Nativo" }, { name: "Odoo", tag: "Integración" }, { name: "Contabilium", tag: "API" }, { name: "Colppy", tag: "Integración" }, { name: "Xubio", tag: "Integración" }, { name: "Tango Gestión", tag: "Integración" }] },
                      { label: "Cloud, Hosting & Servidores", icon: "☁️", color: "border-slate-200 bg-slate-50",
                        items: [{ name: "Google Cloud", tag: "Partner" }, { name: "Amazon AWS", tag: "Partner" }, { name: "Microsoft Azure", tag: "Partner" }, { name: "Cloudflare", tag: "Certificado" }, { name: "DigitalOcean", tag: "Integración" }, { name: "Hostinger", tag: "Integración" }] },
                      { label: "Analytics & Business Intelligence", icon: "📊", color: "border-indigo-200 bg-indigo-50",
                        items: [{ name: "Google Analytics 4", tag: "Nativo" }, { name: "Looker Studio", tag: "Integración" }, { name: "Power BI", tag: "Integración" }, { name: "Meta Pixel", tag: "Nativo" }, { name: "Hotjar", tag: "Integración" }, { name: "Tableau", tag: "Integración" }] },
                      { label: "Productividad & Colaboración", icon: "⚙️", color: "border-yellow-200 bg-yellow-50",
                        items: [{ name: "Google Workspace", tag: "Certificado" }, { name: "Microsoft 365", tag: "Integración" }, { name: "Slack", tag: "API" }, { name: "Zoom", tag: "Integración" }, { name: "Microsoft Teams", tag: "Integración" }, { name: "Notion", tag: "API" }, { name: "Trello / Jira", tag: "Integración" }] },
                      { label: "Seguridad & Infraestructura", icon: "🔒", color: "border-red-200 bg-red-50",
                        items: [{ name: "Let's Encrypt / SSL", tag: "Nativo" }, { name: "Cloudflare WAF", tag: "Certificado" }, { name: "reCAPTCHA (Google)", tag: "Integración" }, { name: "2FA / TOTP", tag: "Nativo" }, { name: "OAuth 2.0 / SSO", tag: "Nativo" }] },
                      { label: "Inteligencia Artificial", icon: "🤖", color: "border-violet-200 bg-violet-50",
                        items: [{ name: "OpenAI (GPT-4)", tag: "API" }, { name: "Google Gemini", tag: "API" }, { name: "Anthropic Claude", tag: "API" }, { name: "Whisper (STT)", tag: "API" }, { name: "ElevenLabs (TTS)", tag: "API" }, { name: "Stability AI", tag: "API" }] },
                    ];
                    return (
                      <div className="flex flex-col gap-4">
                        {sections.map(({ label, icon, color, items }) => (
                          <div key={label} className={`border rounded-2xl overflow-hidden ${color}`}>
                            <div className="flex items-center gap-3 px-5 py-3 border-b border-black/5">
                              <span className="text-lg">{icon}</span>
                              <span className="font-display font-bold text-sm text-slate-900">{label}</span>
                              <span className="ml-auto font-mono text-[9px] text-slate-400 uppercase tracking-widest">{items.length} herramientas</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-black/5">
                              {items.map(({ name, tag }) => (
                                <div key={name} className="flex items-center justify-between px-4 py-2.5 bg-white/60 hover:bg-white transition-colors">
                                  <span className="text-[12px] font-medium text-slate-800">{name}</span>
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ml-2 shrink-0 ${BADGE[tag]}`}>{tag}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* API & Webhooks Technical Section */}
                <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                  <div>
                    <span className="text-[9px] text-emerald-400 font-extrabold font-mono tracking-widest uppercase border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-500/10">Para Desarrolladores</span>
                    <h3 className="text-xl font-display font-black tracking-tight mt-3">API REST &amp; Webhooks de Clientum</h3>
                    <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                      ¿Tienes un software a medida? Nuestra arquitectura abierta te permite integrar Clientum de forma fácil. Genera webhooks personalizados para notificar compras, registrar nuevos prospectos o disparar alertas ante cualquier evento comercial en tiempo real.
                    </p>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => alert("Documentación técnica en proceso de compilación.")}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        Ver API Docs
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                    <div className="text-slate-500 mb-2">// Webhook Payload Example (POST)</div>
                    <div><span className="text-emerald-400">"event"</span>: <span className="text-amber-300">"lead.created"</span>,</div>
                    <div><span className="text-emerald-400">"timestamp"</span>: <span className="text-amber-300">"2026-07-09T19:00:00Z"</span>,</div>
                    <div><span className="text-emerald-400">"data"</span>: &#123;</div>
                    <div className="pl-4"><span className="text-emerald-400">"company"</span>: <span className="text-amber-300">"Distribuidora Gaman"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"contact_phone"</span>: <span className="text-amber-300">"+54 298 4432105"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"pain_point"</span>: <span className="text-amber-300">"Demora en responder WhatsApp"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"estimated_roi"</span>: <span className="text-amber-300">"450%"</span></div>
                    <div>&#125;</div>
                  </div>
                </div>

                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.cabarcos}
                  title="Conectividad Integral de Sistemas"
                  description="Compañías de transporte y logística conectan sus ERPs tradicionales (Tango, Bejerman, Dolibarr) con el CRM de Clientum para sincronización de stock y despachos."
                />
              </div>
            )}

            {/* ASOCIACION / PARTNERS TAB */}
            {activeTab === "asociacion" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Programa de Alianzas</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Asociate y potenciá tu negocio con Clientum
                  </h1>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Sumate a nuestro ecosistema y ganá dinero ayudando a digitalizar PyMEs de la Patagonia y toda Latinoamérica.
                  </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "30%", label: "Comisión recurrente", color: "text-emerald-600" },
                    { value: "+120", label: "Partners activos", color: "text-[#1A3461]" },
                    { value: "500+", label: "PyMEs digitalizadas", color: "text-[#1A3461]" },
                    { value: "24 hs", label: "Soporte al partner", color: "text-emerald-600" },
                  ].map(({ value, label, color }) => (
                    <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
                      <p className={`text-2xl font-black font-display ${color}`}>{value}</p>
                      <p className="text-slate-500 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Programa de Afiliados */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:border-emerald-500/35 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 mb-3">Programa de Afiliados</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        Perfecto para influencers de negocios, creadores de contenido, mentores y cualquier profesional que recomiende Clientum. Recibe una recompensa recurrente por el valor de tus referidos.
                      </p>
                      <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>30% de Comisión Recurrente:</strong> Recibe el 30% del abono mensual de cada cliente que mantenga activa su cuenta de por vida.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Panel Transparente:</strong> Monitorea en vivo tus clicks, conversiones y comisiones listas para liquidar.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Material de Soporte Gratuito:</strong> Banners, videos promocionales, plantillas de correo y copys listos para compartir.</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      id="cta-unirme-afiliado-btn"
                      onClick={() => openLeadForm('postulacion_partner', { tipo_alianza: 'Afiliado Comercial / Referencias' })}
                      className="w-full bg-[#1A3461] hover:bg-[#0d1f3c] text-white text-xs font-bold py-3 rounded-lg tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Unirme como Afiliado Gratis
                    </button>
                  </div>

                  {/* Programa de Partners de Implementación */}
                  <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 shadow-sm hover:border-emerald-500/35 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">Partners de Implementación</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        Especial para agencias de marketing digital, consultores de negocios e implementadores de software. Ofrece la potencia tecnológica de Clientum CRM bajo tu marca y añade valor a tu cartera de clientes.
                      </p>
                      <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-300">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span><strong>Precios de Revendedor Preferenciales:</strong> Descuentos exclusivos y la opción de configurar marca blanca (White Label).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span><strong>Capacitación y Certificación VIP:</strong> Onboarding técnico premium directo con nuestros desarrolladores.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span><strong>Derivación de Leads Locales:</strong> Compartimos contigo leads en tu zona geográfica que requieran servicios de implementación manual en campo.</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      id="cta-partner-certificado-btn"
                      onClick={() => openLeadForm('postulacion_partner', { tipo_alianza: 'Implementador / Consultor Técnico' })}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold py-3 rounded-lg tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Postularme como Partner Certificado
                    </button>
                  </div>
                </div>

                {/* Niveles de partnership */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Niveles</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Del primer referido a partner preferente</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      {
                        nivel: "Nivel 01",
                        title: "Afiliado",
                        desc: "Sin requisitos técnicos. Compartís tu link, cobrás comisión recurrente y accedés al material de marketing.",
                        color: "border-slate-200 bg-white",
                        labelColor: "text-slate-500",
                      },
                      {
                        nivel: "Nivel 02",
                        title: "Partner Certificado",
                        desc: "Agencias e implementadores con onboarding técnico aprobado. Precios de revendedor y soporte prioritario.",
                        color: "border-[#1A3461]/20 bg-[#1A3461]/5",
                        labelColor: "text-[#1A3461]",
                      },
                      {
                        nivel: "Nivel 03",
                        title: "Partner Preferente",
                        desc: "Volumen sostenido de clientes activos. Marca blanca completa, derivación de leads y presencia destacada en clientum.com.ar.",
                        color: "border-amber-200 bg-amber-50",
                        labelColor: "text-amber-600",
                      },
                    ].map(({ nivel, title, desc, color, labelColor }) => (
                      <div key={nivel} className={`border rounded-2xl p-6 flex flex-col gap-3 ${color}`}>
                        <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${labelColor}`}>{nivel}</span>
                        <h3 className="font-display font-bold text-base text-slate-950">{title}</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 pasos para sumarse */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-[#1A3461] font-mono text-[10px] uppercase tracking-widest font-bold">Cómo sumarte</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Cuatro pasos para empezar</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { n: "1", title: "Postulate", desc: "Contanos tu perfil: si sos afiliado o partner de implementación." },
                      { n: "2", title: "Reunión inicial", desc: "Revisamos condiciones, comisiones y alcance juntos sin compromiso." },
                      { n: "3", title: "Onboarding", desc: "Capacitación en la plataforma y, si aplica, certificación técnica." },
                      { n: "4", title: "A vender", desc: "Accedés a tu panel, material de marketing y empezás a generar comisiones." },
                    ].map(({ n, title, desc }) => (
                      <div key={n} className="flex flex-col gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#1A3461]/30 flex items-center justify-center font-mono text-xs font-bold text-[#1A3461]">
                          {n}
                        </div>
                        <h4 className="font-display font-bold text-sm text-slate-950">{title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red de Aliados Comerciales en Territorio */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.consultoria}
                  title="Red de Aliados y Consultores en Territorio"
                  description="Agencias y consultores implementan Clientum en empresas de la Patagonia y Buenos Aires, generando ingresos recurrentes y relaciones de largo plazo."
                />
              </div>
            )}

            {/* AYUDA / CENTRO DE SOPORTE TAB */}
            {activeTab === "ayuda" && (
              <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Centro de Ayuda</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Soporte &amp; Base de Conocimiento
                  </h1>
                  <p className="text-slate-500 text-xs mt-2">
                    Encuentra respuestas inmediatas a tus dudas técnicas o contáctate directamente con nuestro equipo de soporte prioritario.
                  </p>
                </div>

                {/* Preguntas Frecuentes FAQ con Acordeón */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
                  <h3 className="font-bold text-slate-950 text-sm mb-2 border-b border-slate-100 pb-2">Preguntas Frecuentes</h3>
                  <div className="flex flex-col gap-3">
                    {FAQS.map((faq, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          className="w-full bg-slate-50/50 hover:bg-slate-50 p-4 text-left text-xs font-bold text-slate-800 flex justify-between items-center transition-all cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === idx && (
                          <div className="p-4 bg-white text-xs text-slate-500 leading-relaxed border-t border-slate-100 animate-slideDown">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact support channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Canal de Soporte de WhatsApp</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        ¿Necesitas asistencia inmediata? Chatea directamente con nuestro bot calificador y sé derivado a un operador técnico si es necesario. Atendemos consultas generales las 24 horas.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-lg transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Iniciar Chat WhatsApp
                    </a>
                  </div>

                  <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm mb-2">Soporte por Ticket &amp; Correo Electrónico</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Para consultas de facturación, contratos corporativos, solicitudes de integraciones complejas con ERP locales o problemas con cursos de Clientum Academia.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => openLeadForm('soporte_ticket', { priority: 'Media', system: 'General' })}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Headphones className="w-4 h-4" />
                        Crear Ticket Prioritario
                      </button>
                      <a
                        href={`mailto:${contact.email}`}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all text-center border border-slate-700 flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-4 h-4 text-emerald-400" />
                        Enviar Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRIVACY POLICY TAB */}
            {activeTab === "privacidad" && (
              <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8 text-xs text-slate-600 leading-relaxed">
                <h1 className="text-2xl font-display font-black text-slate-950 mb-2">Política de Privacidad</h1>
                <p className="text-slate-400 font-mono text-[10px]">Actualizado: Julio de 2026</p>

                <section className="flex flex-col gap-3">
                  <h3 className="font-bold text-slate-900 text-sm">1. Quiénes somos</h3>
                  <p>
                    La dirección de nuestra web oficial es: <a href="https://web.clientum.com.ar" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">https://web.clientum.com.ar</a>. Clientum se compromete a salvaguardar los datos personales recolectados a través de nuestros CRM, formularios de consulta o enrolamientos en Clientum Academia.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h3 className="font-bold text-slate-900 text-sm">2. Qué datos personales recopilamos</h3>
                  <p>
                    Cuando los visitantes cargan datos de prospectos en el CRM o interactúan con nuestro chatbot de demostración, recopilamos los nombres comerciales, números de WhatsApp, correos electrónicos y descripciones de sus dolores de negocio. También guardamos cookies de sesión para simplificar la navegación interactiva.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h3 className="font-bold text-slate-900 text-sm">3. Derechos sobre tus datos</h3>
                  <p>
                    Si tienes una cuenta, te has pre-inscrito en Clientum Academia o has completado formularios comerciales de cotización, puedes solicitar un archivo exportado de los datos que tenemos sobre ti. También puedes solicitar que eliminemos cualquier información personal de nuestra base de datos activa.
                  </p>
                </section>

                <button
                  onClick={() => {
                    setActiveTab("inicio");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-6 self-start bg-slate-900 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Volver al Inicio
                </button>
              </div>
            )}
          {/* ── FUNCIONES: CHATBOT WHATSAPP ── */}
            {activeTab === "chatbot" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Chatbot WhatsApp</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Tu negocio atiende solo,<br />las 24 horas
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      El chatbot de Clientum responde consultas, califica leads y agenda citas en WhatsApp — sin que toques nada. Operativo en una semana.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Sin tarjeta de crédito", "Sin código ni IT", "Operativo en 1 semana"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button id="cta-chatbot-cotizar-btn" onClick={() => openLeadForm('cotizador_chatbot', { rubro: 'Comercial / Servicios' })} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Cotizar Bot WhatsApp</button>
                      <button id="cta-chatbot-demo-btn" onClick={() => openLeadForm('cotizador_chatbot', { mensaje: 'Solicito demostración guiada del Bot de WhatsApp' })} className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Ver demo</button>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-emerald-400 text-xs font-mono font-bold">Bot de tu empresa · En línea · Responde al instante</span>
                    </div>
                    {[
                      { from: "user", msg: "Hola, ¿tienen stock del producto X?" },
                      { from: "bot", msg: "¡Hola! Sí, tenemos stock. ¿Cuántas unidades necesitás?" },
                      { from: "user", msg: "20 unidades. ¿Hacen envío?" },
                      { from: "bot", msg: "Sí, hacemos envío a todo el país. Te contacto con un asesor para confirmar. ¿Cuál es tu nombre?" },
                    ].map((m, i) => (
                      <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-xl text-xs leading-relaxed ${m.from === "user" ? "bg-emerald-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-200"}`}>{m.msg}</div>
                      </div>
                    ))}
                    <p className="text-slate-500 text-[10px] text-center mt-2 font-mono">Este bot trabaja 24/7 sin que nadie lo atienda</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { stat: "24/7", label: "Atención ininterrumpida" },
                    { stat: "+60%", label: "Consultas resueltas sin humano" },
                    { stat: "1 semana", label: "Tiempo de implementación" },
                  ].map((s) => (
                    <div key={s.stat} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                      <div className="text-3xl font-display font-black text-[#1A3461]">{s.stat}</div>
                      <div className="text-xs text-slate-500 mt-2 font-semibold">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.lubrano}
                  title="Atención Comercial y Consultas en Negocios Argentinos"
                  description="Lubrano y otros comercios del Alto Valle y Buenos Aires utilizan nuestro bot de WhatsApp para canalizar consultas de stock, horarios y pedidos de forma inmediata."
                />
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">¿Listo para automatizar tu atención al cliente?</h3>
                  <p className="text-xs text-slate-500 mt-2">Probá el chatbot de WhatsApp 14 días gratis, sin compromisos.</p>
                  <button id="cta-chatbot-probar-btn" onClick={() => openLeadForm('cotizador_chatbot')} className="mt-5 bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Solicitar Cotización de Bot →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: CRM INTELIGENTE ── */}
            {activeTab === "crm_inteligente" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold">CRM Inteligente</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Nunca más perdas<br />una venta
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Gestioná contactos, leads y deals en un pipeline visual. Con seguimiento automático y alertas para que nada se te escape.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Sin tarjeta de crédito", "Fácil de usar", "Soporte incluido"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-950 text-sm mb-4">Pipeline de ventas</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {["Prospecto", "Contactado", "Propuesta", "Negociación", "Ganado"].map((stage) => (
                        <div key={stage} className="flex-1 min-w-[80px] bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                          <div className="text-[10px] font-bold text-slate-700">{stage}</div>
                          <div className="w-6 h-6 bg-[#1A3461]/10 rounded-full mx-auto mt-2"></div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-3">Arrastrá y soltá entre etapas</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Contactos y empresas unificados", desc: "Todos tus clientes, prospectos y empresas en un solo lugar con historial completo de interacciones." },
                    { title: "Pipeline visual de ventas", desc: "Arrastrá deals entre etapas, asigná responsables y establecé fechas límite en segundos." },
                    { title: "Seguimiento automático", desc: "El sistema te alerta cuando un deal lleva días sin actividad para que nunca pierdas una oportunidad." },
                    { title: "Integración con WhatsApp y AFIP", desc: "Cada conversación y factura queda vinculada al deal correspondiente sin trabajo manual." },
                  ].map((f) => (
                    <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Módulos disponibles — implementación ERP/CRM completa */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">Implementaciones ERP / CRM</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Módulos disponibles</h2>
                    <p className="text-slate-500 text-xs max-w-2xl mx-auto mt-3 leading-relaxed">
                      Un software completamente modular: activás sólo las funciones que tu empresa necesita. Se ejecuta 100% en la nube, accesible desde cualquier lugar con conexión a internet.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { group: "CRM & Ventas", icon: Briefcase, items: ["Seguimiento de clientes y terceros con historial completo", "Gestión de presupuestos, pedidos y contratos", "Tickets de soporte con creación automática desde email"] },
                      { group: "Gestión de terceros", icon: Users, items: ["Clientes, proveedores y contactos unificados", "Categorías, niveles de precio y notas por tercero", "Notificaciones automáticas ante cambios de estado"] },
                      { group: "Contratos y facturación", icon: FileText, items: ["Contratos de servicios periódicos con alertas de vencimiento", "Facturación electrónica integrada con AFIP", "Links de pago online (Paypal, Stripe, PayZen)"] },
                      { group: "Finanzas", icon: BarChart2, items: ["Gestión de IVA, IRPF y cargas sociales", "Cuentas bancarias y domiciliaciones automáticas", "Estadísticas financieras y de márgenes de venta"] },
                      { group: "Gestión documental", icon: LayoutGrid, items: ["Almacenamiento centralizado vinculado a cada entidad", "Presupuestos, pedidos, facturas y terceros conectados", "Búsqueda rápida por relación ficha–documento"] },
                      { group: "Recursos Humanos", icon: Users, items: ["Gestión de usuarios, grupos y permisos granulares", "Vacaciones, salarios y hojas de horas", "Gestión de miembros para clubs y asociaciones"] },
                      { group: "Productividad", icon: CheckSquare, items: ["Proyectos con márgenes de beneficio en tiempo real", "Agenda compartida con registro automático de acciones", "Desarrollo de reportes a medida con exportación a Excel"] },
                      { group: "Manufactura", icon: Package, items: ["Listas de materiales (BOM) y órdenes de fabricación", "Control de stock virtual en tiempo real", "Gestión de lotes y series de producción"] },
                      { group: "Omnicanal", icon: ShoppingCart, items: ["Dashboard con indicadores y alertas configurables", "Punto de venta (TPV) integrado con la facturación", "Sincronización de stock con Prestashop, WooCommerce, etc."] },
                      { group: "Administración e integración", icon: Settings, items: ["Parametrización flexible, backups y tareas programadas", "Programación a medida según necesidades del negocio", "Migración de datos desde tu sistema anterior"] },
                    ].map(({ group, icon: Icon, items }) => (
                      <div key={group} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="w-4 h-4 text-blue-500" />
                          <h4 className="font-bold text-slate-900 text-sm">{group}</h4>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {items.map((it) => (
                            <li key={it} className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />{it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.terbay}
                  title="Pipelines y Seguimiento en Equipos Comerciales"
                  description="Inmobiliarias, distribuidoras y firmas de servicios estructuran sus oportunidades comerciales y cierres con el CRM inteligente de Clientum."
                />

                <div className="bg-[#1A3461] text-white rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold">Organizá tu pipeline hoy</h3>
                  <p className="text-xs text-slate-300 mt-2">Probalo 14 días gratis y cerrá más ventas desde la primera semana.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: ASISTENTE IA ── */}
            {activeTab === "asistente_ia" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-bold">Asistente IA</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Tu analista de negocio,<br />siempre disponible
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Preguntale cualquier cosa sobre tu CRM y recibís respuestas al instante. Reportes, sugerencias y acciones sin aprender ninguna herramienta.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Sin configuración", "Incluido en todos los planes", "Responde en castellano"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span className="text-violet-400 text-xs font-mono font-bold">Asistente Clientum</span>
                    </div>
                    {[
                      { q: "¿Cuántos leads tengo esta semana?", a: "Esta semana registraste 12 leads nuevos. ↑ 3 más que la semana pasada." },
                      { q: "¿Cuáles deals están estancados?", a: "4 deals sin actividad hace +7 días. ¿Querés que genere un mensaje de seguimiento?" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-end"><div className="bg-violet-600 text-white text-xs px-3 py-2 rounded-xl max-w-xs">{item.q}</div></div>
                        <div className="flex justify-start"><div className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl max-w-xs">{item.a}</div></div>
                      </div>
                    ))}
                    <p className="text-slate-500 text-[10px] text-center mt-1 font-mono">Preguntás en castellano, el asistente entiende</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    '"¿Cuántos leads tuve esta semana?"',
                    '"Mostrá el resumen del pipeline"',
                    '"¿Cuál es el contacto con más actividad?"',
                    '"Generá un borrador de propuesta para Empresa X"',
                  ].map((q) => (
                    <div key={q} className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 italic shadow-sm">{q}</div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.consultoria}
                  title="Análisis Operativo en Empresas de Servicios"
                  description="Directivos y dueños de PyMEs consultan al Asistente de IA en lenguaje natural para obtener resúmenes de rendimiento semanal y alertas de gestión."
                />
                <div className="bg-violet-50 border border-violet-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Tu analista de negocio, siempre disponible</h3>
                  <p className="text-xs text-slate-500 mt-2">Incluido en todos los planes sin costo adicional.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: REPORTES AUTOMÁTICOS ── */}
            {activeTab === "reportes" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-bold">Reportes Automáticos</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Tomá decisiones con<br />datos reales
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Reportes automáticos de ventas, actividad, facturación y atención al cliente. Sin armar planillas, sin pedir datos al equipo.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Dashboard en tiempo real", "Reportes automáticos por email", "Exportá a Excel o PDF"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-slate-950 text-sm">Dashboard — Junio 2026</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-mono font-bold">En vivo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Deals activos", val: "18", delta: "+3 vs mes anterior" },
                        { label: "Ingresos del mes", val: "$480K", delta: "+12% vs mes anterior" },
                        { label: "Leads nuevos", val: "34", delta: "+7 vs mes anterior" },
                        { label: "Tasa de cierre", val: "23%", delta: "+5% vs mes anterior" },
                      ].map((m) => (
                        <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                          <div className="text-[10px] text-slate-500 font-semibold">{m.label}</div>
                          <div className="text-xl font-display font-black text-slate-950 mt-1">{m.val}</div>
                          <div className="text-[9px] text-emerald-600 font-mono mt-1">{m.delta}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Pipeline de ventas", desc: "Deals por etapa, valor total, probabilidad de cierre y tiempo promedio en cada fase." },
                    { title: "Actividad del equipo", desc: "Llamadas, emails, reuniones y tareas completadas por período y por asesor." },
                    { title: "Leads y conversiones", desc: "Origen de leads, tasa de conversión por etapa y velocidad de avance en el pipeline." },
                    { title: "Facturación y pagos", desc: "Ingresos por mes, facturas pendientes, clientes con deuda y proyección de cobros." },
                    { title: "Contactos y empresas", desc: "Nuevos contactos por semana, contactos sin actividad reciente y segmentación." },
                    { title: "WhatsApp y atención", desc: "Conversaciones atendidas por el bot, derivaciones a humano y tiempo de respuesta." },
                  ].map((r) => (
                    <div key={r.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <BarChart2 className="w-5 h-5 text-orange-500 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{r.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
                {/* E-marketing y gerenciamiento */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-orange-600 font-mono text-[10px] uppercase tracking-widest font-bold">E-marketing y gerenciamiento</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Seguimiento de las principales métricas de negocio y gestión</h2>
                    <p className="text-slate-500 text-xs max-w-2xl mx-auto mt-3 leading-relaxed">
                      Planificamos, implementamos y administramos canales digitales con herramientas de e-marketing enfocadas en la conversión, para generar experiencias que benefician tanto a la marca como al consumidor.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { title: "E-marketing", icon: TrendingUp, desc: "Decisiones basadas en datos para un plan de medios digitales, con optimizaciones constantes, medición y automatización que refuerzan tu marca." },
                      { title: "SEO y SEM", icon: Search, desc: "SEO para resultados orgánicos y SEM para mayor visibilidad con campañas de anuncios — las dos estrategias clave para posicionarte en Google." },
                      { title: "Marketing Automation", icon: Zap, desc: "Desde ventas y segmentación hasta divulgación en redes sociales: ahorrá tiempo y llegá a más consumidores de forma creativa." },
                      { title: "Email Marketing & Social Ads", icon: Mail, desc: "Combiná e-mail marketing con Social Ads. El CRM integrado gestiona toda la información de forma automatizada." },
                      { title: "Ejecución y optimización de campañas", icon: BarChart2, desc: "Planificamos, ejecutamos y optimizamos anuncios, midiendo resultados con plataformas de Analytics para mejorar cada campaña." },
                      { title: "Gestión de medios de pago", icon: ShoppingCart, desc: "Configuración de cuentas e integración de tu tienda con múltiples medios de pago a través de gateways especializados." },
                    ].map(({ title, icon: Icon, desc }) => (
                      <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <Icon className="w-5 h-5 text-orange-500 mb-3" />
                        <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.bi_dashboard}
                  title="Tableros y Reportes en Tiempo Real"
                  description="Gerencias de operaciones en el sector frutihortícola, farmacéutico y de logística monitorean sus indicadores de ventas y cobranzas al instante."
                />

                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Datos claros para decisiones rápidas</h3>
                  <p className="text-xs text-slate-500 mt-2">Probá los reportes automáticos 14 días sin costo.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: AUTOMATIZACIÓN ── */}
            {activeTab === "automatizacion" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-amber-600 font-mono text-xs uppercase tracking-widest font-bold">Automatización</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Hacé más con<br />menos esfuerzo
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Automatizá seguimientos, alertas, emails y tareas. Tu equipo se enfoca en vender — el sistema hace el resto.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Sin código", "Flujos visuales", "Activación inmediata"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-950 text-sm mb-4">Flujo automático de ventas</h4>
                    <div className="flex flex-col gap-2">
                      {[
                        "Lead entra por WhatsApp",
                        "Bot califica y registra en CRM",
                        "Se asigna asesor automáticamente",
                        "Recordatorio si no hay actividad en 2 días",
                        "Deal ganado → factura generada",
                      ].map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                          <span className="text-xs text-slate-700">{step}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-4 font-mono">Se ejecuta automáticamente, sin intervención manual</p>
                  </div>
                </div>
                {/* Broadcast masivo — campañas segmentadas de WhatsApp */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-amber-600 font-mono text-[10px] uppercase tracking-widest font-bold">Broadcast</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Campañas masivas de WhatsApp, sin spam</h2>
                    <p className="text-slate-500 text-xs max-w-2xl mx-auto mt-3 leading-relaxed">
                      Enviá un mismo mensaje a cientos de contactos segmentados por etapa, rubro o ciudad — con nombre personalizado y respetando los límites de WhatsApp Business para no arriesgar tu número.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "Segmentación por etapa", icon: Radio, desc: "Elegí a quién le llega cada campaña: nuevos leads, contactados por el bot, propuestas pendientes o clientes ganados." },
                      { title: "Plantillas aprobadas", icon: FileText, desc: "Mensajes con variables personalizadas (nombre, empresa, monto) usando plantillas de WhatsApp Business API." },
                      { title: "Envío escalonado", icon: Clock, desc: "El envío se distribuye en el tiempo automáticamente para proteger la reputación de tu número." },
                    ].map(({ title, icon: Icon, desc }) => (
                      <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <Icon className="w-5 h-5 text-amber-500 mb-3" />
                        <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Recordatorios automáticos", desc: "Si un deal no tiene actividad en X días, el sistema alerta al responsable automáticamente." },
                    { title: "Seguimiento por WhatsApp", desc: "Enviá mensajes de seguimiento automáticos a leads que no respondieron en 48hs." },
                    { title: "Emails de nurturing", desc: "Secuencias de emails que se disparan según la etapa del lead en el pipeline." },
                    { title: "Facturas automáticas", desc: "Al cerrar un deal como ganado, se genera automáticamente un borrador de factura." },
                    { title: "Sincronización de datos", desc: "Los datos de WhatsApp, CRM y facturación se sincronizan en tiempo real sin intervención." },
                    { title: "Tareas programadas", desc: "Al avanzar una etapa se asignan tareas al equipo correcto automáticamente." },
                  ].map((a) => (
                    <div key={a.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <Zap className="w-5 h-5 text-amber-500 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{a.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.distribuidora}
                  title="Automatización de Ventas y Envíos"
                  description="Distribuidoras mayoristas despachan cientos de pedidos coordinando avisos automáticos de preparación, despacho y factura por WhatsApp."
                />
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Automatizá tu negocio hoy</h3>
                  <p className="text-xs text-slate-500 mt-2">Probalo 14 días gratis y activá tus primeros flujos en minutos.</p>
                  <button id="cta-automatizaciones-cotizar-btn" onClick={() => openLeadForm('cotizador_automatizacion')} className="mt-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Cotizar Automatización de Procesos →</button>
                </div>
              </div>
            )}

            {/* ── SOLUCIÓN: FACTURACIÓN AFIP ── */}
            {activeTab === "afip" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-blue-700 font-mono text-xs uppercase tracking-widest font-bold">Facturación AFIP</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Facturá electrónicamente<br />sin salir del CRM
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Cuando cerrás una venta en el pipeline, Clientum emite la factura electrónica en AFIP (Clase A, B o C) automáticamente. Sin planillas, sin doble carga, sin errores de tipeo.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Homologado con AFIP/ARCA", "Factura A, B y C", "CAE y numeración automática"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button id="cta-afip-cotizar-btn" onClick={() => openLeadForm('cotizador_afip')} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Cotizar Facturación AFIP</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                      <span className="text-xs font-bold text-slate-800">Factura B — Electrónica</span>
                      <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">CAE Aprobado</span>
                    </div>
                    <div className="flex flex-col gap-2 text-[11px] text-slate-500">
                      <div className="flex justify-between"><span>Cliente</span><span className="text-slate-800 font-semibold">Distribuidora del Sur S.A.</span></div>
                      <div className="flex justify-between"><span>CUIT</span><span className="text-slate-800 font-mono">30-71234567-9</span></div>
                      <div className="flex justify-between"><span>Punto de venta</span><span className="text-slate-800 font-mono">0003</span></div>
                      <div className="flex justify-between"><span>CAE</span><span className="text-slate-800 font-mono">74123456789012</span></div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3">
                      <span className="text-xs text-slate-500">Total</span>
                      <span className="text-lg font-black text-slate-900">$250.000</span>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-4 font-mono">Emitida automáticamente al marcar el deal como "Ganado"</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Emisión automática", desc: "Al ganar un deal en el pipeline, se genera y emite la factura sin intervención manual." },
                    { title: "Nota de crédito y débito", desc: "Anulá o corregí facturas emitidas con notas de crédito/débito electrónicas, también automáticas." },
                    { title: "Link de pago incluido", desc: "Cada factura sale con el link de cobro de Mercado Pago listo para compartir por WhatsApp." },
                    { title: "Libro IVA digital", desc: "Exportá tus ventas y compras en el formato que necesita tu contador, sin armar planillas a mano." },
                    { title: "Multi-punto de venta", desc: "Facturá desde varias sucursales o vendedores, cada uno con su propio punto de venta habilitado." },
                    { title: "Historial y reimpresión", desc: "Buscá cualquier factura emitida y volvé a enviarla por email o WhatsApp en un click." },
                  ].map((f) => (
                    <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <FileText className="w-5 h-5 text-blue-700 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.estudio}
                  title="Facturación Homologada AFIP sin Errores"
                  description="Estudios contables, comercios y distribuidores sincronizan comprobantes A, B y C directamente con ARCA / AFIP al momento de cerrar una operación."
                />
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Dejá de facturar a mano</h3>
                  <p className="text-xs text-slate-500 mt-2">Conectá tu CUIT y empezá a emitir facturas homologadas desde tu primera venta.</p>
                  <button id="cta-afip-empezar-btn" onClick={() => openLeadForm('cotizador_afip')} className="mt-5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Solicitar Integración AFIP →</button>
                </div>
              </div>
            )}

            {/* ── SOLUCIÓN: SUSCRIPCIONES MERCADO PAGO ── */}
            {activeTab === "mercadopago" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-sky-600 font-mono text-xs uppercase tracking-widest font-bold">Suscripciones Mercado Pago</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Cobros recurrentes,<br />sin perseguir a nadie
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Conectá tu cuenta de Mercado Pago y cobrá suscripciones, planes mensuales o cuotas de forma automática. El link de pago sale solo al cerrar el deal o al vencer cada ciclo.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Débito automático mensual", "Links de pago por WhatsApp/email", "Conciliación automática en el CRM"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button id="cta-mercadopago-cotizar-btn" onClick={() => openLeadForm('cotizador_mercadopago')} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Cotizar Pasarela Mercado Pago</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-950 text-sm mb-4">Plan Mensual — Distribuidora del Sur</h4>
                    <div className="flex flex-col gap-2">
                      {[
                        "Suscripción creada al cerrar el deal",
                        "Mercado Pago cobra automáticamente el día 1",
                        "CRM marca el pago como recibido",
                        "Si falla el cobro, se reintenta y se avisa por WhatsApp",
                      ].map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                          <span className="text-xs text-slate-700">{step}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-4 font-mono">Sin gestión manual de cobranza</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Suscripciones recurrentes", desc: "Cobrá planes mensuales, trimestrales o anuales con débito automático en tarjeta." },
                    { title: "Links de pago únicos", desc: "Generá un link de cobro por WhatsApp o email para ventas puntuales, sin suscripción." },
                    { title: "Recordatorio de vencimiento", desc: "Si un pago falla o vence, el sistema le avisa al cliente automáticamente por WhatsApp." },
                    { title: "Conciliación automática", desc: "Cada pago recibido actualiza el estado del deal y la factura correspondiente en el CRM." },
                    { title: "Cuotas sin interés", desc: "Ofrecé cuotas a tus clientes usando las promociones activas de Mercado Pago." },
                    { title: "Reportes de cobranza", desc: "Vé qué clientes están al día, cuáles vencen esta semana y cuáles tienen pagos fallidos." },
                  ].map((f) => (
                    <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <CreditCard className="w-5 h-5 text-sky-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.mercadopago_retail}
                  title="Cobranzas y Débitos Recurrentes en Mostrador y Online"
                  description="Comercios y empresas de servicios cobran suscripciones mensuales y ventas puntuales con links de Mercado Pago y conciliación automática."
                />
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Cobrá todos los meses sin pedirlo</h3>
                  <p className="text-xs text-slate-500 mt-2">Conectá Mercado Pago y activá tu primera suscripción hoy mismo.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── SOLUCIÓN: PROSPECCIÓN DE LEADS ── */}
            {activeTab === "leads" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-bold">Prospección de Leads</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Encontrá clientes<br />antes de que te busquen
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Buscá negocios reales de tu zona por rubro y ciudad usando datos de Google Maps, calificalos con IA y sumalos directo a tu pipeline — sin comprar bases de datos viejas.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Datos reales de Google Maps", "Diagnóstico comercial con IA", "Alta directa al CRM en un click"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-950 text-sm mb-4">Prospector IA — Resultado de búsqueda</h4>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Ferretería Central</span>
                        <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">Lead Sugerido</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Diagnóstico IA: sin chatbot, respuestas lentas en Globe, alto volumen de consultas de precio.</p>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-4 font-mono">20 prospectos encontrados en General Roca, Río Negro</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Búsqueda por rubro y ciudad", desc: "Filtrá negocios reales por industria, ciudad y radio de búsqueda usando la API oficial de Google Maps." },
                    { title: "Diagnóstico comercial con IA", desc: "Cada prospecto llega con un análisis de sus puntos débiles digitales, para personalizar tu propuesta." },
                    { title: "Alta directa al pipeline", desc: "Sumá el lead a tu CRM con un click, con toda su información de contacto ya cargada." },
                    { title: "Filtros de calidad", desc: "Descartá negocios sin teléfono, cerrados o con mala puntuación para enfocarte en los leads con más potencial." },
                    { title: "Exportación a CSV", desc: "Descargá tu lista de prospectos para trabajarla en otra herramienta si lo necesitás." },
                    { title: "Definición de cliente ideal", desc: "Con el ICP Builder definís las características de tu cliente ideal antes de salir a buscar." },
                  ].map((f) => (
                    <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <Rocket className="w-5 h-5 text-violet-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.prospeccion_maps}
                  title="Identificación de Nuevas Cuentas y Comercios"
                  description="Fuerzas de venta b2b identifican prospectos geolocalizados en el Alto Valle y Buenos Aires para alimentar sus pipelines comerciales."
                />
                <div className="bg-violet-50 border border-violet-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Tu próximo cliente ya existe, solo falta encontrarlo</h3>
                  <p className="text-xs text-slate-500 mt-2">Probá el Prospectador IA gratis y sumá tus primeros leads hoy.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: PORTAL DEL CLIENTE ── */}
            {activeTab === "portal_cliente" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-teal-600 font-mono text-xs uppercase tracking-widest font-bold">Portal del Cliente</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Tus clientes se<br />autoatienden
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Un portal privado donde cada cliente ve sus facturas, pedidos y cotizaciones. Menos llamadas, más satisfacción.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Con tu marca", "Acceso seguro", "Funciona en celular"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis</button>
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Ver demo del portal</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="bg-slate-100 rounded-xl p-3 mb-4">
                      <span className="text-xs font-bold text-slate-600">Portal de Clientes — Clientum</span>
                      <div className="text-[10px] text-slate-400 mt-1">Bienvenido, Distribuidora del Sur</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Mis Facturas", icon: FileText, count: "12 facturas" },
                        { label: "Mis Pedidos", icon: CheckSquare, count: "5 activos" },
                        { label: "Mis Cotizaciones", icon: Star, count: "3 pendientes" },
                        { label: "Mensajes", icon: MessageSquare, count: "2 nuevos" },
                      ].map(({ label, icon: Icon, count }) => (
                        <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center">
                          <Icon className="w-5 h-5 text-teal-500 mb-2" />
                          <div className="text-xs font-bold text-slate-800">{label}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{count}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Facturas y pagos en línea", desc: "Tus clientes ven sus facturas, el estado de cada pago y pueden consultar el historial completo." },
                    { title: "Seguimiento de pedidos", desc: "Estado en tiempo real de cada pedido, desde la confirmación hasta la entrega." },
                    { title: "Cotizaciones digitales", desc: "Enviá presupuestos que el cliente aprueba con un click, sin imprimir ni llamar." },
                    { title: "Mensajería directa", desc: "Canal de comunicación privado entre tu empresa y cada cliente, sin usar WhatsApp personal." },
                    { title: "Con tu marca", desc: "El portal lleva tu logo, colores y dominio personalizado. Parece propio, no de Clientum." },
                    { title: "Acceso seguro", desc: "Cada cliente tiene su usuario y contraseña. Solo ve sus propios datos, nunca los de otros." },
                  ].map((f) => (
                    <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <LayoutGrid className="w-5 h-5 text-teal-500 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.consorcio}
                  title="Autogestión de Clientes y Propietarios"
                  description="Administraciones y empresas de servicios brindan a sus clientes acceso web para descargar comprobantes, revisar consumos y consultar saldos."
                />
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">Menos llamadas, más satisfacción</h3>
                  <p className="text-xs text-slate-500 mt-2">Tus clientes se autoatienden. Vos te enfocás en crecer.</p>
                  <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Probar gratis →</button>
                </div>
              </div>
            )}

            {/* ── FUNCIONES: DESARROLLO WEB ── */}
            {activeTab === "desarrollo_web" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-slate-600 font-mono text-xs uppercase tracking-widest font-bold">Desarrollo Web</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Tu presencia web,<br />conectada al CRM
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      Sitios web, landing pages y e-commerce integrados con Clientum. Cada visita que convierte entra directo a tu pipeline — nada se pierde.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Diseño moderno y responsivo", "Integrado con WhatsApp y CRM", "Presupuesto en 48 horas"].map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Pedir presupuesto</button>
                      <button onClick={() => { setActiveTab("servicios"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer">Ver servicios</button>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                      <span className="text-slate-400 text-[10px] font-mono">tuempresa.com.ar</span>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 flex flex-col gap-2">
                      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                      <div className="h-3 bg-slate-700 rounded w-full"></div>
                      <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                      <div className="flex gap-2 mt-3">
                        <div className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded-lg">Pedir presupuesto</div>
                        <div className="bg-slate-700 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Ver servicios</div>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[10px] text-center mt-4 font-mono">Diseño moderno — Integrado con CRM</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Sitio web corporativo", desc: "Presencia profesional que genera confianza y captura leads. Diseño moderno, carga rápida y optimizado para Google." },
                    { title: "Landing pages de conversión", desc: "Páginas diseñadas para convertir visitas en leads. Integradas con tu CRM para seguimiento automático." },
                    { title: "Aplicaciones web a medida", desc: "Plataformas que resuelven procesos específicos de tu empresa. Integradas con Clientum desde el día 1." },
                    { title: "E-commerce integrado", desc: "Tienda online sincronizada con tu inventario, CRM y facturación. Pedidos que entran solos al sistema." },
                    { title: "Mantenimiento y hosting", desc: "Servidor, SSL, actualizaciones de seguridad y backups diarios. Tu sitio siempre online y protegido." },
                    { title: "Integración con WhatsApp", desc: "Botón de WhatsApp conectado al chatbot de Clientum. Cada visita puede convertirse en un lead calificado." },
                  ].map((s) => (
                    <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <Code2 className="w-5 h-5 text-slate-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{s.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                {/* E-Commerce — tecnología omnicanal */}
                <div>
                  <div className="text-center mb-10">
                    <span className="text-slate-600 font-mono text-[10px] uppercase tracking-widest font-bold">E-Commerce</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Desarrollo de sitios web con tecnología omnicanal</h2>
                    <p className="text-slate-500 text-xs max-w-2xl mx-auto mt-3 leading-relaxed">
                      Optimizamos la gestión unificada de stocks, logística, tiendas físicas y ecommerce. El 70% del tráfico en Latinoamérica es mobile — diseñamos para que tu tienda cargue rápido y se vea increíble en cualquier dispositivo.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { title: "E-Commerce Website", icon: ShoppingCart, desc: "Sitios que plasman la identidad de tu marca: creatividad y diseño mobile/desktop, UI & UX, testing y QA, integraciones de precio, stock y órdenes." },
                      { title: "Marketplaces", icon: Layers, desc: "Tiendas online escalables y ágiles: creación de cuenta, diseño de piezas gráficas, gestión de cambios y devoluciones, catalogación y atención pre/post venta." },
                      { title: "Plataforma Omnicanal", icon: Workflow, desc: "Un único lugar para controlar precios, stock, órdenes, medios de pago y courier logísticos entre tu sitio propio y los marketplaces." },
                      { title: "Métricas", icon: BarChart2, desc: "Business analytics, optimización de conversión, customer journey, A/B testing y dashboards en tiempo real para decisiones basadas en datos." },
                      { title: "Correos corporativos", icon: Mail, desc: "Cuentas profesionales bajo tu propio dominio, configurables en cualquier dispositivo y con backups propios." },
                      { title: "Diseño UX/UI de calidad", icon: LayoutGrid, desc: "Análisis, wireframing, prototipado, maquetado y desarrollo — soluciones sólidas basadas en el comportamiento real del consumidor." },
                    ].map(({ title, icon: Icon, desc }) => (
                      <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <Icon className="w-5 h-5 text-slate-600 mb-3" />
                        <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PyME Argentina en Acción */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.yendoapp}
                  title="Desarrollo e Ingeniería Web de Alto Rendimiento"
                  description="Casos reales como YendoApp y portales empresariales construidos por nuestro equipo técnico en General Roca y Brasil para clientes en toda la región."
                />

                <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">¿Tenés un proyecto en mente?</h3>
                  <p className="text-xs text-slate-500 mt-2">Contanos qué necesitás y te damos presupuesto en 48 horas.</p>
                  <button id="cta-web-presupuesto-btn" onClick={() => openLeadForm('cotizador_web')} className="mt-5 bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer">Cotizar Proyecto Web / E-Commerce →</button>
                </div>
              </div>
            )}

            {/* ── INDUSTRIAS ── */}
            {activeTab === "industrias" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-[#1A3461] font-mono text-xs uppercase tracking-widest font-bold">Sectores que ya usamos</span>
                  <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                    Clientum se adapta a tu industria
                  </h1>
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                    Ofrecemos soluciones sumamente personalizables. Nos adaptamos a diferentes industrias, escalas de facturación y requerimientos específicos de cada sector.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: "retail", label: "Comercios y Retail", desc: "Chatbot para consultas de stock, CRM de clientes frecuentes, facturación integrada y e-commerce sincronizado con inventario.", icon: ShoppingCart, color: "text-orange-500 bg-orange-50 border-orange-100" },
                    { id: "salud", label: "Salud", desc: "Turnos por WhatsApp, recordatorios automáticos, historia clínica básica integrada al CRM y portal de pacientes.", icon: Stethoscope, color: "text-rose-500 bg-rose-50 border-rose-100" },
                    { id: "agroindustria", label: "Agroindustria", desc: "Gestión de campos, seguimiento de cosechas, facturación de granos y comunicación con proveedores por WhatsApp.", icon: Package, color: "text-lime-600 bg-lime-50 border-lime-100" },
                    { id: "inmobiliaria", label: "Inmobiliaria", desc: "CRM de propiedades y clientes, bots para precalificar interesados, firma digital de contratos y portal de propietarios.", icon: Home, color: "text-teal-500 bg-teal-50 border-teal-100" },
                    { id: "logística", label: "Logística y Distribución", desc: "Seguimiento de pedidos en tiempo real, rutas optimizadas, notificaciones automáticas al destinatario y facturación al cierre.", icon: Truck, color: "text-slate-600 bg-slate-100 border-slate-200" },
                    { id: "industrial", label: "Industrial y Manufactura", desc: "Control de stock de insumos, órdenes de producción, ERP Dolibarr integrado y reportes de márgenes por línea de producto.", icon: Building, color: "text-amber-600 bg-amber-50 border-amber-100" },
                    { id: "automotriz", label: "Automotriz", desc: "CRM de concesionarios, seguimiento de test drives, recordatorios de service y gestión de flota de vehículos.", icon: Compass, color: "text-blue-600 bg-blue-50 border-blue-100" },
                    { id: "medios", label: "Medios y Comunicación", desc: "Gestión de anunciantes, pipelines de pauta publicitaria, facturación de espacios y newsletter automatizado.", icon: Monitor, color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100" },
                    { id: "institucional", label: "Institucional y ONGs", desc: "Gestión de socios, cobro de cuotas por MercadoPago, portal de miembros y comunicación masiva por WhatsApp.", icon: Building, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                  ].map(({ label, desc, icon: Icon, color }) => (
                    <div key={label} className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 border-slate-200`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.split(" ").slice(1).join(" ")}`}>
                        <Icon className={`w-5 h-5 ${color.split(" ")[0]}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{label}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mt-2">{desc}</p>
                      </div>
                      <button
                        onClick={() => { setActiveTab("casos"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-xs font-bold text-[#1A3461] hover:text-emerald-600 transition-colors flex items-center gap-1 mt-auto"
                      >
                        Ver casos de éxito →
                      </button>
                    </div>
                  ))}
                </div>

                {/* ── PYMES EN DIFERENTES INDUSTRIAS ARGENTINAS ── */}
                <ArgentinePymesSection
                  title="Sectores Productivos de Argentina en Acción"
                  subtitle="Comercios minoristas, transporte y logística, agroindustria del Alto Valle y servicios profesionales con soluciones adaptadas a su marco impositivo y operativo."
                  items={[
                    ARGENTINE_PYMES_DATA.lubrano,
                    ARGENTINE_PYMES_DATA.distribuidora,
                    ARGENTINE_PYMES_DATA.consorcio,
                    ARGENTINE_PYMES_DATA.cabarcos,
                  ]}
                  badge="Sectores Productivos"
                />

                <div className="bg-[#1A3461] text-white rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold">¿Tu industria no está en la lista?</h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                    Clientum es modular y configurable. Si tu rubro tiene particularidades, lo adaptamos. Contanos tu negocio y en 48 horas te mostramos cómo quedaría.
                  </p>
                  <button
                    onClick={() => { setActiveTab("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="mt-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Hablar con un especialista →
                  </button>
                </div>
              </div>
            )}

            {/* ── CARRERAS / TRABAJÁ CON NOSOTROS ── */}
            {activeTab === "carreras" && (
              <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-emerald-600 font-mono text-xs uppercase tracking-widest font-bold">Trabajá con Nosotros</span>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight mt-1">
                      Sumate al equipo<br />que digitalizamos la Patagonia
                    </h1>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                      En Clientum construimos tecnología real para PyMEs reales. Si te apasiona el impacto concreto, trabajar con autonomía y aprender rápido, este es tu lugar.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-600">
                      {["Trabajo 100% remoto desde cualquier lugar de Argentina", "Equipo chico, decisiones rápidas y sin burocracia", "Proyectos reales con clientes reales desde el día 1"].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-950 text-sm mb-4">Cultura Clientum</h4>
                    <div className="flex flex-col gap-3">
                      {[
                        { title: "Autonomía real", desc: "Cada integrante tiene ownership de su área. Sin micromanagement." },
                        { title: "Impacto visible", desc: "Lo que hacés se usa al día siguiente. Clientes reales, feedback inmediato." },
                        { title: "Aprendizaje continuo", desc: "Acceso a Clientum Academia, conferencias y cursos de la industria." },
                        { title: "Equipo diverso", desc: "Desarrolladores, marketers, consultores y diseñadores — todos en la misma mesa." },
                      ].map(({ title, desc }) => (
                        <div key={title} className="flex gap-3 items-start border-b border-slate-100 pb-3 last:border-0">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-bold text-slate-800">{title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Posiciones abiertas */}
                <div>
                  <div className="text-center mb-8">
                    <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-widest font-bold">Posiciones abiertas</span>
                    <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-2">Buscamos personas que resuelvan</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { role: "Desarrollador/a Full Stack", type: "Remoto · Full time", skills: ["React / TypeScript", "Node.js / Express", "PostgreSQL", "APIs REST"], desc: "Desarrollás nuevas funciones del CRM, integraciones con servicios externos y mejoras de performance del sistema." },
                      { role: "Consultor/a de Implementación", type: "Remoto · Full time", skills: ["CRM", "Onboarding", "WhatsApp Business", "Excel/Sheets"], desc: "Acompañás a nuevos clientes en su proceso de adopción de Clientum: configuración, capacitación y soporte post-lanzamiento." },
                      { role: "Ejecutivo/a Comercial", type: "Remoto · Full time", skills: ["Ventas B2B", "CRM", "Propuestas", "WhatsApp"], desc: "Prospectás, calificás y cerrás clientes PyME en toda Argentina y Latinoamérica. Comisión sobre ventas + base." },
                      { role: "Diseñador/a UI/UX", type: "Remoto · Part time", skills: ["Figma", "Tailwind CSS", "Mobile first", "Diseño de producto"], desc: "Diseñás nuevas interfaces del CRM, el sitio y las piezas de marketing. Trabajo asíncrono con el equipo de desarrollo." },
                    ].map(({ role, type, skills, desc }) => (
                      <div key={role} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">{role}</h3>
                          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0 font-bold">{type}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold">{s}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => openLeadForm('postulacion_carrera', { position: role, type })}
                          className="mt-auto text-xs font-bold text-[#1A3461] hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Postularme →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipo & Ambiente de Trabajo */}
                <ArgentinePymeDetailBanner
                  item={ARGENTINE_PYMES_DATA.soporte_central}
                  title="Cultura de Trabajo Cercana y Orientada a Resultados"
                  description="Trabajamos con autonomía, herramientas de punta y un foco obsesivo en resolver problemas reales de las empresas argentinas."
                />

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">¿No encontrás tu perfil?</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-lg mx-auto">
                    Mandanos tu CV y contanos en qué podés aportar. Siempre estamos abiertos a perfiles que sorprendan.
                  </p>
                  <button
                    onClick={() => openLeadForm('postulacion_carrera', { position: 'Postulación Espontánea' })}
                    className="mt-5 bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Enviar CV espontáneo →
                  </button>
                </div>
              </div>
            )}

            {/* ── DOCUMENTACIÓN API ── */}
            {activeTab === "documentacion" && (
              <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-slate-600 font-mono text-xs uppercase tracking-widest font-bold">Para Desarrolladores</span>
                  <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
                    API REST & Documentación Técnica
                  </h1>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    Integrá Clientum con tus sistemas propios, automatizaciones externas o herramientas de BI usando nuestra API REST y sistema de webhooks en tiempo real.
                  </p>
                </div>

                {/* Recursos principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { title: "API REST", icon: Terminal, color: "text-emerald-600", desc: "Endpoints autenticados con Bearer Token para leer y escribir contactos, deals, facturas y actividad del CRM desde cualquier sistema externo." },
                    { title: "Webhooks en tiempo real", icon: Workflow, color: "text-blue-600", desc: "Recibí notificaciones instantáneas cuando ocurren eventos: lead creado, deal ganado, pago recibido, factura emitida, mensaje recibido." },
                    { title: "OAuth 2.0 / SSO", icon: Settings, color: "text-violet-600", desc: "Conectá tu sistema de autenticación propio usando el estándar OAuth 2.0. Compatible con Google Workspace, Microsoft 365 y proveedores SAML." },
                  ].map(({ title, icon: Icon, color, desc }) => (
                    <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <Icon className={`w-5 h-5 mb-3 ${color}`} />
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Endpoints disponibles */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-950 text-sm mb-4 border-b border-slate-100 pb-3">Endpoints disponibles</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { method: "GET", path: "/api/contacts", desc: "Listar contactos con filtros de búsqueda" },
                      { method: "POST", path: "/api/contacts", desc: "Crear un nuevo contacto" },
                      { method: "GET", path: "/api/deals", desc: "Obtener deals del pipeline con etapas y valores" },
                      { method: "POST", path: "/api/deals", desc: "Crear un deal y asignarlo a un contacto" },
                      { method: "PATCH", path: "/api/deals/:id/stage", desc: "Avanzar o retroceder la etapa de un deal" },
                      { method: "GET", path: "/api/invoices", desc: "Listar facturas emitidas con estado de pago" },
                      { method: "POST", path: "/api/webhooks", desc: "Registrar un endpoint para recibir eventos" },
                      { method: "GET", path: "/api/activity", desc: "Obtener el log de actividad por contacto o deal" },
                    ].map(({ method, path, desc }) => (
                      <div key={path} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${method === "GET" ? "bg-blue-50 text-blue-700" : method === "POST" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          {method}
                        </span>
                        <code className="text-[11px] font-mono text-slate-800 shrink-0">{path}</code>
                        <span className="text-[11px] text-slate-400 ml-auto text-right">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webhook payload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-slate-950 text-sm mb-3">Eventos de webhook disponibles</h3>
                    <div className="flex flex-col gap-2">
                      {[
                        "lead.created", "lead.qualified", "deal.created",
                        "deal.stage_changed", "deal.won", "deal.lost",
                        "invoice.issued", "invoice.paid", "contact.updated", "message.received"
                      ].map((evt) => (
                        <div key={evt} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                          <code className="text-[11px] font-mono text-slate-700">{evt}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-5 font-mono text-[11px] text-slate-300 leading-relaxed">
                    <div className="text-slate-500 mb-2">// POST a tu endpoint cuando se gana un deal</div>
                    <div><span className="text-emerald-400">"event"</span>: <span className="text-amber-300">"deal.won"</span>,</div>
                    <div><span className="text-emerald-400">"timestamp"</span>: <span className="text-amber-300">"2026-07-17T14:00:00Z"</span>,</div>
                    <div><span className="text-emerald-400">"data"</span>: &#123;</div>
                    <div className="pl-4"><span className="text-emerald-400">"deal_id"</span>: <span className="text-amber-300">"DL-2847"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"company"</span>: <span className="text-amber-300">"Ferretería Central"</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"amount_usd"</span>: <span className="text-blue-400">450</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"invoice_cae"</span>: <span className="text-amber-300">"74123456789012"</span></div>
                    <div>&#125;</div>
                  </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 text-center">
                  <h3 className="text-lg font-display font-bold text-slate-900">¿Necesitás integrar Clientum?</h3>
                  <p className="text-xs text-slate-500 mt-2">Nuestro equipo técnico puede guiarte en la integración. Escribinos y te respondemos en menos de 24 horas hábiles.</p>
                  <button
                    onClick={() => openLeadForm('soporte_ticket', { priority: 'Media', system: 'API & Webhooks' })}
                    className="mt-5 bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Contactar al equipo técnico →
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── PYMES ARGENTINAS EN ACCIÓN (Footer Showcase) ── */}
      <div className="bg-slate-900 border-t border-slate-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <ArgentinePymesSection
            title="Equipos Reales en Argentina Trabajando con Clientum"
            subtitle="Conectamos procesos de ventas, facturación AFIP y atención al cliente para PyMEs de la Patagonia, Buenos Aires, Córdoba, Santa Fe y todo el país."
            items={[
              ARGENTINE_PYMES_DATA.lubrano,
              ARGENTINE_PYMES_DATA.distribuidora,
              ARGENTINE_PYMES_DATA.estudio,
              ARGENTINE_PYMES_DATA.terbay,
            ]}
            badge="Red Federal de Clientes"
          />
        </div>
      </div>

      {/* ── CLIENTUM UNIFIED CORPORATE FOOTER ── */}
      <footer id="clientum_footer_unified" className="bg-[#0b1320] text-white shrink-0 font-sans border-t border-slate-800/80">

        {/* ── TOP SECTION: 4 COLUMNS (Industrias, Soluciones, Leverage, Empezar) ── */}
        <div className="border-b border-slate-800/80 py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Col 1: INDUSTRIAS & CASOS */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                Industrias & Casos
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Comercio y Retail", badge: "RETAIL", category: "retail" },
                  { name: "Salud", badge: "HEALTH", category: "salud" },
                  { name: "Agroindustria", badge: "AGRO", category: "agro" },
                  { name: "Inmobiliaria", badge: "REAL", category: "inmobiliaria" },
                  { name: "Logística & Distribución", badge: "LOG", category: "logistica" },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setIndustryFilter(item.category);
                        setActiveTab("casos");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-sm text-slate-300 hover:text-emerald-400 transition cursor-pointer group text-left w-full"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-500 group-hover:translate-x-1 transition mt-0.5">→</span>
                        <div>
                          <div className="font-medium text-slate-200 text-sm leading-snug">{item.name}</div>
                          <span className="text-[10px] text-slate-500 tracking-wider font-mono uppercase block">{item.badge}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: SOLUCIONES & SERVICIOS */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                Soluciones & Servicios
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "APIs de ChatBot Inteligencia IA", query: "chatbot" },
                  { label: "CRM Inteligencia IA", query: "crm" },
                  { label: "Casacheras IA CRM Inteligencia", query: "casacheras" },
                  { label: "Automatización de Procesos & QA Phase", query: "automatizacion" },
                  { label: "Portales SOS & Automatización", query: "portales" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        setActiveTab("catalogo");
                        setCatalogQuery(item.query);
                        setCatalogCat("");
                        setCatalogPage(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-sm text-slate-300 hover:text-cyan-400 transition cursor-pointer group text-left w-full"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500 group-hover:translate-x-1 transition mt-0.5">→</span>
                        <span className="font-medium text-slate-200 text-sm leading-snug">{item.label}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: # LEVERAGE */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                # Leverage
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Santi/Clientum", desc: "Soluciones inteligentes", tab: "agencia" },
                  { title: "Academia Clientum", desc: "Capacitación continua", tab: "academia" },
                  { title: "Partners", desc: "Red de aliados", tab: "asociacion" },
                  { title: "Contacto", desc: "Equipo dedicado", tab: "contacto" },
                  { title: "Noticias & Prensa", desc: "Históricos de medios", tab: "prensa" },
                ].map((item) => (
                  <li key={item.title}>
                    <button
                      onClick={() => {
                        setActiveTab(item.tab);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:translate-x-1 transition cursor-pointer text-left block w-full"
                    >
                      <div className="font-semibold text-slate-200 text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: EMPEZAR */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                  Empezar
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Transforma tu negocio con automatización IA. Sin código. Sin contratos largos.
                </p>
              </div>
              <button
                onClick={() => openLeadForm("contacto_comercial")}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-sm rounded-lg transition-all transform hover:scale-[1.02] shadow-lg cursor-pointer text-center"
              >
                Suscribirse
              </button>
            </div>

          </div>
        </div>

        {/* ── MIDDLE SECTION: CARACTERÍSTICAS PRINCIPALES ── */}
        <div className="px-6 md:px-12 py-16 border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-10 text-white tracking-tight">
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="group bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">Automatización IA</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Agentes inteligentes para WhatsApp, email y SMS con Hermes Prime.
                </p>
              </div>

              <div className="group bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition text-cyan-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">CRM Completo</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Gestión integral de clientes con seguimiento automático y prospecting.
                </p>
              </div>

              <div className="group bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition text-purple-400">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">Analítica & BI</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Reportes inteligentes y dashboards personalizables en tiempo real.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION: FOOTER DETAILS ── */}
        <div className="px-6 md:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

              {/* CLIENTUM */}
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white mb-3">CLIENTUM</h2>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Plataforma de CRM e Inteligencia Artificial para PyMEs que buscan automatizar y escalar sus operaciones.
                </p>
                <div className="flex gap-3">
                  <a
                    href="mailto:info@clientum.com.ar"
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 text-slate-400 flex items-center justify-center transition-all"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="https://clientum.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 text-slate-400 flex items-center justify-center transition-all"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/5492994110000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 text-slate-400 flex items-center justify-center transition-all"
                    title="WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Producto */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-4">Producto</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "CRM & Automation", tab: "crm" },
                    { label: "WhatsApp Bots", tab: "whatsapp" },
                    { label: "E-invoicing AFIP", tab: "afip" },
                    { label: "Prospecting IA", tab: "prospector" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => { setActiveTab(item.tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recursos */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-4">Recursos</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Documentación", tab: "ayuda" },
                    { label: "Academia Clientum", tab: "academia" },
                    { label: "Blog & Noticias", tab: "prensa" },
                    { label: "Casos de Éxito", tab: "casos" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => { setActiveTab(item.tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-4">Contacto</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-400">General Roca, Río Negro, Argentina</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-400">info@clientum.com.ar</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-400">+54 9 298 6XXX</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Copyright Bar */}
            <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>© {new Date().getFullYear()} Clientum S.R.L. — CUIT: 20-39164538-1 | Todos los derechos reservados.</p>
              <div className="flex gap-6">
                <button onClick={() => { setActiveTab("privacidad"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-slate-300 transition cursor-pointer">
                  Privacidad
                </button>
                <button onClick={() => { setActiveTab("privacidad"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-slate-300 transition cursor-pointer">
                  Términos
                </button>
                <button onClick={() => { setActiveTab("privacidad"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-slate-300 transition cursor-pointer">
                  Cookies
                </button>
              </div>
            </div>

          </div>
        </div>

      </footer>

      {/* Floating Quick Action Badge for Brochure PDF */}
      <button
        onClick={() => setIsBrochureModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-slate-900/90 hover:bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 cursor-pointer no-print"
        title="Abrir y Descargar Brochure Oficial PDF (8 Páginas)"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <FileText className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold tracking-tight">Brochure PDF (8 Págs)</span>
      </button>

      {/* Fullscreen Interactive Brochure Modal */}
      <AnimatePresence>
        {isBrochureModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex flex-col items-center"
          >
            {/* Modal Control Bar */}
            <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl no-print">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">Documento Oficial</span>
                    <span className="text-slate-500 text-[10px]">· 8 Páginas Completo</span>
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Brochure Corporativo & Comercial Clientum</h3>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <PdfExportButton
                  targetId="public-brochure-preview-container"
                  title={`Brochure Corporativo - ${brochureData?.cover?.company || DEFAULT_BROCHURE_DATA.cover.company}`}
                  filename={`Brochure_${(brochureData?.cover?.company || DEFAULT_BROCHURE_DATA.cover.company).replace(/\s+/g, '_')}_2026.pdf`}
                  label="Descargar PDF Oficial"
                  variant="primary"
                  branding={{
                    logoUrl: brochureData?.logoUrl || DEFAULT_BROCHURE_DATA.logoUrl,
                    primaryColor: colorTheme === "forest" ? "#059669" : colorTheme === "amber" ? "#d97706" : colorTheme === "charcoal" ? "#27272a" : "#1a3461",
                    companyName: brochureData?.cover?.company || DEFAULT_BROCHURE_DATA.cover.company
                  }}
                />

                <button
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>

                <button
                  onClick={() => setIsBrochureModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition-all cursor-pointer border border-slate-700"
                  title="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Brochure Container */}
            <div id="public-brochure-preview-container" className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden p-2 sm:p-6 mb-12">
              <BrochurePreview
                data={brochureData || DEFAULT_BROCHURE_DATA}
                colorTheme={colorTheme}
                contactInfo={contact}
                showAllPages={true}
                hidePrices={hidePrices}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universal Public Lead Form Modal */}
      <PublicLeadFormModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        formType={leadModalType}
        initialData={leadModalInitialData}
      />

      {/* Interactive PDF Proposal & Quote Wizard Modal */}
      <InteractiveQuoteWizard
        isOpen={isQuoteWizardOpen}
        onClose={() => setIsQuoteWizardOpen(false)}
      />

      {/* Express Digital & AI Presence Audit Modal */}
      <ExpressAuditModal
        isOpen={isExpressAuditOpen}
        onClose={() => setIsExpressAuditOpen(false)}
        onOpenWizard={() => setIsQuoteWizardOpen(true)}
      />

      {/* Live Social Proof Activity Ticker */}
      <LiveActivityTicker />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenWizard={() => setIsQuoteWizardOpen(true)}
      />

      {/* Contact Form Section */}
      <div id="contact-form" className="p-8 bg-slate-900 border-t border-slate-800">
        <h2 className="text-2xl text-white mb-4 text-center">Contacto</h2>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>

      {/* Floating Interactive WhatsApp CTA & Menu */}
      <FloatingWhatsAppButton
        onOpenWizard={() => setIsQuoteWizardOpen(true)}
      />

      {/* Floating AI WhatsApp Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
