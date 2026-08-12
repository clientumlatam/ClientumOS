import React, { useState } from 'react';
import {
  ListOrdered,
  Plus,
  Search,
  Filter,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  Sliders,
  Send,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  X,
  PlusCircle
} from 'lucide-react';

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  type: 'Dinámica' | 'Estática';
  contactCount: number;
  openRate: number; // %
  clickRate: number; // %
  whatsappResponseRate: number; // %
  rules: {
    field: string;
    operator: string;
    value: string;
  }[];
  lastUpdated: string;
}

const INITIAL_SEGMENTS: AudienceSegment[] = [
  {
    id: 'seg-01',
    name: 'Decisores PyME Agro & Vaca Muerta (Río Negro & Neuquén)',
    description: 'CEOs, Gerentes y Socios de empresas agroindustriales y de servicios petroleros en la Patagonia Norte.',
    type: 'Dinámica',
    contactCount: 142,
    openRate: 58.2,
    clickRate: 24.1,
    whatsappResponseRate: 42.0,
    rules: [
      { field: 'País', operator: 'es igual a', value: 'Argentina' },
      { field: 'Ciudad/Provincia', operator: 'contiene', value: 'Río Negro, Neuquén' },
      { field: 'Persona', operator: 'es igual a', value: 'CEO PyME, CRO' }
    ],
    lastUpdated: 'Hace 10 min'
  },
  {
    id: 'seg-02',
    name: 'Prospectos WhatsApp Verificados - Scoring > 80',
    description: 'Contactos con alto interés comercial registrado por el chatbot de IA y WhatsApp verificado.',
    type: 'Dinámica',
    contactCount: 89,
    openRate: 72.5,
    clickRate: 38.0,
    whatsappResponseRate: 64.5,
    rules: [
      { field: 'Lead Score', operator: 'mayor que', value: '80' },
      { field: 'WhatsApp', operator: 'es igual a', value: 'Verificado' }
    ],
    lastUpdated: 'Tiempo Real'
  },
  {
    id: 'seg-03',
    name: 'C-Level Tech Leaders (Argentina, Chile & México)',
    description: 'CTOs, Directores de Sistemas y Responsables de IT en empresas con presupuesto > USD 500/mes.',
    type: 'Estática',
    contactCount: 215,
    openRate: 49.0,
    clickRate: 18.5,
    whatsappResponseRate: 31.0,
    rules: [
      { field: 'Persona', operator: 'es igual a', value: 'CTO / Sistemas' },
      { field: 'Países', operator: 'pertenece a', value: 'Argentina, Chile, México' }
    ],
    lastUpdated: '2025-02-01'
  },
  {
    id: 'seg-04',
    name: 'Clientes Candidatos a Up-Sell Facturación AFIP',
    description: 'Empresas activas en Argentina que aún no han conectado el módulo de emisión automática de comprobantes A, B y C.',
    type: 'Dinámica',
    contactCount: 64,
    openRate: 61.0,
    clickRate: 29.5,
    whatsappResponseRate: 48.0,
    rules: [
      { field: 'País', operator: 'es igual a', value: 'Argentina' },
      { field: 'Módulo AFIP', operator: 'es igual a', value: 'Inactivo' },
      { field: 'Estado', operator: 'es igual a', value: 'Cliente' }
    ],
    lastUpdated: 'Hace 1 hora'
  },
  {
    id: 'seg-05',
    name: 'Re-engagement Leads Inactivos > 30 días',
    description: 'Leads que consultaron por WhatsApp o formulario pero no registraron avance en la canalización en el último mes.',
    type: 'Dinámica',
    contactCount: 310,
    openRate: 34.0,
    clickRate: 11.2,
    whatsappResponseRate: 19.5,
    rules: [
      { field: 'Última Actividad', operator: 'mayor a', value: '30 días' },
      { field: 'Estado', operator: 'es igual a', value: 'Contactado' }
    ],
    lastUpdated: 'Ayer'
  }
];

export function ListsTab() {
  const [segments, setSegments] = useState<AudienceSegment[]>(INITIAL_SEGMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [showBuilderModal, setShowBuilderModal] = useState<boolean>(false);
  const [selectedSegmentDetail, setSelectedSegmentDetail] = useState<AudienceSegment | null>(null);

  // New Segment Builder Form
  const [builderData, setBuilderData] = useState({
    name: '',
    description: '',
    type: 'Dinámica' as AudienceSegment['type'],
    rules: [
      { field: 'País', operator: 'es igual a', value: 'Argentina' },
      { field: 'Lead Score', operator: 'mayor que', value: '75' }
    ]
  });

  const filteredSegments = segments.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'todos' || s.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddRule = () => {
    setBuilderData({
      ...builderData,
      rules: [...builderData.rules, { field: 'Persona', operator: 'es igual a', value: 'CEO PyME' }]
    });
  };

  const handleRemoveRule = (index: number) => {
    setBuilderData({
      ...builderData,
      rules: builderData.rules.filter((_, i) => i !== index)
    });
  };

  const handleCreateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderData.name) return;

    const newSegment: AudienceSegment = {
      id: `seg-${Date.now()}`,
      name: builderData.name,
      description: builderData.description || 'Segmento personalizado creado por el usuario.',
      type: builderData.type,
      contactCount: Math.floor(Math.random() * 80) + 40,
      openRate: 55.0,
      clickRate: 22.0,
      whatsappResponseRate: 38.0,
      rules: builderData.rules,
      lastUpdated: 'Recién creado'
    };

    setSegments([newSegment, ...segments]);
    setShowBuilderModal(false);
    setBuilderData({
      name: '',
      description: '',
      type: 'Dinámica',
      rules: [
        { field: 'País', operator: 'es igual a', value: 'Argentina' },
        { field: 'Lead Score', operator: 'mayor que', value: '75' }
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Listas & Reglas de Segmentación
            </span>
            <span className="text-slate-400 text-xs">· Módulo 2.4 Conocer tu Audiencia</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ListOrdered className="w-7 h-7 text-indigo-600" /> Listas y Segmentos de Audiencia
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Crea listas dinámicas basadas en reglas automatizadas o estáticas para personalizar tus campañas de email y secuencias de WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setShowBuilderModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Segmento Dinámico</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Segmentos</span>
            <span className="text-2xl font-black text-slate-900">{segments.length}</span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">
              {segments.filter(s => s.type === 'Dinámica').length} Dinámicos en Tiempo Real
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Contactos Segmentados</span>
            <span className="text-2xl font-black text-slate-900">
              {segments.reduce((acc, s) => acc + s.contactCount, 0)}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Sin duplicados</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Tasa de Apertura Promedio</span>
            <span className="text-2xl font-black text-slate-900">54.8%</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">+18% vs Promedio Industria</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Respuesta WhatsApp</span>
            <span className="text-2xl font-black text-emerald-600">41.2%</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Chatbot Gemini 2.5 Active</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar listas por Nombre o Descripción..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden font-medium"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="todos">Todos los Tipos</option>
            <option value="Dinámica">Listas Dinámicas (Auto)</option>
            <option value="Estática">Listas Estáticas (Manual)</option>
          </select>
        </div>
      </div>

      {/* Segment Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSegments.map((segment) => (
          <div
            key={segment.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  segment.type === 'Dinámica' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {segment.type} · {segment.lastUpdated}
                </span>

                <div className="flex items-center gap-1 text-slate-900 font-black text-sm">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>{segment.contactCount}</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                {segment.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {segment.description}
              </p>

              {/* Rules List Preview */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Reglas de Filtro:</span>
                <div className="space-y-1 text-[11px]">
                  {segment.rules.map((rule, idx) => (
                    <div key={idx} className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 text-slate-700 font-medium flex items-center justify-between">
                      <span className="font-bold text-indigo-600">{rule.field}</span>
                      <span className="text-slate-400 text-[10px]">{rule.operator}</span>
                      <span className="font-semibold text-slate-800">{rule.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-3">
              {/* Engagement Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <span className="text-slate-400 block font-medium">Apertura</span>
                  <span className="font-black text-slate-800">{segment.openRate}%</span>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <span className="text-slate-400 block font-medium">Clicks</span>
                  <span className="font-black text-indigo-600">{segment.clickRate}%</span>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg">
                  <span className="text-slate-400 block font-medium">Resp. WA</span>
                  <span className="font-black text-emerald-600">{segment.whatsappResponseRate}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSegmentDetail(segment)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 border-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Contactos ({segment.contactCount})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Segment Details */}
      {selectedSegmentDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                  {selectedSegmentDetail.type}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{selectedSegmentDetail.name}</h3>
                <p className="text-xs text-slate-500">{selectedSegmentDetail.description}</p>
              </div>
              <button
                onClick={() => setSelectedSegmentDetail(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Condiciones del Segmento:</span>
                {selectedSegmentDetail.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 font-mono text-[11px]">
                    <span className="text-indigo-600 font-bold">{rule.field}</span>
                    <span className="text-slate-400">{rule.operator}</span>
                    <span className="text-slate-900 font-bold">{rule.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                <span>Coinciden en tiempo real: <strong>{selectedSegmentDetail.contactCount} contactos activos</strong></span>
                <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Sin rebotes</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
              <button
                onClick={() => setSelectedSegmentDetail(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Rule Builder */}
      {showBuilderModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateSegment} className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Diseñador de Reglas de Segmentación</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBuilderModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre del Segmento:</label>
                <input
                  type="text"
                  required
                  value={builderData.name}
                  onChange={(e) => setBuilderData({ ...builderData, name: e.target.value })}
                  placeholder="Ej. CEOs PyME Agro con WhatsApp Verificado"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Descripción u Objetivo:</label>
                <input
                  type="text"
                  value={builderData.description}
                  onChange={(e) => setBuilderData({ ...builderData, description: e.target.value })}
                  placeholder="Objetivo comercial del segmento..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Reglas Lógicas de Filtrado:</span>
                  <button
                    type="button"
                    onClick={handleAddRule}
                    className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Añadir Regla</span>
                  </button>
                </div>

                {builderData.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={rule.field}
                      onChange={(e) => {
                        const newRules = [...builderData.rules];
                        newRules[idx].field = e.target.value;
                        setBuilderData({ ...builderData, rules: newRules });
                      }}
                      className="w-1/3 bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-900"
                    />
                    <select
                      value={rule.operator}
                      onChange={(e) => {
                        const newRules = [...builderData.rules];
                        newRules[idx].operator = e.target.value;
                        setBuilderData({ ...builderData, rules: newRules });
                      }}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-900 text-[11px]"
                    >
                      <option value="es igual a">es igual a</option>
                      <option value="contiene">contiene</option>
                      <option value="mayor que">mayor que</option>
                    </select>
                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) => {
                        const newRules = [...builderData.rules];
                        newRules[idx].value = e.target.value;
                        setBuilderData({ ...builderData, rules: newRules });
                      }}
                      className="w-1/3 bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-900"
                    />
                    {builderData.rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(idx)}
                        className="text-rose-500 hover:text-rose-700 font-bold px-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowBuilderModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Guardar Segmento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
