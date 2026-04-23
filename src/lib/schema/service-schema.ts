import { z } from "zod";

export const serviceFormSchema = z.object({
  title_ar: z.string().min(1, "العنوان بالعربي مطلوب"),
  title_en: z.string().min(1, "العنوان بالانجليزي مطلوب"),
  image: z.any().optional().nullable(),
  short_description_ar: z.string().min(1, "الوصف القصير بالعربي مطلوب"),
  short_description_en: z.string().min(1, "الوصف القصير بالانجليزي مطلوب"),
  long_description_ar: z.string().min(1, "الوصف الطويل بالعربي مطلوب"),
  long_description_en: z.string().min(1, "الوصف الطويل بالانجليزي مطلوب"),
  published: z.boolean(),
  country_ids: z.array(z.string()).min(1, "يجب اختيار دولة واحدة على الأقل"),
  features: z.array(
    z.object({
      title_ar: z.string().min(1, "الميزة بالعربي مطلوبة"),
      title_en: z.string().min(1, "الميزة بالانجليزي مطلوبة"),
      published: z.boolean(),
    })
  ),
  faqs: z.array(
    z.object({
      question_ar: z.string().min(1, "السؤال بالعربي مطلوب"),
      question_en: z.string().min(1, "السؤال بالانجليزي مطلوب"),
      answer_ar: z.string().min(1, "الجواب بالعربي مطلوب"),
      answer_en: z.string().min(1, "الجواب بالانجليزي مطلوب"),
      published: z.boolean(),
    })
  ),
  meta_title_ar: z.string().min(1, "عنوان الصفحة بالعربي مطلوب"),
  meta_title_en: z.string().min(1, "عنوان الصفحة بالانجليزي مطلوب"),
  meta_description_ar: z.string().min(1, "وصف الصفحة بالعربي مطلوب"),
  meta_description_en: z.string().min(1, "وصف الصفحة بالانجليزي مطلوب"),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;