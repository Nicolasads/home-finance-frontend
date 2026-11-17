import type { LucideIcon } from "lucide-react";

export interface CategoryPalette {
  dot: string;
  text: string;
  soft: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  pallete: CategoryPalette;
  budget: number;
}

export type CategoryTotals = {
  category: {
    id: string;
    name: string;
    pallete: {
      dot: string;
      text: string;
      border: string;
    };
    budget: number;
    icon: LucideIcon;
  };
  total: number;
}[];

export interface CategorySummary {
  category: CategoryDto;
  spent: number;
  budget: number;
  usagePercent: number;
  remaining: number;
  expenseCount: number;
}

export interface CategoryDto {
  id: string;
  name: string;
  budget: number | string;
  colorKey: string;
  iconKey: string;
  palette: string;
}
