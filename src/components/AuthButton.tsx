import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogIn, LogOut, Shield, X, Loader2, KeyRound, Mail, UserPlus, CheckCircle2 } from 'lucide-react';

interface SessionUser {
  id: number;
  username: string;
  role: string;
}

interface AuthButtonProps {
  compact?: boolean;
}

export function AuthButton({ compact = false }: AuthButtonProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          const data = await res.json();
          if (data?.user) {
            setUser(data.user);
            return;
          }
        }
      }
      setUser(null);
    } catch (err) {
      console.warn('[AuthButton] Session check failed:', err);
      setUser(null);
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    fetchSession();

    const handleAuthChange = () => {
      fetchSession();
    };

    const handleOpenModal = () => {
      setError(null);
      setSuccessMsg(null);
      setShowModal(true);
    };

    window.addEventListener('auth-changed', handleAuthChange);
    window.addEventListener('open-login-modal', handleOpenModal);
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
      window.removeEventListener('open-login-modal', handleOpenModal);
    };
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const isEmail = usernameOrEmail.includes('@');

      // ── MODE: FORGOT PASSWORD ──
      if (mode === 'forgot') {
        if (!isEmail) {
          throw new Error('Ingrese un correo electrónico válido para restablecer la contraseña.');
        }

        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: usernameOrEmail.trim() }),
        });

        const ct = res.headers.get('content-type');
        let data: any = {};
        if (ct && ct.includes('application/json')) {
          data = await res.json();
        }

        if (!res.ok) {
          throw new Error(data?.error || 'Error al procesar la solicitud de restablecimiento.');
        }

        setSuccessMsg('Si la cuenta existe con ese correo, recibirás un enlace de restablecimiento en breve.');
        return;
      }

      // ── MODE: REGISTER ──
      if (mode === 'register') {
        if (password.length < 8) {
          throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }
        if (password !== confirmPassword) {
          throw new Error('Las contraseñas no coinciden.');
        }

        const endpoint = isEmail ? '/api/auth/neon-register' : '/api/auth/register';
        const body = isEmail
          ? { email: usernameOrEmail.trim(), password, name: usernameOrEmail.split('@')[0] }
          : { username: usernameOrEmail.trim(), password };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const ct = res.headers.get('content-type');
        let data: any = {};
        if (ct && ct.includes('application/json')) {
          data = await res.json();
        }

        if (!res.ok) {
          throw new Error(data?.error || 'Error al registrar el usuario.');
        }

        if (data.user) {
          setUser(data.user);
          setShowModal(false);
          setPassword('');
          setConfirmPassword('');
          window.dispatchEvent(new Event('auth-changed'));
          return;
        }
      }

      // ── MODE: LOGIN ──
      if (mode === 'login') {
        let res: Response;
        if (isEmail) {
          res = await fetch('/api/auth/neon-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: usernameOrEmail.trim(), password }),
          });
        } else {
          res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameOrEmail.trim(), password }),
          });
        }

        const ct = res.headers.get('content-type');
        let data: any = {};
        if (ct && ct.includes('application/json')) {
          data = await res.json();
        }

        if (!res.ok && isEmail) {
          const fallbackRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameOrEmail.trim(), password }),
          });
          const fallbackCt = fallbackRes.headers.get('content-type');
          if (fallbackCt && fallbackCt.includes('application/json')) {
            const fallbackData = await fallbackRes.json();
            if (fallbackRes.ok && fallbackData.user) {
              setUser(fallbackData.user);
              setShowModal(false);
              setPassword('');
              window.dispatchEvent(new Event('auth-changed'));
              return;
            }
          }
        }

        if (!res.ok) {
          throw new Error(data?.error || 'Usuario o contraseña incorrectos.');
        }

        if (data.user) {
          setUser(data.user);
          setShowModal(false);
          setPassword('');
          window.dispatchEvent(new Event('auth-changed'));
          return;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      setUser(null);
      window.dispatchEvent(new Event('auth-changed'));
    } catch (err) {
      console.error('[AuthButton] Error logging out:', err);
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setUsernameOrEmail('admin');
    setPassword('password');
    setError(null);
    setSuccessMsg(null);
  };

  const renderModal = () => (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowModal(false);
      }}
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl my-auto text-left text-white animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding header with Clientum logo */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#0A2558] border border-slate-700/80 p-2 shadow-lg mb-3 flex items-center justify-center">
            <img src="/favicon.svg" alt="Clientum Logo" className="w-8 h-8" referrerPolicy="no-referrer" />
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white leading-none">
            CLIENTUM <span className="text-emerald-400 font-extrabold text-xs ml-1 uppercase">CRM</span>
          </span>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            {mode === 'login' ? 'Accedé a tu consola y plataforma' : (mode === 'register' ? 'Creá tu cuenta en el sistema' : 'Restablecer acceso a tu cuenta')}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-950 rounded-xl p-1 mb-4 border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${mode === 'login' ? 'bg-[#1A3461] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${mode === 'register' ? 'bg-[#1A3461] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Registrarse
          </button>
        </div>

        {/* Google / Better Auth Quick Login */}
        <div className="mb-4">
          <a
            href="/api/auth/google/login"
            className="w-full bg-slate-950 hover:bg-slate-800 text-white border border-slate-700/80 text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-sm hover:border-slate-500 no-underline"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google</span>
          </a>
          <div className="relative flex py-2.5 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">o ingresar con usuario</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {mode === 'forgot' ? 'Correo Electrónico Registrado' : 'Usuario o Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder={mode === 'forgot' ? 'tu@email.com' : 'usuario o usuario@email.com'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Contraseña</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs pt-0.5">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors underline cursor-pointer"
              >
                Autocompletar acceso Admin
              </button>
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(null); setSuccessMsg(null); }}
                className="text-[11px] text-emerald-400 hover:underline cursor-pointer font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {mode === 'forgot' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
                className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
              >
                Volver a Iniciar sesión
              </button>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Contraseña</label>
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
          )}

          {error && (
            <div className="bg-rose-950/80 border border-rose-800/90 rounded-xl p-3 text-xs text-rose-300 leading-snug">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/80 border border-emerald-800/90 rounded-xl p-3 text-xs text-emerald-300 leading-snug flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer border-0"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Procesando...</span></>
            ) : (
              <>
                {mode === 'forgot' ? <Mail className="w-4 h-4" /> : (mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />)}
                <span>{mode === 'forgot' ? 'Enviar enlace de restablecimiento' : (mode === 'login' ? 'Ingresar al sistema' : 'Crear mi cuenta')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );

  /* ── COMPACT MODE ── */
  if (compact) {
    if (checkingSession) {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
          <span className="hidden sm:inline">Verificando...</span>
        </div>
      );
    }
    if (user) {
      return (
        <>
          <div className="flex items-center gap-2 px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-[#1A3461] text-white flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-xs font-bold text-slate-700 max-w-[100px] truncate">{user.username}</span>
            {user.role === 'admin' && (
              <span className="hidden lg:inline bg-amber-100 text-amber-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">Admin</span>
            )}
            <button
              onClick={handleSignOut}
              disabled={loading}
              title="Cerrar sesión"
              className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
          {showModal && renderModal()}
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => { setError(null); setSuccessMsg(null); setShowModal(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer border-0"
        >
          <LogIn className="w-3.5 h-3.5 text-emerald-600" />
          <span>Iniciar sesión</span>
        </button>
        {showModal && renderModal()}
      </>
    );
  }

  /* ── STANDARD MODE ── */
  if (checkingSession) {
    return (
      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-400">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
        <span>Verificando...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
        <div className="w-7 h-7 rounded-full bg-[#1A3461] text-white flex items-center justify-center font-bold text-xs shadow-sm">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-xs font-bold text-slate-900 truncate max-w-[130px] flex items-center gap-1.5">
            {user.username}
            {user.role === 'admin' && (
              <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                Admin
              </span>
            )}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" /> Sesión Activa
          </div>
        </div>
        <button
          onClick={handleSignOut}
          disabled={loading}
          title="Cerrar sesión"
          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => { setError(null); setSuccessMsg(null); setShowModal(true); }}
        className="inline-flex items-center space-x-2 bg-[#1A3461] hover:bg-[#0A2558] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer border-0"
      >
        <LogIn className="w-3.5 h-3.5 text-emerald-400" />
        <span>Iniciar sesión</span>
      </button>
      {showModal && createPortal(renderModal(), document.body)}
    </>
  );
}
