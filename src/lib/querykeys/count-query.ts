import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import useAxios from "@/hooks/use-axios";
import {
  getPendingRequestsCount,
  getPendingRequestResidenciesCount,
  getSubscriptionsCount,
  getUncontactedMessagesCount,
} from "../api/count";

export function useCounts() {
  const Axios = useAxios();

  const { data: pendingRequests, isLoading: loading1 } = useQuery({
    queryKey: queryKeys.pendingRequestsCount,
    queryFn: () => getPendingRequestsCount(Axios),
    refetchInterval: 30000,
  });

  const { data: pendingRequestResidencies, isLoading: loading2 } = useQuery({
    queryKey: queryKeys.pendingRequestResidenciesCount,
    queryFn: () => getPendingRequestResidenciesCount(Axios),
    refetchInterval: 30000,
  });

  const { data: subscriptions, isLoading: loading3 } = useQuery({
    queryKey: queryKeys.subscriptionsCount,
    queryFn: () => getSubscriptionsCount(Axios),
    refetchInterval: 30000,
  });

  const { data: uncontactedMessages, isLoading: loading4 } = useQuery({
    queryKey: queryKeys.uncontactedMessagesCount,
    queryFn: () => getUncontactedMessagesCount(Axios),
    refetchInterval: 30000,
  });

  return {
    pendingRequests: pendingRequests ?? 0,
    pendingRequestResidencies: pendingRequestResidencies ?? 0,
    subscriptions: subscriptions ?? 0,
    uncontactedMessages: uncontactedMessages ?? 0,
    isLoading: loading1 || loading2 || loading3 || loading4,
  };
}
