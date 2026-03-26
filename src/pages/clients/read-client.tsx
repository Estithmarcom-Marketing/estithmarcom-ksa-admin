import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { ClientType } from "@/lib/types/clients";

interface ReadClientProps {
  client: ClientType;
}

export default function ReadClient({ client }: ReadClientProps) {
  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <SectionTitle title="معلومات الشريك" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {client.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة الشريك</span>
              <img
                src={
                  typeof client.image === "string"
                    ? client.image
                    : URL.createObjectURL(client.image)
                }
                alt={client.name_ar}
                className="w-48 h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          <Row label="الاسم (عربي)" value={client.name_ar} />
          <Row label="الاسم (انجليزي)" value={client.name_en} />
          <Row label="الرابط" value={client.link} />
          <Row label="تاريخ الإنشاء" value={client.created_at} />
        </div>
      </div>
    </div>
  );
}
