"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import { CHART_COLORS, RECURRENCE_FILTER_OPTIONS } from "@/constants/reports";
import { formatCurrency } from "@/utils/formatters";
import type { RecurrenceSlice } from "@/types/report";

interface RecurrenceDonutProps {
  slices: RecurrenceSlice[];
  total: number;
}

export function RecurrenceDonut({ slices, total }: RecurrenceDonutProps) {
  const theme = useChartTheme();
  const labelOf = (key: string) =>
    RECURRENCE_FILTER_OPTIONS.find((o) => o.value === key)?.label ?? key;

  return (
    <section className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header>
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Distribuição por recorrência
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Proporção por frequência de cobrança
        </p>
      </header>

      {slices.length === 0 ? (
        <p className="py-12 text-center text-xs text-slate-400 dark:text-slate-500">
          Sem dados para os filtros atuais.
        </p>
      ) : (
        <>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="key"
                  innerRadius={55}
                  outerRadius={82}
                  paddingAngle={4}
                >
                  {slices.map((slice) => (
                    <Cell
                      key={slice.key}
                      fill={CHART_COLORS.recurrence[slice.key]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={theme.tooltip}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-2 dark:border-slate-800">
            {slices.map((slice) => (
              <li
                key={slice.key}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-2 text-xs dark:bg-slate-800/50"
              >
                <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: CHART_COLORS.recurrence[slice.key],
                    }}
                  />
                  {labelOf(slice.key)}
                </span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {total > 0 ? Math.round((slice.value / total) * 100) : 0}%
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
