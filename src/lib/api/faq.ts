import type { AxiosInstance } from "axios";
import type { FAQResType, FAQType } from "../types/faq";

export async function getFAQs(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<FAQResType> {
  const res = await axiosInstance.get("/faqs", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getFAQ(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<FAQType> {
  const res = await axiosInstance.get(`/faqs/${id}`);
  return res.data.data.faq;
}

export async function addFAQ(
  axiosInstance: AxiosInstance,
  values: Omit<FAQType, "id" | "created_at">
) {
  return await axiosInstance.post("/faqs", values);
}

export async function updateFAQ(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: Omit<FAQType, "id" | "created_at">
) {
  return await axiosInstance.patch(`/faqs/${id}`, values);
}

export async function deleteFAQ(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/faqs/${id}`);
}
