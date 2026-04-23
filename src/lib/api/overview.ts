import type { AxiosInstance } from "axios";
import type { OverViewType } from "../types/overview";

export async function getOverView(
  axiosInstance: AxiosInstance,
): Promise<OverViewType> {
  const res = await axiosInstance.get("/dashboard-stats");
  return res.data.data.stats;
}
