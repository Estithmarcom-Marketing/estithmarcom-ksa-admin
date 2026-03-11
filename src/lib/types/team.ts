import type { PaginationType } from "./pagination"

export interface MemberType {
  id: number
  image: any
  name_ar: string
  name_en: string
  position_ar: string
  position_en: string
  active: boolean
  created_at: boolean
}

export interface MemberResType {
  members: MemberType[]
  meta: PaginationType
}