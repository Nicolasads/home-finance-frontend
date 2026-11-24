import { getMonthKey } from "@/utils/expenseCalculations";
import { AnalyticsFilters } from "@/utils/reportAnalytics";
import { useState } from "react";

const previousKey = (key: string) => {
  const [y, m] = key.split("-").map(Number);
  return getMonthKey(new Date(y, m - 2, 1));
};

export function useReportFilters(defaultMonth: string) {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    scope: "current",
    baseMonth: defaultMonth,
    compareMonth: previousKey(defaultMonth),
    recurrence: "all",
    status: "all",
  });

  const update = <K extends keyof AnalyticsFilters>(
    key: K,
    value: AnalyticsFilters[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const reset = () =>
    setFilters((prev) => ({
      ...prev,
      scope: "current",
      baseMonth: defaultMonth,
      compareMonth: previousKey(defaultMonth),
      recurrence: "all",
      status: "all",
    }));

  return { filters, update, reset };
}
