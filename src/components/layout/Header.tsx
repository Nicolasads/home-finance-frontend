"use client";

import { Calendar, Menu, Plus } from "lucide-react";
import { type ChangeEvent } from "react";
import { NotificationsMenu } from "./NotificationsMenu";
import { useExpenses } from "@/hooks/useExpenses";
import { useExpenseModal } from "@/hooks/useExpenseModal";
import { buildPeriodOptions } from "@/utils/periodOptions";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const PERIOD_OPTIONS = buildPeriodOptions(new Date());

export function Header({ onMenuClick, title }: HeaderProps) {
  const { selectedMonth, setSelectedMonth } = useExpenses();
  const { openCreateModal } = useExpenseModal();

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <h2 className="text-lg font-bold capitalize text-slate-900 dark:text-white md:text-xl">
            {title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Gerencie suas finanças com facilidade.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800/80 sm:flex">
          <Calendar className="h-4 w-4 text-indigo-500" />
          <span className="sr-only">Período</span>
          <select
            value={selectedMonth}
            onChange={handlePeriodChange}
            className="cursor-pointer border-none bg-transparent font-semibold px-2 text-slate-700 focus:outline-none dark:bg-slate-800 dark:text-slate-300"
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <ThemeToggle />

        <NotificationsMenu />

        <button
          type="button"
          onClick={() => openCreateModal()}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-violet-500 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova despesa</span>
        </button>
      </div>
    </header>
  );
}
