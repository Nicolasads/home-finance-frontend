"use client";

import { Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { useReportData } from "@/hooks/useReportData";
import { useToast } from "@/hooks/useToast";
import { ReportInsights } from "./ReportInsights";
import { ReportSummaryCards } from "./ReportSummaryCards";

export function ReportsView() {
  const data = useReportData();
  const { showToast } = useToast();

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Relatório financeiro
          </h3>
          <p className="text-xs text-slate-500">
            Gastos, variações e alertas do mês selecionado
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            showToast("Exportação em PDF ainda não disponível.", "info")
          }
        >
          <Download className="mr-2 inline h-4 w-4" />
          Exportar PDF
        </Button>
      </header>

      <ReportSummaryCards data={data} />

      <div>
        <h4 className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
          Alertas e recomendações
        </h4>
        <ReportInsights insights={data.insights} />
      </div>
    </section>
  );
}
