"use client";

import { ChevronRight } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { cn } from "@/utils/classNames";
import { COLOR_CLASSES } from "@/constants/catergories";
import type { CategoryRow } from "@/utils/reportAnalytics";

interface CategoryBreakdownTableProps {
  rows: CategoryRow[];
  onInspect: (categoryId: string) => void;
}

const HEADERS = [
  "Categoria",
  "Qtd.",
  "Ticket médio",
  "Mês ref.",
  "Mês base",
  "Variação",
  "Participação",
  "Status",
  "",
];

export function CategoryBreakdownTable({
  rows,
  onInspect,
}: CategoryBreakdownTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-col gap-2 border-b border-slate-100 p-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Detalhamento por categoria
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Clique em uma linha para ver os lançamentos
          </p>
        </div>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          {rows.length} categorias ativas
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50">
              {HEADERS.map((header, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-3.5 first:pl-6 last:pr-6"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onInspect(row.id)}
                className="group cursor-pointer transition hover:bg-indigo-50/50 dark:hover:bg-slate-800/60"
              >
                <td className="py-4 pl-6 pr-4">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "h-3 w-3 rounded-full",
                        COLOR_CLASSES[row.colorKey]?.dot,
                      )}
                    />
                    <span className="font-bold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {row.name}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-4 text-center font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                  {row.count}
                </td>
                <td className="px-4 py-4 tabular-nums text-slate-600 dark:text-slate-300">
                  {formatCurrency(row.ticket)}
                </td>
                <td className="px-4 py-4 tabular-nums text-slate-500 dark:text-slate-400">
                  {formatCurrency(row.compSum)}
                </td>
                <td className="px-4 py-4 font-bold tabular-nums text-slate-900 dark:text-white">
                  {formatCurrency(row.baseSum)}
                </td>
                <td className="px-4 py-4">
                  <VariationBadge diff={row.diffVal} pct={row.diffPct} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          COLOR_CLASSES[row.colorKey]?.dot,
                        )}
                        style={{ width: `${Math.min(100, row.sharePct)}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-[11px] font-bold tabular-nums text-slate-700 dark:text-slate-300">
                      {row.sharePct.toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <StatusPill status={row.dominantStatus} />
                </td>
                <td className="py-4 pl-4 pr-6 text-right">
                  <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                    Inspecionar <ChevronRight className="h-4 w-4" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function VariationBadge({ diff, pct }: { diff: number; pct: number }) {
  if (diff === 0)
    return <span className="font-semibold text-slate-400">0,0%</span>;
  const up = diff > 0;
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold",
        up
          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      )}
    >
      {up ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}

const STATUS_STYLE: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  OVERDUE: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
  PENDING:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold",
        STATUS_STYLE[status] ?? "bg-slate-100 text-slate-500 dark:bg-slate-800",
      )}
    >
      {status}
    </span>
  );
}
