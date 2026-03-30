import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { countryFormSchema, type CountryFormValues } from "@/lib/schema/country-schema";
import { FieldLabel, FieldDescription, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "./image-uploader";
import { Input } from "./ui/input";
import FormSection from "@/components/form-section";

interface CountryFormProps {
  initial?: Partial<CountryFormValues>;
  onSubmit?: (formData: FormData) => void;
  isPending?: boolean;
  edit?: boolean;
}

function toFormData(values: CountryFormValues): FormData {
  const fd = new FormData();

  fd.append("name_ar",        values.name_ar);
  fd.append("name_en",        values.name_en);
  fd.append("title_ar",       values.title_ar);
  fd.append("title_en",       values.title_en);
  fd.append("description_ar", values.description_ar);
  fd.append("description_en", values.description_en);
  fd.append("active",         values.active ? "1" : "0");

  if (values.image instanceof File) {
    fd.append("image", values.image);
  }

  return fd;
}

export default function CountryForm({
  initial = {},
  onSubmit,
  isPending,
  edit = false,
}: CountryFormProps) {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CountryFormValues>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      name_ar:        initial.name_ar        ?? "",
      name_en:        initial.name_en        ?? "",
      title_ar:       initial.title_ar       ?? "",
      title_en:       initial.title_en       ?? "",
      description_ar: initial.description_ar ?? "",
      description_en: initial.description_en ?? "",
      active:         initial.active         ?? true,
      image:          initial.image          ?? null,
    },
  });

  const handleFormSubmit = (values: CountryFormValues) => {
    onSubmit?.(toFormData(values));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormSection title="معلومات الدولة">
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
              <FieldLabel>صورة الدولة</FieldLabel>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    invalid={!!errors.image}
                    placeholder="اسحب صورة الدولة هنا أو اضغط للاختيار"
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
                placeholder="مثال: السعودية"
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
                placeholder="Ex: Saudi Arabia"
                {...register("name_en")}
              />
              <FieldDescription>{errors.name_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Title AR */}
          <div className="col-span-2 sm:col-span-1">
            <Field data-invalid={!!errors.title_ar}>
              <FieldLabel htmlFor="title-ar">العنوان (عربي)</FieldLabel>
              <Input
                id="title-ar"
                aria-invalid={!!errors.title_ar}
                placeholder="المملكة العربية السعودية"
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
                placeholder="Kingdom of Saudi Arabia"
                {...register("title_en")}
              />
              <FieldDescription>{errors.title_en?.message}</FieldDescription>
            </Field>
          </div>

          {/* Description AR */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.description_ar}>
              <FieldLabel htmlFor="description-ar">الوصف (عربي)</FieldLabel>
              <Textarea
                id="description-ar"
                aria-invalid={!!errors.description_ar}
                placeholder="وصف عن الدولة بالعربي"
                {...register("description_ar")}
              />
              <FieldDescription>{errors.description_ar?.message}</FieldDescription>
            </Field>
          </div>

          {/* Description EN */}
          <div className="col-span-2">
            <Field data-invalid={!!errors.description_en}>
              <FieldLabel htmlFor="description-en">الوصف (انجليزي)</FieldLabel>
              <Textarea
                id="description-en"
                dir="ltr"
                aria-invalid={!!errors.description_en}
                placeholder="Description about the country in English"
                {...register("description_en")}
              />
              <FieldDescription>{errors.description_en?.message}</FieldDescription>
            </Field>
          </div>

        </div>
      </FormSection>

      <div className="flex gap-2 justify-end pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => nav("/dashboard/countries")}
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