import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getServices } from "../api/service";

export function useServices() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.services(),
    queryFn: () => getServices(Axios),
  });
}
