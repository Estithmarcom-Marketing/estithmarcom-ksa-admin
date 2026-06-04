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
import { RichTextEditor } from "./ui/rich-text-editor";
import { blogFormSchema, type BlogFormValues } from "@/lib/schema/blog-schema";
import { useCategoriesUnpaginated } from "@/lib/querykeys/categories-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface BlogFormProps {
  initial?: Record<string, any>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean
}

function toFormData(values: BlogFormValues): FormData {
  const fd = new FormData();

  fd.append("title_ar",            values.title_ar);
  fd.append("title_en",            values.title_en);
  fd.append("subtitle_ar",         values.subtitle_ar);
  fd.append("subtitle_en",         values.subtitle_en);
  fd.append("category_id",         values.category_id);
  fd.append("short_content_ar",    values.short_content_ar);
  fd.append("short_content_en",    values.short_content_en);
  fd.append("content_ar",          values.content_ar);
  fd.append("content_en",          values.content_en);
  fd.append("published",           values.published ? "1" : "0");
  fd.append("meta_title_ar",       values.meta_title_ar);
  fd.append("meta_title_en",       values.meta_title_en);
  fd.append("meta_description_ar", values.meta_description_ar);
  fd.append("meta_description_en", values.meta_description_en);

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  return fd;
}

export default function BlogForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false
}: BlogFormProps) {
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesUnpaginated();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title_ar:            initial.title_ar            ?? "",
      title_en:            initial.title_en            ?? "",
      subtitle_ar:         initial.subtitle_ar         ?? "",
      subtitle_en:         initial.subtitle_en         ?? "",
      category_id:         initial.category_id ? String(initial.category_id) : "",
      image:               initial.image               ?? null,
      short_content_ar:    initial.short_content_ar    ?? "",
      short_content_en:    initial.short_content_en    ?? "",
      content_ar:          initial.content_ar          ?? "",
      content_en:          initial.content_en          ?? "",
      published:           initial.published           ?? true,
      meta_title_ar:       initial.meta_title_ar       ?? "",
      meta_title_en:       initial.meta_title_en       ?? "",
      meta_description_ar: initial.meta_description_ar ?? "",
      meta_description_en: initial.meta_description_en ?? "",
    },
  });

  const handleFormSubmit = (values: BlogFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

      {/* ── Basic Info ── */}
      <Section title="المعلومات الأساسية">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          {/* Published toggle */}
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
                  <Label htmlFor="published" className="text-xs mb-0 font-medium">
                    مفعّل
                  </Label>
                </>
              )}
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.image}>
              <FieldLabel>صورة المقال</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة المقال هنا أو اضغط للاختيار"
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
                placeholder="مثال: مقال عن التقنية"
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
                dir="ltr"
                aria-invalid={!!errors.title_en}
                placeholder="Ex: A Tech Article"
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Category Dropdown (Shadcn Select) */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.category_id}>
              <FieldLabel>القسم</FieldLabel>
              <Controller
                control={control}
                name="category_id"
                render={({ field }) => (
                  <Select
                    disabled={isLoadingCategories}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingCategories ? "جار التحميل..." : "اختر القسم"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name_ar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>{errors.category_id?.message}</FieldDescription>
            </Field>
          </div>

          {/* Subtitle AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.subtitle_ar}>
              <FieldLabel htmlFor="subtitle-ar">العنوان الفرعي (عربي)</FieldLabel>
              <Input
                id="subtitle-ar"
                aria-invalid={!!errors.subtitle_ar}
                placeholder="العنوان الفرعي بالعربي"
                {...register("subtitle_ar")}
              />
              <FieldDescription>{errors.subtitle_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Subtitle EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.subtitle_en}>
              <FieldLabel htmlFor="subtitle-en">العنوان الفرعي (انجليزي)</FieldLabel>
              <Input
                id="subtitle-en"
                dir="ltr"
                aria-invalid={!!errors.subtitle_en}
                placeholder="Ex: Subtitle here"
                {...register("subtitle_en")}
              />
              <FieldDescription>{errors.subtitle_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Short Content AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.short_content_ar}>
              <FieldLabel htmlFor="short-content-ar">محتوى قصير (عربي)</FieldLabel>
              <Textarea
                id="short-content-ar"
                aria-invalid={!!errors.short_content_ar}
                placeholder="ملخص قصير بالعربي"
                {...register("short_content_ar")}
              />
              <FieldDescription>{errors.short_content_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Short Content EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.short_content_en}>
              <FieldLabel htmlFor="short-content-en">محتوى قصير (انجليزي)</FieldLabel>
              <Textarea
                id="short-content-en"
                dir="ltr"
                aria-invalid={!!errors.short_content_en}
                placeholder="Short summary in English"
                {...register("short_content_en")}
              />
              <FieldDescription>{errors.short_content_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Content AR */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.content_ar}>
              <FieldLabel>المحتوى (عربي)</FieldLabel>
              <Controller
                control={control}
                name="content_ar"
                render={({ field, fieldState }) => (
                  <RichTextEditor
                    dir="rtl"
                    value={field.value}
                    placeholder="اكتب محتوى المقال بالعربي"
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>{errors.content_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Content EN */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.content_en}>
              <FieldLabel>المحتوى (انجليزي)</FieldLabel>
              <Controller
                control={control}
                name="content_en"
                render={({ field, fieldState }) => (
                  <RichTextEditor
                    dir="ltr"
                    value={field.value}
                    placeholder="Write the article content in English"
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>{errors.content_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </Section>

      {/* ── SEO ── */}
      <Section title="محركات البحث (SEO)">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          {/* Meta Title AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_ar}>
              <FieldLabel htmlFor="meta-title-ar">عنوان الصفحة (عربي)</FieldLabel>
              <Input
                id="meta-title-ar"
                aria-invalid={!!errors.meta_title_ar}
                placeholder="مثال: مقال تقني - ميثاق"
                {...register("meta_title_ar")}
              />
              <FieldDescription>{errors.meta_title_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Meta Title EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_en}>
              <FieldLabel htmlFor="meta-title-en">عنوان الصفحة (انجليزي)</FieldLabel>
              <Input
                id="meta-title-en"
                dir="ltr"
                aria-invalid={!!errors.meta_title_en}
                placeholder="Ex: Tech Article - Mithaq"
                {...register("meta_title_en")}
              />
              <FieldDescription>{errors.meta_title_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Meta Description AR */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_description_ar}>
              <FieldLabel htmlFor="meta-desc-ar">وصف الصفحة (عربي)</FieldLabel>
              <Textarea
                id="meta-desc-ar"
                aria-invalid={!!errors.meta_description_ar}
                placeholder="وصف مختصر يظهر في نتائج البحث بالعربي"
                {...register("meta_description_ar")}
              />
              <FieldDescription>{errors.meta_description_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Meta Description EN */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_description_en}>
              <FieldLabel htmlFor="meta-desc-en">وصف الصفحة (انجليزي)</FieldLabel>
              <Textarea
                id="meta-desc-en"
                aria-invalid={!!errors.meta_description_en}
                placeholder="وصف مختصر يظهر في نتائج البحث بالانجليزي"
                {...register("meta_description_en")}
              />
              <FieldDescription>{errors.meta_description_en?.message}</FieldDescription>
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
