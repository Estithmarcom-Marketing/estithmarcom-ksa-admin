import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactInfoSchema,
  type ContactInfoValues,
} from "@/lib/schema/website-info-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoValues>({
    resolver: zodResolver(contactInfoSchema),
    values: defaultValues as ContactInfoValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const handleFormSubmit = (data: ContactInfoValues) => {
    const phone = data.phone
      ? data.phone.charAt(0) === "+"
        ? data.phone
        : `+${data.phone}`
      : data.phone;

    onSubmit({
      ...data,
      phone,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="space-y-6"
    >
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
      </div>

      {/* Addresses repeater */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>العناوين</Label>
          <Button
            type="button"
            className="flex gap-2 items-center"
            size="sm"
            onClick={() => append({ address_ar: "", address_en: "" })}
          >
            <Plus className="size-4" />
            إضافة عنوان
          </Button>
        </div>

        {errors.addresses?.message && (
          <FieldDescription className="text-destructive text-sm">
            {errors.addresses.message}
          </FieldDescription>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md p-4 relative"
          >
            <Field data-invalid={!!errors.addresses?.[index]?.address_ar}>
              <Label htmlFor={`addresses.${index}.address_ar`}>
                العنوان بالعربية
              </Label>
              <Input
                id={`addresses.${index}.address_ar`}
                placeholder="الرياض، المملكة العربية السعودية"
                aria-invalid={!!errors.addresses?.[index]?.address_ar}
                {...register(`addresses.${index}.address_ar` as const)}
              />
              {errors.addresses?.[index]?.address_ar && (
                <FieldDescription className="text-destructive text-sm">
                  {errors.addresses[index]?.address_ar?.message}
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={!!errors.addresses?.[index]?.address_en}>
              <Label htmlFor={`addresses.${index}.address_en`}>
                العنوان بالإنجليزية
              </Label>
              <Input
                id={`addresses.${index}.address_en`}
                placeholder="Riyadh, Saudi Arabia"
                aria-invalid={!!errors.addresses?.[index]?.address_en}
                {...register(`addresses.${index}.address_en` as const)}
              />
              {errors.addresses?.[index]?.address_en && (
                <FieldDescription className="text-destructive text-sm">
                  {errors.addresses[index]?.address_en?.message}
                </FieldDescription>
              )}
            </Field>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 text-destructive hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button disabled={isLoading} type="submit">
        {isLoading ? "جاري الحفظ..." : "حفظ المعلومات"}
      </Button>
    </form>
  );
}