import { useCallback, useEffect, useState } from "react";
import { type Theme } from "@/constants/theme";
import { readStoredTheme, writeStoredTheme } from "@/utils/themeStorage";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Lê a preferência salva só depois que o componente monta no navegador
  useEffect(() => {
    const handleTheme = () => {
      setTheme(readStoredTheme() ?? "dark");
    };

    handleTheme();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    writeStoredTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme };
}
