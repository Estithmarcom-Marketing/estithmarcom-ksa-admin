import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadClient from "./read-client";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";
import { getClient, updateClient } from "@/lib/api/client";
import ClientForm from "@/components/client-form";

export default function ClientActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: FormData) {
    updateClientMutation(data);
  }

  const { mutateAsync: updateClientMutation, isPending: isLoadingUpdateClient } =
    useMutation({
      mutationFn: (data: FormData) => updateClient(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.clients(),
        });
        toast.success("تم تحديث الشريك بنجاح");
        nav("/dashboard/clients");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: client, isLoading } = useQuery({
    queryKey: queryKeys.clients(id),
    queryFn: () => getClient(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/clients", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={
            action === "edit"
              ? "تعديل شريك"
              : "قراءة تفاصيل الشريك"
          }
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <ClientForm
              initial={
                client
                  ? {
                      alt_ar: client.alt_ar,
                      alt_en: client.alt_en,
                      link: client.link,
                      image: client.image,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateClient}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : client ? (
            <ReadClient client={client} />
          ) : null)}
      </div>
    </div>
  );
}
