import { ContactInfoForm } from "@/components/contact-info-form";
import { SocialLinksForm } from "@/components/social-media-link-form";
import SpecialHeader from "@/components/SpecialHeader";
import type { ContactInfoValues, SocialLinksValues } from "@/lib/schema/website-info-schema";

const Settings = () => {
  const handleContactSubmit = (data: ContactInfoValues) => {
    console.log(data);
  };

  const handleSocialSubmit = (data: SocialLinksValues) => {
    console.log(data);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <SpecialHeader title="معلومات الموقع" />
        </div>

        <ContactInfoForm
          defaultValues={{}}
          onSubmit={handleContactSubmit}
        />
      </div>

      <div className="space-y-6 mt-10">
        <div>
          <SpecialHeader title="الروابط" />
        </div>

        <SocialLinksForm
          defaultValues={{}}
          onSubmit={handleSocialSubmit}
        />
      </div>
    </>
  );
};

export default Settings;