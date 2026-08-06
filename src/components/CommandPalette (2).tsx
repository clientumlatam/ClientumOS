import React from 'react';
import { ActiveTab } from '../types';
import { Search, X, LayoutDashboard, Target, Sparkles, Users, Settings, Cpu, Bot, Database, Settings2, User } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function CommandPalette({ isOpen, onClose, setActiveTab }: CommandPaletteProps) {
  if (!isOpen) return null;

  const items = [
    { label: 'Panel Principal', tab: 'overview' as ActiveTab, icon: LayoutDashboard },
    { label: 'Centro de Control Agent OS', tab: 'agent_os' as ActiveTab, icon: Cpu },
    { label: 'Red de Agentes & Organigrama', tab: 'crm_agents' as ActiveTab, icon: Bot },
    { label: 'Inventario CMDB & Servicios', tab: 'cmdb' as ActiveTab, icon: Database },
    { label: 'Salud & Diagnóstico OS', tab: 'crm_config' as ActiveTab, icon: Settings2 },
    { label: 'Mi Cuenta & Seguridad', tab: 'account' as ActiveTab, icon: User },
    { label: 'Estrategia', tab: 'strategy' as ActiveTab, icon: Target },
    { label: 'Copywriter IA', tab: 'copywriter' as ActiveTab, icon: Sparkles },
    { label: 'Clientes', tab: 'clients' as ActiveTab, icon: Users },
    { label: 'Configuración', tab: 'settings' as ActiveTab, icon: Settings },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Escribe para buscar o navegar..."
            className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-800"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-100 rounded-lg text-sm text-slate-700 transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-indigo-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
