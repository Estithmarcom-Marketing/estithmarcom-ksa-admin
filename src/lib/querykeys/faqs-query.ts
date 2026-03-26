import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/hooks/use-axios";
import { getFAQs } from "../api/faq";
import { queryKeys } from "./queryKeys";

export function useFAQs() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.faqs(undefined, page),
    queryFn: () => getFAQs(Axios, page),
  });
}
