import { CategoryDto } from "@/types/category";
import { request } from "./httpClient";

export const categorySevice = {
  list: () => request<CategoryDto[]>("/categories", { method: "GET" }),
};
