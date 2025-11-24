
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/features/dashboard/components/AppSidebar"
import { getAllPlaygroundForUser } from "@/features/home";
import { cookies } from "next/headers"


export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const allPlaygrounds= await getAllPlaygroundForUser();
  const technologyIconMap:Record<string, string>={
    REACT:"Zap",
    NEXTJS:"LightBulb",
    EXPRESS:"Database",
    VUE:"Compass",
    HONO:"FlameIcon",
    ANGULAR:"Terminal",

  }


  const formattedPlaygrounds=allPlaygrounds?.map((playground)=>({
    id:playground.id,
    name:playground.title,
    starred:playground.Starmark?.[0]?.isMarked||false,
    icon:technologyIconMap[playground.template]||"Code2",
  }))||[]
  
  return (
    <SidebarProvider className="flex min-h-screen " defaultOpen={defaultOpen}>
      <AppSidebar initialPlaygroundProps={formattedPlaygrounds}/>
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}