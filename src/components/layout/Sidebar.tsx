"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Wallet, X } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/classNames";
import { getInitials } from "@/utils/initials";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINK_BASE =
  "flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition";
const LINK_ACTIVE = "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25";
const LINK_INACTIVE =
  "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60";

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              Home Finance
            </p>
            <p className="text-xs text-slate-500">Gestão Doméstica</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden"
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
        {NAVIGATION_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              LINK_BASE,
              pathname === href ? LINK_ACTIVE : LINK_INACTIVE,
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
          <div
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
          >
            {getInitials(user?.name)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-500"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
