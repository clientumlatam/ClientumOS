import React, { useState } from 'react';
import { ClientumLogo } from "../common/ClientumLogo";
import { KeyRound, Mail, Lock, User, Building, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, resetPassword, showToast } = useCRM();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('alex.morgan@clientum.dev');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'login') {
        login(email, password);
        setIsAuthModalOpen(false);
        showToast('¡Bienvenido de vuelta a Clientum CRM / ClientumOS!', 'success');
      } else if (authMode === 'register') {
        if (!name || !email || !password) {
          showToast('Por favor completa todos los campos obligatorios', 'error');
          return;
        }
        register(name, email, password, company);
        setIsAuthModalOpen(false);
        showToast('Cuenta creada y espacio de trabajo configurado con éxito', 'success');
      } else if (authMode === 'forgot') {
        if (!email) {
          showToast('Ingresa tu correo electrónico', 'error');
          return;
        }
        resetPassword(email);
        setForgotSent(true);
        showToast('Correo de restablecimiento enviado', 'success');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#131722] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden text-xs text-slate-300">
        
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
          {forgotSent ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Enlace de recuperación enviado</h3>
              <p className="text-slate-400 text-xs">
                Hemos enviado las instrucciones para restablecer tu contraseña a <span className="text-white font-mono">{email}</span>.
              </p>
              <button
                onClick={() => { setForgotSent(false); setAuthMode('login'); }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors w-full cursor-pointer"
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
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
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
                className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isLoading ? 'Procesando...' : authMode === 'login' ? 'Iniciar Sesión' : authMode === 'register' ? 'Crear Cuenta y Espacio' : 'Enviar Enlace de Recuperación'}
                </span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
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
            </form>
          )}

          {/* Mode Switcher */}
          <div className="pt-4 border-t border-[#222a3d] text-center text-[11px] text-slate-400">
            {authMode === 'login' && (
              <p>
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={() => setAuthMode('register')}
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
                  onClick={() => setAuthMode('login')}
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
                  onClick={() => setAuthMode('login')}
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
