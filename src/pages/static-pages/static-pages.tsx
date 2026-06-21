import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteStaticPage } from "@/lib/api/static-page";
import { useStaticPages } from "@/lib/querykeys/static-page-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { StaticPageType } from "@/lib/types/static-pages";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const staticPageColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "title_ar", name: "العنوان (عربي)" },
  { key: "title_en", name: "العنوان (انجليزي)" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const StaticPages = () => {
  const { data: staticPages, isLoading } = useStaticPages();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const staticPagesData = staticPages?.pages ?? [];

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: (id: number) => deleteStaticPage(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.staticPages(undefined, page),
      });
      toast.success("تم حذف الصفحة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: StaticPageType): Promise<void> => {
    await removeMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="الصفحات الثابتة" />
      </div>

      <DataTable<StaticPageType>
        columns={staticPageColumns}
        data={staticPagesData}
        entityLabel="صفحة"
        isLoading={isLoading}
        onDelete={handleDelete}
        popup={false}
      />
      {staticPages?.meta && <Pagination meta={staticPages.meta} />}
    </div>
  );
};

export default StaticPages;
