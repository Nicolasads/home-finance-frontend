import { CheckCircle2, Plus, Sparkles, Wallet } from "lucide-react";
import Button from "../ui/Button";

interface EmptyExpenseStateProps {
  periodLabel: string;
  hasAnyExpense: boolean;
  onCreate: () => void;
}

export const EmptyExpensesState = ({
  periodLabel,
  hasAnyExpense,
  onCreate,
}: EmptyExpenseStateProps) => {
  const title = hasAnyExpense
    ? "Nenhuma despesa neste mês "
    : "Nenhuma despesa cadastrada";
  const description = hasAnyExpense
    ? `Não há contas para ${periodLabel}. Escolha outro período ou cadastre uma nova despesa.`
    : "Você ainda não adicionou nenhuma conta ou despesa. Comece a organizar suas finanças agora mesmo!";
  const titleButton = hasAnyExpense
    ? "Nova despesa"
    : "Cadastrar primeira despesa";

  return (
    <div className="bg-white dark:bg-slate-900 p-8 sm:p-14 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6 space-y-6 animate-scaleIn">
      {/* Decorative Icon Container */}
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-indigo-100 to-violet-100 dark:from-indigo-950/60 dark:to-violet-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
          <Wallet className="w-12 h-12" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-amber-400 text-slate-900 shadow-lg">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Empty State Text */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Primary Call to Action Button */}
      <Button
        onClick={onCreate}
        className="flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm cursor-pointer"
      >
        <Plus className="h-5 w-5" />
        <span>{titleButton}</span>
      </Button>

      {/* Quick Tip Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center gap-2 text-slate-400 text-xs">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span>
          Você pode acompanhar relatórios, categorias e vencimentos em tempo
          real.
        </span>
      </div>
    </div>
  );
};

export default EmptyExpensesState;
