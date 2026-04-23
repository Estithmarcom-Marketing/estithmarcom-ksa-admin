import type { AxiosInstance } from "axios";
import type { CountryResType, CountryType } from "../types/countries";

export async function getCountries(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<CountryResType> {
  const res = await axiosInstance.get("/countries", {
    params: page ? { page } : undefined,
  });
  return res.data.data;
}

export async function getCountriesUnpaginated(
  axiosInstance: AxiosInstance
): Promise<CountryType[]> {
  const res = await axiosInstance.get("/countries/unpaginated");
  return res.data.data.countries;
}

export async function getCountry(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<CountryType> {
  const res = await axiosInstance.get(`/countries/${id}`);
  return res.data.data.country;
}

export async function addCountry(
  axiosInstance: AxiosInstance,
  values: any
) {
  return await axiosInstance.post("/countries", values);
}

export async function updateCountry(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/countries/${id}`, values);
}

export async function deleteCountry(
  axiosInstance: AxiosInstance,
  id: number
) {
  return await axiosInstance.delete(`/countries/${id}`);
}
