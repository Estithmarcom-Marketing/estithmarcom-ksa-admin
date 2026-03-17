import type { LucideIcon } from "lucide-react";

export interface CardType {
  total: number;
  change_percentage: number;
  trend: "down" | "up" | "neutral";
  label: string;
}

export interface BarChartType {
  title: string;
  total: number;
}

export interface OverViewType {
  comments: CardType;
  contact_us: CardType;
  service_requests: CardType;
  newsletter_subscriptions: CardType;
  most_requested_services: BarChartType[];
  yearly_charts: {
    months: number[];
    comments: number[];
    messages: number[];
    requests: number[];
  };
}

export interface FullCardType {
  title: string
  Icon: LucideIcon
  card: CardType
}
