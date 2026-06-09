import type { AxiosInstance } from "axios";

export async function getPendingRequestsCount(axiosInstance: AxiosInstance): Promise<number> {
  const res = await axiosInstance.get("/request-services/pending/count");
  return res.data.data.count
}

export async function getPendingRequestResidenciesCount(axiosInstance: AxiosInstance): Promise<number> {
  const res = await axiosInstance.get("/request-residencies/pending/count");
  return res.data.data.count
}

export async function getSubscriptionsCount(axiosInstance: AxiosInstance): Promise<number> {
  const res = await axiosInstance.get("/subscriptions/count");
  return res.data.data.count
}

export async function getUncontactedMessagesCount(axiosInstance: AxiosInstance): Promise<number> {
  const res = await axiosInstance.get("/contact-us/un-contacted/count")
  return res.data.data.count
}
