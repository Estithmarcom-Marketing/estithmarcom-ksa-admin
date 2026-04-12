import type { AxiosInstance } from "axios";
import type { ClientResType, ClientType } from "../types/clients";

export async function getClients(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ClientResType> {
  const res = await axiosInstance.get("/clients", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getClient(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<ClientType> {
  const res = await axiosInstance.get(`/clients/${id}`);
  return res.data.data.client;
}

export async function addClient(
  axiosInstance: AxiosInstance,
  values: FormData
) {
  return await axiosInstance.post("/clients", values);
}

export async function updateClient(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/clients/${id}`, values);
}

export async function deleteClient(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/clients/${id}`);
}
