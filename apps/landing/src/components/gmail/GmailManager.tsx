import React, { useState, useEffect } from 'react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken
} from '../../lib/googleAuth';
import {
  fetchGmailProfile,
  fetchGmailMessages,
  fetchMessageDetail,
  sendGmailEmail,
  markGmailMessageRead,
  toggleGmailMessageStarred,
  trashGmailMessage,
  GmailMessageSummary,
  GmailMessageDetail,
  GmailProfile
} from '../../lib/gmailService';
import { User } from 'firebase/auth';
import {
  Mail,
  Send,
  Inbox,
  Star,
  Trash2,
  RefreshCw,
  Search,
  PenSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ChevronLeft,
  X,
  FileText,
  CornerUpLeft,
  ShieldCheck,
  Zap,
  ArrowRight,
  Bot
} from 'lucide-react';

export function GmailManager() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<GmailProfile | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Email State
  const [activeFolder, setActiveFolder] = useState<'INBOX' | 'STARRED' | 'SENT' | 'TRASH' | 'UNREAD'>('INBOX');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [messageDetail, setMessageDetail] = useState<GmailMessageDetail | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Compose State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeCc, setComposeCc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Modals & Confirmation (MANDATORY per Workspace guidelines)
  const [sendConfirmOpen, setSendConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // AI Assistant State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiTone, setAiTone] = useState<'profesional' | 'cordial' | 'ventas' | 'breve'>('profesional');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      async (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
        loadInbox(t);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadInbox = async (accessToken?: string) => {
    setIsLoadingMessages(true);
    try {
      const p = await fetchGmailProfile();
      if (p) setProfile(p);

      let labelIds: string[] = [];
      let q = searchQuery.trim();

      if (activeFolder === 'INBOX') labelIds = ['INBOX'];
      else if (activeFolder === 'STARRED') labelIds = ['STARRED'];
      else if (activeFolder === 'SENT') labelIds = ['SENT'];
      else if (activeFolder === 'TRASH') labelIds = ['TRASH'];
      else if (activeFolder === 'UNREAD') labelIds = ['UNREAD', 'INBOX'];

      const res = await fetchGmailMessages({
        q: q || undefined,
        labelIds: labelIds.length > 0 ? labelIds : undefined,
        maxResults: 25
      });
      setMessages(res.messages);
    } catch (err: any) {
      console.error('Error loading Gmail messages:', err);
      if (err.message === 'UNAUTHORIZED' || err.message === 'NO_TOKEN') {
        setNeedsAuth(true);
      } else {
        showToast('No se pudieron sincronizar los correos', 'error');
      }
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadInbox();
    }
  }, [activeFolder]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        await loadInbox(result.accessToken);
        showToast('Conectado exitosamente con Gmail');
      }
    } catch (err) {
      console.error('Error signing in with Google:', err);
      showToast('Error al autenticar con Google Workspace', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSelectMessage = async (msg: GmailMessageSummary) => {
    setSelectedMessageId(msg.id);
    setIsLoadingDetail(true);
    setAiSummary(null);
    try {
      const detail = await fetchMessageDetail(msg.id);
      setMessageDetail(detail);
      if (msg.isUnread) {
        markGmailMessageRead(msg.id, true);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isUnread: false } : m));
      }
    } catch (err) {
      console.error('Error fetching message details:', err);
      showToast('Error al cargar el contenido del correo', 'error');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleToggleStar = async (e: React.MouseEvent, msgId: string, isStarred: boolean) => {
    e.stopPropagation();
    try {
      await toggleGmailMessageStarred(msgId, isStarred);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStarred: !isStarred } : m));
      if (messageDetail && messageDetail.id === msgId) {
        setMessageDetail({ ...messageDetail, isStarred: !isStarred });
      }
    } catch {
      showToast('Error al actualizar estrella', 'error');
    }
  };

  // Execution of sending after mandatory confirmation
  const handleExecuteSend = async () => {
    if (!composeTo.trim()) {
      showToast('Ingresa un destinatario válido', 'error');
      return;
    }
    setIsSending(true);
    try {
      await sendGmailEmail({
        to: composeTo.trim(),
        subject: composeSubject.trim() || '(Sin Asunto)',
        body: composeBody,
        cc: composeCc.trim() || undefined
      });
      showToast('Correo enviado exitosamente vía Gmail');
      setSendConfirmOpen(false);
      setIsComposeOpen(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setComposeCc('');
      loadInbox();
    } catch (err: any) {
      console.error('Error sending email:', err);
      showToast(err.message || 'Error al enviar correo', 'error');
    } finally {
      setIsSending(false);
    }
  };

  // Execution of trash after mandatory confirmation
  const handleExecuteDelete = async () => {
    if (!messageToDelete) return;
    try {
      await trashGmailMessage(messageToDelete);
      showToast('Mensaje movido a la papelera');
      setMessages(prev => prev.filter(m => m.id !== messageToDelete));
      if (selectedMessageId === messageToDelete) {
        setSelectedMessageId(null);
        setMessageDetail(null);
      }
      setDeleteConfirmOpen(false);
      setMessageToDelete(null);
    } catch {
      showToast('Error al mover mensaje a la papelera', 'error');
    }
  };

  // AI Assist: Summarize
  const handleAiSummarize = async () => {
    if (!messageDetail) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/gmail/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'summarize',
          subject: messageDetail.subject,
          sender: messageDetail.from,
          emailContent: messageDetail.bodyText || messageDetail.snippet
        })
      });
      const data = await res.json();
      if (data.result) {
        setAiSummary(data.result);
      } else {
        showToast('No se pudo generar el resumen', 'error');
      }
    } catch {
      showToast('Error al contactar al asistente IA', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  // AI Assist: Smart Reply
  const handleAiReply = async (tone: 'profesional' | 'cordial' | 'ventas' | 'breve') => {
    if (!messageDetail) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/gmail/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reply',
          subject: messageDetail.subject,
          sender: messageDetail.from,
          emailContent: messageDetail.bodyText || messageDetail.snippet,
          promptTone: tone
        })
      });
      const data = await res.json();
      if (data.result) {
        // Extract sender email for replying
        const match = messageDetail.from.match(/<([^>]+)>/) || [null, messageDetail.from];
        setComposeTo(match[1] || messageDetail.from);
        setComposeSubject(messageDetail.subject.startsWith('Re:') ? messageDetail.subject : `Re: ${messageDetail.subject}`);
        setComposeBody(data.result);
        setIsComposeOpen(true);
      }
    } catch {
      showToast('Error generando respuesta con IA', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER: Unauthenticated State (Official Google Sign-In button)
  // ─────────────────────────────────────────────────────────────
  if (needsAuth) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500/20 to-amber-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Mail className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
          Integración Oficial con Gmail & Google Workspace
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-base leading-relaxed mb-8">
          Conecta tu cuenta de Gmail con permiso de usuario para consultar tu bandeja de entrada, redactar correos con inteligencia artificial de Gemini, y gestionar comunicaciones comerciales de Clientum de forma segura y centralizada.
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="flex items-center gap-3 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            <span>{isLoggingIn ? 'Conectando con Google...' : 'Sign in with Google'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Autenticación cifrada cliente-a-servidor mediante OAuth 2.0 y Firebase Auth</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: Main Dashboard
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 backdrop-blur-md transition-all ${
          toastMessage.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span className="text-sm font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <Mail className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Clientum Gmail Suite</h1>
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                Conectado
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {profile?.emailAddress || user?.email || 'Bandeja sincronizada'} • {profile?.messagesTotal || messages.length} correos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setComposeTo('');
              setComposeSubject('');
              setComposeBody('');
              setIsComposeOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-sm"
          >
            <PenSquare className="w-4 h-4" />
            <span>Redactar Correo</span>
          </button>

          <button
            onClick={() => loadInbox()}
            disabled={isLoadingMessages}
            title="Refrescar bandeja"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <button
            onClick={async () => {
              await logout();
              setNeedsAuth(true);
            }}
            title="Desconectar cuenta"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Mail Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 backdrop-blur-md space-y-1">
            <button
              onClick={() => setActiveFolder('INBOX')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeFolder === 'INBOX' ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Bandeja de Entrada</span>
              </div>
            </button>

            <button
              onClick={() => setActiveFolder('UNREAD')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeFolder === 'UNREAD' ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>No Leídos</span>
              </div>
            </button>

            <button
              onClick={() => setActiveFolder('STARRED')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeFolder === 'STARRED' ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Destacados</span>
              </div>
            </button>

            <button
              onClick={() => setActiveFolder('SENT')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeFolder === 'SENT' ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Enviados</span>
              </div>
            </button>

            <button
              onClick={() => setActiveFolder('TRASH')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeFolder === 'TRASH' ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Papelera</span>
              </div>
            </button>
          </div>

          {/* AI Productivity Card */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/20 rounded-3xl p-5 backdrop-blur-md text-xs text-slate-300 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>IA Gemini Integrada</span>
            </div>
            <p className="leading-relaxed">
              Selecciona cualquier correo para resumir conversaciones extensas, extraer compromisos clave o redactar respuestas comerciales en segundos.
            </p>
          </div>
        </div>

        {/* Center/Right Email View (9 cols) */}
        <div className="lg:col-span-9 bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur-md overflow-hidden flex flex-col min-h-[580px]">
          {/* Search Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-950/40">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por remitente, asunto o contenido..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') loadInbox();
                }}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  loadInbox();
                }}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Mail Content Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* List (5 cols) */}
            <div className="md:col-span-5 overflow-y-auto max-h-[640px] divide-y divide-slate-800/50">
              {isLoadingMessages ? (
                <div className="p-8 text-center space-y-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-400">Sincronizando mensajes...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400">No hay correos en esta sección</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isSelected = selectedMessageId === msg.id;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/10 border-l-4 border-blue-500'
                          : msg.isUnread
                          ? 'bg-slate-800/40 hover:bg-slate-800/70 font-semibold'
                          : 'hover:bg-slate-800/30 text-slate-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`text-xs truncate ${msg.isUnread ? 'text-white font-bold' : 'text-slate-300'}`}>
                          {msg.from.replace(/<.*>/, '').trim() || msg.from}
                        </span>
                        <button
                          onClick={(e) => handleToggleStar(e, msg.id, msg.isStarred)}
                          className="text-slate-500 hover:text-amber-400 p-0.5"
                        >
                          <Star className={`w-3.5 h-3.5 ${msg.isStarred ? 'text-amber-400 fill-amber-400' : ''}`} />
                        </button>
                      </div>

                      <div className={`text-sm truncate mb-1 ${msg.isUnread ? 'text-emerald-300 font-bold' : 'text-slate-200'}`}>
                        {msg.subject}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {msg.snippet}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-slate-500">
                        <span>{msg.date ? new Date(msg.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}</span>
                        {msg.isUnread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Detail (7 cols) */}
            <div className="md:col-span-7 flex flex-col h-full bg-slate-950/20">
              {isLoadingDetail ? (
                <div className="m-auto p-8 text-center space-y-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-400">Cargando contenido del correo...</p>
                </div>
              ) : messageDetail ? (
                <div className="p-6 flex flex-col h-full overflow-y-auto space-y-6">
                  {/* Message Header */}
                  <div className="border-b border-slate-800 pb-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg font-bold text-white leading-tight">
                        {messageDetail.subject}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const match = messageDetail.from.match(/<([^>]+)>/) || [null, messageDetail.from];
                            setComposeTo(match[1] || messageDetail.from);
                            setComposeSubject(messageDetail.subject.startsWith('Re:') ? messageDetail.subject : `Re: ${messageDetail.subject}`);
                            setComposeBody(`\n\n--- El ${messageDetail.date}, ${messageDetail.from} escribió: ---\n>${messageDetail.bodyText.replace(/\n/g, '\n> ')}`);
                            setIsComposeOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <CornerUpLeft className="w-3.5 h-3.5" />
                          <span>Responder</span>
                        </button>
                        <button
                          onClick={() => {
                            setMessageToDelete(messageDetail.id);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
                          title="Mover a la papelera"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <div><span className="text-slate-500 font-semibold">De:</span> {messageDetail.from}</div>
                      {messageDetail.to && <div><span className="text-slate-500 font-semibold">Para:</span> {messageDetail.to}</div>}
                      <div><span className="text-slate-500 font-semibold">Fecha:</span> {messageDetail.date}</div>
                    </div>
                  </div>

                  {/* AI Quick Actions Bar */}
                  <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                        <Bot className="w-4 h-4" />
                        <span>Acciones Inteligentes Gemini</span>
                      </div>
                      {aiLoading && (
                        <div className="flex items-center gap-1.5 text-xs text-indigo-300">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Procesando...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleAiSummarize}
                        disabled={aiLoading}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Resumir en 3 puntos</span>
                      </button>

                      <button
                        onClick={() => handleAiReply('profesional')}
                        disabled={aiLoading}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <span>Respuesta Profesional</span>
                      </button>

                      <button
                        onClick={() => handleAiReply('ventas')}
                        disabled={aiLoading}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <span>Cierre Comercial</span>
                      </button>

                      <button
                        onClick={() => handleAiReply('breve')}
                        disabled={aiLoading}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <span>Confirmación Breve</span>
                      </button>
                    </div>

                    {/* AI Summary View */}
                    {aiSummary && (
                      <div className="mt-3 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-100 whitespace-pre-wrap leading-relaxed">
                        <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Resumen Ejecutivo:</span>
                        </div>
                        {aiSummary}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 text-sm text-slate-200 leading-relaxed font-sans bg-slate-900/50 p-4 rounded-2xl border border-slate-800/60 overflow-x-auto">
                    {messageDetail.bodyHtml ? (
                      <div
                        className="prose prose-invert max-w-none text-slate-200"
                        dangerouslySetInnerHTML={{ __html: messageDetail.bodyHtml }}
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap font-sans text-slate-200">
                        {messageDetail.bodyText}
                      </pre>
                    )}
                  </div>
                </div>
              ) : (
                <div className="m-auto p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-slate-400">Selecciona un correo de la lista para leer su contenido</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* COMPOSE MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <PenSquare className="w-4 h-4 text-emerald-400" />
                <span>Nuevo Mensaje Gmail</span>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Para:</label>
                <input
                  type="email"
                  placeholder="destinatario@ejemplo.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {showCc ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">CC:</label>
                  <input
                    type="text"
                    placeholder="copia@ejemplo.com"
                    value={composeCc}
                    onChange={(e) => setComposeCc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCc(true)}
                  className="text-xs text-slate-400 hover:text-blue-400"
                >
                  + Agregar CC
                </button>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Asunto:</label>
                <input
                  type="text"
                  placeholder="Asunto del correo"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-400">Mensaje:</label>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!composeBody) return;
                      setAiLoading(true);
                      try {
                        const res = await fetch('/api/gmail/ai-assist', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            action: 'improve',
                            subject: composeSubject,
                            emailContent: composeBody
                          })
                        });
                        const d = await res.json();
                        if (d.result) setComposeBody(d.result);
                      } catch {
                        showToast('Error puliendo redacción', 'error');
                      } finally {
                        setAiLoading(false);
                      }
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mejorar redacción con IA</span>
                  </button>
                </div>
                <textarea
                  rows={8}
                  placeholder="Escribe tu mensaje aquí..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsComposeOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!composeTo.trim()) {
                    showToast('Ingresa el correo del destinatario', 'error');
                    return;
                  }
                  // Open user confirmation dialog (MANDATORY per Workspace guidelines)
                  setSendConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Correo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MANDATORY CONFIRMATION MODAL: SEND EMAIL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {sendConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base">
              <ShieldCheck className="w-6 h-6" />
              <span>Confirmar Envío de Correo</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Estás seguro de que deseas enviar este correo a través de tu cuenta de Gmail conectada?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div><strong className="text-slate-400">Destinatario:</strong> <span className="text-white">{composeTo}</span></div>
              <div><strong className="text-slate-400">Asunto:</strong> <span className="text-white">{composeSubject || '(Sin asunto)'}</span></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSendConfirmOpen(false)}
                disabled={isSending}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExecuteSend}
                disabled={isSending}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isSending ? 'Enviando...' : 'Confirmar y Enviar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MANDATORY CONFIRMATION MODAL: TRASH / DELETE EMAIL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400 font-bold text-base">
              <AlertCircle className="w-6 h-6" />
              <span>Mover correo a la papelera</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Estás seguro de que deseas mover este mensaje a la papelera de Gmail? Esta acción modificará tu bandeja de correo.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setMessageToDelete(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmar y Mover</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
