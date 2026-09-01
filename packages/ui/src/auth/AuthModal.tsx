import React, { useState, useEffect } from 'react';
import { ClientumLogo } from "../common/ClientumLogo";
import { KeyRound, Mail, Lock, User, Building, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, RefreshCw, Send, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCRM } from '../context/CRMContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, resetPassword, showToast } = useCRM();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('alex.morgan@clientum.dev');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotStep, setForgotStep] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [errorFields, setErrorFields] = useState<{ email?: boolean; password?: boolean; name?: boolean }>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    let timer: any;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  if (!isAuthModalOpen) return null;

  const switchMode = (mode: 'login' | 'register' | 'forgot') => {
    setAuthMode(mode);
    setValidationErrors([]);
    setErrorFields({});
    setForgotSent(false);
    setForgotStep('idle');
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (validationErrors.length > 0) {
      setValidationErrors([]);
      setErrorFields(prev => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (validationErrors.length > 0) {
      setValidationErrors([]);
      setErrorFields(prev => ({ ...prev, password: false }));
    }
  };

  const validateLoginForm = (): boolean => {
    const errors: string[] = [];
    const fields: { email?: boolean; password?: boolean } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.push('El correo electrónico es requerido.');
      fields.email = true;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('El formato del correo electrónico no es válido.');
      fields.email = true;
    }

    if (!password) {
      errors.push('La contraseña es requerida.');
      fields.password = true;
    } else if (password.length < 6) {
      errors.push('La contraseña debe contener al menos 6 caracteres.');
      fields.password = true;
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setErrorFields(fields);
      setShakeKey(prev => prev + 1);
      setFailedAttempts(prev => prev + 1);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setErrorFields({});

    if (authMode === 'login') {
      if (!validateLoginForm()) {
        showToast('Corrige los errores señalados en el formulario', 'error');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (email.trim() && password) {
          login(email, password);
          setIsAuthModalOpen(false);
          showToast('¡Bienvenido de vuelta a Clientum CRM!', 'success');
        } else {
          setValidationErrors(['Credenciales no reconocidas en el espacio de trabajo.']);
          setErrorFields({ email: true, password: true });
          setShakeKey(prev => prev + 1);
          setFailedAttempts(prev => prev + 1);
          showToast('Error al iniciar sesión', 'error');
        }
      }, 500);
    } else if (authMode === 'register') {
      if (!name || !email || !password) {
        setValidationErrors(['Por favor completa todos los campos obligatorios del registro.']);
        setShakeKey(prev => prev + 1);
        showToast('Por favor completa todos los campos obligatorios', 'error');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        register(name, email, password, company);
        setIsAuthModalOpen(false);
        showToast('Cuenta creada y espacio de trabajo configurado con éxito', 'success');
      }, 500);
    } else if (authMode === 'forgot') {
      const trimmedEmail = email.trim();
      if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
        setValidationErrors(['Ingresa un correo electrónico válido para enviar el enlace.']);
        setErrorFields({ email: true });
        setShakeKey(prev => prev + 1);
        showToast('Ingresa tu correo electrónico', 'error');
        return;
      }
      setIsLoading(true);
      setForgotStep('sending');
      setTimeout(() => {
        resetPassword(email);
        setIsLoading(false);
        setForgotStep('sent');
        setForgotSent(true);
        setResendCountdown(45);
        showToast('Correo de restablecimiento enviado', 'success');
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#131722] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden text-xs text-slate-300 relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2130] transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 bg-[#181d2a] border-b border-[#222a3d] text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3 text-blue-400">
            <ClientumLogo className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">Clientum CRM</h2>
          <p className="text-slate-400 text-xs mt-1">
            {authMode === 'login' && 'Ingresa a tu cuenta comercial'}
            {authMode === 'register' && 'Crea tu espacio de trabajo B2B en segundos'}
            {authMode === 'forgot' && 'Restablece tu contraseña de acceso'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Error Summary Banner */}
          <AnimatePresence>
            {validationErrors.length > 0 && (
              <motion.div
                key={`modal-error-summary-${shakeKey}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0, x: [-6, 6, -4, 4, 0] }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Error de validación</span>
                    {failedAttempts > 0 && authMode === 'login' && (
                      <span className="text-[10px] font-mono px-1.5 rounded bg-rose-500/20 text-rose-300">
                        Intento {failedAttempts}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-rose-200/90 pt-0.5">
                    {validationErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {forgotSent ? (
              /* Success Animation */
              <motion.div
                key="modal-forgot-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-4 space-y-3"
              >
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1.6], opacity: [0.5, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white">Enlace de recuperación enviado</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                  Hemos enviado las instrucciones para restablecer tu contraseña a <span className="text-white font-mono font-semibold">{email}</span>.
                </p>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => { setForgotSent(false); setAuthMode('login'); }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    Volver a Iniciar Sesión
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key={`modal-form-${authMode}`}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3.5"
              >
                
                {/* Forgot Password Graphic in Modal */}
                {authMode === 'forgot' && (
                  <div className="p-3.5 rounded-xl bg-[#171e2e] border border-blue-500/20 text-center flex flex-col items-center">
                    <motion.div
                      animate={{
                        rotate: forgotStep === 'sending' ? 360 : 0,
                      }}
                      transition={{ duration: 1, repeat: forgotStep === 'sending' ? Infinity : 0 }}
                      className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-1.5 border border-blue-500/30"
                    >
                      <KeyRound className="w-4 h-4" />
                    </motion.div>
                    <span className="text-xs font-semibold text-white">Recuperar Acceso</span>
                    <span className="text-[11px] text-slate-400">Ingresa tu correo para recibir el enlace seguro</span>
                  </div>
                )}

                {authMode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nombre Completo</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${errorFields.email ? 'text-rose-400' : 'text-slate-400'}`} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className={`w-full bg-[#0a0c10] border rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none ${
                        errorFields.email ? 'border-rose-500' : 'border-[#222a3d] focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                {authMode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-slate-400">Contraseña</label>
                      {authMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => switchMode('forgot')}
                          className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${errorFields.password ? 'text-rose-400' : 'text-slate-400'}`} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-[#0a0c10] border rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none ${
                          errorFields.password ? 'border-rose-500' : 'border-[#222a3d] focus:border-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {authMode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nombre de la Empresa</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Technologies HQ"
                        className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>
                    {isLoading ? (
                      'Procesando...'
                    ) : authMode === 'login' ? (
                      'Iniciar Sesión'
                    ) : authMode === 'register' ? (
                      'Crear Cuenta y Espacio'
                    ) : (
                      'Enviar Enlace de Recuperación'
                    )}
                  </span>
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>

                {authMode === 'login' && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        login('alex.morgan@clientum.dev', 'secret');
                        setIsAuthModalOpen(false);
                        showToast('Sesión iniciada con cuenta demo de prueba', 'success');
                      }}
                      className="w-full py-2 bg-[#1b2230] hover:bg-[#232c42] text-slate-300 font-medium rounded-xl border border-[#2a344d] transition-all text-center cursor-pointer"
                    >
                      🚀 Entrar con Demo Rápida (Alex Morgan)
                    </button>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Mode Switcher */}
          <div className="pt-4 border-t border-[#222a3d] text-center text-[11px] text-slate-400">
            {authMode === 'login' && (
              <p>
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="text-blue-400 font-medium hover:underline cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </p>
            )}
            {authMode === 'register' && (
              <p>
                ¿Ya tienes una cuenta?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-400 font-medium hover:underline cursor-pointer"
                >
                  Inicia sesión
                </button>
              </p>
            )}
            {authMode === 'forgot' && (
              <p>
                ¿Recordaste tu contraseña?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-400 font-medium hover:underline cursor-pointer"
                >
                  Volver al inicio
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

