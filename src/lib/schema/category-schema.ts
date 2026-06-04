import { z } from "zod";

export const categoryFormSchema = z.object({
  name_ar: z.string().min(1, "الاسم بالعربي مطلوب"),
  name_en: z.string().min(1, "الاسم بالانجليزي مطلوب"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
