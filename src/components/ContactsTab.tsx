import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Building2,
  Tag,
  Sparkles,
  ExternalLink,
  MoreHorizontal,
  Download,
  Trash2,
  Plus,
  Send,
  X,
  ShieldCheck,
  Star,
  Check,
  ListOrdered
} from 'lucide-react';
import { ClientsTab } from './ClientsTab';
import { ListsTab } from './ListsTab';
import { PdfExportButton } from './common/PdfExportButton';
import { BulkWhatsAppModal } from './BulkWhatsAppModal';

export interface B2BContact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  personaTag: 'CRO / Ventas' | 'CEO PyME' | 'CTO / Sistemas' | 'CMO / Marketing' | 'CFO / Finanzas';
  leadScore: number; // 0-100
  status: 'Lead Calificado' | 'Contactado' | 'Oportunidad' | 'Cliente' | 'Sin Contactar';
  whatsappVerified: boolean;
  lists: string[];
  addedDate: string;
}

const INITIAL_B2B_CONTACTS: B2BContact[] = [
  {
    id: 'cnt-01',
    name: 'Ing. Roberto Albarracín',
    role: 'CEO & Socio Director',
    company: 'Grupo Agro-Industrial Patagonia S.A.',
    email: 'r.albarracin@agropatagonia.com.ar',
    phone: '+5492984431200',
    country: 'Argentina',
    city: 'General Roca',
    personaTag: 'CEO PyME',
    leadScore: 94,
    status: 'Cliente',
    whatsappVerified: true,
    lists: ['Decisores Agro & Vaca Muerta', 'C-Level Decision Makers'],
    addedDate: '2024-03-15'
  },
  {
    id: 'cnt-02',
    name: 'Lic. Laura Fernández',
    role: 'Directora de Operaciones',
    company: 'Logística Austral S.R.L.',
    email: 'lfernandez@logisticaaustral.com.ar',
    phone: '+5492994129876',
    country: 'Argentina',
    city: 'Neuquén',
    personaTag: 'CRO / Ventas',
    leadScore: 89,
    status: 'Cliente',
    whatsappVerified: true,
    lists: ['Decisores Agro & Vaca Muerta', 'WhatsApp Verificados Scoring > 80'],
    addedDate: '2024-06-10'
  },
  {
    id: 'cnt-03',
    name: 'Ing. Esteban Rossi',
    role: 'CTO & Head of IT',
    company: 'TechSol Cuyo S.A.',
    email: 'esteban@techsolcuyo.com',
    phone: '+5492615543321',
    country: 'Argentina',
    city: 'Mendoza',
    personaTag: 'CTO / Sistemas',
    leadScore: 92,
    status: 'Cliente',
    whatsappVerified: true,
    lists: ['C-Level Decision Makers', 'WhatsApp Verificados Scoring > 80'],
    addedDate: '2024-08-01'
  },
  {
    id: 'cnt-04',
    name: 'Felipe Undurraga',
    role: 'VP Commercial Sales',
    company: 'FinTech Cordillerana S.A.S.',
    email: 'felipe@fintechcordillera.cl',
    phone: '+56981234567',
    country: 'Chile',
    city: 'Santiago',
    personaTag: 'CRO / Ventas',
    leadScore: 85,
    status: 'Oportunidad',
    whatsappVerified: true,
    lists: ['C-Level Decision Makers', 'Candidatos Up-Sell AFIP'],
    addedDate: '2024-11-20'
  },
  {
    id: 'cnt-05',
    name: 'Martín Sola',
    role: 'Gerente Comercial',
    company: 'Distribuidora San Martín S.A.',
    email: 'msola@distribuidorasanmartin.com.ar',
    phone: '+5493416654321',
    country: 'Argentina',
    city: 'Rosario',
    personaTag: 'CRO / Ventas',
    leadScore: 78,
    status: 'Contactado',
    whatsappVerified: true,
    lists: ['Candidatos Up-Sell AFIP'],
    addedDate: '2024-02-18'
  },
  {
    id: 'cnt-06',
    name: 'Valeria Gómez',
    role: 'Chief Commercial Officer',
    company: 'RetailNorte S.A. de C.V.',
    email: 'valeria@retailnorte.mx',
    phone: '+528112345678',
    country: 'México',
    city: 'Monterrey',
    personaTag: 'CMO / Marketing',
    leadScore: 96,
    status: 'Lead Calificado',
    whatsappVerified: true,
    lists: ['C-Level Decision Makers', 'WhatsApp Verificados Scoring > 80'],
    addedDate: '2025-01-15'
  }
];

interface ContactsTabProps {
  initialTab?: 'contacts' | 'clients' | 'lists';
}

export function ContactsTab({ initialTab }: ContactsTabProps) {
  const [subTab, setSubTab] = useState<'contacts' | 'clients' | 'lists'>(initialTab || 'contacts');
  const [contacts, setContacts] = useState<B2BContact[]>(INITIAL_B2B_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedCountry, setSelectedCountry] = useState<string>('todos');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [activeContactModal, setActiveContactModal] = useState<B2BContact | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showBulkWAModal, setShowBulkWAModal] = useState<boolean>(false);

  // New Contact Form
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    country: 'Argentina',
    city: 'Buenos Aires',
    personaTag: 'CEO PyME' as B2BContact['personaTag'],
    leadScore: 82
  });

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery);

    const matchesRole = selectedRole === 'todos' || c.personaTag === selectedRole;
    const matchesStatus = selectedStatus === 'todos' || c.status === selectedStatus;
    const matchesCountry = selectedCountry === 'todos' || c.country === selectedCountry;

    return matchesSearch && matchesRole && matchesStatus && matchesCountry;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContactIds(filteredContacts.map(c => c.id));
    } else {
      setSelectedContactIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedContactIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newContact: B2BContact = {
      id: `cnt-${Date.now()}`,
      name: formData.name,
      role: formData.role || 'Directivo',
      company: formData.company || 'Empresa B2B',
      email: formData.email,
      phone: formData.phone.replace(/[^0-9+]/g, '') || '+5491100000000',
      country: formData.country,
      city: formData.city,
      personaTag: formData.personaTag,
      leadScore: formData.leadScore,
      status: 'Lead Calificado',
      whatsappVerified: true,
      lists: ['General Destinatarios'],
      addedDate: new Date().toISOString().split('T')[0]
    };

    setContacts([newContact, ...contacts]);
    setShowAddModal(false);
    setFormData({
      name: '',
      role: '',
      company: '',
      email: '',
      phone: '',
      country: 'Argentina',
      city: 'Buenos Aires',
      personaTag: 'CEO PyME',
      leadScore: 82
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setSubTab('contacts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'contacts'
              ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Contactos & Directores B2B</span>
        </button>

        <button
          onClick={() => setSubTab('clients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'clients'
              ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Fichero Clientes LATAM</span>
        </button>

        <button
          onClick={() => setSubTab('lists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'lists'
              ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>Listas & Segmentos</span>
        </button>
      </div>

      {subTab === 'clients' && <ClientsTab />}
      {subTab === 'lists' && <ListsTab />}

      {subTab === 'contacts' && (
        <div id="contacts-list-container" className="space-y-6">
          {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Directorio B2B
            </span>
            <span className="text-slate-400 text-xs">· Módulo 2.3 Conocer tu Audiencia</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-600" /> Contactos y Destinatarios B2B
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Base de datos verificada de ejecutivos decisores, canales de comunicación directa y puntaje de intención (Scoring).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkWAModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Envío Masivo WhatsApp (IA)</span>
          </button>
          <PdfExportButton
            targetId="contacts-list-container"
            title="Directorio de Contactos B2B"
            filename="Directorio_Contactos_B2B.pdf"
            label="Exportar a PDF"
            variant="outline"
            size="md"
            branding={{
              companyName: 'Clientum B2B Intelligence',
              primaryColor: '#059669'
            }}
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer border-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Contacto</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Destinatarios</span>
            <span className="text-2xl font-black text-slate-900">{contacts.length}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">100% Activos</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">WhatsApp Verificados</span>
            <span className="text-2xl font-black text-emerald-600">
              {contacts.filter(c => c.whatsappVerified).length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Direct wa.me Chat Ready</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <MessageCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Decisores C-Level</span>
            <span className="text-2xl font-black text-slate-900">
              {contacts.filter(c => c.personaTag.includes('CEO') || c.personaTag.includes('CRO') || c.personaTag.includes('CTO')).length}
            </span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">Alta Capacidad de Cierre</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Lead Score Promedio</span>
            <span className="text-2xl font-black text-slate-900">
              {Math.round(contacts.reduce((acc, c) => acc + c.leadScore, 0) / contacts.length)} / 100
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Matriz MEDDIC & ICP Fit</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Star className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar contacto por Nombre, Email, Empresa o WhatsApp..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Roles Persona</option>
              <option value="CEO PyME">CEO PyME / Dueño</option>
              <option value="CRO / Ventas">CRO / Ventas</option>
              <option value="CTO / Sistemas">CTO / Sistemas</option>
              <option value="CMO / Marketing">CMO / Marketing</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Estados</option>
              <option value="Cliente">Cliente</option>
              <option value="Oportunidad">Oportunidad</option>
              <option value="Lead Calificado">Lead Calificado</option>
              <option value="Contactado">Contactado</option>
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Países</option>
              <option value="Argentina">🇦🇷 Argentina</option>
              <option value="Chile">🇨🇱 Chile</option>
              <option value="México">🇲🇽 México</option>
            </select>
          </div>
        </div>

        {/* Selected Batch Bar */}
        {selectedContactIds.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{selectedContactIds.length} contacto(s) seleccionado(s)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBulkWAModal(true)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enviar WhatsApp con IA ({selectedContactIds.length})</span>
              </button>
              <button
                onClick={() => alert(`Añadiendo ${selectedContactIds.length} contactos a la Lista de Segmentación...`)}
                className="px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg font-bold text-[11px] hover:bg-emerald-100/50 cursor-pointer"
              >
                Asignar a Lista
              </button>
              <button
                onClick={() => setSelectedContactIds([])}
                className="text-slate-500 hover:text-slate-700 text-[11px] font-bold"
              >
                Deseleccionar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <th className="p-3.5">Contacto & Cargo</th>
              <th className="p-3.5">Empresa & Ubicación</th>
              <th className="p-3.5">Persona ICP</th>
              <th className="p-3.5">Score Intención</th>
              <th className="p-3.5">Canal Directo</th>
              <th className="p-3.5">Estado</th>
              <th className="p-3.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredContacts.map((contact) => {
              const isSelected = selectedContactIds.includes(contact.id);
              const waCleanPhone = contact.phone.replace(/[^0-9]/g, '');

              return (
                <tr key={contact.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-emerald-50/40' : ''}`}>
                  <td className="p-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(contact.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{contact.name}</span>
                        <span className="text-[11px] text-slate-500">{contact.role}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block">{contact.company}</span>
                    <span className="text-[10px] text-slate-400">{contact.city}, {contact.country}</span>
                  </td>

                  <td className="p-3.5">
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {contact.personaTag}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            contact.leadScore >= 90 ? 'bg-emerald-500' : contact.leadScore >= 75 ? 'bg-indigo-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${contact.leadScore}%` }}
                        />
                      </div>
                      <span className="font-black text-slate-800 text-[11px]">{contact.leadScore}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${waCleanPhone}?text=Hola%20${encodeURIComponent(contact.name)},%20te%20contacto%20desde%20Clientum`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-lg transition-colors"
                        title={`Enviar WhatsApp a ${contact.phone}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                        title={`Enviar Email a ${contact.email}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full ${
                      contact.status === 'Cliente' ? 'bg-emerald-100 text-emerald-800' :
                      contact.status === 'Oportunidad' ? 'bg-indigo-100 text-indigo-800' :
                      contact.status === 'Lead Calificado' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {contact.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setActiveContactModal(contact)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] rounded-lg transition-all cursor-pointer"
                    >
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Full Contact Detail */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-base flex items-center justify-center">
                  {activeContactModal.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{activeContactModal.name}</h3>
                  <p className="text-xs text-slate-500">{activeContactModal.role} · {activeContactModal.company}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveContactModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-medium block">Información de Contacto:</span>
                <p className="font-semibold text-slate-800">{activeContactModal.email}</p>
                <p className="font-mono text-slate-600">{activeContactModal.phone}</p>
                <p className="text-slate-500">{activeContactModal.city}, {activeContactModal.country}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <span className="text-indigo-600 font-bold block text-[10px] uppercase">Arquetipo Persona:</span>
                  <span className="font-extrabold text-indigo-900 text-xs block mt-0.5">{activeContactModal.personaTag}</span>
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <span className="text-emerald-700 font-bold block text-[10px] uppercase">Lead Scoring:</span>
                  <span className="font-extrabold text-emerald-900 text-sm block mt-0.5">{activeContactModal.leadScore} / 100</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Listas de Segmentación:</span>
                <div className="flex flex-wrap gap-1">
                  {activeContactModal.lists.map((l, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-200 pt-3">
              <a
                href={`https://wa.me/${activeContactModal.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar Chat WhatsApp</span>
              </a>

              <button
                onClick={() => setActiveContactModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Contact */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddContact} className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Agregar Nuevo Contacto B2B</h3>
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
                <label className="block font-medium text-slate-700 mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ing. Fernando Sola"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Cargo / Puesto:</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Gerente Comercial"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Empresa:</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Empresa S.A."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Corporativo:</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="fernando@empresa.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">WhatsApp / Teléfono:</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+5492984123456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Arquetipo Persona:</label>
                  <select
                    value={formData.personaTag}
                    onChange={(e) => setFormData({ ...formData, personaTag: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="CEO PyME">CEO PyME / Dueño</option>
                    <option value="CRO / Ventas">CRO / Ventas</option>
                    <option value="CTO / Sistemas">CTO / Sistemas</option>
                    <option value="CMO / Marketing">CMO / Marketing</option>
                    <option value="CFO / Finanzas">CFO / Finanzas</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">País:</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="México">México</option>
                  </select>
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
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Guardar Contacto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de Envío Masivo WhatsApp con IA */}
      <BulkWhatsAppModal
        isOpen={showBulkWAModal}
        onClose={() => setShowBulkWAModal(false)}
        initialContacts={contacts}
        preselectedIds={selectedContactIds.length > 0 ? selectedContactIds : undefined}
      />
        </div>
      )}
    </div>
  );
}
