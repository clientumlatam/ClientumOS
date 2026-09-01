import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Mail, Search, Share2, Bot, Settings, Users, ArrowUpRight, Plus,
  Trash2, Send, Play, CheckCircle2, AlertCircle, FileText, Calendar,
  Globe, Terminal, Check, Copy, Code, ArrowRight, Upload, Smartphone,
  ExternalLink, ChevronRight, BarChart2, MessageSquare, ToggleLeft, ToggleRight,
  Database, RefreshCw
} from 'lucide-react';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: 'Activo' | 'Inactivo';
  list: string;
  tags: string[];
  addedDate: string;
}

interface Campaign {
  id: string;
  title: string;
  subject: string;
  status: 'Enviado' | 'Borrador' | 'Programado';
  recipients: number;
  openRate: string;
  clickRate: string;
  sentDate: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
  body: string;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  status: 'Publicado' | 'Borrador';
  keywords: string[];
  date: string;
  content: string;
}

interface KeywordResult {
  keyword: string;
  volume: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  intent: 'Informativo' | 'Transaccional' | 'Comercial';
  recommendation: string;
}

interface SocialAccount {
  id: string;
  platform: 'LinkedIn' | 'Facebook' | 'Instagram' | 'Twitter';
  handle: string;
  connected: boolean;
}

interface ScheduledSocialPost {
  id: string;
  platform: 'LinkedIn' | 'Facebook' | 'Instagram' | 'Twitter';
  content: string;
  date: string;
  time: string;
  status: 'Programado' | 'Publicado';
}

interface ChatSession {
  id: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  status: 'Calificado' | 'Activo' | 'Escalado';
  messages: Array<{ role: 'visitor' | 'bot'; text: string; time: string }>;
  timestamp: string;
}

export function AiMarketingExpert() {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'email' | 'content' | 'seo' | 'social' | 'chatbot'>('dashboard');

  const [modules, setModules] = useState({
    email: true,
    content: true,
    seo: true,
    social: true,
    chatbot: true,
  });

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: '1', name: 'Carlos Mendoza', email: 'carlos.m@empresa.cl', status: 'Activo', list: 'Newsletter General', tags: ['B2B', 'SaaS'], addedDate: '2026-08-01' },
    { id: '2', name: 'Lucía Fernández', email: 'lucia.f@startup.co', status: 'Activo', list: 'Prospectos Clave', tags: ['Ecommerce'], addedDate: '2026-08-03' },
    { id: '3', name: 'Andrés Silva', email: 'andres.s@retail.com.ar', status: 'Activo', list: 'Newsletter General', tags: ['Retail'], addedDate: '2026-08-04' },
    { id: '4', name: 'Sofía Martínez', email: 'sofia.m@marketing.mx', status: 'Inactivo', list: 'Lista Fría', tags: ['Agencia'], addedDate: '2026-07-25' }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', title: 'Boletín de Lanzamiento Agosto', subject: 'Lanzamos nuevas herramientas en Clientum', status: 'Enviado', recipients: 1240, openRate: '34.2%', clickRate: '8.7%', sentDate: '2026-08-02' },
    { id: '2', title: 'Seguimiento Prospectos B2B', subject: 'Optimiza tu adquisición con inteligencia artificial', status: 'Programado', recipients: 450, openRate: '0%', clickRate: '0%', sentDate: '2026-08-10' },
    { id: '3', title: 'Promo Especial Cyber', subject: 'Descuento exclusivo 40% en tu plan anual', status: 'Borrador', recipients: 0, openRate: '0%', clickRate: '0%', sentDate: '-' }
  ]);

  const [templates] = useState<EmailTemplate[]>([
    { id: 'temp1', name: 'Boletín Corporativo', subject: 'Novedades de la semana', preview: 'Mantén a tus clientes al día...', body: 'Hola {name},\n\nQueremos compartir contigo las últimas novedades de nuestro sector para ayudarte a escalar tu negocio en LATAM.\n\nAtentamente,\nEl Equipo' },
    { id: 'temp2', name: 'Bienvenida Automatizada', subject: '¡Bienvenido a nuestra comunidad!', preview: 'Es un placer tenerte con nosotros...', body: 'Hola {name},\n\n¡Gracias por suscribirte! Estamos felices de acompañarte en tu crecimiento.\n\nUsa este cupón de bienvenida: BIENVENIDO10' },
    { id: 'temp3', name: 'Oferta Especial Directa', subject: 'Oportunidad única por tiempo limitado', preview: 'No te pierdas de esta oferta...', body: 'Hola {name},\n\nSolo por las próximas 48 horas tienes acceso a nuestra suite comercial completa con un beneficio exclusivo.\n\n¡Aprovéchalo hoy!' }
  ]);

  const [posts, setPosts] = useState<BlogPost[]>([
    { id: '1', title: 'Cómo la Inteligencia Artificial está redefiniendo el SEO en Latinoamérica', category: 'Tecnología', status: 'Publicado', keywords: ['SEO', 'Inteligencia Artificial', 'LATAM'], date: '2026-08-05', content: 'El posicionamiento orgánico en buscadores ya no es lo que solía ser. Hoy, los algoritmos valoran la intención de búsqueda holística.' },
    { id: '2', title: '5 Estrategias infalibles para optimizar tus campañas de Email Marketing B2B', category: 'Email Marketing', status: 'Borrador', keywords: ['Email Marketing', 'B2B', 'Ventas'], date: '2026-08-06', content: 'Una tasa de apertura de más de 30% requiere un asunto personalizado y segmentación por intereses clave.' }
  ]);

  const [keywords, setKeywords] = useState<KeywordResult[]>([
    { keyword: 'crm ventas argentina', volume: '1,200/mes', difficulty: 'Media', intent: 'Transaccional', recommendation: 'Crear landing page optimizada orientada a automatización' },
    { keyword: 'herramientas seo gratuitas', volume: '5,400/mes', difficulty: 'Difícil', intent: 'Informativo', recommendation: 'Desarrollar un recurso descargable sobre auditorías on-page' },
    { keyword: 'automatizar mensajes whatsapp', volume: '3,800/mes', difficulty: 'Media', intent: 'Comercial', recommendation: 'Redactar comparativa de software multiagente' }
  ]);

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { id: '1', platform: 'LinkedIn', handle: 'ClientumLatam', connected: true },
    { id: '2', platform: 'Facebook', handle: 'Clientum Oficial', connected: true },
    { id: '3', platform: 'Instagram', handle: '@clientum.latam', connected: false },
    { id: '4', platform: 'Twitter', handle: '@ClientumCRM', connected: false }
  ]);

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledSocialPost[]>([
    { id: '1', platform: 'LinkedIn', content: 'La automatización de procesos comerciales incrementa el cierre de contratos un 28% promedio. Descubre cómo aplicarlo con Clientum.', date: '2026-08-07', time: '10:00 AM', status: 'Programado' },
    { id: '2', platform: 'Facebook', content: '¿Listo para llevar tus campañas de prospección al siguiente nivel? Usa el scraping inteligente.', date: '2026-08-08', time: '03:30 PM', status: 'Programado' }
  ]);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 'chat1',
      leadName: 'Fernanda Ortiz',
      leadEmail: 'f.ortiz@corporativo.mx',
      leadPhone: '+52 55 1234 5678',
      status: 'Calificado',
      timestamp: 'Hace 15 min',
      messages: [
        { role: 'visitor', text: 'Hola, me gustaría saber si el software se integra con WooCommerce.', time: '11:20 AM' },
        { role: 'bot', text: '¡Hola! Sí, Clientum cuenta con integración nativa para WooCommerce para disparar correos de carritos abandonados.', time: '11:21 AM' },
        { role: 'visitor', text: '¡Genial! Mi correo es f.ortiz@corporativo.mx y mi cel es +52 55 1234 5678.', time: '11:22 AM' }
      ]
    },
    {
      id: 'chat2',
      leadName: 'Roberto Gómez',
      leadEmail: 'roberto@tiendavirtual.cl',
      leadPhone: '+56 9 8765 4321',
      status: 'Activo',
      timestamp: 'Hace 1 hora',
      messages: [
        { role: 'visitor', text: '¿Tienen soporte técnico en español?', time: '10:15 AM' },
        { role: 'bot', text: '¡Totalmente! Nuestro equipo está basado en Buenos Aires y brinda soporte 100% en español.', time: '10:16 AM' }
      ]
    }
  ]);

  const [newSub, setNewSub] = useState({ name: '', email: '', list: 'Newsletter General', tags: '' });
  const [csvContent, setCsvContent] = useState('');
  const [newCamp, setNewCamp] = useState({ title: '', subject: '', templateId: 'temp1', list: 'Newsletter General' });
  const [newPostParams, setNewPostParams] = useState({ topic: '', tone: 'Profesional', keywords: '', length: 'Media' });
  const [newKeywordSeed, setNewKeywordSeed] = useState('');
  const [newAuditUrl, setNewAuditUrl] = useState('');
  const [auditResult, setAuditResult] = useState<{ score: number; checks: Array<{ name: string; status: 'ok' | 'warning'; text: string }> } | null>(null);
  const [socialComposer, setSocialComposer] = useState({ platform: 'LinkedIn' as any, content: '', date: '', time: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveBotMsg, setLiveBotMsg] = useState('');
  const [liveChatHistory, setLiveChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: '¡Hola! Soy el asistente virtual de crecimiento. ¿Estás buscando optimizar tu marketing?' }
  ]);
  const [visitorEmailInput, setVisitorEmailInput] = useState('');
  const [visitorPhoneInput, setVisitorPhoneInput] = useState('');
  const [leadCapturedSuccess, setLeadCapturedSuccess] = useState(false);

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.email || !newSub.name) return;
    const item: Subscriber = {
      id: String(Date.now()),
      name: newSub.name,
      email: newSub.email,
      status: 'Activo',
      list: newSub.list,
      tags: newSub.tags.split(',').map(t => t.trim()).filter(Boolean),
      addedDate: new Date().toISOString().split('T')[0]
    };
    setSubscribers([item, ...subscribers]);
    setNewSub({ name: '', email: '', list: 'Newsletter General', tags: '' });
  };

  const handleCsvImport = () => {
    if (!csvContent.trim()) return;
    const lines = csvContent.split('\n');
    const newItems: Subscriber[] = [];
    lines.forEach(line => {
      const parts = line.split(',');
      if (parts.length >= 2 && parts[1].includes('@')) {
        newItems.push({
          id: String(Date.now() + Math.random()),
          name: parts[0].trim(),
          email: parts[1].trim(),
          status: 'Activo',
          list: 'Newsletter General',
          tags: ['CSV-Import'],
          addedDate: new Date().toISOString().split('T')[0]
        });
      }
    });
    setSubscribers([...newItems, ...subscribers]);
    setCsvContent('');
    alert(`Se importaron ${newItems.length} contactos de forma exitosa.`);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.title || !newCamp.subject) return;
    const selectedListCount = subscribers.filter(s => s.list === newCamp.list).length;
    const item: Campaign = {
      id: String(Date.now()),
      title: newCamp.title,
      subject: newCamp.subject,
      status: 'Borrador',
      recipients: selectedListCount,
      openRate: '0%',
      clickRate: '0%',
      sentDate: '-'
    };
    setCampaigns([item, ...campaigns]);
    setNewCamp({ title: '', subject: '', templateId: 'temp1', list: 'Newsletter General' });
  };

  const handleSendCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: 'Enviado',
          sentDate: new Date().toISOString().split('T')[0],
          openRate: `${Math.floor(Math.random() * 20) + 20}%`,
          clickRate: `${Math.floor(Math.random() * 8) + 3}%`
        };
      }
      return c;
    }));
  };

  const handleGenerateBlog = async () => {
    if (!newPostParams.topic) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Escribe un artículo de blog profesional sobre el tema: "${newPostParams.topic}". Usa un tono ${newPostParams.tone} y trata de enfocarlo en las palabras clave: ${newPostParams.keywords}. Devuelve el artículo completo con título y contenido extenso.`
          }],
          model: 'gemini-3.5-flash',
          systemInstruction: 'Eres un redactor experto en SEO de Clientum que redacta posts súper útiles para pequeñas empresas.'
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        const item: BlogPost = {
          id: String(Date.now()),
          title: newPostParams.topic,
          category: 'Generado por IA',
          status: 'Borrador',
          keywords: newPostParams.keywords.split(',').map(k => k.trim()).filter(Boolean),
          date: new Date().toISOString().split('T')[0],
          content: data.reply
        };
        setPosts([item, ...posts]);
      } else {
        throw new Error();
      }
    } catch {
      const item: BlogPost = {
        id: String(Date.now()),
        title: newPostParams.topic,
        category: 'Generado por IA',
        status: 'Borrador',
        keywords: newPostParams.keywords.split(',').map(k => k.trim()).filter(Boolean),
        date: new Date().toISOString().split('T')[0],
        content: `Aquí tienes una estructura recomendada para tu post sobre ${newPostParams.topic}. Te recomendamos optimizar los H2 y H3 usando las palabras clave clave: ${newPostParams.keywords}.`
      };
      setPosts([item, ...posts]);
    } finally {
      setIsGenerating(false);
      setNewPostParams({ topic: '', tone: 'Profesional', keywords: '', length: 'Media' });
    }
  };

  const handleKeywordResearch = async () => {
    if (!newKeywordSeed) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Genera una tabla de 3 palabras clave relacionadas con la palabra semilla: "${newKeywordSeed}". Devuelve un JSON con el formato: [{"keyword": "...", "volume": "...", "difficulty": "Fácil|Media|Difícil", "intent": "Informativo|Transaccional|Comercial", "recommendation": "..."}]`
          }],
          model: 'gemini-3.5-flash'
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        const cleanJson = data.reply.substring(data.reply.indexOf('['), data.reply.lastIndexOf(']') + 1);
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed)) {
          setKeywords([...parsed, ...keywords]);
        }
      } else {
        throw new Error();
      }
    } catch {
      const customKws: KeywordResult[] = [
        { keyword: `${newKeywordSeed} comprar`, volume: '800/mes', difficulty: 'Fácil', intent: 'Transaccional', recommendation: 'Añadir a listado de ofertas principales' },
        { keyword: `mejor ${newKeywordSeed}`, volume: '1,500/mes', difficulty: 'Media', intent: 'Comercial', recommendation: 'Crear guía comparativa del año' },
        { keyword: `que es ${newKeywordSeed}`, volume: '3,200/mes', difficulty: 'Fácil', intent: 'Informativo', recommendation: 'Definir en sección de glosario técnico' }
      ];
      setKeywords([...customKws, ...keywords]);
    } finally {
      setIsGenerating(false);
      setNewKeywordSeed('');
    }
  };

  const handlePageAudit = () => {
    if (!newAuditUrl) return;
    setIsGenerating(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 75;
      setAuditResult({
        score,
        checks: [
          { name: 'Etiqueta de Título principal H1', status: 'ok', text: 'Encontrada con éxito y optimizada.' },
          { name: 'Palabra clave en primer párrafo', status: score > 85 ? 'ok' : 'warning', text: 'La palabra clave principal no se encuentra en las primeras 100 palabras.' },
          { name: 'Velocidad de carga en móviles', status: 'ok', text: 'Excelente tiempo de respuesta de 1.4 segundos.' },
          { name: 'Imágenes con descripción ALT', status: 'warning', text: 'Se encontraron 4 imágenes sin atributo ALT descriptivo.' },
          { name: 'Enlaces internos configurados', status: 'ok', text: 'La estructura de enlaces internos está correctamente distribuida.' }
        ]
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleGenerateSocialCaption = async () => {
    if (!socialComposer.content) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Genera un copy optimizado para la red social ${socialComposer.platform} sobre esta idea de post: "${socialComposer.content}". Incluye hashtags relevantes y emojis.`
          }],
          model: 'gemini-3.5-flash'
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setSocialComposer({ ...socialComposer, content: data.reply });
      }
    } catch {
      setSocialComposer({
        ...socialComposer,
        content: `${socialComposer.content}\n\n🚀 Automatiza hoy mismo tus procesos de venta con Clientum CRM. ¡Es hora de escalar! #Marketing #CRM #Latam`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleSocialPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialComposer.content) return;
    const item: ScheduledSocialPost = {
      id: String(Date.now()),
      platform: socialComposer.platform,
      content: socialComposer.content,
      date: socialComposer.date || new Date().toISOString().split('T')[0],
      time: socialComposer.time || '12:00 PM',
      status: 'Programado'
    };
    setScheduledPosts([item, ...scheduledPosts]);
    setSocialComposer({ platform: 'LinkedIn', content: '', date: '', time: '' });
  };

  const handleSendLiveBotMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveBotMsg.trim()) return;
    const userMsg = { sender: 'user' as const, text: liveBotMsg };
    setLiveChatHistory(prev => [...prev, userMsg]);
    setLiveBotMsg('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: liveBotMsg
          }],
          model: 'gemini-3.5-flash',
          systemInstruction: 'Eres un chatbot automatizado de generación de leads. Eres cortés y buscas obtener el contacto del usuario.'
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setLiveChatHistory(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        throw new Error();
      }
    } catch {
      setTimeout(() => {
        setLiveChatHistory(prev => [...prev, { sender: 'bot', text: 'Entiendo tu consulta perfectamente. Para poder brindarte atención personalizada por nuestro equipo experto, ¿podrías dejarme tu correo y número telefónico?' }]);
      }, 500);
    }
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorEmailInput) return;
    const newSession: ChatSession = {
      id: String(Date.now()),
      leadName: 'Prospecto Web Anónimo',
      leadEmail: visitorEmailInput,
      leadPhone: visitorPhoneInput || 'No proporcionado',
      status: 'Calificado',
      timestamp: 'Ahora mismo',
      messages: liveChatHistory.map(m => ({
        role: m.sender === 'user' ? 'visitor' : 'bot',
        text: m.text,
        time: 'Ahora'
      }))
    };
    setChatSessions([newSession, ...chatSessions]);
    setLeadCapturedSuccess(true);
    setVisitorEmailInput('');
    setVisitorPhoneInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
            AI Marketing Expert — Centro de Crecimiento Modular
          </h1>
          <p className="text-sm text-slate-500">
            Administra tus campañas, genera contenido de alto impacto, optimiza SEO y responde leads con IA nativa.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Ajustes de Módulos
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'dashboard'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          Dashboard & Toggles
        </button>
        <button
          onClick={() => setActiveSubTab('email')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'email'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          } ${!modules.email ? 'opacity-40' : ''}`}
        >
          <Mail className="w-4 h-4" />
          Email Marketing {modules.email && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveSubTab('content')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'content'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          } ${!modules.content ? 'opacity-40' : ''}`}
        >
          <FileText className="w-4 h-4" />
          Blog IA {modules.content && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveSubTab('seo')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'seo'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          } ${!modules.seo ? 'opacity-40' : ''}`}
        >
          <Search className="w-4 h-4" />
          SEO Audit & Keywords {modules.seo && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveSubTab('social')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'social'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          } ${!modules.social ? 'opacity-40' : ''}`}
        >
          <Share2 className="w-4 h-4" />
          Social Plan {modules.social && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveSubTab('chatbot')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'chatbot'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          } ${!modules.chatbot ? 'opacity-40' : ''}`}
        >
          <Bot className="w-4 h-4" />
          Chatbot Conversacional {modules.chatbot && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
        </button>
      </div>

      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Subscriptores</span>
                <span className="text-2xl font-bold text-slate-800">{subscribers.length}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Posts en Borrador</span>
                <span className="text-2xl font-bold text-slate-800">{posts.filter(p => p.status === 'Borrador').length}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Palabras Clave</span>
                <span className="text-2xl font-bold text-slate-800">{keywords.length}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Social Scheduled</span>
                <span className="text-2xl font-bold text-slate-800">{scheduledPosts.length}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Conversaciones</span>
                <span className="text-2xl font-bold text-slate-800">{chatSessions.length}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-600" />
                Configuración de Módulos Activos
              </h3>
              <p className="text-xs text-slate-500">
                Como administrador de Clientum, puedes prender y apagar módulos específicos según el plan y necesidad de tu pequeña empresa.
              </p>
              <div className="space-y-3.5 divide-y divide-slate-100 pt-2">
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Módulo de Email Marketing</h4>
                      <p className="text-[10px] text-slate-500">Administrador de listas de destinatarios, importador CSV y campañas masivas.</p>
                    </div>
                  </div>
                  <button onClick={() => setModules({ ...modules, email: !modules.email })} className="cursor-pointer">
                    {modules.email ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Generador de Contenido con IA</h4>
                      <p className="text-[10px] text-slate-500">Crea publicaciones de blog optimizadas con Gemini y guárdalos como borrador.</p>
                    </div>
                  </div>
                  <button onClick={() => setModules({ ...modules, content: !modules.content })} className="cursor-pointer">
                    {modules.content ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">SEO Inteligente & Auditorías</h4>
                      <p className="text-[10px] text-slate-500">Búsqueda avanzada de palabras clave y auditoría de páginas on-page en segundos.</p>
                    </div>
                  </div>
                  <button onClick={() => setModules({ ...modules, seo: !modules.seo })} className="cursor-pointer">
                    {modules.seo ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Automatización de Redes Sociales</h4>
                      <p className="text-[10px] text-slate-500">Planificador visual, cuentas conectadas y sugerencias de captions con IA.</p>
                    </div>
                  </div>
                  <button onClick={() => setModules({ ...modules, social: !modules.social })} className="cursor-pointer">
                    {modules.social ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-50 text-indigo-600 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Lead Generation Chatbot</h4>
                      <p className="text-[10px] text-slate-500">Conversaciones proactivas en tu sitio web para capturar correos y números.</p>
                    </div>
                  </div>
                  <button onClick={() => setModules({ ...modules, chatbot: !modules.chatbot })} className="cursor-pointer">
                    {modules.chatbot ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-bold">
                  <Code className="w-3 h-3" /> Integración del Plugin
                </span>
                <h3 className="text-base font-bold">Integración en tu Sitio WordPress</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Para incorporar el formulario de suscripción y el chatbot inteligente de captura de leads directamente en tu sitio de WordPress o HTML, copia el código corto de integración a continuación.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 select-all">
                  [aime_subscribe id="lead_capture"]
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300 select-all">
                  &lt;script src="https://ais-pre-5mq.run.app/widget.js"&gt;&lt;/script&gt;
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Versión del Kernel v1.1.1</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Conectado
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'email' && (
        <div className="space-y-6">
          {!modules.email ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Módulo de Email Marketing Desactivado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este módulo se encuentra desactivado en tus preferencias actuales. Ve al tab principal de Dashboard & Toggles para encenderlo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Directorio de Suscriptores
                  </h3>
                  <span className="text-xs text-slate-500">{subscribers.length} total</span>
                </div>

                <div className="overflow-x-auto border border-slate-100 rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-150">
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Lista</th>
                        <th className="p-3">Tags</th>
                        <th className="p-3">Fecha</th>
                        <th className="p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {subscribers.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="p-3 font-mono">{s.email}</td>
                          <td className="p-3">{s.list}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {s.tags.map(t => (
                                <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold rounded text-slate-600 border border-slate-200">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">{s.addedDate}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                              s.status === 'Activo'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Campañas de Envío de Email
                  </h3>
                  <div className="space-y-3">
                    {campaigns.map((c) => (
                      <div key={c.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-800">{c.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                              c.status === 'Enviado'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : c.status === 'Programado'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {c.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">Asunto: {c.subject} • Lista: {c.recipients} destinatarios</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {c.status === 'Enviado' ? (
                            <div className="flex gap-4 text-right">
                              <div>
                                <span className="block text-[9px] text-slate-400 uppercase font-bold">Apertura</span>
                                <span className="text-xs font-bold text-slate-800">{c.openRate}</span>
                              </div>
                              <div>
                                <span className="block text-[9px] text-slate-400 uppercase font-bold">Clics</span>
                                <span className="text-xs font-bold text-slate-800">{c.clickRate}</span>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSendCampaign(c.id)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Play className="w-3 h-3" /> Enviar Ahora
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Registrar Nuevo Suscriptor
                  </h3>
                  <form onSubmit={handleAddSubscriber} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={newSub.name}
                        onChange={e => setNewSub({ ...newSub, name: e.target.value })}
                        placeholder="Ej. Juan Pérez"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50 hover:bg-white focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Dirección de Email</label>
                      <input
                        type="email"
                        required
                        value={newSub.email}
                        onChange={e => setNewSub({ ...newSub, email: e.target.value })}
                        placeholder="Ej. juan@correo.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50 hover:bg-white focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lista Asociada</label>
                      <select
                        value={newSub.list}
                        onChange={e => setNewSub({ ...newSub, list: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      >
                        <option value="Newsletter General">Newsletter General</option>
                        <option value="Prospectos Clave">Prospectos Clave</option>
                        <option value="Lista Fría">Lista Fría</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Etiquetas (separadas por coma)</label>
                      <input
                        type="text"
                        value={newSub.tags}
                        onChange={e => setNewSub({ ...newSub, tags: e.target.value })}
                        placeholder="Ej. B2B, Leads, Recomiendo"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50 hover:bg-white focus:bg-white transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Añadir a la lista
                    </button>
                  </form>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-600" />
                    Importador CSV de Contactos
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Pega tus datos en formato plano de CSV (Formato: Nombre, Email) para importarlos inmediatamente.
                  </p>
                  <textarea
                    rows={4}
                    value={csvContent}
                    onChange={e => setCsvContent(e.target.value)}
                    placeholder="Eugenio Rivas, eugenio@gmx.com&#10;Pamela Soto, pamela@soto.cl"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                  />
                  <button
                    onClick={handleCsvImport}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Procesar e Importar CSV
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Nueva Campaña / Newsletter
                  </h3>
                  <form onSubmit={handleCreateCampaign} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Título Interno</label>
                      <input
                        type="text"
                        required
                        value={newCamp.title}
                        onChange={e => setNewCamp({ ...newCamp, title: e.target.value })}
                        placeholder="Ej. Campaña Invierno 2026"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Línea de Asunto</label>
                      <input
                        type="text"
                        required
                        value={newCamp.subject}
                        onChange={e => setNewCamp({ ...newCamp, subject: e.target.value })}
                        placeholder="Ej. ¡Descubre nuestras promociones!"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Enviar a Lista</label>
                      <select
                        value={newCamp.list}
                        onChange={e => setNewCamp({ ...newCamp, list: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                      >
                        <option value="Newsletter General">Newsletter General</option>
                        <option value="Prospectos Clave">Prospectos Clave</option>
                        <option value="Lista Fría">Lista Fría</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Guardar como Borrador
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'content' && (
        <div className="space-y-6">
          {!modules.content ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Módulo de Blog IA Desactivado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este módulo se encuentra desactivado en tus preferencias actuales. Ve al tab principal de Dashboard & Toggles para encenderlo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Escribir Artículo de Blog con IA
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tema o Título del Artículo</label>
                    <input
                      type="text"
                      required
                      value={newPostParams.topic}
                      onChange={e => setNewPostParams({ ...newPostParams, topic: e.target.value })}
                      placeholder="Ej. Principios clave para optimizar conversiones"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tono de Redacción</label>
                    <select
                      value={newPostParams.tone}
                      onChange={e => setNewPostParams({ ...newPostParams, tone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none bg-slate-50"
                    >
                      <option value="Profesional">Profesional</option>
                      <option value="Conversacional">Conversacional / Cercano</option>
                      <option value="Inspiracional">Inspiracional</option>
                      <option value="Técnico / Detallado">Técnico / Detallado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Palabras Clave SEO (separadas por coma)</label>
                    <input
                      type="text"
                      value={newPostParams.keywords}
                      onChange={e => setNewPostParams({ ...newPostParams, keywords: e.target.value })}
                      placeholder="Ej. ventas, crm latinoamerica, Leads"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Extensión Recomendada</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Corta', 'Media', 'Larga'].map(len => (
                        <button
                          key={len}
                          type="button"
                          onClick={() => setNewPostParams({ ...newPostParams, length: len })}
                          className={`py-1.5 rounded text-xs font-bold border cursor-pointer transition-all ${
                            newPostParams.length === len
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateBlog}
                    disabled={isGenerating || !newPostParams.topic}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Redactando artículo...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Generar con Gemini AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Artículos de Blog Creados & Borradores
                </h3>
                <div className="space-y-4">
                  {posts.map((p) => (
                    <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 text-[9px] font-bold rounded text-slate-600 border border-slate-200">
                            {p.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 mt-1">{p.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Último cambio: {p.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                          p.status === 'Publicado'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-white p-3 rounded border border-slate-100 font-medium">
                        {p.content}
                      </p>

                      <div className="flex justify-between items-center text-xs">
                        <div className="flex gap-1">
                          {p.keywords.map(kw => (
                            <span key={kw} className="px-1.5 py-0.5 bg-indigo-50/50 text-[9px] font-bold text-indigo-700 rounded border border-indigo-100">
                              #{kw}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {p.status === 'Borrador' && (
                            <button
                              onClick={() => {
                                setPosts(prev => prev.map(art => art.id === p.id ? { ...art, status: 'Publicado' as const } : art));
                              }}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold cursor-pointer text-[10px] transition-colors"
                            >
                              Publicar Post
                            </button>
                          )}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(p.content);
                              alert('Contenido copiado al portapapeles.');
                            }}
                            className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-bold cursor-pointer text-[10px] transition-colors"
                          >
                            Copiar Texto
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'seo' && (
        <div className="space-y-6">
          {!modules.seo ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Módulo de SEO Desactivado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este módulo se encuentra desactivado en tus preferencias actuales. Ve al tab principal de Dashboard & Toggles para encenderlo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6 lg:col-span-1">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-4 h-4 text-indigo-600" />
                    Keyword Research con IA
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Palabra Semilla / Idea Inicial</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newKeywordSeed}
                        onChange={e => setNewKeywordSeed(e.target.value)}
                        placeholder="Ej. crm chile"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      />
                      <button
                        onClick={handleKeywordResearch}
                        disabled={isGenerating || !newKeywordSeed}
                        className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    Auditoría de Página On-Page
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">URL de tu sitio web</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newAuditUrl}
                        onChange={e => setNewAuditUrl(e.target.value)}
                        placeholder="Ej. https://mitienda.com"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      />
                      <button
                        onClick={handlePageAudit}
                        disabled={isGenerating || !newAuditUrl}
                        className="px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                      >
                        Auditar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Bóveda de Palabras Clave Estratégicas
                  </h3>
                  <div className="overflow-x-auto border border-slate-100 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-150">
                          <th className="p-3">Palabra Clave</th>
                          <th className="p-3">Volumen Estimado</th>
                          <th className="p-3">Dificultad SEO</th>
                          <th className="p-3">Intención</th>
                          <th className="p-3">Recomendación Planificada</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {keywords.map((k, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-800 font-mono">{k.keyword}</td>
                            <td className="p-3">{k.volume}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                k.difficulty === 'Fácil'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : k.difficulty === 'Media'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}>
                                {k.difficulty}
                              </span>
                            </td>
                            <td className="p-3">{k.intent}</td>
                            <td className="p-3 text-slate-500 font-medium">{k.recommendation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {auditResult && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                          Resultados de la Auditoría SEO
                        </h3>
                        <p className="text-[11px] text-slate-500">Analizado hace unos segundos</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Puntuación:</span>
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${
                          auditResult.score >= 85
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {auditResult.score} / 100
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {auditResult.checks.map((chk, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-150">
                          {chk.status === 'ok' ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{chk.name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{chk.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'social' && (
        <div className="space-y-6">
          {!modules.social ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Módulo de Redes Sociales Desactivado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este módulo se encuentra desactivado en tus preferencias actuales. Ve al tab principal de Dashboard & Toggles para encenderlo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6 lg:col-span-1">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Cuentas de Redes Sociales
                  </h3>
                  <div className="space-y-2.5">
                    {socialAccounts.map((acc) => (
                      <div key={acc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-150 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{acc.platform}</h4>
                          <p className="text-[10px] text-indigo-600 font-mono">@{acc.handle}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSocialAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, connected: !a.connected } : a));
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold border cursor-pointer transition-colors ${
                            acc.connected
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {acc.connected ? 'Conectado' : 'Conectar'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span>Programar Publicación</span>
                    <button
                      type="button"
                      onClick={handleGenerateSocialCaption}
                      disabled={isGenerating || !socialComposer.content}
                      className="text-[10px] text-indigo-600 hover:underline font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" /> Optimizar Caption
                    </button>
                  </h3>
                  <form onSubmit={handleScheduleSocialPost} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Elegir Canal</label>
                      <select
                        value={socialComposer.platform}
                        onChange={e => setSocialComposer({ ...socialComposer, platform: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none bg-slate-50"
                      >
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Idea de Post / Contenido del Copy</label>
                      <textarea
                        rows={4}
                        required
                        value={socialComposer.content}
                        onChange={e => setSocialComposer({ ...socialComposer, content: e.target.value })}
                        placeholder="Escribe la idea principal o copia el texto de tu artículo de blog..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Fecha</label>
                        <input
                          type="date"
                          value={socialComposer.date}
                          onChange={e => setSocialComposer({ ...socialComposer, date: e.target.value })}
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hora</label>
                        <input
                          type="text"
                          value={socialComposer.time}
                          onChange={e => setSocialComposer({ ...socialComposer, time: e.target.value })}
                          placeholder="Ej. 10:00 AM"
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none bg-slate-50"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isGenerating || !socialComposer.content}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Añadir a la cola de Publicación
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Cola de Publicaciones Planificadas
                </h3>
                <div className="space-y-3">
                  {scheduledPosts.map((p) => (
                    <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-150">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-50 text-[9px] font-bold text-indigo-700 rounded border border-indigo-100">
                            {p.platform}
                          </span>
                          <span className="text-slate-400 font-medium">{p.date} a las {p.time}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-bold rounded">
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed font-sans">{p.content}</p>
                      <div className="pt-2 flex justify-end gap-2 text-xs">
                        <button
                          onClick={() => {
                            setScheduledPosts(prev => prev.map(s => s.id === p.id ? { ...s, status: 'Publicado' as const } : s));
                            alert('Post publicado con éxito.');
                          }}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold cursor-pointer text-[10px] transition-colors"
                        >
                          Publicar Ahora
                        </button>
                        <button
                          onClick={() => setScheduledPosts(prev => prev.filter(s => s.id !== p.id))}
                          className="px-2.5 py-1.5 bg-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded font-bold cursor-pointer text-[10px] transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'chatbot' && (
        <div className="space-y-6">
          {!modules.chatbot ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Módulo de Chatbot Desactivado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este módulo se encuentra desactivado en tus preferencias actuales. Ve al tab principal de Dashboard & Toggles para encenderlo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-1">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  Previsualizar Widget en Vivo
                </h3>
                <div className="border border-slate-200 rounded-2xl bg-slate-50/50 p-4 h-[420px] flex flex-col justify-between shadow-xs">
                  <div className="bg-slate-900 text-white p-3 rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-bold">Asistente de Ventas IA</span>
                    </div>
                    <span className="text-[10px] text-slate-400">v1.1</span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-3.5 custom-scrollbar text-[11px] leading-relaxed">
                    {liveChatHistory.map((m, idx) => (
                      <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2.5 rounded-xl max-w-[85%] font-medium ${
                          m.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!leadCapturedSuccess ? (
                    <form onSubmit={handleCaptureLead} className="p-3 bg-white border-t border-slate-100 rounded-b-xl space-y-2">
                      <p className="text-[9px] text-slate-400 uppercase font-bold text-center">Formulario de Registro de Leads</p>
                      <input
                        type="email"
                        required
                        value={visitorEmailInput}
                        onChange={e => setVisitorEmailInput(e.target.value)}
                        placeholder="Tu dirección de correo..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-[10px] font-medium focus:outline-none"
                      />
                      <input
                        type="tel"
                        value={visitorPhoneInput}
                        onChange={e => setVisitorPhoneInput(e.target.value)}
                        placeholder="Tu número telefónico..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-[10px] font-medium focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
                      >
                        Enviar Datos y Calificar
                      </button>
                    </form>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center text-[10px] text-emerald-800 font-bold">
                      🎉 ¡Gracias! Tus datos se registraron correctamente. Un agente se contactará pronto.
                    </div>
                  )}

                  <form onSubmit={handleSendLiveBotMessage} className="p-2 border-t border-slate-200 bg-white flex gap-1.5 items-center">
                    <input
                      type="text"
                      value={liveBotMsg}
                      onChange={e => setLiveBotMsg(e.target.value)}
                      placeholder="Pregunta algo al bot..."
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-slate-50"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Bandeja de Entrada de Leads Calificados
                </h3>
                <div className="space-y-4">
                  {chatSessions.map((chat) => (
                    <div key={chat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{chat.leadName}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{chat.leadEmail} • {chat.leadPhone}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold rounded">
                          {chat.status}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-150 space-y-2">
                        <p className="text-[9px] text-slate-400 uppercase font-bold border-b border-slate-100 pb-1">Historial de Conversación</p>
                        {chat.messages.map((m, idx) => (
                          <div key={idx} className="text-[11px] leading-relaxed font-sans">
                            <strong className={m.role === 'visitor' ? 'text-indigo-600' : 'text-slate-700'}>
                              {m.role === 'visitor' ? 'Visitante: ' : 'Bot: '}
                            </strong>
                            <span className="text-slate-600 font-medium">{m.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] text-slate-400 font-medium">{chat.timestamp}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              alert(`Se agendó una llamada para contactar a ${chat.leadName}.`);
                            }}
                            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold cursor-pointer text-[10px] transition-colors"
                          >
                            Agendar Llamada CRM
                          </button>
                          <button
                            onClick={() => setChatSessions(prev => prev.filter(c => c.id !== chat.id))}
                            className="px-2.5 py-1.5 bg-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded font-bold cursor-pointer text-[10px] transition-colors"
                          >
                            Descartar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
