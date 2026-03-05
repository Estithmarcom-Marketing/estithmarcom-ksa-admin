import ServiceForm from "@/components/service-form";
import SpecialHeader from "@/components/SpecialHeader";
import type { ServiceFormValues } from "@/lib/schema/service-schema";

export default function AddService() {

  function SubmitService(data: ServiceFormValues){
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="اضافة خدمة" />
      </div>
      <div>
        <ServiceForm onSubmit={(data) => SubmitService(data)} />
      </div>
    </div>
  );
}
