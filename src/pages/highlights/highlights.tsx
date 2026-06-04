import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import type { ColumnConfig } from "@/lib/types/table";
import { useSearchParams } from "react-router-dom";
import { useHighlights } from "@/lib/querykeys/highlights-query";
import type { HighlightType } from "@/lib/types/highlights";

const highlightColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "label_ar", name: "العنوان (عربي)" },
  { key: "value_ar", name: "القيمة (عربي)" },
  { key: "value_en", name: "القيمة (انجليزي)" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Highlights = () => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const { data: highlights, isLoading: isLoadingHighlights } = useHighlights(page);

  const highlightsData = highlights?.highlights ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="الإنجازات" />
      </div>

      <DataTable<HighlightType>
        columns={highlightColumns}
        data={highlightsData}
        entityLabel="إنجاز"
        isLoading={isLoadingHighlights}
        allowedActions={["Read", "Edit"]}
        popup={false}
      />
      {highlights?.meta && <Pagination meta={highlights.meta} />}
    </div>
  );
};

export default Highlights;
