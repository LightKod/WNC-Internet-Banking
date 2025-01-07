import { getTotalTransactionPages } from "@/app/lib/actions/api";
import { allBanks } from "@/app/lib/definitions/definition";
import SelectBank from "@/app/ui/components/app_layout/transaction/select_bank";
import TransactionTable from "@/app/ui/components/app_layout/transaction/transaction_table";
import Datepicker from "@/app/ui/components/universal/datepicker";
import Pagination from "@/app/ui/components/universal/pagination";
import SearchField from "@/app/ui/components/universal/search_field";
import React from "react";

export default async function Reconciliation(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    from?: string;
    to?: string;
    bank?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const today = new Date().toISOString().split("T")[0];
  const fromDate = searchParams?.from || "";
  const endDate = searchParams?.from || "";
  const bank = searchParams?.bank || "";

  const totalPages = await getTotalTransactionPages({
    query,
    from: fromDate,
    to: endDate,
    bank
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Your Transactions</h1>
        <div className="flex gap-2 items-center">
          <div className="mr-10">
            <SelectBank />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold">From: </h1>
            <Datepicker type="from" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold">To: </h1>
            <Datepicker type="to" />
          </div>
          <SearchField placeholder="Search Transaction..." />
        </div>
      </div>
      <div className="w-full mt-3 border-2 border-slate-100 rounded-md px-8 py-4 bg-white">
        <TransactionTable
          query={query}
          currentPage={currentPage}
          from={fromDate}
          to={endDate}
          bank={bank}
        />
      </div>
      <div className="mt-3 justify-self-end mr-3">
        <Pagination totalPages={totalPages.data.totalPages} />
      </div>
    </div>
  );
}
