import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  CheckCircle2,
  Download,
  Mic,
  MicOff,
  Tag,
  FileText,
  QrCode,
  Smartphone,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Filter,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Radio,
  ChevronDown,
  Layers,
  ArrowRightLeft,
  Calendar,
  CalendarRange,
  X,
  ArrowDown
} from 'lucide-react';
import jsPDF from 'jspdf';
import { BulkWhatsAppModal, BulkContactItem } from '../BulkWhatsAppModal';
import { WhatsAppResolutionMetrics } from './WhatsAppResolutionMetrics';
import { WhatsAppWebhooksConfig } from './WhatsAppWebhooksConfig';
import { WhatsAppCsvImportModal } from './WhatsAppCsvImportModal';

// WhatsApp modular sub-components
import {
  WhatsAppAccount,
  WhatsAppAgent,
  WaConversationExtended,
  WaMessageExtended,
  ConversationFilterScope
} from './whatsapp/types';
import {
  INITIAL_WHATSAPP_ACCOUNTS,
  INITIAL_AGENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES
} from './whatsapp/mockData';
import { WhatsAppQrModal } from './whatsapp/WhatsAppQrModal';
import { WhatsAppAccountsManager } from './whatsapp/WhatsAppAccountsManager';
import { AgentAssignmentDropdown } from './whatsapp/AgentAssignmentDropdown';
import { BrowserNotificationManager } from './whatsapp/BrowserNotificationManager';
import { WhatsAppPushWorkerModal } from './whatsapp/WhatsAppPushWorkerModal';
import { useBrowserNotifications } from './whatsapp/useBrowserNotifications';

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return 'ahora';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min`;
  if (diff < 86400000) return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

function detectIntent(messages: WaMessageExtended[]): { key: string; label: string; color: string; quickReplies: string[] } {
  const lastInbound = [...messages].reverse().find(m => m.direction === 'inbound')?.content?.toLowerCase() || '';
  
  if (/precio|cuanto|costo|cotiz|plan|tarifa|valor|reais/i.test(lastInbound)) {
    return {
      key: 'price_inquiry',
      label: '💰 Consulta de Precios',
      color: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40',
      quickReplies: [
        "Te comparto nuestros planes con implementación en 5 días y soporte 24/7.",
        "¿Cuántos usuarios comerciales operarán en tu empresa para armar presupuesto?"
      ]
    };
  }
  if (/api|webhook|afip|factura|integracion|error|tecnico|sincroniz/i.test(lastInbound)) {
    return {
      key: 'technical',
      label: '⚙️ Soporte Técnico',
      color: 'bg-purple-500/25 text-purple-300 border-purple-500/40',
      quickReplies: [
        "Nuestra API REST y Webhooks de Meta se conectan en menos de 10 minutos.",
        "Te paso con nuestro equipo de ingeniería para revisar los logs de tu servidor."
      ]
    };
  }
  if (/pago|tarjeta|factura|pix|transferencia|abono/i.test(lastInbound)) {
    return {
      key: 'billing',
      label: '💳 Facturación y Pagos',
      color: 'bg-sky-500/25 text-sky-300 border-sky-500/40',
      quickReplies: [
        "Emitimos factura A, B y soporte para PIX / transferencias bancarias corporativas.",
        "El pago se procesa de forma segura con acreditación inmediata."
      ]
    };
  }
  if (/demo|reunion|jueves|ver|reuniao|apresentacao/i.test(lastInbound)) {
    return {
      key: 'demo',
      label: '📅 Solicitud de Demo',
      color: 'bg-amber-500/25 text-amber-300 border-amber-500/40',
      quickReplies: [
        "Perfecto, coordinemos una demo guiada de 15 minutos esta semana.",
        "Te comparto el link de calendario para que elijas el horario que prefieras."
      ]
    };
  }
  return {
    key: 'support',
    label: '💬 Soporte General',
    color: 'bg-slate-700/60 text-slate-300 border-slate-600',
    quickReplies: [
      "¡Hola! Estoy aquí para asistirte con todo lo que necesites en tu operación.",
      "¿En qué área te gustaría enfocar la automatización hoy?"
    ]
  };
}

type WhatsAppTab = 'chats' | 'accounts_qr' | 'metrics' | 'webhooks';

export default function CrmFullWhatsApp() {
  const [activeTab, setActiveTab] = useState<WhatsAppTab>('chats');
  
  // Accounts & Multi-Device state
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>(INITIAL_WHATSAPP_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(INITIAL_WHATSAPP_ACCOUNTS[0].id);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [targetAccountForQr, setTargetAccountForQr] = useState<WhatsAppAccount | null>(null);

  // Agents & Commercial Team state
  const [agents, setAgents] = useState<WhatsAppAgent[]>(INITIAL_AGENTS);
  const [currentAgent, setCurrentAgent] = useState<WhatsAppAgent>(INITIAL_AGENTS[0]); // Matías Gómez as default active commercial agent
  const [filterScope, setFilterScope] = useState<ConversationFilterScope>('all'); // 'all' | 'my_team' | 'unassigned' | 'bot'
  const [showAgentSwitcher, setShowAgentSwitcher] = useState(false);

  // Conversations & Chat state
  const [conversations, setConversations] = useState<WaConversationExtended[]>(INITIAL_CONVERSATIONS);
  const [selected, setSelected] = useState<WaConversationExtended | null>(null);
  const [messages, setMessages] = useState<WaMessageExtended[]>([]);
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
  const [isRecording, setIsRecording] = useState(false);
  const [simulatingInbound, setSimulatingInbound] = useState(false);
  const [isPushModalOpen, setIsPushModalOpen] = useState(false);

  // Date Range Filter state for Conversation List / Detailed Chat
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [datePreset, setDatePreset] = useState<'all' | 'today' | '7d' | '30d' | 'custom'>('all');
  const [showDateFilterInputs, setShowDateFilterInputs] = useState<boolean>(false);

  // Auto-scroll manual detection state
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [unreadWhileScrolled, setUnreadWhileScrolled] = useState(0);
  const isUserScrolledUpRef = useRef<boolean>(false);

  // Native & Background Push Service Worker Hook
  const {
    permission,
    isSupported: isNotificationSupported,
    isPushSupported,
    isWorkerActive,
    isPushSubscribed,
    isSubscribing,
    pushStatus,
    soundEnabled,
    toggleSound,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    sendNotification,
    sendTestNotification,
    triggerServerPushTest,
    simulateInboundLeadWebhook,
    playNotificationSound,
    fetchPushStatus
  } = useBrowserNotifications();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesCountRef = useRef<number>(0);
  const prevSelectedIdRef = useRef<number | null>(null);
  const agentSwitcherRef = useRef<HTMLDivElement>(null);

  // Filter messages by selected date range
  const filteredMessages = useMemo(() => {
    if (!startDate && !endDate) return messages;
    return messages.filter(msg => {
      if (!msg.created_at) return true;
      const msgDate = new Date(msg.created_at);
      if (isNaN(msgDate.getTime())) return true;
      const msgDateStr = msgDate.toISOString().split('T')[0];
      if (startDate && msgDateStr < startDate) return false;
      if (endDate && msgDateStr > endDate) return false;
      return true;
    });
  }, [messages, startDate, endDate]);

  const handleDatePresetSelect = (preset: 'all' | 'today' | '7d' | '30d' | 'custom') => {
    setDatePreset(preset);
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (preset === 'all') {
      setStartDate('');
      setEndDate('');
      setShowDateFilterInputs(false);
    } else if (preset === 'today') {
      setStartDate(todayStr);
      setEndDate(todayStr);
      setShowDateFilterInputs(false);
    } else if (preset === '7d') {
      const past7 = new Date();
      past7.setDate(now.getDate() - 7);
      setStartDate(past7.toISOString().split('T')[0]);
      setEndDate(todayStr);
      setShowDateFilterInputs(false);
    } else if (preset === '30d') {
      const past30 = new Date();
      past30.setDate(now.getDate() - 30);
      setStartDate(past30.toISOString().split('T')[0]);
      setEndDate(todayStr);
      setShowDateFilterInputs(false);
    } else if (preset === 'custom') {
      setShowDateFilterInputs(true);
    }
  };

  const handleClearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setDatePreset('all');
    setShowDateFilterInputs(false);
  };

  useEffect(() => {
    loadAccounts();
    loadAgents();
    loadConversations();
  }, []);

  // Close agent switcher on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (agentSwitcherRef.current && !agentSwitcherRef.current.contains(e.target as Node)) {
        setShowAgentSwitcher(false);
      }
    };
    if (showAgentSwitcher) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAgentSwitcher]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    } else if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll listener on messages container: detect if user manually scrolled up
  const handleMessagesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    // Threshold of 80px: if user is >80px above the bottom, they are reading history
    const scrolledUp = distanceFromBottom > 80;
    setIsUserScrolledUp(scrolledUp);
    isUserScrolledUpRef.current = scrolledUp;
    if (!scrolledUp) {
      setUnreadWhileScrolled(0);
    }
  };

  // Refined auto-scroll: pauses automatic scrolling when user is scrolled up reading old messages
  useEffect(() => {
    if (!selected || loadingMsgs) return;

    const isNewConversation = prevSelectedIdRef.current !== selected.id;
    const isNewMessage = messages.length > prevMessagesCountRef.current;

    if (isNewConversation) {
      prevSelectedIdRef.current = selected.id;
      prevMessagesCountRef.current = messages.length;
      setIsUserScrolledUp(false);
      isUserScrolledUpRef.current = false;
      setUnreadWhileScrolled(0);
      const timeoutId = setTimeout(() => {
        scrollToBottom('auto');
      }, 50);
      return () => clearTimeout(timeoutId);
    } else if (isNewMessage) {
      const addedCount = messages.length - prevMessagesCountRef.current;
      prevMessagesCountRef.current = messages.length;

      // If user is currently scrolling up to read older history, PAUSE auto-scroll!
      if (isUserScrolledUpRef.current) {
        setUnreadWhileScrolled(prev => prev + addedCount);
      } else {
        const timeoutId = setTimeout(() => {
          scrollToBottom('smooth');
        }, 50);
        return () => clearTimeout(timeoutId);
      }
    } else {
      prevMessagesCountRef.current = messages.length;
    }
  }, [messages, selected, loadingMsgs]);

  const loadAccounts = async () => {
    try {
      const res = await fetch('/api/whatsapp/accounts');
      if (res.ok) {
        const data = await res.json();
        if (data.accounts?.length > 0) {
          setAccounts(data.accounts);
          if (!selectedAccountId) {
            setSelectedAccountId(data.accounts[0].id);
          }
        }
      }
    } catch {
      // Use INITIAL_WHATSAPP_ACCOUNTS fallback
    }
  };

  const loadAgents = async () => {
    try {
      const res = await fetch('/api/whatsapp/agents');
      if (res.ok) {
        const data = await res.json();
        if (data.agents?.length > 0) {
          setAgents(data.agents);
        }
      }
    } catch {
      // Use INITIAL_AGENTS fallback
    }
  };

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/whatsapp/conversations');
      if (res.ok) {
        const data = await res.json();
        const apiConvs: WaConversationExtended[] = data.conversations || [];
        
        // Merge with enriched agent info if needed
        const enriched = apiConvs.map(c => {
          const matchingAgent = agents.find(a => a.id === c.assigned_agent_id);
          return {
            ...c,
            assigned_agent_name: matchingAgent?.name || c.assigned_agent_name
          };
        });

        setConversations(enriched.length > 0 ? enriched : INITIAL_CONVERSATIONS);
        setBackendAvailable(true);
        if (enriched.length > 0 && !selected) {
          loadMessages(enriched[0]);
        }
      } else {
        throw new Error('Backend no disponible');
      }
    } catch {
      setConversations(INITIAL_CONVERSATIONS);
      setBackendAvailable(false);
      if (!selected && INITIAL_CONVERSATIONS.length > 0) {
        loadMessages(INITIAL_CONVERSATIONS[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conv: WaConversationExtended) => {
    setSelected(conv);
    setSuggestion(null);
    setLoadingMsgs(true);

    // Mark as read in local state
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));

    try {
      const res = await fetch(`/api/whatsapp/conversations/${conv.id}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      } else throw new Error();
    } catch {
      setMessages(INITIAL_MESSAGES[conv.id] || []);
    } finally {
      setLoadingMsgs(false);
    }
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || !selected || sending) return;
    setSending(true);
    setSuggestion(null);

    const optimistic: WaMessageExtended = {
      id: Date.now(),
      conversation_id: selected.id,
      direction: 'outbound',
      content,
      sent_by: 'human',
      sender_name: currentAgent.name,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, optimistic]);
    setInput('');

    // Update conversation's last message
    setConversations(prev => prev.map(c =>
      c.id === selected.id
        ? { ...c, last_message: content, last_message_at: new Date().toISOString() }
        : c
    ));

    try {
      await fetch(`/api/whatsapp/conversations/${selected.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          sender_name: currentAgent.name,
          account_id: selectedAccountId
        }),
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

  const handleToggleBot = async (conv: WaConversationExtended) => {
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

  // Agent Assignment & Transfer handler
  const handleAssignAgent = async (conversationId: number, agentId: string | null, transferNote?: string) => {
    const targetAgent = agents.find(a => a.id === agentId);
    
    const updatedConvs = conversations.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          assigned_agent_id: agentId || undefined,
          assigned_agent_name: targetAgent?.name || undefined,
          transfer_note: transferNote || c.transfer_note
        };
      }
      return c;
    });

    setConversations(updatedConvs);
    if (selected?.id === conversationId) {
      setSelected(prev => prev ? {
        ...prev,
        assigned_agent_id: agentId || undefined,
        assigned_agent_name: targetAgent?.name || undefined,
        transfer_note: transferNote || prev.transfer_note
      } : null);
    }

    // Insert system transfer note message if present
    if (transferNote && targetAgent) {
      const transferSysMsg: WaMessageExtended = {
        id: Date.now(),
        conversation_id: conversationId,
        direction: 'outbound',
        content: `📋 Conversación asignada a ${targetAgent.name}. Nota de traspaso: "${transferNote}"`,
        sent_by: 'system',
        created_at: new Date().toISOString()
      };
      if (selected?.id === conversationId) {
        setMessages(prev => [...prev, transferSysMsg]);
      }
    }

    try {
      await fetch(`/api/whatsapp/conversations/${conversationId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentId,
          agent_name: targetAgent?.name || null,
          transfer_note: transferNote
        })
      });
    } catch {}
  };

  // Linking / QR handler
  const handleAccountLinked = (newAccount: WhatsAppAccount) => {
    setAccounts(prev => {
      const idx = prev.findIndex(a => a.id === newAccount.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newAccount;
        return copy;
      }
      return [newAccount, ...prev];
    });
    setSelectedAccountId(newAccount.id);
    setImportNotification(`¡Línea ${newAccount.label} (${newAccount.phoneNumber}) vinculada exitosamente con Baileys Multi-Device!`);
    setTimeout(() => setImportNotification(null), 5000);
  };

  const handleDisconnectAccount = async (accountId: string) => {
    setAccounts(prev => prev.map(a => a.id === accountId ? { ...a, status: 'DISCONNECTED', batteryLevel: 0 } : a));
    try {
      await fetch('/api/whatsapp/accounts/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_id: accountId })
      });
    } catch {}
  };

  // Simulate Inbound Lead Message & Trigger Native Notification
  const handleSimulateInboundLead = async () => {
    setSimulatingInbound(true);

    const simulationSamples = [
      {
        name: 'Bodegas & Viñedos Alto Valle S.A.',
        phone: '+54 9 299 678-4321',
        text: 'Hola, queremos consultar precios del plan PyME y si incluye WhatsApp Bot con IA.',
        agentId: currentAgent.id // Assigned to current user
      },
      {
        name: 'Frigorífico Patagónico Central',
        phone: '+54 9 298 554-1122',
        text: 'Buenas tardes, necesitamos conectar la facturación electrónica con AFIP.',
        agentId: undefined // Unassigned lead
      },
      {
        name: 'Distribuidora Lácteos del Sur',
        phone: '+54 9 11 3456-7890',
        text: '¿Pueden agendarnos una demo para 10 personas del equipo comercial?',
        agentId: 'agent-matias'
      }
    ];

    const sample = simulationSamples[Math.floor(Math.random() * simulationSamples.length)];

    setTimeout(() => {
      const targetId = conversations.length + 1;
      const newConv: WaConversationExtended = {
        id: targetId,
        phone: sample.phone,
        contact_name: sample.name,
        bot_active: true,
        last_message_at: new Date().toISOString(),
        last_message: sample.text,
        unread: 1,
        assigned_agent_id: sample.agentId,
        assigned_agent_name: agents.find(a => a.id === sample.agentId)?.name,
        account_id: selectedAccountId || 'acc-1',
        tags: ['Nuevo Lead', 'Simulación']
      };

      const newMsg: WaMessageExtended = {
        id: Date.now(),
        conversation_id: targetId,
        direction: 'inbound',
        content: sample.text,
        sent_by: 'human',
        created_at: new Date().toISOString()
      };

      setConversations(prev => [newConv, ...prev.filter(c => c.phone !== sample.phone)]);

      // If this conversation is currently open, append message
      if (selected?.phone === sample.phone) {
        setMessages(prev => [...prev, newMsg]);
      }

      // Trigger Native Browser Notification & Sound Alert (even if in background tab)
      sendNotification(`💬 Nuevo mensaje de ${sample.name}`, {
        body: `${sample.phone}: "${sample.text}"`,
        tag: `wa-lead-${targetId}`,
        onClick: () => {
          setSelected(newConv);
          loadMessages(newConv);
        }
      });

      // Dispatch Web Push notification through server worker
      simulateInboundLeadWebhook(sample.name, sample.text);

      setSimulatingInbound(false);
    }, 1000);
  };

  const handleDownloadPdf = () => {
    if (!selected) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CLIENTUM - REPORTE DE CONVERSACIÓN WHATSAPP', 14, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Contacto: ${selected.contact_name || selected.phone} (${selected.phone})`, 14, 22);
    const dateFilterInfo = (startDate || endDate)
      ? ` · Rango Fechas: ${startDate || 'Inicio'} hasta ${endDate || 'Hoy'}`
      : '';
    doc.text(`Asesor Asignado: ${selected.assigned_agent_name || 'Sin Asignar'} · Exportado: ${new Date().toLocaleString('es-AR')}${dateFilterInfo}`, 14, 28);

    let currentY = 45;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`Historial de Mensajes (${filteredMessages.length} mensaje${filteredMessages.length === 1 ? '' : 's'})`, 14, currentY);
    currentY += 8;

    filteredMessages.forEach((msg) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      const senderLabel = msg.direction === 'inbound' 
        ? `[Cliente] ${selected.contact_name || selected.phone}` 
        : `[${msg.sent_by === 'bot' ? 'Bot IA' : msg.sender_name || 'Asesor'}] Clientum`;
      const timeStr = new Date(msg.created_at).toLocaleString('es-AR');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(msg.direction === 'inbound' ? 30 : 13, 148, 136);
      doc.text(`${senderLabel} (${timeStr}):`, 14, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const splitText = doc.splitTextToSize(msg.content, pageWidth - 28);
      doc.text(splitText, 14, currentY);
      currentY += (splitText.length * 5) + 6;
    });

    const cleanPhone = selected.phone.replace(/[^0-9]/g, '');
    doc.save(`whatsapp_chat_${cleanPhone}.pdf`);
  };

  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      try {
        const recognition = new SpeechRecognitionAPI();
        recognition.lang = 'es-AR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          simulateVoiceTranscription();
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch {
        simulateVoiceTranscription();
      }
    } else {
      simulateVoiceTranscription();
    }
  };

  const simulateVoiceTranscription = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const simulatedPhrases = [
        "Hola, quisiera coordinar una demostración del ERP para nuestro equipo comercial.",
        "¿Podrían enviarnos el presupuesto detallado para 15 usuarios?",
        "Necesitamos verificar la integración de Webhooks con Meta y WhatsApp."
      ];
      const chosen = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
      setInput(chosen);
    }, 2500);
  };

  const handleCsvImported = (contacts: BulkContactItem[], openBulk?: boolean) => {
    setImportedCustomContacts(contacts);
    setImportNotification(`¡Se importaron ${contacts.length} prospectos exitosamente!`);
    setTimeout(() => setImportNotification(null), 5000);
    loadConversations();
    if (openBulk) {
      setShowBulkWAModal(true);
    }
  };

  // Scope filter logic ('all' | 'my_team' | 'unassigned' | 'bot')
  const filteredConversations = conversations.filter(c => {
    // 1. Text Search
    if (searchTerm) {
      const matchSearch =
        c.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.last_message?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }

    // 2. Scope Filter:
    if (filterScope === 'my_team') {
      // Matches current commercial agent
      return c.assigned_agent_id === currentAgent.id;
    }
    if (filterScope === 'unassigned') {
      return !c.assigned_agent_id;
    }
    if (filterScope === 'bot') {
      return c.bot_active === true;
    }

    return true; // 'all' (Todo el equipo)
  });

  // Calculate scope counts
  const counts = {
    all: conversations.length,
    my_team: conversations.filter(c => c.assigned_agent_id === currentAgent.id).length,
    unassigned: conversations.filter(c => !c.assigned_agent_id).length,
    bot: conversations.filter(c => c.bot_active).length,
  };

  const intentInfo = detectIntent(messages);

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
            WhatsApp AI & Multi-Device
          </h1>
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-xs sm:text-sm text-slate-400">
              Copilot Comercial · Baileys MD v6.8.2 · Asignación de Agentes & Notificaciones
            </p>
            {backendAvailable === false && (
              <span className="text-[11px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-medium">
                Modo local / demostración
              </span>
            )}
            {backendAvailable === true && (
              <span className="text-[11px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Multi-Device WebSocket Conectado
              </span>
            )}
          </div>
        </div>

        {/* Top Actions: QR Link Button + CSV + Mass Send */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setTargetAccountForQr(null);
              setIsQrModalOpen(true);
            }}
            className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer shrink-0"
            title="Escanear código QR para vincular nueva línea de WhatsApp"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>+ Vincular Línea (QR)</span>
          </button>

          <button
            id="btn-import-csv"
            onClick={() => setShowCsvImportModal(true)}
            className="px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Importar lista de prospectos desde archivo CSV"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Importar CSV</span>
          </button>

          <button
            id="btn-bulk-whatsapp"
            onClick={() => setShowBulkWAModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Envío Masivo (IA)</span>
          </button>
        </div>
      </div>

      {/* Browser Notification Bar */}
      <div className="mb-3 shrink-0">
        <BrowserNotificationManager />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 mb-3 shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveTab('chats')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'chats'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Bandeja de Conversaciones
          {conversations.some(c => c.unread) && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('accounts_qr')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'accounts_qr'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <QrCode className="w-3.5 h-3.5 text-emerald-400" />
          Líneas & Escaneo QR (Multi-Device)
          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 rounded font-mono font-bold">
            {accounts.filter(a => a.status === 'CONNECTED').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
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
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
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
        <div className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center justify-between shrink-0 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{importNotification}</span>
          </div>
          <button onClick={() => setImportNotification(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Tab 1: Live Omnichannel Conversations View */}
      {activeTab === 'chats' && (
        <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
          {/* Conversations Sidebar with Team Filters and Active Agent Switcher */}
          <div className="w-80 sm:w-96 flex-shrink-0 bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            
            {/* Active Commercial Agent Profile Selector */}
            <div className="p-3 border-b border-[#1E293B] bg-[#070c18] relative" ref={agentSwitcherRef}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mi Asesor Activo (CRM):
                </span>
                <button
                  onClick={() => setShowAgentSwitcher(!showAgentSwitcher)}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <span>Cambiar perfil</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Active Agent Badge */}
              <div className="mt-1.5 flex items-center gap-2.5 p-2 bg-[#050B14] rounded-xl border border-slate-800">
                <div className={`w-8 h-8 rounded-full ${currentAgent.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 relative`}>
                  {currentAgent.isBot ? <Bot className="w-4 h-4" /> : currentAgent.avatarInitials}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentAgent.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentAgent.role}</p>
                </div>
              </div>

              {/* Dropdown for Switcher */}
              {showAgentSwitcher && (
                <div className="absolute left-3 right-3 top-full mt-1 bg-[#0b1324] border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 divide-y divide-slate-800 animate-slide-down">
                  {agents.map(ag => (
                    <button
                      key={ag.id}
                      onClick={() => {
                        setCurrentAgent(ag);
                        setShowAgentSwitcher(false);
                      }}
                      className={`w-full p-2 rounded-lg text-left flex items-center gap-2.5 hover:bg-white/[0.04] transition-colors ${
                        currentAgent.id === ag.id ? 'bg-emerald-500/10' : ''
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full ${ag.avatarColor} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                        {ag.isBot ? <Bot className="w-3.5 h-3.5" /> : ag.avatarInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{ag.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{ag.role}</p>
                      </div>
                      {currentAgent.id === ag.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Scope Tabs: 'Todo el equipo' vs 'Mi equipo' + Chips */}
            <div className="p-2 border-b border-[#1E293B] bg-[#070c18]/60 space-y-2">
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#050B14] rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setFilterScope('all')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                    filterScope === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Todo el equipo</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                    {counts.all}
                  </span>
                </button>

                <button
                  onClick={() => setFilterScope('my_team')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                    filterScope === 'my_team'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Mi equipo</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                    {counts.my_team}
                  </span>
                </button>
              </div>

              {/* Quick Sub-Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <button
                  onClick={() => setFilterScope('unassigned')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                    filterScope === 'unassigned'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                      : 'bg-[#050B14] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <UserPlus className="w-3 h-3 text-amber-400" />
                  <span>Sin asignar ({counts.unassigned})</span>
                </button>

                <button
                  onClick={() => setFilterScope('bot')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                    filterScope === 'bot'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-xs'
                      : 'bg-[#050B14] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Bot className="w-3 h-3 text-purple-400" />
                  <span>Bot IA ({counts.bot})</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-2.5 border-b border-[#1E293B]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar contacto, teléfono o mensaje..."
                  className="w-full bg-[#050B14] border border-[#1E293B] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            {/* Date Range Filter Selector */}
            <div className="p-2.5 border-b border-[#1E293B] bg-[#070c18]/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CalendarRange className="w-3.5 h-3.5 text-emerald-400" />
                  Rango de Fechas
                </span>
                {(startDate || endDate) && (
                  <button
                    onClick={handleClearDateFilter}
                    className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-0.5 font-semibold cursor-pointer"
                    title="Quitar filtro de fechas"
                  >
                    <X className="w-3 h-3" /> Limpiar
                  </button>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px]">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'today', label: 'Hoy' },
                  { id: '7d', label: '7 días' },
                  { id: '30d', label: '30 días' },
                  { id: 'custom', label: 'Personalizado' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleDatePresetSelect(p.id as any)}
                    className={`px-2 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                      datePreset === p.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-xs'
                        : 'bg-[#050B14] text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Pickers */}
              {(showDateFilterInputs || datePreset === 'custom' || startDate || endDate) && (
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Desde</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => {
                        setStartDate(e.target.value);
                        setDatePreset('custom');
                      }}
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Hasta</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => {
                        setEndDate(e.target.value);
                        setDatePreset('custom');
                      }}
                      className="w-full bg-[#050B14] border border-[#1E293B] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
              )}

              {(startDate || endDate) && (
                <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 flex items-center justify-between">
                  <span>Filtrando: {startDate || 'Inicio'} → {endDate || 'Hoy'}</span>
                  <span className="font-mono text-[9px] text-emerald-300">({filteredMessages.length} msgs)</span>
                </div>
              )}
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#1E293B]/40">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-12 px-4 text-slate-500 text-xs">
                  <Filter className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="font-semibold text-slate-400">Sin conversaciones en este filtro</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {filterScope === 'my_team'
                      ? `No hay chats asignados a ${currentAgent.name}.`
                      : filterScope === 'unassigned'
                      ? 'Todos los leads tienen un comercial asignado.'
                      : 'Probá seleccionando "Todo el equipo".'}
                  </p>
                  <button
                    onClick={() => setFilterScope('all')}
                    className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold"
                  >
                    Ver todas las conversaciones
                  </button>
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const assignedAg = agents.find(a => a.id === conv.assigned_agent_id);
                  const isSelected = selected?.id === conv.id;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => loadMessages(conv)}
                      className={`w-full text-left p-3 hover:bg-white/[0.03] transition-all cursor-pointer ${
                        isSelected ? 'bg-emerald-500/10 border-l-2 border-l-emerald-400' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold mt-0.5">
                            {(conv.contact_name || conv.phone)[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-white truncate">{conv.contact_name || conv.phone}</p>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-tight">
                              {conv.last_message || conv.phone}
                            </p>

                            {/* Assigned Commercial Agent Badge & Tags */}
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              {assignedAg ? (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                  <span className={`w-1.5 h-1.5 rounded-full ${assignedAg.avatarColor}`} />
                                  <span className="truncate max-w-[90px]">{assignedAg.name.split(' ')[0]}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                                  <UserPlus className="w-2.5 h-2.5" />
                                  <span>Sin Asignar</span>
                                </span>
                              )}

                              {conv.account_label && (
                                <span className="text-[9px] text-slate-500 truncate max-w-[70px]">
                                  {conv.account_label.split(' ')[0]}
                                </span>
                              )}
                            </div>
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
                            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                              {conv.unread}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="p-2.5 border-t border-[#1E293B] bg-[#050B14] flex items-center justify-between">
              <button
                onClick={loadConversations}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Actualizar
              </button>
              <span className="text-[11px] text-slate-500 font-mono">
                {filteredConversations.length} de {conversations.length} leads
              </span>
            </div>
          </div>

          {/* Messages Main Panel */}
          <div className="flex-1 bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6">
                <MessageSquare className="w-12 h-12 opacity-20 mb-3" />
                <p className="text-sm font-medium text-slate-400">Seleccioná una conversación para ver los mensajes</p>
                <p className="text-xs text-slate-600 mt-1">O utilizá el botón &quot;Simular Lead Entrante&quot; para probar alertas en segundo plano</p>
              </div>
            ) : (
              <>
                {/* Conversation Header: Contact info + Agent Assignment Dropdown + Bot Toggle + PDF Export */}
                <div className="p-3.5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 bg-[#0A101F]/90">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                      {(selected.contact_name || selected.phone)[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white text-sm leading-tight">{selected.contact_name || selected.phone}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${intentInfo.color}`}>
                          {intentInfo.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                        <span>{selected.phone}</span>
                        {selected.account_label && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400 font-sans">{selected.account_label}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header Actions: Agent Assignment + PDF + Bot Toggle */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Commercial Agent Assignment Dropdown */}
                    <AgentAssignmentDropdown
                      conversation={selected}
                      agents={agents}
                      currentAgent={currentAgent}
                      onAssignAgent={handleAssignAgent}
                      variant="header"
                    />

                    <button
                      onClick={handleDownloadPdf}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all shadow-sm cursor-pointer"
                      title="Exportar historial de chat actual como PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => handleToggleBot(selected)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        selected.bot_active
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {selected.bot_active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4" />}
                      <span>Bot {selected.bot_active ? 'Activo' : 'Pausado'}</span>
                    </button>
                  </div>
                </div>

                {/* Message stream */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleMessagesScroll}
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050B14]/40 relative"
                >
                  {/* Active Date Range Filter Banner */}
                  {(startDate || endDate) && (
                    <div className="sticky top-0 z-20 mb-3 p-2.5 bg-[#0A101F]/95 backdrop-blur-md border border-emerald-500/30 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2 text-emerald-300 shadow-lg">
                      <div className="flex items-center gap-2">
                        <CalendarRange className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          Filtrando por fecha: <strong className="text-white">{startDate || 'Inicio'}</strong> → <strong className="text-white">{endDate || 'Hoy'}</strong>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 rounded-full font-mono text-emerald-300 font-bold">
                          {filteredMessages.length} de {messages.length} mensajes
                        </span>
                      </div>
                      <button
                        onClick={handleClearDateFilter}
                        className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-semibold px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" /> Quitar filtro
                      </button>
                    </div>
                  )}

                  {loadingMsgs ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-slate-500 text-xs py-12">Sin mensajes registrados</div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-12 px-4 space-y-3">
                      <CalendarRange className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs font-semibold text-slate-300">
                        No hay mensajes entre {startDate || 'el inicio'} y {endDate || 'hoy'}.
                      </p>
                      <button
                        onClick={handleClearDateFilter}
                        className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Ver todos los mensajes ({messages.length})
                      </button>
                    </div>
                  ) : (
                    filteredMessages.map(msg => (
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
                                : msg.sent_by === 'system'
                                ? 'bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl'
                                : 'bg-sky-600/80 text-white rounded-tr-sm shadow-md'
                              : 'bg-[#1E293B] text-slate-200 rounded-tl-sm border border-slate-700/50 shadow-sm'
                          }`}>
                            {msg.content}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            {msg.direction === 'outbound' && (
                              msg.sent_by === 'bot' ? (
                                <span className="flex items-center gap-1 text-emerald-400"><Bot className="w-3 h-3" /> Bot Santi</span>
                              ) : msg.sent_by === 'system' ? (
                                <span className="flex items-center gap-1 text-purple-400"><ShieldCheck className="w-3 h-3" /> Sistema</span>
                              ) : (
                                <span className="flex items-center gap-1 text-sky-400"><User className="w-3 h-3" /> {msg.sender_name || 'Asesor'}</span>
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

                  {/* Manual scroll paused floating indicator */}
                  {isUserScrolledUp && (
                    <div className="sticky bottom-2 flex justify-center z-30 pointer-events-none">
                      <button
                        type="button"
                        onClick={() => {
                          scrollToBottom('smooth');
                          setIsUserScrolledUp(false);
                          isUserScrolledUpRef.current = false;
                          setUnreadWhileScrolled(0);
                        }}
                        className="pointer-events-auto bg-[#0b1324] hover:bg-slate-800 text-white border border-emerald-500/50 shadow-2xl px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all animate-bounce cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {unreadWhileScrolled > 0
                            ? `${unreadWhileScrolled} nuevo${unreadWhileScrolled > 1 ? 's' : ''} mensaje${unreadWhileScrolled > 1 ? 's' : ''} recibido${unreadWhileScrolled > 1 ? 's' : ''} (Scroll pausado)`
                            : 'Desplazar al último mensaje'}
                        </span>
                        {unreadWhileScrolled > 0 && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </button>
                    </div>
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
                          className="text-xs text-purple-300 hover:text-white border border-purple-500/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => { handleSend(suggestion); setSuggestion(null); }}
                          className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          Enviar
                        </button>
                        <button onClick={() => setSuggestion(null)} className="text-xs text-slate-500 hover:text-slate-300 px-1 cursor-pointer">✕</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Input Area with Quick-Replies & Voice-to-Text */}
                <div className="p-3 border-t border-[#1E293B] bg-[#0A101F]">
                  {intentInfo.quickReplies.length > 0 && (
                    <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-medium mr-1">Plantillas ({intentInfo.label}):</span>
                      {intentInfo.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(qr)}
                          className="text-[11px] bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-xs"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end gap-2">
                    <button
                      onClick={handleSuggest}
                      disabled={suggesting || messages.length === 0}
                      className="flex items-center gap-1.5 text-xs px-3 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl disabled:opacity-50 transition-colors flex-shrink-0 font-semibold cursor-pointer"
                      title="Generar respuesta sugerida con Gemini IA"
                    >
                      {suggesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      Copilot IA
                    </button>

                    <button
                      onClick={handleToggleVoiceRecording}
                      className={`p-2.5 rounded-xl border transition-all flex-shrink-0 cursor-pointer ${
                        isRecording 
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                      title={isRecording ? "Escuchando voz... (Haga clic para detener)" : "Dictar mensaje por voz (Voice-to-Text)"}
                    >
                      {isRecording ? <MicOff className="w-4 h-4 text-rose-400 animate-bounce" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <div className="flex-1 relative">
                      <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder={isRecording ? "Escuchando audio... hable ahora..." : `Escribí como ${currentAgent.name}...`}
                        rows={1}
                        className={`w-full bg-[#050B14] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none resize-none ${
                          isRecording ? 'border-rose-500/50 ring-1 ring-rose-500/30' : 'border-[#1E293B] focus:border-emerald-500/50'
                        }`}
                      />
                    </div>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || sending}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-md shadow-emerald-600/20 flex-shrink-0 cursor-pointer"
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

      {/* Tab 2: WhatsApp Accounts & QR Scanning Management (Baileys Multi-Device) */}
      {activeTab === 'accounts_qr' && (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
          <WhatsAppAccountsManager
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            onSelectAccount={accId => setSelectedAccountId(accId)}
            onOpenQrModal={(acc) => {
              setTargetAccountForQr(acc || null);
              setIsQrModalOpen(true);
            }}
            onDisconnectAccount={handleDisconnectAccount}
          />

          {/* Full Connection Protocol & Security Architecture Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl p-5 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Autenticación por QR Multi-Device</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Permite conectar números corporativos o de sucursal en segundos mediante el protocolo nativo Baileys MD. No requiere aprobación de plantillas por Meta Cloud API.
              </p>
              <button
                onClick={() => {
                  setTargetAccountForQr(null);
                  setIsQrModalOpen(true);
                }}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Generar Nuevo Código QR</span>
              </button>
            </div>

            <div className="bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl p-5 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <BellRing className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Notificaciones de Escritorio 24/7</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alertas instantáneas del navegador con sonido chime y foco automático al hacer clic, asegurando que tu equipo responda en menos de 60 segundos incluso con la app en segundo plano.
              </p>
              <button
                onClick={sendTestNotification}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Emitir Notificación de Prueba</span>
              </button>
            </div>

            <div className="bg-[#0A101F]/70 border border-[#1E293B] rounded-2xl p-5 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Asignación Inteligente de Agentes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Distribución equitativa de leads por especialidad, notas de traspaso internas y vista personalizada de &quot;Mi equipo&quot; para evitar duplicación de esfuerzos comerciales.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{agents.length} Asesores configurados</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Recharts Resolution Metrics */}
      {activeTab === 'metrics' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <WhatsAppResolutionMetrics />
        </div>
      )}

      {/* Tab 4: Meta Webhooks Configuration */}
      {activeTab === 'webhooks' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <WhatsAppWebhooksConfig />
        </div>
      )}

      {/* Modal: QR Code Scanner & Authentication */}
      <WhatsAppQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onAccountLinked={handleAccountLinked}
        existingAccounts={accounts}
        targetAccount={targetAccountForQr}
      />

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

      {/* Modal: Service Worker & Web Push Background Diagnostics */}
      <WhatsAppPushWorkerModal
        isOpen={isPushModalOpen}
        onClose={() => setIsPushModalOpen(false)}
        isSupported={isNotificationSupported}
        isPushSupported={isPushSupported}
        isWorkerActive={isWorkerActive}
        isPushSubscribed={isPushSubscribed}
        isSubscribing={isSubscribing}
        permission={permission}
        soundEnabled={soundEnabled}
        pushStatus={pushStatus}
        onRequestPermission={requestPermission}
        onSubscribeToPush={subscribeToPush}
        onUnsubscribeFromPush={unsubscribeFromPush}
        onToggleSound={toggleSound}
        onTriggerServerPushTest={triggerServerPushTest}
        onSimulateInboundLead={simulateInboundLeadWebhook}
        onRefreshStatus={fetchPushStatus}
      />
    </div>
  );
}
