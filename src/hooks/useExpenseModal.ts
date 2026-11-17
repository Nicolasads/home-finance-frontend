import { useContext } from "react";
import { ExpenseModalContext } from "@/context/ExpenseModalContext";

export function useExpenseModal() {
  const context = useContext(ExpenseModalContext);
  if (!context) {
    throw new Error(
      "useExpenseModal deve ser usado dentro de ExpenseModalProvider",
    );
  }
  return context;
}
