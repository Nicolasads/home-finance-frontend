import { Expense, ExpenseFormValues, ExpenseInput } from "@/types/expense";
import { toIsoDate } from "./formatters";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";

export const createEmptyExpenseForm = (
  defaultDueDate = toIsoDate(),
): ExpenseFormValues => ({
  name: "",
  description: "",
  categoryId: "",
  value: "",
  dueDate: defaultDueDate,
  status: EXPENSE_STATUS.PENDING,
  recurrence: "ONCE",
  paymentDate: null,
});

export const expenseToFormValues = (expense: Expense): ExpenseFormValues => ({
  name: expense.name,
  description: expense.description ?? "",
  categoryId: expense.categoryId,
  value: String(expense.value),
  dueDate: expense.dueDate,
  recurrence: expense.recurrence,
  status: expense.status,
  paymentDate: null,
});

export const formValuesToExpenseInput = (
  values: ExpenseFormValues,
): ExpenseInput => ({
  name: values.name,
  description: values.description,
  categoryId: values.categoryId ?? null,
  value: Number(values.value.replace(",", ".")),
  dueDate: values.dueDate,
  paymentDate: values.paymentDate === EXPENSE_STATUS.PAID ? toIsoDate() : null,
  status: values.status,
  recurrence: values.recurrence,
});
