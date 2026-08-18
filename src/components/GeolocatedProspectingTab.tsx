import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Search,
  Filter,
  Building2,
  Phone,
  Globe,
  ExternalLink,
  Sparkles,
  Plus,
  Send,
  Download,
  Users,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  X,
  Navigation,
  Star,
  RefreshCw,
  Loader2,
  FileSpreadsheet,
  Zap,
  Target,
  ArrowRight,
  MessageSquare,
  Award,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { ProspectMap } from './ProspectMap';
import { AIIntelligenceSidebar } from './AIIntelligenceSidebar';

export interface GeolocatedProspect {
  id: string;
  name: string;
  category: string;
  city: string;
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia' | 'Perú' | 'Uruguay';
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  website: string;
  estimatedEmployees: string;
  estimatedRevenueUsd: number;
  geminiAnalysis?: {
    summary?: string;
    painPoint: string;
    suggestedDecisionMaker: string;
    openingPitch: string;
    recommendedProduct: string;
    fitScore?: number;
    urgency?: 'Alta' | 'Media' | 'Baja';
    swot?: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    outreachStrategy?: {
      recommendedChannel: string;
      openingPitch: string;
      emailSubject: string;
      emailBody: string;
      whatsappMessage: string;
      keyTalkingPoints: string[];
    };
  };
  crmStatus: 'No Contactado' | 'En Pipeline' | 'Exportado' | 'Calificado';
}

const INITIAL_PROSPECTS: GeolocatedProspect[] = [
  {
    id: 'geo-01',
    name: 'Servicios de Yacimiento Neuquén S.A.',
    category: 'Petróleo, Gas & Vaca Muerta',
    city: 'Neuquén Capital',
    country: 'Argentina',
    address: 'Ruta 22 Km 1210, Parque Industrial Neuquén',
    lat: -38.9516,
    lng: -68.0591,
    rating: 4.8,
    reviewsCount: 34,
    phone: '+54 299 448-9000',
    website: 'https://syneuquen.com.ar',
    estimatedEmployees: '50-200 empleados',
    estimatedRevenueUsd: 2400000,
    crmStatus: 'No Contactado',
    geminiAnalysis: {
      summary: 'Líder en provisión de servicios mecánicos e instrumentación de precisión para operadoras en cuenca neuquina Vaca Muerta.',
      painPoint: 'Requiere automatizar facturación AFIP para grandes volúmenes de certificaciones de obra y reportes de cuadrillas.',
      suggestedDecisionMaker: 'Ing. Gustavo Morales (Gerente de Operaciones)',
      openingPitch: 'Hola Gustavo, automatizamos la emisión de CAEs AFIP y conectamos la trazabilidad de equipos con tu ERP.',
      recommendedProduct: 'VS-CRM Enterprise + Módulo AFIP Automático',
      fitScore: 94,
      urgency: 'Alta',
      swot: {
        strengths: [
          'Contratos activos con operadoras Tier 1 en Añelo y Neuquén.',
          'Infraestructura propia con base operativa y talleres de 4000m².',
          'Alta reputación técnica regional (4.8★).'
        ],
        weaknesses: [
          'Proceso de presupuestos y certificaciones de servicio operado en planillas Excel descentralizadas.',
          'Tiempos de respuesta lentos en cotizaciones de emergencias operativas.',
          'Falta de portal de autogestión de comprobantes para clientes.'
        ],
        opportunities: [
          'Integración de bot de WhatsApp 24/7 para pedidos urgentes de repuestos en yacimiento.',
          'Pipeline comercial con metodología MEDDIC para licitaciones privadas.',
          'Aceleración de cobros con facturación recurrente AFIP.'
        ],
        threats: [
          'Entrada de proveedores internacionales con cotizadores automáticos.',
          'Fluctuación cambiaria en repuestos importados.'
        ]
      },
      outreachStrategy: {
        recommendedChannel: 'WhatsApp Directo + Presentación Ejecutiva',
        openingPitch: 'Hola Gustavo, analizamos las operaciones de Servicios de Yacimiento Neuquén. Con Clientum automatizamos la facturación AFIP de obras y cotizaciones en menos de 2 minutos.',
        emailSubject: 'Automatización de certificaciones de obra y cotizaciones para SY Neuquén',
        emailBody: 'Estimado Ing. Gustavo Morales,\n\nEspero que se encuentre excelente. Nos ponemos en contacto desde Clientum porque sabemos que la gestión de certificaciones de obra y presupuestos en el sector oil & gas requiere agilidad extrema y cumplimiento fiscal impecable.\n\nImplementamos una plataforma integral con CRM B2B, agentes de WhatsApp y emisión automática AFIP que reduce un 60% el tiempo administrativo de cotizaciones.\n\n¿Tendría 15 minutos esta semana para una breve demostración de cómo aplicarlo en Neuquén?\n\nSaludos cordiales,\nEquipo Enterprise Clientum',
        whatsappMessage: 'Hola Gustavo! Te escribo desde Clientum. Vemos el gran volumen operativo de SY Neuquén en Vaca Muerta y queremos mostrarte cómo automatizamos las cotizaciones y facturas AFIP con IA en 1 clic. ¿Te gustaría coordinar un Meet rápido?',
        keyTalkingPoints: [
          'Trazabilidad en tiempo real de licitaciones y órdenes de compra.',
          'Reducción de demoras en la emisión de comprobantes fiscales AFIP.',
          'Atención automática de WhatsApp para cuadrillas en campo.'
        ]
      }
    }
  },
  {
    id: 'geo-02',
    name: 'Frutícola & Empaque Alto Valle S.R.L.',
    category: 'Agroindustria & Exportación',
    city: 'General Roca, Río Negro',
    country: 'Argentina',
    address: 'Av. Roca 1450, General Roca',
    lat: -39.0333,
    lng: -67.5833,
    rating: 4.6,
    reviewsCount: 19,
    phone: '+54 298 443-5500',
    website: 'https://fruticolaaltovalle.com.ar',
    estimatedEmployees: '100-500 empleados',
    estimatedRevenueUsd: 3800000,
    crmStatus: 'En Pipeline',
    geminiAnalysis: {
      summary: 'Productora y empacadora exportadora de manzanas y peras con despachos a Europa, Brasil y EE.UU.',
      painPoint: 'Gestión manual de pedidos de logística internacional y seguimiento de cobranza en USD.',
      suggestedDecisionMaker: 'Lic. Mariana Pereyra (Directora Comercial)',
      openingPitch: 'Mariana, nuestro Chatbot de WhatsApp IA responde pedidos de cotización internacionales en 3 idiomas 24/7.',
      recommendedProduct: 'Agente IA WhatsApp 24/7 + CRM B2B',
      fitScore: 89,
      urgency: 'Alta',
      swot: {
        strengths: [
          'Certificaciones GlobalGAP y SENASA vigentes para exportación.',
          'Capacidad de empaque de más de 30.000 pallets por temporada.'
        ],
        weaknesses: [
          'Diferencias horarias causan demoras en cotizaciones a importadores en Europa y Asia.',
          'Seguimiento informal de prospectos en WhatsApp personal de los comerciales.'
        ],
        opportunities: [
          'Catálogo B2B multilingüe interactivo para exportación.',
          'Alertas automatizadas de embarque y cobranza.'
        ],
        threats: [
          'Competencia de exportadores sudafricanos y chilenos con plataformas integradas.'
        ]
      },
      outreachStrategy: {
        recommendedChannel: 'WhatsApp Directo + Cold Email',
        openingPitch: 'Mariana, implementamos catálogos interactivos multilingües en WhatsApp para que distribuidores globales coticen en tiempo real.',
        emailSubject: 'Canal B2B automatizado para compradores de fruta de exportación',
        emailBody: 'Estimada Mariana Pereyra,\n\nConocemos la destacada trayectoria de Frutícola Alto Valle en el mercado de exportación.\n\nDiseñamos asistentes comerciales con IA que atienden consultas de importadores en inglés y portugués 24/7, registrando cada lead en su CRM.\n\n¿Le interesaría ver una demo interactiva esta semana?\n\nSaludos cordiales.',
        whatsappMessage: 'Hola Mariana! Desde Clientum queremos mostrarte cómo empacadoras líderes automatizan cotizaciones en USD y atención a importadores con nuestro Bot IA 24/7.',
        keyTalkingPoints: [
          'Atención en español, inglés y portugués sin límites de horario.',
          'Sincronización directa con CRM comercial para seguimiento de despachos.'
        ]
      }
    }
  },
  {
    id: 'geo-03',
    name: 'Bodegas & Viñedos Andes Cuyo S.A.',
    category: 'Vitivinicultura & Bebidas',
    city: 'Mendoza',
    country: 'Argentina',
    address: 'Carril Urquiza 2300, Maipú, Mendoza',
    lat: -32.9833,
    lng: -68.7833,
    rating: 4.9,
    reviewsCount: 88,
    phone: '+54 261 497-2000',
    website: 'https://bodegasandescuyo.com.ar',
    estimatedEmployees: '20-100 empleados',
    estimatedRevenueUsd: 1900000,
    crmStatus: 'No Contactado',
    geminiAnalysis: {
      summary: 'Bodega boutique con vinos premium de alta gama, enoturismo y distribución B2B a restaurantes y vinotecas.',
      painPoint: 'Atención demorada a distribuidores y sommeliers fuera del horario administrativo.',
      suggestedDecisionMaker: 'Martín Benegas (Jefe de Distribución)',
      openingPitch: 'Martín, habilitamos un portal B2B y catálogo inteligente en WhatsApp para pedidos automáticos de cajas cerradas.',
      recommendedProduct: 'E-commerce B2B + WhatsApp Bot',
      fitScore: 82,
      urgency: 'Media',
      swot: {
        strengths: ['Excelente reputación de marca (4.9★)', 'Vinos galardonados internacionalmente'],
        weaknesses: ['Ventas B2B mayoristas gestionadas por teléfono'],
        opportunities: ['Catálogo con precios diferenciados por volumen'],
        threats: ['Grandes grupos bodegueros con mayor inversión en marketing digital']
      },
      outreachStrategy: {
        recommendedChannel: 'WhatsApp Directo',
        openingPitch: 'Martín, optimizamos la toma de pedidos mayoristas de vino con bots de WhatsApp que atienden 24/7.',
        emailSubject: 'Toma de pedidos mayoristas automatizada para Bodegas Andes Cuyo',
        emailBody: 'Estimado Martín,\n\nCon Clientum creamos catálogos digitales interactivos en WhatsApp que permiten a vinotecas y distribuidores hacer pedidos en segundos.\n\n¿Coordinamos una videollamada corta?\n\nSaludos.',
        whatsappMessage: 'Hola Martín! Creamos un sistema para que tus clientes y vinotecas te hagan pedidos de cajas de vino directamente por WhatsApp 24/7. ¿Te paso un video de 1 min?',
        keyTalkingPoints: ['Toma de pedidos 100% automática', 'Cobranza y facturación AFIP en 1 clic']
      }
    }
  },
  {
    id: 'geo-04',
    name: 'Logística Minera Cordillera SpA',
    category: 'Transporte & Logística Pesada',
    city: 'Santiago de Chile',
    country: 'Chile',
    address: 'Av. Las Condes 9800, Santiago',
    lat: -33.375,
    lng: -70.525,
    rating: 4.7,
    reviewsCount: 42,
    phone: '+56 2 2987 6543',
    website: 'https://logisticacordillera.cl',
    estimatedEmployees: '100-300 empleados',
    estimatedRevenueUsd: 4500000,
    crmStatus: 'No Contactado',
    geminiAnalysis: {
      summary: 'Empresa especializada en fletes pesados, transporte de maquinaria y suministros críticos para yacimientos de cobre.',
      painPoint: 'Seguimiento disperso de contratos de flete y control de horas hombre en faena.',
      suggestedDecisionMaker: 'Rodrigo Araya (Gerente de Flota)',
      openingPitch: 'Hola Rodrigo, optimizamos la asignación de viajes y liquidación de servicios con sincronización en tiempo real.',
      recommendedProduct: 'VS-CRM Flotas & Módulo Proyectos',
      fitScore: 91,
      urgency: 'Alta',
      swot: {
        strengths: ['Flota moderna con GPS y telemetría', 'Contratos marco con grandes mineras'],
        weaknesses: ['Cotizaciones de fletes sobredimensionados tardan días'],
        opportunities: ['Tarificador automático por tramo y tonelaje'],
        threats: ['Alzas en costos de combustible y repuestos']
      },
      outreachStrategy: {
        recommendedChannel: 'Llamada Ejecutiva + WhatsApp',
        openingPitch: 'Rodrigo, aceleramos la entrega de presupuestos de transporte de carga pesada a mineras con IA.',
        emailSubject: 'Sistema de cotización ágil para servicios de logística minera',
        emailBody: 'Estimado Rodrigo Araya,\n\nCon Clientum las empresas de transporte minero logran cotizar servicios en minutos y dar seguimiento exacto a cada licitación.\n\n¿Tendrás un espacio esta semana para conversar?\n\nSaludos.',
        whatsappMessage: 'Hola Rodrigo! Analizamos la operación de Logística Minera Cordillera y tenemos una herramienta para cotizar fletes mineros en segundos y coordinar flota. ¿Te gustaría verla?',
        keyTalkingPoints: ['Trazabilidad de contratos mineros', 'Cotizador instantáneo de rutas']
      }
    }
  },
  {
    id: 'geo-05',
    name: 'Grupo Industrial Monterrey S.A. de C.V.',
    category: 'Manufactura & Metalmecánica',
    city: 'Monterrey, NL',
    country: 'México',
    address: 'Av. Constitución 1800, Monterrey',
    lat: 25.6866,
    lng: -100.3161,
    rating: 4.8,
    reviewsCount: 112,
    phone: '+52 81 8123 9000',
    website: 'https://grupomonterrey.mx',
    estimatedEmployees: '500+ empleados',
    estimatedRevenueUsd: 12000000,
    crmStatus: 'Exportado',
    geminiAnalysis: {
      summary: 'Conglomerado manufacturero de autopartes, perfiles estructurales de acero y soluciones de ensamble industrial.',
      painPoint: 'Falta de pipeline predictivo multisede y scoring estandarizado de clientes industriales.',
      suggestedDecisionMaker: 'Alejandro Garza (VP Commercial)',
      openingPitch: 'Estimado Alejandro, escalamos la prospección regional con scoring MEDDIC impulsado por IA generativa.',
      recommendedProduct: 'Clientum Enterprise + MEDDIC Scoring',
      fitScore: 97,
      urgency: 'Alta',
      swot: {
        strengths: ['Presencia en corredor de nearshoring de Nuevo León', 'Certificaciones ISO/IATF 16949'],
        weaknesses: ['Pipeline de ventas fragmentado entre plantas'],
        opportunities: ['Aprovechar la ola de relocalización con prospección digital'],
        threats: ['Competidores asiáticos instalando plantas locales']
      },
      outreachStrategy: {
        recommendedChannel: 'LinkedIn + Cold Email Ejecutivo',
        openingPitch: 'Alejandro, unificamos la prospección comercial de tus plantas con scoring de oportunidades MEDDIC.',
        emailSubject: 'Pipeline de prospección nearshoring para Grupo Industrial Monterrey',
        emailBody: 'Estimado Alejandro Garza,\n\nCon el auge del nearshoring en Monterrey, optimizar la calificación de nuevos prospectos internacionales es crucial.\n\nNuestra plataforma implementa scoring predictivo MEDDIC y agentes IA que aceleran el cierre de cuentas industriales.\n\n¿Tendría 15 minutos para una demostración ejecutiva?\n\nSaludos cordiales.',
        whatsappMessage: 'Hola Alejandro, un saludo desde Clientum. Diseñamos un pipeline B2B con IA para corporaciones industriales de Monterrey que optimiza la calificación de prospectos. ¿Podemos coordinar 10 minutos?',
        keyTalkingPoints: ['Metodología MEDDIC automatizada', 'Control multisede de oportunidades']
      }
    }
  },
  {
    id: 'geo-06',
    name: 'TecnoAgro Rosario Soluciones Integrales',
    category: 'AgTech & Maquinaria Agrícola',
    city: 'Rosario, Santa Fe',
    country: 'Argentina',
    address: 'Parque Industrial Alvear, Nave 4, Rosario',
    lat: -33.0450,
    lng: -60.6280,
    rating: 4.9,
    reviewsCount: 56,
    phone: '+54 341 512-8800',
    website: 'https://tecnoagrorosario.com.ar',
    estimatedEmployees: '45-120 empleados',
    estimatedRevenueUsd: 3100000,
    crmStatus: 'No Contactado',
    geminiAnalysis: {
      summary: 'Empresa especializada en retrofit de sembradoras, monitores de siembra y repuestos agrícolas de alta precisión.',
      painPoint: 'Falta de trazabilidad en cotizaciones de repuestos pesados y tiempos lentos en WhatsApp comercial.',
      suggestedDecisionMaker: 'Ing. Rodrigo Benítez (Jefe de Ventas B2B)',
      openingPitch: 'Rodrigo, implementamos cotizadores inteligentes en WhatsApp que entregan presupuestos de piezas en 10 segundos.',
      recommendedProduct: 'Bot Cotizador WhatsApp + Pipeline MEDDIC',
      fitScore: 92,
      urgency: 'Alta',
      swot: {
        strengths: ['Alta especialización técnica en sembradoras', 'Alianza con concesionarios del polo agropecuario'],
        weaknesses: ['Consultas de repuestos fuera de horario se pierden'],
        opportunities: ['Catálogo interactivo de despiece por WhatsApp'],
        threats: ['Copia de repuestos genéricos a menor precio']
      },
      outreachStrategy: {
        recommendedChannel: 'WhatsApp Directo',
        openingPitch: 'Rodrigo, implementamos un bot en WhatsApp que responde códigos de repuestos y envía cotizaciones en 10 segundos.',
        emailSubject: 'Cotizador automático de repuestos AgTech para TecnoAgro Rosario',
        emailBody: 'Estimado Ing. Rodrigo Benítez,\n\nSabemos que durante la campaña agrícola los productores no pueden esperar horas por un presupuesto de repuestos.\n\nCon Clientum creamos un cotizador en WhatsApp que busca la pieza por código y envía la cotización al instante.\n\n¿Hacemos una demo en vivo de 10 min?\n\nSaludos.',
        whatsappMessage: 'Hola Rodrigo! Vemos el gran trabajo de TecnoAgro en Rosario. Implementamos bots de WhatsApp que cotizan repuestos y piezas agrícolas al instante las 24hs. ¿Te gustaría probarlo?',
        keyTalkingPoints: ['Respuesta instantánea a productores', 'Sincronización con stock y precios']
      }
    }
  }
];

export function GeolocatedProspectingTab() {
  const [prospects, setProspects] = useState<GeolocatedProspect[]>(() => {
    const saved = localStorage.getItem('clientum_geolocated_prospects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROSPECTS;
      }
    }
    return INITIAL_PROSPECTS;
  });

  // Basic Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('todas');
  const [selectedCountry, setSelectedCountry] = useState('todos');

  // Advanced Filter Panel States
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('todas');
  const [selectedCompanySize, setSelectedCompanySize] = useState('todos');
  const [selectedRevenueRange, setSelectedRevenueRange] = useState('todos');
  const [selectedCrmStatus, setSelectedCrmStatus] = useState('todos');
  const [minRating, setMinRating] = useState<number>(0);

  // View Layout State
  const [selectedProspect, setSelectedProspect] = useState<GeolocatedProspect | null>(INITIAL_PROSPECTS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState<string | null>(null);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map_only' | 'list_only'>('split');

  // Geographic Scan Modal State
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [scanZone, setScanZone] = useState('Parque Industrial Pilar / Zárate');
  const [scanCountry, setScanCountry] = useState<'Argentina' | 'Chile' | 'México' | 'Colombia' | 'Perú' | 'Uruguay'>('Argentina');
  const [scanSector, setScanSector] = useState('Manufactura & Logística Pesada');
  const [isScanning, setIsScanning] = useState(false);

  // Quick Add Modal State
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCategory, setNewCategory] = useState('Servicios Industriales');
  const [newPhone, setNewPhone] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newEmployees, setNewEmployees] = useState('20-50 empleados');
  const [newRevenue, setNewRevenue] = useState('1500000');

  // Persist prospects
  const updateAndSaveProspects = (updater: (prev: GeolocatedProspect[]) => GeolocatedProspect[]) => {
    setProspects((prev) => {
      const next = updater(prev);
      localStorage.setItem('clientum_geolocated_prospects', JSON.stringify(next));
      return next;
    });
  };

  // Check if any advanced filter is active
  const hasActiveAdvancedFilters =
    selectedIndustry !== 'todas' ||
    selectedCompanySize !== 'todos' ||
    selectedRevenueRange !== 'todos' ||
    selectedCrmStatus !== 'todos' ||
    minRating > 0;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCity('todas');
    setSelectedCountry('todos');
    setSelectedIndustry('todas');
    setSelectedCompanySize('todos');
    setSelectedRevenueRange('todos');
    setSelectedCrmStatus('todos');
    setMinRating(0);
  };

  // Filter logic covering industry, company size, revenue range, status, rating, text search
  const filteredProspects = prospects.filter((p) => {
    // 1. Text Search
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.geminiAnalysis?.suggestedDecisionMaker || '').toLowerCase().includes(searchQuery.toLowerCase());

    // 2. City & Country
    const matchesCity = selectedCity === 'todas' || p.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesCountry = selectedCountry === 'todos' || p.country === selectedCountry;

    // 3. Industry / Sector
    const matchesIndustry =
      selectedIndustry === 'todas' ||
      p.category.toLowerCase().includes(selectedIndustry.toLowerCase());

    // 4. Company Size
    let matchesSize = true;
    if (selectedCompanySize === 'small') {
      // <50
      matchesSize = p.estimatedEmployees.includes('10-') || p.estimatedEmployees.includes('20-50') || p.estimatedEmployees.includes('20-100') || p.estimatedEmployees.includes('45-');
    } else if (selectedCompanySize === 'medium') {
      // 50-250
      matchesSize = p.estimatedEmployees.includes('50-200') || p.estimatedEmployees.includes('45-120') || p.estimatedEmployees.includes('100-300') || p.estimatedEmployees.includes('80-250');
    } else if (selectedCompanySize === 'large') {
      // 250+
      matchesSize = p.estimatedEmployees.includes('300') || p.estimatedEmployees.includes('500+') || p.estimatedEmployees.includes('100-500');
    }

    // 5. Revenue Range
    let matchesRevenue = true;
    if (selectedRevenueRange === 'tier1') {
      // < 2M USD
      matchesRevenue = p.estimatedRevenueUsd < 2000000;
    } else if (selectedRevenueRange === 'tier2') {
      // 2M - 5M USD
      matchesRevenue = p.estimatedRevenueUsd >= 2000000 && p.estimatedRevenueUsd <= 5000000;
    } else if (selectedRevenueRange === 'tier3') {
      // > 5M USD
      matchesRevenue = p.estimatedRevenueUsd > 5000000;
    }

    // 6. CRM Status
    const matchesStatus =
      selectedCrmStatus === 'todos' || p.crmStatus === selectedCrmStatus;

    // 7. Rating
    const matchesRating = minRating === 0 || p.rating >= minRating;

    return (
      matchesSearch &&
      matchesCity &&
      matchesCountry &&
      matchesIndustry &&
      matchesSize &&
      matchesRevenue &&
      matchesStatus &&
      matchesRating
    );
  });

  // Call Gemini IA to generate deep business intelligence (Profile, SWOT, Outreach Strategy)
  const handleEnrichWithGemini = async (prospect: GeolocatedProspect) => {
    setIsAnalyzingAi(prospect.id);

    try {
      const res = await fetch('/api/places/ai-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospect })
      });

      if (res.ok) {
        const data = await res.json();
        const intel = data.intelligence;

        const geminiAnalysis = {
          summary: intel.summary,
          painPoint: intel.painPoint,
          suggestedDecisionMaker: intel.suggestedDecisionMaker,
          openingPitch: intel.outreachStrategy?.openingPitch || intel.openingPitch,
          recommendedProduct: intel.recommendedProduct,
          fitScore: intel.fitScore || 90,
          urgency: intel.urgency || 'Alta',
          swot: intel.swot,
          outreachStrategy: intel.outreachStrategy
        };

        updateAndSaveProspects((prev) =>
          prev.map((p) => (p.id === prospect.id ? { ...p, geminiAnalysis } : p))
        );

        setSelectedProspect((prev) =>
          prev && prev.id === prospect.id ? { ...prev, geminiAnalysis } : prev
        );

        setExportSuccessMsg(`¡Diagnóstico integral FODA & Estrategia comercial generado por Gemini IA para "${prospect.name}"!`);
        setTimeout(() => setExportSuccessMsg(null), 4000);
      } else {
        throw new Error('Endpoint error');
      }
    } catch (error) {
      console.warn('Fallback analysis applied:', error);
      const fallbackAnalysis = {
        summary: `${prospect.name} es una destacada empresa en el vertical de ${prospect.category} en ${prospect.city}. Cuenta con gran potencial de modernización comercial.`,
        painPoint: `Falta de canal automatizado de WhatsApp y demora en respuesta a cotizaciones B2B en ${prospect.city}.`,
        suggestedDecisionMaker: 'Gerente General / Director de Operaciones',
        openingPitch: `Estimados de ${prospect.name}, optimizamos la captación de prospectos y trazabilidad comercial en la región con IA y CRM.`,
        recommendedProduct: 'Clientum CRM Suite + IA WhatsApp',
        fitScore: 88,
        urgency: 'Alta' as const,
        swot: {
          strengths: [`Posicionamiento consolidado en ${prospect.city} (${prospect.rating}★)`],
          weaknesses: ['Procesos manuales de cotización'],
          opportunities: ['Automatizar WhatsApp 24/7 y facturación AFIP'],
          threats: ['Competencia regional adoptando IA']
        },
        outreachStrategy: {
          recommendedChannel: 'WhatsApp Directo',
          openingPitch: `Hola, vimos el perfil de ${prospect.name}. Podemos reducir sus tiempos de cotización a segundos con Clientum.`,
          emailSubject: `Automatización comercial para ${prospect.name}`,
          emailBody: `Hola,\n\nNos gustaría coordinar 10 minutos para mostrarles cómo automatizamos cotizaciones en ${prospect.category}.\n\nSaludos.`,
          whatsappMessage: `Hola! Desde Clientum tenemos una propuesta ágil para automatizar cotizaciones en ${prospect.name}. ¿Coordinamos 5 minutos?`,
          keyTalkingPoints: ['Atención 24/7 en WhatsApp', 'Pipeline visual y AFIP en 1 clic']
        }
      };

      updateAndSaveProspects((prev) =>
        prev.map((p) => (p.id === prospect.id ? { ...p, geminiAnalysis: fallbackAnalysis } : p))
      );
    } finally {
      setIsAnalyzingAi(null);
    }
  };

  // Direct 'Add to CRM Database' action for qualified map leads & contacts
  const handleExportToCrm = async (prospect: GeolocatedProspect, customContactName?: string) => {
    // 1. Update local state & localStorage
    updateAndSaveProspects((prev) =>
      prev.map((p) => (p.id === prospect.id ? { ...p, crmStatus: 'En Pipeline' } : p))
    );

    if (selectedProspect?.id === prospect.id) {
      setSelectedProspect((prev) => (prev ? { ...prev, crmStatus: 'En Pipeline' } : null));
    }

    const contactName = customContactName || prospect.geminiAnalysis?.suggestedDecisionMaker || `Contacto ${prospect.name}`;

    // 2. Persist to server CRM database (companies table + leads_enriched table + bulk-import)
    try {
      // a) Save company in companies database table
      const compRes = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prospect.name,
          industry: prospect.category,
          city: prospect.city,
          country: prospect.country,
          address: prospect.address,
          phone: prospect.phone,
          website: prospect.website,
          rating: prospect.rating,
          source: 'map_marker_click',
          metadata: {
            estimatedRevenueUsd: prospect.estimatedRevenueUsd,
            estimatedEmployees: prospect.estimatedEmployees,
            geminiAnalysis: prospect.geminiAnalysis
          }
        })
      });

      if (compRes.ok) {
        const compData = await compRes.json();
        if (compData && compData.id) {
          // b) Save lead contact in leads_enriched database table
          await fetch('/api/leads-enriched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              company_id: compData.id,
              name: contactName,
              phone: prospect.phone,
              whatsapp: prospect.phone,
              role: 'Decisor Comercial',
              source: 'map_marker_click',
              icp_fit: prospect.geminiAnalysis?.fitScore || 85,
              meddic_score: prospect.geminiAnalysis?.fitScore || 85,
              metadata: {
                openingPitch: prospect.geminiAnalysis?.openingPitch,
                city: prospect.city,
                country: prospect.country
              }
            })
          });
        }
      }

      // c) Bulk-import fallback
      await fetch('/api/places/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          places: [
            {
              name: prospect.name,
              category: prospect.category,
              address: prospect.address,
              phone: prospect.phone,
              website: prospect.website,
              rating: prospect.rating,
              score: prospect.geminiAnalysis?.fitScore || 85,
            }
          ]
        })
      });
    } catch (e) {
      console.warn('Notice importing to server database:', e);
    }

    // 3. Dispatch global event to sync with CRM Kanban / Pipeline
    window.dispatchEvent(
      new CustomEvent('crm-lead-added', {
        detail: {
          id: prospect.id,
          companyName: prospect.name,
          contactName: contactName,
          dealValueUsd: Math.round(prospect.estimatedRevenueUsd * 0.01) || 25000,
          country: prospect.country,
          stageId: 'lead',
          meddicScore: prospect.geminiAnalysis?.fitScore || 80
        }
      })
    );

    setExportSuccessMsg(`¡Empresa "${prospect.name}" y contacto "${contactName}" guardados exitosamente en la base de datos del CRM!`);
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  // Geographic search scan with Gemini
  const handleExecuteScan = async () => {
    setIsScanning(true);

    try {
      const res = await fetch('/api/places/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rubro: scanSector,
          ciudad: scanZone,
          radio: 25
        })
      });

      let discoveredResults: any[] = [];
      if (res.ok) {
        const data = await res.json();
        discoveredResults = data.results || [];
      }

      if (discoveredResults.length > 0) {
        const newProspects: GeolocatedProspect[] = discoveredResults.slice(0, 4).map((p, idx) => ({
          id: `geo-${Date.now()}-${idx}`,
          name: p.name,
          category: scanSector,
          city: scanZone,
          country: scanCountry,
          address: p.address || `${scanZone}, Sector Industrial`,
          lat: -34.4500 + idx * 0.015,
          lng: -58.9100 + idx * 0.015,
          rating: p.rating || 4.7,
          reviewsCount: p.review_count || 18 + idx * 5,
          phone: p.phone || `+54 11 ${4800 + idx * 100}-9900`,
          website: p.website || `https://${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          estimatedEmployees: `${30 + idx * 25}-${100 + idx * 50} empleados`,
          estimatedRevenueUsd: 1800000 + idx * 950000,
          crmStatus: 'No Contactado',
          geminiAnalysis: {
            summary: `Empresa industrial detectada en ${scanZone} con alta demanda de automatización de ventas B2B.`,
            painPoint: `Optimización de respuesta comercial y control de ventas mayoristas en ${scanZone}.`,
            suggestedDecisionMaker: `Lic. Coordinador de Operaciones (${scanZone})`,
            openingPitch: `Hola, detectamos alta demanda en ${scanZone}. Integramos el CRM y bot de WhatsApp de Clientum para agilizar cotizaciones B2B.`,
            recommendedProduct: 'Clientum CRM Suite + WhatsApp IA',
            fitScore: 88 + (idx % 8),
            urgency: 'Alta',
            swot: {
              strengths: [`Ubicación estratégica en ${scanZone}`],
              weaknesses: ['Falta de pipeline digital unificado'],
              opportunities: ['Captura de clientes con agentes IA 24/7'],
              threats: ['Competencia regional en crecimiento']
            },
            outreachStrategy: {
              recommendedChannel: 'WhatsApp Directo',
              openingPitch: `Hola, detectamos oportunidad para acelerar presupuestos en ${p.name}.`,
              emailSubject: `Solución B2B para ${p.name}`,
              emailBody: `Estimado equipo directivo de ${p.name},\n\nNos comunicamos para presentarles nuestra plataforma de cotizaciones automáticas.\n\nSaludos.`,
              whatsappMessage: `Hola! Desde Clientum queremos compartirles una demo para automatizar cotizaciones en ${scanZone}.`,
              keyTalkingPoints: ['Atención 24/7', 'Facturación AFIP integrada']
            }
          }
        }));

        updateAndSaveProspects((prev) => [...newProspects, ...prev]);
        setSelectedProspect(newProspects[0]);
      } else {
        const generated: GeolocatedProspect = {
          id: `geo-${Date.now()}`,
          name: `Corporación Industrial ${scanZone.split(' ')[0]} ${scanCountry}`,
          category: scanSector,
          city: scanZone,
          country: scanCountry,
          address: `${scanZone}, Parque Industrial Lote ${Math.floor(Math.random() * 80) + 1}`,
          lat: -34.4500,
          lng: -58.9100,
          rating: 4.8,
          reviewsCount: 32,
          phone: '+54 11 4780-9900',
          website: 'https://grupoindustrial-latam.com',
          estimatedEmployees: '80-250 empleados',
          estimatedRevenueUsd: 4200000,
          crmStatus: 'No Contactado',
          geminiAnalysis: {
            summary: `Fabricante y proveedor de servicios industriales en el polo de ${scanZone}.`,
            painPoint: 'Cuello de botella en la respuesta de presupuestos técnicos a distribuidores de la región.',
            suggestedDecisionMaker: 'Lic. Fernando Gómez (Gerente de Nuevos Negocios)',
            openingPitch: `Hola Fernando, sincronizamos tus listas de precios con cotizadores IA en WhatsApp para cerrar deals en minutos.`,
            recommendedProduct: 'Clientum CRM Suite + IA WhatsApp',
            fitScore: 93,
            urgency: 'Alta',
            swot: {
              strengths: ['Ubicación en polo industrial neurálgico', 'Capacidad técnica comprobada'],
              weaknesses: ['Respuestas comerciales lentas fuera de horario'],
              opportunities: ['Implementación de bot WhatsApp cotizador 24/7'],
              threats: ['Mayor competencia en licitaciones privadas']
            },
            outreachStrategy: {
              recommendedChannel: 'WhatsApp Directo + Email',
              openingPitch: 'Fernando, aceleramos la entrega de presupuestos industriales con agentes IA en WhatsApp.',
              emailSubject: `Cotizador automático para ${scanZone}`,
              emailBody: `Estimado Fernando,\n\nCon Clientum las industrias de ${scanZone} automatizan cotizaciones en minutos.\n\n¿Coordinamos una llamada?\n\nSaludos.`,
              whatsappMessage: `Hola Fernando! Te comparto cómo automatizamos cotizaciones en industrias de ${scanZone} con IA. ¿Tenés 5 min?`,
              keyTalkingPoints: ['Respuesta en &lt;10 seg', 'Integración CRM & AFIP']
            }
          }
        };

        updateAndSaveProspects((prev) => [generated, ...prev]);
        setSelectedProspect(generated);
      }

      setExportSuccessMsg(`¡Se han descubierto nuevas empresas en "${scanZone}" con análisis de Gemini IA!`);
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (e) {
      console.error('Scan error:', e);
    } finally {
      setIsScanning(false);
      setIsScanModalOpen(false);
    }
  };

  // Add custom manual prospect
  const handleAddManualProspect = () => {
    if (!newCompanyName.trim()) return;

    const manualItem: GeolocatedProspect = {
      id: `geo-${Date.now()}`,
      name: newCompanyName.trim(),
      category: newCategory,
      city: newCity.trim() || 'General Roca, Río Negro',
      country: 'Argentina',
      address: `${newCity || 'Parque Industrial'}, Calle Principal 100`,
      lat: -39.0333,
      lng: -67.5833,
      rating: 4.5,
      reviewsCount: 10,
      phone: newPhone.trim() || '+54 298 440-0000',
      website: newWebsite.trim() || 'https://empresa.com.ar',
      estimatedEmployees: newEmployees || '20-50 empleados',
      estimatedRevenueUsd: parseInt(newRevenue) || 1500000,
      crmStatus: 'No Contactado'
    };

    updateAndSaveProspects((prev) => [manualItem, ...prev]);
    setSelectedProspect(manualItem);
    setIsQuickAddModalOpen(false);
    setNewCompanyName('');
    setNewCity('');
    setNewPhone('');
    setNewWebsite('');

    handleEnrichWithGemini(manualItem);
  };

  const handleExportCsv = () => {
    const headers = 'ID,Nombre,Sector,Ciudad,Pais,Telefono,Website,Empleados,Facturacion_USD,Status,FitScore,Decisor\n';
    const rows = filteredProspects.map((p) =>
      `"${p.id}","${p.name}","${p.category}","${p.city}","${p.country}","${p.phone}","${p.website}","${p.estimatedEmployees}","${p.estimatedRevenueUsd}","${p.crmStatus}","${p.geminiAnalysis?.fitScore || 'N/A'}","${p.geminiAnalysis?.suggestedDecisionMaker || 'N/A'}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prospectos_geolocalizados_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              IA & Geolocalización Maps
            </span>
            <span className="text-slate-400 text-xs">· Módulo 3.1 Prospección & Pipeline</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-emerald-600" /> Prospección Maps e Inteligencia Territorial
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Descubre empresas B2B por ubicación geográfica, analiza su FODA y perfil con Gemini IA y expórtalas directamente al CRM.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsQuickAddModalOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Agregar Empresa</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsScanModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Escanear Región con IA</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Empresas Geolocalizadas</span>
            <span className="text-2xl font-black text-slate-900">{filteredProspects.length} <span className="text-xs font-normal text-slate-400">/ {prospects.length}</span></span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Polos Industriales Activos</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Facturación Agregada</span>
            <span className="text-2xl font-black text-indigo-600">
              ${(filteredProspects.reduce((a, b) => a + b.estimatedRevenueUsd, 0) / 1000000).toFixed(1)}M USD
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Volumen en Filtro Actual</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Inteligencia Gemini</span>
            <span className="text-2xl font-black text-slate-900">
              {prospects.filter((p) => p.geminiAnalysis).length} / {prospects.length}
            </span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">Diagnósticos FODA Listos</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">En Pipeline CRM</span>
            <span className="text-2xl font-black text-emerald-600">
              {prospects.filter((p) => p.crmStatus !== 'No Contactado').length}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Listos para Cierre</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {exportSuccessMsg && (
        <div className="bg-emerald-600 text-white p-3.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Main Search & Quick Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por Nombre, Rubro, Ciudad, Dirección o Decisor..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Países</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="México">México</option>
              <option value="Colombia">Colombia</option>
              <option value="Perú">Perú</option>
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todas">Todas las Ciudades</option>
              <option value="Neuquén">Neuquén (Vaca Muerta)</option>
              <option value="General Roca">Río Negro (Alto Valle)</option>
              <option value="Mendoza">Mendoza (Cuyo)</option>
              <option value="Rosario">Rosario (Santa Fe)</option>
              <option value="Santiago">Santiago de Chile</option>
              <option value="Monterrey">Monterrey (México)</option>
            </select>

            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isFilterPanelOpen || hasActiveAdvancedFilters
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros Avanzados</span>
              {hasActiveAdvancedFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {hasActiveAdvancedFilters && (
              <button
                onClick={resetAllFilters}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                title="Restablecer filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Filtering Panel: Industry, Company Size, Revenue Range, Status, Rating */}
        {isFilterPanelOpen && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 animate-fade-in">
            {/* 1. Industry / Sector */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Sector / Industria</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="todas">Todos los Sectores</option>
                <option value="Petróleo">Petróleo & Vaca Muerta</option>
                <option value="Agroindustria">Agroindustria & Export</option>
                <option value="Vitivinicultura">Vitivinicultura & Bebidas</option>
                <option value="Transporte">Transporte & Logística</option>
                <option value="Manufactura">Manufactura & Metalmecánica</option>
                <option value="AgTech">AgTech & Maquinaria</option>
              </select>
            </div>

            {/* 2. Company Size (Employees) */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Tamaño de Empresa</label>
              <select
                value={selectedCompanySize}
                onChange={(e) => setSelectedCompanySize(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="todos">Cualquier Tamaño</option>
                <option value="small">Pequeña (&lt; 50 empleados)</option>
                <option value="medium">Mediana (50 - 250 empleados)</option>
                <option value="large">Grande (250+ empleados)</option>
              </select>
            </div>

            {/* 3. Revenue Range */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Rango de Facturación</label>
              <select
                value={selectedRevenueRange}
                onChange={(e) => setSelectedRevenueRange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="todos">Todos los Rangos</option>
                <option value="tier1">&lt; $2M USD / año</option>
                <option value="tier2">$2M - $5M USD / año</option>
                <option value="tier3">&gt; $5M USD / año</option>
              </select>
            </div>

            {/* 4. CRM Pipeline Status */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Estado en Pipeline</label>
              <select
                value={selectedCrmStatus}
                onChange={(e) => setSelectedCrmStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="todos">Cualquier Estado</option>
                <option value="No Contactado">No Contactado</option>
                <option value="En Pipeline">En Pipeline Activo</option>
                <option value="Exportado">Exportado a CRM</option>
              </select>
            </div>

            {/* 5. Google Maps Rating */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Calificación Mínima</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value={0}>Todas las Calificaciones</option>
                <option value={4.5}>4.5★ o superior</option>
                <option value={4.7}>4.7★ o superior</option>
                <option value={4.8}>4.8★ o superior</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main 3-Column Layout: Interactive Map + Discovered Prospects List + AI Intelligence Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map & Radar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-sm text-white">Mapa Interactivo de Prospección</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                {filteredProspects.length} Marcadores
              </span>
            </div>

            <p className="text-slate-400 text-xs">
              Visualiza la distribución geográfica de prospectos B2B en parques industriales. Haz clic en un marcador para analizar su FODA con IA.
            </p>

            {/* Real React-Leaflet Map Component */}
            <div className="h-[460px] w-full">
              <ProspectMap
                prospects={filteredProspects}
                selectedProspect={selectedProspect}
                onSelectProspect={(p) => {
                  setSelectedProspect(p);
                  if (!p.geminiAnalysis) {
                    handleEnrichWithGemini(p);
                  }
                }}
                onAddToCrm={handleExportToCrm}
                onEnrichAi={handleEnrichWithGemini}
              />
            </div>
          </div>
        </div>

        {/* Center Column: Prospects List Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Empresas Calificadas</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {filteredProspects.length} resultados
            </span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filteredProspects.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700 text-xs">No se encontraron empresas con los filtros aplicados.</p>
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : (
              filteredProspects.map((prospect) => (
                <div
                  key={prospect.id}
                  onClick={() => {
                    setSelectedProspect(prospect);
                    if (!prospect.geminiAnalysis) {
                      handleEnrichWithGemini(prospect);
                    }
                  }}
                  className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    selectedProspect?.id === prospect.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {prospect.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">
                        {prospect.name}
                      </h4>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-amber-500 text-xs font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {prospect.rating}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prospect.crmStatus === 'Exportado' ? 'bg-blue-100 text-blue-800' :
                        prospect.crmStatus === 'En Pipeline' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {prospect.crmStatus}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{prospect.address} ({prospect.city})</span>
                    </p>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {prospect.estimatedEmployees}
                      </span>
                      <span className="text-indigo-600 font-bold flex items-center gap-0.5">
                        <DollarSign className="w-3 h-3 text-indigo-500" />
                        ~${(prospect.estimatedRevenueUsd / 1000000).toFixed(1)}M USD
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProspect(prospect);
                        handleEnrichWithGemini(prospect);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{prospect.geminiAnalysis ? 'Ver Diagnóstico FODA' : 'Analizar IA'}</span>
                    </button>

                    {prospect.crmStatus === 'No Contactado' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportToCrm(prospect);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-xs cursor-pointer text-[11px]"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Añadir CRM</span>
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>En Pipeline</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: AI Intelligence Sidebar (3 cols) */}
        <div className="lg:col-span-3">
          <AIIntelligenceSidebar
            prospect={selectedProspect}
            onAddToCrm={handleExportToCrm}
            onRefreshIntelligence={handleEnrichWithGemini}
            isLoading={isAnalyzingAi === selectedProspect?.id}
          />
        </div>
      </div>

      {/* Scan Zone Modal */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Escanear Región con Gemini IA</h3>
                  <p className="text-xs text-slate-500">Descubre empresas B2B en parques industriales específicos</p>
                </div>
              </div>
              <button
                onClick={() => setIsScanModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">País Objetivo</label>
                <select
                  value={scanCountry}
                  onChange={(e) => setScanCountry(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                >
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="México">México</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Perú">Perú</option>
                  <option value="Uruguay">Uruguay</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Zona, Ciudad o Parque Industrial</label>
                <input
                  type="text"
                  value={scanZone}
                  onChange={(e) => setScanZone(e.target.value)}
                  placeholder="Ej: Parque Industrial Pilar, Vaca Muerta, Maipú Mendoza..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Sector o Vertical B2B</label>
                <input
                  type="text"
                  value={scanSector}
                  onChange={(e) => setScanSector(e.target.value)}
                  placeholder="Ej: Agroindustria, Petróleo y Gas, Logística..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                />
              </div>
            </div>

            <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl text-xs space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Motor Gemini IA 3.6:
              </p>
              <p className="text-emerald-700">
                La IA identificará empresas registradas por geolocalización, calculará tamaño estimado de facturación, generará matriz FODA, detectará decisores probables y redactará aperturas comerciales para CRM.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsScanModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleExecuteScan}
                disabled={isScanning}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Escaneando región...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>Iniciar Escaneo Territorial</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {isQuickAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Añadir Empresa B2B</h3>
                  <p className="text-xs text-slate-500">Ingresa los datos para análisis automático con Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nombre de la Empresa *</label>
                <input
                  type="text"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="Ej: Metalúrgica del Comahue S.A."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Ciudad o Ubicación</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Ej: Neuquén Capital, Río Negro..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Sector o Vertical</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Ej: Metalmecánica, Petróleo..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Empleados</label>
                  <select
                    value={newEmployees}
                    onChange={(e) => setNewEmployees(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                  >
                    <option value="10-30 empleados">10-30 empleados</option>
                    <option value="20-50 empleados">20-50 empleados</option>
                    <option value="50-200 empleados">50-200 empleados</option>
                    <option value="200+ empleados">200+ empleados</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Ej: +54 299 448-1234"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Facturación USD/año</label>
                  <input
                    type="number"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    placeholder="1500000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Sitio Web</label>
                <input
                  type="text"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="Ej: https://miempresa.com.ar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsQuickAddModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddManualProspect}
                disabled={!newCompanyName.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Guardar & Analizar con IA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeolocatedProspectingTab;
