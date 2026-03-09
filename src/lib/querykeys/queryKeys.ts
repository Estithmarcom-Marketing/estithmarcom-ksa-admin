export const queryKeys = {
  currentUser: ["current-user"] as const,
  admins: ["admins"] as const,
  info: ["info"] as const,
  services:    (id?: string)    => id ? ["services", id] : ["services"],
};
