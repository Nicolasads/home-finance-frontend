import type { Category, CategoryDto } from "./category";

export interface MonthlyTotal {
  monthKey: string;
  total: number;
}

export interface StatusSummary {
  value: number;
  count: number;
}

export interface MonthlyStats {
  total: number;
  variation: number;
  paid: StatusSummary;
  pending: StatusSummary;
  overdue: StatusSummary;
}

export interface CategoryTotal {
  category: CategoryDto;
  total: number;
}
