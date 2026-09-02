import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  Globe, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Code, 
  BarChart3, 
  Send, 
  X, 
  FileText, 
  ArrowLeft,
  ChevronRight,
  User,
  Mail,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
}

export const PublicStorefrontPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const storeSlug = slug || 'mi-tienda';

  // State for store data
  const [storeData, setStoreData] = useState({
    name: storeSlug.replace(/-/g, ' ').toUpperCase(),
    slogan: 'Soluciones profesionales y productos de alta calidad garantizada.',
    whatsapp: '+5491155443322',
    email: 'contacto@' + storeSlug + '.com',
    currency: 'USD',
    themeColor: 'emerald',
    subdomain: storeSlug + '.clientum.com.ar',
  });

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'p1',
      name: 'Paquete de Consultoría Estratégica B2B',
      price: 499,
      category: 'Servicios',
      description: 'Asesoramiento experto para escalar procesos comerciales y automatizar funnels con IA.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60',
      inStock: true
    },
    {
      id: 'p2',
      name: 'Licencia Anual Plataforma Clientum PRO',
      price: 1200,
      category: 'Software',
      description: 'Acceso ilimitado a CRM multi-tenant, bots de WhatsApp 24/7 y analíticas avanzadas.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
      inStock: true
    },
    {
      id: 'p3',
      name: 'Implementación de Agente IA en WhatsApp',
      price: 350,
      category: 'Automatización',
      description: 'Configuración llave en mano de asistente virtual conectado a tu base de datos.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=60',
      inStock: true
    }
  ]);

  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [analyticsViewRecorded, setAnalyticsViewRecorded] = useState(false);
  const [visitorCount, setVisitorCount] = useState(142);
  const [activeTab, setActiveTab] = useState<'catalog' | 'about' | 'seoModal'>('catalog');

  // SEO & Meta-tags state
  const [seoTitle, setSeoTitle] = useState(`${storeSlug.replace(/-/g, ' ')} | Tienda Oficial Clientum`);
  const [seoDescription, setSeoDescription] = useState(`Explora los servicios y productos de ${storeSlug}. Compra online o contáctanos por WhatsApp.`);
  const [isOptimizingAi, setIsOptimizingAi] = useState(false);

  // Record analytics view on mount
  useEffect(() => {
    if (!analyticsViewRecorded) {
      setVisitorCount(prev => prev + 1);
      setAnalyticsViewRecorded(true);

      // Save analytics to localStorage for CRM dashboard
      const analyticsKey = `clientum_store_analytics_${storeSlug}`;
      const existing = localStorage.getItem(analyticsKey);
      let stats = existing ? JSON.parse(existing) : { views: 142, whatsappClicks: 28, leadSubmissions: 12 };
      stats.views += 1;
      localStorage.setItem(analyticsKey, JSON.stringify(stats));
    }
  }, [storeSlug, analyticsViewRecorded]);

  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const handleWhatsAppCheckout = () => {
    const itemsText = cart.map(i => `${i.quantity}x ${i.product.name} ($${i.product.price * i.quantity})`).join('\n');
    const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const text = encodeURIComponent(`Hola! Quiero realizar el siguiente pedido desde la tienda ${storeData.name}:\n\n${itemsText}\n\n*Total: $${total}*\n\n¡Espero confirmación!`);
    
    // Log analytics click
    const analyticsKey = `clientum_store_analytics_${storeSlug}`;
    const existing = localStorage.getItem(analyticsKey);
    let stats = existing ? JSON.parse(existing) : { views: 142, whatsappClicks: 28, leadSubmissions: 12 };
    stats.whatsappClicks += 1;
    localStorage.setItem(analyticsKey, JSON.stringify(stats));

    window.open(`https://wa.me/${storeData.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerContact) {
      alert('Por favor ingresa tu nombre y email o teléfono.');
      return;
    }

    // Save lead to CRM localStorage
    const leadObj = {
      id: 'lead_' + Date.now(),
      name: customerName,
      email: customerContact.includes('@') ? customerContact : `${customerContact}@clientum.lead`,
      phone: customerContact,
      company: storeData.name,
      notes: customerMessage || 'Contacto rápido desde tienda pública.',
      source: 'Public Storefront',
      createdAt: new Date().toISOString()
    };

    const existingLeads = JSON.parse(localStorage.getItem('clientum_leads') || '[]');
    localStorage.setItem('clientum_leads', JSON.stringify([leadObj, ...existingLeads]));

    // Update analytics
    const analyticsKey = `clientum_store_analytics_${storeSlug}`;
    const existing = localStorage.getItem(analyticsKey);
    let stats = existing ? JSON.parse(existing) : { views: 142, whatsappClicks: 28, leadSubmissions: 12 };
    stats.leadSubmissions += 1;
    localStorage.setItem(analyticsKey, JSON.stringify(stats));

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.');
    setIsQuickContactOpen(false);
    setCustomerName('');
    setCustomerContact('');
    setCustomerMessage('');
  };

  const handleAiSeoOptimize = () => {
    setIsOptimizingAi(true);
    setTimeout(() => {
      setSeoTitle(`${storeData.name} | Soluciones B2B Líderes en el Mercado`);
      setSeoDescription(`Descubre la oferta comercial oficial de ${storeData.name}. Optimizado con IA para máxima conversión y posicionamiento en Google.`);
      setIsOptimizingAi(false);
      confetti({ particleCount: 70, spread: 50 });
    }, 900);
  };

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${storeData.subdomain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${products.map(p => `  <url>
    <loc>https://${storeData.subdomain}/producto/${p.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  endurl>`).join('\n')}
</urlset>`;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-slate-100 flex flex-col font-sans">
      {/* Subdomain & Simulation Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-purple-900/60 border-b border-blue-500/30 px-4 py-2.5 text-xs text-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-[10px] border border-blue-500/40">
            Subdominio Activo
          </span>
          <span className="font-mono text-emerald-400 font-bold">https://{storeData.subdomain}</span>
          <span className="text-slate-400 hidden sm:inline">• (Redirección DNS automatizada vía Clientum Cloud)</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/crm/publicStore"
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al CRM Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-[#1e2330] bg-[#121620]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg">
            {storeData.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base tracking-tight">{storeData.name}</h1>
            <p className="text-[11px] text-slate-400">{storeData.slogan}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151c2b] to-[#0d0f14] py-16 px-6 border-b border-[#1e2330]">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Comercio Verificado en Red Clientum B2B</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {storeData.name}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {storeData.slogan} Contáctanos directamente vía WhatsApp o explora nuestro catálogo de soluciones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${storeData.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
            <button
              onClick={() => setIsQuickContactOpen(true)}
              className="px-6 py-3 bg-[#1a2130] hover:bg-[#232d46] text-slate-200 border border-slate-700/80 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Dejar Consulta / Lead</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-10 space-y-10">
        <div className="flex items-center justify-between border-b border-[#1e2330] pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span>Catálogo de Productos y Servicios</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Visitas totales: {visitorCount}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(prod => (
            <div key={prod.id} className="bg-[#131722] border border-[#1e2330] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <div className="relative h-48 bg-[#1a2130] overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    {prod.category}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{prod.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{prod.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <span className="text-lg font-extrabold text-emerald-400">${prod.price} {storeData.currency}</span>
                <button
                  onClick={() => addToCart(prod)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SEO & Sitemap Admin Tools Box (Visible for store owners / preview) */}
        <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Módulo SEO & Optimización Automática (Gemini AI)</span>
              </h4>
              <p className="text-xs text-slate-400">Meta-tags generados automáticamente y sitemap.xml optimizado para motores de búsqueda.</p>
            </div>
            <button
              onClick={handleAiSeoOptimize}
              disabled={isOptimizingAi}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-600/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isOptimizingAi ? 'Optimizando con IA...' : 'Optimizar SEO con Gemini'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-[#171d2b] p-5 rounded-2xl border border-[#232d44]">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Meta Tags Detectados</div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-mono">Title:</span>
                  <div className="text-white font-medium bg-[#121620] p-2 rounded-lg mt-1 border border-slate-800">{seoTitle}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-mono">Description:</span>
                  <div className="text-slate-300 bg-[#121620] p-2 rounded-lg mt-1 border border-slate-800">{seoDescription}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-[#171d2b] p-5 rounded-2xl border border-[#232d44] flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Sitemap.xml (Indexación Google)</div>
                <pre className="text-[10px] font-mono text-emerald-400 bg-[#121620] p-3 rounded-xl border border-slate-800 h-28 overflow-y-auto">
                  {sitemapXml}
                </pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sitemapXml);
                  alert('¡Sitemap.xml copiado al portapapeles!');
                }}
                className="w-full py-2 bg-[#1e2638] hover:bg-[#253047] text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Copiar Sitemap XML
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Quick Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <a
          href={`https://wa.me/${storeData.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-transform hover:scale-110 cursor-pointer"
          title="Chat Directo WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
        </a>

        <button
          onClick={() => setIsQuickContactOpen(true)}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs shadow-2xl shadow-blue-600/40 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Contacto Rápido</span>
        </button>
      </div>

      {/* Quick Contact Modal */}
      {isQuickContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131722] border border-[#232d44] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setIsQuickContactOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Contacto Rápido & Leads</h3>
              <p className="text-xs text-slate-400">Deja tu mensaje y se registrará automáticamente en nuestro CRM comercial.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tu Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Mendoza"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email o Teléfono WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="ejemplo@empresa.com / +54 9 11..."
                  value={customerContact}
                  onChange={e => setCustomerContact(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Mensaje o Consulta</label>
                <textarea
                  rows={3}
                  placeholder="¿En qué podemos ayudarte?"
                  value={customerMessage}
                  onChange={e => setCustomerMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                Enviar Mensaje a {storeData.name}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#131722] border-l border-[#232d44] h-full flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2330]">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <span>Tu Carrito de Compras</span>
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-500 text-xs">Tu carrito está vacío.</div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="p-4 bg-[#181f2d] rounded-2xl border border-[#232d44] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white text-xs">{item.product.name}</h4>
                      <p className="text-[11px] text-slate-400">{item.quantity}x ${item.product.price}</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#1e2330] space-y-4">
                <div className="flex items-center justify-between text-base font-bold text-white">
                  <span>Total:</span>
                  <span className="text-emerald-400 font-mono">
                    ${cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)} {storeData.currency}
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Completar Pedido vía WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
