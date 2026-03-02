import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logoImg from "@/assets/logo2.webp";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/login-banner.webp')",
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col gap-5 items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-main z-1 opacity-30"></div>
        <img src={logoImg} alt="لوجو" width={70} />

        <div className="space-y-7 w-full sm:max-w-[400px] relative z-2 bg-white p-6 shadow-lg">
          <h1 className="text-2xl text-center font-bold text-main">تسجيل دخول</h1>

          <form className="space-y-7">
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="Ex: admin@example.com"
                  className="ps-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة السر</Label>
              <div className="relative">
                
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="كلمة السر"
                  className="px-10"
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
            </div>

            <Button className="w-full">تسجيل</Button>

          </form>
        </div>
      </div>
    </div>
  );
}