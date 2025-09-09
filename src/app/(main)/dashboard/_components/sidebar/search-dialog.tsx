"use client";
import * as React from "react";

import Link from "next/link";

import { LayoutDashboard, Search, Users, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Tổng quan", icon: LayoutDashboard, label: "Trang chủ", link: "/dashboard/default" },
  { group: "Tổng quan", icon: Users, label: "Follower", link: "/dashboard/follower", disabled: true },
  { group: "Tổng quan", icon: MessageSquare, label: "Master", link: "/dashboard/master", disabled: true },
  { group: "Xác thực", label: "Đăng nhập", link: "/auth/v1/login" },
  // { group: "Authentication", label: "Login v2" },
  // { group: "Authentication", label: "Register v1" },
  // { group: "Authentication", label: "Register v2" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground !px-0 font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Tìm kiếm...
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tìm kiếm danh mục…" />
        <CommandList>
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <Link href={item.link} key={item.label}>
                      <CommandItem className="!py-1.5" onSelect={() => setOpen(false)}>
                        {item.icon && <item.icon />}
                        {item.label}
                      </CommandItem>
                    </Link>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
