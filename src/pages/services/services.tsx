import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteService } from "@/lib/api/service";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useServices } from "@/lib/querykeys/service-query";
import type { ServiceType } from "@/lib/types/services";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const serviceColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "title_ar", name: "الاسم (عربي)" },
  { key: "short_description_ar", name: "وصف قصير (عربي)" },
  { key: "published", name: "الحالة" },
];

const Services = () => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const servicesData = services?.services ?? [];

  const { mutateAsync: removeServiceMutation } = useMutation({
    mutationFn: (id: number) => deleteService(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.services() });
      toast.success("تم حذف الخدمة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الخدمة");
    },
  });

  const handleDelete = async (row: ServiceType): Promise<void> => {
    await removeServiceMutation(row.id);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <SpecialHeader title="الخدمات" />
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
