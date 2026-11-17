import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ReportInsight } from "@/types/report";
import { cn } from "@/utils/classNames";

const TONE_STYLES: Record<
  ReportInsight["tone"],
  { box: string; icon: typeof CheckCircle2 }
> = {
  positive: {
    box: "border-indigo-100 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
    icon: CheckCircle2,
  },
  warning: {
    box: "border-amber-100 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    icon: AlertTriangle,
  },
};

interface ReportInsightsProps {
  insights: ReportInsight[];
}

export function ReportInsights({ insights }: ReportInsightsProps) {
  if (insights.length === 0) {
    return (
      <p className="text-xs text-slate-400">Nenhum alerta para este mês.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {insights.map((insight) => {
        const { box, icon: Icon } = TONE_STYLES[insight.tone];
        return (
          <li
            key={insight.id}
            className={cn("flex gap-3 rounded-2xl border p-4 text-xs", box)}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <p>{insight.message}</p>
          </li>
        );
      })}
    </ul>
  );
}
