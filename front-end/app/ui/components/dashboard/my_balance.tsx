'use client'

import { BankAccount } from "@/app/lib/definitions/definition"
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import AccountBalance from "./account_balance"
import { formatMoney } from "@/app/lib/utilities/utilities"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"

// This one fetch user's account list, count the total amount of money and display
export default function MyBalance() {
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const bankAccounts: BankAccount[] = [
        {
            accountType: "payment",
            accountNumber: "111222233334444",
            balance: "24847123"
        },
        {
            accountType: "saving",
            accountNumber: "845621522487763",
            balance: "1000000000"
        },
    ]

    return (
        <div className="group flex flex-col">
            <div className="flex flex-col gap-y-4 p-4 pb-12 bg-white border-2 border-slate-100 rounded-md shadow-sm group-hover:pb-4 transition-all duration-300">
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <span className="text-gray-950 text-sm font-semibold">My Balance</span>
                        <Tooltip>
                            <TooltipTrigger>
                                <InformationCircleIcon className="w-4 text-gray-500 cursor-pointer hover:text-gray-950 transition-colors duration-300"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Your accounts' balance</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <button type="button" onClick={() => setIsShowing((prev) => !prev)} className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                        {isShowing ? (
                            <EyeIcon className="w-5"/>
                        ) : (
                            <EyeSlashIcon className="w-5"/>
                        )}
                    </button>
                </div>
                <div className="text-gray-950 text-3xl font-semibold">{`${isShowing ? formatMoney(
                    bankAccounts.reduce((sum, account) => {
                        return (BigInt(sum) + BigInt(account.balance)).toString()
                    }, "0")
                ) : "xxx, xxx"} VND`}</div>
            </div>
            <div className="flex flex-col mx-4 gap-y-2 -mt-8 group-hover:mx-0 group-hover:mt-0 group-hover:pt-2 transition-all duration-300">
                {bankAccounts.map((bankAccount: BankAccount) => (
                    <AccountBalance key={bankAccount.accountNumber} data={bankAccount}/> 
                ))}
            </div>
        </div>
    )
}