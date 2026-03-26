import type { PaginationType } from "./pagination";

export interface ClientType {
  id: number;
  name_ar: string;
  name_en: string;
  link: string;
  image: any;
  created_at: string;
}

export interface ClientResType {
  clients: ClientType[];
  meta: PaginationType;
}
