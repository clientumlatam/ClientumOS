import React, { useState } from 'react';
import {
  Code,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Check,
  Layout,
  Type,
  Image,
  Square,
  Send,
  Save,
  Download,
  Smartphone,
  Monitor,
  CheckCircle2
} from 'lucide-react';

export interface EmailBlock {
  id: string;
  type: 'header' | 'hero' | 'text' | 'button' | 'features' | 'footer';
  content: {
    title?: string;
    subtitle?: string;
    bodyText?: string;
    buttonLabel?: string;
    buttonUrl?: string;
    imageUrl?: string;
  };
}

const INITIAL_BLOCKS: EmailBlock[] = [
  {
    id: 'block-1',
    type: 'header',
    content: {
      title: 'CLIENTUM B2B INTELLIGENCE',
      subtitle: 'Soluciones Tecnológicas e Inteligencia Comercial'
    }
  },
  {
    id: 'block-2',
    type: 'hero',
    content: {
      title: 'Automatiza tu Captación B2B con Agentes IA en WhatsApp',
      bodyText: 'Descubre cómo las principales PyMEs de América Latina han incrementado un 35% sus ventas calificadas integrando CRM y Chatbots conversacionales con Gemini.'
    }
  },
  {
    id: 'block-3',
    type: 'button',
    content: {
      buttonLabel: 'Agendar Demo de 15 Minutos',
      buttonUrl: 'https://clientum.com.ar/demo'
    }
  },
  {
    id: 'block-4',
    type: 'footer',
    content: {
      bodyText: 'Clientum B2B © 2026. Buenos Aires · Santiago · México DF. Recibes este correo porque solicitaste información corporativa.'
    }
  }
];

export function EmailTemplateBuilderTab() {
  const [blocks, setBlocks] = useState<EmailBlock[]>(INITIAL_BLOCKS);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleAddBlock = (type: EmailBlock['type']) => {
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}`,
      type,
      content: {
        title: type === 'text' ? 'Título de Sección' : undefined,
        bodyText: 'Agrega tu texto explicativo o llamada a la acción en esta sección modular.',
        buttonLabel: type === 'button' ? 'Hacé clic aquí' : undefined,
        buttonUrl: type === 'button' ? 'https://clientum.com.ar' : undefined
      }
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleUpdateBlockContent = (id: string, field: string, value: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === id) {
        return {
          ...b,
          content: { ...b.content, [field]: value }
        };
      }
      return b;
    }));
  };

  const generateHtmlOutput = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
    .hero { padding: 32px 24px; text-align: center; background: #f1f5f9; }
    .button-container { text-align: center; padding: 24px; }
    .btn { background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block; }
    .footer { background: #f8fafc; color: #64748b; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    ${blocks.map(b => {
      if (b.type === 'header') return `<div class="header"><h2>${b.content.title}</h2><p>${b.content.subtitle || ''}</p></div>`;
      if (b.type === 'hero') return `<div class="hero"><h1>${b.content.title}</h1><p>${b.content.bodyText}</p></div>`;
      if (b.type === 'button') return `<div class="button-container"><a href="${b.content.buttonUrl}" class="btn">${b.content.buttonLabel}</a></div>`;
      if (b.type === 'footer') return `<div class="footer"><p>${b.content.bodyText}</p></div>`;
      return `<div style="padding: 20px;"><p>${b.content.bodyText}</p></div>`;
    }).join('\n')}
  </div>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateHtmlOutput());
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const handleSaveTemplate = () => {
    setSaveSuccessMsg('¡Plantilla HTML guardada en la Biblioteca de Plantillas!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              HTML Email Builder
            </span>
            <span className="text-slate-400 text-xs">· Módulo 5.1 Campañas & Automatización</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Code className="w-7 h-7 text-indigo-600" /> Constructor Visual de Plantillas HTML
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Crea correos electrónicos B2B responsivos con bloques modulares arrastrabiles y exporta código HTML limpio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${viewMode === 'editor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Layout className="w-4 h-4" />
              <span>Editor Modular</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Eye className="w-4 h-4" />
              <span>Vista Previa</span>
            </button>
          </div>

          <button
            onClick={handleSaveTemplate}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer border-0"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Plantilla</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Editor Layout */}
      {viewMode === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blocks Toolbar */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Agregar Bloques de Contenido</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddBlock('header')}
                  className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer space-y-1"
                >
                  <Type className="w-4 h-4 text-indigo-600" />
                  <span className="block text-xs font-bold text-slate-800">Cabecera Logo</span>
                </button>

                <button
                  onClick={() => handleAddBlock('hero')}
                  className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer space-y-1"
                >
                  <Layout className="w-4 h-4 text-purple-600" />
                  <span className="block text-xs font-bold text-slate-800">Hero Principal</span>
                </button>

                <button
                  onClick={() => handleAddBlock('text')}
                  className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer space-y-1"
                >
                  <Type className="w-4 h-4 text-emerald-600" />
                  <span className="block text-xs font-bold text-slate-800">Bloque Texto</span>
                </button>

                <button
                  onClick={() => handleAddBlock('button')}
                  className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer space-y-1"
                >
                  <Square className="w-4 h-4 text-amber-600" />
                  <span className="block text-xs font-bold text-slate-800">Botón CTA</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Código HTML Generado</h3>
                <button
                  onClick={handleCopyCode}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {isCopiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopiedCode ? 'Copiado' : 'Copiar HTML'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-xl text-[10px] font-mono text-slate-400 overflow-x-auto max-h-[220px]">
                {generateHtmlOutput()}
              </pre>
            </div>
          </div>

          {/* Active Canvas Blocks */}
          <div className="lg:col-span-2 space-y-4">
            {blocks.map((block, index) => (
              <div key={block.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative group">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    Bloque #{index + 1}: {block.type.toUpperCase()}
                  </span>

                  <button
                    onClick={() => handleRemoveBlock(block.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Form controls per block type */}
                {block.type === 'header' && (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={block.content.title || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'title', e.target.value)}
                      placeholder="Nombre de Empresa / Logo Text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                    />
                    <input
                      type="text"
                      value={block.content.subtitle || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'subtitle', e.target.value)}
                      placeholder="Subtítulo o Slogan"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                )}

                {block.type === 'hero' && (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={block.content.title || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'title', e.target.value)}
                      placeholder="Titular de Alto Impacto"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-black text-sm"
                    />
                    <textarea
                      value={block.content.bodyText || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'bodyText', e.target.value)}
                      rows={3}
                      placeholder="Cuerpo de texto explicativo..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                )}

                {block.type === 'button' && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={block.content.buttonLabel || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'buttonLabel', e.target.value)}
                      placeholder="Texto del Botón"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                    />
                    <input
                      type="text"
                      value={block.content.buttonUrl || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'buttonUrl', e.target.value)}
                      placeholder="Enlace de Destino (https://...)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                )}

                {block.type === 'footer' && (
                  <div className="text-xs">
                    <input
                      type="text"
                      value={block.content.bodyText || ''}
                      onChange={(e) => handleUpdateBlockContent(block.id, 'bodyText', e.target.value)}
                      placeholder="Texto de pie de página y desuscripción"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-xs text-xs font-bold">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              <Monitor className="w-4 h-4" /> Desktop (600px)
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              <Smartphone className="w-4 h-4" /> Móvil (360px)
            </button>
          </div>

          <div
            className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all ${
              previewDevice === 'desktop' ? 'w-[600px]' : 'w-[360px]'
            }`}
          >
            <iframe
              title="Email Preview"
              srcDoc={generateHtmlOutput()}
              className="w-full h-[520px] border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
