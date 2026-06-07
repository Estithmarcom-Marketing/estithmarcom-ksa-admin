import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { ResidencyType } from "@/lib/types/residencies";

interface ReadResidencyProps {
  residency: ResidencyType;
}

export default function ReadResidency({ residency }: ReadResidencyProps) {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="معلومات الإقامة" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {residency.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة الإقامة</span>
              <img
                src={
                  typeof residency.image === "string"
                    ? residency.image
                    : URL.createObjectURL(residency.image)
                }
                alt={residency.title_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="العنوان (عربي)" value={residency.title_ar} />
          <Row label="العنوان (انجليزي)" value={residency.title_en} />
          <Row label="الوصف (عربي)" value={residency.description_ar} />
          <Row label="الوصف (انجليزي)" value={residency.description_en} />
          <Row label="الدولة" value={residency.countries?.[0]?.name_ar ?? "غير محدد"} />
          <Row label="تاريخ الإنشاء" value={residency.created_at} />
        </div>
      </div>

      <div>
        <SectionTitle title="محركات البحث (SEO)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="عنوان الصفحة (عربي)" value={residency.meta_title_ar} />
          <Row label="عنوان الصفحة (انجليزي)" value={residency.meta_title_en} />
          <Row label="وصف الصفحة (عربي)" value={residency.meta_description_ar} />
          <Row label="وصف الصفحة (انجليزي)" value={residency.meta_description_en} />
        </div>
      </div>
    </div>
  );
}
