import { MessageSquare, Users, LayoutDashboard, type LucideIcon, LogOut } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Tổng quan",
    items: [
      {
        title: "Trang chủ",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Copy Trade",
    items: [
      {
        title: "Follower",
        url: "/dashboard/follower",
        icon: Users,
      },
      {
        title: "Master",
        url: "/dashboard/master",
        icon: MessageSquare,
      },
    ],
  },
];
