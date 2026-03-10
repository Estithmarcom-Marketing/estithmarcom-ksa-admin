import { RichRow, Row } from "@/components/read-row";
import type { BlogType } from "@/lib/types/blog";

interface ReadBlogProps {
  blog: BlogType;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base font-bold text-foreground border-b border-input pb-2 mb-4">
      {title}
    </h3>
  );
}

export default function ReadBlog({ blog }: ReadBlogProps) {
  const isPublished = blog.published === true || (blog.published as any) === "1";

  return (
    <div className="space-y-8">

      {/* Basic Info */}
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الحالة" value={isPublished ? "مفعّل" : "غير مفعّل"} />

          {blog.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة المقال</span>
              <img
                src={typeof blog.image === "string" ? blog.image : URL.createObjectURL(blog.image)}
                alt={blog.title_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="العنوان (عربي)"          value={blog.title_ar} />
          <Row label="العنوان (انجليزي)"        value={blog.title_en} />
          <Row label="العنوان الفرعي (عربي)"   value={blog.subtitle_ar} />
          <Row label="العنوان الفرعي (انجليزي)" value={blog.subtitle_en} />
          <Row label=" المحتوى القصير (عربي)" value={blog.short_content_ar} />
          <Row label=" المحتوى القصير (انجليزي)" value={blog.short_content_en} />
          <RichRow label="المحتوى (عربي)"      value={blog.content_ar} fullWidth />
          <RichRow label="المحتوى (انجليزي)"   value={blog.content_en} fullWidth />

        </div>
      </div>

      {/* SEO */}
      <div>
        <SectionTitle title="محركات البحث (SEO)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="عنوان الصفحة (عربي)"   value={blog.meta_title_ar} />
          <Row label="عنوان الصفحة (انجليزي)" value={blog.meta_title_en} />
          <Row label="وصف الصفحة (عربي)"     value={blog.meta_description_ar} fullWidth />
        </div>
      </div>

    </div>
  );
}