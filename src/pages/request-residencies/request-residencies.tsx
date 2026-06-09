import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteRequestResidency, updateRequestResidency } from "@/lib/api/request-residency";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useRequestResidencies } from "@/lib/querykeys/request-residency-query";
import type { RequestResidencyType } from "@/lib/types/request-residency";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const columns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الأسم" },
  { key: "phone", name: "رقم الهاتف" },
  { key: "residency.title_ar", name: "الإقامة" },
  { key: "status", name: "الحالة" },
  { key: "created_at", name: "تاريخ الطلب" },
];

const RequestResidencies = () => {
  const { data, isLoading } = useRequestResidencies();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const rows = data?.residenciesRequests ?? [];

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: (id: number) => deleteRequestResidency(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.requestResidencies(undefined, page),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pendingRequestResidenciesCount,
      });
      toast.success("تم حذف الطلب بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { mutateAsync: statusMutation } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateRequestResidency(Axios, id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.requestResidencies(undefined, page),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pendingRequestResidenciesCount,
      });
      toast.success("تم تحديث الحالة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: RequestResidencyType): Promise<void> => {
    await removeMutation(row.id);
  };

  const handleStatus = async (
    row: RequestResidencyType,
    status: string,
  ): Promise<void> => {
    await statusMutation({ id: row.id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="طلبات الإقامات" />
      </div>

      <DataTable<RequestResidencyType>
        columns={columns}
        data={rows}
        entityLabel="طلب الإقامة"
        isLoading={isLoading}
        onDelete={handleDelete}
        popup={false}
        onStatus={handleStatus}
        allowedActions={["Read", "Remove", "Status"]}
      />
      {data?.meta && <Pagination meta={data.meta} />}
    </div>
  );
};

export default RequestResidencies;
