import { Apple, Globe, FolderGit2, type LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@heroui/react";
import { OAUTH_PROVIDERS } from "@/constants/auth";

const PROVIDERS: {
  id: "google" | "apple" | "github";
  label: string;
  icon: LucideIcon;
  iconClass: string;
}[] = [
  {
    id: OAUTH_PROVIDERS.GOOGLE,
    label: "Google",
    icon: Globe,
    iconClass: "text-rose-500",
  },
  {
    id: OAUTH_PROVIDERS.APPLE,
    label: "Apple",
    icon: Apple,
    iconClass: "text-slate-900 dark:text-white",
  },
  {
    id: OAUTH_PROVIDERS.GITHUB,
    label: "GitHub",
    icon: FolderGit2,
    iconClass: "text-slate-900 dark:text-white",
  },
];

export function SocialAuthButtons() {
  const { loginWithProvider } = useAuth();

  return (
    <div className="grid grid-cols-3 gap-3">
      {PROVIDERS.map(({ id, label, icon: Icon, iconClass }) => (
        <button
          key={id}
          type="button"
          onClick={() => loginWithProvider(id)}
          aria-label={`Entrar com ${label}`}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Icon className={cn("h-4 w-4", iconClass)} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
