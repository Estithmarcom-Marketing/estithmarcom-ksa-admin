import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const PAGE_TITLES: Record<string, { title: string; description: string }> = {
  overview:  { title: "Overview",  description: "Welcome back, Alex" },
  analytics: { title: "Analytics", description: "Track your key metrics" },
  projects:  { title: "Projects",  description: "Manage your work" },
  team:      { title: "Team",      description: "Collaborate with others" },
  settings:  { title: "Settings",  description: "Manage your preferences" },
};

const Navbar = () => {
  const location = useLocation();
  const segment = location.pathname.split("/").pop() ?? "";
  const meta = PAGE_TITLES[segment] ?? { title: "Dashboard", description: "" };

  return (
    <header className="h-14 flex items-center justify-between px-4 gap-4 bg-sidebar backdrop-blur-md border-b">
      {/* Start side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8" />

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold leading-none">
            {meta.title}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {meta.description}
          </p>
        </div>
      </div>

      {/* End side */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
        >
          <Bell size={16} />
          <div className="absolute -top-0.5 -end-0.5 h-4 w-4 p-0 flex items-center justify-center text-[7px] bg-main text-white border-0 rounded-full">
            1
          </div>
        </Button>

        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-main cursor-pointer hover:opacity-90 transition-opacity">
          مك
        </div>
      </div>
    </header>
  );
};

export default Navbar;