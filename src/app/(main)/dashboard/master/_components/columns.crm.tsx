import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MasterConfirm } from "./delete-confirm";
import { recentLeadSchema } from "./schema";
import UpdateMaster from "./update-master";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="STT" />,
  //   cell: ({ row }) => <span>{row.original.name}</span>,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Master ID" />,
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
    enableSorting: true,
    meta: { title: "Tên" },
  },
  {
    accessorKey: "server",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Máy chủ" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.server}</span>,
    enableSorting: false,
    meta: { title: "Máy chủ" },
  },
  {
    accessorKey: "period",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Chu kỳ" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.period}</span>,
    enableSorting: true,
    meta: { title: "Chu kỳ" },
  },
  {
    accessorKey: "percent",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phần trăm" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.percent}</span>,
    enableSorting: true,
    meta: { title: "Phần trăm" },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số dư" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.balance}</span>,
    enableSorting: true,
    meta: { title: "Số dư" },
  },
  {
    accessorKey: "password",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mật khẩu" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.password}</span>,
    meta: { title: "Mật khẩu" },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
    meta: { title: "Ngày tạo" },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày cập nhật" />,
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
    meta: { title: "Ngày cập nhật" },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <UpdateMaster item={row.original} />
          <DropdownMenuSeparator />
          <MasterConfirm id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
