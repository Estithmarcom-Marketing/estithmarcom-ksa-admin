import { z } from "zod";

export const highlightFormSchema = z.object({
  label_ar: z.string().min(1, "العنوان بالعربي مطلوب"),
  label_en: z.string().min(1, "العنوان بالانجليزي مطلوب"),
  value_ar: z.string().min(1, "القيمة بالعربي مطلوبة"),
  value_en: z.string().min(1, "القيمة بالانجليزي مطلوبة"),
  image: z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable().optional(),
});

export type HighlightFormValues = z.infer<typeof highlightFormSchema>;
