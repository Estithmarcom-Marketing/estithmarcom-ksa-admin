"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { ImageUploader } from "./image-uploader";
import Section from "./form-section";
import {
  residencyFormSchema,
  type ResidencyFormValues,
} from "@/lib/schema/residency-schema";
import { useCountriesUnpaginated } from "@/lib/querykeys/countries-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSkeleton } from "./form-skeleton";

interface ResidencyFormProps {
  initial?: Record<string, any>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: ResidencyFormValues): FormData {
  const fd = new FormData();

  fd.append("title_ar", values.title_ar);
  fd.append("title_en", values.title_en);
  fd.append("description_ar", values.description_ar);
  fd.append("description_en", values.description_en);
  fd.append("published", values.published ? "1" : "0");
  fd.append("meta_title_ar", values.meta_title_ar);
  fd.append("meta_title_en", values.meta_title_en);
  fd.append("meta_description_ar", values.meta_description_ar);
  fd.append("meta_description_en", values.meta_description_en);

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  values.country_ids.forEach((id) => {
    fd.append("country_ids[]", id);
  });

  return fd;
}

export default function ResidencyForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: ResidencyFormProps) {
  const { data: countries = [], isLoading: isLoadingCountries } =
    useCountriesUnpaginated();

  // Handle both array and object for initial.country
  const defaultCountryIds: string[] = Array.isArray(initial.country)
    ? initial.country.map((c: { id: number }) => String(c.id))
    : initial.country?.id
    ? [String(initial.country.id)]
    : [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResidencyFormValues>({
    resolver: zodResolver(residencyFormSchema),
    defaultValues: {
      title_ar: initial.title_ar ?? "",
      title_en: initial.title_en ?? "",
      image: initial.image ?? null,
      description_ar: initial.description_ar ?? "",
      description_en: initial.description_en ?? "",
      published: initial.published ?? true,
      country_ids: defaultCountryIds,
      meta_title_ar: initial.meta_title_ar ?? initial.meta_title ?? "",
      meta_title_en: initial.meta_title_en ?? initial.meta_title ?? "",
      meta_description_ar: initial.meta_description_ar ?? initial.meta_description ?? "",
      meta_description_en: initial.meta_description_en ?? initial.meta_description ?? "",
    },
  });

  if (isLoadingCountries) return <FormSkeleton />;

  const handleFormSubmit = (values: ResidencyFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Section title="المعلومات الأساسية">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="col-span-2 flex items-center justify-end gap-3">
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <>
                  <Switch
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label
                    htmlFor="published"
                    className="text-xs mb-0 font-medium"
                  >
                    مفعّل
                  </Label>
                </>
              )}
            />
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.image}>
              <FieldLabel>صورة الإقامة</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة الإقامة هنا أو اضغط للاختيار"
                    onChange={field.onChange}
                    edit={edit}
                    svg={false}
                  />
                )}
              />
              <FieldDescription>
                {errors.image?.message as string | undefined}
              </FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_ar}>
              <FieldLabel htmlFor="title-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="title-ar"
                aria-invalid={!!errors.title_ar}
                placeholder="مثال: إقامة الكفاءة الاستثنائية"
                {...register("title_ar")}
              />
              <FieldDescription>{errors.title_ar?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_en}>
              <FieldLabel htmlFor="title-en">العنوان (انجليزي)</FieldLabel>
              <Input
                id="title-en"
                dir="ltr"
                aria-invalid={!!errors.title_en}
                placeholder="Ex: Exceptional Competence Residency"
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.country_ids}>
              <FieldLabel>الدولة</FieldLabel>
              <Controller
                control={control}
                name="country_ids"
                render={({ field }) => (
                  <Select
                    value={field.value?.[0]}
                    onValueChange={(val) => field.onChange([val])}
                  >
                    <SelectTrigger isLoading={isLoadingCountries}>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name_ar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>{errors.country_ids?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.description_ar}>
              <FieldLabel htmlFor="desc-ar">الوصف (عربي)</FieldLabel>
              <Textarea
                id="desc-ar"
                aria-invalid={!!errors.description_ar}
                placeholder="وصف الإقامة بالعربي"
                {...register("description_ar")}
              />
              <FieldDescription>
                {errors.description_ar?.message}
              </FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.description_en}>
              <FieldLabel htmlFor="desc-en">الوصف (انجليزي)</FieldLabel>
              <Textarea
                id="desc-en"
                dir="ltr"
                aria-invalid={!!errors.description_en}
                placeholder="Residency description in English"
                {...register("description_en")}
              />
              <FieldDescription>
                {errors.description_en?.message}
              </FieldDescription>
            </Field>
          </div>
        </div>
      </Section>

      <Section title="محركات البحث (SEO)">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_ar}>
              <FieldLabel htmlFor="meta-title-ar">
                عنوان الصفحة (عربي)
              </FieldLabel>
              <Input
                id="meta-title-ar"
                aria-invalid={!!errors.meta_title_ar}
                placeholder="عنوان الصفحة بالعربي"
                {...register("meta_title_ar")}
              />
              <FieldDescription>
                {errors.meta_title_ar?.message}
              </FieldDescription>
            </Field>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_en}>
              <FieldLabel htmlFor="meta-title-en">
                عنوان الصفحة (انجليزي)
              </FieldLabel>
              <Input
                id="meta-title-en"
                dir="ltr"
                aria-invalid={!!errors.meta_title_en}
                placeholder="Page title in English"
                {...register("meta_title_en")}
              />
              <FieldDescription>
                {errors.meta_title_en?.message}
              </FieldDescription>
            </Field>
          </div>
          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_description_ar}>
              <FieldLabel htmlFor="meta-desc-ar">وصف الصفحة (عربي)</FieldLabel>
              <Textarea
                id="meta-desc-ar"
                aria-invalid={!!errors.meta_description_ar}
                placeholder="وصف مختصر بالعربي"
                {...register("meta_description_ar")}
              />
              <FieldDescription>
                {errors.meta_description_ar?.message}
              </FieldDescription>
            </Field>
          </div>
          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_description_en}>
              <FieldLabel htmlFor="meta-desc-en">
                وصف الصفحة (انجليزي)
              </FieldLabel>
              <Textarea
                id="meta-desc-en"
                dir="ltr"
                aria-invalid={!!errors.meta_description_en}
                placeholder="Short description in English"
                {...register("meta_description_en")}
              />
              <FieldDescription>
                {errors.meta_description_en?.message}
              </FieldDescription>
            </Field>
          </div>
        </div>
      </Section>

      <div className="flex justify-end pt-4">
        <Button disabled={isPending} type="submit">
          {isPending ? "جار الحفظ..." : edit ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </form>
  );
}
