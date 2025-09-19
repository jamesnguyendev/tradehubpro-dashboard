import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, EllipsisVertical, Loader } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteConfirm } from "./delete-confirm";
import { recentLeadSchema } from "./schema";
// import { UpdateFollower } from "./update-follower";

export const recentLeadsColumns: ColumnDef<z.infer<typeof recentLeadSchema>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.original.email}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số điện thoại" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.phone}</span>,
    meta: { title: "Số điện thoại" },
    enableSorting: false,
  },
  {
    accessorKey: "verify",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      const status = row.original.verify;

      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {status === "approved" ? (
            <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
          ) : status === "rejected" ? (
            <CircleX className="stroke-border fill-red-500 dark:fill-red-400" />
          ) : (
            <Loader className="animate-spin" />
          )}
          <span className="ml-1">{status}</span>
        </Badge>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    meta: { title: "Ngày tạo" },
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : "Không dữ liệu";

      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày cập nhật" />,
    meta: { title: "Ngày update" },
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : "Không dữ liệu";
      return <span className="text-muted-foreground tabular-nums">{date.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    header: "Hành động",
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {/* <UpdateFollower item={row.original} /> */}
          <DropdownMenuSeparator />
          <DeleteConfirm id={row.original._id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
