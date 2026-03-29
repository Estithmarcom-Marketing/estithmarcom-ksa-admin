import type { AxiosInstance } from "axios";
import type { SubResType } from "../types/subscribe";

export async function getSubs(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<SubResType> {
  const res = await axiosInstance.get("/subscriptions", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}