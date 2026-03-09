import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactInfoSchema,
  type ContactInfoValues,
} from "@/lib/schema/website-info-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

interface ContactInfoFormProps {
  defaultValues?: Partial<ContactInfoValues>;
  onSubmit: (data: ContactInfoValues) => void;
  isLoading: boolean;
}

export function ContactInfoForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ContactInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoValues>({
    resolver: zodResolver(contactInfoSchema),
    values: defaultValues as ContactInfoValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <Field data-invalid={!!errors.phone}>
          <Label htmlFor="phone">الهاتف</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+966 5X XXX XXXX"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <FieldDescription className="text-destructive text-sm">
              {errors.phone.message}
            </FieldDescription>
          )}
        </Field>

        {/* Email */}
        <Field data-invalid={!!errors.email}>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <FieldDescription className="text-destructive text-sm">
              {errors.email.message}
            </FieldDescription>
          )}
        </Field>

        {/* Address */}
        <Field data-invalid={!!errors.address}>
          <Label htmlFor="address">العنوان</Label>
          <Input
            id="address"
            placeholder="الرياض، المملكة العربية السعودية"
            aria-invalid={!!errors.address}
            {...register("address")}
          />
          {errors.address && (
            <FieldDescription className="text-destructive text-sm">
              {errors.address.message}
            </FieldDescription>
          )}
        </Field>
      </div>

      <Button disabled={isLoading} type="submit">
        {isLoading ? "جاري الحفظ..." : "حفظ المعلومات"}
      </Button>
    </form>
  );
}