import { RichRow, Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { StaticPageType } from "@/lib/types/static-pages";

interface ReadStaticPageProps {
  page: StaticPageType;
}

export default function ReadStaticPage({ page }: ReadStaticPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="العنوان (عربي)" value={page.title_ar} />
          <Row label="العنوان (انجليزي)" value={page.title_en} />
          <RichRow label="المحتوى (عربي)" value={page.content_ar} fullWidth />
          <RichRow label="المحتوى (انجليزي)" value={page.content_en} fullWidth />
        </div>
      </div>

      {(page.meta_title_ar || page.meta_title_en || page.meta_description_ar || page.meta_description_en) && (
        <div>
          <SectionTitle title="محركات البحث (SEO)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {page.meta_title_ar && <Row label="عنوان SEO (عربي)" value={page.meta_title_ar} />}
            {page.meta_title_en && <Row label="عنوان SEO (انجليزي)" value={page.meta_title_en} />}
            {page.meta_description_ar && <Row label="وصف SEO (عربي)" value={page.meta_description_ar} />}
            {page.meta_description_en && <Row label="وصف SEO (انجليزي)" value={page.meta_description_en} />}
          </div>
        </div>
      )}
    </div>
  );
}
