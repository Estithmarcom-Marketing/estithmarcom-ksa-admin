import type { PaginationType } from "./pagination";

export interface FAQType {
  id: number;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  published: boolean;
  created_at: string;
}

export interface FAQResType {
  faqs: FAQType[];
  meta: PaginationType;
}
