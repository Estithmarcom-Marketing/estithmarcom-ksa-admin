import type { PaginationType } from "./pagination";

export interface CountryType {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  active: boolean;
  image: string;
  created_at: string;
}

export interface FeaturesType {
  id: number;
  title_ar: string;
  title_en: string;
  published: boolean;
}

export interface FAQType {
  id: number;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  published: boolean;
}

export interface ServiceType {
  id: number;
  title_ar: string;
  title_en: string;
  slug_ar: string;
  slug_en: string;
  short_description_ar: string;
  short_description_en: string;
  long_description_ar: string;
  long_description_en: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_ar: string;
  meta_description_en: string;
  image: any;
  published: boolean;
  countries: CountryType[];
  features: FeaturesType[];
  faqs: FAQType[];
  created_at: string;
}

export interface ServiceResType {
  services: ServiceType[];
  meta: PaginationType;
}
