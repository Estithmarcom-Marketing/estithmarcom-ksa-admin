import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  socialLinksSchema,
  type SocialLinksValues,
} from "@/lib/schema/website-info-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

interface SocialLinksFormProps {
  defaultValues?: Partial<SocialLinksValues>;
  onSubmit: (data: SocialLinksValues) => void;
  isLoading: boolean;
}

const socials: {
  name: keyof SocialLinksValues;
  label: string;
  placeholder: string;
}[] = [
  {
    name: "facebook",
    label: "فيسبوك",
    placeholder: "https://facebook.com/yourpage",
  },
  { name: "x", label: "X (تويتر)", placeholder: "https://x.com/yourhandle" },
  {
    name: "instagram",
    label: "إنستغرام",
    placeholder: "https://instagram.com/yourhandle",
  },
  {
    name: "snapchat",
    label: "سناب شات",
    placeholder: "https://snapchat.com/add/yourname",
  },
  {
    name: "tiktok",
    label: "تيك توك",
    placeholder: "https://tiktok.com/@yourhandle",
  },
];

export function SocialLinksForm({
  defaultValues,
  onSubmit,
  isLoading,
}: SocialLinksFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialLinksValues>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {},
  });

  console.log(defaultValues);
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials.map(({ name, label, placeholder }) => (
          <Field key={name} data-invalid={!!errors[name]}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type="url"
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              {...register(name)}
            />
            {errors[name] && (
              <FieldDescription className="text-destructive text-sm">
                {errors[name]?.message}
              </FieldDescription>
            )}
          </Field>
        ))}
      </div>

      <Button disabled={isLoading} type="submit">
        {isLoading ? "جار الحفظ..." : "حفظ الروابط"}
      </Button>
    </form>
  );
}