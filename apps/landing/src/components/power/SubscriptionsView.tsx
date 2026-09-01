import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { useCRM } from '@clientum/ui';

export const SubscriptionsView: React.FC = () => {
  const { showToast } = useCRM();
  const [currentPlan] = useState('Growth Plan (Pro)');

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0c10] text-slate-300 text-xs max-w-3xl">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          Gestión de Suscripciones & Planes de Pago SaaS
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Controla tu abono actual, límites de uso de mensajes WhatsApp y facturación automática por tarjeta o Stripe.</p>
      </div>

      <div className="bg-[#131722] p-6 rounded-2xl border border-[#212a3d] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Plan Actual:</div>
            <div className="text-lg font-bold text-white">{currentPlan}</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-xs border border-emerald-500/20">
            Activo • Renueva el 15 Sep 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1e2638]">
          <div className="bg-[#181d2c] p-4 rounded-xl border border-[#273248]">
            <div className="text-slate-400 text-[11px]">Mensajes WhatsApp API</div>
            <div className="text-white font-bold text-base mt-1">14,250 / 20,000</div>
          </div>
          <div className="bg-[#181d2c] p-4 rounded-xl border border-[#273248]">
            <div className="text-slate-400 text-[11px]">Agentes Multi-Tenant</div>
            <div className="text-white font-bold text-base mt-1">12 / 15 Activos</div>
          </div>
          <div className="bg-[#181d2c] p-4 rounded-xl border border-[#273248]">
            <div className="text-slate-400 text-[11px]">Almacenamiento Cloud</div>
            <div className="text-white font-bold text-base mt-1">45 GB / 100 GB</div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => showToast('Redirigiendo al portal de pagos Stripe...', 'success')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-md"
          >
            Actualizar a Plan Enterprise Pro ($199/mes)
          </button>
        </div>
      </div>
    </div>
  );
};
