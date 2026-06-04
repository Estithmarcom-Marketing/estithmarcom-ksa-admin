import type { PaginationType } from "./pagination";

export interface CategoryType {
  id: number;
  name_en: string;
  name_ar: string;
  blogs_count: number | string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResType {
  categories: CategoryType[];
  meta: PaginationType;
}
