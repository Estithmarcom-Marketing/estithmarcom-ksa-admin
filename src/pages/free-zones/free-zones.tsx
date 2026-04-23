import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteFreeZone } from "@/lib/api/free-zone";
import { useFreeZones } from "@/lib/querykeys/free-zone-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { FreeZoneType } from "@/lib/types/free-zone";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const freeZoneColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "title_ar", name: "العنوان (عربي)" },
  { key: "slug_ar", name: "الرابط (عربي)" },
  { key: "active", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const FreeZones = () => {
  const { data: zones, isLoading: isLoadingZones } = useFreeZones();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const zonesData = zones?.zones ?? [];

  const { mutateAsync: removeFreeZoneMutation } = useMutation({
    mutationFn: (id: number) => deleteFreeZone(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.freeZones(undefined, page),
      });
      toast.success("تم حذف المنطقة الحرة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: FreeZoneType): Promise<void> => {
    await removeFreeZoneMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="المناطق الحرة" />
      </div>

      <DataTable<FreeZoneType>
        columns={freeZoneColumns}
        data={zonesData}
        entityLabel="منطقة حرة"
        onDelete={handleDelete}
        isLoading={isLoadingZones}
        popup={false}
        allowedActions={["Add", "Read", "Edit", "Remove"]}
      />
      {zones?.meta && <Pagination meta={zones.meta} />}
    </div>
  );
};

export default FreeZones;
