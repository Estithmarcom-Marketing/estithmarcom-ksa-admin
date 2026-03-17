export type PageMeta = { title: string; description: string };

export const PAGE_TITLES: Record<string, PageMeta> = {
  overview: { title: "نظرة عامة", description: "مرحبا بك مجدد!" },
  services: { title: "الخدمات", description: "اضافة, تعديل و تصفح الخدمات" },
  blog: { title: "المدونة", description: "اضافة, تعديل و تصفح المدونات" },
  team: { title: "الفريق", description: "اضافة, تعديل و تصفح الفريق" },
  requests: { title: "الطلبات", description: "تصفح الطلبات المرسلة" },
  messages: { title: "رسائل التواصل", description: "تصفح رسائل التواصل" },
  settings: { title: "معلومات الموقع", description: "تحديث إعدادات الموقع" },
  profile: { title: "الملف الشخصي", description: "تعديل الملف الشخصي" },
  comments: { title: "التعليقات", description: "تصفح تعليقات المدونة" },
  subscribes: { title: "الأشتراكات", description: "تصفح الأشتراكات" },
};

export const SUB_TITLES: Record<string, Record<string, PageMeta>> = {
  blog: {
    new: { title: "إضافة مدونة", description: "إضافة مدونة جديدة" },
    edit: { title: "تعديل مدونة", description: "تعديل بيانات المدونة" },
    read: { title: "عرض مدونة", description: "تفاصيل المدونة" },
  },
  services: {
    new: { title: "إضافة خدمة", description: "إضافة خدمة جديدة" },
    edit: { title: "تعديل خدمة", description: "تعديل بيانات الخدمة" },
    read: { title: "عرض خدمة", description: "تفاصيل الخدمة" },
  },
  team: {
    new: { title: "إضافة عضو", description: "إضافة عضو جديد" },
    edit: { title: "تعديل عضو", description: "تعديل بيانات العضو" },
    read: { title: "عرض عضو", description: "تفاصيل العضو" },
  },
};

export const FALLBACK_META: PageMeta = {
  title: "لوحة التحكم",
  description: "",
};
export function resolvePageMeta(pathname: string): PageMeta {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const isId = !isNaN(Number(last));
  const action = isId ? segments[segments.length - 2] : last;
  const parent = isId
    ? segments[segments.length - 3]
    : segments[segments.length - 2];

  const subMeta = parent ? SUB_TITLES[parent]?.[action] : undefined;

  return subMeta ?? PAGE_TITLES[action] ?? PAGE_TITLES[last] ?? FALLBACK_META;
}
