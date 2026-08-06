import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, KeyRound, HelpCircle, Send } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSwitchToLogin?: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialEmail = '',
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Cooldown countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, ingresá un correo electrónico válido.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar el correo de recuperación. Intentá nuevamente.');
      }

      setStatus('success');
      setSuccessMessage(
        data?.message || 'Si la cuenta existe con ese correo, recibirás un enlace para restablecer tu contraseña.'
      );
      setResendCooldown(60); // 60 seconds timer before resend
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Error de conexión. Verificá tu red e intentá nuevamente.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100"
        id="forgot-password-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Recuperar Contraseña</h3>
              <p className="text-xs text-slate-400">Restablecé el acceso a tu cuenta de Clientum</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm"
            aria-label="Cerrar modal"
            id="close-forgot-password-btn"
          >
            ✕
          </button>
        </div>

        {/* Content based on status */}
        {status === 'success' ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-emerald-200 mb-1">¡Solicitud enviada!</p>
                <p>{successMessage}</p>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-medium text-slate-200">📌 Siguientes pasos:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Revisá tu bandeja de entrada para <strong>{email}</strong>.</li>
                <li>Verificá la carpeta de <strong>Spam / Correo no deseado</strong>.</li>
                <li>El enlace de restablecimiento expira en 1 hora.</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                disabled={resendCooldown > 0 || status === 'loading'}
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50 transition-colors"
                id="resend-password-reset-btn"
              >
                <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
                {resendCooldown > 0
                  ? `Reenviar en ${resendCooldown}s`
                  : 'Reenviar correo de recuperación'}
              </button>

              {onSwitchToLogin && (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  id="back-to-login-success-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Inicio de Sesión
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Ingresá tu correo electrónico registrado y te enviaremos las instrucciones necesarias para crear una nueva contraseña.
            </p>

            {status === 'error' && errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{errorMessage}</p>
                  <button
                    type="button"
                    onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                    className="text-xs text-red-400 hover:underline mt-1.5 flex items-center gap-1 font-medium"
                  >
                    <HelpCircle className="w-3 h-3" />
                    ¿Necesitás ayuda con la recuperación?
                  </button>
                </div>
              </div>
            )}

            {showTroubleshooting && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <p className="text-slate-200 font-medium">Diagnóstico de acceso:</p>
                <p>• Asegurate de usar la dirección exacta con la que te registraste.</p>
                <p>• Si te registraste con Google OAuth, usá el botón "Continuar con Google".</p>
                <p>• Para asistencia directa, contactá al soporte técnico en <span className="text-blue-400">clientumlatam@gmail.com</span>.</p>
              </div>
            )}

            <div>
              <label htmlFor="forgot-email-input" className="block text-xs font-medium text-slate-400 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="forgot-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') handleReset();
                  }}
                  placeholder="ejemplo@empresa.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20"
                id="submit-forgot-password-btn"
              >
                {status === 'loading' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Enlace de Recuperación
                  </>
                )}
              </button>

              {onSwitchToLogin && (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors pt-1"
                  id="back-to-login-link"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Volver al inicio de sesión
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
