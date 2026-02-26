import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  User,
  LogOut,
  Scale,
  Users,
  Globe,
  PhoneCall,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "الرئيسية",
    items: [
      {
        label: "نظرة عامة",
        path: "/dashboard/overview",
        icon: LayoutDashboard,
      },
      { label: "الخدمات", path: "/dashboard/services", icon: Wrench },
      { label: "المدونة", path: "/dashboard/blog", icon: BookOpen },
      { label: "الفريق", path: "/dashboard/team", icon: Users },
    ],
  },
  {
    label: "التواصل",
    items: [
      { label: "الطلبات", path: "/dashboard/requests", icon: Scale },
      { label: "رسائل التواصل", path: "/dashboard/messages", icon: PhoneCall },
    ],
  },
  {
    label: "الإعدادات",
    items: [
      { label: "معلومات الموقع", path: "/dashboard/settings", icon: Globe },
      { label: "الملف الشخصي", path: "/dashboard/profile", icon: User },
      { label: "تسجيل خروج", path: "/logout", icon: LogOut },
    ],
  },
];
