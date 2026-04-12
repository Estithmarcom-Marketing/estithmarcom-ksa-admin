import { z } from "zod";

export const clientFormSchema = z.object({
  alt_ar:   z.string().min(1, "الاسم بالعربي مطلوب"),
  alt_en:   z.string().min(1, "الاسم بالانجليزي مطلوب"),
  link:      z.string().url("يجب أن يكون رابطاً صحيحاً ويبدأ بـ http:// أو https://").min(1, "الرابط مطلوب"),
  published: z.boolean(),
  image:     z.custom<File | string>(
    (val) => (typeof val === "string" && val.length > 0) || val instanceof File,
    { message: "الصورة مطلوبة" }
  ).nullable(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;