"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { ImageUploader } from "./image-uploader";
import Section from "./form-section";
import {
  serviceFormSchema,
  type ServiceFormValues,
} from "@/lib/schema/service-schema";
import { RichTextEditor } from "./ui/rich-text-editor";
import { useCountriesUnpaginated } from "@/lib/querykeys/countries-query";
import { ReactSelect } from "./ui/react-select";

interface ServiceFormProps {
  initial?: Record<string, any>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: ServiceFormValues): FormData {
  const fd = new FormData();

  fd.append("title_ar", values.title_ar);
  fd.append("title_en", values.title_en);
  fd.append("short_description_ar", values.short_description_ar);
  fd.append("short_description_en", values.short_description_en);
  fd.append("long_description_ar", values.long_description_ar);
  fd.append("long_description_en", values.long_description_en);
  fd.append("published", values.published ? "1" : "0");
  fd.append("meta_title_ar", values.meta_title_ar);
  fd.append("meta_title_en", values.meta_title_en);
  fd.append("meta_description_ar", values.meta_description_ar);
  fd.append("meta_description_en", values.meta_description_en);

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  // Send country_ids as array of integers
  values.country_ids.forEach((id) => {
    fd.append("country_ids[]", id);
  });

  if (values.features.length === 0) {
    fd.append("features", "[]");
  }

  values.features.forEach((f, i) => {
    if (f.id) {
      fd.append(`features[${i}][id]`, String(f.id));
    }
    fd.append(`features[${i}][title_ar]`, f.title_ar);
    fd.append(`features[${i}][title_en]`, f.title_en);
    fd.append(`features[${i}][description_ar]`, f.description_ar);
    fd.append(`features[${i}][description_en]`, f.description_en);
    fd.append(`features[${i}][published]`, f.published ? "1" : "0");
    if (f.image instanceof File) {
      fd.append(`features[${i}][image]`, f.image);
    }
  });

  values.faqs.forEach((faq, i) => {
    fd.append(`faqs[${i}][question_ar]`, faq.question_ar);
    fd.append(`faqs[${i}][question_en]`, faq.question_en);
    fd.append(`faqs[${i}][answer_ar]`, faq.answer_ar);
    fd.append(`faqs[${i}][answer_en]`, faq.answer_en);
    fd.append(`faqs[${i}][published]`, faq.published ? "1" : "0");
  });

  return fd;
}

export default function ServiceForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: ServiceFormProps) {
  const { data: countries = [], isLoading: isLoadingCountries } =
    useCountriesUnpaginated();

  const countryOptions = countries.map((c) => ({
    label: c.name_ar,
    value: String(c.id),
  }));

  // Derive default country_ids from initial.countries array
  const defaultCountryIds: string[] =
    initial.countries?.map((c: { id: number }) => String(c.id)) ?? [];

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title_ar: initial.title_ar ?? "",
      title_en: initial.title_en ?? "",
      image: initial.image ?? null,
      short_description_ar: initial.short_description_ar ?? "",
      short_description_en: initial.short_description_en ?? "",
      long_description_ar: initial.long_description_ar ?? "",
      long_description_en: initial.long_description_en ?? "",
      published: initial.published ?? true,
      country_ids: defaultCountryIds,
      features: initial.features?.map((f: any) => ({
        id: f.id,
        title_ar: f.title_ar ?? "",
        title_en: f.title_en ?? "",
        description_ar: f.description_ar ?? "",
        description_en: f.description_en ?? "",
        image: f.image ?? null,
        published: f.published ?? true,
      })) ?? [],
      faqs: initial.faqs ?? [],
      meta_title_ar: initial.meta_title_ar ?? "",
      meta_title_en: initial.meta_title_en ?? "",
      meta_description_ar: initial.meta_description_ar ?? "",
      meta_description_en: initial.meta_description_en ?? "",
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

  const shortDescAr = watch("short_description_ar");
  const shortDescEn = watch("short_description_en");
  const featuresWatch = watch("features");

  function CharCount({ current, max }: { current: number; max: number }) {
    const over = current > max;
    return (
      <span
        className={`text-xs font-normal ${over ? "text-destructive font-medium" : "text-muted-foreground"}`}
      >
        {current}/{max}
      </span>
    );
  }

  const handleFormSubmit = (values: ServiceFormValues) => {
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
              <FieldLabel>صورة الخدمة</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة الخدمة هنا أو اضغط للاختيار"
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

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_ar}>
              <FieldLabel htmlFor="title-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="title-ar"
                aria-invalid={!!errors.title_ar}
                placeholder="مثال: ميثاق"
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
                placeholder="Ex: Mithaq"
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Countries Multi-Select */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.country_ids}>
              <FieldLabel>الدول</FieldLabel>
              <Controller
                control={control}
                name="country_ids"
                render={({ field }) => (
                  <ReactSelect
                    options={countryOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={
                      isLoadingCountries ? "جار التحميل..." : "اختر الدول"
                    }
                    disabled={isLoadingCountries}
                  />
                )}
              />
              <FieldDescription>{errors.country_ids?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.short_description_ar}>
              <FieldLabel htmlFor="short-desc-ar">وصف قصير (عربي)</FieldLabel>
              <Textarea
                id="short-desc-ar"
                aria-invalid={!!errors.short_description_ar}
                placeholder="وصف مختصر بالعربي"
                {...register("short_description_ar")}
              />
              <FieldDescription className="flex justify-between items-center gap-2">
                <span>{errors.short_description_ar?.message}</span>
                <CharCount current={shortDescAr?.length ?? 0} max={200} />
              </FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.short_description_en}>
              <FieldLabel htmlFor="short-desc-en">
                وصف قصير (انجليزي)
              </FieldLabel>
              <Textarea
                id="short-desc-en"
                dir="ltr"
                aria-invalid={!!errors.short_description_en}
                placeholder="Short description in English"
                {...register("short_description_en")}
              />
              <FieldDescription className="flex justify-between items-center gap-2">
                <span>{errors.short_description_en?.message}</span>
                <CharCount current={shortDescEn?.length ?? 0} max={200} />
              </FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.long_description_ar}>
              <FieldLabel>وصف طويل (عربي)</FieldLabel>
              <Controller
                control={control}
                name="long_description_ar"
                render={({ field, fieldState }) => (
                  <RichTextEditor
                    dir="rtl"
                    value={field.value}
                    placeholder="الوصف التفصيلي بالعربي"
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>
                {errors.long_description_ar?.message}
              </FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.long_description_en}>
              <FieldLabel>وصف طويل (انجليزي)</FieldLabel>
              <Controller
                control={control}
                name="long_description_en"
                render={({ field, fieldState }) => (
                  <RichTextEditor
                    dir="ltr"
                    value={field.value}
                    placeholder="Long description in English"
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldDescription>
                {errors.long_description_en?.message}
              </FieldDescription>
            </Field>
          </div>
        </div>
      </Section>

      {/* Features and FAQs sections remain unchanged */}
      <Section title="المميزات">
        <div className="space-y-3">
          {featureFields.map((field, index) => (
            <div
              key={field.id}
              className="relative border border-input rounded-md p-4 bg-muted/20"
            >
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="absolute top-3 left-3 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="حذف"
              >
                <Trash2 size={15} />
              </button>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-2 flex items-center gap-3">
                  <Controller
                    control={control}
                    name={`features.${index}.published`}
                    render={({ field }) => (
                      <>
                        <Switch
                          id={`feature-published-${index}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label
                          htmlFor={`feature-published-${index}`}
                          className="text-xs mb-0 font-medium"
                        >
                          مفعّل
                        </Label>
                      </>
                    )}
                  />
                </div>

                {/* Feature Image */}
                <div className="col-span-2">
                  <Field data-invalid={!!errors.features?.[index]?.image}>
                    <FieldLabel>صورة الميزة</FieldLabel>
                    <Controller
                      control={control}
                      name={`features.${index}.image`}
                      render={({ field }) => (
                        <ImageUploader
                          value={field.value}
                          invalid={!!errors.features?.[index]?.image}
                          placeholder="اسحب صورة الميزة هنا أو اضغط للاختيار"
                          onChange={field.onChange}
                          edit={edit}
                          svg={true}
                        />
                      )}
                    />
                    <FieldDescription>
                      {errors.features?.[index]?.image?.message as string | undefined}
                    </FieldDescription>
                  </Field>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.features?.[index]?.title_ar}>
                    <FieldLabel htmlFor={`feature-ar-${index}`}>
                      الميزة (عربي)
                    </FieldLabel>
                    <Input
                      id={`feature-ar-${index}`}
                      aria-invalid={!!errors.features?.[index]?.title_ar}
                      placeholder="اكتب الميزة بالعربي"
                      {...register(`features.${index}.title_ar`)}
                    />
                    <FieldDescription>
                      {errors.features?.[index]?.title_ar?.message}
                    </FieldDescription>
                  </Field>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.features?.[index]?.title_en}>
                    <FieldLabel htmlFor={`feature-en-${index}`}>
                      الميزة (انجليزي)
                    </FieldLabel>
                    <Input
                      id={`feature-en-${index}`}
                      dir="ltr"
                      aria-invalid={!!errors.features?.[index]?.title_en}
                      placeholder="Write the feature in English"
                      {...register(`features.${index}.title_en`)}
                    />
                    <FieldDescription>
                      {errors.features?.[index]?.title_en?.message}
                    </FieldDescription>
                  </Field>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.features?.[index]?.description_ar}>
                    <FieldLabel htmlFor={`feature-desc-ar-${index}`}>
                      الوصف (عربي)
                    </FieldLabel>
                    <Textarea
                      id={`feature-desc-ar-${index}`}
                      aria-invalid={!!errors.features?.[index]?.description_ar}
                      placeholder="وصف الميزة بالعربي"
                      {...register(`features.${index}.description_ar`)}
                    />
                    <FieldDescription className="flex justify-between items-center gap-2">
                      <span>{errors.features?.[index]?.description_ar?.message}</span>
                      <CharCount current={featuresWatch?.[index]?.description_ar?.length ?? 0} max={200} />
                    </FieldDescription>
                  </Field>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.features?.[index]?.description_en}>
                    <FieldLabel htmlFor={`feature-desc-en-${index}`}>
                      الوصف (انجليزي)
                    </FieldLabel>
                    <Textarea
                      id={`feature-desc-en-${index}`}
                      dir="ltr"
                      aria-invalid={!!errors.features?.[index]?.description_en}
                      placeholder="Feature description in English"
                      {...register(`features.${index}.description_en`)}
                    />
                    <FieldDescription className="flex justify-between items-center gap-2">
                      <span>{errors.features?.[index]?.description_en?.message}</span>
                      <CharCount current={featuresWatch?.[index]?.description_en?.length ?? 0} max={200} />
                    </FieldDescription>
                  </Field>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            onClick={() =>
              appendFeature({
                title_ar: "",
                title_en: "",
                description_ar: "",
                description_en: "",
                published: true,
              })
            }
            className="gap-1.5 flex items-center"
          >
            <Plus size={15} />
            إضافة ميزة
          </Button>
        </div>
      </Section>

      <Section title="الأسئلة الشائعة">
        <div className="space-y-3">
          {faqFields.map((field, index) => (
            <div
              key={field.id}
              className="relative border border-input rounded-md p-4 bg-muted/20"
            >
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="absolute top-3 left-3 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="حذف"
              >
                <Trash2 size={15} />
              </button>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-2 flex items-center gap-3">
                  <Controller
                    control={control}
                    name={`faqs.${index}.published`}
                    render={({ field }) => (
                      <>
                        <Switch
                          id={`faq-published-${index}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label
                          htmlFor={`faq-published-${index}`}
                          className="text-xs mb-0 font-medium"
                        >
                          مفعّل
                        </Label>
                      </>
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.faqs?.[index]?.question_ar}>
                    <FieldLabel htmlFor={`faq-q-ar-${index}`}>
                      السؤال (عربي)
                    </FieldLabel>
                    <Input
                      id={`faq-q-ar-${index}`}
                      aria-invalid={!!errors.faqs?.[index]?.question_ar}
                      placeholder="اكتب السؤال بالعربي"
                      {...register(`faqs.${index}.question_ar`)}
                    />
                    <FieldDescription>
                      {errors.faqs?.[index]?.question_ar?.message}
                    </FieldDescription>
                  </Field>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field data-invalid={!!errors.faqs?.[index]?.question_en}>
                    <FieldLabel htmlFor={`faq-q-en-${index}`}>
                      السؤال (انجليزي)
                    </FieldLabel>
                    <Input
                      id={`faq-q-en-${index}`}
                      dir="ltr"
                      aria-invalid={!!errors.faqs?.[index]?.question_en}
                      placeholder="Write the question in English"
                      {...register(`faqs.${index}.question_en`)}
                    />
                    <FieldDescription>
                      {errors.faqs?.[index]?.question_en?.message}
                    </FieldDescription>
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field data-invalid={!!errors.faqs?.[index]?.answer_ar}>
                    <FieldLabel htmlFor={`faq-a-ar-${index}`}>
                      الجواب (عربي)
                    </FieldLabel>
                    <Textarea
                      id={`faq-a-ar-${index}`}
                      aria-invalid={!!errors.faqs?.[index]?.answer_ar}
                      placeholder="اكتب الجواب بالعربي"
                      {...register(`faqs.${index}.answer_ar`)}
                    />
                    <FieldDescription>
                      {errors.faqs?.[index]?.answer_ar?.message}
                    </FieldDescription>
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field data-invalid={!!errors.faqs?.[index]?.answer_en}>
                    <FieldLabel htmlFor={`faq-a-en-${index}`}>
                      الجواب (انجليزي)
                    </FieldLabel>
                    <Textarea
                      id={`faq-a-en-${index}`}
                      dir="ltr"
                      aria-invalid={!!errors.faqs?.[index]?.answer_en}
                      placeholder="Write the answer in English"
                      {...register(`faqs.${index}.answer_en`)}
                    />
                    <FieldDescription>
                      {errors.faqs?.[index]?.answer_en?.message}
                    </FieldDescription>
                  </Field>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            onClick={() =>
              appendFaq({
                question_ar: "",
                question_en: "",
                answer_ar: "",
                answer_en: "",
                published: true,
              })
            }
            className="gap-1.5 flex items-center"
          >
            <Plus size={15} />
            إضافة سؤال
          </Button>
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
                placeholder="مثال: خدمة ميثاق للتوثيق"
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
                placeholder="Ex: Mithaq Documentation Service"
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
                placeholder="وصف مختصر يظهر في نتائج البحث بالعربي"
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
                placeholder="Short description shown in search results"
                {...register("meta_description_en")}
              />
              <FieldDescription>
                {errors.meta_description_en?.message}
              </FieldDescription>
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
