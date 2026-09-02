import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, User, BookOpen, Clock, Tag, X, ArrowRight, Download, ExternalLink, Video, Sparkles, CheckCircle2 } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  desc: string;
  content: string;
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Cómo mejorar el SEO y Arquitectura Web de tu PyME en 2026',
    date: '15 de Agosto, 2026',
    author: 'Martín Rodríguez · Lead Architect',
    category: 'Marketing Digital',
    readTime: '5 min de lectura',
    desc: 'Descubre las mejores prácticas de arquitectura semántica, optimización de velocidad de carga y contenidos de valor para disparar tus visitas orgánicas gratis.',
    content: `El posicionamiento en motores de búsqueda (SEO) en 2026 ha evolucionado drásticamente. Ya no se trata únicamente de palabras clave en metaetiquetas, sino de arquitectura web limpia, velocidad de carga óptima y relevancia temática.

En esta guía para PyMEs explicamos:
1. **Core Web Vitals y Carga Ultra Rápida**: Cómo Vite, React 18 y CDN optimizan el renderizado en teléfonos móviles.
2. **Estructura Semántica de Contenidos**: Organizar las landing pages por verticales de negocio claras.
3. **Páginas Geolocalizadas**: Crear secciones específicas para ciudades objetivo como Neuquén, General Roca y Buenos Aires.
4. **Integración con Google Search Console**: Medir exactamente qué términos de búsqueda generan conversiones reales.`
  },
  {
    id: 'post-2',
    title: 'Tendencias en Comercio Electrónico Omnicanal y WhatsApp IA',
    date: '10 de Agosto, 2026',
    author: 'Equipo Comercial Clientum',
    category: 'Diseño & E-Commerce',
    readTime: '7 min de lectura',
    desc: 'Cómo conectar las experiencias físicas en tu local (como códigos QR de mesa) con tus canales digitales de venta y mensajería en piloto automático.',
    content: `La omnicanalidad dejó de ser una opción para convertirse en la exigencia estándar de los consumidores. Cuando un cliente consulta por WhatsApp, espera que el vendedor en la sucursal conozca el estado de su pedido.

**Puntos Clave:**
• **Inventario Unificado**: Sincronización automática de stock entre WooCommerce y sistemas ERP.
• **WhatsApp Business API**: Respuestas inmediatas con agentes virtuales alimentados por IA.
• **Link de Pago y Facturación AFIP**: Cierre de venta directo sin salir de la conversación de chat.`
  },
  {
    id: 'post-3',
    title: 'Estrategias de Marketing Digital & Embudo Comercial Automatizado',
    date: '02 de Agosto, 2026',
    author: 'Sofía Méndez · Growth Specialist',
    category: 'Estrategia Pyme',
    readTime: '6 min de lectura',
    desc: 'Descubre el embudo de ventas que duplica cierres de transacciones comerciales reduciendo el esfuerzo operativo del equipo de ventas.',
    content: `Automatizar el seguimiento comercial previene que hasta el 60% de las consultas se enfríen por falta de respuesta a tiempo.

**El Embudo Ideal:**
1. **Capta**: Formularios web y anuncios de Google/Meta canalizados directo al CRM.
2. **Califica**: Preguntas automatizadas para filtrar leads de alta intención.
3. **Convierte**: Cotización automática con un solo clic y aviso al vendedor para la llamada final.
4. **Fideliza**: Envíos periódicos de ofertas personalizadas según el historial del cliente.`
  },
  {
    id: 'post-4',
    title: 'El Impacto de la Inteligencia Artificial en Sistemas ERP',
    date: '25 de Julio, 2026',
    author: 'Diego Fernández · CTO',
    category: 'Tecnología ERP',
    readTime: '8 min de lectura',
    desc: 'Por qué automatizar las tareas repetitivas y la conciliación de facturas de AFIP libera hasta un 40% del tiempo de tu personal de administración.',
    content: `Los sistemas ERP tradicionales solían requerir horas de carga manual de comprobantes, pedidos y asientos contables. La integración con modelos de lenguaje y procesamiento de documentos revoluciona la gestión operativa.

• **Conciliación Inteligente**: Detección automática de discrepancias en comprobantes.
• **Pronóstico de Demanda**: Algoritmos que sugieren órdenes de compra según estacionalidad.
• **Reportes Financieros en Lenguaje Natural**: Consultas directas como "¿Cuál fue el margen de ganancia este mes?"`
  }
];

const LOCAL_STORAGE_KEY = 'clientum_blog_posts_v1';

export const BlogSectionManager: React.FC<{
  onContactClick?: (title: string) => void;
}> = ({ onContactClick }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error loading saved blog posts", e);
    }
    return INITIAL_BLOG_POSTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPostModal, setSelectedPostModal] = useState<BlogPost | null>(null);

  // Form state for creating a new post
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Tecnología');
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  });

  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error("Error saving blog posts", e);
    }
  }, [posts]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const wordCount = newContent.trim().split(/\s+/).length;
    const estimatedMin = Math.max(2, Math.ceil(wordCount / 150));

    const createdPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'Hoy',
      author: newAuthor.trim() || 'Equipo Clientum',
      category: newCategory || 'General',
      readTime: `${estimatedMin} min de lectura`,
      desc: newContent.trim().slice(0, 160) + (newContent.length > 160 ? '...' : ''),
      content: newContent.trim()
    };

    setPosts([createdPost, ...posts]);
    setFormSuccess(true);

    setTimeout(() => {
      setFormSuccess(false);
      setIsNewPostModalOpen(false);
      setNewTitle('');
      setNewAuthor('');
      setNewContent('');
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-200 pb-8">
        <div>
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold">
            Base de Conocimientos &amp; Novedades
          </span>
          <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mt-1">
            Blog &amp; Publicaciones de Clientum
          </h1>
          <p className="text-slate-500 text-xs mt-2 max-w-xl">
            Guías estratégicas, tendencias en software y tutoriales para acelerar la transformación de tu empresa.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Artículo</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar artículos (Ej. SEO, ERP, Marketing)..."
            className="w-full pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg py-2 text-xs focus:border-blue-600 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Total publicaciones: <span className="text-slate-900 font-bold">{filteredPosts.length}</span>
        </div>
      </div>

      {/* Articles Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {post.date}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedPostModal(post)}
                  className="font-display font-bold text-slate-950 text-lg leading-snug hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                  {post.desc}
                </p>

                <div className="flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPostModal(post)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Leer artículo completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onContactClick && (
                  <button
                    onClick={() => onContactClick(post.title)}
                    className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Consultar sobre este tema
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No se encontraron artículos que coincidan con tu búsqueda.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-slate-950 text-sm mb-4 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              Ebooks y Guías PDF
            </h3>
            <div className="flex flex-col gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1.5">
                <h4 className="font-bold text-xs text-slate-900">Ebook: Optimización E-commerce</h4>
                <p className="text-[10px] text-slate-500">Todo sobre conversiones y control de stock omnicanal.</p>
                <a
                  href="https://web.viaweb.net.ar/wp-content/uploads/2024/10/Brochure_Servicio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 hover:underline font-bold flex items-center gap-1 mt-1"
                >
                  Descargar PDF Gratis
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1.5">
                <h4 className="font-bold text-xs text-slate-900">Guía de Automatización ERP</h4>
                <p className="text-[10px] text-slate-500">Cómo enlazar bots de WhatsApp con transacciones.</p>
                <button
                  onClick={() => alert("Ebook enviado a tu correo registrado.")}
                  className="text-[10px] text-blue-600 hover:underline font-bold text-left flex items-center gap-1 mt-1 cursor-pointer"
                >
                  Solicitar por Email
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-400" />
              Videos Educativos
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
              Accede a nuestra biblioteca de tutoriales para comprender el uso de herramientas CRM integradas.
            </p>
            <button
              onClick={() => onContactClick?.('Academia Tutoriales')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all uppercase tracking-wider font-mono cursor-pointer"
            >
              Ver Tutoriales en Video
            </button>
          </div>
        </div>
      </div>

      {/* CREATE NEW POST MODAL */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsNewPostModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-extrabold text-slate-950 mb-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Publicar Nuevo Artículo en el Blog
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Añade una publicación con título, fecha, autor y contenido explicativo.
            </p>

            {formSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <span className="font-bold text-sm">¡Artículo publicado con éxito!</span>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Título del Artículo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Estrategias de Ciberseguridad para PyMEs"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Autor *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Juan Pérez"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fecha</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Tecnología">Tecnología</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Estrategia Pyme">Estrategia Pyme</option>
                      <option value="ERP & CRM">ERP &amp; CRM</option>
                      <option value="Ciberseguridad">Ciberseguridad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contenido del Artículo *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Escribe el contenido completo o resumen estructurado del artículo..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewPostModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Guardar y Publicar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* READ FULL POST MODAL */}
      {selectedPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedPostModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono">
                {selectedPostModal.category}
              </span>
              <span className="text-slate-400 text-xs font-mono">{selectedPostModal.date}</span>
              <span className="text-slate-400 text-xs font-mono">· {selectedPostModal.readTime}</span>
            </div>

            <h2 className="text-2xl font-display font-black text-slate-950 mb-3 leading-tight">
              {selectedPostModal.title}
            </h2>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pb-4 border-b border-slate-200 mb-6">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Por {selectedPostModal.author}</span>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700 whitespace-pre-line">
              {selectedPostModal.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-mono">Publicado en Blog de Clientum</span>
              <button
                onClick={() => setSelectedPostModal(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component to render recent posts list on the homepage
export const RecentBlogPostsSection: React.FC<{
  onGoToBlog: () => void;
}> = ({ onGoToBlog }) => {
  const [posts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading saved posts", e);
    }
    return INITIAL_BLOG_POSTS;
  });

  const recentPosts = posts.slice(0, 3);

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-mono text-[10px] uppercase font-bold tracking-widest">
              Novedades &amp; Conocimiento
            </span>
            <h2 className="text-2xl font-display font-black text-slate-950 tracking-tight mt-1">
              Últimos Artículos del Blog
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Guías prácticas para potenciar las ventas y la gestión tecnológica de tu PyME.
            </p>
          </div>

          <button
            onClick={onGoToBlog}
            className="self-start md:self-auto bg-white border border-slate-200 hover:border-blue-300 text-slate-900 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Ver Blog Completo</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-blue-50 text-blue-700 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md font-mono">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{post.date}</span>
                </div>

                <h3 className="font-display font-bold text-slate-950 text-sm leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[140px]">
                  {post.author}
                </span>

                <button
                  onClick={onGoToBlog}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Leer más</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
