import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CategoryForm from "@/components/category-form";
import { addCategory } from "@/lib/api/category";
import type { CategoryFormValues } from "@/lib/schema/category-schema";

const AddCategory = () => {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CategoryFormValues) => addCategory(Axios, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories() });
      await queryClient.invalidateQueries({ queryKey: queryKeys.categoriesUnpaginated() });
      toast.success("تم إضافة القسم بنجاح");
      navigate("/dashboard/categories");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-6">
      <SpecialHeader title="إضافة قسم جديد" />
      <CategoryForm onSubmit={mutate} isPending={isPending} />
    </div>
  );
};

export default AddCategory;
