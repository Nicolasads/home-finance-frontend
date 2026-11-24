"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THEMES, type Theme } from "@/constants/theme";
import { readStoredTheme, writeStoredTheme } from "@/utils/themeStorage";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(THEMES.DARK);

  // Lê a preferência salva só no navegador

  useEffect(() => {
    const handleChangeTheme = () => {
      setTheme(readStoredTheme() ?? THEMES.DARK);
    };

    handleChangeTheme();
  }, []);

  // Sincroniza a classe no <html>. Não grava no storage aqui,
  // senão o valor padrão sobrescreveria a escolha salva na montagem.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === THEMES.DARK);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    writeStoredTheme(next);
    setTheme(next);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === THEMES.DARK, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
