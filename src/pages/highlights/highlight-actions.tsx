import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import { updateHighlight } from "@/lib/api/highlight";
import { useHighlight } from "@/lib/querykeys/highlights-query";
import HighlightForm from "@/components/highlight-form";
import ReadHighlight from "./read-highlight";

export default function HighlightActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: updateHighlightMutation, isPending: isLoadingUpdateHighlight } =
    useMutation({
      mutationFn: (data: FormData) => updateHighlight(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.highlights(),
        });
        toast.success("تم تحديث الإنجاز بنجاح");
        nav("/dashboard/highlights");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: highlight, isLoading } = useHighlight(id);

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/highlights", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={
            action === "edit"
              ? "تعديل إنجاز"
              : "تفاصيل الإنجاز"
          }
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <HighlightForm
              initial={
                highlight
                  ? {
                      label_ar: highlight.label_ar,
                      label_en: highlight.label_en,
                      value_ar: highlight.value_ar,
                      value_en: highlight.value_en,
                      image: highlight.image,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => updateHighlightMutation(data)}
              isPending={isLoadingUpdateHighlight}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : highlight ? (
            <ReadHighlight highlight={highlight} />
          ) : null)}
      </div>
    </div>
  );
}
