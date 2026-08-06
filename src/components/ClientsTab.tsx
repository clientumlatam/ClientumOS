import React from 'react';
import { Users, Plus } from 'lucide-react';

export function ClientsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Clientes</h1>
          <p className="text-sm text-slate-500">Cartera de cuentas corporativas y estado de contratos.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Nuevo Cliente
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-600">No hay clientes registrados aún. Comienza agregando tu primer cliente.</p>
      </div>
    </div>
  );
}
