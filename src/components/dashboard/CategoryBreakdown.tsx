import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { CategoryTotals } from "@/types/category";

interface CategoryBreakdownProps {
  items: CategoryTotals;
  total: number;
}

export function CategoryBreakdown({ items, total }: CategoryBreakdownProps) {
  const router = useRouter();

  return (
    <section className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Gastos por Categoria
        </h3>
        <p className="text-xs text-slate-500">Distribuição do mês atual</p>
      </header>

      <ul className="my-2 space-y-3.5">
        {items.map(({ category, total: categoryTotal }) => {
          const percentage = total > 0 ? (categoryTotal / total) * 100 : 0;

          return (
            <li key={category.id} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${category.pallete.dot}`}
                  />
                  {category.name}
                </span>
                <span className="text-slate-900 dark:text-white">
                  {formatCurrency(categoryTotal)} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  style={{ width: `${percentage}%` }}
                  className={`h-full rounded-full ${category.pallete.dot}`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        variant="secondary"
        onClick={() => router.push(ROUTES.CATEGORIES)}
        className="w-full"
      >
        Ver todas as categorias
      </Button>
    </section>
  );
}
