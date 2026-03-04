import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logoImg from "@/assets/logo2.webp";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { loginSchema, type LoginFormValues } from "@/lib/schema/login-schema";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/login-banner.webp')",
        }}
      ></div>

      <div className="relative flex flex-col gap-5 items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-main z-1 opacity-30"></div>
        <img src={logoImg} alt="لوجو" width={70} />

        <div className="space-y-7 w-full sm:max-w-[400px] relative z-2 bg-white p-6 shadow-lg">
          <h1 className="text-2xl text-center font-bold text-main">تسجيل دخول</h1>

          <form className="space-y-7" dir="rtl" onSubmit={handleSubmit(onSubmit)}>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="Ex: admin@example.com"
                  className="ps-10"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              <FieldDescription>
                {errors.email && (
                  <span className="text-destructive text-xs">
                    {errors.email.message}
                  </span>
                )}
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="كلمة السر"
                  className="px-10"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  aria-label={
                    showPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldDescription>
                {errors.password && (
                  <span className="text-destructive text-xs">
                    {errors.password.message}
                  </span>
                )}
              </FieldDescription>
            </Field>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}