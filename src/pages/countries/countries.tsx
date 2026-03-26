import { DataTable } from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SpecialHeader from "@/components/SpecialHeader";
import useAxios from "@/hooks/use-axios";
import { deleteCountry } from "@/lib/api/country";
import { useCountries } from "@/lib/querykeys/countries-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import type { CountryType } from "@/lib/types/countries";
import type { ColumnConfig } from "@/lib/types/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const countryColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "image", name: "الصورة" },
  { key: "name_ar", name: "الاسم (عربي)" },
  { key: "name_en", name: "الاسم (انجليزي)" },
  { key: "title_ar", name: "العنوان (عربي)" },
  { key: "active", name: "الحالة" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Countries = () => {
  const { data: countries, isLoading: isLoadingCountries } = useCountries();
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  const countriesData = countries?.countries ?? [];

  const { mutateAsync: removeCountryMutation } = useMutation({
    mutationFn: (id: number) => deleteCountry(Axios, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.countries(undefined, page),
      });
      toast.success("تم حذف الدولة بنجاح");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const handleDelete = async (row: CountryType): Promise<void> => {
    await removeCountryMutation(row.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SpecialHeader title="الدول" />
      </div>

      <DataTable<CountryType>
        columns={countryColumns}
        data={countriesData}
        entityLabel="دولة"
        isLoading={isLoadingCountries}
        onDelete={handleDelete}
        popup={false}
      />
      {countries?.meta && <Pagination meta={countries.meta} />}
    </div>
  );
};

export default Countries;
