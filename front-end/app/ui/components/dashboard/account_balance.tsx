'use client'

import { BankAccount } from "@/app/lib/definitions/definition"
import { formatAccountNumber, formatMoney } from "@/app/lib/utilities/utilities"
import { CheckIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useState } from "react"

export default function AccountBalance({
    data
} : {
    data: BankAccount
}) {
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const handleCopyAccountNumber = async () => {
        try {
            await navigator.clipboard.writeText(data.accountNumber)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className="flex flex-col gap-y-2 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <span className={clsx(
                    "font-semibold",
                    {
                        "text-sm text-gray-950": data.accountType !== "payment",
                        "text-xs px-1.5 py-1 bg-blue-600 text-blue-50 rounded-md": data.accountType === "payment"
                    }
                )}>{data.accountType === "payment" ? "Payment account" : "Account"}</span>
                <button type="button" onClick={() => setIsShowing((prev) => !prev)} className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                    {isShowing ? (
                        <EyeIcon className="w-5"/>
                    ) : (
                        <EyeSlashIcon className="w-5"/>
                    )}
                </button>
            </div>
            <div className="text-gray-950 text-xl font-medium">{`${isShowing ? formatMoney(data.balance) : "xxx, xxx"} VND`}</div>
            <div className="flex gap-x-2 justify-between items-center">
                <span className="text-gray-500 text-sm">{formatAccountNumber(data.accountNumber)}</span>
                <button onClick={handleCopyAccountNumber} className={clsx(
                    "flex items-center gap-x-1 px-1.5 py-1 border-2 rounded-md transition-all duration-300",
                    {
                        "text-gray-500 border-slate-100 hover:border-blue-600 hover:text-gray-950": !isCopied,
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
    )
}