import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { updateMaster } from "@/actions";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

import { recentLeadSchema } from "./schema";

const formSchema = z.object({
  id: z.coerce.number().min(3, {
    message: "Master ID không hợp lệ.",
  }),
  name: z.string().min(3, {
    message: "Tên không hợp lệ.",
  }),
  password: z.string().min(3, {
    message: "Mật khẩu không hợp lệ.",
  }),
  server: z.string().min(3, {
    message: "Máy chủ không hợp lệ.",
  }),
  period: z.coerce.number().min(3, {
    message: "Chu kỳ không hợp lệ.",
  }),
  percent: z.coerce.number().min(3, {
    message: "Phần trăm không hợp lệ.",
  }),
  balance: z.coerce.number().min(3, {
    message: "Chu kỳ không hợp lệ.",
  }),
});

const UpdateMaster = ({ item }: { item: z.infer<typeof recentLeadSchema> }) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      password: item.password,
      server: item.server,
      period: item.period,
      percent: item.percent,
      balance: item.balance,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = {
        id: values.id,
        name: values.name,
        password: values.password,
        server: values.server,
        period: values.period,
        percent: values.percent,
        balance: values.balance,
      };

      const res = await updateMaster(data);

      if (res.status !== 200) return;

      toast.success("Cập nhật master thành công!");

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi Cập nhật master");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Sửa
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Xem chi tiết thông tin</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
            <DrawerHeader className="gap-1">
              <DrawerTitle>Cập nhật follower </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="Follower">Follower ID</FormLabel>
                      <FormControl>
                        <Input {...field} id="Follower" placeholder="3000xxx" type="number" disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="master">Tên</FormLabel>
                      <FormControl>
                        <Input {...field} id="Master" placeholder="600xxx" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="server"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="server">Máy chủ</FormLabel>
                      <FormControl>
                        <Input {...field} id="server" placeholder="Superfin" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="period">Chu kỳ</FormLabel>
                      <FormControl>
                        <Input {...field} id="period" placeholder="4" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="percent">Phần trăm</FormLabel>
                      <FormControl>
                        <Input {...field} id="percent" placeholder="30" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="balance">Số dư</FormLabel>
                      <FormControl>
                        <Input {...field} id="balance" placeholder="3000" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                      <FormControl>
                        <Input {...field} id="Password" placeholder="**xxx***" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button disabled={loading} type="submit">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Xác nhận"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Thoát</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateMaster;
