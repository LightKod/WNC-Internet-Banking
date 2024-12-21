'use client'

import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { PageContentContext } from "./recharge_page_content"
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { formatAccountNumber, formatMoney } from "@/app/lib/utilities/utilities"

export default function SuccessfulRequest() {
    const context = useContext(PageContentContext)

    if(!context){
        throw new Error('Something went wrong')
    }

    const formValues = context.formRef.current?.getValues()

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1 items-center p-8 bg-blue-50 rounded-md border-2 border-blue-100">
                <CheckCircleIcon className="w-24 text-blue-600"/>
                <p className="text-gray-950 font-semibold">Successful request</p>
                <p className="text-sm text-gray-500">The recharge request has been approved</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Information type</div>
                        <div className="text-gray-500">
                            {formValues?.infoType === "username" ? "Username" : "Account number"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">
                            {formValues?.infoType === "username" ? "Username" : "Account number"}
                        </div>
                        <div className="text-gray-500">
                            {formValues?.infoType === "username" ? formValues!.accountInfo : formatAccountNumber(formValues!.accountInfo)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <div className="text-sm text-gray-950 font-semibold">Recharge amount</div>
                        <div className="text-blue-600">{`${formatMoney(formValues!.amount.toString())} VND`}</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                    <ArrowLeftIcon className="w-4"/>
                    <p>Dashboard</p>
                </Link>
                <button type="button" onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowPathIcon className="w-4"/>
                    <p>Make a new request</p>
                </button>
            </div>
        </div>
    )
}