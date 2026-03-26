import { RichRow, Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { FAQType } from "@/lib/types/faq";

interface ReadFAQProps {
  faq: FAQType;
}

export default function ReadFAQ({ faq }: ReadFAQProps) {
  const isPublished = faq.published === true || (faq.published as any) === "1";

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الحالة" value={isPublished ? "مفعّل" : "غير مفعّل"} />
          <Row label="السؤال (عربي)" value={faq.question_ar} />
          <Row label="السؤال (انجليزي)" value={faq.question_en} />
          <RichRow label="الجواب (عربي)" value={faq.answer_ar} fullWidth />
          <RichRow label="الجواب (انجليزي)" value={faq.answer_en} fullWidth />
        </div>
      </div>
    </div>
  );
}
