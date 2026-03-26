import type { NavGroup } from "@/lib/types/navigation";
import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  User,
  Scale,
  Users,
  Globe,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Box,
  HelpCircle,
} from "lucide-react";

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
      { label: "الأسئلة الشائعة", path: "/dashboard/faqs", icon: HelpCircle },
      { label: "المدونة", path: "/dashboard/blog", icon: BookOpen },
      { label: "التعليقات", path: "/dashboard/comments", icon: MessageCircle },
      { label: "الفريق", path: "/dashboard/team", icon: Users },
      { label: "المشرفين", path: "/dashboard/admins", icon: ShieldCheck },
    ],
  },
  {
    label: "التواصل",
    items: [
      { label: "الطلبات", path: "/dashboard/requests", icon: Scale },
      { label: "الأشتراكات", path: "/dashboard/subscribes", icon: Box },
      { label: "رسائل التواصل", path: "/dashboard/messages", icon: PhoneCall },
    ],
  },
  {
    label: "الإعدادات",
    items: [
      { label: "معلومات الموقع", path: "/dashboard/settings", icon: Globe },
      { label: "الملف الشخصي", path: "/dashboard/profile", icon: User },
    ],
  },
];
