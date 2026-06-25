import type { PaginationType } from "./pagination"

export interface ChatbotMessageType {
  id: number
  name: string
  phone: string
  status: string
  service: string[]
  details: string | null
  created_at: string
  updated_at: string
}

export interface ChatbotMessageResType {
  messages: ChatbotMessageType[]
  meta: PaginationType
}
