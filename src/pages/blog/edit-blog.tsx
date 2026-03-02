import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const nav = useNavigate();
  const { action } = useParams();

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <SpecialHeader title={action === "edit" ? "تعديل مدونة" : "قراءة تفاصيل مدونة"} />
      </div>
      <div>
        {action === "edit" && <BlogForm showActions />}
        {action === "read" && <BlogForm />}
      </div>
    </div>
  );
}