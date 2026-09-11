import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Users,
  Users2,
  Building2,
  Tag,
  ClipboardList,
  CheckSquare,
  Calendar as CalendarIcon,
  BarChart3,
  Zap,
  MessageSquare,
  Settings,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Plus,
  TrendingUp,
  Briefcase,
  Target,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  Sparkles,
  Search,
  CheckCheck,
  X,
  ExternalLink,
  MapPin,
  Database,
  Workflow,
  FileSpreadsheet,
  Bot,
  Compass,
  Cpu,
  FileText,
  Receipt,
  CreditCard,
  UserCheck,
  Utensils,
  ShoppingCart,
  Globe,
  Laptop,
  Layers,
  LayoutDashboard,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  RefreshCw,
  Share2,
  Eye,
  FileDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Types for Pipeline and Dashboard
export interface Deal {
  id: string;
  title: string;
  company: string;
  amount: number;
  stage: 'nuevo' | 'calificacion' | 'propuesta' | 'negociacion' | 'cerrado';
  avatarUrl: string;
  contactName: string;
  statusTag?: string;
  dateAdded?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  bullets?: string[];
}

export const INITIAL_DEALS: Deal[] = [
  // Columna Nuevo
  {
    id: 'd1',
    title: 'Importación de equipos',
    company: 'TechGlobal S.A.',
    amount: 7500,
    stage: 'nuevo',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    contactName: 'Mariana Costa',
  },
  {
    id: 'd2',
    title: 'Consultoría SAP',
    company: 'DataLogic',
    amount: 6000,
    stage: 'nuevo',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    contactName: 'Carlos Benítez',
  },
  {
    id: 'd3',
    title: 'Software licencias',
    company: 'Innovatech',
    amount: 5000,
    stage: 'nuevo',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    contactName: 'Elena Ramos',
  },
  {
    id: 'd4',
    title: 'Servicios en la nube',
    company: 'CloudWave',
    amount: 6000,
    stage: 'nuevo',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    contactName: 'Federico Gómez',
  },

  // Columna Calificación
  {
    id: 'd5',
    title: 'Desarrollo a medida',
    company: 'SoftBuild',
    amount: 12000,
    stage: 'calificacion',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    contactName: 'Lucía Morales',
  },
  {
    id: 'd6',
    title: 'Integración de sistemas',
    company: 'NetSolutions',
    amount: 9800,
    stage: 'calificacion',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    contactName: 'Javier Pérez',
  },
  {
    id: 'd7',
    title: 'Soporte 24/7',
    company: 'AdminCorp',
    amount: 7500,
    stage: 'calificacion',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    contactName: 'Camila Rojas',
  },
  {
    id: 'd8',
    title: 'Renovación de licencias',
    company: 'CompuStore',
    amount: 6000,
    stage: 'calificacion',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    contactName: 'Diego Fernández',
  },

  // Columna Propuesta
  {
    id: 'd9',
    title: 'Plataforma e-learning',
    company: 'EduSmart',
    amount: 18000,
    stage: 'propuesta',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    contactName: 'Silvina Ortiz',
  },
  {
    id: 'd10',
    title: 'App móvil',
    company: 'MoviLab',
    amount: 15000,
    stage: 'propuesta',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    contactName: 'Matías Silva',
  },
  {
    id: 'd11',
    title: 'Ciberseguridad',
    company: 'SecureIT',
    amount: 17500,
    stage: 'propuesta',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    contactName: 'Rodrigo Navarro',
  },
  {
    id: 'd12',
    title: 'Data Analytics',
    company: 'MetricsPlus',
    amount: 17300,
    stage: 'propuesta',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80',
    contactName: 'Valeria Méndez',
  },

  // Columna Negociación
  {
    id: 'd13',
    title: 'ERP Implementación',
    company: 'GlobalTech',
    amount: 22000,
    stage: 'negociacion',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    contactName: 'Alejandro Cruz',
  },
  {
    id: 'd14',
    title: 'Outsourcing TI',
    company: 'BusinessCare',
    amount: 10000,
    stage: 'negociacion',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    contactName: 'Patricia Paz',
  },
  {
    id: 'd15',
    title: 'Infraestructura cloud',
    company: 'SkyNet',
    amount: 6000,
    stage: 'negociacion',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    contactName: 'Guillermo Vera',
  },

  // Columna Cerrado
  {
    id: 'd16',
    title: 'CRM Corporativo',
    company: 'SalesPro',
    amount: 18000,
    stage: 'cerrado',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    contactName: 'Tomás Rinaldi',
    statusTag: 'Ganado',
  },
  {
    id: 'd17',
    title: 'Mesa de ayuda',
    company: 'HelpDesk',
    amount: 12000,
    stage: 'cerrado',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    contactName: 'Agustina Vidal',
    statusTag: 'Ganado',
  },
  {
    id: 'd18',
    title: 'Capacitación',
    company: 'Formación IT',
    amount: 8200,
    stage: 'cerrado',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    contactName: 'Florencia Luna',
    statusTag: 'Ganado',
  },
  {
    id: 'd19',
    title: 'Mantenimiento anual',
    company: 'FactorySoft',
    amount: 19000,
    stage: 'cerrado',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    contactName: 'Sebastián Blanco',
    statusTag: 'Ganado',
  },
];

export type DashboardTab =
  // COMERCIAL & CRM
  | 'oportunidades'
  | 'empresas'
  | 'personas'
  | 'tareas'
  | 'analiticas'
  | 'prospeccionMaps'
  | 'meddic'
  // CLIENTUMCRM ENGINE & STUDIO
  | 'customObjects'
  | 'workflows'
  | 'csvStudio'
  // WHATSAPP & OMNICANAL
  | 'whatsapp'
  | 'chatbot'
  | 'campaigns'
  // INTELIGENCIA ARTIFICIAL
  | 'aiAssistant'
  | 'gtmStrategy'
  | 'sdrOutreach'
  | 'adCopy'
  // ERP & FINANZAS
  | 'erp'
  | 'payments'
  | 'clientPortal'
  | 'restaurant'
  | 'ecommerce'
  // MARKETING & SISTEMA
  | 'seoSuite'
  | 'webDev'
  | 'powerSuite'
  | 'settings'
  // Compatibility aliases
  | 'resumen'
  | 'contactos'
  | 'negocios'
  | 'actividades'
  | 'calendario'
  | 'reportes'
  | 'automatizaciones'
  | 'mensajes'
  | 'configuracion';

export const UserDashboardApp: React.FC = () => {
  const navigate = useNavigate();

  // Navigation tab state matching Screenshot 1 & 2 categories
  const [activeTab, setActiveTab] = useState<DashboardTab>('oportunidades');

  // Selected pipeline
  const [selectedPipeline, setSelectedPipeline] = useState('Todos los pipelines');
  const [pipelineDropdownOpen, setPipelineDropdownOpen] = useState(false);

  // Deals state for interactive Drag/Move/Add
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [newDealForm, setNewDealForm] = useState({
    title: '',
    company: '',
    amount: '',
    stage: 'nuevo' as Deal['stage'],
    contactName: '',
  });

  // AI Assistant Chat state matching screenshot
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: '¿Cuál es el resumen de mis negocios esta semana?',
      time: '10:30',
    },
    {
      id: 'm2',
      sender: 'assistant',
      text: 'Estos son los highlights de tus negocios esta semana:',
      bullets: [
        'Negocios creados: 18',
        'En negociación: 7',
        'Monto en negociación: $ 38.000',
        'Ganados: 4',
        'Ingresos ganados: $ 57.200',
      ],
      time: '10:30',
    },
    {
      id: 'm3',
      sender: 'user',
      text: '¿Qué actividades tengo pendientes para hoy?',
      time: '10:31',
    },
    {
      id: 'm4',
      sender: 'assistant',
      text: 'Tienes 5 actividades pendientes para hoy:',
      bullets: [
        '10:00 Llamada con TechGlobal',
        '11:30 Reunión con SoftBuild',
        '14:00 Enviar propuesta a MoviLab',
        '15:30 Seguimiento a NetSolutions',
        '17:00 Demo con EduSmart',
      ],
      time: '10:31',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Revenue chart filter
  const [revenuePeriod, setRevenuePeriod] = useState('Este año');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  // Handle Send AI message
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsAiLoading(true);

    try {
      // Call server AI endpoint
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          systemInstruction:
            'Eres el Asistente IA de ClientumOS. Eres un asesor comercial de élite para PyMEs en LATAM. Responde de forma clara, con métricas precisas, viñetas elegantes y profesionalismo.',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.text || '';
        // Format bullet points if present
        const lines = rawText.split('\n').filter(Boolean);
        const hasBullets = lines.some((l: string) => l.trim().startsWith('-') || l.trim().startsWith('•') || l.trim().startsWith('*'));

        setChatMessages((prev) => [
          ...prev,
          {
            id: 'ai-' + Date.now(),
            sender: 'assistant',
            text: hasBullets ? lines[0].replace(/^[-*•]\s*/, '') : rawText,
            bullets: hasBullets ? lines.slice(1).map((l: string) => l.replace(/^[-*•]\s*/, '')) : undefined,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      // High-quality contextual fallback
      setTimeout(() => {
        let replyText = 'Análisis comercial actualizado en tiempo real:';
        let replyBullets = [
          'Pipeline comercial con 22 negocios activos valorados en $ 229.800.',
          'Tasa de conversión en 32.4% con 4 cierres exitosos este mes.',
          'Próxima acción recomendada: contactar a GlobalTech para firmar el ERP.',
        ];

        if (textToSend.toLowerCase().includes('meta') || textToSend.toLowerCase().includes('ingreso') || textToSend.toLowerCase().includes('ganancia')) {
          replyText = 'Resumen de ingresos para el período actual:';
          replyBullets = [
            'Ingresos totales alcanzados: $ 124.800 (18.6% sobre el mes anterior).',
            'Proyección anual estimada: $ 1.024.600.',
            'Ticket promedio: $ 6.218 por cliente cerrado.',
          ];
        } else if (textToSend.toLowerCase().includes('cliente') || textToSend.toLowerCase().includes('contacto') || textToSend.toLowerCase().includes('empresa')) {
          replyText = 'Detalle de cuentas prioritarias:';
          replyBullets = [
            'TechGlobal S.A.: pendiente confirmación de cotización ($ 7.500).',
            'EduSmart: demostración técnica programada para hoy 17:00.',
            'SecureIT: revisión de contrato de ciberseguridad ($ 17.500).',
          ];
        }

        setChatMessages((prev) => [
          ...prev,
          {
            id: 'ai-' + Date.now(),
            sender: 'assistant',
            text: replyText,
            bullets: replyBullets,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 500);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add deal submission
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealForm.title || !newDealForm.company) return;

    const newDeal: Deal = {
      id: 'd-' + Date.now(),
      title: newDealForm.title,
      company: newDealForm.company,
      amount: parseFloat(newDealForm.amount) || 5000,
      stage: newDealForm.stage,
      contactName: newDealForm.contactName || 'Contacto Comercial',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      statusTag: newDealForm.stage === 'cerrado' ? 'Ganado' : undefined,
    };

    setDeals((prev) => [newDeal, ...prev]);
    setIsNewDealModalOpen(false);
    setNewDealForm({
      title: '',
      company: '',
      amount: '',
      stage: 'nuevo',
      contactName: '',
    });
  };

  // Move deal to another stage
  const moveDealStage = (dealId: string, nextStage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: nextStage, statusTag: nextStage === 'cerrado' ? 'Ganado' : undefined } : d))
    );
    if (selectedDeal?.id === dealId) {
      setSelectedDeal((prev) => (prev ? { ...prev, stage: nextStage } : null));
    }
  };

  // Column definitions matching screenshot
  const columns: {
    id: Deal['stage'];
    title: string;
    dotColor: string;
    defaultCount: number;
    defaultTotal: string;
  }[] = [
    { id: 'nuevo', title: 'Nuevo', dotColor: '#38bdf8', defaultCount: 8, defaultTotal: '$ 24.500' },
    { id: 'calificacion', title: 'Calificación', dotColor: '#14b8a6', defaultCount: 6, defaultTotal: '$ 42.300' },
    { id: 'propuesta', title: 'Propuesta', dotColor: '#3b82f6', defaultCount: 5, defaultTotal: '$ 67.800' },
    { id: 'negociacion', title: 'Negociación', dotColor: '#818cf8', defaultCount: 5, defaultTotal: '$ 38.000' },
    { id: 'cerrado', title: 'Cerrado', dotColor: '#10b981', defaultCount: 4, defaultTotal: '$ 57.200' },
  ];

  return (
    <div id="clientum_user_dashboard_app" className="flex h-screen w-screen overflow-hidden bg-[#070b16] text-[#e2e8f0] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ── LEFT SIDEBAR MATCHING SCREENSHOT 1 & 2 ─────────────────────── */}
      <aside
        id="dashboard_main_sidebar"
        className="w-64 bg-[#090f1e] border-r border-[#15203b] flex flex-col h-full shrink-0 select-none z-20"
      >
        {/* Top Brand / Back link */}
        <div className="px-4 py-3.5 border-b border-[#15203b] flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/20">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
                ClientumOS
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                CRM & Sales Suite
              </span>
            </div>
          </Link>
          <Link
            to="/"
            title="Volver al portal público"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#121c35] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Scrollable Navigation Menu across all 6 categories */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 custom-scrollbar">
          {/* 1. COMERCIAL & CRM */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1.5">
              COMERCIAL & CRM
            </div>
            <div className="space-y-0.5">
              {/* Oportunidades ($582k) */}
              <button
                onClick={() => setActiveTab('oportunidades')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'oportunidades' || activeTab === 'resumen' || activeTab === 'negocios'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className={`w-4 h-4 ${activeTab === 'oportunidades' || activeTab === 'resumen' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>Oportunidades</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#16274a] text-sky-400 text-[10px] font-bold border border-sky-500/20">
                  $582k
                </span>
              </button>

              {/* Empresas */}
              <button
                onClick={() => setActiveTab('empresas')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'empresas'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Building2 className={`w-4 h-4 ${activeTab === 'empresas' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Empresas</span>
              </button>

              {/* Personas */}
              <button
                onClick={() => setActiveTab('personas')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'personas' || activeTab === 'contactos'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Users2 className={`w-4 h-4 ${activeTab === 'personas' || activeTab === 'contactos' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Personas</span>
              </button>

              {/* Tareas (4) */}
              <button
                onClick={() => setActiveTab('tareas')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'tareas'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className={`w-4 h-4 ${activeTab === 'tareas' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>Tareas</span>
                </div>
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center border border-amber-500/30">
                  4
                </span>
              </button>

              {/* Analíticas */}
              <button
                onClick={() => setActiveTab('analiticas')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'analiticas' || activeTab === 'reportes'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <BarChart3 className={`w-4 h-4 ${activeTab === 'analiticas' || activeTab === 'reportes' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Analíticas</span>
              </button>

              {/* Prospección Maps IA */}
              <button
                onClick={() => setActiveTab('prospeccionMaps')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'prospeccionMaps'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <MapPin className={`w-4 h-4 ${activeTab === 'prospeccionMaps' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Prospección Maps IA</span>
              </button>

              {/* Lead Scoring MEDDIC */}
              <button
                onClick={() => setActiveTab('meddic')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'meddic'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Target className={`w-4 h-4 ${activeTab === 'meddic' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Lead Scoring MEDDIC</span>
              </button>
            </div>
          </div>

          {/* 2. CLIENTUMCRM ENGINE & STUDIO */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">
              CLIENTUMCRM ENGINE & STUDIO
            </div>
            <div className="space-y-0.5">
              {/* Custom Objects Studio (Core) */}
              <button
                onClick={() => setActiveTab('customObjects')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'customObjects'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className={`w-4 h-4 ${activeTab === 'customObjects' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>Custom Objects Studio</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                  Core
                </span>
              </button>

              {/* Workflows & Flowchart (Flow) */}
              <button
                onClick={() => setActiveTab('workflows')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'workflows' || activeTab === 'automatizaciones'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Workflow className={`w-4 h-4 ${activeTab === 'workflows' || activeTab === 'automatizaciones' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>Workflows & Flowchart</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Flow
                </span>
              </button>

              {/* CSV Import & Export Studio */}
              <button
                onClick={() => setActiveTab('csvStudio')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'csvStudio'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <FileSpreadsheet className={`w-4 h-4 ${activeTab === 'csvStudio' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>CSV Import & Export Studio</span>
              </button>
            </div>
          </div>

          {/* 3. WHATSAPP & OMNICANAL */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">
              WHATSAPP & OMNICANAL
            </div>
            <div className="space-y-0.5">
              {/* WhatsApp CRM (PRO) */}
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'whatsapp' || activeTab === 'mensajes'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className={`w-4 h-4 ${activeTab === 'whatsapp' || activeTab === 'mensajes' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>WhatsApp CRM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  PRO
                </span>
              </button>

              {/* Chatbot WhatsApp 24/7 */}
              <button
                onClick={() => setActiveTab('chatbot')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'chatbot'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Bot className={`w-4 h-4 ${activeTab === 'chatbot' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Chatbot WhatsApp 24/7</span>
              </button>

              {/* Campañas & Broadcast */}
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'campaigns'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Send className={`w-4 h-4 ${activeTab === 'campaigns' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Campañas & Broadcast</span>
              </button>
            </div>
          </div>

          {/* 4. INTELIGENCIA ARTIFICIAL */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">
              INTELIGENCIA ARTIFICIAL
            </div>
            <div className="space-y-0.5">
              {/* Asistente IA Gemini 2.5 */}
              <button
                onClick={() => setActiveTab('aiAssistant')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'aiAssistant'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${activeTab === 'aiAssistant' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Asistente IA Gemini 2.5</span>
              </button>

              {/* Generador Estrategias GTM */}
              <button
                onClick={() => setActiveTab('gtmStrategy')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'gtmStrategy'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Compass className={`w-4 h-4 ${activeTab === 'gtmStrategy' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Generador Estrategias GTM</span>
              </button>

              {/* Agente Outreach (SDR) */}
              <button
                onClick={() => setActiveTab('sdrOutreach')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'sdrOutreach'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Cpu className={`w-4 h-4 ${activeTab === 'sdrOutreach' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Agente Outreach (SDR)</span>
              </button>

              {/* AI Ad Copy Studio */}
              <button
                onClick={() => setActiveTab('adCopy')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'adCopy'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <FileText className={`w-4 h-4 ${activeTab === 'adCopy' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>AI Ad Copy Studio</span>
              </button>
            </div>
          </div>

          {/* 5. ERP & FINANZAS */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">
              ERP & FINANZAS
            </div>
            <div className="space-y-0.5">
              {/* ERP & Facturación AFIP */}
              <button
                onClick={() => setActiveTab('erp')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'erp'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Receipt className={`w-4 h-4 ${activeTab === 'erp' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>ERP & Facturación AFIP</span>
              </button>

              {/* Cobros MercadoPago */}
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'payments'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <CreditCard className={`w-4 h-4 ${activeTab === 'payments' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Cobros MercadoPago</span>
              </button>

              {/* Portal del Cliente */}
              <button
                onClick={() => setActiveTab('clientPortal')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'clientPortal'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <UserCheck className={`w-4 h-4 ${activeTab === 'clientPortal' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Portal del Cliente</span>
              </button>

              {/* Restaurantes & KDS */}
              <button
                onClick={() => setActiveTab('restaurant')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'restaurant'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Utensils className={`w-4 h-4 ${activeTab === 'restaurant' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Restaurantes & KDS</span>
              </button>

              {/* E-commerce Orders */}
              <button
                onClick={() => setActiveTab('ecommerce')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'ecommerce'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <ShoppingCart className={`w-4 h-4 ${activeTab === 'ecommerce' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>E-commerce Orders</span>
              </button>
            </div>
          </div>

          {/* 6. MARKETING & SISTEMA */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">
              MARKETING & SISTEMA
            </div>
            <div className="space-y-0.5">
              {/* Suite SEO Completa */}
              <button
                onClick={() => setActiveTab('seoSuite')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'seoSuite'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Globe className={`w-4 h-4 ${activeTab === 'seoSuite' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Suite SEO Completa</span>
              </button>

              {/* Desarrollo Web & Widgets */}
              <button
                onClick={() => setActiveTab('webDev')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'webDev'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Laptop className={`w-4 h-4 ${activeTab === 'webDev' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Desarrollo Web & Widgets</span>
              </button>

              {/* Power Suite (16 Modul.) */}
              <button
                onClick={() => setActiveTab('powerSuite')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'powerSuite'
                    ? 'bg-[#172033] text-white font-bold shadow-sm border border-[#2d3e64]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Layers className={`w-4 h-4 ${activeTab === 'powerSuite' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Power Suite (16 Modul.)</span>
              </button>

              {/* Configuración */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'settings' || activeTab === 'configuracion'
                    ? 'bg-[#162138] text-white shadow-sm border border-[#233760]'
                    : 'text-slate-300 hover:text-white hover:bg-[#11192e]'
                }`}
              >
                <Settings className={`w-4 h-4 ${activeTab === 'settings' || activeTab === 'configuracion' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Configuración</span>
              </button>
            </div>
          </div>
        </div>

        {/* User profile card at bottom matching screenshot */}
        <div className="p-3 border-t border-[#15203b] shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0d152a] border border-[#1b2a4e]/80">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Fernando Díaz"
                className="w-9 h-9 rounded-full object-cover border border-cyan-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090f1e]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">Fernando Díaz</span>
              <span className="text-slate-400 text-[11px] truncate">Administrador</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── CENTRAL MAIN CONTENT AREA ────────────────────────────────────── */}
      <main
        id="dashboard_main_viewport"
        className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden bg-[#070b16] custom-scrollbar relative"
      >
        {/* Floating toggle for AI Assistant on smaller screens if closed */}
        {!isAiSidebarOpen && (
          <button
            onClick={() => setIsAiSidebarOpen(true)}
            className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>Asistente IA</span>
          </button>
        )}

        {/* View Switcher based on activeTab */}
        {(activeTab === 'oportunidades' || activeTab === 'resumen' || activeTab === 'negocios') && (
          <div className="p-5 lg:p-6 space-y-6 max-w-[1550px]">
            {/* ── 1. PIPELINE DE VENTAS ───────────────────────────────────── */}
            <section className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h2 className="text-white text-lg font-bold tracking-tight">Pipeline de ventas</h2>

                <div className="flex items-center gap-2 relative">
                  {/* Pipeline selector dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setPipelineDropdownOpen(!pipelineDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f1a35] border border-[#1c2c54] text-xs font-medium text-slate-200 hover:bg-[#142347] transition-colors"
                    >
                      <span>{selectedPipeline}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {pipelineDropdownOpen && (
                      <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#0f1a35] border border-[#223666] shadow-2xl py-1 z-30">
                        {['Todos los pipelines', 'Ventas Enterprise B2B', 'Servicios Cloud & ERP', 'Marketing PyME'].map((p) => (
                          <button
                            key={p}
                            onClick={() => {
                              setSelectedPipeline(p);
                              setPipelineDropdownOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-[#192b57] hover:text-cyan-400 transition-colors"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Filter Icon button */}
                  <button
                    title="Filtrar oportunidades"
                    className="p-1.5 rounded-xl bg-[#0f1a35] border border-[#1c2c54] text-slate-400 hover:text-white hover:bg-[#142347] transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                  </button>

                  {/* More options button */}
                  <button
                    title="Más opciones"
                    className="p-1.5 rounded-xl bg-[#0f1a35] border border-[#1c2c54] text-slate-400 hover:text-white hover:bg-[#142347] transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Kanban 5 Columns Matching Screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
                {columns.map((col) => {
                  const stageDeals = deals.filter((d) => d.stage === col.id);
                  const stageCount = stageDeals.length;
                  const stageTotalSum = stageDeals.reduce((acc, curr) => acc + curr.amount, 0);

                  return (
                    <div
                      key={col.id}
                      className="bg-[#090f20]/90 border border-[#152344] rounded-xl p-3 flex flex-col justify-between min-h-[360px]"
                    >
                      <div>
                        {/* Column Header */}
                        <div className="mb-3 px-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: col.dotColor }}
                            />
                            <span className="text-white text-xs font-bold tracking-tight">
                              {col.title}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px] block">
                            {stageCount} negocios · ${' '}
                            {stageTotalSum.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                          </span>
                        </div>

                        {/* Cards List */}
                        <div className="space-y-2.5">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              onClick={() => setSelectedDeal(deal)}
                              className="p-3 rounded-xl bg-[#0e172e] border border-[#1a2b52] hover:border-cyan-500/50 hover:bg-[#111d3b] transition-all cursor-pointer group shadow-sm"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-white text-xs font-bold line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                  {deal.title}
                                </h4>
                                {deal.statusTag && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold shrink-0">
                                    {deal.statusTag}
                                  </span>
                                )}
                              </div>

                              <span className="text-slate-400 text-[11px] block mb-2 line-clamp-1">
                                {deal.company}
                              </span>

                              <div className="flex items-center justify-between pt-1 border-t border-[#172547]">
                                <span className="text-white font-extrabold text-xs">
                                  $ {deal.amount.toLocaleString('es-AR')}
                                </span>
                                <img
                                  src={deal.avatarUrl}
                                  alt={deal.contactName}
                                  title={deal.contactName}
                                  className="w-5 h-5 rounded-full object-cover border border-[#213563]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* + Nuevo negocio button at bottom */}
                      <button
                        onClick={() => {
                          setNewDealForm((prev) => ({ ...prev, stage: col.id }));
                          setIsNewDealModalOpen(true);
                        }}
                        className="mt-3 w-full py-2 rounded-xl bg-[#0c1428] hover:bg-[#132042] border border-dashed border-[#1e305d] text-slate-400 hover:text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Nuevo negocio</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── 2. MIDDLE ROW: 4 KPI CARDS ──────────────────────────────── */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Card 1: Ingresos totales */}
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Ingresos totales</span>
                    <span className="text-slate-500 text-[11px]">Este mes</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-cyan-400 text-2xl font-black tracking-tight block">
                    $ 124.800
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold mt-1 inline-flex items-center gap-1">
                    ↑ 18.6% <span className="text-slate-400 font-normal">vs mes anterior</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Negocios activos */}
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Negocios activos</span>
                    <span className="text-slate-500 text-[11px]">Este mes</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-cyan-400 text-2xl font-black tracking-tight block">22</span>
                  <span className="text-emerald-400 text-xs font-semibold mt-1 inline-flex items-center gap-1">
                    ↑ 15.8% <span className="text-slate-400 font-normal">vs mes anterior</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Tasa de cierre */}
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Tasa de cierre</span>
                    <span className="text-slate-500 text-[11px]">Este mes</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-cyan-400 text-2xl font-black tracking-tight block">
                    32.4%
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold mt-1 inline-flex items-center gap-1">
                    ↑ 6.2% <span className="text-slate-400 font-normal">vs mes anterior</span>
                  </span>
                </div>
              </div>

              {/* Card 4: Ticket promedio */}
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Ticket promedio</span>
                    <span className="text-slate-500 text-[11px]">Este mes</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-cyan-400 text-2xl font-black tracking-tight block">
                    $ 6.218
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold mt-1 inline-flex items-center gap-1">
                    ↑ 9.3% <span className="text-slate-400 font-normal">vs mes anterior</span>
                  </span>
                </div>
              </div>
            </section>

            {/* ── 3. BOTTOM ROW: 2 ANALYTICS CHARTS ───────────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Chart: Ingresos (Curve chart) ~60% */}
              <div className="lg:col-span-7 bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                {/* Header with Title and Totals */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white text-base font-bold tracking-tight">Ingresos</h3>
                    <div className="relative">
                      <select
                        value={revenuePeriod}
                        onChange={(e) => setRevenuePeriod(e.target.value)}
                        className="bg-[#0f1a35] border border-[#1c2c54] text-slate-300 text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Este año">Este año</option>
                        <option value="Últimos 6 meses">Últimos 6 meses</option>
                        <option value="Año anterior">Año anterior</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-400 text-[11px] block">Ingresos totales</span>
                    <span className="text-white text-lg font-black tracking-tight block">
                      $ 1.024.600
                    </span>
                    <span className="text-emerald-400 text-xs font-semibold">
                      ↑ 22.4% <span className="text-slate-400 font-normal">vs año anterior</span>
                    </span>
                  </div>
                </div>

                {/* Smooth Glowing Line Wave Graphic */}
                <div className="relative w-full h-56 pt-3 select-none">
                  {/* Peak Tooltip Highlight matching screenshot */}
                  <div className="absolute top-4 left-[64%] -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
                    <div className="px-2.5 py-1 rounded-lg bg-[#0e1c3b] border border-cyan-500/60 shadow-lg shadow-cyan-500/20 text-center">
                      <span className="text-slate-400 text-[9px] block">Agosto</span>
                      <span className="text-white text-xs font-bold">$ 124.800</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#070b16] mt-1 ring-4 ring-cyan-400/30" />
                  </div>

                  <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="cyanLineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="50%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="40" y1="20" x2="580" y2="20" stroke="#162344" strokeDasharray="3 3" />
                    <line x1="40" y1="70" x2="580" y2="70" stroke="#162344" strokeDasharray="3 3" />
                    <line x1="40" y1="120" x2="580" y2="120" stroke="#162344" strokeDasharray="3 3" />
                    <line x1="40" y1="170" x2="580" y2="170" stroke="#162344" />

                    {/* Y Axis labels */}
                    <text x="32" y="24" fill="#64748b" fontSize="10" textAnchor="end">
                      $150K
                    </text>
                    <text x="32" y="74" fill="#64748b" fontSize="10" textAnchor="end">
                      $100K
                    </text>
                    <text x="32" y="124" fill="#64748b" fontSize="10" textAnchor="end">
                      $50K
                    </text>
                    <text x="32" y="174" fill="#64748b" fontSize="10" textAnchor="end">
                      $0
                    </text>

                    {/* Area fill */}
                    <path
                      d="M 50 160 
                         C 90 155, 130 145, 170 140 
                         C 210 135, 250 150, 290 120 
                         C 330 90, 360 110, 390 45 
                         C 430 115, 470 95, 510 125 
                         C 540 140, 560 145, 580 150 
                         L 580 170 L 50 170 Z"
                      fill="url(#cyanAreaGradient)"
                    />

                    {/* Curve Line */}
                    <path
                      d="M 50 160 
                         C 90 155, 130 145, 170 140 
                         C 210 135, 250 150, 290 120 
                         C 330 90, 360 110, 390 45 
                         C 430 115, 470 95, 510 125 
                         C 540 140, 560 145, 580 150"
                      fill="none"
                      stroke="url(#cyanLineGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Month points */}
                    <circle cx="50" cy="160" r="3" fill="#38bdf8" />
                    <circle cx="170" cy="140" r="3" fill="#38bdf8" />
                    <circle cx="290" cy="120" r="3" fill="#38bdf8" />
                    <circle cx="390" cy="45" r="5" fill="#00f2fe" stroke="#070b16" strokeWidth="2" />
                    <circle cx="510" cy="125" r="3" fill="#38bdf8" />
                    <circle cx="580" cy="150" r="3" fill="#38bdf8" />
                  </svg>

                  {/* X Axis Months */}
                  <div className="flex justify-between text-[10px] text-slate-400 px-6 mt-1">
                    <span>Ene</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Abr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span className="text-cyan-400 font-bold">Ago</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dic</span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Fuentes de negocio (Donut chart) ~40% */}
              <div className="lg:col-span-5 bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-base font-bold tracking-tight mb-4">
                    Fuentes de negocio
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
                    {/* Donut graphic */}
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {/* Segment 1: Referidos (Cyan 35%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#06b6d4"
                          strokeWidth="14"
                          strokeDasharray="83.5 238.7"
                          strokeDashoffset="0"
                        />
                        {/* Segment 2: Web (Blue 25%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#2563eb"
                          strokeWidth="14"
                          strokeDasharray="59.6 238.7"
                          strokeDashoffset="-83.5"
                        />
                        {/* Segment 3: Redes sociales (Purple 20%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#8b5cf6"
                          strokeWidth="14"
                          strokeDasharray="47.7 238.7"
                          strokeDashoffset="-143.1"
                        />
                        {/* Segment 4: Eventos (Coral 10%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#f97316"
                          strokeWidth="14"
                          strokeDasharray="23.8 238.7"
                          strokeDashoffset="-190.8"
                        />
                        {/* Segment 5: Otros (Slate 10%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#64748b"
                          strokeWidth="14"
                          strokeDasharray="23.8 238.7"
                          strokeDashoffset="-214.6"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-white text-2xl font-black tracking-tight">126</span>
                        <span className="text-slate-400 text-[11px] font-medium">Total</span>
                      </div>
                    </div>

                    {/* Legend list */}
                    <div className="space-y-2 text-xs w-full max-w-[210px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] shrink-0" />
                          <span className="text-slate-300">Referidos</span>
                        </div>
                        <span className="text-slate-200 font-semibold">35% (44)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shrink-0" />
                          <span className="text-slate-300">Web</span>
                        </div>
                        <span className="text-slate-200 font-semibold">25% (22)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shrink-0" />
                          <span className="text-slate-300">Redes sociales</span>
                        </div>
                        <span className="text-slate-200 font-semibold">20% (25)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] shrink-0" />
                          <span className="text-slate-300">Eventos</span>
                        </div>
                        <span className="text-slate-200 font-semibold">10% (13)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#64748b] shrink-0" />
                          <span className="text-slate-300">Otros</span>
                        </div>
                        <span className="text-slate-200 font-semibold">10% (12)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer link matching screenshot */}
                <div className="pt-3 border-t border-[#162343] mt-3">
                  <button
                    onClick={() => setActiveTab('reportes')}
                    className="text-slate-400 hover:text-cyan-400 text-xs font-semibold flex items-center justify-between w-full transition-colors"
                  >
                    <span>Ver reporte completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── SUBVIEWS FOR ALL 6 SIDEBAR CATEGORIES ──────────────────────── */}
        
        {/* Personas & Contactos */}
        {(activeTab === 'personas' || activeTab === 'contactos') && (
          <div className="p-6 space-y-5 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Personas y Contactos Comerciales</h2>
                <p className="text-xs text-slate-400">Directorio de tomadores de decisión, leads calificados y directores de compras</p>
              </div>
              <button
                onClick={() => {
                  setNewDealForm((prev) => ({ ...prev, stage: 'nuevo' }));
                  setIsNewDealModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Persona</span>
              </button>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0e1832] text-slate-400 text-[11px] uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Persona</th>
                    <th className="px-5 py-3.5">Empresa</th>
                    <th className="px-5 py-3.5">Oportunidad asociada</th>
                    <th className="px-5 py-3.5">Monto</th>
                    <th className="px-5 py-3.5">Estado</th>
                    <th className="px-5 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#152344]">
                  {deals.map((d) => (
                    <tr key={d.id} className="hover:bg-[#111d3d] transition-colors">
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        <img src={d.avatarUrl} alt={d.contactName} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-white font-medium">{d.contactName}</span>
                      </td>
                      <td className="px-5 py-3.5">{d.company}</td>
                      <td className="px-5 py-3.5">{d.title}</td>
                      <td className="px-5 py-3.5 font-bold text-white">${d.amount.toLocaleString('es-AR')}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 text-[10px] font-semibold uppercase">
                          {d.stage}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedDeal(d)}
                          className="text-cyan-400 hover:text-cyan-300 font-semibold"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empresas */}
        {activeTab === 'empresas' && (
          <div className="p-6 space-y-5 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Empresas y Cuentas Clave B2B</h2>
                <p className="text-xs text-slate-400">Organizaciones con contratos de software, servicios y soporte activo</p>
              </div>
              <button
                onClick={() => {
                  setNewDealForm((prev) => ({ ...prev, stage: 'nuevo' }));
                  setIsNewDealModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Empresa</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'TechGlobal S.A.', sector: 'Software Enterprise', deals: 3, val: '$ 180.000', city: 'Buenos Aires' },
                { name: 'DataLogic Corp', sector: 'Big Data & Cloud', deals: 2, val: '$ 95.000', city: 'Córdoba' },
                { name: 'SoftBuild Labs', sector: 'Desarrollo a Medida', deals: 4, val: '$ 140.000', city: 'Rosario' },
                { name: 'GlobalTech Latam', sector: 'Consultoría TI', deals: 1, val: '$ 52.000', city: 'Mendoza' },
                { name: 'EduSmart Group', sector: 'EdTech & Campus', deals: 2, val: '$ 78.000', city: 'Buenos Aires' },
                { name: 'FactorySoft Industrial', sector: 'Industria 4.0', deals: 3, val: '$ 115.000', city: 'Santa Fe' },
              ].map((emp) => (
                <div key={emp.name} className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{emp.name}</h4>
                      <span className="text-slate-400 text-xs">{emp.sector} • {emp.city}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#172547] flex justify-between text-xs">
                    <span className="text-slate-400">Pipeline activo: <strong className="text-cyan-400 font-semibold">{emp.val}</strong></span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/20">Cliente Activo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tareas */}
        {activeTab === 'tareas' && (
          <div className="p-6 space-y-5 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Gestor de Tareas y Seguimiento</h2>
                <p className="text-xs text-slate-400">Acciones prioritarias para avanzar las oportunidades del pipeline</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
                4 Tareas pendientes para hoy
              </span>
            </div>
            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl space-y-2.5">
              {[
                { text: 'Enviar propuesta comercial actualizada a TechGlobal S.A.', due: 'Hoy, 15:00', prio: 'Alta' },
                { text: 'Coordinar videollamada técnica de onboarding con DataLogic', due: 'Hoy, 17:30', prio: 'Alta' },
                { text: 'Llamar a Sebastián Blanco para firma de contrato y cierre', due: 'Hoy, 18:00', prio: 'Alta' },
                { text: 'Auditar keywords de campaña SEO Clientum', due: 'Mañana, 10:00', prio: 'Media' },
                { text: 'Emitir factura electrónica AFIP con CAE para SoftBuild Labs', due: 'Mañana, 12:00', prio: 'Media' },
                { text: 'Renovar certificado SSL en Cloudflare para subdominio CRM', due: 'Jueves', prio: 'Baja' },
                { text: 'Importar base de 350 prospectos desde CSV Studio', due: 'Viernes', prio: 'Baja' },
              ].map((t, idx) => (
                <label key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e172e] border border-[#1a2b52] hover:bg-[#121f3f] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={idx > 3} className="w-4 h-4 rounded text-cyan-500 bg-[#090f20] border-[#223666] focus:ring-cyan-500" />
                    <span className={`text-xs ${idx > 3 ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>{t.text}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">{t.due}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.prio === 'Alta' ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'}`}>
                      {t.prio}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Analíticas & Reportes */}
        {(activeTab === 'analiticas' || activeTab === 'reportes') && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <h2 className="text-xl font-bold text-white">Analíticas de Negocio & Business Intelligence</h2>
              <p className="text-xs text-slate-400">Métricas en tiempo real sobre conversión, ciclo de venta y rendimiento de canales</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Ventas por canal</span>
                <h3 className="text-white text-xl font-black mt-1">$ 124.800</h3>
                <p className="text-emerald-400 text-[11px] mt-2">+28% vs mes anterior</p>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Ciclo de venta promedio</span>
                <h3 className="text-cyan-400 text-xl font-black mt-1">18 días</h3>
                <p className="text-slate-400 text-[11px] mt-2">-4 días con WhatsApp CRM</p>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Retención de cuentas</span>
                <h3 className="text-emerald-400 text-xl font-black mt-1">94.2%</h3>
                <p className="text-slate-400 text-[11px] mt-2">Suscripciones recurrentes</p>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Win Rate (Tasa de Cierre)</span>
                <h3 className="text-indigo-400 text-xl font-black mt-1">38.5%</h3>
                <p className="text-indigo-300 text-[11px] mt-2">Por encima del benchmark</p>
              </div>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-white font-bold text-sm">Embudo de Conversión de Ventas</h3>
              <div className="space-y-3 text-xs">
                {[
                  { stage: 'Prospectos / Leads generados', count: 184, percent: '100%', color: 'bg-sky-500' },
                  { stage: 'Calificación MEDDIC completada', count: 96, percent: '52%', color: 'bg-cyan-500' },
                  { stage: 'Propuesta comercial enviada', count: 54, percent: '29%', color: 'bg-indigo-500' },
                  { stage: 'Negociación activa de contrato', count: 28, percent: '15%', color: 'bg-purple-500' },
                  { stage: 'Cerrado / Ganado con cobro', count: 18, percent: '10%', color: 'bg-emerald-500' },
                ].map((funnel) => (
                  <div key={funnel.stage} className="space-y-1">
                    <div className="flex justify-between text-slate-300 font-medium">
                      <span>{funnel.stage} ({funnel.count})</span>
                      <span className="font-bold text-white">{funnel.percent}</span>
                    </div>
                    <div className="w-full bg-[#131f3f] h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full ${funnel.color} rounded-full`} style={{ width: funnel.percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prospección Maps IA */}
        {activeTab === 'prospeccionMaps' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">MÓDULO IA</span>
                  <h2 className="text-xl font-bold text-white">Prospección Maps B2B con IA</h2>
                </div>
                <p className="text-xs text-slate-400">Encuentra y extrae empresas, teléfonos, sitios web y contactos clave directo desde Google Maps</p>
              </div>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nicho o Rubro</label>
                  <input
                    type="text"
                    defaultValue="Clínicas odontológicas y estética"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Ciudad o Región</label>
                  <input
                    type="text"
                    defaultValue="Córdoba, Argentina"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>Escanear Empresas en Maps</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#162343]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">Resultados encontrados: <strong className="text-white">4 leads listos para exportar</strong></span>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Importar 4 al CRM</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Centro Odontológico Nueva Córdoba', address: 'Av. Hipólito Yrigoyen 340', phone: '+54 351 422-9011', rating: '4.8 ★ (120 reviews)', web: 'centroodontologico.com.ar' },
                    { name: 'Dental Care & Ortodoncia', address: 'Chacabuco 680', phone: '+54 351 468-3320', rating: '4.9 ★ (88 reviews)', web: 'dentalcarecba.com' },
                    { name: 'Clínica Estética Dr. Rossi', address: 'Bv. San Juan 412', phone: '+54 351 511-4478', rating: '4.7 ★ (210 reviews)', web: 'drrossiestetica.com' },
                    { name: 'OdontoPlus Cerro de las Rosas', address: 'Av. Rafael Núñez 4100', phone: '+54 351 481-9900', rating: '4.9 ★ (164 reviews)', web: 'odontoplus.ar' },
                  ].map((lead, idx) => (
                    <div key={idx} className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-[#0e172e] border border-[#1a2b52]">
                      <div>
                        <h4 className="text-white font-bold text-xs">{lead.name}</h4>
                        <p className="text-slate-400 text-[11px]">{lead.address} • {lead.phone}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <span className="text-amber-400 font-semibold text-xs">{lead.rating}</span>
                        <span className="text-cyan-400 text-xs underline font-medium">{lead.web}</span>
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">Lead Válido</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Scoring MEDDIC */}
        {activeTab === 'meddic' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">METODOLOGÍA B2B</span>
                <h2 className="text-xl font-bold text-white">Lead Scoring MEDDIC</h2>
              </div>
              <p className="text-xs text-slate-400">Calificación estructurada de oportunidades enterprise para maximizar el ratio de cierre</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { letter: 'M', title: 'Metrics', desc: 'Retorno económico cuantificable que el cliente busca lograr', score: '90%', status: 'Validado' },
                { letter: 'E', title: 'Economic Buyer', desc: 'Persona que tiene la autoridad final para liberar el presupuesto', score: '85%', status: 'Identificado' },
                { letter: 'D', title: 'Decision Criteria', desc: 'Requisitos técnicos y comerciales para seleccionar al proveedor', score: '75%', status: 'Alineado' },
                { letter: 'D', title: 'Decision Process', desc: 'Etapas de compras, legal y directiva necesarias para firmar', score: '60%', status: 'En curso' },
                { letter: 'I', title: 'Identify Pain', desc: 'Dolor o pérdida de dinero crítica que resuelve ClientumCRM', score: '95%', status: 'Crítico' },
                { letter: 'C', title: 'Champion', desc: 'Contacto interno que impulsa activamente nuestra solución', score: '100%', status: 'Confirmado' },
              ].map((item) => (
                <div key={item.title} className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                        {item.letter}
                      </div>
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    </div>
                    <span className="text-cyan-400 font-extrabold text-sm">{item.score}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                  <div className="pt-2 border-t border-[#172547] flex justify-between text-[11px]">
                    <span className="text-slate-500">Estado:</span>
                    <span className="text-emerald-400 font-bold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Objects Studio */}
        {activeTab === 'customObjects' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">CORE ENGINE</span>
                  <h2 className="text-xl font-bold text-white">Custom Objects Studio</h2>
                </div>
                <p className="text-xs text-slate-400">Crea entidades personalizadas para modelar cualquier modelo de negocio en tu CRM</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Crear Objeto Personalizado</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'Contratos & SLA', records: '142 registros', fields: ['Número', 'Fecha Vencimiento', 'Monto Mensual', 'Cláusula Penal'] },
                { name: 'Pólizas de Seguro', records: '89 registros', fields: ['Número Póliza', 'Aseguradora', 'Cobertura', 'Prima Anual'] },
                { name: 'Propiedades & Inmuebles', records: '230 registros', fields: ['Dirección', 'Tipo Operación', 'Valor USD', 'Superficie'] },
                { name: 'Proyectos & Horas', records: '512 registros', fields: ['Nombre Proyecto', 'Horas Estimadas', 'Horas Incurridas', 'Tarifa'] },
                { name: 'Vehículos & Flotas', records: '67 registros', fields: ['Patente', 'Marca/Modelo', 'Kilometraje', 'Último Service'] },
                { name: 'Membresías & Cursos', records: '380 registros', fields: ['Tipo Plan', 'Acceso Campus', 'Estado Pago', 'Vigencia'] },
              ].map((obj) => (
                <div key={obj.name} className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold text-sm">{obj.name}</h4>
                    <span className="text-[11px] text-cyan-400 font-semibold">{obj.records}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Campos del esquema:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {obj.fields.map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded-lg bg-[#0e1832] border border-[#1c2c54] text-slate-300 text-[10px]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflows & Flowchart */}
        {(activeTab === 'workflows' || activeTab === 'automatizaciones') && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">FLOW AUTOMATION</span>
                  <h2 className="text-xl font-bold text-white">Workflows & Flowchart Builder</h2>
                </div>
                <p className="text-xs text-slate-400">Automatizaciones visuales disparadas por eventos de ventas, WhatsApp o cambios de etapa</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Nuevo Flujo</span>
              </button>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#162343] pb-3">
                <div className="flex items-center gap-2.5">
                  <Workflow className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-bold text-sm">Flujo Activo: Cierre de Deal Enterprise</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Ejecutándose (45 disparos hoy)
                </span>
              </div>

              {/* Visual Flow Nodes */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="w-full md:w-1/4 bg-[#0e172e] border border-[#1c2c54] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Disparador (Trigger)</span>
                  <h5 className="text-white font-bold">Oportunidad pasa a "Cerrado (Ganado)"</h5>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block shrink-0" />
                <div className="w-full md:w-1/4 bg-[#0e172e] border border-[#1c2c54] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Acción 1: WhatsApp</span>
                  <h5 className="text-white font-bold">Enviar mensaje de bienvenida y acceso al portal</h5>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block shrink-0" />
                <div className="w-full md:w-1/4 bg-[#0e172e] border border-[#1c2c54] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Acción 2: AFIP</span>
                  <h5 className="text-white font-bold">Emitir Factura A con CAE automáticamente</h5>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block shrink-0" />
                <div className="w-full md:w-1/4 bg-[#0e172e] border border-[#1c2c54] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Acción 3: Tarea</span>
                  <h5 className="text-white font-bold">Asignar llamada de onboarding a operaciones</h5>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CSV Import & Export Studio */}
        {activeTab === 'csvStudio' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <h2 className="text-xl font-bold text-white">CSV Import & Export Studio</h2>
              <p className="text-xs text-slate-400">Importación masiva y exportación de prospectos, clientes, oportunidades y transacciones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                  <span>Importar Archivo CSV / Excel</span>
                </h3>
                <div className="border-2 border-dashed border-[#1c2c54] rounded-2xl p-8 text-center space-y-3 hover:border-cyan-500/50 cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs block">Arrastra tu archivo CSV aquí o haz clic para buscar</span>
                    <span className="text-slate-500 text-[11px]">Soporta .csv, .xlsx, .tsv hasta 50.000 filas</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">
                    Seleccionar Archivo
                  </button>
                </div>
              </div>

              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-emerald-400" />
                  <span>Exportar Bases de Datos del CRM</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Exportar todas las Oportunidades del Pipeline (con montos)', rows: '28 registros' },
                    { label: 'Exportar Empresas y Cuentas Clave B2B', rows: '64 registros' },
                    { label: 'Exportar Contactos y Números de WhatsApp', rows: '380 registros' },
                    { label: 'Exportar Libro de Facturas AFIP del mes actual', rows: '54 facturas' },
                  ].map((exp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#0e172e] border border-[#1a2b52]">
                      <div>
                        <span className="text-xs text-white font-medium block">{exp.label}</span>
                        <span className="text-[10px] text-slate-400">{exp.rows}</span>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-[#152344] hover:bg-[#1a2e5c] text-cyan-300 font-bold text-xs flex items-center gap-1.5">
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Descargar CSV</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp CRM */}
        {(activeTab === 'whatsapp' || activeTab === 'mensajes') && (
          <div className="p-6 space-y-5 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">OMNICANAL PRO</span>
                  <h2 className="text-xl font-bold text-white">WhatsApp CRM Multiagente</h2>
                </div>
                <p className="text-xs text-slate-400">Bandeja unificada con respuestas rápidas, notas de voz, etiquetas y sincronización con el pipeline</p>
              </div>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-3 h-[520px]">
              {/* Chat list */}
              <div className="border-r border-[#152344] p-3 space-y-2 overflow-y-auto">
                {[
                  { name: 'Sebastián Blanco (TechGlobal)', msg: 'Perfecto, envíame la Factura A y el link de pago.', time: '12:45', unread: 1, active: true },
                  { name: 'Romina Soler (DataLogic)', msg: '¿Tienen soporte técnico 24/7 incluido?', time: '11:20', unread: 0, active: false },
                  { name: 'Federico Gómez (SoftBuild)', msg: 'Ya envié la cotización a nuestro director de compras.', time: '10:05', unread: 0, active: false },
                  { name: 'Martín Paredes (EduSmart)', msg: 'Nos vemos en la demo de las 17:00.', time: 'Ayer', unread: 0, active: false },
                ].map((chat, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl cursor-pointer transition-colors ${chat.active ? 'bg-[#152243] border border-cyan-500/30' : 'hover:bg-[#0e172e]'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-bold text-xs">{chat.name}</span>
                      <span className="text-[10px] text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] truncate">{chat.msg}</p>
                  </div>
                ))}
              </div>

              {/* Chat active window */}
              <div className="md:col-span-2 flex flex-col justify-between p-4 bg-[#090f20]">
                <div className="border-b border-[#152344] pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-xs">
                      SB
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs">Sebastián Blanco</h4>
                      <span className="text-[10px] text-emerald-400">TechGlobal S.A. • Oportunidad de $ 45.000</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                    Etapa: Negociación
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3">
                  <div className="bg-[#121c38] p-3 rounded-xl max-w-sm text-xs text-slate-200">
                    Hola Sebastián, te confirmo que la propuesta incluye los 16 módulos de ClientumOS y la integración con AFIP.
                  </div>
                  <div className="bg-cyan-950/80 border border-cyan-500/30 p-3 rounded-xl max-w-sm ml-auto text-xs text-cyan-100">
                    Perfecto, envíame la Factura A y el link de pago.
                  </div>
                </div>

                <div className="pt-3 border-t border-[#152344] flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Escribe una respuesta de WhatsApp..."
                    className="flex-1 bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot WhatsApp 24/7 */}
        {activeTab === 'chatbot' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">IA AUTÓNOMA</span>
                <h2 className="text-xl font-bold text-white">Chatbot WhatsApp 24/7 con IA</h2>
              </div>
              <p className="text-xs text-slate-400">Atención automatizada, calificación de prospectos y agendamiento de demos sin intervención humana</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-white font-bold text-sm">Instrucciones del Agente IA</h3>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nombre del Asistente</label>
                  <input
                    type="text"
                    defaultValue="Sofía - Asesora Comercial de Clientum"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Prompt de Comportamiento del Bot</label>
                  <textarea
                    rows={6}
                    defaultValue="Eres Sofía, la asistente de ventas oficial de Clientum CRM. Tu objetivo es saludar amablemente a los nuevos prospectos que escriban a WhatsApp, consultar el tamaño de su empresa y el rubro, y agendar una demo comercial de 20 minutos con uno de nuestros ejecutivos comerciales."
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Estado del bot en WhatsApp: <strong className="text-emerald-400">Activo 24/7</strong></span>
                  <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
                    Guardar Instrucciones
                  </button>
                </div>
              </div>

              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-white font-bold text-sm">Simulador de Conversación de Prueba</h3>
                <div className="h-64 bg-[#090f20] border border-[#162344] rounded-xl p-4 overflow-y-auto space-y-2.5 text-xs">
                  <div className="bg-[#121c38] p-2.5 rounded-xl max-w-xs text-slate-200">
                    Hola, vi un anuncio de Clientum y quiero saber el precio para 5 vendedores.
                  </div>
                  <div className="bg-cyan-950/80 border border-cyan-500/30 p-2.5 rounded-xl max-w-xs ml-auto text-cyan-100">
                    ¡Hola! Qué gusto saludarte. El plan para 5 usuarios incluye los 16 módulos, WhatsApp CRM y facturación AFIP por $ 49 USD/mes. ¿De qué rubro es tu empresa?
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje de prueba..."
                    className="flex-1 bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button className="px-3.5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">
                    Probar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campañas & Broadcast */}
        {activeTab === 'campaigns' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Campañas & Broadcast Masivo</h2>
                <p className="text-xs text-slate-400">Difusión de promociones, avisos y recordatorios por WhatsApp con alta tasa de apertura</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Nueva Campaña</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Promo Lanzamiento Q3', audience: '1.200 leads calificados', sent: 1200, opened: '94%', conv: '12%', status: 'Completada' },
                { name: 'Recordatorio Renovación Anual', audience: '340 clientes activos', sent: 340, opened: '98%', conv: '24%', status: 'Completada' },
                { name: 'Invitación Webinar AI & Ventas', audience: '2.500 contactos B2B', sent: 2500, opened: '91%', conv: '18%', status: 'Enviando...' },
              ].map((c) => (
                <div key={c.name} className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm">{c.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20">{c.status}</span>
                  </div>
                  <span className="text-slate-400 text-xs block">{c.audience}</span>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#172547] text-xs">
                    <div>
                      <span className="text-slate-500 block">Tasa de lectura:</span>
                      <strong className="text-cyan-400 font-extrabold">{c.opened}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Conversión:</span>
                      <strong className="text-emerald-400 font-extrabold">{c.conv}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Asistente IA Gemini 2.5 Full View */}
        {activeTab === 'aiAssistant' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Asistente IA Gemini 2.5 Copilot</h2>
              </div>
              <p className="text-xs text-slate-400">Tu copiloto comercial con análisis en tiempo real de cuentas, objeciones y probabilidades de cierre</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Generar Pitch de Cierre', desc: 'Crea un pitch personalizado para convencer al director de compras de TechGlobal S.A.' },
                { title: 'Analizar Objeción de Precio', desc: 'Genera 3 respuestas persuasivas cuando el cliente dice "está fuera de presupuesto".' },
                { title: 'Resumen de pipeline semanal', desc: 'Calcula ingresos proyectados para este mes según probabilidad de cada etapa.' },
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleQuickAction(p.title);
                    setIsAiSidebarOpen(true);
                  }}
                  className="bg-[#0b1224] border border-[#162343] hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl text-left space-y-2 transition-colors cursor-pointer group"
                >
                  <h4 className="text-white font-bold text-sm group-hover:text-cyan-400">{p.title}</h4>
                  <p className="text-slate-400 text-xs">{p.desc}</p>
                  <span className="text-cyan-400 text-xs font-bold inline-flex items-center gap-1">
                    <span>Ejecutar con IA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generador Estrategias GTM */}
        {activeTab === 'gtmStrategy' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Generador Estrategias Go-To-Market (GTM)</h2>
              </div>
              <p className="text-xs text-slate-400">Plan estratégico completo con propuesta única de valor, ICP y canales de tracción</p>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Producto o Solución</label>
                  <input
                    type="text"
                    defaultValue="ClientumCRM SaaS B2B"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mercado Objetivo (ICP)</label>
                  <input
                    type="text"
                    defaultValue="PyMEs y empresas B2B de 5 a 50 empleados en Latam"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#162343] space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider text-cyan-400">Plan de Tracción Generado</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0e172e] rounded-xl border border-[#1c2c54] space-y-1">
                    <span className="font-bold text-white block">Canal 1: Prospección Fría (SDR)</span>
                    <p className="text-slate-400 text-[11px]">Campañas automatizadas de LinkedIn + WhatsApp a tomadores de decisión.</p>
                  </div>
                  <div className="p-3.5 bg-[#0e172e] rounded-xl border border-[#1c2c54] space-y-1">
                    <span className="font-bold text-white block">Canal 2: Google Search & SEO</span>
                    <p className="text-slate-400 text-[11px]">Captación con intención directa: "CRM con AFIP y WhatsApp en Argentina".</p>
                  </div>
                  <div className="p-3.5 bg-[#0e172e] rounded-xl border border-[#1c2c54] space-y-1">
                    <span className="font-bold text-white block">Canal 3: Alianzas con Contadores</span>
                    <p className="text-slate-400 text-[11px]">Recomendación mutua por facturación electrónica y cobros MercadoPago.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agente Outreach SDR */}
        {activeTab === 'sdrOutreach' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Agente Outreach Automatizado (SDR)</h2>
              </div>
              <p className="text-xs text-slate-400">Secuencias multicanal de prospección en frío con personalización por Inteligencia Artificial</p>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">Cadencia de Prospección B2B (4 Pasos)</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-500/30">
                  Tasa de respuesta: 28.4%
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { step: 'Día 1: Mensaje Personalizado LinkedIn', desc: 'Saludo enfocado en dolor operativo y ahorro de tiempo en cobranzas.' },
                  { step: 'Día 3: Mensaje WhatsApp con Caso de Éxito', desc: 'Envío de PDF de 1 página con resultados de otra empresa del mismo rubro.' },
                  { step: 'Día 6: Invitación a Demo Rápida', desc: 'Enlace a calendario de 15 minutos para ver el sistema en vivo.' },
                  { step: 'Día 10: Breakup Email de Despedida', desc: 'Cierre de ciclo amable: "¿Tiene sentido hablar el mes próximo?"' },
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0e172e] border border-[#1a2b52] flex items-center justify-between">
                    <div>
                      <h5 className="text-white font-bold">{s.step}</h5>
                      <p className="text-slate-400 text-[11px]">{s.desc}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#16254a] text-cyan-300 text-[10px] font-bold">Activo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Ad Copy Studio */}
        {activeTab === 'adCopy' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">AI Ad Copy Studio</h2>
              </div>
              <p className="text-xs text-slate-400">Genera copies publicitarios de alto impacto para Meta Ads, Google Ads y LinkedIn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-white font-bold text-sm">Configuración de Campaña</h3>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Objetivo del Anuncio</label>
                  <input
                    type="text"
                    defaultValue="Generación de Leads Calificados para CRM B2B"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Ángulo de Venta Principal</label>
                  <input
                    type="text"
                    defaultValue="Ahorra 15 horas por semana centralizando WhatsApp y facturas AFIP"
                    className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">
                  Generar Variaciones con Gemini
                </button>
              </div>

              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="text-white font-bold text-sm">Copy Generado (Variación Ganadora)</h3>
                <div className="p-4 bg-[#090f20] border border-[#162344] rounded-xl space-y-2 text-xs">
                  <span className="text-cyan-400 font-bold block">🔥 ¿Tu equipo pierde ventas por demorar en responder WhatsApp?</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Con ClientumCRM, todos tus vendedores responden desde un único número oficial, con chatbot 24/7, facturación electrónica AFIP y cobros MercadoPago integrados.
                  </p>
                  <span className="text-emerald-400 font-bold text-[11px] block">👉 Solicita tu demo en vivo hoy mismo y prueba los 16 módulos.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ERP & Facturación AFIP */}
        {activeTab === 'erp' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">ERP & Facturación Electrónica AFIP</h2>
                </div>
                <p className="text-xs text-slate-400">Emisión de Facturas A, B, C con CAE oficial y conciliación fiscal automática</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Emitir Nueva Factura</span>
              </button>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0e1832] text-slate-400 text-[11px] uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Tipo / Número</th>
                    <th className="px-5 py-3.5">Cliente / CUIT</th>
                    <th className="px-5 py-3.5">CAE Oficial</th>
                    <th className="px-5 py-3.5">Total Facturado</th>
                    <th className="px-5 py-3.5">Estado AFIP</th>
                    <th className="px-5 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#152344]">
                  {[
                    { type: 'Factura A 0001-0000452', client: 'TechGlobal S.A.', cuit: '30-71442109-8', cae: '74129845129841', total: '$ 180.000', status: 'Aprobada' },
                    { type: 'Factura A 0001-0000451', client: 'DataLogic Corp', cuit: '30-68994512-4', cae: '74129845129840', total: '$ 95.000', status: 'Aprobada' },
                    { type: 'Factura B 0001-0000112', client: 'Carlos Valenzuela', cuit: '20-33412984-7', cae: '74129845129839', total: '$ 38.000', status: 'Aprobada' },
                  ].map((inv) => (
                    <tr key={inv.type} className="hover:bg-[#111d3d] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{inv.type}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-white block font-medium">{inv.client}</span>
                        <span className="text-[10px] text-slate-400">{inv.cuit}</span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-cyan-300">{inv.cae}</td>
                      <td className="px-5 py-3.5 font-bold text-white">{inv.total}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button className="text-cyan-400 hover:text-cyan-300 font-semibold">
                          Descargar PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cobros MercadoPago */}
        {activeTab === 'payments' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Cobros MercadoPago & Pasarelas</h2>
                </div>
                <p className="text-xs text-slate-400">Genera links de pago instantáneos, códigos QR y cobros recurrentes sincronizados con el CRM</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Generar Link de Pago</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Total cobrado este mes</span>
                <h3 className="text-white text-2xl font-black mt-1">$ 582.400</h3>
                <span className="text-emerald-400 text-xs font-bold mt-2 block">100% acreditado en cuenta</span>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Links activos enviados</span>
                <h3 className="text-cyan-400 text-2xl font-black mt-1">14 links</h3>
                <span className="text-slate-400 text-xs mt-2 block">8 pagados, 6 pendientes</span>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Suscripciones recurrentes</span>
                <h3 className="text-indigo-400 text-2xl font-black mt-1">29 empresas</h3>
                <span className="text-indigo-300 text-xs mt-2 block">Débito automático activo</span>
              </div>
            </div>
          </div>
        )}

        {/* Portal del Cliente */}
        {activeTab === 'clientPortal' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Portal del Cliente (Client Hub)</h2>
              </div>
              <p className="text-xs text-slate-400">Portal de autoservicio para que tus clientes consulten presupuestos, descarguen facturas y abran tickets</p>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#162343] pb-3">
                <span className="text-white font-bold text-sm">Vista Previa del Portal para Clientes</span>
                <span className="text-xs text-cyan-400">clientum.me/portal/techglobal</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0e172e] border border-[#1a2b52] space-y-1">
                  <span className="text-slate-400">Cotizaciones Aprobadas</span>
                  <h4 className="text-white font-bold text-base">3 presupuestos</h4>
                </div>
                <div className="p-4 rounded-xl bg-[#0e172e] border border-[#1a2b52] space-y-1">
                  <span className="text-slate-400">Facturas Pagadas</span>
                  <h4 className="text-emerald-400 font-bold text-base">12 comprobantes</h4>
                </div>
                <div className="p-4 rounded-xl bg-[#0e172e] border border-[#1a2b52] space-y-1">
                  <span className="text-slate-400">Tickets de Soporte</span>
                  <h4 className="text-cyan-400 font-bold text-base">0 pendientes</h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restaurantes & KDS */}
        {activeTab === 'restaurant' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Restaurantes & Kitchen Display System (KDS)</h2>
              </div>
              <p className="text-xs text-slate-400">Comandera digital, pedidos en mesas y control de tiempos de cocina en tiempo real</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { table: 'Mesa 4 (Salón)', order: '2x Bife de Chorizo, 1x Ensalada César', time: '8 min', status: 'En Cocina', color: 'border-amber-500/40' },
                { table: 'Mesa 11 (Terraza)', order: '3x Hamburguesa Doble Cheddar, 3x Papas', time: '14 min', status: 'Listo p/ Despachar', color: 'border-emerald-500/40' },
                { table: 'Delivery #412', order: '1x Pizza Napolitana Grande + Bebida', time: '3 min', status: 'Nuevo Pedido', color: 'border-cyan-500/40' },
              ].map((kds, idx) => (
                <div key={idx} className={`bg-[#0b1224] border ${kds.color} rounded-2xl p-5 shadow-xl space-y-3`}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm">{kds.table}</h4>
                    <span className="text-xs font-mono text-amber-400 font-bold">{kds.time}</span>
                  </div>
                  <p className="text-slate-300 text-xs">{kds.order}</p>
                  <div className="pt-2 border-t border-[#172547] flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300">{kds.status}</span>
                    <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs">Marcar Listo</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* E-commerce Orders */}
        {activeTab === 'ecommerce' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">E-commerce Orders & Envíos</h2>
              </div>
              <p className="text-xs text-slate-400">Gestión de órdenes de compra, stock, guías de envío y carritos abandonados</p>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0e1832] text-slate-400 text-[11px] uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Pedido #</th>
                    <th className="px-5 py-3.5">Cliente</th>
                    <th className="px-5 py-3.5">Productos</th>
                    <th className="px-5 py-3.5">Total</th>
                    <th className="px-5 py-3.5">Estado Envío</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#152344]">
                  {[
                    { id: '#ORD-8941', client: 'Mariana López', items: '2 items (Plan Software Anual)', total: '$ 78.000', shipping: 'Entregado' },
                    { id: '#ORD-8940', client: 'Lucas Ferreyra', items: '1 item (Dispositivo POS Lector)', total: '$ 24.500', shipping: 'En camino' },
                    { id: '#ORD-8939', client: 'Esteban Morales', items: '3 items (Licencias CRM extra)', total: '$ 45.000', shipping: 'Preparando' },
                  ].map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#111d3d] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{ord.id}</td>
                      <td className="px-5 py-3.5 text-white">{ord.client}</td>
                      <td className="px-5 py-3.5 text-slate-300">{ord.items}</td>
                      <td className="px-5 py-3.5 font-bold text-cyan-400">{ord.total}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                          {ord.shipping}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Suite SEO Completa */}
        {activeTab === 'seoSuite' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Suite SEO Completa</h2>
              </div>
              <p className="text-xs text-slate-400">Monitoreo de posiciones en Google, auditoría de keywords, backlinks y velocidad web</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Salud del Sitio Web</span>
                <h3 className="text-emerald-400 text-2xl font-black mt-1">98 / 100</h3>
                <span className="text-slate-400 text-[11px] mt-2 block">0 errores críticos</span>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Keywords en Top 3</span>
                <h3 className="text-cyan-400 text-2xl font-black mt-1">24 palabras</h3>
                <span className="text-emerald-400 text-[11px] mt-2 block">+6 esta semana</span>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Tráfico Orgánico Mensual</span>
                <h3 className="text-white text-2xl font-black mt-1">18.400 visitas</h3>
                <span className="text-emerald-400 text-[11px] mt-2 block">+32% crecimiento</span>
              </div>
              <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-5 shadow-xl">
                <span className="text-slate-400 text-xs">Domain Authority (DA)</span>
                <h3 className="text-indigo-400 text-2xl font-black mt-1">42 / 100</h3>
                <span className="text-indigo-300 text-[11px] mt-2 block">Perfil de enlaces limpio</span>
              </div>
            </div>
          </div>
        )}

        {/* Desarrollo Web & Widgets */}
        {activeTab === 'webDev' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div>
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Desarrollo Web & Widgets Integrables</h2>
              </div>
              <p className="text-xs text-slate-400">Genera widgets embebibles de cotización, formularios de captura y botones flotantes de WhatsApp para cualquier sitio web</p>
            </div>

            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-white font-bold text-sm">Código de Embebido del Widget de Captura</h3>
              <div className="bg-[#090f20] border border-[#162344] rounded-xl p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                {`<script src="https://cdn.clientum.me/widget/v2.js" data-workspace="clientum-latam" async></script>`}
              </div>
              <p className="text-slate-400 text-xs">
                Pega este script antes del cierre de la etiqueta &lt;/body&gt; en tu sitio WordPress, Webflow, Shopify o React para capturar leads directamente en tu pipeline.
              </p>
            </div>
          </div>
        )}

        {/* Power Suite (16 Modul.) EXACT MATCH TO SCREENSHOT 2 */}
        {activeTab === 'powerSuite' && (
          <div className="p-6 space-y-6 max-w-[1550px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">TODO EN UNO</span>
                  <h2 className="text-xl font-bold text-white">Power Suite (16 Módulos Integrados)</h2>
                </div>
                <p className="text-xs text-slate-400">El ecosistema integral de software que sustituye más de 12 suscripciones independientes</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                16 / 16 Módulos Activos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Pipeline Kanban', desc: 'Control de 5 etapas con cálculo dinámico', tab: 'oportunidades' as DashboardTab, icon: Briefcase },
                { title: 'WhatsApp CRM', desc: 'Bandeja multicanal con respuestas rápidas', tab: 'whatsapp' as DashboardTab, icon: MessageSquare },
                { title: 'Chatbot 24/7', desc: 'Atención automática con IA de Gemini', tab: 'chatbot' as DashboardTab, icon: Bot },
                { title: 'Facturación AFIP', desc: 'Facturas electrónicas oficiales A, B, C', tab: 'erp' as DashboardTab, icon: Receipt },
                { title: 'Cobros MercadoPago', desc: 'Links de pago y conciliación inmediata', tab: 'payments' as DashboardTab, icon: CreditCard },
                { title: 'Custom Objects', desc: 'Modelado de entidades a medida', tab: 'customObjects' as DashboardTab, icon: Database },
                { title: 'Workflows Flowchart', desc: 'Automatización visual de acciones', tab: 'workflows' as DashboardTab, icon: Workflow },
                { title: 'Prospección Maps', desc: 'Extracción B2B de leads locales', tab: 'prospeccionMaps' as DashboardTab, icon: MapPin },
                { title: 'Lead Scoring MEDDIC', desc: 'Calificación estructurada para empresas', tab: 'meddic' as DashboardTab, icon: Target },
                { title: 'Campañas Broadcast', desc: 'Envíos masivos a audiencias segmentadas', tab: 'campaigns' as DashboardTab, icon: Send },
                { title: 'Agente Outreach SDR', desc: 'Cadencias frías de prospección multicanal', tab: 'sdrOutreach' as DashboardTab, icon: Cpu },
                { title: 'AI Ad Copy Studio', desc: 'Generación de anuncios con conversión', tab: 'adCopy' as DashboardTab, icon: FileText },
                { title: 'Estrategias GTM', desc: 'Propuestas de valor y tracción B2B', tab: 'gtmStrategy' as DashboardTab, icon: Compass },
                { title: 'Portal del Cliente', desc: 'Autoservicio con facturas y presupuestos', tab: 'clientPortal' as DashboardTab, icon: UserCheck },
                { title: 'Restaurantes & KDS', desc: 'Comandera de cocina y control de mesas', tab: 'restaurant' as DashboardTab, icon: Utensils },
                { title: 'Suite SEO Completa', desc: 'Rankings, auditoría y análisis de palabras', tab: 'seoSuite' as DashboardTab, icon: Globe },
              ].map((mod) => {
                const IconComponent = mod.icon;
                return (
                  <button
                    key={mod.title}
                    onClick={() => setActiveTab(mod.tab)}
                    className="p-5 rounded-2xl bg-[#0b1224] border border-[#162343] hover:border-cyan-500/50 text-left space-y-2 transition-all hover:scale-[1.02] cursor-pointer group shadow-lg"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#121c38] border border-[#1d2d56] flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{mod.title}</h4>
                    <p className="text-slate-400 text-xs">{mod.desc}</p>
                    <span className="text-cyan-400 text-[11px] font-bold flex items-center gap-1 pt-1">
                      <span>Abrir módulo</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Configuración */}
        {(activeTab === 'settings' || activeTab === 'configuracion') && (
          <div className="p-6 space-y-5 max-w-[900px]">
            <h2 className="text-xl font-bold text-white">Configuración del Workspace</h2>
            <div className="bg-[#0b1224] border border-[#162343] rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre de la Organización</label>
                <input
                  type="text"
                  defaultValue="Clientum Latam"
                  className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Moneda del CRM</label>
                <input
                  type="text"
                  defaultValue="USD ($) / ARS ($)"
                  className="w-full bg-[#0e172e] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Asistente IA - Modelo Predeterminado</label>
                <input
                  type="text"
                  disabled
                  defaultValue="Gemini 3.8 Flash (DeepMind Live)"
                  className="w-full bg-[#090f20] border border-[#1c2c54] rounded-xl px-3.5 py-2 text-xs text-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── RIGHT SIDEBAR: ASISTENTE IA MATCHING SCREENSHOT EXACTLY ───────── */}
      {isAiSidebarOpen && (
        <aside
          id="dashboard_ai_assistant_sidebar"
          className="w-80 lg:w-[340px] bg-[#090f1f] border-l border-[#15203b] flex flex-col shrink-0 select-none z-20 shadow-2xl"
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-[#15203b] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAiSidebarOpen(false)}
                title="Cerrar panel"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-cyan-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090f1f]" />
              </div>

              <div>
                <h3 className="text-white text-xs font-bold tracking-tight">Asistente IA</h3>
                <span className="text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  En línea
                </span>
              </div>
            </div>

            {/* Action buttons matching screenshot (Video, Phone, More) */}
            <div className="flex items-center gap-2 text-slate-400">
              <button title="Llamada de voz" className="p-1 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button title="Videollamada" className="p-1 hover:text-white transition-colors">
                <Video className="w-3.5 h-3.5" />
              </button>
              <button title="Opciones" className="p-1 hover:text-white transition-colors">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat conversation area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
            {/* Date badge */}
            <div className="flex justify-center my-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#121c38] text-slate-400 text-[10px] font-semibold">
                Hoy
              </span>
            </div>

            {chatMessages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex flex-col items-end">
                    <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-700 to-cyan-700 text-white shadow-md">
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-cyan-200">
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3 h-3 text-cyan-300" />
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={msg.id} className="flex flex-col items-start">
                    <div className="max-w-[90%] px-3.5 py-3 rounded-2xl rounded-tl-sm bg-[#0e172e] border border-[#1a2b52] text-slate-200 shadow-lg">
                      <p className="leading-relaxed text-slate-100 font-medium">{msg.text}</p>

                      {msg.bullets && msg.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1 text-slate-300">
                          {msg.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span className="leading-snug">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-end mt-1.5 text-[10px] text-slate-500">
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {isAiLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0e172e] border border-[#1a2b52] text-slate-400 text-xs animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>Analizando datos comerciales con Gemini...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 border-t border-[#15203b]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage('¿Cuáles son los negocios de mayor valor?')}
              className="px-2 py-1 rounded-lg bg-[#111b33] hover:bg-[#182647] text-[10px] text-slate-300 whitespace-nowrap transition-colors"
            >
              💰 Top negocios
            </button>
            <button
              onClick={() => handleSendMessage('¿Cómo va la tasa de conversión?')}
              className="px-2 py-1 rounded-lg bg-[#111b33] hover:bg-[#182647] text-[10px] text-slate-300 whitespace-nowrap transition-colors"
            >
              📈 Conversión
            </button>
            <button
              onClick={() => handleSendMessage('Sugerir 3 acciones para hoy')}
              className="px-2 py-1 rounded-lg bg-[#111b33] hover:bg-[#182647] text-[10px] text-slate-300 whitespace-nowrap transition-colors"
            >
              ⚡ Acciones
            </button>
          </div>

          {/* Bottom Chat Input Bar Matching Screenshot */}
          <div className="p-3 border-t border-[#15203b]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0e172e] border border-[#1a2b52] focus-within:border-cyan-500/60 transition-colors"
            >
              <button
                type="button"
                title="Emojis"
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <Smile className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />

              <button
                type="button"
                title="Adjuntar archivo"
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="submit"
                title="Enviar mensaje"
                className="p-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white transition-transform active:scale-95 shadow-sm"
              >
                {inputPrompt.trim() ? <Send className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* ── MODAL: NUEVO NEGOCIO ────────────────────────────────────────── */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0d152a] border border-[#1e305d] p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#18274d]">
              <h3 className="text-white font-bold text-sm">Crear Nuevo Negocio</h3>
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Nombre de la oportunidad</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Renovación Anual Cloud"
                  value={newDealForm.title}
                  onChange={(e) => setNewDealForm({ ...newDealForm, title: e.target.value })}
                  className="w-full rounded-xl bg-[#090f20] border border-[#1c2c54] px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Empresa / Cuenta</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Austral Logistics S.A."
                  value={newDealForm.company}
                  onChange={(e) => setNewDealForm({ ...newDealForm, company: e.target.value })}
                  className="w-full rounded-xl bg-[#090f20] border border-[#1c2c54] px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Monto estimado ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="12000"
                    value={newDealForm.amount}
                    onChange={(e) => setNewDealForm({ ...newDealForm, amount: e.target.value })}
                    className="w-full rounded-xl bg-[#090f20] border border-[#1c2c54] px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Etapa inicial</label>
                  <select
                    value={newDealForm.stage}
                    onChange={(e) => setNewDealForm({ ...newDealForm, stage: e.target.value as Deal['stage'] })}
                    className="w-full rounded-xl bg-[#090f20] border border-[#1c2c54] px-2.5 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="calificacion">Calificación</option>
                    <option value="propuesta">Propuesta</option>
                    <option value="negociacion">Negociación</option>
                    <option value="cerrado">Cerrado (Ganado)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Contacto principal</label>
                <input
                  type="text"
                  placeholder="Ej. Carlos Valenzuela"
                  value={newDealForm.contactName}
                  onChange={(e) => setNewDealForm({ ...newDealForm, contactName: e.target.value })}
                  className="w-full rounded-xl bg-[#090f20] border border-[#1c2c54] px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#18274d]">
                <button
                  type="button"
                  onClick={() => setIsNewDealModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#111a33] text-slate-300 hover:text-white font-medium text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
                >
                  Guardar Oportunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: DETALLE DEL NEGOCIO ───────────────────────────────────── */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0d152a] border border-[#1e305d] p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#18274d]">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  Detalle del Negocio
                </span>
                <h3 className="text-white font-bold text-base">{selectedDeal.title}</h3>
              </div>
              <button onClick={() => setSelectedDeal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#15203b]">
                <span className="text-slate-400">Empresa</span>
                <span className="text-white font-semibold">{selectedDeal.company}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#15203b]">
                <span className="text-slate-400">Contacto</span>
                <span className="text-white font-semibold">{selectedDeal.contactName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#15203b]">
                <span className="text-slate-400">Valor Estimado</span>
                <span className="text-cyan-400 font-extrabold text-sm">
                  $ {selectedDeal.amount.toLocaleString('es-AR')}
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mover a etapa:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['nuevo', 'calificacion', 'propuesta', 'negociacion', 'cerrado'] as Deal['stage'][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => moveDealStage(selectedDeal.id, st)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        selectedDeal.stage === st
                          ? 'bg-cyan-500 text-black'
                          : 'bg-[#121c35] text-slate-300 hover:bg-[#182649]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#18274d] flex justify-end">
              <button
                onClick={() => setSelectedDeal(null)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardApp;
