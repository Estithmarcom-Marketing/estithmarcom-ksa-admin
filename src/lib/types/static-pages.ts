import type { PaginationType } from "./pagination";

export interface StaticPageType {
  id: number;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  slug_ar: string;
  slug_en: string;
  meta_title_ar: string | null;
  meta_title_en: string | null;
  meta_description_ar: string | null;
  meta_description_en: string | null;
  created_at: string;
}

export interface StaticPageResType {
  pages: StaticPageType[];
  meta: PaginationType;
}
