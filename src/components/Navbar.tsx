import { useLocation, Link } from "react-router-dom";
import { Bell, MessageSquare, Wrench, Mail, Newspaper } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resolvePageMeta } from "@/config/page-titles";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";
import { useNotifications } from "@/lib/querykeys/notifications-query";
import { useQueryClient } from "@tanstack/react-query";
import type { NotificationType } from "@/lib/types/notification";
import useAxios from "@/hooks/use-axios";
import { markAllAsRead } from "@/lib/api/notifications";
import { queryKeys } from "@/lib/querykeys/queryKeys";

type NotificationConfig = {
  icon: React.ReactNode;
  getLink: (id: number) => string;
  label: string;
};

const Navbar = () => {
  const notificationConfig: Record<
    NotificationType["type"],
    NotificationConfig
  > = {
    comment: {
      icon: <MessageSquare size={15} />,
      getLink: (id) => `/dashboard/comments/read/${id}`,
      label: "Comment",
    },
    request_service: {
      icon: <Wrench size={15} />,
      getLink: (id) => `/dashboard/requests/read/${id}`,
      label: "Service Request",
    },
    contact_us: {
      icon: <Mail size={15} />,
      getLink: (id) => `/dashboard/messages/read/${id}`,
      label: "Contact",
    },
    newsletter_subscribe: {
      icon: <Newspaper size={15} />,
      getLink: () => `/dashboard/subscribes`,
      label: "Newsletter",
    },
  };
  const location = useLocation();
  const meta = resolvePageMeta(location.pathname);
  const { data: user } = useCurrentUser();
  const { data: notificationsData } = useNotifications();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const notifications: NotificationType[] =
    notificationsData?.notifications ?? [];
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleOpenChange = async (open: boolean) => {
    if (!open && unreadCount > 0) {
      await markAllAsRead(Axios);
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 gap-4 bg-sidebar backdrop-blur-md border-b">
      {/* Start side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8" />

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold leading-none">{meta.title}</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{meta.description}</p>
        </div>
      </div>

      {/* End side */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <DropdownMenu onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <button className="relative outline-none">
              <Bell size={20} />
              {unreadCount > 0 && (
                <div className="absolute -top-[10px] -end-[10px] h-4.5 w-4.5 p-0 flex items-center justify-center text-[9px] bg-main text-white border-0 rounded-full">
                  {unreadCount}
                </div>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-80 mt-[13px] rounded-none!">
            <DropdownMenuLabel className="font-semibold text-right">
              الأشعارات
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {notifications.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                لا يوجد اشعارات
              </div>
            ) : (
              notifications.map((notification) => {
                const config = notificationConfig[notification.type];
                return (
                  <DropdownMenuItem className="rounded-none! text-right flex-row-reverse" key={notification.id} asChild>
                    <Link
                      to={config.getLink(notification.notifiable_id)}
                      className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer rounded-md ${
                        !notification.is_read
                          ? "bg-blue-50 dark:bg-blue-950/30"
                          : ""
                      }`}
                    >
                      {/* Icon */}
                      <div className="mt-0.5 flex-shrink-0 text-muted-foreground">
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold">
                          <span className="text-xs truncate">
                            {notification.title}
                          </span>
                          {!notification.is_read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {notification.body}
                        </p>
                        <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                          {new Date(notification.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-main cursor-pointer hover:opacity-90 transition-opacity">
          {user?.name.slice(0, 2)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
