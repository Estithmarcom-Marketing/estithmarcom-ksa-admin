import type { PaginationType } from "./pagination";
import type { UserType } from "./user";

export interface AdminResType {
  admins: UserType[]
  meta: PaginationType
}