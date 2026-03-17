import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { approveComment, deleteComment } from "@/lib/api/comments";
import { useComments } from "@/lib/querykeys/comments-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { CommentType } from "@/lib/types/comment";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const commentsColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الأسم" },
  { key: "body", name: "التعليق" },
  { key: "approved", name: "الحالة" },
  { key: "created_at", name: "تاريخ التعليق" },
];

const Comments = () => {
  const { data: comments, isLoading: isLoadingComments } = useComments();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const commentsData = comments?.comments ?? [];

  const { mutateAsync: removeCommentMutation } = useMutation({
    mutationFn: (id: number) => deleteComment(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.comments(undefined, page),
      });
      toast.success("تم حذف التعليق بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { mutateAsync: approveCommentMutation } = useMutation({
    mutationFn: ({ id, approve }: { id: number; approve: boolean }) =>
      approveComment(Axios, id, approve),
    onSuccess: async (_, { approve }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.comments(undefined, page),
      });
      toast.success(
        approve ? "تم نشر التعليق بنجاح" : "تم إلغاء نشر التعليق بنجاح",
      );
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: CommentType): Promise<void> => {
    await removeCommentMutation(row.id);
  };

  const handleApprove = async (row: CommentType): Promise<void> => {
    await approveCommentMutation({ id: row.id, approve: row.approved });
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="التعليقات" />
      </div>

      <DataTable<CommentType>
        columns={commentsColumns}
        data={commentsData}
        entityLabel="تعليق"
        isLoading={isLoadingComments}
        onDelete={handleDelete}
        popup={true}
        onApprove={handleApprove}
        allowedActions={["Read", "Approve", "Remove"]}
      />
      {comments?.meta && <Pagination meta={comments.meta} />}
    </div>
  );
};

export default Comments;
