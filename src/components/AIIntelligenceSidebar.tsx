import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Target,
  Send,
  MessageSquare,
  Mail,
  Copy,
  Check,
  Building2,
  Users,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Award,
  Zap,
  Plus,
  CheckCircle2,
  RefreshCw,
  Loader2,
  X
} from 'lucide-react';
import { GeolocatedProspect } from './GeolocatedProspectingTab';

interface AIIntelligenceSidebarProps {
  prospect: GeolocatedProspect | null;
  onClose?: () => void;
  onAddToCrm: (prospect: GeolocatedProspect) => void;
  onRefreshIntelligence: (prospect: GeolocatedProspect) => void;
  isLoading: boolean;
}

export const AIIntelligenceSidebar: React.FC<AIIntelligenceSidebarProps> = ({
  prospect,
  onClose,
  onAddToCrm,
  onRefreshIntelligence,
  isLoading,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeOutreachTab, setActiveOutreachTab] = useState<'whatsapp' | 'email' | 'pitch'>('whatsapp');

  if (!prospect) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center h-full min-h-[460px] space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-extrabold text-slate-800 text-sm">Selecciona una Empresa B2B</h3>
        <p className="text-xs text-slate-500 max-w-[220px]">
          Haz clic en cualquier empresa de la lista o marcador del mapa para desplegar su perfil inteligente y FODA generado por Gemini IA.
        </p>
      </div>
    );
  }

  const analysis = prospect.geminiAnalysis;
  const swot = analysis?.swot;
  const outreach = analysis?.outreachStrategy;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col h-full shadow-xs space-y-4">
      {/* Header with Company details */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border border-indigo-200">
              Gemini 3.6 Flash IA
            </span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Fit Score: {analysis?.fitScore || 88}/100
            </span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-indigo-600" />
            {prospect.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{prospect.category} · {prospect.city}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onRefreshIntelligence(prospect)}
            disabled={isLoading}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all cursor-pointer"
            title="Regenerar análisis con Gemini IA"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-3 flex-1">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-bold text-slate-700">Analizando perfil, FODA y estrategia comercial...</p>
          <p className="text-[11px] text-slate-400">Procesando señales de negocio con Gemini IA</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* Executive Summary */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Resumen Ejecutivo & Dolor Clave
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {analysis?.summary || `${prospect.name} es una empresa líder en ${prospect.category} con sede en ${prospect.city}. Cuenta con gran potencial de modernización comercial en sus canales B2B.`}
            </p>
            {analysis?.painPoint && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80">
                <strong className="text-amber-800 font-bold block mb-0.5">Dolor Detectado:</strong>
                {analysis.painPoint}
              </div>
            )}
          </div>

          {/* Decision Maker & Fit */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
              <span className="text-[10px] text-indigo-600 font-bold block uppercase">Decisor Clave</span>
              <p className="font-bold text-slate-900 mt-0.5 line-clamp-2">
                {analysis?.suggestedDecisionMaker || 'Director Comercial / Operaciones'}
              </p>
            </div>
            <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-emerald-700 font-bold block uppercase">Solución Sugerida</span>
              <p className="font-bold text-slate-900 mt-0.5 line-clamp-2">
                {analysis?.recommendedProduct || 'Clientum CRM + Bot WhatsApp 24/7'}
              </p>
            </div>
          </div>

          {/* SWOT / FODA Analysis */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Matriz FODA / SWOT Gemini
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {/* Strengths */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-black text-emerald-800 uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Fortalezas (F)
                </span>
                <ul className="space-y-1 text-slate-700">
                  {swot?.strengths && swot.strengths.length > 0 ? (
                    swot.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">·</span>
                        <span>{s}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-1"><span className="text-emerald-600 font-bold">·</span> Marca reconocida en {prospect.city}.</li>
                      <li className="flex items-start gap-1"><span className="text-emerald-600 font-bold">·</span> Calificación de {prospect.rating}★ en Google Maps.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-black text-amber-800 uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Debilidades (D)
                </span>
                <ul className="space-y-1 text-slate-700">
                  {swot?.weaknesses && swot.weaknesses.length > 0 ? (
                    swot.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{w}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-1"><span className="text-amber-600 font-bold">·</span> Atención manual por WhatsApp.</li>
                      <li className="flex items-start gap-1"><span className="text-amber-600 font-bold">·</span> Falta de pipeline visual centralizado.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-indigo-50/70 border border-indigo-200/80 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-black text-indigo-800 uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Oportunidades (O)
                </span>
                <ul className="space-y-1 text-slate-700">
                  {swot?.opportunities && swot.opportunities.length > 0 ? (
                    swot.opportunities.map((o, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-indigo-600 font-bold">·</span>
                        <span>{o}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-1"><span className="text-indigo-600 font-bold">·</span> Escalamiento de cotizaciones con IA.</li>
                      <li className="flex items-start gap-1"><span className="text-indigo-600 font-bold">·</span> Facturación automática AFIP integrada.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Threats */}
              <div className="bg-rose-50/70 border border-rose-200/80 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-black text-rose-800 uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Amenazas (A)
                </span>
                <ul className="space-y-1 text-slate-700">
                  {swot?.threats && swot.threats.length > 0 ? (
                    swot.threats.map((t, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-600 font-bold">·</span>
                        <span>{t}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-1"><span className="text-rose-600 font-bold">·</span> Competidores con respuesta comercial 24/7.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Outreach Strategy */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                Estrategia de Outreach Recomendada
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {outreach?.recommendedChannel || 'WhatsApp Directo'}
              </span>
            </div>

            {/* Outreach Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 text-xs">
              <button
                onClick={() => setActiveOutreachTab('whatsapp')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeOutreachTab === 'whatsapp' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveOutreachTab('email')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeOutreachTab === 'email' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>Cold Email</span>
              </button>
              <button
                onClick={() => setActiveOutreachTab('pitch')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeOutreachTab === 'pitch' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>Talking Points</span>
              </button>
            </div>

            {/* Tab content */}
            {activeOutreachTab === 'whatsapp' && (
              <div className="bg-emerald-950 text-emerald-100 p-3.5 rounded-xl space-y-2 text-xs font-sans relative border border-emerald-800 shadow-inner">
                <div className="flex items-center justify-between text-emerald-300 text-[10px] font-mono border-b border-emerald-800 pb-1.5">
                  <span>Mensaje directo para WhatsApp:</span>
                  <button
                    onClick={() => handleCopy(outreach?.whatsappMessage || analysis?.openingPitch || '', 'whatsapp')}
                    className="flex items-center gap-1 text-emerald-300 hover:text-white cursor-pointer font-bold"
                  >
                    {copiedKey === 'whatsapp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'whatsapp' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-emerald-50">
                  {outreach?.whatsappMessage || analysis?.openingPitch || `Hola! Te contacto desde Clientum. Analizamos el perfil comercial de ${prospect.name} y tenemos una propuesta ágil para automatizar cotizaciones y WhatsApp con IA.`}
                </p>
                {prospect.phone && (
                  <div className="pt-1.5 flex justify-end">
                    <a
                      href={`https://wa.me/${prospect.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(outreach?.whatsappMessage || analysis?.openingPitch || '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-xs cursor-pointer transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>Abrir Chat en WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeOutreachTab === 'email' && (
              <div className="bg-indigo-950 text-indigo-100 p-3.5 rounded-xl space-y-2 text-xs relative border border-indigo-800 shadow-inner">
                <div className="flex items-center justify-between text-indigo-300 text-[10px] font-mono border-b border-indigo-800 pb-1.5">
                  <span className="truncate pr-2">Asunto: {outreach?.emailSubject || `Oportunidad comercial para ${prospect.name}`}</span>
                  <button
                    onClick={() => handleCopy(`${outreach?.emailSubject}\n\n${outreach?.emailBody}`, 'email')}
                    className="flex items-center gap-1 text-indigo-300 hover:text-white cursor-pointer font-bold shrink-0"
                  >
                    {copiedKey === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'email' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="text-xs leading-relaxed text-indigo-100 whitespace-pre-line max-h-48 overflow-y-auto">
                  {outreach?.emailBody || `Estimado equipo directivo de ${prospect.name},\n\nNos ponemos en contacto desde Clientum para presentarles nuestra plataforma de automatización de ventas y CRM para ${prospect.category}.\n\n¿Tendrán 15 minutos esta semana para una demo rápida?\n\nSaludos cordiales.`}
                </div>
              </div>
            )}

            {activeOutreachTab === 'pitch' && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Puntos Clave para la Llamada / Reunión:</span>
                <ul className="space-y-1.5 text-slate-700">
                  {outreach?.keyTalkingPoints && outreach.keyTalkingPoints.length > 0 ? (
                    outreach.keyTalkingPoints.map((tp, i) => (
                      <li key={i} className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tp}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Demostrar respuesta en &lt;10 seg a cotizaciones con WhatsApp IA.</span>
                      </li>
                      <li className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Conexión automática de prospectos con el CRM y facturación AFIP.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Action: Add to CRM */}
      <div className="border-t border-slate-100 pt-3">
        {prospect.crmStatus === 'No Contactado' ? (
          <button
            onClick={() => onAddToCrm(prospect)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir a Pipeline CRM</span>
          </button>
        ) : (
          <div className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Empresa Registrada en CRM ({prospect.crmStatus})</span>
          </div>
        )}
      </div>
    </div>
  );
};
