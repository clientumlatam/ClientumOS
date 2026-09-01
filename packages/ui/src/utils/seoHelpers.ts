export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  locale?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Updates document meta tags, canonical link, OpenGraph tags, and Schema.org JSON-LD scripts dynamically.
 */
export function updateDocumentSeo(config: SeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = config.title;

  // 2. Helper to set or create <meta>
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  // Standard Meta
  setMeta('name', 'description', config.description);
  if (config.keywords && config.keywords.length > 0) {
    setMeta('name', 'keywords', config.keywords.join(', '));
  }
  setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  setMeta('name', 'author', 'Clientum Software & IA');

  // Canonical Link
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://clientum.com.ar';
  const canonicalUrl = config.canonical
    ? (config.canonical.startsWith('http') ? config.canonical : `${currentOrigin}${config.canonical.startsWith('/') ? '' : '/'}${config.canonical}`)
    : (typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://clientum.com.ar');

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = canonicalUrl;

  // Open Graph
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', 'Clientum · Software & CRM para PyMEs');
  setMeta('property', 'og:locale', config.locale === 'pt-BR' ? 'pt_BR' : 'es_AR');

  if (config.ogImage) {
    setMeta('property', 'og:image', config.ogImage);
  }

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  if (config.ogImage) {
    setMeta('name', 'twitter:image', config.ogImage);
  }

  // Schema.org JSON-LD Script
  if (config.jsonLd) {
    const scriptId = 'clientum-seo-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(config.jsonLd);
  }
}

/**
 * Builds standard Schema.org structured data object for an industry vertical landing page.
 */
export function buildIndustryStructuredData(params: {
  industryName: string;
  industrySlug: string;
  description: string;
  faqs?: Array<{ question: string; answer: string }>;
  canonicalUrl: string;
}) {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://clientum.com.ar';
  const fullUrl = `${currentOrigin}${params.canonicalUrl.startsWith('/') ? '' : '/'}${params.canonicalUrl}`;

  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Clientum para ${params.industryName}`,
      serviceType: 'Software de Gestión, CRM & Chatbot WhatsApp con Inteligencia Artificial',
      provider: {
        '@type': 'Organization',
        name: 'Clientum S.R.L.',
        url: 'https://clientum.com.ar',
        logo: `${currentOrigin}/favicon.svg`,
        sameAs: [
          'https://linkedin.com/company/clientum',
          'https://instagram.com/clientum'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'General Roca',
          addressRegion: 'Río Negro',
          addressCountry: 'AR'
        }
      },
      description: params.description,
      url: fullUrl,
      areaServed: [
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Country', name: 'Brasil' },
        { '@type': 'Country', name: 'Chile' },
        { '@type': 'Country', name: 'Uruguay' }
      ],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '20.00',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-01'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: currentOrigin
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Industrias & Soluciones Verticales',
          item: `${currentOrigin}/industrias`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: params.industryName,
          item: fullUrl
        }
      ]
    }
  ];

  // FAQ Schema if provided
  if (params.faqs && params.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: params.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}
