import { Row } from "@/components/read-row";
import SectionTitle from "@/components/Section-title";
import SpecialHeader from "@/components/SpecialHeader";
import { formatDate } from "@/helper/date-format";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";

const Profile = () => {
  const { data: profile, isLoading } = useCurrentUser();

  if (!profile || isLoading) {
    return <div>جاري التحميل</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <SpecialHeader title="الملف الشخصي" />
      </div>

      <div>
        <SectionTitle title="معلومات الحساب" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Row label="رقم المعرّف" value={profile.id} />
          <Row label="الاسم" value={profile.name} />
          <Row label="البريد الإلكتروني" value={profile.email} />
          <Row label="تاريخ الإنشاء" value={formatDate(profile.created_at)} />
        </div>
      </div>
    </div>
  );
};

export default Profile;