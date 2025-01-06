'use client'

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"
import { formatAccountNumberWithCensored, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { Transaction } from "@/app/lib/definitions/definition"
import clsx from "clsx"
import EmptyList from "../universal/empty_list"


export default function TransactionHistory({
    transactions
} : {
    transactions: Transaction[]
}) {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <span className="text-gray-950 font-semibold">Transaction History</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <InformationCircleIcon className="w-4 text-gray-500 cursor-pointer hover:text-gray-950 transition-colors duration-300"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Your recent transactions</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            {transactions.length === 0 ? (
                <EmptyList message="You have not made any transactions yet"/>
            ) : (
                <div className="flex flex-col divide-y-2 divide-slate-100 gap-y-2">
                    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[3fr_2fr_2fr_2fr]">
                        <span className="text-gray-500 text-sm">Name</span>
                        <span className="text-gray-500 text-sm hidden md:block">Date</span>
                        <span className="text-gray-500 text-sm text-center">Type</span>
                        <span className="text-gray-500 text-sm text-end">Amount</span>
                    </div>

                    {transactions.map((transaction: Transaction) => (
                        <div key={transaction.id} className="grid grid-cols-[1fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[3fr_2fr_2fr_2fr]">
                            <div className="flex gap-x-2 items-center">
                                <div className="flex items-center justify-center flex-none w-10 h-10 rounded-full bg-slate-300 text-gray-950 font-semibold">
                                    {transaction.transactionName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <span className="text-gray-950 text-sm font-medium">{transaction.transactionName}</span>
                                    {transaction.accountNumber && <span className="text-gray-500 text-xs">{formatAccountNumberWithCensored(transaction.accountNumber)}</span>}
                                </div>
                            </div>
                            <span className="text-gray-950 text-sm font-medium hidden md:block">{formatDate(transaction.transactionDate)}</span>
                            <div className={clsx(
                                "px-2.5 py-1 place-self-center text-xs text-center font-medium rounded-md md:text-sm",
                                {
                                    "bg-red-100 text-red-500": transaction.transactionType !== "external" && transaction.transactionType !== "debt-payment" && transaction.transactionType !== "internal-deposit" && !transaction.isReceive,
                                    "bg-blue-100 text-blue-500": transaction.transactionType !== "external" && transaction.transactionType !== "debt-payment" && transaction.transactionType !== "internal-deposit" && transaction.isReceive,
                                    "bg-violet-100 text-violet-500": transaction.transactionType === "external",
                                    "bg-green-100 text-green-500": transaction.transactionType === "internal-deposit",
                                    "bg-yellow-100 text-yellow-500": transaction.transactionType === "debt-payment"
                                }
                            )}>
                                {transaction.transactionType === "external" ? "Interbank transfer" : transaction.transactionType === "debt-payment" ? "Debt payment" : transaction.transactionType === "internal-deposit" ? "Internal deposit" : transaction.isReceive ? "Receive" : "Transfer"}
                            </div>
                            <span className={clsx(
                                "text-end font-medium text-sm md:text-base",
                                {
                                    "text-red-500": !transaction.isReceive,
                                    "text-blue-600": transaction.isReceive
                                }
                            )}>
                                {`${transaction.isReceive ? "+" : "-"}${formatMoney(transaction.amount.split(".")[0])}`}
                            </span>
                        </div>
                    ))}
                </div>
            )} 

            <Link href="/transaction" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <ArrowRightIcon className="w-4"/>
                <p>View all transactions</p>
            </Link>
        </div>
    )
}