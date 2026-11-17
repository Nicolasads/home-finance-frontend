import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/classNames";

interface VariationBadgeProps {
  value: number;
}

export function VariationBadge({ value }: VariationBadgeProps) {
  const isIncrease = value >= 0;
  const Icon = isIncrease ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
          isIncrease
            ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        {Math.abs(value).toFixed(1)}%
      </span>
      <span className="text-xs text-slate-400">vs mês anterior</span>
    </div>
  );
}
