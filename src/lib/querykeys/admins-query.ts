import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getAdmins } from "../api/admins";

export function useAdmins() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.admins,
    queryFn: () => getAdmins(Axios),
  });
}
