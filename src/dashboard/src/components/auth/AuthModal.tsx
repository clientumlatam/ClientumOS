import React, { useState } from 'react';
import { ClientumLogo } from "../common/ClientumLogo";
import { Mail, Lock, User, Building, ArrowRight, X, Eye, EyeOff } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { SocialAuthButtons } from './SocialAuthButtons';
import { PasswordResetFlow } from './PasswordResetFlow';
import { signInWithEmail, registerWithEmail } from '../../firebase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, showToast } = useCRM();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('alex.morgan@clientum.dev');
  const [password, setPassword] = useState('clientum2026');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        if (!email.trim() || !password) {
          showToast('Por favor completa las credenciales', 'error');
          setIsLoading(false);
          return;
        }

        const authRes = await signInWithEmail(email.trim(), password);
        setIsLoading(false);

        if (authRes.success) {
          login(email.trim(), password);
          setIsAuthModalOpen(false);
          showToast('¡Sesión iniciada con éxito!', 'success');
        } else {
          showToast(authRes.error || 'Credenciales inválidas', 'error');
        }
      } else if (authMode === 'register') {
        if (!name.trim() || !email.trim() || !password) {
          showToast('Por favor completa todos los campos obligatorios', 'error');
          setIsLoading(false);
          return;
        }

        const regRes = await registerWithEmail(name.trim(), email.trim(), password, company.trim());
        setIsLoading(false);

        if (regRes.success) {
          register(name.trim(), email.trim(), password, company.trim());
          setIsAuthModalOpen(false);
          showToast('Cuenta creada y vinculada con éxito', 'success');
        } else {
          showToast(regRes.error || 'No se pudo crear la cuenta', 'error');
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      showToast('Error de autenticación inesperado', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#111520] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden text-xs text-slate-300 relative">
        
        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 bg-[#161c2b] border-b border-[#222a3d] text-center relative">
          <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-2.5 text-blue-400">
            <ClientumLogo className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">ClientumCRM</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            {authMode === 'login' && 'Ingresa a tu cuenta comercial'}
            {authMode === 'register' && 'Crea tu espacio de trabajo B2B'}
            {authMode === 'forgot' && 'Restablece tu contraseña de acceso'}
          </p>

          {/* Segmented Switcher */}
          <div className="flex rounded-xl bg-[#0b0e14] p-1 border border-[#202737] mt-3.5">
            <button
              id="auth-modal-tab-login"
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              id="auth-modal-tab-register"
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Registrarse
            </button>
            <button
              id="auth-modal-tab-forgot"
              type="button"
              onClick={() => setAuthMode('forgot')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                authMode === 'forgot'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recuperar
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {authMode === 'forgot' ? (
            <PasswordResetFlow
              initialEmail={email}
              onBackToLogin={() => setAuthMode('login')}
              variant="modal"
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="auth-modal-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full bg-[#0a0c12] border border-[#222a3d] rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-modal-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@clientum.dev"
                    className="w-full bg-[#0a0c12] border border-[#222a3d] rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-slate-300">Contraseña</label>
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
                    id="auth-modal-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0c12] border border-[#222a3d] rounded-xl px-3 py-2 pl-9 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre de la Empresa</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="auth-modal-company-input"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Technologies HQ"
                      className="w-full bg-[#0a0c12] border border-[#222a3d] rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <button
                id="auth-modal-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isLoading ? 'Procesando...' : authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta y Espacio'}
                </span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Social Auth SSO Buttons */}
              <SocialAuthButtons onSuccess={() => setIsAuthModalOpen(false)} />

              {authMode === 'login' && (
                <div className="pt-2 border-t border-[#1e2536]">
                  <button
                    id="auth-modal-demo-btn"
                    type="button"
                    onClick={() => {
                      login('alex.morgan@clientum.dev', 'secret');
                      setIsAuthModalOpen(false);
                      showToast('Sesión iniciada con cuenta demo de prueba', 'success');
                    }}
                    className="w-full py-2 bg-[#171d2b] hover:bg-[#20293d] text-slate-300 font-medium rounded-xl border border-[#263148] transition-all text-center cursor-pointer"
                  >
                    🚀 Entrar con Demo Rápida (Alex Morgan)
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Mode Switcher */}
          {authMode !== 'forgot' && (
            <div className="pt-4 border-t border-[#222a3d] text-center text-[11px] text-slate-400">
              {authMode === 'login' && (
                <p>
                  ¿No tienes una cuenta?{' '}
                  <button
                    id="auth-modal-switch-register-btn"
                    onClick={() => setAuthMode('register')}
                    className="text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    Regístrate aquí
                  </button>
                </p>
              )}
              {authMode === 'register' && (
                <p>
                  ¿Ya tienes una cuenta?{' '}
                  <button
                    id="auth-modal-switch-login-btn"
                    onClick={() => setAuthMode('login')}
                    className="text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    Inicia sesión
                  </button>
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
