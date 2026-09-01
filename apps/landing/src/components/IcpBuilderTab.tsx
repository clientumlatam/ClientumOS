import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Building2,
  Users,
  DollarSign,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Download,
  Plus,
  RefreshCw,
  FileText,
  Briefcase,
  Layers,
  Zap,
  TrendingUp,
  UserCheck,
  Check,
  ShieldCheck,
  Copy,
  ArrowRight,
  HelpCircle,
  Sliders,
  BarChart3
} from 'lucide-react';

interface BuyerPersona {
  id: string;
  role: string;
  name: string;
  age: string;
  title: string;
  quote: string;
  goals: string[];
  painPoints: string[];
  objections: string[];
  channels: string[];
  decisionCriteria: string[];
}

interface IcpProfile {
  title: string;
  industry: string;
  region: string;
  companySize: string;
  revenueRange: string;
  digitalMaturity: 'Baja' | 'Media' | 'Alta';
  targetCities: string[];
  technographics: string[];
  firmographics: {
    employees: string;
    revenue: string;
    budget: string;
    decisionTime: string;
  };
  pains: string[];
  triggers: string[];
  negativeCriteria: string[];
  personas: BuyerPersona[];
}

const DEFAULT_ICP_PROFILES: IcpProfile[] = [
  {
    title: 'PyMEs Comerciales y Servicios B2B en Crecimiento (LATAM)',
    industry: 'Servicios B2B, Agroindustria, Logística & Distribución',
    region: 'Argentina (Río Negro, Neuquén, BsAs, Córdoba) & LATAM',
    companySize: '10 a 100 empleados',
    revenueRange: 'USD $300k a $5M / año ($350M - $6.000M ARS)',
    digitalMaturity: 'Media',
    targetCities: ['General Roca', 'Neuquén Capital', 'CABA', 'Córdoba', 'Rosario', 'Mendoza', 'Santiago', 'Bogotá'],
    technographics: ['Excel / Hojas de cálculo', 'WhatsApp Business manual', 'Sistema de facturación AFIP legacy', 'Sin CRM unificado'],
    firmographics: {
      employees: '15 - 50 colaboradores',
      revenue: 'USD $500k - $2.5M / año',
      budget: 'USD $200 - $800 / mes ($250k - $1M ARS/mes)',
      decisionTime: '7 a 21 días'
    },
    pains: [
      'Pérdida del 40% de prospectos por demora en responder mensajes en WhatsApp',
      'Atención fragmentada entre vendedores sin registro unificado en un CRM',
      'Emisión manual de facturas AFIP desconectada del cierre de ventas',
      'Falta de métricas en tiempo real de ROI publicitario y conversión'
    ],
    triggers: [
      'Contratación de nuevos vendedores sin orden comercial',
      'Aumento sostenido en el costo por lead en Meta/Google Ads',
      'Llegada de inspecciones AFIP o desorden contable en facturación',
      'Necesidad de expandir operaciones a otras provincias o países'
    ],
    negativeCriteria: [
      'Empresas unipersonales sin volumen de ventas recurrente',
      'Presupuesto mensual inferior a USD $100',
      'Resistencia absoluta a migrar de planillas de Excel',
      'Empresas en sectores B2C masivo sin atención consultiva'
    ],
    personas: [
      {
        id: 'p1',
        role: 'Decisor Comercial Principal',
        name: 'Ing. Martín Albarracín',
        age: '42 años',
        title: 'Gerente Comercial / CRO',
        quote: 'Necesito que mi equipo responda los WhatsApps en menos de 2 minutos y que cada conversación quede grabada en el CRM con su factura AFIP.',
        goals: [
          'Aumentar la tasa de conversión de leads en un 35%',
          'Reducir el tiempo de respuesta inicial a < 60 segundos con IA',
          'Tener visibilidad total de las etapas de venta en un pipeline visual'
        ],
        painPoints: [
          'Vendedores que se llevan los contactos en sus teléfonos personales',
          'Demoras administrativas al solicitar la factura electrónica',
          'Falta de reportes confiables de ventas mensuales'
        ],
        objections: [
          '¿Es fácil de usar para vendedores que no son expertos en tecnología?',
          '¿Se conecta directamente con la facturación electrónica AFIP?',
          '¿Cuánto demora la puesta en marcha?'
        ],
        channels: ['WhatsApp (Directo)', 'LinkedIn B2B', 'Email profesional'],
        decisionCriteria: ['Facilidad de uso', 'Integración AFIP nativa', 'Soporte local en Argentina/LATAM']
      },
      {
        id: 'p2',
        role: 'Dueño / Fundador Executive',
        name: 'Valeria Sola',
        age: '48 años',
        title: 'CEO & Socio Fundador PyME',
        quote: 'Buscamos escalar las ventas sin multiplicar los costos fijos. La automatización con IA es nuestra ventaja competitiva.',
        goals: [
          'Optimizar el retorno de inversión en marketing y ventas',
          'Garantizar la previsibilidad del flujo de caja mensual',
          'Profesionalizar la imagen corporativa de la empresa'
        ],
        painPoints: [
          'Sobrecarga operativa diaria atendiendo consultas repetitivas',
          'Incertidumbre económica y necesidad de cotizar en pesos y dólares',
          'Falta de continuidad comercial fuera del horario de oficina'
        ],
        objections: [
          '¿El costo mensual está en pesos argentinos o dólares?',
          '¿Tienen casos de éxito probados en empresas de mi rubro?',
          '¿Hay garantía o periodo de prueba?'
        ],
        channels: ['WhatsApp', 'Eventos Empresariales', 'Recomendación directa'],
        decisionCriteria: ['Relación Precio/Valor en ARS', 'Garantía de soporte', 'Reputación de la marca']
      },
      {
        id: 'p3',
        role: 'Líder Técnico & Sistemas',
        name: 'Lic. Esteban Rossi',
        age: '36 años',
        title: 'Responsable de Sistemas & IT',
        quote: 'Requiero una solución Cloud segura, con API REST abierta y garantía de tiempo de actividad del 99.9%.',
        goals: [
          'Asegurar la soberanía de los datos de clientes',
          'Integrar el CRM con el ERP interno sin fallos de sincronización',
          'Mantener la ciberseguridad y respaldos automáticos'
        ],
        painPoints: [
          'Sistemas heredados difíciles de conectar',
          'Miedo a caídas del servicio durante horas pico de ventas',
          'Vulnerabilidades de seguridad en conexiones API no cifradas'
        ],
        objections: [
          '¿Cuál es la latencia de respuesta de la API de WhatsApp?',
          '¿Los datos se almacenan en servidores con encriptación SSL?',
          '¿Tienen documentación técnica clara para Webhooks?'
        ],
        channels: ['Email', 'GitHub / Documentación Técnica', 'Reunión Google Meet'],
        decisionCriteria: ['Seguridad Cloud SSL', 'Documentación API', 'Uptime 99.9%']
      }
    ]
  }
];

export function IcpBuilderTab() {
  const [icpList, setIcpList] = useState<IcpProfile[]>(DEFAULT_ICP_PROFILES);
  const [selectedIcpIndex, setSelectedIcpIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // ICP Fit Calculator State
  const [calcData, setCalcData] = useState({
    employees: 25,
    revenueUsd: 800000,
    hasWhatsappVolume: true,
    hasAfipNeed: true,
    budgetMonthlyUsd: 350
  });

  // Calculate Fit Score (0 - 100)
  const calculateFitScore = () => {
    let score = 0;
    if (calcData.employees >= 10 && calcData.employees <= 100) score += 25;
    else if (calcData.employees > 100) score += 15;
    else score += 10;

    if (calcData.revenueUsd >= 300000) score += 25;
    else score += 10;

    if (calcData.hasWhatsappVolume) score += 20;
    if (calcData.hasAfipNeed) score += 15;

    if (calcData.budgetMonthlyUsd >= 200) score += 15;
    else if (calcData.budgetMonthlyUsd >= 100) score += 8;

    return Math.min(100, score);
  };

  const currentIcp = icpList[selectedIcpIndex] || DEFAULT_ICP_PROFILES[0];
  const fitScore = calculateFitScore();

  // New ICP Generator Form State
  const [formData, setFormData] = useState({
    industry: 'Tecnología, Software & Servicios B2B',
    region: 'Argentina & Cono Sur LATAM',
    companySize: '15 - 80 colaboradores',
    revenueRange: 'USD $500k - $3M / año',
    mainPain: 'Atención desorganizada en WhatsApp y falta de conexión con facturación AFIP'
  });

  const handleAiGenerateIcp = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-icp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.icp) {
          setIcpList(prev => [result.icp, ...prev]);
          setSelectedIcpIndex(0);
          setShowNewModal(false);
          setIsGenerating(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Fallback to local ICP generation logic', e);
    }

    // Local smart fallback profile
    const newCustomIcp: IcpProfile = {
      title: `ICP Especializado: ${formData.industry}`,
      industry: formData.industry,
      region: formData.region,
      companySize: formData.companySize,
      revenueRange: formData.revenueRange,
      digitalMaturity: 'Media',
      targetCities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Neuquén', 'Mendoza', 'Santiago', 'Montevideo'],
      technographics: ['WhatsApp Business', 'ERP / AFIP Facturación', 'Excel / CRM legacy', 'Meta & Google Ads'],
      firmographics: {
        employees: formData.companySize,
        revenue: formData.revenueRange,
        budget: 'USD $300 - $900 / mes',
        decisionTime: '10 a 20 días'
      },
      pains: [
        formData.mainPain,
        'Demoras comerciales que reducen el cierre de ventas',
        'Falta de atribución de ingresos por canal de prospección',
        'Inconsistencia en el seguimiento de prospectos entablados'
      ],
      triggers: [
        'Aumento en la pauta publicitaria en redes',
        'Expansión del equipo de ejecutivos de venta',
        'Necesidad de auditar y centralizar la base de clientes'
      ],
      negativeCriteria: [
        'Organizaciones sin presupuesto comercial asignado',
        'Operaciones 100% informales sin facturación',
        'Proyectos personales en etapa de idea inicial'
      ],
      personas: [
        {
          id: 'p_custom_1',
          role: 'Líder de Negocio',
          name: 'Lic. Alejandro Castro',
          age: '40 años',
          title: `Director de ${formData.industry.split(',')[0]}`,
          quote: 'Queremos automatizar los procesos de venta repetitivos para centrarnos en el cierre estratégico.',
          goals: ['Estructurar el embudo de ventas', 'Tener reportes automáticos semanales'],
          painPoints: [formData.mainPain, 'Desalineación entre marketing y ventas'],
          objections: ['¿Requiere programadores para instalarse?', '¿Se paga en moneda local?'],
          channels: ['WhatsApp', 'Email', 'LinkedIn'],
          decisionCriteria: ['Implementación rápida', 'Soporte humano', 'Garantía ROI']
        }
      ]
    };

    setIcpList(prev => [newCustomIcp, ...prev]);
    setSelectedIcpIndex(0);
    setIsGenerating(false);
    setShowNewModal(false);
  };

  const handleCopySummary = () => {
    const summaryText = `PERFIL ICP: ${currentIcp.title}
Industria: ${currentIcp.industry}
Región: ${currentIcp.region}
Tamaño: ${currentIcp.companySize} | Facturación: ${currentIcp.revenueRange}
Presupuesto: ${currentIcp.firmographics.budget}
Dolores Principales:
${currentIcp.pains.map(p => `- ${p}`).join('\n')}
Personas Clave:
${currentIcp.personas.map(p => `- ${p.title} (${p.name}): ${p.quote}`).join('\n')}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-black font-mono uppercase px-2.5 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Gemini 2.5 AI Engine
            </span>
            <span className="text-slate-400 text-xs">· Módulo 2.1 Conocer tu Audiencia</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Target className="w-7 h-7 text-indigo-400" /> Perfil ICP & Buyer Personas
          </h1>
          <p className="text-slate-300 text-xs mt-1 max-w-2xl">
            Define tu Perfil de Cliente Ideal (Ideal Customer Profile) y tus arquetipos de decisores B2B en LATAM con Inteligencia Artificial.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Resumen'}</span>
          </button>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer border-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generar Nuevo ICP con IA</span>
          </button>
        </div>
      </div>

      {/* ICP Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {icpList.map((icp, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIcpIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
              selectedIcpIndex === idx
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Target className={`w-3.5 h-3.5 ${selectedIcpIndex === idx ? 'text-white' : 'text-indigo-600'}`} />
            <span>{icp.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Firmographics & Technographics */}
        <div className="space-y-6 lg:col-span-1">
          {/* Firmographics Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Firmografía Objetivo</h3>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                B2B LATAM
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Industria / Rubro:</span>
                <span className="font-bold text-slate-800">{currentIcp.industry}</span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Geografía & Cobertura:</span>
                <span className="font-bold text-slate-800">{currentIcp.region}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-medium block">Empleados:</span>
                  <span className="font-black text-slate-900 text-sm">{currentIcp.firmographics.employees}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-medium block">Facturación:</span>
                  <span className="font-black text-indigo-600 text-xs">{currentIcp.firmographics.revenue}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-medium block">Presupuesto IT/CRM:</span>
                  <span className="font-black text-emerald-600 text-xs">{currentIcp.firmographics.budget}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-medium block">Tiempo Decisión:</span>
                  <span className="font-black text-slate-900 text-xs">{currentIcp.firmographics.decisionTime}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Ciudades Clave LATAM:</span>
                <div className="flex flex-wrap gap-1">
                  {currentIcp.targetCities.map((city, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technographics & Digital Maturity */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900">Tecnografía & Madurez</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-slate-600 font-medium">Madurez Digital:</span>
                <span className="font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-[11px]">
                  {currentIcp.digitalMaturity}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Herramientas Actuales en Uso:</span>
                <ul className="space-y-1">
                  {currentIcp.technographics.map((tech, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Negative ICP Criteria */}
          <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 border-b border-rose-200 pb-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-sm text-rose-950">Criterios de Exclusión (ICP Negativo)</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-900">
              {currentIcp.negativeCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center & Right Column: Pains, Triggers, Personas & Fit Calculator */}
        <div className="space-y-6 lg:col-span-2">
          {/* Pains & Trigger Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Pain Points */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-sm text-slate-900">Dolores Comerciales Principales</h3>
              </div>
              <ul className="space-y-2 text-xs">
                {currentIcp.pains.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 font-medium leading-relaxed">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trigger Events */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Detonantes de Compra (Triggers)</h3>
              </div>
              <ul className="space-y-2 text-xs">
                {currentIcp.triggers.map((trig, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-relaxed">{trig}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buyer Personas Detailed Cards */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Buyer Personas & Arquetipos de Decisión</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {currentIcp.personas.length} Personas Configurada(s)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentIcp.personas.map((persona) => (
                <div key={persona.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {persona.role}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{persona.age}</span>
                    </div>

                    <h4 className="font-black text-sm text-slate-900">{persona.name}</h4>
                    <p className="text-xs font-semibold text-slate-500">{persona.title}</p>

                    <blockquote className="italic text-[11px] text-slate-600 my-2 bg-white p-2.5 rounded-lg border border-slate-200/80 border-l-3 border-l-indigo-500">
                      "{persona.quote}"
                    </blockquote>

                    <div className="space-y-2 text-[11px] mt-2">
                      <div>
                        <span className="font-bold text-slate-700 block">Objetivos Clave:</span>
                        <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                          {persona.goals.map((g, i) => (
                            <li key={i}>{g}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-700 block text-rose-700">Principales Objeciones:</span>
                        <ul className="list-disc list-inside text-rose-900 space-y-0.5">
                          {persona.objections.map((o, i) => (
                            <li key={i}>{o}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex flex-wrap gap-1">
                    {persona.channels.map((ch, i) => (
                      <span key={i} className="text-[9px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Prospect ICP Fit Score Calculator */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Calculadora Interactiva de Encaje (ICP Fit Score)
                </span>
                <h3 className="font-bold text-base text-white">Evaluar un Prospecto en Tiempo Real</h3>
              </div>

              <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-300 font-medium">Puntaje de Encaje:</span>
                <span className={`text-xl font-black ${
                  fitScore >= 80 ? 'text-emerald-400' : fitScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {fitScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Empleados de la Empresa:</label>
                <input
                  type="number"
                  value={calcData.employees}
                  onChange={(e) => setCalcData({ ...calcData, employees: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Facturación Anual Estimada (USD):</label>
                <input
                  type="number"
                  value={calcData.revenueUsd}
                  onChange={(e) => setCalcData({ ...calcData, revenueUsd: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Presupuesto Disponible (USD/mes):</label>
                <input
                  type="number"
                  value={calcData.budgetMonthlyUsd}
                  onChange={(e) => setCalcData({ ...calcData, budgetMonthlyUsd: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={calcData.hasWhatsappVolume}
                    onChange={(e) => setCalcData({ ...calcData, hasWhatsappVolume: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
                  />
                  <span>Recibe alto volumen de WhatsApp</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={calcData.hasAfipNeed}
                    onChange={(e) => setCalcData({ ...calcData, hasAfipNeed: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
                  />
                  <span>Requiere Facturación AFIP nativa</span>
                </label>
              </div>

              <div className="text-xs font-semibold text-slate-300">
                {fitScore >= 80 ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-4 h-4" /> ICP Óptimo (High-Fit Priority)
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Ajuste Medio (Requiere Evaluación)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: AI ICP Generator */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Generar Nuevo ICP con Gemini IA</h3>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Industria o Rubro B2B:</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Región / Países Objetivo:</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Tamaño Empresa:</label>
                  <input
                    type="text"
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Facturación Anual:</label>
                  <input
                    type="text"
                    value={formData.revenueRange}
                    onChange={(e) => setFormData({ ...formData, revenueRange: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Problema / Dolor Comercial Principal:</label>
                <textarea
                  rows={2}
                  value={formData.mainPain}
                  onChange={(e) => setFormData({ ...formData, mainPain: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAiGenerateIcp}
                disabled={isGenerating}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generando Perfil...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Crear Perfil ICP IA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
