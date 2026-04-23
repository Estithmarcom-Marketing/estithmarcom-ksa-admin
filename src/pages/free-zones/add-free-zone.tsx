import FreeZoneForm from "@/components/free-zone-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addFreeZone } from "@/lib/api/free-zone";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddFreeZone() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitFreeZone(data: FormData) {
    addFreeZoneMutation(data);
  }

  const { mutateAsync: addFreeZoneMutation, isPending: isLoadingAddFreeZone } =
    useMutation({
      mutationFn: (data: FormData) => addFreeZone(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.freeZones(),
        });
        toast.success("تم إضافة المنطقة الحرة بنجاح");
        nav("/dashboard/free-zones");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة منطقة حرة" />
      </div>
      <div>
        <FreeZoneForm
          isPending={isLoadingAddFreeZone}
          onSubmit={(data) => SubmitFreeZone(data)}
        />
      </div>
    </div>
  );
}
