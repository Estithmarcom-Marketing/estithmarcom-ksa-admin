import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FAQForm from "@/components/faq-form";
import ReadFAQ from "./read-faq";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFAQ, updateFAQ } from "@/lib/api/faq";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import { queryKeys } from "@/lib/querykeys/queryKeys";

export default function FAQActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: any) {
    updateFAQMutation(data);
  }

  const { mutateAsync: updateFAQMutation, isPending: isLoadingUpdateFAQ } = useMutation({
    mutationFn: (data: any) => updateFAQ(Axios, id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.faqs() });
      toast.success("تم تحديث السؤال بنجاح");
      nav("/dashboard/faqs");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const { data: faq, isLoading } = useQuery({
    queryKey: queryKeys.faqs(id),
    queryFn: () => getFAQ(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/faqs", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل سؤال" : "قراءة تفاصيل السؤال"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <FAQForm
              initial={
                faq
                  ? {
                      question_ar: faq.question_ar,
                      question_en: faq.question_en,
                      answer_ar: faq.answer_ar,
                      answer_en: faq.answer_en,
                      published: faq.published,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateFAQ}
            />
          )
        ) : null}
        {action === "read" && (
          isLoading ? (
            <FormSkeleton />
          ) : faq ? (
            <ReadFAQ faq={faq} />
          ) : null
        )}
      </div>
    </div>
  );
}
