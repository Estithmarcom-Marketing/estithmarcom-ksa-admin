import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(1, { message: "كلمة السر مطلوبة" })
});

export type LoginFormValues = z.infer<typeof loginSchema>;