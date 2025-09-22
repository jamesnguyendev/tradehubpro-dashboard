"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";

export function DataTable() {
  const [data, setData] = React.useState<any[]>([]);
  const [status, setStatus] = React.useState<"pending" | "approved" | "rejected">("pending");
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row._id.toString() });

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/verify?verify=${status}`);
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, [status]);

  React.useEffect(() => {
    const evtSource = new EventSource(`/api/verify/stream?verify=${status}`);

    evtSource.onmessage = (e) => {
      const change = JSON.parse(e.data);

      if (change.operationType === "insert") {
        setData((prev) => [change.fullDocument, ...prev]);
      }

      if (change.operationType === "update" || change.operationType === "replace") {
        setData((prev) => prev.map((item) => (item._id === change.fullDocument._id ? change.fullDocument : item)));
      }
    };

    return () => {
      evtSource.close();
    };
  }, [status]);

  return (
    <Tabs value={status} onValueChange={(val) => setStatus(val as any)} className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          lọc cột
        </Label>
        <Select value={status}>
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Duyệt đăng nhập</SelectItem>
            <SelectItem value="approved">Đã đăng nhập</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="pending">Duyệt đăng nhập</TabsTrigger>
          <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
          <TabsTrigger value="rejected">Từ chối</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <TabsContent value="pending" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="approved" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="rejected" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  );
}
