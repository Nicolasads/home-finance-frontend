import type { CategoryDto } from "@/types/category";
import type { Expense } from "@/types/expense";
import { sumValues } from "./expenseCalculations";

export interface CategorySummary {
  category: CategoryDto;
  spent: number;
  budget: number;
  usagePercent: number;
  remaining: number;
}

export const calculateBudgetUsage = (spent: number, budget: number): number =>
  budget > 0 ? (spent / budget) * 100 : 0;

export const buildCategorySummaries = (
  categories: CategoryDto[],
  monthExpenses: Expense[],
): CategorySummary[] =>
  categories.map((category) => {
    const items = monthExpenses.filter((e) => e.categoryId === category.id);
    const budget = Number(category.budget); // Decimal chega como string
    const spent = sumValues(items);

    return {
      category,
      spent,
      budget,
      usagePercent: budget > 0 ? (spent / budget) * 100 : 0,
      remaining: Math.max(0, budget - spent),
      expenseCount: items.length,
    };
  });
