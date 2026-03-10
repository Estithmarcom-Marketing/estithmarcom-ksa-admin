import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getBlogs } from "../api/blog";

export function useBlogs() {
  const Axios = useAxios();

  return useQuery({
    queryKey: queryKeys.blogs(),
    queryFn: () => getBlogs(Axios),
  });
}
