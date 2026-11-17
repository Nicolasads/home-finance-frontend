import { PeriodOption } from "@/types/period";
import { getMonthKey, getPreviousMonth } from "./expenseCalculations";

const MONTHS_BACK = 11;

export const formatPeriodLabel = (monthKey: string): string => {
  const [year, month] = monthKey.split("-").map(Number);
  const label = new Date(year, month - 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return label.charAt(0).toUpperCase() + label.slice(1).replace(" de ", " de ");
};

export const buildPeriodOtions = (
  baseDate: Date = new Date(),
): PeriodOption[] => {
  const options: PeriodOption[] = [];
  let cursor = getMonthKey(baseDate);

  for (let i = 0; i <= MONTHS_BACK; i++) {
    options.push({ value: cursor, label: formatPeriodLabel(cursor) });
    cursor = getPreviousMonth(cursor);
  }

  return options;
};
