import type { AxiosInstance } from "axios";
import type { FAQResType, FAQType } from "../types/faq";

// Dummy FAQ data
const dummyFAQs: FAQType[] = [
  {
    id: 1,
    question_ar: "ما هي خدمات الشركة؟",
    question_en: "What are the company services?",
    answer_ar: "توفر الشركة مجموعة شاملة من خدمات الاستشارات والتدريب والتطوير",
    answer_en: "The company provides a comprehensive range of consulting, training, and development services",
    published: true,
    created_at: "2024-01-15",
  },
  {
    id: 2,
    question_ar: "كيف يمكنني التواصل مع الدعم؟",
    question_en: "How can I contact support?",
    answer_ar: "يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف المباشر",
    answer_en: "You can reach us via email or direct phone call",
    published: true,
    created_at: "2024-01-20",
  },
  {
    id: 3,
    question_ar: "هل توجد فترة تجريبية؟",
    question_en: "Is there a trial period?",
    answer_ar: "نعم، نوفر فترة تجريبية مجانية لمدة 14 يوم",
    answer_en: "Yes, we offer a free 14-day trial period",
    published: true,
    created_at: "2024-01-25",
  },
];

export async function getFAQs(
  axiosInstance: AxiosInstance,
  page?: number
): Promise<FAQResType> {
  // Dummy API - returns hardcoded data
  return {
    faqs: dummyFAQs,
    meta: {
      current_page: page || 1,
      from: 1,
      last_page: 1,
    },
  };
}

export async function getFAQ(
  axiosInstance: AxiosInstance,
  id: string | undefined
): Promise<FAQType> {
  // Dummy API - returns hardcoded data
  const faq = dummyFAQs.find((f) => f.id === Number(id));
  if (!faq) {
    throw new Error("FAQ not found");
  }
  return faq;
}

export async function addFAQ(
  axiosInstance: AxiosInstance,
  values: Omit<FAQType, "id" | "created_at">
) {
  // Dummy API - just returns success
  const newFAQ: FAQType = {
    ...values,
    id: Math.max(...dummyFAQs.map((f) => f.id)) + 1,
    created_at: new Date().toISOString(),
  };
  dummyFAQs.push(newFAQ);
  return { success: true, data: newFAQ };
}

export async function updateFAQ(
  axiosInstance: AxiosInstance,
  id: string | undefined,
  values: Omit<FAQType, "id" | "created_at">
) {
  // Dummy API - just returns success
  const index = dummyFAQs.findIndex((f) => f.id === Number(id));
  if (index !== -1) {
    dummyFAQs[index] = {
      ...dummyFAQs[index],
      ...values,
    };
  }
  return { success: true, data: dummyFAQs[index] };
}

export async function deleteFAQ(
  axiosInstance: AxiosInstance,
  id: number
) {
  // Dummy API - just returns success
  const index = dummyFAQs.findIndex((f) => f.id === id);
  if (index !== -1) {
    dummyFAQs.splice(index, 1);
  }
  return { success: true };
}
