import { Plus, Search } from "lucide-react";
import { EXPENSE_STATUS } from "@/constants/expenseStatus";
import Button from "@/components/ui/Button";
import type { StatusFilter } from "@/hooks/useBillFilters";
import { useCategories } from "@/hooks/useCategories";

const INPUT_CLASSES =
  "rounded-xl border-none bg-slate-100 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-slate-300";

interface BillFiltersProps {
  search: string;
  status: StatusFilter;
  categoryId: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onCategoryChange: (value: string) => void;
  onCreate: () => void;
}

export function BillFilters({
  search,
  status,
  categoryId,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onCreate,
}: BillFiltersProps) {
  const { categories } = useCategories();

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row">
      <label className="relative w-full md:w-80">
        <span className="sr-only">Pesquisar despesa</span>
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar despesa..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border-none bg-slate-100 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800/80 dark:text-white"
        />
      </label>

      <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
        <select
          aria-label="Filtrar por status"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
          className={INPUT_CLASSES}
        >
          <option value="all">Status: todos</option>
          <option value={EXPENSE_STATUS.PAID}>Pago</option>
          <option value={EXPENSE_STATUS.PENDING}>Pendente</option>
          <option value={EXPENSE_STATUS.OVERDUE}>Vencido</option>
        </select>

        <select
          aria-label="Filtrar por categoria"
          value={categoryId}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={INPUT_CLASSES}
        >
          <option value="all">Categoria: todas</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Button
          onClick={onCreate}
          className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Nova conta
        </Button>
      </div>
    </div>
  );
}
