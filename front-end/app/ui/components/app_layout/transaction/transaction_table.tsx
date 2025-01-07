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
  fee_payer: "receiver" | "sender";
  status: "PENDING" | "SUCCESS" | "FAILED";
  transaction_date: string;
  content: string;
  source_bank: string;
  destination_bank: string;
  remarks?: string;
};

export default async function TransactionTable({
  query,
  currentPage,
  from,
  to,
  bank
}: {
  query: string;
  currentPage: number;
  from: string;
  to: string;
  bank?: string;
}) {
  // fetchin fetchin
  const transactions = await getTransactions({
    query,
    from,
    to,
    page: currentPage.toString(),
    bank
  });
  console.log(transactions.data.transactions);
  if (
    transactions.status === 0 &&
    transactions.data.transactions.length !== 0
  ) {
    return (
      <table className="table-auto w-full bg-white select-none">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="py-2.5">ID</th>
            <th>Source Account</th>
            <th>Destination Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Type</th>
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
                    "text-green-500": t.status === "SUCCESS",
                    "text-red-500": t.status === "FAILED",
                  },
                  "px-2 py-2.5 border-b-2 border-slate-100 font-bold "
                )}>
                {t.status === "FAILED"
                  ? "Failed"
                  : t.status === "PENDING"
                  ? "Pending"
                  : "Success"}
              </td>
              <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                {t.transaction_date.split("T")[0]}
              </td>
              <td className={clsx("px-2 py-2.5 border-b-2 border-slate-100")}>
                <div
                  className={clsx(
                    "text-xs px-2.5 py-1 rounded-md font-medium",
                    {
                      "bg-red-100 text-red-500":
                        t.transaction_type !== "debt-payment" &&
                        t.transaction_type !== "internal-deposit" &&
                        t.fee_payer !== "receiver",
                      "bg-blue-100 text-blue-500":
                        t.transaction_type !== "debt-payment" &&
                        t.transaction_type !== "internal-deposit" &&
                        t.fee_payer === "receiver",
                      "bg-green-100 text-green-500":
                        t.transaction_type === "internal-deposit",
                      "bg-yellow-100 text-yellow-500":
                        t.transaction_type === "debt-payment",
                    }
                  )}>
                  {t.transaction_type === "debt-payment"
                    ? "Debt payment"
                    : t.transaction_type === "internal-deposit"
                    ? "Internal deposit"
                    : t.fee_payer === "receiver"
                    ? "Receive"
                    : "Transfer"}
                </div>
              </td>
              <td className=" px-2 py-2.5 text-sm border-b-2 border-slate-100">
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
        <ExclamationCircleIcon className="size-20 text-slate-400" />
        <div className="text-slate-500 text-lg">No transaction found</div>
      </div>
    );
  }
}
