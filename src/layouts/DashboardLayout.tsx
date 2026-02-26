import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/Sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider className="overflow-hidden">
      <div className="flex">
        <AppSidebar />

        <div className="flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 mt-14">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
