import { MonthlyTotal } from "@/types/dashboard";
import { cn } from "@/utils/classNames";
import { formatCurrency, formatMonthLabel } from "@/utils/formatters";

const BAR_DEFAULT = "bg-slate-300 group-hover:bg-indigo-400 dark:bg-slate-700";
const BAR_CURRENT =
  "bg-gradient-to-t from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30";

interface MonthlyBarChartProps {
  history: MonthlyTotal[];
  currentMonth: string;
  className: string;
}

export function MonthlyBarChart({
  history,
  currentMonth,
  className,
}: MonthlyBarChartProps) {
  const maxValue = Math.max(...history.map((item) => item.total), 1);

  const heightPercent = (total: number) => (total / maxValue) * 100;

  const isCurrent = (monthKey: string, currentMonth: string) =>
    monthKey === currentMonth;

  return (
    <section
      className={cn(
        "flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      <header className="mb-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Evolução Semestral
        </h3>
        <p className="text-xs text-slate-500">Comparativo dos últimos meses</p>
      </header>

      <div className="flex h-64 items-end gap-2 pt-8 sm:gap-6">
        {history.map(({ monthKey, total }) => {
          return (
            <div
              key={monthKey}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] font-bold opacity-0 transition group-hover:opacity-100">
                {formatCurrency(total)}
              </span>
              <div className="flex h-full w-full max-w-12 items-end overflow-hidden rounded-t-xl bg-slate-100 dark:bg-slate-800">
                <div
                  style={{ height: `${heightPercent(total)}%` }}
                  className={cn(
                    "w-full rounded-t-xl transition-all duration-500",
                    isCurrent(monthKey, currentMonth)
                      ? BAR_CURRENT
                      : BAR_DEFAULT,
                  )}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {formatMonthLabel(monthKey)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
