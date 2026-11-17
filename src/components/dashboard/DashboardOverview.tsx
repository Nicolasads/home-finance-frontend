"use client";

import { CheckCircle2, Clock, AlertTriangle, DollarSign } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useExpenses } from "@/hooks/useExpenses";
import { formatCurrency } from "@/utils/formatters";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { KpiCard } from "./KpiCard";
import { MonthlyBarChart } from "./MonthlyBarChart";
import { UpcomingBills } from "./UpcomingBills";
import { VariationBadge } from "./VariationBadge";
import { EmptyExpensesState } from "./EmptyExpensesState";
import { useExpenseModal } from "@/hooks/useExpenseModal";
import { formatPeriodLabel } from "@/utils/periodOptions";

export function DashboardOverview() {
  const { selectedMonth, togglePaid } = useExpenses();
  const {
    stats,
    monthlyHistory,
    categoryTotals,
    upcomingBills,
    hasMonthExpense,
    hasAnyExpense,
  } = useDashboardData();
  const { openCreateModal } = useExpenseModal();

  if (!hasMonthExpense) {
    return (
      <div className="space-y-8">
        <EmptyExpensesState
          periodLabel={formatPeriodLabel(selectedMonth)}
          hasAnyExpense={hasAnyExpense}
          onCreate={openCreateModal}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Despesas do mês"
          value={formatCurrency(stats.total)}
          icon={DollarSign}
          tone="indigo"
          footer={<VariationBadge value={stats.variation} />}
        />
        <KpiCard
          title="Contas pagas"
          value={formatCurrency(stats.paid.value)}
          subtitle={`${stats.paid.count} contas quitadas`}
          icon={CheckCircle2}
          tone="emerald"
        />
        <KpiCard
          title="Contas pendentes"
          value={formatCurrency(stats.pending.value)}
          subtitle={`${stats.pending.count} a vencer`}
          icon={Clock}
          tone="amber"
        />
        <KpiCard
          title="Contas vencidas"
          value={formatCurrency(stats.overdue.value)}
          subtitle={`${stats.overdue.count} em atraso`}
          icon={AlertTriangle}
          tone="rose"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MonthlyBarChart
          history={monthlyHistory}
          currentMonth={selectedMonth}
          className="lg:col-span-2"
        />
        <CategoryBreakdown
          items={categoryTotals.map(({ category, total }) => ({
            category: {
              ...category,
              budget: Number(category.budget ?? 0),
              pallete: {
                dot: "bg-indigo-500",
                text: "text-indigo-600",
                border: "border-indigo-200",
              },
              icon: DollarSign,
            },
            total,
          }))}
          total={stats.total}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingBills bills={upcomingBills} onPay={togglePaid} />
      </section>
    </div>
  );
}
