import { z } from "zod";

export const addAdminSchema = z.object({
  name: z
    .string()
    .min(8, "يجب أن يكون الاسم على الأقل 8 حروف")
    .max(50, "يجب أن لا يتجاوز الاسم 50 حرفاً"),

  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),

  password: z
    .string()
    .min(4, "يجب أن تكون كلمة السر على الأقل 4 أحرف"),

  password_confirmation: z
    .string(),
})
.refine((data) => data.password === data.password_confirmation, {
  message: "كلمتا السر غير متطابقتين",
  path: ["confirmPassword"],
});

export type AdminFormData = z.infer<typeof addAdminSchema>;