import { z } from "zod";

const urlValidation = z
  .string()
  .optional()
  .refine(
    (val) => !val || /^https?:\/\/.+\..+/.test(val),
    { message: "يجب أن يكون رابطاً صحيحاً ويبدأ بـ http:// أو https://" }
  );

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

  address: z.string().optional(),
});

export type ContactInfoValues = z.infer<typeof contactInfoSchema>;

export const socialLinksSchema = z.object({
  facebook: urlValidation,
  x: urlValidation,
  instagram: urlValidation,
  snapchat: urlValidation,
  tiktok: urlValidation,
});

export type SocialLinksValues = z.infer<typeof socialLinksSchema>;