import { Users, LayoutDashboard, type LucideIcon, CircleDollarSign, UserRoundCheck, Link } from "lucide-react";

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
      {
        title: "Người dùng",
        url: "/dashboard/user",
        icon: Users,
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
        icon: UserRoundCheck,
      },
      {
        title: "Master",
        url: "/dashboard/master",
        icon: Link,
      },
      {
        title: "Profit",
        url: "/dashboard/profit",
        icon: CircleDollarSign,
      },
    ],
  },
];
