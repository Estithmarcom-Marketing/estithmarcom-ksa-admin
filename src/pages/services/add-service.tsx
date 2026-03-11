import ServiceForm from "@/components/service-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addService } from "@/lib/api/service";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddService() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate()

  function SubmitService(data: FormData) {
    addServiceMutation(data);
  }

  const { mutateAsync: addServiceMutation, isPending: isLoadingAddService } = useMutation({
    mutationFn: (data: FormData) => addService(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.services() });
      toast.success("تم إضافة الخدمة بنجاح");
      nav("/dashboard/services")
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة خدمة" />
      </div>
      <div>
        <ServiceForm isPending={isLoadingAddService} onSubmit={(data) => SubmitService(data)} />
      </div>
    </div>
  );
}
