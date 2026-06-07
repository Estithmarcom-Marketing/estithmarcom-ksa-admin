import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getResidencies, getResidency } from "../api/residencies";
import { queryKeys } from "./queryKeys";
import type { ResidencyResType, ResidencyType } from "../types/residencies";

export function useResidencies(page?: number) {
  const Axios = useAxios();
  return useQuery<ResidencyResType>({
    queryKey: queryKeys.residencies(undefined, page),
    queryFn: () => getResidencies(Axios, page),
  });
}

export function useResidency(id: string | undefined) {
  const Axios = useAxios();
  return useQuery<ResidencyType>({
    queryKey: queryKeys.residencies(id),
    queryFn: () => getResidency(Axios, id),
    enabled: !!id,
  });
}
