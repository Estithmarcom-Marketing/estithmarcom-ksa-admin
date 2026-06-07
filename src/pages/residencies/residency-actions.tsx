import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadResidency from "./read-residency";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import { getResidency, updateResidency } from "@/lib/api/residencies";
import ResidencyForm from "@/components/residency-form";

export default function ResidencyActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateResidencyMutation(data);
  }

  const { mutateAsync: updateResidencyMutation, isPending: isLoadingUpdateResidency } =
    useMutation({
      mutationFn: (data: FormData) => updateResidency(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.residencies(),
        });
        toast.success("تم تحديث الإقامة بنجاح");
        nav("/dashboard/residencies");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: residency, isLoading } = useQuery({
    queryKey: queryKeys.residencies(id),
    queryFn: () => getResidency(Axios, id),
    enabled: !!id,
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/residencies", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={
            action === "edit"
              ? "تعديل إقامة"
              : "قراءة تفاصيل الإقامة"
          }
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <ResidencyForm
              initial={residency}
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateResidency}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : residency ? (
            <ReadResidency residency={residency} />
          ) : null)}
      </div>
    </div>
  );
}
