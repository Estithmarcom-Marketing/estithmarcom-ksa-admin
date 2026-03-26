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
  image: any;
  created_at: string;
}

export interface CountryResType {
  countries: CountryType[];
  meta: PaginationType;
}
