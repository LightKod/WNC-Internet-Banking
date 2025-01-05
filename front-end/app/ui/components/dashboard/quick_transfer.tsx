'use client'

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"
import { Contact } from "@/app/lib/definitions/definition"
import { formatAccountNumber } from "@/app/lib/utilities/utilities"
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import EmptyList from "../universal/empty_list"

export default function QuickTransfer({
    contacts
} : {
    contacts: Contact[]
}) {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <span className="text-gray-950 font-semibold">Quick Transfer</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <InformationCircleIcon className="w-4 text-gray-500 cursor-pointer hover:text-gray-950 transition-colors duration-300"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Perform a quick transfer via a contact</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            {contacts.length === 0 ? (
                <EmptyList message="You don't have any contacts"/>
            ) : (
                <div className="grid grid-cols-7 md:grid-cols-5 xl:grid-cols-7 gap-2 mt-2">
                    {contacts.map((contact) => (
                        <Tooltip key={contact.accountNumber}>
                            <TooltipTrigger>
                                <button className="w-full flex font-bold text-gray-950 items-center justify-center aspect-square rounded-full bg-slate-200 border-2 border-transparent hover:border-blue-600 transition-all duration-300">
                                    {contact.name.charAt(0).toUpperCase()}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="flex flex-col gap-y-1">
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-gray-500">{contact.bankName}</p>
                                    <p className="text-gray-500">{formatAccountNumber(contact.accountNumber)}</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href="/contacts" className="w-full flex text-gray-500 items-center justify-center aspect-square rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-300">
                                <PlusIcon className="w-5"/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a new contact</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            )}
            
            <Link href="/contacts" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <ArrowRightIcon className="w-4"/>
                <p>Manage your contacts</p>
            </Link>
        </div>
    )
}