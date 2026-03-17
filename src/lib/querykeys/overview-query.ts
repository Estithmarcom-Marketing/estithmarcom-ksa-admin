import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getOverView } from "../api/overview";

export function useOverView() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.overview,
    queryFn: () => getOverView(Axios),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
