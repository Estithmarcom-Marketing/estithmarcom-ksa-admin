import type { LucideIcon } from "lucide-react";

export interface CardType {
  total: number;
  change_percentage: number;
  trend: "down" | "up" | "neutral";
  label: string;
}

export interface StatItem {
  count: number;
  percentage: number;
  trend: "neutral" | "up" | "down";
}

export interface RequestByService {
  service: string;
  count: number;
  percentage: number;
  trend: "neutral" | "up" | "down";
}

export interface OverViewType {
  services: StatItem;
  service_requests: StatItem;
  contact_us: StatItem;
  requests_by_service: RequestByService[];
}

export interface FullCardType {
  title: string;
  Icon: LucideIcon;
  card: CardType;
}
