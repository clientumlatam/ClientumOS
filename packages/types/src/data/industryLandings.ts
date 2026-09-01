import { IndustryLandingData } from '../index';
import { 
  Sprout, 
  Building2, 
  Stethoscope, 
  Scale, 
  Truck, 
  ShoppingCart, 
  Utensils, 
  Laptop
} from 'lucide-react';

export const INDUSTRIES: IndustryLandingData[] = [
  {
    slug: 'agro',
    name: 'Agroindustria & Campo',
    namePt: 'Agronegócio & Campo',
    badge: 'Solución Líder en LATAM',
    badgePt: 'Solução Líder na LATAM',
    simulatorId: 'agro',
    whatsappPrompt: 'Hola, me interesa automatizar mi agronomía',
    whatsappPromptPt: 'Olá, estou interessado em automatizar minha agronomia',
    hero: {
      badgePill: 'Digitalización del Agro 2026',
      badgePillPt: 'Digitalização do Agro 2026',
      headline: 'Transformamos la gestión de su',
      headlinePt: 'Transformamos a gestão do seu',
      highlight: 'empresa agroindustrial',
      highlightPt: 'agronegócio',
      subheadline: 'Automatice la toma de pedidos, sincronice con AFIP y gestione su logística desde WhatsApp.',
      subheadlinePt: 'Automatize a recepção de pedidos, sincronize com faturamento e gerencie sua logística pelo WhatsApp.',
      bullets: [
        { text: 'Pedidos por WhatsApp con stock real', textPt: 'Pedidos por WhatsApp com estoque real' },
        { text: 'Facturación automática AFIP', textPt: 'Faturamento automático de notas fiscais' },
        { text: 'Control de logística y despachos', textPt: 'Controle de logística e despachos' }
      ]
    },
    metrics: [
      { value: '+45%', label: 'Eficiencia en Pedidos', labelPt: 'Eficiência em Pedidos', detail: 'Reducción de errores manuales', detailPt: 'Redução de erros manuais' },
      { value: '24/7', label: 'Atención al Cliente', labelPt: 'Atendimento ao Cliente', detail: 'Bot especializado en insumos', detailPt: 'Bot especializado em insumos' }
    ],
    painPoints: [
      { 
        problem: 'Pedidos perdidos en chats interminables', 
        problemPt: 'Pedidos perdidos em conversas intermináveis',
        solution: 'Bot inteligente que toma el pedido y lo sube al CRM',
        solutionPt: 'Bot inteligente que recebe o pedido e sobe para o CRM'
      }
    ],
    features: [
      { 
        tag: 'CRM Agro', 
        tagPt: 'CRM Agro',
        title: 'Gestión de Lotes y Clientes',
        titlePt: 'Gestão de Lotes e Clientes',
        description: 'Seguimiento por zona, cultivo y potencial de compra.',
        descriptionPt: 'Acompanhamento por zona, cultura e potencial de compra.'
      }
    ],
    caseStudy: {
      company: 'Agro-Industrial Patagonia',
      location: 'Río Negro, Argentina',
      logoText: 'AGRO-PAT',
      challenge: 'No tenían control sobre los pedidos que llegaban por WhatsApp.',
      challengePt: 'Não tinham controle sobre os pedidos que chegavam pelo WhatsApp.',
      result: 'Aumento del 35% en cierres comerciales en 3 meses.',
      resultPt: 'Aumento de 35% nos fechamentos comerciais em 3 meses.',
      quote: 'Clientum nos permitió escalar sin contratar más administrativos.',
      quotePt: 'Clientum nos permitiu escalar sem contratar mais administrativos.',
      author: 'Ing. Roberto Albarracín',
      role: 'CEO'
    },
    faq: [
      { 
        question: '¿Se integra con mi sistema actual?', 
        questionPt: 'Integra com meu sistema atual?',
        answer: 'Sí, mediante API o importación masiva de Excel.',
        answerPt: 'Sim, via API ou importação massiva de Excel.'
      }
    ],
    seo: {
      title: 'CRM para el Agro | Clientum',
      titlePt: 'CRM para o Agronegócio | Clientum',
      description: 'Digitalice su agronomía con Clientum.',
      descriptionPt: 'Digitalize seu agronegócio com a Clientum.',
      keywords: 'agro, crm, whatsapp, afip',
      canonical: 'https://clientum.com.ar/industria/agro'
    }
  }
];

export const getIndustryBySlug = (slug: string): IndustryLandingData | null => {
  return INDUSTRIES.find(i => i.slug === slug) || null;
};

export const getAllIndustrySummaries = () => {
  return INDUSTRIES.map(i => ({
    slug: i.slug,
    name: i.name,
    namePt: i.namePt,
    icon: Sprout // Default for mock
  }));
};

export const getRelatedIndustries = (currentSlug: string, count: number) => {
  return INDUSTRIES.filter(i => i.slug !== currentSlug).slice(0, count);
};

export const getAllIndustrySlugs = () => INDUSTRIES.map(i => i.slug);
