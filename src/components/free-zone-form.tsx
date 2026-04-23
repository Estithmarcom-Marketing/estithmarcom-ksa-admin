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
import { RichTextEditor } from "./ui/rich-text-editor";
import {
  freeZoneFormSchema,
  type FreeZoneFormValues,
} from "@/lib/schema/free-zone-schema";

interface FreeZoneFormProps {
  initial?: Record<string, any>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: FreeZoneFormValues): FormData {
  const fd = new FormData();

  fd.append("title_ar", values.title_ar);
  fd.append("title_en", values.title_en);
  fd.append("slug_ar", values.slug_ar);
  fd.append("slug_en", values.slug_en);
  fd.append("content_ar", values.content_ar);
  fd.append("content_en", values.content_en);
  fd.append("active", values.active ? "1" : "0");

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  return fd;
}

export default function FreeZoneForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: FreeZoneFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FreeZoneFormValues>({
    resolver: zodResolver(freeZoneFormSchema),
    defaultValues: {
      title_ar: initial.title_ar ?? "",
      title_en: initial.title_en ?? "",
      slug_ar: initial.slug_ar ?? "",
      slug_en: initial.slug_en ?? "",
      image: initial.image ?? null,
      content_ar: initial.content_ar ?? "",
      content_en: initial.content_en ?? "",
      active: initial.active ?? true,
    },
  });

  const handleFormSubmit = (values: FreeZoneFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* ── Basic Info ── */}
      <Section title="المعلومات الأساسية">
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
              <FieldLabel>صورة المنطقة الحرة</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة المنطقة الحرة هنا أو اضغط للاختيار"
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

          {/* Title AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_ar}>
              <FieldLabel htmlFor="title-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="title-ar"
                aria-invalid={!!errors.title_ar}
                placeholder="مثال: منطقة حرة"
                {...register("title_ar")}
              />
              <FieldDescription>{errors.title_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Title EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_en}>
              <FieldLabel htmlFor="title-en">العنوان (انجليزي)</FieldLabel>
              <Input
                id="title-en"
                aria-invalid={!!errors.title_en}
                placeholder="Example: Free Zone"
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Slug AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.slug_ar}>
              <FieldLabel htmlFor="slug-ar">الرابط (عربي)</FieldLabel>
              <Input
                id="slug-ar"
                aria-invalid={!!errors.slug_ar}
                placeholder="منطقة-حرة"
                {...register("slug_ar")}
              />
              <FieldDescription>{errors.slug_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Slug EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.slug_en}>
              <FieldLabel htmlFor="slug-en">الرابط (انجليزي)</FieldLabel>
              <Input
                id="slug-en"
                aria-invalid={!!errors.slug_en}
                placeholder="free-zone"
                {...register("slug_en")}
              />
              <FieldDescription>{errors.slug_en?.message}</FieldDescription>
            </Field>
          </div>
        </div>
      </Section>

      {/* ── Content ── */}
      <Section title="المحتوى">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Content AR */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.content_ar}>
              <FieldLabel htmlFor="content-ar">المحتوى (عربي)</FieldLabel>
              <Controller
                name="content_ar"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="محتوى المنطقة الحرة..."
                  />
                )}
              />
              <FieldDescription>{errors.content_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Content EN */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.content_en}>
              <FieldLabel htmlFor="content-en">المحتوى (انجليزي)</FieldLabel>
              <Controller
                name="content_en"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Free Zone content..."
                  />
                )}
              />
              <FieldDescription>{errors.content_en?.message}</FieldDescription>
            </Field>
          </div>
        </div>
      </Section>

      {/* ── Actions ── */}
      <div className="flex gap-2 justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
