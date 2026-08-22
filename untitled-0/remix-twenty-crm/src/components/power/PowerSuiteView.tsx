import React, { useState } from 'react';
import {
  LayoutGrid,
  Map,
  Percent,
  TrendingUp,
  Mail,
  MessageSquare,
  Bot,
  UserSquare2,
  Cpu,
  Target,
  FileText,
  Globe,
  Link2,
  Receipt,
  CreditCard,
  Code2,
  Check,
  Play,
  Sparkles,
  ArrowRight,
  Send,
  Plus,
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronRight,
  QrCode,
  DollarSign,
  Download,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  column: number;
  featured?: boolean;
}

export const PowerSuiteView: React.FC = () => {
  const { opportunities, addOpportunity, addPerson, addCompany, addTask, showToast, triggerConfetti, t } = useCRM();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // --- INTERACTIVE MODULE STATES ---
  // 2. Maps Prospección
  const [mapsCity, setMapsCity] = useState('Buenos Aires');
  const [mapsNiche, setMapsNiche] = useState('Gimnasios');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResults, setMapsResults] = useState<any[]>([]);

  // 3. MEDDIC Lead Scoring
  const [meddicM, setMeddicM] = useState(3); // 1-5
  const [meddicE, setMeddicE] = useState(2);
  const [meddicDc, setMeddicDc] = useState(3);
  const [meddicDp, setMeddicDp] = useState(2);
  const [meddicI, setMeddicI] = useState(4);
  const [meddicC, setMeddicC] = useState(3);
  const [meddicCalculated, setMeddicCalculated] = useState(false);

  // 4. Business Intelligence
  const [biCac, setBiCac] = useState(150);
  const [biLtv, setBiLtv] = useState(1200);
  const [biConversion, setBiConversion] = useState(4.5);

  // 5. Campañas & Automatización
  const [dripName, setDripName] = useState('Nurturing Prospectos Nuevos');
  const [dripSteps, setDripSteps] = useState([
    { delay: '0', action: 'Enviar Email de Bienvenida' },
    { delay: '3', action: 'Enviar Caso de Éxito PDF' },
    { delay: '7', action: 'Ofrecer Demo Agendada' }
  ]);

  // 6. WhatsApp Chatbot Simulator
  const [waMessages, setWaMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: '¡Hola! Bienvenido al asistente inteligente de WhatsApp de Twenty. ¿En qué puedo ayudarte hoy?\n\n1. Precios 💰\n2. Agendar Demo 📅\n3. Soporte Técnico 🛠️' }
  ]);
  const [waInput, setWaInput] = useState('');

  // 7. Agente Outreach Automático SDR
  const [sdrLogs, setSdrLogs] = useState<string[]>([]);
  const [sdrRunning, setSdrRunning] = useState(false);

  // 8. Portal del Cliente Tickets
  const [portalTickets, setPortalTickets] = useState([
    { id: 'T-102', title: 'Error de sincronización con HubSpot', status: 'Abierto', date: 'Hoy' },
    { id: 'T-098', title: 'Solicitud de factura tipo A', status: 'Cerrado', date: 'Ayer' }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState('');

  // 9. Asistente IA Gemini 2.5
  const [geminiQuery, setGeminiQuery] = useState('Estrategia de retención para agencias de desarrollo');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState('');

  // 10. Generador de Estrategias GTM
  const [gtmProduct, setGtmProduct] = useState('Plataforma SaaS para inmobiliarias');
  const [gtmAudience, setGtmAudience] = useState('Agentes de bienes raíces independientes');
  const [gtmLoading, setGtmLoading] = useState(false);
  const [gtmStrategy, setGtmStrategy] = useState('');

  // 11. AI Ad Copy Studio
  const [adProduct, setAdProduct] = useState('CRM Twenty Open Source');
  const [adPlatform, setAdPlatform] = useState('LinkedIn');
  const [adCopies, setAdCopies] = useState<string[]>([]);
  const [adLoading, setAdLoading] = useState(false);

  // 12. SEO Suite Complete
  const [seoDomain, setSeoDomain] = useState('mi-empresa.com');
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  // 13. Integraciones Webhook
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.twenty.com/v1/deal-triggers');
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  // 14. Facturación AFIP
  const [afipCuit, setAfipCuit] = useState('20-38472910-8');
  const [afipType, setAfipType] = useState('Factura A');
  const [afipLoading, setAfipLoading] = useState(false);
  const [afipInvoice, setAfipInvoice] = useState<any>(null);

  // 15. Cobros MercadoPago
  const [mpAmount, setMpAmount] = useState(15000);
  const [mpLoading, setMpLoading] = useState(false);
  const [mpPayed, setMpPayed] = useState(false);
  const [mpLink, setMpLink] = useState('');

  // 16. Desarrollo Web - Embebido
  const [formWidgetTitle, setFormWidgetTitle] = useState('¡Escríbenos para recibir tu Demo!');
  const [webFormName, setWebFormName] = useState('');
  const [webFormEmail, setWebFormEmail] = useState('');

  // --- FEATURES LIST EXACTLY CORRESPONDING TO THE 16 TILES ---
  const features: FeatureCard[] = [
    // Column 1
    { id: 'crm', title: 'CRM Inteligente', description: 'Kanban de oportunidades y gestión de deals', icon: LayoutGrid, column: 1 },
    { id: 'maps', title: 'Prospección Maps IA', description: 'Descubrí negocios por zona con Gemini AI', icon: Map, column: 1 },
    { id: 'meddic', title: 'Lead Scoring MEDDIC', description: 'Calificá leads con metodología empresaria B2B', icon: Percent, column: 1 },
    { id: 'bi', title: 'Business Intelligence', description: 'CAC, LTV y métricas de conversión en tiempo real', icon: TrendingUp, column: 1 },
    
    // Column 2
    { id: 'campaigns', title: 'Campañas & Automatización', description: 'Drip email, broadcast masivo y nurturing', icon: Mail, column: 2 },
    { id: 'chatbot', title: 'Chatbot WhatsApp 24/7', description: 'Atención automática, sin código ni IT', icon: MessageSquare, column: 2, featured: true },
    { id: 'outreach', title: 'Agente Outreach Automático', description: 'SDR IA que prospecta y hace seguimiento solo', icon: Bot, column: 2 },
    { id: 'portal', title: 'Portal del Cliente', description: 'Autoatención, tickets y seguimiento en línea', icon: UserSquare2, column: 2 },
    
    // Column 3
    { id: 'gemini', title: 'Asistente IA Gemini 2.5', description: 'Analista CMO disponible en todo momento', icon: Cpu, column: 3 },
    { id: 'gtm', title: 'Generador de Estrategias', description: 'Planes go-to-market con IA en minutos', icon: Target, column: 3 },
    { id: 'adcopy', title: 'AI Ad Copy Studio', description: 'Copys para LinkedIn, anuncios y email', icon: FileText, column: 3 },
    { id: 'seo', title: 'Suite SEO Completa', description: 'Keywords, auditoría, rank tracker y calendario', icon: Globe, column: 3 },
    
    // Column 4
    { id: 'integrations', title: '60+ Integraciones', description: 'WhatsApp, ERP, APIs, webhooks y más', icon: Link2, column: 4 },
    { id: 'afip', title: 'Facturá AFIP', description: 'Facturá electrónicamente sin salir del CRM', icon: Receipt, column: 4 },
    { id: 'mercadopago', title: 'Cobros MercadoPago', description: 'Suscripciones y links de pago automáticos', icon: CreditCard, column: 4 },
    { id: 'webdev', title: 'Desarrollo Web', description: 'Tu sitio conectado al CRM desde el día 1', icon: Code2, column: 4 }
  ];

  // --- ACTIONS ---
  
  // 2. Maps Prospecting Run
  const runMapsProspecting = () => {
    setMapsLoading(true);
    fetch('/api/ai/prospect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: mapsCity, niche: mapsNiche })
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setMapsResults(data.results);
        setMapsLoading(false);
        showToast('Descubrimiento completado con Gemini AI', 'success');
      })
      .catch((err) => {
        console.warn('Real prospecting failed, falling back to simulation:', err);
        const mockPlaces = [
          { name: `${mapsNiche} El Templo - ${mapsCity}`, phone: '+54 11 4839-2012', address: 'Av. Santa Fe 3420', status: 'Alta Intención', rating: '4.7 ★' },
          { name: `Sport & Health ${mapsNiche}`, phone: '+54 11 4981-5503', address: 'Calle Florida 521', status: 'Excelente Prospecto', rating: '4.5 ★' },
          { name: `${mapsCity} Fitness Studio`, phone: '+54 11 4110-9821', address: 'Pampa 1902', status: 'Calificación Media', rating: '4.2 ★' }
        ];
        setMapsResults(mockPlaces);
        setMapsLoading(false);
        showToast('Descubrimiento completado (Simulado - No API Key)', 'success');
      });
  };

  const importMapsProspect = (place: any) => {
    const createdComp = addCompany({
      name: place.name,
      domain: place.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
      industry: 'Deportes y Entretenimiento',
      employees: '11-50',
      arr: 12000,
      tier: 'Startup',
      healthScore: 85,
      city: mapsCity,
      country: 'Argentina',
      assignedTo: 'Sasha Kowalski',
      description: `Prospecto importado desde Prospección Maps IA con calificación ${place.status}.`
    });

    addOpportunity({
      name: `Licencia CRM - ${place.name}`,
      amount: 14400,
      currency: 'USD',
      stage: 'lead',
      closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      probability: 10,
      companyId: createdComp.id,
      companyName: createdComp.name,
      assignedTo: 'Sasha Kowalski',
      priority: 'High',
      type: 'New Business',
      tags: ['Maps-Prospect', 'SaaS']
    });

    showToast(`Empresa y Trato creados para: ${place.name}`, 'success');
    triggerConfetti();
  };

  // 3. MEDDIC Calculation
  const runMEDDIC = () => {
    setMeddicCalculated(true);
    showToast('MEDDIC Calification Computed', 'info');
  };

  // 6. WhatsApp Chatbot Send Message
  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: waInput };
    setWaMessages(prev => [...prev, userMsg]);
    const inputClean = waInput.toLowerCase().trim();
    setWaInput('');

    setTimeout(() => {
      let reply = 'Lo siento, no comprendo esa opción. Por favor escribe "1", "2" o "3".';
      if (inputClean.includes('1') || inputClean.includes('precio') || inputClean.includes('costo')) {
        reply = '💳 *Nuestros Planes CRM:*\n\n• *Startup:* $29/usuario al mes\n• *Growth:* $79/usuario al mes\n• *Enterprise:* Consultar con ventas.\n\nEscribe "2" si deseas agendar una demo.';
      } else if (inputClean.includes('2') || inputClean.includes('demo') || inputClean.includes('agenda')) {
        reply = '📅 *Agendar Demo con un Consultor:*\n\nExcelente decisión. Haz clic en el siguiente enlace para reservar un espacio:\n👉 _calendly.com/twenty-crm-demo_';
      } else if (inputClean.includes('3') || inputClean.includes('soporte') || inputClean.includes('ayuda')) {
        reply = '🛠️ *Soporte Técnico Especializado:*\n\nTu ticket ha sido derivado. En breve un ingeniero te contactará directamente por este medio. ¡Gracias!';
      } else if (inputClean.includes('hola') || inputClean.includes('buenos dias')) {
        reply = '👋 ¡Hola! ¿Cómo estás? Por favor elige una opción:\n\n1. Precios 💰\n2. Agendar Demo 📅\n3. Soporte Técnico 🛠️';
      }

      setWaMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  // 7. SDR Agent Start
  const startSdrAgent = () => {
    setSdrRunning(true);
    setSdrLogs([]);
    const logs = [
      '🔍 Buscando empresas del sector en LinkedIn y directorios...',
      '📈 Encontradas 14 empresas ideales para el nicho.',
      '🤖 Analizando sitio web de "SaaS Solutions" con Gemini AI...',
      '📧 Redactando email frío hiper-personalizado para CEO de SaaS Solutions...',
      '📤 Email enviado automáticamente (Tracking ID: outbound-8402)',
      '📝 Programando seguimiento automático para dentro de 3 días...',
      '🤖 Procesando respuesta recibida de "TechCorp"...',
      '🎉 Respuesta positiva: "Me interesa una demo". Creando oportunidad en CRM...',
      '🎯 SDR Agent finalizó con éxito. 1 nuevo lead agendado.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSdrLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setSdrRunning(false);
          // Auto add a person
          const createdSDRPerson = addPerson({
            firstName: 'Santiago',
            lastName: 'Mendoza',
            email: 'santiago@techcorp.io',
            phone: '+54 9 11 5202-9901',
            jobTitle: 'VP of Engineering',
            companyName: 'TechCorp Solutions',
            city: 'Santiago',
            country: 'Chile',
            status: 'Contacted',
            assignedTo: 'Sasha Kowalski',
            notes: 'Contacto generado por Agente SDR de Outreach Automático.'
          });

          addOpportunity({
            name: 'Outbound - TechCorp Solutions',
            amount: 28000,
            currency: 'USD',
            stage: 'discovery',
            closeDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            probability: 25,
            companyName: 'TechCorp Solutions',
            contactId: createdSDRPerson.id,
            contactName: `${createdSDRPerson.firstName} ${createdSDRPerson.lastName}`,
            assignedTo: 'Sasha Kowalski',
            priority: 'Medium',
            type: 'New Business',
            tags: ['AI-SDR', 'Outbound']
          });

          showToast('¡Oportunidad y Contacto creados de forma autónoma!', 'success');
          triggerConfetti();
        }
      }, (index + 1) * 800);
    });
  };

  // 8. Create Client Ticket
  const createPortalTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const newTicket = {
      id: `T-${100 + portalTickets.length + 5}`,
      title: newTicketTitle,
      status: 'Abierto',
      date: 'Hace un momento'
    };
    setPortalTickets([newTicket, ...portalTickets]);
    setNewTicketTitle('');
    showToast('Ticket de soporte registrado en el portal', 'success');
  };

  // 9. Asistente IA Gemini 2.5
  const runGeminiAsistente = () => {
    setGeminiLoading(true);
    fetch('/api/ai/cmo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: geminiQuery })
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setGeminiResponse(data.text);
        setGeminiLoading(false);
        showToast('Estrategia de Inteligencia Generada', 'success');
      })
      .catch((err) => {
        console.warn('Real CMO strategy failed, falling back to simulation:', err);
        setGeminiResponse(`### 🧠 Propuesta del CMO para: "${geminiQuery}"\n\n1. **Propuesta de Posicionamiento:** Enfocar los beneficios del producto en "Ahorro de Tiempo de Configuración" mediante plantillas sectoriales listas para usar. Las agencias valoran la facturación veloz.\n\n2. **Estrategia de Email Marketing:** Configurar un embudo automatizado (drip email) de 4 secuencias ofreciendo una auditoría de procesos gratuita en lugar de una demo genérica.\n\n3. **Plan de Contenidos:** Publicar mini-estudios de caso semanales en LinkedIn demostrando cómo un cliente redujo el Churn en un 12% en menos de 90 días.\n\n*(Note: Displaying simulated proposal. Configure a real Gemini API key in Secrets)*`);
        setGeminiLoading(false);
        showToast('Estrategia de Inteligencia Generada (Simulada)', 'success');
      });
  };

  // 10. GTM Strategy Generator
  const runGTMGenerator = () => {
    setGtmLoading(true);
    fetch('/api/ai/gtm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: gtmProduct, audience: gtmAudience })
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setGtmStrategy(data.text);
        setGtmLoading(false);
        showToast('Plan GTM de IA Generado', 'success');
      })
      .catch((err) => {
        console.warn('Real GTM failed, falling back to simulation:', err);
        setGtmStrategy(`### 🎯 Plan Go-To-Market para: ${gtmProduct}\n\n*   **Audiencia Clave:** ${gtmAudience}\n*   **Canal Principal sugerido:** Campañas en LinkedIn Ads segmentando por cargo exacto y prospección fría semi-automatizada por WhatsApp.\n*   **Propuesta de Valor única:** Automatización completa del flujo de contactos sin requerir programadores ni integraciones manuales costosas.\n*   **Sugerencia de Precios:** Plan Piloto Mensual de $49 con garantía de reembolso de 14 días para bajar la barrera de entrada.\n\n*(Note: Displaying simulated GTM plan. Configure a real Gemini API key in Secrets)*`);
        setGtmLoading(false);
        showToast('Plan GTM de IA Generado (Simulado)', 'success');
      });
  };

  // 11. AI Ad Copy Studio
  const runAdStudio = () => {
    setAdLoading(true);
    fetch('/api/ai/adcopy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: adProduct, platform: adPlatform })
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setAdCopies(data.copies);
        setAdLoading(false);
        showToast('Borradores publicitarios de IA listos', 'success');
      })
      .catch((err) => {
        console.warn('Real Ad Copy failed, falling back to simulation:', err);
        const copies = [
          `🔥 **Variante 1 (Impacto Directo):** ¿Cansado de CRM lentos e imposibles de configurar? Descubre ${adProduct}. Diseñado especialmente para optimizar procesos comerciales sin costo de IT. ¡Consigue tu demo hoy!`,
          `💡 **Variante 2 (Beneficio MEDDIC):** Optimiza tu tasa de cierre empresarial B2B con la metodología incorporada en ${adProduct}. Califica tus leads con precisión científica y acelera tu pipeline sin fricciones.`,
          `✉️ **Variante 3 (Gancho Creativo):** El CRM Open Source del que todo el ecosistema de desarrollo está hablando. Simple, potente y totalmente personalizable. Únete a miles de equipos comerciales. *(Note: Displaying simulated copy. Configure a real Gemini API key in Secrets)*`
        ];
        setAdCopies(copies);
        setAdLoading(false);
        showToast('Borradores publicitarios de IA listos (Simulados)', 'success');
      });
  };

  // 12. Run SEO Suite
  const runSEOSuite = () => {
    setSeoLoading(true);
    setTimeout(() => {
      setSeoResult({
        score: 84,
        keywords: [
          { word: 'crm argentina', search: '2,400/mes', difficulty: 'Bajo' },
          { word: 'sistema de gestion ventas', search: '1,200/mes', difficulty: 'Medio' },
          { word: 'automatizacion whatsapp api', search: '850/mes', difficulty: 'Alto' }
        ],
        issues: [
          'Faltan etiquetas alt en 14 imágenes principales.',
          'El tiempo de carga inicial en móviles es superior a 3.4s.'
        ]
      });
      setSeoLoading(false);
      showToast('Auditoría SEO completa', 'success');
    }, 1200);
  };

  // 14. Emitir Factura AFIP
  const emitirFacturaAFIP = () => {
    setAfipLoading(true);
    setTimeout(() => {
      setAfipInvoice({
        cae: '73940291048291',
        vto: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        number: '00003-00000492',
        date: new Date().toLocaleDateString(),
        amount: '$145,200.00 ARS',
        client: 'TechCorp S.A.'
      });
      setAfipLoading(false);
      showToast('Factura Electrónica aprobada por AFIP', 'success');
      triggerConfetti();
    }, 1500);
  };

  // 15. Cobros MercadoPago
  const generateMPLink = () => {
    setMpLoading(true);
    setTimeout(() => {
      setMpLink(`https://link.mercadopago.com.ar/twentycrm/pago-${Math.round(mpAmount)}`);
      setMpLoading(false);
      showToast('Link de pago generado con éxito', 'success');
    }, 1000);
  };

  const simulateSuccessPayment = () => {
    setMpPayed(true);
    // Add real task to follow up
    addTask({
      title: `Confirmar entrega y setear onboarding - Cobro MP exitoso`,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'Urgent',
      status: 'Todo',
      assignedTo: 'Sasha Kowalski',
      description: 'Pago recibido automáticamente vía MercadoPago por un monto de $' + mpAmount.toLocaleString()
    });
    showToast('¡Pago de MercadoPago Aprobado! Trato avanzado en CRM', 'success');
    triggerConfetti();
  };

  // 16. Webform submit demo
  const handleWebformDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webFormEmail.trim() || !webFormName.trim()) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    const createdFormComp = addCompany({
      name: `${webFormName} Co.`,
      domain: webFormEmail.split('@')[1],
      industry: 'Tecnología',
      employees: '1-10',
      arr: 5000,
      tier: 'Startup',
      healthScore: 90,
      assignedTo: 'Sasha Kowalski',
      description: 'Lead registrado de forma autónoma desde el widget web conectado.'
    });

    addOpportunity({
      name: `Licencia de Interés - ${webFormName}`,
      amount: 4800,
      currency: 'USD',
      stage: 'lead',
      closeDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      probability: 10,
      companyId: createdFormComp.id,
      companyName: createdFormComp.name,
      assignedTo: 'Sasha Kowalski',
      priority: 'Medium',
      type: 'New Business',
      tags: ['Form-Widget']
    });

    setWebFormEmail('');
    setWebFormName('');
    showToast('¡Formulario Web Enviado! Nuevo lead registrado en Twenty', 'success');
    triggerConfetti();
  };

  // Render the 16 grid features matching column layouts
  const getColumnFeatures = (colIndex: number) => {
    return features.filter(f => f.column === colIndex);
  };

  return (
    <div id="twenty-power-suite" className="flex-1 flex flex-col h-full bg-[#0a0c10] overflow-y-auto p-5 select-none relative">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Callout */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            Suite de Poder / Power Apps CRM
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatizaciones, bots conversacionales, pasarelas de pago y asistentas de IA listos para potenciar tus ventas desde el primer día.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-[11px] font-semibold text-emerald-300">
            Chatbot WhatsApp 24/7 y Agentes IA Activos
          </span>
        </div>
      </div>

      {/* Grid of Columns - Exact Replica of Uploaded Image Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[1, 2, 3, 4].map((colNum) => (
          <div key={colNum} className="space-y-3.5">
            {getColumnFeatures(colNum).map((f) => {
              const Icon = f.icon;
              const isChatbotSpecial = f.id === 'chatbot';
              return (
                <div
                  key={f.id}
                  id={`feature-card-${f.id}`}
                  onClick={() => setSelectedModule(f.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] flex items-start gap-3.5 relative ${
                    isChatbotSpecial
                      ? 'border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/5 border-l-[3.5px] border-l-emerald-400'
                      : 'border-[#1e2330] bg-[#12151d] hover:border-[#2a3348] hover:bg-[#161a26]'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isChatbotSpecial 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-[#1b212f] text-blue-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[13px] font-semibold text-white truncate leading-tight">
                        {f.title}
                      </h3>
                      {isChatbotSpecial && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {f.description}
                    </p>
                  </div>

                  {/* Open indicators */}
                  <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* --- FLOATING DETAILED WORKSPACE FOR SELECTED MODULE --- */}
      {selectedModule && (
        <div
          id="power-module-overlay"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedModule(null)}
        >
          <div
            id="power-module-panel"
            className="w-full max-w-2xl bg-[#0f121a] border border-[#2c3752] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[85vh] text-slate-300 text-xs select-none relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header of selected module */}
            {(() => {
              const feat = features.find(f => f.id === selectedModule)!;
              const Icon = feat.icon;
              return (
                <div className="p-4 border-b border-[#1e2434] flex items-center justify-between bg-[#131623]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{feat.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{feat.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="p-1.5 rounded hover:bg-[#1f2535] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                </div>
              );
            })()}

            {/* Scrollable sandbox interactive area */}
            <div className="flex-1 overflow-y-auto p-5">
              
              {/* 1. CRM Inteligente sandbox */}
              {selectedModule === 'crm' && (
                <div className="space-y-4">
                  <div className="bg-[#141824] p-4 rounded-xl border border-[#232a3d]">
                    <h4 className="font-semibold text-white mb-1.5">Centro Operativo del Pipeline</h4>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Este módulo interactivo te vincula de vuelta con el tablero Kanban principal, el cual se sincroniza en tiempo real con todas las actividades, campañas de automatización, y el bot integrado de WhatsApp.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-[#1b2130] p-3 rounded-lg border border-[#2b354c]">
                        <div className="text-[10px] text-slate-400">Oportunidades Activas</div>
                        <div className="text-lg font-bold text-white mt-1">
                          {opportunities.filter(o => o.stage !== 'won' && o.stage !== 'lost').length} deals
                        </div>
                      </div>
                      <div className="bg-[#1b2130] p-3 rounded-lg border border-[#2b354c]">
                        <div className="text-[10px] text-slate-400">Valor de Pipeline</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">
                          ${opportunities.reduce((acc, o) => acc + o.amount, 0).toLocaleString()} USD
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedModule(null);
                        showToast('Redirigiendo al Kanban de Oportunidades...', 'info');
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                    >
                      <span>Ir al Pipeline Principal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Maps Prospección Sandbox */}
              {selectedModule === 'maps' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Zona / Ciudad</label>
                      <input
                        type="text"
                        value={mapsCity}
                        onChange={(e) => setMapsCity(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Rubro / Negocio</label>
                      <input
                        type="text"
                        value={mapsNiche}
                        onChange={(e) => setMapsNiche(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={runMapsProspecting}
                    disabled={mapsLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {mapsLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Escaneando zona con Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Escanear y Buscar Clientes</span>
                      </>
                    )}
                  </button>

                  {mapsResults.length > 0 && (
                    <div className="space-y-2 mt-2">
                      <div className="text-[11px] font-semibold text-slate-300">Clientes Encontrados:</div>
                      {mapsResults.map((place, idx) => (
                        <div key={idx} className="bg-[#141824] border border-[#21283a] p-3 rounded-lg flex items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold text-white">{place.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{place.address} • {place.phone}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                              {place.status}
                            </span>
                            <button
                              onClick={() => importMapsProspect(place)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-[10px] cursor-pointer transition-colors"
                            >
                              Importar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3. Lead Scoring MEDDIC Sandbox */}
              {selectedModule === 'meddic' && (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400">
                    Evalúa la probabilidad de éxito de tus ventas basándote en la metodología estándar B2B empresarial. Califica del 1 al 5 cada variable:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {/* M */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Metrics (Métricas)</span>
                        <span className="text-blue-400 font-bold">{meddicM}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicM} onChange={(e) => setMeddicM(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    {/* E */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Economic Buyer</span>
                        <span className="text-blue-400 font-bold">{meddicE}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicE} onChange={(e) => setMeddicE(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    {/* Dc */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Decision Criteria</span>
                        <span className="text-blue-400 font-bold">{meddicDc}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicDc} onChange={(e) => setMeddicDc(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    {/* Dp */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Decision Process</span>
                        <span className="text-blue-400 font-bold">{meddicDp}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicDp} onChange={(e) => setMeddicDp(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    {/* I */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Identify Pain</span>
                        <span className="text-blue-400 font-bold">{meddicI}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicI} onChange={(e) => setMeddicI(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    {/* C */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-300">Champion (Sponsor)</span>
                        <span className="text-blue-400 font-bold">{meddicC}/5</span>
                      </div>
                      <input
                        type="range" min="1" max="5" value={meddicC} onChange={(e) => setMeddicC(Number(e.target.value))}
                        className="w-full accent-blue-500 bg-[#1e2330] h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    onClick={runMEDDIC}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Calcular Score MEDDIC
                  </button>

                  {meddicCalculated && (
                    <div className="bg-[#141824] p-3.5 rounded-xl border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-semibold">Calificación Final:</span>
                        <span className="text-base font-bold text-emerald-400">
                          {Math.round(((meddicM + meddicE + meddicDc + meddicDp + meddicI + meddicC) / 30) * 100)}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        <strong>Recomendación IA:</strong> {meddicC < 3 ? 'Alerta: Necesitas fortalecer tu relación con el Champion. El negocio corre riesgo de congelarse sin un embajador interno.' : 'Estructura de compra sólida. Recomienda avanzar hacia la etapa de propuesta formal enviando detalles de SLA técnico.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Business Intelligence Sandbox */}
              {selectedModule === 'bi' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Costo Adquisición (CAC)</label>
                      <input
                        type="number" value={biCac} onChange={(e) => setBiCac(Number(e.target.value))}
                        className="w-full bg-[#161a26] text-white px-2.5 py-1.5 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Valor de Vida (LTV)</label>
                      <input
                        type="number" value={biLtv} onChange={(e) => setBiLtv(Number(e.target.value))}
                        className="w-full bg-[#161a26] text-white px-2.5 py-1.5 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Conversión Web (%)</label>
                      <input
                        type="number" step="0.1" value={biConversion} onChange={(e) => setBiConversion(Number(e.target.value))}
                        className="w-full bg-[#161a26] text-white px-2.5 py-1.5 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#141824] p-4 rounded-xl border border-[#21283a] space-y-3">
                    <h4 className="font-semibold text-white">Resultados de Performance</h4>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="bg-[#1b2130] p-3 rounded-lg border border-[#2a3449]">
                        <div className="text-[10px] text-slate-400">Relación LTV : CAC</div>
                        <div className={`text-base font-bold mt-1 ${(biLtv / biCac) >= 3 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {(biLtv / biCac).toFixed(1)}x
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Óptimo de la industria: 3.0x+</div>
                      </div>

                      <div className="bg-[#1b2130] p-3 rounded-lg border border-[#2a3449]">
                        <div className="text-[10px] text-slate-400">Retorno de Inversión</div>
                        <div className="text-base font-bold text-blue-400 mt-1">
                          {Math.round(((biLtv - biCac) / biCac) * 100)}%
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Por cada dólar invertido</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Campañas & Automatización Sandbox */}
              {selectedModule === 'campaigns' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre de la Campaña Drip</label>
                    <input
                      type="text" value={dripName} onChange={(e) => setDripName(e.target.value)}
                      className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-300">Pasos de Automatización:</div>
                    {dripSteps.map((step, idx) => (
                      <div key={idx} className="bg-[#141824] border border-[#202739] p-3 rounded-lg flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-[11px]">
                          {idx + 1}
                        </div>
                        <div className="flex-1 flex items-center justify-between text-xs">
                          <span className="text-white">{step.action}</span>
                          <span className="text-slate-400 text-[10px] bg-[#1e2330] px-2 py-0.5 rounded border border-[#2b3346]">
                            Día {step.delay}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Campaña "${dripName}" activa para todos los prospectos nuevos.`, 'success');
                      triggerConfetti();
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Activar Campaña & Automatización
                  </button>
                </div>
              )}

              {/* 6. Chatbot WhatsApp Sandbox */}
              {selectedModule === 'chatbot' && (
                <div className="space-y-3">
                  <div className="bg-[#10141e] border border-[#1e2330] rounded-xl overflow-hidden flex flex-col h-[280px]">
                    {/* Phone Header */}
                    <div className="bg-[#0b141a] p-2.5 px-4 flex items-center gap-2.5 border-b border-[#1b252c]">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-xs font-bold text-slate-200">Chatbot Soporte 24/7 (Sandbox)</div>
                    </div>

                    {/* Chat Log */}
                    <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#0b0d11]">
                      {waMessages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-2.5 rounded-xl max-w-[80%] whitespace-pre-wrap leading-normal text-[11px] ${
                            m.sender === 'user'
                              ? 'bg-emerald-600 text-white rounded-tr-none'
                              : 'bg-[#1b212c] text-slate-200 rounded-tl-none border border-[#27303f]'
                          }`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Phone Input */}
                    <form onSubmit={handleWaSubmit} className="p-2 bg-[#121620] border-t border-[#1e2330] flex gap-2">
                      <input
                        type="text" value={waInput} onChange={(e) => setWaInput(e.target.value)}
                        placeholder="Escribe '1', '2' o una pregunta..."
                        className="flex-1 bg-[#1a202d] text-white px-3 py-1.5 rounded-lg border border-[#283247] text-xs focus:outline-none"
                      />
                      <button type="submit" className="px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* 7. SDR Outreach Sandbox */}
              {selectedModule === 'outreach' && (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400">
                    Inicia un agente inteligente autónomo de prospección SDR. El bot escaneará bases de datos, redactará y enviará correos de seguimiento frío de forma independiente.
                  </p>

                  <button
                    onClick={startSdrAgent}
                    disabled={sdrRunning}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {sdrRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Agente SDR Prospectando...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Iniciar Agente SDR de Ventas</span>
                      </>
                    )}
                  </button>

                  {sdrLogs.length > 0 && (
                    <div className="bg-[#0b0c10] border border-[#1d2433] rounded-xl p-3 font-mono text-[10px] space-y-1.5 h-[160px] overflow-y-auto">
                      {sdrLogs.map((log, idx) => (
                        <div key={idx} className="text-emerald-400">
                          <span className="text-slate-500 mr-2">&gt;</span>
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 8. Portal del Cliente Sandbox */}
              {selectedModule === 'portal' && (
                <div className="space-y-4">
                  <div className="bg-[#141824] p-4 rounded-xl border border-[#21283a] space-y-3">
                    <h4 className="font-semibold text-white">Tickets del Portal de Clientes</h4>
                    <div className="space-y-2">
                      {portalTickets.map((t) => (
                        <div key={t.id} className="bg-[#1b2130] p-2.5 rounded-lg border border-[#2a3449] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-blue-400 font-mono font-semibold mr-2">{t.id}</span>
                            <span className="text-white">{t.title}</span>
                          </div>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                            t.status === 'Abierto' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={createPortalTicket} className="flex gap-2">
                    <input
                      type="text" value={newTicketTitle} onChange={(e) => setNewTicketTitle(e.target.value)}
                      placeholder="Reportar nuevo ticket desde el portal..."
                      className="flex-1 bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs cursor-pointer">
                      Agregar Ticket
                    </button>
                  </form>
                </div>
              )}

              {/* 9. Asistente IA Gemini 2.5 Sandbox */}
              {selectedModule === 'gemini' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Escribe tu consulta para el Analista CMO</label>
                    <textarea
                      rows={2} value={geminiQuery} onChange={(e) => setGeminiQuery(e.target.value)}
                      className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={runGeminiAsistente}
                    disabled={geminiLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {geminiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Analizando mercado...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Consultar Asistente CMO</span>
                      </>
                    )}
                  </button>

                  {geminiResponse && (
                    <div className="bg-[#141824] p-4 rounded-xl border border-blue-500/20 text-slate-300 leading-normal text-[11px] whitespace-pre-wrap">
                      {geminiResponse}
                    </div>
                  )}
                </div>
              )}

              {/* 10. Generador de Estrategias Sandbox */}
              {selectedModule === 'gtm' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Producto / Servicio</label>
                      <input
                        type="text" value={gtmProduct} onChange={(e) => setGtmProduct(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Público Objetivo</label>
                      <input
                        type="text" value={gtmAudience} onChange={(e) => setGtmAudience(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={runGTMGenerator}
                    disabled={gtmLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {gtmLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generando Plan con IA...</span>
                      </>
                    ) : (
                      <>
                        <Target className="w-3.5 h-3.5" />
                        <span>Generar Plan Go-To-Market</span>
                      </>
                    )}
                  </button>

                  {gtmStrategy && (
                    <div className="bg-[#141824] p-4 rounded-xl border border-blue-500/20 text-slate-300 leading-normal text-[11px] whitespace-pre-wrap">
                      {gtmStrategy}
                    </div>
                  )}
                </div>
              )}

              {/* 11. AI Ad Copy Studio Sandbox */}
              {selectedModule === 'adcopy' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre Producto</label>
                      <input
                        type="text" value={adProduct} onChange={(e) => setAdProduct(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Plataforma</label>
                      <select
                        value={adPlatform} onChange={(e) => setAdPlatform(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      >
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook Ads">Facebook Ads</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Email Frío">Email Frío</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={runAdStudio}
                    disabled={adLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {adLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Redactando copies de impacto...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5" />
                        <span>Generar Ad Copies con IA</span>
                      </>
                    )}
                  </button>

                  {adCopies.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {adCopies.map((copy, idx) => (
                        <div key={idx} className="bg-[#141824] border border-[#21283a] p-3 rounded-lg text-slate-300 text-[11px] leading-relaxed">
                          {copy}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 12. SEO Suite Complete Sandbox */}
              {selectedModule === 'seo' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text" value={seoDomain} onChange={(e) => setSeoDomain(e.target.value)}
                      placeholder="mi-empresa.com"
                      className="flex-1 bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                    />
                    <button
                      onClick={runSEOSuite}
                      disabled={seoLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      {seoLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                      <span>Analizar Sitio</span>
                    </button>
                  </div>

                  {seoResult && (
                    <div className="bg-[#141824] p-4 rounded-xl border border-[#21283a] space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-semibold">SEO Health Score:</span>
                        <span className="text-base font-bold text-emerald-400">{seoResult.score} / 100</span>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-slate-300">Keywords de Mayor Interés:</div>
                        {seoResult.keywords.map((kw: any, idx: number) => (
                          <div key={idx} className="bg-[#1b2130] p-2 rounded border border-[#2a3449] flex justify-between text-[11px]">
                            <span className="text-white">{kw.word}</span>
                            <span className="text-slate-400">Vol: {kw.search} • Dif: {kw.difficulty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 text-rose-300 text-[11px]">
                        <div className="font-semibold text-slate-300">Errores Críticos Detectados:</div>
                        {seoResult.issues.map((iss: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <AlertCircle className="w-3 h-3 text-rose-400 mt-0.5 shrink-0" />
                            <span>{iss}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 13. Webhooks & Integrations Sandbox */}
              {selectedModule === 'integrations' && (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400">
                    Sincroniza y gatilla eventos hacia más de 60 integraciones (Slack, Gmail, Stripe, ERP, AFIP, MercadoPago, etc.) mediante webhooks salientes activos.
                  </p>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Tu Endpoint Webhook de Destino</label>
                    <input
                      type="text" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const logStr = `[${new Date().toLocaleTimeString()}] Trigger: Deal "SaaS Upgrade" avanzado a Ganado. Webhook enviado a destino con código de respuesta HTTP 200 OK.`;
                      setWebhookLogs([logStr, ...webhookLogs]);
                      showToast('Webhook de prueba gatillado con éxito', 'success');
                      triggerConfetti();
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Enviar Evento de Prueba (Test Payload)
                  </button>

                  {webhookLogs.length > 0 && (
                    <div className="space-y-1 mt-2">
                      <div className="text-[11px] font-semibold text-slate-300">Registro de Transmisión:</div>
                      {webhookLogs.map((log, idx) => (
                        <div key={idx} className="bg-[#0b0c10] border border-[#21283a] p-2.5 rounded-lg text-[10px] font-mono text-blue-400">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 14. Facturación AFIP Sandbox */}
              {selectedModule === 'afip' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">CUIT del Receptor</label>
                      <input
                        type="text" value={afipCuit} onChange={(e) => setAfipCuit(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Tipo de Factura</label>
                      <select
                        value={afipType} onChange={(e) => setAfipType(e.target.value)}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      >
                        <option value="Factura A">Factura A (Responsable Inscripto)</option>
                        <option value="Factura B">Factura B (Consumidor Final)</option>
                        <option value="Factura C">Factura C (Monotributo)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={emitirFacturaAFIP}
                    disabled={afipLoading}
                    className="w-full py-2 bg-[#252d42] hover:bg-[#2d364e] disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {afipLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Conectando con servidores de AFIP...</span>
                      </>
                    ) : (
                      <>
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Emitir Factura Electrónica Autorizada</span>
                      </>
                    )}
                  </button>

                  {afipInvoice && (
                    <div className="bg-[#141824] p-4 rounded-xl border border-blue-500/20 text-xs space-y-2 relative overflow-hidden">
                      {/* Background Watermark */}
                      <div className="absolute right-2 bottom-2 text-blue-500/10 font-bold text-6xl pointer-events-none select-none uppercase">
                        AFIP
                      </div>

                      <div className="flex justify-between items-center border-b border-[#21283a] pb-1.5 font-bold text-white text-[13px]">
                        <span>Comprobante Oficial Electrónico</span>
                        <span className="text-blue-400">{afipType}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <div><strong>Nro Factura:</strong> {afipInvoice.number}</div>
                        <div><strong>Fecha Emisión:</strong> {afipInvoice.date}</div>
                        <div><strong>Receptor CUIT:</strong> {afipCuit}</div>
                        <div><strong>Total Facturado:</strong> {afipInvoice.amount}</div>
                      </div>

                      <div className="pt-2 border-t border-[#21283a] flex items-center justify-between text-[11px]">
                        <div>
                          <div className="text-emerald-400 font-bold">CAE Autorizado: {afipInvoice.cae}</div>
                          <div className="text-slate-400 text-[10px] mt-0.5">Vencimiento CAE: {afipInvoice.vto}</div>
                        </div>
                        {/* Mock QR Code */}
                        <div className="p-1 bg-white rounded">
                          <QrCode className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 15. Cobros MercadoPago Sandbox */}
              {selectedModule === 'mercadopago' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Monto del Cobro ($ ARS / USD)</label>
                      <input
                        type="number" value={mpAmount} onChange={(e) => setMpAmount(Number(e.target.value))}
                        className="w-full bg-[#161a26] text-white px-3 py-2 rounded-lg border border-[#252c3f] text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Cliente / Cuenta</label>
                      <input
                        type="text" value="TechCorp Solutions" disabled
                        className="w-full bg-[#12151d] text-slate-400 px-3 py-2 rounded-lg border border-[#1e2330] text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={generateMPLink}
                    disabled={mpLoading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {mpLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                    <span>Generar Link de Cobro de MercadoPago</span>
                  </button>

                  {mpLink && (
                    <div className="bg-[#141824] p-4 rounded-xl border border-blue-500/20 space-y-3.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Sandbox Payment Link:</span>
                        <span className="text-[10px] text-blue-400 select-all font-mono bg-[#1c2233] px-2 py-0.5 rounded border border-[#2c3751]">
                          {mpLink}
                        </span>
                      </div>

                      <div className="flex justify-center p-2 bg-white rounded-lg w-24 h-24 mx-auto shadow-md">
                        <QrCode className="w-full h-full text-black" />
                      </div>

                      {!mpPayed ? (
                        <button
                          onClick={simulateSuccessPayment}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Simular Pago Exitoso del Cliente</span>
                        </button>
                      ) : (
                        <div className="bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-300 font-semibold text-center text-xs">
                          ✓ ¡Suscripción y Pago Aprobados! El CRM ha registrado la venta de forma autónoma.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 16. Desarrollo Web Widget Embed Sandbox */}
              {selectedModule === 'webdev' && (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400">
                    Copia y pega este formulario de contacto embebido en tu sitio web. Cualquier prospecto que complete sus datos ingresará instantáneamente como nuevo Lead dentro de tu canal CRM.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Live Widget Form Preview */}
                    <div className="bg-[#141824] p-4 rounded-xl border border-[#21283a] space-y-3">
                      <h4 className="font-semibold text-white text-center text-xs">{formWidgetTitle}</h4>
                      <form onSubmit={handleWebformDemo} className="space-y-2.5">
                        <input
                          type="text" placeholder="Tu Nombre" value={webFormName} onChange={(e) => setWebFormName(e.target.value)}
                          className="w-full bg-[#1c2231] text-white px-2.5 py-1.5 rounded-lg border border-[#2c3751] text-[11px] focus:outline-none"
                        />
                        <input
                          type="email" placeholder="Tu Correo Electrónico" value={webFormEmail} onChange={(e) => setWebFormEmail(e.target.value)}
                          className="w-full bg-[#1c2231] text-white px-2.5 py-1.5 rounded-lg border border-[#2c3751] text-[11px] focus:outline-none"
                        />
                        <button type="submit" className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-[11px] cursor-pointer">
                          Registrarme Gratis
                        </button>
                      </form>
                    </div>

                    {/* Copiable Code Embed */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-slate-300">Snippet de Integración HTML/SaaS:</div>
                      <textarea
                        readOnly
                        rows={6}
                        value={`<!-- Twenty CRM Web Form integration -->\n<form action="https://hooks.twenty.com/webform/new-lead" method="POST">\n  <input type="text" name="name" placeholder="Name" required />\n  <input type="email" name="email" placeholder="Email" required />\n  <button type="submit">Submit Demo</button>\n</form>`}
                        className="w-full bg-[#0b0c10] text-[10px] font-mono text-blue-400 p-3 rounded-lg border border-[#21283a] focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions of selection panel */}
            <div className="p-4 bg-[#11141e] border-t border-[#1e2434] flex justify-between items-center">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Sincronización segura por Token SSL
              </span>
              <button
                onClick={() => {
                  setSelectedModule(null);
                  showToast('Configuraciones aplicadas y sincronizadas', 'success');
                  triggerConfetti();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                Aplicar e Integrar Módulo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
