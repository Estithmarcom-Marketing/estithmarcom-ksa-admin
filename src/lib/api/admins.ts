import type { AxiosInstance } from "axios";
import type { AdminResType } from "../types/admin";

export async function getAdmins(axiosInstance: AxiosInstance): Promise<AdminResType> {
  const res = await axiosInstance.get("/admins");
  return res.data.data;
}