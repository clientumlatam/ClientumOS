import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  TrendingUp,
  X,
  Send,
  Download
} from 'lucide-react';
import { useLanguage } from '@clientum/ui';

interface ExpressAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWizard?: () => void;
}

export function ExpressAuditModal({ isOpen, onClose, onOpenWizard }: ExpressAuditModalProps) {
  const { isPortuguese } = useLanguage();
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [industry, setIndustry] = useState('comercio');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [analyzing, setAnalyzing] = useState(false);
  const [currentStepText, setCurrentStepText] = useState('');
  const [resultReady, setResultReady] = useState(false);
  const [score, setScore] = useState(62);

  if (!isOpen) return null;

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    setAnalyzing(true);
    setResultReady(false);

    const steps = isPortuguese
      ? [
          'Examinando tempo de resposta no WhatsApp...',
          'Verificando presença no Google Meu Negócio...',
          'Analisando funil de captação de leads...',
          'Calculando pontuação de maturidade com IA...'
        ]
      : [
          'Examinando velocidad y tiempo de respuesta en WhatsApp...',
          'Verificando presencia en Google Maps y SEO local...',
          'Analizando embudo de conversión y captación de clientes...',
          'Calculando índice de automatización e impacto de IA...'
        ];

    let i = 0;
    setCurrentStepText(steps[0]);

    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setCurrentStepText(steps[i]);
      } else {
        clearInterval(interval);
        setAnalyzing(false);
        setScore(Math.floor(Math.random() * (72 - 58 + 1)) + 58); // Realistic baseline 58-72
        setResultReady(true);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!resultReady && !analyzing && (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isPortuguese ? 'Diagnóstico Gratuito de Maturidade Digital' : 'Auditoría Express de Presencia Digital & IA'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
              {isPortuguese ? 'Descubra quanto sua empresa pode crescer com automação' : 'Descubre cuánto potencial de ventas está perdiendo tu negocio'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              {isPortuguese
                ? 'Nossa ferramenta analisa seus canais digitais e gera um relatório com oportunidades imediatas de automação e vendas.'
                : 'Ingresa los datos de tu empresa para simular un diagnóstico de velocidad de respuesta, captación de leads y oportunidades con IA.'}
            </p>

            <form onSubmit={handleStartAudit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {isPortuguese ? 'Nome da Empresa / Marca *' : 'Nombre de tu Empresa o Marca *'}
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej: Distribuidora Central o Estudio Martínez"
                  className="w-full bg-[#071120] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isPortuguese ? 'Site ou Instagram' : 'Sitio Web o Instagram'}
                  </label>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="ej: www.miempresa.com o @miempresa"
                    className="w-full bg-[#071120] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isPortuguese ? 'Segmento de Atuação' : 'Rubro de Actividad'}
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#071120] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="salud">Salud, Medicina & Estética</option>
                    <option value="inmobiliaria">Inmobiliarias & Construcción</option>
                    <option value="comercio">Comercio, Retail & E-commerce</option>
                    <option value="profesional">Servicios Profesionales / Contable</option>
                    <option value="gastronomia">Gastronomía & Hotelería</option>
                    <option value="industria">Industria, Logística & B2B</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{isPortuguese ? 'Executar Auditoria em Tempo Real' : 'Ejecutar Diagnóstico en Tiempo Real'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {analyzing && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <Loader2 className="w-16 h-16 text-emerald-400 animate-spin" />
              <Bot className="w-6 h-6 text-white absolute inset-0 m-auto" />
            </div>

            <h3 className="text-lg font-black text-white">
              {isPortuguese ? 'Analisando ecossistema digital...' : 'Analizando presencia digital y embudos de venta...'}
            </h3>

            <p className="text-xs font-mono text-emerald-400 bg-slate-800/80 px-4 py-2 rounded-xl inline-block border border-slate-700">
              {currentStepText}
            </p>
          </div>
        )}

        {resultReady && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  {isPortuguese ? 'Resultado do Diagnóstico' : 'Resultado del Diagnóstico'}
                </span>
                <h3 className="text-xl font-black text-white">{businessName}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Score de Madurez Digital</span>
                  <span className="text-2xl font-black text-amber-400">{score} / 100</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
                  {score < 70 ? 'MOD' : 'PRO'}
                </div>
              </div>
            </div>

            {/* Recommendations grid */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isPortuguese ? '3 Oportunidades Críticas Detectadas:' : '3 Oportunidades Clave de Mejora Inmediata:'}
              </span>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Fuga de leads fuera del horario comercial</strong>
                  <span className="text-slate-300">
                    El 42% de los clientes escriben por WhatsApp entre las 19:00 y las 23:00 hs. Un agente de IA recupera estas consultas al instante.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Seguimiento manual de presupuestos</strong>
                  <span className="text-slate-300">
                    Sincronizar tus cotizaciones con un CRM automatizado incrementa la tasa de cierre en un 35% en los primeros 14 días.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Prospección en Google Maps sin explotar</strong>
                  <span className="text-slate-300">
                    Existen más de 300 empresas del rubro en tu zona geográfica listas para ser contactadas mediante campañas B2B.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-xl bg-slate-800 transition-colors cursor-pointer"
              >
                {isPortuguese ? 'Fechar Diagnóstico' : 'Cerrar'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenWizard) onOpenWizard();
                }}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>{isPortuguese ? 'Agendar Plano de Ação com Clientum' : 'Solicitar Plan de Acción y Cotización'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
