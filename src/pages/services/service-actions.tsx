import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "@/components/service-form";
import ReadService from "./read-service";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getService } from "@/lib/api/service";

export default function ServiceActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();

  const { data: service, isLoading } = useQuery({
    queryKey: queryKeys.services(id),
    queryFn: () => getService(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/blog", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل خدمة" : "قراءة تفاصيل الخدمة"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            "loading"
          ) : (
            <ServiceForm
              initial={
              service
                ? {
                    title_ar: service.title_ar,
                    title_en: service.title_en,
                    short_description_ar: service.short_description_ar,
                    short_description_en: service.short_description_en,
                    long_description_ar: service.long_description_ar,
                    long_description_en: service.long_description_en,
                    published: service.published,
                    features: service.features,
                    faqs: service.faq,
                    meta_title_ar: service.meta_title_ar,
                    meta_title_en: service.meta_title_en,
                    meta_description_ar: service.meta_description_ar,
                    meta_description_en: service.meta_description_en,
                    image: service.image
                  }
                : undefined
            }
            onSubmit={(data) => console.log(data)}
          />
          )
        ) : null}
        {action === "read" && <ReadService />}
      </div>
    </div>
  );
}
