import type { AxiosInstance } from "axios";
import type { LoginFormValues } from "../schema/login-schema";
import type { LoginResType } from "../types/login-res";
import type { UserType } from "../types/user";

export async function LoginFn(
  axiosInstance: AxiosInstance,
  values: LoginFormValues,
): Promise<LoginResType> {
  const { data } = await axiosInstance.post<LoginResType>(
    "/auth/login",
    values,
  );
  return data;
}

export async function LogoutFn(axiosInstance: AxiosInstance) {
  return await axiosInstance.post<LoginResType>("/auth/logout");
}

export async function getUser(axiosInstance: AxiosInstance): Promise<UserType> {
  const res = await axiosInstance.get("/admins/me");
  return res.data.data.admin;
}
