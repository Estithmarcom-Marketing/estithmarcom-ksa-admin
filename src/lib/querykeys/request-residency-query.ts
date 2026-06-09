import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getRequestResidencies } from "../api/request-residency";

export function useRequestResidencies() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.requestResidencies(undefined, page),
    queryFn: () => getRequestResidencies(Axios, page),
  });
}
