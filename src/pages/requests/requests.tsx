import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteMessage, updateRequest } from "@/lib/api/contact-message";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useRequests } from "@/lib/querykeys/requests-query";
import type { RequestType } from "@/lib/types/request";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const messagesColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الأسم" },
  { key: "status", name: "الحالة" },
  { key: "service.title_ar", name: "اسم الخدمة" },
  { key: "created_at", name: "تاريخ الرسالة" },
];

const Requests = () => {
  const { data: requests, isLoading: isLoadingRequests } = useRequests();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const requestsData = requests?.requests ?? [];

  const { mutateAsync: removeMessageMutation } = useMutation({
    mutationFn: (id: number) => deleteMessage(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.requests(undefined, page),
      });
      toast.success("تم حذف الطلب بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { mutateAsync: statusMessageMutation } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateRequest(Axios, id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.requests(undefined, page),
      });
      toast.success("تم تحديث الحالة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: RequestType): Promise<void> => {
    await removeMessageMutation(row.id);
  };

  const handleStatus = async (
    row: RequestType,
    status: string,
  ): Promise<void> => {
    await statusMessageMutation({ id: row.id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="الطلبات" />
      </div>

      <DataTable<RequestType>
        columns={messagesColumns}
        data={requestsData}
        entityLabel="الطلب"
        isLoading={isLoadingRequests}
        onDelete={handleDelete}
        popup={false}
        onStatus={handleStatus}
        allowedActions={["Read", "Remove", "Status"]}
      />
      {requests?.meta && <Pagination meta={requests.meta} />}
    </div>
  );
};

export default Requests;