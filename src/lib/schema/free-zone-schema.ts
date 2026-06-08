import { z } from "zod";

export const freeZoneFormSchema = z.object({
  title_ar: z.string().min(1, "العنوان بالعربي مطلوب"),
  title_en: z.string().min(1, "العنوان بالانجليزي مطلوب"),
  slug_ar: z.string().min(1, "الرابط بالعربي مطلوب"),
  slug_en: z.string().min(1, "الرابط بالانجليزي مطلوب"),
  image: z
    .custom<
      File | string
    >((val) => (typeof val === "string" && val.length > 0) || val instanceof File, { message: "الصورة مطلوبة" })
    .nullable(),
  content_ar: z.string().min(1, "المحتوى بالعربي مطلوب"),
  content_en: z.string().min(1, "المحتوى بالانجليزي مطلوب"),
  faqs: z.array(
    z.object({
      question_ar: z.string().min(1, "السؤال بالعربي مطلوب"),
      question_en: z.string().min(1, "السؤال بالانجليزي مطلوب"),
      answer_ar: z.string().min(1, "الجواب بالعربي مطلوب"),
      answer_en: z.string().min(1, "الجواب بالانجليزي مطلوب"),
      published: z.boolean(),
    })
  ),
  active: z.boolean(),
});

export type FreeZoneFormValues = z.infer<typeof freeZoneFormSchema>;
