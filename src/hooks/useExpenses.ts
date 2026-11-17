import { ExpensesContext } from "@/context/ExpensesContext";
import { useContext } from "react";

export const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpenses deverá ser usado dentro de ExpensesProvider");
  }

  return context;
};
