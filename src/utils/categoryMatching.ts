import { CategoryDto } from "@/types/category";

const normalize = (value: string): string =>
  value
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const findCategoryByName = (
  categories: CategoryDto[],
  name: string,
): CategoryDto | undefined => {
  const target = normalize(name);
  return categories.find((category) => normalize(category.name) === target);
};

export const matchesAnyName = (
  category: CategoryDto,
  names: readonly string[],
): boolean =>
  names.some((name) => normalize(name) === normalize(category.name));
