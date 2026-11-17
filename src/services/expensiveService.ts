import { request } from "./httpClient";
import type { Expense, ExpenseInput } from "@/types/expense";

const EXPENSE_URL = "/expenses";

interface ExpenseDto extends Omit<
  Expense,
  "value" | "dueDate" | "paymentDate"
> {
  value: string | number;
  dueDate: string;
  paymentDate: string | null;
}

const toDateOnly = (value: string | null): string | null =>
  value ? value.slice(0, 10) : null;

const toExpense = (dto: ExpenseDto): Expense => ({
  ...dto,
  value: Number(dto.value),
  dueDate: toDateOnly(dto.dueDate) as string,
  paymentDate: toDateOnly(dto.paymentDate),
});

export const expenseService = {
  list: async (): Promise<Expense[]> => {
    const data = await request<Expense[]>(EXPENSE_URL, { method: "GET" });

    return data.map(toExpense);
  },
  create: async (data: ExpenseInput): Promise<Expense> =>
    toExpense(
      await request<ExpenseDto>(EXPENSE_URL, { method: "POST", body: data }),
    ),
  update: async (id: string, data: ExpenseInput): Promise<Expense> =>
    toExpense(
      await request<ExpenseDto>(`${EXPENSE_URL}/${id}`, {
        method: "PUT",
        body: data,
      }),
    ),
  remove: (id: string) =>
    request<null>(`${EXPENSE_URL}/${id}`, { method: "DELETE" }),
};
