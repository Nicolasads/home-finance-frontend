"use client";

import { useState, type ReactNode } from "react";
import { Wallet } from "lucide-react";
import { AUTH_TABS, type AuthTab } from "@/constants/auth";
import { AuthTabs } from "./AuthTabs";
import { BrandPanel } from "./BrandPanel";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const HEADINGS: Record<AuthTab, { title: string; description: string }> = {
  [AUTH_TABS.LOGIN]: {
    title: "Acesse sua conta",
    description: "Informe suas credenciais para gerenciar as despesas.",
  },
  [AUTH_TABS.REGISTER]: {
    title: "Crie sua conta no Home Finance",
    description:
      "Preencha os dados abaixo para começar a organizar suas finanças.",
  },
};

interface AuthLayoutProps {
  initialTab?: AuthTab;
  renderForm: (tab: AuthTab) => ReactNode;
}

export function AuthLayout({
  initialTab = AUTH_TABS.LOGIN,
  renderForm,
}: AuthLayoutProps) {
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const heading = HEADINGS[tab];

  return (
    <div className="relative flex min-h-screen w-full bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <BrandPanel />

      <main className="flex flex-1 items-center justify-center overflow-y-auto bg-white p-6 dark:bg-slate-900 sm:p-12 md:p-16">
        <div className="my-auto w-full max-w-md space-y-8">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              Home Finance
            </p>
          </div>

          <AuthTabs active={tab} onChange={setTab} />

          <header>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {heading.title}
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {heading.description}
            </p>
          </header>

          <SocialAuthButtons />

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-900">
              ou continue com e-mail
            </span>
          </div>

          {renderForm(tab)}
        </div>
      </main>
    </div>
  );
}
