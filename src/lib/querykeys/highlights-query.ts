import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getHighlights, getHighlight } from "../api/highlight";
import { queryKeys } from "./queryKeys";
import type { HighlightResType, HighlightType } from "../types/highlights";

export function useHighlights(page?: number) {
  const Axios = useAxios();
  return useQuery<HighlightResType>({
    queryKey: queryKeys.highlights(undefined, page),
    queryFn: () => getHighlights(Axios, page),
  });
}

export function useHighlight(id: string | undefined) {
  const Axios = useAxios();
  return useQuery<HighlightType>({
    queryKey: queryKeys.highlights(id),
    queryFn: () => getHighlight(Axios, id),
    enabled: !!id,
  });
}
