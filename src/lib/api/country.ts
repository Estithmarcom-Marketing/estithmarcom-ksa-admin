import type { AxiosInstance } from "axios";
import type { CountryResType, CountryType } from "../types/countries";

// Dummy Country data
const dummyCountries: CountryType[] = [
  {
    id: 1,
    name_ar: "السعودية",
    name_en: "Saudi Arabia",
    title_ar: "المملكة العربية السعودية",
    title_en: "Kingdom of Saudi Arabia",
    description_ar: "وصف عن السعودية",
    description_en: "Description about Saudi Arabia",
    active: true,
    image: "https://via.placeholder.com/400x300?text=Saudi+Arabia",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name_ar: "الإمارات",
    name_en: "UAE",
    title_ar: "الإمارات العربية المتحدة",
    title_en: "United Arab Emirates",
    description_ar: "وصف عن الإمارات",
    description_en: "Description about UAE",
    active: true,
    image: "https://via.placeholder.com/400x300?text=UAE",
    created_at: "2024-01-20",
  },
  {
    id: 3,
    name_ar: "مصر",
    name_en: "Egypt",
    title_ar: "جمهورية مصر العربية",
    title_en: "Arab Republic of Egypt",
    description_ar: "وصف عن مصر",
    description_en: "Description about Egypt",
    active: true,
    image: "https://via.placeholder.com/400x300?text=Egypt",
    created_at: "2024-01-25",
  },
];

export async function getCountries(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<CountryResType> {
  // Dummy API - returns hardcoded data
  return {
    countries: dummyCountries,
    meta: {
      current_page: page || 1,
      from: 1,
      last_page: 1,
    },
  };
}

export async function getCountry(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<CountryType> {
  // Dummy API - returns hardcoded data
  const country = dummyCountries.find((c) => c.id === Number(id));
  if (!country) {
    throw new Error("Country not found");
  }
  return country;
}

export async function addCountry(
  axiosInstance: AxiosInstance,
  values: any
) {
  // Dummy API - just returns success
  const newCountry: CountryType = {
    id: Math.max(...dummyCountries.map((c) => c.id)) + 1,
    name_ar: values.name_ar,
    name_en: values.name_en,
    title_ar: values.title_ar,
    title_en: values.title_en,
    description_ar: values.description_ar,
    description_en: values.description_en,
    active: values.active,
    image: "https://via.placeholder.com/400x300?text=New+Country",
    created_at: new Date().toISOString(),
  };
  dummyCountries.push(newCountry);
  return { success: true, data: newCountry };
}

export async function updateCountry(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: any
) {
  // Dummy API - just returns success
  const index = dummyCountries.findIndex((c) => c.id === Number(id));
  if (index !== -1) {
    dummyCountries[index] = {
      ...dummyCountries[index],
      name_ar: values.name_ar,
      name_en: values.name_en,
      title_ar: values.title_ar,
      title_en: values.title_en,
      description_ar: values.description_ar,
      description_en: values.description_en,
      active: values.active,
    };
  }
  return { success: true, data: dummyCountries[index] };
}

export async function deleteCountry(
  axiosInstance: AxiosInstance,
  id: number
) {
  // Dummy API - just returns success
  const index = dummyCountries.findIndex((c) => c.id === id);
  if (index !== -1) {
    dummyCountries.splice(index, 1);
  }
  return { success: true };
}
