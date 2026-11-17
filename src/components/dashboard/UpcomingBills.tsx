import { Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Expense } from "@/types/expense";

interface UpcomingBills {
  bills: Expense[];
  onPay: (bill: Expense) => void;
}

export function UpcomingBills({ bills, onPay }: UpcomingBills) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">
        Próximas contas a vencer
      </h3>

      {bills.length === 0 ? (
        <p className="text-xs text-slate-400">
          Nenhuma conta pendente neste mês.
        </p>
      ) : (
        <ul className="space-y-3">
          {bills.map((bill) => (
            <li
              key={bill.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {bill.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Vence em {formatDate(bill.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {formatCurrency(bill.value)}
                </span>
                <Button
                  variant="success"
                  onClick={() => onPay(bill)}
                  className="px-3 py-1.5"
                >
                  Pagar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
