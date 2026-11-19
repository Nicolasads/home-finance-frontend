import { CategoryTotal } from "./dashboard";

export interface ReportInsight {
  id: string;
  tone: "positive" | "warning";
  message: string;
}

export interface ReportData {
  averageMonthly: number;
  averageMonths: number;
  biggestCategory: CategoryTotal | null;
  biggestCategoryShare: number;
  savings: number;
  savingsCategories: string[];
  insights: ReportInsight[];
}

export interface SemesterPoint {
  name: string; // rótulo do mês, ex.: "jun"
  Fixas: number;
  Variáveis: number;
  Total: number;
}

export interface RecurrenceSlice {
  key: "MONTHLY" | "ONCE" | "YEARLY" | "WEEKLY";
  value: number;
}
