import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteChatbotMessage, updateChatbotMessageStatus } from "@/lib/api/chatbot-message";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useChatbotMessages } from "@/lib/querykeys/chatbot-messages-query";
import type { ChatbotMessageType } from "@/lib/types/chatbot-message";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const columns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الأسم" },
  { key: "phone", name: "رقم الهاتف" },
  { key: "status", name: "الحالة" },
  { key: "service_display", name: "الخدمة" },
  { key: "created_at", name: "تاريخ الرسالة" },
];

const ChatbotMessages = () => {
  const { data, isLoading } = useChatbotMessages();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const rows = (data?.messages ?? []).map((msg) => ({
    ...msg,
    service_display: msg.service ? msg.service.join(" → ") : "",
  }));

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: (id: number) => deleteChatbotMessage(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.chatbotMessages(undefined, page),
      });
      toast.success("تم حذف الرسالة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { mutateAsync: statusMutation } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateChatbotMessageStatus(Axios, id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.chatbotMessages(undefined, page),
      });
      toast.success("تم تحديث الحالة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: ChatbotMessageType): Promise<void> => {
    await removeMutation(row.id);
  };

  const handleStatus = async (
    row: ChatbotMessageType,
    status: string,
  ): Promise<void> => {
    await statusMutation({ id: row.id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="رسائل الشات بوت" />
      </div>

      <DataTable<ChatbotMessageType>
        columns={columns}
        data={rows}
        entityLabel="الرسالة"
        isLoading={isLoading}
        onDelete={handleDelete}
        popup={false}
        onStatus={handleStatus}
        allowedActions={["Read", "Remove", "Status"]}
      />
      {data?.meta && <Pagination meta={data.meta} />}
    </div>
  );
};

export default ChatbotMessages;
