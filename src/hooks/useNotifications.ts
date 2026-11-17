import { AppNotification } from "@/types/notification";
import { useExpenses } from "./useExpenses";
import { useEffect, useMemo, useState } from "react";
import { getEffectiveStatus } from "@/utils/expenseCalculations";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { NOTIFICATION_TONES } from "@/constants/notification";

const DUE_SOON_DAYS = 2;

const addDays = (isoDate: string, days: number): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day + days);

  return date.toLocaleDateString("en-CA");
};

export function useNotifications(): AppNotification[] {
  const { expenses } = useExpenses();
  const [todayDate, setTodayDate] = useState<Date | null>(null);

  useEffect(() => {
    function addDate() {
      setTodayDate(new Date());
    }

    addDate();
  }, []);

  return useMemo(() => {
    if (!todayDate) return [];

    const today = todayDate.toLocaleDateString("en-CA");
    const limit = addDays(today, DUE_SOON_DAYS);

    return expenses.flatMap<AppNotification>((expense) => {
      const status = getEffectiveStatus(expense, todayDate);

      if (status === EXPENSE_STATUS.OVERDUE) {
        return [
          {
            id: `overdue-${expense.id}`,
            title: "Conta vencida",
            message: `${expense.name} (${formatCurrency(expense.value)}) venceu em ${formatDate(expense.dueDate)}`,
            tone: NOTIFICATION_TONES.OVERDUE,
            createdAt: expense.dueDate,
          },
        ];
      }

      const isDueSoon =
        status === EXPENSE_STATUS.PENDING &&
        expense.dueDate >= today &&
        expense.dueDate <= limit;

      if (isDueSoon) {
        return [
          {
            id: `due-soon-${expense.id}`,
            title: "Vencimento próximo",
            message: `${expense.name} vence em ${formatDate(expense.dueDate)}`,
            tone: NOTIFICATION_TONES.DUE_SOON,
            createdAt: expense.dueDate,
          },
        ];
      }

      return [];
    });
  }, [expenses, todayDate]);
}
