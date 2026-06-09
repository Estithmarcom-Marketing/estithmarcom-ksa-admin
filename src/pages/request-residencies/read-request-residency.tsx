import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { RequestResidencyType } from "@/lib/types/request-residency";

const statusLabels: Record<string, string> = {
  pending: "معلق",
  contacted: "تم التواصل",
  processing: "قيد المعالجة",
  canceled: "ملغى",
  forwarded: "محال",
};

interface ReadRequestResidencyProps {
  request: RequestResidencyType;
}

export default function ReadRequestResidency({ request }: ReadRequestResidencyProps) {
  const status = statusLabels[request.status] ?? request.status;
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الحالة" value={status} />
          <Row label="الاسم" value={request.name} />
          <Row label="البريد الإلكتروني" value={request.email} />
          <Row label="رقم الهاتف" value={request.phone} />
          <Row label="المدينة" value={request.city ?? "—"} />
          <Row label="الإقامة" value={request.residency.title_ar} />
          <Row label="تاريخ الإرسال" value={formatDate(request.created_at)} fullWidth />
        </div>
      </div>

      {request.notes && (
        <div>
          <SectionTitle title="ملاحظات" />
          <div className="grid grid-cols-1 gap-x-8">
            <Row label="ملاحظات" value={request.notes} fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}
