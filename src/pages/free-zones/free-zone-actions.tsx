import FreeZoneForm from "@/components/free-zone-form";
import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadFreeZone from "./read-free-zone";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getFreeZone, updateFreeZone } from "@/lib/api/free-zone";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";

export default function FreeZoneActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateFreeZoneMutation(data);
  }

  const {
    mutateAsync: updateFreeZoneMutation,
    isPending: isLoadingUpdateFreeZone,
  } = useMutation({
    mutationFn: (data: FormData) => updateFreeZone(Axios, id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.freeZones() });
      toast.success("تم تحديث المنطقة الحرة بنجاح");
      nav("/dashboard/free-zones");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { data: zone, isLoading } = useQuery({
    queryKey: queryKeys.freeZones(id),
    queryFn: () => getFreeZone(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/free-zones", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={
            action === "edit" ? "تعديل منطقة حرة" : "قراءة تفاصيل منطقة حرة"
          }
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <FreeZoneForm
              initial={
                zone
                  ? {
                      title_ar: zone.title_ar,
                      title_en: zone.title_en,
                      slug_ar: zone.slug_ar,
                      slug_en: zone.slug_en,
                      image: zone.image,
                      content_ar: zone.content_ar,
                      content_en: zone.content_en,
                      active: zone.active,
                    }
                  : undefined
              }
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateFreeZone}
              edit
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : zone ? (
            <ReadFreeZone zone={zone} />
          ) : null)}
      </div>
    </div>
  );
}
