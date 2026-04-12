import type { AxiosInstance } from "axios";
import type { ContactInfoValues, SocialLinksValues } from "../schema/website-info-schema";
import type { MithaqInfo } from "../types/settings";

export async function updateMithaqContact(axiosInstance: AxiosInstance, values: ContactInfoValues) {
  return await axiosInstance.patch("/settings", values);
}

export async function updateMithaqLinks(axiosInstance: AxiosInstance, values: SocialLinksValues) {
  return await axiosInstance.patch("/settings", values);
}

export async function getMithaqInfo(axiosInstance: AxiosInstance): Promise<MithaqInfo> {
  const res =  await axiosInstance.get("/settings");
  return res.data.data.info
}