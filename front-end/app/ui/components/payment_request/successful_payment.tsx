'use client'

import { CheckCircleIcon, CheckIcon, ClipboardIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useContext, useState } from "react"
import { PageContentContext } from "./resolve_payment_request_content"
import { formatAccountNumber, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import clsx from "clsx"
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function SuccessfulPayment() {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const paymentRequest = context.paymentRequest

    const [isCopied, setIsCopied] = useState<boolean>(false)

    const handleCopyTransactionId = async () => {
        try {
            await navigator.clipboard.writeText(context.transactionId)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1 items-center p-8 bg-blue-50 rounded-md border-2 border-blue-100">
                <CheckCircleIcon className="w-24 text-blue-600"/>
                <p className="text-gray-950 font-semibold">Transfer completed</p>
                <p className="text-4xl text-blue-600 font-bold">{`${formatMoney(paymentRequest.amount.split('.')[0])} VND`}</p>
                <div className="flex gap-x-2 items-center justify-center">
                    <p className="text-sm text-gray-500">{`Transaction ID: ${context.transactionId}`}</p>
                    <button onClick={handleCopyTransactionId} className={clsx(
                        "flex items-center gap-x-1 px-1.5 py-1 border-2 rounded-md transition-all duration-300",
                        {
                            "text-gray-500 border-slate-300 hover:border-blue-600 hover:text-gray-950": !isCopied,
                            "border-green-600 bg-green-100 text-green-950": isCopied
                        }
                    )}>
                        {isCopied ? (
                            <CheckIcon className="w-4"/>
                        ) : (
                            <ClipboardIcon className="w-4"/>
                        )}
                        <span className="text-xs">{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Transfer source</div>
                        <div className="text-gray-500">{formatAccountNumber(paymentRequest.debtorAccountNumber)}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Creditor's account number</div>
                        <div className="text-gray-500">{formatAccountNumber(paymentRequest.creditorAccountNumber)}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Creditor's name</div>
                        <div className="text-blue-600">{paymentRequest.creditorName}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Transaction type</div>
                        <div className="text-gray-500">Debt payment</div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Created date</div>
                        <div className="text-blue-600">{formatDate(paymentRequest.createdDate)}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Transfer amount</div>
                        <div className="text-blue-600">{`${formatMoney(paymentRequest.amount.split('.')[0])} VND`}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Note</div>
                        <div className="text-gray-500">{paymentRequest.description}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/payment-request" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                    <ArrowLeftIcon className="w-4"/>
                    <p>Payment request</p>
                </Link>
                <Link href="/transaction" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowRightIcon className="w-4"/>
                    <p>Transaction history</p>
                </Link>
            </div>
        </div>
    )
}