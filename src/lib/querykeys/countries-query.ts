import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getCountries } from "../api/country";
import { queryKeys } from "./queryKeys";
import type { CountryResType } from "../types/countries";

export function useCountries(page?: number) {
  const Axios = useAxios();
  return useQuery<CountryResType>({
    queryKey: queryKeys.countries(undefined, page),
    queryFn: () => getCountries(Axios, page),
  });
}
