import type { AxiosInstance } from "axios";
import type { CategoryResType, CategoryType } from "../types/category";

export async function getCategories(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<CategoryResType> {
  const res = await axiosInstance.get("/categories", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getCategoriesUnpaginated(
  axiosInstance: AxiosInstance
): Promise<CategoryType[]> {
  const res = await axiosInstance.get("/categories/unpaginated");
  return res.data.data.categories;
}

export async function getCategory(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<CategoryType> {
  const res = await axiosInstance.get(`/categories/${id}`);
  return res.data.data.category;
}

export async function addCategory(
  axiosInstance: AxiosInstance,
  values: Record<string, any>
) {
  return await axiosInstance.post("/categories", values);
}

export async function updateCategory(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: Record<string, any>
) {
  return await axiosInstance.patch(`/categories/${id}`, values);
}

export async function deleteCategory(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/categories/${id}`);
}
