import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import type { MemberType } from "@/lib/types/team";

interface ReadMemberProps {
  member: MemberType;
}

export default function ReadMember({ member }: ReadMemberProps) {
  const isActive = member.active === true || (member.active as any) === "1";

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle title="معلومات العضو" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Row label="الحالة" value={isActive ? "مفعّل" : "غير مفعّل"} />

          {member.image && (
            <div className="flex flex-col gap-1 py-3 border-b border-input">
              <span className="text-sm font-semibold text-foreground">صورة العضو</span>
              <img
                src={typeof member.image === "string" ? member.image : URL.createObjectURL(member.image)}
                alt={member.name_ar}
                className="w-32 h-32 object-cover border border-input"
              />
            </div>
          )}

          <Row label="الاسم (عربي)"    value={member.name_ar} />
          <Row label="الاسم (انجليزي)" value={member.name_en} />
          <Row label="المنصب (عربي)"    value={member.position_ar} />
          <Row label="المنصب (انجليزي)" value={member.position_en} />

        </div>
      </div>
    </div>
  );
}