import React, { useState } from 'react';
import {
  Building2,
  Users,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  Calendar,
  X,
  CreditCard,
  Edit2,
  Trash2,
  Briefcase
} from 'lucide-react';

export interface CompanyAccount {
  id: string;
  name: string;
  taxId: string; // CUIT / RUT / RFC
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia' | 'Perú' | 'Uruguay';
  city: string;
  industry: string;
  tier: 'Enterprise' | 'Mid-Market' | 'PyME';
  mrrUsd: number;
  mrrArs: number;
  health: 'Saludable' | 'En Riesgo' | 'En Expansión' | 'Prospecto';
  healthScore: number; // 0-100
  primaryContact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  afipIntegration: boolean;
  activeModules: string[];
  joinedDate: string;
}

const INITIAL_LATAM_CLIENTS: CompanyAccount[] = [
  {
    id: 'cli-01',
    name: 'Grupo Agro-Industrial Patagonia S.A.',
    taxId: '30-71234567-8',
    country: 'Argentina',
    city: 'General Roca, Río Negro',
    industry: 'Agroindustria & Fruticultura',
    tier: 'Enterprise',
    mrrUsd: 1450,
    mrrArs: 1850000,
    health: 'En Expansión',
    healthScore: 96,
    primaryContact: {
      name: 'Ing. Roberto Albarracín',
      role: 'CEO & Socio Director',
      email: 'r.albarracin@agropatagonia.com.ar',
      phone: '+54 9 298 443-1200'
    },
    afipIntegration: true,
    activeModules: ['Chatbot WhatsApp IA', 'CRM Pipeline', 'Facturación AFIP', 'BI Reports'],
    joinedDate: '2024-03-15'
  },
  {
    id: 'cli-02',
    name: 'Logística Austral S.R.L.',
    taxId: '30-68901234-5',
    country: 'Argentina',
    city: 'Neuquén Capital',
    industry: 'Transporte & Servicios Vaca Muerta',
    tier: 'Mid-Market',
    mrrUsd: 950,
    mrrArs: 1210000,
    health: 'Saludable',
    healthScore: 91,
    primaryContact: {
      name: 'Lic. Laura Fernández',
      role: 'Directora de Operaciones',
      email: 'lfernandez@logisticaaustral.com.ar',
      phone: '+54 9 299 412-9876'
    },
    afipIntegration: true,
    activeModules: ['CRM Pipeline', 'Chatbot WhatsApp IA', 'Facturación AFIP'],
    joinedDate: '2024-06-10'
  },
  {
    id: 'cli-03',
    name: 'TechSol Cuyo S.A.',
    taxId: '30-71543210-9',
    country: 'Argentina',
    city: 'Mendoza',
    industry: 'Software & Integraciones B2B',
    tier: 'Mid-Market',
    mrrUsd: 820,
    mrrArs: 1045000,
    health: 'Saludable',
    healthScore: 88,
    primaryContact: {
      name: 'Ing. Esteban Rossi',
      role: 'CTO & Head of Engineering',
      email: 'esteban@techsolcuyo.com',
      phone: '+54 9 261 554-3321'
    },
    afipIntegration: true,
    activeModules: ['Chatbot WhatsApp IA', 'Agent OS API'],
    joinedDate: '2024-08-01'
  },
  {
    id: 'cli-04',
    name: 'FinTech Cordillerana S.A.S.',
    taxId: '76.123.456-K',
    country: 'Chile',
    city: 'Santiago de Chile',
    industry: 'Servicios Financieros & Pagos',
    tier: 'Enterprise',
    mrrUsd: 2100,
    mrrArs: 2680000,
    health: 'En Expansión',
    healthScore: 98,
    primaryContact: {
      name: 'Felipe Undurraga',
      role: 'VP of Commercial Sales',
      email: 'felipe@fintechcordillera.cl',
      phone: '+56 9 8123 4567'
    },
    afipIntegration: false,
    activeModules: ['Chatbot WhatsApp IA', 'CRM Pipeline', 'Outreach Automation'],
    joinedDate: '2024-11-20'
  },
  {
    id: 'cli-05',
    name: 'Distribuidora San Martín S.A.',
    taxId: '30-54321678-2',
    country: 'Argentina',
    city: 'Rosario, Santa Fe',
    industry: 'Consumo Masivo & Distribución',
    tier: 'Mid-Market',
    mrrUsd: 650,
    mrrArs: 830000,
    health: 'En Riesgo',
    healthScore: 62,
    primaryContact: {
      name: 'Martín Sola',
      role: 'Gerente General',
      email: 'msola@distribuidorasanmartin.com.ar',
      phone: '+54 9 341 665-4321'
    },
    afipIntegration: true,
    activeModules: ['CRM Pipeline', 'Facturación AFIP'],
    joinedDate: '2024-02-18'
  },
  {
    id: 'cli-06',
    name: 'RetailNorte S.A. de C.V.',
    taxId: 'RNO-890123-ABC',
    country: 'México',
    city: 'Monterrey, NL',
    industry: 'Retail & Cadenas Comerciales',
    tier: 'Enterprise',
    mrrUsd: 3200,
    mrrArs: 4080000,
    health: 'Saludable',
    healthScore: 94,
    primaryContact: {
      name: 'Valeria Gómez',
      role: 'Chief Commercial Officer',
      email: 'valeria@retailnorte.mx',
      phone: '+52 81 1234 5678'
    },
    afipIntegration: false,
    activeModules: ['Chatbot WhatsApp IA', 'CRM Pipeline', 'BI Reports', 'Outreach Automation'],
    joinedDate: '2025-01-15'
  }
];

export function ClientsTab() {
  const [clients, setClients] = useState<CompanyAccount[]>(INITIAL_LATAM_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('todos');
  const [selectedTier, setSelectedTier] = useState<string>('todos');
  const [selectedHealth, setSelectedHealth] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedClient, setSelectedClient] = useState<CompanyAccount | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [aiBriefing, setAiBriefing] = useState<string | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState<boolean>(false);

  // New Client Form
  const [newClientData, setNewClientData] = useState({
    name: '',
    taxId: '',
    country: 'Argentina' as CompanyAccount['country'],
    city: '',
    industry: 'Servicios B2B',
    tier: 'PyME' as CompanyAccount['tier'],
    mrrUsd: 450,
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: ''
  });

  // Filtered list
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.taxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.primaryContact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'todos' || c.country === selectedCountry;
    const matchesTier = selectedTier === 'todos' || c.tier === selectedTier;
    const matchesHealth = selectedHealth === 'todos' || c.health === selectedHealth;

    return matchesSearch && matchesCountry && matchesTier && matchesHealth;
  });

  // Calculations
  const totalMrrUsd = clients.reduce((acc, c) => acc + c.mrrUsd, 0);
  const totalMrrArs = clients.reduce((acc, c) => acc + c.mrrArs, 0);
  const avgHealthScore = Math.round(clients.reduce((acc, c) => acc + c.healthScore, 0) / clients.length);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.name) return;

    const newCompany: CompanyAccount = {
      id: `cli-${Date.now()}`,
      name: newClientData.name,
      taxId: newClientData.taxId || '30-00000000-0',
      country: newClientData.country,
      city: newClientData.city || 'Buenos Aires',
      industry: newClientData.industry,
      tier: newClientData.tier,
      mrrUsd: newClientData.mrrUsd,
      mrrArs: newClientData.mrrUsd * 1275,
      health: 'Saludable',
      healthScore: 85,
      primaryContact: {
        name: newClientData.contactName || 'Contacto Principal',
        role: newClientData.contactRole || 'Gerente',
        email: newClientData.contactEmail || 'contacto@empresa.com',
        phone: newClientData.contactPhone || '+54 9 11 0000-0000'
      },
      afipIntegration: newClientData.country === 'Argentina',
      activeModules: ['CRM Pipeline', 'Chatbot WhatsApp IA'],
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setClients([newCompany, ...clients]);
    setShowAddModal(false);
    setNewClientData({
      name: '',
      taxId: '',
      country: 'Argentina',
      city: '',
      industry: 'Servicios B2B',
      tier: 'PyME',
      mrrUsd: 450,
      contactName: '',
      contactRole: '',
      contactEmail: '',
      contactPhone: ''
    });
  };

  const handleGenerateAiBrief = async (client: CompanyAccount) => {
    setIsGeneratingBrief(true);
    setAiBriefing(null);

    setTimeout(() => {
      setAiBriefing(`
BRIEF INTELIGENTE IA PARA: ${client.name}
────────────────────────────────────────────────────────
1. Oportunidades de Up-Sell:
   - Activar el módulo de "Agente IA de Voz" para automatizar la confirmación de turnos/cotizaciones.
   - Integración con MercadoPago para cobros recurrentes de facturas AFIP.

2. Estado de Salud Comercial (${client.healthScore}/100):
   - El cliente registra alta actividad en el chatbot de WhatsApp (${client.activeModules.join(', ')}).
   - Se recomienda agendar reunión trimestral con el decisor ${client.primaryContact.name} (${client.primaryContact.role}).

3. Recomendación de Acción Inmediata:
   - Enviar informe de ROI generado con Business Intelligence destacando 120+ horas ahorradas este mes.
      `);
      setIsGeneratingBrief(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Fichero B2B LATAM
            </span>
            <span className="text-slate-400 text-xs">· Módulo 2.2 Conocer tu Audiencia</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-600" /> Fichero Clientes Corporativos LATAM
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Directorio consolidado de cuentas empresariales, contratos activos, CUIT/AFIP e indicadores de salud comercial.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Cliente Corporativo</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Cuentas Registradas</span>
            <span className="text-2xl font-black text-slate-900">{clients.length}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">100% Verificadas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">MRR Total (USD / ARS)</span>
            <span className="text-xl font-black text-indigo-600">${totalMrrUsd.toLocaleString()} USD</span>
            <span className="text-[10px] text-slate-500 font-semibold block">${(totalMrrArs / 1000000).toFixed(1)}M ARS/mes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Salud Promedio Cartera</span>
            <span className="text-2xl font-black text-slate-900">{avgHealthScore} / 100</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Retención & Retention 98%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Facturación AFIP Nativa</span>
            <span className="text-2xl font-black text-slate-900">
              {clients.filter(c => c.afipIntegration).length} / {clients.length}
            </span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">CAE en Tiempo Real</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por Empresa, CUIT, Contacto o Ciudad..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Países</option>
              <option value="Argentina">🇦🇷 Argentina</option>
              <option value="Chile">🇨🇱 Chile</option>
              <option value="México">🇲🇽 México</option>
              <option value="Colombia">🇨🇴 Colombia</option>
              <option value="Perú">🇵🇪 Perú</option>
            </select>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Tiers</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="PyME">PyME</option>
            </select>

            <select
              value={selectedHealth}
              onChange={(e) => setSelectedHealth(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Estado de Salud</option>
              <option value="En Expansión">En Expansión</option>
              <option value="Saludable">Saludable</option>
              <option value="En Riesgo">En Riesgo</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Tarjetas
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Tabla
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {client.tier}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                      {client.name}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    client.health === 'En Expansión' ? 'bg-emerald-100 text-emerald-800' :
                    client.health === 'Saludable' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {client.health}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{client.city} ({client.country})</span>
                  </p>

                  <p className="font-mono text-[11px] text-slate-500">
                    ID Fiscal / CUIT: <strong className="text-slate-700">{client.taxId}</strong>
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-2">
                    <span className="text-[10px] text-slate-400 font-medium block">Contacto Principal:</span>
                    <span className="font-bold text-slate-800 block">{client.primaryContact.name}</span>
                    <span className="text-[11px] text-slate-500">{client.primaryContact.role}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block mb-1">Módulos Contratados:</span>
                    <div className="flex flex-wrap gap-1">
                      {client.activeModules.map((mod, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Facturación Mensual:</span>
                  <span className="font-black text-sm text-indigo-600">${client.mrrUsd} USD</span>
                  <span className="text-[10px] text-slate-400 block">${(client.mrrArs / 1000).toFixed(0)}k ARS</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setAiBriefing(null);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Ficha Completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3.5">Empresa & CUIT</th>
                <th className="p-3.5">País & Ciudad</th>
                <th className="p-3.5">Tier & Salud</th>
                <th className="p-3.5">Contacto Principal</th>
                <th className="p-3.5">MRR (USD/ARS)</th>
                <th className="p-3.5">AFIP</th>
                <th className="p-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{client.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{client.taxId}</span>
                  </td>
                  <td className="p-3.5 text-slate-700">
                    <span>{client.city}</span>
                    <span className="block text-[10px] text-slate-400">{client.country}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded text-[10px] mr-1">
                      {client.tier}
                    </span>
                    <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${
                      client.health === 'En Expansión' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {client.health}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block">{client.primaryContact.name}</span>
                    <span className="text-[10px] text-slate-400">{client.primaryContact.email}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-black text-indigo-600 block">${client.mrrUsd} USD</span>
                    <span className="text-[10px] text-slate-400">${(client.mrrArs / 1000).toFixed(0)}k ARS</span>
                  </td>
                  <td className="p-3.5">
                    {client.afipIntegration ? (
                      <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> AFIP On
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">No requiere</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setAiBriefing(null);
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Client Account Full Detail */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full">
                  {selectedClient.tier} · {selectedClient.country}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{selectedClient.name}</h2>
                <p className="text-xs text-slate-500 font-mono">ID Fiscal / CUIT: {selectedClient.taxId}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-medium block">Contacto Decisor Principal:</span>
                <span className="font-bold text-slate-900 text-sm block">{selectedClient.primaryContact.name}</span>
                <span className="text-slate-500 font-medium block">{selectedClient.primaryContact.role}</span>
                <div className="pt-1 space-y-0.5 text-[11px]">
                  <p className="text-indigo-600 font-semibold">{selectedClient.primaryContact.email}</p>
                  <p className="text-slate-600 font-mono">{selectedClient.primaryContact.phone}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-medium block">Contrato & Facturación:</span>
                <span className="font-black text-indigo-600 text-base block">${selectedClient.mrrUsd} USD / mes</span>
                <span className="text-slate-600 font-semibold block">${selectedClient.mrrArs.toLocaleString()} ARS / mes</span>
                <span className="text-[10px] text-slate-400 block">Fecha de Alta: {selectedClient.joinedDate}</span>
              </div>
            </div>

            {/* AI Briefing Trigger Button */}
            <div className="bg-indigo-950 text-white p-4 rounded-xl border border-indigo-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h4 className="font-bold text-sm">Brief Comercial de Cuenta con Gemini IA</h4>
                </div>
                <button
                  onClick={() => handleGenerateAiBrief(selectedClient)}
                  disabled={isGeneratingBrief}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer border-0"
                >
                  {isGeneratingBrief ? 'Analizando Cuenta...' : 'Generar Brief Comercial'}
                </button>
              </div>

              {aiBriefing && (
                <pre className="text-xs text-indigo-200 whitespace-pre-wrap font-sans bg-indigo-900/60 p-3 rounded-lg border border-indigo-800">
                  {aiBriefing}
                </pre>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Client Account */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddClient} className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Agregar Nueva Cuenta Corporativa</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre de la Empresa:</label>
                <input
                  type="text"
                  required
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  placeholder="Ej. Frutícola del Comahue S.A."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">CUIT / ID Fiscal:</label>
                  <input
                    type="text"
                    value={newClientData.taxId}
                    onChange={(e) => setNewClientData({ ...newClientData, taxId: e.target.value })}
                    placeholder="30-78901234-5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">País:</label>
                  <select
                    value={newClientData.country}
                    onChange={(e) => setNewClientData({ ...newClientData, country: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="México">México</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Perú">Perú</option>
                    <option value="Uruguay">Uruguay</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Ciudad:</label>
                  <input
                    type="text"
                    value={newClientData.city}
                    onChange={(e) => setNewClientData({ ...newClientData, city: e.target.value })}
                    placeholder="General Roca, Río Negro"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">MRR Acordado (USD/mes):</label>
                  <input
                    type="number"
                    value={newClientData.mrrUsd}
                    onChange={(e) => setNewClientData({ ...newClientData, mrrUsd: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 space-y-2">
                <span className="font-bold text-slate-800 block">Contacto Decisor:</span>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={newClientData.contactName}
                    onChange={(e) => setNewClientData({ ...newClientData, contactName: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Cargo / Puesto"
                    value={newClientData.contactRole}
                    onChange={(e) => setNewClientData({ ...newClientData, contactRole: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Email Corporativo"
                    value={newClientData.contactEmail}
                    onChange={(e) => setNewClientData({ ...newClientData, contactEmail: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp / Teléfono"
                    value={newClientData.contactPhone}
                    onChange={(e) => setNewClientData({ ...newClientData, contactPhone: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Guardar Cliente
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
