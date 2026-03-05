import BlogForm from "@/components/blog-form";
import SpecialHeader from "@/components/SpecialHeader";

export default function AddBlog() {
  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة مدونة" />
      </div>
      <div>
        <BlogForm />
      </div>
    </div>
  );
}
