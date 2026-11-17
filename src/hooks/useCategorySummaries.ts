import { useMemo } from "react";
import { filterByMonth } from "@/utils/expenseCalculations";
import { buildCategorySummaries } from "@/utils/categorySummary";
import { useExpenses } from "./useExpenses";
import { useCategories } from "./useCategories";

export function useCategorySummaries() {
  const { expenses, selectedMonth } = useExpenses();
  const { categories } = useCategories();

  const summaries = useMemo(
    () =>
      buildCategorySummaries(
        categories,
        filterByMonth(expenses, selectedMonth),
      ),
    [categories, expenses, selectedMonth],
  );

  return { summaries };
}
