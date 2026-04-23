import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "@/components/service-form";
import ReadService from "./read-service";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getService, updateService } from "@/lib/api/service";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";

export default function ServiceActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateServiceMutation(data);
  }

  const {
    mutateAsync: updateServiceMutation,
    isPending: isLoadingUpdateService,
  } = useMutation({
    mutationFn: (data: FormData) => updateService(Axios, id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.services() });
      toast.success("تم تحديث الخدمة بنجاح");
      nav("/dashboard/services");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { data: service, isLoading } = useQuery({
    queryKey: queryKeys.services(id),
    queryFn: () => getService(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل خدمة" : "قراءة تفاصيل الخدمة"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <ServiceForm
              initial={
                service
                  ? {
                      title_ar: service.title_ar,
                      title_en: service.title_en,
                      short_description_ar: service.short_description_ar,
                      short_description_en: service.short_description_en,
                      long_description_ar: service.long_description_ar,
                      long_description_en: service.long_description_en,
                      published: service.published,
                      countries: service.countries,
                      features: service.features,
                      faqs: service.faqs,
                      meta_title_ar: service.meta_title_ar,
                      meta_title_en: service.meta_title_en,
                      meta_description_ar: service.meta_description_ar,
                      meta_description_en: service.meta_description_en,
                      image: service.image,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateService}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : service ? (
            <ReadService service={service} />
          ) : null)}
      </div>
    </div>
  );
}
