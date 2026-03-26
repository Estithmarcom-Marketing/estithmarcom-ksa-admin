import type { AxiosInstance } from "axios";
import type { ClientResType, ClientType } from "../types/clients";

// Dummy Client data
const dummyClients: ClientType[] = [
  {
    id: 1,
    name_ar: "الشريك الأول",
    name_en: "First Client",
    link: "https://example1.com",
    image: "https://via.placeholder.com/200x100?text=Client+1",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name_ar: "الشريك الثاني",
    name_en: "Second Client",
    link: "https://example2.com",
    image: "https://via.placeholder.com/200x100?text=Client+2",
    created_at: "2024-01-20",
  },
  {
    id: 3,
    name_ar: "الشريك الثالث",
    name_en: "Third Client",
    link: "https://example3.com",
    image: "https://via.placeholder.com/200x100?text=Client+3",
    created_at: "2024-01-25",
  },
];

export async function getClients(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<ClientResType> {
  // Dummy API - returns hardcoded data
  return {
    clients: dummyClients,
    meta: {
      current_page: page || 1,
      from: 1,
      last_page: 1,
    },
  };
}

export async function getClient(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<ClientType> {
  // Dummy API - returns hardcoded data
  const client = dummyClients.find((c) => c.id === Number(id));
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
}

export async function addClient(
  axiosInstance: AxiosInstance,
  values: FormData
) {
  // Dummy API - just returns success
  const name_ar = values.get("name_ar") as string;
  const name_en = values.get("name_en") as string;
  const link = values.get("link") as string;

  const newClient: ClientType = {
    id: Math.max(...dummyClients.map((c) => c.id)) + 1,
    name_ar,
    name_en,
    link,
    image: "https://via.placeholder.com/200x100?text=New+Client",
    created_at: new Date().toISOString(),
  };
  dummyClients.push(newClient);
  return { success: true, data: newClient };
}

export async function updateClient(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: FormData
) {
  // Dummy API - just returns success
  const index = dummyClients.findIndex((c) => c.id === Number(id));
  if (index !== -1) {
    const name_ar = values.get("name_ar") as string;
    const name_en = values.get("name_en") as string;
    const link = values.get("link") as string;

    dummyClients[index] = {
      ...dummyClients[index],
      name_ar,
      name_en,
      link,
    };
  }
  return { success: true, data: dummyClients[index] };
}

export async function deleteClient(
  axiosInstance: AxiosInstance,
  id: number
) {
  // Dummy API - just returns success
  const index = dummyClients.findIndex((c) => c.id === id);
  if (index !== -1) {
    dummyClients.splice(index, 1);
  }
  return { success: true };
}
