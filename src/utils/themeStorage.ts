import { THEME_STORAGE_KEY, THEMES, type Theme } from "@/constants/theme";

const isTheme = (value: unknown): value is Theme =>
  value === THEMES.DARK || value === THEMES.LIGHT;

// localStorage pode lançar erro em modo privado ou com o acesso bloqueado
export const readStoredTheme = (): Theme | null => {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
};

export const writeStoredTheme = (theme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem persistência, o tema vale só nesta sessão
  }
};
