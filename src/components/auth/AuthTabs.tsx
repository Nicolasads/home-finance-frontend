import { AUTH_TABS, type AuthTab } from "@/constants/auth";
import { cn } from "@/utils/classNames";

const TABS: { value: AuthTab; label: string }[] = [
  { value: AUTH_TABS.LOGIN, label: "Entrar no sistema" },
  { value: AUTH_TABS.REGISTER, label: "Criar nova conta" },
];

interface AuthTabsProps {
  active: AuthTab;
  onChange: (tab: AuthTab) => void;
}

export function AuthTabs({ active, onChange }: AuthTabsProps) {
  return (
    <div
      role="tablist"
      className="flex rounded-2xl border border-slate-200/60 bg-slate-100 p-1.5 dark:border-slate-700/60 dark:bg-slate-800/90"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-xs font-bold transition-all duration-200",
              isActive
                ? "bg-white text-indigo-600 shadow-md dark:bg-slate-900 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
