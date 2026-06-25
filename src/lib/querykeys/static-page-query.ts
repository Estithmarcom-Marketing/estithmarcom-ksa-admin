import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getStaticPages } from "../api/static-page";

export function useStaticPages() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.staticPages(undefined, page),
    queryFn: () => getStaticPages(Axios, page),
  });
}
