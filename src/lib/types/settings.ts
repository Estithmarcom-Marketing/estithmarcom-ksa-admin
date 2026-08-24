export interface MithaqAddress {
  id?: number;
  address_ar: string;
  address_en: string;
}

export interface MithaqContact {
  id: number;
  name_ar: string;
  name_en: string;
  phone: string;
  email: string;
  addresses: MithaqAddress[];
}

export interface MithaqLinks {
  id: number;
  x: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  snapchat: string;
  tiktok: string;
  whatsapp: string;
}

export interface MithaqInfo extends MithaqContact, MithaqLinks {}