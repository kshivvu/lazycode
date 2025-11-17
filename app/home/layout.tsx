
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/features/dashboard/components/AppSidebar"
import { cookies } from "next/headers"


export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider className="flex min-h-screen " defaultOpen={defaultOpen}>
      <AppSidebar initialPlaygroundProps={[]}/>
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}