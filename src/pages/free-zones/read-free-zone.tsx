import { RichRow, Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { FreeZoneType } from "@/lib/types/free-zone";

interface ReadFreeZoneProps {
  zone: FreeZoneType;
}

export default function ReadFreeZone({ zone }: ReadFreeZoneProps) {
  const isActive = zone.active === true || (zone.active as any) === "1";

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الحالة" value={isActive ? "مفعّل" : "غير مفعّل"} />

          {zone.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">
                صورة المنطقة الحرة
              </span>
              <img
                src={
                  typeof zone.image === "string"
                    ? zone.image
                    : URL.createObjectURL(zone.image)
                }
                alt={zone.title_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="العنوان (عربي)" value={zone.title_ar} />
          <Row label="العنوان (انجليزي)" value={zone.title_en} />
          <Row label="الرابط (عربي)" value={zone.slug_ar} />
          <Row label="الرابط (انجليزي)" value={zone.slug_en} />
          <Row label="تاريخ الإنشاء" value={zone.created_at} />
        </div>
      </div>

      {/* Content */}
      <div>
        <SectionTitle title="المحتوى" />
        <div className="grid grid-cols-1 gap-x-8">
          <RichRow label="المحتوى (عربي)" value={zone.content_ar} fullWidth />
          <RichRow
            label="المحتوى (انجليزي)"
            value={zone.content_en}
            fullWidth
          />
        </div>
      </div>

      {/* FAQs */}
      <div>
        <SectionTitle title="الأسئلة الشائعة" />
        {zone.faqs.length === 0 ? (
          <span className="text-sm text-[#666]">لا توجد أسئلة</span>
        ) : (
          <div className="space-y-4">
            {zone.faqs.map((faq, index) => (
              <div key={faq.id}>
                <span className="text-xs text-muted-foreground">
                  #{index + 1}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
                  <Row label="السؤال (عربي)" value={faq.question_ar} />
                  <Row label="السؤال (انجليزي)" value={faq.question_en} />
                  <Row label="الجواب (عربي)" value={faq.answer_ar} />
                  <Row label="الجواب (انجليزي)" value={faq.answer_en} />
                  <Row
                    fullWidth
                    label="الحالة"
                    value={faq.published === true ? "مفعّل" : "غير مفعّل"}
                  />
                </div>
                {index < zone.faqs.length - 1 && (
                  <hr className="border-input mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
