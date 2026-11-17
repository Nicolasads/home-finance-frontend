import type { UserSettings } from "@/types/settings";
import { request } from "./httpClient";

export const settingsService = {
  get: () => request<UserSettings>("/settings", {}),
  update: (settings: UserSettings) =>
    request<UserSettings>("/settings", { method: "PUT", body: settings }),
};
