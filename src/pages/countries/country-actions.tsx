import SpecialHeader from "@/components/SpecialHeader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CountryForm from "@/components/country-form";
import ReadCountry from "./read-country";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { getCountry, updateCountry } from "@/lib/api/country";
import { toast } from "sonner";
import { FormSkeleton } from "@/components/form-skeleton";
import type { AxiosError } from "axios";

export default function CountryActions() {
  const nav = useNavigate();
  const { id, action } = useParams();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  function HandleEdit(data: any) {
    updateCountryMutation(data);
  }

  const { mutateAsync: updateCountryMutation, isPending: isLoadingUpdateCountry } =
    useMutation({
      mutationFn: (data: any) => updateCountry(Axios, id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.countries(),
        });
        toast.success("تم تحديث الدولة بنجاح");
        nav("/dashboard/countries");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  const { data: country, isLoading } = useQuery({
    queryKey: queryKeys.countries(id),
    queryFn: () => getCountry(Axios, id),
  });

  useEffect(() => {
    if (action !== "edit" && action !== "read") {
      nav("/dashboard/countries", { replace: true });
    }
  }, [action, nav]);

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader
          title={action === "edit" ? "تعديل دولة" : "قراءة تفاصيل الدولة"}
        />
      </div>
      <div>
        {action === "edit" ? (
          isLoading ? (
            <FormSkeleton />
          ) : (
            <CountryForm
              initial={
                country
                  ? {
                      name_ar: country.name_ar,
                      name_en: country.name_en,
                      title_ar: country.title_ar,
                      title_en: country.title_en,
                      description_ar: country.description_ar,
                      description_en: country.description_en,
                      active: country.active,
                      image: country.image,
                    }
                  : undefined
              }
              edit
              onSubmit={(data) => HandleEdit(data)}
              isPending={isLoadingUpdateCountry}
            />
          )
        ) : null}
        {action === "read" &&
          (isLoading ? (
            <FormSkeleton />
          ) : country ? (
            <ReadCountry country={country} />
          ) : null)}
      </div>
    </div>
  );
}
