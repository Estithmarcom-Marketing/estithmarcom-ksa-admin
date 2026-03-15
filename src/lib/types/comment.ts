import type { PaginationType } from "./pagination"

export interface CommentType {
  id: number
  name: string
  email: string
  body: string
  blog: {
    id: number
    slug_ar: string
    slug_en: string
  }
  created_at: string
  approved: boolean
}

export interface CommentResType {
  comments: CommentType[]
  meta: PaginationType
}