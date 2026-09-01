import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Layers,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Globe,
  Share2,
  Download
} from 'lucide-react';

export interface CampaignStrategy {
  id: string;
  title: string;
  objective: string;
  targetIndustry: string;
  region: string;
  budgetUsd: number;
  channels: string[];
  kpis: string[];
  aiPitches: {
    linkedin: string;
    email: string;
    whatsapp: string;
  };
}

const INITIAL_STRATEGIES: CampaignStrategy[] = [
  {
    id: 'strat-1',
    title: 'Expansión B2B Vaca Muerta & Energía',
    objective: 'Captación de directores de operaciones y compras en yacimientos',
    targetIndustry: 'Petróleo, Gas & Servicios Industriales',
    region: 'Neuquén & Mendoza (Argentina)',
    budgetUsd: 25000,
    channels: ['LinkedIn InMail', 'Google Search B2B', 'Cold Email ABM'],
    kpis: ['45 Demos Calificadas/mes', 'CAC < $350 USD', 'Ticket Promedio > $30k USD'],
    aiPitches: {
      linkedin: 'Hola [Nombre], optimizamos la gestión de contratistas y la facturación electrónica masiva en yacimientos de Neuquén.',
      email: 'Estimado [Nombre], reduzca un 40% el tiempo de aprobación de órdenes de compra con nuestro ecosistema B2B conectado.',
      whatsapp: 'Hola [Nombre], te comparto nuestro brochure técnico de soluciones para el sector O&G en Vaca Muerta.'
    }
  },
  {
    id: 'strat-2',
    title: 'Penetración Agrotech & Exportadores Cuyo',
    objective: 'Posicionamiento de CRM y automatización de clientes de empaque',
    targetIndustry: 'Agroindustria & Exportación de Fruta/Vino',
    region: 'Alto Valle & Cuyo',
    budgetUsd: 18000,
    channels: ['WhatsApp Automation', 'Eventos Sectoriales', 'Google Ads B2B'],
    kpis: ['30 Leads Calificados/mes', 'Conversión a Demo > 22%'],
    aiPitches: {
      linkedin: 'Hola [Nombre], automatizamos la comunicación con compradores internacionales en 3 idiomas.',
      email: 'Estimado [Nombre], conecte sus ventas de exportación con nuestro CRM integrado a AFIP y WhatsApp.',
      whatsapp: 'Hola [Nombre]! Te invito a probar nuestro agente conversacional IA para atención a clientes exportadores.'
    }
  }
];

export function StrategyTab() {
  const [strategies, setStrategies] = useState<CampaignStrategy[]>(INITIAL_STRATEGIES);
  const [selectedStrategy, setSelectedStrategy] = useState<CampaignStrategy>(INITIAL_STRATEGIES[0]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newIndustry, setNewIndustry] = useState('Tecnología & Software B2B');
  const [newRegion, setNewRegion] = useState('LATAM (México, Colombia, Argentina)');
  const [newBudget, setNewBudget] = useState(20000);

  const handleGenerateStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setIsGeneratingAi(true);

    setTimeout(() => {
      const generated: CampaignStrategy = {
        id: `strat-${Date.now()}`,
        title: newTitle,
        objective: `Estrategia de penetración de mercado para el sector ${newIndustry}`,
        targetIndustry: newIndustry,
        region: newRegion,
        budgetUsd: Number(newBudget),
        channels: ['LinkedIn Outreach', 'Cold Email Hyper-Personalized', 'WhatsApp IA Agent'],
        kpis: ['35 Demos B2B/mes', 'Retorno ROI > 3.5x', 'Pipeline Generado > $120k USD'],
        aiPitches: {
          linkedin: `Hola [Nombre], ayudamos a empresas de ${newIndustry} en ${newRegion} a multiplicar su pipeline comercial con IA.`,
          email: `Estimado/a [Nombre], implementamos soluciones B2B diseñadas para la industria de ${newIndustry}.`,
          whatsapp: `Hola! Te envío la propuesta ejecutiva de Clientum para potenciar ${newTitle}.`
        }
      };

      setStrategies([generated, ...strategies]);
      setSelectedStrategy(generated);
      setIsGeneratingAi(false);
      setNewTitle('');
    }, 1200);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Estrategias Gemini 3.6 IA
            </span>
            <span className="text-slate-400 text-xs">· Módulo 4.1 IA & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-7 h-7 text-purple-600" /> Generador de Estrategias de Adquisición B2B
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Diseña campañas tácticas multicanal con asignación de presupuesto, matriz de canales y copy estratégico acelerado con IA.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generator Form & Active List */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Crear Nueva Estrategia con Gemini
            </h3>

            <form onSubmit={handleGenerateStrategy} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Campaña / Objetivo</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Conquista de Clientes Corp en México"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sector Objetivo</label>
                <select
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                >
                  <option value="Petróleo, Gas & Servicios Industriales">Petróleo, Gas & Servicios</option>
                  <option value="Agroindustria & Exportación">Agroindustria & Exportación</option>
                  <option value="Tecnología & Software B2B">Tecnología & Software B2B</option>
                  <option value="Retail & Logística">Retail & Logística</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Región Objetivo</label>
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Presupuesto Sugerido (USD)</label>
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingAi}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-purple-600/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingAi ? 'Generando Estrategia...' : 'Generar Estrategia con IA'}</span>
              </button>
            </form>
          </div>

          {/* Existing Strategies List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Estrategias Guardadas</h4>
            {strategies.map((strat) => (
              <div
                key={strat.id}
                onClick={() => setSelectedStrategy(strat)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedStrategy.id === strat.id
                    ? 'bg-purple-50/50 border-purple-500 ring-2 ring-purple-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-xs text-slate-900">{strat.title}</h4>
                  <span className="text-[10px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    ${strat.budgetUsd.toLocaleString()} USD
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">{strat.objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Strategy Deep Dive */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                  {selectedStrategy.targetIndustry}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{selectedStrategy.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{selectedStrategy.objective}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">Presupuesto Asignado</span>
                <span className="text-xl font-black text-emerald-600">${selectedStrategy.budgetUsd.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Channels & KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" /> Canales de Adquisición
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStrategy.channels.map((ch, i) => (
                    <span key={i} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Metas de Crecimiento & KPIs
                </h4>
                <ul className="space-y-1 text-xs font-medium text-slate-700">
                  {selectedStrategy.kpis.map((kpi, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Generated Pitches per Channel */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Guiones & Copy Personalizados por Canal</h4>

              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-purple-400 font-bold">
                  <span>LinkedIn Outreach InMail:</span>
                  <button
                    onClick={() => handleCopy(selectedStrategy.aiPitches.linkedin, 'linkedin')}
                    className="text-slate-400 hover:text-white cursor-pointer flex items-center gap-1 text-[10px]"
                  >
                    {copiedKey === 'linkedin' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'linkedin' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="font-sans text-slate-300 italic">"{selectedStrategy.aiPitches.linkedin}"</p>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-purple-400 font-bold">
                  <span>Cold Email ABM:</span>
                  <button
                    onClick={() => handleCopy(selectedStrategy.aiPitches.email, 'email')}
                    className="text-slate-400 hover:text-white cursor-pointer flex items-center gap-1 text-[10px]"
                  >
                    {copiedKey === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'email' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="font-sans text-slate-300 italic">"{selectedStrategy.aiPitches.email}"</p>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-purple-400 font-bold">
                  <span>WhatsApp Conversacional Agent:</span>
                  <button
                    onClick={() => handleCopy(selectedStrategy.aiPitches.whatsapp, 'whatsapp')}
                    className="text-slate-400 hover:text-white cursor-pointer flex items-center gap-1 text-[10px]"
                  >
                    {copiedKey === 'whatsapp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'whatsapp' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="font-sans text-slate-300 italic">"{selectedStrategy.aiPitches.whatsapp}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
