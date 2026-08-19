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
  CheckSquare,
  ShieldCheck,
  Star,
  Check,
  ListOrdered,
  FileText,
  Calendar,
  Paperclip,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [panelTab, setPanelTab] = useState<'timeline' | 'tasks' | 'notes' | 'files' | 'emails'>('timeline');
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
          {/* Header (Frappe Style) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" /> Directorio de Contactos
              </h1>
              <p className="text-gray-500 text-[13px] mt-0.5">
                Base de datos verificada de ejecutivos decisores.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBulkWAModal(true)}
                className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <span>Mensaje Masivo</span>
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
                className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Contacto</span>
              </button>
            </div>
          </div>

      {/* KPI Stats Bar (Frappe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Destinatarios</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">{contacts.length}</span>
            <span className="text-[11px] text-gray-400 block">Total en base</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">WhatsApp</span>
            <span className="text-lg font-semibold text-emerald-600 leading-tight mt-0.5">
              {contacts.filter(c => c.whatsappVerified).length}
            </span>
            <span className="text-[11px] text-gray-400 block">Números verificados</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <MessageCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">C-Level</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">
              {contacts.filter(c => c.personaTag.includes('CEO') || c.personaTag.includes('CRO') || c.personaTag.includes('CTO')).length}
            </span>
            <span className="text-[11px] text-gray-400 block">Decisores</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Avg Lead Score</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5">
              {Math.round(contacts.reduce((acc, c) => acc + c.leadScore, 0) / contacts.length)}
            </span>
            <span className="text-[11px] text-gray-400 block">/ 100 MEDDIC</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Star className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Control Bar (Frappe Style) */}
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-2 flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar (Nombre, Empresa)..."
              className="w-full bg-transparent border-none pl-8 pr-16 py-1.5 text-[13px] focus:outline-hidden focus:ring-0 text-gray-900 placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-400 text-[10px] font-mono leading-none">⌘</span>
              <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-400 text-[10px] font-mono leading-none">K</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 px-2 md:px-0">
            <div className="h-5 w-px bg-gray-200 mx-1 hidden md:block"></div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
            >
              <option value="todos">Todos los Roles</option>
              <option value="CEO PyME">CEO PyME / Dueño</option>
              <option value="CRO / Ventas">CRO / Ventas</option>
              <option value="CTO / Sistemas">CTO / Sistemas</option>
              <option value="CMO / Marketing">CMO / Marketing</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
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
              className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 transition-colors focus:outline-hidden focus:border-gray-300 focus:ring-0 cursor-pointer"
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
          <div className="bg-gray-50 border-t border-gray-100 p-2 flex items-center justify-between text-[13px] text-gray-700">
            <div className="flex items-center gap-2 pl-1">
              <CheckSquare className="w-4 h-4 text-gray-400" />
              <span>{selectedContactIds.length} filas seleccionadas</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowBulkWAModal(true)}
                className="px-2.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                WhatsApp Masivo
              </button>
              <button
                onClick={() => alert(`Añadiendo ${selectedContactIds.length} contactos a la Lista...`)}
                className="px-2.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                Etiquetar
              </button>
              <button
                onClick={() => setSelectedContactIds([])}
                className="px-2.5 py-1.5 text-gray-500 hover:text-gray-700 text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table View (Frappe Style) */}
      <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-medium text-[12px]">
                <th className="px-4 py-2.5 w-10 text-center font-medium">
                  <input
                    type="checkbox"
                    checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                </th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">Contacto</th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">Empresa</th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">ICP</th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">Score</th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">Contacto Directo</th>
                <th className="px-4 py-2.5 font-medium whitespace-nowrap">Estado</th>
                <th className="px-4 py-2.5 text-right font-medium whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] text-gray-800">
              {filteredContacts.map((contact) => {
                const isSelected = selectedContactIds.includes(contact.id);
                const waCleanPhone = contact.phone.replace(/[^0-9]/g, '');

                return (
                  <tr key={contact.id} className={`hover:bg-gray-50 transition-colors group ${isSelected ? 'bg-gray-50/80' : ''}`}>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(contact.id)}
                        className="rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-gray-100 text-gray-600 font-medium text-xs flex items-center justify-center shrink-0 border border-gray-200/60">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 leading-tight">{contact.name}</span>
                          <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{contact.role}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <span className="font-medium text-gray-900 block leading-tight">{contact.company}</span>
                      <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">{contact.city}, {contact.country}</span>
                    </td>

                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm text-[11px] font-medium border border-gray-200">
                        {contact.personaTag}
                      </span>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 w-5">{contact.leadScore}</span>
                        <div className="w-12 bg-gray-100 rounded-sm h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${
                              contact.leadScore >= 90 ? 'bg-emerald-500' : contact.leadScore >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${contact.leadScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${waCleanPhone}?text=Hola%20${encodeURIComponent(contact.name)},%20te%20contacto%20desde%20Clientum`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          title={`Enviar WhatsApp a ${contact.phone}`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title={`Enviar Email a ${contact.email}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-medium border ${
                        contact.status === 'Cliente' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        contact.status === 'Oportunidad' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        contact.status === 'Lead Calificado' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {contact.status}
                      </span>
                    </td>

                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => setActiveContactModal(contact)}
                        className="opacity-0 group-hover:opacity-100 px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-[11px] rounded-md transition-all cursor-pointer shadow-sm"
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel: Full Contact Detail (Frappe UI Style) */}
      <AnimatePresence>
        {activeContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveContactModal(null)}
              className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-[1px]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-gray-50 shadow-2xl flex flex-col border-l border-gray-200"
            >
              <div className="flex flex-col h-full overflow-hidden">
                {/* Header Profile */}
                <div className="px-6 py-5 border-b border-gray-200 bg-white relative shrink-0">
                  <button
                    onClick={() => setActiveContactModal(null)}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-gray-100 text-gray-700 font-semibold text-lg flex items-center justify-center border border-gray-200">
                      {activeContactModal.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 leading-tight">{activeContactModal.name}</h3>
                      <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                        {activeContactModal.role} · {activeContactModal.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <a
                      href={`https://wa.me/${activeContactModal.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 font-medium text-[13px] rounded-md transition-colors border border-gray-200 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${activeContactModal.email}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 font-medium text-[13px] rounded-md transition-colors border border-gray-200 shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Email
                    </a>
                  </div>
                </div>

                {/* Sub-Tabs (Frappe CRM Style) */}
                <div className="flex items-center px-4 bg-white border-b border-gray-200 shrink-0 overflow-x-auto hide-scrollbar">
                  {[
                    { id: 'timeline', label: 'Overview', icon: Clock },
                    { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
                    { id: 'notes', label: 'Notes', icon: FileText },
                    { id: 'files', label: 'Files', icon: Paperclip },
                    { id: 'emails', label: 'Emails', icon: Mail }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPanelTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium border-b-2 whitespace-nowrap transition-colors ${
                        panelTab === tab.id
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  {panelTab === 'timeline' && (
                    <div className="space-y-6">
                      {/* At-a-glance Info Blocks */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                          <span className="text-gray-500 font-medium block text-[11px] uppercase tracking-wider mb-1">Scoring</span>
                          <div className="flex items-end gap-1.5">
                            <span className="font-semibold text-gray-900 text-lg leading-none">{activeContactModal.leadScore}</span>
                            <span className="text-[11px] text-gray-400 font-medium mb-0.5">/ 100</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                          <span className="text-gray-500 font-medium block text-[11px] uppercase tracking-wider mb-1">Arquetipo</span>
                          <span className="font-medium text-gray-900 text-[13px] block truncate">{activeContactModal.personaTag}</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                          <h4 className="font-medium text-[13px] text-gray-900">Información de Contacto</h4>
                        </div>
                        <div className="p-4 space-y-3 text-[13px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium text-gray-900">{activeContactModal.email}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Teléfono</span>
                            <span className="font-mono text-gray-900">{activeContactModal.phone}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Ubicación</span>
                            <span className="font-medium text-gray-900">{activeContactModal.city}, {activeContactModal.country}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Agregado</span>
                            <span className="font-medium text-gray-900">{activeContactModal.addedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                          <h4 className="font-medium text-[13px] text-gray-900">Listas & Segmentos</h4>
                        </div>
                        <div className="p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {activeContactModal.lists.map((l, i) => (
                              <span key={i} className="bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-sm text-[11px] border border-gray-200">
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {panelTab === 'tasks' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <CheckCircle2 className="w-8 h-8 text-gray-300" />
                      <p className="text-[13px] font-medium text-gray-500">No hay tareas pendientes.</p>
                      <button className="text-gray-900 font-medium text-[12px] hover:underline cursor-pointer border border-gray-200 px-3 py-1.5 rounded-md bg-white">Agregar tarea</button>
                    </div>
                  )}

                  {panelTab === 'notes' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <FileText className="w-8 h-8 text-gray-300" />
                      <p className="text-[13px] font-medium text-gray-500">No hay notas registradas.</p>
                      <button className="text-gray-900 font-medium text-[12px] hover:underline cursor-pointer border border-gray-200 px-3 py-1.5 rounded-md bg-white">Crear nota</button>
                    </div>
                  )}

                  {panelTab === 'files' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <Paperclip className="w-8 h-8 text-gray-300" />
                      <p className="text-[13px] font-medium text-gray-500">No se adjuntaron archivos.</p>
                      <button className="text-gray-900 font-medium text-[12px] hover:underline cursor-pointer border border-gray-200 px-3 py-1.5 rounded-md bg-white">Subir archivo</button>
                    </div>
                  )}

                  {panelTab === 'emails' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                      <Mail className="w-8 h-8 text-gray-300" />
                      <p className="text-[13px] font-medium text-gray-500">Sin historial de correos.</p>
                      <button className="text-gray-900 font-medium text-[12px] hover:underline cursor-pointer border border-gray-200 px-3 py-1.5 rounded-md bg-white">Conectar bandeja</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal: Add New Contact */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <form onSubmit={handleAddContact} className="bg-white border border-gray-200 rounded-lg max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-200 px-5 py-4">
              <h3 className="font-semibold text-[15px] text-gray-900">Nuevo Contacto</h3>
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
                <label className="block font-medium text-gray-700 mb-1.5">Nombre Completo <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Fernando Sola"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">Cargo / Puesto</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Gerente Comercial"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Empresa S.A."
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">Email Corporativo <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="fernando@empresa.com"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">WhatsApp / Teléfono</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+5492984123456"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-mono text-[12px] focus:outline-hidden focus:border-gray-400 focus:ring-0 placeholder:text-gray-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">Arquetipo Persona</label>
                  <select
                    value={formData.personaTag}
                    onChange={(e) => setFormData({ ...formData, personaTag: e.target.value as any })}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 transition-colors"
                  >
                    <option value="CEO PyME">CEO PyME / Dueño</option>
                    <option value="CRO / Ventas">CRO / Ventas</option>
                    <option value="CTO / Sistemas">CTO / Sistemas</option>
                    <option value="CMO / Marketing">CMO / Marketing</option>
                    <option value="CFO / Finanzas">CFO / Finanzas</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1.5">País</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 focus:ring-0 transition-colors"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="México">México</option>
                  </select>
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
                Guardar
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
