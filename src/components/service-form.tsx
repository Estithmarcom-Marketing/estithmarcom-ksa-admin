// ServiceForm.tsx

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "./ui/field";
import { RichTextEditor } from "./ui/rich-text-editor";

export default function ServiceForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="name-ar">العنوان (عربي)</FieldLabel>
            <Input id="name-ar" aria-invalid={false} placeholder="مثال: ميثاق" />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="name-en">العنوان (انجليزي)</FieldLabel>
            <Input id="name-en" aria-invalid={false} placeholder="Ex: Mithaq" dir="ltr" />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="desc-ar">الوصف (عربي)</FieldLabel>
            <RichTextEditor
              id="desc-ar"
              aria-invalid={false}
              placeholder="الوصف بالعربي"
              dir="rtl"
            />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="desc-en">الوصف (انجليزي)</FieldLabel>
            <RichTextEditor
              id="desc-en"
              aria-invalid={false}
              placeholder="English Description"
              dir="ltr"
            />
            <FieldDescription />
          </Field>
        </div>

        {/* SEO Meta */}
        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="meta-title-ar">عنوان الصفحة في محركات البحث (عربي)</FieldLabel>
            <Input id="meta-title-ar" aria-invalid={false} placeholder="مثال: خدمة ميثاق للتوثيق" />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="meta-title-en">عنوان الصفحة في محركات البحث (انجليزي)</FieldLabel>
            <Input id="meta-title-en" aria-invalid={false} placeholder="Ex: Mithaq Documentation Service" dir="ltr" />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="meta-desc-ar">وصف الصفحة في محركات البحث (عربي)</FieldLabel>
            <Textarea id="meta-desc-ar" aria-invalid={false} placeholder="وصف مختصر يظهر في نتائج البحث بالعربي" />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="meta-desc-en">وصف الصفحة في محركات البحث (انجليزي)</FieldLabel>
            <Textarea id="meta-desc-en" aria-invalid={false} placeholder="Short description shown in search results" dir="ltr" />
            <FieldDescription />
          </Field>
        </div>

      </div>

      <div>
        <Button type="submit">حفظ</Button>
      </div>
    </form>
  );
}