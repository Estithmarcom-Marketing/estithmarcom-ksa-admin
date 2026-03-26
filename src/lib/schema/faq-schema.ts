import { z } from "zod";

export const faqFormSchema = z.object({
  question_ar: z.string().min(1, "السؤال بالعربي مطلوب"),
  question_en: z.string().min(1, "السؤال بالانجليزي مطلوب"),
  answer_ar: z.string().min(1, "الجواب بالعربي مطلوب"),
  answer_en: z.string().min(1, "الجواب بالانجليزي مطلوب"),
  published: z.boolean(),
});

export type FAQFormValues = z.infer<typeof faqFormSchema>;
