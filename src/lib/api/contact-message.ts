import type { AxiosInstance } from "axios";
import type { ContactResType, ContactType } from "../types/contact-message";
import type { RequestResType, RequestType } from "../types/request";

export async function getContactMessages(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ContactResType> {
  const res = await axiosInstance.get("/contact-us", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getContactRequests(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<RequestResType> {
  const res = await axiosInstance.get("/request-services", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getMessage(
  axiosInstance: AxiosInstance,
  id?: string | undefined
): Promise<ContactType> {
  const res = await axiosInstance.get(`/contact-us/${id}`);
  return res.data.data.contact_us;
}

export async function getRequest(
  axiosInstance: AxiosInstance,
  id?: string | undefined
): Promise<RequestType> {
  const res = await axiosInstance.get(`/request-services/${id}`);
  return res.data.data.request;
}

export async function deleteMessage(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/contact-us/${id}`);
}

export async function deleteRequest(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/request-services/${id}`);
}

export async function contactMessage(axiosInstance: AxiosInstance, id: number, contacted: boolean) {
  return await axiosInstance.patch(`/contact-us/${id}`, {
    contacted: !contacted
  });
}

export async function requestMessage(axiosInstance: AxiosInstance, id: number, contacted: boolean) {
  return await axiosInstance.patch(`/request-services/${id}`, {
    contacted: !contacted
  });
}
