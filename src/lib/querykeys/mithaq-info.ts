import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getSettings } from "../api/settings";

export function useInfo() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.info,
    queryFn: () => getSettings(Axios),
  });
}
