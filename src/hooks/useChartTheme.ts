import { useTheme } from "./useTheme";

export function useChartTheme() {
  const { isDark } = useTheme();

  return {
    axis: isDark ? "#94a3b8" : "#64748b",
    grid: isDark ? "#1e293b" : "#e2e8f0",
    tooltip: {
      backgroundColor: isDark ? "#0f172a" : "#ffffff",
      borderColor: isDark ? "#1e293b" : "#e2e8f0",
      borderRadius: "16px",
      fontSize: "12px",
      color: isDark ? "#f1f5f9" : "#0f172a",
    },
  };
}
