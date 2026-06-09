import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Wrench, Mail, Newspaper, Notebook } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { NotificationType } from "@/lib/types/notification";
import InfinitySpinner from "./infinity-spinner";
import { formatDate } from "@/helper/date-format";
import { markItemAsRead } from "@/lib/api/notifications";
import useAxios from "@/hooks/use-axios";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/querykeys/queryKeys";

type NotificationConfig = {
  icon: React.ReactNode;
  getLink: (id: number) => string;
  label: string;
};

const notificationConfig: Record<NotificationType["type"], NotificationConfig> =
  {
    request_service: {
      icon: <Wrench size={15} />,
      getLink: (id) => `/dashboard/requests/read/${id}`,
      label: "Service Request",
    },
    request_residency: {
      icon: <Notebook size={15} />,
      getLink: (id) => `/dashboard/request-residencies/read/${id}`,
      label: "Service Request",
    },
    contact_us: {
      icon: <Mail size={15} />,
      getLink: (id) => `/dashboard/messages/read/${id}`,
      label: "Contact",
    },
    subscription: {
      icon: <Newspaper size={15} />,
      getLink: () => `/dashboard/subscribes`,
      label: "Newsletter",
    },
  };

interface Props {
  notifications: NotificationType[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const InfiniteScrollNotifications = ({
  notifications,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const Axios = useAxios();
  const queryClient = useQueryClient();
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleObserver, {
      root:
        el
          .closest("[data-radix-popper-content-wrapper]")
          ?.querySelector("[role='menu']") ?? null,
      threshold: 0.1,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        لا يوجد اشعارات
      </div>
    );
  }

  const handleReadItem = async (id: number, is_read: boolean) => {
    if (!is_read) {
      await markItemAsRead(Axios, id);
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    }
  };

  return (
    <>
      {notifications.map((notification) => {
        const config = notificationConfig[notification.type];
        return (
          <DropdownMenuItem
            className="rounded-none! text-right flex-row-reverse"
            key={notification.id}
            asChild
          >
            <Link
              onClick={() =>
                handleReadItem(notification.id, notification.is_read)
              }
              to={config.getLink(notification.notifiable_id)}
              className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer rounded-md ${
                !notification.is_read ? "bg-blue-50 dark:bg-blue-950/30" : ""
              }`}
            >
              <div className="mt-0.5 flex-shrink-0 text-muted-foreground">
                {config.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 justify-end font-bold">
                  {!notification.is_read && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                  <span className="text-xs truncate">{notification.title}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {notification.body}
                </p>
                <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                  {formatDate(notification.created_at)}
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        );
      })}

      <div ref={sentinelRef} className="py-2 flex justify-center">
        {isFetchingNextPage && <InfinitySpinner size={30} />}
        {!hasNextPage && notifications.length > 0 && (
          <span className="text-[10px] text-muted-foreground/50">
            لا يوجد المزيد
          </span>
        )}
      </div>
    </>
  );
};

export default InfiniteScrollNotifications;
