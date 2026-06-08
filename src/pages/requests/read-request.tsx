import { Row, RowLink } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { RequestType } from "@/lib/types/request";

const ADDITIONAL_INFO_LABELS: Record<string, string> = {
  company_name: "اسم الشركة",
  service_type: "نوع الخدمة",
  office_size: "مساحة المكتب",
  investor_type: "نوع المستثمر",
  investment_field: "مجال الاستثمار",
  connection_way: "طريقة التواصل",
  notes: "ملاحظات",
};

const statusLabels: Record<string, string> = {
  pending: "معلق",
  contacted: "تم التواصل",
  processing: "قيد المعالجة",
  canceled: "ملغى",
  forwarded: "محال",
};

interface ReadRequestProps {
  request: RequestType;
}

export default function ReadRequest({ request }: ReadRequestProps) {
  const status = statusLabels[request.status] ?? request.status;
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row
            label="الحالة"
            value={status}
          />
          <Row label="الاسم" value={request.name} />
          <Row label="البريد الإلكتروني" value={request.email} />
          <Row label="رقم الهاتف" value={request.phone} />
          <RowLink
            href={`/dashboard/services/read/${request.service.id}`}
            label="الخدمة المطلوبة"
            value={request.service.title_ar}
          />
          <Row label="تاريخ الإرسال" value={formatDate(request.created_at)} />
        </div>
      </div>

      {request.additional_info &&
        Object.keys(request.additional_info).length > 0 && (
          <div>
            <SectionTitle title="معلومات إضافية" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {Object.entries(request.additional_info).map(([key, value]) => {
                if (!value) return null;
                const label = ADDITIONAL_INFO_LABELS[key] || key;
                const isFullWidth = key === "notes";
                return (
                  <Row
                    key={key}
                    label={label}
                    value={value}
                    fullWidth={isFullWidth}
                  />
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}
