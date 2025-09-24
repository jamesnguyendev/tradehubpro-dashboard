import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, CircleX, EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { handleRejected } from "@/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { sectionSchema } from "./schema";

export const dashboardColumnsApproved: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên" />,
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
    enableSorting: true,
    meta: { title: "Tên" },
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
    meta: { title: "Trạng thái" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="w-32">{row.original.email}</div>,
    enableSorting: false,
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
          <DropdownMenuItem variant="destructive" onClick={() => handleRejected(row.original._id)}>
            Chặn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
