import type { PaginationType } from "./pagination"

export interface RequestType {
  id: number
  name: string
  email: string
  phone: string
  message: string
  is_contacted: boolean
  created_at: string
  service: {
    id: number
    title_ar: string
  }
}

export interface RequestResType {
  requests: RequestType[]
  meta: PaginationType
}