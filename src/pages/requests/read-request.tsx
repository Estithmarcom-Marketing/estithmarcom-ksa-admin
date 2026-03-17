import { Row, RowLink } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { RequestType } from "@/lib/types/request";

interface ReadRequestProps {
  request: RequestType;
}

export default function ReadRequest({ request }: ReadRequestProps) {
  const isContacted = request.is_contacted === true || (request.is_contacted as any) === "1";

  return (
    <div className="space-y-8">

      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الحالة" value={isContacted ? "تم التواصل" : "لم يتم التواصل"} />
          <Row label="الاسم"          value={request.name} />
          <Row label="البريد الإلكتروني" value={request.email} />
          <Row label="رقم الهاتف"     value={request.phone} />
          <RowLink href={`/dashboard/services/read/${request.service.id}`} label="الخدمة المطلوبة"     value={request.service.title_ar} />
          <Row label="تاريخ الإرسال"  value={formatDate(request.created_at)} />
          <Row label="الرسالة"        value={request.message} fullWidth />

        </div>
      </div>

    </div>
  );
}