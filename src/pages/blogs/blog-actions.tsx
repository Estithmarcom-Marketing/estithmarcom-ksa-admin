import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadBlog from "./read-blog";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getBlog, updateBlog } from "@/lib/api/blog";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";

export default function BlogActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateBlogMutation(data);
  }

  const { mutateAsync: updateBlogMutation, isPending: isLoadingUpdateBlog } =
    useMutation({
      mutationFn: (data: FormData) => updateBlog(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs() });
        toast.success("تم تحديث المدونة بنجاح");
        nav("/dashboard/blog")
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: blog, isLoading } = useQuery({
    queryKey: queryKeys.blogs(id),
    queryFn: () => getBlog(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل مدونة" : "قراءة تفاصيل مدونة"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <BlogForm
              initial={
                blog
                  ? {
                      title_ar: blog.title_ar,
                      title_en: blog.title_en,
                      subtitle_ar: blog.subtitle_ar,
                      subtitle_en: blog.subtitle_en,
                      image: blog.image,
                      content_ar: blog.content_ar,
                      short_content_ar: blog.short_content_ar,
                      short_content_en: blog.short_content_en,
                      content_en: blog.content_en,
                      published: blog.published,
                      meta_title_ar: blog.meta_title_ar,
                      meta_title_en: blog.meta_title_en,
                      meta_description_ar: blog.meta_description_ar,
                      meta_description_en: blog.meta_description_en,
                    }
                  : undefined
              }
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateBlog}
              edit
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : blog ? (
            <ReadBlog blog={blog} />
          ) : null)}
      </div>
    </div>
  );
}
