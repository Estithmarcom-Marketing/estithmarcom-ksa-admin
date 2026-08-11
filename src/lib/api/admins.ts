import type { AxiosInstance } from "axios";
import type { AdminResType } from "../types/admin";
import type {
  AdminCreatePayload,
  AdminUpdatePayload,
  AdminPasswordPayload,
} from "../schema/admin-schema";

export async function getAdmins(axiosInstance: AxiosInstance): Promise<AdminResType> {
  const res = await axiosInstance.get("/admins");
  return res.data.data;
}

export async function addAdmin(axiosInstance: AxiosInstance, values: AdminCreatePayload) {
  return await axiosInstance.post("/admins", values);
}

export async function deleteAdmin(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/admins/${id}`);
}

export async function updateAdmin(axiosInstance: AxiosInstance, id: number, values: AdminUpdatePayload) {
  return await axiosInstance.post(`/admins/${id}`, {
    ...values,
    "_method": "patch"
  });
}

export async function changeAdminPassword(axiosInstance: AxiosInstance, id: number, values: AdminPasswordPayload) {
  return await axiosInstance.post(`/admins/${id}`, {
    ...values,
    "_method": "patch"
  });
}
