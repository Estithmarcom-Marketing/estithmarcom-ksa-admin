import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useClients } from "@/lib/querykeys/clients-query";
import { deleteClient } from "@/lib/api/client";
import type { ClientType } from "@/lib/types/clients";

const clientColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "name_ar", name: "الاسم (عربي)" },
  { key: "name_en", name: "الاسم (انجليزي)" },
  { key: "link", name: "الرابط" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Clients = () => {
  const { data: clients, isLoading: isLoadingClients } = useClients();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const clientsData = clients?.clients ?? [];

  const { mutateAsync: removeClientMutation } = useMutation({
    mutationFn: (id: number) => deleteClient(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.clients(undefined, page),
      });
      toast.success("تم حذف الشريك بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: ClientType): Promise<void> => {
    await removeClientMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="شركاؤنا" />
      </div>

      <DataTable<ClientType>
        columns={clientColumns}
        data={clientsData}
        entityLabel="شريك"
        isLoading={isLoadingClients}
        onDelete={handleDelete}
        popup={false}
      />
      {clients?.meta && <Pagination meta={clients.meta} />}
    </div>
  );
};

export default Clients;
