import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import ReadMember from "./read-member";
import MemberForm from "@/components/member-form";
import { getMember, updateMember } from "@/lib/api/team";

export default function MemberActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateMemberMutation(data);
  }

  const { mutateAsync: updateMemberMutation, isPending: isLoadingUpdateMember } =
    useMutation({
      mutationFn: (data: FormData) => updateMember(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeys.members() });
        toast.success("تم تحديث العضو بنجاح");
        nav("/dashboard/team")
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: member, isLoading } = useQuery({
    queryKey: queryKeys.members(id),
    queryFn: () => getMember(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/team", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل عضو" : "قراءة تفاصيل عضو"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <MemberForm
              initial={
                member
                  ? {
                      name_ar:     member.name_ar,
                      name_en:     member.name_en,
                      position_ar: member.position_ar,
                      position_en: member.position_en,
                      image:       member.image,
                      active:      member.active,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateMember}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : member ? (
            <ReadMember member={member} />
          ) : null)}
      </div>
    </div>
  );
}