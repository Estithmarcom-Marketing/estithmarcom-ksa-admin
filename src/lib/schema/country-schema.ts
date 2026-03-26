import { z } from "zod";

export const countryFormSchema = z.object({
  name_ar: z.string().min(1, "الاسم بالعربي مطلوب"),
  name_en: z.string().min(1, "الاسم بالانجليزي مطلوب"),
  title_ar: z.string().min(1, "العنوان بالعربي مطلوب"),
  title_en: z.string().min(1, "العنوان بالانجليزي مطلوب"),
  description_ar: z.string().min(1, "الوصف بالعربي مطلوب"),
  description_en: z.string().min(1, "الوصف بالانجليزي مطلوب"),
  active: z.boolean(),
  image: z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable(),
});

export type CountryFormValues = z.infer<typeof countryFormSchema>;
