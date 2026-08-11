import AdminForm from "@/components/admin-form";
import ChangePasswordForm from "@/components/change-password-form";
import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import { useAdmins } from "@/lib/querykeys/admins-query";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";
import { addAdmin, deleteAdmin, updateAdmin, changeAdminPassword } from "@/lib/api/admins";
import type { ColumnConfig } from "@/lib/types/table";
import type { UserType } from "@/lib/types/user";
import type { AdminCreatePayload, AdminUpdatePayload, AdminPasswordValues } from "@/lib/schema/admin-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { AxiosError } from "axios";

const adminsColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الاسم" },
  { key: "email", name: "البريد الإلكتروني" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Admins = () => {
  const { data: admins, isLoading: isLoadingAdmins } = useAdmins();
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const Axios = useAxios();

  const isMaster = currentUser?.id === 1;

  const { mutateAsync: addAdminMutation } = useMutation({
    mutationFn: (data: AdminCreatePayload) => addAdmin(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.admins });
      toast.success("تم إضافة المشرف بنجاح");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "حدث خطأ أثناء إضافة المشرف");
    },
  });

  const handleAdd = async (data: AdminCreatePayload) => {
    await addAdminMutation(data);
  };

  const { mutateAsync: removeAdminMutation } = useMutation({
    mutationFn: (id: number) => deleteAdmin(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admins,
      });
      toast.success("تم حذف المشرف بنجاح");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "حدث خطأ ما");
    },
  });

  const { mutateAsync: updateAdminMutation } = useMutation({
    mutationFn: ({ id, values }: { id: number; values: AdminUpdatePayload }) =>
      updateAdmin(Axios, id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admins,
      });
      toast.success("تم تعديل المشرف بنجاح");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "حدث خطأ ما");
    },
  });

  const handleEdit = async (row: UserType, data: AdminUpdatePayload) => {
    await updateAdminMutation({ id: row.id, values: data });
  };

  const { mutateAsync: changePasswordMutation } = useMutation({
    mutationFn: ({ id, values }: { id: number; values: AdminPasswordValues }) =>
      changeAdminPassword(Axios, id, values),
    onSuccess: () => {
      toast.success("تم تغيير كلمة السر بنجاح");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      toast.error(err.response?.data?.error || "حدث خطأ أثناء تغيير كلمة السر");
    },
  });

  const handleChangePassword = async (row: UserType, values: AdminPasswordValues) => {
    await changePasswordMutation({ id: row.id, values });
  };

  const handleDelete = async (row: UserType): Promise<void> => {
    await removeAdminMutation(row.id);
  };

  const adminData = admins?.admins ?? [];

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="المشرفين" />
      </div>

      <DataTable<UserType>
        columns={adminsColumns}
        data={adminData}
        entityLabel="مشرف"
        isLoading={isLoadingAdmins}
        onDelete={handleDelete}
        popup={true}
        allowedActions={
          isMaster
            ? ["Add", "Edit", "Read", "Remove", "Password"]
            : ["Read"]
        }
        formContent={(onClose) => (
          <AdminForm
            onSubmit={(data) => handleAdd(data as AdminCreatePayload)}
            onSuccess={onClose}
          />
        )}
        editContent={(row, onClose) => (
          <AdminForm
            edit
            defaultValues={{ name: row.name, email: row.email }}
            onSubmit={(data) => handleEdit(row, data as AdminUpdatePayload)}
            onSuccess={onClose}
          />
        )}
        passwordContent={(row, onClose) => (
          <ChangePasswordForm
            onSubmit={(values) => handleChangePassword(row, values)}
            onSuccess={onClose}
          />
        )}
      />
    </div>
  );
};

export default Admins;
