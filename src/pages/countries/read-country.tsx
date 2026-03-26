import { RichRow, Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { CountryType } from "@/lib/types/countries";

interface ReadCountryProps {
  country: CountryType;
}

export default function ReadCountry({ country }: ReadCountryProps) {
  const isActive = country.active === true || (country.active as any) === "1";

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الحالة" value={isActive ? "مفعّل" : "غير مفعّل"} />

          {country.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة الدولة</span>
              <img
                src={
                  typeof country.image === "string"
                    ? country.image
                    : URL.createObjectURL(country.image)
                }
                alt={country.name_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="الاسم (عربي)" value={country.name_ar} />
          <Row label="الاسم (انجليزي)" value={country.name_en} />
          <Row label="العنوان (عربي)" value={country.title_ar} />
          <Row label="العنوان (انجليزي)" value={country.title_en} />
          <RichRow label="الوصف (عربي)" value={country.description_ar} fullWidth />
          <RichRow label="الوصف (انجليزي)" value={country.description_en} fullWidth />
        </div>
      </div>
    </div>
  );
}
