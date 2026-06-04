import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import { getCategory, updateCategory } from "@/lib/api/category";
import CategoryForm from "@/components/category-form";
import type { CategoryFormValues } from "@/lib/schema/category-schema";
import ReadCategory from "./read-category";

export default function CategoryActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategoryMutation, isPending: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: (data: CategoryFormValues) => updateCategory(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.categories(),
        });
        await queryClient.invalidateQueries({
          queryKey: queryKeys.categoriesUnpaginated(),
        });
        toast.success("تم تحديث القسم بنجاح");
        nav("/dashboard/categories");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: category, isLoading } = useQuery({
    queryKey: queryKeys.categories(id),
    queryFn: () => getCategory(Axios, id),
    enabled: !!id,
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/categories", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={
            action === "edit"
              ? "تعديل قسم"
              : "تفاصيل القسم"
          }
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <CategoryForm
              initial={
                category
                  ? {
                      name_ar: category.name_ar,
                      name_en: category.name_en,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => updateCategoryMutation(data)}
              isPending={isLoadingUpdateCategory}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : category ? (
            <ReadCategory category={category} />
          ) : null)}
      </div>
    </div>
  );
}
