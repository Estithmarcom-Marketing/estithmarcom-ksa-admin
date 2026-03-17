import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { contactMessage, deleteMessage } from "@/lib/api/contact-message";
import { useMessages } from "@/lib/querykeys/contact-messages-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { ContactType } from "@/lib/types/contact-message";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const messagesColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الأسم" },
  { key: "message", name: "الرسالة" },
  { key: "is_contacted", name: "الحالة" },
  { key: "created_at", name: "تاريخ الرسالة" },
];

const Messages = () => {
  const { data: messages, isLoading: isLoadingMessages } = useMessages();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const messagesData = messages?.contact_us ?? [];

  const { mutateAsync: removeMessageMutation } = useMutation({
    mutationFn: (id: number) => deleteMessage(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.messages(undefined, page),
      });
      toast.success("تم حذف الرسالة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { mutateAsync: contactMessageMutation } = useMutation({
    mutationFn: ({ id, is_contacted }: { id: number; is_contacted: boolean }) =>
      contactMessage(Axios, id, is_contacted),
    onSuccess: async (_, { is_contacted }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.messages(undefined, page),
      });
      toast.success(
        !is_contacted ? "تم تفعيل التواصل بنجاح" : "تم إلغاء التواصل بنجاح",
      );
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: ContactType): Promise<void> => {
    await removeMessageMutation(row.id);
  };

  const handleContact = async (row: ContactType): Promise<void> => {
    await contactMessageMutation({ id: row.id, is_contacted: row.is_contacted });
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="رسائل التواصل" />
      </div>

      <DataTable<ContactType>
        columns={messagesColumns}
        data={messagesData}
        entityLabel="رسالة"
        isLoading={isLoadingMessages}
        onDelete={handleDelete}
        popup={false}
        onContact={handleContact}
        allowedActions={["Read", "Contact", "Remove"]}
      />
      {messages?.meta && <Pagination meta={messages.meta} />}
    </div>
  );
};

export default Messages;