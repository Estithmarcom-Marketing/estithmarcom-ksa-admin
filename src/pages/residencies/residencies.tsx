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
import { useResidencies } from "@/lib/querykeys/residencies-query";
import { deleteResidency } from "@/lib/api/residencies";
import type { ResidencyType } from "@/lib/types/residencies";

const residencyColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "title_ar", name: "العنوان (عربي)" },
  { key: "title_en", name: "العنوان (انجليزي)" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Residencies = () => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const { data: residencies, isLoading: isLoadingResidencies } = useResidencies(page);
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const residenciesData = residencies?.residencies ?? [];

  const { mutateAsync: removeResidencyMutation } = useMutation({
    mutationFn: (id: number) => deleteResidency(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.residencies(undefined, page),
      });
      toast.success("تم حذف الإقامة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: ResidencyType): Promise<void> => {
    await removeResidencyMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="الإقامات" />
      </div>

      <DataTable<ResidencyType>
        columns={residencyColumns}
        data={residenciesData}
        entityLabel="إقامة"
        isLoading={isLoadingResidencies}
        onDelete={handleDelete}
        popup={false}
      />
      {residencies?.meta && <Pagination meta={residencies.meta} />}
    </div>
  );
};

export default Residencies;
