"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { highlightFormSchema, type HighlightFormValues } from "@/lib/schema/highlight-schema";
import { FieldLabel, FieldDescription, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { ImageUploader } from "./image-uploader";
import FormSection from "@/components/form-section";

interface HighlightFormProps {
  initial?: Partial<HighlightFormValues>;
  onSubmit?: (data: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: HighlightFormValues): FormData {
  const formData = new FormData();
  formData.append("label_ar", values.label_ar);
  formData.append("label_en", values.label_en);
  formData.append("value_ar", values.value_ar);
  formData.append("value_en", values.value_en);

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
}

export default function HighlightForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: HighlightFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HighlightFormValues>({
    resolver: zodResolver(highlightFormSchema),
    defaultValues: {
      label_ar: initial.label_ar ?? "",
      label_en: initial.label_en ?? "",
      value_ar: initial.value_ar ? String(initial.value_ar) : "",
      value_en: initial.value_en ? String(initial.value_en) : "",
      image: initial.image ?? null,
    },
  });

  const handleFormSubmit = (values: HighlightFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="معلومات الإنجاز">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Image */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.image}>
              <FieldLabel>الصورة</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب الصورة هنا أو اضغط للاختيار"
                    onChange={field.onChange}
                    edit={edit}
                    svg={true}
                  />
                )}
              />
              <FieldDescription>
                {errors.image?.message as string | undefined}
              </FieldDescription>
            </Field>
          </div>

          {/* Label AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.label_ar}>
              <FieldLabel htmlFor="label-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="label-ar"
                aria-invalid={!!errors.label_ar}
                placeholder="مثال: سنوات الخبرة"
                {...register("label_ar")}
              />
              <FieldDescription>{errors.label_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Label EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.label_en}>
              <FieldLabel htmlFor="label-en">العنوان (انجليزي)</FieldLabel>
              <Input
                id="label-en"
                dir="ltr"
                aria-invalid={!!errors.label_en}
                placeholder="Ex: Years of Experience"
                {...register("label_en")}
              />
              <FieldDescription>{errors.label_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Value AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.value_ar}>
              <FieldLabel htmlFor="value-ar">القيمة (عربي)</FieldLabel>
              <Input
                id="value-ar"
                aria-invalid={!!errors.value_ar}
                placeholder="مثال: 10"
                {...register("value_ar")}
              />
              <FieldDescription>{errors.value_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Value EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.value_en}>
              <FieldLabel htmlFor="value-en">القيمة (انجليزي)</FieldLabel>
              <Input
                id="value-en"
                dir="ltr"
                aria-invalid={!!errors.value_en}
                placeholder="Ex: 10"
                {...register("value_en")}
              />
              <FieldDescription>{errors.value_en?.message}</FieldDescription>
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
