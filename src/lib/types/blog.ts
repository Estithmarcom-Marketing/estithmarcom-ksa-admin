import type { PaginationType } from "./pagination"

export interface BlogType {
  id: number
  title_ar: string
  title_en: string
  subtitle_ar: string
  subtitle_en: string
  image: string
  short_content_ar: string
  short_content_en: string
  content_ar: string
  content_en: string
  published: boolean
  meta_title_ar: string
  meta_title_en: string
  meta_description_ar: string
  meta_description_en: string
  created_at: string
}

export interface BlogResType {
  blogs: BlogType[]
  meta: PaginationType
}