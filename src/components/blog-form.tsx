import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function BlogForm() {
  return (
    <form className="space-y-6" dir="rtl">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="name-ar">اسم الموقع (عربي)</Label>
          <Input id="name-ar" placeholder="مثال: ميثاق" />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="name-en">اسم الموقع (انجليزي)</Label>
          <Input id="name-en" placeholder="Ex: Mithaq" dir="ltr" />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+966 XXX XXX XXX"
            dir="ltr"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mithaq.com"
            dir="ltr"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="address">العنوان</Label>
          <Input id="address" placeholder="أدخل العنوان الكامل" />
        </div>
      </div>

    </form>
  );
}
