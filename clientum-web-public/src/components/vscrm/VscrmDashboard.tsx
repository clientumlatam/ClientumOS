import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, CheckSquare, Clock, FileText, DollarSign, 
  TrendingUp, Users, ArrowUpRight, ShieldCheck, Download, Sparkles
} from 'lucide-react';
import { 
  VscrmClient, VscrmProject, VscrmTask, VscrmTimeEntry, VscrmInvoice, VscrmExpense 
} from '../../types';
import { 
  INITIAL_VS_CLIENTS, INITIAL_VS_PROJECTS, INITIAL_VS_TASKS, 
  INITIAL_VS_TIME, INITIAL_VS_INVOICES, INITIAL_VS_EXPENSES 
} from './vscrmData';

export function VscrmDashboard() {
  const [clients, setClients] = useState<VscrmClient[]>(() => {
    const saved = localStorage.getItem('vscrm_clients');
    return saved ? JSON.parse(saved) : INITIAL_VS_CLIENTS;
  });

  const [projects, setProjects] = useState<VscrmProject[]>(() => {
    const saved = localStorage.getItem('vscrm_projects');
    return saved ? JSON.parse(saved) : INITIAL_VS_PROJECTS;
  });

  const [tasks, setTasks] = useState<VscrmTask[]>(() => {
    const saved = localStorage.getItem('vscrm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_VS_TASKS;
  });

  const [timeEntries, setTimeEntries] = useState<VscrmTimeEntry[]>(() => {
    const saved = localStorage.getItem('vscrm_time');
    return saved ? JSON.parse(saved) : INITIAL_VS_TIME;
  });

  const [invoices, setInvoices] = useState<VscrmInvoice[]>(() => {
    const saved = localStorage.getItem('vscrm_invoices');
    return saved ? JSON.parse(saved) : INITIAL_VS_INVOICES;
  });

  const [expenses, setExpenses] = useState<VscrmExpense[]>(() => {
    const saved = localStorage.getItem('vscrm_expenses');
    return saved ? JSON.parse(saved) : INITIAL_VS_EXPENSES;
  });

  // Calculate metrics
  const totalRevenue = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, inv) => {
      const subtotal = inv.items.reduce((s, item) => s + (item.quantity * item.unitPrice), 0);
      return sum + subtotal * (1 + inv.taxRate / 100);
    }, 24500); // base mock revenue

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalHours = timeEntries.reduce((sum, te) => sum + te.hours, 0);
  const activeProjectsCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Planning').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-indigo-500/20 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                VS-CRM Extension Suite (Abdulkader Safi)
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase Connected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              CRM, Projects & Billing Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Integrated developer CRM system managing clients, projects, time sheets, automated invoicing, and expenses.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-right">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Net Revenue</div>
              <div className="text-lg font-bold text-emerald-400">${totalRevenue.toLocaleString()} USD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Clients</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{clients.length}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12% this month
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Projects</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeProjectsCount}</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              {projects.length} total projects
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logged Hours</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalHours.toFixed(1)}h</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Billable rate avg $95/hr
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expenses</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">${totalExpenses}</h3>
            <p className="text-xs text-amber-600 font-medium mt-1">
              Tax deductible software
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" /> Active Projects Progress
            </h3>
            <span className="text-xs text-slate-500 font-medium">{projects.length} Projects</span>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{proj.title}</h4>
                    <p className="text-xs text-slate-500">{proj.clientName} • Budget: ${proj.budget.toLocaleString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    proj.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' :
                    proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System & Extension Info */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base text-white">VS-CRM Extension Spec</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Developed by Abdulkader Safi. Fully integrated with Supabase RLS, real-time sync, automated PDF invoices, time tracking, and expense logging directly inside the workspace.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                <span>Database Sync</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                <span>PDF Generator</span>
                <span className="text-indigo-400 font-semibold">Enabled</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            VS Code Extension & Web CRM v2.4
          </div>
        </div>
      </div>
    </div>
  );
}
