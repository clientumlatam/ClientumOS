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
    <div className="space-y-4">
      {/* Header (Frappe Style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-600" /> Fichero Clientes Corporativos LATAM
          </h1>
          <p className="text-gray-500 text-[13px] mt-0.5">
            Directorio consolidado de cuentas empresariales y contratos activos.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* KPI Stats Bar (Frappe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Cuentas Registradas</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">{clients.length}</span>
            <span className="text-[11px] text-gray-400 block">100% Verificadas</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <Building2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">MRR Total</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">${totalMrrUsd.toLocaleString()} USD</span>
            <span className="text-[11px] text-gray-400 block">${(totalMrrArs / 1000000).toFixed(1)}M ARS/mes</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Salud Promedio</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">{avgHealthScore} / 100</span>
            <span className="text-[11px] text-gray-400 block">Retención 98%</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Facturación AFIP</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">
              {clients.filter(c => c.afipIntegration).length} / {clients.length}
            </span>
            <span className="text-[11px] text-gray-400 block">CAE en Tiempo Real</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <FileText className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Control Bar (Frappe Style) */}
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-2">
        <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
          {/* Search Box */}
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por Empresa, CUIT, Contacto..."
              className="w-full bg-transparent border-none pl-8 pr-16 py-1.5 text-[13px] focus:outline-hidden focus:ring-0 text-gray-900 placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-400 text-[10px] font-mono leading-none">⌘</span>
              <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-400 text-[10px] font-mono leading-none">K</span>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-1.5 px-2 md:px-0">
            <div className="h-5 w-px bg-gray-200 mx-1 hidden md:block"></div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
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
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
            >
              <option value="todos">Todos los Tiers</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="PyME">PyME</option>
            </select>

            <select
              value={selectedHealth}
              onChange={(e) => setSelectedHealth(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
            >
              <option value="todos">Estado de Salud</option>
              <option value="En Expansión">En Expansión</option>
              <option value="Saludable">Saludable</option>
              <option value="En Riesgo">En Riesgo</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Tarjetas
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-gray-700 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                      {client.tier}
                    </span>
                    <h3 className="font-semibold text-[14px] text-gray-900 group-hover:text-gray-700 transition-colors mt-1.5">
                      {client.name}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    client.health === 'En Expansión' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    client.health === 'Saludable' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {client.health}
                  </span>
                </div>

                <div className="space-y-1.5 text-[12px] text-gray-600">
                  <p className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{client.city} ({client.country})</span>
                  </p>

                  <p className="font-mono text-[11px] text-gray-500">
                    ID Fiscal / CUIT: <strong className="text-gray-700 font-medium">{client.taxId}</strong>
                  </p>

                  <div className="bg-gray-50 p-2 rounded-md border border-gray-100 my-2">
                    <span className="text-[10px] text-gray-400 font-medium block">Contacto Principal:</span>
                    <span className="font-medium text-gray-800 block">{client.primaryContact.name}</span>
                    <span className="text-[11px] text-gray-500">{client.primaryContact.role}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-medium block mb-1">Módulos Contratados:</span>
                    <div className="flex flex-wrap gap-1">
                      {client.activeModules.map((mod, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] font-medium px-1.5 py-0.5 rounded border border-gray-200">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Facturación Mensual:</span>
                  <span className="font-semibold text-[13px] text-gray-900">${client.mrrUsd} USD</span>
                  <span className="text-[10px] text-gray-400 block">${(client.mrrArs / 1000).toFixed(0)}k ARS</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setAiBriefing(null);
                  }}
                  className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-[12px] font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Ficha</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View (Frappe Style) */
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-medium uppercase text-[10px] tracking-wider">
                <th className="p-3">Empresa & CUIT</th>
                <th className="p-3">País & Ciudad</th>
                <th className="p-3">Tier & Salud</th>
                <th className="p-3">Contacto Principal</th>
                <th className="p-3">MRR (USD/ARS)</th>
                <th className="p-3">AFIP</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3">
                    <span className="font-medium text-gray-900 block">{client.name}</span>
                    <span className="text-[10px] font-mono text-gray-400">{client.taxId}</span>
                  </td>
                  <td className="p-3 text-gray-700">
                    <span>{client.city}</span>
                    <span className="block text-[10px] text-gray-400">{client.country}</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1.5 py-0.5 rounded border border-gray-200 mr-1.5">
                      {client.tier}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      client.health === 'En Expansión' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {client.health}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-gray-800 block">{client.primaryContact.name}</span>
                    <span className="text-[10px] text-gray-400">{client.primaryContact.email}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-gray-900 block">${client.mrrUsd} USD</span>
                    <span className="text-[10px] text-gray-400">${(client.mrrArs / 1000).toFixed(0)}k ARS</span>
                  </td>
                  <td className="p-3">
                    {client.afipIntegration ? (
                      <span className="text-emerald-700 font-medium text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> AFIP On
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">No requiere</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setAiBriefing(null);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-medium rounded-md transition-colors cursor-pointer shadow-xs"
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

      {/* Modal: Client Account Full Detail (Frappe Style) */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-lg max-w-2xl w-full text-gray-900 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-start border-b border-gray-200 px-5 py-4">
              <div>
                <span className="bg-gray-100 text-gray-700 font-mono text-[11px] font-medium uppercase px-2 py-0.5 rounded border border-gray-200">
                  {selectedClient.tier} · {selectedClient.country}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mt-1.5">{selectedClient.name}</h2>
                <p className="text-[12px] text-gray-500 font-mono">ID Fiscal / CUIT: {selectedClient.taxId}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[13px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-1">
                  <span className="text-gray-500 font-medium block">Contacto Decisor Principal</span>
                  <span className="font-semibold text-gray-900 text-[14px] block">{selectedClient.primaryContact.name}</span>
                  <span className="text-gray-500 block">{selectedClient.primaryContact.role}</span>
                  <div className="pt-1.5 space-y-0.5">
                    <p className="text-gray-900 font-medium">{selectedClient.primaryContact.email}</p>
                    <p className="text-gray-500 font-mono">{selectedClient.primaryContact.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-1">
                  <span className="text-gray-500 font-medium block">Contrato & Facturación</span>
                  <span className="font-semibold text-gray-900 text-[15px] block">${selectedClient.mrrUsd} USD / mes</span>
                  <span className="text-gray-600 block">${selectedClient.mrrArs.toLocaleString()} ARS / mes</span>
                  <span className="text-[11px] text-gray-400 block pt-1">Alta: {selectedClient.joinedDate}</span>
                </div>
              </div>

              {/* AI Briefing Trigger Button */}
              <div className="bg-gray-900 text-white p-4 rounded-md border border-gray-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-medium text-[13px]">Brief Comercial de Cuenta (IA)</h4>
                  </div>
                  <button
                    onClick={() => handleGenerateAiBrief(selectedClient)}
                    disabled={isGeneratingBrief}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-[12px] font-medium transition-colors cursor-pointer border border-gray-700"
                  >
                    {isGeneratingBrief ? 'Analizando...' : 'Generar Brief'}
                  </button>
                </div>

                {aiBriefing && (
                  <pre className="text-[12px] text-gray-300 whitespace-pre-wrap font-sans bg-gray-950 p-3 rounded-md border border-gray-800">
                    {aiBriefing}
                  </pre>
                )}
              </div>
            </div>

            <div className="flex justify-end px-5 py-3.5 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 font-medium text-[13px] rounded-md hover:bg-gray-50 shadow-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Client Account (Frappe Style) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <form onSubmit={handleAddClient} className="bg-white border border-gray-200 rounded-lg max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-200 px-5 py-4">
              <h3 className="font-semibold text-[15px] text-gray-900">Nueva Cuenta Corporativa</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block font-medium text-gray-700 mb-1.5">Nombre de la Empresa <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  placeholder="Ej. Frutícola del Comahue S.A."
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">CUIT / ID Fiscal</label>
                  <input
                    type="text"
                    value={newClientData.taxId}
                    onChange={(e) => setNewClientData({ ...newClientData, taxId: e.target.value })}
                    placeholder="30-78901234-5"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-mono text-[12px] focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">País</label>
                  <select
                    value={newClientData.country}
                    onChange={(e) => setNewClientData({ ...newClientData, country: e.target.value as any })}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 transition-colors"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">Ciudad</label>
                  <input
                    type="text"
                    value={newClientData.city}
                    onChange={(e) => setNewClientData({ ...newClientData, city: e.target.value })}
                    placeholder="General Roca, Río Negro"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">MRR Acordado (USD/mes)</label>
                  <input
                    type="number"
                    value={newClientData.mrrUsd}
                    onChange={(e) => setNewClientData({ ...newClientData, mrrUsd: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-semibold focus:outline-hidden focus:border-gray-400 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-3">
                <span className="font-medium text-gray-900 block">Contacto Decisor</span>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={newClientData.contactName}
                    onChange={(e) => setNewClientData({ ...newClientData, contactName: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Cargo / Puesto"
                    value={newClientData.contactRole}
                    onChange={(e) => setNewClientData({ ...newClientData, contactRole: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Corporativo"
                    value={newClientData.contactEmail}
                    onChange={(e) => setNewClientData({ ...newClientData, contactEmail: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp / Teléfono"
                    value={newClientData.contactPhone}
                    onChange={(e) => setNewClientData({ ...newClientData, contactPhone: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-[13px] font-medium hover:bg-gray-50 cursor-pointer shadow-sm transition-colors"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-medium cursor-pointer shadow-sm transition-colors"
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
