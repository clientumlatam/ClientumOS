import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Send,
  X,
  MessageSquare,
  User,
  Sparkles,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Loader2,
  ChevronDown
} from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
  time: string;
}

interface ChatbotWidgetProps {
  standalone?: boolean;
}

export default function ChatbotWidget({ standalone = false }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(standalone);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = "clientum_public_chatbot_history";
    const saved = localStorage.getItem(key);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: "model",
          content: "¡Hola! Soy el Asesor Virtual de Clientum. Estoy aquí para responder tus dudas sobre desarrollo web, CRM inteligente, chatbots de WhatsApp, facturación AFIP, pasarelas de pago y consultoría de procesos. ¿En qué puedo ayudarte hoy?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showLeadForm]);

  const saveHistory = (updated: Message[]) => {
    setMessages(updated);
    localStorage.setItem("clientum_public_chatbot_history", JSON.stringify(updated));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const newUserMsg: Message = {
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [...messages, newUserMsg];
    saveHistory(updated);
    setIsLoading(true);

    try {
      const res = await fetch("/api/public/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: Message = {
          role: "model",
          content: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        saveHistory([...updated, botMsg]);
      } else {
        throw new Error();
      }
    } catch {
      setTimeout(() => {
        const fallbackMsg: Message = {
          role: "model",
          content: "¡Hola! Entiendo tu consulta perfectamente. Para poder darte un asesoramiento personalizado y detallado según las necesidades de tu negocio, ¿te gustaría dejarme tus datos de contacto? Podés hacer click en el botón de registro arriba o escribirme tus datos.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        saveHistory([...updated, fallbackMsg]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim()) return;

    setLeadSubmitting(true);
    try {
      const conversationText = messages
        .map((m) => `${m.role === "user" ? "Visitante" : "Bot"}: ${m.content}`)
        .join("\n");

      await fetch("/api/public/chatbot/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          company: leadForm.company,
          notes: leadForm.notes,
          conversation: conversationText
        })
      });
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadForm(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const quickReplies = [
    { label: "Planes y Precios", query: "¿Cuáles son los planes y precios disponibles?" },
    { label: "Chatbot WhatsApp", query: "¿Cómo funciona el chatbot de WhatsApp de Clientum?" },
    { label: "CRM Inteligente", query: "¿Qué funciones tiene el CRM Inteligente?" },
    { label: "Integraciones", query: "¿Con qué plataformas o herramientas se integra?" }
  ];

  const clearChat = () => {
    localStorage.removeItem("clientum_public_chatbot_history");
    setMessages([
      {
        role: "model",
        content: "¡Hola! Soy el Asesor Virtual de Clientum. Estoy aquí para responder tus dudas sobre desarrollo web, CRM inteligente, chatbots de WhatsApp, facturación AFIP, pasarelas de pago y consultoría de procesos. ¿En qué puedo ayudarte hoy?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const mainWidget = (
    <div className={`flex flex-col bg-white border border-slate-200 shadow-2xl overflow-hidden ${
      standalone ? "w-full h-full rounded-none" : "w-[calc(100vw-1.5rem)] sm:w-[380px] h-[80vh] max-h-[550px] rounded-2xl"
    }`}>
      <div className="bg-[#0a1628] text-white p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative">
            <Bot className="w-5 h-5 text-emerald-400" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a1628]"></span>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight">Asesor Virtual Clientum</h4>
            <span className="text-[10px] text-slate-400 font-medium">Soporte y Ventas 24/7</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowLeadForm(!showLeadForm)}
            className="text-[10px] bg-emerald-600 hover:bg-emerald-700 font-bold px-2 py-1 rounded text-white transition-colors cursor-pointer mr-1"
          >
            {showLeadForm ? "Ver Chat" : "Registrarse"}
          </button>
          {!standalone && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 relative flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {showLeadForm ? (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 my-auto py-2"
            >
              <div className="text-center space-y-1 mb-4">
                <Sparkles className="w-6 h-6 text-emerald-500 mx-auto" />
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Dejanos tus datos de contacto</h5>
                <p className="text-[10px] text-slate-500">Un especialista se comunicará con vos para armar una propuesta a medida.</p>
              </div>

              {leadSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h6 className="text-sm font-bold text-emerald-900">¡Datos registrados!</h6>
                  <p className="text-xs text-emerald-700">Muchas gracias por tu interés. Nos pondremos en contacto muy pronto.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nombre Completo *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="Ej: Juan Pérez"
                        className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">WhatsApp / Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+54 9 11..."
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="juan@empresa.com"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                        placeholder="Nombre de tu negocio..."
                        className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">¿Qué solución necesitás?</label>
                    <textarea
                      value={leadForm.notes}
                      onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      placeholder="Ej: Quiero automatizar mi WhatsApp y conectar el catálogo..."
                      rows={2}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full py-2.5 bg-[#1a3461] hover:bg-[#0f2343] text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    {leadSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <span>Enviar y Registrar en CRM</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="chat-messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between min-h-0 space-y-4"
            >
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed font-sans ${
                        m.role === "user"
                          ? "bg-[#1a3461] text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-150 rounded-tl-none shadow-2xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>
                      <span className={`block text-[8px] mt-1 text-right ${m.role === "user" ? "text-slate-300" : "text-slate-400"}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-150 p-3 rounded-2xl rounded-tl-none shadow-2xs flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1a3461]" />
                      <span className="text-[10px] text-slate-500 font-medium">Asesor escribiendo...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 space-y-2.5">
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => handleSendMessage(qr.query)}
                        className="text-[10px] font-bold bg-white hover:bg-slate-100 text-[#1a3461] border border-slate-200 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 items-center text-[10px] text-slate-400 font-semibold justify-between border-t border-slate-100 pt-2 shrink-0">
                  <span>Configurado por socios directores</span>
                  <button onClick={clearChat} className="text-red-500 hover:underline cursor-pointer">Limpiar Historial</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showLeadForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center shrink-0"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Preguntale algo al asesor..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#1a3461]"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 bg-[#1a3461] hover:bg-[#0f2343] text-white rounded-xl cursor-pointer transition-colors disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );

  if (standalone) {
    return (
      <div className="w-screen h-screen bg-slate-50 flex items-center justify-center p-0">
        {mainWidget}
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 font-sans max-w-full">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="origin-bottom-right"
          >
            {mainWidget}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#1a3461] hover:bg-[#0f2343] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group border-2 border-white/10"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
          </>
        )}
      </button>
    </div>
  );
}
