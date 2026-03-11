import MemberForm from "@/components/member-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addMember } from "@/lib/api/team";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddMember() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate()

  function SubmitMember(data: FormData) {
    addMemberMutation(data);
  }

  const { mutateAsync: addMemberMutation, isPending: isLoadingAddBlog } = useMutation({
    mutationFn: (data: FormData) => addMember(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.members() });
      toast.success("تم إضافة العضو بنجاح");
      nav("/dashboard/team")
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة مدونة" />
      </div>
      <div>
        <MemberForm isPending={isLoadingAddBlog} onSubmit={(data) => SubmitMember(data)} />
      </div>
    </div>
  );
}