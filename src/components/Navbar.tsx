import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resolvePageMeta } from "@/config/page-titles";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";
import { useInfiniteNotifications } from "@/lib/querykeys/notifications-query";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { markAllAsRead } from "@/lib/api/notifications";
import { queryKeys } from "@/lib/querykeys/queryKeys";
import InfiniteScrollNotifications from "./InfiniteScrollNotifications";

const Navbar = () => {
  const location = useLocation();
  const meta = resolvePageMeta(location.pathname);
  const { data: user } = useCurrentUser();
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteNotifications();
  const Axios = useAxios();
  const queryClient = useQueryClient();

  const notifications = data?.pages.flatMap((p) => p.notifications) ?? [];
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
        <DropdownMenu onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <button className="relative outline-none">
              <Bell size={20} />
              {unreadCount > 0 && (
                <div className="absolute -top-[10px] -end-[10px] h-4.5 w-4.5 p-0 flex items-center justify-center text-[9px] bg-main text-white border-0 rounded-full">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-80 mt-[13px] rounded-none! max-h-[420px] overflow-y-auto"
          >
            <DropdownMenuLabel className="font-semibold text-right top-0 bg-popover z-10">
              الأشعارات
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <InfiniteScrollNotifications
              notifications={notifications}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar */}
        <Link to={`/dashboard/profile`} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-main cursor-pointer hover:opacity-90 transition-opacity">
          {user?.name.slice(0, 2)}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;