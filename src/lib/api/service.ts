import type { AxiosInstance } from "axios";
import type { ServiceResType, ServiceType } from "../types/services";

export async function getServices(axiosInstance: AxiosInstance): Promise<ServiceResType> {
  const res = await axiosInstance.get("/services");
  return res.data.data;
}

export async function getService(axiosInstance: AxiosInstance, id: string | undefined): Promise<ServiceType> {
  const res = await axiosInstance.get(`/services/${id}`);
  return res.data.data.service;
}

export async function addService(axiosInstance: AxiosInstance, values: FormData) {
  return await axiosInstance.post("/services", values);
}