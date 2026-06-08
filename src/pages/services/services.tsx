import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteService } from "@/lib/api/service";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useServices } from "@/lib/querykeys/service-query";
import type { ServiceType } from "@/lib/types/services";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const serviceColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "title_ar", name: "الاسم (عربي)" },
  { key: "published", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Services = () => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const servicesData = services?.services ?? [];

  const { mutateAsync: removeServiceMutation } = useMutation({
    mutationFn: (id: number) => deleteService(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.services(undefined, page),
      });
      toast.success("تم حذف الخدمة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: ServiceType): Promise<void> => {
    await removeServiceMutation(row.id);
  };

  return (
    <div className="space-y-6">
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
      {services?.meta && <Pagination meta={services.meta} />}
    </div>
  );
};

export default Services;