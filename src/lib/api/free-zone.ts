import type { AxiosInstance } from "axios";
import type { FreeZoneResType, FreeZoneType } from "../types/free-zone";

export async function getFreeZones(
  axiosInstance: AxiosInstance,
  page?: number,
): Promise<FreeZoneResType> {
  const res = await axiosInstance.get("/free-zones", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function deleteFreeZone(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/free-zones/${id}`);
}

export async function getFreeZone(
  axiosInstance: AxiosInstance,
  id: string | undefined,
): Promise<FreeZoneType> {
  const res = await axiosInstance.get(`/free-zones/${id}`);
  return res.data.data.zone;
}

export async function addFreeZone(
  axiosInstance: AxiosInstance,
  values: FormData,
) {
  return await axiosInstance.post("/free-zones", values);
}

export async function updateFreeZone(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData,
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/free-zones/${id}`, values);
}
