import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { addAdminSchema, type AdminFormData } from "@/lib/schema/admin-schema";

export default function AdminForm({
  defaultValues,
  onSubmit,
  onSuccess,
}: {
  defaultValues?: Partial<AdminFormData>;
  onSubmit?: (data: AdminFormData) => Promise<void> | void;
  onSuccess?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormData>({
    resolver: zodResolver(addAdminSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: AdminFormData) => {
    await onSubmit?.(data);
    onSuccess?.();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">الاسم</FieldLabel>
            <div className="relative">
              <User className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                aria-invalid={!!errors.name}
                placeholder="مثال: محمد أحمد"
                className="ps-10"
                {...register("name")}
              />
            </div>
            <FieldDescription>{errors.name?.message}</FieldDescription>
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                placeholder="مثال: admin@example.com"
                className="ps-10"
                {...register("email")}
              />
            </div>
            <FieldDescription>{errors.email?.message}</FieldDescription>
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
                placeholder="••••••••"
                className="px-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label={showPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FieldDescription>{errors.password?.message}</FieldDescription>
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={!!errors.password_confirmation}>
            <FieldLabel htmlFor="confirmPassword">تأكيد كلمة السر</FieldLabel>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                aria-invalid={!!errors.password_confirmation}
                placeholder="••••••••"
                className="px-10"
                {...register("password_confirmation")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label={showConfirmPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FieldDescription>{errors.password_confirmation?.message}</FieldDescription>
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جارٍ الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}