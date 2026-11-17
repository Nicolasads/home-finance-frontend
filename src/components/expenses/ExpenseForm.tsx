"use client";

import { useCategories } from "@/hooks/useCategories";
import { useExpenseForm } from "@/hooks/useExpenseForm";
import { Expense } from "@/types/expense";
import { FormField } from "../ui/FormField";
import { SelectField } from "../ui/SelectField";
import { RECURRENCE_OPTIONS, STATUS_OPTIONS } from "@/constants/expenseForm";
import { TextAreaField } from "../ui/TextAreaField";
import Button from "../ui/Button";

interface ExpenseFormProps {
  editing: Expense | null;
}

export function ExpenseForm({ editing }: ExpenseFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    closeModal,
  } = useExpenseForm(editing);
  const { categories, isLoading } = useCategories();

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6" noValidate>
      <FormField
        label="Nome da despesa"
        name="name"
        placeholder="Ex.: Conta de luz, aluguel..."
        value={values.name}
        onChange={handleChange}
        error={errors?.name}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Valor (R$)"
          name="value"
          inputMode="decimal"
          placeholder="0,00"
          value={values.value}
          onChange={handleChange}
          error={errors?.value}
        />
        <SelectField
          label="Categoria"
          name="categoryId"
          options={categoryOptions}
          value={values?.categoryId ?? ""}
          onChange={handleChange}
          error={errors?.categoryId}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Data de vencimento"
          name="dueDate"
          type="date"
          value={values.dueDate}
          onChange={handleChange}
          error={errors?.dueDate}
        />
        <SelectField
          label="Status"
          name="status"
          options={STATUS_OPTIONS}
          value={values.status}
          onChange={handleChange}
        />
      </div>

      <SelectField
        label="Recorrência"
        name="recurrence"
        options={RECURRENCE_OPTIONS}
        value={values.recurrence}
        onChange={handleChange}
      />

      <TextAreaField
        label="Descrição (opcional)"
        name="description"
        placeholder="Detalhes adicionais sobre a conta..."
        value={values.description}
        onChange={handleChange}
      />

      <footer className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Button type="button" variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Salvar despesa
        </Button>
      </footer>
    </form>
  );
}
