'use client'

import { CheckCircleIcon, CheckIcon, ClipboardIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useState } from "react"
import { PageContentContext } from "./transfer_page_content"
import { formatAccountNumber, formatMoney } from "@/app/lib/utilities/utilities"
import clsx from "clsx"
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { linkedLibraryDict } from "@/app/lib/definitions/definition"
import { addContact, checkContactExistence } from "@/app/lib/actions/actions"

export default function SuccessfulTransfer() {
    const context = useContext(PageContentContext)

    if(!context){
        throw new Error('Something went wrong')
    }

    let formValues: any = null
    let receiverBankAccount: any = null

    if(context.transferType === "internal") {
        formValues = context.internalFormRef.current?.getValues()
        receiverBankAccount = context.internalFormRef.current?.receiverBankAccount
    }
    else if(context.transferType === "interbank") {
        formValues = context.interbankFormRef.current?.getValues()
        receiverBankAccount = context.interbankFormRef.current?.receiverBankAccount
    }

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

    const [isSaveContactShowing, setIsSaveContactShowing] = useState<boolean>(false)
    const [isContactSaved, setIsContactSaved] = useState<boolean>(false)

    const handleSaveContact = async () => {
        if(context.transferType === "internal") {
            const result = await addContact(receiverBankAccount!.accountNumber, receiverBankAccount!.name, "RSA", "Bankit!")
            if(result === true) {
                setIsContactSaved(true)
            }
        }
        setIsContactSaved(true)
    }

    useEffect(() => {
        const checkExistence = async () => {
            if(context.transferType === "internal") {
                const result = await checkContactExistence(receiverBankAccount!.accountNumber, "RSA")
                setIsSaveContactShowing(!result)
            }
        }

        checkExistence()
    }, [])

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1 items-center p-8 bg-blue-50 rounded-md border-2 border-blue-100">
                <CheckCircleIcon className="w-24 text-blue-600"/>
                <p className="text-gray-950 font-semibold">Transfer completed</p>
                <p className="text-4xl text-blue-600 font-bold">{`${formatMoney(formValues!.amount.toString())} VND`}</p>
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
                        <div className="text-blue-600">{formValues?.isSelfFeePayment === "true" ? `${formatMoney("15000")} VND` : "0 VND"}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Total</div>
                        <div className="text-blue-600">{formValues?.isSelfFeePayment === "true" ? `${formatMoney((BigInt(formValues!.amount) + BigInt(15000)).toString())} VND` : `${formatMoney(formValues!.amount.toString())} VND`}</div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Transfer note</div>
                        <div className="text-gray-500">{formValues?.transferNote}</div>
                    </div>
                </div>
            </div>

            {isSaveContactShowing && (
                <div className="grid grid-cols-1 border-2 border-slate-300 rounded-md bg-slate-50 divide-y-2 divide-slate-300 lg:grid-cols-[3fr_1fr] lg:divide-x-2 lg:divide-y-0">
                    <div className="flex gap-x-4 items-center p-4">
                        <div className="w-12 h-12 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-0.5">
                            <span className="text-gray-950 font-semibold">{receiverBankAccount!.name}</span>
                            <span className="text-gray-500 text-sm">{receiverBankAccount!.bankName}</span>
                            <span className="text-gray-500 text-sm">{formatAccountNumber(receiverBankAccount!.accountNumber)}</span>
                        </div>
                    </div>
                    <div className={clsx(
                        "flex flex-col gap-y-4 p-4 items-center justify-center transition-all duration-300",
                        {
                            "bg-white": !isContactSaved,
                            "bg-blue-50": isContactSaved
                        }
                    )}>
                        {!isContactSaved ? (
                            <>
                                <div className="text-sm text-gray-950 font-semibold text-center">Add this person to your contact list?</div>
                                <div className="flex gap-x-4">
                                    <button type="button" onClick={() => setIsSaveContactShowing(false)} className="group p-2.5 rounded-md border-2 border-gray-200 hover:border-red-600 transition-colors duration-300">
                                        <XMarkIcon className="w-5 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                                    </button>
                                    <button type="button" onClick={handleSaveContact} className="group p-2.5 rounded-md border-2 border-gray-200 hover:border-blue-600 transition-colors duration-300">
                                        <CheckIcon className="w-5 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-gray-950 font-semibold text-center">Contact saved</div>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                    <ArrowLeftIcon className="w-4"/>
                    <p>Dashboard</p>
                </Link>
                <button type="button" onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowPathIcon className="w-4"/>
                    <p>Make a new transfer</p>
                </button>
                <Link href="/transaction" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                    <ArrowRightIcon className="w-4"/>
                    <p>Transaction history</p>
                </Link>
            </div>
        </div>
    )
}