import type { AxiosInstance } from "axios";
import type { BlogResType, BlogType } from "../types/blog";

export async function getBlogs(axiosInstance: AxiosInstance): Promise<BlogResType> {
  const res = await axiosInstance.get("/blogs");
  return res.data.data;
}

export async function deleteBlog(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/blogs/${id}`);
}

export async function getBlog(axiosInstance: AxiosInstance, id: string | undefined): Promise<BlogType> {
  const res = await axiosInstance.get(`/blogs/${id}`);
  return res.data.data.blog;
}

export async function addBlog(axiosInstance: AxiosInstance, values: FormData) {
  return await axiosInstance.post("/blogs", values);
}

export async function updateBlog(axiosInstance: AxiosInstance, id: string | undefined, values: FormData) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/blogs/${id}`, values);
}