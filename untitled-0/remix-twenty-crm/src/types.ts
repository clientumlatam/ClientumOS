export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'es' | 'pt';

export type StageId = 'lead' | 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface StageConfig {
  id: StageId;
  name: string;
  color: string;
  probability: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date';
  options?: string[];
  value?: string | number | boolean;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyId?: string;
  companyName?: string;
  avatar?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  status: 'Lead' | 'Contacted' | 'Customer' | 'Churned';
  assignedTo: string;
  createdAt: string;
  lastActivityDate: string;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  industry: string;
  employees: string;
  arr?: number;
  tier: 'Enterprise' | 'Mid-Market' | 'Startup' | 'Scaleup';
  healthScore: number; // 0-100
  address?: string;
  city?: string;
  country?: string;
  assignedTo: string;
  createdAt: string;
  description?: string;
}

export interface Opportunity {
  id: string;
  name: string;
  amount: number;
  currency: string;
  stage: StageId;
  closeDate: string;
  probability: number;
  companyId?: string;
  companyName?: string;
  contactId?: string;
  contactName?: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'New Business' | 'Expansion' | 'Renewal';
  notes?: string;
  tags: string[];
  lossReason?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Todo' | 'In Progress' | 'Completed';
  assignedTo: string;
  targetType?: 'opportunity' | 'company' | 'person';
  targetId?: string;
  targetName?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Activity {
  id: string;
  type: 'note' | 'call' | 'email' | 'meeting' | 'stage_change' | 'ai_insight';
  title: string;
  content: string;
  author: string;
  targetType: 'opportunity' | 'company' | 'person';
  targetId: string;
  createdAt: string;
  meta?: {
    durationMinutes?: number;
    callOutcome?: string;
    fromStage?: StageId;
    toStage?: StageId;
    emailSubject?: string;
  };
}

export type ActiveTab = 'opportunities' | 'companies' | 'people' | 'tasks' | 'analytics' | 'settings' | 'powerSuite';

export type OpportunityViewMode = 'kanban' | 'table';

export interface FilterState {
  search: string;
  stage?: StageId | 'all';
  owner?: string | 'all';
  priority?: string | 'all';
  tier?: string | 'all';
  minAmount?: number;
  maxAmount?: number;
}
