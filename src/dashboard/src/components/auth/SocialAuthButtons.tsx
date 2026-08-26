import React, { useState } from 'react';
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithLinkedIn,
} from '../../firebase';
import { useCRM } from '../../context/CRMContext';

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
  layout?: 'grid' | 'stacked';
  disabled?: boolean;
}

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const MetaFacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#0A66C2"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.34a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"
    />
  </svg>
);

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onSuccess,
  layout = 'grid',
  disabled = false,
}) => {
  const { login, updateCurrentUser, showToast, setGmailAccessToken } = useCRM();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleProviderLogin = async (provider: 'google' | 'facebook' | 'linkedin') => {
    setLoadingProvider(provider);
    try {
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
        if (result.token) {
          setGmailAccessToken(result.token);
        }
      } else if (provider === 'facebook') {
        result = await signInWithFacebook();
      } else {
        result = await signInWithLinkedIn();
      }

      setLoadingProvider(null);

      if (result.success && result.user) {
        const userEmail = result.user.email || `${provider}.user@clientum.dev`;
        login(userEmail, 'oauth-session');

        // Enhance user with social profile attributes
        updateCurrentUser({
          name: result.user.displayName || (provider === 'google' ? 'Google User' : provider === 'facebook' ? 'Meta Latam User' : 'LinkedIn Executive'),
          avatar: result.user.photoURL || (
            provider === 'google'
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
              : provider === 'facebook'
              ? 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'
              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
          ),
          role: provider === 'linkedin' ? 'B2B Sales Director' : provider === 'facebook' ? 'Marketing Lead' : 'Workspace Admin',
        });

        const providerNames = {
          google: 'Google Workspace',
          facebook: 'Meta / Facebook',
          linkedin: 'LinkedIn Professional',
        };

        showToast(`¡Sesión iniciada con éxito vía ${providerNames[provider]}!`, 'success');
        if (onSuccess) onSuccess();
      } else {
        showToast(result.error || `No se pudo conectar con ${provider}.`, 'error');
      }
    } catch (err: any) {
      setLoadingProvider(null);
      showToast(`Error al autenticar con ${provider}.`, 'error');
    }
  };

  const isBusy = Boolean(loadingProvider) || disabled;

  return (
    <div className="w-full space-y-2">
      <div className="relative flex items-center my-3">
        <div className="flex-grow border-t border-[#1e2434]"></div>
        <span className="flex-shrink-0 mx-3 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          O continuar con SSO
        </span>
        <div className="flex-grow border-t border-[#1e2434]"></div>
      </div>

      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-3 gap-2'
            : 'flex flex-col gap-2'
        }
      >
        {/* Google Button */}
        <button
          id="social-auth-google-btn"
          type="button"
          onClick={() => handleProviderLogin('google')}
          disabled={isBusy}
          title="Iniciar sesión con cuenta Google"
          className="flex items-center justify-center gap-2 py-2 px-3 bg-[#111624] hover:bg-[#182033] text-slate-200 hover:text-white border border-[#21293c] hover:border-blue-500/40 rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loadingProvider === 'google' ? (
            <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          )}
          <span className={layout === 'grid' ? 'hidden sm:inline font-semibold' : 'font-semibold'}>
            Google
          </span>
        </button>

        {/* Facebook / Meta Button */}
        <button
          id="social-auth-facebook-btn"
          type="button"
          onClick={() => handleProviderLogin('facebook')}
          disabled={isBusy}
          title="Iniciar sesión con Meta / Facebook"
          className="flex items-center justify-center gap-2 py-2 px-3 bg-[#111624] hover:bg-[#182033] text-slate-200 hover:text-white border border-[#21293c] hover:border-blue-500/40 rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loadingProvider === 'facebook' ? (
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <MetaFacebookIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          )}
          <span className={layout === 'grid' ? 'hidden sm:inline font-semibold' : 'font-semibold'}>
            Meta
          </span>
        </button>

        {/* LinkedIn Button */}
        <button
          id="social-auth-linkedin-btn"
          type="button"
          onClick={() => handleProviderLogin('linkedin')}
          disabled={isBusy}
          title="Iniciar sesión con LinkedIn"
          className="flex items-center justify-center gap-2 py-2 px-3 bg-[#111624] hover:bg-[#182033] text-slate-200 hover:text-white border border-[#21293c] hover:border-[#0A66C2]/40 rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loadingProvider === 'linkedin' ? (
            <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <LinkedInIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          )}
          <span className={layout === 'grid' ? 'hidden sm:inline font-semibold' : 'font-semibold'}>
            LinkedIn
          </span>
        </button>
      </div>
    </div>
  );
};
