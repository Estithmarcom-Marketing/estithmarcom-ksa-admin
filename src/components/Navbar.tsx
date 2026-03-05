import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { resolvePageMeta } from "@/config/page-titles";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";

const Navbar = () => {
  const location = useLocation();
  const meta = resolvePageMeta(location.pathname);
  const {data: user} = useCurrentUser()

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
        <button className="relative">
          <Bell size={20} />
          <div className="absolute -top-[10px] -end-[10px] h-4 w-4 p-0 flex items-center justify-center text-[7px] bg-main text-white border-0 rounded-full">
            1
          </div>
        </button>

        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-main cursor-pointer hover:opacity-90 transition-opacity">
          {user?.name.slice(0,2)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
