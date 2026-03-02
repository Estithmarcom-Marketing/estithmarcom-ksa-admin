import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function BlogForm({ showActions = false }: { showActions?: boolean }) {
  return (
    <form className="space-y-6" dir="rtl">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="name-ar">العنوان (عربي)</Label>
          <Input id="name-ar" placeholder="مثال: ميثاق" />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="name-en">العنوان (انجليزي)</Label>
          <Input id="name-en" placeholder="Ex: Mithaq" dir="ltr" />
        </div>

        <div className="col-span-2">
          <Label htmlFor="desc-ar">وصف (عربي)</Label>
          <Textarea id="desc-ar" placeholder="الوصف بالعربي" />
        </div>

        <div className="col-span-2">
          <Label htmlFor="desc-en">وصف (انجليزي)</Label>
          <Textarea id="desc-en" placeholder="English Description" dir="ltr" />
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