import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Building,
  FileText,
  Clock,
  ArrowUpRight,
  Globe,
  Layers,
  Send,
  Loader2,
  Check,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Search
} from 'lucide-react';
import {
  getIndustryBySlug,
  getAllIndustrySummaries,
  getRelatedIndustries,
  IndustryLandingData
} from '../../data/industryLandings';
import { updateDocumentSeo, buildIndustryStructuredData } from '../../utils/seoHelpers';
import { useLanguage } from '../../lib/i18n';
import { IndustryWhatsAppSimulator } from './IndustryWhatsAppSimulator';
import { InteractiveQuoteWizard } from './InteractiveQuoteWizard';
import { ExpressAuditModal } from './ExpressAuditModal';

interface IndustryLandingPageProps {
  customSlug?: string;
  onOpenWizard?: () => void;
  onOpenAudit?: () => void;
}

export function IndustryLandingPage({
  customSlug,
  onOpenWizard,
  onOpenAudit
}: IndustryLandingPageProps) {
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isPortuguese } = useLanguage();

  // Determine effective slug from props, route params, or raw pathname
  const effectiveSlug = (
    customSlug ||
    routeSlug ||
    location.pathname.replace(/^\/+|\/+$/g, '').replace(/^industria\//, '') ||
    'agro'
  );

  const industryData: IndustryLandingData | null = getIndustryBySlug(effectiveSlug);
  const allIndustries = getAllIndustrySummaries();
  const relatedIndustries = getRelatedIndustries(industryData?.slug || 'agro', 3);

  // State for interactive modals
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSize, setLeadSize] = useState('');
  const [leadNotes, setLeadNotes] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Dynamic SEO Update on Mount / Slug / Language change
  useEffect(() => {
    if (!industryData) return;

    const title = isPortuguese ? industryData.seo.titlePt : industryData.seo.title;
    const description = isPortuguese ? industryData.seo.descriptionPt : industryData.seo.description;
    const industryName = isPortuguese ? industryData.namePt : industryData.name;

    const structuredData = buildIndustryStructuredData({
      industryName,
      industrySlug: industryData.slug,
      description,
      faqs: industryData.faq.map(f => ({
        question: isPortuguese ? f.questionPt : f.question,
        answer: isPortuguese ? f.answerPt : f.answer
      })),
      canonicalUrl: industryData.seo.canonical
    });

    updateDocumentSeo({
      title,
      description,
      keywords: industryData.seo.keywords,
      canonical: industryData.seo.canonical,
      ogType: 'website',
      locale: isPortuguese ? 'pt-BR' : 'es-AR',
      jsonLd: structuredData
    });

    // Scroll to top upon landing navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [industryData, isPortuguese]);

  // If slug was not recognized, render graceful 404 / Selector view
  if (!industryData) {
    return (
      <div id="industry-not-found-view" className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isPortuguese ? 'Voltar para Início' : 'Volver al Inicio'}</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="font-bold text-slate-900 tracking-tight">Clientum · Soluciones por Industria</span>
          </div>
          <Link
            to="/industrias"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{isPortuguese ? 'Ver todas as indústrias' : 'Ver todas las industrias'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {isPortuguese ? 'Indústria não encontrada' : 'Industria no encontrada'}
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            {isPortuguese
              ? 'Não encontramos uma página específica para esta URL. Explore nossos setores especializados abaixo:'
              : 'No encontramos una página específica para esa dirección. Elige uno de nuestros sectores especializados a continuación:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {allIndustries.map(ind => {
              const IconComp = ind.icon;
              return (
                <button
                  key={ind.slug}
                  onClick={() => navigate(`/industria/${ind.slug}`)}
                  className="p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                      {isPortuguese ? ind.namePt : ind.name}
                    </h3>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>{isPortuguese ? 'Ver solução' : 'Ver solución'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          Clientum S.R.L. · Software CRM, Facturación AFIP & Chatbots WhatsApp IA
        </footer>
      </div>
    );
  }

  const IndustryIcon = industryData.icon;
  const currentLangName = isPortuguese ? industryData.namePt : industryData.name;
  const currentLangHeadline = isPortuguese ? industryData.hero.headlinePt : industryData.hero.headline;
  const currentLangHighlight = isPortuguese ? industryData.hero.highlightPt : industryData.hero.highlight;
  const currentLangSubheadline = isPortuguese ? industryData.hero.subheadlinePt : industryData.hero.subheadline;
  const currentBadgePill = isPortuguese ? industryData.hero.badgePillPt : industryData.hero.badgePill;
  const currentPrompt = isPortuguese ? industryData.whatsappPromptPt : industryData.whatsappPrompt;

  const handleOpenLeadWhatsapp = () => {
    const waUrl = `https://wa.me/5492984687000?text=${encodeURIComponent(
      currentPrompt + (leadName ? ` (Contacto: ${leadName} - ${leadCompany})` : '')
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setIsSubmittingLead(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          company: leadCompany,
          phone: leadPhone,
          email: leadEmail,
          industry: industryData.slug,
          size: leadSize,
          notes: leadNotes,
          source: `Landing Industria: ${industryData.name}`,
          createdAt: new Date().toISOString()
        })
      });
    } catch {
      // Ignore network errors in preview
    } finally {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
    }
  };

  return (
    <div id="industry-landing-wrapper" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. TOP HEADER & INDUSTRY SWITCHER */}
      <header id="industry-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Back button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-xs sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Volver al sitio principal"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">{isPortuguese ? 'Sitio Principal' : 'Sitio Principal'}</span>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:bg-emerald-800 transition-colors">
                C
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                Clientum<span className="text-emerald-600">.</span>
              </span>
            </Link>
          </div>

          {/* Current Industry Badge & Dropdown Navigation */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-semibold">
              <IndustryIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[180px]">{currentLangName}</span>
            </div>

            {/* Quick Sector Chips */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              {allIndustries.slice(0, 4).map(ind => {
                const isActive = ind.slug === industryData.slug;
                return (
                  <button
                    key={ind.slug}
                    onClick={() => navigate(`/industria/${ind.slug}`)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {isPortuguese ? ind.namePt.split(',')[0] : ind.name.split(',')[0]}
                  </button>
                );
              })}
              <Link
                to="/industrias"
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <span>+{allIndustries.length - 4} {isPortuguese ? 'mais' : 'más'}</span>
              </Link>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setLanguage('es-AR')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'es-AR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('pt-BR')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'pt-BR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                PT
              </button>
            </div>

            {/* CTA Wizard / Quote */}
            <button
              onClick={() => setIsWizardOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPortuguese ? 'Cotador Express' : 'Cotizador Express'}</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <button
              onClick={handleOpenLeadWhatsapp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span className="hidden sm:inline">{isPortuguese ? 'Falar no WhatsApp' : 'Hablar por WhatsApp'}</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. BREADCRUMBS */}
      <nav id="industry-breadcrumbs" aria-label="Breadcrumbs" className="bg-white border-b border-slate-200/60 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <Link to="/" className="hover:text-slate-900 transition-colors shrink-0">
            {isPortuguese ? 'Início' : 'Inicio'}
          </Link>
          <span>/</span>
          <Link to="/industrias" className="hover:text-slate-900 transition-colors shrink-0">
            {isPortuguese ? 'Indústrias & Soluções' : 'Industrias & Soluciones'}
          </Link>
          <span>/</span>
          <span className="text-emerald-700 font-semibold truncate">
            {currentLangName}
          </span>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section id="industry-hero-section" className="relative bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 border-b border-slate-200 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{currentBadgePill}</span>
            </div>

            {/* Display H1 Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {currentLangHeadline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700">
                {currentLangHighlight}
              </span>
            </h1>

            {/* Sector Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {currentLangSubheadline}
            </p>

            {/* Value Bullets */}
            <div className="space-y-2.5 pt-2">
              {industryData.hero.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span>{isPortuguese ? bullet.textPt : bullet.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={handleOpenLeadWhatsapp}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{isPortuguese ? 'Ver Demonstração no WhatsApp' : 'Ver Demo en WhatsApp'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsWizardOpen(true)}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm sm:text-base rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{isPortuguese ? 'Calcular Orçamento' : 'Cotizar mi Negocio'}</span>
              </button>

              <button
                onClick={() => setIsAuditOpen(true)}
                className="px-4 py-3.5 text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:underline"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isPortuguese ? 'Diagnóstico Express Grátis' : 'Diagnóstico Express Gratis'}</span>
              </button>
            </div>

            {/* Regional / Proof Badges */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {isPortuguese ? 'API Oficial Meta Cloud' : 'API Oficial Meta Cloud'}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                {isPortuguese ? 'Emissão de Notas Fiscais' : 'Facturación Electrónica AFIP'}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" />
                {isPortuguese ? 'Homologado na América Latina' : 'Homologado en Argentina & Brasil'}
              </span>
            </div>
          </div>

          {/* Right Column: Key Quantitative ROI Stats & Highlight Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none -z-0" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                      <IndustryIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {currentLangName}
                      </h3>
                      <p className="text-xs text-emerald-700 font-semibold">
                        {isPortuguese ? industryData.badgePt : industryData.badge}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md">
                    2026 Ready
                  </span>
                </div>

                {/* 3 Key Stats */}
                <div className="space-y-4">
                  {industryData.metrics.map((metric, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                      <div className="font-black text-2xl text-emerald-700 shrink-0 min-w-[75px]">
                        {metric.value}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-slate-900">
                          {isPortuguese ? metric.labelPt : metric.label}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          {isPortuguese ? metric.detailPt : metric.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Action button inside card */}
                <button
                  onClick={handleOpenLeadWhatsapp}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>{isPortuguese ? 'Experimentar Robô deste Setor' : 'Probar Bot de este Sector'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE WHATSAPP SIMULATOR FOR THIS SPECIFIC SECTOR */}
      <section id="industry-simulator-section" className="py-12 sm:py-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              <Bot className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Simulador em Tempo Real' : 'Simulador en Tiempo Real'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isPortuguese
                ? `Veja como o Chatbot atende clientes de ${currentLangName}`
                : `Mira cómo el Chatbot atiende clientes de ${currentLangName}`}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {isPortuguese
                ? 'Envie mensagens, clique nas respostas rápidas ou faça perguntas técnicas para ver a inteligência artificial responder instantaneamente.'
                : 'Envía mensajes, haz clic en las respuestas rápidas o consulta dudas técnicas para ver a la inteligencia artificial responder al instante.'}
            </p>
          </div>

          {/* Embedded WhatsApp Simulator with industry pre-selected */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-6 shadow-xs">
            <IndustryWhatsAppSimulator
              initialIndustryId={industryData.simulatorId}
              onOpenWizard={() => setIsWizardOpen(true)}
              onOpenAudit={() => setIsAuditOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* 5. BEFORE VS. AFTER COMPARISON (PAIN POINTS & SOLUTIONS) */}
      <section id="industry-comparison-section" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Comparativo de Eficiência' : 'Comparativa de Eficiencia'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isPortuguese ? 'A forma tradicional vs. Com a Clientum' : 'La forma tradicional vs. Con Clientum'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {isPortuguese
                ? `Principais desafios operacionais em ${currentLangName} e como automatizá-los com precisão.`
                : `Principales dolores operativos en ${currentLangName} y cómo los automatizamos con precisión.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryData.painPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all text-left"
              >
                <div className="space-y-4">
                  {/* Problem */}
                  <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>{isPortuguese ? 'Antes / Desafio' : 'Antes / Problema'}</span>
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {isPortuguese ? item.problemPt : item.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isPortuguese ? 'Com a Clientum' : 'Con Clientum'}</span>
                    </div>
                    <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                      {isPortuguese ? item.solutionPt : item.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-emerald-700">
                    {isPortuguese ? 'Automação Ativa' : 'Automatización Activa'}
                  </span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEEP VERTICAL FEATURES & CAPABILITIES */}
      <section id="industry-features-section" className="py-12 sm:py-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              <Zap className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Funcionalidades Especializadas' : 'Funcionalidades Especializadas'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isPortuguese
                ? `Tecnologia desenhada para o dia a dia de ${currentLangName}`
                : `Tecnología diseñada para el día a día de ${currentLangName}`}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {isPortuguese
                ? 'Módulos nativos configurados para as regras de negócio, tabelas de preços e particularidades do seu setor.'
                : 'Módulos nativos configurados para las reglas de negocio, listas de precios y particularidades de tu rubro.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryData.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all group text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      {isPortuguese ? feat.tagPt : feat.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {isPortuguese ? feat.titlePt : feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isPortuguese ? feat.descriptionPt : feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>{isPortuguese ? 'Ver detalhes do módulo' : 'Ver detalle del módulo'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL CUSTOMER CASE STUDY & TESTIMONIAL */}
      <section id="industry-case-study-section" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 p-6 sm:p-10 lg:p-12 relative overflow-hidden text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Challenge, Result & Logo */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs tracking-wider uppercase">
                    {industryData.caseStudy.logoText}
                  </div>
                  <span className="text-xs text-slate-400">
                    📍 {industryData.caseStudy.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {industryData.caseStudy.company}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-1">
                    <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">
                      {isPortuguese ? 'Desafio Inicial' : 'Desafío Inicial'}
                    </span>
                    <p className="text-slate-300">
                      {isPortuguese ? industryData.caseStudy.challengePt : industryData.caseStudy.challenge}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/40 space-y-1">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                      {isPortuguese ? 'Resultado Alcançado' : 'Resultado Obtenido'}
                    </span>
                    <p className="text-emerald-100 font-medium">
                      {isPortuguese ? industryData.caseStudy.resultPt : industryData.caseStudy.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote & Author Profile */}
              <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                  "{isPortuguese ? industryData.caseStudy.quotePt : industryData.caseStudy.quote}"
                </blockquote>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {industryData.caseStudy.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">
                      {industryData.caseStudy.author}
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">
                      {industryData.caseStudy.role} · {industryData.caseStudy.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUICK SECTOR LEAD CAPTURE FORM */}
      <section id="industry-lead-form-section" className="py-12 sm:py-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs text-left">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>{isPortuguese ? 'Consulta Especializada' : 'Consulta Especializada'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {isPortuguese
                  ? `Solicite uma proposta personalizada para ${currentLangName}`
                  : `Solicita una propuesta personalizada para ${currentLangName}`}
              </h2>
              <p className="text-slate-600 text-sm">
                {isPortuguese
                  ? 'Preencha os dados e nosso especialista entrará em contato em menos de 15 minutos pelo WhatsApp.'
                  : 'Completa los datos y un asesor especialista se comunicará en menos de 15 minutos por WhatsApp.'}
              </p>
            </div>

            {leadSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 font-black" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {isPortuguese ? 'Consulta Recebida com Sucesso!' : '¡Consulta Recibida con Éxito!'}
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {isPortuguese
                    ? `Obrigado, ${leadName}. Já preparamos o modelo comercial para ${currentLangName}. Se preferir iniciar agora, clique no botão abaixo:`
                    : `Gracias, ${leadName}. Ya preparamos el modelo comercial para ${currentLangName}. Si prefieres iniciar ahora mismo, haz clic abajo:`}
                </p>
                <button
                  onClick={handleOpenLeadWhatsapp}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isPortuguese ? 'Continuar no WhatsApp' : 'Continuar en WhatsApp'}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isPortuguese ? 'Seu Nome / Responsável' : 'Tu Nombre / Responsable'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isPortuguese ? 'Nome da Empresa / Negócio' : 'Nombre de la Empresa / Negocio'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isPortuguese ? 'Ex. Fazenda Sul / Distribuidora' : 'Ej. Agronomía del Valle SRL'}
                      value={leadCompany}
                      onChange={e => setLeadCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isPortuguese ? 'WhatsApp de Contato' : 'WhatsApp de Contacto'} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +54 9 298 468-7000"
                      value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isPortuguese ? 'E-mail Corporativo' : 'Email Corporativo'}
                    </label>
                    <input
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={leadEmail}
                      onChange={e => setLeadEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isPortuguese ? 'Tamanho Operacional / Consultas Mensais' : 'Tamaño Operativo / Consultas Mensuales'}
                  </label>
                  <select
                    value={leadSize}
                    onChange={e => setLeadSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                  >
                    <option value="">{isPortuguese ? 'Selecione uma faixa' : 'Selecciona un rango'}</option>
                    <option value="1_a_10_empleados">{isPortuguese ? '1 a 5 pessoas · Menos de 100 conversas/dia' : '1 a 5 personas · Menos de 100 consultas/día'}</option>
                    <option value="10_a_50_empleados">{isPortuguese ? '5 a 20 pessoas · 100 a 500 conversas/dia' : '5 a 20 personas · 100 a 500 consultas/día'}</option>
                    <option value="mas_de_50">{isPortuguese ? 'Mais de 20 pessoas · Mais de 500 conversas/dia' : 'Más de 20 personas · Más de 500 consultas/día'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isPortuguese ? 'Desafio ou Detalhe adicional' : 'Desafío o Detalle adicional'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={isPortuguese ? 'Ex. Preciso integrar com nosso ERP e faturamento automático...' : 'Ej. Queremos automatizar la toma de pedidos y sincronizar con facturación...'}
                    value={leadNotes}
                    onChange={e => setLeadNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <span className="text-xs text-slate-500">
                    🔒 {isPortuguese ? 'Seus dados estão protegidos com total sigilo.' : 'Tus datos están protegidos con estricta confidencialidad.'}
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmittingLead ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isPortuguese ? 'Enviando...' : 'Enviando...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isPortuguese ? 'Enviar Solicitação' : 'Enviar Solicitud'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION WITH SCHEMA.ORG INTEGRATION */}
      <section id="industry-faq-section" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-800 text-xs font-bold rounded-full">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Perguntas Frequentes' : 'Preguntas Frecuentes'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isPortuguese
                ? `Dúvidas comuns sobre a solução para ${currentLangName}`
                : `Preguntas frecuentes sobre ${currentLangName}`}
            </h2>
          </div>

          <div className="space-y-3">
            {industryData.faq.map((faqItem, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all text-left shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base text-left hover:bg-slate-50 transition-colors"
                  >
                    <span>{isPortuguese ? faqItem.questionPt : faqItem.question}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      {isPortuguese ? faqItem.answerPt : faqItem.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CROSS-INDUSTRY NAVIGATION & SEO INTERNAL LINKS */}
      <section id="industry-crosslinks-section" className="py-12 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isPortuguese ? 'Outros Setores & Soluções Verticalizadas' : 'Otros Sectores & Soluciones Verticalizadas'}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isPortuguese ? 'Conheça nossos ecossistemas digitais por segmento:' : 'Conoce nuestros ecosistemas digitales por rubro:'}
              </p>
            </div>
            <Link
              to="/industrias"
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{isPortuguese ? 'Ver todas as 10 indústrias' : 'Ver las 10 industrias'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
            {allIndustries.map(ind => {
              const isCurrent = ind.slug === industryData.slug;
              const IconItem = ind.icon;
              return (
                <button
                  key={ind.slug}
                  disabled={isCurrent}
                  onClick={() => navigate(`/industria/${ind.slug}`)}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between text-left ${
                    isCurrent
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/50 cursor-default'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-emerald-500 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCurrent ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      <IconItem className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 text-xs">
                      {isPortuguese ? ind.namePt : ind.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                    <span className="truncate">{ind.primaryKeywords[0]}</span>
                    {isCurrent ? (
                      <span className="text-emerald-700 font-bold">{isPortuguese ? 'Atual' : 'Actual'}</span>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FINAL FOOTER */}
      <footer id="industry-footer" className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                C
              </div>
              <span className="font-bold text-white text-base">Clientum</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {isPortuguese
                ? 'Plataforma líder em Chatbots WhatsApp IA, CRM Comercial e Faturamento para empresas na América Latina.'
                : 'Plataforma líder en Chatbots WhatsApp IA, CRM Comercial y Facturación AFIP para PyMEs en Argentina y Latinoamérica.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              {isPortuguese ? 'Indústrias' : 'Industrias'}
            </h4>
            <ul className="space-y-1.5">
              <li><Link to="/agro" className="hover:text-emerald-400">Agro & Insumos</Link></li>
              <li><Link to="/estudios-contables" className="hover:text-emerald-400">Estudios Contables & AFIP</Link></li>
              <li><Link to="/distribuidoras" className="hover:text-emerald-400">Distribuidoras Mayoristas</Link></li>
              <li><Link to="/salud" className="hover:text-emerald-400">Clínicas & Turnos Médicos</Link></li>
              <li><Link to="/inmobiliaria" className="hover:text-emerald-400">Inmobiliarias & Propiedades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              {isPortuguese ? 'Mais Soluções' : 'Más Soluciones'}
            </h4>
            <ul className="space-y-1.5">
              <li><Link to="/gastronomia" className="hover:text-emerald-400">Gastronomía & Reservas</Link></li>
              <li><Link to="/ecommerce" className="hover:text-emerald-400">E-Commerce & Carritos</Link></li>
              <li><Link to="/b2b" className="hover:text-emerald-400">Servicios B2B & Consultoras</Link></li>
              <li><Link to="/construccion" className="hover:text-emerald-400">Construcción & Corralones</Link></li>
              <li><Link to="/automotor" className="hover:text-emerald-400">Automotor & Concesionarias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              {isPortuguese ? 'Contato & Suporte' : 'Contacto & Soporte'}
            </h4>
            <p className="text-slate-400 mb-2">WhatsApp: +54 9 298 468-7000</p>
            <p className="text-slate-400 mb-2">Soporte: soporte@clientum.com.ar</p>
            <p className="text-slate-400">General Roca, Río Negro, Argentina</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Clientum S.R.L. · Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-400">Inicio</Link>
            <Link to="/industrias" className="hover:text-slate-400">Directorio de Industrias</Link>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP CTA FOR MOBILE/DESKTOP */}
      <div id="industry-floating-cta" className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={handleOpenLeadWhatsapp}
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <MessageSquare className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline">
            {isPortuguese ? `Consultar para ${currentLangName}` : `Consultar para ${currentLangName}`}
          </span>
          <span className="sm:hidden">WhatsApp</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <InteractiveQuoteWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialSolution="whatsapp_ai"
      />

      <ExpressAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onOpenWizard={() => {
          setIsAuditOpen(false);
          setIsWizardOpen(true);
        }}
      />
    </div>
  );
}
