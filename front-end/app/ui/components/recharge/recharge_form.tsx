'use client'

import { RechargeFormValues, rechargeSchema } from "@/app/lib/schemas/schemas"
import { numberToWords } from "@/app/lib/utilities/utilities"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useForm, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { PageContentContext } from "./recharge_page_content"
import { APIResponse } from "@/app/lib/definitions/definition"
import { rechargeCustomerAccount } from "@/app/lib/actions/employee_actions"

interface RechargeProps {
}

// Expose getValues,...
export interface RechargeRef {
    getValues: UseFormGetValues<RechargeFormValues>,
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export const RechargeForm = forwardRef<RechargeRef, RechargeProps>(function RechargeForm (props, ref) {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const { handleSubmit, register, getValues, setValue, watch, formState: { errors, isValid } } = useForm<RechargeFormValues>({
        resolver: zodResolver(rechargeSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: RechargeFormValues) => {
        const result: APIResponse = await rechargeCustomerAccount(data)
        context.setIsRequestSuccessful(result)
        context.nextStep()
    }

    const [infoType, amount] = watch(["infoType", "amount"])

    useEffect(() => {
        setValue("infoType", "username")
    }, [])

    useImperativeHandle(ref, () => ({
        getValues,
        onSubmit: handleSubmit(onSubmit)
    }))

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 1</span>
                    <p className="text-xl text-gray-950 font-bold">Recharge information</p>
                </div>
                <p className="text-sm text-gray-500">Fill in the form below to provide necessary information for the request</p>
            </div>
            <form className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0">
                <div className="flex flex-col gap-y-4 pb-4 md:pr-4 md:pb-0">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Customer information</div>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label htmlFor="infoType_username" className="group flex gap-x-4 p-4 items-center border-2 border-slate-300 rounded-md hover:border-blue-600 has-[:checked]:border-blue-600 transition-all duration-300 cursor-pointer">
                                    <input {...register("infoType")} id="infoType_username" type="radio" value="username" className="peer hidden"/>
                                    <div className="relative w-4 h-4 border-2 border-slate-300 group-hover:border-blue-600 peer-checked:border-blue-600 rounded-full shrink-0 transition-all duration-300
                                        after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-blue-600 after:w-0 after:h-0 peer-checked:after:w-3/4 peer-checked:after:h-3/4 after:rounded-full after:transition-all after:duration-300"/>
                                    <span className="text-gray-500 text-sm font-medium group-hover:text-gray-950 peer-checked:text-gray-950 transition-all duration-300">Use customer's username</span>
                                </label>
                                <label htmlFor="infoType_account" className="group flex gap-x-4 p-4 items-center border-2 border-slate-300 rounded-md hover:border-blue-600 has-[:checked]:border-blue-600 transition-all duration-300 cursor-pointer">
                                    <input {...register("infoType")} id="infoType_account" type="radio" value="account" className="peer hidden"/>
                                    <div className="relative w-4 h-4 border-2 border-slate-300 group-hover:border-blue-600 peer-checked:border-blue-600 rounded-full shrink-0 transition-all duration-300
                                        after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-blue-600 after:w-0 after:h-0 peer-checked:after:w-3/4 peer-checked:after:h-3/4 after:rounded-full after:transition-all after:duration-300"/>
                                    <span className="text-gray-500 text-sm font-medium group-hover:text-gray-950 peer-checked:text-gray-950 transition-all duration-300">Use customer's account number</span>
                                </label>
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("accountInfo")} type="text" id="accountInfo" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="accountInfo" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">
                                    {infoType === "username" ? "Username" : "Account number"}
                                </label>
                                {errors.accountInfo && <p className="text-red-500 text-xs mt-2">{errors.accountInfo.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Recharge information</div>
                        <div className="flex flex-col gap-y-4">
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("amount")} type="number" id="amount" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="amount" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Recharge amount</label>
                                {amount && amount !== 0 && <p className="text-blue-600 text-xs mt-2">{numberToWords(amount.toString())}</p>}
                                {errors.amount && <p className="text-red-500 text-xs mt-2">{errors.amount.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button type="button" onClick={handleSubmit(() => {context.nextStep(); context.setIsFormValid(true)})} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-300" disabled={!isValid}>
                            <ArrowRightIcon className="w-4"/>
                            <p>Continue</p>
                        </button>
                        {!isValid && <p className="text-red-500 text-xs">You have not completed the form yet</p>}
                    </div>
                </div>
            </form>
        </div>
    )
})