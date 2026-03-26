"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faqFormSchema, type FAQFormValues } from "@/lib/schema/faq-schema";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/form-section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

interface FAQFormProps {
  initial?: Record<string, any>;
  onSubmit?: (data: FAQFormValues) => void;
  isPending?: boolean;
  edit?: boolean;
}

export default function FAQForm({
  initial = {},
  onSubmit,
  isPending,
  // edit = false,
}: FAQFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FAQFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question_ar: initial.question_ar ?? "",
      question_en: initial.question_en ?? "",
      answer_ar:   initial.answer_ar   ?? "",
      answer_en:   initial.answer_en   ?? "",
      published:   initial.published   ?? true,
    },
  });

  const handleFormSubmit = (values: FAQFormValues) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="المعلومات الأساسية">
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

          {/* Question AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.question_ar}>
              <FieldLabel htmlFor="question-ar">السؤال (عربي) *</FieldLabel>
              <Input
                id="question-ar"
                aria-invalid={!!errors.question_ar}
                placeholder="أدخل السؤال بالعربية"
                {...register("question_ar")}
              />
              <FieldDescription>{errors.question_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Question EN */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.question_en}>
              <FieldLabel htmlFor="question-en">السؤال (انجليزي) *</FieldLabel>
              <Input
                id="question-en"
                dir="ltr"
                aria-invalid={!!errors.question_en}
                placeholder="Enter question in English"
                {...register("question_en")}
              />
              <FieldDescription>{errors.question_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Answer AR */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.answer_ar}>
              <FieldLabel htmlFor="answer-ar">الجواب (عربي) *</FieldLabel>
              <Textarea
                id="answer-ar"
                aria-invalid={!!errors.answer_ar}
                placeholder="أدخل الجواب بالعربية"
                {...register("answer_ar")}
                rows={4}
              />
              <FieldDescription>{errors.answer_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Answer EN */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.answer_en}>
              <FieldLabel htmlFor="answer-en">الجواب (انجليزي) *</FieldLabel>
              <Textarea
                id="answer-en"
                dir="ltr"
                aria-invalid={!!errors.answer_en}
                placeholder="Enter answer in English"
                {...register("answer_en")}
                rows={4}
              />
              <FieldDescription>{errors.answer_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button disabled={isPending} type="submit">
          {isPending ? "جار الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}