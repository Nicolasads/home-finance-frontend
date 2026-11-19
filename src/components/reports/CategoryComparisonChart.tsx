"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import { CHART_COLORS } from "@/constants/reports";
import { formatCurrency } from "@/utils/formatters";
import type { CategoryRow } from "@/utils/reportAnalytics";

interface CategoryComparisonChartProps {
  rows: CategoryRow[];
  baseLabel: string;
  compareLabel: string;
}

export function CategoryComparisonChart({
  rows,
  baseLabel,
  compareLabel,
}: CategoryComparisonChartProps) {
  const theme = useChartTheme();
  const data = rows.map((row) => ({
    name: row.name,
    [baseLabel]: row.baseSum,
    [compareLabel]: row.compSum,
  }));

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="mb-6">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Comparativo por categoria
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {baseLabel} (atual) × {compareLabel} (referência)
        </p>
      </header>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.grid}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: theme.axis }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `R$${v}`}
              tick={{ fontSize: 11, fill: theme.axis }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={theme.tooltip}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
            <Bar
              dataKey={baseLabel}
              fill={CHART_COLORS.fixed}
              radius={[6, 6, 0, 0]}
              barSize={22}
            />
            <Bar
              dataKey={compareLabel}
              fill={CHART_COLORS.reference}
              radius={[6, 6, 0, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
