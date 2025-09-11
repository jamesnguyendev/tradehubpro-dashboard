import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

import { recentLeadSchema } from "./schema";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--primary)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--primary)",
//   },
// } satisfies ChartConfig;

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
          <DrawerTitle>Xem chi tiết thông tin</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Follower ID</Label>
              <Input id="header" defaultValue={item.id} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Master ID</Label>
              <Input id="header" defaultValue={item.masterId} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Mật khẩu</Label>
              <Input id="header" type="password" defaultValue={item.password} />
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
