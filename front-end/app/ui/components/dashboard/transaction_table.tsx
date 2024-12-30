import { getTransactions } from "@/app/lib/actions/api";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

type transaction = {
  id: number;
  source_account: string;
  destination_account: string;
  amount: string;
  transaction_type: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  transaction_date: string;
  content: string;
  remarks?: string;
};

export default async function TransactionTable({
  query,
  currentPage,
  from,
  to,
}: {
  query: string;
  currentPage: number;
  from: string;
  to: string;
}) {
  // fetchin fetchin
  const transactions = await getTransactions({
    query,
    from,
    to,
    page: currentPage.toString(),
  });
  console.log(transactions);
  if(transactions.status === 0) {
    return (
      <table className="table-auto w-full bg-white select-none">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="py-2.5">ID</th>
            <th>Source Account</th>
            <th>Destination Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction Date</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {transactions.data.transactions.map((t: transaction) => (
            <tr
              key={t.id}
              className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
              <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
                {t.id}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                {t.source_account}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                {t.destination_account}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100 text-emerald-500">
                {t.amount}
              </td>
              <td
                className={clsx(
                  {
                    "text-blue-500": t.status === "PENDING",
                    "text-emerald-500": t.status === "SUCCESS",
                    "text-red-500": t.status === "FAILED",
                  },
                  "px-2 py-2.5 border-b-2 border-slate-100 font-bold "
                )}>
                {t.status}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                {t.transaction_date.split("T")[0]}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                {t.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <ExclamationCircleIcon className="size-20 text-slate-400"/>
        <div className="text-slate-500 text-lg">No transaction found</div>
      </div>
    );
  }
 
}
