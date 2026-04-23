import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { getCountries, getCountriesUnpaginated } from "../api/country";
import { queryKeys } from "./queryKeys";
import type { CountryResType, CountryType } from "../types/countries";

export function useCountries(page?: number) {
  const Axios = useAxios();
  return useQuery<CountryResType>({
    queryKey: queryKeys.countries(undefined, page),
    queryFn: () => getCountries(Axios, page),
  });
}

export function useCountriesUnpaginated() {
  const Axios = useAxios();
  return useQuery<CountryType[]>({
    queryKey: queryKeys.countriesUnpaginated(),
    queryFn: () => getCountriesUnpaginated(Axios),
  });
}
