'use client'

import { APIResponse, BankAccount, Contact } from "@/app/lib/definitions/definition"
import { PaymentRequestFormValue, paymentRequestSchema } from "@/app/lib/schemas/schemas"
import { formatAccountNumber, formatMoney, numberToWords } from "@/app/lib/utilities/utilities"
import { ArrowRightIcon, XMarkIcon, UsersIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { useForm, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { PageContentContext } from "./create_payment_request_content"
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip"
import Link from "next/link"
import { createPaymentRequest, getInternalUserFromBankAccount, getUserAccounts } from "@/app/lib/actions/actions"

interface PaymentRequestProps {
}

// Expose getValues, receiverBankAccount, 
export interface PaymentRequestRef {
    getValues: UseFormGetValues<PaymentRequestFormValue>,
    setValue: UseFormSetValue<PaymentRequestFormValue>,
    receiverBankAccount: Contact | null
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export const PaymentRequestForm = forwardRef<PaymentRequestRef, PaymentRequestProps>(function PaymentRequestForm (props, ref) {
    const context = useContext(PageContentContext)
    
    if(!context){
        throw new Error('Something went wrong')
    }

    const { handleSubmit, register, setValue, getValues, watch, formState: { errors, isValid } } = useForm<PaymentRequestFormValue>({
        resolver: zodResolver(paymentRequestSchema),
        mode: "onChange"
    })

    const [sourceBankAccounts, setSourceBankAccounts] = useState<BankAccount[]>([])
    const [isFetchingReceiver, setIsFetchingReceiver] = useState<boolean>(false)
    const [receiverBankAccount, setReceiverBankAccount] = useState<Contact | null>(null)

    const onSubmit = async (data: PaymentRequestFormValue) => {
        const result: APIResponse = await createPaymentRequest(data)
        context.setIsRequestSuccessful(result)
        context.nextStep()
    }

    const [receiverAccountNumber, amount] = watch(["receiverAccountNumber", "amount"])
    useEffect(() => {
        const fetchReceiver = async () => {
            const receiver: Contact | null = await getInternalUserFromBankAccount(receiverAccountNumber) 
            setReceiverBankAccount(receiver)
            setIsFetchingReceiver(false)
        }

        if(!isFetchingReceiver && receiverAccountNumber && receiverAccountNumber.length === 12) {
            setIsFetchingReceiver(true)
            fetchReceiver()
        } else {
            setReceiverBankAccount(null)
        }
    }, [receiverAccountNumber])

    useEffect(() => {
        const fetchSourceAccounts = async () => {
            const result = await getUserAccounts()
            setSourceBankAccounts(result)
            if(result.length !== 0) {
                setValue("senderAccountNumber", result[0].accountNumber)
            }
        }
    
        fetchSourceAccounts()
    }, [])

    useImperativeHandle(ref, () => ({
        getValues,
        setValue,
        receiverBankAccount,
        onSubmit: handleSubmit(onSubmit)
    }))

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 1</span>
                    <p className="text-xl text-gray-950 font-bold">Payment request information</p>
                </div>
                <p className="text-sm text-gray-500">Fill in the form below to provide necessary information for the payment request</p>
            </div>
            <form className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0 ">
                <div className="flex flex-col gap-y-4 pb-4 md:pr-4 md:pb-0">
                    {/* RADIO: CHOOSE ACCOUNT */}
                    {/* FETCH FOR ACCOUNT'S DATA (NUMBER, BALANCE) FIRST*/}
                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Receive source</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {sourceBankAccounts.map((account, index) => (
                                <label key={index} htmlFor={`senderAccountNumber_${index}`} className="group flex gap-x-4 p-4 items-center border-2 border-slate-300 rounded-md hover:border-blue-600 has-[:checked]:border-blue-600 transition-all duration-300 cursor-pointer">
                                    <input {...register("senderAccountNumber")} id={`senderAccountNumber_${index}`} type="radio" value={account.accountNumber} className="peer hidden"/>
                                    <div className="relative w-4 h-4 border-2 border-slate-300 group-hover:border-blue-600 peer-checked:border-blue-600 rounded-full shrink-0 transition-all duration-300
                                        after:absolute after:content-[''] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-blue-600 after:w-0 after:h-0 peer-checked:after:w-3/4 peer-checked:after:h-3/4 after:rounded-full after:transition-all after:duration-300"/>
                                    <div className="flex flex-col gap-y-1 w-full">
                                        <span className="font-medium text-xs text-gray-500">
                                            {account.accountType === "payment" ? "Payment account" : "Account"}
                                        </span>
                                        <span className="text-gray-950 font-semibold">{`${formatMoney(account.balance.split('.')[0])} VND`}</span>
                                        <span className="text-gray-500 text-sm">{formatAccountNumber(account.accountNumber)}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm text-gray-950 font-semibold">Receive from</div>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col">
                                <div className="flex gap-x-4 items-end">
                                    <div className="relative mt-2 flex flex-col grow">
                                        <input {...register("receiverAccountNumber")} maxLength={12} type="text" id="receiverAccountNumber" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 disabled:cursor-not-allowed transition-colors duration-300 peer" placeholder=" " disabled={isFetchingReceiver}/>
                                        <label htmlFor="receiverAccountNumber" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Debtor's account number</label>
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button type="button" onClick={context.handleOpenModal} className="text-gray-500 p-2.5 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-blue-600 transition-all duration-300">
                                                <UsersIcon className="w-4"/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Choose a debtor from your contact list</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                {errors.receiverAccountNumber && <p className="text-red-500 text-xs mt-2">{errors.receiverAccountNumber.message}</p>}
                            </div>

                            {receiverBankAccount && (
                                <>
                                    <div className="flex gap-x-4 items-center border-2 border-slate-300 rounded-md p-4 bg-slate-50">
                                        <div className="w-12 h-12 rounded-full bg-slate-500"/>
                                        <div className="flex flex-col gap-y-0.5">
                                            <span className="text-gray-950 font-semibold">{receiverBankAccount.name}</span>
                                            <span className="text-gray-500 text-sm">{receiverBankAccount.bankName}</span>
                                            <span className="text-gray-500 text-sm">{formatAccountNumber(receiverBankAccount.accountNumber)}</span>
                                        </div>
                                    </div>

                                    <div className="relative mt-2 flex flex-col">
                                        <input {...register("amount")} type="number" id="amount" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                        <label htmlFor="amount" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Debt amount</label>
                                        {amount && amount !== 0 && <p className="text-blue-600 text-xs mt-2">{numberToWords(amount.toString())}</p>}
                                        {errors.amount && <p className="text-red-500 text-xs mt-2">{errors.amount.message}</p>}
                                    </div>
                                    <div className="relative mt-2 flex flex-col">
                                        <textarea {...register("requestNote")} id="requestNote" maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                                        <label htmlFor="requestNote" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Note</label>
                                        {errors.requestNote && <p className="text-red-500 text-xs mt-2">{errors.requestNote.message}</p>}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button type="button" onClick={handleSubmit(() => {context.nextStep(); context.setIsFormValid(true)})} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-300" disabled={!isValid}>
                            <ArrowRightIcon className="w-4"/>
                            <p>Continue</p>
                        </button>
                        <Link href="/payment-request" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <XMarkIcon className="w-4"/>
                            <p>Cancel</p>
                        </Link>
                        {!isValid && <p className="text-red-500 text-xs">You have not completed the form yet</p>}
                    </div>
                </div>
            </form>
        </div>
    )
})