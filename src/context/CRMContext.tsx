import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Activity,
  ActiveTab,
  Company,
  CustomObjectDefinition,
  CustomObjectField,
  FilterState,
  Language,
  Opportunity,
  OpportunityViewMode,
  Person,
  SavedView,
  StageId,
  Task,
  ThemeMode,
  User,
  WorkflowRule,
  Invoice,
  InvoiceStatus,
  InventoryItem,
  ExpenseItem,
} from '../types';
import { getTranslation, TranslationKey } from '../i18n/translations';
import {
  INITIAL_ACTIVITIES,
  INITIAL_COMPANIES,
  INITIAL_CUSTOM_OBJECTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_PEOPLE,
  INITIAL_SAVED_VIEWS,
  INITIAL_TASKS,
  INITIAL_WORKFLOWS,
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
import {
  INITIAL_INVOICES,
  INITIAL_INVENTORY,
  INITIAL_EXPENSES,
} from '../data/erpInitialData';

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

  // Modals & Palettes & Mobile Nav
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
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
  
  // Auth & Profile
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  login: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string, company: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  
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

  // ClientumCRM Custom Objects & Metadata Studio
  customObjects: CustomObjectDefinition[];
  addCustomObject: (obj: Omit<CustomObjectDefinition, 'id' | 'createdAt' | 'fields' | 'records'>) => CustomObjectDefinition;
  addCustomFieldToObject: (objectId: string, field: Omit<CustomObjectField, 'id'>) => void;
  addRecordToCustomObject: (objectId: string, record: Record<string, any>) => void;
  deleteRecordFromCustomObject: (objectId: string, recordId: string) => void;

  // Clientum Workflows Engine
  workflows: WorkflowRule[];
  addWorkflow: (wf: Omit<WorkflowRule, 'id' | 'runCount'>) => WorkflowRule;
  toggleWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;

  // Saved Views
  savedViews: SavedView[];
  addSavedView: (view: Omit<SavedView, 'id'>) => SavedView;
  deleteSavedView: (id: string) => void;

  // CSV Data Import Engine
  importCSVData: (target: 'opportunities' | 'companies' | 'people', items: any[]) => number;

  // ERP Suite
  invoices: Invoice[];
  inventory: InventoryItem[];
  expenses: ExpenseItem[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'createdAt'>) => Invoice;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  deleteInvoice: (id: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => InventoryItem;
  updateInventoryStock: (id: string, deltaQuantity: number) => void;
  deleteInventoryItem: (id: string) => void;
  addExpense: (exp: Omit<ExpenseItem, 'id'>) => ExpenseItem;
  deleteExpense: (id: string) => void;
  exportFullWorkspaceJSON: () => void;

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
  OPPORTUNITIES: 'clientum_crm_opportunities',
  COMPANIES: 'clientum_crm_companies',
  PEOPLE: 'clientum_crm_people',
  TASKS: 'clientum_crm_tasks',
  ACTIVITIES: 'clientum_crm_activities',
  THEME: 'clientum_crm_theme',
  LANGUAGE: 'clientum_crm_language',
  INVOICES: 'clientum_crm_invoices',
  INVENTORY: 'clientum_crm_inventory',
  EXPENSES: 'clientum_crm_expenses',
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
      next === 'light' ? 'Switched to Clientum Clarity mode' : 'Switched to Clientum Obsidian mode',
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

  // ERP State
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  // Custom Objects, Workflows, Saved Views State
  const [customObjects, setCustomObjects] = useState<CustomObjectDefinition[]>(() => {
    const saved = localStorage.getItem('clientum_crm_custom_objects');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_OBJECTS;
  });

  const [workflows, setWorkflows] = useState<WorkflowRule[]>(() => {
    const saved = localStorage.getItem('clientum_crm_workflows');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
  });

  const [savedViews, setSavedViews] = useState<SavedView[]>(() => {
    const saved = localStorage.getItem('clientum_crm_saved_views');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_VIEWS;
  });

  const [users] = useState<User[]>(USERS);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('clientum_crm_current_user');
      return saved ? JSON.parse(saved) : USERS[0];
    } catch (e) {
      return USERS[0];
    }
  });
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

  // Modals & Palettes & Mobile Nav
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [newRecordType, setNewRecordType] = useState<'opportunity' | 'company' | 'person' | 'task'>('opportunity');
  const [isAICopilotModalOpen, setIsAICopilotModalOpen] = useState(false);
  const [aiCopilotContext, setAICopilotContext] = useState<{ type?: string; id?: string; name?: string; initialPrompt?: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('clientum_is_authenticated') === 'true' || 
             localStorage.getItem('clientum_is_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (email: string, _pass?: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const userToSet = found || {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
      email,
      role: 'Commercial Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    };
    setCurrentUser(userToSet);
    
    try {
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(userToSet));
      sessionStorage.setItem('clientum_is_authenticated', 'true');
      localStorage.setItem('clientum_is_authenticated', 'true');
    } catch (error) {
      console.warn('Storage access denied', error);
    }

    setIsAuthenticated(true);
    setActiveTab('opportunities');
    setIsAuthModalOpen(false);
  };

  const register = (name: string, email: string, _pass?: string, _company?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'Workspace Admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    };
    setCurrentUser(newUser);

    try {
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(newUser));
      sessionStorage.setItem('clientum_is_authenticated', 'true');
      localStorage.setItem('clientum_is_authenticated', 'true');
    } catch (error) {
      console.warn('Storage access denied', error);
    }

    setIsAuthenticated(true);
    setActiveTab('opportunities');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('clientum_is_authenticated');
      localStorage.removeItem('clientum_is_authenticated');
    } catch (error) {
      console.warn('Storage access denied', error);
    }
    setIsAuthModalOpen(false);
  };

  const resetPassword = (email: string) => {
    // Record password recovery simulation in logs
    console.log(`Password reset link dispatched for ClientumCRM account: ${email}`);
  };
  
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

  useEffect(() => {
    localStorage.setItem('clientum_crm_custom_objects', JSON.stringify(customObjects));
  }, [customObjects]);

  useEffect(() => {
    localStorage.setItem('clientum_crm_workflows', JSON.stringify(workflows));
  }, [workflows]);

  useEffect(() => {
    localStorage.setItem('clientum_crm_saved_views', JSON.stringify(savedViews));
  }, [savedViews]);

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
    } as Opportunity;
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
    } as Company;
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
    } as Person;
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
    } as Task;
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
    } as Activity;
    setActivities((prev) => [newAct, ...prev]);
    return newAct;
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // --- CLIENTUM CUSTOM OBJECTS STUDIO ---
  const addCustomObject = (data: Omit<CustomObjectDefinition, 'id' | 'createdAt' | 'fields' | 'records'>): CustomObjectDefinition => {
    const newObj: CustomObjectDefinition = {
      ...data,
      id: 'obj-' + Date.now(),
      createdAt: new Date().toISOString(),
      fields: [
        { id: 'f-name', name: 'name', label: `${data.singularName} Name`, type: 'text', required: true }
      ],
      records: [],
    } as CustomObjectDefinition;
    setCustomObjects((prev) => [...prev, newObj]);
    showToast(`Custom Object "${newObj.pluralName}" created`, 'success');
    return newObj;
  };

  const addCustomFieldToObject = (objectId: string, fieldData: Omit<CustomObjectField, 'id'>) => {
    const newField: CustomObjectField = {
      ...fieldData,
      id: 'f-' + Date.now(),
    };
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, fields: [...obj.fields, newField] };
        }
        return obj;
      })
    );
    showToast(`Added field "${newField.label}" to object schema`, 'info');
  };

  const addRecordToCustomObject = (objectId: string, recordData: Record<string, any>) => {
    const newRecord = {
      id: 'rec-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...recordData,
    };
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, records: [newRecord, ...obj.records] };
        }
        return obj;
      })
    );
    showToast('Record added to Custom Object', 'success');
  };

  const deleteRecordFromCustomObject = (objectId: string, recordId: string) => {
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, records: obj.records.filter((r) => r.id !== recordId) };
        }
        return obj;
      })
    );
    showToast('Record removed', 'info');
  };

  // --- CLIENTUM WORKFLOWS ENGINE ---
  const addWorkflow = (data: Omit<WorkflowRule, 'id' | 'runCount'>): WorkflowRule => {
    const newWf: WorkflowRule = {
      ...data,
      id: 'wf-' + Date.now(),
      runCount: 0,
    };
    setWorkflows((prev) => [newWf, ...prev]);
    showToast(`Workflow "${newWf.name}" active`, 'success');
    return newWf;
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, isActive: !wf.isActive } : wf))
    );
    showToast('Workflow status toggled', 'info');
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((wf) => wf.id !== id));
    showToast('Workflow deleted', 'info');
  };

  // --- SAVED VIEWS ---
  const addSavedView = (data: Omit<SavedView, 'id'>): SavedView => {
    const newView: SavedView = {
      ...data,
      id: 'sv-' + Date.now(),
    } as SavedView;
    setSavedViews((prev) => [...prev, newView]);
    showToast(`Saved view "${newView.name}" created`, 'success');
    return newView;
  };

  const deleteSavedView = (id: string) => {
    setSavedViews((prev) => prev.filter((v) => v.id !== id));
    showToast('Saved view removed', 'info');
  };

  // --- CSV IMPORT ENGINE ---
  const importCSVData = (target: 'opportunities' | 'companies' | 'people', items: any[]): number => {
    let count = 0;
    if (target === 'opportunities') {
      const newDeals: Opportunity[] = items.map((item, idx) => ({
        id: 'opp-import-' + Date.now() + '-' + idx,
        name: item.name || item.dealName || 'Imported Deal',
        amount: Number(item.amount || item.value) || 10000,
        currency: item.currency || 'USD',
        stage: item.stage || 'lead',
        closeDate: item.closeDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        probability: Number(item.probability) || 50,
        companyName: item.companyName || item.company,
        contactName: item.contactName || item.contact,
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        priority: item.priority || 'Medium',
        type: item.type || 'New Business',
        tags: item.tags ? String(item.tags).split(';') : ['CSV Import'],
      }));
      setOpportunities((prev) => [...newDeals, ...prev]);
      count = newDeals.length;
    } else if (target === 'companies') {
      const newComps: Company[] = items.map((item, idx) => ({
        id: 'c-import-' + Date.now() + '-' + idx,
        name: item.name || item.companyName || 'Imported Company',
        domain: item.domain || 'example.com',
        industry: item.industry || 'Software',
        employees: item.employees || '10-50',
        arr: Number(item.arr) || 50000,
        tier: item.tier || 'Mid-Market',
        healthScore: 85,
        city: item.city || 'Buenos Aires',
        country: item.country || 'Argentina',
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
      }));
      setCompanies((prev) => [...newComps, ...prev]);
      count = newComps.length;
    } else if (target === 'people') {
      const newPeople: Person[] = items.map((item, idx) => ({
        id: 'p-import-' + Date.now() + '-' + idx,
        firstName: item.firstName || item.name?.split(' ')[0] || 'Contact',
        lastName: item.lastName || item.name?.split(' ').slice(1).join(' ') || 'Imported',
        email: item.email || 'lead@example.com',
        phone: item.phone || '+54 11 5555-0000',
        jobTitle: item.jobTitle || 'Executive',
        companyName: item.companyName || item.company,
        status: item.status || 'Lead',
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
        lastActivityDate: new Date().toISOString(),
      }));
      setPeople((prev) => [...newPeople, ...prev]);
      count = newPeople.length;
    }

    triggerConfetti();
    showToast(`Successfully imported ${count} ${target} records!`, 'success');
    return count;
  };

  // Reset to initial demo
  const resetToDemoData = () => {
    setOpportunities(INITIAL_OPPORTUNITIES);
    setCompanies(INITIAL_COMPANIES);
    setPeople(INITIAL_PEOPLE);
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    setInvoices(INITIAL_INVOICES);
    setInventory(INITIAL_INVENTORY);
    setExpenses(INITIAL_EXPENSES);
    localStorage.clear();
    showToast('CRM & ERP workspace reset to demo data', 'success');
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

  // ERP Handlers
  const addInvoice = (invData: Omit<Invoice, 'id' | 'createdAt'>): Invoice => {
    const newInv: Invoice = {
      ...invData,
      id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Invoice ${newInv.id} created successfully!`, 'success');
    triggerConfetti();
    return newInv;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
    showToast(`Invoice ${id} status updated to ${status}`, 'info');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    showToast(`Invoice ${id} removed`, 'info');
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>): InventoryItem => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
    };
    setInventory((prev) => [newItem, ...prev]);
    if (newItem.stockQuantity <= newItem.reorderLevel) {
      showToast(
        `⚠️ Low Stock Threshold Alert: "${newItem.name}" (${newItem.sku}) added at or below minimum threshold (${newItem.stockQuantity}/${newItem.reorderLevel} units)!`,
        'warning'
      );
    } else {
      showToast(`Inventory item "${newItem.name}" added successfully!`, 'success');
    }
    return newItem;
  };

  const updateInventoryStock = (id: string, deltaQuantity: number) => {
    let targetItemName = '';
    let isLowStockAlert = false;
    let alertDetails = '';

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.stockQuantity + deltaQuantity);
          targetItemName = item.name;
          if (newQty <= item.reorderLevel) {
            isLowStockAlert = true;
            alertDetails = `⚠️ Low Stock Threshold Alert: "${item.name}" (SKU: ${item.sku}) has reached minimum stock threshold (${newQty}/${item.reorderLevel} min units remaining)!`;
          }
          return {
            ...item,
            stockQuantity: newQty,
            lastRestocked: deltaQuantity > 0 ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );

    if (isLowStockAlert) {
      showToast(alertDetails, 'warning');
    } else {
      showToast(`Stock quantity updated for "${targetItemName}"`, 'info');
    }
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    showToast(`Inventory item removed`, 'info');
  };

  const addExpense = (expData: Omit<ExpenseItem, 'id'>): ExpenseItem => {
    const newExp: ExpenseItem = {
      ...expData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense recorded: $${newExp.amount}`, 'success');
    return newExp;
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    showToast(`Expense record deleted`, 'info');
  };

  // Full Backup of CRM & ERP Data to JSON File
  const exportFullWorkspaceJSON = () => {
    const fullBackup = {
      app: 'ClientumCRM & ERP Workspace',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      user: currentUser,
      crm: {
        opportunities,
        companies,
        people,
        tasks,
        activities,
        customObjects,
        workflows,
        savedViews,
      },
      erp: {
        invoices,
        inventory,
        expenses,
      },
      settings: {
        theme,
        language,
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clientum_crm_erp_full_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full CRM & ERP workspace JSON backup created and downloaded!', 'success');
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
    link.setAttribute('download', `clientum_crm_deals_${new Date().toISOString().split('T')[0]}.csv`);
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
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar,
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
        isAuthenticated,
        setIsAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        updateCurrentUser,
        login,
        register,
        logout,
        resetPassword,
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
        customObjects,
        addCustomObject,
        addCustomFieldToObject,
        addRecordToCustomObject,
        deleteRecordFromCustomObject,
        workflows,
        addWorkflow,
        toggleWorkflow,
        deleteWorkflow,
        savedViews,
        addSavedView,
        deleteSavedView,
        importCSVData,
        resetToDemoData,
        loadClientumLeads,
        exportOpportunitiesCSV,
        invoices,
        inventory,
        expenses,
        addInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        addInventoryItem,
        updateInventoryStock,
        deleteInventoryItem,
        addExpense,
        deleteExpense,
        exportFullWorkspaceJSON,
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
