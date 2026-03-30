import type { PaginationType } from "./pagination"

export interface ContactType {
  id: number
  name: string
  email: string
  phone: string
  message: string
  contacted: boolean
  created_at: string
}

export interface ContactResType {
  contact_us: ContactType[]
  meta: PaginationType
}