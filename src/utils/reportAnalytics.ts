import { Expense } from "@/types/expense";
import { getEffectiveStatus, sumValues } from "./expenseCalculations";
import { CategoryDto } from "@/types/category";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";

export interface AnalyticsFilters {
  scope: "current" | "3m" | "6m" | "year";
  baseMonth: string;
  compareMonth: string;
  recurrence: string;
  status: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  colorKey: string;
  count: number;
  ticket: number;
  baseSum: number;
  compSum: number;
  diffVal: number;
  diffPct: number;
  sharePct: number;
  dominantStatus: string;
  items: Expense[];
}

export const monthKeysBack = (endKey: string, count: number): string[] => {
  const [y, m] = endKey.split("-").map(Number);

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(y, m - 1 - (count - 1 - i), 1);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
};

const inMonths = (expense: Expense, months: string[]) =>
  months.includes(expense.dueDate.slice(0, 7));

export const applyFilters = (
  expenses: Expense[],
  filters: AnalyticsFilters,
  months: string[],
) =>
  expenses.filter(
    (e) =>
      inMonths(e, months) &&
      (filters.recurrence === "all" || e.recurrence === filters.recurrence) &&
      (filters.status === "all" || getEffectiveStatus(e) === filters.status),
  );

export const scopeMonths = (filters: AnalyticsFilters): string[] => {
  if (filters.scope === "3m") return monthKeysBack(filters.baseMonth, 3);
  if (filters.scope === "6m") return monthKeysBack(filters.baseMonth, 6);
  if (filters.scope === "year") {
    const year = filters.baseMonth.slice(0, 4);
    return Array.from(
      { length: 12 },
      (_, i) => `${year}-${String(i + 1).padStart(2, "0")}`,
    );
  }
  return [filters.baseMonth];
};

export const calculateVariation = (current: number, previous: number) => ({
  diff: current - previous,
  pct: previous > 0 ? ((current - previous) / previous) * 100 : 0,
});

export const buildCategoryBreakdown = (
  expenses: Expense[],
  categories: CategoryDto[],
  filters: AnalyticsFilters,
): CategoryRow[] => {
  const base = expenses.filter((e) => e.dueDate.startsWith(filters.baseMonth));
  const compare = expenses.filter((e) =>
    e.dueDate.startsWith(filters.compareMonth),
  );
  const baseTotal = sumValues(base);

  return categories
    .map((category): CategoryRow => {
      const items = expenses.filter((e) => e.categoryId === category.id);
      const baseItems = base.filter((e) => e.categoryId === category.id);
      const compItems = compare.filter((e) => e.categoryId === category.id);
      const baseSum = sumValues(baseItems);
      const compSum = sumValues(compItems);
      const variation = calculateVariation(baseSum, compSum);

      return {
        id: category.id,
        name: category.name,
        colorKey: category.colorKey,
        count: items.length,
        ticket: items.length ? sumValues(items) / items.length : 0,
        baseSum,
        compSum,
        diffVal: variation.diff,
        diffPct: variation.pct,
        sharePct: baseTotal > 0 ? (baseSum / baseTotal) * 100 : 0,
        dominantStatus: dominantStatus(items),
        items,
      };
    })
    .filter((row) => row.count > 0);
};

export const splitFixedVariable = (expenses: Expense[]) => {
  const fixed = expenses.filter((e) => e.recurrence !== "ONCE");
  const variable = expenses.filter((e) => e.recurrence === "ONCE");
  return {
    fixedTotal: sumValues(fixed),
    variableTotal: sumValues(variable),
  };
};

export const dominantStatus = (items: Expense[]): string => {
  const counts = new Map<string, number>();

  items.forEach((e) => {
    const s = getEffectiveStatus(e);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  });

  let best = EXPENSE_STATUS.PENDING as string;
  let max = 0;

  counts.forEach((n, s) => {
    if (n > max) {
      max = n;
      best = s;
    }
  });

  return best;
};
