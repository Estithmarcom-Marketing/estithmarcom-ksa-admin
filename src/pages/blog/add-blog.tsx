import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";

export default function AddBlog() {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <SpecialHeader title="المدونة" />
      </div>
      <div>
        <BlogForm showActions />
      </div>
    </div>
  );
}
