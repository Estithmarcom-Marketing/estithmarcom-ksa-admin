import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staticPageFormSchema, type StaticPageFormValues } from "@/lib/schema/static-page-schema";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import FormSection from "@/components/form-section";
import { RichTextEditor } from "./ui/rich-text-editor";

interface StaticPageFormProps {
  initial?: Partial<StaticPageFormValues>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: StaticPageFormValues): FormData {
  const fd = new FormData();

  fd.append("title_ar", values.title_ar);
  fd.append("title_en", values.title_en);
  fd.append("content_ar", values.content_ar);
  fd.append("content_en", values.content_en);

  if (values.meta_title_ar) fd.append("meta_title_ar", values.meta_title_ar);
  if (values.meta_title_en) fd.append("meta_title_en", values.meta_title_en);
  if (values.meta_description_ar) fd.append("meta_description_ar", values.meta_description_ar);
  if (values.meta_description_en) fd.append("meta_description_en", values.meta_description_en);

  return fd;
}

export default function StaticPageForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: StaticPageFormProps) {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StaticPageFormValues>({
    resolver: zodResolver(staticPageFormSchema),
    defaultValues: {
      title_ar: initial.title_ar ?? "",
      title_en: initial.title_en ?? "",
      content_ar: initial.content_ar ?? "",
      content_en: initial.content_en ?? "",
      meta_title_ar: initial.meta_title_ar ?? "",
      meta_title_en: initial.meta_title_en ?? "",
      meta_description_ar: initial.meta_description_ar ?? "",
      meta_description_en: initial.meta_description_en ?? "",
    },
  });

  const handleFormSubmit = (values: StaticPageFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="المعلومات الأساسية">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Title AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_ar}>
              <FieldLabel htmlFor="title-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="title-ar"
                aria-invalid={!!errors.title_ar}
                placeholder="عنوان الصفحة بالعربي"
                disabled={edit}
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
                placeholder="Page title in English"
                disabled={edit}
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
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
                    placeholder="اكتب محتوى الصفحة بالعربي"
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
                    placeholder="Write the page content in English"
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>{errors.content_en?.message}</FieldDescription>
            </Field>
          </div>
        </div>
      </FormSection>

      <FormSection title="محركات البحث (SEO)">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Meta Title AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_ar}>
              <FieldLabel htmlFor="meta-title-ar">عنوان الصفحة (عربي)</FieldLabel>
              <Input
                id="meta-title-ar"
                aria-invalid={!!errors.meta_title_ar}
                placeholder="عنوان SEO بالعربي"
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
                placeholder="SEO title in English"
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
                placeholder="Meta description in English"
                {...register("meta_description_en")}
              />
              <FieldDescription>{errors.meta_description_en?.message}</FieldDescription>
            </Field>
          </div>
        </div>
      </FormSection>

      <div className="flex gap-2 justify-end pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => nav("/dashboard/static-pages")}
        >
          إلغاء
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "جاري الحفظ..." : edit ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </form>
  );
}
