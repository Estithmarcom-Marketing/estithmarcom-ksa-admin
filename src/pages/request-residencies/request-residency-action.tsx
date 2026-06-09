import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { FormSkeleton } from "@/components/form-skeleton";
import ReadRequestResidency from "./read-request-residency";
import { getRequestResidency } from "@/lib/api/request-residency";

export default function RequestResidencyActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios()

  const { data: request, isLoading } = useQuery({
    queryKey: queryKeys.requestResidencies(id),
    queryFn: () => getRequestResidency(Axios, id),
  });

  useEffect(() => {
    if (action !== "read") {
      nav("/dashboard/request-residencies", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={"قراءة تفاصيل طلب الإقامة"}
        />
      </div>
      <div>
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : request ? (
            <ReadRequestResidency request={request} />
          ) : null)}
      </div>
    </div>
  );
}
