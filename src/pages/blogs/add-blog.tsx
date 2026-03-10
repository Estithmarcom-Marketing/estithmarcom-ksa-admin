import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addBlog } from "@/lib/api/blog";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddBlog() {
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function SubmitBlog(data: FormData) {
    addBlogMutation(data);
  }

  const { mutateAsync: addBlogMutation, isPending: isLoadingAddBlog } = useMutation({
    mutationFn: (data: FormData) => addBlog(Axios, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs() });
      toast.success("تم إضافة المدونة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة المدونة");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة مدونة" />
      </div>
      <div>
        <BlogForm isPending={isLoadingAddBlog} onSubmit={(data) => SubmitBlog(data)} />
      </div>
    </div>
  );
}