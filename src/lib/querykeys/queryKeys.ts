export const queryKeys = {
  currentUser: ["current-user"] as const,
  admins: ["admins"] as const,
  info: ["info"] as const,
  overview: ["overview"] as const,
  notifications: ["notifications"] as const,
  services: (id?: string, page?: number) =>
    id ? ["services", id] : page ? ["services", { page }] : ["services"],
  faqs: (id?: string, page?: number) =>
    id ? ["faqs", id] : page ? ["faqs", { page }] : ["faqs"],
  comments: (id?: string, page?: number) =>
    id ? ["comments", id] : page ? ["comments", { page }] : ["comments"],
  blogs: (id?: string, page?: number) =>
    id ? ["blogs", id] : page ? ["blogs", { page }] : ["blogs"],
  freeZones: (id?: string, page?: number) =>
    id ? ["freeZones", id] : page ? ["freeZones", { page }] : ["freeZones"],
  members: (id?: string, page?: number) =>
    id ? ["members", id] : page ? ["members", { page }] : ["members"],
  subs: (id?: string, page?: number) =>
    id ? ["subs", id] : page ? ["subs", { page }] : ["subs"],
  messages: (id?: string, page?: number) =>
    id ? ["messages", id] : page ? ["messages", { page }] : ["messages"],
  requests: (id?: string, page?: number) =>
    id ? ["requests", id] : page ? ["requests", { page }] : ["requests"],
  clients: (id?: string, page?: number) =>
    id ? ["clients", id] : page ? ["clients", { page }] : ["clients"],
  countries: (id?: string, page?: number) =>
    id ? ["countries", id] : page ? ["countries", { page }] : ["countries"],
  countriesUnpaginated: () => ["countries-unpaginated"] as const,
  categories: (id?: string, page?: number) =>
    id ? ["categories", id] : page ? ["categories", { page }] : ["categories"],
  categoriesUnpaginated: () => ["categories-unpaginated"] as const,
  highlights: (id?: string, page?: number) =>
    id ? ["highlights", id] : page ? ["highlights", { page }] : ["highlights"],
  residencies: (id?: string, page?: number) =>
    id ? ["residencies", id] : page ? ["residencies", { page }] : ["residencies"],
};
