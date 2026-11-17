"use client";

import { DEFAULT_SETTINGS } from "@/constants/settings";
import { settingsService } from "@/services/settingsService";
import { UserSettings } from "@/types/settings";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface SettingsContextValue {
  settings: UserSettings;
  isLoading: boolean;
  saveSettings: (next: UserSettings) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const saveSettings = useCallback(async (next: UserSettings) => {
    const saved = await settingsService.update(next);
    setSettings(saved);
  }, []);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const response = await settingsService.get();

        setSettings(response);
      } catch {
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    getSettings();
  }, []);

  const value = useMemo(
    () => ({ settings, isLoading, saveSettings }),
    [settings, isLoading, saveSettings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
