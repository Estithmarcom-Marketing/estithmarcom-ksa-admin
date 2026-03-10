import { RichRow, Row } from "@/components/read-row";
import type { ServiceType } from "@/lib/types/services";

interface ReadServiceProps {
  service: ServiceType;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base font-bold text-foreground border-b border-input pb-2 mb-4">
      {title}
    </h3>
  );
}

export default function ReadService({ service }: ReadServiceProps) {
  const isPublished = service.published === true || (service.published as any) === "1";

  return (
    <div className="space-y-8">

      {/* Basic Info */}
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الحالة" value={isPublished ? "مفعّل" : "غير مفعّل"} />

          {service.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة الخدمة</span>
              <img
                src={typeof service.image === "string" ? service.image : URL.createObjectURL(service.image)}
                alt={service.title_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="العنوان (عربي)" value={service.title_ar} />
          <Row label="العنوان (انجليزي)" value={service.title_en} />
          <Row label="وصف قصير (عربي)" value={service.short_description_ar} />
          <Row label="وصف قصير (انجليزي)" value={service.short_description_en} />
          <RichRow label="وصف طويل (عربي)" value={service.long_description_ar} fullWidth />
          <RichRow label="وصف طويل (انجليزي)" value={service.long_description_en} fullWidth />
        </div>
      </div>

      {/* Features */}
      <div>
        <SectionTitle title="المميزات" />
        {service.features.length === 0 ? (
          <span className="text-sm text-[#666]">لا توجد مميزات</span>
        ) : (
          <div className="space-y-4">
            {service.features.map((feature, index) => (
              <div key={feature.id}>
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
                  <Row label="الميزة (عربي)" value={feature.title_ar} />
                  <Row label="الميزة (انجليزي)" value={feature.title_en} />
                  <Row label="الحالة" value={feature.published === "1" ? "مفعّل" : "غير مفعّل"} />
                </div>
                {index < service.features.length - 1 && <hr className="border-input mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQs */}
      <div>
        <SectionTitle title="الأسئلة الشائعة" />
        {service.faqs.length === 0 ? (
          <span className="text-sm text-[#666]">لا توجد أسئلة</span>
        ) : (
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={faq.id}>
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-1">
                  <Row label="السؤال (عربي)" value={faq.question_ar} />
                  <Row label="السؤال (انجليزي)" value={faq.question_en} />
                  <Row label="الجواب (عربي)" value={faq.answer_ar} />
                  <Row label="الجواب (انجليزي)" value={faq.answer_en} />
                  <Row label="الحالة" value={faq.published === "1" ? "مفعّل" : "غير مفعّل"} />
                </div>
                {index < service.faqs.length - 1 && <hr className="border-input mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO */}
      <div>
        <SectionTitle title="محركات البحث (SEO)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="عنوان الصفحة (عربي)" value={service.meta_title_ar} />
          <Row label="عنوان الصفحة (انجليزي)" value={service.meta_title_en} />
          <Row label="وصف الصفحة (عربي)" value={service.meta_description_ar} />
          <Row label="وصف الصفحة (انجليزي)" value={service.meta_description_en} />
        </div>
      </div>

    </div>
  );
}