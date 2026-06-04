import type { PaginationType } from "./pagination";

export interface HighlightType {
  id: number;
  label_en: string;
  label_ar: string;
  value_en: number | string;
  value_ar: number | string;
  image: any;
  created_at: string;
  updated_at: string;
}

export interface HighlightResType {
  highlights: HighlightType[];
  meta: PaginationType;
}
