"use client";

import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import { expenseService } from "@/services/expensiveService";
import { Expense, ExpenseInput } from "@/types/expense";
import { getMonthKey } from "@/utils/expenseCalculations";
import { toIsoDate } from "@/utils/formatters";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type ExpensesContextValue = {
  expenses: Expense[];
  selectedMonth: string;
  setSelectedMonth: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
  saveExpenses: (data: Expense, id?: string) => Promise<Expense>;
  removeExpense: (id: string) => Promise<void>;
  togglePaid: (expense: Expense) => Promise<Expense>;
};

export const ExpensesContext = createContext<ExpensesContextValue | null>(null);

export function ExpensesProvider({ children }: React.PropsWithChildren) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    function selectedMonthSetValue() {
      setSelectedMonth(getMonthKey(new Date()));
    }

    async function getExpenses() {
      try {
        const response = await expenseService.list();

        setExpenses(response);
      } catch {
        setError("Não foi possível carregar as despesas.");
      } finally {
        setIsLoading(false);
      }
    }

    selectedMonthSetValue();
    getExpenses();
  }, []);

  //tipar essa função
  const saveExpenses = useCallback(
    async (data: ExpenseInput, id?: string): Promise<Expense> => {
      const saved = !!id
        ? await expenseService.update(id, data)
        : await expenseService.create(data);

      setExpenses((prev) =>
        id ? prev.map((e) => (e.id === id ? saved : e)) : [saved, ...prev],
      );
      return saved;
    },
    [],
  );

  const removeExpense = useCallback(async (id: string) => {
    await expenseService.remove(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const togglePaid = useCallback(
    (expense: Expense) => {
      const isPaid = expense.status === EXPENSE_STATUS.PAID;

      return saveExpenses(
        {
          ...expense,
          status: isPaid ? EXPENSE_STATUS.PENDING : EXPENSE_STATUS.PAID,
          paymentDate: isPaid ? null : toIsoDate(),
        },
        expense.id,
      );
    },
    [saveExpenses],
  );

  const value = useMemo(() => {
    return {
      expenses,
      selectedMonth,
      setSelectedMonth,
      isLoading,
      error,
      saveExpenses,
      removeExpense,
      togglePaid,
    };
  }, [
    expenses,
    selectedMonth,
    setSelectedMonth,
    isLoading,
    error,
    saveExpenses,
    removeExpense,
    togglePaid,
  ]);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
