import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getNotifications } from "../api/notifications";

export function useNotifications() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => getNotifications(Axios),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
