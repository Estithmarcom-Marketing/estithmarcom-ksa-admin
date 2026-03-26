import FAQForm from "@/components/faq-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addFAQ } from "@/lib/api/faq";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddFAQ() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitFAQ(data: any) {
    addFAQMutation(data);
  }

  const { mutateAsync: addFAQMutation, isPending: isLoadingAddFAQ } = useMutation({
    mutationFn: (data: any) => addFAQ(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.faqs() });
      toast.success("تم إضافة السؤال بنجاح");
      nav("/dashboard/faqs");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="إضافة سؤال شائع" />
      </div>
      <div>
        <FAQForm isPending={isLoadingAddFAQ} onSubmit={(data) => SubmitFAQ(data)} />
      </div>
    </div>
  );
}
