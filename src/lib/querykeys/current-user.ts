import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import Cookies from "js-cookie";
import { getUser } from "../api/auth";

export function useCurrentUser() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => getUser(Axios),
    enabled: Boolean(Cookies.get("mithaq-admin")),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
