import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {/* <SectionCards /> */}
      {/* <ChartAreaInteractive /> */}
      <DataTable data={data} />
    </div>
  );
}
