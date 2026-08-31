export function generateStoreSitemap(subdomain: string, products: Array<{ id: string; name: string }>): string {
  const domain = subdomain || 'mi-tienda.clientum.com.ar';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Main Storefront Landing Page -->
  <url>
    <loc>https://${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  products.forEach(p => {
    const safeId = p.id || 'prod';
    xml += `  <!-- Product / Service Page: ${p.name} -->
  <url>
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
