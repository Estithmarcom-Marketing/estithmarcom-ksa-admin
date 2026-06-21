import type { PaginationType } from "./pagination"

export interface NotificationType {
  id: number
  title: string
  body: string
  notifiable_id: number
  type: "request_service" | "contact_us" | "subscription" | "request_residency" | "chatbot_message"
  created_at: string
  is_read: boolean
}

export interface NotificationResType {
  notifications: NotificationType[]
  meta: PaginationType
}