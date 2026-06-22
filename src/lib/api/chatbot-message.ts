import type { AxiosInstance } from "axios";
import type { ChatbotMessageResType, ChatbotMessageType } from "../types/chatbot-message";

export async function getChatbotMessages(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ChatbotMessageResType> {
  const res = await axiosInstance.get("/messages", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getChatbotMessage(
  axiosInstance: AxiosInstance,
  id?: string
): Promise<ChatbotMessageType> {
  const res = await axiosInstance.get(`/messages/${id}`);
  return res.data.data.message;
}

export async function deleteChatbotMessage(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/messages/${id}`);
}

export async function updateChatbotMessageStatus(axiosInstance: AxiosInstance, id: number, status: string) {
  return await axiosInstance.patch(`/messages/${id}`, {
    status: status,
  });
}
