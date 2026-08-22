import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Activity,
  ActiveTab,
  Company,
  FilterState,
  Language,
  Opportunity,
  OpportunityViewMode,
  Person,
  StageId,
  Task,
  ThemeMode,
  User,
} from '../types';
import { getTranslation, TranslationKey } from '../i18n/translations';
import {
  INITIAL_ACTIVITIES,
  INITIAL_COMPANIES,
  INITIAL_OPPORTUNITIES,
  INITIAL_PEOPLE,
  INITIAL_TASKS,
  STAGES,
  USERS,
} from '../data/initialData';
import {
  CLIENTUM_COMPANIES,
  CLIENTUM_PEOPLE,
  CLIENTUM_OPPORTUNITIES,
  CLIENTUM_TASKS,
  CLIENTUM_ACTIVITIES,
} from '../data/clientumLeads';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CRMContextType {
  opportunities: Opportunity[];
  companies: Company[];
  people: Person[];
  tasks: Task[];
  activities: Activity[];
  users: User[];
  currentUser: User;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: OpportunityViewMode;
  setViewMode: (mode: OpportunityViewMode) => void;
  selectedRecord: { type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null;
  setSelectedRecord: (record: { type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Theme & Language
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;

  // Modals & Palettes
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isNewRecordModalOpen: boolean;
  setIsNewRecordModalOpen: (open: boolean) => void;
  newRecordType: 'opportunity' | 'company' | 'person' | 'task';
  setNewRecordType: (type: 'opportunity' | 'company' | 'person' | 'task') => void;
  openNewRecordModal: (type?: 'opportunity' | 'company' | 'person' | 'task') => void;
  isAICopilotModalOpen: boolean;
  setIsAICopilotModalOpen: (open: boolean) => void;
  aiCopilotContext: { type?: string; id?: string; name?: string; initialPrompt?: string } | null;
  openAICopilot: (context?: { type?: string; id?: string; name?: string; initialPrompt?: string }) => void;
  
  // CRUD
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => Opportunity;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  moveOpportunityStage: (id: string, newStage: StageId) => void;

  addCompany: (comp: Omit<Company, 'id' | 'createdAt'>) => Company;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;

  addPerson: (person: Omit<Person, 'id' | 'createdAt' | 'lastActivityDate'>) => Person;
  updatePerson: (id: string, updates: Partial<Person>) => void;
  deletePerson: (id: string) => void;

  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;

  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => Activity;
  deleteActivity: (id: string) => void;

  // Data helpers
  resetToDemoData: () => void;
  loadClientumLeads: () => void;
  exportOpportunitiesCSV: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_KEYS = {
  OPPORTUNITIES: 'twenty_crm_opportunities',
  COMPANIES: 'twenty_crm_companies',
  PEOPLE: 'twenty_crm_people',
  TASKS: 'twenty_crm_tasks',
  ACTIVITIES: 'twenty_crm_activities',
  THEME: 'twenty_crm_theme',
  LANGUAGE: 'twenty_crm_language',
};

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'light' || saved === 'dark' ? (saved as ThemeMode) : 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return saved === 'es' || saved === 'pt' || saved === 'en' ? (saved as Language) : 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
    const langNames: Record<Language, string> = {
      en: 'English (US)',
      es: 'Español (América Latina / España)',
      pt: 'Português (Brasil / Portugal)',
    };
    const toastMsgs: Record<Language, string> = {
      en: `Language set to ${langNames[newLang]}`,
      es: `Idioma cambiado a ${langNames[newLang]}`,
      pt: `Idioma alterado para ${langNames[newLang]}`,
    };
    showToast(toastMsgs[newLang], 'info');
  };

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(
      next === 'light' ? 'Switched to High-Contrast Light mode' : 'Switched to Default Dark mode',
      'info'
    );
  };

  // Sync theme to root element classes and attributes for CSS styling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [people, setPeople] = useState<Person[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PEOPLE);
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [users] = useState<User[]>(USERS);
  const [currentUser] = useState<User>(USERS[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('opportunities');
  const [viewMode, setViewMode] = useState<OpportunityViewMode>('kanban');
  const [selectedRecord, setSelectedRecord] = useState<{ type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null>(null);

  const initialFilter: FilterState = {
    search: '',
    stage: 'all',
    owner: 'all',
    priority: 'all',
    tier: 'all',
  };
  const [filterState, setFilterState] = useState<FilterState>(initialFilter);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [newRecordType, setNewRecordType] = useState<'opportunity' | 'company' | 'person' | 'task'>('opportunity');
  const [isAICopilotModalOpen, setIsAICopilotModalOpen] = useState(false);
  const [aiCopilotContext, setAICopilotContext] = useState<{ type?: string; id?: string; name?: string; initialPrompt?: string } | null>(null);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // 'c' to create new record when not typing in input
      if (
        e.key === 'c' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !isCommandPaletteOpen &&
        !isNewRecordModalOpen &&
        !isAICopilotModalOpen
      ) {
        e.preventDefault();
        openNewRecordModal();
      }
      // Escape closes open modals
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsNewRecordModalOpen(false);
        setIsAICopilotModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, isNewRecordModalOpen, isAICopilotModalOpen]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'],
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const resetFilters = () => {
    setFilterState(initialFilter);
  };

  const openNewRecordModal = (type: 'opportunity' | 'company' | 'person' | 'task' = 'opportunity') => {
    setNewRecordType(type);
    setIsNewRecordModalOpen(true);
  };

  const openAICopilot = (context?: { type?: string; id?: string; name?: string; initialPrompt?: string }) => {
    setAICopilotContext(context || null);
    setIsAICopilotModalOpen(true);
  };

  // --- CRUD OPPORTUNITY ---
  const addOpportunity = (data: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>): Opportunity => {
    const stageConf = STAGES.find((s) => s.id === data.stage);
    const newOpp: Opportunity = {
      ...data,
      id: 'opp-' + Date.now(),
      probability: data.probability ?? stageConf?.probability ?? 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOpportunities((prev) => [newOpp, ...prev]);

    // Add activity
    addActivity({
      type: 'stage_change',
      title: 'Created Opportunity',
      content: `${currentUser.name} created opportunity "${newOpp.name}" ($${newOpp.amount.toLocaleString()})`,
      author: currentUser.name,
      targetType: 'opportunity',
      targetId: newOpp.id,
      meta: { toStage: newOpp.stage },
    });

    showToast(`Opportunity "${newOpp.name}" created`, 'success');
    return newOpp;
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const updated = { ...opp, ...updates, updatedAt: new Date().toISOString() };
          return updated;
        }
        return opp;
      })
    );
    showToast('Opportunity updated', 'info');
  };

  const deleteOpportunity = (id: string) => {
    const opp = opportunities.find((o) => o.id === id);
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
    showToast(`Opportunity "${opp?.name || id}" removed`, 'info');
  };

  const moveOpportunityStage = (id: string, newStage: StageId) => {
    const opp = opportunities.find((o) => o.id === id);
    if (!opp || opp.stage === newStage) return;

    const oldStage = opp.stage;
    const stageConf = STAGES.find((s) => s.id === newStage);

    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          return {
            ...o,
            stage: newStage,
            probability: stageConf?.probability ?? o.probability,
            updatedAt: new Date().toISOString(),
          };
        }
        return o;
      })
    );

    // Record activity
    addActivity({
      type: 'stage_change',
      title: `Moved to ${stageConf?.name || newStage}`,
      content: `${currentUser.name} moved deal from ${oldStage} to ${newStage}`,
      author: currentUser.name,
      targetType: 'opportunity',
      targetId: id,
      meta: { fromStage: oldStage, toStage: newStage },
    });

    if (newStage === 'won') {
      triggerConfetti();
      showToast(`🎉 Deal Won! $${opp.amount.toLocaleString()} - ${opp.name}`, 'success');
    } else {
      showToast(`Deal moved to ${stageConf?.name}`, 'info');
    }
  };

  // --- CRUD COMPANY ---
  const addCompany = (data: Omit<Company, 'id' | 'createdAt'>): Company => {
    const newComp: Company = {
      ...data,
      id: 'c-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setCompanies((prev) => [newComp, ...prev]);
    showToast(`Company "${newComp.name}" added`, 'success');
    return newComp;
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Company updated', 'info');
  };

  const deleteCompany = (id: string) => {
    const comp = companies.find((c) => c.id === id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
    showToast(`Company "${comp?.name || id}" removed`, 'info');
  };

  // --- CRUD PERSON ---
  const addPerson = (data: Omit<Person, 'id' | 'createdAt' | 'lastActivityDate'>): Person => {
    const newPerson: Person = {
      ...data,
      id: 'p-' + Date.now(),
      createdAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    };
    setPeople((prev) => [newPerson, ...prev]);
    showToast(`Contact "${newPerson.firstName} ${newPerson.lastName}" created`, 'success');
    return newPerson;
  };

  const updatePerson = (id: string, updates: Partial<Person>) => {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Contact updated', 'info');
  };

  const deletePerson = (id: string) => {
    const person = people.find((p) => p.id === id);
    setPeople((prev) => prev.filter((p) => p.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
    showToast(`Contact "${person?.firstName} ${person?.lastName}" removed`, 'info');
  };

  // --- CRUD TASK ---
  const addTask = (data: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...data,
      id: 't-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task created: "${newTask.title}"`, 'success');
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Task updated', 'info');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
    showToast('Task deleted', 'info');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'Completed';
          const newStatus = isDone ? 'Todo' : 'Completed';
          return {
            ...t,
            status: newStatus,
            completedAt: isDone ? undefined : new Date().toISOString(),
          };
        }
        return t;
      })
    );
  };

  // --- CRUD ACTIVITY ---
  const addActivity = (data: Omit<Activity, 'id' | 'createdAt'>): Activity => {
    const newAct: Activity = {
      ...data,
      id: 'act-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setActivities((prev) => [newAct, ...prev]);
    return newAct;
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // Reset to initial demo
  const resetToDemoData = () => {
    setOpportunities(INITIAL_OPPORTUNITIES);
    setCompanies(INITIAL_COMPANIES);
    setPeople(INITIAL_PEOPLE);
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.clear();
    showToast('CRM workspace reset to demo data', 'success');
  };

  // Load Clientum leads list from B2B CSV dataset
  const loadClientumLeads = () => {
    setOpportunities(CLIENTUM_OPPORTUNITIES);
    setCompanies(CLIENTUM_COMPANIES);
    setPeople(CLIENTUM_PEOPLE);
    setTasks(CLIENTUM_TASKS);
    setActivities(CLIENTUM_ACTIVITIES);
    
    // Save to local storage for persistence
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(CLIENTUM_OPPORTUNITIES));
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(CLIENTUM_COMPANIES));
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(CLIENTUM_PEOPLE));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(CLIENTUM_TASKS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(CLIENTUM_ACTIVITIES));
    
    triggerConfetti();
    showToast('¡Base de Datos de Leads de Clientum cargada con éxito! 🇦🇷', 'success');
  };

  // Export CSV
  const exportOpportunitiesCSV = () => {
    const headers = ['ID', 'Deal Name', 'Amount', 'Currency', 'Stage', 'Close Date', 'Probability', 'Company', 'Contact', 'Owner', 'Priority', 'Type'];
    const rows = opportunities.map((o) => [
      o.id,
      `"${o.name.replace(/"/g, '""')}"`,
      o.amount,
      o.currency,
      o.stage,
      o.closeDate,
      o.probability + '%',
      `"${(o.companyName || '').replace(/"/g, '""')}"`,
      `"${(o.contactName || '').replace(/"/g, '""')}"`,
      `"${o.assignedTo}"`,
      o.priority,
      o.type,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `twenty_crm_deals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported opportunities as CSV', 'success');
  };

  return (
    <CRMContext.Provider
      value={{
        opportunities,
        companies,
        people,
        tasks,
        activities,
        users,
        currentUser,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        selectedRecord,
        setSelectedRecord,
        filterState,
        setFilterState,
        resetFilters,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        t,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isNewRecordModalOpen,
        setIsNewRecordModalOpen,
        newRecordType,
        setNewRecordType,
        openNewRecordModal,
        isAICopilotModalOpen,
        setIsAICopilotModalOpen,
        aiCopilotContext,
        openAICopilot,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        moveOpportunityStage,
        addCompany,
        updateCompany,
        deleteCompany,
        addPerson,
        updatePerson,
        deletePerson,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addActivity,
        deleteActivity,
        resetToDemoData,
        loadClientumLeads,
        exportOpportunitiesCSV,
        toasts,
        showToast,
        removeToast,
        triggerConfetti,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
