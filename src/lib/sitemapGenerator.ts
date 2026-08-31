import { getAllIndustrySlugs } from '../data/industryLandings';

export function generateCompleteClientumSitemap(baseUrl: string = 'https://clientum.com.ar'): string {
  const today = new Date().toISOString().split('T')[0];
  const domain = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const staticPages = [
    { loc: `https://${domain}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `https://${domain}/crm`, priority: '0.9', changefreq: 'daily' },
    { loc: `https://${domain}/dominios`, priority: '0.9', changefreq: 'weekly' },
    { loc: `https://${domain}/cloudflare`, priority: '0.9', changefreq: 'weekly' },
    { loc: `https://${domain}/academia`, priority: '0.8', changefreq: 'weekly' },
    { loc: `https://${domain}/industrias`, priority: '0.8', changefreq: 'weekly' },
    { loc: `https://${domain}/login`, priority: '0.5', changefreq: 'monthly' },
    { loc: `https://${domain}/auth`, priority: '0.5', changefreq: 'monthly' },
    { loc: `https://${domain}/soporte`, priority: '0.7', changefreq: 'weekly' },
    { loc: `https://${domain}/docs`, priority: '0.7', changefreq: 'weekly' },
    { loc: `https://${domain}/blog`, priority: '0.7', changefreq: 'weekly' }
  ];

  const industrySlugs = getAllIndustrySlugs();
  const storeItems = [
    { id: 'whatsapp-bot-ai', name: 'Bot WhatsApp con IA y Gemini' },
    { id: 'crm-enterprise-suite', name: 'CRM Enterprise Multi-Canal' },
    { id: 'cloudflare-edge-ssl', name: 'Gestor Cloudflare Anycast & SSL' },
    { id: 'whatsapp-baileys-api', name: 'Conector Baileys API WhatsApp' }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- ========================================== -->
  <!-- CLIENTUMOS ENTERPRISE CORE & PLATFORM URLS  -->
  <!-- ========================================== -->
`;

  staticPages.forEach(p => {
    xml += `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`;
  });

  xml += `
  <!-- ========================================== -->
  <!-- INDUSTRY-SPECIFIC LANDING PAGES (${industrySlugs.length}) -->
  <!-- ========================================== -->
`;

  industrySlugs.forEach(slug => {
    xml += `  <url>
    <loc>https://${domain}/industria/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `
  <!-- ========================================== -->
  <!-- STORE CATALOG ITEMS (${storeItems.length})        -->
  <!-- ========================================== -->
`;

  storeItems.forEach(item => {
    xml += `  <url>
    <loc>https://${domain}/producto/${item.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}

export function generateStoreSitemap(subdomain: string, products: Array<{ id: string; name: string }>): string {
  const domain = subdomain || 'mi-tienda.clientum.com.ar';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  products.forEach(p => {
    const safeId = p.id || 'prod';
    xml += `  <url>
    <loc>https://${domain}/producto/${safeId}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}
