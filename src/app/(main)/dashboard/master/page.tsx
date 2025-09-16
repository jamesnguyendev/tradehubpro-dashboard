import { getMasters } from "@/actions";

import { TableCards } from "./_components/table-cards";

export default async function Page() {
  const masters = await getMasters();
  if (!masters) {
    return <div>Không có masters</div>;
  }
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TableCards data={masters} />
    </div>
    // <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    //   <div className="flex flex-col gap-4 lg:col-span-1">
    //     <AccountOverview />
    //   </div>

    //   <div className="flex flex-col gap-4 lg:col-span-2">
    //     <div className="flex-1">
    //       <FinancialOverview />
    //     </div>
    //     <div className="grid flex-1 grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2">
    //       <ExpenseSummary />
    //       <CurrencyExchange />
    //     </div>
    //   </div>
    // </div>
  );
}
