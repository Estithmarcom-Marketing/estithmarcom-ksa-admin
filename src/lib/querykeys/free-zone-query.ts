import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getFreeZones } from "../api/free-zone";

export function useFreeZones() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.freeZones(undefined, page),
    queryFn: () => getFreeZones(Axios, page),
  });
}
