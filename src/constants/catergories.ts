import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import { buildCategorySummaries } from "@/utils/categorySummary";
import { filterByMonth } from "@/utils/expenseCalculations";
import {
  Droplet,
  Home,
  LucideIcon,
  MoreHorizontal,
  Smile,
  Tv,
  Utensils,
  Zap,
} from "lucide-react";
import { useMemo } from "react";

export const COLOR_CLASSES: Record<
  string,
  { dot: string; text: string; soft: string }
> = Object.freeze({
  blue: {
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    soft: "bg-blue-100 dark:bg-blue-950/50",
  },
  emerald: {
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    soft: "bg-emerald-100 dark:bg-emerald-950/50",
  },
  amber: {
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    soft: "bg-amber-100 dark:bg-amber-950/50",
  },
  cyan: {
    dot: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
    soft: "bg-cyan-100 dark:bg-cyan-950/50",
  },
  purple: {
    dot: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    soft: "bg-purple-100 dark:bg-purple-950/50",
  },
  pink: {
    dot: "bg-pink-500",
    text: "text-pink-600 dark:text-pink-400",
    soft: "bg-pink-100 dark:bg-pink-950/50",
  },
  rose: {
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    soft: "bg-rose-100 dark:bg-rose-950/50",
  },
  teal: {
    dot: "bg-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    soft: "bg-teal-100 dark:bg-teal-950/50",
  },
  indigo: {
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    soft: "bg-indigo-100 dark:bg-indigo-950/50",
  },
  orange: {
    dot: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    soft: "bg-orange-100 dark:bg-orange-950/50",
  },
  slate: {
    dot: "bg-slate-500",
    text: "text-slate-600 dark:text-slate-300",
    soft: "bg-slate-100 dark:bg-slate-800",
  },
});

export const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Utensils,
  Zap,
  Droplet,
  Tv,
  Smile,
  MoreHorizontal,
};

export const CATEGORIES = Object.freeze([
  {
    id: "moradia",
    name: "Moradia",
    pallete: COLOR_CLASSES.blue,
    budget: 1800,
    icon: Home,
  },
  {
    id: "alimentacao",
    name: "Alimentação",
    pallete: COLOR_CLASSES.emerald,
    budget: 800,
    icon: Utensils,
  },
  {
    id: "energia",
    name: "Energia",
    pallete: COLOR_CLASSES.orange,
    budget: 300,
    icon: Zap,
  },
  {
    id: "agua",
    name: "Água",
    pallete: COLOR_CLASSES.purple,
    budget: 150,
    icon: Droplet,
  },
  {
    id: "outros",
    name: "Outros",
    pallete: COLOR_CLASSES.red,
    budget: 500,
    icon: MoreHorizontal,
  },
]);

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

const FALLBACK_CATEGORY = CATEGORIES[CATEGORIES.length - 1];

export const getCategoryById = (id: string) =>
  CATEGORIES.find((category) => category.id === id) || FALLBACK_CATEGORY;
