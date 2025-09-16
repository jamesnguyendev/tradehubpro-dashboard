import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

import { recentLeadSchema } from "./schema";

export function TableCellViewer({ item }: { item: z.infer<typeof recentLeadSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Xem chi tiết thông tin</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Master ID</Label>
              <Input id="header" defaultValue={item.id} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Name</Label>
              <Input id="header" defaultValue={item.name} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Mật khẩu</Label>
              <Input id="header" type="password" defaultValue={item.password} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="header">Server</Label>
                <Input id="header" defaultValue={item.server} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="header">Period</Label>
                <Input id="header" defaultValue={item.percent} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="header">Percent</Label>
                <Input id="header" defaultValue={item.period} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="header">Balance</Label>
                <Input id="header" defaultValue={item.balance} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="reviewer">Ngày tạo</Label>
                <Input
                  id="header"
                  className="cursor-not-allowed disabled:opacity-20"
                  readOnly
                  defaultValue={item.createdAt}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="reviewer">Ngày cập nhật</Label>
                <Input
                  id="header"
                  className="cursor-not-allowed disabled:opacity-20"
                  readOnly
                  defaultValue={item.updatedAt}
                />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Xác nhận</Button>
          <DrawerClose asChild>
            <Button variant="outline">Thoát</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
