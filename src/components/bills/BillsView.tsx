"use client";

import { useBillFilters } from "@/hooks/useBillFilters";
import { useExpenseModal } from "@/hooks/useExpenseModal";
import { useExpenses } from "@/hooks/useExpenses";
import { useToast } from "@/hooks/useToast";
import type { Expense } from "@/types/expense";
import { BillFilters } from "./BillFilters";
import { BillsTable } from "./BillsTable";

const TOAST_MESSAGES = {
  paid: "Status da conta atualizado!",
  removed: "Despesa removida com sucesso!",
  error: "Não foi possível concluir a ação. Tente novamente.",
} as const;

export function BillsView() {
  const { bills, filters, setSearch, setStatus, setCategoryId } =
    useBillFilters();
  const { togglePaid, removeExpense } = useExpenses();
  const { openCreateModal, openEditModal } = useExpenseModal();
  const { showToast } = useToast();

  const handleTogglePaid = async (bill: Expense) => {
    try {
      await togglePaid(bill);
      showToast(TOAST_MESSAGES.paid);
    } catch {
      showToast(TOAST_MESSAGES.error, "error");
    }
  };

  const handleDelete = async (bill: Expense) => {
    if (!window.confirm(`Excluir "${bill.name}"?`)) return;

    try {
      await removeExpense(bill.id);
      showToast(TOAST_MESSAGES.removed, "info");
    } catch {
      showToast(TOAST_MESSAGES.error, "error");
    }
  };

  return (
    <div className="space-y-6">
      <BillFilters
        search={filters.search}
        status={filters.status}
        categoryId={filters.categoryId}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCategoryChange={setCategoryId}
        onCreate={openCreateModal}
      />

      <BillsTable
        bills={bills}
        onTogglePaid={handleTogglePaid}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
    </div>
  );
}
