import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import type { ServiceType } from "@/lib/types/services";
import type { ColumnConfig } from "@/lib/types/table";

const serviceColumns: ColumnConfig[] = [
  { key: "id",      name: "#" },
  { key: "name_ar", name: "الاسم (عربي)" },
  { key: "name_en", name: "الاسم (انجليزي)" },
  { key: "desc",    name: "الوصف" },
];

const mockServices: ServiceType[] = [
  { id: 1, name_ar: "تصميم الهوية", name_en: "Brand Identity",   desc: "تصميم الشعار والألوان" },
  { id: 2, name_ar: "تطوير الويب",  name_en: "Web Development",  desc: "بناء مواقع احترافية" },
  { id: 3, name_ar: "التسويق",      name_en: "Marketing",        desc: "خطط تسويقية متكاملة" },
];

const Services = () => {

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
        data={mockServices}
        entityLabel="خدمة"
        onDelete={handleDelete}
        // formContent={<ServiceForm />}  ← plug in your form later
      />
    </div>
  );
};

export default Services;