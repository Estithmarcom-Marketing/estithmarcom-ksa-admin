import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { RequestType } from "@/lib/types/request";

interface ReadRequestProps {
  message: RequestType;
}

export default function ReadMessage({ message }: ReadRequestProps) {
  const isContacted = message.is_contacted === true || (message.is_contacted as any) === "1";

  return (
    <div className="space-y-8">

      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الحالة" value={isContacted ? "تم التواصل" : "لم يتم التواصل"} />
          <Row label="الاسم"          value={message.name} />
          <Row label="البريد الإلكتروني" value={message.email} />
          <Row label="رقم الهاتف"     value={message.phone} />
          <Row label="تاريخ الإرسال"  value={formatDate(message.created_at)} />
          <Row label="الرسالة"        value={message.message} fullWidth />

        </div>
      </div>

    </div>
  );
}