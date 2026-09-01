import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageCircle,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@clientum/ui';

interface FaqItem {
  id: string;
  category: 'general' | 'whatsapp' | 'crm' | 'precios';
  question: string;
  questionPt: string;
  answer: string;
  answerPt: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'whatsapp',
    question: '¿Necesito cambiar mi número de WhatsApp actual para usar el Chatbot IA?',
    questionPt: 'Preciso trocar meu número de WhatsApp atual para usar o Chatbot IA?',
    answer: 'No. Conectamos el agente inteligente directamente a tu número de WhatsApp Business actual a través de la API oficial de Meta Cloud. Mantienes todos tus contactos, historial y conversaciones sin interrupciones.',
    answerPt: 'Não. Conectamos o agente inteligente diretamente ao seu número atual através da API oficial da Meta Cloud, mantendo seu histórico e contatos intactos.'
  },
  {
    id: 'faq-2',
    category: 'whatsapp',
    question: '¿Qué sucede si un cliente hace una pregunta compleja o solicita un asesor humano?',
    questionPt: 'O que acontece se um cliente fizer uma pergunta complexa ou pedir um atendente humano?',
    answer: 'El chatbot detecta automáticamente cuando una consulta requiere intervención humana, pausa las respuestas automáticas para ese chat y notifica al instante a tu equipo por WhatsApp o el CRM para que un asesor tome el control.',
    answerPt: 'O chatbot detecta quando é necessária atenção humana, pausa o fluxo automático e envia uma notificação imediata para sua equipe assumir o atendimento.'
  },
  {
    id: 'faq-3',
    category: 'crm',
    question: '¿Cómo funciona la facturación electrónica AFIP integrada en el CRM?',
    questionPt: 'Como funciona o faturamento fiscal eletrônico integrado ao CRM?',
    answer: 'Conectamos el CRM con los Web Services oficiales de AFIP mediante tu certificado digital. Puedes emitir Facturas A, B, C y notas de crédito en 1 clic directamente desde las oportunidades de venta ganadas, obteniendo el CAE en segundos y enviando el PDF por email o WhatsApp.',
    answerPt: 'Conectamos o sistema com os serviços fiscais oficiais para gerar notas fiscais instantaneamente a partir das vendas fechadas no CRM.'
  },
  {
    id: 'faq-4',
    category: 'general',
    question: '¿Cuánto demora la puesta en marcha de un proyecto?',
    questionPt: 'Quanto tempo leva para colocar o sistema em funcionamento?',
    answer: 'El plazo estándar es de 5 a 7 días hábiles para soluciones de Chatbot IA y CRM. Durante este tiempo configuramos la infraestructura, cargamos tus productos y preguntas frecuentes, y capacitamos a tu equipo en una videollamada personalizada.',
    answerPt: 'O prazo padrão é de 5 a 7 dias úteis para Chatbots IA e CRM, incluindo configuração completa e treinamento.'
  },
  {
    id: 'faq-5',
    category: 'precios',
    question: '¿Emiten factura oficial y cuáles son los medios de pago disponibles?',
    questionPt: 'Vocês emitem nota fiscal e quais são as formas de pagamento?',
    answer: 'Sí, emitimos Factura A o B (para Argentina) y facturas de exportación para clientes internacionales. Aceptamos transferencia bancaria en Pesos Argentinos (ARS), Dólares (USD), Mercado Pago, Pix (Brasil) y tarjetas de crédito internacionales.',
    answerPt: 'Sim, emitimos notas fiscais oficiais e aceitamos transferências bancárias locais, Pix, cartões e pagamentos internacionais.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: '¿Existe algún contrato de permanencia o costo de cancelación?',
    questionPt: 'Existe fidelidade contratual ou taxa de cancelamento?',
    answer: 'No. Nuestros planes mensuales no tienen permanencia mínima ni penalizaciones por cancelación. Eres dueño de tus datos y puedes exportar tus clientes, contactos y conversaciones en cualquier momento en formatos estándar (Excel, CSV, JSON).',
    answerPt: 'Não. Você pode cancelar ou alterar seu plano quando desejar, com total liberdade e posse dos seus dados.'
  }
];

export function FaqSection({ onOpenWizard }: { onOpenWizard?: () => void }) {
  const { isPortuguese } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchCat = selectedCategory === 'todos' || faq.category === selectedCategory;
      const qText = (isPortuguese ? faq.questionPt : faq.question).toLowerCase();
      const aText = (isPortuguese ? faq.answerPt : faq.answer).toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchQuery = !query || qText.includes(query) || aText.includes(query);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery, isPortuguese]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isPortuguese ? 'Tire suas Dúvidas' : 'Preguntas Frecuentes'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
          {isPortuguese ? 'Respostas claras para você decidir com segurança' : 'Todo lo que necesitas saber antes de comenzar'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {isPortuguese
            ? 'Encontre respostas rápidas sobre implementação, WhatsApp IA, faturamento e planos.'
            : 'Respuestas directas sobre implementación, tecnología, AFIP, WhatsApp y formas de pago.'}
        </p>

        {/* Search bar */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isPortuguese ? 'Buscar pergunta (ex: WhatsApp, AFIP, Preços)...' : 'Buscar duda (ej: WhatsApp, Facturación, Tiempos)...'}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none shadow-md"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'todos', label: isPortuguese ? 'Todas' : 'Todas' },
            { id: 'whatsapp', label: isPortuguese ? 'WhatsApp IA' : 'Chatbot WhatsApp' },
            { id: 'crm', label: isPortuguese ? 'CRM & AFIP' : 'CRM & Facturación' },
            { id: 'precios', label: isPortuguese ? 'Preços & Pagamentos' : 'Precios y Pagos' },
            { id: 'general', label: isPortuguese ? 'Geral' : 'General' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-900/95 border-emerald-500/40 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-extrabold text-sm text-white">
                  {isPortuguese ? faq.questionPt : faq.question}
                </span>
                <span className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {isPortuguese ? faq.answerPt : faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No encontramos respuestas para "{searchQuery}". ¿Quieres consultar directamente a un asesor?
          </div>
        )}
      </div>

      {/* Contact prompt */}
      <div className="mt-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left text-xs">
          <strong className="text-white block font-bold">¿Tienes una pregunta específica sobre tu rubro?</strong>
          <span className="text-slate-400">Nuestro equipo de consultores te responde por WhatsApp en minutos.</span>
        </div>

        <a
          href="https://wa.me/5492984510883?text=Hola%20Clientum!%20Tengo%20una%20consulta%20técnica"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0A2558] hover:bg-[#13377a] text-white border border-blue-500/30 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preguntar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
