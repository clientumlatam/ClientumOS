import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Bot,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  Globe,
  Building,
  Star,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { getAllIndustrySummaries } from '@clientum/ui';
import { updateDocumentSeo } from '@clientum/ui';
import { useLanguage } from '@clientum/ui';

export function IndustryDirectoryPage() {
  const navigate = useNavigate();
  const { language, setLanguage, isPortuguese } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const allSummaries = getAllIndustrySummaries();

  useEffect(() => {
    updateDocumentSeo({
      title: isPortuguese
        ? 'Soluções por Indústria & Setores | Clientum CRM & WhatsApp IA'
        : 'Soluciones por Industria & Rubros | Clientum CRM & WhatsApp IA',
      description: isPortuguese
        ? 'Conheça nossos ecossistemas digitais com Chatbot WhatsApp IA, CRM e Faturamento especializados para Agro, Contabilidade, Clínicas, Distribuidoras, Imobiliárias e mais.'
        : 'Descubre nuestros ecosistemas digitales con Chatbot WhatsApp IA, CRM Comercial y Facturación AFIP especializados para Agro, Estudios Contables, Clínicas, Distribuidoras, Inmobiliarias y más.',
      keywords: [
        'software por industria',
        'crm verticalizado argentina',
        'chatbot whatsapp agro',
        'chatbot estudio contable afip',
        'sistema distribuidoras mayoristas',
        'software clinicas medicas'
      ],
      canonical: '/industrias',
      locale: isPortuguese ? 'pt-BR' : 'es-AR'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isPortuguese]);

  const filteredSummaries = allSummaries.filter(ind => {
    const q = searchTerm.toLowerCase();
    const name = (isPortuguese ? ind.namePt : ind.name).toLowerCase();
    const tagline = (isPortuguese ? ind.taglinePt : ind.tagline).toLowerCase();
    const keywords = ind.primaryKeywords.join(' ').toLowerCase();
    return name.includes(q) || tagline.includes(q) || keywords.includes(q);
  });

  return (
    <div id="industry-directory-wrapper" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-xs sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>{isPortuguese ? 'Início' : 'Inicio'}</span>
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

          <div className="flex items-center gap-3">
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

            <button
              onClick={() => {
                const waUrl = 'https://wa.me/5492984687000?text=Hola%20Clientum,%20quiero%20consultar%20por%20las%20soluciones%20por%20industria';
                window.open(waUrl, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors"
            >
              {isPortuguese ? 'Falar no WhatsApp' : 'Hablar por WhatsApp'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-slate-100/70 border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
            <Layers className="w-3.5 h-3.5" />
            <span>{isPortuguese ? 'Catálogo de Soluções por Segmento' : 'Catálogo de Soluciones por Rubro'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {isPortuguese
              ? 'Ecossistemas Digitais Especializados por Indústria'
              : 'Ecosistemas Digitales Especializados por Industria'}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isPortuguese
              ? 'Descubra como o Clientum adapta chatbots de WhatsApp com IA, CRM comercial e faturamento para os processos do seu negócio.'
              : 'Descubre cómo Clientum adapta chatbots de WhatsApp con IA, CRM comercial y facturación electrónica a los procesos específicos de tu sector.'}
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isPortuguese ? 'Buscar setor (ex. Agro, Contábil, Saúde...)' : 'Buscar rubro (ej. Agro, Contable, Salud...)'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredSummaries.map(ind => {
            const IconComp = ind.icon;
            return (
              <div
                key={ind.slug}
                onClick={() => navigate(`/industria/${ind.slug}`)}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {isPortuguese ? ind.badgePt : ind.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {isPortuguese ? ind.namePt : ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {isPortuguese ? ind.taglinePt : ind.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ind.primaryKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200/80">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>{isPortuguese ? 'Explorar Landing & Demo' : 'Explorar Landing & Demo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Clientum S.R.L. · Software CRM & Chatbots WhatsApp IA</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-900">Inicio</Link>
            <Link to="/industrias" className="hover:text-slate-900 font-semibold text-emerald-700">Directorio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
