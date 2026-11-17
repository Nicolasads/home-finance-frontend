"use client";

import { useCategorySummaries } from "@/hooks/useCategorySummaries";
import CategoryCard from "./CategoryCard";

export function CategoriesView() {
  const { summaries } = useCategorySummaries();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {summaries.map((summary) => (
        <CategoryCard key={summary.category.id} summary={summary} />
      ))}
    </div>
  );
}
