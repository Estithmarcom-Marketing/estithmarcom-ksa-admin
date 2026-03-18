import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { FormSkeleton } from "@/components/form-skeleton";
import ReadComment from "./read-comment";
import { getComment } from "@/lib/api/comments";

export default function CommentsActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios()

  const { data: comment, isLoading } = useQuery({
    queryKey: queryKeys.comments(id),
    queryFn: () => getComment(Axios, id),
  });

  useEffect(() => {
    if (action !== "read") {
      nav("/dashboard/comments", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={"قراءة تفاصيل التعليق"}
        />
      </div>
      <div>
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : comment ? (
            <ReadComment comment={comment} />
          ) : null)}
      </div>
    </div>
  );
}
