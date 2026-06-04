import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getCategories, getCategoriesUnpaginated, getCategory } from "../api/category";
import { queryKeys } from "./queryKeys";
import type { CategoryResType, CategoryType } from "../types/category";

export function useCategories(page?: number) {
  const Axios = useAxios();
  return useQuery<CategoryResType>({
    queryKey: queryKeys.categories(undefined, page),
    queryFn: () => getCategories(Axios, page),
  });
}

export function useCategoriesUnpaginated() {
  const Axios = useAxios();
  return useQuery<CategoryType[]>({
    queryKey: queryKeys.categoriesUnpaginated(),
    queryFn: () => getCategoriesUnpaginated(Axios),
  });
}

export function useCategory(id: string | undefined) {
  const Axios = useAxios();
  return useQuery<CategoryType>({
    queryKey: queryKeys.categories(id),
    queryFn: () => getCategory(Axios, id),
    enabled: !!id,
  });
}
