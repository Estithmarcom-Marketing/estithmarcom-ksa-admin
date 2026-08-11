import { z } from "zod";

const adminBaseSchema = z.object({
  name: z
    .string()
    .min(3, "يجب أن يكون الاسم على الأقل 3 حروف")
    .max(50, "يجب أن لا يتجاوز الاسم 50 حرفاً"),

  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),

  phone_country: z.enum(["966", "962"], "اختر الدولة"),

  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "يجب أن يحتوي رقم الهاتف على أرقام فقط",
    }),

  password: z
    .string()
    .min(8, "يجب أن تكون كلمة السر على الأقل 8 أحرف"),

  password_confirmation: z
    .string(),
});

export const addAdminSchema = adminBaseSchema
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا السر غير متطابقتين",
    path: ["password_confirmation"],
  })
  .refine(
    (data) => {
      if (!data.phone_number) return true;
      if (data.phone_country === "966") return /^5\d{8}$/.test(data.phone_number);
      if (data.phone_country === "962") return /^7\d{8}$/.test(data.phone_number);
      return false;
    },
    {
      message: "رقم الهاتف غير صحيح لهذه الدولة",
      path: ["phone_number"],
    }
  );

export const editAdminSchema = adminBaseSchema.omit({
  password: true,
  password_confirmation: true,
});

export const changeAdminPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "يجب أن تكون كلمة السر على الأقل 8 أحرف"),

    password_confirmation: z
      .string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا السر غير متطابقتين",
    path: ["password_confirmation"],
  });

export type AdminFormValues = z.infer<typeof addAdminSchema>;
export type AdminEditValues = z.infer<typeof editAdminSchema>;
export type AdminPasswordValues = z.infer<typeof changeAdminPasswordSchema>;

export interface AdminCreatePayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

export interface AdminUpdatePayload {
  name: string;
  email: string;
  phone?: string;
}

export interface AdminPasswordPayload {
  password: string;
  password_confirmation: string;
}

export function toCreateAdminPayload(values: AdminFormValues): AdminCreatePayload {
  const payload: AdminCreatePayload = {
    name: values.name,
    email: values.email,
    password: values.password,
    password_confirmation: values.password_confirmation,
  };

  if (values.phone_number) {
    payload.phone = `+${values.phone_country}${values.phone_number}`;
  }

  return payload;
}

export function toUpdateAdminPayload(values: AdminEditValues): AdminUpdatePayload {
  const payload: AdminUpdatePayload = {
    name: values.name,
    email: values.email,
  };

  if (values.phone_number) {
    payload.phone = `+${values.phone_country}${values.phone_number}`;
  }

  return payload;
}
