import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClientumLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const ClientumLoginModal: React.FC<ClientumLoginModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('fernando.diaz@clientum.dev');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Fernando Díaz');
  const [company, setCompany] = useState('Clientum Latam');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('¡Acceso verificado! Redirigiendo al Dashboard...');
      setTimeout(() => {
        onClose();
        navigate('/app');
      }, 500);
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('¡Acceso demo concedido! Redirigiendo al Dashboard...');
      setTimeout(() => {
        onClose();
        navigate('/app');
      }, 400);
    }, 400);
  };

  return (
    <div
      id="clientum_auth_modal_overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="clientum_auth_modal_card"
        className="w-full max-w-md bg-[#090f1e] border border-[#1b2b4e] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-slate-100"
      >
        {/* Glowing subtle top ambient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121c35] transition-colors"
          title="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/25">
            C
          </div>
          <div>
            <h3 className="text-white font-bold text-base tracking-tight flex items-center gap-2">
              <span>ClientumOS</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                Portal
              </span>
            </h3>
            <p className="text-slate-400 text-xs">Acceso seguro a tu espacio de trabajo y CRM</p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 rounded-2xl bg-[#0e162d] border border-[#18274d] mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Success alert */}
        {successMessage ? (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2.5 mb-4 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        ) : null}

        {/* Main Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Fernando Díaz"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0c1428] border border-[#1b2b4e] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Empresa u Organización
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. TechGlobal S.A."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0c1428] border border-[#1b2b4e] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0c1428] border border-[#1b2b4e] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-300 font-medium">Contraseña</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={handleQuickDemoAccess}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  ¿Credenciales demo?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0c1428] border border-[#1b2b4e] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
                <span>Ingresando...</span>
              </span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Ingresar al Dashboard' : 'Crear Cuenta y Acceder'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1b2b4e]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#090f1e] px-2 text-slate-500 font-semibold tracking-wider">
              o acceso directo
            </span>
          </div>
        </div>

        {/* Quick Demo Access Button */}
        <button
          type="button"
          onClick={handleQuickDemoAccess}
          className="w-full py-2.5 rounded-2xl bg-[#0f1a35] hover:bg-[#152449] border border-[#223666] text-cyan-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Acceder en Modo Demo al Dashboard</span>
        </button>

        {/* Security badge footer */}
        <div className="mt-5 pt-3 border-t border-[#15203b] flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sesión encriptada con protección SSL/TLS</span>
        </div>
      </div>
    </div>
  );
};

export default ClientumLoginModal;
