'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getData, updateData } from '@/src/lib/storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = getData<any>('app_settings', { theme: 'system' }).theme;
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (t === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    updateData('app_settings', { theme: t });
    applyTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
