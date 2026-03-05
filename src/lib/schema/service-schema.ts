import { z } from "zod";

const faqSchema = z.object({
  question_ar: z.string().min(1, "السؤال بالعربي مطلوب"),
  question_en: z.string().min(1, "Question in English is required"),
  answer_ar:   z.string().min(1, "الجواب بالعربي مطلوب"),
  answer_en:   z.string().min(1, "Answer in English is required"),
});

const featureSchema = z.object({
  feature_ar: z.string().min(1, "الميزة بالعربي مطلوبة"),
  feature_en: z.string().min(1, "Feature in English is required"),
});

export const serviceFormSchema = z.object({
  name_ar:       z.string().min(1, "العنوان بالعربي مطلوب"),
  name_en:       z.string().min(1, "Title in English is required"),
  desc_ar:       z.string().min(1, "الوصف بالعربي مطلوب"),
  desc_en:       z.string().min(1, "Description in English is required"),
  features:      z.array(featureSchema),
  faqs:          z.array(faqSchema),
  meta_title_ar: z.string().min(1, "عنوان الصفحة بالعربي مطلوب"),
  meta_title_en: z.string().min(1, "Meta title in English is required"),
  meta_desc_ar:  z.string().min(1, "وصف الصفحة بالعربي مطلوب"),
  meta_desc_en:  z.string().min(1, "Meta description in English is required"),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;