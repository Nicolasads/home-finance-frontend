import { Expense } from "@/types/expense";

export const buildExpensesCsv = (
  rows: Expense[],
  categoryName: (id: string) => string,
): string => {
  const header = [
    "Nome",
    "Categoria",
    "Valor",
    "Vencimento",
    "Pagamento",
    "Status",
    "Recorrência",
  ];

  const lines = rows.map((e) =>
    [
      e.name,
      categoryName(e.categoryId ?? ""),
      String(e.value).replace(".", ","),
      e.dueDate,
      e.paymentDate ?? "",
      e.status,
      e.recurrence,
    ]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(";"),
  );

  return "\uFEFF" + [header.join(";"), ...lines].join("\n");
};
