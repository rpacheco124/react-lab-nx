import { SidebarProvider, SidebarTrigger } from "@react-lab-nx/ui-components";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    )
}