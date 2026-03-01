import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "@/config/nav";
import logo from "@/assets/logo2.webp";
import { LogOut } from "lucide-react";

const AppSidebar = () => {
  return (
    <Sidebar side="right" collapsible="icon">
      {/* Header / Logo */}
      <SidebarHeader>
        <div className="flex items-center gap-3 cursor-default">
          <div className="m-auto max-w-20">
            <img src={logo} alt={"ميثاق"} />
          </div>
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map(({ label, path, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <NavLink to={path}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={label}
                        className={cn("relative", isActive && "bg-main-light!")}
                      >
                        {isActive && (
                          <span className="absolute start-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-main rounded-e-full" />
                        )}
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className={cn(
                            isActive ? "text-main" : "text-zinc-500",
                          )}
                        />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
              {group.label === "الإعدادات"  &&<SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={"تسجيل خروج"}
                  className={"text-red-600 hover:text-red-600"}
                >
                  <LogOut
                    size={18}
                    strokeWidth={1.8}
                  />
                  <span>تسجيل خروج</span>
                </SidebarMenuButton>
              </SidebarMenuItem>}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer / User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="مستخدم">
              <div className="w-8 h-8 rounded-full bg-main text-white flex items-center justify-center text-xs font-bold shrink-0">
                م
              </div>
              <div className="overflow-hidden text-start">
                <p className="text-sm font-medium truncate leading-tight">
                  محمود كامل
                </p>
                <p className="text-xs text-zinc-500 truncate leading-tight">
                  mahmoudkamel26300@gmail.com
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
