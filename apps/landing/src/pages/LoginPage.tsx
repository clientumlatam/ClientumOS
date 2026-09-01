import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Sparkles,
  Globe,
  LayoutDashboard,
  Zap,
  Building2,
  Users,
  ShieldCheck
} from 'lucide-react';
import { signInWithGoogle } from '@clientum/types';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '@clientum/ui';

interface LoginPageProps {
  onLoginSuccess?: (user: { id: number; username: string; role: string }) => void;
  currentUser?: string | null;
}

type AuthMode = 'login' | 'register' | 'demo' | 'forgot' | 'reset';

export function LoginPage({ onLoginSuccess, currentUser }: LoginPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isPortuguese } = useLanguage();

  const [mode, setMode] = useState<AuthMode>(() => {
    if (searchParams.get('reset_token')) return 'reset';
    if (searchParams.get('mode') === 'register') return 'register';
    if (searchParams.get('mode') === 'demo') return 'demo';
    return 'login';
  });

  const [resetToken] = useState<string>(() => searchParams.get('reset_token') || '');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // If already logged in, offer quick jump to dashboard
  useEffect(() => {
    if (currentUser && !searchParams.get('switch')) {
      // User is already logged in, navigate to dashboard
      // navigate('/app');
    }
  }, [currentUser]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleTraditionalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError(isPortuguese ? 'As senhas não coincidem.' : 'Las contraseñas no coinciden.');
        return;
      }
      if (password.length < 8) {
        setError(isPortuguese ? 'A senha deve ter pelo menos 8 caracteres.' : 'La contraseña debe tener al menos 8 caracteres.');
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload: any = {
        username: usernameOrEmail.trim(),
        password: password
      };
      if (mode === 'register' && name.trim()) {
        payload.name = name.trim();
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || (isPortuguese ? 'Erro ao processar autenticação.' : 'Error al procesar autenticación.'));
      }

      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: data.user } }));
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
      navigate('/app');
    } catch (err: any) {
      setError(err.message || (isPortuguese ? 'Ocorreu um erro inesperado.' : 'Ocurrió un error inesperado.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, username: role === 'admin' ? 'admin' : 'demo' })
      });
      const data = await res.json();
      const user = data?.user || { id: role === 'admin' ? 1 : 2, username: role === 'admin' ? 'admin' : 'demo', role };
      
      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user } }));
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      navigate('/app');
    } catch (err: any) {
      console.warn('[Demo login fallback]', err);
      const fallbackUser = { id: 1, username: 'admin', role: 'admin' };
      window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: fallbackUser } }));
      navigate('/app');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential?.user;
      if (user) {
        const token = await user.getIdToken();
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            email: user.email,
            name: user.displayName,
            picture: user.photoURL
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Error autenticando con Google.');

        window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: data.user } }));
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
        navigate('/app');
      }
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      // If popup fails or is blocked in iframe, offer direct demo login
      setError(
        isPortuguese
          ? 'Não foi possível conectar com o Google no ambiente atual. Você pode usar o Acesso Rápido Demo abaixo.'
          : 'No se pudo completar el acceso con Google en este entorno. Puedes usar el Acceso Rápido Demo a continuación.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usernameOrEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error enviando correo de recuperación.');
      setSuccess(
        isPortuguese
          ? 'Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.'
          : 'Si el correo está registrado, recibirás un enlace de recuperación en los próximos minutos.'
      );
    } catch (err: any) {
      setError(err.message || 'Error al procesar solicitud.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-[#0d1829] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all';
  const inputWithIconCls = inputCls.replace('px-4', 'pl-10 pr-4');

  return (
    <div className="min-h-screen w-full bg-[#071120] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1A3461]/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Bar with Public Website Link & Language Selector */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-pointer"
            title="Volver al Sitio Web Público"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0A2558] border border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-emerald-500 transition-colors">
              <img src="/favicon.svg" alt="Clientum Logo" className="w-6 h-6" referrerPolicy="no-referrer" />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-sm tracking-tight text-white block">
                CLIENTUM CRM
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold block">
                Plataforma de Operaciones &amp; IA
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="pill" />

          {/* Quick Back to Public Site */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isPortuguese ? 'Ver Site Público' : 'Ver Sitio Público'}</span>
          </button>
        </div>
      </header>

      {/* Main Login Content Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-auto">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-[#0b1728]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header / Intro */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A2558] to-[#1A3461] border border-emerald-500/30 mb-3 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                <LayoutDashboard className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {mode === 'login' && (isPortuguese ? 'Acessar o Painel CRM' : 'Ingresar al Dashboard CRM')}
                {mode === 'register' && (isPortuguese ? 'Criar Nova Conta' : 'Crear Nueva Cuenta')}
                {mode === 'demo' && (isPortuguese ? 'Acesso Rápido Demo' : 'Acceso Rápido Demo')}
                {mode === 'forgot' && (isPortuguese ? 'Recuperar Senha' : 'Recuperar Contraseña')}
                {mode === 'reset' && (isPortuguese ? 'Definir Nova Senha' : 'Nueva Contraseña')}
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                {mode === 'login' && (isPortuguese ? 'Gerencie clientes, faturamento AFIP e IA comercial' : 'Gestiona clientes, facturación AFIP e IA comercial')}
                {mode === 'register' && (isPortuguese ? 'Comece com 14 dias de teste do plano Pro' : 'Comienza con 14 días de prueba de la suite Pro')}
                {mode === 'demo' && (isPortuguese ? 'Explore todas as ferramentas em 1 clique sem cadastro' : 'Explora todas las herramientas en 1 clic sin registro')}
                {mode === 'forgot' && (isPortuguese ? 'Enviaremos instruções para o seu e-mail' : 'Te enviaremos instrucciones a tu correo')}
                {mode === 'reset' && (isPortuguese ? 'Insira sua nova chave de acesso' : 'Ingresa tu nueva clave de acceso')}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            {(mode === 'login' || mode === 'register' || mode === 'demo') && (
              <div className="flex bg-slate-900/80 rounded-2xl p-1 mb-6 border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isPortuguese ? 'Entrar' : 'Iniciar Sesión'}
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('demo')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    mode === 'demo'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isPortuguese ? 'Registrar' : 'Registro'}
                </button>
              </div>
            )}

            {/* Back button for forgot mode */}
            {(mode === 'forgot' || mode === 'reset') && (
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isPortuguese ? 'Voltar ao login' : 'Volver al inicio de sesión'}</span>
              </button>
            )}

            {/* ══ DEMO QUICK ACCESS MODE ══ */}
            {mode === 'demo' && (
              <div className="space-y-3.5">
                <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-2xl p-4 text-xs">
                  <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isPortuguese ? 'Acesso Imediato sem Senha' : 'Acceso Inmediato sin Contraseña'}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {isPortuguese
                      ? 'Clique abaixo para entrar instantaneamente na plataforma completa com dados de demonstração (clientes, pipelines, relatórios e agentes de IA).'
                      : 'Haz clic abajo para entrar al instante en la plataforma completa con datos precargados (clientes, pipelines, reportes y agentes de IA).'}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleDemoLogin('admin')}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#1A3461] to-[#0A2558] hover:from-[#234580] hover:to-[#0f3475] border border-blue-500/30 text-white font-bold text-xs transition-all shadow-lg hover:scale-[1.01] cursor-pointer group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm flex items-center gap-1.5">
                        <span>{isPortuguese ? 'Entrar como Administrador' : 'Entrar como Administrador'}</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md uppercase font-black">Full Suite</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-normal">Acceso total a CRM, ERP, AFIP, WhatsApp IA y CMDB</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleDemoLogin('user')}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">{isPortuguese ? 'Entrar como Executivo Comercial' : 'Entrar como Ejecutivo Comercial'}</div>
                      <p className="text-[10px] text-slate-400 font-normal">Pipeline de ventas, prospección Maps y plantillas</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {isPortuguese ? 'Prefiro usar minhas credenciais →' : 'Prefiero usar mis credenciales registradas →'}
                  </button>
                </div>
              </div>
            )}

            {/* ══ LOGIN & REGISTER FORM ══ */}
            {(mode === 'login' || mode === 'register') && (
              <form onSubmit={handleTraditionalAuth} className="space-y-4">
                {/* Name (register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      {isPortuguese ? 'Nome Completo / Empresa' : 'Nombre Completo / Empresa'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jonathan Ledantes"
                      className={inputCls}
                    />
                  </div>
                )}

                {/* Email / Username */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    {isPortuguese ? 'E-mail ou Usuário' : 'Email o Usuario'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      required
                      autoComplete="username"
                      placeholder={isPortuguese ? 'voce@empresa.com' : 'admin@clientum.com.ar'}
                      className={inputWithIconCls}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isPortuguese ? 'Senha' : 'Contraseña'}
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="text-[10px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {isPortuguese ? 'Esqueceu a senha?' : '¿Olvidaste tu contraseña?'}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      placeholder="••••••••"
                      className="w-full bg-[#0d1829] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      {isPortuguese ? 'Confirmar Senha' : 'Confirmar Contraseña'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className={inputWithIconCls}
                      />
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="text-xs text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded-xl p-3 leading-relaxed">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl py-3 text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? (isPortuguese ? 'Entrar no Dashboard' : 'Ingresar al Dashboard') : (isPortuguese ? 'Criar Conta Gratuita' : 'Crear Cuenta')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-[#0b1728] px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    {isPortuguese ? 'ou' : 'o'}
                  </span>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold rounded-xl py-2.5 text-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isPortuguese ? 'Entrar com o Google Workspace' : 'Continuar con Google Workspace'}</span>
                </button>
              </form>
            )}

            {/* ══ FORGOT PASSWORD FORM ══ */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                {success ? (
                  <div className="text-center py-4 space-y-3">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-xs text-slate-300 leading-relaxed">{success}</p>
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="mt-2 text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      {isPortuguese ? 'Voltar ao login' : 'Volver al inicio de sesión'}
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isPortuguese
                        ? 'Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.'
                        : 'Ingresa tu correo electrónico registrado y te enviaremos un enlace de restablecimiento.'}
                    </p>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          value={usernameOrEmail}
                          onChange={(e) => setUsernameOrEmail(e.target.value)}
                          required
                          placeholder="admin@clientum.com.ar"
                          className={inputWithIconCls}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-xs text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded-xl p-3 leading-relaxed">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-black rounded-xl py-3 text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <>
                          <span>{isPortuguese ? 'Enviar Link de Redefinição' : 'Enviar Enlace de Recuperación'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Bottom info badges */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-500" />
                TLS 1.3 / AES-256
              </span>
              <span>PostgreSQL &amp; Neon Auth</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 text-center py-4 border-t border-slate-800/60 text-slate-500 text-xs flex flex-wrap items-center justify-center gap-4 px-4">
        <span>&copy; {new Date().getFullYear()} Clientum Latam. Todos los derechos reservados.</span>
        <button onClick={() => navigate('/')} className="text-emerald-400 hover:underline cursor-pointer">
          {isPortuguese ? 'Ir para o Site Público' : 'Ir al Sitio Web Público'}
        </button>
      </footer>
    </div>
  );
}
