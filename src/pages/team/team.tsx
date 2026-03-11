import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteMember } from "@/lib/api/team";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMembers } from "@/lib/querykeys/team-query";
import type { ColumnConfig } from "@/lib/types/table";
import type { MemberType } from "@/lib/types/team";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const teamColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "name_ar", name: "الأسم (عربي)" },
  { key: "position_ar", name: "الوظيفة (عربي)" },
  { key: "active", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Team = () => {
  const { data: members, isLoading: isLoadingServices } = useMembers();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const membersData = members?.members ?? [];

  const { mutateAsync: removeMemberMutation } = useMutation({
    mutationFn: (id: number) => deleteMember(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.members() });
      toast.success("تم حذف العضو بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: MemberType): Promise<void> => {
    await removeMemberMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="الفريق" />
      </div>

      <DataTable<MemberType>
        columns={teamColumns}
        data={membersData}
        entityLabel="عضو"
        onDelete={handleDelete}
        isLoading={isLoadingServices}
        popup={false}
        allowedActions={["Add", "Read", "Edit", "Remove"]}
      />
    </div>
  );
};

export default Team;
