import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "@/components/service-form";
import ReadService from "./read-service";

export default function ServiceActions() {
  const nav = useNavigate();
  const { action } = useParams();

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title={action === "edit" ? "تعديل خدمة" : "قراءة تفاصيل الخدمة"} />
      </div>
      <div>
        {action === "edit" && <ServiceForm />}
        {action === "read" && <ReadService />}
      </div>
    </div>
  );
}