import { useMemo } from "react";
import { useExpenses } from "./useExpenses";
import {
  buildMonthlyHistory,
  calculateMonthlyStats,
  filterByMonth,
  getEffectiveStatus,
  getPreviousMonth,
  getTotalsByCategory,
  sumValues,
} from "@/utils/expenseCalculations";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import { useCategories } from "./useCategories";

const HISTORY_MONTHS = 6;
const UPCOMING_LIMIT = 4;

export const useDashboardData = () => {
  const { expenses, selectedMonth } = useExpenses();
  const { categories } = useCategories();

  return useMemo(() => {
    const monthExpenses = filterByMonth(expenses, selectedMonth);
    const monthlyValues = Array.from(
      new Set(expenses.map((expense) => expense.dueDate.slice(0, 7))),
    ).map((monthKey) => ({
      monthKey,
      value: sumValues(filterByMonth(expenses, monthKey)),
    }));

    const previousMonthTotal = sumValues(
      filterByMonth(expenses, getPreviousMonth(selectedMonth)),
    );

    return {
      hasAnyExpense: expenses.length > 0,
      hasMonthExpense: monthExpenses.length > 0,
      stats: calculateMonthlyStats(monthExpenses, previousMonthTotal),
      monthlyHistory: buildMonthlyHistory(
        monthlyValues,
        selectedMonth,
        HISTORY_MONTHS,
      ),
      categoryTotals: getTotalsByCategory(monthExpenses, categories),
      upcomingBills: monthExpenses
        .filter((e) => getEffectiveStatus(e) !== EXPENSE_STATUS.PAID)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, UPCOMING_LIMIT),
      recentExpenses: [...monthExpenses]
        .sort((a, b) => b.dueDate.localeCompare(a.dueDate))
        .slice(0, 5),
    };
  }, [expenses, selectedMonth, categories]);
};
