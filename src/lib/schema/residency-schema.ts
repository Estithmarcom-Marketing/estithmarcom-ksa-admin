import { z } from "zod";

export const residencyFormSchema = z.object({
  title_ar: z.string().min(1, "العنوان بالعربي مطلوب"),
  title_en: z.string().min(1, "العنوان بالانجليزي مطلوب"),
  description_ar: z.string().min(1, "الوصف بالعربي مطلوب"),
  description_en: z.string().min(1, "الوصف بالانجليزي مطلوب"),
  meta_title_ar: z.string().min(1, "عنوان الصفحة بالعربي مطلوب"),
  meta_title_en: z.string().min(1, "عنوان الصفحة بالانجليزي مطلوب"),
  meta_description_ar: z.string().min(1, "وصف الصفحة بالعربي مطلوب"),
  meta_description_en: z.string().min(1, "وصف الصفحة بالانجليزي مطلوب"),
  published: z.boolean(),
  image: z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable(),
  country_id: z.string().min(1, "يجب اختيار الدولة"),
});

export type ResidencyFormValues = z.infer<typeof residencyFormSchema>;
