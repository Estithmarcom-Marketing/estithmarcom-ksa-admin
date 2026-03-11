"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { ImageUploader } from "./image-uploader";
import Section from "./form-section";
import { memberFormSchema, type MemberFormValues } from "@/lib/schema/member-schema";

interface MemberFormProps {
  initial?: Record<string, any>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean
}

function toFormData(values: MemberFormValues): FormData {
  const fd = new FormData();

  fd.append("name_ar",     values.name_ar);
  fd.append("name_en",     values.name_en);
  fd.append("position_ar", values.position_ar);
  fd.append("position_en", values.position_en);
  fd.append("active",      values.active ? "1" : "0");

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  return fd;
}

export default function MemberForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false
}: MemberFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name_ar:     initial.name_ar     ?? "",
      name_en:     initial.name_en     ?? "",
      position_ar: initial.position_ar ?? "",
      position_en: initial.position_en ?? "",
      active:      initial.active      ?? true,
      image:       initial.image       ?? null,
    },
  });

  const handleFormSubmit = (values: MemberFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

      <Section title="معلومات العضو">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          {/* Active toggle */}
          <div className="col-span-2 flex items-center justify-end gap-3">
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <>
                  <Switch
                    id="active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="active" className="text-xs mb-0 font-medium">
                    مفعّل
                  </Label>
                </>
              )}
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.image}>
              <FieldLabel>صورة العضو</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة العضو هنا أو اضغط للاختيار"
                    onChange={field.onChange}
                    edit={edit}
                  />
                )}
              />
              <FieldDescription>
                {errors.image?.message as string | undefined}
              </FieldDescription>
            </Field>
          </div>

          {/* Name AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.name_ar}>
              <FieldLabel htmlFor="name-ar">الاسم (عربي)</FieldLabel>
              <Input
                id="name-ar"
                aria-invalid={!!errors.name_ar}
                placeholder="مثال: محمد أحمد"
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
                placeholder="Ex: Mohammed Ahmed"
                {...register("name_en")}
              />
              <FieldDescription>{errors.name_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Position AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.position_ar}>
              <FieldLabel htmlFor="position-ar">المنصب (عربي)</FieldLabel>
              <Input
                id="position-ar"
                aria-invalid={!!errors.position_ar}
                placeholder="مثال: مدير تنفيذي"
                {...register("position_ar")}
              />
              <FieldDescription>{errors.position_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Position EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.position_en}>
              <FieldLabel htmlFor="position-en">المنصب (انجليزي)</FieldLabel>
              <Input
                id="position-en"
                dir="ltr"
                aria-invalid={!!errors.position_en}
                placeholder="Ex: CEO"
                {...register("position_en")}
              />
              <FieldDescription>{errors.position_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </Section>

      <div className="flex justify-end">
        <Button disabled={isPending} type="submit">
          {isPending ? "جار الحفظ..." : "حفظ"}
        </Button>
      </div>

    </form>
  );
}