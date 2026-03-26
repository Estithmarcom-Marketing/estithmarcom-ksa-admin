import ClientForm from "@/components/client-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addClient } from "@/lib/api/client";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddClient() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitClient(data: FormData) {
    addClientMutation(data);
  }

  const { mutateAsync: addClientMutation, isPending: isLoadingAddClient } =
    useMutation({
      mutationFn: (data: FormData) => addClient(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.clients(),
        });
        toast.success("تم إضافة الشريك بنجاح");
        nav("/dashboard/clients");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة شريك" />
      </div>
      <div>
        <ClientForm
          isPending={isLoadingAddClient}
          onSubmit={(data) => SubmitClient(data)}
        />
      </div>
    </div>
  );
}
