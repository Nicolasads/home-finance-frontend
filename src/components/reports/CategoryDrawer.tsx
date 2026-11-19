"use client";

import { Tag, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { COLOR_CLASSES } from "@/constants/catergories";
import { cn } from "@/utils/classNames";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { CategoryRow } from "@/utils/reportAnalytics";

interface CategoryDrawerProps {
  category: CategoryRow | null;
  onClose: () => void;
}

export function CategoryDrawer({ category, onClose }: CategoryDrawerProps) {
  if (!category) return null;

  const palette = COLOR_CLASSES[category.colorKey] ?? COLOR_CLASSES.slate;
  const total = category.items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Lançamentos de ${category.name}`}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col justify-between border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <header className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-2xl p-3", palette.soft, palette.text)}>
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {category.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {category.items.length} lançamento(s) • Total:{" "}
                <strong className="text-slate-900 dark:text-white">
                  {formatCurrency(total)}
                </strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:text-slate-900 dark:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <ul className="flex-1 space-y-3 overflow-y-auto p-6">
          {category.items.length === 0 ? (
            <li className="py-12 text-center text-xs text-slate-400">
              Nenhum lançamento para o filtro escolhido.
            </li>
          ) : (
            category.items.map((item) => (
              <li
                key={item.id}
                className="space-y-2.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-700/60 dark:bg-slate-800/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-black tabular-nums text-slate-900 dark:text-white">
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-2 text-[11px] dark:border-slate-700/60">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span>
                      Venc.:{" "}
                      <strong className="text-slate-700 dark:text-slate-300">
                        {formatDate(item.dueDate)}
                      </strong>
                    </span>
                    {item.paymentDate && (
                      <span>
                        Pago:{" "}
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          {formatDate(item.paymentDate)}
                        </strong>
                      </span>
                    )}
                  </div>
                  <span className="rounded-lg bg-slate-200/70 px-2 py-0.5 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {item.recurrence}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>

        <footer className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Participação no mês base:{" "}
            <strong className="text-slate-900 dark:text-white">
              {category.sharePct.toFixed(1)}%
            </strong>
          </span>
          <Button onClick={onClose}>Fechar painel</Button>
        </footer>
      </aside>
    </div>
  );
}
