'use client'

import { useContext } from "react"
import { PageContentContext } from "./resolve_payment_request_content"
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { formatAccountNumber, formatDate, formatMoney } from "@/app/lib/utilities/utilities"
import Link from "next/link"

export default function ReviewPaymentRequest() {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const paymentRequest = context.paymentRequest

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 1</span>
                    <p className="text-xl text-gray-950 font-bold">Review your transaction</p>
                </div>
                <p className="text-sm text-gray-500">Check the information of the payment request you are going to resolve</p>
            </div>
            <div className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 md:pr-4 md:pb-0">
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
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button type="button" onClick={context.onConfirm} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                            <ArrowRightIcon className="w-4"/>
                            <p>Continue</p>
                        </button>
                        <Link href="/payment-request" type="button" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <XMarkIcon className="w-4"/>
                            <p>Cancel payment</p>
                        </Link>
                        {context.isTransactionSuccessful && !context.isTransactionSuccessful?.isSuccessful && <p className="text-red-500 text-xs">{context.isTransactionSuccessful?.error.message}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}