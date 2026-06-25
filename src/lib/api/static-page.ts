import type { AxiosInstance } from "axios";
import type { StaticPageResType, StaticPageType } from "../types/static-pages";

export async function getStaticPages(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<StaticPageResType> {
  const res = await axiosInstance.get("/static-pages", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getStaticPage(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<StaticPageType> {
  const res = await axiosInstance.get(`/static-pages/${id}`);
  return res.data.data.page;
}

export async function addStaticPage(
  axiosInstance: AxiosInstance,
  values: FormData
) {
  return await axiosInstance.post("/static-pages", values);
}

export async function updateStaticPage(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/static-pages/${id}`, values);
}

export async function deleteStaticPage(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/static-pages/${id}`);
}
