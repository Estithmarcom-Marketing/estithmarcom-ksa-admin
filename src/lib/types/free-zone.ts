import type { FAQType } from "./faq";
import type { PaginationType } from "./pagination";

export interface FreeZoneType {
  id: number;
  title_ar: string;
  title_en: string;
  slug_ar: string;
  slug_en: string;
  active: boolean;
  image: string;
  content_ar: string;
  content_en: string;
  faqs: FAQType[];
  created_at: string;
}

export interface FreeZoneResType {
  zones: FreeZoneType[];
  meta: PaginationType;
}
