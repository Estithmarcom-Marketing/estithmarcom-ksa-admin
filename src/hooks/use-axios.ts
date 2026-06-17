import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import Cookies from "js-cookie";

export default function useAxios() {

  const instance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        if (!(config.data instanceof FormData)) {
          config.headers["Content-Type"] = "application/json";
          config.headers["Accept"] = "application/json";
        }

        config.headers["Accept-Language"] = "ar";

        const token = Cookies.get("mithaq-admin");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, []);

  return instance;
}