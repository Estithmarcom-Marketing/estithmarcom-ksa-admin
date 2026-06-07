import ResidencyForm from "@/components/residency-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addResidency } from "@/lib/api/residencies";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddResidency() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitResidency(data: FormData) {
    addResidencyMutation(data);
  }

  const { mutateAsync: addResidencyMutation, isPending: isLoadingAddResidency } =
    useMutation({
      mutationFn: (data: FormData) => addResidency(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.residencies(),
        });
        toast.success("تم إضافة الإقامة بنجاح");
        nav("/dashboard/residencies");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="إضافة إقامة" />
      </div>
      <div>
        <ResidencyForm
          isPending={isLoadingAddResidency}
          onSubmit={(data) => SubmitResidency(data)}
        />
      </div>
    </div>
  );
}
