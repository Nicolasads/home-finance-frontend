import { useMemo } from "react";
import { buildReportData } from "@/utils/reportCalculations";
import { useExpenses } from "./useExpenses";
import { useCategories } from "./useCategories";

export function useReportData() {
  const { expenses, selectedMonth } = useExpenses();
  const { categories } = useCategories();

  return useMemo(
    () => buildReportData(expenses, categories, selectedMonth),
    [expenses, categories, selectedMonth],
  );
}
