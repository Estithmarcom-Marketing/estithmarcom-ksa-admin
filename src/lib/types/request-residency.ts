import type { PaginationType } from "./pagination"

export interface RequestResidencyType {
  id: number
  name: string
  email: string
  phone: string
  city: string | null
  status: string
  residency: {
    id: number
    title_ar: string
    title_en: string | null
    slug_ar: string | null
    slug_en: string | null
    published: boolean | null
    description_ar: string | null
    description_en: string | null
    image: string
    meta_title_ar: string | null
    meta_title_en: string | null
    meta_description_ar: string | null
    meta_description_en: string | null
    created_at: string | null
    updated_at: string | null
  }
  notes: string | null
  created_at: string
  updated_at: string | null
}

export interface RequestResidencyResType {
  residenciesRequests: RequestResidencyType[]
  meta: PaginationType
}
