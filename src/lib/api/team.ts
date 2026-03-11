import type { AxiosInstance } from "axios";
import type { MemberResType, MemberType } from "../types/team";

export async function getMembers(axiosInstance: AxiosInstance): Promise<MemberResType> {
  const res = await axiosInstance.get("/members");
  return res.data.data;
}

export async function deleteMember(axiosInstance: AxiosInstance, id: number) {
  return await axiosInstance.delete(`/members/${id}`);
}

export async function getMember(axiosInstance: AxiosInstance, id: string | undefined): Promise<MemberType> {
  const res = await axiosInstance.get(`/members/${id}`);
  return res.data.data.member;
}

export async function addMember(axiosInstance: AxiosInstance, values: FormData) {
  return await axiosInstance.post("/members", values);
}

export async function updateMember(axiosInstance: AxiosInstance, id: string | undefined, values: FormData) {
  values.append("_method", "patch");
  return await axiosInstance.post(`/members/${id}`, values);
}