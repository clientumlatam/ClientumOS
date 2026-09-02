import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Volume2,
  Briefcase,
  MessageCircle,
  Zap,
  Heart,
  Crown,
  Cpu,
  Loader2,
  RefreshCw,
  Share2,
  CheckCircle2,
  Layers,
  Filter,
  Lightbulb
} from 'lucide-react';

export interface CopyItem {
  format: string;
  headline: string;
  content: string;
  cta: string;
}

export interface BrandVoiceOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
}

const BRAND_VOICES: BrandVoiceOption[] = [
  {
    id: 'professional',
    name: 'Profesional & B2B',
    description: 'Corporativo, enfocado en ROI, eficiencia operativa y datos clave.',
    icon: Briefcase,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    badge: 'Formal & Ejecutivo'
  },
  {
    id: 'conversational',
    name: 'Cercano & Conversacional',
    description: 'Fresco, directo y amigable. De vos a vos como colega de confianza.',
    icon: MessageCircle,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    badge: 'Cotidiano & Fresco'
  },
  {
    id: 'bold',
    name: 'Audaz & Alta Conversión',
    description: 'Provocativo, directo al dolor, urgente con llamados a la acción potentes.',
    icon: Zap,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    badge: 'Directo & Persuasivo'
  },
  {
    id: 'empathetic',
    name: 'Empático & Consultivo',
    description: 'Asesor de confianza. Comprensión profunda de desafíos reales.',
    icon: Heart,
    color: 'bg-rose-50 border-rose-200 text-rose-700',
    badge: 'Humano & Asesor'
  },
  {
    id: 'luxury',
    name: 'Exclusivo & Premium',
    description: 'Sofisticado, distinguido, destacando estatus y máxima calidad.',
    icon: Crown,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    badge: 'Alto Nivel & Estatus'
  },
  {
    id: 'technical',
    name: 'Técnico & Especializado',
    description: 'Precisión innovadora en IA, CRM, automatización y arquitectura.',
    icon: Cpu,
    color: 'bg-sky-50 border-sky-200 text-sky-700',
    badge: 'Tech & Innovación'
  }
];

const PRESET_PROMPTS = [
  'Software CRM B2B con automatización de WhatsApp y facturación AFIP para PyMEs',
  'Agencia de Marketing Digital especializada en generación de leads cualificados',
  'Estudio Contable y Asesoría Fiscal para empresas tecnológicas en expansión',
  'Desarrollo Inmobiliario exclusivo en San Carlos de Bariloche con vista al lago'
];

const LOCAL_STORAGE_KEY = 'clientum_copywriter_brand_voice';

export function CopywriterTab() {
  const [prompt, setPrompt] = useState('Software CRM para empresas B2B en LATAM con automatización de ventas...');
  const [selectedVoice, setSelectedVoice] = useState<string>('professional');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [generatedCopies, setGeneratedCopies] = useState<CopyItem[]>([
    {
      format: 'Anuncio de LinkedIn (B2B)',
      headline: 'Optimizá tu gestión comercial B2B sin sumar fricción operativa',
      content: 'Las empresas líderes en LATAM reducen sus tiempos de respuesta en un 60% integrando CRM y automatización de WhatsApp. Clientum centraliza tus prospectos y acelera el cierre de negocios.',
      cta: 'Agendá una demostración ejecutiva de 15 minutos'
    },
    {
      format: 'Meta Ads (Instagram & Facebook)',
      headline: '¿Tu equipo sigue perdiendo tiempo en seguimientos manuales?',
      content: 'Automatizá las respuestas por WhatsApp, organizá tu embudo de ventas y facturá directamente sin salir de Clientum.',
      cta: 'Probá Clientum gratis hoy'
    },
    {
      format: 'Asunto y Vista Previa de Correo Frío',
      headline: '¿Cómo automatizar tu canal de ventas este trimestre?',
      content: 'Estimado/a, notamos que muchas PyMEs de la región enfrentan cuellos de botella al calificar prospectos. Diseñamos un sistema integral de WhatsApp CRM que resuelve este desafío desde el día 1.',
      cta: '¿Tenés 10 minutos esta semana para ver una prueba personalizada?'
    }
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load persisted brand voice on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored && BRAND_VOICES.some(v => v.id === stored)) {
        setSelectedVoice(stored);
      }
    } catch (e) {
      console.warn('[CopywriterTab] Could not read brand voice from localStorage:', e);
    }
  }, []);

  // Handle brand voice change & persist to localStorage
  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, voiceId);
    } catch (e) {
      console.warn('[CopywriterTab] Could not save brand voice to localStorage:', e);
    }
  };

  const currentVoiceObj = BRAND_VOICES.find(v => v.id === selectedVoice) || BRAND_VOICES[0];

  // Client-side fallback copy generator if API fails
  const generateFallbackCopies = (userPrompt: string, voiceId: string): CopyItem[] => {
    const v = BRAND_VOICES.find(item => item.id === voiceId) || BRAND_VOICES[0];
    
    if (voiceId === 'conversational') {
      return [
        {
          format: 'Anuncio de LinkedIn (B2B)',
          headline: '¡Che! Dejá de perder clientes por no responder a tiempo en WhatsApp',
          content: `Sabemos lo frustrante que es ver un mensaje de ventas acumulando polvo. Con ${userPrompt}, tu negocio responde al instante y cierra más ventas sin vueltas.`,
          cta: 'Charlemos 5 minutos y te mostramos cómo funciona.'
        },
        {
          format: 'Meta Ads (Instagram & Facebook)',
          headline: '¿Tus prospectos se quedan colgados esperando respuesta?',
          content: `Con ${userPrompt}, automatizás tu atención comercial con la calidez de siempre. Más ventas, menos estrés.`,
          cta: 'Mandanos un WhatsApp y lo probás ahora mismo.'
        },
        {
          format: 'Asunto y Vista Previa de Correo Frío',
          headline: 'Una idea rápida para tu negocio esta semana 🚀',
          content: `¡Hola! Estaba mirando cómo manejan las ventas en tu sector y pensé que ${userPrompt} te puede dar una mano enorme para simplificar procesos.`,
          cta: '¿Te copa que coordinemos una videollamada corta?'
        }
      ];
    }

    if (voiceId === 'bold') {
      return [
        {
          format: 'Anuncio de LinkedIn (B2B)',
          headline: 'Cada minuto sin automatizar es dinero que regalas a tu competencia',
          content: `El mercado no espera. Con ${userPrompt}, dominás la velocidad de respuesta, filtrás prospectos de alto valor y escalás tu facturación.`,
          cta: 'Reclamá tu acceso preferencial antes de que suba la tarifa.'
        },
        {
          format: 'Meta Ads (Instagram & Facebook)',
          headline: 'Multiplicá por 3 la conversión de tus campañas hoy',
          content: `${userPrompt}. Sistema garantizado para captar y convertir clientes antes de que cierren la app.`,
          cta: '¡Haz clic y tomá ventaja competitiva ya!'
        },
        {
          format: 'Asunto y Vista Previa de Correo Frío',
          headline: 'Cerrá el 40% más de operaciones este mes',
          content: `Si estás cansado de presupuestos sin respuesta, ${userPrompt} es la solución definitiva.`,
          cta: '¿Coordinamos un llamado de 10 minutos mañana a las 11hs?'
        }
      ];
    }

    if (voiceId === 'luxury') {
      return [
        {
          format: 'Anuncio de LinkedIn (B2B)',
          headline: 'Excelencia operativa y sofisticación tecnológica para organizaciones de nivel',
          content: `Elevá el estándar de tu marca con ${userPrompt}. Atención impecable, integraciones fluidas y una experiencia distinguida.`,
          cta: 'Solicitá una demostración privada exclusiva'
        },
        {
          format: 'Meta Ads (Instagram & Facebook)',
          headline: 'Para quienes no aceptan soluciones ordinarias',
          content: `Con ${userPrompt}, cada interacción refleja el prestigio de tu firma.`,
          cta: 'Descubrí el estándar premium'
        },
        {
          format: 'Asunto y Vista Previa de Correo Frío',
          headline: 'Una propuesta distinguida para la dirección general',
          content: `Estimado/a ejecutivo/a, nos dirigimos a usted para presentarle ${userPrompt}, diseñado para organizaciones que priorizan el valor superior.`,
          cta: 'Aguardamos su confirmación para coordinar una reunión privada.'
        }
      ];
    }

    if (voiceId === 'technical') {
      return [
        {
          format: 'Anuncio de LinkedIn (B2B)',
          headline: 'Arquitectura de automatización comercial e Inteligencia Artificial',
          content: `Integración vía API con ${userPrompt}. Sincronización bidireccional de datos, scoring automatizado y soporte multinivel.`,
          cta: 'Explorá la documentación técnica y demo en vivo'
        },
        {
          format: 'Meta Ads (Instagram & Facebook)',
          headline: 'Orquestación inteligente de canales y CRM',
          content: `Optimizá tu stack tecnológico con ${userPrompt}. Latencia mínima, alta disponibilidad y control total.`,
          cta: 'Ver arquitectura del sistema'
        },
        {
          format: 'Asunto y Vista Previa de Correo Frío',
          headline: 'Especificaciones técnicas de integración comercial',
          content: `Hola. Adjuntamos la memoria descriptiva de cómo ${userPrompt} optimiza la canalización de eventos en tu infraestructura actual.`,
          cta: '¿Podemos coordinar una revisión con tu equipo de sistemas?'
        }
      ];
    }

    // Default professional
    return [
      {
        format: 'Anuncio de LinkedIn (B2B)',
        headline: 'Aumentá la eficiencia comercial de tu PyME con automatización inteligente',
        content: `Con ${userPrompt}, optimizá cada etapa del embudo comercial, reducí tiempos operativos y aumentá la tasa de conversión.`,
        cta: 'Solicitá una demostración corporativa'
      },
      {
        format: 'Meta Ads (Instagram & Facebook)',
        headline: 'Transformá tu proceso de ventas sin complicaciones',
        content: `${userPrompt}. Todo lo que tu equipo necesita en una sola plataforma profesional.`,
        cta: 'Empezá ahora'
      },
      {
        format: 'Asunto y Vista Previa de Correo Frío',
        headline: 'Optimizá la gestión comercial de tu empresa',
        content: `Estimado/a, le escribo para compartir cómo ${userPrompt} está ayudando a empresas líderes a escalar sus operaciones.`,
        cta: '¿Tendría disponibilidad para una breve llamada de 10 minutos?'
      }
    ];
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg('Ingresá una descripción de tu producto o servicio.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateCopywriterCopies',
          payload: {
            prompt,
            brandVoice: selectedVoice
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.copies && Array.isArray(data.data.copies) && data.data.copies.length > 0) {
          setGeneratedCopies(data.data.copies);
          setLoading(false);
          return;
        }
      }

      // If backend call returned false/error, fallback gracefully
      console.warn('[CopywriterTab] Using client-side fallback generation');
      const fallback = generateFallbackCopies(prompt, selectedVoice);
      setGeneratedCopies(fallback);
    } catch (err: any) {
      console.warn('[CopywriterTab] Error calling Gemini API, fallback triggered:', err);
      const fallback = generateFallbackCopies(prompt, selectedVoice);
      setGeneratedCopies(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyItem = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = generatedCopies
      .map(
        c =>
          `=== ${c.format} ===\nEncabezado: ${c.headline}\nContenido: ${c.content}\nCTA: ${c.cta}\n`
      )
      .join('\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const filteredCopies = generatedCopies.filter(c => {
    if (filterFormat === 'all') return true;
    return c.format.toLowerCase().includes(filterFormat.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Powered by Gemini
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Copywriter con IA</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Generá textos persuasivos para LinkedIn, Meta Ads, Email Marketing, WhatsApp y Landing Pages con tono de marca personalizado.
          </p>
        </div>

        {/* Selected Voice Chip */}
        <div className="shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <currentVoiceObj.icon className="w-5 h-5 text-indigo-600 shrink-0" />
          <div className="text-left">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block leading-none">Voz de Marca Activa</span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">{currentVoiceObj.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Volume2 className="w-4 h-4 text-indigo-600" />
              Configuración de la Campaña
            </h2>

            {/* BRAND VOICE DROPDOWN WITH PERSISTENCE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono flex items-center justify-between">
                <span>Voz de Marca (Tono)</span>
                <span className="text-[10px] text-indigo-600 font-normal lowercase">Persistido en almacenamiento local</span>
              </label>

              <select
                value={selectedVoice}
                onChange={e => handleVoiceChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                {BRAND_VOICES.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.badge})
                  </option>
                ))}
              </select>

              {/* Voice Description Card */}
              <div className={`mt-2.5 p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${currentVoiceObj.color}`}>
                <currentVoiceObj.icon className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">{currentVoiceObj.badge}</span>
                  <p className="mt-0.5 text-[11px] opacity-90">{currentVoiceObj.description}</p>
                </div>
              </div>
            </div>

            {/* Prompt Description Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                Descripción del Producto / Oferta / Solución
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ej: Software CRM para empresas B2B en LATAM con automatización de ventas..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed transition-all"
              />
            </div>

            {/* Presets / Templates */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" /> Ejemplos Rápidos
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(p)}
                    className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 transition-all text-left line-clamp-1 cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/15 transition-all cursor-pointer border-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generando copys con Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Copys con IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Copies */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" /> Copys Generados
                </h2>
                <span className="text-xs text-slate-400 font-mono">Tono: {currentVoiceObj.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAll}
                  disabled={generatedCopies.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-bold transition-all cursor-pointer border border-indigo-100"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? '¡Copiados todos!' : 'Copiar Todo'}</span>
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  title="Volver a generar"
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer border-0"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Format Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filtrar:
              </span>
              {[
                { id: 'all', label: 'Todos' },
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'meta', label: 'Meta' },
                { id: 'correo', label: 'Email' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'landing', label: 'Landing' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterFormat(f.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    filterFormat === f.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* List of Copies */}
            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="text-xs font-mono">Redactando variaciones con Gemini ({currentVoiceObj.name})...</p>
              </div>
            ) : filteredCopies.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-mono">
                No hay copys que coincidan con el filtro seleccionado.
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {filteredCopies.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-200 rounded-xl transition-all shadow-2xs group relative space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-indigo-100/70 text-indigo-800 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                        {item.format}
                      </span>
                      <button
                        onClick={() =>
                          handleCopyItem(
                            idx,
                            `${item.headline}\n\n${item.content}\n\nCTA: ${item.cta}`
                          )
                        }
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-indigo-600 font-bold px-2 py-1 rounded-md hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                        {item.headline}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>

                    {item.cta && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-normal">CTA:</span>
                        <span>{item.cta}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
