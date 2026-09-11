import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'clientum_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeMode }> = ({
  children,
  defaultTheme: _defaultTheme = 'light',
}) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const systemTheme: 'light' | 'dark' = 'light';
  const resolvedTheme: 'light' | 'dark' = 'light';

  // Clientum uses one consistent light workspace. Older persisted theme
  // values are intentionally ignored so every dashboard route stays aligned.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.setAttribute('data-mode', 'light');
    root.classList.add('light');
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } catch {
      // The visual theme remains usable when browser storage is unavailable.
    }
  }, []);

  const setTheme = (_newTheme: ThemeMode) => {
    setThemeState('light');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } catch {
      // Ignore storage restrictions; light mode is still enforced in memory.
    }
  };

  const toggleTheme = () => setTheme('light');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        systemTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };
