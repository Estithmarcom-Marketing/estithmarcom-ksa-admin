import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { FormSkeleton } from "@/components/form-skeleton";
import ReadChatbotMessage from "./read-chatbot-message";
import { getChatbotMessage } from "@/lib/api/chatbot-message";

export default function ChatbotMessageActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios()

  const { data: message, isLoading } = useQuery({
    queryKey: queryKeys.chatbotMessages(id),
    queryFn: () => getChatbotMessage(Axios, id),
  });

  useEffect(() => {
    if (action !== "read") {
      nav("/dashboard/chatbot-messages", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={"قراءة تفاصيل الرسالة"}
        />
      </div>
      <div>
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : message ? (
            <ReadChatbotMessage message={message} />
          ) : null)}
      </div>
    </div>
  );
}
