import type { NavGroup } from "@/lib/types/navigation";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Globe,
  PhoneCall,
  ShieldCheck,
  Box,
  HelpCircle,
  Warehouse,
  MapPin,
  Wrench,
  Building2,
  Layers,
  WandSparkles,
  IdCard,
  ClipboardList,
  ClipboardCheck,
  FileText,
  MessageSquareMore,
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
      { label: "الدول", path: "/dashboard/countries", icon: MapPin },
      { label: "الإقامات", path: "/dashboard/residencies", icon: IdCard },
      {
        label: "المناطق الحرة",
        path: "/dashboard/free-zones",
        icon: Building2,
      },
      { label: "شركاؤنا", path: "/dashboard/clients", icon: Warehouse },
      { label: "الأسئلة الشائعة", path: "/dashboard/faqs", icon: HelpCircle },
      { label: "المدونة", path: "/dashboard/blog", icon: BookOpen },
      { label: "الأقسام", path: "/dashboard/categories", icon: Layers },
      { label: "الصفحات الثابتة", path: "/dashboard/static-pages", icon: FileText },
      { label: "الإنجازات", path: "/dashboard/highlights", icon: WandSparkles },
      // { label: "الفريق", path: "/dashboard/team", icon: Users },
      { label: "المشرفين", path: "/dashboard/admins", icon: ShieldCheck },
    ],
  },
  {
    label: "التواصل",
    items: [
      { label: "طلبات الخدمات", path: "/dashboard/requests", icon: ClipboardCheck },
      { label: "طلبات الإقامات", path: "/dashboard/request-residencies", icon: ClipboardList },
      { label: "الأشتراكات", path: "/dashboard/subscribes", icon: Box },
      { label: "رسائل التواصل", path: "/dashboard/messages", icon: PhoneCall },
      { label: "رسائل الشات بوت", path: "/dashboard/chatbot-messages", icon: MessageSquareMore },
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
