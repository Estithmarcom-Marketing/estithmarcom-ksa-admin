import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SpecialHeader from "@/components/SpecialHeader";

const Settings = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <SpecialHeader title="معلومات الموقع" />
        </div>

        <form className="space-y-6" dir="rtl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <Label htmlFor="name-ar">اسم الموقع (عربي)</Label>
              <Input id="name-ar" placeholder="مثال: ميثاق" />
            </div>

            <div>
              <Label htmlFor="name-en">اسم الموقع (انجليزي)</Label>
              <Input id="name-en" placeholder="Ex: Mithaq" dir="ltr" />
            </div>

            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+966 XXX XXX XXX"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mithaq.com"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="address">العنوان</Label>
              <Input id="address" placeholder="أدخل العنوان الكامل" />
            </div>
          </div>

          <Button type="submit">حفظ التغييرات</Button>
        </form>
      </div>

      <div className="space-y-6 mt-10">
        <div>
          <SpecialHeader title="الروابط" />
        </div>

        <form className="space-y-6" dir="rtl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <Label htmlFor="instagram">انستقرام</Label>
              <Input
                id="instagram"
                placeholder="Ex: https://www.instagram.com/mithaq"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="tiktok">تيك توك</Label>
              <Input
                id="tiktok"
                placeholder="Ex: https://www.tiktok.com/@mithaq"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="snapchat">سناب شات</Label>
              <Input
                id="snapchat"
                placeholder="Ex: https://www.snapchat.com/add/mithaq"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="facebook">فيسبوك</Label>
              <Input
                id="facebook"
                placeholder="Ex: https://www.facebook.com/mithaq"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="twitter">تويتر / X</Label>
              <Input
                id="twitter"
                placeholder="Ex: https://www.x.com/mithaq"
                dir="ltr"
              />
            </div>
          </div>

          <Button type="submit">حفظ التغييرات</Button>
        </form>
      </div>
    </>
  );
};

export default Settings;