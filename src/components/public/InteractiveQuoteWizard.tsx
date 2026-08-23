import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  LayoutDashboard,
  Globe,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  Building2,
  Users,
  Clock,
  ShieldCheck,
  Send,
  Loader2,
  X,
  FileText
} from 'lucide-react';
import { generateProposalPdf } from '../../lib/pdfProposalGenerator';
import { useLanguage } from '../../lib/i18n';

interface QuoteWizardProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  initialSolution?: string;
}

interface SolutionOption {
  id: string;
  icon: any;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  basePriceUSD: number;
  deliveryDays: number;
  features: string[];
}

const SOLUTIONS: SolutionOption[] = [
  {
    id: 'whatsapp_ai',
    icon: Bot,
    title: 'Chatbot WhatsApp IA & Ventas 24/7',
    titlePt: 'Chatbot WhatsApp IA & Vendas 24/7',
    description: 'Agente conversacional inteligente entrenado con tu catálogo para atender y cerrar ventas.',
    descriptionPt: 'Agente conversacional inteligente treinado com seu catálogo para atender e fechar vendas.',
    basePriceUSD: 180,
    deliveryDays: 5,
    features: [
      'Entrenamiento de IA con productos y FAQs de tu negocio',
      'Integración oficial Meta Cloud API con tu número actual',
      'Derivación fluida a asesores humanos con alertas',
      'Panel de control de conversaciones y métricas en tiempo real'
    ]
  },
  {
    id: 'crm_erp',
    icon: LayoutDashboard,
    title: 'CRM + Facturación AFIP + Gestión',
    titlePt: 'CRM + Faturamento Fiscal + Gestão',
    description: 'Pipeline visual de ventas Kanban, gestión de clientes, presupuestos y facturación electrónica.',
    descriptionPt: 'Pipeline visual de vendas Kanban, gestão de clientes, orçamentos e faturamento eletrônico.',
    basePriceUSD: 240,
    deliveryDays: 7,
    features: [
      'Embudo de ventas Kanban personalizado a tu ciclo comercial',
      'Facturación electrónica automática con CAE oficial AFIP',
      'Control de caja, cuentas corrientes de clientes y gastos',
      'Exportación de reportes a Excel, PDF y métricas de rendimiento'
    ]
  },
  {
    id: 'web_portal',
    icon: Globe,
    title: 'Desarrollo Web & Portal Cloud',
    titlePt: 'Desenvolvimento Web & Portal Cloud',
    description: 'Sitio web ultra rápido de alta conversión, catálogo autoadministrable y portal de clientes.',
    descriptionPt: 'Site web ultra rápido de alta conversão, catálogo autoadministrável e portal de clientes.',
    basePriceUSD: 220,
    deliveryDays: 6,
    features: [
      'Diseño responsive adaptado a celulares y computadoras',
      'Optimización SEO On-Page para posicionar en Google',
      'Integración con WhatsApp, CRM y pasarelas de pago',
      'Alojamiento cloud de alta velocidad con certificado SSL'
    ]
  },
  {
    id: 'full_suite',
    icon: Rocket,
    title: 'Suite Integral de Crecimiento PyME',
    titlePt: 'Suite Integral de Crescimento PyME',
    description: 'Chatbot IA + CRM completo + Web Corporativa + Prospección B2B automatizada.',
    descriptionPt: 'Chatbot IA + CRM completo + Web Corporativa + Prospecção B2B automatizada.',
    basePriceUSD: 450,
    deliveryDays: 10,
    features: [
      'Solución todo-en-uno 100% sincronizada',
      'Chatbot IA conectado directamente al CRM',
      'Módulo de prospección geolocalizada en Google Maps',
      'Acompañamiento estratégico semanal y soporte prioritario'
    ]
  }
];

const BUSINESS_SIZES = [
  { id: 'micro', label: 'Microempresa / Emprendedor', range: '1 - 3 personas', factor: 1.0 },
  { id: 'small', label: 'PyME en Crecimiento', range: '4 - 15 personas', factor: 1.2 },
  { id: 'medium', label: 'Mediana Empresa', range: '16 - 50 personas', factor: 1.5 },
  { id: 'corporate', label: 'Corporativo / Gran Volumen', range: '50+ personas', factor: 2.0 }
];

export function InteractiveQuoteWizard({ isOpen = true, onClose, onSuccess, initialSolution }: QuoteWizardProps) {
  const { isPortuguese } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [selectedSolution, setSelectedSolution] = useState<string>(initialSolution || 'whatsapp_ai');
  const [selectedSize, setSelectedSize] = useState<string>('small');
  const [monthlyConsults, setMonthlyConsults] = useState<number>(250);
  
  // Contact Form Data
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeSolution = SOLUTIONS.find(s => s.id === selectedSolution) || SOLUTIONS[0];
  const activeSize = BUSINESS_SIZES.find(s => s.id === selectedSize) || BUSINESS_SIZES[1];

  // Calculated estimates
  const calculatedPriceUSD = Math.round(activeSolution.basePriceUSD * activeSize.factor);
  const calculatedPriceARS = Math.round(calculatedPriceUSD * 1350).toLocaleString('es-AR');
  const deliveryDays = activeSolution.deliveryDays;
  const estimatedSavingsHours = Math.round((monthlyConsults * 8) / 60); // 8 mins per manual consult
  const projectedSavingsUSD = `$${estimatedSavingsHours * 15} USD / mes`;

  const handleNext = () => {
    setError(null);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError(isPortuguese ? 'Por favor preencha os campos obrigatórios.' : 'Por favor completa los campos obligatorios.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Submit lead to server
      const payload = {
        name: formData.name,
        company: formData.company || 'Empresa privada',
        email: formData.email,
        phone: formData.phone,
        message: `[COTIZADOR ONLINE] Solución: ${activeSolution.title} | Tamaño: ${activeSize.label} | Consultas: ${monthlyConsults}/mes | Estimado: USD $${calculatedPriceUSD} | Notas: ${formData.notes}`,
        source: 'cotizador_interactivo_wizard'
      };

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {
        // Continue even if local endpoint fails
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.warn('Error submitting lead:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    generateProposalPdf({
      clientName: formData.name || 'Titular de la Consulta',
      companyName: formData.company || 'Empresa Privada',
      email: formData.email || 'No especificado',
      phone: formData.phone || 'No especificado',
      solutionType: isPortuguese ? activeSolution.titlePt : activeSolution.title,
      businessSize: activeSize.label,
      monthlyLeads: monthlyConsults,
      estimatedBudget: `$${calculatedPriceUSD} USD (o ~$${calculatedPriceARS} ARS)`,
      deliveryDays: deliveryDays,
      projectedSavings: `${projectedSavingsUSD} (${estimatedSavingsHours} horas hombre)`,
      features: activeSolution.features
    });
  };

  return (
    <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-w-3xl mx-auto backdrop-blur-xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header with step progress indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            {isPortuguese ? 'Assistente de Cotação em 3 Passos' : 'Cotizador Inteligente en 3 Pasos'}
          </span>
          <span className="text-slate-400 text-xs font-mono">Paso {step} de 3</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {step === 1 && (isPortuguese ? '1. Qual solução sua empresa precisa?' : '1. ¿Qué solución necesita tu negocio?')}
          {step === 2 && (isPortuguese ? '2. Dimensione sua operação atual' : '2. Dimensiona tu operación actual')}
          {step === 3 && (isPortuguese ? '3. Estimativa & Proposta Executiva' : '3. Estimación & Propuesta Ejecutiva')}
        </h2>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* ══ STEP 1: SOLUTION SELECTION ══ */}
      {step === 1 && (
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SOLUTIONS.map((sol) => {
              const Icon = sol.icon;
              const isSelected = selectedSolution === sol.id;
              return (
                <div
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0A2558]/80 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/50'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {sol.deliveryDays} días SLA
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-white mb-1">
                      {isPortuguese ? sol.titlePt : sol.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mb-3">
                      {isPortuguese ? sol.descriptionPt : sol.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Desde</span>
                    <span className="font-bold text-white">${sol.basePriceUSD} USD</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>{isPortuguese ? 'Avançar para Passo 2' : 'Continuar al Paso 2'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2: BUSINESS SIZE & VOLUME ══ */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              {isPortuguese ? 'Tamanho da equipe comercial / suporte' : 'Tamaño de tu equipo de trabajo o ventas'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BUSINESS_SIZES.map((size) => (
                <div
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedSize === size.id
                      ? 'bg-[#0A2558]/80 border-emerald-400 ring-1 ring-emerald-400/40 text-white'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{size.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{size.range}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume slider */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isPortuguese ? 'Volume estimado de consultas / leads por mês' : 'Volumen estimado de consultas / leads por mes'}
              </label>
              <span className="text-emerald-400 font-mono font-extrabold text-sm bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                {monthlyConsults} consultas
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={2500}
              step={50}
              value={monthlyConsults}
              onChange={(e) => setMonthlyConsults(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
              <span>50 consultas</span>
              <span>1.000 consultas</span>
              <span>2.500+ consultas</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isPortuguese ? 'Voltar' : 'Atrás'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>{isPortuguese ? 'Ver Estimativa & Proposta' : 'Ver Estimación & Propuesta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 3: ESTIMATION & LEAD FORM ══ */}
      {step === 3 && (
        <div className="space-y-6">
          {!submitted ? (
            <>
              {/* Estimation Card */}
              <div className="bg-gradient-to-r from-[#0A2558] to-slate-900 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      Solución Seleccionada
                    </span>
                    <h3 className="font-extrabold text-white text-base">
                      {isPortuguese ? activeSolution.titlePt : activeSolution.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">Inversión Estimada</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">
                      ${calculatedPriceUSD} USD
                    </span>
                    <span className="text-[10px] text-slate-400 block">o ~${calculatedPriceARS} ARS</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Entrega SLA</span>
                      <strong className="text-white">{deliveryDays} Días Hábiles</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Garantía</span>
                      <strong className="text-white">100% Llave en Mano</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Ahorro Estimado</span>
                      <strong className="text-emerald-300">{projectedSavingsUSD}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form to receive complete proposal & PDF */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <p className="text-xs text-slate-300 font-medium">
                  {isPortuguese
                    ? 'Preencha seus dados para agendar a demonstração ao vivo e baixar sua proposta técnica oficial em PDF:'
                    : 'Ingresa tus datos para coordinar una demo guiada de 20 minutos y descargar la propuesta técnica en PDF:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                      {isPortuguese ? 'Seu Nome Completo *' : 'Nombre Completo *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Marcelo Morales"
                      className="w-full bg-[#071120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                      {isPortuguese ? 'Nome da Empresa' : 'Empresa / Negocio'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ej: Distribuidora Patagónica"
                      className="w-full bg-[#071120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                      {isPortuguese ? 'E-mail Comercial *' : 'Email Comercial *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcelo@empresa.com"
                      className="w-full bg-[#071120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                      {isPortuguese ? 'WhatsApp de Contato *' : 'WhatsApp con código de área *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 9 11 ..."
                      className="w-full bg-[#071120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-xs text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded-xl p-2.5">
                    {error}
                  </div>
                )}

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isPortuguese ? 'Modificar Parâmetros' : 'Modificar Parámetros'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isPortuguese ? 'Solicitar Proposta & Demo' : 'Solicitar Propuesta & Demo'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Submission Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-white">
                {isPortuguese ? '¡Cotação e Solicitação Enviadas com Sucesso!' : '¡Cotización y Solicitud Recibidas con Éxito!'}
              </h3>

              <p className="text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
                {isPortuguese
                  ? 'Nossa equipe de consultores entrará em contato via WhatsApp e e-mail em menos de 2 horas úteis para apresentar o plano de ação.'
                  : 'Nuestro equipo se comunicará contigo vía WhatsApp y email en menos de 2 horas hábiles para coordinar la puesta en marcha.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 bg-[#0A2558] hover:bg-[#153a7a] text-white border border-blue-500/30 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{isPortuguese ? 'Baixar Proposta Oficial em PDF' : 'Descargar Propuesta Oficial en PDF'}</span>
                </button>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-xl bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isPortuguese ? 'Fechar' : 'Cerrar'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
