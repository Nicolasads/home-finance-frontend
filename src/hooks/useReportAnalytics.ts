import { useMemo, useState } from "react";
import { useCategories } from "./useCategories";
import { useExpenses } from "./useExpenses";
import { useReportFilters } from "./useReportFilters";
import {
  applyFilters,
  buildCategoryBreakdown,
  monthKeysBack,
  scopeMonths,
  splitFixedVariable,
} from "@/utils/reportAnalytics";
import { RecurrenceSlice, SemesterPoint } from "@/types/report";
import { sumValues } from "@/utils/expenseCalculations";
import { formatMonthLabel } from "@/utils/formatters";

export function useReportAnalytics() {
  const { expenses, selectedMonth } = useExpenses();
  const { categories } = useCategories();
  const { filters, update, reset } = useReportFilters(selectedMonth);

  const [drillCategoryId, setDrillCategoryId] = useState<string | null>(null);

  const analytics = useMemo(() => {
    const months = scopeMonths(filters);
    const filtered = applyFilters(expenses, filters, months);
    const breakdown = buildCategoryBreakdown(filtered, categories, filters);
    const totalPeriod = filtered.reduce((sum, e) => sum + e.value, 0);
    const { fixedTotal, variableTotal } = splitFixedVariable(filtered);

    const recurrenceSlices: RecurrenceSlice[] = (
      ["MONTHLY", "ONCE", "YEARLY", "WEEKLY"] as const
    )
      .map((key) => ({
        key,
        value: sumValues(filtered.filter((e) => e.recurrence === key)),
      }))
      .filter((slice) => slice.value > 0);

    const semesterTrend: SemesterPoint[] = monthKeysBack(
      filters.baseMonth,
      6,
    ).map((key) => {
      const items = expenses.filter((e) => e.dueDate.startsWith(key));
      const fixed = sumValues(items.filter((e) => e.recurrence !== "ONCE"));
      const variable = sumValues(items.filter((e) => e.recurrence === "ONCE"));
      return {
        name: formatMonthLabel(key),
        Fixas: fixed,
        Variáveis: variable,
        Total: fixed + variable,
      };
    });

    return {
      totalPeriod,
      totalCount: filtered.length,
      avgTicket: filtered.length ? totalPeriod / filtered.length : 0,
      fixedTotal,
      variableTotal,
      fixedPct: totalPeriod > 0 ? totalPeriod / filtered.length : 0,
      paidCount: filtered.filter((e) => e.status === "PAID").length,
      breakdown,
      recurrenceSlices,
      semesterTrend,
    };
  }, [expenses, categories, filters]);

  const drillCategory =
    analytics.breakdown.find((c) => c.id === drillCategoryId) ?? null;

  return {
    ...analytics,
    filters,
    update,
    reset,
    drillCategoryId,
    setDrillCategoryId,
    drillCategory,
  };
}
