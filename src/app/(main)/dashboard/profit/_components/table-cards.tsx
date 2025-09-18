"use client";

import AddMaster from "@/components/dashboard/master/add-master";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";

interface profit {
  _id: string;
  id: number;
  masterId: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
}

export function TableCards({ data }: { data: profit[] }) {
  const table = useDataTableInstance({
    data: data,
    columns: recentLeadsColumns,
    getRowId: (row, index) => row._id || index.toString(),
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>Profit gần đây</CardTitle>
          <CardDescription>Theo dõi và quản lý trạng thái của họ.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DataTableViewOptions table={table} />
              <AddMaster />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md border">
            <DataTable table={table} columns={recentLeadsColumns} />
          </div>
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
