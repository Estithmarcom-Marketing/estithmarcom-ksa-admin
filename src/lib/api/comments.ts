import type { AxiosInstance } from "axios";
import type { CommentResType } from "../types/comment";

export async function getComments(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<CommentResType> {
  const res = await axiosInstance.get("/comments", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function deleteComment(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/comments/${id}`);
}

export async function approveComment(axiosInstance: AxiosInstance, id: number, approve: boolean) {
  return await axiosInstance.patch(`/comments/${id}`, {
    approved: !approve
  });
}