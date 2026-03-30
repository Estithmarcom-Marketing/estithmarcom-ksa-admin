import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  path: string | number;
  icon: LucideIcon;
};

export type NavGroup = {
  label: "الرئيسية" | "التواصل" | "الإعدادات";
  items: NavItem[];
};