import { MessageSquare, Users, Fingerprint, LayoutDashboard, type LucideIcon } from "lucide-react";

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
  // {
  //   id: 2,
  //   label: "Mục khác",
  //   items: [
  //     {
  //       title: "Xác thực",
  //       url: "/auth",
  //       icon: Fingerprint,
  //       subItems: [
  //         { title: "Đăng nhập", url: "/auth/v1/login", newTab: false },
  //         { title: "Đăng ký", url: "/auth/v1/register", newTab: false },
  //       ],
  //     },
  //   ],
  // },
];
