import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
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
            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="name-ar">اسم الموقع (عربي)</FieldLabel>
                <Input
                  id="name-ar"
                  placeholder="مثال: ميثاق"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="name-en">اسم الموقع (انجليزي)</FieldLabel>
                <Input
                  id="name-en"
                  placeholder="Ex: Mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+966 XXX XXX XXX"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mithaq.com"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="address">العنوان</FieldLabel>
                <Input
                  id="address"
                  placeholder="أدخل العنوان الكامل"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
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
            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="instagram">انستقرام</FieldLabel>
                <Input
                  id="instagram"
                  placeholder="Ex: https://www.instagram.com/mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="tiktok">تيك توك</FieldLabel>
                <Input
                  id="tiktok"
                  placeholder="Ex: https://www.tiktok.com/@mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="snapchat">سناب شات</FieldLabel>
                <Input
                  id="snapchat"
                  placeholder="Ex: https://www.snapchat.com/add/mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="facebook">فيسبوك</FieldLabel>
                <Input
                  id="facebook"
                  placeholder="Ex: https://www.facebook.com/mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Field data-invalid={false}>
                <FieldLabel htmlFor="twitter">تويتر / X</FieldLabel>
                <Input
                  id="twitter"
                  placeholder="Ex: https://www.x.com/mithaq"
                  dir="ltr"
                  aria-invalid={false}
                />
                <FieldDescription />
              </Field>
            </div>
          </div>

          <Button type="submit">حفظ التغييرات</Button>
        </form>
      </div>
    </>
  );
};

export default Settings;