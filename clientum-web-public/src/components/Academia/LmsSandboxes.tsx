import React, { useState } from "react";
import {
  TrendingUp,
  Mail,
  MapPin,
  FileText,
  MessageSquare,
  Sparkles,
  CreditCard,
  BarChart2,
  RefreshCw,
  Send,
  Download,
  Check,
  CheckCircle2,
  Search,
  Bot,
  Zap,
  DollarSign,
  Receipt,
  Layers,
  ArrowRight
} from "lucide-react";
import { CourseItem } from "./coursesData";

interface Props {
  course: CourseItem;
}

export default function LmsSandboxes({ course }: Props) {
  // ── 1. Sandbox CRM Kanban ──────────────────────────────────────────────────
  const [kanbanLeads, setKanbanLeads] = useState([
    { id: 1, name: "Gimnasio Roca Fit", stage: "nuevo", details: "Interesado en captar más socios.", scoring: "Pendiente" },
    { id: 2, name: "Estudio Pérez & Asoc", stage: "nuevo", details: "Buscan automatizar avisos a clientes.", scoring: "Pendiente" },
    { id: 3, name: "Frutería Alto Valle", stage: "nuevo", details: "Requiere seguimiento de presupuestos.", scoring: "Pendiente" }
  ]);

  const runCrmLeadQualification = (id: number) => {
    setKanbanLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          stage: "calificado",
          scoring: "Alta Prioridad (94%)",
          details: lead.details + " [MEDDIC: Presupuesto validado, canal directo con decisor comercial]"
        };
      }
      return lead;
    }));
  };

  const moveCrmLeadToProposal = (id: number) => {
    setKanbanLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          stage: "propuesta",
          details: lead.details + " [Propuesta automatizada de Clientum enviada]"
        };
      }
      return lead;
    }));
  };

  // ── 2. Sandbox WhatsApp Chatbot ───────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot" | "system"; text: string; time: string }>>([
    { sender: "bot", text: "¡Hola! 👋 Soy Sofía, asistente virtual de Clientum. ¿En qué puedo ayudarte hoy? ¿Buscás automatizar ventas, WhatsApp o facturación?", time: "10:30" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [leadExtracted, setLeadExtracted] = useState<any>({ name: "Martín (Prospecto)", phone: "+54 9 298 455-1234", interest: "Chatbot WhatsApp + CRM", score: "Caliente (88%)" });

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isBotThinking) return;

    const userText = chatInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages(prev => [...prev, { sender: "user", text: userText, time: now }]);
    setChatInput("");
    setIsBotThinking(true);

    setTimeout(() => {
      let botReply = "Excelente. Tenemos integración nativa de WhatsApp con CRM y facturación AFIP para potenciar tu empresa en el Alto Valle. ¿Cuántas personas atienden consultas actualmente?";
      if (userText.toLowerCase().includes("precio") || userText.toLowerCase().includes("cuanto") || userText.toLowerCase().includes("plan")) {
        botReply = "Nuestros planes para PyMEs arrancan desde $45.000 ARS/mes con soporte total e implementación en 5 días. ¿Querés agendar una demo guiada de 10 min?";
        setLeadExtracted((prev: any) => ({ ...prev, interest: "Consulta de Planes y Precios", score: "Urgente (95%)" }));
      } else if (userText.toLowerCase().includes("afip") || userText.toLowerCase().includes("factura")) {
        botReply = "Emitimos Factura Electrónica A, B y C directamente desde la conversación de WhatsApp con un click. ¿Tenés punto de venta web habilitado en AFIP?";
        setLeadExtracted((prev: any) => ({ ...prev, interest: "Facturación AFIP Electrónica", score: "Muy Caliente (92%)" }));
      }

      setChatMessages(prev => [
        ...prev,
        { sender: "bot", text: botReply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
      setIsBotThinking(false);
    }, 900);
  };

  // ── 3. Sandbox AI Copilot Marketing ───────────────────────────────────────
  const [copilotChannel, setCopilotChannel] = useState("Meta Ads");
  const [copilotNiche, setCopilotNiche] = useState("Clínicas & Salud");
  const [copilotGenerated, setCopilotGenerated] = useState<any>(null);
  const [copilotLoading, setCopilotLoading] = useState(false);

  const generateCopilotCopy = () => {
    setCopilotLoading(true);
    setTimeout(() => {
      if (copilotChannel === "Meta Ads") {
        setCopilotGenerated({
          headline: "🔴 ¿Perdiendo pacientes por demoras en responder por WhatsApp?",
          body: "El 64% de los turnos médicos se pierden si no respondés en menos de 5 minutos. Con el Asistente IA de Clientum, tu clínica agenda turnos las 24 hs de forma automática y los sincroniza con tu agenda médica.",
          cta: "👉 Solicitá tu Demo Gratuita para Clínicas en Patagonia",
          icp: "Directores Médicos y Administradores de Clínicas (20-100 consultas/día)"
        });
      } else if (copilotChannel === "Google Search") {
        setCopilotGenerated({
          headline: "Software CRM para Clínicas | Automatizá Turnos por WhatsApp",
          body: "Centralizá historias de contacto, recordatorios automáticos de turnos y facturación AFIP en una sola plataforma. Soporte en español 24/7.",
          cta: "clientum.com.ar/salud · Empezá hoy sin contrato mínimo",
          icp: "Búsquedas de alta intención: 'sistema de turnos clinica', 'crm salud argentina'"
        });
      } else {
        setCopilotGenerated({
          headline: "Cómo reducir el ausentismo de pacientes en un 40% mediante IA Conversacional",
          body: "Los recordatorios manuales consumen horas de recepción. Analizamos el caso de 12 centros de salud en Río Negro que automatizaron su flujo de confirmación con Clientum.",
          cta: "Descargá el Caso de Estudio en PDF",
          icp: "Tomadores de decisión B2B, Gerentes de Operaciones Médicas"
        });
      }
      setCopilotLoading(false);
    }, 1100);
  };

  // ── 4. Sandbox Email Outreach ─────────────────────────────────────────────
  const [emailIndustry, setEmailIndustry] = useState("Inmobiliaria");
  const [emailTone, setEmailTone] = useState("Persuasivo");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [generatingEmail, setGeneratingEmail] = useState(false);

  const generateSandboxEmail = () => {
    setGeneratingEmail(true);
    setTimeout(() => {
      const isPersuasive = emailTone === "Persuasivo";
      const body = isPersuasive
        ? `Asunto: Alianza Estratégica & Automatización para {{empresa}} en Río Negro 🚀\n\nHola {{nombre}},\n\nVi tu empresa en el rubro ${emailIndustry} y noté que manejan un volumen alto de consultas diarias.\n\nEn Clientum ayudamos a empresas del Alto Valle a implementar tableros Kanban y orquestadores con IA que clasifican leads calientes en tiempo real.\n\n¿Te queda cómodo un café virtual de 10 minutos este jueves para ver cómo podemos subir tu tasa de conversión en un 30%?\n\nSaludos cordiales,\nEl equipo de Clientum`
        : `Asunto: Diagnóstico Comercial para tu negocio ${emailIndustry} 📊\n\nEstimado/a {{nombre}},\n\nMe pongo en contacto para acercarte un análisis simplificado de tus canales de contacto actuales.\n\nCon Clientum CRM podés unificar todo el historial de interacciones de tus clientes en un tablero central, logrando reducir el tiempo de respuesta promedio a menos de 5 minutos.\n\nQuedo a su disposición para coordinar una breve llamada de demostración.\n\nAtentamente,\nSoporte Clientum`;

      setGeneratedEmail(body);
      setGeneratingEmail(false);
    }, 1000);
  };

  // ── 5. Sandbox SEO Local ──────────────────────────────────────────────────
  const [seoKeyword, setSeoKeyword] = useState("Clínicas");
  const [seoCity, setSeoCity] = useState("General Roca");
  const [seoResults, setSeoResults] = useState<any[]>([]);
  const [scanningSeo, setScanningSeo] = useState(false);

  const scanSeoMap = () => {
    setScanningSeo(true);
    setSeoResults([]);
    setTimeout(() => {
      setSeoResults([
        { name: `${seoKeyword} San Bernardo`, address: "Tucumán 1420", site: "sanbernardoroca.com", ssl: true, speed: "Lento (4.2s)", score: "62/100", flaws: ["Falta meta título descriptivo", "Imágenes pesadas"] },
        { name: `${seoKeyword} del Sol`, address: "Av. Roca 420", site: "Ninguno", ssl: false, speed: "N/A", score: "0/100", flaws: ["No tiene sitio web", "Ficha de Google sin verificar"] },
        { name: `${seoKeyword} Patagonia`, address: "San Martín 840", site: "clinicapatagonia.com.ar", ssl: true, speed: "Rápido (1.5s)", score: "88/100", flaws: ["Falta etiqueta alt en imágenes"] }
      ]);
      setScanningSeo(false);
    }, 1200);
  };

  // ── 6. Sandbox AFIP & Mercado Pago ────────────────────────────────────────
  const [invoiceType, setInvoiceType] = useState("Factura B");
  const [invoiceAmount, setInvoiceAmount] = useState("125000");
  const [invoiceClient, setInvoiceClient] = useState("Distribuidora Patagónica S.A.");
  const [invoiceResult, setInvoiceResult] = useState<any>(null);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);

  const handleEmitInvoice = () => {
    setGeneratingInvoice(true);
    setTimeout(() => {
      setInvoiceResult({
        cae: "74392810482910",
        vtoCae: "2026-08-25",
        numFactura: "0004-00001892",
        qrUrl: "https://www.afip.gob.ar/fe/qr/?p=eyJ2ZXIiOjEsImZlY2hhIjoiMjAyNi0wOC0xNSIsImN1aXQiOjMwNzE2MjM0NTY5fQ==",
        mpLink: `https://mpago.la/pos/cli_${Date.now()}`
      });
      setGeneratingInvoice(false);
    }, 1100);
  };

  // ── 7. Sandbox Business Intelligence ──────────────────────────────────────
  const [biScenario, setBiScenario] = useState<"standard" | "optimizado">("standard");
  const [biSpend, setBiSpend] = useState(250000);
  const [biLeads, setBiLeads] = useState(120);

  const biMetrics = biScenario === "standard" ? {
    cac: Math.round(biSpend / (biLeads * 0.1)),
    winRate: "10%",
    pipelineVelocity: "$1.850.000 / mes",
    ltv: "$420.000",
    ratio: "2.1x"
  } : {
    cac: Math.round(biSpend / (biLeads * 0.22)),
    winRate: "22%",
    pipelineVelocity: "$4.100.000 / mes",
    ltv: "$560.000",
    ratio: "4.8x"
  };

  // ── 8. Sandbox Brochure ───────────────────────────────────────────────────
  const [brochurePalette, setBrochurePalette] = useState("navy");
  const [brochureContent, setBrochureContent] = useState("Standard");

  // ── 9. Sandbox Marketing Digital PyME ────────────────────────────────────
  const [mdBusinessNiche, setMdBusinessNiche] = useState("Comercio / Indumentaria (Gral. Roca)");
  const [mdCity, setMdCity] = useState("General Roca");
  const [mdWeeklyPosts, setMdWeeklyPosts] = useState(3);
  const [mdDailyAdBudget, setMdDailyAdBudget] = useState(1500);
  const [mdGeneratedPlan, setMdGeneratedPlan] = useState<any>(null);
  const [mdGenerating, setMdGenerating] = useState(false);

  const handleGenerateMdPlan = () => {
    setMdGenerating(true);
    setTimeout(() => {
      setMdGeneratedPlan({
        gmbStatus: "Optimizado con fotos reales, horarios actualizados y botón de WhatsApp",
        whatsappLink: `https://wa.me/5492984000000?text=Hola!+Vi+su+perfil+en+redes+y+quisiera+consultar+por+un+producto`,
        calendar: [
          { day: "Lunes", type: "Educativo / Detrás de escena", idea: "¿Cómo seleccionamos los productos que llegan a nuestro local en Roca?" },
          { day: "Miércoles", type: "Solución / Producto", idea: "3 formas de resolver una necesidad puntual con atención inmediata" },
          { day: "Viernes", type: "Oferta & Urgencia", idea: "Beneficio especial de fin de semana con entrega directa en Alto Valle" }
        ],
        adCopy: {
          headline: `¿Buscás atención rápida y de confianza en ${mdCity}? 📍`,
          body: `Conocé nuestro catálogo renovado en ${mdBusinessNiche}. Atendemos consultas al instante por WhatsApp y coordinamos tu pedido sin demoras.`,
          cta: "👉 Chatear por WhatsApp",
          estimatedReach: Math.round(mdDailyAdBudget * 4.5) + " personas/día en Alto Valle",
          estimatedLeads: Math.round((mdDailyAdBudget / 350) * 30) + " mensajes de clientes/mes"
        }
      });
      setMdGenerating(false);
    }, 900);
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* 1. CRM KANBAN */}
      {course.slug === "crm-moderno-automatizacion" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Práctica: Orquestador Kanban de Prospectos
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Interactuá con un tablero real en miniatura. Presioná 'Calificar con IA' para activar el análisis inteligente del bot y ver cómo se mueve el lead de etapa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 flex-1">
            {["nuevo", "calificado", "propuesta"].map((stage) => {
              const stageLeads = kanbanLeads.filter(l => l.stage === stage);
              return (
                <div key={stage} className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 flex flex-col gap-2.5 min-h-[280px]">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider text-center block">
                    {stage === "nuevo" ? "Nuevos Leads" : stage === "calificado" ? "Calificados IA" : "Propuesta Enviada"}
                  </span>

                  <div className="flex flex-col gap-2">
                    {stageLeads.length === 0 ? (
                      <div className="border border-dashed border-slate-800 rounded-lg p-4 text-center text-slate-600 text-[10px]">
                        Sin tarjetas
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex flex-col gap-2 relative">
                          <div>
                            <h5 className="text-[11px] font-bold text-slate-200">{lead.name}</h5>
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{lead.details}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/60 text-[9px]">
                            <span className={`px-1.5 py-0.5 rounded-sm font-mono ${lead.scoring === "Pendiente" ? "bg-slate-800 text-slate-400" : "bg-emerald-950 text-emerald-400 font-bold"}`}>
                              IA: {lead.scoring}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 mt-1.5">
                            {lead.stage === "nuevo" && (
                              <button
                                onClick={() => runCrmLeadQualification(lead.id)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[9px] py-1 px-2 rounded-md transition-all cursor-pointer border-0"
                              >
                                Calificar con IA
                              </button>
                            )}
                            {lead.stage === "calificado" && (
                              <button
                                onClick={() => moveCrmLeadToProposal(lead.id)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] py-1 px-2 rounded-md transition-all cursor-pointer border-0"
                              >
                                Enviar Propuesta
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setKanbanLeads([
              { id: 1, name: "Gimnasio Roca Fit", stage: "nuevo", details: "Interesado en captar más socios.", scoring: "Pendiente" },
              { id: 2, name: "Estudio Pérez & Asoc", stage: "nuevo", details: "Buscan automatizar avisos a clientes.", scoring: "Pendiente" },
              { id: 3, name: "Frutería Alto Valle", stage: "nuevo", details: "Requiere seguimiento de presupuestos.", scoring: "Pendiente" }
            ])}
            className="mt-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 text-[10px] py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 self-center cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reiniciar Tablero
          </button>
        </div>
      )}

      {/* 2. WHATSAPP CHATBOT */}
      {course.slug === "whatsapp-bots-ia" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Simulador Interactivo de WhatsApp Business API
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Escribí como cliente (ej. "¿Cuánto cuesta?", "¿Hacen factura AFIP?"). Observá cómo el bot responde y extrae el lead automáticamente al CRM.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
            {/* Chat Box */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl flex flex-col h-[320px] overflow-hidden">
              <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2 text-white shrink-0">
                <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold leading-tight">Sofía · Bot Clientum</h5>
                  <span className="text-[9px] text-emerald-200 block">En línea 24/7</span>
                </div>
              </div>

              <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 bg-[#0c1317]">
                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-2 rounded-lg text-xs flex flex-col ${
                      m.sender === "user"
                        ? "bg-[#005c4b] text-white self-end rounded-tr-none"
                        : "bg-[#202c33] text-slate-200 self-start rounded-tl-none"
                    }`}
                  >
                    <span>{m.text}</span>
                    <span className="text-[8px] text-slate-400 self-end mt-1">{m.time}</span>
                  </div>
                ))}
                {isBotThinking && (
                  <div className="bg-[#202c33] text-slate-400 text-xs p-2 rounded-lg self-start flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span>Sofía está escribiendo...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChat} className="p-2 bg-[#202c33] flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Escribí un mensaje de prueba..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-[#2a3942] text-white text-xs px-3 py-1.5 rounded-lg border-0 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isBotThinking}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg cursor-pointer border-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Extracted CRM Card */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-2.5">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                FICHA GENERADA EN EL CRM
              </span>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col gap-1.5 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 block">Contacto</span>
                  <span className="font-bold text-white">{leadExtracted.name}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">Teléfono WhatsApp</span>
                  <span className="font-mono text-slate-300 text-[11px]">{leadExtracted.phone}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">Interés Detectado</span>
                  <span className="text-indigo-300 font-semibold">{leadExtracted.interest}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">Scoring IA</span>
                  <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-0.5">
                    {leadExtracted.score}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 bg-slate-900/50 p-2 rounded border border-slate-800">
                ✅ Sincronizado en tiempo real con la base de datos de Clientum.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AI MARKETING COPILOT */}
      {course.slug === "ai-marketing-copilot" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              Generador de Copys y Anuncios con Fórmulas AIDA / PAS
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Elegí el canal y rubro. El copiloto redactará un anuncio listo para publicar optimizado para conversión.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Canal Publicitario</label>
                <select
                  value={copilotChannel}
                  onChange={(e) => setCopilotChannel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                  <option value="Google Search">Google Search (Alta Intención)</option>
                  <option value="LinkedIn B2B">LinkedIn B2B (Corporativo)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Nicho / Rubro</label>
                <select
                  value={copilotNiche}
                  onChange={(e) => setCopilotNiche(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Clínicas & Salud">Clínicas & Salud</option>
                  <option value="Inmobiliarias">Inmobiliarias & Loteos</option>
                  <option value="Comercios & Retail">Comercios & Retail</option>
                  <option value="Estudios Contables">Estudios Contables & Legales</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateCopilotCopy}
              disabled={copilotLoading}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-60 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              {copilotLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{copilotLoading ? "Generando copy persuasivo..." : "Generar Anuncio con IA"}</span>
            </button>
          </div>

          {copilotGenerated && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col gap-2">
              <span className="text-[9px] font-mono text-fuchsia-400 uppercase tracking-widest font-bold">VISTA PREVIA DEL ANUNCIO GENERADO</span>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col gap-2 text-xs">
                <h4 className="font-bold text-white text-sm">{copilotGenerated.headline}</h4>
                <p className="text-slate-300 leading-relaxed text-xs">{copilotGenerated.body}</p>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[10px]">
                  <span className="text-fuchsia-300 font-bold">{copilotGenerated.cta}</span>
                  <span className="text-slate-500 font-mono">ICP: {copilotGenerated.icp}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. EMAIL OUTREACH */}
      {course.slug === "ia-outreach-email-marketing" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-400" />
              Práctica: Redactor y Generador de Outreach
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Elegí el nicho y tono. El motor generará dinámicamente un email con ganchos persuasivos y merge-tags automáticos integrando tu base de contactos CRM.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Nicho / Industria</label>
                <select
                  value={emailIndustry}
                  onChange={(e) => setEmailIndustry(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Inmobiliaria">Inmobiliarias locales</option>
                  <option value="Distribuidoras">Distribuidoras Alto Valle</option>
                  <option value="Servicios Médicos">Servicios Médicos / Clínicas</option>
                  <option value="Gastronomía">Restaurantes & Catering</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Tono Persuasivo</label>
                <select
                  value={emailTone}
                  onChange={(e) => setEmailTone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Persuasivo">Enfoque ROI & Venta Directa</option>
                  <option value="Informativo">Diagnóstico Técnico Amistoso</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateSandboxEmail}
              disabled={generatingEmail}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              {generatingEmail ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{generatingEmail ? "Redactando con IA..." : "Redactar Outreach Personalizado"}</span>
            </button>
          </div>

          {generatedEmail && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col gap-2">
              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest">VISTA PREVIA DEL OUTBOX CRM</span>
              <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto bg-slate-900 p-3 rounded-lg border border-slate-850">
                {generatedEmail}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* 5. LOCAL SEO & MAPS */}
      {course.slug === "seo-local-prospeccion-geolocalizada" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              Práctica: Geolocated Prospector & Audit
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Simulá una prospección en tu zona. Ingresá una palabra clave comercial y un municipio para rastrear perfiles vulnerables de SEO local.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Qué buscar (Rubro)</label>
                <input
                  type="text"
                  value={seoKeyword}
                  onChange={(e) => setSeoKeyword(e.target.value)}
                  placeholder="Ej: Pinturerías, Talleres"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Ciudad / Municipio</label>
                <input
                  type="text"
                  value={seoCity}
                  onChange={(e) => setSeoCity(e.target.value)}
                  placeholder="Ej: General Roca, Cipolletti"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={scanSeoMap}
              disabled={scanningSeo}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              {scanningSeo ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>{scanningSeo ? "Extrayendo de Maps..." : "Escanear Zonas de Prospectos"}</span>
            </button>
          </div>

          {seoResults.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col gap-2">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block">PROSPECTOS LOCALES EXTRAÍDOS ({seoResults.length})</span>
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                {seoResults.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-slate-200">{item.name}</h5>
                        <p className="text-[10px] text-slate-500">{item.address} · Web: {item.site}</p>
                      </div>
                      <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${item.score === "0/100" ? "bg-red-950 text-red-400" : item.score === "88/100" ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-400"}`}>
                        SEO: {item.score}
                      </span>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-slate-850 flex flex-wrap gap-1.5">
                      {item.flaws.map((flaw: string, fIdx: number) => (
                        <span key={fIdx} className="bg-slate-950 text-red-400 border border-red-900/30 text-[9px] px-1.5 py-0.5 rounded-sm">
                          ⚠️ {flaw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. AFIP & MERCADO PAGO */}
      {course.slug === "afip-mercadopago-crm" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-sky-400" />
              Simulador de Facturación AFIP Electrónica & Mercado Pago
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Probá emitir un comprobante fiscal directo desde el trato de un cliente y generar un link de pago con QR.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Tipo de Factura</label>
                <select
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Factura A">Factura A (Resp. Inscripto)</option>
                  <option value="Factura B">Factura B (Consumidor Final)</option>
                  <option value="Factura C">Factura C (Monotributo)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Cliente / Razón Social</label>
                <input
                  type="text"
                  value={invoiceClient}
                  onChange={(e) => setInvoiceClient(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Monto ($ ARS)</label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleEmitInvoice}
              disabled={generatingInvoice}
              className="w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              {generatingInvoice ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Receipt className="w-3.5 h-3.5" />}
              <span>{generatingInvoice ? "Autorizando con AFIP..." : "Emitir Factura Electrónica & Link de Pago"}</span>
            </button>
          </div>

          {invoiceResult && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col gap-2">
              <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest font-bold">COMPROBANTE AFIP EMITIDO</span>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">{invoiceType} N° {invoiceResult.numFactura}</span>
                  <span className="bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">CAE APROBADO</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
                  <span>CAE: {invoiceResult.cae}</span>
                  <span>Vto CAE: {invoiceResult.vtoCae}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center text-[10px] mt-1">
                  <span className="text-sky-300 font-mono truncate max-w-[200px]">{invoiceResult.mpLink}</span>
                  <span className="bg-sky-900 text-sky-200 px-2 py-0.5 rounded font-bold">Link Mercado Pago Listo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. BUSINESS INTELLIGENCE */}
      {course.slug === "analytics-bi-crm" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Simulador de Métricas Financieras (CAC, LTV, ROI)
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Modificá la inversión y compará el impacto de optimizar el embudo de ventas con automatizaciones de Clientum.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setBiScenario("standard")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  biScenario === "standard" ? "bg-slate-800 border-amber-500 text-amber-300" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                Escenario Manual
              </button>
              <button
                onClick={() => setBiScenario("optimizado")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  biScenario === "optimizado" ? "bg-amber-950/60 border-amber-500 text-amber-300" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                Escenario con Clientum CRM + IA 🚀
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {[
                { label: "Costo Adquisición (CAC)", val: `$${biMetrics.cac.toLocaleString("es-AR")}` },
                { label: "Tasa de Cierre (Win Rate)", val: biMetrics.winRate },
                { label: "Velocidad de Pipeline", val: biMetrics.pipelineVelocity },
                { label: "Ratio LTV : CAC", val: biMetrics.ratio }
              ].map(({ label, val }) => (
                <div key={label} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-center">
                  <span className="text-[9px] text-slate-500 block leading-tight">{label}</span>
                  <span className="text-xs font-black text-amber-400 font-mono block mt-1">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. BROCHURES & SALES MATERIALS */}
      {course.slug === "diseno-brochures-materiales-ia" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              Práctica: Generador y Estilizador de Brochure PDF
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Ajustá las paletas visuales de la marca en tiempo real. El sandbox renderiza el pre-diseño comercial del folleto para su exportación limpia.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Paleta de Color</label>
                <div className="flex gap-2">
                  {[
                    { id: "navy", class: "bg-[#0A2558]" },
                    { id: "emerald", class: "bg-emerald-600" },
                    { id: "coral", class: "bg-rose-500" },
                    { id: "dark", class: "bg-slate-800" }
                  ].map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setBrochurePalette(col.id)}
                      className={`w-6 h-6 rounded-full border cursor-pointer transition-all ${col.class} ${brochurePalette === col.id ? "ring-2 ring-indigo-500 border-white scale-110" : "border-slate-700 hover:scale-105"}`}
                      title={col.id}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Contenido / Enfoque</label>
                <select
                  value={brochureContent}
                  onChange={(e) => setBrochureContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Standard">Corporativo General</option>
                  <option value="Estrategico">Atención de Urgencia & Cierre</option>
                  <option value="Descuento">Oferta Especial / Lanzamiento</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col gap-2 relative overflow-hidden">
            <div className={`h-1.5 w-full absolute top-0 left-0 ${
              brochurePalette === "navy" ? "bg-[#0A2558]" :
              brochurePalette === "emerald" ? "bg-emerald-600" :
              brochurePalette === "coral" ? "bg-rose-500" :
              "bg-slate-500"
            }`} />
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase">PRE-DISEÑO EN ALTA FIDELIDAD</span>
              <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">4 páginas</span>
            </div>
            <div className="flex-1 bg-slate-900 rounded-lg border border-slate-850 p-3 text-xs font-sans flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${
                  brochurePalette === "navy" ? "bg-[#0A2558]" :
                  brochurePalette === "emerald" ? "bg-emerald-600" :
                  brochurePalette === "coral" ? "bg-rose-500" :
                  "bg-slate-500"
                }`}>
                  <img src="/favicon.svg" alt="" className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-slate-200">CLIENTUM CRM</span>
              </div>
              <h4 className="text-xs font-black tracking-tight text-white mt-1">
                {brochureContent === "Standard" ? "Soluciones de Gestión & Automatización para el Alto Valle" :
                 brochureContent === "Estrategico" ? "Reducción Crítica de Tiempos de Respuesta con IA" :
                 "Plan Especial: Digitalización PyME con 30% Bonificado"}
              </h4>
              <p className="text-[10px] text-slate-400">
                Diagnóstico claro, estructuración de bases de datos de leads y asistentes automatizados.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 self-center cursor-pointer border border-slate-800 mt-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Muestra PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* 9. MARKETING DIGITAL PARA PRINCIPIANTES */}
      {course.slug === "marketing-digital-principiantes" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Práctica de Aula: Simulador de Plan Digital y Publicidad PyME
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Configurá el rubro de tu comercio local, tu presupuesto diario de Meta Ads y generá tu plan editorial de 3 semanas con cálculo de consultas estimadas en el Alto Valle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Controles de Configuración */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Parámetros del Negocio Local
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Rubro de tu comercio / empresa</label>
                <select
                  value={mdBusinessNiche}
                  onChange={(e) => setMdBusinessNiche(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="Comercio / Indumentaria (Gral. Roca)">Comercio / Indumentaria (Gral. Roca)</option>
                  <option value="Gastronomía & Cafetería (Alto Valle)">Gastronomía & Cafetería (Alto Valle)</option>
                  <option value="Servicios Profesionales / Consultorio">Servicios Profesionales / Consultorio</option>
                  <option value="Taller de Oficios / Distribuidora">Taller de Oficios / Distribuidora</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Localidad</label>
                  <input
                    type="text"
                    value={mdCity}
                    onChange={(e) => setMdCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Presupuesto Diario Ads</label>
                  <select
                    value={mdDailyAdBudget}
                    onChange={(e) => setMdDailyAdBudget(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                  >
                    <option value={1000}>$1.000 ARS/día</option>
                    <option value={1500}>$1.500 ARS/día (Sugerido)</option>
                    <option value={3000}>$3.000 ARS/día</option>
                    <option value={5000}>$5.000 ARS/día</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateMdPlan}
                disabled={mdGenerating}
                className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all mt-1"
              >
                {mdGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{mdGenerating ? "Generando Plan de Aula..." : "Generar Plan de Acción PyME"}</span>
              </button>
            </div>

            {/* Resultado Generado */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Plan de Acción & Simulación de Retorno
              </span>

              {mdGeneratedPlan ? (
                <div className="space-y-2.5 text-xs animate-fadeIn">
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                    <p className="text-[10px] font-mono text-emerald-400 font-bold uppercase">1. Google My Business & WhatsApp</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">{mdGeneratedPlan.gmbStatus}</p>
                  </div>

                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                    <p className="text-[10px] font-mono text-indigo-400 font-bold uppercase">2. Calendario Semanal de Contenido</p>
                    <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
                      {mdGeneratedPlan.calendar.map((c: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-bold text-indigo-300">{c.day}:</span>
                          <span>{c.type} — {c.idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                    <p className="text-[10px] font-mono text-rose-400 font-bold uppercase">3. Campaña Meta Ads & Estimaciones</p>
                    <div className="grid grid-cols-2 gap-2 mt-1.5 text-[11px]">
                      <div className="bg-slate-950 p-1.5 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block">Alcance Local</span>
                        <span className="font-bold text-slate-200">{mdGeneratedPlan.adCopy.estimatedReach}</span>
                      </div>
                      <div className="bg-slate-950 p-1.5 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block">Consultas WhatsApp</span>
                        <span className="font-bold text-emerald-400">{mdGeneratedPlan.adCopy.estimatedLeads}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600 border border-dashed border-slate-800 rounded-lg">
                  <Sparkles className="w-6 h-6 text-slate-700 mb-2" />
                  <p className="text-xs font-medium">Hacé click en 'Generar Plan de Acción PyME' para simular tu estrategia comercial.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
