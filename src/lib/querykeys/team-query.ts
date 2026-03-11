import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getMembers } from "../api/team";

export function useMembers() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.members(),
    queryFn: () => getMembers(Axios),
  });
}
