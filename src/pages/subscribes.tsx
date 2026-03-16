import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import { useSub } from "@/lib/querykeys/subscribe-query";
import type { SubType } from "@/lib/types/subscribe";
import type { ColumnConfig } from "@/lib/types/table";

const subsColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "email", name: "البريد الإلكتروني" },
  { key: "created_at", name: "تاريخ الأشتراك" },
];

const Subscribes = () => {
  const { data: subs, isLoading: isLoadingSubs } = useSub();

  const subsData = subs?.subscribers ?? [];

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <SpecialHeader title="الأشتراكات" />
      </div>

      <DataTable<SubType>
        columns={subsColumns}
        data={subsData}
        entityLabel="اشتراك"
        isLoading={isLoadingSubs}
        popup={true}
        allowedActions={[]}
      />
      {subs?.meta && <Pagination meta={subs.meta} />}
    </div>
  );
};

export default Subscribes;