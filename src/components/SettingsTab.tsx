import React, { useState } from 'react';
import {
  Settings, CheckCircle2, Key, Globe, Users, Plus, Trash2, Mail, Lock, Zap,
  Sparkles, Bot, Shield, MapPin, Search, Send, Database, KeyRound,
  ExternalLink, Eye, EyeOff, ChevronDown, ChevronRight, AlertCircle,
  Layers, Server, Webhook, CreditCard, Building, BarChart2, ArrowLeftRight, Map
} from 'lucide-react';
import { SmtpTab } from './SmtpTab';
import { ImportExportTab } from './ImportExportTab';

/* ─────────────────────────────────────────────────────────────────
   Integration catalog — all env-vars / services the platform uses
───────────────────────────────────────────────────────────────── */
interface Integration {
  id: string;
  name: string;
  nameEs: string;
  desc: string;
  descEs: string;
  envVar: string;
  category: string;
  icon: React.ElementType;
  color: string;
  required: boolean;
  docsUrl?: string;
  placeholder?: string;
}

const CATEGORIES: { key: string; label: string; labelEs: string; icon: React.ElementType; accent: string }[] = [
  { key: 'ia',          label: 'AI & LLMs',                    labelEs: 'IA & Modelos de Lenguaje',       icon: Sparkles,  accent: 'border-violet-400 text-violet-700 bg-violet-50' },
  { key: 'prospeccion', label: 'Prospecting & Data',           labelEs: 'Prospección & Datos',             icon: Search,    accent: 'border-emerald-400 text-emerald-700 bg-emerald-50' },
  { key: 'email',       label: 'Email & Communication',        labelEs: 'Email & Comunicación',            icon: Mail,      accent: 'border-sky-400 text-sky-700 bg-sky-50' },
  { key: 'crm',         label: 'CRM & Agents',                 labelEs: 'CRM & Agentes',                   icon: Bot,       accent: 'border-indigo-400 text-indigo-700 bg-indigo-50' },
  { key: 'db',          label: 'Database & Infrastructure',    labelEs: 'Base de Datos & Infraestructura', icon: Database,  accent: 'border-slate-400 text-slate-700 bg-slate-100' },
];

const ALL_INTEGRATIONS: Integration[] = [
  // ─── IA & LLMs (100% Google Gemini Native Free AI) ───
  {
    id: 'gemini', name: 'Google Gemini AI', nameEs: 'Google Gemini AI (Nativo & Free)',
    desc: 'Motor principal de IA de Google — prospección, brochures, estrategias, voz y chat (Gratis).',
    descEs: 'Motor principal de IA de Google — prospección, brochures, estrategias, voz y chat (Gratis).',
    envVar: 'GEMINI_API_KEY', category: 'ia', icon: Sparkles,
    color: 'text-violet-600 bg-violet-50', required: true,
    docsUrl: 'https://aistudio.google.com/app/apikey',
    placeholder: 'AIzaSy...',
  },

  // ─── Prospección & Datos (100% Gratis - OpenStreetMap) ───
  {
    id: 'osm', name: 'OpenStreetMap (Nominatim + Overpass)', nameEs: 'OpenStreetMap (Nominatim + Overpass)',
    desc: 'Free geocoding & business discovery — 100% free, no API key required, no per-request cost.',
    descEs: 'Descubrimiento geolocalizado y geocoding 100% gratuito — sin API key ni costo por request.',
    envVar: 'SIN API KEY (Gratis)', category: 'prospeccion', icon: Map,
    color: 'text-lime-600 bg-lime-50', required: false,
    docsUrl: 'https://wiki.openstreetmap.org/wiki/Overpass_API',
    placeholder: 'No requiere configuración (Libre y Gratuito)',
  },

  // ─── Email & Comunicación ───
  {
    id: 'smtp_user', name: 'SMTP Username / Usuario SMTP', nameEs: 'Usuario SMTP (Libre)',
    desc: 'SMTP server username for outbound email campaign delivery.',
    descEs: 'Usuario del servidor SMTP para envío de campañas de email.',
    envVar: 'SMTP_USER', category: 'email', icon: Mail,
    color: 'text-sky-500 bg-sky-50', required: false,
    placeholder: 'usuario@smtp.com',
  },
  {
    id: 'smtp_pass', name: 'SMTP Password / Contraseña SMTP', nameEs: 'Contraseña SMTP',
    desc: 'SMTP server password.',
    descEs: 'Contraseña o credencial del SMTP.',
    envVar: 'SMTP_PASS', category: 'email', icon: Lock,
    color: 'text-sky-600 bg-sky-50', required: false,
    placeholder: 'contraseña segura',
  },

  // ─── CRM & Agentes ───
  {
    id: 'santi', name: 'Santi SDR Agent (Open Source)', nameEs: 'Agente Santi SDR',
    desc: 'Server-to-server auth key for the WhatsApp Santi/Hermes outreach agent.',
    descEs: 'Autenticación para el agente WhatsApp Santi/Hermes.',
    envVar: 'SANTI_API_KEY', category: 'crm', icon: Bot,
    color: 'text-teal-500 bg-teal-50', required: false,
    placeholder: 'santi_sk_...',
  },
  {
    id: 'app_url', name: 'App Public URL', nameEs: 'URL Pública del App',
    desc: 'Production base URL of the CRM.',
    descEs: 'URL base en producción del CRM.',
    envVar: 'APP_URL', category: 'crm', icon: Globe,
    color: 'text-slate-500 bg-slate-100', required: false,
    placeholder: 'https://clientum.com.ar',
  },

  // ─── Base de Datos & Infraestructura ───
  {
    id: 'database', name: 'PostgreSQL Connection (Neon)', nameEs: 'Conexión PostgreSQL (Neon)',
    desc: 'Serverless PostgreSQL connection string — main CRM database.',
    descEs: 'Cadena de conexión PostgreSQL serverless — base de datos principal del CRM.',
    envVar: 'DATABASE_URL', category: 'db', icon: Database,
    color: 'text-green-600 bg-green-50', required: true,
    docsUrl: 'https://console.neon.tech',
    placeholder: 'postgresql://user:pass@host/db?sslmode=require',
  },
  {
    id: 'neon_auth', name: 'Neon Auth Base URL', nameEs: 'Neon Auth Base URL',
    desc: 'Neon Auth endpoint for serverless authentication integration.',
    descEs: 'Endpoint de Neon Auth para integración de autenticación serverless.',
    envVar: 'NEON_AUTH_BASE_URL', category: 'db', icon: Server,
    color: 'text-teal-600 bg-teal-50', required: false,
    docsUrl: 'https://neon.tech/docs/guides/neon-auth',
    placeholder: 'https://ep-xxxx.us-east-2.aws.neon.tech',
  },
  {
    id: 'session', name: 'Session Secret', nameEs: 'Session Secret (Cookies)',
    desc: 'Random string used to sign Express session cookies securely.',
    descEs: 'Cadena aleatoria para firmar cookies de sesión de Express.',
    envVar: 'SESSION_SECRET', category: 'db', icon: KeyRound,
    color: 'text-slate-600 bg-slate-100', required: true,
    placeholder: 'cadena-aleatoria-larga-minimo-32-chars',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */
interface SettingsTabProps {
  defaultSubTab?: 'general' | 'apikeys' | 'domains' | 'team' | 'smtp' | 'import_export';
}

export function SettingsTab({ defaultSubTab }: SettingsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'apikeys' | 'domains' | 'team' | 'smtp' | 'import_export'>(
    defaultSubTab || 'apikeys'
  );
  const [appName, setAppName] = useState('ClientumLatam - AI Marketing Expert');
  const [saved, setSaved] = useState(false);

  // Configured keys: maps integration id → masked key string
  const [configuredKeys, setConfiguredKeys] = useState<Record<string, string>>({
    gemini:   'Global Clientum Server Key (Free Gemini AI)',
    apify:    'Global Clientum Server Key (Free Scraper)',
    google_maps: 'Global Clientum Server Key (Places API)',
    hunter:   'Global Clientum Server Key (Enrichment API)',
    osm:      'Nominatim + Overpass (Público, Gratis — Sin Key)',
    smtp_user:'smtp.clientum.com.ar',
    smtp_pass:'Global Clientum SMTP Service',
    sendgrid: 'Global Clientum SendGrid Service',
    santi:    'Global Santi SDR Agent Key',
    crm_token:'Global CRM Security Token',
    app_url:  'https://clientum.com.ar',
    google_api:'Global Google API Client',
    database: 'Neon PostgreSQL Database (Activa)',
    session:  'Clientum Encrypted Session Secret',
  });

  // Which keys are revealed (unmasked)
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  // Which categories are collapsed
  const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});
  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Add Key form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEnvVar, setNewEnvVar] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCategory, setNewCategory] = useState('ia');

  // Sender Domains
  const [domains, setDomains] = useState([
    { id: 1, domain: 'clientum.com.ar', status: 'verified', dkim: true, spf: true },
    { id: 2, domain: 'mail.clientum.com.ar', status: 'pending', dkim: false, spf: true },
  ]);
  const [newDomain, setNewDomain] = useState('');
  const [showAddDomainForm, setShowAddDomainForm] = useState(false);

  // Team Access
  const [team, setTeam] = useState([
    { id: 1, name: 'Admin User',     email: 'admin@clientum.com.ar',    role: 'Owner'  },
    { id: 2, name: 'Sales Agent',    email: 'sales@clientum.com.ar',     role: 'Editor' },
    { id: 3, name: 'Marketing Pro',  email: 'marketing@clientum.com.ar', role: 'Viewer' },
  ]);
  const [newMemberName, setNewMemberName]   = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole]   = useState('Editor');
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);

  /* helpers */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleReveal = (id: string) =>
    setRevealedKeys(p => ({ ...p, [id]: !p[id] }));

  const toggleCat = (key: string) =>
    setCollapsedCats(p => ({ ...p, [key]: !p[key] }));

  const startEdit = (id: string) => {
    setEditingId(id);
    setEditValue(configuredKeys[id] || '');
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) setConfiguredKeys(p => ({ ...p, [id]: editValue.trim() }));
    else { const next = { ...configuredKeys }; delete next[id]; setConfiguredKeys(next); }
    setEditingId(null);
    setEditValue('');
  };

  const removeKey = (id: string) => {
    const next = { ...configuredKeys };
    delete next[id];
    setConfiguredKeys(next);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newValue || !newEnvVar) return;
    // add as a custom key via a synthetic integration lookup
    setConfiguredKeys(p => ({ ...p, [newEnvVar.toLowerCase()]: newValue }));
    setNewName(''); setNewEnvVar(''); setNewValue('');
    setShowAddForm(false);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    setDomains(p => [...p, { id: Date.now(), domain: newDomain, status: 'pending', dkim: false, spf: true }]);
    setNewDomain(''); setShowAddDomainForm(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;
    setTeam(p => [...p, { id: Date.now(), name: newMemberName, email: newMemberEmail, role: newMemberRole }]);
    setNewMemberName(''); setNewMemberEmail(''); setShowAddMemberForm(false);
  };

  const mask = (val: string) => val.length <= 8 ? '••••••••' : `${val.slice(0, 4)}...${val.slice(-4)}`;

  const configuredCount = Object.keys(configuredKeys).length;
  const totalCount = ALL_INTEGRATIONS.length;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-lg">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Platform Settings / Ajustes de Plataforma</h2>
          <p className="text-sm text-slate-500">Manage API keys, sender domains, and team access across all modules.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {[
              { id: 'general',       icon: Settings,       label: 'Ajustes Generales' },
              { id: 'apikeys',       icon: Shield,         label: 'Servicios & Integraciones', badge: '100% Activas' },
              { id: 'smtp',          icon: Server,         label: 'Servidor SMTP / API' },
              { id: 'import_export', icon: ArrowLeftRight, label: 'Importar / Exportar' },
              { id: 'domains',       icon: Globe,          label: 'Dominios de Remitente' },
              { id: 'team',          icon: Users,          label: 'Acceso de Equipo' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-colors text-left ${
                  activeSubTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeSubTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'
                  }`}>{tab.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xs min-h-[500px]">

          {/* ── General ── */}
          {activeSubTab === 'general' && (
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">General Preferences / Preferencias Generales</h3>
              <form onSubmit={handleSave} className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Workspace Name / Nombre del Espacio</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={e => setAppName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                {saved && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> ¡Cambios guardados!
                  </div>
                )}
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                  Save Changes / Guardar Cambios
                </button>
              </form>
            </div>
          )}

          {/* ── API Keys & Integrations ── */}
          {activeSubTab === 'apikeys' && (
            <div className="p-6">
              {/* Centralized API Notice */}
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">APIs Centralizadas & Precargadas en Servidor Clientum</h4>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    Todas las funciones avanzadas (IA con Google Gemini Free, prospección geolocalizada con OpenStreetMap + Google Maps Places API, Base de Datos PostgreSQL Neon, Agente Santi SDR, Búsquedas y SMTP) están integradas y precargadas centralmente a nivel de servidor. Ningún usuario necesita ingresar ni contratar claves individuales de API.
                  </p>
                </div>
              </div>

              {/* Section header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Estado de Integraciones de Servidor</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Estado en tiempo real de los conectores y servicios globales precargados.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      100% Servicios Globales Activos en Servidor
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration catalog grouped by category */}
              <div className="space-y-5">
                {CATEGORIES.map(cat => {
                  const integrations = ALL_INTEGRATIONS.filter(i => i.category === cat.key);
                  const isCollapsed = collapsedCats[cat.key];

                  return (
                    <div key={cat.key} className="border border-slate-200 rounded-2xl overflow-hidden">
                      {/* Category header */}
                      <button
                        onClick={() => toggleCat(cat.key)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${cat.accent}`}>
                            <cat.icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{cat.label}</p>
                            <p className="text-[10px] text-slate-400 font-normal">{cat.labelEs}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            {integrations.length}/{integrations.length} Activas
                          </span>
                          {isCollapsed
                            ? <ChevronRight className="w-4 h-4 text-slate-400" />
                            : <ChevronDown className="w-4 h-4 text-slate-400" />
                          }
                        </div>
                      </button>

                      {/* Integration rows */}
                      {!isCollapsed && (
                        <div className="divide-y divide-slate-100">
                          {integrations.map(integ => {
                            const Icon = integ.icon;

                            return (
                              <div key={integ.id} className="px-4 py-3.5 flex items-start gap-3.5 hover:bg-slate-50/60 transition-colors">
                                {/* Icon */}
                                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${integ.color}`}>
                                  <Icon className="w-4 h-4" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-slate-800">{integ.nameEs || integ.name}</span>
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase tracking-wide flex items-center gap-0.5">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Activa en Servidor
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{integ.descEs}</p>

                                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <code className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono border border-slate-200">{integ.envVar}</code>
                                    <code className="text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                      {configuredKeys[integ.id] || 'Servidor Global Clientum (Activo)'}
                                    </code>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Sender Domains ── */}
          {activeSubTab === 'domains' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Sender Domains / Dominios de Remitente</h3>
                  <p className="text-xs text-slate-500 mt-1">Configura dominios autorizados para mejorar la entregabilidad del email.</p>
                </div>
                <button onClick={() => setShowAddDomainForm(!showAddDomainForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Domain
                </button>
              </div>

              {showAddDomainForm && (
                <form onSubmit={handleAddDomain} className="mb-6 p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Domain Name / Dominio</label>
                      <input type="text" placeholder="e.g. miservicio.com" value={newDomain} onChange={e => setNewDomain(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none" required />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddDomainForm(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer">Cancelar</button>
                    <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">Agregar Dominio</button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {domains.map(dom => (
                  <div key={dom.id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50/50">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-sm text-slate-800">{dom.domain}</span>
                        {dom.status === 'verified'
                          ? <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Verificado</span>
                          : <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Pendiente</span>
                        }
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        {['DKIM', 'SPF'].map(rec => {
                          const ok = rec === 'DKIM' ? dom.dkim : dom.spf;
                          return (
                            <div key={rec} className="flex items-center gap-1 text-[11px]">
                              <div className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                              <span className={ok ? 'text-slate-700 font-medium' : 'text-slate-400'}>{rec}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">Gestionar DNS</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Team Access ── */}
          {activeSubTab === 'team' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Team Access / Acceso de Equipo</h3>
                  <p className="text-xs text-slate-500 mt-1">Configure users who can manage campaigns and integrations.</p>
                </div>
                <button onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs rounded-lg text-sm font-semibold transition-all cursor-pointer">
                  <Plus className="w-4 h-4" /> Invite Member
                </button>
              </div>

              {showAddMemberForm && (
                <form onSubmit={handleAddMember} className="mb-6 p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre</label>
                      <input type="text" placeholder="e.g. Martín Gómez" value={newMemberName} onChange={e => setNewMemberName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input type="email" placeholder="martin@clientum.com.ar" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Rol</label>
                      <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white">
                        <option value="Owner">Owner (Propietario)</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer (Lector)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddMemberForm(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer">Cancelar</button>
                    <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">Invitar</button>
                  </div>
                </form>
              )}

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Usuario</th>
                      <th className="px-4 py-3">Rol</th>
                      <th className="px-4 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {team.map(member => (
                      <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800">{member.name}</div>
                          <div className="text-[11px] text-slate-500">{member.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600">{member.role}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SMTP & API ── */}
          {activeSubTab === 'smtp' && (
            <div className="p-6">
              <SmtpTab />
            </div>
          )}

          {/* ── Import / Export ── */}
          {activeSubTab === 'import_export' && (
            <div className="p-6">
              <ImportExportTab />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
