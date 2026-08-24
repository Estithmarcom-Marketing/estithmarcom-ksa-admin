import { z } from "zod";

const urlValidation = z
  .string()
  .optional()
  .refine(
    (val) => !val || /^https?:\/\/.+\..+/.test(val),
    { message: "يجب أن يكون رابطاً صحيحاً ويبدأ بـ http:// أو https://" }
  );

const addressSchema = z.object({
  id: z.number().optional(),
  address_ar: z.string().min(1, "العنوان بالعربية مطلوب"),
  address_en: z.string().min(1, "العنوان بالإنجليزية مطلوب"),
});

export const contactInfoSchema = z.object({
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-()]{7,20}$/.test(val),
      { message: "يجب أن يكون رقم هاتف صحيحاً" }
    ),

  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      { message: "يجب أن يكون بريداً إلكترونياً صحيحاً" }
    ),

  addresses: z.array(addressSchema).min(1, "يجب إضافة عنوان واحد على الأقل"),
});

export type ContactInfoValues = z.infer<typeof contactInfoSchema>;
export type AddressValue = z.infer<typeof addressSchema>;

export const socialLinksSchema = z.object({
  facebook: urlValidation,
  x: urlValidation,
  instagram: urlValidation,
  linkedin: urlValidation,
  snapchat: urlValidation,
  tiktok: urlValidation,
  whatsapp: urlValidation,
});

export type SocialLinksValues = z.infer<typeof socialLinksSchema>;