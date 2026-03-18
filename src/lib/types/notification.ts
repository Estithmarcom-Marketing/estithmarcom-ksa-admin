import type { PaginationType } from "./pagination"

export interface NotificationType {
  id: number
  title: string
  body: string
  notifiable_id: number
  type: "comment" | "request_service" | "contact_us" | "newsletter_subscribe"
  created_at: string
  is_read: boolean
}

export interface NotificationResType {
  notifications: NotificationType[]
  meta: PaginationType
}