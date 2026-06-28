import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-theme';

export const THEMES = [
  {
    id: 'neon',
    name: 'Neon',
    description: 'Cyan, magenta & lime. Aggressive glow.',
    swatches: ['#00ffff', '#ff0080', '#00ff80'],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Warm gold, rose & violet on plum.',
    swatches: ['#fbbf24', '#ec4899', '#a78bfa'],
  },
  {
    id: 'crimson',
    name: 'Crimson',
    description: 'Fiery red, orange & amber on wine.',
    swatches: ['#ef4444', '#f97316', '#fbbf24'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Refined sky, violet & emerald on slate.',
    swatches: ['#60a5fa', '#a78bfa', '#34d399'],
  },
  {
    id: 'daylight',
    name: 'Daylight',
    description: 'Light mode — clean white, vivid accents.',
    swatches: ['#2563eb', '#db2777', '#059669'],
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    description: 'Vibrant gradient wallpaper behind frosted glass.',
    swatches: ['#a855f7', '#ec4899', '#3b82f6'],
  },
];

const THEME_IDS = THEMES.map((t) => t.id);
const DEFAULT_THEME = 'neon';

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
});

const readStoredTheme = () => {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return THEME_IDS.includes(t) ? t : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore quota / privacy mode */
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (THEME_IDS.includes(next)) setThemeState(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
