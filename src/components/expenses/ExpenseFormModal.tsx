"use client";

import { useExpenseModal } from "@/hooks/useExpenseModal";
import { Modal } from "@/components/ui/Modal";
import { ExpenseForm } from "./ExpenseForm";

export function ExpenseFormModal() {
  const { isOpen, editingExpense, closeModal } = useExpenseModal();

  if (!isOpen) return null;

  return (
    <Modal
      title={editingExpense ? "Editar despesa" : "Nova despesa"}
      onClose={closeModal}
    >
      {/* key força o formulário a reiniciar ao trocar de despesa */}
      <ExpenseForm key={editingExpense?.id ?? "new"} editing={editingExpense} />
    </Modal>
  );
}
