import { Row, RichRow } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import { formatDate } from "@/helper/date-format";
import type { ChatbotMessageType } from "@/lib/types/chatbot-message";

const statusLabels: Record<string, string> = {
  pending: "معلق",
  contacted: "تم التواصل",
  processing: "قيد المعالجة",
  canceled: "ملغى",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  canceled: "bg-red-100 text-red-800",
};

interface ReadChatbotMessageProps {
  message: ChatbotMessageType;
}

export default function ReadChatbotMessage({ message }: ReadChatbotMessageProps) {
  const status = statusLabels[message.status] ?? message.status;
  const statusColor = statusColors[message.status] ?? "";

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="المعلومات الأساسية" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="الحالة" value={status} />
          <Row label="الاسم" value={message.name} />
          <Row label="رقم الهاتف" value={message.phone} />
          <Row
            label="الخدمة"
            value={message.service?.join(" → ") || "—"}
            fullWidth
          />
          <Row label="تاريخ الإرسال" value={formatDate(message.created_at)} />
        </div>
      </div>

      {message.details && (
        <div>
          <SectionTitle title="تفاصيل الرسالة" />
          <RichRow label="التفاصيل" value={message.details} />
        </div>
      )}
    </div>
  );
}
