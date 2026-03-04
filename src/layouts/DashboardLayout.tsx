import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/Sidebar";
import { useCurrentUser } from "@/lib/querykeys/current-user-query";

const DashboardLayout = () => {
  const {data: user} = useCurrentUser()
  console.log(user);
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
