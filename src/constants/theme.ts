export const THEME_STORAGE_KEY = "hf_theme";

export const THEMES = Object.freeze({
  DARK: "dark",
  LIGHT: "light",
} as const);

export type Theme = (typeof THEMES)[keyof typeof THEMES];
