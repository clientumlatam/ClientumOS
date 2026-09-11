import React, { useState } from 'react';
import { Layers, Plus, CheckCircle2, Globe, Server, ShieldCheck } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const SaaSClusterView: React.FC = () => {
  const { showToast } = useCRM();
  const [clusters, setClusters] = useState([
    { id: 'cl-us-east', name: 'US East (Virginia)', region: 'us-east-1', tenants: 1240, status: 'Saludable (99.99%)' },
    { id: 'cl-sa-east', name: 'South America (São Paulo)', region: 'sa-east-1', tenants: 820, status: 'Saludable (99.98%)' },
    { id: 'cl-eu-west', name: 'Europe West (Frankfurt)', region: 'eu-central-1', tenants: 450, status: 'Saludable (100%)' }
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0c10] text-slate-300 text-xs">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Gestión de Clústeres SaaS & Infraestructura Multi-Tenant
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Administración global de nodos de servicio, balanceo de carga y aislamiento de bases de datos por tenant.</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">Nodos Cloud Activos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusters.map((c, idx) => (
            <div key={idx} className="bg-[#131722] border border-[#212a3d] p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{c.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                  {c.region}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Tenants alojados: <strong className="text-white">{c.tenants} empresas</strong></div>
              <div className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{c.status}</span>
              </div>
              <button
                onClick={() => showToast(`Optimizando rutas de red para nodo ${c.name}`, 'success')}
                className="w-full py-2 bg-[#1c2333] hover:bg-[#252f44] text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Ejecutar Health Check
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
