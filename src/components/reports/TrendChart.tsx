"use client";

import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Bar,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import { CHART_COLORS } from "@/constants/reports";
import { formatCurrency } from "@/utils/formatters";
import type { SemesterPoint } from "@/types/report";

interface TrendChartProps {
  data: SemesterPoint[];
}

export function TrendChart({ data }: TrendChartProps) {
  const theme = useChartTheme();

  return (
    <section className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="mb-6">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Evolução: fixas vs. variáveis
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Composição mensal e curva de total
        </p>
      </header>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
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
              tickFormatter={(v: number) =>
                `R$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`
              }
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
              dataKey="Fixas"
              stackId="a"
              fill={CHART_COLORS.fixed}
              barSize={28}
            />
            <Bar
              dataKey="Variáveis"
              stackId="a"
              fill={CHART_COLORS.variable}
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
            <Line
              type="monotone"
              dataKey="Total"
              stroke={CHART_COLORS.total}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
