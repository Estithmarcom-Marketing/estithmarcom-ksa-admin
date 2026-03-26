import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema, type ClientFormValues } from "@/lib/schema/client-schema";
import { FieldLabel, FieldDescription, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "./image-uploader";
import { Input } from "./ui/input";
import FormSection from "@/components/form-section";

interface ClientFormProps {
  initial?: Partial<ClientFormValues>;
  onSubmit?: (data: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: ClientFormValues): FormData {
  const formData = new FormData();
  formData.append("name_ar",   values.name_ar);
  formData.append("name_en",   values.name_en);
  formData.append("link",      values.link);
  formData.append("published", values.published ? "1" : "0");

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
}

export default function ClientForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name_ar:   initial.name_ar   ?? "",
      name_en:   initial.name_en   ?? "",
      link:      initial.link      ?? "",
      published: initial.published ?? true,
      image:     initial.image     ?? null,
    },
  });

  const handleFormSubmit = (values: ClientFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="معلومات الشريك">
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
              <FieldLabel>صورة الشريك</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة الشريك هنا أو اضغط للاختيار"
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
                placeholder="مثال: سوني"
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
                placeholder="Ex: Sony"
                {...register("name_en")}
              />
              <FieldDescription>{errors.name_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Link */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.link}>
              <FieldLabel htmlFor="link">الرابط</FieldLabel>
              <Input
                id="link"
                dir="ltr"
                aria-invalid={!!errors.link}
                placeholder="https://example.com"
                {...register("link")}
              />
              <FieldDescription>{errors.link?.message}</FieldDescription>
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