import { ClientumLogo } from "../common/ClientumLogo";
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Globe,
  Zap,
  Kanban,
  CreditCard,
  MessageSquare,
  Compass,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Send,
  HelpCircle,
  Check,
  X,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { Language } from '@clientum/types';

// Zod schema for password validation
const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial (!@#$%)');

// Email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AuthScreen: React.FC = () => {
  const { login, register, resetPassword, showToast, language, setLanguage } = useCRM();

  // Mode: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [email, setEmail] = useState('alex.morgan@clientum.dev');
  const [password, setPassword] = useState('clientum2026');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password animation states
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotStep, setForgotStep] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Validation & Error summary states
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [errorFields, setErrorFields] = useState<{ email?: boolean; password?: boolean; name?: boolean }>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  // Countdown timer for forgot password resend
  useEffect(() => {
    let timer: any;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Clear validation errors when inputs change
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

  const handleNameChange = (val: string) => {
    setName(val);
    if (validationErrors.length > 0) {
      setValidationErrors([]);
      setErrorFields(prev => ({ ...prev, name: false }));
    }
  };

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setAuthMode(newMode);
    setValidationErrors([]);
    setErrorFields({});
    setForgotSent(false);
    setForgotStep('idle');
  };

  const validateLoginForm = (): boolean => {
    const errors: string[] = [];
    const fields: { email?: boolean; password?: boolean } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.push('El correo electrónico es requerido.');
      fields.email = true;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('El formato del correo electrónico no es válido (ej: usuario@dominio.com).');
      fields.email = true;
    }

    if (!password) {
      errors.push('La contraseña es requerida para iniciar sesión.');
      fields.password = true;
    } else if (password.length < 6) {
      errors.push('La contraseña ingresada es demasiado corta (mínimo 6 caracteres).');
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

  const validateForgotForm = (): boolean => {
    const errors: string[] = [];
    const fields: { email?: boolean } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.push('Por favor ingresa tu correo electrónico para enviar el enlace.');
      fields.email = true;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('Ingresa una dirección de correo válida para recuperar la contraseña.');
      fields.email = true;
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setErrorFields(fields);
      setShakeKey(prev => prev + 1);
      return false;
    }

    return true;
  };

  const validateRegisterForm = (): boolean => {
    const errors: string[] = [];
    const fields: { email?: boolean; password?: boolean; name?: boolean } = {};

    if (!name.trim()) {
      errors.push('El nombre completo es obligatorio.');
      fields.name = true;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.push('El correo electrónico es obligatorio.');
      fields.email = true;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('El correo ingresado no tiene un formato válido.');
      fields.email = true;
    }

    if (!password) {
      errors.push('La contraseña es obligatoria.');
      fields.password = true;
    } else {
      try {
        passwordSchema.parse(password);
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          err.issues.forEach(issue => errors.push(issue.message));
          fields.password = true;
        }
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setErrorFields(fields);
      setShakeKey(prev => prev + 1);
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
        // Verify demo / valid login
        if (email.trim() && password) {
          login(email, password);
          showToast('¡Bienvenido a ClientumCRM!', 'success');
        } else {
          setValidationErrors([
            'Credenciales no reconocidas en el espacio de trabajo.',
            'Verifica tu correo electrónico o restablece tu clave.',
          ]);
          setErrorFields({ email: true, password: true });
          setShakeKey(prev => prev + 1);
          setFailedAttempts(prev => prev + 1);
          showToast('Error de autenticación: verifica tus datos', 'error');
        }
      }, 500);

    } else if (authMode === 'register') {
      if (!validateRegisterForm()) {
        showToast('Por favor completa todos los campos requeridos', 'error');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        register(name, email, password, company);
        showToast('Cuenta de ClientumCRM creada con éxito', 'success');
      }, 500);

    } else if (authMode === 'forgot') {
      if (!validateForgotForm()) {
        showToast('Ingresa un correo válido para recuperar tu acceso', 'error');
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
        showToast('Enlace de restablecimiento enviado con éxito', 'success');
      }, 900);
    }
  };

  const handleResendForgot = () => {
    if (resendCountdown > 0) return;
    setIsLoading(true);
    setForgotStep('sending');
    setTimeout(() => {
      resetPassword(email);
      setIsLoading(false);
      setForgotStep('sent');
      setResendCountdown(60);
      showToast('Nuevo enlace enviado a tu bandeja de entrada', 'success');
    }, 700);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login(`user@${provider.toLowerCase()}.com`, 'oauth-secret');
      showToast(`Autenticado exitosamente con ${provider}`, 'success');
    }, 500);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setValidationErrors([]);
    setErrorFields({});
    setTimeout(() => {
      login('alex.morgan@clientum.dev', 'secret');
      showToast('Acceso rápido a ClientumCRM concedido', 'success');
    }, 400);
  };

  return (
    <div className="min-h-screen w-screen bg-[#07090e] text-slate-200 flex flex-col justify-between overflow-x-hidden selection:bg-blue-600 selection:text-white font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-[#0d1017] rounded-[11px] flex items-center justify-center">
              <ClientumLogo className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              ClientumCRM
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PRO
              </span>
            </span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#121622] border border-[#202738] rounded-xl p-1 text-xs text-slate-300 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['es', 'pt', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                id={`lang-btn-${lang}`}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Value Proposition & Highlights */}
          <div className="lg:col-span-6 space-y-6 text-left hidden lg:block pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Plataforma Todo-en-Uno ClientumCRM</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Potencia tu ciclo comercial con <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">ClientumCRM</span>
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed">
              Gestión inteligente de embudos de ventas, prospección de clientes con Google Maps, bots conversacionales de WhatsApp 24/7, scoring MEDDIC y facturación electrónica en un único ecosistema.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#10141f]/80 border border-[#1d2436] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <Kanban className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Pipeline Kanban</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Control visual y pronóstico con MEDDIC</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#10141f]/80 border border-[#1d2436] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">WhatsApp 24/7</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Respuestas y cierre con agentes de IA</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#10141f]/80 border border-[#1d2436] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Maps Prospector</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Extracción y contacto de negocios locales</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#10141f]/80 border border-[#1d2436] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">AFIP & Mercado Pago</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Facturación y cobros automáticos</p>
                </div>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Autenticación cifrada, sesiones protegidas y respaldo en la nube.</span>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="bg-[#0f131d]/90 backdrop-blur-xl border border-[#21293c] rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden">
              
              {/* Header Title inside card */}
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
                  <ClientumLogo className="w-5 h-5" />
                  ClientumCRM
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {authMode === 'login' && 'Ingresa a tu espacio de trabajo comercial'}
                  {authMode === 'register' && 'Crea tu cuenta empresarial en segundos'}
                  {authMode === 'forgot' && 'Recupera el acceso a tu cuenta'}
                </p>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="flex rounded-xl bg-[#080a0f] p-1 border border-[#1b212f] mb-5">
                <button
                  id="tab-btn-login"
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  id="tab-btn-register"
                  type="button"
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Registrarse
                </button>
                <button
                  id="tab-btn-forgot"
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'forgot'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reestablecer
                </button>
              </div>

              {/* Error Validation Summary Box */}
              <AnimatePresence>
                {validationErrors.length > 0 && (
                  <motion.div
                    key={`error-summary-${shakeKey}`}
                    id="auth-error-summary"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      x: [-6, 6, -4, 4, -2, 2, 0],
                    }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs relative overflow-hidden shadow-lg shadow-rose-950/20"
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-xs">
                              {authMode === 'login'
                                ? 'Error de validación al iniciar sesión'
                                : authMode === 'register'
                                ? 'Corrige los datos del registro'
                                : 'Error en recuperación de contraseña'}
                            </h4>
                            {failedAttempts > 0 && authMode === 'login' && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Intento {failedAttempts}
                              </span>
                            )}
                          </div>
                          
                          <ul className="space-y-1 text-[11px] text-rose-200/90 list-disc list-inside pt-0.5">
                            {validationErrors.map((err, idx) => (
                              <li key={idx} className="leading-snug">
                                {err}
                              </li>
                            ))}
                          </ul>

                          {/* Actionable tip for login mode */}
                          {authMode === 'login' && (
                            <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-rose-300/80">
                              <HelpCircle className="w-3 h-3 text-rose-400 shrink-0" />
                              <span>
                                ¿Problemas para acceder? Puedes usar{' '}
                                <button
                                  type="button"
                                  onClick={() => switchMode('forgot')}
                                  className="underline font-semibold text-white hover:text-rose-100 cursor-pointer"
                                >
                                  ¿Olvidaste tu contraseña?
                                </button>{' '}
                                o el botón de Demo Rápida.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Close error summary button */}
                      <button
                        type="button"
                        id="dismiss-error-btn"
                        onClick={() => setValidationErrors([])}
                        className="text-rose-400 hover:text-white p-0.5 rounded-lg hover:bg-rose-500/20 transition-colors cursor-pointer shrink-0"
                        title="Descartar advertencia"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Views with Animated Transitions */}
              <AnimatePresence mode="wait">
                {authMode === 'forgot' && forgotSent ? (
                  /* ================= FORGOT PASSWORD SUCCESS ANIMATION ================= */
                  <motion.div
                    key="forgot-success-view"
                    id="forgot-password-success"
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-4 space-y-4"
                  >
                    {/* Animated Keyhole & Radar Radiance */}
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      {/* Radiating Ripple Rings */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                      />
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: [0.9, 1.25, 1.5], opacity: [0.5, 0.2, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, delay: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-blue-500/20 border border-blue-500/30"
                      />

                      {/* Floating Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                        className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[2px] shadow-xl shadow-emerald-900/40"
                      >
                        <div className="w-full h-full bg-[#0d121c] rounded-[14px] flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                      </motion.div>

                      {/* Sparkle effects */}
                      <motion.div
                        animate={{ y: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="absolute -top-1 -right-1 text-amber-400"
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <div className="space-y-1.5">
                      <motion.h3
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-base font-bold text-white tracking-tight"
                      >
                        ¡Enlace de recuperación enviado!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto"
                      >
                        Hemos despachado las instrucciones de restablecimiento de contraseña a:{' '}
                        <span className="text-white font-mono font-semibold block mt-1 px-2 py-1 rounded bg-[#141a27] border border-[#212b3f] break-all">
                          {email}
                        </span>
                      </motion.p>
                    </div>

                    {/* Resend Actions & Return */}
                    <div className="pt-2 space-y-2.5">
                      <button
                        id="resend-forgot-btn"
                        type="button"
                        onClick={handleResendForgot}
                        disabled={isLoading || resendCountdown > 0}
                        className="w-full py-2 bg-[#121622] hover:bg-[#1a2030] border border-[#212839] text-slate-300 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
                        <span>
                          {resendCountdown > 0
                            ? `Reenviar en ${resendCountdown}s`
                            : '¿No recibiste el correo? Reenviar'}
                        </span>
                      </button>

                      <button
                        id="back-to-login-btn"
                        type="button"
                        onClick={() => switchMode('login')}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                      >
                        <span>Volver a Iniciar Sesión</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ================= FORM (LOGIN / REGISTER / FORGOT) ================= */
                  <motion.form
                    key={`form-${authMode}`}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: authMode === 'login' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: authMode === 'login' ? 10 : -10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    
                    {/* Animated Forgot Password Banner / Graphic */}
                    {authMode === 'forgot' && (
                      <motion.div
                        id="forgot-password-animation"
                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-[#121827] to-[#0d121c] border border-blue-500/20 text-center relative overflow-hidden"
                      >
                        <div className="relative z-10 flex flex-col items-center">
                          <motion.div
                            animate={{
                              rotate: forgotStep === 'sending' ? 360 : 0,
                              scale: forgotStep === 'sending' ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: forgotStep === 'sending' ? 1 : 0.4, repeat: forgotStep === 'sending' ? Infinity : 0 }}
                            className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2 shadow-inner"
                          >
                            <KeyRound className="w-5 h-5" />
                          </motion.div>
                          <h3 className="text-xs font-bold text-white">Recuperación de Contraseña</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Ingresa tu correo institucional para recibir un enlace de restablecimiento seguro.
                          </p>
                        </div>
                        {/* Shimmer line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                      </motion.div>
                    )}

                    {/* Name field for Register */}
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                          Nombre Completo
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="input-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Alex Morgan"
                            className={`w-full bg-[#080a0f] border rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                              errorFields.name
                                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-950/10'
                                : 'border-[#212839] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Company field for Register */}
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                          Nombre de la Empresa u Organización
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="input-company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Clientum Tech Latam"
                            className="w-full bg-[#080a0f] border border-[#212839] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email Field (All modes) */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                          errorFields.email ? 'text-rose-400' : 'text-slate-400'
                        }`} />
                        <input
                          id="input-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder="alex.morgan@clientum.dev"
                          className={`w-full bg-[#080a0f] border rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                            errorFields.email
                              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-950/10'
                              : 'border-[#212839] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Password Field (Login & Register) */}
                    {authMode !== 'forgot' && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-semibold text-slate-300">
                            Contraseña
                          </label>
                          {authMode === 'login' && (
                            <button
                              id="forgot-password-link"
                              type="button"
                              onClick={() => switchMode('forgot')}
                              className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                            >
                              ¿Olvidaste tu contraseña?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                            errorFields.password ? 'text-rose-400' : 'text-slate-400'
                          }`} />
                          <input
                            id="input-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="••••••••"
                            className={`w-full bg-[#080a0f] border rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                              errorFields.password
                                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-950/10'
                                : 'border-[#212839] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            }`}
                          />
                          <button
                            id="toggle-password-visibility-btn"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Main Action Submit Button */}
                    <button
                      id="auth-submit-btn"
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      <span>
                        {isLoading
                          ? authMode === 'forgot'
                            ? 'Despachando enlace seguro...'
                            : 'Procesando en ClientumCRM...'
                          : authMode === 'login'
                          ? 'Iniciar Sesión en ClientumCRM'
                          : authMode === 'register'
                          ? 'Crear Cuenta en ClientumCRM'
                          : 'Enviar Enlace de Restablecimiento'}
                      </span>
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      ) : authMode === 'forgot' ? (
                        <Send className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* OAuth Buttons (Only show in login and register modes) */}
                    {(authMode === 'login' || authMode === 'register') && (
                      <div className="pt-3 pb-1">
                        <div className="relative flex items-center mb-4">
                          <div className="flex-grow border-t border-[#1b2230]"></div>
                          <span className="flex-shrink-0 mx-4 text-[10px] text-slate-500 font-medium">o continuar con</span>
                          <div className="flex-grow border-t border-[#1b2230]"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            id="oauth-google-btn"
                            type="button"
                            onClick={() => handleOAuthLogin('Google')}
                            disabled={isLoading}
                            className="w-full py-2 bg-[#121622] hover:bg-[#1a2030] border border-[#212839] text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              <path fill="none" d="M1 1h22v22H1z"/>
                            </svg>
                            <span>Google</span>
                          </button>
                          <button
                            id="oauth-github-btn"
                            type="button"
                            onClick={() => handleOAuthLogin('GitHub')}
                            disabled={isLoading}
                            className="w-full py-2 bg-[#121622] hover:bg-[#1a2030] border border-[#212839] text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quick 1-Click Demo Button for instant testing */}
                    {authMode === 'login' && (
                      <div className="pt-2 border-t border-[#1a202d] space-y-2">
                        <button
                          id="quick-demo-btn"
                          type="button"
                          onClick={handleQuickDemo}
                          disabled={isLoading}
                          className="w-full py-2.5 px-4 bg-[#141926] hover:bg-[#1a2234] border border-[#263148] text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span>🚀 Acceso Inmediato Demo (Alex Morgan)</span>
                        </button>
                        <p className="text-[10px] text-center text-slate-500">
                          Accede al instante para evaluar todas las funciones de ClientumCRM sin registro previo.
                        </p>
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Mode Switcher Footer Links */}
              <div className="mt-5 pt-4 border-t border-[#1b2230] text-center text-xs text-slate-400">
                {authMode === 'login' && (
                  <p>
                    ¿Aún no tienes cuenta?{' '}
                    <button
                      id="switch-to-register-btn"
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-blue-400 font-semibold hover:underline cursor-pointer ml-1"
                    >
                      Regístrate gratis
                    </button>
                  </p>
                )}
                {authMode === 'register' && (
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      id="switch-to-login-btn"
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-blue-400 font-semibold hover:underline cursor-pointer ml-1"
                    >
                      Inicia sesión
                    </button>
                  </p>
                )}
                {authMode === 'forgot' && !forgotSent && (
                  <p>
                    ¿Recordaste tu clave?{' '}
                    <button
                      id="switch-to-login-from-forgot-btn"
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-blue-400 font-semibold hover:underline cursor-pointer ml-1"
                    >
                      Volver a Iniciar Sesión
                    </button>
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 px-6 border-t border-[#141824] bg-[#07090e]/80 text-center text-[11px] text-slate-500">
        <p>
          © 2026 <strong className="text-slate-400 font-medium">ClientumCRM</strong>. Todos los derechos reservados. Plataforma segura de gestión comercial y ERP.
        </p>
      </footer>
    </div>
  );
};

