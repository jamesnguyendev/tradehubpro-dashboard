"use client";

import Image from "next/image";
import Link from "next/link";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:!bg-transparent data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard/default">
                <Image src={"/logo.png"} width={30} height={30} alt="Logo" />
                <span className="text-base font-semibold">{APP_CONFIG.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
        <SidebarGroup>
          <SidebarGroupLabel>Xác thực</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {session && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-disabled={false}
                    tooltip={"Đăng xuất"}
                    isActive={false}
                    className="cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/dashboard/default" })}
                  >
                    <LogOut />
                    <span>Đăng xuất</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
