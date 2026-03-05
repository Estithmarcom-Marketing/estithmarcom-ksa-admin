import ServiceForm from "@/components/service-form";
import SpecialHeader from "@/components/SpecialHeader";

export default function AddService() {
  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة خدمة" />
      </div>
      <div>
        <ServiceForm />
      </div>
    </div>
  );
}
