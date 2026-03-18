import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { CommentType } from "@/lib/types/comment";

interface ReadCommentProps {
  comment: CommentType;
}

export default function ReadComment({ comment }: ReadCommentProps) {

  return (
    <div className="space-y-8">

      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الاسم"          value={comment.name} />
          <Row label="البريد الإلكتروني" value={comment.email} />
          <Row label="تاريخ التعليق"  value={formatDate(comment.created_at)} />
          <Row label="الرسالة"        value={comment.body} fullWidth />

        </div>
      </div>

    </div>
  );
}