import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteBlog } from "@/lib/api/blog";
import { useBlogs } from "@/lib/querykeys/blog-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { BlogType } from "@/lib/types/blog";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const serviceColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "title_ar", name: "العنوان (عربي)" },
  { key: "category.name_ar", name: "القسم" },
  { key: "subtitle_ar", name: "العنوان الفرعي (عربي)" },
  { key: "published", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Blog = () => {
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const blogsData = blogs?.blogs ?? [];

  const { mutateAsync: removeBlogMutation } = useMutation({
    mutationFn: (id: number) => deleteBlog(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.blogs(undefined, page),
      });
      toast.success("تم حذف المدونة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: BlogType): Promise<void> => {
    await removeBlogMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="المدونة" />
      </div>

      <DataTable<BlogType>
        columns={serviceColumns}
        data={blogsData}
        entityLabel="مدونة"
        onDelete={handleDelete}
        isLoading={isLoadingBlogs}
        popup={false}
        allowedActions={["Add", "Read", "Edit", "Remove"]}
      />
      {blogs?.meta && <Pagination meta={blogs.meta} />}
    </div>
  );
};

export default Blog;