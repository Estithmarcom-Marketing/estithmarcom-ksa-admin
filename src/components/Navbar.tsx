import { useLocation } from "react-router-dom";
import { Badge, Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <header className="h-14 flex items-center justify-between px-4 gap-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      {/* Start side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 h-8 w-8" />

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-zinc-100 leading-none">
            {meta.title}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 leading-none">
            {meta.description}
          </p>
        </div>
      </div>

      {/* End side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 h-8 focus-within:border-zinc-600 transition-colors">
          <Search size={13} className="text-zinc-500 shrink-0" />
          <Input
            placeholder="Search..."
            className="border-0 bg-transparent h-full p-0 text-xs text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-0 w-36"
          />
          <kbd className="text-[10px] text-zinc-600 bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 h-8 w-8"
        >
          <Bell size={16} />
          <Badge className="absolute -top-0.5 -end-0.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-emerald-500 text-zinc-950 border-0 rounded-full">
            3
          </Badge>
        </Button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-zinc-950 cursor-pointer hover:opacity-90 transition-opacity">
          AK
        </div>
      </div>
    </header>
  );
};

export default Navbar;