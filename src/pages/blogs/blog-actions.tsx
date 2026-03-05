import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadBlog from "./read-blog";

export default function BlogActions() {
  const nav = useNavigate();
  const { action } = useParams();

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title={action === "edit" ? "تعديل مدونة" : "قراءة تفاصيل مدونة"} />
      </div>
      <div>
        {action === "edit" && <BlogForm />}
        {action === "read" && <ReadBlog />}
      </div>
    </div>
  );
}