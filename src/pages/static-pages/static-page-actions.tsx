import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StaticPageForm from "@/components/static-page-form";
import ReadStaticPage from "./read-static-page";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getStaticPage, updateStaticPage } from "@/lib/api/static-page";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";

export default function StaticPageActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: any) {
    updateStaticPageMutation(data);
  }

  const { mutateAsync: updateStaticPageMutation, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: (data: any) => updateStaticPage(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.staticPages(),
        });
        toast.success("تم تحديث الصفحة بنجاح");
        nav("/dashboard/static-pages");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: page, isLoading } = useQuery({
    queryKey: queryKeys.staticPages(id),
    queryFn: () => getStaticPage(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/static-pages", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل صفحة ثابتة" : "قراءة تفاصيل الصفحة"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <StaticPageForm
              initial={
                page
                  ? {
                      title_ar: page.title_ar,
                      title_en: page.title_en,
                      content_ar: page.content_ar,
                      content_en: page.content_en,
                      meta_title_ar: page.meta_title_ar ?? "",
                      meta_title_en: page.meta_title_en ?? "",
                      meta_description_ar: page.meta_description_ar ?? "",
                      meta_description_en: page.meta_description_en ?? "",
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdate}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : page ? (
            <ReadStaticPage page={page} />
          ) : null)}
      </div>
    </div>
  );
}
