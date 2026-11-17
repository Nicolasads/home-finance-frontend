import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import type { ExpenseStatus } from "@/types/expense";
import { cn } from "@/utils/classNames";

const STATUS_CLASSES: Record<ExpenseStatus, string> = {
  [EXPENSE_STATUS.PAID]:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  [EXPENSE_STATUS.PENDING]:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  [EXPENSE_STATUS.OVERDUE]:
    "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
};

interface StatusBadgeProps {
  status: ExpenseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-[11px] font-bold",
        STATUS_CLASSES[status],
      )}
    >
      {status}
    </span>
  );
}
