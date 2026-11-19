"use client";

import { useReportAnalytics } from "@/hooks/useReportAnalytics";
import { useToast } from "@/hooks/useToast";
import { formatPeriodLabel } from "@/utils/periodOptions";
import { ReportFilters } from "./ReportFilters";
import { ReportKpiCards } from "./ReportKpiCards";
import { TrendChart } from "./TrendChart";
import { RecurrenceDonut } from "./RecurrenceDonut";
import { CategoryComparisonChart } from "./CategoryComparisonChart";
import { VariationHighlights } from "./VariationHighlights";
import { CategoryBreakdownTable } from "./CategoryBreakdownTable";
import { CategoryDrawer } from "./CategoryDrawer";

export function ReportsView() {
  const report = useReportAnalytics();
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <ReportFilters
        filters={report.filters}
        onChange={report.update}
        onReset={report.reset}
        onExport={() =>
          showToast("Exportação em CSV disponível em breve.", "info")
        }
      />

      <ReportKpiCards report={report} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TrendChart data={report.semesterTrend} />
        </div>
        <div className="lg:col-span-5">
          <RecurrenceDonut
            slices={report.recurrenceSlices}
            total={report.totalPeriod}
          />
        </div>
      </div>

      <CategoryComparisonChart
        rows={report.breakdown}
        baseLabel={formatPeriodLabel(report.filters.baseMonth)}
        compareLabel={formatPeriodLabel(report.filters.compareMonth)}
      />

      <VariationHighlights rows={report.breakdown} />

      <CategoryBreakdownTable
        rows={report.breakdown}
        onInspect={report.setDrillCategoryId}
      />

      <CategoryDrawer
        category={report.drillCategory}
        onClose={() => report.setDrillCategoryId(null)}
      />
    </div>
  );
}
