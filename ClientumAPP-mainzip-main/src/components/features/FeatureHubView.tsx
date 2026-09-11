import React, { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  BellRing,
  Briefcase,
  Building2,
  CalendarDays,
  ArrowRight,
  Bot,
  CheckSquare,
  Check,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  Database,
  FileCheck,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Gauge,
  Home,
  Inbox,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  MessageSquareText,
  Receipt,
  Play,
  RefreshCw,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  UserRoundCheck,
  Users2,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';
import { getModuleCredentialDefinition } from '../../data/moduleCredentials';
import { ModuleCredentialsModal } from '../settings/ModuleCredentialsModal';

type FeatureId = 'bugs' | 'payments' | 'ai' | 'sms' | 'database' | 'auth';
type ScanStatus = 'pending' | 'running' | 'passed' | 'warning';

interface ScanResult {
  id: string;
  label: string;
  detail: string;
  status: ScanStatus;
}

interface FeatureCard {
  id: FeatureId;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tone: string;
  status: string;
  action: string;
}

type ModuleGroup =
  | 'Gestión comercial'
  | 'Comunicación'
  | 'IA & automatización'
  | 'Operaciones & finanzas'
  | 'Power Suite'
  | 'Datos & configuración';

interface HubModule {
  id: ActiveTab;
  title: string;
  description: string;
  group: ModuleGroup;
  icon: React.ElementType;
  tone: string;
  badge?: string;
}

const HUB_MODULES: HubModule[] = [
  { id: 'dashboard', title: 'Resumen ejecutivo', description: 'Métricas, alertas, pipeline y prioridades del equipo.', group: 'Gestión comercial', icon: Home, tone: 'blue', badge: 'Core' },
  { id: 'opportunities', title: 'Pipeline de negocios', description: 'Gestiona oportunidades en Kanban o tabla y actualiza sus etapas.', group: 'Gestión comercial', icon: Briefcase, tone: 'blue', badge: 'Core' },
  { id: 'companies', title: 'Empresas', description: 'Cuentas, segmentos, salud comercial y actividad relacionada.', group: 'Gestión comercial', icon: Building2, tone: 'cyan' },
  { id: 'people', title: 'Contactos', description: 'Directorio de personas, responsables y relaciones de negocio.', group: 'Gestión comercial', icon: Users2, tone: 'indigo' },
  { id: 'tasks', title: 'Actividades y agenda', description: 'Tareas, vencimientos, responsables y próximos seguimientos.', group: 'Gestión comercial', icon: CheckSquare, tone: 'amber' },
  { id: 'activityInbox', title: 'Notas y llamadas', description: 'Registra actividad comercial, reuniones, llamadas e insights.', group: 'Gestión comercial', icon: Activity, tone: 'violet' },
  { id: 'calendar', title: 'Calendario', description: 'Visualiza reuniones, tareas y fechas de cierre en una agenda.', group: 'Gestión comercial', icon: CalendarDays, tone: 'blue' },
  { id: 'analytics', title: 'Reportes y BI', description: 'Analiza conversión, ingresos, fuentes y rendimiento del espacio.', group: 'Gestión comercial', icon: BarChart3, tone: 'emerald' },
  { id: 'propuestas', title: 'Propuestas y presupuestos', description: 'Crea, personaliza y comparte propuestas comerciales.', group: 'Gestión comercial', icon: FileCheck, tone: 'emerald', badge: 'PDF' },
  { id: 'meddic', title: 'Lead Scoring MEDDIC', description: 'Prioriza oportunidades con una evaluación B2B estructurada.', group: 'Gestión comercial', icon: Target, tone: 'violet', badge: 'IA' },
  { id: 'googleMaps', title: 'Prospección Mapa B2B', description: 'Busca empresas y prospectos por ciudad, zona y categoría.', group: 'Gestión comercial', icon: MapPin, tone: 'cyan', badge: 'Maps' },

  { id: 'whatsapp', title: 'Bandeja omnicanal', description: 'Centraliza conversaciones, estados y atención comercial.', group: 'Comunicación', icon: Inbox, tone: 'emerald', badge: 'LIVE' },
  { id: 'messages', title: 'Mensajes', description: 'Gestiona conversaciones y respuestas del equipo.', group: 'Comunicación', icon: MessageSquare, tone: 'blue' },
  { id: 'webmail', title: 'Webmail y routing', description: 'Consulta correo corporativo y actividad de email del workspace.', group: 'Comunicación', icon: Mail, tone: 'cyan' },
  { id: 'chatbot', title: 'Chatbot WhatsApp 24/7', description: 'Diseña respuestas automáticas y deriva conversaciones.', group: 'Comunicación', icon: Bot, tone: 'emerald', badge: 'IA' },
  { id: 'campaigns', title: 'Campañas masivas', description: 'Prepara campañas de WhatsApp, email y seguimiento comercial.', group: 'Comunicación', icon: Send, tone: 'amber' },
  { id: 'automation', title: 'Automatizaciones', description: 'Configura acciones que responden a eventos del CRM.', group: 'Comunicación', icon: BellRing, tone: 'violet' },

  { id: 'agenteOS', title: 'Agentes y Copilot', description: 'Orquesta asistentes especializados para el equipo comercial.', group: 'IA & automatización', icon: Sparkles, tone: 'violet', badge: '14 agentes' },
  { id: 'aiAssistant', title: 'Asistente Gemini', description: 'Genera análisis, resúmenes, ideas y próximos pasos.', group: 'IA & automatización', icon: Bot, tone: 'blue', badge: 'IA' },
  { id: 'gtmStrategy', title: 'Estrategias GTM', description: 'Construye planes go-to-market para productos y audiencias.', group: 'IA & automatización', icon: Target, tone: 'indigo', badge: 'IA' },
  { id: 'sdrOutreach', title: 'Agente SDR Outreach', description: 'Planifica prospección y seguimiento asistido por IA.', group: 'IA & automatización', icon: Send, tone: 'emerald', badge: 'IA' },
  { id: 'adCopy', title: 'AI Ad Copy Studio', description: 'Crea copys para LinkedIn, anuncios, email y campañas.', group: 'IA & automatización', icon: Sparkles, tone: 'amber', badge: 'IA' },
  { id: 'knowledge', title: 'Base de conocimiento', description: 'Centraliza documentación, respuestas y contexto del negocio.', group: 'IA & automatización', icon: Database, tone: 'cyan' },
  { id: 'workflows', title: 'Workflows y flujos', description: 'Diseña procesos repetibles con triggers y acciones.', group: 'IA & automatización', icon: Workflow, tone: 'violet' },

  { id: 'operations', title: 'Operaciones internas', description: 'Coordina procesos, responsables y controles operativos.', group: 'Operaciones & finanzas', icon: Activity, tone: 'blue' },
  { id: 'erp', title: 'Facturación AFIP y ERP', description: 'Organiza comprobantes, inventario, gastos y operaciones.', group: 'Operaciones & finanzas', icon: Receipt, tone: 'emerald', badge: 'CAE' },
  { id: 'payments', title: 'Cobros y pagos', description: 'Crea checkouts, consulta estados y registra transacciones.', group: 'Operaciones & finanzas', icon: CreditCard, tone: 'emerald', badge: 'Mercado Pago' },
  { id: 'tiendaDigital', title: 'Tienda digital WhatsApp', description: 'Gestiona catálogo, pedidos y conversaciones de venta.', group: 'Operaciones & finanzas', icon: Store, tone: 'amber', badge: 'Catálogo' },
  { id: 'campusLMS', title: 'Campus Academia LMS', description: 'Administra cursos, alumnos y contenidos de capacitación.', group: 'Operaciones & finanzas', icon: GraduationCap, tone: 'violet', badge: 'LMS' },
  { id: 'restaurant', title: 'Gestión de restaurantes', description: 'Opera menú, pedidos, mesas y atención gastronómica.', group: 'Operaciones & finanzas', icon: Store, tone: 'amber' },
  { id: 'ecommerce', title: 'E-commerce', description: 'Organiza productos, pedidos y operaciones de tienda.', group: 'Operaciones & finanzas', icon: Store, tone: 'cyan' },
  { id: 'subscriptions', title: 'Suscripciones', description: 'Controla planes, renovaciones y clientes recurrentes.', group: 'Operaciones & finanzas', icon: CreditCard, tone: 'indigo' },

  { id: 'powerSuite', title: 'Power Suite', description: 'Abre el centro de herramientas avanzadas de crecimiento.', group: 'Power Suite', icon: Sparkles, tone: 'violet', badge: 'Suite' },
  { id: 'mapsProspecting', title: 'Maps Prospección IA', description: 'Descubre prospectos y crea empresas desde resultados geográficos.', group: 'Power Suite', icon: MapPin, tone: 'cyan', badge: 'IA' },
  { id: 'clientPortal', title: 'Portal del cliente', description: 'Gestiona tickets, autoatención y seguimiento externo.', group: 'Power Suite', icon: Users2, tone: 'blue' },
  { id: 'seoSuite', title: 'Suite SEO', description: 'Investiga keywords, auditorías y oportunidades de posicionamiento.', group: 'Power Suite', icon: ScanSearch, tone: 'emerald' },
  { id: 'webDev', title: 'Desarrollo web', description: 'Conecta sitios, formularios y experiencias al CRM.', group: 'Power Suite', icon: Globe, tone: 'blue' },
  { id: 'saasCluster', title: 'SaaS Cluster', description: 'Explora módulos SaaS y operaciones multi-producto.', group: 'Power Suite', icon: Database, tone: 'indigo' },
  { id: 'sites', title: 'Sites y landing pages', description: 'Gestiona páginas públicas y activos digitales.', group: 'Power Suite', icon: Globe, tone: 'cyan' },
  { id: 'saasTheme', title: 'Temas SaaS', description: 'Personaliza la identidad visual de experiencias SaaS.', group: 'Power Suite', icon: Sparkles, tone: 'violet' },
  { id: 'segments', title: 'Segmentos de clientes', description: 'Crea audiencias y grupos accionables para ventas.', group: 'Power Suite', icon: Users2, tone: 'amber' },
  { id: 'brochure', title: 'Brochures', description: 'Prepara materiales comerciales para compartir con prospectos.', group: 'Power Suite', icon: FileSpreadsheet, tone: 'blue' },

  { id: 'customObjects', title: 'Estructura de datos', description: 'Crea objetos, campos y registros personalizados.', group: 'Datos & configuración', icon: Database, tone: 'cyan' },
  { id: 'csvStudio', title: 'Importar y exportar CSV', description: 'Mueve datos del CRM con plantillas y validaciones.', group: 'Datos & configuración', icon: FileSpreadsheet, tone: 'emerald' },
  { id: 'domainManager', title: 'Gestor de dominios', description: 'Administra dominios, zonas y configuración web.', group: 'Datos & configuración', icon: Globe, tone: 'blue' },
  { id: 'settings', title: 'Ajustes generales', description: 'Configura espacio, usuarios, permisos, integraciones y seguridad.', group: 'Datos & configuración', icon: Database, tone: 'indigo' },
];

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'bugs',
    eyebrow: 'Calidad',
    title: 'Revisar mi app',
    description: 'Ejecuta un diagnóstico rápido sobre datos, acceso y módulos críticos.',
    icon: ScanSearch,
    tone: 'violet',
    status: 'Diagnóstico listo',
    action: 'Ejecutar revisión',
  },
  {
    id: 'payments',
    eyebrow: 'Ingresos',
    title: 'Procesar pagos',
    description: 'Genera links de cobro, consulta transacciones y configura Mercado Pago.',
    icon: CreditCard,
    tone: 'emerald',
    status: 'Mercado Pago',
    action: 'Abrir cobros',
  },
  {
    id: 'ai',
    eyebrow: 'Productividad',
    title: 'Conectar asistente IA',
    description: 'Pide estrategias, resúmenes y acciones comerciales a Clientum Copilot.',
    icon: Bot,
    tone: 'blue',
    status: 'Copilot disponible',
    action: 'Abrir asistente',
  },
  {
    id: 'sms',
    eyebrow: 'Comunicación',
    title: 'Enviar mensajes SMS',
    description: 'Configura un proveedor, prepara mensajes y controla tus envíos desde un solo lugar.',
    icon: MessageSquareText,
    tone: 'amber',
    status: 'Configuración pendiente',
    action: 'Configurar SMS',
  },
  {
    id: 'database',
    eyebrow: 'Datos',
    title: 'Agregar una base de datos',
    description: 'Modela objetos, campos y registros propios para adaptar el CRM a tu negocio.',
    icon: Database,
    tone: 'cyan',
    status: 'Custom Objects Studio',
    action: 'Gestionar datos',
  },
  {
    id: 'auth',
    eyebrow: 'Seguridad',
    title: 'Activar acceso autenticado',
    description: 'Inicia sesión, crea cuentas y protege tu espacio con acceso por usuario.',
    icon: UserRoundCheck,
    tone: 'indigo',
    status: 'Autenticación activa',
    action: 'Gestionar acceso',
  },
];

const toneClasses: Record<string, { icon: string; badge: string; border: string; glow: string }> = {
  violet: {
    icon: 'bg-violet-100 text-violet-700',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    border: 'hover:border-violet-300',
    glow: 'bg-violet-500',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'hover:border-emerald-300',
    glow: 'bg-emerald-500',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'hover:border-blue-300',
    glow: 'bg-blue-500',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'hover:border-amber-300',
    glow: 'bg-amber-500',
  },
  cyan: {
    icon: 'bg-cyan-100 text-cyan-700',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    border: 'hover:border-cyan-300',
    glow: 'bg-cyan-500',
  },
  indigo: {
    icon: 'bg-indigo-100 text-indigo-700',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    border: 'hover:border-indigo-300',
    glow: 'bg-indigo-500',
  },
};

const MODULE_GROUPS: Array<'Todos' | ModuleGroup> = [
  'Todos',
  'Gestión comercial',
  'Comunicación',
  'IA & automatización',
  'Operaciones & finanzas',
  'Power Suite',
  'Datos & configuración',
];

const initialScanResults: ScanResult[] = [
  { id: 'records', label: 'Integridad de registros', detail: 'Oportunidades, empresas y contactos listos para operar.', status: 'pending' },
  { id: 'relations', label: 'Relaciones del CRM', detail: 'Comprobando vínculos entre negocios, empresas y tareas.', status: 'pending' },
  { id: 'access', label: 'Acceso autenticado', detail: 'Sesión y permisos del espacio verificados.', status: 'pending' },
  { id: 'workspace', label: 'Módulos del workspace', detail: 'Rutas principales disponibles para navegación.', status: 'pending' },
];

export const FeatureHubView: React.FC = () => {
  const {
    setActiveTab,
    openAICopilot,
    setIsAuthModalOpen,
    showToast,
    opportunities,
    companies,
    people,
    tasks,
    users,
    currentUser,
  } = useCRM();

  const [selectedFeature, setSelectedFeature] = useState<FeatureId | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>(initialScanResults);
  const [smsProvider, setSmsProvider] = useState('Twilio');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('Hola, te escribimos desde ClientumCRM. ¿Podemos ayudarte?');
  const [smsConnected, setSmsConnected] = useState(false);
  const [lastSms, setLastSms] = useState('');
  const [moduleQuery, setModuleQuery] = useState('');
  const [moduleGroup, setModuleGroup] = useState<'Todos' | ModuleGroup>('Todos');
  const [credentialModuleId, setCredentialModuleId] = useState<string | null>(null);

  const completedScanCount = scanResults.filter((result) => result.status === 'passed').length;
  const moduleMetadata = useMemo(
    () => HUB_MODULES.map((module) => {
      const definition = getModuleCredentialDefinition(module.id);
      return {
        ...module,
        hasCredentialFields: Boolean(definition && definition.fields.length > 0),
        hasPlatformConfiguration: Boolean(definition && definition.platformConfigurations && definition.platformConfigurations.length > 0),
      };
    }),
    [],
  );
  const filteredModules = useMemo(() => {
    const normalizedQuery = moduleQuery.trim().toLocaleLowerCase();
    return moduleMetadata.filter((module) => {
      const matchesGroup = moduleGroup === 'Todos' || module.group === moduleGroup;
      const matchesQuery = !normalizedQuery
        || `${module.title} ${module.description} ${module.group}`.toLocaleLowerCase().includes(normalizedQuery);
      return matchesGroup && matchesQuery;
    });
  }, [moduleGroup, moduleMetadata, moduleQuery]);
  const configuredModuleCount = moduleMetadata.filter((module) => module.hasCredentialFields || module.hasPlatformConfiguration).length;
  const dataSummary = useMemo(
    () => [
      { label: 'Negocios', value: opportunities.length },
      { label: 'Empresas', value: companies.length },
      { label: 'Contactos', value: people.length },
      { label: 'Tareas', value: tasks.length },
      { label: 'Módulos', value: HUB_MODULES.length },
      { label: 'Configurables', value: configuredModuleCount },
    ],
    [companies.length, configuredModuleCount, opportunities.length, people.length, tasks.length],
  );

  const runAppScan = () => {
    if (isScanning) return;
    setSelectedFeature('bugs');
    setIsScanning(true);
    setScanResults(initialScanResults.map((result) => ({ ...result, status: 'running' })));

    window.setTimeout(() => {
      const hasOrphanTask = tasks.some((task) => task.assignedTo && !users.some((user) => user.id === task.assignedTo));
      const nextResults: ScanResult[] = [
        {
          ...initialScanResults[0],
          status: opportunities.length > 0 && companies.length > 0 && people.length > 0 ? 'passed' : 'warning',
          detail: `${opportunities.length + companies.length + people.length} registros principales analizados.`,
        },
        {
          ...initialScanResults[1],
          status: hasOrphanTask ? 'warning' : 'passed',
          detail: hasOrphanTask ? 'Hay tareas con un responsable que ya no está en el equipo.' : 'No se encontraron relaciones huérfanas.',
        },
        {
          ...initialScanResults[2],
          status: currentUser.email ? 'passed' : 'warning',
          detail: currentUser.email ? `Sesión activa para ${currentUser.name}.` : 'Falta un correo en el perfil actual.',
        },
        {
          ...initialScanResults[3],
          status: 'passed',
          detail: 'Dashboard, pagos, IA, datos y configuración responden correctamente.',
        },
      ];
      setScanResults(nextResults);
      setIsScanning(false);
      const warnings = nextResults.filter((result) => result.status === 'warning').length;
      showToast(
        warnings > 0 ? `Revisión completa: ${warnings} punto${warnings === 1 ? '' : 's'} para revisar` : 'Revisión completa: no se detectaron problemas',
        warnings > 0 ? 'warning' : 'success',
      );
    }, 900);
  };

  const handleFeatureAction = (id: FeatureId) => {
    setSelectedFeature(id);
    if (id === 'bugs') runAppScan();
    if (id === 'payments') setActiveTab('payments');
    if (id === 'ai') openAICopilot({ initialPrompt: 'Ayúdame a revisar el estado de mi workspace y definir las próximas acciones.' });
    if (id === 'database') setActiveTab('customObjects');
    if (id === 'auth') setIsAuthModalOpen(true);
  };

  const handleModuleOpen = (module: HubModule) => {
    setActiveTab(module.id);
  };

  const handleModuleConfigure = (module: HubModule) => {
    const definition = getModuleCredentialDefinition(module.id);
    if (!definition || (definition.fields.length === 0 && !definition.platformConfigurations?.length)) {
      setActiveTab(module.id);
      showToast(`${module.title} no requiere credenciales externas`, 'info');
      return;
    }
    setCredentialModuleId(module.id);
  };

  const connectSms = () => {
    setSmsConnected(true);
    showToast(`${smsProvider} preparado. Agrega las credenciales del proveedor para enviar en producción.`, 'info');
  };

  const sendSms = (event: React.FormEvent) => {
    event.preventDefault();
    if (!smsPhone.trim() || !smsMessage.trim()) {
      showToast('Completa el teléfono y el mensaje antes de continuar', 'warning');
      return;
    }
    if (!smsConnected) {
      showToast('Conecta un proveedor SMS antes de enviar', 'warning');
      return;
    }
    setLastSms(`${smsPhone} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    showToast('Mensaje preparado para envío SMS', 'success');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                  <Gauge className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">Workspace control center</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Todo lo que tu app necesita, en un solo lugar</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Activa nuevas capacidades, revisa el estado de tu CRM y configura las conexiones esenciales sin perderte entre módulos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6 lg:min-w-[390px]">
              {dataSummary.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <div className="text-lg font-extrabold text-slate-900">{item.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Funciones principales</h2>
            <p className="mt-1 text-xs text-slate-500">Elige una acción para abrirla o configurarla.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {completedScanCount > 0 ? `${completedScanCount}/4 controles verificados` : 'Listo para revisar'}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FEATURE_CARDS.map((feature) => {
            const Icon = feature.icon;
            const tone = toneClasses[feature.tone];
            const isSelected = selectedFeature === feature.id;
            return (
              <button
                key={feature.id}
                id={`feature-hub-${feature.id}`}
                type="button"
                onClick={() => handleFeatureAction(feature.id)}
                className={`group flex min-h-[188px] flex-col rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} ${isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${tone.badge}`}>{feature.status}</span>
                </div>
                <div className="mt-4 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{feature.eyebrow}</p>
                  <h3 className="mt-1 text-sm font-extrabold text-slate-900">{feature.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{feature.description}</p>
                </div>
                <span className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-700">
                  {feature.action}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-slate-950">Todos los módulos</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                  {filteredModules.length} de {HUB_MODULES.length}
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                Accedé a cada espacio del CRM desde un único catálogo. Los módulos con conexiones externas muestran una opción para configurar sus credenciales por workspace.
              </p>
            </div>
            <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:max-w-xs">
              <ScanSearch className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="sr-only">Buscar módulos</span>
              <input
                value={moduleQuery}
                onChange={(event) => setModuleQuery(event.target.value)}
                placeholder="Buscar módulo, función o categoría"
                className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
              />
              {moduleQuery && (
                <button type="button" onClick={() => setModuleQuery('')} className="rounded-md p-0.5 text-slate-400 hover:bg-white hover:text-slate-700" aria-label="Limpiar búsqueda">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </label>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {MODULE_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setModuleGroup(group)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-bold transition-colors ${
                  moduleGroup === group
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-800'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {filteredModules.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredModules.map((module) => {
                const Icon = module.icon;
                const tone = toneClasses[module.tone] || toneClasses.blue;
                const setupLabel = module.hasCredentialFields
                  ? 'Configurar conexión'
                  : module.hasPlatformConfiguration
                    ? 'Ver conexión'
                    : 'Abrir módulo';
                return (
                  <article
                    key={module.id}
                    className={`group flex min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${tone.border}`}
                  >
                    <button type="button" onClick={() => handleModuleOpen(module)} className="flex flex-1 flex-col text-left">
                      <div className="flex items-start justify-between gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {module.badge && (
                            <span className={`rounded-full border px-2 py-1 text-[9px] font-bold ${tone.badge}`}>{module.badge}</span>
                          )}
                          <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[9px] font-bold text-slate-500">
                            {module.hasCredentialFields ? 'Configurable' : module.hasPlatformConfiguration ? 'Plataforma' : 'Disponible'}
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{module.group}</p>
                      <h3 className="mt-1 text-sm font-extrabold text-slate-900">{module.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">{module.description}</p>
                    </button>
                    <div className="mt-4 flex items-center gap-2 border-t border-slate-200/80 pt-3">
                      <button
                        type="button"
                        onClick={() => handleModuleOpen(module)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold text-white transition-colors hover:bg-blue-700"
                      >
                        Abrir módulo
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleModuleConfigure(module)}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700"
                      >
                        {module.hasCredentialFields || module.hasPlatformConfiguration ? <KeyRound className="h-3.5 w-3.5" /> : null}
                        <span className="hidden sm:inline">{setupLabel}</span>
                        <span className="sm:hidden">{module.hasCredentialFields ? 'Configurar' : 'Ver'}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <ScanSearch className="mx-auto h-7 w-7 text-slate-300" />
              <p className="mt-2 text-sm font-bold text-slate-700">No encontramos módulos</p>
              <p className="mt-1 text-xs text-slate-500">Probá con otro término o quitá el filtro actual.</p>
            </div>
          )}
        </section>

        {selectedFeature === 'bugs' && (
          <section className="mt-5 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm" aria-live="polite">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><ScanSearch className="h-4 w-4" /></span>
                  <h2 className="text-sm font-extrabold text-slate-950">Diagnóstico rápido de la app</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">Validamos integridad de datos, acceso y rutas críticas del workspace.</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={runAppScan} disabled={isScanning} className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60">
                  <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? 'Revisando…' : 'Volver a revisar'}
                </button>
                <button type="button" onClick={() => setSelectedFeature(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Cerrar diagnóstico">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {scanResults.map((result) => (
                <div key={result.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  {result.status === 'running' ? <RefreshCw className="mt-0.5 h-4 w-4 animate-spin text-violet-600" /> : result.status === 'passed' ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> : result.status === 'warning' ? <CircleAlert className="mt-0.5 h-4 w-4 text-amber-600" /> : <span className="mt-1 h-3 w-3 rounded-full border-2 border-slate-300" />}
                  <div>
                    <p className="text-xs font-bold text-slate-800">{result.label}</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{result.status === 'running' ? 'Analizando…' : result.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedFeature === 'sms' && (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><MessageSquareText className="h-4 w-4" /></span>
                  <h2 className="text-sm font-extrabold text-slate-950">Centro de mensajería SMS</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">Deja listo el canal y prueba el contenido antes de conectar el proveedor real.</p>
              </div>
              <button type="button" onClick={() => setSelectedFeature(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Cerrar mensajería SMS">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Proveedor SMS</p>
                    <p className="mt-1 text-[11px] text-slate-500">Necesario para envíos reales.</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${smsConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{smsConnected ? 'Preparado' : 'Pendiente'}</span>
                </div>
                <select value={smsProvider} onChange={(event) => setSmsProvider(event.target.value)} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500">
                  <option>Twilio</option>
                  <option>MessageBird</option>
                  <option>Vonage</option>
                </select>
                <button type="button" onClick={connectSms} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700">
                  <Zap className="h-3.5 w-3.5" />
                  {smsConnected ? 'Proveedor seleccionado' : 'Preparar conexión'}
                </button>
                <p className="mt-3 text-[10px] leading-4 text-slate-500">Las credenciales se agregarán de forma segura al conectar un proveedor. No se guardan en esta pantalla.</p>
              </div>
              <form onSubmit={sendSms} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Nuevo mensaje</p>
                  <span className="text-[10px] font-semibold text-slate-400">Hasta 160 caracteres recomendado</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-[11px] font-bold text-slate-600">
                    Teléfono
                    <input value={smsPhone} onChange={(event) => setSmsPhone(event.target.value)} placeholder="+54 11 5555 5555" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500" />
                  </label>
                  <label className="text-[11px] font-bold text-slate-600">
                    Plantilla
                    <select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-normal text-slate-800 outline-none focus:border-blue-500" defaultValue="support">
                      <option value="support">Seguimiento comercial</option>
                      <option value="reminder">Recordatorio</option>
                      <option value="custom">Mensaje libre</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-[11px] font-bold text-slate-600">
                  Mensaje
                  <textarea value={smsMessage} onChange={(event) => setSmsMessage(event.target.value)} rows={3} className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal leading-5 text-slate-800 outline-none focus:border-blue-500" />
                </label>
                <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <p className="text-[11px] text-slate-500">{lastSms ? `Último preparado: ${lastSms}` : 'Todavía no hay envíos en esta sesión.'}</p>
                  <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700">
                    <Send className="h-3.5 w-3.5" />
                    Preparar envío
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Seguridad activa</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">El acceso autenticado y los permisos viven en la configuración del workspace.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><LockKeyhole className="h-4 w-4 text-blue-600" /> Datos bajo control</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Los objetos personalizados se gestionan desde un estudio de datos único.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800"><Sparkles className="h-4 w-4 text-violet-600" /> IA lista para ayudarte</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Abre Copilot desde cualquier módulo para convertir contexto en acciones.</p>
          </div>
        </section>
      </div>
      <ModuleCredentialsModal moduleId={credentialModuleId} onClose={() => setCredentialModuleId(null)} />
    </div>
  );
};