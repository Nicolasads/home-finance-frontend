import { Expense } from "@/types/expense";
import {
  filterByMonth,
  getPreviousMonth,
  getTotalsByCategory,
  sumValues,
} from "./expenseCalculations";
import { ReportData, ReportInsight } from "@/types/report";
import { BUDGET_ALERT_THRESHOLD } from "@/constants/budget";
import { CategoryDto } from "@/types/category";
import { findCategoryByName, matchesAnyName } from "./categoryMatching";

const HISTORY_MONTHS = 6;
const SAVINGS_CATEGORY_NAMES = ["Lazer", "Transporte"] as const;
const FOOD_CATEGORY_NAME = "Alimentação";

const collectMonthKeys = (endMonthKey: string, count: number): string[] => {
  const keys: string[] = [];
  let cursor = endMonthKey;

  for (let i = 0; i < count; i++) {
    keys.unshift(cursor);
    cursor = getPreviousMonth(cursor);
  }

  return keys;
};

const calculateAverage = (values: number[]): number =>
  values.length > 0
    ? sumValues(values.map((value) => ({ value, categoryId: "" }))) /
      values.length
    : 0;

const sumByCategory = (expenses: Expense[], categoryId: string): number =>
  sumValues(expenses.filter((expense) => expense.categoryId === categoryId));

export const buildInsights = (
  monthExpenses: Expense[],
  previousMonthExpenses: Expense[],
  categories: CategoryDto[],
): ReportInsight[] => {
  const insights: ReportInsight[] = [];

  const food = findCategoryByName(categories, FOOD_CATEGORY_NAME);

  if (food) {
    insights.push({
      id: "food-down",
      tone: "positive",
      message:
        "Os gastos com alimentação ficaram iguais ou menores que no mês anterior.",
    });
  }

  categories
    .filter((category) => {
      const spent = sumByCategory(monthExpenses, category.id);
      const budget = Number(category.budget);
      return budget > 0 && (spent / budget) * 100 > BUDGET_ALERT_THRESHOLD;
    })
    .forEach((category) =>
      insights.push({
        id: `over-${category.id}`,
        tone: "warning",
        message: `${category.name} passou de ${BUDGET_ALERT_THRESHOLD}% do orçamento.`,
      }),
    );

  return insights;
};

export const buildReportData = (
  expenses: Expense[],
  categories: CategoryDto[],
  selectedMonth: string,
): ReportData => {
  const monthKeys = collectMonthKeys(selectedMonth, HISTORY_MONTHS);
  const monthlyTotals = monthKeys.map((key) =>
    sumValues(filterByMonth(expenses, key)),
  );
  const monthExpenses = filterByMonth(expenses, selectedMonth);
  const previousExpenses = filterByMonth(
    expenses,
    getPreviousMonth(selectedMonth),
  );

  const totals = getTotalsByCategory(monthExpenses, categories).sort(
    (a, b) => b.total - a.total,
  );

  const biggest = totals[0] ?? null;
  const monthTotal = sumValues(monthExpenses);

  const savingsCategories = categories
    .filter((cat) => matchesAnyName(cat, SAVINGS_CATEGORY_NAMES))
    .filter((cat) => sumByCategory(monthExpenses, cat.id) > 0)
    .map((cat) => cat.name);

  return {
    averageMonthly: calculateAverage(
      monthlyTotals.filter((total) => total > 0),
    ),
    averageMonths: HISTORY_MONTHS,
    biggestCategory: biggest,
    biggestCategoryShare:
      biggest && monthTotal > 0 ? (biggest.total / monthTotal) * 100 : 0,
    savings: 0,
    savingsCategories,
    insights: buildInsights(monthExpenses, previousExpenses, categories),
  };
};
