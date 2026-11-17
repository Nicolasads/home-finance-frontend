"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Expense } from "@/types/expense";

interface ExpenseModalContextValue {
  isOpen: boolean;
  editingExpense: Expense | null;
  openCreateModal: () => void;
  openEditModal: (expense: Expense) => void;
  closeModal: () => void;
}

export const ExpenseModalContext =
  createContext<ExpenseModalContextValue | null>(null);

export function ExpenseModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const openCreateModal = useCallback(() => {
    setEditingExpense(null);
    setIsOpen(true);
  }, []);

  const openEditModal = useCallback((expense: Expense) => {
    setEditingExpense(expense);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setEditingExpense(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      editingExpense,
      openCreateModal,
      openEditModal,
      closeModal,
    }),
    [isOpen, editingExpense, openCreateModal, openEditModal, closeModal],
  );

  return (
    <ExpenseModalContext.Provider value={value}>
      {children}
    </ExpenseModalContext.Provider>
  );
}
