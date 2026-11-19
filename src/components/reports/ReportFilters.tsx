"use client";

import { BarChart3, FileSpreadsheet } from "lucide-react";
import Button from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import {
  REPORT_SCOPES,
  RECURRENCE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "@/constants/reports";
import type { AnalyticsFilters } from "@/utils/reportAnalytics";
import { useEffect, useMemo, useState } from "react";
import { buildPeriodOptions } from "@/utils/periodOptions";
import { PeriodOption } from "@/types/period";

interface ReportFiltersProps {
  filters: AnalyticsFilters;
  onChange: <K extends keyof AnalyticsFilters>(
    key: K,
    value: AnalyticsFilters[K],
  ) => void;
  onReset: () => void;
  onExport: () => void;
}

export function ReportFilters({
  filters,
  onChange,
  onReset,
  onExport,
}: ReportFiltersProps) {
  const [periodOptions, setPeriodOptions] = useState<PeriodOption[]>([]);

  useEffect(() => {
    const handlePeriodOptions = () => {
      setPeriodOptions(buildPeriodOptions(new Date()));
    };

    handlePeriodOptions();
  }, []);

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Relatórios financeiros
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparação entre meses, recorrência e categorias
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" onClick={onReset}>
            Limpar filtros
          </Button>
          <Button onClick={onExport}>
            <FileSpreadsheet className="mr-2 inline h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <SelectField
          label="Período"
          name="scope"
          options={REPORT_SCOPES}
          value={filters.scope}
          onChange={(e) =>
            onChange("scope", e.target.value as AnalyticsFilters["scope"])
          }
        />
        <SelectField
          label="Mês base"
          name="baseMonth"
          options={periodOptions}
          value={filters.baseMonth}
          onChange={(e) => onChange("baseMonth", e.target.value)}
        />

        <SelectField
          label="Comparar com"
          name="compareMonth"
          options={periodOptions}
          value={filters.compareMonth}
          onChange={(e) => onChange("compareMonth", e.target.value)}
        />
        <SelectField
          label="Recorrência"
          name="recurrence"
          options={RECURRENCE_FILTER_OPTIONS}
          value={filters.recurrence}
          onChange={(e) => onChange("recurrence", e.target.value)}
        />
        <SelectField
          label="Status"
          name="status"
          options={STATUS_FILTER_OPTIONS}
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
        />
      </div>
    </section>
  );
}
