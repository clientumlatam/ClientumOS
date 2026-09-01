import React, { useState } from 'react';
import {
  Layers,
  Search,
  Copy,
  Check,
  Plus,
  Sparkles,
  FileText,
  Mail,
  Send,
  CheckCircle2,
  Tag,
  Share2,
  Code
} from 'lucide-react';

export interface EmailTemplate {
  id: string;
  title: string;
  category: 'Prospection' | 'FollowUp' | 'Proposal' | 'Onboarding' | 'Renewal';
  subject: string;
  bodyText: string;
  openRateAvg: string;
  replyRateAvg: string;
}

const TEMPLATES_DATABASE: EmailTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Cold Outreach B2B C-Level (Alto Valor)',
    category: 'Prospection',
    subject: 'Optimización de procesos operativos en {{nombre_empresa}}',
    bodyText: 'Hola {{nombre_contacto}},\n\nNoté que en {{nombre_empresa}} están expandiendo operaciones en {{ciudad}}.\n\nEn Clientum ayudamos a directores de tecnología y comercial a automatizar la cualificación de clientes potenciales mediante agentes conversacionales en WhatsApp conectados a su CRM.\n\n¿Tendrás 10 minutos este jueves para mostrarte un caso de éxito de tu mismo sector?\n\nSaludos,\n{{tu_nombre}}',
    openRateAvg: '68%',
    replyRateAvg: '24%'
  },
  {
    id: 'tpl-2',
    title: 'Seguimiento de Propuesta Comercial (MEDDIC)',
    category: 'FollowUp',
    subject: 'Avance propuesta ejecutiva Clientum // {{nombre_empresa}}',
    bodyText: 'Estimado/a {{nombre_contacto}},\n\nEspero que estés teniendo una buena semana.\n\nQuería dar seguimiento a la propuesta enviada el pasado {{fecha}} para la implementación del ecosistema comercial Clientum.\n\n¿Lograron revisar los puntos clave con el área financiera?\n\nQuedo atento a tus comentarios para coordinar el inicio de la fase 1.\n\nUn cordial saludo,',
    openRateAvg: '82%',
    replyRateAvg: '41%'
  },
  {
    id: 'tpl-3',
    title: 'Envío de Propuesta Financiera & AFIP',
    category: 'Proposal',
    subject: 'Propuesta Comercial y Facturación Clientum - {{nombre_empresa}}',
    bodyText: 'Hola {{nombre_contacto}},\n\nAdjunto encontrarás la propuesta formal ajustada con las especificaciones conversadas en nuestra última llamada.\n\nDetalle de inversión:\n- Configuración e Integración Inicial: USD {{monto_inicial}}\n- Licencia Mensual SaaS: USD {{monto_mensual}}\n\nFacturación disponible en Pesos Argentinos (AFIP Comprobante A) o USD Transferencia Internacional.\n\nQuedamos a disposición.',
    openRateAvg: '91%',
    replyRateAvg: '55%'
  },
  {
    id: 'tpl-4',
    title: 'Reactivación de Leads Fríos (Breakup Email)',
    category: 'Prospection',
    subject: '¿Cerramos el expediente de {{nombre_empresa}}?',
    bodyText: 'Hola {{nombre_contacto}},\n\nTe escribo brevemente porque no he tenido respuesta a mis correos anteriores. Asumo que en este momento la automatización comercial no es una prioridad para {{nombre_empresa}}.\n\nSi la situación cambia en el próximo trimestre, no dudes en escribirme.\n\nSaludos cordiales,',
    openRateAvg: '74%',
    replyRateAvg: '38%'
  }
];

export function TemplatesTab() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(TEMPLATES_DATABASE);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = templates.filter(t => {
    const matchesCategory = selectedCategory === 'todos' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyBody = (template: EmailTemplate) => {
    navigator.clipboard.writeText(`Asunto: ${template.subject}\n\n${template.bodyText}`);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Biblioteca B2B
            </span>
            <span className="text-slate-400 text-xs">· Módulo 5.2 Campañas & Automatización</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-7 h-7 text-indigo-600" /> Biblioteca de Plantillas de Correo
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Modelos de comunicación B2B testeados con métricas de conversión para prospección, cierre y reactivación.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por Título o Asunto..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden text-slate-700"
          >
            <option value="todos">Todas las Categorías</option>
            <option value="Prospection">Prospección Inicial</option>
            <option value="FollowUp">Seguimiento MEDDIC</option>
            <option value="Proposal">Propuestas & AFIP</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((tpl) => (
          <div key={tpl.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md font-mono">
                  {tpl.category}
                </span>
                <div className="flex gap-2 text-xs font-bold text-slate-500">
                  <span className="text-emerald-600">Apertura: {tpl.openRateAvg}</span>
                  <span className="text-indigo-600">Respuesta: {tpl.replyRateAvg}</span>
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900">{tpl.title}</h3>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Asunto del Correo:</span>
                <span className="font-bold text-slate-800">{tpl.subject}</span>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[180px] overflow-y-auto">
                {tpl.bodyText}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400">Variables autocompletadas por CRM</span>
              <button
                onClick={() => handleCopyBody(tpl)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedId === tpl.id ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === tpl.id ? 'Copiado' : 'Copiar Plantilla'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
