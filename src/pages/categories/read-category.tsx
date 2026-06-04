import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { CategoryType } from "@/lib/types/category";
import { formatDate } from "@/helper/date-format";

interface ReadCategoryProps {
  category: CategoryType;
}

export default function ReadCategory({ category }: ReadCategoryProps) {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="تفاصيل القسم" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الاسم (عربي)" value={category.name_ar} />
          <Row label="الاسم (انجليزي)" value={category.name_en} />
          <Row label="عدد المقالات" value={String(category.blogs_count)} />
          <Row label="تاريخ الإنشاء" value={formatDate(category.created_at)} />
          <Row label="تاريخ التحديث" value={formatDate(category.updated_at)} />
        </div>
      </div>
    </div>
  );
}
