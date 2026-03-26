import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteFAQ } from "@/lib/api/faq";
import { useFAQs } from "@/lib/querykeys/faqs-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { FAQType } from "@/lib/types/faq";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const faqColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "question_ar", name: "السؤال (عربي)" },
  { key: "question_en", name: "السؤال (انجليزي)" },
  { key: "published", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const FAQs = () => {
  const { data: faqs, isLoading: isLoadingFAQs } = useFAQs();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const faqsData = faqs?.faqs ?? [];

  const { mutateAsync: removeFAQMutation } = useMutation({
    mutationFn: (id: number) => deleteFAQ(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.faqs(undefined, page),
      });
      toast.success("تم حذف السؤال بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: FAQType): Promise<void> => {
    await removeFAQMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="الأسئلة الشائعة" />
      </div>

      <DataTable<FAQType>
        columns={faqColumns}
        data={faqsData}
        entityLabel="سؤال"
        isLoading={isLoadingFAQs}
        onDelete={handleDelete}
        popup={false}
      />
      {faqs?.meta && <Pagination meta={faqs.meta} />}
    </div>
  );
};

export default FAQs;
