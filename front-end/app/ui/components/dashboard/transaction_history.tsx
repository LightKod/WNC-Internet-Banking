'use client'

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"
import { formatAccountNumberWithCensored, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import { ArrowRightIcon } from "@heroicons/react/16/solid"


// Transaction history should call server action in order to be fetched
export default function TransactionHistory() {
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

            <div className="flex flex-col divide-y-2 divide-slate-100 gap-y-2">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center">
                    <span className="text-gray-500 text-sm">Name</span>
                    <span className="text-gray-500 text-sm">Date</span>
                    <span className="text-gray-500 text-sm text-center">Type</span>
                    <span className="text-gray-500 text-sm text-end">Amount</span>
                </div>

                {/* TABLE'S CONTENTS */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 pt-2 items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">Name</span>
                            <span className="text-gray-500 text-xs">{formatAccountNumberWithCensored("123456789")}</span>
                        </div>
                    </div>
                    <span className="text-gray-950 text-sm font-medium">{formatDate("2024-12-12")}</span>
                    <div className="px-2.5 py-1 place-self-center text-sm text-center font-medium rounded-md bg-red-100 text-red-500">
                        Transfer
                    </div>
                    <span className="text-red-500 text-end font-medium">{`-${formatMoney("200000")}`}</span>
                </div>
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 pt-2 items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">Name</span>
                            <span className="text-gray-500 text-xs">{formatAccountNumberWithCensored("123459876")}</span>
                        </div>
                    </div>
                    <span className="text-gray-950 text-sm font-medium">{formatDate("2024-12-11")}</span>
                    <div className="px-2.5 py-1 place-self-center text-sm text-center font-medium rounded-md bg-blue-100 text-blue-500">
                        Receive
                    </div>
                    <span className="text-blue-600 text-end font-medium">{`+${formatMoney("1000000")}`}</span>
                </div>
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 pt-2 items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">Name</span>
                            <span className="text-gray-500 text-xs">{formatAccountNumberWithCensored("123459876")}</span>
                        </div>
                    </div>
                    <span className="text-gray-950 text-sm font-medium">{formatDate("2023-09-09")}</span>
                    <div className="px-2.5 py-1 place-self-center text-sm text-center font-medium rounded-md bg-green-100 text-green-500">
                        Debt Payment
                    </div>
                    <span className="text-blue-600 text-end font-medium">{`+${formatMoney("1000000")}`}</span>
                </div>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <ArrowRightIcon className="w-4"/>
                <p>View all transactions</p>
            </button>
        </div>
    )
}