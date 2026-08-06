import React, { useState } from 'react';
import { KeyRound, X, Loader2, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

interface ResetPasswordModalProps {
  isOpen: boolean;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  token,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Verificá ambas e intentá nuevamente.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'No se pudo restablecer la contraseña. El enlace puede haber expirado.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error de conexión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl my-auto text-left text-white animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clientum Header Branding */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#0A2558] border border-slate-700/80 p-2 shadow-lg mb-3 flex items-center justify-center">
            <img src="/favicon.svg" alt="Clientum Logo" className="w-8 h-8" referrerPolicy="no-referrer" />
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white leading-none">
            CLIENTUM <span className="text-emerald-400 font-extrabold text-xs ml-1 uppercase">OS</span>
          </span>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Establecé tu nueva contraseña de acceso
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-5 text-center py-2">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">¡Contraseña Actualizada!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Tu contraseña ha sido restablecida con éxito. Ya podés ingresar a tu cuenta de ClientumOS con tus nuevas credenciales.
              </p>
            </div>

            <button
              onClick={onSuccess}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center space-x-2 cursor-pointer border-0 mt-4"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Iniciar Sesión Ahora</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ingresá tu nueva clave. Debe tener al menos 8 caracteres.</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nueva Contraseña
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-950/80 border border-rose-800/90 rounded-xl p-3 text-xs text-rose-300 leading-snug">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer border-0"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Guardando nueva contraseña...</span></>
              ) : (
                <><KeyRound className="w-4 h-4" /><span>Guardar Contraseña y Continuar</span></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
