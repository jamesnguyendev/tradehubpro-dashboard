import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { recentLeadSchema } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Master ID" />,
    cell: ({ row }) => <span>{row.original.company}</span>,
    enableSorting: false,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  //   cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
  //   enableSorting: false,
  // },
  // {
  //   accessorKey: "source",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
  //   cell: ({ row }) => <Badge variant="outline">{row.original.source}</Badge>,
  //   enableSorting: false,
  // },
  {
    accessorKey: "lastActivity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mật khẩu" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.source}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "lastActivie",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.source}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "lastActivitys",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày cập nhật" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.source}</span>,
    enableSorting: false,
  },
  {
    header: "Hành động",
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Sửa</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
