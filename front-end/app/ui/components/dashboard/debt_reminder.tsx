'use client'

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function DebtReminder() {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <span className="text-gray-950 font-semibold">Debt Reminder</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <InformationCircleIcon className="w-4 text-gray-500 cursor-pointer hover:text-gray-950 transition-colors duration-300"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Your pending payment requests</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <Link href="/payment-request" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <ArrowRightIcon className="w-4"/>
                <p>View all payment requests</p>
            </Link>
        </div>
    )
}