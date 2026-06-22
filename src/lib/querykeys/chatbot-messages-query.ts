import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getChatbotMessages } from "../api/chatbot-message";

export function useChatbotMessages() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.chatbotMessages(undefined, page),
    queryFn: () => getChatbotMessages(Axios, page),
  });
}
