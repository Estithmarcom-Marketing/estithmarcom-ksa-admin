import { ContactInfoForm } from "@/components/contact-info-form";
import { SocialLinksForm } from "@/components/social-media-link-form";
import SpecialHeader from "@/components/SpecialHeader";
import { useInfo } from "@/lib/querykeys/mithaq-info";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMithaqContact, updateMithaqLinks } from "@/lib/api/settings";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import useAxios from "@/hooks/use-axios";
import type {
  ContactInfoValues,
  SocialLinksValues,
} from "@/lib/schema/website-info-schema";
import type { AxiosResponse } from "axios";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";

const Settings = () => {
  const { data: info, isLoading } = useInfo();
  const queryClient = useQueryClient();
  const Axios = useAxios();

  const { mutate: updateContactMutation, isPending: isLoadingUpdateContact } =
    useMutation<AxiosResponse, Error, ContactInfoValues>({
      mutationFn: (data) => updateMithaqContact(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.info,
        });
        toast.success("تم حفظ معلومات الموقع بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ أثناء حفظ معلومات الموقع");
      },
    });

  const { mutate: updateLinksMutation, isPending: isLoadingUpdateLinks } =
    useMutation<AxiosResponse, Error, SocialLinksValues>({
      mutationFn: (data) => updateMithaqLinks(Axios, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.info,
        });
        toast.success("تم حفظ الروابط بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ أثناء حفظ الروابط");
      },
    });

  return (
    <>
      <div className="space-y-6">
        <div>
          <SpecialHeader title="معلومات الموقع" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} width={150} />
          </div>
        ) : (
          <ContactInfoForm
            defaultValues={{
              phone: info?.phone,
              email: info?.email,
              address: info?.address,
            }}
            isLoading={isLoadingUpdateContact}
            onSubmit={(data) => updateContactMutation(data)}
          />
        )}
      </div>

      <div className="space-y-6 mt-10">
        <div>
          <SpecialHeader title="الروابط" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} width={150} />
          </div>
        ) : (
          <SocialLinksForm
            defaultValues={{
              facebook: info?.facebook,
              x: info?.x,
              instagram: info?.instagram,
              snapchat: info?.snapchat,
              tiktok: info?.tiktok,
            }}
            isLoading={isLoadingUpdateLinks}
            onSubmit={(data) => updateLinksMutation(data)}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
