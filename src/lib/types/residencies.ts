import type { PaginationType } from "./pagination";
import type { CountryType } from "./countries";

export interface ResidencyType {
  id: number;
  title_ar: string;
  title_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_ar: string;
  meta_description_en: string;
  image: any;
  country: CountryType;
  created_at: string;
}

export interface ResidencyResType {
  residencies: ResidencyType[];
  meta: PaginationType;
}
