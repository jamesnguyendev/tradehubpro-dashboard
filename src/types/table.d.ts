import "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface ColumnMeta {
    title?: string;
  }
}
