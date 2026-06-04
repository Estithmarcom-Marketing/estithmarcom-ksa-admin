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
import { useCategories } from "@/lib/querykeys/categories-query";
import { deleteCategory } from "@/lib/api/category";
import type { CategoryType } from "@/lib/types/category";

const categoryColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name_ar", name: "الاسم (عربي)" },
  { key: "name_en", name: "الاسم (انجليزي)" },
  { key: "blogs_count", name: "عدد المقالات" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Categories = () => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const { data: categories, isLoading: isLoadingCategories } = useCategories(page);
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const categoriesData = categories?.categories ?? [];

  const { mutateAsync: removeCategoryMutation } = useMutation({
    mutationFn: (id: number) => deleteCategory(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.categories(undefined, page),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.categoriesUnpaginated(),
      });
      toast.success("تم حذف القسم بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: CategoryType): Promise<void> => {
    await removeCategoryMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="الأقسام" />
      </div>

      <DataTable<CategoryType>
        columns={categoryColumns}
        data={categoriesData}
        entityLabel="قسم"
        isLoading={isLoadingCategories}
        onDelete={handleDelete}
        popup={false}
      />
      {categories?.meta && <Pagination meta={categories.meta} />}
    </div>
  );
};

export default Categories;
