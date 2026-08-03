import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface SessionUser {
  id: number;
  username: string;
  role: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  /** Re-fetch the session from /api/auth/me */
  refreshSession: () => Promise<void>;
  /** Dispatch auth-changed event so all listeners refresh */
  notifyAuthChange: () => void;
  /** Set user directly (e.g. after Supabase sign-in) */
  setUser: (u: SessionUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          return;
        }
      }
      setUser(null);
    } catch (err) {
      console.warn('[AuthProvider] Session check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const notifyAuthChange = useCallback(() => {
    window.dispatchEvent(new Event('auth-changed'));
  }, []);

  useEffect(() => {
    refreshSession();

    const handler = () => { refreshSession(); };
    window.addEventListener('auth-changed', handler);
    return () => { window.removeEventListener('auth-changed', handler); };
  }, [refreshSession]);

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession, notifyAuthChange, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the shared auth state.
 * Must be used within an <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return ctx;
}
