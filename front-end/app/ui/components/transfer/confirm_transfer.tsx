'use client'

import { useContext } from "react"
import { PageContentContext } from "./transfer_page_content"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import { formatAccountNumber, formatMoney } from "@/app/lib/utilities/utilities"
import { linkedLibraryDict } from "@/app/lib/definitions/definition"

export default function ConfirmTransfer() {
    const context = useContext(PageContentContext)

    if (!context) {
        throw new Error('Something went wrong')
    }

    let formValues: any = null
    let receiverBankAccount: any = null

    if (context.transferType === "internal") {
        formValues = context.internalFormRef.current?.getValues()
        receiverBankAccount = context.internalFormRef.current?.receiverBankAccount
    }
    else if (context.transferType === "interbank") {
        formValues = context.interbankFormRef.current?.getValues()
        receiverBankAccount = context.interbankFormRef.current?.receiverBankAccount
    }

    const handleSubmit = () => {
        if (context.transferType === "internal") {
            context.internalFormRef.current?.onSubmit()
        }
        else if (context.transferType === "interbank") {
            context.interbankFormRef.current?.onSubmit()
        }
    }

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 3</span>
                    <p className="text-xl text-gray-950 font-bold">Review your transaction</p>
                </div>
                <p className="text-sm text-gray-500">Check the information you filled in one more time before confirming the transaction request</p>
            </div>
            <div className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 md:pr-4 md:pb-0">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Transfer source</div>
                            <div className="text-gray-500">{formatAccountNumber(formValues!.senderAccountNumber)}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Receiver's account number</div>
                            <div className="text-gray-500">{formatAccountNumber(formValues!.receiverAccountNumber)}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Receiver's name</div>
                            <div className="text-blue-600">{receiverBankAccount?.name}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Transfer type</div>
                            <div className="text-gray-500">{context.transferType === "internal" ? "Internal transfer" : "Interbank transfer"}</div>
                        </div>
                        {context.transferType === "interbank" && (
                            <div className="flex flex-col gap-y-0.5">
                                <div className="text-sm text-gray-950 font-semibold">Destination bank</div>
                                <div className="text-blue-600">{linkedLibraryDict[formValues!.bankCode].name}</div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Transfer amount</div>
                            <div className="text-blue-600">{`${formatMoney(formValues!.amount.toString())} VND`}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Transfer fee</div>
                            <div className="text-blue-600">{formValues?.isSelfFeePayment === "true" ? `${formatMoney("1000")} VND` : "0 VND"}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Total</div>
                            <div className="text-blue-600">{formValues?.isSelfFeePayment === "true" ? `${formatMoney((BigInt(formValues!.amount) + BigInt(1000)).toString())} VND` : `${formatMoney(formValues!.amount.toString())} VND`}</div>
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm text-gray-950 font-semibold">Transfer note</div>
                            <div className="text-gray-500">{formValues?.transferNote}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button type="button" onClick={handleSubmit} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                            <ArrowRightIcon className="w-4" />
                            <p>Continue</p>
                        </button>
                        <button type="button" onClick={() => { context.prevStep(); context.setIsFormValid(false); context.setIsTransactionSuccessful(null) }} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <ArrowLeftIcon className="w-4" />
                            <p>Back</p>
                        </button>
                        {context.isTransactionSuccessful && !context.isTransactionSuccessful?.isSuccessful && <p className="text-red-500 text-xs">{context.isTransactionSuccessful?.error.message + ". Go back and edit the form before submitting again"}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}