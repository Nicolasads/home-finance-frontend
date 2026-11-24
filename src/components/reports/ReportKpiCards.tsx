import { Activity, Award, DollarSign, Layers } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { formatCurrency } from "@/utils/formatters";

interface ReportKpiCardsProps {
  report: {
    totalPeriod: number;
    avgTicket: number;
    totalCount: number;
    fixedPct: number;
    fixedTotal: number;
    variableTotal: number;
    paidCount: number;
  };
}

export function ReportKpiCards({ report }: ReportKpiCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Gasto total filtrado"
        value={formatCurrency(report.totalPeriod)}
        icon={DollarSign}
        tone="indigo"
      />
      <KpiCard
        title="Ticket médio"
        value={formatCurrency(report.avgTicket)}
        subtitle={`${report.totalCount} itens`}
        icon={Activity}
        tone="emerald"
      />
      <KpiCard
        title="Comprometimento fixo"
        value={`${report.fixedPct.toFixed(1)}%`}
        subtitle={`Fixo ${formatCurrency(report.fixedTotal)} • Único ${formatCurrency(report.variableTotal)}`}
        icon={Layers}
        tone="amber"
      />
      <KpiCard
        title="Índice de quitação"
        value={`${report.totalCount ? Math.round((report.paidCount / report.totalCount) * 100) : 0}%`}
        subtitle={`${report.paidCount} de ${report.totalCount} pagas`}
        icon={Award}
        tone="emerald"
      />
    </section>
  );
}
