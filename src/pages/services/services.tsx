import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import { useServices } from "@/lib/querykeys/service-query";
import type { ServiceType } from "@/lib/types/services";
import type { ColumnConfig } from "@/lib/types/table";

const serviceColumns: ColumnConfig[] = [
  { key: "id",      name: "#" },
  { key: "image",      name: "الصورة" },
  { key: "title_ar", name: "الاسم (عربي)" },
  { key: "short_description_ar", name: "وصف قصير (عربي)" },
  { key: "published",    name: "الحالة" },
];

const Services = () => {
  const { data: services, isLoading: isLoadingServices } = useServices();

  const servicesData = services?.services ?? [];

  const handleDelete = (rows: ServiceType[]) => {
    console.log("delete", rows);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <SpecialHeader title="الخدمات"/>
      </div>

      <DataTable<ServiceType>
        columns={serviceColumns}
        data={servicesData}
        entityLabel="خدمة"
        isLoading={isLoadingServices}
        onDelete={handleDelete}
        popup={false}
      />
    </div>
  );
};

export default Services;