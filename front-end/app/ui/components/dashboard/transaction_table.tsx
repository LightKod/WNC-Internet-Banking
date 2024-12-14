import React from "react";

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
  return (
    <table className="table-auto w-full bg-white select-none">
      <thead>
        <tr className="border-b-2 border-slate-200">
          <th className="py-2.5">ID</th>
          <th>Name</th>
          <th>Billing Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
          <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
            12038123
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            New Transaction
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            11/08/2024
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 text-emerald-500">
            +2000000
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 font-bold text-blue-500">
            In Progress
          </td>
        </tr>
        <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
          <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
            12038123
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            New Transaction
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            11/08/2024
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 text-emerald-500">
            +2000000
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 font-bold text-blue-500">
            In Progress
          </td>
        </tr>
        <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
          <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
            12038123
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            New Transaction
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            11/08/2024
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 text-emerald-500">
            +2000000
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 font-bold text-blue-500">
            In Progress
          </td>
        </tr>
        <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
          <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
            12038123
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            New Transaction
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100">
            11/08/2024
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 text-red-500">
            -2000000
          </td>
          <td className=" px-2 py-2.5 border-b-2 border-slate-100 font-bold text-blue-500">
            In Progress
          </td>
        </tr>
      </tbody>
    </table>
  );
}
