import { CategoriesContext } from "@/context/CategoriesContext";
import { useContext } from "react";

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories deve ser usado dentro de CategoriesProvider",
    );
  }

  return context;
}
