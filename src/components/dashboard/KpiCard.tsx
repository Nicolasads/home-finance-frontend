import { cn } from "@/utils/classNames";
import { ComponentType, ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ComponentType<{ className?: string }>;
  tone: "indigo" | "emerald" | "amber" | "rose";
  footer?: ReactNode;
}

const CARD_CLASSES =
  "rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900";

const KPI_TONES = Object.freeze({
  indigo: {
    iconBox:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
    subtitle: "text-slate-400",
  },
  emerald: {
    iconBox:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    subtitle: "text-slate-400",
  },
  amber: {
    iconBox:
      "bg-amber-50 text-amber-600 dark:bg-amber -950/50 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/50",
    subtitle: "text-slate-400",
  },
  rose: {
    iconBox: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/50",
    subtitle: "text-rose-500",
  },
});

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "indigo",
  footer,
}: KpiCardProps) {
  const palette = KPI_TONES[tone];

  return (
    <article className={cn(CARD_CLASSES, palette.hoverBorder)}>
      <header className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={cn("rounded-2xl p-2.5", palette.iconBox)}>
          <Icon className="h-5 w-5" />
        </div>
      </header>

      <p className="text-2xl font-black text-slate-900 dark:text-white">
        {value}
      </p>
      {subtitle && (
        <p className={cn("mt-2 text-xs font-medium", palette.subtitle)}>
          {subtitle}
        </p>
      )}
      {footer}
    </article>
  );
}
