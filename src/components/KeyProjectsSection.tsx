import React from 'react';
import { ExternalLink, FolderGit2, Sparkles, ArrowRight, Code, Layers } from 'lucide-react';

export interface KeyProject {
  id: string;
  title: string;
  description: string;
  category: string;
  repoUrl: string;
  demoUrl: string;
  tags: string[];
  featuredBadge?: string;
}

export const KEY_PROJECTS: KeyProject[] = [
  {
    id: 'prospecting-ia',
    title: 'Prospección Maps & Inteligencia B2B',
    description: 'Búsqueda territorial con mapa interactivo Leaflet, geolocalización de prospectos en tiempo real, enriquecimiento de decisores y diagnóstico FODA automático mediante IA.',
    category: 'Inteligencia Artificial & Geolocalización',
    repoUrl: 'https://github.com/clientum/prospecting-b2b-ia',
    demoUrl: 'https://ai.studio/apps/f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8',
    tags: ['React 18', 'Leaflet', 'Gemini 2.5', 'Node.js', 'Tailwind'],
    featuredBadge: 'Destacado IA'
  },
  {
    id: 'whatsapp-crm',
    title: 'Bot de WhatsApp Business & CRM Omnicanal',
    description: 'Agente virtual con API oficial de WhatsApp Business para calificación automática de leads 24/7, catálogo interactivo y sincronización con facturación AFIP.',
    category: 'Automatización & CRM',
    repoUrl: 'https://github.com/clientum/whatsapp-crm-bot',
    demoUrl: 'https://web.clientum.com.ar/demo-bot',
    tags: ['WhatsApp API', 'Node.js', 'Express', 'CRM Sync', 'AFIP'],
    featuredBadge: 'Most Hired'
  },
  {
    id: 'consorcio-riego',
    title: 'Consorcio de Riego ERP & Trazabilidad',
    description: 'Sistema ERP para gestión de padrón de regantes, distribución de turnos hídricos y emisión masiva de cánones con telemetría en tiempo real.',
    category: 'ERP & Agroindustria',
    repoUrl: 'https://github.com/clientum/consorcio-riego-erp',
    demoUrl: 'https://riego.clientum.com.ar',
    tags: ['Dolibarr', 'PostgreSQL', 'React', 'AgroTech'],
  },
  {
    id: 'lubrano-ecommerce',
    title: 'Lubrano Hogar - Portal E-Commerce Omnicanal',
    description: 'Tienda online de alto rendimiento integrada con inventario en tiempo real, catálogo sincronizado por sucursal y pasarelas de pago locales.',
    category: 'E-Commerce & Retail',
    repoUrl: 'https://github.com/clientum/lubrano-ecommerce',
    demoUrl: 'https://lubranohogar.com.ar',
    tags: ['WooCommerce', 'REST API', 'MercadoPago', 'Omnicanal'],
  },
  {
    id: 'canal10-pwa',
    title: 'Canal 10 TV - Portal Noticias & PWA Streaming',
    description: 'Plataforma de medios de comunicación en tiempo real con reproducción PWA en vivo, gestión periodística y distribución optimizada CDN.',
    category: 'Medios & Streaming PWA',
    repoUrl: 'https://github.com/clientum/canal10-news-pwa',
    demoUrl: 'https://canal10.clientum.com.ar',
    tags: ['React PWA', 'Live Stream', 'Headless CMS', 'Analytics'],
  }
];

interface KeyProjectsSectionProps {
  onContactClick?: (projectTitle: string) => void;
  compact?: boolean;
}

export const KeyProjectsSection: React.FC<KeyProjectsSectionProps> = ({ onContactClick, compact = false }) => {
  return (
    <section className="bg-slate-900 text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full tracking-widest inline-flex items-center gap-1.5 font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Portafolio Destacado
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
            Proyectos Clave &amp; Casos de Éxito Tecnológicos
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
            Explora las implementaciones de ingeniería de software desarrolladas por Clientum. Cada solución incluye acceso a demo en vivo y repositorios de código.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                    {project.category}
                  </span>
                  {project.featuredBadge && (
                    <span className="text-[9px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-md border border-blue-400/30 uppercase tracking-wider font-mono">
                      {project.featuredBadge}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold transition-all"
                  title={`Ver repositorio de ${project.title}`}
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Código Repo</span>
                </a>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-emerald-500/20"
                  title={`Ver demo en vivo de ${project.title}`}
                >
                  <span>Demo En Vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
