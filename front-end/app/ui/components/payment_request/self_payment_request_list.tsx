'use client'

import { formatAccountNumber, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import { TrashIcon } from "@heroicons/react/16/solid"

export default function SelfPaymentRequestList({
    handleOpenModal
} : {
    handleOpenModal: (requestId: string) => void
}) {
    return (
        <div className="flex flex-col gap-y-4 px-4 pb-4 divide-y-2 divide-slate-100 md:px-8 md:pb-8">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[2fr_1fr_1fr_1fr]">
                <div className="flex gap-x-2 items-center">
                    <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-950 text-sm font-medium">Name</span>
                        <span className="text-gray-500 text-xs">{formatAccountNumber("123456789123")}</span>
                    </div>
                </div>
                <span className="text-gray-950 text-sm font-medium hidden md:block">{formatDate("2024-12-12")}</span>
                <span className="text-blue-600 text-center font-medium">{formatMoney("200000")}</span>
                <div className="flex justify-end items-center">
                    <button type="button" onClick={() => handleOpenModal("1")} className="text-gray-500 p-2 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-red-600 transition-all duration-300">
                        <TrashIcon className="w-4"/>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[2fr_1fr_1fr_1fr]">
                <div className="flex gap-x-2 items-center">
                    <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-950 text-sm font-medium">Name</span>
                        <span className="text-gray-500 text-xs">{formatAccountNumber("123456789123")}</span>
                    </div>
                </div>
                <span className="text-gray-950 text-sm font-medium hidden md:block">{formatDate("2024-12-12")}</span>
                <span className="text-blue-600 text-center font-medium">{formatMoney("200000")}</span>
                <div className="flex justify-end items-center">
                    <button type="button" onClick={() => handleOpenModal("2")} className="text-gray-500 p-2 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-red-600 transition-all duration-300">
                        <TrashIcon className="w-4"/>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[2fr_1fr_1fr_1fr]">
                <div className="flex gap-x-2 items-center">
                    <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-gray-950 text-sm font-medium">Name</span>
                        <span className="text-gray-500 text-xs">{formatAccountNumber("123456789123")}</span>
                    </div>
                </div>
                <span className="text-gray-950 text-sm font-medium hidden md:block">{formatDate("2024-12-12")}</span>
                <span className="text-blue-600 text-center font-medium">{formatMoney("200000")}</span>
                <div className="flex justify-end items-center">
                    <button type="button" onClick={() => handleOpenModal("3")} className="text-gray-500 p-2 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-red-600 transition-all duration-300">
                        <TrashIcon className="w-4"/>
                    </button>
                </div>
            </div>
        </div>
    )
}