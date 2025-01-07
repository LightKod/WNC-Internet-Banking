import TransactionTable from "@/app/ui/components/app_layout/transaction/transaction_table";
import Datepicker from "@/app/ui/components/universal/datepicker";
import Pagination from "@/app/ui/components/universal/pagination";
import SearchField from "@/app/ui/components/universal/search_field";
import React from "react";

export default async function EmployeeTransactions(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;
  const today = new Date().toISOString().split("T")[0];
  const fromDate = searchParams?.from || today;
  const endDate = searchParams?.from || today;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Find transactions by card number</h1>
        <div className="flex gap-2">
          <SearchField placeholder="Card number..." />
        </div>
      </div>
      <div className="w-full mt-3 border-2 border-slate-100 rounded-md px-8 py-4 bg-white">
        <TransactionTable
          query={query}
          currentPage={currentPage}
          from={fromDate}
          to={endDate}
        />
      </div>
      <div className="mt-3 justify-self-end mr-3">
        <Pagination totalPages={3} />
      </div>
    </div>
  );
}
