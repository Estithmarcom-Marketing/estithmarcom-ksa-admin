import CountryForm from "@/components/country-form";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { addCountry } from "@/lib/api/country";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddCountry() {
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  function SubmitCountry(data: any) {
    addCountryMutation(data);
  }

  const { mutateAsync: addCountryMutation, isPending: isLoadingAddCountry } =
    useMutation({
      mutationFn: (data: any) => addCountry(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.countries(),
        });
        toast.success("تم إضافة الدولة بنجاح");
        nav("/dashboard/countries");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || "حدث خطأ ما");
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="إضافة دولة" />
      </div>
      <div>
        <CountryForm
          isPending={isLoadingAddCountry}
          onSubmit={(data) => SubmitCountry(data)}
        />
      </div>
    </div>
  );
}
