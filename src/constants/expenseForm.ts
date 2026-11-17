import { EXPENSE_STATUS } from "./expenseStatus";

export const STATUS_OPTIONS = [
  { value: EXPENSE_STATUS.PENDING, label: "Pendente" },
  { value: EXPENSE_STATUS.PAID, label: "Pago" },
] as const;

export const RECURRENCE_OPTIONS = [
  { value: "ONCE", label: "Única" },
  { value: "WEEKLY", label: "Semanal" },
  { value: "MONTHLY", label: "Mensal" },
  { value: "YEARLY", label: "Anual" },
] as const;
