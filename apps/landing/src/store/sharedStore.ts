import { CRMDeal } from '../types';

export interface ActivityLogItem {
  id: string | number;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note' | 'lead' | 'deal' | 'contact' | 'stage' | string;
  title: string;
  notes?: string;
  date?: string;
  timestamp?: string;
  createdAt?: string;
  user?: string;
  completed?: boolean;
}

export const DEALS_EVENT = 'crm:deals_updated';
export const ACTIVITY_EVENT = 'crm:activity_updated';

const DEALS_STORAGE_KEY = 'clientum_crm_deals';
const ACTIVITIES_STORAGE_KEY = 'clientum_crm_activities';

export function loadDeals(fallback: CRMDeal[] = []): CRMDeal[] {
  try {
    const raw = localStorage.getItem(DEALS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[sharedStore] Failed to load deals from localStorage:', err);
  }
  return fallback;
}

export function saveDeals(deals: CRMDeal[]): void {
  try {
    localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
  } catch (err) {
    console.warn('[sharedStore] Failed to save deals to localStorage:', err);
  }
}

export function addDeal(deal: Partial<CRMDeal>): CRMDeal {
  const current = loadDeals();
  const fullDeal: CRMDeal = {
    id: deal.id || `deal_${Date.now()}`,
    company: deal.company || 'Nueva Empresa',
    contact: deal.contact || 'Contacto',
    phone: deal.phone || '',
    email: deal.email || '',
    industry: deal.industry || 'Comercio',
    city: deal.city || 'General Roca',
    stage: deal.stage || 'leads',
    amount: deal.amount || 0,
    score: deal.score || 50,
    dealSize: deal.dealSize || 'M',
    fit: deal.fit || 'Medio',
    status: deal.status || 'Active',
    owner: deal.owner || 'Santiago López',
    priority: deal.priority || 'Medium',
    created: deal.created || new Date().toISOString(),
    ...deal,
  };
  const updated = [fullDeal, ...current];
  saveDeals(updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DEALS_EVENT, { detail: updated }));
  }
  return fullDeal;
}

export function loadActivities(fallback: ActivityLogItem[] = []): ActivityLogItem[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[sharedStore] Failed to load activities from localStorage:', err);
  }
  return fallback;
}

export function saveActivities(activities: ActivityLogItem[]): void {
  try {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  } catch (err) {
    console.warn('[sharedStore] Failed to save activities to localStorage:', err);
  }
}

export function addActivity(activity: Partial<ActivityLogItem>): ActivityLogItem {
  const current = loadActivities();
  const item: ActivityLogItem = {
    id: activity.id || `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: activity.type || 'note',
    title: activity.title || 'Actividad registrada',
    notes: activity.notes || '',
    timestamp: activity.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: activity.createdAt || new Date().toISOString(),
    user: activity.user || 'Usuario',
    completed: activity.completed ?? true,
    ...activity,
  };
  const updated = [item, ...current];
  saveActivities(updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ACTIVITY_EVENT, { detail: updated }));
  }
  return item;
}

export const sharedStore = {
  loadDeals,
  saveDeals,
  addDeal,
  loadActivities,
  saveActivities,
  addActivity,
};

export default sharedStore;
