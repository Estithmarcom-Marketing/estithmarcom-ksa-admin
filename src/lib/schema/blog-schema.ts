import { z } from "zod";

export const blogFormSchema = z.object({
  title_ar:            z.string().min(1, "العنوان بالعربي مطلوب"),
  title_en:            z.string().min(1, "العنوان بالانجليزي مطلوب"),
  subtitle_ar:         z.string().min(1, "العنوان الفرعي بالعربي مطلوب"),
  subtitle_en:         z.string().min(1, "العنوان الفرعي بالانجليزي مطلوب"),
  image:               z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable(),
  short_content_ar:    z.string().min(1, "المحتوى القصير بالعربي مطلوب"),
  short_content_en:    z.string().min(1, "المحتوى القصير بالانجليزي مطلوب"),
  content_ar:          z.string().min(1, "المحتوى بالعربي مطلوب"),
  content_en:          z.string().min(1, "المحتوى بالانجليزي مطلوب"),
  published:           z.boolean(),
  meta_title_ar:       z.string().min(1, "عنوان الصفحة بالعربي مطلوب"),
  meta_title_en:       z.string().min(1, "عنوان الصفحة بالانجليزي مطلوب"),
  meta_description_ar: z.string().min(1, "وصف الصفحة بالعربي مطلوب"),
  meta_description_en: z.string().min(1, "وصف الصفحة بالانجليزي مطلوب"),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;