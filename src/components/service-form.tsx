import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { RichTextEditor } from "./ui/rich-text-editor";
import { Repeater } from "./ui/form-repeater";
import { serviceFormSchema, type ServiceFormValues } from "@/lib/schema/service-schema";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border bg-muted/30">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

interface ServiceFormProps {
  initial?: Partial<ServiceFormValues>;
  onSubmit?: (values: ServiceFormValues) => void;
}

export default function ServiceForm({ initial = {}, onSubmit }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name_ar:       initial.name_ar       ?? "",
      name_en:       initial.name_en       ?? "",
      desc_ar:       initial.desc_ar       ?? "",
      desc_en:       initial.desc_en       ?? "",
      features:      initial.features      ?? [],
      faqs:          initial.faqs          ?? [],
      meta_title_ar: initial.meta_title_ar ?? "",
      meta_title_en: initial.meta_title_en ?? "",
      meta_desc_ar:  initial.meta_desc_ar  ?? "",
      meta_desc_en:  initial.meta_desc_en  ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit((v) => onSubmit?.(v))} className="space-y-4">

      <Section title="المعلومات الأساسية">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.name_ar}>
              <FieldLabel htmlFor="name-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="name-ar"
                aria-invalid={!!errors.name_ar}
                placeholder="مثال: ميثاق"
                {...register("name_ar")}
              />
              <FieldDescription>{errors.name_ar?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.name_en}>
              <FieldLabel htmlFor="name-en">العنوان (انجليزي)</FieldLabel>
              <Input
                id="name-en"
                dir="ltr"
                aria-invalid={!!errors.name_en}
                placeholder="Ex: Mithaq"
                {...register("name_en")}
              />
              <FieldDescription>{errors.name_en?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.desc_ar}>
              <FieldLabel htmlFor="desc-ar">الوصف (عربي)</FieldLabel>
              <RichTextEditor
                id="desc-ar"
                dir="rtl"
                aria-invalid={!!errors.desc_ar}
                value={watch("desc_ar")}
                placeholder="الوصف بالعربي"
                onChange={(v) => setValue("desc_ar", v, { shouldValidate: true })}
              />
              <FieldDescription>{errors.desc_ar?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.desc_en}>
              <FieldLabel htmlFor="desc-en">الوصف (انجليزي)</FieldLabel>
              <RichTextEditor
                id="desc-en"
                dir="ltr"
                aria-invalid={!!errors.desc_en}
                value={watch("desc_en")}
                placeholder="English Description"
                onChange={(v) => setValue("desc_en", v, { shouldValidate: true })}
              />
              <FieldDescription>{errors.desc_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </Section>

      <Section title="المميزات">
        <Repeater
          addLabel="إضافة ميزة"
          initial={watch("features")}
          defaultItem={{ feature_ar: "", feature_en: "" }}
          renderItem={(item, index, onChange) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="col-span-2 sm:col-span-1">
                <Field data-invalid={!!errors.features?.[index]?.feature_ar}>
                  <FieldLabel htmlFor={`feature-ar-${index}`}>الميزة (عربي)</FieldLabel>
                  <Input
                    id={`feature-ar-${index}`}
                    aria-invalid={!!errors.features?.[index]?.feature_ar}
                    value={item.feature_ar as string}
                    placeholder="اكتب الميزة بالعربي"
                    onChange={(e) => {
                      onChange("feature_ar", e.target.value);
                      const updated = [...watch("features")];
                      updated[index] = { ...updated[index], feature_ar: e.target.value };
                      setValue("features", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.features?.[index]?.feature_ar?.message}</FieldDescription>
                </Field>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Field data-invalid={!!errors.features?.[index]?.feature_en}>
                  <FieldLabel htmlFor={`feature-en-${index}`}>الميزة (انجليزي)</FieldLabel>
                  <Input
                    id={`feature-en-${index}`}
                    dir="ltr"
                    aria-invalid={!!errors.features?.[index]?.feature_en}
                    value={item.feature_en as string}
                    placeholder="Write the feature in English"
                    onChange={(e) => {
                      onChange("feature_en", e.target.value);
                      const updated = [...watch("features")];
                      updated[index] = { ...updated[index], feature_en: e.target.value };
                      setValue("features", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.features?.[index]?.feature_en?.message}</FieldDescription>
                </Field>
              </div>
            </div>
          )}
        />
      </Section>

      <Section title="الأسئلة الشائعة">
        <Repeater
          addLabel="إضافة سؤال"
          initial={watch("faqs")}
          defaultItem={{ question_ar: "", question_en: "", answer_ar: "", answer_en: "" }}
          renderItem={(item, index, onChange) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="col-span-2 sm:col-span-1">
                <Field data-invalid={!!errors.faqs?.[index]?.question_ar}>
                  <FieldLabel htmlFor={`faq-q-ar-${index}`}>السؤال (عربي)</FieldLabel>
                  <Input
                    id={`faq-q-ar-${index}`}
                    aria-invalid={!!errors.faqs?.[index]?.question_ar}
                    value={item.question_ar as string}
                    placeholder="اكتب السؤال بالعربي"
                    onChange={(e) => {
                      onChange("question_ar", e.target.value);
                      const updated = [...watch("faqs")];
                      updated[index] = { ...updated[index], question_ar: e.target.value };
                      setValue("faqs", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.faqs?.[index]?.question_ar?.message}</FieldDescription>
                </Field>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Field data-invalid={!!errors.faqs?.[index]?.question_en}>
                  <FieldLabel htmlFor={`faq-q-en-${index}`}>السؤال (انجليزي)</FieldLabel>
                  <Input
                    id={`faq-q-en-${index}`}
                    dir="ltr"
                    aria-invalid={!!errors.faqs?.[index]?.question_en}
                    value={item.question_en as string}
                    placeholder="Write the question in English"
                    onChange={(e) => {
                      onChange("question_en", e.target.value);
                      const updated = [...watch("faqs")];
                      updated[index] = { ...updated[index], question_en: e.target.value };
                      setValue("faqs", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.faqs?.[index]?.question_en?.message}</FieldDescription>
                </Field>
              </div>

              <div className="col-span-2">
                <Field data-invalid={!!errors.faqs?.[index]?.answer_ar}>
                  <FieldLabel htmlFor={`faq-a-ar-${index}`}>الجواب (عربي)</FieldLabel>
                  <Textarea
                    id={`faq-a-ar-${index}`}
                    aria-invalid={!!errors.faqs?.[index]?.answer_ar}
                    value={item.answer_ar as string}
                    placeholder="اكتب الجواب بالعربي"
                    onChange={(e) => {
                      onChange("answer_ar", e.target.value);
                      const updated = [...watch("faqs")];
                      updated[index] = { ...updated[index], answer_ar: e.target.value };
                      setValue("faqs", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.faqs?.[index]?.answer_ar?.message}</FieldDescription>
                </Field>
              </div>

              <div className="col-span-2">
                <Field data-invalid={!!errors.faqs?.[index]?.answer_en}>
                  <FieldLabel htmlFor={`faq-a-en-${index}`}>الجواب (انجليزي)</FieldLabel>
                  <Textarea
                    id={`faq-a-en-${index}`}
                    dir="ltr"
                    aria-invalid={!!errors.faqs?.[index]?.answer_en}
                    value={item.answer_en as string}
                    placeholder="Write the answer in English"
                    onChange={(e) => {
                      onChange("answer_en", e.target.value);
                      const updated = [...watch("faqs")];
                      updated[index] = { ...updated[index], answer_en: e.target.value };
                      setValue("faqs", updated, { shouldValidate: true });
                    }}
                  />
                  <FieldDescription>{errors.faqs?.[index]?.answer_en?.message}</FieldDescription>
                </Field>
              </div>
            </div>
          )}
        />
      </Section>

      <Section title="محركات البحث (SEO)">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_ar}>
              <FieldLabel htmlFor="meta-title-ar">عنوان الصفحة (عربي)</FieldLabel>
              <Input
                id="meta-title-ar"
                aria-invalid={!!errors.meta_title_ar}
                placeholder="مثال: خدمة ميثاق للتوثيق"
                {...register("meta_title_ar")}
              />
              <FieldDescription>{errors.meta_title_ar?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.meta_title_en}>
              <FieldLabel htmlFor="meta-title-en">عنوان الصفحة (انجليزي)</FieldLabel>
              <Input
                id="meta-title-en"
                dir="ltr"
                aria-invalid={!!errors.meta_title_en}
                placeholder="Ex: Mithaq Documentation Service"
                {...register("meta_title_en")}
              />
              <FieldDescription>{errors.meta_title_en?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_desc_ar}>
              <FieldLabel htmlFor="meta-desc-ar">وصف الصفحة (عربي)</FieldLabel>
              <Textarea
                id="meta-desc-ar"
                aria-invalid={!!errors.meta_desc_ar}
                placeholder="وصف مختصر يظهر في نتائج البحث بالعربي"
                {...register("meta_desc_ar")}
              />
              <FieldDescription>{errors.meta_desc_ar?.message}</FieldDescription>
            </Field>
          </div>

          <div className="col-span-2">
            <Field data-invalid={!!errors.meta_desc_en}>
              <FieldLabel htmlFor="meta-desc-en">وصف الصفحة (انجليزي)</FieldLabel>
              <Textarea
                id="meta-desc-en"
                dir="ltr"
                aria-invalid={!!errors.meta_desc_en}
                placeholder="Short description shown in search results"
                {...register("meta_desc_en")}
              />
              <FieldDescription>{errors.meta_desc_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </Section>

      <div className="flex justify-end">
        <Button type="submit">حفظ</Button>
      </div>

    </form>
  );
}