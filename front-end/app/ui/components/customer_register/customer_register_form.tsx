'use client'

import { CustomerRegisterFormValues, customerRegisterSchema } from "@/app/lib/schemas/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { useForm, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { PageContentContext } from "./customer_register_page_content"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import { APIResponse } from "@/app/lib/definitions/definition"
import { registerCustomerAccount } from "@/app/lib/actions/employee_actions"

interface CustomerRegisterProps {
}

// Expose getValues,...
export interface CustomerRegisterRef {
    getValues: UseFormGetValues<CustomerRegisterFormValues>,
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export const CustomerRegisterForm = forwardRef<CustomerRegisterRef, CustomerRegisterProps>(function CustomerRegisterForm (props, ref) {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const { handleSubmit, register, getValues, formState: { errors, isValid } } = useForm<CustomerRegisterFormValues>({
        resolver: zodResolver(customerRegisterSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: CustomerRegisterFormValues) => {
        const result: APIResponse = await registerCustomerAccount(data)
        context.setIsRequestSuccessful(result)
        context.nextStep()
    }

    useImperativeHandle(ref, () => ({
        getValues,
        onSubmit: handleSubmit(onSubmit)
    }))

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 1</span>
                    <p className="text-xl text-gray-950 font-bold">Account information</p>
                </div>
                <p className="text-sm text-gray-500">Collect and fill in the customer's information below</p>
            </div>
            <form className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0">
                <div className="flex flex-col gap-y-4 pb-4 md:pr-4 md:pb-0">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Login information</div>
                        <div className="flex flex-col gap-y-4">
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("username")} type="text" id="customer_register_username" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="customer_register_username" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Username</label>
                                {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username.message}</p>}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("password")} type="password" id="customer_register_password" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="customer_register_password" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Password</label>
                                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Personal information</div>
                        <div className="flex flex-col gap-y-4">
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("name")} type="text" id="customer_register_name" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="customer_register_name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Full name</label>
                                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("email")} type="email" id="customer_register_email" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="customer_register_email" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Email</label>
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <input {...register("phone")} type="text" id="customer_register_phone" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="customer_register_phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Phone number</label>
                                {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone.message}</p>}
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