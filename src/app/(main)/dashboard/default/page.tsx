import { DataTable } from "./_components/data-table";

export default async function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable />
    </div>
  );
}
