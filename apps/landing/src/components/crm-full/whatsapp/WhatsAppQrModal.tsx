import React, { useState, useEffect, useMemo } from 'react';
import {
  QrCode,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  Lock,
  Radio
} from 'lucide-react';
import { WhatsAppAccount } from './types';

interface WhatsAppQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountLinked: (account: WhatsAppAccount) => void;
  existingAccounts: WhatsAppAccount[];
  targetAccount?: WhatsAppAccount | null;
}

export const WhatsAppQrModal: React.FC<WhatsAppQrModalProps> = ({
  isOpen,
  onClose,
  onAccountLinked,
  existingAccounts,
  targetAccount
}) => {
  const [phoneNumber, setPhoneNumber] = useState(targetAccount?.phoneNumber || '+54 9 11 5522-8800');
  const [label, setLabel] = useState(targetAccount?.label || 'Ventas Central & CABA');
  const [pushName, setPushName] = useState(targetAccount?.pushName || 'Clientum Bot Comercial');
  
  const [stepState, setStepState] = useState<'idle' | 'generating' | 'waiting_scan' | 'authenticating' | 'connected'>('waiting_scan');
  const [countdown, setCountdown] = useState<number>(45);
  const [qrHash, setQrHash] = useState<string>('2@' + Math.random().toString(36).substring(2, 12) + '==clientum_baileys_noise_session');
  const [syncProgress, setSyncProgress] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;
    setStepState('waiting_scan');
    setCountdown(45);
    setQrHash('2@' + Math.random().toString(36).substring(2, 12) + '==clientum_baileys_noise_session_' + Date.now());
  }, [isOpen, targetAccount]);

  // Countdown timer for QR code expiration
  useEffect(() => {
    if (!isOpen || stepState !== 'waiting_scan') return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, stepState]);

  const handleRegenerateQr = () => {
    setStepState('generating');
    setTimeout(() => {
      setQrHash('2@' + Math.random().toString(36).substring(2, 12) + '==clientum_baileys_noise_session_' + Date.now());
      setCountdown(45);
      setStepState('waiting_scan');
    }, 700);
  };

  const handleSimulateScan = () => {
    setStepState('authenticating');
    setSyncProgress(25);

    setTimeout(() => {
      setSyncProgress(65);
    }, 800);

    setTimeout(() => {
      setSyncProgress(100);
      setStepState('connected');

      const newAccount: WhatsAppAccount = {
        id: targetAccount ? targetAccount.id : `acc-${Date.now()}`,
        phoneNumber: phoneNumber.trim() || '+54 9 11 5522-8800',
        label: label.trim() || 'Línea de Ventas',
        pushName: pushName.trim() || 'Clientum Asesor IA',
        status: 'CONNECTED',
        batteryLevel: Math.floor(88 + Math.random() * 11),
        charging: true,
        platform: 'Baileys Multi-Device MD v6.8.2',
        latency: `${Math.floor(18 + Math.random() * 15)}ms`,
        uptime: 'Recién conectado',
        isDefault: existingAccounts.length === 0,
        syncProgress: 100,
        lastConnectedAt: new Date().toISOString()
      };

      setTimeout(() => {
        onAccountLinked(newAccount);
        onClose();
      }, 1400);
    }, 1800);
  };

  // Generate deterministic visual matrix for the QR code
  const matrixBlocks = useMemo(() => {
    const blocks: { x: number; y: number; filled: boolean }[] = [];
    const size = 21;
    let seed = 0;
    for (let i = 0; i < qrHash.length; i++) {
      seed = (seed + qrHash.charCodeAt(i) * (i + 1)) % 10000;
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Corner 1
        if (x < 7 && y < 7) continue;
        // Corner 2
        if (x >= size - 7 && y < 7) continue;
        // Corner 3
        if (x < 7 && y >= size - 7) continue;
        // Center logo hole
        if (x >= 8 && x <= 12 && y >= 8 && y <= 12) continue;

        const val = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
        const filled = (val - Math.floor(val)) > 0.48;
        blocks.push({ x, y, filled });
      }
    }
    return blocks;
  }, [qrHash]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0b1324] border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col text-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-[#080d19]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-white text-base sm:text-lg">
                  Vincular Número de WhatsApp
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  Baileys Multi-Device MD
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Autenticación segura por código QR sin depender de webhooks de Cloud API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column: Form & Instructions */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Etiqueta / Nombre de la Línea:
              </label>
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Ej. Ventas Central / Patagonia"
                className="w-full bg-[#050B14] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Número Telefónico:
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="+54 9 11 5522-8800"
                  className="w-full bg-[#050B14] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Nombre del Bot:
                </label>
                <input
                  type="text"
                  value={pushName}
                  onChange={e => setPushName(e.target.value)}
                  placeholder="Santi SDR (IA)"
                  className="w-full bg-[#050B14] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="bg-[#060c18] border border-slate-800 rounded-2xl p-3.5 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Instrucciones de escaneo:</span>
              </div>
              <ol className="space-y-1.5 list-decimal list-inside text-[11px] text-slate-400 leading-relaxed">
                <li>Abre WhatsApp en tu teléfono celular.</li>
                <li>Toca <strong>Menú (⋮)</strong> o <strong>Configuración</strong>.</li>
                <li>Selecciona <strong>Dispositivos vinculados</strong> y toca <strong>Vincular un dispositivo</strong>.</li>
                <li>Apunta tu cámara a este código QR.</li>
              </ol>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cifrado de extremo a extremo Signal Protocol con llaves locales seguras.</span>
            </div>
          </div>

          {/* Right Column: QR Code Display & Live Pairing State */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#060c18] border border-slate-800 rounded-3xl relative">
            {stepState === 'waiting_scan' && (
              <>
                {/* QR Code Container */}
                <div className="relative bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 210 210"
                    className="w-44 h-44 sm:w-48 sm:h-48"
                  >
                    {/* Top-Left Corner */}
                    <rect x="10" y="10" width="60" height="60" fill="#0f172a" rx="4" />
                    <rect x="20" y="20" width="40" height="40" fill="#ffffff" rx="2" />
                    <rect x="28" y="28" width="24" height="24" fill="#059669" rx="2" />

                    {/* Top-Right Corner */}
                    <rect x="140" y="10" width="60" height="60" fill="#0f172a" rx="4" />
                    <rect x="150" y="20" width="40" height="40" fill="#ffffff" rx="2" />
                    <rect x="158" y="28" width="24" height="24" fill="#059669" rx="2" />

                    {/* Bottom-Left Corner */}
                    <rect x="10" y="140" width="60" height="60" fill="#0f172a" rx="4" />
                    <rect x="20" y="150" width="40" height="40" fill="#ffffff" rx="2" />
                    <rect x="28" y="158" width="24" height="24" fill="#059669" rx="2" />

                    {/* Deterministic Data Matrix */}
                    {matrixBlocks.map((block, idx) => (
                      block.filled && (
                        <rect
                          key={idx}
                          x={block.x * 9.5 + 6}
                          y={block.y * 9.5 + 6}
                          width="8.2"
                          height="8.2"
                          fill="#0f172a"
                          rx="1.5"
                        />
                      )
                    ))}

                    {/* Center Icon */}
                    <rect x="82" y="82" width="46" height="46" fill="#ffffff" rx="8" />
                    <rect x="86" y="86" width="38" height="38" fill="#10b981" rx="6" />
                  </svg>

                  {/* Expired Overlay */}
                  {countdown === 0 && (
                    <div className="absolute inset-0 bg-slate-950/90 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                      <Clock className="w-8 h-8 text-amber-400 mb-2" />
                      <p className="text-xs font-bold text-white mb-2">Código QR caducado</p>
                      <button
                        onClick={handleRegenerateQr}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerar QR</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Countdown & Status */}
                <div className="mt-3 flex items-center justify-between w-full max-w-[210px]">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Expira en: <strong className="text-emerald-400 font-mono">{countdown}s</strong></span>
                  </div>
                  <button
                    onClick={handleRegenerateQr}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    title="Generar nuevo código"
                  >
                    <RefreshCw className="w-3 h-3" /> Refrescar
                  </button>
                </div>

                {/* Simulate Scan Button */}
                <div className="mt-4 w-full">
                  <button
                    onClick={handleSimulateScan}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Escanear Ahora (Simular Éxito)</span>
                  </button>
                </div>
              </>
            )}

            {stepState === 'authenticating' && (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-spin">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">Autenticando Sesión Multi-Device</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Intercambiando claves cifradas Noise Protocol y sincronizando historial...
                  </p>
                </div>

                <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-emerald-400">{syncProgress}% completado</span>
              </div>
            )}

            {stepState === 'connected' && (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-base">¡Línea WhatsApp Vinculada!</h4>
                <p className="text-xs text-emerald-300">
                  Sesión activa lista para recibir y despachar mensajes con bot e historial sincronizado.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080d19] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Múltiples números soportados simultáneamente</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
