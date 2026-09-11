import React from 'react';
import { ClerkProvider, SignIn, SignUp, useUser } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CRMProvider, useCRM } from './context/CRMContext';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { PublicSite } from './components/public/PublicSite';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { isPrivateAppPath } from './lib/navigation';

const PrivateEnvironment = React.lazy(() => import('./components/app/PrivateEnvironment').then((module) => ({
  default: module.PrivateEnvironment,
})));

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> }).env || {};
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  viteEnv.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = viteEnv.VITE_CLERK_PROXY_URL;
const clerkAppearance = {
  variables: {
    colorPrimary: '#2563eb',
    colorForeground: '#e2e8f0',
    colorMutedForeground: '#94a3b8',
    colorBackground: '#111520',
    colorInput: '#0a0c12',
    colorInputForeground: '#f8fafc',
    colorNeutral: '#334155',
    borderRadius: '0.75rem',
  },
  elements: {
    cardBox: 'bg-[#111520] rounded-2xl w-[440px] max-w-full overflow-hidden',
    card: '!shadow-none !border-0 !bg-transparent',
    footer: '!shadow-none !border-0 !bg-transparent',
    formButtonPrimary: 'bg-blue-600 hover:bg-blue-500',
  },
};

const ClerkAuthBridge: React.FC = () => {
  const { isLoaded, user } = useUser();
  const {
    syncClerkAuth,
    isAuthModalOpen,
    setIsAuthModalOpen,
    enterApp,
  } = useCRM();
  // `undefined` means Clerk has not reported its first auth state yet.
  // `null` is a valid, loaded state meaning that the visitor is signed out.
  const lastUserId = React.useRef<string | null | undefined>(undefined);

  React.useEffect(() => {
    if (!isLoaded) return;
    const userId = user?.id || null;
    const authStateChanged = lastUserId.current !== userId;
    const previousUserId = lastUserId.current;
    if (!authStateChanged) return;
    lastUserId.current = userId;
    try {
      syncClerkAuth(user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Usuario Clientum',
        avatar: user.imageUrl,
      } : null);

      if (user && isAuthModalOpen && previousUserId !== user.id) {
        setIsAuthModalOpen(false);
        enterApp(true);
      }
    } catch (error) {
      // A stale local CRM profile must not blank the whole app after Clerk
      // has already loaded. Treat the browser session as signed out and let
      // AppContent return the visitor to the public site.
      console.error('Clerk auth synchronization failed:', error);
      syncClerkAuth(null);
    }
  }, [isAuthModalOpen, isLoaded, setIsAuthModalOpen, syncClerkAuth, user]);

  return null;
};

const AppContent: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { isPublicSiteVisible, isAuthenticated, isAuthReady, openPublicSite, enterApp } = useCRM();
  const [pathname, setPathname] = React.useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  const isPrivateRoute = isPrivateAppPath(pathname);

  // Keep browser navigation and the context's environment state in sync.
  React.useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (!isAuthReady) return;

    if (isPrivateRoute && isAuthenticated) {
      if (isPublicSiteVisible) enterApp();
      return;
    }

    if (isPrivateRoute && !isAuthenticated) {
      // Replace an unauthorized deep link so Back does not return to a
      // private URL that can never be rendered.
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      openPublicSite();
      return;
    }

    // A public URL always renders the public environment, even if a stale
    // sessionStorage view flag says "app".
    if (!isPrivateRoute && !isPublicSiteVisible) openPublicSite();
  }, [enterApp, isAuthReady, isAuthenticated, isPrivateRoute, isPublicSiteVisible, openPublicSite]);

  const publicEnvironment = (
    <div data-theme={resolvedTheme} className="min-h-screen w-screen overflow-x-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PublicSite />
      <AuthModal />
      <ToastContainer />
    </div>
  );

  const privateEnvironment = (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#0a0c10] text-sm text-slate-400">
          Cargando Clientum CRM…
        </div>
      }
    >
      <PrivateEnvironment />
    </React.Suspense>
  );

  if (!isAuthReady && isPrivateRoute) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#07090e] text-sm text-slate-300">
        Verificando tu sesión segura…
      </div>
    );
  }

  return (
    <ProtectedRoute
      isAuthenticated={isPrivateRoute && isAuthenticated}
      fallback={publicEnvironment}
    >
      {privateEnvironment}
    </ProtectedRoute>
  );
};

export default function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      localization={{
        signIn: { start: { title: 'Inicia sesión en ClientumCRM' } },
        signUp: { start: { title: 'Crea tu cuenta de ClientumCRM' } },
      }}
    >
      <ThemeProvider defaultTheme="light">
        <CRMProvider>
          <ClerkAuthBridge />
          <AppContent />
        </CRMProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
