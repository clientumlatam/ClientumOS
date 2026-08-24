import { ClientumLogo } from "../common/ClientumLogo";
import React, { useState } from 'react';
import { z } from 'zod';
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
  Bot,
  Zap,
  Kanban,
  CreditCard,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { Language } from '../../types';

// Zod schema for password validation
const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial (!@#$%)');

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
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay but ensure we navigate cleanly
    setTimeout(() => {
      try {
        if (authMode === 'login') {
          if (!email) {
            showToast('Por favor ingresa tu correo electrónico', 'error');
            setIsLoading(false);
            return;
          }
          if (!password) {
            showToast('Por favor ingresa tu contraseña', 'error');
            setIsLoading(false);
            return;
          }
          login(email, password);
          showToast('¡Bienvenido a ClientumCRM!', 'success');
        } else if (authMode === 'register') {
          if (!name || !email || !password) {
            showToast('Por favor completa todos los campos requeridos', 'error');
            setIsLoading(false);
            return;
          }
          
          // Zod Password Validation
          passwordSchema.parse(password);

          register(name, email, password, company);
          showToast('Cuenta de ClientumCRM creada con éxito', 'success');
        } else if (authMode === 'forgot') {
          if (!email) {
            showToast('Ingresa tu correo para recuperar la contraseña', 'error');
            setIsLoading(false);
            return;
          }
          resetPassword(email);
          setForgotSent(true);
          showToast('Enlace de restablecimiento enviado', 'success');
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error instanceof z.ZodError) {
          const msg = error.issues?.[0]?.message || (error as any).errors?.[0]?.message || 'Error de validación';
          showToast(msg, 'error');
        } else {
          showToast(error?.message || 'Ha ocurrido un error inesperado', 'error');
        }
      }
    }, 500);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login(`user@${provider}.com`, 'oauth-secret');
      showToast(`Autenticado exitosamente con ${provider}`, 'success');
    }, 500);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
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
                  type="button"
                  onClick={() => { setAuthMode('login'); setForgotSent(false); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setForgotSent(false); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Registrarse
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('forgot'); setForgotSent(false); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    authMode === 'forgot'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reestablecer
                </button>
              </div>

              {/* Form Views */}
              {authMode === 'forgot' && forgotSent ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Enlace de recuperación enviado</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Hemos enviado las instrucciones para restablecer tu contraseña a <span className="text-white font-mono">{email}</span>.
                    </p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setAuthMode('login');
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
                    >
                      Volver a Iniciar Sesión en ClientumCRM
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name field for Register */}
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full bg-[#080a0f] border border-[#212839] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.morgan@clientum.dev"
                        className="w-full bg-[#080a0f] border border-[#212839] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                            type="button"
                            onClick={() => setAuthMode('forgot')}
                            className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#080a0f] border border-[#212839] rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                        <button
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
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    <span>
                      {isLoading
                        ? 'Procesando en ClientumCRM...'
                        : authMode === 'login'
                        ? 'Iniciar Sesión en ClientumCRM'
                        : authMode === 'register'
                        ? 'Crear Cuenta en ClientumCRM'
                        : 'Enviar Enlace de Restablecimiento'}
                    </span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
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
                </form>
              )}

              {/* Mode Switcher Footer Links */}
              <div className="mt-5 pt-4 border-t border-[#1b2230] text-center text-xs text-slate-400">
                {authMode === 'login' && (
                  <p>
                    ¿Aún no tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
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
                      type="button"
                      onClick={() => setAuthMode('login')}
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
                      type="button"
                      onClick={() => setAuthMode('login')}
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
