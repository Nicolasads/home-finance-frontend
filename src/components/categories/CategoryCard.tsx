import { BUDGET_ALERT_THRESHOLD } from "@/constants/budget";
import { COLOR_CLASSES, ICON_MAP } from "@/constants/catergories";
import { CategorySummary } from "@/types/category";
import { formatCurrency } from "@/utils/formatters";
import { cn } from "@heroui/react";
import { Tag } from "lucide-react";

interface CategoryCardProps {
  summary: CategorySummary;
}

const CategoryCard = ({ summary }: CategoryCardProps) => {
  const { category, spent, budget, usagePercent, remaining, expenseCount } =
    summary;
  const isNearLimit = usagePercent > BUDGET_ALERT_THRESHOLD;
  const barWidth = Math.min(100, usagePercent);

  const palette = COLOR_CLASSES[category.colorKey] ?? COLOR_CLASSES.slate;
  const Icon = ICON_MAP[category.iconKey] ?? Tag;

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className={cn("rounded-2xl p-3", palette.soft, palette.text)}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Orçamento: {formatCurrency(budget)}
          </span>
        </div>

        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
          {category.name}
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          {expenseCount} despesas registradas
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-500">Gasto atual</span>
          <span className="text-slate-900 dark:text-white">
            {formatCurrency(spent)}
          </span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            style={{ width: `${barWidth}%` }}
            className={cn(
              "h-full rounded-full",
              isNearLimit ? "bg-rose-500" : palette.dot,
            )}
          />
        </div>

        <div className="flex justify-between pt-1 text-[10px] text-slate-400">
          <span>{usagePercent.toFixed(0)}% do orçamento</span>
          <span>{formatCurrency(remaining)} restante</span>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
