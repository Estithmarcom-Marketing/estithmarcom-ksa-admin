import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { Lock, Eye, EyeOff } from "lucide-react";
import {
  changeAdminPasswordSchema,
  type AdminPasswordValues,
} from "@/lib/schema/admin-schema";

export default function ChangePasswordForm({
  onSubmit,
  onSuccess,
}: {
  onSubmit?: (data: AdminPasswordValues) => Promise<void> | void;
  onSuccess?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminPasswordValues>({
    resolver: zodResolver(changeAdminPasswordSchema),
  });

  const handleFormSubmit = async (data: AdminPasswordValues) => {
    await onSubmit?.(data);
    onSuccess?.();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="new-password">كلمة السر الجديدة</FieldLabel>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="new-password"
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
            <FieldLabel htmlFor="new-confirmPassword">تأكيد كلمة السر</FieldLabel>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="new-confirmPassword"
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
