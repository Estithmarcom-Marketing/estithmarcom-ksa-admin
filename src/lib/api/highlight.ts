import type { AxiosInstance } from "axios";
import type { HighlightResType, HighlightType } from "../types/highlights";

export async function getHighlights(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<HighlightResType> {
  const res = await axiosInstance.get("/highlights", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getHighlight(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<HighlightType> {
  const res = await axiosInstance.get(`/highlights/${id}`);
  return res.data.data.highlight;
}

export async function updateHighlight(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/highlights/${id}`, values);
}
