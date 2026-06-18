export interface MithaqContact {
  id: number;
  name_ar: string;
  name_en: string;
  phone: string;
  email: string;
  address: string;
}

export interface MithaqLinks {
  id: number;
  x: string;
  facebook: string;
  instagram: string;
  snapchat: string;
  tiktok: string;
  whatsapp: string;
}

export interface MithaqInfo extends MithaqContact, MithaqLinks {}