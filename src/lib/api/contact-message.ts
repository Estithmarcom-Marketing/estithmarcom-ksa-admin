import type { AxiosInstance } from "axios";
import type { ContactResType } from "../types/contact-message";
import type { RequestResType, RequestType } from "../types/request";

export async function getMessages(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ContactResType> {
  const res = await axiosInstance.get("/request-services/contact-us", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getRequests(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<RequestResType> {
  const res = await axiosInstance.get("/request-services", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getRequest(
  axiosInstance: AxiosInstance,
  id?: string | undefined
): Promise<RequestType> {
  const res = await axiosInstance.get(`/request-services/${id}`);
  return res.data.data.request;
}

export async function deleteMessage(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/request-services/${id}`);
}

export async function contactMessage(axiosInstance: AxiosInstance, id: number, is_contacted: boolean) {
  return await axiosInstance.patch(`/request-services/${id}`, {
    is_contacted: !is_contacted
  });
}
