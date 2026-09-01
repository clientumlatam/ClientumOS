import { VscrmClient, VscrmProject, VscrmTask, VscrmTimeEntry, VscrmInvoice, VscrmExpense } from '@clientum/types';

export const INITIAL_VS_CLIENTS: VscrmClient[] = [
  { id: 'c1', name: 'Carlos Mendoza', company: 'TechSolutions LATAM', email: 'carlos@techsolutions.cl', phone: '+56 9 8765 4321', status: 'Active', country: 'Chile', createdAt: '2026-01-15' },
  { id: 'c2', name: 'Sofía Valenzuela', company: 'Innovacion Digital SA', email: 'sofia@innovacion.co', phone: '+57 300 123 4567', status: 'Active', country: 'Colombia', createdAt: '2026-02-01' },
  { id: 'c3', name: 'Mateo Fernández', company: 'Global Logistics MX', email: 'm.fernandez@globallogistics.mx', phone: '+52 55 1234 5678', status: 'Lead', country: 'Mexico', createdAt: '2026-03-10' },
];

export const INITIAL_VS_PROJECTS: VscrmProject[] = [
  { id: 'p1', clientId: 'c1', clientName: 'TechSolutions LATAM', title: 'Supabase Cloud Migration & RLS', budget: 8500, status: 'In Progress', deadline: '2026-09-30', description: 'Migrate legacy PostgreSQL database to Supabase with Row Level Security and Edge Functions.' },
  { id: 'p2', clientId: 'c2', clientName: 'Innovacion Digital SA', title: 'VS Code Extension Custom Dashboard', budget: 5200, status: 'Planning', deadline: '2026-10-15', description: 'Develop specialized Svelte/TypeScript extension for internal sales and client tracking.' },
];

export const INITIAL_VS_TASKS: VscrmTask[] = [
  { id: 't1', projectId: 'p1', projectTitle: 'Supabase Cloud Migration & RLS', title: 'Configure Database Schemas & Foreign Keys', status: 'Done', priority: 'High', dueDate: '2026-08-10' },
  { id: 't2', projectId: 'p1', projectTitle: 'Supabase Cloud Migration & RLS', title: 'Write Security Policies and Test RLS', status: 'In Progress', priority: 'High', dueDate: '2026-08-18' },
  { id: 't3', projectId: 'p2', projectTitle: 'VS Code Extension Custom Dashboard', title: 'Design Webview UI mockups', status: 'To Do', priority: 'Medium', dueDate: '2026-08-25' },
];

export const INITIAL_VS_TIME: VscrmTimeEntry[] = [
  { id: 'te1', clientId: 'c1', clientName: 'TechSolutions LATAM', projectId: 'p1', projectTitle: 'Supabase Cloud Migration & RLS', description: 'Initial schema architecture & foreign key constraints review', hours: 4.5, date: '2026-08-01', hourlyRate: 95 },
  { id: 'te2', clientId: 'c1', clientName: 'TechSolutions LATAM', projectId: 'p1', projectTitle: 'Supabase Cloud Migration & RLS', description: 'Writing RLS policies and testing auth tokens', hours: 6.0, date: '2026-08-02', hourlyRate: 95 },
  { id: 'te3', clientId: 'c2', clientName: 'Innovacion Digital SA', projectId: 'p2', projectTitle: 'VS Code Extension Custom Dashboard', description: 'Project scoping meeting & requirements gathering', hours: 2.0, date: '2026-08-03', hourlyRate: 110 },
];

export const INITIAL_VS_INVOICES: VscrmInvoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2026-001',
    clientId: 'c1',
    clientName: 'TechSolutions LATAM',
    items: [
      { description: 'Supabase Schema Architecture (10.5 hrs @ $95)', quantity: 10.5, unitPrice: 95 },
      { description: 'Database Consulting & Security Audit', quantity: 1, unitPrice: 1500 }
    ],
    taxRate: 19,
    status: 'Sent',
    issueDate: '2026-08-01',
    dueDate: '2026-08-31'
  }
];

export const INITIAL_VS_EXPENSES: VscrmExpense[] = [
  { id: 'exp1', title: 'Supabase Pro Tier Subscription', category: 'Software', amount: 25, date: '2026-08-01', notes: 'Monthly database hosting fee' },
  { id: 'exp2', title: 'GitHub Enterprise & Copilot', category: 'Software', amount: 39, date: '2026-08-02', notes: 'Developer tool license' }
];
