import { SidebarProvider, SidebarTrigger, ThemeProvider } from "@react-lab-nx/ui-components";
import { AppSidebar } from "./app-sidebar";


export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

