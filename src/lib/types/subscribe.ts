import type { PaginationType } from "./pagination"

export interface SubType {
  id: number
  email: string
  created_at: string
}

export interface SubResType {
  subscriptions: SubType[]
  meta: PaginationType
}