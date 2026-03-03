import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "./ui/field";

export default function BlogForm({ showActions = false }: { showActions?: boolean }) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="name-ar">العنوان (عربي)</FieldLabel>
            <Input
              id="name-ar"
              aria-invalid={false}
              placeholder="مثال: ميثاق"
            />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="name-en">العنوان (انجليزي)</FieldLabel>
            <Input
              id="name-en"
              aria-invalid={false}
              placeholder="Ex: Mithaq"
              dir="ltr"
            />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="desc-ar">وصف (عربي)</FieldLabel>
            <Textarea
              id="desc-ar"
              aria-invalid={false}
              placeholder="الوصف بالعربي"
            />
            <FieldDescription />
          </Field>
        </div>

        <div className="col-span-2">
          <Field data-invalid={false}>
            <FieldLabel htmlFor="desc-en">وصف (انجليزي)</FieldLabel>
            <Textarea
              id="desc-en"
              aria-invalid={false}
              placeholder="English Description"
              dir="ltr"
            />
            <FieldDescription />
          </Field>
        </div>
      </div>

      {showActions && (
        <div>
          <Button type="submit">حفظ</Button>
        </div>
      )}
    </form>
  );
}