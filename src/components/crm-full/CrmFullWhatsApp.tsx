import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Phone,
  Search,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Zap,
  Clock,
  AlertCircle,
  CheckCheck,
  Sparkles,
  Users,
  BarChart3,
  Webhook,
  Upload,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { BulkWhatsAppModal, BulkContactItem } from '../BulkWhatsAppModal';
import { WhatsAppResolutionMetrics } from './WhatsAppResolutionMetrics';
import { WhatsAppWebhooksConfig } from './WhatsAppWebhooksConfig';
import { WhatsAppCsvImportModal } from './WhatsAppCsvImportModal';

interface WaConversation {
  id: number;
  phone: string;
  contact_name?: string;
  lead_id?: number;
  bot_active: boolean;
  last_message_at?: string;
  last_message?: string;
  unread?: number;
}

interface WaMessage {
  id: number;
  conversation_id: number;
  direction: 'inbound' | 'outbound';
  content: string;
  sent_by: 'bot' | 'human' | 'ai_suggestion' | 'system';
  created_at: string;
}

const DEMO_CONVS: WaConversation[] = [
  { id: 1, phone: '+54 9 298 443-1200', contact_name: 'Grupo Agro-Industrial Patagonia S.A.', bot_active: true, last_message_at: new Date().toISOString(), last_message: 'Hola, queremos integrar la cotización automática...', unread: 2 },
  { id: 2, phone: '+54 9 299 412-9876', contact_name: 'Logística Austral S.R.L.', bot_active: true, last_message_at: new Date(Date.now() - 3600000).toISOString(), last_message: '¿Tienen integración con AFIP y factura electrónica?' },
  { id: 3, phone: '+54 9 261 554-3321', contact_name: 'TechSol Cuyo S.A.', bot_active: false, last_message_at: new Date(Date.now() - 7200000).toISOString(), last_message: 'Quedamos en contacto para la demo del jueves' },
  { id: 4, phone: '+55 22 99876-5432', contact_name: 'Pousada & Resort Praia Grande (Brasil)', bot_active: true, last_message_at: new Date(Date.now() - 10800000).toISOString(), last_message: 'Olá! Queremos automatizar as reservas no WhatsApp' },
];

const DEMO_MESSAGES: Record<number, WaMessage[]> = {
  1: [
    { id: 101, conversation_id: 1, direction: 'inbound', content: 'Hola, queremos integrar la cotización automática para frutas y empaque.', sent_by: 'human', created_at: new Date(Date.now() - 600000).toISOString() },
    { id: 102, conversation_id: 1, direction: 'outbound', content: '¡Hola Roberto! Soy Santi del equipo de Clientum. Tenemos el módulo ERP especializado para trazabilidad agropecuaria y cotización multimoneda. ¿Te gustaría ver un brochure en PDF adaptado?', sent_by: 'bot', created_at: new Date(Date.now() - 300000).toISOString() },
    { id: 103, conversation_id: 1, direction: 'inbound', content: 'Excelente, envíamelo por favor. Somos 12 personas en el área comercial.', sent_by: 'human', created_at: new Date(Date.now() - 60000).toISOString() },
  ],
  2: [
    { id: 201, conversation_id: 2, direction: 'inbound', content: '¿Tienen integración con AFIP y factura electrónica en el ERP?', sent_by: 'human', created_at: new Date(Date.now() - 300000).toISOString() },
    { id: 202, conversation_id: 2, direction: 'outbound', content: '¡Hola Laura! Sí, Clientum cuenta con conexión nativa por WebServices con AFIP para Facturas A, B, C y remitos electrónicos, además de conciliación bancaria automática. ¿Querés agendar una demo guiada?', sent_by: 'bot', created_at: new Date(Date.now() - 290000).toISOString() },
  ],
  3: [
    { id: 301, conversation_id: 3, direction: 'inbound', content: 'Hola, queremos consultar precios para el plan Enterprise.', sent_by: 'human', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 302, conversation_id: 3, direction: 'outbound', content: 'Hola Esteban, te atiende Matías de Clientum. Te paso el detalle de la propuesta personalizada para 25 puestos.', sent_by: 'human', created_at: new Date(Date.now() - 4000000).toISOString() },
    { id: 303, conversation_id: 3, direction: 'inbound', content: 'Quedamos en contacto para la demo del jueves', sent_by: 'human', created_at: new Date(Date.now() - 3600000).toISOString() },
  ],
  4: [
    { id: 401, conversation_id: 4, direction: 'inbound', content: 'Olá! Queremos automatizar as reservas e atendimento pelo WhatsApp no Brasil.', sent_by: 'human', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 402, conversation_id: 4, direction: 'outbound', content: 'Olá! Que ótimo falar com você. Nossa sede em Arraial do Cabo atende todo o mercado brasileiro com integração direta ao WhatsApp Cloud API e PIX. Posso te enviar nossa apresentação?', sent_by: 'bot', created_at: new Date(Date.now() - 7180000).toISOString() },
  ],
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return 'ahora';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min`;
  if (diff < 86400000) return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

type WhatsAppTab = 'chats' | 'metrics' | 'webhooks';

export default function CrmFullWhatsApp() {
  const [activeTab, setActiveTab] = useState<WhatsAppTab>('chats');
  const [conversations, setConversations] = useState<WaConversation[]>([]);
  const [selected, setSelected] = useState<WaConversation | null>(null);
  const [messages, setMessages] = useState<WaMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sending, setSending] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const [showBulkWAModal, setShowBulkWAModal] = useState(false);
  const [showCsvImportModal, setShowCsvImportModal] = useState(false);
  const [importedCustomContacts, setImportedCustomContacts] = useState<BulkContactItem[]>([]);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesCountRef = useRef<number>(0);
  const prevSelectedIdRef = useRef<number | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    } else if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!selected || loadingMsgs) return;

    const isNewConversation = prevSelectedIdRef.current !== selected.id;
    const isNewMessage = messages.length > prevMessagesCountRef.current;

    if (isNewConversation) {
      prevSelectedIdRef.current = selected.id;
      prevMessagesCountRef.current = messages.length;
      const timeoutId = setTimeout(() => {
        scrollToBottom('auto');
      }, 50);
      return () => clearTimeout(timeoutId);
    } else if (isNewMessage) {
      prevMessagesCountRef.current = messages.length;
      const timeoutId = setTimeout(() => {
        scrollToBottom('smooth');
      }, 50);
      return () => clearTimeout(timeoutId);
    }

    prevMessagesCountRef.current = messages.length;
  }, [messages, selected, loadingMsgs]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/whatsapp/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        setBackendAvailable(true);
        if (data.conversations?.length > 0 && !selected) {
          loadMessages(data.conversations[0]);
        }
      } else {
        throw new Error('Backend no disponible');
      }
    } catch {
      setConversations(DEMO_CONVS);
      setBackendAvailable(false);
      if (!selected && DEMO_CONVS.length > 0) {
        loadMessages(DEMO_CONVS[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conv: WaConversation) => {
    setSelected(conv);
    setSuggestion(null);
    setLoadingMsgs(true);
    try {
      const res = await fetch(`/api/whatsapp/conversations/${conv.id}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      } else throw new Error();
    } catch {
      setMessages(DEMO_MESSAGES[conv.id] || []);
    } finally {
      setLoadingMsgs(false);
    }
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || !selected || sending) return;
    setSending(true);
    setSuggestion(null);
    const optimistic: WaMessage = {
      id: Date.now(),
      conversation_id: selected.id,
      direction: 'outbound',
      content,
      sent_by: 'human',
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setInput('');
    try {
      await fetch(`/api/whatsapp/conversations/${selected.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
    } catch {}
    setSending(false);
  };

  const handleSuggest = async () => {
    if (!selected || suggesting) return;
    setSuggesting(true);
    setSuggestion(null);
    try {
      const res = await fetch(`/api/whatsapp/conversations/${selected.id}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      setSuggestion(data.suggestion || null);
    } catch {
      setSuggestion('Entendido. Para su equipo comercial, Clientum incluye pipeline visual, cotizador multimoneda y WhatsApp Bot 24/7. ¿Le gustaría coordinar una demo de 15 minutos?');
    } finally {
      setSuggesting(false);
    }
  };

  const handleToggleBot = async (conv: WaConversation) => {
    const updated = { ...conv, bot_active: !conv.bot_active };
    setConversations(prev => prev.map(c => c.id === conv.id ? updated : c));
    if (selected?.id === conv.id) setSelected(updated);
    try {
      await fetch(`/api/whatsapp/conversations/${conv.id}/bot`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot_active: updated.bot_active }),
      });
    } catch {}
  };

  const handleCsvImported = (contacts: BulkContactItem[], openBulk?: boolean) => {
    setImportedCustomContacts(contacts);
    setImportNotification(`¡Se importaron ${contacts.length} prospectos exitosamente!`);
    setTimeout(() => setImportNotification(null), 5000);

    // Refresh conversation list with new leads
    loadConversations();

    if (openBulk) {
      setShowBulkWAModal(true);
    }
  };

  const filtered = conversations.filter(c =>
    !searchTerm || c.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)
  );

  const mergedBulkContacts: BulkContactItem[] = [
    ...importedCustomContacts,
    ...conversations.map(c => ({
      id: `conv-${c.id}`,
      name: c.contact_name || c.phone,
      company: c.contact_name || 'Empresa Comercial',
      phone: c.phone,
      city: c.phone.startsWith('+55') ? 'Arraial do Cabo / Brasil' : 'General Roca / Río Negro',
      country: c.phone.startsWith('+55') ? 'Brasil' : 'Argentina',
      leadScore: 88,
      status: 'Prospecto',
      personaTag: 'CEO PyME',
      whatsappVerified: true
    }))
  ];

  return (
    <div id="main-content-area" className="text-slate-200 flex flex-col" style={{ height: 'calc(100vh - 150px)', minHeight: 520 }}>
      {/* Header & Top Bar */}
      <div className="mb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 flex items-center gap-3">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            WhatsApp AI
          </h1>
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-xs sm:text-sm text-slate-400">
              Copilot Comercial · Meta Cloud API v19.0 · Hermes Agent
            </p>
            {backendAvailable === false && (
              <span className="text-[11px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-medium">
                Modo local / demostración
              </span>
            )}
            {backendAvailable === true && (
              <span className="text-[11px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cloud API Conectada
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Import CSV + Mass Send */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-import-csv"
            onClick={() => setShowCsvImportModal(true)}
            className="px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2 shadow-sm cursor-pointer"
            title="Importar lista de prospectos desde archivo CSV"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Importar CSV</span>
          </button>

          <button
            id="btn-bulk-whatsapp"
            onClick={() => setShowBulkWAModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer border-0 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>Envío Masivo Personalizado (IA)</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 mb-3 shrink-0">
        <button
          onClick={() => setActiveTab('chats')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'chats'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Bandeja de Conversaciones
          {conversations.some(c => c.unread) && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'metrics'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          Métricas de Resolución (Recharts)
        </button>

        <button
          onClick={() => setActiveTab('webhooks')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'webhooks'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Webhook className="w-3.5 h-3.5 text-sky-400" />
          Configuración de Webhooks Meta
        </button>
      </div>

      {importNotification && (
        <div className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{importNotification}</span>
          </div>
          <button onClick={() => setImportNotification(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Tab 1: Live Conversations View */}
      {activeTab === 'chats' && (
        <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
          {/* Conversations sidebar */}
          <div className="w-72 sm:w-80 flex-shrink-0 bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            <div className="p-3 border-b border-[#1E293B]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar prospecto o teléfono..."
                  className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-[#1E293B]/40">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">Sin conversaciones</div>
              ) : (
                filtered.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => loadMessages(conv)}
                    className={`w-full text-left p-3 hover:bg-white/[0.03] transition-colors ${
                      selected?.id === conv.id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-400' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold">
                          {(conv.contact_name || conv.phone)[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{conv.contact_name || conv.phone}</p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{conv.last_message || conv.phone}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {conv.last_message_at && (
                          <span className="text-[10px] text-slate-500">{formatTime(conv.last_message_at)}</span>
                        )}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          conv.bot_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700/40 text-slate-400'
                        }`}>
                          {conv.bot_active ? '🤖 Bot' : '👤 Manual'}
                        </span>
                        {conv.unread ? (
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                            {conv.unread}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="p-2.5 border-t border-[#1E293B] bg-[#050B14] flex items-center justify-between">
              <button
                onClick={loadConversations}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Actualizar
              </button>
              <span className="text-[11px] text-slate-500">
                {filtered.length} contactos
              </span>
            </div>
          </div>

          {/* Messages Main Panel */}
          <div className="flex-1 bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6">
                <MessageSquare className="w-12 h-12 opacity-20 mb-3" />
                <p className="text-sm font-medium text-slate-400">Seleccioná una conversación para ver los mensajes</p>
                <p className="text-xs text-slate-600 mt-1">O utilizá el botón &quot;Importar CSV&quot; para cargar nuevos contactos</p>
              </div>
            ) : (
              <>
                {/* Conversation top info */}
                <div className="p-3.5 border-b border-[#1E293B] flex items-center justify-between bg-[#0A101F]/90">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                      {(selected.contact_name || selected.phone)[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm leading-tight">{selected.contact_name || selected.phone}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{selected.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleBot(selected)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        selected.bot_active
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {selected.bot_active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4" />}
                      Bot {selected.bot_active ? 'activo (Santi IA)' : 'pausado (Humano)'}
                    </button>
                  </div>
                </div>

                {/* Message stream */}
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050B14]/40">
                  {loadingMsgs ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-slate-500 text-xs py-12">Sin mensajes registrados</div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className={`flex gap-2 ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
                        {msg.direction === 'inbound' && (
                          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-1 border border-slate-700">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        )}
                        <div className={`max-w-xs lg:max-w-md ${msg.direction === 'outbound' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                            msg.direction === 'outbound'
                              ? msg.sent_by === 'bot'
                                ? 'bg-emerald-600/80 text-white rounded-tr-sm shadow-md'
                                : 'bg-sky-600/80 text-white rounded-tr-sm shadow-md'
                              : 'bg-[#1E293B] text-slate-200 rounded-tl-sm border border-slate-700/50 shadow-sm'
                          }`}>
                            {msg.content}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            {msg.direction === 'outbound' && (
                              msg.sent_by === 'bot' ? (
                                <span className="flex items-center gap-1 text-emerald-400"><Bot className="w-3 h-3" /> Bot Santi</span>
                              ) : (
                                <span className="flex items-center gap-1 text-sky-400"><User className="w-3 h-3" /> Asesor</span>
                              )
                            )}
                            <Clock className="w-3 h-3" />
                            {formatTime(msg.created_at)}
                            {msg.direction === 'outbound' && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                          </div>
                        </div>
                        {msg.direction === 'outbound' && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            msg.sent_by === 'bot' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                          }`}>
                            {msg.sent_by === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* AI Copilot Suggestion Box */}
                {suggestion && (
                  <div className="mx-4 mb-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1">
                        <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Sugerencia Copilot IA:</span>
                          <p className="text-xs text-slate-200 mt-0.5">{suggestion}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => { setInput(suggestion); setSuggestion(null); }}
                          className="text-xs text-purple-300 hover:text-white border border-purple-500/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => { handleSend(suggestion); setSuggestion(null); }}
                          className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded-lg transition-colors shadow-sm"
                        >
                          Enviar
                        </button>
                        <button onClick={() => setSuggestion(null)} className="text-xs text-slate-500 hover:text-slate-300 px-1">✕</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-3 border-t border-[#1E293B] bg-[#0A101F]">
                  <div className="flex items-end gap-2">
                    <button
                      onClick={handleSuggest}
                      disabled={suggesting || messages.length === 0}
                      className="flex items-center gap-1.5 text-xs px-3 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl disabled:opacity-50 transition-colors flex-shrink-0 font-semibold"
                      title="Generar respuesta sugerida con Gemini IA"
                    >
                      {suggesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      Copilot IA
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Escribí un mensaje por WhatsApp... (Presioná Enter para enviar)"
                        rows={1}
                        className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                      />
                    </div>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || sending}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-md shadow-emerald-600/20 flex-shrink-0"
                    >
                      {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Recharts Resolution Metrics */}
      {activeTab === 'metrics' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <WhatsAppResolutionMetrics />
        </div>
      )}

      {/* Tab 3: Meta Webhooks Configuration */}
      {activeTab === 'webhooks' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <WhatsAppWebhooksConfig />
        </div>
      )}

      {/* Modal: Bulk WhatsApp Dispatcher */}
      <BulkWhatsAppModal
        isOpen={showBulkWAModal}
        onClose={() => setShowBulkWAModal(false)}
        initialContacts={mergedBulkContacts}
      />

      {/* Modal: CSV Import */}
      <WhatsAppCsvImportModal
        isOpen={showCsvImportModal}
        onClose={() => setShowCsvImportModal(false)}
        onImportComplete={handleCsvImported}
      />
    </div>
  );
}
