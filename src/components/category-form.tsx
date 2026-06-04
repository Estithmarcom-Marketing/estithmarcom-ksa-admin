"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, type CategoryFormValues } from "@/lib/schema/category-schema";
import { FieldLabel, FieldDescription, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import FormSection from "@/components/form-section";

interface CategoryFormProps {
  initial?: Partial<CategoryFormValues>;
  onSubmit?: (data: CategoryFormValues) => void;
  isPending?: boolean;
  edit?: boolean;
}

export default function CategoryForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name_ar: initial.name_ar ?? "",
      name_en: initial.name_en ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit?.(values))} className="space-y-4">
      <FormSection title="معلومات القسم">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Name AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.name_ar}>
              <FieldLabel htmlFor="name-ar">الاسم (عربي)</FieldLabel>
              <Input
                id="name-ar"
                aria-invalid={!!errors.name_ar}
                placeholder="مثال: أخبار"
                {...register("name_ar")}
              />
              <FieldDescription>{errors.name_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Name EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.name_en}>
              <FieldLabel htmlFor="name-en">الاسم (انجليزي)</FieldLabel>
              <Input
                id="name-en"
                dir="ltr"
                aria-invalid={!!errors.name_en}
                placeholder="Ex: News"
                {...register("name_en")}
              />
              <FieldDescription>{errors.name_en?.message}</FieldDescription>
            </Field>
          </div>
        </div>
      </FormSection>

      <div className="flex gap-2 justify-end pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "جاري الحفظ..." : edit ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </form>
  );
}
