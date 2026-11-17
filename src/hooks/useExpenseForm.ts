import { Expense, ExpenseFormErrors, ExpenseFormValues } from "@/types/expense";
import { useExpenses } from "./useExpenses";
import { useExpenseModal } from "./useExpenseModal";
import { useToast } from "./useToast";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  createEmptyExpenseForm,
  expenseToFormValues,
  formValuesToExpenseInput,
} from "@/utils/expenseFormMapper";
import { validateExpenseForm } from "@/utils/expenseValidation";

export function useExpenseForm(editing: Expense | null) {
  const { saveExpenses } = useExpenses();
  const { closeModal } = useExpenseModal();
  const { showToast } = useToast();

  const [values, setValues] = useState<ExpenseFormValues>(() =>
    editing ? expenseToFormValues(editing) : createEmptyExpenseForm(),
  );
  const [errors, setErrors] = useState<ExpenseFormErrors>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateExpenseForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    const id = editing?.id ?? "";

    try {
      await saveExpenses({ ...formValuesToExpenseInput(values), id }, id);
      showToast(
        editing
          ? "Despesa atualizada com sucesso!"
          : "Nova despesa cadastrada com sucesso!",
      );
    } catch {
      showToast("Não foi possível salvar a despesa. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    closeModal,
  };
}
