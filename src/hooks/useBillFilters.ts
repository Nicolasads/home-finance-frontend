import { Expense, ExpenseStatus } from "@/types/expense";
import { useExpenses } from "./useExpenses";
import { useMemo, useState } from "react";
import { filterByMonth, getEffectiveStatus } from "@/utils/expenseCalculations";

export type StatusFilter = ExpenseStatus | "all";

const byDueDate = (a: Expense, b: Expense): number =>
  a.dueDate.localeCompare(b.dueDate);

export function useBillFilters() {
  const { expenses, selectedMonth } = useExpenses();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [categoryId, setCategoryId] = useState("all");

  const bills = useMemo(() => {
    const term = search.trim().toLowerCase();

    return filterByMonth(expenses, selectedMonth)
      .filter((bill) => !term || bill.name.toLowerCase().includes(term))
      .filter((bill) => status === "all" || getEffectiveStatus(bill) === status)
      .filter((bill) => categoryId === "all" || bill.category === categoryId)
      .sort(byDueDate);
  }, [expenses, selectedMonth, search, status, categoryId]);

  return {
    bills,
    filters: { search, status, categoryId },
    setSearch,
    setStatus,
    setCategoryId,
  };
}
