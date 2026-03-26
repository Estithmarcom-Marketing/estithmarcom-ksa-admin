import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getClients } from "../api/client";
import { queryKeys } from "./queryKeys";
import type { ClientResType } from "../types/clients";

export function useClients(page?: number) {
  const Axios = useAxios();
  return useQuery<ClientResType>({
    queryKey: queryKeys.clients(undefined, page),
    queryFn: () => getClients(Axios, page),
  });
}
