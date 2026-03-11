import { z } from "zod";

export const memberFormSchema = z.object({
  name_ar:     z.string().min(1, "الاسم بالعربي مطلوب"),
  name_en:     z.string().min(1, "الاسم بالانجليزي مطلوب"),
  position_ar: z.string().min(1, "المنصب بالعربي مطلوب"),
  position_en: z.string().min(1, "المنصب بالانجليزي مطلوب"),
  active:      z.boolean(),
  image:       z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable(),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;