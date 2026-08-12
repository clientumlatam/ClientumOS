import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Search,
  Filter,
  Building2,
  Phone,
  Globe,
  ExternalLink,
  Sparkles,
  Plus,
  Send,
  Download,
  Users,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  X,
  Navigation,
  Star
} from 'lucide-react';

export interface GeolocatedProspect {
  id: string;
  name: string;
  category: string;
  city: string;
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia' | 'Perú';
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  website: string;
  estimatedEmployees: string;
  estimatedRevenueUsd: number;
  geminiAnalysis?: {
    painPoint: string;
    suggestedDecisionMaker: string;
    openingPitch: string;
  };
  crmStatus: 'No Contactado' | 'En Pipeline' | 'Exportado';
}

const INITIAL_PROSPECTS: GeolocatedProspect[] = [
  {
    id: 'geo-01',
    name: 'Servicios de Yacimiento Neuquén S.A.',
    category: 'Petróleo, Gas & Servicios Vaca Muerta',
    city: 'Neuquén Capital',
    country: 'Argentina',
    address: 'Ruta 22 Km 1210, Parque Industrial Neuquén',
    lat: -38.9516,
    lng: -68.0591,
    rating: 4.8,
    reviewsCount: 34,
    phone: '+54 299 448-9000',
    website: 'https://syneuquen.com.ar',
    estimatedEmployees: '50-200 empleados',
    estimatedRevenueUsd: 2400000,
    crmStatus: 'No Contactado',
    geminiAnalysis: {
      painPoint: 'Requiere automatizar facturación AFIP para grandes volúmenes de certificaciones de obra.',
      suggestedDecisionMaker: 'Ing. Gustavo Morales (Gerente de Operaciones)',
      openingPitch: 'Hola Gustavo, automatizamos la emisión de CAEs AFIP y conectamos la trazabilidad de equipos con tu ERP.'
    }
  },
  {
    id: 'geo-02',
    name: 'Frutícola & Empaque Alto Valle S.R.L.',
    category: 'Agroindustria & Exportación',
    city: 'General Roca, Río Negro',
    country: 'Argentina',
    address: 'Av. Roca 1450, General Roca',
    lat: -39.0333,
    lng: -67.5833,
    rating: 4.6,
    reviewsCount: 19,
    phone: '+54 298 443-5500',
    website: 'https://fruticolaaltovalle.com.ar',
    estimatedEmployees: '100-500 empleados',
    estimatedRevenueUsd: 3800000,
    crmStatus: 'En Pipeline',
    geminiAnalysis: {
      painPoint: 'Gestión manual de pedidos de logística internacional y seguimiento de cobranza en USD.',
      suggestedDecisionMaker: 'Lic. Mariana Pereyra (Directora Comercial)',
      openingPitch: 'Mariana, nuestro Chatbot de WhatsApp IA responde pedidos de cotización internacionales en 3 idiomas 24/7.'
    }
  },
  {
    id: 'geo-03',
    name: 'Bodegas & Viñedos Andes Cuyo S.A.',
    category: 'Vitivinicultura & Logística Export',
    city: 'Mendoza',
    country: 'Argentina',
    address: 'Carril Urquiza 2300, Maipú, Mendoza',
    lat: -32.9833,
    lng: -68.7833,
    rating: 4.9,
    reviewsCount: 88,
    phone: '+54 261 497-2000',
    website: 'https://bodegasandescuyo.com.ar',
    estimatedEmployees: '20-100 empleados',
    estimatedRevenueUsd: 1900000,
    crmStatus: 'No Contactado'
  },
  {
    id: 'geo-04',
    name: 'Logística Minera Cordillera SpA',
    category: 'Transporte & Logística Pesada',
    city: 'Santiago de Chile',
    country: 'Chile',
    address: 'Av. Las Condes 9800, Santiago',
    lat: -33.375,
    lng: -70.525,
    rating: 4.7,
    reviewsCount: 42,
    phone: '+56 2 2987 6543',
    website: 'https://logisticacordillera.cl',
    estimatedEmployees: '100-300 empleados',
    estimatedRevenueUsd: 4500000,
    crmStatus: 'No Contactado'
  },
  {
    id: 'geo-05',
    name: 'Grupo Industrial Monterrey S.A. de C.V.',
    category: 'Manufactura & B2B Supply Chain',
    city: 'Monterrey, NL',
    country: 'México',
    address: 'Av. Constitución 1800, Monterrey',
    lat: 25.6866,
    lng: -100.3161,
    rating: 4.8,
    reviewsCount: 112,
    phone: '+52 81 8123 9000',
    website: 'https://grupomonterrey.mx',
    estimatedEmployees: '500+ empleados',
    estimatedRevenueUsd: 12000000,
    crmStatus: 'Exportado'
  }
];

export function GeolocatedProspectingTab() {
  const [prospects, setProspects] = useState<GeolocatedProspect[]>(INITIAL_PROSPECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('todas');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedProspect, setSelectedProspect] = useState<GeolocatedProspect | null>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  // Filters
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'todas' || p.city.includes(selectedCity);
    const matchesCategory = selectedCategory === 'todas' || p.category.includes(selectedCategory);

    return matchesSearch && matchesCity && matchesCategory;
  });

  const handleEnrichWithGemini = (prospectId: string) => {
    setIsAnalyzingAi(true);

    setTimeout(() => {
      setProspects(prev => prev.map(p => {
        if (p.id === prospectId) {
          return {
            ...p,
            geminiAnalysis: {
              painPoint: 'Alto volumen de consultas comerciales entrantes no atendidas fuera del horario de oficina.',
              suggestedDecisionMaker: 'VP de Ventas & Gerente de Sistemas',
              openingPitch: `Estimados de ${p.name}, implementamos un Agente IA en WhatsApp que captura el 35% más de consultas B2B calificadas.`
            }
          };
        }
        return p;
      }));
      setIsAnalyzingAi(false);
    }, 1200);
  };

  const handleExportToCrm = (prospect: GeolocatedProspect) => {
    setProspects(prev => prev.map(p => p.id === prospect.id ? { ...p, crmStatus: 'En Pipeline' } : p));
    setExportSuccessMsg(`¡Empresa "${prospect.name}" exportada con éxito al Pipeline CRM Sales!`);
    setTimeout(() => setExportSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              IA & Geolocalización Maps
            </span>
            <span className="text-slate-400 text-xs">· Módulo 3.1 Prospección & Pipeline</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-emerald-600" /> Prospección Maps e Inteligencia Territorial
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Descubre empresas B2B por ubicación geográfica, analiza su perfil con Gemini IA y exporta oportunidades al CRM.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Escaneando nuevas zonas industriales con Google Maps API...')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Escanear Nueva Región</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Empresas Geolocalizadas</span>
            <span className="text-2xl font-black text-slate-900">{prospects.length}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Parques Industriales & B2B</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Volumen Negocio Estimado</span>
            <span className="text-2xl font-black text-indigo-600">
              ${(prospects.reduce((a, b) => a + b.estimatedRevenueUsd, 0) / 1000000).toFixed(1)}M USD
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Cartera Total Escaneada</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Enriquecidas con Gemini</span>
            <span className="text-2xl font-black text-slate-900">
              {prospects.filter(p => p.geminiAnalysis).length} / {prospects.length}
            </span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">Pitches Personalizados</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Exportadas al CRM</span>
            <span className="text-2xl font-black text-emerald-600">
              {prospects.filter(p => p.crmStatus !== 'No Contactado').length}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Listo para Contactar</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {exportSuccessMsg && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por Nombre de Empresa, Rubro o Dirección..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="todas">Todas las Ciudades</option>
            <option value="Neuquén">Neuquén (Vaca Muerta)</option>
            <option value="General Roca">Río Negro (Alto Valle)</option>
            <option value="Mendoza">Mendoza (Cuyo)</option>
            <option value="Santiago">Santiago de Chile</option>
            <option value="Monterrey">Monterrey (México)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="todas">Todos los Sectores</option>
            <option value="Petróleo">Petróleo & Vaca Muerta</option>
            <option value="Agroindustria">Agroindustria</option>
            <option value="Transporte">Transporte & Logística</option>
            <option value="Manufactura">Manufactura & B2B</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Map Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Interactive Map Visualizer */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white flex flex-col justify-between space-y-4 shadow-xl min-h-[380px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Radar Satelital Atrapado
              </span>
              <span className="text-slate-400 text-xs font-mono">GPS Active</span>
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-400" /> Coordenadas & Zonas B2B
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Selecciona una empresa para enfocar el radar geolocalizado en parques industriales y polos comerciales.
            </p>
          </div>

          {/* Simulated Interactive Map Display */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="relative z-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto animate-pulse">
                <MapPin className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-white">
                  {selectedProspect ? selectedProspect.name : 'Selecciona una Empresa'}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedProspect ? `${selectedProspect.address} (${selectedProspect.city})` : 'Hacé clic en cualquier tarjeta'}
                </p>
              </div>

              {selectedProspect && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProspect.name + ' ' + selectedProspect.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Prospects List Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredProspects.map((prospect) => (
            <div
              key={prospect.id}
              onClick={() => setSelectedProspect(prospect)}
              className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                selectedProspect?.id === prospect.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {prospect.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1 flex items-center gap-2">
                    {prospect.name}
                    <span className="text-amber-500 text-xs font-bold flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {prospect.rating} ({prospect.reviewsCount})
                    </span>
                  </h3>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  prospect.crmStatus === 'Exportado' ? 'bg-blue-100 text-blue-800' :
                  prospect.crmStatus === 'En Pipeline' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {prospect.crmStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <p className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{prospect.address}</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{prospect.phone}</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{prospect.estimatedEmployees}</span>
                </p>
                <p className="flex items-center gap-1.5 text-indigo-600 font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>~${(prospect.estimatedRevenueUsd / 1000000).toFixed(1)}M USD Facturación/año</span>
                </p>
              </div>

              {/* Gemini Enrichment Section */}
              {prospect.geminiAnalysis ? (
                <div className="bg-indigo-950 text-indigo-100 p-3.5 rounded-xl border border-indigo-900 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Análisis Estratégico Gemini IA:</span>
                  </div>
                  <p><strong>Dolor Clave:</strong> {prospect.geminiAnalysis.painPoint}</p>
                  <p><strong>Decisor Sugerido:</strong> {prospect.geminiAnalysis.suggestedDecisionMaker}</p>
                  <p className="italic text-indigo-200 bg-indigo-900/60 p-2 rounded-lg mt-1 font-sans">
                    "{prospect.geminiAnalysis.openingPitch}"
                  </p>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrichWithGemini(prospect.id);
                  }}
                  disabled={isAnalyzingAi}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Enriquecer Perfil y Generar Pitch Comercial con Gemini IA</span>
                </button>
              )}

              {/* Actions Bar */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <a
                  href={prospect.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visitar Sitio Web</span>
                </a>

                {prospect.crmStatus === 'No Contactado' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExportToCrm(prospect);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enviar al CRM Sales</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
