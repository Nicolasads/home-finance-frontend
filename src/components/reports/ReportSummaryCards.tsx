import { formatCurrency } from "@/utils/formatters";
import type { ReportData } from "@/types/report";

interface ReportSummaryCardsProps {
  data: ReportData;
}

export function ReportSummaryCards({ data }: ReportSummaryCardsProps) {
  const {
    averageMonthly,
    averageMonths,
    biggestCategory,
    biggestCategoryShare,
  } = data;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Média mensal ({averageMonths}m)
        </span>
        <h4 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
          {formatCurrency(averageMonthly)}
        </h4>
      </article>

      <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Maior despesa
        </span>
        {biggestCategory ? (
          <>
            <h4 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {biggestCategory.category.name}
            </h4>
            <p className="mt-2 text-xs font-medium text-slate-400">
              {formatCurrency(biggestCategory.total)} (
              {biggestCategoryShare.toFixed(1)}% do total)
            </p>
          </>
        ) : (
          <p className="mt-2 text-xs text-slate-400">
            Nenhuma despesa neste mês.
          </p>
        )}
      </article>
    </div>
  );
}
