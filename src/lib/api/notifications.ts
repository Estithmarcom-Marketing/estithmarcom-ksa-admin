import type { AxiosInstance } from "axios";
import type { NotificationResType } from "../types/notification";

export async function getNotifications(
  axiosInstance: AxiosInstance,
): Promise<NotificationResType> {
  const res = await axiosInstance.get("/notifications");
  return res.data.data;
}

export async function markAllAsRead(
  axiosInstance: AxiosInstance,
) {
  return await axiosInstance.post("/notifications");
}

