import { ExpenseFormErrors, ExpenseFormValues } from "@/types/expense";

const MESSAGES = {
  name: "Informe o nome da despesa",
  categoryId: "Escolha uma categoria",
  value: "Informe um valor maior que zero",
  dueDate: "Informe a data de vencimento",
} as const;

const isPositiveNumber = (raw: string): boolean => {
  const parsed = Number(raw.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0;
};

export const validateExpenseForm = (
  values: ExpenseFormValues,
): ExpenseFormErrors => {
  const errors: ExpenseFormErrors = {};

  if (!values.name.trim()) errors.name = MESSAGES.name;
  if (!values.categoryId) errors.categoryId = MESSAGES.categoryId;
  if (!isPositiveNumber(values.value)) errors.value = MESSAGES.value;
  if (!values.dueDate) errors.dueDate = MESSAGES.value;

  return errors;
};
