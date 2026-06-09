import type { AxiosInstance } from "axios";
import type { RequestResidencyResType, RequestResidencyType } from "../types/request-residency";

export async function getRequestResidencies(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<RequestResidencyResType> {
  const res = await axiosInstance.get("/request-residencies", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getRequestResidency(
  axiosInstance: AxiosInstance,
  id?: string | undefined
): Promise<RequestResidencyType> {
  const res = await axiosInstance.get(`/request-residencies/${id}`);
  return res.data.data.requestResidency;
}

export async function deleteRequestResidency(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/request-residencies/${id}`);
}

export async function updateRequestResidency(axiosInstance: AxiosInstance, id: number, status: string) {
  return await axiosInstance.patch(`/request-residencies/${id}`, {
    status: status
  });
}
