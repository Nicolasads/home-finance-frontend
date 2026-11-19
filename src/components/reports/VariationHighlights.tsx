import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import type { CategoryRow } from "@/utils/reportAnalytics";

interface VariationHighlightsProps {
  rows: CategoryRow[];
}

const sortByDiff = (rows: CategoryRow[], direction: "up" | "down") =>
  rows
    .filter((r) => (direction === "up" ? r.diffVal > 0 : r.diffVal < 0))
    .sort((a, b) => Math.abs(b.diffVal) - Math.abs(a.diffVal))
    .slice(0, 3);

export function VariationHighlights({ rows }: VariationHighlightsProps) {
  const increases = sortByDiff(rows, "up");
  const savings = sortByDiff(rows, "down");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <HighlightCard
        title="Maiores crescimentos"
        subtitle="Categorias com alta em relação ao mês de referência"
        icon={TrendingUp}
        tone="rose"
        rows={increases}
        emptyText="Nenhuma categoria teve aumento entre os meses comparados."
      />
      <HighlightCard
        title="Destaques de economia"
        subtitle="Categorias em que as despesas caíram"
        icon={TrendingDown}
        tone="emerald"
        rows={savings}
        emptyText="Nenhuma redução registrada entre os meses selecionados."
      />
    </div>
  );
}

const TONE = {
  rose: {
    card: "border-rose-200/70 dark:border-rose-900/40",
    iconBox: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
    row: "border-rose-100 bg-rose-50/60 dark:border-rose-900/30 dark:bg-rose-950/20",
    value: "text-rose-600 dark:text-rose-400",
  },
  emerald: {
    card: "border-emerald-200/70 dark:border-emerald-900/40",
    iconBox:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    row: "border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-950/20",
    value: "text-emerald-600 dark:text-emerald-400",
  },
} as const;

interface HighlightCardProps {
  title: string;
  subtitle: string;
  icon: typeof TrendingUp;
  tone: keyof typeof TONE;
  rows: CategoryRow[];
  emptyText: string;
}

function HighlightCard({
  title,
  subtitle,
  icon: Icon,
  tone,
  rows,
  emptyText,
}: HighlightCardProps) {
  const styles = TONE[tone];

  return (
    <section
      className={`space-y-4 rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${styles.card}`}
    >
      <header className="flex items-center gap-3">
        <div className={`rounded-2xl p-2.5 ${styles.iconBox}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500 dark:bg-slate-800/40 dark:text-slate-400">
          {emptyText}
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${styles.row}`}
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {row.name}
                </p>
                <p className="text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                  De {formatCurrency(row.compSum)} para{" "}
                  {formatCurrency(row.baseSum)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-black tabular-nums ${styles.value}`}
                >
                  {tone === "rose" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {formatCurrency(Math.abs(row.diffVal))}
                </span>
                <span
                  className={`block text-[10px] font-bold tabular-nums ${styles.value}`}
                >
                  {Math.abs(row.diffPct).toFixed(1)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
