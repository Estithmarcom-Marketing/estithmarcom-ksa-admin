import { z } from "zod";

export const staticPageFormSchema = z.object({
  title_ar: z.string().min(1, "العنوان بالعربي مطلوب").max(255, "الحد الأقصى 255 حرف"),
  title_en: z.string().min(1, "العنوان بالانجليزي مطلوب").max(255, "الحد الأقصى 255 حرف"),
  content_ar: z.string().min(1, "المحتوى بالعربي مطلوب"),
  content_en: z.string().min(1, "المحتوى بالانجليزي مطلوب"),
  meta_title_ar: z.string().max(255, "الحد الأقصى 255 حرف").optional().nullable(),
  meta_title_en: z.string().max(255, "الحد الأقصى 255 حرف").optional().nullable(),
  meta_description_ar: z.string().max(2000, "الحد الأقصى 2000 حرف").optional().nullable(),
  meta_description_en: z.string().max(2000, "الحد الأقصى 2000 حرف").optional().nullable(),
});

export type StaticPageFormValues = z.infer<typeof staticPageFormSchema>;
