'use client'

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"

export default function QuickTransfer() {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <span className="text-gray-950 text-sm font-semibold">Quick Transfer</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <InformationCircleIcon className="w-4 text-gray-500 cursor-pointer hover:text-gray-950 transition-colors duration-300"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex flex-col gap-y-2">
                                <p>Perform a quick transfer via a contact</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}