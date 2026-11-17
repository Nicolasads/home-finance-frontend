import type { EXPENSE_STATUS } from "@/constants/expenseStatus";

export type ExpenseStatus =
  (typeof EXPENSE_STATUS)[keyof typeof EXPENSE_STATUS];

export type RecurrenceType = "MONTHLY" | "ONCE" | "WEEKLY" | "YEARLY";

export interface Expense {
  id: string;
  name: string;
  category?: string;
  value: number;
  dueDate: string; // formato ISO: YYYY-MM-DD
  paymentDate: string | null;
  status: ExpenseStatus;
  description: string;
  recurrence: RecurrenceType;
  categoryId: string | null;
}

export interface ExpenseFormValues {
  name: string;
  description: string;
  categoryId: string | null;
  value: string;
  dueDate: string;
  status: ExpenseStatus;
  recurrence: RecurrenceType;
  paymentDate: string | null;
}

export type ExpenseInput = Omit<Expense, "id">;
export type ExpenseFormErrors = Partial<
  Record<keyof ExpenseFormValues, string>
>;
