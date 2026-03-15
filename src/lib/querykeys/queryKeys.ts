export const queryKeys = {
  currentUser: ["current-user"] as const,
  admins: ["admins"] as const,
  info: ["info"] as const,
  services: (id?: string, page?: number) =>
    id ? ["services", id] : page ? ["services", { page }] : ["services"],
  comments: (id?: string, page?: number) =>
    id ? ["comments", id] : page ? ["comments", { page }] : ["comments"],
  blogs: (id?: string, page?: number) =>
    id ? ["blogs", id] : page ? ["blogs", { page }] : ["blogs"],
  members: (id?: string, page?: number) =>
    id ? ["members", id] : page ? ["members", { page }] : ["members"],
};