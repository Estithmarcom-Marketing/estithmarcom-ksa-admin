import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import { getNotifications } from "../api/notifications";

export const useInfiniteNotifications = () => {
  const Axios = useAxios();

  return useInfiniteQuery({
    queryKey: queryKeys.notifications,
    queryFn: ({ pageParam = 1 }) =>
      getNotifications(Axios, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });
};
