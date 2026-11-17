import type { UserSettings } from "@/types/settings";

export const DEFAULT_SETTINGS: UserSettings = Object.freeze({
  emailNotifications: true,
  currency: "BRL",
});

export const CURRENCY_OPTIONS = [
  { value: "BRL", label: "Real brasileiro (R$)" },
  { value: "USD", label: "Dólar americano ($)" },
  { value: "EUR", label: "Euro (€)" },
] as const;
