import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export function CopywriterTab() {
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Copywriter con IA</h1>
        <p className="text-sm text-slate-500">Genera textos persuasivos para anuncios, correos y páginas de aterrizaje.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Parámetros del Copy</h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Descripción del Producto / Oferta</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Software CRM para empresas B2B en LATAM con automatización de ventas..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Sparkles className="w-4 h-4" />
            Generar Copys con IA
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-900">Resultados Generados</h2>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium hover:underline"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado' : 'Copiar todo'}</span>
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
              <span className="font-bold block text-xs text-indigo-600 mb-1">Anuncio LinkedIn B2B</span>
              "Transforma tu proceso comercial en LATAM. Automatiza prospectos y cierra más tratos en menos tiempo."
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
              <span className="font-bold block text-xs text-indigo-600 mb-1">Asunto de Correo Frío</span>
              "¿Sigues perdiendo leads por falta de seguimiento automático?"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
