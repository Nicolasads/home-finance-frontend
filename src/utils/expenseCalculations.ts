import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import { toIsoDate } from "./formatters";
import { Expense } from "@/types/expense";
import { CategoryDto } from "@/types/category";

export const getMonthKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const getPreviousMonth = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);

  return getMonthKey(new Date(year, month - 2, 1));
};

export const filterByMonth = <
  T extends {
    value: number;
    status?: string;
    monthKey?: string;
    dueDate?: string;
  },
>(
  expenses: Array<T>,
  monthKey: string,
): T[] =>
  expenses.filter((expense) => {
    const expenseMonthKey = expense.monthKey ?? expense.dueDate?.slice(0, 7);
    return expenseMonthKey === monthKey;
  });

export const sumValues = (expenses: Array<{ value: number }>) =>
  expenses.reduce((acc, expense) => acc + expense.value, 0);

export const getEffectiveStatus = (
  expense: {
    status: string;
    dueDate?: string;
  },
  today: Date = new Date(toIsoDate(new Date())),
) => {
  const isOverdue =
    expense.status === EXPENSE_STATUS.PENDING &&
    expense.dueDate &&
    new Date(expense.dueDate) < today;

  return isOverdue ? EXPENSE_STATUS.OVERDUE : expense.status;
};

export const calculateVariation = (
  currentMonthTotal: number,
  previousMonthTotal: number,
) =>
  previousMonthTotal > 0
    ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
    : 0;

export const summarizeByStatus = (
  expenses: Array<{ value: number; status: string }>,
  status: string,
) => {
  const matching = expenses.filter(
    (expense) => getEffectiveStatus(expense) === status,
  );

  return { value: sumValues(matching), count: matching.length };
};

export const calculateMonthlyStats = (
  monthExpenses: Array<{ value: number; status: string; dueDate: string }>,
  previousMonthTotal: number,
) => {
  const total = sumValues(monthExpenses);

  return {
    total,
    variation: calculateVariation(total, previousMonthTotal),
    paid: summarizeByStatus(monthExpenses, EXPENSE_STATUS.PAID),
    pending: summarizeByStatus(monthExpenses, EXPENSE_STATUS.PENDING),
    overdue: summarizeByStatus(monthExpenses, EXPENSE_STATUS.OVERDUE),
  };
};

export const buildMonthlyHistory = (
  expenses: Array<{ monthKey: string; value: number }>,
  endMonthKey: string,
  months: number,
) => {
  const monthKeys = [];
  let cursor = endMonthKey;

  for (let i = 0; i < months; i++) {
    monthKeys.unshift(cursor);
    cursor = getPreviousMonth(cursor);
  }

  return monthKeys.map((monthKey) => ({
    monthKey,
    total: sumValues(filterByMonth(expenses, monthKey)),
  }));
};

export const getTotalsByCategory = (
  monthExpenses: Expense[],
  categories: CategoryDto[],
) =>
  categories
    .map((category) => ({
      category,
      total: sumValues(
        monthExpenses.filter((e) => e.categoryId === category.id),
      ),
    }))
    .filter((item) => item.total > 0);
