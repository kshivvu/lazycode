"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronUp,
  Code2,
  Compass,
  Database,
  FlameIcon,
  FolderPlus,
  History,
  Home,
  Lightbulb,
  LucideIcon,
  Plus,
  PlusIcon,
  Settings,
  Settings2,
  Star,
  Terminal,
  User2,
  View,
  Zap,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import UserButton from "@/app/(auth)/auth/sign-in/components/UserButton";
interface playgroundProps {
  name: string;
  id: string;
  icon: string;
  starred: boolean;
}

const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2,
};
const AppSidebar = ({
  initialPlaygroundProps,
}: {
  initialPlaygroundProps: playgroundProps[];
}) => {
  const [starredPg, setStarredPg] = useState(
    initialPlaygroundProps.filter((p) => p.starred)
  );
  const [recentPg, setRecentPg] = useState<playgroundProps[] | null>(
    initialPlaygroundProps
  );
  const state = useSidebar();
  const open = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="inset" className="border border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center ">
            {/* <SidebarMenuButton> */}

            <Image width={60} height={60} src={"/logo.svg"} alt="logo" />

            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/home"}
                tooltip={"home"}
                asChild
              >
                <Link href={"/"}>
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Star size={4} className="mr-2 inline" />
            Starred
          </SidebarGroupLabel>
          <SidebarGroupAction title="add a starred playground">
            <Plus className="size-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPg.length === 0 && recentPg?.length === 0 ? (
                <div className="text-center text-l w-full py-4 text-muted-foreground">
                  {state.open ? (
                    <span>Create a new Playground</span>
                  ) : (
                    <PlusIcon size={20} className="inline mr-2" />
                  )}
                </div>
              ) : (
                starredPg.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        asChild
                      >
                        {IconComponent && (
                          <IconComponent size={4} className="inline mr-2" />
                        )}
                        <Link href={`/playground/${playground.id}`}>
                          <span>{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <History size={4} className="inline mr-2" />
            Recent Playground
          </SidebarGroupLabel>
          <SidebarGroupAction title="Recent Playground">
            <FolderPlus className="h-4 w-4 inline mr-2" />
          </SidebarGroupAction>
          <SidebarContent>
            <SidebarMenu>
              {recentPg?.length === 0
                ? null
                : recentPg?.map((playground) => {
                    const IconComponent =
                      lucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                          asChild
                        >
                          {IconComponent && (
                            <IconComponent size={4} className="inline mr-2" />
                          )}

                          <Link href={`playground/${playground.id}`}>
                            <span>{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}

              <SidebarMenuItem className="mt-4">
                <SidebarMenuButton tooltip={"view all playground"}>
                  <View className="size-4 inline mr-2" />
                  <Link href={"/playground"}>
                    <span>View All Playground</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {state.open}
              <Settings/>
              <Link href={"/dashboard"}>Settings</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
