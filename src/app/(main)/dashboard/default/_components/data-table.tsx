"use client";

import * as React from "react";

import axios from "axios";

import DebouncedInput from "@/components/custom/debounce-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { useSSE } from "@/hooks/use-sse";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { dashboardColumnsApproved } from "./columns-approved";
import { dashboardColumnsRejected } from "./columns-rejected";
import SkeletonTable from "./skeleton-table";

interface User {
  _id: string;
  name: string;
  email: string;
  verify: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface ChangeEvent<T> {
  operationType: "insert" | "update" | "replace" | "delete";
  fullDocument: T;
}

export function DataTable() {
  const [data, setData] = React.useState<any[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [status, setStatus] = React.useState<"pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = React.useState(false);
  const columns = withDndColumn(dashboardColumns);
  const columnsApproved = withDndColumn(dashboardColumnsApproved);
  const columnsRejected = withDndColumn(dashboardColumnsRejected);

  const getColumns = React.useCallback(() => {
    switch (status) {
      case "approved":
        return columnsApproved;
      case "rejected":
        return columnsRejected;
      default:
        return columns;
    }
  }, [status, columns, columnsApproved, columnsRejected]);

  const table = useDataTableInstance({ data, columns: getColumns(), getRowId: (row) => row._id.toString() });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/verify?verify=${status}`);
        setData(res.data);
      } finally {
        setLoading(false);
      }
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

  useSSE<ChangeEvent<User>>(`/api/verify/approved/stream`, (change) => {
    if (change.operationType === "update" || change.operationType === "replace") {
      setData((prev) => prev.map((item) => (item._id === change.fullDocument._id ? change.fullDocument : item)));
    }
  });

  useSSE<ChangeEvent<User>>(`/api/verify/rejected/stream`, (change) => {
    if (change.operationType === "update" || change.operationType === "replace") {
      setData((prev) => prev.map((item) => (item._id === change.fullDocument._id ? change.fullDocument : item)));
    }
  });

  if (!mounted) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <Tabs value={status} onValueChange={(val) => setStatus(val as any)} className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          lọc cột
        </Label>
        <Select value={status} onValueChange={(val) => setStatus(val as any)}>
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Chọn loại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Duyệt đăng nhập</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="pending">Duyệt đăng nhập</TabsTrigger>
          <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
          <TabsTrigger value="rejected">Từ chối</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <DebouncedInput
            value={table.getState().globalFilter ?? ""}
            onChange={(value) => table.setGlobalFilter(String(value))}
            className="col-span-4 h-8 w-full gap-1.5 rounded-md border px-3 text-sm font-medium outline-none has-[>svg]:px-2.5"
            placeholder="Tìm: Tên, email."
          />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <TabsContent value="pending" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          {loading && status === "pending" ? (
            <SkeletonTable />
          ) : (
            <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
          )}
        </div>
        <DataTablePagination table={table} />
      </TabsContent>

      <TabsContent value="approved" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          {loading && status === "approved" ? (
            <SkeletonTable />
          ) : (
            <DataTableNew dndEnabled table={table} columns={columnsApproved} onReorder={setData} />
          )}
        </div>
        <DataTablePagination table={table} />
      </TabsContent>

      <TabsContent value="rejected" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          {loading && status === "rejected" ? (
            <SkeletonTable />
          ) : (
            <DataTableNew dndEnabled table={table} columns={columnsRejected} onReorder={setData} />
          )}
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  );
}
