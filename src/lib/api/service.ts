import type { AxiosInstance } from "axios";
import type { ServiceResType, ServiceType } from "../types/services";

export async function getServices(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ServiceResType> {
  const res = await axiosInstance.get("/services", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getService(axiosInstance: AxiosInstance, id: string | undefined): Promise<ServiceType> {
  const res = await axiosInstance.get(`/services/${id}`);
  return res.data.data.service;
}

export async function addService(axiosInstance: AxiosInstance, values: FormData) {
  return await axiosInstance.post("/services", values);
}

export async function updateService(axiosInstance: AxiosInstance, id: string | undefined, values: FormData) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/services/${id}`, values);
}

export async function deleteService(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/services/${id}`);
}