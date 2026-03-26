"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faqFormSchema, type FAQFormValues } from "@/lib/schema/faq-schema";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/form-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
  edit = false,
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
      answer_ar: initial.answer_ar ?? "",
      answer_en: initial.answer_en ?? "",
      published: initial.published ?? true,
    },
  });

  const handleFormSubmit = (values: FAQFormValues) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="المعلومات الأساسية">
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
                  <Label htmlFor="published">مفعّل</Label>
                </>
              )}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="question_ar">السؤال (عربي) *</Label>
            <Input
              id="question_ar"
              placeholder="أدخل السؤال بالعربية"
              {...register("question_ar")}
            />
            {errors.question_ar && (
              <span className="text-xs text-red-500">
                {errors.question_ar.message}
              </span>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="question_en">السؤال (انجليزي) *</Label>
            <Input
              id="question_en"
              placeholder="Enter question in English"
              {...register("question_en")}
            />
            {errors.question_en && (
              <span className="text-xs text-red-500">
                {errors.question_en.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <Label htmlFor="answer_ar">الجواب (عربي) *</Label>
            <Textarea
              id="answer_ar"
              placeholder="أدخل الجواب بالعربية"
              {...register("answer_ar")}
              rows={4}
            />
            {errors.answer_ar && (
              <span className="text-xs text-red-500">
                {errors.answer_ar.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <Label htmlFor="answer_en">الجواب (انجليزي) *</Label>
            <Textarea
              id="answer_en"
              placeholder="Enter answer in English"
              {...register("answer_en")}
              rows={4}
            />
            {errors.answer_en && (
              <span className="text-xs text-red-500">
                {errors.answer_en.message}
              </span>
            )}
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
