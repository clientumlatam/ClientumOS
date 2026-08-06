import React, { useState } from 'react';
import { Workflow, Plus, Zap, CheckCircle2, Play, Trash2, Sparkles, Mail, MessageSquare, ShieldCheck, ArrowRight, BookOpen, Layers, Copy, Check, AlertTriangle, AlertCircle, Undo2, Redo2 } from 'lucide-react';
import { ActiveTab } from '../types';

interface BlockItem {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  title: string;
  description: string;
  iconName: string;
  hasError?: boolean;
  errorMessage?: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  roi: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  blocks: BlockItem[];
}

interface WorkflowTabProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const TEMPLATES: WorkflowTemplate[] = [
  // CONOCER TU AUDIENCIA
  {
    id: 't_icp',
    name: 'Perfil ICP & Personas (Generación IA)',
    category: 'Conocer Tu Audiencia',
    description: 'Enriquece automáticamente nuevos prospectos analizando su sitio web e industria con Gemini IA para definir el perfil ICP ideal y buyer persona.',
    roi: '+45% precisión de target',
    difficulty: 'Fácil',
    blocks: [
      { id: 'b_icp1', type: 'trigger', title: 'Nuevo Lead Ingresado al CRM', description: 'Detecta cuando se crea o importa un nuevo contacto.', iconName: 'Zap' },
      { id: 'b_icp2', type: 'action', title: 'Análisis ICP con Gemini AI', description: 'Investiga la empresa del lead y genera ficha de Buyer Persona.', iconName: 'Sparkles' },
      { id: 'b_icp3', type: 'action', title: 'Asignar Puntuación de Ajuste ICP', description: 'Guarda el score de compatibilidad (0 a 100) en el perfil del cliente.', iconName: 'CheckCircle2' }
    ]
  },
  {
    id: 't_clientes',
    name: 'Fichero Clientes LATAM & Enriquecimiento',
    category: 'Conocer Tu Audiencia',
    description: 'Valida CUIT/RUT/RFC y enriquece fichas corporativas de empresas LATAM con datos de volumen de facturación y empleados.',
    roi: '100% datos estructurados',
    difficulty: 'Intermedio',
    blocks: [
      { id: 'b_cl1', type: 'trigger', title: 'Carga de Archivo o Registro LATAM', description: 'Detecta un nuevo registro con identificación fiscal o dominio.', iconName: 'Zap' },
      { id: 'b_cl2', type: 'action', title: 'Consulta de Registro Fiscal & Scraping', description: 'Extrae razón social, ubicación y nivel de facturación estimado.', iconName: 'ShieldCheck' },
      { id: 'b_cl3', type: 'action', title: 'Actualizar Fichero Comercial', description: 'Sincroniza el directorio unificado de clientes.', iconName: 'CheckCircle2' }
    ]
  },
  {
    id: 't_contactos',
    name: 'Sincronización de Contactos & Destinatarios',
    category: 'Conocer Tu Audiencia',
    description: 'Normaliza números de teléfono (formato internacional +54/+52/+57) y valida correos corporativos antes de enviar campañas.',
    roi: '-90% rebotados y bloqueos',
    difficulty: 'Fácil',
    blocks: [
      { id: 'b_cnt1', type: 'trigger', title: 'Nuevo Contacto o Suscriptor Detectado', description: 'Se activa al añadir un contacto manualmente o por API.', iconName: 'Zap' },
      { id: 'b_cnt2', type: 'action', title: 'Limpieza y Formateo WhatsApp/E.164', description: 'Corrige prefijos de país y elimina caracteres inválidos.', iconName: 'Sparkles' },
      { id: 'b_cnt3', type: 'action', title: 'Verificación de Dominio Email', description: 'Valida existencia de servidor MX para prevenir rebotes.', iconName: 'Mail' }
    ]
  },
  {
    id: 't_segmentos',
    name: 'Auto-Etiquetado de Listas y Segmentos',
    category: 'Conocer Tu Audiencia',
    description: 'Clasifica automáticamente a los prospectos en segmentos dinámicos (Pyme, Corporativo, VIP) según sus interacciones y respuestas.',
    roi: '3x relevancia en campañas',
    difficulty: 'Fácil',
    blocks: [
      { id: 'b_seg1', type: 'trigger', title: 'Interacción de Lead (Clic, Respuesta o Formulario)', description: 'Monitorea eventos de comportamiento del usuario.', iconName: 'Zap' },
      { id: 'b_seg2', type: 'condition', title: 'Validar Nivel de Interés & Tamaño', description: 'Comprueba si hizo clic en propuesta económica o demo.', iconName: 'Layers' },
      { id: 'b_seg3', type: 'action', title: 'Asignar Etiquetas y Mover a Lista VIP', description: 'Etiqueta como "Lead Caliente - Enterprise".', iconName: 'CheckCircle2' }
    ]
  },

  // PROSPECCIÓN & PIPELINE
  {
    id: 't_maps',
    name: 'Prospección Maps IA (Captura Geolocalizada)',
    category: 'Prospección & Pipeline',
    description: 'Extrae comercios e industrias locales desde Google Maps en un radio seleccionado y califica su presencia digital automáticamente.',
    roi: '+50 prospectos calificados/día',
    difficulty: 'Intermedio',
    blocks: [
      { id: 'b_map1', type: 'trigger', title: 'Búsqueda de Prospectos por Zona o Categoría', description: 'Se activa al seleccionar radio y palabra clave en el módulo Maps.', iconName: 'Zap' },
      { id: 'b_map2', type: 'action', title: 'Auditoría Digital IA de Ficha', description: 'Gemini analiza reseñas, sitio web e ig del comercio encontrado.', iconName: 'Sparkles' },
      { id: 'b_map3', type: 'action', title: 'Importación Directa al Pipeline', description: 'Crea la oportunidad en la etapa "Prospección Inicial".', iconName: 'CheckCircle2' }
    ]
  },
  {
    id: 't_pipeline',
    name: 'Pipeline Sales CRM (Avance Automático)',
    category: 'Prospección & Pipeline',
    description: 'Mueve automáticamente los tratos en el tablero Kanban cuando el prospecto responde un mensaje o agenda una reunión.',
    roi: '-60% tiempo de gestión CRM',
    difficulty: 'Fácil',
    blocks: [
      { id: 'b_pip1', type: 'trigger', title: 'Respuesta Positiva Recibida en WhatsApp/Email', description: 'Detecta intención de compra en el mensaje recibido.', iconName: 'Zap' },
      { id: 'b_pip2', type: 'action', title: 'Mover Deal a "Propuesta Presentada"', description: 'Actualiza la columna correspondiente en el Kanban CRM.', iconName: 'ShieldCheck' },
      { id: 'b_pip3', type: 'action', title: 'Notificar al Ejecutivo Comercial', description: 'Envía alerta prioritaria para cerrar la llamada.', iconName: 'MessageSquare' }
    ]
  },
  {
    id: 't_meddic',
    name: 'Lead Scoring MEDDIC (Calificación Comercial)',
    category: 'Prospección & Pipeline',
    description: 'Aplica el framework B2B MEDDIC evaluando métricas, tomador de decisión y dolor principal para priorizar las mejores oportunidades.',
    roi: '+32% tasa de cierre de ventas',
    difficulty: 'Avanzado',
    blocks: [
      { id: 'b_med1', type: 'trigger', title: 'Reunión Comercial o Cuestionario Completado', description: 'Se dispara tras registrar notas de la llamada de descubrimiento.', iconName: 'Zap' },
      { id: 'b_med2', type: 'action', title: 'Cálculo de Score MEDDIC con IA', description: 'Evalúa M, E, D, D, I, C y asigna un puntaje del 1 al 100.', iconName: 'Sparkles' },
      { id: 'b_med3', type: 'condition', title: '¿Score MEDDIC superior a 75/100?', description: 'Verifica si la oportunidad cumple con los criterios de cierre.', iconName: 'Layers' },
      { id: 'b_med4', type: 'action', title: 'Asignar Prioridad Máxima y Enviar Propuesta', description: 'Alerta a dirección y genera borrador de propuesta.', iconName: 'ShieldCheck' }
    ]
  },

  // OTROS WORKFLOWS
  {
    id: 't1',
    name: 'Secuencia de Prospección en Frío (B2B LATAM)',
    category: 'Ventas & Outbound',
    description: 'Secuencia automatizada multicanal que contacta leads fríos vía WhatsApp, espera 3 días y programa recordatorio de llamada si no responden.',
    roi: '+38% tasa de respuesta',
    difficulty: 'Fácil',
    blocks: [
      { id: 'b1', type: 'trigger', title: 'Nuevo Lead Importado con Tag Outbound', description: 'Detecta cuando se añade un contacto al segmento comercial.', iconName: 'Zap' },
      { id: 'b2', type: 'action', title: 'Enviar WhatsApp de Presentación con Catálogo', description: 'Mensaje personalizado con nombre y segmentación automática.', iconName: 'MessageSquare' },
      { id: 'b3', type: 'condition', title: 'Esperar 3 días y verificar respuesta', description: 'Comprueba si el cliente respondió al mensaje de WhatsApp.', iconName: 'Clock' },
      { id: 'b4', type: 'action', title: 'Crear Tarea Manual de Seguimiento para el Ejecutivo', description: 'Si no hay respuesta, asigna llamada prioritaria a ventas.', iconName: 'ShieldCheck' }
    ]
  }
];

export function WorkflowTab({ setActiveTab }: WorkflowTabProps) {
  const [activeTabMode, setActiveTabMode] = useState<'library' | 'editor'>('library');
  const [history, setHistory] = useState<BlockItem[][]>([TEMPLATES[0].blocks]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentBlocks = history[historyIndex] || TEMPLATES[0].blocks;

  const [currentWorkflowName, setCurrentWorkflowName] = useState<string>(TEMPLATES[0].name);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlockType, setNewBlockType] = useState<'trigger' | 'action' | 'condition'>('action');
  const [newBlockTitle, setNewBlockTitle] = useState('');
  const [newBlockDesc, setNewBlockDesc] = useState('');

  // Validation States
  const [validationErrors, setValidationErrors] = useState<{ blockId?: string; message: string }[]>([]);
  const [isValidated, setIsValidated] = useState(false);

  const updateBlocks = (newBlocks: BlockItem[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newBlocks);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setIsValidated(false);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setIsValidated(false);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setIsValidated(false);
    }
  };

  const handleImportTemplate = (template: WorkflowTemplate) => {
    setHistory([template.blocks]);
    setHistoryIndex(0);
    setCurrentWorkflowName(template.name);
    setActiveTabMode('editor');
    setTestResult(null);
    setValidationErrors([]);
    setIsValidated(false);
  };

  const handleRunValidation = () => {
    const errors: { blockId?: string; message: string }[] = [];
    
    // Check 1: Must start with a trigger
    if (currentBlocks.length === 0) {
      errors.push({ message: 'El workflow no contiene ningún bloque configurado.' });
    } else if (currentBlocks[0].type !== 'trigger') {
      errors.push({ blockId: currentBlocks[0].id, message: 'El flujo debe comenzar obligatoriamente con un bloque Disparador (Trigger).' });
    }

    // Check 2: Check for missing title or empty fields in blocks
    currentBlocks.forEach((b, idx) => {
      if (!b.title || b.title.trim() === '') {
        errors.push({ blockId: b.id, message: `El bloque #${idx + 1} tiene el título vacío o incompleto.` });
      }
      if (!b.description || b.description.trim() === '') {
        errors.push({ blockId: b.id, message: `El bloque "${b.title || `#${idx + 1}`}" carece de descripción o parámetros de configuración.` });
      }
    });

    // Check 3: Check for isolated conditions or broken connections
    let hasTrigger = false;
    currentBlocks.forEach((b, idx) => {
      if (b.type === 'trigger') hasTrigger = true;
      if (b.type === 'action' && !hasTrigger && idx > 0) {
        errors.push({ blockId: b.id, message: `Acción desconectada: El bloque "${b.title}" no está precedido por un Disparador válido.` });
      }
    });

    setValidationErrors(errors);
    setIsValidated(true);
  };

  const handleTestWorkflow = () => {
    handleRunValidation();
    // Only proceed if no critical errors
    const errorsCount = validationErrors.length;
    if (errorsCount > 0 && isValidated) {
      return;
    }

    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult('¡Simulación de flujo ejecutada correctamente! Todos los disparadores y acciones respondieron según lo esperado.');
    }, 1100);
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockTitle) return;
    const newBlock: BlockItem = {
      id: `b_${Date.now()}`,
      type: newBlockType,
      title: newBlockTitle,
      description: newBlockDesc || 'Configuración pendiente de parámetros',
      iconName: newBlockType === 'trigger' ? 'Zap' : 'Sparkles'
    };
    updateBlocks([...currentBlocks, newBlock]);
    setNewBlockTitle('');
    setNewBlockDesc('');
    setShowAddModal(false);
  };

  const handleRemoveBlock = (blockId: string) => {
    updateBlocks(currentBlocks.filter(b => b.id !== blockId));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Biblioteca de Workflows & Automatizaciones</h1>
            <p className="text-xs text-slate-500">Selecciona una plantilla pre-diseñada de prospección o marketing y personalízala en el editor visual.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTabMode('library')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'library' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📚 Biblioteca de Plantillas
          </button>
          <button
            onClick={() => setActiveTabMode('editor')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'editor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Editor Activo ({currentBlocks.length} pasos)
          </button>
        </div>
      </div>

      {/* TEMPLATE LIBRARY VIEW */}
      {activeTabMode === 'library' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMPLATES.map((tpl) => (
              <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-100">
                      {tpl.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {tpl.roi}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{tpl.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tpl.description}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400">Dificultad:</span>
                    <span className="text-[11px] font-bold text-slate-700">{tpl.difficulty}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] font-medium text-slate-400">Bloques:</span>
                    <span className="text-[11px] font-bold text-slate-700">{tpl.blocks.length} etapas</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    {tpl.blocks.map((b, i) => (
                      <div key={i} className="inline-block w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700" title={b.title}>
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleImportTemplate(tpl)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <span>Importar Plantilla</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE WORKFLOW EDITOR VIEW */}
      {activeTabMode === 'editor' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Activo en Automatización
                </span>
                <h2 className="text-lg font-bold text-slate-900">{currentWorkflowName}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Personaliza, valida conexiones y prueba el flujo en tiempo real.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="p-2 hover:bg-white text-slate-700 disabled:opacity-30 rounded-lg transition-all cursor-pointer"
                  title="Deshacer (Undo)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="p-2 hover:bg-white text-slate-700 disabled:opacity-30 rounded-lg transition-all cursor-pointer"
                  title="Rehacer (Redo)"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleRunValidation}
                className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Validar Conexiones</span>
              </button>
              <button
                onClick={handleTestWorkflow}
                disabled={testing}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {testing ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Play className="w-3.5 h-3.5" />}
                <span>{testing ? 'Simulando...' : 'Probar Workflow'}</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Bloque</span>
              </button>
            </div>
          </div>

          {/* Validation Summary Banner */}
          {isValidated && (
            <div className={`p-4 rounded-xl border text-xs font-medium flex items-start gap-3 ${
              validationErrors.length > 0 ? 'bg-red-50 border-red-200 text-red-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              {validationErrors.length > 0 ? (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 w-full">
                    <div className="font-bold flex items-center justify-between">
                      <span>Se detectaron {validationErrors.length} advertencia(s) o problemas de configuración en el workflow:</span>
                      <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-bold">Atención requerida</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-red-800">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err.message}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">¡Validación Exitosa!</span>
                    <span>Todas las conexiones están sincronizadas, los bloques tienen parámetros válidos y el flujo comienza con un Disparador activo.</span>
                  </div>
                </>
              )}
            </div>
          )}

          {testResult && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}

          {/* Flowchart Blocks Canvas */}
          <div className="space-y-4 py-4 max-w-2xl mx-auto">
            {currentBlocks.map((block, idx) => {
              const hasBlockError = validationErrors.some(e => e.blockId === block.id);
              return (
                <div key={block.id} className="relative flex flex-col items-center">
                  <div className={`w-full p-4 rounded-2xl border shadow-xs flex items-start justify-between gap-4 transition-all ${
                    hasBlockError ? 'bg-red-50/80 border-red-300 ring-2 ring-red-200' :
                    block.type === 'trigger' ? 'bg-amber-50/60 border-amber-300' :
                    block.type === 'condition' ? 'bg-purple-50/60 border-purple-200' : 'bg-indigo-50/40 border-indigo-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        hasBlockError ? 'bg-red-600 text-white' :
                        block.type === 'trigger' ? 'bg-amber-500 text-white' :
                        block.type === 'condition' ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'
                      }`}>
                        {hasBlockError ? <AlertCircle className="w-4 h-4" /> :
                         block.type === 'trigger' ? <Zap className="w-4 h-4" /> :
                         block.type === 'condition' ? <Layers className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            hasBlockError ? 'bg-red-100 text-red-800 border-red-200' : 'bg-white border-slate-200 text-slate-600'
                          }`}>
                            {block.type === 'trigger' ? 'Disparador' : block.type === 'condition' ? 'Condición Lógica' : 'Acción Automatizada'}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900">{block.title || '(Sin título)'}</h4>
                          {hasBlockError && (
                            <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.2 rounded font-bold">Error de Configuración</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{block.description || '(Sin descripción o parámetros)'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveBlock(block.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-white cursor-pointer transition-colors"
                      title="Eliminar bloque"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {idx < currentBlocks.length - 1 && (
                    <div className="h-6 w-0.5 bg-slate-300 my-1 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Agregar Bloque al Workflow</h3>
            <form onSubmit={handleAddBlock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Bloque</label>
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                >
                  <option value="trigger">Disparador (Trigger)</option>
                  <option value="action">Acción (Action / IA)</option>
                  <option value="condition">Condición Lógica (Condition)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Bloque</label>
                <input
                  type="text"
                  value={newBlockTitle}
                  onChange={(e) => setNewBlockTitle(e.target.value)}
                  placeholder="Ej. Enviar WhatsApp de seguimiento..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción corta</label>
                <textarea
                  rows={2}
                  value={newBlockDesc}
                  onChange={(e) => setNewBlockDesc(e.target.value)}
                  placeholder="Ej. Esperar 2 días y validar apertura..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  Añadir Bloque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkflowTab;
