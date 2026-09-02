import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es-AR' | 'pt-BR';

export interface OfficeInfo {
  name: string;
  location: string;
  leader: string;
  leaderRole: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    'es-AR': string;
    'pt-BR': string;
  };
}

export const OFFICES_INFO: Record<'argentina' | 'brasil', OfficeInfo> = {
  argentina: {
    name: 'Sede Principal — Patagonia Argentina',
    location: 'General Roca, Río Negro, Argentina',
    leader: 'Jonathan Ledantes',
    leaderRole: 'CEO & Co-Fundador',
    country: 'Argentina',
    phone: '+54 298 451-0883',
    email: 'info@clientum.com.ar',
    address: 'General Roca, Río Negro — Patagonia Argentina',
    description: 'Casa Matriz y Centro de Desarrollo Tecnológico, Inteligencia Artificial y Operaciones Centrales.',
    flag: '🇦🇷'
  },
  brasil: {
    name: 'Sede Internacional — Brasil',
    location: 'Arraial do Cabo, Rio de Janeiro, Brasil',
    leader: 'Matias Rotili',
    leaderRole: 'Director Internacional & Co-Fundador',
    country: 'Brasil',
    phone: '+54 9 291 440-9805',
    email: 'brasil@clientum.com.ar',
    address: 'Matias Andres Rotili Poinsof - Arraial do Cabo, RJ, Brasil',
    description: 'Expansión B2B, Alianzas Comerciales para el mercado brasileño y Conectividad Regional en LATAM.',
    flag: '🇧🇷'
  }
};

export const DICTIONARY: Translations = {
  // Navigation & General
  'nav.crm': { 'es-AR': 'CRM & Ventas B2B', 'pt-BR': 'CRM & Vendas B2B' },
  'nav.marketing': { 'es-AR': 'Marketing & Contenido', 'pt-BR': 'Marketing & Conteúdo' },
  'nav.seo': { 'es-AR': 'SEO & Crecimiento Orgánico', 'pt-BR': 'SEO & Crescimento Orgânico' },
  'nav.tools': { 'es-AR': 'Herramientas & Agentes IA', 'pt-BR': 'Ferramentas & Agentes IA' },
  'nav.public_site': { 'es-AR': 'Sitio Público', 'pt-BR': 'Site Público' },
  'nav.search': { 'es-AR': 'Buscar (Ctrl+K)...', 'pt-BR': 'Buscar (Ctrl+K)...' },
  'nav.print': { 'es-AR': 'Imprimir', 'pt-BR': 'Imprimir' },
  'nav.pdf': { 'es-AR': 'Exportar PDF', 'pt-BR': 'Exportar PDF' },
  'nav.login': { 'es-AR': 'Iniciar Sesión', 'pt-BR': 'Entrar' },
  'nav.logout': { 'es-AR': 'Cerrar Sesión', 'pt-BR': 'Sair' },
  'nav.back_to_editor': { 'es-AR': 'Volver al Panel CRM', 'pt-BR': 'Voltar ao Painel CRM' },
  'nav.home': { 'es-AR': 'Inicio', 'pt-BR': 'Início' },
  'nav.solutions': { 'es-AR': 'Soluciones', 'pt-BR': 'Soluções' },
  'nav.industries': { 'es-AR': 'Industrias', 'pt-BR': 'Indústrias' },
  'nav.cases': { 'es-AR': 'Casos de Éxito', 'pt-BR': 'Casos de Sucesso' },
  'nav.resources': { 'es-AR': 'Recursos', 'pt-BR': 'Recursos' },
  'nav.pricing': { 'es-AR': 'Precios', 'pt-BR': 'Preços' },
  'nav.company': { 'es-AR': 'Empresa', 'pt-BR': 'Empresa' },
  'nav.request_demo': { 'es-AR': 'Solicitar Demo', 'pt-BR': 'Solicitar Demo' },
  'nav.brochure': { 'es-AR': 'Brochure PDF', 'pt-BR': 'Brochure PDF' },
  'nav.services': { 'es-AR': 'Servicios', 'pt-BR': 'Serviços' },
  'nav.courses': { 'es-AR': 'Cursos LMS', 'pt-BR': 'Cursos LMS' },

  // Headquarters & Leadership
  'hq.main_title': { 'es-AR': 'Sede Principal Patagonia Argentina', 'pt-BR': 'Sede Principal Patagônia Argentina' },
  'hq.main_location': { 'es-AR': 'General Roca, Río Negro', 'pt-BR': 'General Roca, Río Negro' },
  'hq.main_leader': { 'es-AR': 'Jonathan Ledantes (CEO & Co-Fundador)', 'pt-BR': 'Jonathan Ledantes (CEO & Co-Fundador)' },
  'hq.brasil_title': { 'es-AR': 'Sede Internacional Brasil', 'pt-BR': 'Sede Internacional Brasil' },
  'hq.brasil_location': { 'es-AR': 'Arraial do Cabo, Rio de Janeiro', 'pt-BR': 'Arraial do Cabo, Rio de Janeiro' },
  'hq.brasil_leader': { 'es-AR': 'Matias Rotili (Director Internacional & Co-Fundador)', 'pt-BR': 'Matias Rotili (Diretor Internacional & Co-Fundador)' },
  'hq.bilateral': { 'es-AR': 'Estructura Binacional: Argentina (General Roca) · Brasil (Arraial do Cabo)', 'pt-BR': 'Estrutura Binacional: Argentina (General Roca) · Brasil (Arraial do Cabo)' },

  // Hero & Public Site
  'hero.tag': { 'es-AR': 'Plataforma All-in-One para PyMEs', 'pt-BR': 'Plataforma All-in-One para PMEs' },
  'hero.title_start': { 'es-AR': 'Todo lo que tu empresa', 'pt-BR': 'Tudo o que sua empresa' },
  'hero.title_needs': { 'es-AR': 'necesita,', 'pt-BR': 'precisa,' },
  'hero.title_highlight': { 'es-AR': 'en una sola plataforma.', 'pt-BR': 'em uma única plataforma.' },
  'hero.subtitle': { 
    'es-AR': 'CRM, Chatbot WhatsApp con IA, E-Commerce, ERP, Business Intelligence, Marketing Digital, Ciberseguridad, Cloud, Apps Móviles y Capacitación — el ecosistema completo de Clientum para hacer crecer tu PyME.',
    'pt-BR': 'CRM, Chatbot WhatsApp com IA, E-Commerce, ERP, Business Intelligence, Marketing Digital, Cibersegurança, Cloud, Aplicativos Móveis e Capacitação — o ecossistema completo da Clientum para acelerar sua PME.'
  },
  'hero.cta_services': { 'es-AR': 'Ver Servicios', 'pt-BR': 'Ver Serviços' },
  'hero.cta_demo': { 'es-AR': 'Solicitar Demo', 'pt-BR': 'Solicitar Demo' },
  'hero.cta_brochure': { 'es-AR': 'Brochure PDF', 'pt-BR': 'Brochure PDF' },
  'hero.check_1': { 'es-AR': 'Sin contrato mínimo', 'pt-BR': 'Sem contrato mínimo' },
  'hero.check_2': { 'es-AR': 'Implementado en 5 días', 'pt-BR': 'Implementado em 5 dias' },
  'hero.check_3': { 'es-AR': 'Soporte multilingüe 24/7', 'pt-BR': 'Suporte multilíngue 24/7' },

  // Hero Form
  'form.live_badge': { 'es-AR': 'En Vivo', 'pt-BR': 'Ao Vivo' },
  'form.title': { 'es-AR': 'Solicitá un Presupuesto Gratuito', 'pt-BR': 'Solicite um Orçamento Gratuito' },
  'form.subtitle': { 'es-AR': 'Cargá tus datos y el equipo de Clientum te enviará una demo adaptada a tu escala.', 'pt-BR': 'Preencha seus dados e a equipe Clientum enviará uma demonstração adaptada à sua empresa.' },
  'form.name_label': { 'es-AR': 'Tu Nombre', 'pt-BR': 'Seu Nome' },
  'form.name_placeholder': { 'es-AR': 'Ej. Martín Rodríguez', 'pt-BR': 'Ex. Marcos da Silva' },
  'form.email_label': { 'es-AR': 'Correo Electrónico', 'pt-BR': 'E-mail Corporativo' },
  'form.email_placeholder': { 'es-AR': 'Ej. martin@empresa.com', 'pt-BR': 'Ex. marcos@empresa.com.br' },
  'form.company_label': { 'es-AR': 'Empresa', 'pt-BR': 'Empresa' },
  'form.company_placeholder': { 'es-AR': 'Ej. Distribuidora Sur', 'pt-BR': 'Ex. Distribuidora Litoral' },
  'form.service_label': { 'es-AR': 'Servicio de Interés', 'pt-BR': 'Serviço de Interesse' },
  'form.submit': { 'es-AR': 'Enviar Solicitud', 'pt-BR': 'Enviar Solicitação' },

  // Solutions Section
  'sol.title': { 'es-AR': 'Nuestras Soluciones Integradas', 'pt-BR': 'Nossas Soluções Integradas' },
  'sol.subtitle': { 'es-AR': 'Tecnología robusta diseñada para resolver problemas comerciales reales de empresas en expansión.', 'pt-BR': 'Tecnologia robusta projetada para resolver desafios comerciais reais de empresas em expansão.' },
  'sol.tab_chatbot': { 'es-AR': 'Chatbot WhatsApp', 'pt-BR': 'Chatbot WhatsApp' },
  'sol.tab_crm': { 'es-AR': 'CRM Inteligente', 'pt-BR': 'CRM Inteligente' },
  'sol.tab_ia': { 'es-AR': 'Asistente IA', 'pt-BR': 'Assistente IA' },
  'sol.tab_bi': { 'es-AR': 'Business Intelligence', 'pt-BR': 'Business Intelligence' },
  'sol.tab_auto': { 'es-AR': 'Automatización', 'pt-BR': 'Automação' },
  'sol.tab_portal': { 'es-AR': 'Portal del Cliente', 'pt-BR': 'Portal do Cliente' },
  'sol.tab_web': { 'es-AR': 'Desarrollo Web', 'pt-BR': 'Desenvolvimento Web' },
  'sol.tab_erp': { 'es-AR': 'ERP & Facturación', 'pt-BR': 'ERP & Faturamento' },

  // Pricing & Plans
  'pricing.title': { 'es-AR': 'Planes Claros y Transparentes', 'pt-BR': 'Planos Claros e Transparentes' },
  'pricing.subtitle': { 'es-AR': 'Elegí el plan que mejor se adapta al tamaño y momento de tu empresa. Sin costos ocultos.', 'pt-BR': 'Escolha o plano que melhor se adapta ao tamanho e momento da sua empresa. Sem custos ocultos.' },
  'pricing.monthly': { 'es-AR': 'Facturación mensual', 'pt-BR': 'Faturamento mensal' },
  'pricing.cta_choose': { 'es-AR': 'Elegir Plan', 'pt-BR': 'Escolher Plano' },
  'pricing.cta_talk': { 'es-AR': 'Hablar con Asesor', 'pt-BR': 'Falar com Consultor' },
  'pricing.badge_popular': { 'es-AR': 'Más Elegido', 'pt-BR': 'Mais Escolhido' },

  // Offices & Contact
  'contact.title': { 'es-AR': 'Hablemos de tu Próximo Proyecto', 'pt-BR': 'Vamos Falar do seu Próximo Projeto' },
  'contact.subtitle': { 'es-AR': 'Estamos listos para asesorarte desde nuestras sedes en Argentina y Brasil.', 'pt-BR': 'Estamos prontos para atendê-lo a partir de nossas sedes na Argentina e Brasil.' },
  'contact.offices_title': { 'es-AR': 'Nuestras Sedes Oficiales', 'pt-BR': 'Nossas Sedes Oficiais' },
  'contact.hq_roca_badge': { 'es-AR': 'Sede Principal Argentina', 'pt-BR': 'Sede Principal Argentina' },
  'contact.hq_brasil_badge': { 'es-AR': 'Sede Internacional Brasil', 'pt-BR': 'Sede Internacional Brasil' },
  'contact.send_msg': { 'es-AR': 'Enviar Mensaje', 'pt-BR': 'Enviar Mensagem' },
  'contact.direct_phone': { 'es-AR': 'Atención Directa', 'pt-BR': 'Atendimento Direto' },

  // FAQ
  'faq.title': { 'es-AR': 'Preguntas Frecuentes', 'pt-BR': 'Perguntas Frequentes' },
  'faq.subtitle': { 'es-AR': 'Todo lo que necesitás saber sobre la implementación, tecnología y servicios de Clientum.', 'pt-BR': 'Tudo o que você precisa saber sobre a implementação, tecnologia e serviços da Clientum.' },

  // Footer
  'footer.brand_desc': { 'es-AR': 'Ecosistema comercial e ingeniería de software para PyMEs y empresas en expansión en Argentina, Brasil y LATAM.', 'pt-BR': 'Ecossistema comercial e engenharia de software para PMEs e empresas em expansão na Argentina, Brasil e LATAM.' },
  'footer.solutions': { 'es-AR': 'Soluciones', 'pt-BR': 'Soluções' },
  'footer.industries': { 'es-AR': 'Industrias', 'pt-BR': 'Indústrias' },
  'footer.resources': { 'es-AR': 'Recursos', 'pt-BR': 'Recursos' },
  'footer.company': { 'es-AR': 'Empresa', 'pt-BR': 'Empresa' },
  'footer.rights': { 'es-AR': '© 2026 Clientum S.R.L. — Todos los derechos reservados.', 'pt-BR': '© 2026 Clientum S.R.L. — Todos os direitos reservados.' },
  'footer.sedes_notice': { 'es-AR': 'Sede Central: General Roca, Río Negro 🇦🇷 · Sede Brasil: Arraial do Cabo, RJ 🇧🇷', 'pt-BR': 'Sede Central: General Roca, Río Negro 🇦🇷 · Sede Brasil: Arraial do Cabo, RJ 🇧🇷' },

  // Language Selector labels
  'lang.select': { 'es-AR': 'Idioma / Idioma', 'pt-BR': 'Idioma / Idioma' },
  'lang.es_ar': { 'es-AR': '🇦🇷 Español (Argentina)', 'pt-BR': '🇦🇷 Espanhol (Argentina)' },
  'lang.pt_br': { 'es-AR': '🇧🇷 Português (Brasil)', 'pt-BR': '🇧🇷 Português (Brasil)' },
  'lang.badge_ar': { 'es-AR': '🇦🇷 ES (AR)', 'pt-BR': '🇦🇷 ES (AR)' },
  'lang.badge_br': { 'es-AR': '🇧🇷 PT (BR)', 'pt-BR': '🇧🇷 PT (BR)' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  offices: typeof OFFICES_INFO;
  isPortuguese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('clientum_language');
      if (saved === 'pt-BR' || saved === 'es-AR') return saved;
      const navLang = navigator.language || '';
      if (navLang.startsWith('pt')) return 'pt-BR';
    } catch {
      // ignore
    }
    return 'es-AR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('clientum_language', lang);
      document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : 'es-AR';
      window.dispatchEvent(new CustomEvent('clientum-language-change', { detail: { language: lang } }));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language === 'pt-BR' ? 'pt-BR' : 'es-AR';
    } catch {
      // ignore
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const entry = DICTIONARY[key];
    if (!entry) return defaultText || key;
    return entry[language] || entry['es-AR'] || defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        offices: OFFICES_INFO,
        isPortuguese: language === 'pt-BR'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackLang: Language = 'es-AR';
    return {
      language: fallbackLang,
      setLanguage: () => {},
      t: (key: string, defaultText?: string) => DICTIONARY[key]?.[fallbackLang] || defaultText || key,
      offices: OFFICES_INFO,
      isPortuguese: false
    };
  }
  return context;
}
