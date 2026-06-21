import StaticPageForm from "@/components/static-page-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addStaticPage } from "@/lib/api/static-page";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddStaticPage() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitStaticPage(data: any) {
    addStaticPageMutation(data);
  }

  const { mutateAsync: addStaticPageMutation, isPending } = useMutation({
    mutationFn: (data: any) => addStaticPage(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.staticPages(),
      });
      toast.success("تم إضافة الصفحة بنجاح");
      nav("/dashboard/static-pages");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="إضافة صفحة ثابتة" />
      </div>
      <div>
        <StaticPageForm
          isPending={isPending}
          onSubmit={(data) => SubmitStaticPage(data)}
        />
      </div>
    </div>
  );
}
