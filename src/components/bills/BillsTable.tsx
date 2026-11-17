import { Check, Edit3, Trash2 } from "lucide-react";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import { COLOR_CLASSES, getCategoryById } from "@/constants/catergories";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Expense, ExpenseStatus } from "@/types/expense";
import { getEffectiveStatus } from "@/utils/expenseCalculations";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/classNames";
import { useCategories } from "@/hooks/useCategories";

interface BillsTableProps {
  bills: Expense[];
  onTogglePaid: (bill: Expense) => void;
  onEdit: (bill: Expense) => void;
  onDelete: (bill: Expense) => void;
}

const HEADERS = [
  "Nome / Descrição",
  "Categoria",
  "Valor",
  "Vencimento",
  "Status",
  "Ações",
];

export function BillsTable({
  bills,
  onTogglePaid,
  onEdit,
  onDelete,
}: BillsTableProps) {
  const { categories } = useCategories();

  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50">
              {HEADERS.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 last:text-right"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs font-medium dark:divide-slate-800">
            {bills.length === 0 && (
              <tr>
                <td
                  colSpan={HEADERS.length}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Nenhuma conta encontrada para os filtros selecionados.
                </td>
              </tr>
            )}

            {bills.map((bill) => {
              const category = categoryById.get(bill.categoryId ?? "");
              const status = getEffectiveStatus(bill);
              const isPaid = status === EXPENSE_STATUS.PAID;

              return (
                <tr
                  key={bill.id}
                  className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {bill.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {bill.description || "Sem descrição"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-xl px-2.5 py-1 font-semibold",
                        category?.palette?.soft,
                        category?.palette?.text,
                      )}
                    >
                      {category?.name ?? "Sem categoria"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(bill.value)}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {formatDate(bill.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={status as ExpenseStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onTogglePaid(bill)}
                        aria-label={
                          isPaid ? "Marcar como pendente" : "Marcar como paga"
                        }
                        className={cn(
                          "rounded-xl p-2 transition",
                          isPaid
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(bill)}
                        aria-label="Editar conta"
                        className="rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(bill)}
                        aria-label="Excluir conta"
                        className="rounded-xl bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100 dark:bg-rose-950/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
