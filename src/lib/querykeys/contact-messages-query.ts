import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getContactMessages } from "../api/contact-message";

export function useMessages() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.messages(undefined, page),
    queryFn: () => getContactMessages(Axios, page),
  });
}