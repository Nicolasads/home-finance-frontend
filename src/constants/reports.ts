import { EXPENSE_STATUS } from "./expenseStatus";

export const REPORT_SCOPES = [
  { value: "current", label: "Mês selecionado (pontual)" },
  { value: "3m", label: "Últimos 3 meses" },
  { value: "6m", label: "Últimos 6 meses" },
  { value: "year", label: "Ano completo" },
] as const;

export const RECURRENCE_FILTER_OPTIONS = [
  { value: "all", label: "Todas as recorrências" },
  { value: "MONTHLY", label: "Fixas / mensais" },
  { value: "ONCE", label: "Variáveis / únicas" },
  { value: "YEARLY", label: "Anuais" },
  { value: "WEEKLY", label: "Semanais" },
] as const;

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: EXPENSE_STATUS.PAID, label: "Somente pagas" },
  { value: EXPENSE_STATUS.PENDING, label: "Somente pendentes" },
  { value: "OVERDUE", label: "Somente vencidas" },
];

export const CHART_COLORS = {
  fixed: "#6366f1",
  variable: "#10b981",
  total: "#f59e0b",
  reference: "#94a3b8",
  recurrence: {
    MONTHLY: "#6366f1",
    ONCE: "#10b981",
    YEARLY: "#f59e0b",
    WEEKLY: "#ec4899",
  },
} as const;
