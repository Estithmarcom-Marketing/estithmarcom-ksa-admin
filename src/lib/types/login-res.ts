import type { UserType } from "./user";

export interface LoginResType {
  data: {
    admin: UserType;
    token: string;
  };
}
