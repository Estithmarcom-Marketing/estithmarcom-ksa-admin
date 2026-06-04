import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { HighlightType } from "@/lib/types/highlights";
import { formatDate } from "@/helper/date-format";

interface ReadHighlightProps {
  highlight: HighlightType;
}

export default function ReadHighlight({ highlight }: ReadHighlightProps) {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="تفاصيل الإنجاز" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {highlight.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">الصورة</span>
              <img
                src={
                  typeof highlight.image === "string"
                    ? highlight.image
                    : URL.createObjectURL(highlight.image)
                }
                alt={highlight.label_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="العنوان (عربي)" value={highlight.label_ar} />
          <Row label="العنوان (انجليزي)" value={highlight.label_en} />
          <Row label="القيمة (عربي)" value={String(highlight.value_ar)} />
          <Row label="القيمة (انجليزي)" value={String(highlight.value_en)} />
          <Row label="تاريخ الإنشاء" value={formatDate(highlight.created_at)} />
          <Row label="تاريخ التحديث" value={formatDate(highlight.updated_at)} />
        </div>
      </div>
    </div>
  );
}
