import type { AxiosInstance } from "axios";
import type { ResidencyResType, ResidencyType } from "../types/residencies";

export async function getResidencies(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ResidencyResType> {
  const res = await axiosInstance.get("/residencies", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getResidency(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<ResidencyType> {
  const res = await axiosInstance.get(`/residencies/${id}`);
  return res.data.data.residency;
}

export async function addResidency(
  axiosInstance: AxiosInstance,
  values: FormData
) {
  return await axiosInstance.post("/residencies", values);
}

export async function updateResidency(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/residencies/${id}`, values);
}

export async function deleteResidency(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/residencies/${id}`);
}
