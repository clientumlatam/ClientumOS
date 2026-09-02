import React from 'react';
import {
  Smartphone,
  QrCode,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Zap,
  Radio,
  Battery,
  BatteryCharging,
  PowerOff,
  Globe,
  Layers,
  ChevronRight
} from 'lucide-react';
import { WhatsAppAccount } from './types';

interface WhatsAppAccountsManagerProps {
  accounts: WhatsAppAccount[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  onOpenQrModal: (account?: WhatsAppAccount) => void;
  onDisconnectAccount: (accountId: string) => void;
}

export const WhatsAppAccountsManager: React.FC<WhatsAppAccountsManagerProps> = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
  onOpenQrModal,
  onDisconnectAccount
}) => {
  return (
    <div className="bg-[#0A101F]/80 border border-[#1E293B] rounded-2xl p-3.5 mb-3 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Líneas y Cuentas de WhatsApp Conectadas
              </h3>
              <span className="text-[10px] px-2 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-mono font-bold">
                {accounts.filter(a => a.status === 'CONNECTED').length} de {accounts.length} Activas
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Autenticación Multi-Device por QR · Envíos y recepción concurrentes
            </p>
          </div>
        </div>

        {/* Add new number button */}
        <button
          onClick={() => onOpenQrModal()}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Vincular Nueva Línea (QR)</span>
        </button>
      </div>

      {/* Account Cards Horizontal Scroll / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3">
        {accounts.map(acc => {
          const isSelected = selectedAccountId === acc.id;
          const isConnected = acc.status === 'CONNECTED';

          return (
            <div
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                  : 'bg-[#050B14]/80 border-[#1E293B] hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{acc.label}</p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">{acc.phoneNumber}</p>
                  </div>
                </div>

                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                  isConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {isConnected ? 'Activo' : 'Offline'}
                </span>
              </div>

              {/* Status and Telemetry */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1E293B]/60">
                <div className="flex items-center gap-1.5">
                  {acc.charging ? (
                    <BatteryCharging className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Battery className="w-3 h-3 text-slate-400" />
                  )}
                  <span>{acc.batteryLevel}%</span>
                  <span className="text-slate-600">·</span>
                  <span className="font-mono text-emerald-400">{acc.latency}</span>
                </div>

                <div className="flex items-center gap-1">
                  {!isConnected ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQrModal(acc);
                      }}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold underline"
                    >
                      Re-escanear QR
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDisconnectAccount(acc.id);
                      }}
                      className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors"
                      title="Desconectar sesión"
                    >
                      Desconectar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
