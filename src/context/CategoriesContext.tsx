"use client";

import { categorySevice } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface CategoriesContextValue {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
}

export const CategoriesContext = createContext<CategoriesContextValue | null>(
  null,
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await categorySevice.list();

        setCategories(response);
      } catch {
        setError("Não foi possível carregar as categorias");
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const value = useMemo(
    () => ({ categories, isLoading, error }),
    [categories, isLoading, error],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
