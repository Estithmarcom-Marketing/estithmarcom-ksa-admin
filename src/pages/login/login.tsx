import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logoImg from "@/assets/logo2.webp";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { loginSchema, type LoginFormValues } from "@/lib/schema/login-schema";
import useAxios from "@/hooks/use-axios";
import { LoginFn } from "@/lib/api/auth";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { usePageTitle } from "@/hooks/use-page-title";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const Axios = useAxios();
  const nav = useNavigate()
  const queryClient = useQueryClient();
  usePageTitle("تسجيل دخول")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginFormValues) => LoginFn(Axios, values),
    onSuccess: (data) => {
      setServerError(null);
      Cookies.set("mithaq-admin", data.data.token, { expires: 7 });
      queryClient.invalidateQueries({
        queryKey: queryKeys.currentUser,
      });
      toast.success("تم تسجيل الدخول بنجاح");
      nav('/dashboard', {replace: true})
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message =
        error.response?.data?.error || "حدث خطأ، يرجى المحاولة مرة أخرى";
      setValue("password", "");
      setServerError(message);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setServerError(null);
    mutate(values);
  };

  const hasPasswordError = !!errors.password || !!serverError;

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
          <h1 className="text-2xl text-center font-bold text-main">
            تسجيل دخول
          </h1>

          <form
            className="space-y-7"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <span className="text-xs">
                    {errors.email.message}
                  </span>
                )}
              </FieldDescription>
            </Field>

            <Field data-invalid={hasPasswordError}>
              <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="كلمة السر"
                  className="px-10"
                  aria-invalid={hasPasswordError}
                  {...register("password", {
                    onChange: () => setServerError(null),
                  })}
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
                {hasPasswordError && (
                  <span className="text-xs">
                    {serverError || errors.password?.message}
                  </span>
                )}
              </FieldDescription>
            </Field>

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "جاري التسجيل..." : "تسجيل"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}