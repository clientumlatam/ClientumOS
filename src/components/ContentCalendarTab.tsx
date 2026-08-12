import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  User,
  Tag,
  Filter,
  X
} from 'lucide-react';

export interface EditorialPost {
  id: string;
  title: string;
  channel: 'Blog SEO' | 'LinkedIn' | 'Newsletter' | 'Caso de Éxito';
  scheduledDate: string;
  author: string;
  status: 'Publicado' | 'Programado' | 'En Revisión' | 'Borrador';
  targetKeyword?: string;
}

const INITIAL_POSTS: EditorialPost[] = [
  {
    id: 'post-1',
    title: 'Caso de Éxito: Cómo Yacimientos Neuquén redujo un 40% sus tiempos de facturación',
    channel: 'Caso de Éxito',
    scheduledDate: '2026-08-15',
    author: 'Gonzalo Fernández',
    status: 'Programado',
    targetKeyword: 'caso de exito crm vaca muerta'
  },
  {
    id: 'post-2',
    title: 'Guía Completa de Integración CRM con WhatsApp IA para Exportadores',
    channel: 'Blog SEO',
    scheduledDate: '2026-08-18',
    author: 'Lucía Gómez',
    status: 'En Revisión',
    targetKeyword: 'crm whatsapp agro'
  },
  {
    id: 'post-3',
    title: 'Novedades de la Suite Clientum Q3 2026',
    channel: 'Newsletter',
    scheduledDate: '2026-08-20',
    author: 'Gonzalo Fernández',
    status: 'Borrador'
  }
];

export function ContentCalendarTab() {
  const [posts, setPosts] = useState<EditorialPost[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Post Form
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<EditorialPost['channel']>('Blog SEO');
  const [date, setDate] = useState('2026-08-25');

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newPost: EditorialPost = {
      id: `post-${Date.now()}`,
      title,
      channel,
      scheduledDate: date,
      author: 'Equipo Clientum',
      status: 'Programado'
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Planificación Editorial
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.4 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-7 h-7 text-emerald-600" /> Calendario Editorial & Programación
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Planifica la publicación recurrente de artículos SEO, boletines y casos de éxito comercial.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Contenido</span>
        </button>
      </div>

      {/* Posts List / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Publicaciones Programadas</h3>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {post.channel}
                  </span>
                  {post.targetKeyword && (
                    <span className="text-[10px] font-mono text-slate-400">Target: "{post.targetKeyword}"</span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{post.title}</h4>
                <p className="text-xs text-slate-500">Autor: {post.author} · Fecha: {post.scheduledDate}</p>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                post.status === 'Publicado' ? 'bg-emerald-100 text-emerald-800' :
                post.status === 'Programado' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" /> Programar Nueva Publicación
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título de la Publicación</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Tendencias de CRM en LATAM 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Canal de Publicación</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                >
                  <option value="Blog SEO">Blog SEO</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Caso de Éxito">Caso de Éxito</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha de Publicación</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Guardar Publicación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
