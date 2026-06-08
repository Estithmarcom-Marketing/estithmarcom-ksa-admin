import type { PaginationType } from "./pagination"

export interface RequestType {
  id: number
  name: string
  email: string
  phone: string
  status: string
  created_at: string
  service: {
    id: number
    title_ar: string
  }
  additional_info?: {
    company_name?: string
    service_type?: string
    office_size?: string
    investor_type?: string
    investment_field?: string
    connection_way?: string
    notes?: string
  }
}

export interface RequestResType {
  requests: RequestType[]
  meta: PaginationType
}