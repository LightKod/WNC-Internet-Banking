'use client'

import { useContext } from "react"
import { PageContentContext } from "./recharge_page_content"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import { formatAccountNumber, formatMoney } from "@/app/lib/utilities/utilities"

export default function ConfirmRecharge() {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const formValues = context.formRef.current?.getValues()

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 2</span>
                    <p className="text-xl text-gray-950 font-bold">Review your request</p>
                </div>
                <p className="text-sm text-gray-500">Check the information you filled in one more time before confirming the request</p>
            </div>
            <div className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 md:pr-4 md:pb-0">
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
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button type="button" onClick={context.formRef.current?.onSubmit} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                            <ArrowRightIcon className="w-4"/>
                            <p>Submit</p>
                        </button>
                        <button type="button" onClick={() => {context.prevStep(); context.setIsFormValid(false)}} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <ArrowLeftIcon className="w-4"/>
                            <p>Back</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}