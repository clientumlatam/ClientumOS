import React, { useState, useEffect } from 'react';
import {
  Kanban,
  Plus,
  DollarSign,
  Building2,
  User,
  Calendar,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  X,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  Layers,
  PhoneCall,
  Mail,
  ShieldCheck,
  MessageSquare,
  FileText,
  Paperclip,
  Clock,
  Briefcase,
  Trash2,
  Save,
  Check,
  PlusCircle,
  Phone,
  FileCheck,
  Edit2,
  Pin,
  Star,
  Send,
  Share2,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BulkWhatsAppModal } from './BulkWhatsAppModal';

export interface Deal {
  id: string;
  companyName: string;
  contactName: string;
  dealValueUsd: number;
  dealValueArs: number;
  stageId: 'lead' | 'contacted' | 'proposal' | 'closing' | 'won';
  meddicScore: number; // 0 to 100
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia';
  probability: number;
  expectedCloseDate: string;
  owner: string;
}

export interface CustomView {
  id: string;
  name: string;
  searchQuery: string;
  owner: string;
  country: string;
  minValue: number;
  minScore: number;
}

export interface CrmNote {
  id: string;
  dealId: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface CrmTask {
  id: string;
  dealId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface CrmActivity {
  id: string;
  dealId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'system';
  title: string;
  text: string;
  createdAt: string;
  duration?: string;
}

const STAGES = [
  { id: 'lead', name: '1. Lead / Contacto', color: 'bg-slate-100 text-slate-800 border-slate-300', defaultProb: 20 },
  { id: 'contacted', name: '2. Demo / Calificado', color: 'bg-blue-50 text-blue-800 border-blue-200', defaultProb: 50 },
  { id: 'proposal', name: '3. Propuesta Enviada', color: 'bg-amber-50 text-amber-800 border-amber-200', defaultProb: 75 },
  { id: 'closing', name: '4. Negociación / Cierre', color: 'bg-purple-50 text-purple-800 border-purple-200', defaultProb: 90 },
  { id: 'won', name: '5. Ganada / Cliente Activo', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', defaultProb: 100 },
];

const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-101',
    companyName: 'Transportes Neuquén Vaca Muerta',
    contactName: 'Ing. Carlos Rossi',
    dealValueUsd: 28000,
    dealValueArs: 36400000,
    stageId: 'lead',
    meddicScore: 45,
    country: 'Argentina',
    probability: 20,
    expectedCloseDate: '2026-09-15',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-102',
    companyName: 'Bodega Cuyo Reserve S.A.',
    contactName: 'Lic. Sofía Martínez',
    dealValueUsd: 18500,
    dealValueArs: 24050000,
    stageId: 'contacted',
    meddicScore: 78,
    country: 'Argentina',
    probability: 50,
    expectedCloseDate: '2026-08-30',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-103',
    companyName: 'Agroquímica Rosario SpA',
    contactName: 'Martin Benítez',
    dealValueUsd: 42000,
    dealValueArs: 54600000,
    stageId: 'proposal',
    meddicScore: 88,
    country: 'Argentina',
    probability: 75,
    expectedCloseDate: '2026-08-25',
    owner: 'Lucía Gómez'
  },
  {
    id: 'deal-104',
    companyName: 'Minera Cordillera Chile',
    contactName: 'Rodrigo Araya',
    dealValueUsd: 65000,
    dealValueArs: 84500000,
    stageId: 'closing',
    meddicScore: 92,
    country: 'Chile',
    probability: 90,
    expectedCloseDate: '2026-08-20',
    owner: 'Gonzalo Fernández'
  },
  {
    id: 'deal-105',
    companyName: 'Retail Monterrey de México',
    contactName: 'Alejandro Garza',
    dealValueUsd: 95000,
    dealValueArs: 123500000,
    stageId: 'won',
    meddicScore: 96,
    country: 'México',
    probability: 100,
    expectedCloseDate: '2026-08-10',
    owner: 'Lucía Gómez'
  }
];

export function CrmKanbanTab() {
  // Deals State
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('clientum_crm_deals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_DEALS; }
    }
    return INITIAL_DEALS;
  });

  // Custom Views State
  const [customViews, setCustomViews] = useState<CustomView[]>(() => {
    const saved = localStorage.getItem('clientum_crm_custom_views');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'view-high-value',
        name: 'Tratos Grandes (> $30k USD)',
        searchQuery: '',
        owner: 'todos',
        country: 'todos',
        minValue: 30000,
        minScore: 0
      },
      {
        id: 'view-arg',
        name: 'Embudo Argentina',
        searchQuery: '',
        owner: 'todos',
        country: 'Argentina',
        minValue: 0,
        minScore: 0
      },
      {
        id: 'view-high-meddic',
        name: 'Leads Calificados (MEDDIC >= 75)',
        searchQuery: '',
        owner: 'todos',
        country: 'todos',
        minValue: 0,
        minScore: 75
      }
    ];
  });

  // Notes State
  const [crmNotes, setCrmNotes] = useState<CrmNote[]>(() => {
    const saved = localStorage.getItem('clientum_crm_notes_persistent');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'note-1',
        dealId: 'deal-101',
        text: 'Contacto inicial realizado por recomendación. Interesados en optimizar la logística de última milla.',
        createdAt: '2026-08-16T10:30:00Z',
        author: 'Gonzalo Fernández'
      },
      {
        id: 'note-2',
        dealId: 'deal-103',
        text: 'Se conversó sobre el presupuesto para agroquímicos. Tienen interés en expandir a 3 sucursales más.',
        createdAt: '2026-08-18T10:30:00Z',
        author: 'Lucía Gómez'
      },
      {
        id: 'note-3',
        dealId: 'deal-104',
        text: 'Presentaron inquietud sobre el tiempo de entrega en la cordillera chilena. Logística confirmó cobertura.',
        createdAt: '2026-08-17T15:20:00Z',
        author: 'Gonzalo Fernández'
      }
    ];
  });

  // Tasks State
  const [crmTasks, setCrmTasks] = useState<CrmTask[]>(() => {
    const saved = localStorage.getItem('clientum_crm_tasks_persistent');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'task-1',
        dealId: 'deal-101',
        title: 'Enviar brochure comercial corporativo',
        dueDate: '2026-08-25',
        completed: false,
        priority: 'high'
      },
      {
        id: 'task-2',
        dealId: 'deal-103',
        title: 'Llamar para coordinar demo del software',
        dueDate: '2026-08-22',
        completed: false,
        priority: 'medium'
      },
      {
        id: 'task-3',
        dealId: 'deal-104',
        title: 'Enviar borrador del contrato comercial',
        dueDate: '2026-08-20',
        completed: true,
        priority: 'high'
      }
    ];
  });

  // Activities State
  const [crmActivities, setCrmActivities] = useState<CrmActivity[]>(() => {
    const saved = localStorage.getItem('clientum_crm_activities_persistent');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'act-1',
        dealId: 'deal-101',
        type: 'system',
        title: 'Oportunidad comercial registrada',
        text: 'La oportunidad se registró inicialmente en etapa de Lead desde Radar de Prospección.',
        createdAt: '2026-08-15T09:00:00Z'
      },
      {
        id: 'act-2',
        dealId: 'deal-103',
        type: 'email',
        title: 'Correo enviado: Propuesta de Servicios',
        text: 'Se envió la propuesta económica en PDF con los términos del servicio con éxito.',
        createdAt: '2026-08-17T11:45:00Z'
      },
      {
        id: 'act-3',
        dealId: 'deal-104',
        type: 'call',
        title: 'Llamada telefónica realizada (Vía Twilio)',
        text: 'Conversación fluida de 12 minutos con Rodrigo Araya. Discutiendo términos de entrega comercial.',
        createdAt: '2026-08-18T14:10:00Z',
        duration: '12m 45s'
      }
    ];
  });

  // Modals & General UI State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showBulkWAModal, setShowBulkWAModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'ARS'>('USD');
  const [showSaveViewModal, setShowSaveViewModal] = useState(false);

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [pinnedViewIds, setPinnedViewIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('clientum_crm_pinned_views');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['view-high-value']; }
    }
    return ['view-high-value'];
  });
  const [customFields, setCustomFields] = useState<Array<{ id: string; label: string; type: 'text' | 'number' }>>(() => {
    const saved = localStorage.getItem('clientum_crm_custom_fields');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: 'cf-industry', label: 'Sector de Negocio', type: 'text' },
      { id: 'cf-source', label: 'Canal de Origen', type: 'text' }
    ];
  });
  const [dealCustomValues, setDealCustomValues] = useState<Record<string, Record<string, string>>>(() => {
    const saved = localStorage.getItem('clientum_crm_custom_values');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return {}; }
    }
    return {
      'deal-101': { 'cf-industry': 'Logística y Transporte', 'cf-source': 'Búsqueda Activa' },
      'deal-103': { 'cf-industry': 'Agroindustria', 'cf-source': 'Formulario Inbound' }
    };
  });
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<string>('primer-contacto');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [teamCommentInput, setTeamCommentInput] = useState<string>('');
  const [isCustomFieldsModalOpen, setIsCustomFieldsModalOpen] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number'>('text');
  const [customFieldError, setCustomFieldError] = useState('');

  // Active View & Filters State
  const [selectedViewId, setSelectedViewId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOwner, setFilterOwner] = useState('todos');
  const [filterCountry, setFilterCountry] = useState('todos');
  const [filterMinValue, setFilterMinValue] = useState<number>(0);
  const [filterMinScore, setFilterMinScore] = useState<number>(0);
  const [newViewName, setNewViewName] = useState('');

  // Side Panel Detail View State
  const [activeDealModal, setActiveDealModal] = useState<Deal | null>(null);
  const [panelTab, setPanelTab] = useState<'timeline' | 'tasks' | 'notes' | 'details' | 'twilio' | 'emails'>('timeline');

  // Lead / Deal Edit States
  const [editContactName, setEditContactName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editExpectedClose, setEditExpectedClose] = useState('');
  const [editValueUsd, setEditValueUsd] = useState(0);
  const [editCountry, setEditCountry] = useState<'Argentina' | 'Chile' | 'México' | 'Colombia'>('Argentina');
  const [editOwner, setEditOwner] = useState('');
  const [editMeddicScore, setEditMeddicScore] = useState(60);

  // Twilio Direct Call Simulation State
  const [isCalling, setIsCalling] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [callNote, setCallNote] = useState('');

  // Sync edit states when activeDealModal changes
  useEffect(() => {
    if (activeDealModal) {
      setEditContactName(activeDealModal.contactName);
      setEditPhone(
        activeDealModal.id === 'deal-101' ? '+54 9 298 443-1221' :
        activeDealModal.id === 'deal-102' ? '+54 9 261 556-9021' :
        activeDealModal.id === 'deal-103' ? '+54 9 341 454-0012' :
        activeDealModal.id === 'deal-104' ? '+56 9 8812-3341' : '+52 55 9812-4421'
      );
      setEditEmail(
        activeDealModal.id === 'deal-101' ? 'rossi@vmtransportes.com' :
        activeDealModal.id === 'deal-102' ? 'smartinez@bodegacuyo.com' :
        activeDealModal.id === 'deal-103' ? 'mbenitez@agroquispa.com' :
        activeDealModal.id === 'deal-104' ? 'raraya@cordilleracl.com' : 'agarza@retailmonterrey.mx'
      );
      setEditExpectedClose(activeDealModal.expectedCloseDate);
      setEditValueUsd(activeDealModal.dealValueUsd);
      setEditCountry(activeDealModal.country);
      setEditOwner(activeDealModal.owner);
      setEditMeddicScore(activeDealModal.meddicScore);
      setIsCalling(false);
      setCallTimer(0);
      setCallNote('');
    }
  }, [activeDealModal]);

  // Twilio timer effect
  useEffect(() => {
    let interval: any = null;
    if (isCalling) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCalling]);

  useEffect(() => {
    if (!activeDealModal) return;
    const contact = editContactName || activeDealModal.contactName;
    const company = activeDealModal.companyName;
    const owner = editOwner || activeDealModal.owner;
    if (selectedEmailTemplate === 'primer-contacto') {
      setEmailSubject(`Presentación Clientum ERP & CRM - ${company}`);
      setEmailBody(`Hola ${contact},\n\nEspero que estés muy bien. Me pongo en contacto contigo de Clientum ya que nos dedicamos a optimizar los procesos de ventas, facturación y logística en la región. Me encantaría coordinar una breve llamada de 10 minutos para contarte cómo podemos ayudar a ${company} a potenciar sus operaciones.\n\nQuedo a tu disposición.\n\nAtentamente,\n${owner}`);
    } else if (selectedEmailTemplate === 'propuesta') {
      setEmailSubject(`Propuesta Comercial de Servicios - ${company}`);
      setEmailBody(`Hola ${contact},\n\nUn gusto saludarte nuevamente. Adjunto a este correo encontrarás la propuesta comercial personalizada para los requerimientos de ${company} que conversamos anteriormente.\n\nCualquier consulta o ajuste que requieras, por favor no dudes en escribirme.\n\nSaludos cordiales,\n${owner}`);
    } else if (selectedEmailTemplate === 'seguimiento-sla') {
      setEmailSubject(`Seguimiento de Requerimientos - ${company}`);
      setEmailBody(`Hola ${contact},\n\nTe escribo para realizar un breve seguimiento sobre la propuesta de servicios enviada. ¿Tuvieron oportunidad de revisarla? Estaría encantado de agendar una llamada si tienen dudas sobre el alcance o la implementación.\n\nSaludos,\n${owner}`);
    }
  }, [selectedEmailTemplate, activeDealModal, editContactName, editOwner, selectedCurrency]);

  // Handle Prospect import custom events
  useEffect(() => {
    const handleLeadAdded = (e: CustomEvent) => {
      if (e.detail) {
        const d = e.detail;
        const newDeal: Deal = {
          id: d.id || `deal-${Date.now()}`,
          companyName: d.companyName || 'Nueva Empresa',
          contactName: d.contactName || 'Contacto Comercial',
          dealValueUsd: d.dealValueUsd || 25000,
          dealValueArs: (d.dealValueUsd || 25000) * 1300,
          stageId: d.stageId || 'lead',
          meddicScore: d.meddicScore || 80,
          country: d.country || 'Argentina',
          probability: 25,
          expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          owner: 'Gonzalo Fernández'
        };

        setDeals(prev => {
          if (prev.some(item => item.id === newDeal.id || item.companyName === newDeal.companyName)) {
            return prev;
          }
          const next = [newDeal, ...prev];
          localStorage.setItem('clientum_crm_deals', JSON.stringify(next));
          return next;
        });
      }
    };

    window.addEventListener('crm-lead-added' as any, handleLeadAdded);
    return () => window.removeEventListener('crm-lead-added' as any, handleLeadAdded);
  }, []);

  // Save State helpers
  const updateDealsState = (updater: (prev: Deal[]) => Deal[]) => {
    setDeals(prev => {
      const next = updater(prev);
      localStorage.setItem('clientum_crm_deals', JSON.stringify(next));
      return next;
    });
  };

  const saveNotes = (newNotes: CrmNote[]) => {
    setCrmNotes(newNotes);
    localStorage.setItem('clientum_crm_notes_persistent', JSON.stringify(newNotes));
  };

  const saveTasks = (newTasks: CrmTask[]) => {
    setCrmTasks(newTasks);
    localStorage.setItem('clientum_crm_tasks_persistent', JSON.stringify(newTasks));
  };

  const saveActivities = (newActivities: CrmActivity[]) => {
    setCrmActivities(newActivities);
    localStorage.setItem('clientum_crm_activities_persistent', JSON.stringify(newActivities));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStageId: Deal['stageId']) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId) {
      updateDealsState(prev => prev.map(d => {
        if (d.id === dealId) {
          const matchedStage = STAGES.find(s => s.id === targetStageId);
          const defaultProbability = matchedStage ? matchedStage.defaultProb : d.probability;

          // Log automatic system action
          const newAct: CrmActivity = {
            id: `act-${Date.now()}`,
            dealId,
            type: 'system',
            title: 'Etapa modificada por arrastre',
            text: `Se arrastró la oportunidad a la etapa "${matchedStage?.name}". Probabilidad ajustada a ${defaultProbability}%.`,
            createdAt: new Date().toISOString()
          };
          saveActivities([newAct, ...crmActivities]);

          return { ...d, stageId: targetStageId, probability: defaultProbability };
        }
        return d;
      }));
    }
  };

  // View management
  const handleSelectView = (viewId: string) => {
    setSelectedViewId(viewId);
    if (viewId === 'all') {
      setSearchQuery('');
      setFilterOwner('todos');
      setFilterCountry('todos');
      setFilterMinValue(0);
      setFilterMinScore(0);
    } else {
      const view = customViews.find(v => v.id === viewId);
      if (view) {
        setSearchQuery(view.searchQuery);
        setFilterOwner(view.owner);
        setFilterCountry(view.country);
        setFilterMinValue(view.minValue);
        setFilterMinScore(view.minScore || 0);
      }
    }
  };

  const handleSaveCustomView = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newViewName.trim()) return;

    const newView: CustomView = {
      id: `view-${Date.now()}`,
      name: newViewName.trim(),
      searchQuery,
      owner: filterOwner,
      country: filterCountry,
      minValue: filterMinValue,
      minScore: filterMinScore
    };

    const nextViews = [...customViews, newView];
    setCustomViews(nextViews);
    localStorage.setItem('clientum_crm_custom_views', JSON.stringify(nextViews));
    setSelectedViewId(newView.id);
    setNewViewName('');
    setShowSaveViewModal(false);
  };

  const handleDeleteCustomView = (viewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextViews = customViews.filter(v => v.id !== viewId);
    setCustomViews(nextViews);
    localStorage.setItem('clientum_crm_custom_views', JSON.stringify(nextViews));
    if (selectedViewId === viewId) {
      setSelectedViewId('all');
      setSearchQuery('');
      setFilterOwner('todos');
      setFilterCountry('todos');
      setFilterMinValue(0);
      setFilterMinScore(0);
    }
  };

  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomFieldError('');
    if (!newFieldLabel.trim()) return;
    const cleanId = 'cf-' + newFieldLabel.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (customFields.some(f => f.id === cleanId)) {
      setCustomFieldError('Ya existe un campo con este identificador o nombre.');
      return;
    }
    const newField = {
      id: cleanId,
      label: newFieldLabel.trim(),
      type: newFieldType
    };
    const updated = [...customFields, newField];
    setCustomFields(updated);
    localStorage.setItem('clientum_crm_custom_fields', JSON.stringify(updated));
    setNewFieldLabel('');
  };

  const handleDeleteCustomField = (fieldId: string) => {
    const updated = customFields.filter(f => f.id !== fieldId);
    setCustomFields(updated);
    localStorage.setItem('clientum_crm_custom_fields', JSON.stringify(updated));
  };

  // Add Deal Form state
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newDealValueUsd, setNewDealValueUsd] = useState(15000);
  const [newStageId, setNewStageId] = useState<Deal['stageId']>('lead');

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newContactName.trim()) return;

    const newId = `deal-${Date.now()}`;
    const newDeal: Deal = {
      id: newId,
      companyName: newCompanyName.trim(),
      contactName: newContactName.trim(),
      dealValueUsd: Number(newDealValueUsd),
      dealValueArs: Number(newDealValueUsd) * 1300,
      stageId: newStageId,
      meddicScore: 60,
      country: 'Argentina',
      probability: STAGES.find(s => s.id === newStageId)?.defaultProb || 20,
      expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      owner: 'Gonzalo Fernández'
    };

    updateDealsState(prev => [newDeal, ...prev]);

    // Initial log activity
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: newId,
      type: 'system',
      title: 'Oportunidad creada manualmente',
      text: `Creada bajo la etapa de "${STAGES.find(s => s.id === newStageId)?.name}" por Gonzalo Fernández.`,
      createdAt: new Date().toISOString()
    };
    saveActivities([newAct, ...crmActivities]);

    setIsAddModalOpen(false);
    setNewCompanyName('');
    setNewContactName('');
  };

  // Quick Stage Controls
  const moveDealStage = (dealId: string, direction: 'next' | 'prev') => {
    const stageKeys: Deal['stageId'][] = ['lead', 'contacted', 'proposal', 'closing', 'won'];
    updateDealsState(prev => prev.map(d => {
      if (d.id === dealId) {
        const currentIndex = stageKeys.indexOf(d.stageId);
        const nextIndex = direction === 'next' ? Math.min(currentIndex + 1, stageKeys.length - 1) : Math.max(currentIndex - 1, 0);
        const nextStageId = stageKeys[nextIndex];
        const matchedStage = STAGES.find(s => s.id === nextStageId);
        const defaultProbability = matchedStage ? matchedStage.defaultProb : d.probability;

        // Log
        const newAct: CrmActivity = {
          id: `act-${Date.now()}`,
          dealId,
          type: 'system',
          title: 'Etapa actualizada manualmente',
          text: `Se cambió el estado a "${matchedStage?.name}".`,
          createdAt: new Date().toISOString()
        };
        saveActivities([newAct, ...crmActivities]);

        return { ...d, stageId: nextStageId, probability: defaultProbability };
      }
      return d;
    }));
  };

  // Edit details inside Slide-over panel
  const handleSaveContactDetails = () => {
    if (!activeDealModal) return;
    updateDealsState(prev => prev.map(d => {
      if (d.id === activeDealModal.id) {
        const updated: Deal = {
          ...d,
          contactName: editContactName,
          expectedCloseDate: editExpectedClose,
          dealValueUsd: Number(editValueUsd),
          dealValueArs: Number(editValueUsd) * 1300,
          country: editCountry,
          owner: editOwner,
          meddicScore: Number(editMeddicScore),
          probability: STAGES.find(s => s.id === d.stageId)?.defaultProb || d.probability
        };
        // Update active modal in sync
        setActiveDealModal(updated);

        // Save activity
        const newAct: CrmActivity = {
          id: `act-${Date.now()}`,
          dealId: activeDealModal.id,
          type: 'system',
          title: 'Detalles del contacto modificados',
          text: `Se actualizaron datos generales, asignación de propietario a ${editOwner} y score MEDDIC a ${editMeddicScore}.`,
          createdAt: new Date().toISOString()
        };
        saveActivities([newAct, ...crmActivities]);
        localStorage.setItem('clientum_crm_custom_values', JSON.stringify(dealCustomValues));

        return updated;
      }
      return d;
    }));
  };

  // Add Note Handler
  const [noteInput, setNoteInput] = useState('');
  const handleAddNote = () => {
    if (!activeDealModal || !noteInput.trim()) return;
    const newNote: CrmNote = {
      id: `note-${Date.now()}`,
      dealId: activeDealModal.id,
      text: noteInput.trim(),
      createdAt: new Date().toISOString(),
      author: 'Tú (Asesor)'
    };
    saveNotes([newNote, ...crmNotes]);
    setNoteInput('');

    // Register Activity
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: activeDealModal.id,
      type: 'note',
      title: 'Nota interna añadida',
      text: newNote.text,
      createdAt: new Date().toISOString()
    };
    saveActivities([newAct, ...crmActivities]);
  };

  const handleSendSimulatedEmail = () => {
    if (!activeDealModal) return;
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: activeDealModal.id,
      type: 'email',
      title: `Correo enviado: ${emailSubject}`,
      text: emailBody,
      createdAt: new Date().toISOString()
    };
    saveActivities([newAct, ...crmActivities]);
    setPanelTab('timeline');
  };

  const handleAddTeamComment = () => {
    if (!activeDealModal || !teamCommentInput.trim()) return;
    const newNote: CrmNote = {
      id: `note-${Date.now()}`,
      dealId: activeDealModal.id,
      text: teamCommentInput,
      createdAt: new Date().toISOString(),
      author: 'Usuario Sistema (Tú)'
    };
    const nextNotes = [newNote, ...crmNotes];
    setCrmNotes(nextNotes);
    localStorage.setItem('clientum_crm_notes_persistent', JSON.stringify(nextNotes));
    setTeamCommentInput('');
    setPanelTab('notes');
  };

  // Add Task Handler
  const [taskTitleInput, setTaskTitleInput] = useState('');
  const [taskDueDateInput, setTaskDueDateInput] = useState('');
  const [taskPriorityInput, setTaskPriorityInput] = useState<'low' | 'medium' | 'high'>('medium');

  const handleAddTask = () => {
    if (!activeDealModal || !taskTitleInput.trim()) return;
    const newTask: CrmTask = {
      id: `task-${Date.now()}`,
      dealId: activeDealModal.id,
      title: taskTitleInput.trim(),
      dueDate: taskDueDateInput || new Date().toISOString().split('T')[0],
      completed: false,
      priority: taskPriorityInput
    };
    saveTasks([newTask, ...crmTasks]);
    setTaskTitleInput('');
    setTaskDueDateInput('');
    setTaskPriorityInput('medium');

    // Register Activity
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: activeDealModal.id,
      type: 'system',
      title: 'Nueva tarea agendada',
      text: `Tarea programada: "${newTask.title}" con vencimiento el ${newTask.dueDate}.`,
      createdAt: new Date().toISOString()
    };
    saveActivities([newAct, ...crmActivities]);
  };

  const handleToggleTask = (taskId: string) => {
    const updated = crmTasks.map(t => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        // Register Activity
        const newAct: CrmActivity = {
          id: `act-${Date.now()}`,
          dealId: t.dealId,
          type: 'system',
          title: nextCompleted ? 'Tarea marcada como completada' : 'Tarea reabierta',
          text: `La tarea comercial "${t.title}" fue completada.`,
          createdAt: new Date().toISOString()
        };
        saveActivities([newAct, ...crmActivities]);
        return { ...t, completed: nextCompleted };
      }
      return t;
    });
    saveTasks(updated);
  };

  // Direct Call Twilio simulation handlers
  const handleStartCall = () => {
    setIsCalling(true);
  };

  const handleEndCall = () => {
    if (!activeDealModal) return;
    setIsCalling(false);
    const mins = Math.floor(callTimer / 60);
    const secs = callTimer % 60;
    const durationStr = `${mins > 0 ? mins + 'm ' : ''}${secs}s`;

    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: activeDealModal.id,
      type: 'call',
      title: 'Llamada telefónica (Vía Twilio)',
      text: callNote.trim() || 'Llamada directa finalizada. Conversación fluida con el prospecto comercial.',
      createdAt: new Date().toISOString(),
      duration: durationStr
    };
    saveActivities([newAct, ...crmActivities]);
    setCallNote('');
  };

  const handleTriggerWhatsAppMessage = () => {
    if (!activeDealModal) return;
    const cleanPhone = editPhone.replace(/[\s\-\+]/g, '');
    const defaultText = `Hola ${editContactName}, te escribo desde Clientum. Quería consultarte si pudiste revisar la propuesta comercial para ${activeDealModal.companyName}.`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
    window.open(waUrl, '_blank');

    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      dealId: activeDealModal.id,
      type: 'email',
      title: 'Mensaje de WhatsApp enviado',
      text: `Se inició comunicación vía WhatsApp Web al teléfono ${editPhone}.`,
      createdAt: new Date().toISOString()
    };
    saveActivities([newAct, ...crmActivities]);
  };

  // Filter Logic Applied
  const filteredDeals = deals.filter(deal => {
    // Search filter
    const matchesSearch = 
      deal.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Owner filter
    const matchesOwner = filterOwner === 'todos' || deal.owner === filterOwner;
    
    // Country filter
    const matchesCountry = filterCountry === 'todos' || deal.country === filterCountry;
    
    // Min Value filter
    const matchesMinValue = deal.dealValueUsd >= filterMinValue;

    // Min MEDDIC Score filter
    const matchesMinScore = deal.meddicScore >= filterMinScore;

    return matchesSearch && matchesOwner && matchesCountry && matchesMinValue && matchesMinScore;
  });

  const totalPipelineValue = filteredDeals.reduce((acc, d) => acc + (selectedCurrency === 'USD' ? d.dealValueUsd : d.dealValueArs), 0);
  const totalWeightedValue = filteredDeals.reduce((acc, d) => acc + ((selectedCurrency === 'USD' ? d.dealValueUsd : d.dealValueArs) * (d.probability / 100)), 0);

  return (
    <div className="space-y-4">
      {/* Top Header (Frappe Style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Kanban className="w-5 h-5 text-gray-600" /> Tablero CRM Kanban Sales
          </h1>
          <p className="text-gray-500 text-[13px] mt-0.5">
            Oportunidades B2B, seguimiento de etapas de venta, scoring MEDDIC y comunicaciones con Twilio y WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkWAModal(true)}
            className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Envío Masivo WA</span>
          </button>

          <div className="bg-gray-100 p-0.5 rounded-md border border-gray-200 flex items-center text-[12px] font-medium">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${viewMode === 'kanban' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Tablero
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Lista
            </button>
          </div>

          <div className="bg-gray-100 p-0.5 rounded-md border border-gray-200 flex items-center text-[12px] font-medium">
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${selectedCurrency === 'USD' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setSelectedCurrency('ARS')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${selectedCurrency === 'ARS' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              ARS ($)
            </button>
          </div>

          <button
            onClick={() => setIsCustomFieldsModalOpen(true)}
            className="p-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md transition-colors flex items-center justify-center shadow-xs cursor-pointer"
            title="Campos Personalizados"
          >
            <Settings className="w-4.5 h-4.5 text-gray-600" />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Oportunidad</span>
          </button>
        </div>
      </div>

      {/* Dynamic Views & Search Header Panel (Frappe Style) */}
      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-2xs space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Custom Views Toggle Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-thin">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider select-none pr-1">Vistas:</span>
            <button
              onClick={() => handleSelectView('all')}
              className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors shrink-0 ${
                selectedViewId === 'all'
                  ? 'bg-gray-900 text-white font-semibold'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Todos los Leads
            </button>
            
            {customViews.map(view => (
              <div
                key={view.id}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-[12px] font-medium border transition-colors shrink-0 ${
                  selectedViewId === view.id
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => handleSelectView(view.id)}
                  className="hover:text-indigo-950 text-left cursor-pointer"
                >
                  {view.name}
                </button>
                <button
                  onClick={(e) => handleDeleteCustomView(view.id, e)}
                  className="text-gray-400 hover:text-red-600 ml-1 rounded p-0.5 transition-colors cursor-pointer"
                  title="Eliminar vista guardada"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <button
              onClick={() => setShowSaveViewModal(true)}
              className="px-2.5 py-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 border border-dashed border-indigo-300 hover:border-indigo-400 rounded-md bg-indigo-50/40 transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              <PlusCircle className="w-3 h-3" />
              <span>Guardar Filtros</span>
            </button>
          </div>

          <div className="text-[11px] text-gray-500 font-mono self-end">
            Mostrando <span className="font-bold text-gray-900">{filteredDeals.length}</span> de <span className="font-bold text-gray-600">{deals.length}</span> oportunidades
          </div>
        </div>

        {/* Filter Selection Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1 border-t border-gray-100">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por Empresa o Contacto..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (selectedViewId !== 'all') setSelectedViewId('');
              }}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 hover:bg-gray-50/50 border border-gray-300 rounded-md text-[13px] focus:outline-hidden focus:border-gray-400 focus:bg-white transition-colors"
            />
          </div>

          {/* Owner Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase shrink-0">Propietario:</span>
            <select
              value={filterOwner}
              onChange={(e) => {
                setFilterOwner(e.target.value);
                if (selectedViewId !== 'all') setSelectedViewId('');
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1.5 text-[13px] focus:outline-hidden transition-colors"
            >
              <option value="todos">Todos</option>
              <option value="Gonzalo Fernández">Gonzalo Fernández</option>
              <option value="Lucía Gómez">Lucía Gómez</option>
            </select>
          </div>

          {/* Country Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase shrink-0">Región:</span>
            <select
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                if (selectedViewId !== 'all') setSelectedViewId('');
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1.5 text-[13px] focus:outline-hidden transition-colors"
            >
              <option value="todos">Todas</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="México">México</option>
              <option value="Colombia">Colombia</option>
            </select>
          </div>

          {/* Value USD Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase shrink-0">Monto Min (USD):</span>
            <input
              type="number"
              placeholder="Ej: 20000"
              value={filterMinValue === 0 ? '' : filterMinValue}
              onChange={(e) => {
                setFilterMinValue(Number(e.target.value));
                if (selectedViewId !== 'all') setSelectedViewId('');
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1.5 text-[13px] focus:outline-hidden focus:bg-white transition-colors"
            />
          </div>

          {/* Score MEDDIC Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase shrink-0">Min MEDDIC:</span>
            <select
              value={filterMinScore}
              onChange={(e) => {
                setFilterMinScore(Number(e.target.value));
                if (selectedViewId !== 'all') setSelectedViewId('');
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1.5 text-[13px] focus:outline-hidden transition-colors"
            >
              <option value="0">Todos</option>
              <option value="30">MEDDIC &gt;= 30</option>
              <option value="50">MEDDIC &gt;= 50</option>
              <option value="75">MEDDIC &gt;= 75</option>
              <option value="90">MEDDIC &gt;= 90</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pipeline Summary Bar (Frappe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Valor Total Pipeline</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {selectedCurrency === 'USD' ? `$${totalPipelineValue.toLocaleString()} USD` : `$${totalPipelineValue.toLocaleString()} ARS`}
            </span>
            <span className="text-[11px] text-gray-400 block">{filteredDeals.length} oportunidades filtradas</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Pronóstico Ponderado</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {selectedCurrency === 'USD' ? `$${Math.round(totalWeightedValue).toLocaleString()} USD` : `$${Math.round(totalWeightedValue).toLocaleString()} ARS`}
            </span>
            <span className="text-[11px] text-gray-400 block">Ajustado por probabilidad</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Score MEDDIC Promedio</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">
              {Math.round(filteredDeals.reduce((a, b) => a + b.meddicScore, 0) / (filteredDeals.length || 1))} / 100
            </span>
            <span className="text-[11px] text-gray-400 block">Calificación Comercial Promedio</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider block">Ciclo Promedio Cierre</span>
            <span className="text-lg font-semibold text-gray-900 leading-tight mt-0.5 block">24 días</span>
            <span className="text-[11px] text-gray-400 block">B2B LATAM Standard</span>
          </div>
          <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Kanban Board Columns (Frappe Style) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4 select-none">
        {STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter(d => d.stageId === stage.id);
          const stageTotalUsd = stageDeals.reduce((a, b) => a + (selectedCurrency === 'USD' ? b.dealValueUsd : b.dealValueArs), 0);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id as any)}
              className="bg-gray-50 rounded-md p-2.5 border border-gray-200 flex flex-col min-w-[250px] min-h-[500px] space-y-2.5"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${stage.color}`}>
                  {stage.name}
                </span>
                <span className="text-[11px] font-mono font-medium text-gray-500">
                  {stageDeals.length}
                </span>
              </div>

              <div className="text-[11px] text-gray-500 px-1 border-b border-gray-200 pb-2 flex justify-between">
                <span>Subtotal:</span>
                <span className="text-gray-900 font-semibold">
                  {selectedCurrency === 'USD' ? `$${stageTotalUsd.toLocaleString()} USD` : `$${stageTotalUsd.toLocaleString()} ARS`}
                </span>
              </div>

              {/* Deal Cards Container */}
              <div className="space-y-2 flex-1 overflow-y-auto max-h-[460px] pb-2 scrollbar-none">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className="bg-white rounded-md border border-gray-200 shadow-2xs hover:border-gray-300 hover:shadow-xs transition-all flex flex-col overflow-hidden group cursor-grab active:cursor-grabbing"
                  >
                    <div 
                      onClick={() => setActiveDealModal(deal)}
                      className="p-3 space-y-2 cursor-pointer hover:bg-gray-50/80 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold text-[13px] text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">{deal.companyName}</h4>
                        <span className="bg-gray-100 text-gray-700 font-mono text-[9px] font-medium px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                          MEDDIC {deal.meddicScore}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span>{deal.contactName}</span>
                        </p>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.2 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                          {deal.country}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-1">
                        <span className="text-[12px] font-semibold text-gray-900">
                          {selectedCurrency === 'USD' ? `$${deal.dealValueUsd.toLocaleString()} USD` : `$${deal.dealValueArs.toLocaleString()} ARS`}
                        </span>
                        <span className="text-[10px] text-gray-500">{deal.probability}% Prob.</span>
                      </div>
                    </div>

                    {/* Move Stage Quick Controls */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-100 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); moveDealStage(deal.id, 'prev'); }}
                        disabled={stage.id === 'lead'}
                        className="text-[10px] font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 cursor-pointer"
                      >
                        ← Anterior
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveDealStage(deal.id, 'next'); }}
                        disabled={stage.id === 'won'}
                        className="text-[10px] font-medium text-gray-900 hover:text-black disabled:opacity-30 cursor-pointer"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="p-4 text-center text-gray-400 text-[11px] italic border border-dashed border-gray-200 rounded-md">
                    Sin oportunidades
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Panel: Full All-in-One Consolidated Lead Detail (Twenty / Frappe style) */}
      <AnimatePresence>
        {activeDealModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDealModal(null)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200"
            >
              <div className="flex flex-col h-full overflow-hidden">
                
                {/* Header Profile */}
                <div className="p-6 border-b border-gray-200 bg-gray-50/70 relative shrink-0">
                  <button
                    onClick={() => setActiveDealModal(null)}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 rounded-md border border-gray-200 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-900 text-white font-bold text-xl flex items-center justify-center shadow-inner">
                      {activeDealModal.companyName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-900 tracking-tight leading-snug">{activeDealModal.companyName}</h3>
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          Lead ID: {activeDealModal.id}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        {activeDealModal.contactName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mt-5">
                    <div className="flex-1 px-3 py-2 bg-white rounded-md border border-gray-200 shadow-2xs flex flex-col justify-center">
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Monto Estimado</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {selectedCurrency === 'USD' ? `$${activeDealModal.dealValueUsd.toLocaleString()} USD` : `$${activeDealModal.dealValueArs.toLocaleString()} ARS`}
                      </span>
                    </div>

                    <div className="flex-1 px-3 py-2 bg-white rounded-md border border-gray-200 shadow-2xs flex flex-col justify-center">
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Etapa Actual</span>
                      <span className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        {STAGES.find(s => s.id === activeDealModal.stageId)?.name.substring(3)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={handleTriggerWhatsAppMessage}
                        className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md border border-emerald-200 transition-colors cursor-pointer"
                        title="Enviar WhatsApp directo"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPanelTab('twilio')}
                        className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md border border-blue-200 transition-colors cursor-pointer"
                        title="Iniciar llamada Twilio"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-Tabs (Twenty CRM Style) */}
                <div className="flex items-center px-6 border-b border-gray-200 bg-white shrink-0 overflow-x-auto scrollbar-none">
                  {[
                    { id: 'timeline', label: 'Timeline & Actividades', icon: Clock },
                    { id: 'notes', label: 'Notas Internas', icon: FileText },
                    { id: 'tasks', label: 'Tareas / Pendientes', icon: CheckCircle2 },
                    { id: 'details', label: 'Editar Contacto', icon: Edit2 },
                    { id: 'twilio', label: 'Simulador Twilio', icon: PhoneCall },
                    { id: 'emails', label: 'Emails & Plantillas', icon: Mail },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPanelTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                        panelTab === tab.id
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
                  
                  {/* Timeline Tab */}
                  {panelTab === 'timeline' && (
                    <div className="space-y-6">
                      {/* KPI Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                          <div>
                            <span className="text-gray-400 font-medium block text-[10px] uppercase mb-0.5">Score MEDDIC</span>
                            <span className="font-semibold text-gray-900 text-base leading-none">{activeDealModal.meddicScore} / 100</span>
                          </div>
                          <ShieldCheck className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                          <div>
                            <span className="text-gray-400 font-medium block text-[10px] uppercase mb-0.5">Probabilidad</span>
                            <span className="font-semibold text-emerald-600 text-base leading-none">{activeDealModal.probability}%</span>
                          </div>
                          <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                      </div>

                      {/* Log direct-action buttons */}
                      <div className="bg-gray-50/50 p-4 rounded-md border border-gray-200 space-y-3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Registrar Actividad Manual</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const title = "Reunión de seguimiento comercial realizada";
                              const text = "Se conversó sobre los alcances operativos y las fechas de facturación.";
                              const newAct: CrmActivity = {
                                id: `act-${Date.now()}`,
                                dealId: activeDealModal.id,
                                type: 'meeting',
                                title,
                                text,
                                createdAt: new Date().toISOString()
                              };
                              saveActivities([newAct, ...crmActivities]);
                            }}
                            className="flex-1 py-1.5 px-3 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Registrar Reunión</span>
                          </button>
                          <button
                            onClick={() => {
                              const title = "Correo enviado: Seguimiento";
                              const text = "Seguimiento periódico al prospecto consultando novedades sobre el cierre.";
                              const newAct: CrmActivity = {
                                id: `act-${Date.now()}`,
                                dealId: activeDealModal.id,
                                type: 'email',
                                title,
                                text,
                                createdAt: new Date().toISOString()
                              };
                              saveActivities([newAct, ...crmActivities]);
                            }}
                            className="flex-1 py-1.5 px-3 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5 text-amber-500" />
                            <span>Registrar Correo</span>
                          </button>
                        </div>
                      </div>

                      {/* Chronological Activities Stream */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[13px] text-gray-900 border-b border-gray-200 pb-2">Historial de Actividad (Log)</h4>
                        
                        <div className="space-y-4 relative pl-4 border-l border-gray-200 ml-1.5">
                          {crmActivities.filter(a => a.dealId === activeDealModal.id).map(act => (
                            <div key={act.id} className="relative space-y-1">
                              {/* Dot Icon */}
                              <span className="absolute -left-[22.5px] top-1 bg-white p-0.5 rounded-full border border-gray-300">
                                {act.type === 'call' && <PhoneCall className="w-2.5 h-2.5 text-blue-500" />}
                                {act.type === 'email' && <Mail className="w-2.5 h-2.5 text-amber-500" />}
                                {act.type === 'meeting' && <Calendar className="w-2.5 h-2.5 text-emerald-500" />}
                                {act.type === 'note' && <FileText className="w-2.5 h-2.5 text-purple-500" />}
                                {act.type === 'system' && <Briefcase className="w-2.5 h-2.5 text-gray-500" />}
                              </span>

                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900 text-[13px] block">{act.title}</span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {new Date(act.createdAt).toLocaleDateString()} {new Date(act.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>

                              <p className="text-gray-600 text-[12px] leading-relaxed">{act.text}</p>
                              
                              {act.duration && (
                                <span className="inline-block bg-gray-100 text-gray-600 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded mt-0.5">
                                  Duración: {act.duration}
                                </span>
                              )}
                            </div>
                          ))}

                          {crmActivities.filter(a => a.dealId === activeDealModal.id).length === 0 && (
                            <div className="text-gray-400 italic text-[12px]">Sin actividades registradas aún.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes Tab */}
                  {panelTab === 'notes' && (
                    <div className="space-y-4">
                      {/* Add Note Area */}
                      <div className="space-y-2">
                        <label className="block text-[12px] font-medium text-gray-700">Nueva Nota de Negocio</label>
                        <textarea
                          placeholder="Escribe comentarios, detalles de negociaciones, obstáculos o acuerdos comerciales..."
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          rows={3}
                          className="w-full bg-white border border-gray-300 rounded-md p-2.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors resize-none"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={handleAddNote}
                            disabled={!noteInput.trim()}
                            className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-[12px] font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Guardar Nota</span>
                          </button>
                        </div>
                      </div>

                      {/* Chronological Note Cards list */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-semibold text-[13px] text-gray-900 border-b border-gray-200 pb-2">Notas Guardadas</h4>
                        <div className="space-y-3">
                          {crmNotes.filter(n => n.dealId === activeDealModal.id).map(note => (
                            <div key={note.id} className="bg-gray-50 border border-gray-200 p-3.5 rounded-md space-y-1.5">
                              <p className="text-gray-700 text-[12.5px] leading-relaxed whitespace-pre-wrap">{note.text}</p>
                              <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1 font-medium">
                                <span>Por: {note.author}</span>
                                <span className="font-mono">
                                  {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            </div>
                          ))}

                          {crmNotes.filter(n => n.dealId === activeDealModal.id).length === 0 && (
                            <div className="text-center py-6 text-gray-400 text-[12px] italic">No hay notas en esta oportunidad aún.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tasks Tab */}
                  {panelTab === 'tasks' && (
                    <div className="space-y-4">
                      {/* Add Task Area */}
                      <div className="bg-gray-50/50 p-4 rounded-md border border-gray-200 space-y-3">
                        <span className="text-[12px] font-bold text-gray-700 block">Agendar Nueva Tarea Comercial</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-gray-600 mb-1">Título de la Tarea <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              required
                              placeholder="Ej: Enviar cotización final"
                              value={taskTitleInput}
                              onChange={(e) => setTaskTitleInput(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-[12.5px] focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-gray-600 mb-1">Fecha de Vencimiento</label>
                            <input
                              type="date"
                              value={taskDueDateInput}
                              onChange={(e) => setTaskDueDateInput(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-[12.5px] focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Prioridad:</span>
                            <div className="flex gap-1.5">
                              {(['low', 'medium', 'high'] as const).map(p => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setTaskPriorityInput(p)}
                                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold border capitalize transition-colors cursor-pointer ${
                                    taskPriorityInput === p
                                      ? p === 'high' ? 'bg-red-50 border-red-200 text-red-700' : p === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-gray-100 border-gray-300 text-gray-700'
                                      : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                                  }`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={handleAddTask}
                            disabled={!taskTitleInput.trim()}
                            className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-[12px] font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Agendar Tarea</span>
                          </button>
                        </div>
                      </div>

                      {/* Tasks List */}
                      <div className="space-y-2 pt-2">
                        <h4 className="font-semibold text-[13px] text-gray-900 border-b border-gray-200 pb-2">Tareas Pendientes y Completadas</h4>
                        <div className="space-y-2">
                          {crmTasks.filter(t => t.dealId === activeDealModal.id).map(task => (
                            <div key={task.id} className="flex items-center justify-between bg-white border border-gray-200 px-3 py-2.5 rounded-md hover:bg-gray-50/50 transition-colors">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  onClick={() => handleToggleTask(task.id)}
                                  className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                                    task.completed ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-gray-300 hover:border-gray-400'
                                  }`}
                                >
                                  {task.completed && <Check className="w-3 h-3" />}
                                </button>
                                <span className={`text-[12.5px] font-medium text-gray-800 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                  {task.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider font-mono ${
                                  task.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                                  task.priority === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}>
                                  {task.priority}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">Vence: {task.dueDate}</span>
                              </div>
                            </div>
                          ))}

                          {crmTasks.filter(t => t.dealId === activeDealModal.id).length === 0 && (
                            <div className="text-center py-6 text-gray-400 text-[12px] italic">No hay tareas comerciales pendientes.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Details Tab (Contact Info editor) */}
                  {panelTab === 'details' && (
                    <div className="space-y-4">
                      <div className="space-y-3.5 text-[13px]">
                        <h4 className="font-semibold text-[13px] text-gray-900 border-b border-gray-200 pb-2">Editar Datos de Contacto B2B</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Nombre del Contacto <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              value={editContactName}
                              onChange={(e) => setEditContactName(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Teléfono Móvil (WA)</label>
                            <input
                              type="text"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                              type="email"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Cierre Estimado</label>
                            <input
                              type="date"
                              value={editExpectedClose}
                              onChange={(e) => setEditExpectedClose(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Monto Estimado (USD)</label>
                            <input
                              type="number"
                              value={editValueUsd}
                              onChange={(e) => setEditValueUsd(Number(e.target.value))}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-semibold focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Score MEDDIC</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={editMeddicScore}
                              onChange={(e) => setEditMeddicScore(Number(e.target.value))}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Región / Territorio</label>
                            <select
                              value={editCountry}
                              onChange={(e) => setEditCountry(e.target.value as any)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            >
                              <option value="Argentina">Argentina</option>
                              <option value="Chile">Chile</option>
                              <option value="México">México</option>
                              <option value="Colombia">Colombia</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700 mb-1">Asesor Responsable</label>
                            <select
                              value={editOwner}
                              onChange={(e) => setEditOwner(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 focus:outline-hidden focus:border-gray-400 transition-colors"
                            >
                              <option value="Gonzalo Fernández">Gonzalo Fernández</option>
                              <option value="Lucía Gómez">Lucía Gómez</option>
                            </select>
                          </div>
                        </div>

                        {customFields.length > 0 && (
                          <div className="pt-3.5 border-t border-gray-150 space-y-3">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Campos Personalizados</span>
                            <div className="grid grid-cols-2 gap-4">
                              {customFields.map((field) => (
                                <div key={field.id}>
                                  <label className="block font-medium text-gray-700 mb-1">{field.label}</label>
                                  <input
                                    type={field.type === 'number' ? 'number' : 'text'}
                                    value={dealCustomValues[activeDealModal?.id || '']?.[field.id] || ''}
                                    onChange={(e) => {
                                      if (!activeDealModal) return;
                                      setDealCustomValues(prev => ({
                                        ...prev,
                                        [activeDealModal.id]: {
                                          ...(prev[activeDealModal.id] || {}),
                                          [field.id]: e.target.value
                                        }
                                      }));
                                    }}
                                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-950 focus:outline-none focus:border-gray-400 text-xs transition-colors"
                                    placeholder={`Ingresar ${field.label.toLowerCase()}...`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-3 border-t border-gray-100 flex justify-end">
                          <button
                            onClick={handleSaveContactDetails}
                            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-[13px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Save className="w-4 h-4" />
                            <span>Guardar Cambios</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Twilio Dialer Simulation Tab */}
                  {panelTab === 'twilio' && (
                    <div className="space-y-4">
                      <div className="bg-slate-900 text-white rounded-lg p-5 border border-slate-800 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              {isCalling ? (
                                <>
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </>
                              ) : (
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-600"></span>
                              )}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Canal Twilio Direct Dial</span>
                          </div>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">ID: TW-TR-8001</span>
                        </div>

                        <div className="text-center py-4 space-y-2">
                          <p className="text-slate-400 text-xs">Marcando a teléfono móvil corporativo</p>
                          <h4 className="font-mono text-2xl font-bold tracking-widest text-white">{editPhone}</h4>
                          <p className="text-slate-200 text-base font-semibold">{editContactName}</p>
                          <p className="text-slate-400 text-xs">{activeDealModal.companyName}</p>

                          {isCalling && (
                            <div className="pt-3 text-lg font-mono font-black text-red-500 tracking-wider">
                              {Math.floor(callTimer / 60).toString().padStart(2, '0')}:{(callTimer % 60).toString().padStart(2, '0')}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center gap-4 py-1">
                          {!isCalling ? (
                            <button
                              onClick={handleStartCall}
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-xs shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer border-0"
                            >
                              <Phone className="w-4 h-4 text-emerald-200" />
                              <span>Iniciar Llamada</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleEndCall}
                              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full text-xs shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer border-0"
                            >
                              <PhoneCall className="w-4 h-4 text-red-200 animate-pulse" />
                              <span>Finalizar Llamada</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Call Logging options */}
                      <div className="space-y-2">
                        <label className="block text-[12px] font-semibold text-gray-700">Comentarios o Minuta de la Llamada</label>
                        <textarea
                          placeholder="Registra lo conversado, acuerdos, objeciones planteadas por el cliente o fecha de re-llamado..."
                          value={callNote}
                          onChange={(e) => setCallNote(e.target.value)}
                          rows={3}
                          disabled={isCalling}
                          className="w-full bg-white border border-gray-300 rounded-md p-2.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors resize-none disabled:bg-gray-50 disabled:text-gray-400"
                        />
                        {isCalling && (
                          <span className="text-[11px] text-red-600 font-medium block animate-pulse">
                            * Escribe los comentarios durante la llamada activa; se guardarán automáticamente al colgar.
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {panelTab === 'emails' && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Simulador de Correo Electrónico</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-700 px-2.5 py-0.5 rounded font-mono font-semibold">SMTP: Conectado</span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-6 items-center gap-2 text-xs">
                            <span className="col-span-1 font-semibold text-gray-400">De:</span>
                            <span className="col-span-5 text-gray-700 font-medium bg-white px-2.5 py-1.5 rounded border border-gray-200">{editOwner} &lt;{editOwner.toLowerCase().replace(/\s/g, '')}@clientum.com&gt;</span>
                          </div>
                          <div className="grid grid-cols-6 items-center gap-2 text-xs">
                            <span className="col-span-1 font-semibold text-gray-400">Para:</span>
                            <span className="col-span-5 text-gray-700 font-medium bg-white px-2.5 py-1.5 rounded border border-gray-200">{editContactName} &lt;{editEmail}&gt;</span>
                          </div>

                          <div className="grid grid-cols-6 items-center gap-2 text-xs">
                            <span className="col-span-1 font-semibold text-gray-400">Plantilla:</span>
                            <select
                              value={selectedEmailTemplate}
                              onChange={(e) => setSelectedEmailTemplate(e.target.value)}
                              className="col-span-5 bg-white border border-gray-300 rounded-md px-2 py-1.5 text-gray-700 text-xs focus:outline-none"
                            >
                              <option value="primer-contacto">Primer Contacto B2B / Presentación</option>
                              <option value="propuesta">Propuesta Comercial de Servicios</option>
                              <option value="seguimiento-sla">Seguimiento Periódico / SLA Alert</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-500">Asunto del Correo</label>
                            <input
                              type="text"
                              value={emailSubject}
                              onChange={(e) => setEmailSubject(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-gray-400"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-500">Cuerpo del Mensaje</label>
                            <textarea
                              rows={8}
                              value={emailBody}
                              onChange={(e) => setEmailBody(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-md p-3 text-xs text-gray-800 focus:outline-none focus:border-gray-400 font-sans whitespace-pre-wrap leading-relaxed"
                            />
                          </div>

                          <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-200">
                            <button
                              onClick={handleSendSimulatedEmail}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border-none animate-none"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Enviar Email Comercial</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60 space-y-3">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Colaboración Interna (Tag & Comment)</span>
                        <div className="space-y-2">
                          <textarea
                            placeholder="Escribe un comentario interno etiquetando al equipo, ej: '@Gonzalo revisa el SLA de esta cuenta para acelerar la firma.'"
                            value={teamCommentInput}
                            onChange={(e) => setTeamCommentInput(e.target.value)}
                            rows={2}
                            className="w-full bg-white border border-gray-200 rounded-md p-2.5 text-gray-800 text-xs focus:outline-none focus:border-amber-300 resize-none"
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setTeamCommentInput(prev => prev + ' @Gonzalo Fernández')}
                                className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 rounded text-[10px] font-medium transition-colors"
                              >
                                @Gonzalo
                              </button>
                              <button
                                onClick={() => setTeamCommentInput(prev => prev + ' @Lucía Gómez')}
                                className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 rounded text-[10px] font-medium transition-colors"
                              >
                                @Lucía
                              </button>
                            </div>
                            <button
                              onClick={handleAddTeamComment}
                              disabled={!teamCommentInput.trim()}
                              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-medium rounded text-[11px] transition-colors flex items-center gap-1 cursor-pointer border-none"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Dejar Comentario</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Save Custom View Modal (Frappe Style) */}
      {showSaveViewModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-lg max-w-sm w-full shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="font-semibold text-[14px] text-gray-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-gray-600" /> Guardar Filtros de Vista
              </h3>
              <button 
                onClick={() => setShowSaveViewModal(false)} 
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomView} className="p-4 space-y-3">
              <p className="text-gray-500 text-[12px]">
                Se guardará tu configuración de filtros actual para que puedas acceder a ella de forma directa más adelante.
              </p>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-[12px]">Nombre de la Vista <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Tratos Alta Prioridad AR"
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="pt-2.5 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSaveViewModal(false)}
                  className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-700 text-[12px] font-medium rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newViewName.trim()}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-[12px] font-semibold rounded-md shadow-xs cursor-pointer transition-colors"
                >
                  Guardar Vista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Deal Modal (Frappe Style) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h3 className="font-semibold text-[15px] text-gray-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-gray-700" /> Nueva Oportunidad Comercial
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDeal} className="p-5 space-y-3.5 text-[13px]">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Empresa <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="Ej: Agroservicios Pampeanos S.A."
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contacto Principal <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="Ej: Lic. Marcelo Rossi"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Monto Estimado (USD)</label>
                <input
                  type="number"
                  required
                  value={newDealValueUsd}
                  onChange={(e) => setNewDealValueUsd(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-semibold text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Etapa Inicial</label>
                <select
                  value={newStageId}
                  onChange={(e) => setNewStageId(e.target.value as any)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 text-[13px] focus:outline-hidden focus:border-gray-400 transition-colors"
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-50 shadow-xs cursor-pointer transition-colors"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-md shadow-xs cursor-pointer transition-colors"
                >
                  Guardar Oportunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk WhatsApp Modal */}
      <BulkWhatsAppModal
        isOpen={showBulkWAModal}
        onClose={() => setShowBulkWAModal(false)}
        initialContacts={deals.map(d => ({
          id: d.id,
          name: d.contactName,
          company: d.companyName,
          phone: d.id === 'deal-101' ? '+54 9 298 443-1221' : '+54 9 298 443-8899',
          city: d.country === 'Argentina' ? 'Neuquén / Gral. Roca' : d.country,
          country: d.country,
          leadScore: d.meddicScore,
          status: d.stageId === 'won' ? 'Cliente' : d.stageId === 'proposal' ? 'Oportunidad' : 'Lead Calificado',
          personaTag: 'CRO / Ventas',
          whatsappVerified: true
        }))}
      />

      {isCustomFieldsModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h3 className="font-semibold text-[15px] text-gray-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-700" /> Configurar Campos Personalizados
              </h3>
              <button 
                onClick={() => {
                  setIsCustomFieldsModalOpen(false);
                  setCustomFieldError('');
                }} 
                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Campos Activos</h4>
                {customFields.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No hay campos personalizados activos.</p>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {customFields.map(field => (
                      <div key={field.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-150">
                        <div className="text-xs">
                          <span className="font-semibold text-gray-800">{field.label}</span>
                          <span className="ml-1 text-[10px] text-gray-400 font-mono">({field.type === 'number' ? 'Número' : 'Texto'})</span>
                        </div>
                        <button
                          onClick={() => handleDeleteCustomField(field.id)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleAddCustomField} className="border-t border-gray-150 pt-4 space-y-3">
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Agregar Nuevo Campo</h4>
                
                {customFieldError && (
                  <div className="p-2.5 bg-red-50 border border-red-100 text-red-700 rounded-md text-xs font-medium flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{customFieldError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre del Campo</label>
                  <input
                    type="text"
                    required
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="Ej: Sector de Negocio, CUIT, SLA"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-950 text-xs focus:outline-hidden focus:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Tipo de Dato</label>
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as 'text' | 'number')}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-950 text-xs focus:outline-hidden focus:border-gray-400 transition-colors"
                  >
                    <option value="text">Texto</option>
                    <option value="number">Número</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    Agregar Campo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
