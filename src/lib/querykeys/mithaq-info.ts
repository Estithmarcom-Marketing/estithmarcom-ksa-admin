import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getMithaqInfo } from "../api/settings";

export function useInfo() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.info,
    queryFn: () => getMithaqInfo(Axios),
  });
}
