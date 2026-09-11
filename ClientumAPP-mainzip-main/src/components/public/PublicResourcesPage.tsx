import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Tag,
  Code
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';

interface PublicResourcesPageProps {
  onNavigate: (path: PublicRoutePath) => void;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const PublicResourcesPage: React.FC<PublicResourcesPageProps> = ({ onNavigate }) => {
  const { showToast } = useCRM();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'art-1',
      title: 'WhatsApp Oficial (Meta Cloud API) vs. Gateway Baileys: ¿Cuál le conviene a tu PyME?',
      summary: 'Analizamos las diferencias clave en costos por conversación, tiempos de aprobación de plantillas y riesgo de bloqueo para ventas en Argentina.',
      category: 'WhatsApp & Bots',
      date: 'Septiembre 2026',
      readTime: '6 min lectura',
      content: `A la hora de conectar WhatsApp con un CRM comercial, las empresas de América Latina enfrentan dos alternativas principales: la Meta Cloud API Oficial o la conexión por Gateway QR (como Baileys).
      
1. Meta Cloud API Oficial: Ideal para números corporativos que realizan envíos masivos a bases de datos de más de 5.000 contactos. Ofrece la insignia verde de verificación, plantillas homologadas y riesgo cero de baneo. Sin embargo, tiene un costo por conversación iniciada por el negocio en dólares.

2. Gateway Baileys por Código QR: La alternativa más ágil y económica para pequeñas y medianas empresas. Permite vincular cualquier número comercial existente en 60 segundos escaneando un código QR, sin necesidad de trámites en Meta Business Manager ni cobro por mensaje.

En Clientum implementamos una arquitectura híbrida: puedes comenzar con código QR para atención y prospección rápida, y escalar a la Meta Cloud API oficial cuando tu volumen lo justifique.`
    },
    {
      id: 'art-2',
      title: 'Guía Completa 2026: Calificación de Oportunidades con Metodología MEDDIC',
      summary: 'Cómo predecir cierres comerciales analizando Métricas, Comprador Económico, Criterios de Decisión y Proceso de Compra.',
      category: 'Estrategia Comercial',
      date: 'Agosto 2026',
      readTime: '8 min lectura',
      content: `La metodología MEDDIC fue desarrollada originalmente en PTC y se ha convertido en el estándar de oro para ventas B2B y consultivas de alto ticket.
      
M (Metrics): Cuál es el impacto económico cuantificado que busca el cliente (e.g. ahorrar $2M ARS al mes o aumentar 30% la conversión).
E (Economic Buyer): Quién tiene la potestad final de firmar el cheque o aprobar la partida presupuestaria.
D (Decision Criteria): Cuáles son los requisitos técnicos, de soporte y comerciales para seleccionar al proveedor.
D (Decision Process): Qué etapas y validaciones internas debe pasar la propuesta antes del cierre.
I (Identify Pain): El dolor crítico que la empresa no puede postergar más.
C (Champion): El aliado interno que impulsa activamente tu solución frente al comité directivo.

En Clientum CRM, cada oportunidad incluye un widget interactivo MEDDIC con cálculo de scoring automático.`
    },
    {
      id: 'art-3',
      title: 'Facturación AFIP RG 4291: Guía Práctica de Integración con Web Services SOAP',
      summary: 'Requisitos técnicos para emitir Factura Electrónica A, B y C con CAE automático mediante certificados digitales X.509.',
      category: 'AFIP & Finanzas',
      date: 'Julio 2026',
      readTime: '10 min lectura',
      content: `La emisión de comprobantes en línea en Argentina requiere interacción con los servidores de AFIP (WSFEv1).

Para conectar tu sistema comercial debes cumplir tres pasos formales:
1. Generar la clave privada y el CSR (Certificate Signing Request) mediante OpenSSL.
2. Autorizar el certificado en el Administrador de Relaciones de Clave Fiscal en afip.gob.ar.
3. Asociar el computador fiscal al punto de venta electrónico correspondiente.

Clientum incluye este proceso automatizado: solo subes tu certificado y la plataforma gestiona los tokens WSAA y emisión con CAE de forma instantánea.`
    },
    {
      id: 'art-4',
      title: '14 Agentes de IA en un Organigrama Comercial Autónomo',
      summary: 'Cómo organizamos la red Agent OS para prospección, análisis de mercado, soporte y generación de copias de ventas.',
      category: 'Inteligencia Artificial',
      date: 'Junio 2026',
      readTime: '7 min lectura',
      content: `El paradigma de la IA no es un único chatbot genérico, sino un enjambre de agentes especializados que colaboran entre sí.

En Clientum implementamos 14 agentes con funciones delimitadas:
- Agente Growth: Analiza vacíos en el pipeline y sugiere activaciones.
- Agente SDR: Califica prospectos entrantes por WhatsApp.
- Agente Copywriter: Redacta propuestas y mensajes persuasivos.
- Agente Compliance: Valida alícuotas fiscales y CUITs.

Cada agente se activa por eventos o comandos específicos, ahorrando cientos de horas operativas.`
    }
  ];

  const templates = [
    {
      title: 'Planilla de Pipeline Comercial B2B (Excel & Sheets)',
      desc: 'Plantilla estructurada para calcular velocidad del embudo y scoring de prospectos.',
      format: 'XLSX / Google Sheets'
    },
    {
      title: 'Guion de Ventas para WhatsApp con 15 Objeciones Resueltas',
      desc: 'Respuestas probadas a "es caro", "lo consulto con mi socio" y "mandame info".',
      format: 'PDF / Guía Rápida'
    },
    {
      title: 'Checklist de Homologación de Facturación AFIP',
      desc: 'Paso a paso para delegar servicios fiscales en AFIP con clave fiscal nivel 3.',
      format: 'PDF Operativo'
    }
  ];

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Centro de Recursos, Blog & Plantillas Descargables</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Aprende a Escalar tus Ventas con Metodología y Tecnología
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Artículos técnicos, guías operativas y plantillas gratuitas diseñadas por nuestros consultores comerciales para el mercado latinoamericano.
        </p>
      </section>

      {/* Free Downloadable Templates Bar */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Plantillas Operativas Gratuitas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((tpl, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{tpl.format}</div>
                <h3 className="font-bold text-slate-900 text-xs">{tpl.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{tpl.desc}</p>
              </div>
              <button
                onClick={() => showToast(`Descargando ${tpl.title}...`, 'success')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Gratis</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {['all', 'WhatsApp & Bots', 'Estrategia Comercial', 'AFIP & Finanzas', 'Inteligencia Artificial'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'Todos los Artículos' : cat}
          </button>
        ))}
      </div>

      {/* Blog Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px]">
                  {art.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedArticle(art)}>
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{art.date}</span>
              <button
                onClick={() => setSelectedArticle(art)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Leer artículo completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-500 hover:text-slate-900 text-xs font-bold cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedArticle.title}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer shadow-xs"
              >
                Volver a Recursos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campus LMS Teaser */}
      <section className="p-8 rounded-3xl bg-blue-50/80 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Capacitación en Vivo</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">¿Quieres capacitar a tu equipo con certificación oficial?</h2>
          <p className="text-xs text-slate-600">
            Descubre nuestro Campus LMS interactivo con cursos de Pipeline Kanban, Chatbots de WhatsApp y Estrategia Comercial.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/academia')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shrink-0 transition-all cursor-pointer shadow-md shadow-blue-600/20"
        >
          Explorar Campus LMS →
        </button>
      </section>

    </div>
  );
};
