export interface UserSettings {
  emailNotifications: boolean;
  currency: CurrencyCode;
}

export type CurrencyCode = "BRL" | "USD" | "EUR";
