import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { FormSkeleton } from "@/components/form-skeleton";
import ReadRequest from "./read-request";
import { getRequest } from "@/lib/api/contact-message";

export default function RequestActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios()

  const { data: request, isLoading } = useQuery({
    queryKey: queryKeys.requests(id),
    queryFn: () => getRequest(Axios, id),
  });

  useEffect(() => {
    if (action !== "read") {
      nav("/dashboard/requests", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={"قراءة تفاصيل الطلب"}
        />
      </div>
      <div>
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : request ? (
            <ReadRequest request={request} />
          ) : null)}
      </div>
    </div>
  );
}
