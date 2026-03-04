import type { AxiosInstance } from "axios";
import type { AdminResType } from "../types/admin";
import type { AdminFormData } from "../schema/admin-schema";

export async function getAdmins(axiosInstance: AxiosInstance): Promise<AdminResType> {
  const res = await axiosInstance.get("/admins");
  return res.data.data;
}

export async function addAdmin(axiosInstance: AxiosInstance, values: AdminFormData) {
  return await axiosInstance.post("/admins", values);
}