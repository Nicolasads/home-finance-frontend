"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { CURRENCY_OPTIONS } from "@/constants/settings";
import { useSettings } from "@/hooks/useSettings";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import type { UserSettings } from "@/types/settings";
import { SettingsToggle } from "./SettingsToggle";
import { ChevronDown } from "lucide-react";

export function SettingsView() {
  const { settings, saveSettings, isLoading } = useSettings();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [draft, setDraft] = useState<UserSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  const updateDraft = (patch: Partial<UserSettings>) =>
    setDraft((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSettings(draft);
      showToast("Configurações salvas com sucesso!");
    } catch {
      showToast("Não foi possível salvar. Tente novamente.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <p className="text-xs text-slate-400">Carregando configurações...</p>
    );
  }

  return (
    <section className="max-w-2xl space-y-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Configurações da conta
        </h3>
        <p className="text-xs text-slate-500">
          Preferências de exibição e notificações
        </p>
      </header>

      <div className="space-y-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <SettingsToggle
          id="email-notifications"
          label="Notificações por e-mail"
          description="Receba alertas de vencimento com 2 dias de antecedência"
          checked={draft.emailNotifications}
          onChange={(checked) => updateDraft({ emailNotifications: checked })}
        />

        <SettingsToggle
          id="dark-mode"
          label="Modo escuro"
          description="Alterna o tema da interface. A escolha vale neste navegador."
          checked={isDark}
          onChange={toggleTheme}
        />

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Moeda padrão
            </p>
            <p className="text-xs text-slate-400">Disponível em breve</p>
          </div>
          <div className="relative">
            <select
              aria-label="Moeda padrão"
              value={draft.currency}
              disabled
              className="appearance-none rounded-xl border-none bg-slate-100 py-2 pl-3 pr-9 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800 dark:text-slate-300"
            >
              {CURRENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <footer className="flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
        <Button onClick={handleSave} loading={isSaving}>
          Salvar alterações
        </Button>
      </footer>
    </section>
  );
}
