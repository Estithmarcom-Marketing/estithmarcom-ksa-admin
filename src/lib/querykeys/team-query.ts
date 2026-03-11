import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getMembers } from "../api/team";

export function useMembers() {
  const Axios = useAxios();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  return useQuery({
    queryKey: queryKeys.members(undefined, page),
    queryFn: () => getMembers(Axios, page),
  });
}