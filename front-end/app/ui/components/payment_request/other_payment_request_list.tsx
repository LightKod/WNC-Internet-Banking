'use client'

import { PaymentRequest } from "@/app/lib/definitions/definition"
import { formatAccountNumber, formatAccountNumberWithCensored, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import { DocumentCheckIcon, TrashIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import Link from "next/link"

export default function OtherPaymentRequestList({
    otherPaymentRequests,
    handleOpenModal
} : {
    otherPaymentRequests: PaymentRequest[]
    handleOpenModal: (requestId: string) => void
}) {
    return (
        <div className="flex flex-col gap-y-4 px-4 pb-4 divide-y-2 divide-slate-100 md:px-8 md:pb-8">
            {otherPaymentRequests.map((paymentRequest: PaymentRequest) => (
                <div key={paymentRequest.id} className="grid grid-cols-[2fr_1fr_1fr] gap-4 pt-4 items-center md:grid-cols-[2fr_1fr_1fr_1fr] xl:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex items-center justify-center flex-none w-10 h-10 rounded-full bg-slate-300 text-gray-950 font-semibold">
                            {paymentRequest.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">{paymentRequest.name}</span>
                            <span className="text-gray-500 text-xs">{formatAccountNumber(paymentRequest.accountNumber)}</span>
                        </div>
                    </div>
                    <span className="text-gray-950 text-sm font-medium hidden xl:block">{formatDate(paymentRequest.createdDate)}</span>
                    <span className="text-blue-600 text-center font-medium">{formatMoney(paymentRequest.amount.split('.')[0])}</span>
                    <div className={clsx(
                        "px-2.5 py-1 place-self-center text-xs text-center font-medium rounded-md md:text-sm hidden md:block",
                        {
                            "bg-blue-100 text-blue-500": paymentRequest.status === "PAID" || paymentRequest.status === "UNREAD_PAID",
                            "bg-red-100 text-red-500": paymentRequest.status === "CANCELED",
                            "bg-green-100 text-green-500": paymentRequest.status === "NEW" || paymentRequest.status === "PENDING"
                        }
                    )}>
                        {(paymentRequest.status === "PAID" || paymentRequest.status === "UNREAD_PAID") ? "Resolved" : paymentRequest.status === "CANCELED" ? "Canceled" : "Pending"}
                    </div>
                    <div className="flex justify-end items-center gap-x-2">
                        {paymentRequest.status !== "PAID" && paymentRequest.status !== "UNREAD_PAID" && paymentRequest.status !== "CANCELED" && (
                            <>
                                <button type="button" onClick={() => handleOpenModal(paymentRequest.id)} className="text-gray-500 p-2 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-red-600 transition-all duration-300">
                                    <TrashIcon className="w-4"/>
                                </button>
                                <Link href={`/payment-request/resolve/${paymentRequest.id}`} className="flex items-center justify-center gap-2 rounded-md px-2 py-2 bg-blue-600 text-blue-50 text-sm font-medium border-blue-600 hover:border-blue-700 hover:bg-blue-700 md:border-0 md:px-3 transition-colors duration-300">
                                    <DocumentCheckIcon className="w-4"/>
                                    <p className="hidden md:block">Resolve</p>
                                </Link>
                            </>  
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}